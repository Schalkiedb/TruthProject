"""Build assets/answer-index.json — the retrieval index behind "Ask the Library".

The site answers questions by finding the passages that already say the answer
and quoting them, rather than by generating prose. That keeps every word on
screen traceable to a document in this repository, which is the same standard
the quotation collection is held to.

Passages, not documents
-----------------------
Ranking whole documents is useless here: "Babylons_Wine…md" is a megabyte long
and matches almost any query. The unit is a passage:

  * one numbered entry in a collection (a quote, an objection, a doctrine), or
  * one run of prose under a heading, chunked when it gets long.

Anchors
-------
Each passage carries the anchor the browser will actually generate for it, so a
result links straight to the entry rather than to the top of a long document.
That means this script must reproduce two pieces of assets/app.js exactly:
slugify() for heading ids, and annotateEntryAnchors() for entry ids. Both are
mirrored below, and scripts/test_answer_index.py checks the anchors it produces
against the ids the real renderer emits.

Run via scripts/generate_source_manifest.py, or directly:
    python scripts/build_answer_index.py
"""

from __future__ import annotations

import html as _html
import json
import math
import re
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from answer_index_common import index_terms  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[1]
APP_JS = REPO_ROOT / "assets" / "app.js"
OUTPUT_FILE = REPO_ROOT / "assets" / "answer-index.json"

# Prose is chunked at roughly this many characters, at a paragraph boundary.
# Long enough to hold a complete argument, short enough that BM25 length
# normalisation still discriminates between passages.
CHUNK_CHARS = 1400
# Stored preview text per passage. The result card shows this; the reader gets
# the full passage in context by following the anchor into the document, so
# this only has to be long enough to judge relevance and read the substance.
PREVIEW_CHARS = 420
# Passages shorter than this are navigational noise ("See also", "Back to top").
MIN_PASSAGE_CHARS = 60
# Short prose passages are merged into the previous one rather than indexed
# alone — a 90-character fragment scores erratically under BM25 and produces
# result cards with nothing in them.
MERGE_PROSE_UNDER = 240


# ─────────────────────────────────────────────────────────────────
# Registry — title and section for each registered document
# ─────────────────────────────────────────────────────────────────
def registry_entries() -> list[dict]:
    """(file, title, section) for every local document registered in app.js."""
    app = APP_JS.read_text(encoding="utf-8")
    entries: list[dict] = []
    section = ""
    seen: set[str] = set()
    # The registry is a flat literal: section headers introduce runs of items.
    for match in re.finditer(
        r'^\s*section:\s*"([^"]+)"|^\s*title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*\n\s*file:\s*"([^"]+)"',
        app,
        re.M,
    ):
        if match.group(1):
            section = match.group(1)
            continue
        title, path = match.group(2), match.group(3)
        if path.startswith(("http://", "https://")) or path.startswith("__"):
            continue
        if path in seen:
            continue
        seen.add(path)
        entries.append(
            {
                "path": path,
                "title": re.sub(r'\\(.)', r"\1", title),
                "section": section,
            }
        )
    return entries


# ─────────────────────────────────────────────────────────────────
# Mirrors of assets/app.js
# ─────────────────────────────────────────────────────────────────
def slugify(text: str) -> str:
    """Mirror of slugify() in assets/app.js.

    JS \\w is ASCII-only, so re.ASCII is required — Python's default \\w would
    keep accented letters that the browser strips, producing anchors that do
    not exist on the page.
    """
    s = _html.unescape(str(text))
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("/", "-")
    s = s.lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.ASCII)
    s = re.sub(r"\s+", "-", s, flags=re.ASCII)
    s = re.sub(r"-+", "-", s)
    return s.strip()


def entry_prefix(heading_slug: str) -> str:
    """Mirror of entryAnchorPrefix(): first non-empty part of the heading slug."""
    parts = [p for p in str(heading_slug).split("-") if p]
    if not parts:
        return "item"
    first = parts[0].lower()
    return "item" if first.isdigit() else first


# ─────────────────────────────────────────────────────────────────
# Markdown → plain text
# ─────────────────────────────────────────────────────────────────
_IMAGE_RE = re.compile(r"!\[[^\]]*\]\([^)]*\)")
_LINK_RE = re.compile(r"\[([^\]]*)\]\([^)]*\)")
_TAG_RE = re.compile(r"<[^>]+>")


