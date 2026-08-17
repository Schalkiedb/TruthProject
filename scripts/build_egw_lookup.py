"""Extract Ellen G. White writings from the EGW Writings API into JSON.

The output mirrors "Bible Translations Lookup/" so the site can read it the
same way it reads Scripture:

    EGW Writings Lookup/
        _index.json                    every work, with page range and chapters
        GC/
            GC_book.json               whole work, one file      (gitignored)
            GC_chapters/
                01 - The Destruction of Jerusalem.json           (tracked)

Scripture is addressed book / chapter / verse; Ellen White is addressed
work / page / paragraph, so that is what the files are keyed on:

    {"GC": {"code": ..., "pages": {"17": {"1": "…", "2": "…"}}}}

A survey of this site's own citations found 389 references and only two that
carried a paragraph number — so page is the unit that matters, and paragraphs
are numbered within a page the way the published citation style does it.

Copyright
---------
Works first published before 1930 are out of US copyright and are extracted by
default. Later works — mostly compilations the White Estate assembled after her
death, whose selection and arrangement carry their own copyright — are skipped
unless --include-in-copyright is passed. Publishing those on a public site is
republication rather than fair use, so the default is the safe one.

    python scripts/build_egw_lookup.py --list
    python scripts/build_egw_lookup.py --work GC
    python scripts/build_egw_lookup.py --all
"""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
import time
import urllib.request
import zipfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from egw_api import API_BASE, USER_AGENT, EgwApiError, access_token, api_get  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ROOT = REPO_ROOT / "EGW Writings Lookup"
INDEX_FILE = OUTPUT_ROOT / "_index.json"

# US copyright: works published before this year are public domain.
PUBLIC_DOMAIN_BEFORE = 1930

# Codes the site's own reference parser understands (assets/egw-refs.js).
# Extracting anything else would produce files nothing can link to.
WANTED_CODES = [
    "GC", "DA", "SC", "PP", "PK", "AA", "COL", "MH", "Ed", "EW", "MB",
    "Ev", "LDE", "Mar", "TM", "CD", "MM", "CH",
    *[f"{n}T" for n in range(1, 10)],
    *[f"{n}SM" for n in range(1, 4)],
]

# Headings carry no citable page text of their own.
PARAGRAPH_ELEMENTS = {"p", "blockquote", "li", "pre"}

_TAG_RE = re.compile(r"<[^>]+>")
_WS_RE = re.compile(r"\s+")


def clean(text: str) -> str:
    """API content is HTML fragments; the lookup stores plain text."""
    t = _TAG_RE.sub(" ", str(text or ""))
    t = (
        t.replace("&nbsp;", " ").replace("&amp;", "&").replace("&lt;", "<")
        .replace("&gt;", ">").replace("&quot;", '"').replace("&#39;", "'")
    )
    return _WS_RE.sub(" ", t).strip()


def download_archive(book_id: int, retries: int = 3) -> zipfile.ZipFile:
    """The API's bulk download: a zip of per-chapter JSON, one request per work."""
    url = f"{API_BASE}/content/books/{book_id}/download"
    last: Exception | None = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url)
            req.add_header("Authorization", f"Bearer {access_token()}")
            req.add_header("User-Agent", USER_AGENT)
            with urllib.request.urlopen(req, timeout=180) as resp:
                data = resp.read()
            if data[:2] != b"PK":
                raise EgwApiError(f"book {book_id}: download was not a zip archive")
            return zipfile.ZipFile(io.BytesIO(data))
        except Exception as err:  # noqa: BLE001 - retried, then surfaced
            last = err
            time.sleep(1.5 * (attempt + 1))
    raise EgwApiError(f"book {book_id}: download failed after {retries} attempts: {last}")


def safe_filename(name: str) -> str:
    cleaned = re.sub(r'[<>:"/\\|?*]', "-", clean(name))
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" .")
    return cleaned[:80] or "Untitled"


# ─────────────────────────────────────────────────────────────────
# Catalogue
# ─────────────────────────────────────────────────────────────────
def english_books() -> list[dict]:
    books, page = [], 1
    while True:
        data = api_get("/content/books", lang="en", limit=100, page=page)
        books.extend(data.get("results", []))
        if not data.get("next") or page > 20:
            break
        page += 1
    return books


def selected_works(include_in_copyright: bool) -> list[dict]:
    by_code: dict[str, dict] = {}
    for book in english_books():
        code = str(book.get("code") or "")
        if code in WANTED_CODES and code not in by_code:
            by_code[code] = book

    out = []
    for code in WANTED_CODES:
        book = by_code.get(code)
        if not book:
            continue
        try:
            year = int(str(book.get("pub_year") or "0")[:4])
        except ValueError:
            year = 0
        book["_year"] = year
        book["_public_domain"] = 0 < year < PUBLIC_DOMAIN_BEFORE
        if book["_public_domain"] or include_in_copyright:
            out.append(book)
    return out


