/* ══════════════════════════════════════════════════════════════
   ANSWER ENGINE — retrieval over the library, no language model
   ──────────────────────────────────────────────────────────────
   A question is answered by finding the passages that already say
   the answer and showing them verbatim, with their citation and a
   link into the document. Nothing here generates prose, so nothing
   here can put a sentence in the author's mouth that no source
   supports — the failure mode is "I could not find that", never a
   plausible invention.

   Pure functions only: no DOM, no fetch beyond loading the index.
   The rendering lives in app.js and the tests run this in node.
══════════════════════════════════════════════════════════════ */

const ANSWER_INDEX_URL = "assets/answer-index.json";

/* ── Tokenisation ────────────────────────────────────────────
   Mirror of scripts/answer_index_common.py. If these two drift a
   term silently stops matching, so scripts/test_tokeniser.py runs
   both over the same fixture and compares token for token. */

const ANSWER_STOPWORDS = new Set(
  ("a an and are as at be been being but by can could did do does for from had " +
   "has have he her his if in into is it its me my no nor not of on or our so " +
   "than that the their them then there these they this those to too us was we " +
   "were what when which who whom will with would you your").split(" "),
);

function answerNormalise(text) {
  // NFKD + strip combining marks, so "Patrologiæ" and "Coena" behave.
  // \p{M} is written as an escape rather than a literal character range so the
  // file survives any re-encoding — the marks themselves are invisible in an
  // editor and a mangled range would silently stop stripping accents.
  return String(text)
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

const STEM_MAX_PASSES = 6;

function stemOnce(word) {
  let w = word;
  // Rule 1 — plurals.
  if (w.length > 4 && w.endsWith("ies")) w = w.slice(0, -3) + "y";
  else if (w.length > 4 && w.endsWith("sses")) w = w.slice(0, -2);
  else if (
    w.length > 3 &&
    w.endsWith("s") &&
    !w.endsWith("ss") && !w.endsWith("us") && !w.endsWith("is")
  ) w = w.slice(0, -1);
  // Rule 2 — verb / adverb suffixes.
  if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("ed") && !w.endsWith("eed")) w = w.slice(0, -2);
  else if (w.length > 5 && w.endsWith("ly")) w = w.slice(0, -2);
  // Rule 3 — trailing silent "e".
  if (w.length > 3 && w.endsWith("e")) w = w.slice(0, -1);
  return w;
}

/**
 * Stem to a fixed point. Applying the rules once splits words that mean the
 * same thing — "cleanse" stays whole while "cleansing" becomes "cleans", so a
 * query for one misses every passage that uses the other. Iterating converges
 * them (both reach "clean"). The rules only shorten, so this terminates; the
 * cap is belt and braces. See scripts/answer_index_common.py for the spec.
 */
function answerStem(word) {
  let w = word;
  for (let i = 0; i < STEM_MAX_PASSES; i++) {
    const next = stemOnce(w);
    if (next === w) break;
    w = next;
  }
  return w;
}

function answerTokenise(text) {
  return answerNormalise(text).match(/[a-z0-9]+/g) || [];
}

function answerTerms(text) {
  const out = [];
  for (const t of answerTokenise(text)) {
    if (t.length > 1 && !ANSWER_STOPWORDS.has(t)) out.push(answerStem(t));
  }
  return out;
}

/* ── Query expansion ─────────────────────────────────────────
   Readers ask in their own vocabulary — "who moved the Sabbath to
   Sunday" — while the sources use theirs: "the Lord's day", "the
   first day of the week", "dies dominica". Without this bridge the
   best passages in the library simply never surface. Expanded terms
   carry less weight than the words actually typed. */