def plain_text(md: str) -> str:
    t = _IMAGE_RE.sub("", md)
    t = _LINK_RE.sub(r"\1", t)
    t = _TAG_RE.sub("", t)
    t = t.replace("`", "")
    t = re.sub(r"^\s{0,3}#{1,6}\s+", "", t, flags=re.M)   # heading markers
    t = re.sub(r"^\s*>\s?", "", t, flags=re.M)             # blockquote markers
    t = re.sub(r"^\s*[-*+]\s+", "", t, flags=re.M)         # bullet markers
    t = re.sub(r"^\s*\d{1,3}\.\s+", "", t, flags=re.M)     # ordered markers
    t = re.sub(r"^\s*\|", "", t, flags=re.M)               # table pipes
    t = re.sub(r"^[-:\s|]+$", "", t, flags=re.M)           # table rules
    t = t.replace("**", "").replace("__", "")
    t = re.sub(r"(?<!\w)[*_](?=\S)", "", t)                # opening emphasis
    t = re.sub(r"(?<=\S)[*_](?!\w)", "", t)                # closing emphasis
    t = _html.unescape(t)
    return re.sub(r"\s+", " ", t).strip()


# ─────────────────────────────────────────────────────────────────
# Segmentation
# ─────────────────────────────────────────────────────────────────
ENTRY_RE = re.compile(r"^(\d{1,3})\.\s")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
FENCE_RE = re.compile(r"^\s*(```|~~~)")


def heading_ids(lines: list[str]) -> list[str]:
    """Every heading id in the file, so entry anchors can avoid colliding
    with them exactly as annotateEntryAnchors() does."""
    ids, fenced = [], False
    for line in lines:
        if FENCE_RE.match(line):
            fenced = not fenced
            continue
        if fenced:
            continue
        m = HEADING_RE.match(line)
        if m:
            ids.append(slugify(m.group(2)))
    return ids


def segment_markdown(md: str) -> list[dict]:
    """Split one markdown document into passages."""
    lines = md.split("\n")
    used = set(heading_ids(lines))

    passages: list[dict] = []
    # heading trail by level, for a readable "Section › Sub-section" label
    trail: dict[int, str] = {}
    section_slug = ""
    prefix = "item"

    buf: list[str] = []
    buf_anchor = ""
    buf_kind = "prose"

    def flush() -> None:
        nonlocal buf, buf_anchor, buf_kind
        if buf:
            text = plain_text("\n".join(buf))
            if len(text) >= MIN_PASSAGE_CHARS:
                passages.append(
                    {
                        "anchor": buf_anchor,
                        "heading": " › ".join(
                            trail[k] for k in sorted(trail) if trail[k]
                        ),
                        "kind": buf_kind,
                        "text": text,
                    }
                )
        buf = []

    fenced = False
    for line in lines:
        if FENCE_RE.match(line):
            fenced = not fenced
            buf.append(line)
            continue
        if fenced:
            buf.append(line)
            continue

        hm = HEADING_RE.match(line)
        if hm:
            flush()
            level = len(hm.group(1))
            raw = hm.group(2).strip()
            slug = slugify(raw)
            trail = {k: v for k, v in trail.items() if k < level}
            trail[level] = plain_text(raw)
            if level <= 3:
                section_slug = slug
                prefix = entry_prefix(slug)
            buf_anchor = slug
            buf_kind = "prose"
            continue

        em = ENTRY_RE.match(line)
        if em:
            flush()
            number = int(em.group(1))
            base = f"{prefix}-{number}"
            anchor, n = base, 2
            while anchor in used:
                anchor = f"{base}-{n}"
                n += 1
            used.add(anchor)
            buf_anchor = anchor
            buf_kind = "entry"
            buf.append(line)
            continue

        buf.append(line)

        # Chunk long prose at a blank line so paragraphs stay intact. Entries
        # are never chunked — an entry is a citable unit and must stay whole.
        if (
            buf_kind == "prose"
            and line.strip() == ""
            and sum(len(x) for x in buf) > CHUNK_CHARS
        ):
            flush()

    flush()
    _ = section_slug  # retained for clarity of intent; anchor already captured
    return passages


def segment_html(raw: str) -> list[dict]:
    """Split a standalone HTML page (infographic / typology study) into passages."""
    body = re.sub(r"(?is)<(script|style|svg|head)\b.*?</\1>", " ", raw)
    body = re.sub(r"(?s)<!--.*?-->", " ", body)

    parts = re.split(r"(?i)(<h[1-3]\b[^>]*>.*?</h[1-3]>)", body)
    passages: list[dict] = []
    trail: dict[int, str] = {}
    anchor = ""

    def add(chunk: str) -> None:
        text = plain_text(chunk)
        if len(text) < MIN_PASSAGE_CHARS:
            return
        # Chunk long runs so one <section> does not become a single passage.
        while text:
            head, text = text[:CHUNK_CHARS], text[CHUNK_CHARS:]
            if text:
                cut = head.rfind(". ")
                if cut > CHUNK_CHARS // 2:
                    text, head = head[cut + 2:] + text, head[: cut + 1]
            passages.append(
                {
                    "anchor": anchor,
                    "heading": " › ".join(trail[k] for k in sorted(trail) if trail[k]),
                    "kind": "prose",
                    "text": head.strip(),
                }
            )

    for part in parts:
        hm = re.match(r"(?i)<h([1-3])\b([^>]*)>(.*?)</h[1-3]>", part or "", re.S)
        if hm:
            level = int(hm.group(1))
            idm = re.search(r'id="([^"]*)"', hm.group(2))
            anchor = idm.group(1) if idm else ""
            trail = {k: v for k, v in trail.items() if k < level}
            trail[level] = plain_text(hm.group(3))
            continue
        add(part or "")
    return passages


