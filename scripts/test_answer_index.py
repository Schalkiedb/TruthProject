"""Check that every anchor in the answer index exists on the rendered page.

A result card whose link lands at the top of a megabyte-long study instead of
on the passage is nearly as bad as no result at all, and nothing else would
catch it: the index builds, the ranking is fine, the link is well-formed, and
the reader just arrives in the wrong place.

So this renders each document exactly as the browser does — through the real
marked build, with the custom renderer.heading and slugify() lifted out of
assets/app.js — and confirms the anchors the builder emitted are ids that
actually appear.

    python scripts/test_answer_index.py
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
INDEX_FILE = REPO_ROOT / "assets" / "answer-index.json"

# Renders every markdown document the way the SPA does and reports, per file,
# the heading ids the browser will contain.
NODE_DRIVER = r"""
const fs = require("fs");
const REPO = process.argv[1];
const marked = require(REPO + "/assets/vendor/marked/marked.min.js");
const src = fs.readFileSync(REPO + "/assets/app.js", "utf8").replace(/\r\n/g, "\n");

// Lift decodeEntities + slugify straight out of app.js so this cannot drift.
const start = src.indexOf("function decodeEntities");
const end = src.indexOf("\n}", src.indexOf("function slugify")) + 2;
if (start < 0 || end < 2) { console.error("could not locate slugify in app.js"); process.exit(2); }

// decodeEntities uses a <textarea>: innerHTML in, decoded text out via .value.
const document = { createElement: () => ({
  set innerHTML(v) {
    this._d = String(v)
      .replace(/&#(\d+);/g, (m, d) => String.fromCharCode(+d))
      .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  },
  get value() { return this._d; },
}) };
const { slugify } = new Function("document", src.slice(start, end) + "\nreturn { slugify };")(document);

// The same renderer.heading override initMarked() installs.
const renderer = new marked.Renderer();
renderer.heading = function (token) {
  let text, level;
  if (token && typeof token === "object" && "text" in token) { text = token.text; level = token.depth; }
  else { text = token; level = arguments[1]; }
  return `<h${level} id="${slugify(String(text).replace(/<[^>]+>/g, ""))}">${text}</h${level}>\n`;
};
marked.use({ renderer, breaks: true, gfm: true });

const files = JSON.parse(fs.readFileSync(0, "utf8"));
const out = {};
for (const rel of files) {
  const abs = REPO + "/" + rel;
  if (!fs.existsSync(abs)) continue;
  const html = marked.parse(fs.readFileSync(abs, "utf8"));
  out[rel] = [...html.matchAll(/<h[1-6] id="([^"]*)"/g)].map((m) => m[1]);
}
console.log(JSON.stringify(out));
"""


def main() -> int:
    if not INDEX_FILE.exists():
        print("assets/answer-index.json missing — run scripts/build_answer_index.py")
        return 1
    index = json.loads(INDEX_FILE.read_text(encoding="utf-8"))

    # Group the index's anchors by document, keeping prose and entries apart:
    # heading ids come from marked, entry ids are added later by
    # annotateEntryAnchors() and so cannot be checked against rendered HTML.
    prose: dict[str, set[str]] = {}
    entries: dict[str, set[str]] = {}
    for passage in index["passages"]:
        rel = index["files"][passage[0]]["p"]
        anchor = index["anchors"][passage[1]]
        if not anchor or not rel.endswith(".md"):
            continue
        bucket = entries if passage[4] else prose
        bucket.setdefault(rel, set()).add(anchor)

    targets = sorted(set(prose) | set(entries))
    proc = subprocess.run(
        ["node", "-e", NODE_DRIVER, str(REPO_ROOT.as_posix())],
        input=json.dumps(targets),
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if proc.returncode != 0:
        print(f"node failed:\n{proc.stderr}")
        return 1
    rendered = json.loads(proc.stdout)

    checked = 0
    missing: list[str] = []
    for rel, anchors in prose.items():
        ids = set(rendered.get(rel, []))
        for anchor in sorted(anchors):
            checked += 1
            if anchor not in ids:
                missing.append(f"{rel}#{anchor}")

    # Entry anchors must at least be well-formed; annotateEntryAnchors builds
    # them as "<prefix>-<number>" with an optional collision suffix.
    malformed = [
        f"{rel}#{a}"
        for rel, anchors in entries.items()
        for a in sorted(anchors)
        if not __import__("re").fullmatch(r"[a-z][a-z0-9]*-\d+(-\d+)?", a)
    ]
    entry_count = sum(len(a) for a in entries.values())

    print(f"documents rendered      : {len(rendered)}")
    print(f"prose anchors checked   : {checked}")
    print(f"  not on the page       : {len(missing)}")
    for item in missing[:10]:
        print(f"      {item}")
    print(f"entry anchors checked   : {entry_count}")
    print(f"  malformed             : {len(malformed)}")
    for item in malformed[:10]:
        print(f"      {item}")

    ok = not missing and not malformed
    print("\nPASS — every anchor resolves" if ok else "\nFAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