const ANSWER_EXPANSIONS = {
  sabbath: ["seventh day", "saturday", "fourth commandment"],
  saturday: ["sabbath", "seventh day"],
  sunday: ["lord's day", "first day of the week", "dies dominica"],
  pope: ["papacy", "pontiff", "bishop of rome", "holy see"],
  papacy: ["pope", "pontiff", "roman church", "see of rome"],
  catholic: ["roman church", "rome", "papal"],
  protestant: ["reformed", "reformation", "evangelical"],
  change: ["transfer", "altered", "substituted", "abolished"],
  changed: ["transfer", "altered", "substituted"],
  authority: ["power", "warrant", "sanction"],
  beast: ["antichrist", "little horn", "man of sin"],
  mark: ["seal", "sign", "token"],
  law: ["commandment", "decalogue", "ten commandments"],
  commandment: ["law", "decalogue", "precept"],
  prophecy: ["prophetic", "vision", "fulfilment"],
  babylon: ["mystery babylon", "harlot", "confusion"],
  church: ["ecclesiastical", "congregation"],
  scripture: ["bible", "written word", "holy writ"],
  bible: ["scripture", "written word"],
  tradition: ["custom", "unwritten"],
  proof: ["evidence", "warrant", "authority"],
  admit: ["acknowledge", "confess", "concede"],
  worship: ["adoration", "reverence", "service"],
  health: ["diet", "temperance", "body"],
  diet: ["food", "health", "eating"],
  ellen: ["white", "spirit of prophecy", "messenger"],
  white: ["ellen", "spirit of prophecy"],
  investigative: ["judgment", "sanctuary", "1844"],
  sanctuary: ["most holy", "atonement", "1844"],
  state: ["condition"],
  dead: ["death", "sleep", "immortality"],
  hell: ["lake of fire", "destruction", "punishment"],
  second: ["advent", "coming", "return"],
  coming: ["advent", "second coming", "return"],
};

/** Stemmed term → Map(stemmedExpansion → weight). Built once. */
let _expansionMap = null;
function answerExpansionMap() {
  if (_expansionMap) return _expansionMap;
  _expansionMap = new Map();
  for (const [raw, additions] of Object.entries(ANSWER_EXPANSIONS)) {
    const key = answerStem(raw);
    const bucket = _expansionMap.get(key) || new Map();
    for (const phrase of additions) {
      for (const term of answerTerms(phrase)) {
        if (term !== key) bucket.set(term, 0.5);
      }
    }
    _expansionMap.set(key, bucket);
  }
  return _expansionMap;
}

/**
 * Weighted query terms. Typed words weigh 1; expansions weigh less, and
 * never overwrite a word the reader actually typed.
 */
function buildQuery(text) {
  const typed = answerTerms(text);
  const weights = new Map();
  for (const t of typed) weights.set(t, 1);
  const expansions = answerExpansionMap();
  for (const t of typed) {
    const bucket = expansions.get(t);
    if (!bucket) continue;
    for (const [term, weight] of bucket) {
      if (!weights.has(term)) weights.set(term, weight);
    }
  }
  return { typed: [...new Set(typed)], weights };
}

/* ── Index loading ───────────────────────────────────────────── */

let _answerIndex = null;
let _answerIndexPromise = null;

/** Undo the builder's delta encoding into term → Map(passageId → tf). */
function decodePostings(postings) {
  const decoded = new Map();
  for (const term in postings) {
    const flat = postings[term];
    const entries = new Map();
    let pid = 0;
    for (let i = 0; i < flat.length; i += 2) {
      pid += flat[i];
      entries.set(pid, flat[i + 1]);
    }
    decoded.set(term, entries);
  }
  return decoded;
}

async function loadAnswerIndex(fetchImpl) {
  if (_answerIndex) return _answerIndex;
  if (_answerIndexPromise) return _answerIndexPromise;
  const doFetch = fetchImpl || (typeof fetch === "function" ? fetch : null);
  if (!doFetch) throw new Error("no fetch available");
  _answerIndexPromise = (async () => {
    const res = await doFetch(ANSWER_INDEX_URL);
    if (!res.ok) throw new Error(`answer index ${res.status}`);
    const raw = await res.json();
    _answerIndex = {
      ...raw,
      postingsByTerm: decodePostings(raw.postings),
    };
    delete _answerIndex.postings;
    return _answerIndex;
  })();
  try {
    return await _answerIndexPromise;
  } catch (err) {
    _answerIndexPromise = null; // let a later attempt retry
    throw err;
  }
}

function setAnswerIndexForTest(raw) {
  _answerIndex = { ...raw, postingsByTerm: decodePostings(raw.postings) };
  delete _answerIndex.postings;
  return _answerIndex;
}

/* ── Ranking ─────────────────────────────────────────────────── */

const BM25_K1 = 1.2;
const BM25_B = 0.75;
// A numbered entry is the unit a reader cites and shares, so it edges out an
// equally-scoring run of prose. Small on purpose — this must not let a weak
// entry beat a strong paragraph.
const ENTRY_BOOST = 1.08;

/**
 * Rank passages against a question.
 * @returns {{results: Array, query: object, matchedTerms: string[]}}
 */