# ─────────────────────────────────────────────────────────────────
# Extraction
# ─────────────────────────────────────────────────────────────────
def extract_work(book: dict, pause: float = 0.2) -> dict:
    """One work as {chapters: [...], pages: {page: {para: text}}}.

    Sourced from the API's own bulk download — GET /content/books/{id}/download
    returns a zip of per-chapter JSON keyed by para_id. The per-chapter REST
    endpoint is not usable for this: with an application-only token (client
    credentials, sub=0) it returns the same nine-paragraph preview whatever
    chapter is asked for, which silently produced fifteen identical files on
    the first run. The download gives the complete work in one request.
    """
    book_id = book["book_id"]
    code = str(book["code"])

    archive = download_archive(book_id)
    toc = json.loads(archive.read("toc.json")) if "toc.json" in archive.namelist() else []
    chapter_files = {n.rsplit(".json", 1)[0]: n
                     for n in archive.namelist() if n[:1].isdigit()}

    # Every chapter file in the archive is content, and the archive is the
    # authority on what exists. Filtering the table of contents by heading
    # level does not work: nesting differs per work — Steps to Christ puts its
    # chapters at level 1, Testimonies vol. 5 puts 91 of its 125 at level 2 —
    # so a level filter silently dropped most of the larger books.
    # The contents list is used only to order them and supply titles.
    titles = {str(t.get("para_id")): t for t in toc}
    ordered = [str(t.get("para_id")) for t in toc if str(t.get("para_id")) in chapter_files]
    seen = set(ordered)
    # Anything present in the archive but absent from the contents still gets
    # extracted, ordered by its numeric para_id.
    extra = sorted(
        (k for k in chapter_files if k not in seen),
        key=lambda k: [int(p) if p.isdigit() else 0 for p in k.split(".")],
    )
    chapters = [titles.get(k, {"para_id": k}) for k in [*ordered, *extra]]

    work = {
        "code": code,
        "title": clean(book.get("title")),
        "author": clean(book.get("author")),
        "pubYear": book.get("pub_year"),
        # Named "publishedPages", not "pages": the whole-work file also carries
        # a "pages" map of page -> paragraphs, and having one key mean both the
        # printed page count and the page map made a verification script print
        # the entire book where it meant to print a number.
        "publishedPages": book.get("npages"),
        "publicDomain": book["_public_domain"],
        "bookId": book_id,
        "chapters": [],
    }

    for index, entry in enumerate(chapters, start=1):
        para_id = entry.get("para_id")
        name = chapter_files.get(str(para_id))
        if not name:
            continue
        items = json.loads(archive.read(name))
        if isinstance(items, dict):
            items = items.get("results") or []

        pages: dict[str, dict[str, str]] = {}
        for item in items:
            if str(item.get("element_type") or "") not in PARAGRAPH_ELEMENTS:
                continue
            text = clean(item.get("content"))
            if not text:
                continue
            page = str(item.get("refcode_2") or "").strip()
            if not page:
                continue
            # refcode_3 is the paragraph number within the page — the ".2" of
            # "GC 434.2". Taken from the source rather than counted here, so
            # the keys match the published citation exactly.
            para = str(item.get("refcode_3") or "").strip()
            slot = pages.setdefault(page, {})
            slot[para or str(len(slot) + 1)] = text

        work["chapters"].append(
            {
                "number": index,
                "title": clean(entry.get("title")) or f"Chapter {index}",
                "refcode": clean(entry.get("refcode_short")),
                "paraId": para_id,
                "pages": pages,
            }
        )
    _ = pause
    return work


