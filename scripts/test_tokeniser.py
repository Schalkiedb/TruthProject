"""Prove the Python and JavaScript tokenisers agree.

The index is built in Python and queried in JavaScript. If the two tokenisers
disagree on even one word, that word is silently unfindable — there is no error
anywhere, the passage just never comes back. So this compares them token for
token over the real corpus rather than a hand-picked fixture, which is where
the awkward input actually lives (æ ligatures, accents, Greek, em dashes,
ordinals, hyphenated compounds).

    python scripts/test_tokeniser.py
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from answer_index_common import index_terms, stem, tokenise  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[1]
ANSWER_JS = REPO_ROOT / "assets" / "answer.js"

# Deliberately nasty cases, checked in addition to the corpus sample.
EDGE_CASES = [
    "Patrologiæ cursus completus",
    "Café Cœur — naïve résumé",
    "The Church's own admissions: Rome & the Sabbath!",
    "blessings blessing blessed bless",
    "studies study studied studying",
    "classes class glasses glass",
    "holy holiness wholly",
    "1st 2nd 3rd 1844 A.D. 321",
    "seventh-day Sabbath-keeping",
    "Κυριακή ἡμέρα",
    "ROME    spoke\tloudly\nagain",
    "agreed freed seed deed",
    "buses bus busses",
    "",
    "a an the of",
]


def corpus_sample(limit_chars: int = 400_000) -> list[str]:
    """Real paragraphs from across the library."""
    out: list[str] = []
    used = 0
    for path in sorted(REPO_ROOT.glob("*.md")) + sorted(
        REPO_ROOT.glob("Study_guides/*.md")
    ):
        text = path.read_text(encoding="utf-8", errors="replace")
        for para in text.split("\n\n"):
            para = para.strip()
            if len(para) < 40:
                continue
            out.append(para)
            used += len(para)
            if used >= limit_chars:
                return out
    return out


def js_results(samples: list[str]) -> list[dict]:
    driver = f"""
const path = {json.dumps(str(ANSWER_JS))};
const m = require(path);
const samples = JSON.parse(require('fs').readFileSync(0, 'utf8'));
console.log(JSON.stringify(samples.map((s) => ({{
  tokens: m.answerTokenise(s),
  terms: m.answerTerms(s),
}}))));
"""
    proc = subprocess.run(
        ["node", "-e", driver],
        input=json.dumps(samples),
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    if proc.returncode != 0:
        raise SystemExit(f"node failed:\n{proc.stderr}")
    return json.loads(proc.stdout)


def main() -> int:
    samples = EDGE_CASES + corpus_sample()
    js = js_results(samples)

    token_mismatch = 0
    term_mismatch = 0
    shown = 0
    for sample, got in zip(samples, js):
        py_tokens = tokenise(sample)
        py_terms = index_terms(sample)
        if py_tokens != got["tokens"]:
            token_mismatch += 1
            if shown < 8:
                shown += 1
                diff = next(
                    (
                        (i, a, b)
                        for i, (a, b) in enumerate(zip(py_tokens, got["tokens"]))
                        if a != b
                    ),
                    (min(len(py_tokens), len(got["tokens"])), "<end>", "<end>"),
                )
                print(f"  TOKENS differ at {diff[0]}: py={diff[1]!r} js={diff[2]!r}")
                print(f"    input: {sample[:90]!r}")
        if py_terms != got["terms"]:
            term_mismatch += 1
            if shown < 8:
                shown += 1
                diff = next(
                    (
                        (i, a, b)
                        for i, (a, b) in enumerate(zip(py_terms, got["terms"]))
                        if a != b
                    ),
                    (min(len(py_terms), len(got["terms"])), "<end>", "<end>"),
                )
                print(f"  TERMS differ at {diff[0]}: py={diff[1]!r} js={diff[2]!r}")
                print(f"    input: {sample[:90]!r}")

    # Stemming must be idempotent, or a query term stems further than the
    # indexed term did and stops matching it.
    non_idempotent = [
        w for w in {t for s in samples for t in index_terms(s)} if stem(w) != w
    ]

    total_terms = sum(len(index_terms(s)) for s in samples)
    print(f"samples          : {len(samples)}")
    print(f"terms compared   : {total_terms:,}")
    print(f"token mismatches : {token_mismatch}")
    print(f"term mismatches  : {term_mismatch}")
    print(f"non-idempotent   : {len(non_idempotent)}"
          + (f"  e.g. {non_idempotent[:6]}" if non_idempotent else ""))

    ok = token_mismatch == 0 and term_mismatch == 0 and not non_idempotent
    print("\nPASS — tokenisers agree" if ok else "\nFAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
