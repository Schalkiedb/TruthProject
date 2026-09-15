#!/usr/bin/env python3
"""Check quotations in the study library against the source PDFs they cite.

For every quotation that carries a "Source Document" link, locate the quoted
phrase in that PDF's text layer and report whether it is on the cited page.
Quotations with no source link are counted but not checked -- they are the
audit backlog, not a failure.

Read the per-link summary first, not the per-quotation one. An entry routinely
quotes several passages from a single work and anchors its link at one of them;
the others then sit on other pages of the same book, which is correct and not a
defect. The per-quotation figures show that as "wrong-page", which is why the
link-level view -- does the anchor land on any quotation in its own entry? --
is the one that answers whether a reader clicking the link arrives usefully.

The scans are OCR'd, so matching cannot be exact. A page of OCR contains soft
hyphens splitting words across lines, apostrophes fused into neighbouring
letters ("of'her"), and stray punctuation ( ":^o" for "to be" ). Matching
therefore normalises aggressively and falls back to a similarity ratio.

    python scripts/verify_citations.py                      # whole library
    python scripts/verify_citations.py --doc Commandments.md
    python scripts/verify_citations.py --csv out.csv         # full worksheet
    python scripts/verify_citations.py --unsourced           # list the backlog

A "not-found" verdict is not proof of error. It means the phrase could not be
matched mechanically and a human has to look.
"""
from __future__ import annotations

import argparse
import csv
import difflib
import re
import sys
import unicodedata
import urllib.parse
from collections import Counter
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:  # pragma: no cover
    sys.exit("PyMuPDF is required:  pip install pymupdf")

REPO_ROOT = Path(__file__).resolve().parent.parent

# Directories holding evidence or generated data rather than prose.
SKIP_DIRS = {
    ".git", "assets", "scripts", "Bible Translations Lookup",
    "EGW Writings Lookup", "Supporting Documents", "Additional Reading",
    ".claude", ".githooks", ".github", ".vscode", ".sixth", "__pycache__",
}

# A markdown link whose target is a PDF under Supporting Documents.
SRC_LINK = re.compile(
    r"\[[^\]]*\]\(\s*(?P<path>[^)\s#]*Supporting(?:%20|\s)Documents[^)\s#]*\.pdf)"
    r"(?P<frag>#[^)\s]*)?\s*\)",
    re.I,
)
PAGE_IN_FRAG = re.compile(r"page=(\d+)", re.I)
SEARCH_IN_FRAG = re.compile(r"search=([^&]+)", re.I)

# A quoted passage. Two rules matter here, both learned the hard way:
#
#  * quotes must not span a newline, or the pattern pairs a closing mark on one
#    markdown bullet with an opening mark on the next and returns a fragment
#    spanning two unrelated citations;
#  * every quoted span is captured regardless of length, and short ones are
#    discarded afterwards. Skipping them inside the pattern desynchronises the
#    pairing, so the *gaps between* quotes -- the author's own commentary --
#    start being read as quotations. That is what produced fragments like
#    "— that is, not by any divine command — but".
QUOTED = re.compile(r'["“]([^"“”\n]*)["”]')
MIN_QUOTE_WORDS = 8

# An unsourced quotation is only a gap if the reader has no other way to check
# it. Scripture and Ellen White both have a lookup built into the site, so a
# reference is sufficient for them, and they must be counted separately: most
# of the raw quotation count in this library is Bible text, and lumping it in
# turns a few hundred real gaps into a five-figure number that means nothing.
BIBLE_BOOKS = (
    r"Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|"
    r"Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|"
    r"Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|"
    r"Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|"
    r"Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|"
    r"Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|"
    r"Revelation"
)
SCRIPTURE_REF = re.compile(
    r"\b(?:[1-3]\s*)?(?:" + BIBLE_BOOKS + r")\s+\d+[:.]\d+", re.I)
EGW_REF = re.compile(
    r"\b(?:GC|DA|PP|EW|MH|COL|AA|PK|SC|CT|Ed|[1-9]T)\s+\d{1,4}\b"
    r"|Great Controversy|Desire of Ages|Patriarchs and Prophets|Early Writings"
    r"|Testimonies|Ministry of Healing|Ellen G?\.? ?White",
    re.I,
)