# ─────────────────────────────────────────────────────────────────
# Index assembly
# ─────────────────────────────────────────────────────────────────
def merge_short_prose(segments: list[dict]) -> list[dict]:
    """Fold tiny prose fragments into the passage above them.

    Entries are never merged — each one is a citable unit and has to keep its
    own anchor — and a fragment is only folded into a prose passage, so an
    entry never absorbs the prose that follows it.
    """
    out: list[dict] = []
    for seg in segments:
        if (
            out
            and seg["kind"] == "prose"
            and out[-1]["kind"] == "prose"
            and len(seg["text"]) < MERGE_PROSE_UNDER
            and len(out[-1]["text"]) + len(seg["text"]) <= CHUNK_CHARS
        ):
            out[-1]["text"] = f"{out[-1]['text']} {seg['text']}"
            continue
        out.append(seg)
    return out


def build() -> dict:
    files: list[dict] = []
    passages: list[list] = []
    postings: dict[str, list[int]] = {}
    total_len = 0
    # Anchors and heading trails repeat across every passage in a section.
    # Interning them keeps the file small enough to parse quickly on a phone.
    anchors: list[str] = []
    anchor_ids: dict[str, int] = {}
    headings: list[str] = []
    heading_ids_: dict[str, int] = {}

    def intern(value: str, table: list[str], lookup: dict[str, int]) -> int:
        if value not in lookup:
            lookup[value] = len(table)
            table.append(value)
        return lookup[value]

    for entry in registry_entries():
        path = REPO_ROOT / entry["path"]
        if not path.exists():
            continue
        suffix = path.suffix.lower()
        if suffix not in {".md", ".html"}:
            continue
        raw = path.read_text(encoding="utf-8", errors="replace")
        segments = (
            segment_markdown(raw) if suffix == ".md" else segment_html(raw)
        )
        segments = merge_short_prose([s for s in segments if s["text"]])
        if not segments:
            continue

        file_index = len(files)
        files.append(
            {"p": entry["path"], "t": entry["title"], "s": entry["section"]}
        )

        for seg in segments:
            terms = index_terms(seg["text"])
            if not terms:
                continue
            pid = len(passages)
            counts = Counter(terms)
            for term, tf in counts.items():
                postings.setdefault(term, []).append(pid)
                postings[term].append(tf)
            total_len += len(terms)
            preview = seg["text"][:PREVIEW_CHARS]
            if len(seg["text"]) > PREVIEW_CHARS:
                cut = preview.rfind(" ")
                if cut > PREVIEW_CHARS // 2:
                    preview = preview[:cut]
                preview += "…"
            passages.append(
                [
                    file_index,
                    intern(seg["anchor"], anchors, anchor_ids),
                    intern(seg["heading"], headings, heading_ids_),
                    len(terms),
                    1 if seg["kind"] == "entry" else 0,
                    preview,
                ]
            )

    # Delta-encode passage ids so the JSON compresses well and stays small.
    # Plain JSON numbers are deliberate: a base36 string encoding was measured
    # at 1.53 MB against 2.45 MB here, but only 0.67 MB against 0.72 MB once
    # gzipped, which is all the visitor pays. Not worth a hand-written decoder.
    for term, flat in postings.items():
        prev = 0
        for i in range(0, len(flat), 2):
            pid = flat[i]
            flat[i] = pid - prev
            prev = pid

    return {
        "version": 1,
        "avgLen": round(total_len / len(passages), 3) if passages else 0,
        "totalPassages": len(passages),
        "files": files,
        "anchors": anchors,
        "headings": headings,
        "passages": passages,
        "postings": postings,
    }


def main() -> int:
    index = build()
    payload = json.dumps(index, ensure_ascii=False, separators=(",", ":")) + "\n"
    old = OUTPUT_FILE.read_text(encoding="utf-8") if OUTPUT_FILE.exists() else ""
    rel = OUTPUT_FILE.relative_to(REPO_ROOT).as_posix()
    size_mb = len(payload.encode("utf-8")) / (1024 * 1024)
    stats = (
        f"{index['totalPassages']} passages, "
        f"{len(index['files'])} documents, "
        f"{len(index['postings'])} terms, {size_mb:.2f} MB"
    )
    if old == payload:
        print(f"{rel} already up to date ({stats}).")
        return 0
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(payload, encoding="utf-8")
    print(f"Updated {rel} — {stats}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
