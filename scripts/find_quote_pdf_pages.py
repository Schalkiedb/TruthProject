#!/usr/bin/env python
"""
find_quote_pdf_pages.py — work out which PDF page each quote actually sits on,
then (optionally) rewrite the markdown links to jump straight there.

WHY
    The quote files link to a supporting PDF, but the reader lands on page 1 of
    a document that may be 900 pages long and has to go hunting for the passage
    the page just quoted. 40 of the links try to solve this with a "#search="
    fragment — which is a PDF.js (Firefox) extension. Chrome, Edge and iOS
    Safari ignore it completely: verified by screenshotting Chrome's viewer,
    which stayed on page 1 of 45 with #search= applied but jumped correctly
    with #page=30. So on most browsers none of those links jump anywhere.

    "#page=N" is the one fragment every viewer honours. The work is therefore
    not the link syntax — it is knowing N.

HOW
    The printed page number in the citation ("p. 22") is NOT the PDF page:
    scans carry covers, blank leaves and front matter, so the two differ by an
    offset that varies per file. So instead of trusting the citation, this
    searches the PDF's own text layer for the quote and reports the page it is
    actually on.

    Matching is deliberately fussy about OCR noise: text is lowercased,
    curly quotes and dashes are normalised, and whitespace is collapsed, so a
    line break or a smart apostrophe in the scan does not cause a miss. Several
    word-windows from each quote are tried and pages are scored by how many
    windows they contain, so one OCR error does not lose the match.

WHAT IT WILL NOT DO
    It never guesses. A scanned PDF with no text layer, or a quote whose words
    do not appear, is reported as unresolved and its link is left exactly as it
    is. A wrong #page= is worse than none: it would send a reader to an
    unrelated page while looking authoritative.

USAGE
    python scripts/find_quote_pdf_pages.py                  # report only
    python scripts/find_quote_pdf_pages.py --write           # rewrite links
    python scripts/find_quote_pdf_pages.py --file OTHER.md   # another file
    python scripts/find_quote_pdf_pages.py --verbose         # per-link detail
"""
import argparse
import os
import re
import sys
import urllib.parse

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF is required:  python -m pip install pymupdf")

DEFAULT_MD = "Quotes_regarding_sabbath_change_catholic_and_protestant.md"

# ── Text normalisation ────────────────────────────────────────────────────
# Scans and OCR mangle punctuation freely; the aim is that a quote typed with
# curly quotes still matches a page that OCR'd them as straight ones.
_TRANS = {
    0x2018: "'", 0x2019: "'", 0x201A: "'", 0x201B: "'",
    0x201C: '"', 0x201D: '"', 0x201E: '"',
    0x2013: "-", 0x2014: "-", 0x2015: "-", 0x2212: "-",
    0x00A0: " ", 0x2026: " ", 0x00AD: "",
}