# ─────────────────────────────────────────────────────────────────
# Writing
# ─────────────────────────────────────────────────────────────────
def write_work(work: dict) -> dict:
    code = work["code"]
    work_dir = OUTPUT_ROOT / code
    chapter_dir = work_dir / f"{code}_chapters"
    chapter_dir.mkdir(parents=True, exist_ok=True)

    all_pages: dict[str, dict[str, str]] = {}
    chapter_index = []
    for chapter in work["chapters"]:
        payload = {
            code: {
                "code": code,
                "title": work["title"],
                "chapter": chapter["number"],
                "chapterTitle": chapter["title"],
                "refcode": chapter["refcode"],
                "pages": chapter["pages"],
            }
        }
        name = f"{chapter['number']:02d} - {safe_filename(chapter['title'])}.json"
        (chapter_dir / name).write_text(
            json.dumps(payload, ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
        )
        for page, paras in chapter["pages"].items():
            all_pages.setdefault(page, {}).update(paras)
        # First and last printed page in this chapter. The site uses these to
        # work out which single file to fetch for a citation like "GC 434",
        # so it never has to download a whole work to show one page.
        numeric_pages = sorted(int(p) for p in chapter["pages"] if str(p).isdigit())
        chapter_index.append(
            {
                "number": chapter["number"],
                "title": chapter["title"],
                "file": f"{code}/{code}_chapters/{name}",
                "first": numeric_pages[0] if numeric_pages else None,
                "last": numeric_pages[-1] if numeric_pages else None,
                "roman": sorted(p for p in chapter["pages"] if not str(p).isdigit()),
            }
        )

    # Whole-work file: convenient offline, too large to track. Mirrors the
    # Bible lookup, where the monolithic *_bible.json files are gitignored.
    (work_dir / f"{code}_book.json").write_text(
        json.dumps({code: {**{k: v for k, v in work.items() if k != "chapters"},
                           "pages": all_pages}}, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    numeric = [p for p in all_pages if p.isdigit()]
    return {
        "code": code,
        "title": work["title"],
        "author": work["author"],
        "pubYear": work["pubYear"],
        "publicDomain": work["publicDomain"],
        "chapters": chapter_index,
        "pageCount": len(all_pages),
        "firstPage": min(map(int, numeric)) if numeric else None,
        "lastPage": max(map(int, numeric)) if numeric else None,
        "paragraphs": sum(len(v) for v in all_pages.values()),
    }


def page_sort_key(page: str):
    return (0, int(page)) if str(page).isdigit() else (1, str(page))


# ─────────────────────────────────────────────────────────────────
def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--list", action="store_true", help="show available works")
    parser.add_argument("--work", metavar="CODE", help="extract one work, e.g. GC")
    parser.add_argument("--all", action="store_true", help="extract every eligible work")
    parser.add_argument(
        "--include-in-copyright",
        action="store_true",
        help="also extract works published from 1930 (compilations still in copyright)",
    )
    parser.add_argument(
        "--force", action="store_true", help="re-extract works already on disk"
    )
    args = parser.parse_args()

    try:
        works = selected_works(args.include_in_copyright)
    except EgwApiError as err:
        print(f"ERROR: {err}", file=sys.stderr)
        return 1

    if args.list or not (args.work or args.all):
        print(f"{'code':6} {'year':6} {'pages':>6}  {'status':16} title")
        for book in works:
            status = "public domain" if book["_public_domain"] else "IN COPYRIGHT"
            print(f"{book['code']:6} {str(book.get('pub_year')):6} "
                  f"{str(book.get('npages')):>6}  {status:16} {clean(book.get('title'))[:44]}")
        if not args.include_in_copyright:
            print("\nWorks published from 1930 are hidden; --include-in-copyright shows them.")
        return 0

    targets = [b for b in works if b["code"] == args.work] if args.work else works
    if not targets:
        print(f"No eligible work with code {args.work!r}. Try --list.", file=sys.stderr)
        return 1

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    index = json.loads(INDEX_FILE.read_text(encoding="utf-8")) if INDEX_FILE.exists() else {}

    # Resumable by default: a work already in the index with its chapter files
    # on disk is skipped. A long run can be interrupted, or re-run after a
    # network failure, without repeating the downloads that already succeeded.
    pending = []
    for book in targets:
        code = book["code"]
        done = code in index and (OUTPUT_ROOT / code / f"{code}_chapters").is_dir()
        if done and not args.force:
            print(f"  {code:5} already extracted, skipping "
                  f"({index[code].get('paragraphs', '?')} paragraphs)", flush=True)
            continue
        pending.append(book)

    started = time.time()
    failed: list[str] = []
    for position, book in enumerate(pending, start=1):
        code = book["code"]
        print(f"[{position}/{len(pending)}] {code:5} {clean(book.get('title'))[:42]} "
              f"({book.get('npages')} pages) …", flush=True)
        try:
            work = extract_work(book)
            summary = write_work(work)
        except Exception as err:  # noqa: BLE001 - one bad work must not stop the run
            failed.append(code)
            print(f"        FAILED: {str(err).splitlines()[0][:120]}", flush=True)
            continue
        index[code] = summary
        # Written after every work, so an interrupted run resumes accurately.
        INDEX_FILE.write_text(
            json.dumps(index, ensure_ascii=False, indent=1) + "\n", encoding="utf-8"
        )
        print(f"        {len(summary['chapters'])} chapters, "
              f"{summary['pageCount']} pages, {summary['paragraphs']} paragraphs "
              f"[{time.time() - started:.0f}s elapsed]", flush=True)

    print(f"\nDone. {len(index)} works in "
          f"{INDEX_FILE.relative_to(REPO_ROOT).as_posix()}, "
          f"{sum(v.get('paragraphs', 0) for v in index.values()):,} paragraphs total, "
          f"in {time.time() - started:.0f}s.", flush=True)
    if failed:
        print(f"FAILED ({len(failed)}): {', '.join(failed)} — re-run to retry.", flush=True)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
