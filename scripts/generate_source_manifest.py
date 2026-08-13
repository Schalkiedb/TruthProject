from __future__ import annotations

import datetime as _dt
import json
import re
import urllib.parse
import xml.sax.saxutils as _xml
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = REPO_ROOT / "Supporting Documents"
SOURCE_OUTPUT_FILE = REPO_ROOT / "assets" / "source-documents-catholic.json"
INFOGRAPHICS_DIR = REPO_ROOT / "infographics"
INFOGRAPHICS_OUTPUT_FILE = REPO_ROOT / "assets" / "infographics-manifest.json"

# --- sitemap ----------------------------------------------------------------
# Every study is addressed as "?doc=<path>" (see parseDocHash in assets/app.js),
# which gives it a crawlable URL. Hash-fragment variants are not indexed as
# separate pages, so the sitemap must use the query form.
SITE_BASE_URL = "https://schalkiedb.github.io/TruthProject/"
APP_JS = REPO_ROOT / "assets" / "app.js"
SITEMAP_FILE = REPO_ROOT / "sitemap.xml"
ROBOTS_FILE = REPO_ROOT / "robots.txt"
# Registry entries that are generated in the browser rather than real files.
SITEMAP_SKIP_FILES = {"__scripture-index__"}
# Standalone pages that work as their own URL, outside the ?doc= router.
SITEMAP_EXTRA_PAGES = ["prophecy_map.html"]
SOURCE_SUPPORTED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".gif"}
INFOGRAPHICS_SUPPORTED_EXTENSIONS = {".html"}

# Source documents at or above this size are kept out of the repository to
# save Git space (GitHub's hard limit is 100 MB, but we cut well below it).
# They may still exist locally but must not enter the manifest; the site links
# to them via EXTERNAL_SOURCE_DOCS in assets/app.js, which points at the shared
# Google Drive folder. Keep .gitignore in step with this threshold.
SOURCE_MAX_BYTES = 60 * 1024 * 1024

# Named exclusions, applied on top of the size rule — for files that must stay
# out of the manifest regardless of how large they happen to be.
SOURCE_EXCLUDED_FILES: set[str] = set()


def collect_paths(
    directory: Path,
    extensions: set[str],
    max_bytes: int | None = None,
) -> list[str]:
    if not directory.exists():
        return []

    paths = [
        path.relative_to(REPO_ROOT).as_posix()
        for path in directory.rglob("*")
        if path.is_file()
        and path.suffix.lower() in extensions
        and path.name not in SOURCE_EXCLUDED_FILES
        and (max_bytes is None or path.stat().st_size < max_bytes)
    ]
    paths.sort(key=str.casefold)
    return paths


def write_manifest(output_file: Path, paths: list[str]) -> bool:
    content = json.dumps(paths, indent=2, ensure_ascii=False) + "\n"
    old_content = output_file.read_text(encoding="utf-8") if output_file.exists() else ""
    if old_content == content:
        return False

    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(content, encoding="utf-8")
    return True


def registry_files() -> list[str]:
    """Local document paths registered in assets/app.js."""
    app = APP_JS.read_text(encoding="utf-8")
    files = re.findall(r'^\s*file:\s*"([^"]+)"', app, re.M)
    out: list[str] = []
    for f in files:
        if f.startswith(("http://", "https://")) or f in SITEMAP_SKIP_FILES:
            continue
        if f not in out:
            out.append(f)
    return out


def build_sitemap() -> str:
    """Sitemap of the home page plus one crawlable ?doc= URL per study."""
    entries: list[tuple[str, str, str]] = []  # (loc, lastmod, priority)

    def add(loc: str, path: Path | None, priority: str) -> None:
        stamp = ""
        if path is not None and path.exists():
            stamp = _dt.datetime.fromtimestamp(
                path.stat().st_mtime, _dt.timezone.utc
            ).strftime("%Y-%m-%d")
        entries.append((loc, stamp, priority))

    add(SITE_BASE_URL, REPO_ROOT / "index.html", "1.0")
    for page in SITEMAP_EXTRA_PAGES:
        target = REPO_ROOT / page
        if target.exists():
            add(SITE_BASE_URL + urllib.parse.quote(page), target, "0.8")
    for rel in registry_files():
        target = REPO_ROOT / rel
        if not target.exists():
            continue
        add(SITE_BASE_URL + "?doc=" + urllib.parse.quote(rel, safe=""), target, "0.7")

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, stamp, priority in entries:
        lines.append("  <url>")
        lines.append(f"    <loc>{_xml.escape(loc)}</loc>")
        if stamp:
            lines.append(f"    <lastmod>{stamp}</lastmod>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def build_robots() -> str:
    return (
        "User-agent: *\n"
        "Allow: /\n"
        "\n"
        f"Sitemap: {SITE_BASE_URL}sitemap.xml\n"
    )


def write_text_if_changed(output_file: Path, content: str) -> bool:
    old = output_file.read_text(encoding="utf-8") if output_file.exists() else ""
    if old == content:
        return False
    output_file.write_text(content, encoding="utf-8")
    return True


def main() -> int:
    source_paths = collect_paths(
        SOURCE_DIR, SOURCE_SUPPORTED_EXTENSIONS, max_bytes=SOURCE_MAX_BYTES
    )
    source_changed = write_manifest(SOURCE_OUTPUT_FILE, source_paths)
    if source_changed:
        print(
            "Updated "
            f"{SOURCE_OUTPUT_FILE.relative_to(REPO_ROOT).as_posix()} "
            f"with {len(source_paths)} source entries."
        )
    else:
        print(
            "Manifest already up to date "
            f"({len(source_paths)} source entries): "
            f"{SOURCE_OUTPUT_FILE.relative_to(REPO_ROOT).as_posix()}"
        )

    infographic_paths = collect_paths(INFOGRAPHICS_DIR, INFOGRAPHICS_SUPPORTED_EXTENSIONS)
    infographics_changed = write_manifest(INFOGRAPHICS_OUTPUT_FILE, infographic_paths)
    if infographics_changed:
        print(
            "Updated "
            f"{INFOGRAPHICS_OUTPUT_FILE.relative_to(REPO_ROOT).as_posix()} "
            f"with {len(infographic_paths)} infographic entries."
        )
    else:
        print(
            "Manifest already up to date "
            f"({len(infographic_paths)} infographic entries): "
            f"{INFOGRAPHICS_OUTPUT_FILE.relative_to(REPO_ROOT).as_posix()}"
        )

    sitemap = build_sitemap()
    url_count = sitemap.count("<loc>")
    if write_text_if_changed(SITEMAP_FILE, sitemap):
        print(f"Updated sitemap.xml with {url_count} URLs.")
    else:
        print(f"sitemap.xml already up to date ({url_count} URLs).")

    if write_text_if_changed(ROBOTS_FILE, build_robots()):
        print("Updated robots.txt.")
    else:
        print("robots.txt already up to date.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
