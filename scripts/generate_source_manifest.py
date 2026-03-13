from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = REPO_ROOT / "Supporting Documents"
OUTPUT_FILE = REPO_ROOT / "assets" / "source-documents-catholic.json"


def collect_pdf_paths() -> list[str]:
    if not SOURCE_DIR.exists():
        return []

    pdfs = [
        path.relative_to(REPO_ROOT).as_posix()
        for path in SOURCE_DIR.rglob("*.pdf")
        if path.is_file()
    ]
    pdfs.sort(key=str.casefold)
    return pdfs


def write_manifest(paths: list[str]) -> bool:
    content = json.dumps(paths, indent=2, ensure_ascii=False) + "\n"
    old_content = OUTPUT_FILE.read_text(encoding="utf-8") if OUTPUT_FILE.exists() else ""
    if old_content == content:
        return False

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(content, encoding="utf-8")
    return True


def main() -> int:
    pdfs = collect_pdf_paths()
    changed = write_manifest(pdfs)
    if changed:
        print(f"Updated {OUTPUT_FILE.relative_to(REPO_ROOT).as_posix()} with {len(pdfs)} PDF entries.")
    else:
        print(f"Manifest already up to date ({len(pdfs)} PDF entries).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
