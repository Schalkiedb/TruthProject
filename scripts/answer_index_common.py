"""Tokenisation shared by the index builder and, by mirror, assets/answer.js.

The browser must tokenise a query exactly the way the builder tokenised the
corpus, or a term will simply never match. Both implementations are written
from the spec below and pinned together by scripts/test_tokeniser.py, which
runs the JS through node and compares output token-for-token.

Spec
----
1. Unicode NFKD, drop combining marks (so "Patrologiæ"/"Coena" behave), lower.
2. Tokens are runs of [a-z0-9].
3. Drop tokens shorter than 2 characters, and drop STOPWORDS (tested on the
   raw token, before stemming).
4. Stem by applying three ordered rules — plural, verb/adverb suffix, trailing
   silent "e" — repeatedly until the word stops changing.

Why iterate to a fixed point
----------------------------
Applying the rules once splits words that mean the same thing:

    cleanse -> cleanse      cleansing -> cleans     (a query for one misses
    wicked  -> wick         wickedly  -> wicked      every passage using
    come    -> come         coming    -> com         the other)

Iterating converges all of them (cleanse/cleansing/cleansed -> clean,
wicked/wickedly -> wick, come/coming -> com). The rules only ever shorten a
word, so the loop terminates; the cap is belt and braces.

The result is aggressive — "decease" stems to "decea" — which is fine. A stem
is an internal bucket, never shown to the reader, and over-merging costs a
little precision while under-merging loses the passage altogether.
"""

from __future__ import annotations

import re
import unicodedata

# Deliberately small. An over-eager stopword list hurts a corpus like this one,
# where "day", "law", "man" and "one" are load-bearing doctrinal vocabulary.
STOPWORDS = frozenset(
    """
    a an and are as at be been being but by can could did do does for from had
    has have he her his if in into is it its me my no nor not of on or our so
    than that the their them then there these they this those to too us was we
    were what when which who whom will with would you your
    """.split()
)

_TOKEN_RE = re.compile(r"[a-z0-9]+")


def normalise(text: str) -> str:
    decomposed = unicodedata.normalize("NFKD", str(text))
    stripped = "".join(c for c in decomposed if not unicodedata.combining(c))
    return stripped.lower()


STEM_MAX_PASSES = 6


def _stem_once(w: str) -> str:
    # Rule 1 — plurals.
    if len(w) > 4 and w.endswith("ies"):
        w = w[:-3] + "y"
    elif len(w) > 4 and w.endswith("sses"):
        w = w[:-2]
    elif (
        len(w) > 3
        and w.endswith("s")
        and not w.endswith(("ss", "us", "is"))
    ):
        w = w[:-1]
    # Rule 2 — verb / adverb suffixes.
    if len(w) > 5 and w.endswith("ing"):
        w = w[:-3]
    elif len(w) > 4 and w.endswith("ed") and not w.endswith("eed"):
        w = w[:-2]
    elif len(w) > 5 and w.endswith("ly"):
        w = w[:-2]
    # Rule 3 — trailing silent "e", so "cleanse" reaches the same stem that
    # "cleansing" reaches after its "ing" is removed.
    if len(w) > 3 and w.endswith("e"):
        w = w[:-1]
    return w


def stem(word: str) -> str:
    w = word
    for _ in range(STEM_MAX_PASSES):
        nxt = _stem_once(w)
        if nxt == w:
            break
        w = nxt
    return w


def tokenise(text: str) -> list[str]:
    """Raw tokens, before stopword removal — used for phrase checks."""
    return _TOKEN_RE.findall(normalise(text))


def index_terms(text: str) -> list[str]:
    """The terms that actually enter the index."""
    return [
        stem(t)
        for t in tokenise(text)
        if len(t) > 1 and t not in STOPWORDS
    ]