def norm(text):
    text = text.translate(_TRANS).lower()
    # Drop everything that is not a letter, digit or space: punctuation is the
    # least reliable thing in an OCR layer.
    text = re.sub(r"[^a-z0-9 ]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def windows(quote, size=7, step=3, limit=14):
    """Consecutive word-windows from a quote, used as search probes."""
    words = norm(quote).split()
    if len(words) < 4:
        return []
    if len(words) <= size:
        return [" ".join(words)]
    out = []
    for i in range(0, len(words) - size + 1, step):
        out.append(" ".join(words[i:i + size]))
        if len(out) >= limit:
            break
    return out


# ── Markdown parsing ──────────────────────────────────────────────────────
ENTRY_RE = re.compile(r"^\s*\d+\.\s+\*\*")
# A quoted run of at least ~25 chars following a bold label, or any long
# double-quoted span on the line.
QUOTE_RE = re.compile(r'"([^"]{25,})"')
LINK_RE = re.compile(r"\[([^\]]*)\]\(([^)]*?\.pdf)((?:#[^)]*)?)\)", re.IGNORECASE)


class Entry(object):
    def __init__(self, number, heading, line):
        self.number = number
        self.heading = heading
        self.line = line
        self.quotes = []
        self.links = []      # (line_index, label, path, fragment)


def parse_entries(lines):
    entries = []
    cur = None
    for i, line in enumerate(lines):
        if ENTRY_RE.match(line):
            cur = Entry(len(entries) + 1, line.strip()[:90], i)
            entries.append(cur)
        if cur is None:
            continue
        for q in QUOTE_RE.findall(line):
            cur.quotes.append(q)
        for label, path, frag in LINK_RE.findall(line):
            cur.links.append((i, label, path, frag))
    return entries


# ── PDF handling ──────────────────────────────────────────────────────────
_page_cache = {}


def page_texts(pdf_path):
    """Normalised text per page, cached. None if the file cannot be opened."""
    if pdf_path in _page_cache:
        return _page_cache[pdf_path]
    try:
        doc = fitz.open(pdf_path)
    except Exception as exc:                       # noqa: BLE001
        _page_cache[pdf_path] = ("error", str(exc)[:80])
        return _page_cache[pdf_path]
    pages = []
    for page in doc:
        try:
            pages.append(norm(page.get_text("text")))
        except Exception:                           # noqa: BLE001
            pages.append("")
    doc.close()
    _page_cache[pdf_path] = ("ok", pages)
    return _page_cache[pdf_path]


def locate(pdf_path, quotes):
    """
    Return (page_number_1based, score, total_probes, note).
    page_number is None when the quote could not be found.
    """
    status, payload = page_texts(pdf_path)
    if status == "error":
        return None, 0, 0, "cannot open: " + payload
    pages = payload
    if not pages:
        return None, 0, 0, "no pages"

    chars = sum(len(p) for p in pages)
    # A scan with no OCR layer yields almost nothing; say so rather than
    # reporting a failed match as if the quote were absent.
    if chars < 40 * len(pages):
        return None, 0, 0, "no text layer (%d pages, %d chars) - scanned images" % (len(pages), chars)

    # Some scans carry a text layer that is nothing but a per-page watermark
    # ("Digitized by the Center for Adventist Research"). That is enough text
    # to clear the threshold above, so the quote then came back as "not found"
    # — which wrongly implies the passage is absent from the book rather than
    # absent from the OCR. Detect it by looking for near-identical pages.
    nonempty = [p for p in pages if p]
    if len(nonempty) > 4:
        common = max(set(nonempty), key=nonempty.count)
        if nonempty.count(common) > 0.6 * len(nonempty):
            return None, 0, 0, ("text layer is only a repeated watermark (%d of %d pages read "
                                "'%s') - not OCR'd" % (nonempty.count(common), len(pages), common[:44]))

    # A third failure mode: a text layer that is present and substantial but
    # unreadable, because the embedded font encoding is broken. The Catholic
    # Record scan yields ~31,000 characters per page of mojibake
    # ("3YS2T 4S3O SYRDYRV"). Without this check the quote came back as "not
    # found in 8 pages", which reads as "the passage is not in the document".
    # English prose is dense in these five words; mojibake has almost none.
    sample = " ".join(pages)[:200000]
    if len(sample) > 4000:
        hits = sum(sample.count(" " + w + " ") for w in ("the", "and", "of", "to", "in"))
        if hits < len(sample) / 2000:
            return None, 0, 0, ("text layer is unreadable - broken font encoding produces "
                                "mojibake (%d chars, %d common-word hits)" % (len(sample), hits))

    probes = []
    for q in quotes:
        probes.extend(windows(q))
    # De-duplicate while keeping order.
    seen = set()
    probes = [p for p in probes if not (p in seen or seen.add(p))]
    if not probes:
        return None, 0, 0, "no usable quote text in the markdown entry"

    scores = {}
    for probe in probes:
        for idx, text in enumerate(pages):
            if probe and probe in text:
                scores[idx] = scores.get(idx, 0) + 1
    if not scores:
        return None, 0, len(probes), "quote not found in %d pages of text" % len(pages)

    best = max(scores.items(), key=lambda kv: (kv[1], -kv[0]))
    idx, score = best
    tie = [i for i, s in scores.items() if s == score]
    note = "%d/%d probes" % (score, len(probes))
    if len(tie) > 1:
        note += "; also on pages " + ",".join(str(t + 1) for t in sorted(tie)[1:6])
    return idx + 1, score, len(probes), note


# ── Main ──────────────────────────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", default=DEFAULT_MD)
    ap.add_argument("--write", action="store_true")
    ap.add_argument("--verbose", action="store_true")
    ap.add_argument("--min-score", type=int, default=1,
                    help="probes that must match before a page is trusted")
    args = ap.parse_args()

    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    md_path = os.path.join(root, args.file)
    with open(md_path, encoding="utf-8") as fh:
        lines = fh.read().split("\n")

    entries = parse_entries(lines)
    total_links = sum(len(e.links) for e in entries)
    print("%s: %d entries, %d PDF links\n" % (args.file, len(entries), total_links))

    resolved, unresolved, reasons = [], [], {}
    for entry in entries:
        for (line_i, label, path, frag) in entry.links:
            rel = urllib.parse.unquote(path)
            abs_path = os.path.join(root, rel.replace("/", os.sep))
            if not os.path.exists(abs_path):
                unresolved.append((entry, line_i, path, frag, "file missing: " + rel))
                reasons["file missing"] = reasons.get("file missing", 0) + 1
                continue
            page, score, nprobes, note = locate(abs_path, entry.quotes)
            if page and score >= args.min_score:
                resolved.append((entry, line_i, path, frag, page, note))
                if args.verbose:
                    print("  OK   p.%-4d %-52s %s" % (page, os.path.basename(rel)[:52], note))
            else:
                unresolved.append((entry, line_i, path, frag, note))
                key = note.split("(")[0].split(";")[0].strip()
                reasons[key] = reasons.get(key, 0) + 1
                if args.verbose:
                    print("  --         %-52s %s" % (os.path.basename(rel)[:52], note))

    print("\n=== RESULT ===")
    print("  page located : %d / %d" % (len(resolved), total_links))
    print("  unresolved   : %d" % len(unresolved))
    if reasons:
        print("\n  why unresolved:")
        for key, n in sorted(reasons.items(), key=lambda kv: -kv[1]):
            print("    %-58s %d" % (key[:58], n))

    if not args.write:
        print("\n(report only - pass --write to add #page= to the located links)")
        return

    # Rewrite bottom-up so earlier line indices stay valid.
    edits = {}
    for (entry, line_i, path, frag, page, note) in resolved:
        edits.setdefault(line_i, []).append((path, frag, page))
    for line_i in sorted(edits, reverse=True):
        line = lines[line_i]
        for (path, frag, page) in edits[line_i]:
            # Keep any existing search= term after page=: Firefox's viewer uses
            # it to highlight, and viewers that don't understand it ignore it.
            search = ""
            m = re.search(r"[#&]search=([^&]*)", frag or "")
            if m:
                search = "&search=" + m.group(1)
            old = "(" + path + (frag or "") + ")"
            new = "(" + path + "#page=" + str(page) + search + ")"
            line = line.replace(old, new)
        lines[line_i] = line

    with open(md_path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines))
    print("\nwrote #page= to %d links in %s" % (len(resolved), args.file))


if __name__ == "__main__":
    main()