MIN_RATIO = 0.82          # similarity below which a phrase counts as unmatched
NEEDLE_WORDS = 12         # words used from a long quote when searching

# How far the located page may sit from the cited one and still count as
# correct for a single quotation. A quotation that begins at the foot of one
# page and runs onto the next is legitimately cited to either, and the probe
# matches wherever its opening words happen to fall.
#
# Exceeding it does NOT mean the anchor is wrong. An entry commonly quotes
# several passages from one work and anchors at one of them, so the others sit
# further off by design -- in this library that accounts for every single
# "wrong-page" result. Only the link-level summary can judge an anchor, which
# is why that is reported first.
PAGE_TOLERANCE = 2


# ── text normalisation ────────────────────────────────────────────────────
def normalise(text: str) -> str:
    """Flatten OCR noise so two renderings of the same sentence compare equal."""
    text = unicodedata.normalize("NFKD", text)
    text = text.replace("­", "")                     # soft hyphen
    # These scans use the NOT SIGN and the tilde as end-of-line hyphens, so a
    # word broken across lines arrives as "Catho¬\nlic". Until they are treated
    # as hyphens, every quotation spanning a line break fails to match -- which
    # is most of the long ones.
    text = re.sub(r"[¬~=]", "-", text)
    text = re.sub(r"[‐-―]", "-", text)          # dash variants
    text = re.sub(r"[‘’ʼ`]", "'", text)
    text = re.sub(r"[“”]", '"', text)
    text = re.sub(r"-\s*\n\s*", "", text)                 # hyphenated line break
    text = text.lower()
    # OCR frequently drops or invents punctuation; keep letters and digits only.
    text = re.sub(r"[^a-z0-9 ]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def needles(quote: str) -> list[str]:
    """Progressively shorter probes for one quotation, longest first.

    A single fixed length is the wrong tool: a 12-word run has to survive
    12 words of OCR intact, and on these scans it frequently does not. Trying
    shorter probes recovers real matches that a long probe misses, while the
    longest probe that succeeds keeps the match specific enough to trust.
    """
    words = normalise(quote).split()
    out = []
    for n in (NEEDLE_WORDS, 8, 6, 5):
        if len(words) >= n:
            probe = " ".join(words[:n])
            if probe not in out:
                out.append(probe)
    if not out and words:
        out.append(" ".join(words))
    return out


def word_overlap(needle_words: set[str], page_words: set[str]) -> float:
    """Cheap page score: what share of the needle's words appear on the page."""
    if not needle_words:
        return 0.0
    return len(needle_words & page_words) / len(needle_words)


def fuzzy_ratio(needle_text: str, haystack: str) -> float:
    """Similarity of the needle against the best window of one page.

    Only ever called on the handful of pages that word overlap already
    identified as plausible -- scanning every window of every page of a
    300-page volume with SequenceMatcher is far too slow to be useful.
    """
    if not needle_text or not haystack:
        return 0.0
    if needle_text in haystack:
        return 1.0
    n = len(needle_text)
    if n >= len(haystack):
        return difflib.SequenceMatcher(None, needle_text, haystack).ratio()
    # Anchor on the needle's longest word: any real match contains it, and it
    # reduces the candidate windows from hundreds to a few.
    anchor = max(needle_text.split(), key=len, default="")
    starts: list[int] = []
    if len(anchor) >= 5:
        pos = haystack.find(anchor)
        while pos != -1 and len(starts) < 24:
            starts.append(max(0, pos - n // 2))
            pos = haystack.find(anchor, pos + 1)
    if not starts:
        step = max(1, n // 2)
        starts = list(range(0, len(haystack) - n + 1, step))[:24]

    best = 0.0
    matcher = difflib.SequenceMatcher(autojunk=False, a=needle_text)
    for i in starts:
        matcher.set_seq2(haystack[i:i + n + 30])
        if matcher.real_quick_ratio() <= best or matcher.quick_ratio() <= best:
            continue
        best = max(best, matcher.ratio())
        if best >= 0.99:
            break
    return best


# ── PDF access ────────────────────────────────────────────────────────────
# Below this many extracted characters per page, a PDF is an image-only scan
# with no usable text layer. Several sources here are photographs of newspaper
# pages: nothing can be matched in them, which is not the same as a quotation
# being absent, and the two must not share a verdict.
MIN_CHARS_PER_PAGE = 60


class PdfText:
    """Lazily extracted, normalised page text, cached per file."""

    def __init__(self) -> None:
        self._cache: dict[Path, list[str]] = {}
        self.failed: dict[Path, str] = {}
        self.image_only: set[Path] = set()

    def pages(self, path: Path) -> list[str]:
        if path in self._cache:
            return self._cache[path]
        try:
            with fitz.open(path) as doc:
                pages = [normalise(p.get_text()) for p in doc]
        except Exception as exc:                      # unreadable / encrypted
            self.failed[path] = str(exc)
            pages = []
        if pages and sum(len(p) for p in pages) / len(pages) < MIN_CHARS_PER_PAGE:
            self.image_only.add(path)
        self._cache[path] = pages
        return pages

    def has_text(self, path: Path) -> bool:
        return bool(self.pages(path)) and path not in self.image_only


# ── document scanning ─────────────────────────────────────────────────────
def prose_documents(only: str | None) -> list[Path]:
    if only:
        p = (REPO_ROOT / only).resolve()
        return [p] if p.exists() else []
    out: list[Path] = []
    for path in REPO_ROOT.rglob("*"):
        if path.suffix.lower() not in (".md", ".html"):
            continue
        if set(path.relative_to(REPO_ROOT).parts) & SKIP_DIRS:
            continue
        if path.name in ("index.html", "CITATIONS.md"):
            continue
        out.append(path)
    return sorted(out)


def strip_markup(text: str, suffix: str) -> str:
    if suffix.lower() != ".html":
        return text
    text = re.sub(r"<(script|style)\b.*?</\1>", " ", text, flags=re.S | re.I)
    return re.sub(r"<[^>]+>", " ", text)


def citations_in(path: Path) -> tuple[list[dict], int, "Counter[str]"]:
    """Every source-linked quotation in one document, plus the unsourced count.

    A quotation belongs to the next source link that follows it, which is how
    the quotes document is laid out: quote, significance, then the link.
    """
    raw = path.read_text(encoding="utf-8", errors="replace")
    body = strip_markup(raw, path.suffix)

    links = [
        {
            "at": m.start(),
            "path": urllib.parse.unquote(m.group("path")),
            "page": int(pm.group(1)) if (pm := PAGE_IN_FRAG.search(m.group("frag") or "")) else None,
            "search": urllib.parse.unquote_plus(sm.group(1))
            if (sm := SEARCH_IN_FRAG.search(m.group("frag") or "")) else None,
        }
        for m in SRC_LINK.finditer(raw)
    ]

    found: list[dict] = []
    unsourced = 0
    unsourced_kind: Counter[str] = Counter()
    for qm in QUOTED.finditer(body):
        # Emphasis markers sit inside quotations throughout the library.
        quote = qm.group(1).replace("**", "").replace("*", "").strip()
        if len(normalise(quote).split()) < MIN_QUOTE_WORDS:
            continue
        # A quotation opens with words, not with the punctuation that joins one
        # fragment to the next. Anything starting with a dash or a comma is the
        # author's connective tissue, not the source's words.
        if quote[0] not in "." and not (quote[0].isalnum() or quote[0] in "'‘“"):
            continue
        # Nearest following link in the raw text, within a reasonable distance.
        following = [l for l in links if 0 <= l["at"] - qm.start() < 4000]
        if not following:
            # Classify by whether the reader has another route to the source.
            ctx = body[max(0, qm.start() - 200):qm.end() + 260]
            if SCRIPTURE_REF.search(ctx):
                unsourced_kind["scripture"] += 1
            elif EGW_REF.search(ctx):
                unsourced_kind["ellen-white"] += 1
            else:
                unsourced_kind["other"] += 1
            unsourced += 1
            continue
        link = min(following, key=lambda l: l["at"] - qm.start())
        found.append({"quote": quote, **link})
    return found, unsourced, unsourced_kind


# ── verification ──────────────────────────────────────────────────────────
def verify(cit: dict, pdfs: PdfText) -> dict:
    pdf_path = (REPO_ROOT / cit["path"]).resolve()
    result = {
        "verdict": "", "found_pages": [], "ratio": 0.0, "matched_words": 0,
        "offset": "",
        "pdf": cit["path"], "cited_page": cit["page"],
        "quote": cit["quote"],
    }
    if not pdf_path.exists():
        result["verdict"] = "pdf-missing"
        return result

    pages = pdfs.pages(pdf_path)
    if not pages:
        result["verdict"] = "pdf-unreadable"
        return result
    if pdf_path in pdfs.image_only:
        # A photographed page. The citation may be perfectly good; this tool
        # simply has nothing to read. Needs OCR or a human, not a correction.
        result["verdict"] = "no-text-layer"
        return result

    # Always probe with the quotation itself -- that is the claim under test.
    #
    # Not the link's search= term: an entry commonly carries several quotations
    # sharing one source link, and the term highlights only one of them. Using
    # it for all of them reported every other quotation in the entry as
    # missing when it was present and correctly cited.
    probes = needles(cit["quote"])
    hits: list[int] = []
    best = 0.0
    matched_words = 0

    # Pass 1 -- exact substring, longest probe first. Cheap, and it settles the
    # large majority outright. Stop at the first length that matches, so the
    # recorded hit is as specific as the scan allows.
    for probe in probes:
        hits = [i for i, text in enumerate(pages, start=1) if probe in text]
        if hits:
            best = 1.0
            matched_words = len(probe.split())
            break

    # Pass 2 -- only if no probe matched exactly. Score pages by word overlap,
    # then run the expensive comparison on the few best candidates.
    if not hits and probes:
        probe = probes[0]
        probe_words = set(probe.split())
        scored = sorted(
            ((word_overlap(probe_words, set(t.split())), i)
             for i, t in enumerate(pages, start=1) if t),
            reverse=True,
        )[:5]
        for overlap, i in scored:
            if overlap < 0.5:
                break
            r = fuzzy_ratio(probe, pages[i - 1])
            best = max(best, r)
            if r >= MIN_RATIO:
                hits.append(i)
        hits.sort()
        if hits:
            matched_words = len(probe.split())

    result["matched_words"] = matched_words

    result["found_pages"] = hits
    result["ratio"] = round(best, 3)

    if not hits:
        result["verdict"] = "not-found"
    elif cit["page"] is None:
        result["verdict"] = "confirmed-no-anchor"
    elif cit["page"] in hits:
        result["verdict"] = "confirmed"
    elif min(abs(h - cit["page"]) for h in hits) <= PAGE_TOLERANCE:
        result["verdict"] = "confirmed-adjacent"
    else:
        result["verdict"] = "wrong-page"
        result["offset"] = min((h - cit["page"] for h in hits),
                               key=abs)
    return result


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--doc", help="check a single document, repo-relative")
    ap.add_argument("--csv", help="write the full worksheet to this path")
    ap.add_argument("--unsourced", action="store_true",
                    help="report the per-document count of unsourced quotations")
    ap.add_argument("--quiet", action="store_true", help="totals only")
    args = ap.parse_args()

    docs = prose_documents(args.doc)
    if not docs:
        print("no documents matched", file=sys.stderr)
        return 2

    pdfs = PdfText()
    rows: list[dict] = []
    unsourced_by_doc: dict[str, int] = {}
    unsourced_other: dict[str, int] = {}
    unsourced_kinds: Counter[str] = Counter()

    for path in docs:
        rel = path.relative_to(REPO_ROOT).as_posix()
        cits, unsourced, kinds = citations_in(path)
        unsourced_by_doc[rel] = unsourced
        unsourced_kinds.update(kinds)
        unsourced_other[rel] = kinds["other"]
        for cit in cits:
            r = verify(cit, pdfs)
            r["doc"] = rel
            r["link_id"] = f"{rel}#{cit['at']}"
            rows.append(r)
            if not args.quiet and not r["verdict"].startswith("confirmed"):
                print(f"  {r['verdict']:<20} {rel}")
                print(f"      quote : {cit['quote'][:88]}")
                print(f"      source: {Path(cit['path']).name[:74]}"
                      f"  cited p.{cit['page']}"
                      f"  found {r['found_pages'] or '-'}"
                      f"  best {r['ratio']}")

    tally = Counter(r["verdict"] for r in rows)
    print()
    print(f"documents scanned          {len(docs)}")

    # ── per link, which is the unit that matters ──────────────────────────
    #
    # A "#page=" anchor serves the entry it sits in, and an entry routinely
    # quotes several passages from one work. Judging the anchor against every
    # quotation in the entry marks the secondary ones "wrong-page" when they
    # are simply on other pages of the same book -- which is not a defect and
    # was the first version's most misleading output. The anchor is right if it
    # lands on any quotation in its own group.
    by_link: dict[str, list[dict]] = {}
    for r in rows:
        by_link.setdefault(r["link_id"], []).append(r)

    anchors = Counter()
    for members in by_link.values():
        if any(m["verdict"].startswith("confirmed") for m in members):
            anchors["anchor-lands-on-a-quotation"] += 1
        elif any(m["found_pages"] for m in members):
            anchors["anchor-misses-every-quotation"] += 1
        elif all(m["verdict"] == "no-text-layer" for m in members):
            anchors["source-has-no-text-layer"] += 1
        else:
            anchors["nothing-located"] += 1

    print(f"source links               {len(by_link)}")
    for k in ("anchor-lands-on-a-quotation", "anchor-misses-every-quotation",
              "source-has-no-text-layer", "nothing-located"):
        if anchors[k]:
            print(f"  {k:<32} {anchors[k]}")

    print()
    print(f"individual quotations      {len(rows)}")
    for verdict in ("confirmed", "confirmed-adjacent", "confirmed-no-anchor",
                    "wrong-page", "not-found", "no-text-layer", "pdf-missing",
                    "pdf-unreadable"):
        if tally[verdict]:
            note = ""
            if verdict == "wrong-page":
                note = "  (mostly other passages in the same entry -- see links above)"
            print(f"  {verdict:<22} {tally[verdict]}{note}")
    total_unsourced = sum(unsourced_by_doc.values())
    print()
    print(f"quotations with no source link  {total_unsourced}")
    print(f"  scripture (lookup on site)    {unsourced_kinds['scripture']}")
    print(f"  Ellen White (lookup on site)  {unsourced_kinds['ellen-white']}")
    print(f"  everything else               {unsourced_kinds['other']}"
          f"   <- the actual audit backlog")

    if pdfs.failed:
        print()
        print("PDFs that could not be read:")
        for p, why in pdfs.failed.items():
            print(f"  {p.name}: {why[:70]}")

    if args.unsourced:
        print()
        print("Unsourced quotations needing a source, by document")
        print("(scripture and Ellen White excluded -- both are checkable on the site)")
        for rel, n in sorted(unsourced_other.items(), key=lambda kv: -kv[1]):
            if n:
                print(f"  {n:5d}  {rel}")

    if args.csv:
        out = Path(args.csv)
        with out.open("w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=[
                "doc", "verdict", "cited_page", "found_pages", "offset",
                "ratio", "matched_words", "pdf", "quote"])
            w.writeheader()
            for r in rows:
                w.writerow({**r, "found_pages": " ".join(map(str, r["found_pages"]))})
        print(f"\nworksheet written to {out}")

    # Exit non-zero only for what is definitely broken for a reader: an anchor
    # that lands on none of its entry's quotations, or a missing file.
    return 1 if (anchors["anchor-misses-every-quotation"]
                 or tally["pdf-missing"]) else 0


if __name__ == "__main__":
    raise SystemExit(main())