function rankAnswers(question, options) {
  const opts = options || {};
  const limit = opts.limit || 12;
  const perDocument = opts.perDocument || 3;
  const index = opts.index || _answerIndex;
  if (!index) throw new Error("answer index not loaded");

  const query = buildQuery(question);
  if (!query.weights.size) return { results: [], query, matchedTerms: [] };

  const N = index.passages.length;
  const avgLen = index.avgLen || 1;
  const scores = new Map();   // pid → accumulated BM25
  const hits = new Map();     // pid → Set(typed terms matched)
  const matchedTerms = [];

  for (const [term, weight] of query.weights) {
    const postings = index.postingsByTerm.get(term);
    if (!postings) continue;
    const df = postings.size;
    // A term in almost every passage carries no signal; skip it rather than
    // let its tiny IDF still tilt the ranking through sheer frequency.
    if (df > N * 0.5) continue;
    if (weight === 1) matchedTerms.push(term);
    const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
    const isTyped = query.typed.includes(term);
    for (const [pid, tf] of postings) {
      const len = index.passages[pid][3] || 1;
      const norm = tf * (BM25_K1 + 1) /
        (tf + BM25_K1 * (1 - BM25_B + BM25_B * (len / avgLen)));
      scores.set(pid, (scores.get(pid) || 0) + idf * norm * weight);
      if (isTyped) {
        let set = hits.get(pid);
        if (!set) { set = new Set(); hits.set(pid, set); }
        set.add(term);
      }
    }
  }
  if (!scores.size) return { results: [], query, matchedTerms: [] };

  const phrase = answerNormalise(question).replace(/[^a-z0-9]+/g, " ").trim();
  const typedCount = query.typed.length || 1;

  const scored = [];
  for (const [pid, base] of scores) {
    const passage = index.passages[pid];
    const covered = (hits.get(pid) || new Set()).size;
    // Coverage matters more than raw frequency: a passage mentioning every
    // word of the question once beats one repeating a single word ten times.
    let score = base * Math.pow(covered / typedCount, 0.75);
    if (passage[4]) score *= ENTRY_BOOST;

    const preview = passage[5] || "";
    const heading = index.headings[passage[2]] || "";
    const title = (index.files[passage[0]] || {}).t || "";
    const flatPreview = answerNormalise(preview).replace(/[^a-z0-9]+/g, " ");
    if (phrase.length > 8 && flatPreview.includes(phrase)) score *= 1.6;
    const inHeading = answerTerms(heading + " " + title)
      .filter((t) => query.typed.includes(t)).length;
    if (inHeading) score *= 1 + Math.min(inHeading, 3) * 0.12;

    scored.push({ pid, score, covered });
  }
  scored.sort((a, b) => b.score - a.score || a.pid - b.pid);

  // Spread results across documents. One long study should not own every
  // slot just because it is long enough to mention everything.
  const perDoc = new Map();
  const results = [];
  for (const item of scored) {
    if (results.length >= limit) break;
    const passage = index.passages[item.pid];
    const fileIdx = passage[0];
    const used = perDoc.get(fileIdx) || 0;
    if (used >= perDocument) continue;
    perDoc.set(fileIdx, used + 1);
    const file = index.files[fileIdx] || {};
    results.push({
      id: item.pid,
      score: item.score,
      covered: item.covered,
      coverage: item.covered / typedCount,
      file: file.p || "",
      title: file.t || "",
      section: file.s || "",
      heading: index.headings[passage[2]] || "",
      anchor: index.anchors[passage[1]] || "",
      isEntry: !!passage[4],
      text: passage[5] || "",
    });
  }
  return { results, query, matchedTerms };
}

/**
 * Which typed words found nothing anywhere in the library. Shown to the
 * reader so a nil result is explainable rather than mysterious.
 */
function unmatchedTerms(question, index) {
  const idx = index || _answerIndex;
  if (!idx) return [];
  const seen = new Set();
  const out = [];
  for (const raw of answerTokenise(question)) {
    if (raw.length < 2 || ANSWER_STOPWORDS.has(raw)) continue;
    const stemmed = answerStem(raw);
    if (seen.has(stemmed)) continue;
    seen.add(stemmed);
    if (!idx.postingsByTerm.has(stemmed)) out.push(raw);
  }
  return out;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ANSWER_INDEX_URL, ANSWER_STOPWORDS, ANSWER_EXPANSIONS,
    answerNormalise, answerStem, answerTokenise, answerTerms,
    buildQuery, decodePostings, loadAnswerIndex, setAnswerIndexForTest,
    rankAnswers, unmatchedTerms,
  };
}
