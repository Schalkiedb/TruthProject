from __future__ import annotations

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = REPO_ROOT / "Supporting Documents"
SOURCE_OUTPUT_FILE = REPO_ROOT / "assets" / "source-documents-catholic.json"
INFOGRAPHICS_DIR = REPO_ROOT / "infographics"
INFOGRAPHICS_OUTPUT_FILE = REPO_ROOT / "assets" / "infographics-manifest.json"
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

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
