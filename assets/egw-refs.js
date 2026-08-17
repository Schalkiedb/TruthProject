/* ══════════════════════════════════════════════════════════════
   EGW REFERENCE PARSER
   ──────────────────────────────────────────────────────────────
   Turns the ways this library actually cites Ellen White into one
   normalised reference:

     "The Great Controversy, p. 434"          -> GC 434
     "The Desire of Ages, ch. 68, p. 623"     -> DA 623   (ch. kept)
     "Testimonies for the Church, Vol. 1, p. 179" -> 1T 179
     "Selected Messages, Book 1, p. 126"      -> 1SM 126
     "3SM 191.2"                              -> 3SM 191.2

   EGW is cited by page and paragraph, not chapter and verse, so a
   reference is {code, page, paragraph} — the shape the lookup data
   is keyed on.

   Pure functions, no DOM: the ranking of what to link and the
   rendering live elsewhere, and the tests run this under node.
══════════════════════════════════════════════════════════════ */

/* Standard Ellen G. White reference codes. Multi-volume works are
   handled separately below, because their code carries the volume
   number as a prefix (Testimonies vol. 5 -> "5T"). */
const EGW_BOOKS = [
  { code: "GC",  title: "The Great Controversy",              match: /great controversy/i },
  { code: "DA",  title: "The Desire of Ages",                 match: /desire of ages/i },
  { code: "SC",  title: "Steps to Christ",                    match: /steps to christ/i },
  { code: "PP",  title: "Patriarchs and Prophets",            match: /patriarchs and prophets/i },
  { code: "PK",  title: "Prophets and Kings",                 match: /prophets and kings/i },
  { code: "AA",  title: "The Acts of the Apostles",           match: /acts of the apostles/i },
  { code: "COL", title: "Christ's Object Lessons",            match: /christ.s object lessons/i },
  { code: "MH",  title: "The Ministry of Healing",            match: /ministry of healing/i },
  { code: "Ed",  title: "Education",                          match: /\beducation\b/i },
  { code: "EW",  title: "Early Writings",                     match: /early writings/i },
  { code: "MB",  title: "Thoughts From the Mount of Blessing", match: /mount of blessing/i },
  { code: "Ev",  title: "Evangelism",                         match: /\bevangelism\b/i },
  { code: "LDE", title: "Last Day Events",                    match: /last day events/i },
  { code: "Mar", title: "Maranatha",                          match: /\bmaranatha\b/i },
  { code: "TM",  title: "Testimonies to Ministers",           match: /testimonies to ministers/i },
  { code: "CD",  title: "Counsels on Diet and Foods",         match: /counsels on diet/i },
  { code: "MM",  title: "Medical Ministry",                   match: /medical ministry/i },
  { code: "CH",  title: "Counsels on Health",                 match: /counsels on health/i },
];

/* Works whose code is "<volume><suffix>". The volume is mandatory:
   "Testimonies for the Church" with no volume is not a citation of a
   specific page and must not be linked to one. */
const EGW_VOLUME_WORKS = [
  { suffix: "T",  title: "Testimonies for the Church", match: /testimonies for the church/i },
  { suffix: "SM", title: "Selected Messages",          match: /selected messages/i },
  { suffix: "BC", title: "SDA Bible Commentary",       match: /bible commentary/i },
];

const EGW_CODE_SET = new Set([
  ...EGW_BOOKS.map((b) => b.code.toUpperCase()),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((n) =>
    EGW_VOLUME_WORKS.map((w) => `${n}${w.suffix}`.toUpperCase()),
  ),
]);

/* Codes are matched case-insensitively but reported in their canonical
   form — "Ed", not "ED". The published citation style is mixed-case and
   these strings are shown to readers. */
const EGW_CANONICAL_CODE = (() => {
  const map = new Map();
  for (const b of EGW_BOOKS) map.set(b.code.toUpperCase(), b.code);
  for (const w of EGW_VOLUME_WORKS) {
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      map.set(`${n}${w.suffix}`.toUpperCase(), `${n}${w.suffix}`);
    }
  }
  return map;
})();

const EGW_TITLE_BY_CODE = (() => {
  const map = new Map();
  for (const b of EGW_BOOKS) map.set(b.code.toUpperCase(), b.title);
  for (const w of EGW_VOLUME_WORKS) {
    for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      const label = w.suffix === "SM" ? "Book" : "Vol.";
      map.set(`${n}${w.suffix}`.toUpperCase(), `${w.title}, ${label} ${n}`);
    }
  }
  return map;
})();

/* Roman numerals turn up in older citations ("Vol. IV"). */
const ROMAN = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9 };
function volumeNumber(raw) {
  if (!raw) return null;
  const t = String(raw).trim().toLowerCase();
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  return ROMAN[t] || null;
}

/* ── Patterns ────────────────────────────────────────────────
   Written out rather than generated so each stays readable. */

// "3SM 191.2", "GC 434", "1T 179.3" — the compact form.
const CODE_REF = new RegExp(
  String.raw`\b(\d?[A-Za-z]{1,3})\s+(\d{1,4})(?:\.(\d{1,3}))?\b`,
  "g",
);

/* Codes that are also ordinary abbreviations. Left unguarded, "Mar 2026"
   reads as Maranatha page 2026 and "CD 500" as Counsels on Diet — a sweep of
   this site found 14 of 15 bare "Mar" matches were simply dates. For these,
   the compact form must carry a paragraph number ("Mar 199.2") to count; the
   spelled-out title ("Maranatha, p. 199") is unaffected and still matches. */
const EGW_AMBIGUOUS_CODES = new Set(["MAR", "ED", "EV", "CD", "CH", "MM", "MB"]);

// "Testimonies for the Church, Vol. 5, p. 200"
const VOLUME_REF = new RegExp(
  String.raw`(testimonies for the church|selected messages|bible commentary)` +
  String.raw`[,\s]*(?:vol(?:ume)?\.?|book)\s*([0-9]{1,2}|[ivx]{1,4})` +
  String.raw`[,\s]*(?:pp?\.?|pages?)\s*(\d{1,4})(?:\.(\d{1,3}))?`,
  "gi",
);

// "The Great Controversy, p. 434" / "The Desire of Ages, ch. 68, p. 623"
//
// The gap between title and page allows an optional chapter clause, because
// "ch. 68," contains a full stop and a blanket [^.] gap would reject it. The
// rest of the gap still bars full stops, which keeps the match from running
// across a sentence boundary and pairing a title with an unrelated page.
const TITLE_REF = new RegExp(
  String.raw`(great controversy|desire of ages|steps to christ|patriarchs and prophets|` +
  String.raw`prophets and kings|acts of the apostles|christ.s object lessons|ministry of healing|` +
  String.raw`early writings|mount of blessing|evangelism|last day events|maranatha|` +
  String.raw`testimonies to ministers|counsels on diet(?: and foods)?|medical ministry|` +
  String.raw`counsels on health|education)` +
  String.raw`(?:[,\s]*ch(?:ap(?:ter)?)?\.?\s*\d{1,3})?` +
  String.raw`[^.\n]{0,20}?(?:pp?\.?|pages?)\s*(\d{1,4})(?:\.(\d{1,3}))?`,
  "gi",
);

// A trailing "(paraphrased)" means the surrounding text is not a quotation.
const PARAPHRASE_NEAR = /\(\s*paraphrase[d]?\s*\)/i;

function lookupTitleCode(text) {
  for (const b of EGW_BOOKS) if (b.match.test(text)) return b.code;
  return null;
}

/** Normalised string form, e.g. "GC 434.2". */
function formatEgwReference(ref) {
  if (!ref) return "";
  return ref.paragraph
    ? `${ref.code} ${ref.page}.${ref.paragraph}`
    : `${ref.code} ${ref.page}`;
}

/** Full work title for a code, or the code itself if unknown. */
function egwWorkTitle(code) {
  return EGW_TITLE_BY_CODE.get(String(code).toUpperCase()) || String(code);
}

/**
 * Find every Ellen White reference in a string.
 *
 * Overlaps are resolved by preferring the longest match starting earliest,
 * so "Testimonies for the Church, Vol. 1, p. 179" is read as one reference
 * rather than as a bare "p. 179" plus a stray code.
 *
 * @returns {Array<{code,page,paragraph,volume,raw,start,end,paraphrased}>}
 */
function findEgwReferences(text) {
  const src = String(text || "");
  const found = [];

  const push = (start, end, code, page, paragraph, volume) => {
    if (!code) return;
    const upper = String(code).toUpperCase();
    if (!EGW_CODE_SET.has(upper)) return;
    const canonical = EGW_CANONICAL_CODE.get(upper) || upper;
    const page_ = parseInt(page, 10);
    if (!Number.isFinite(page_) || page_ < 1) return;
    // A "(paraphrased)" marker within the next 30 characters applies to
    // this citation — the site uses it to flag its own summaries.
    const tail = src.slice(end, end + 30);
    found.push({
      code: canonical,
      page: page_,
      paragraph: paragraph ? parseInt(paragraph, 10) : null,
      volume: volume || null,
      raw: src.slice(start, end),
      start,
      end,
      paraphrased: PARAPHRASE_NEAR.test(tail),
    });
  };

  let m;
  VOLUME_REF.lastIndex = 0;
  while ((m = VOLUME_REF.exec(src)) !== null) {
    const work = EGW_VOLUME_WORKS.find((w) => w.match.test(m[1]));
    const vol = volumeNumber(m[2]);
    if (work && vol) {
      push(m.index, m.index + m[0].length, `${vol}${work.suffix}`, m[3], m[4], vol);
    }
  }

  TITLE_REF.lastIndex = 0;
  while ((m = TITLE_REF.exec(src)) !== null) {
    push(m.index, m.index + m[0].length, lookupTitleCode(m[1]), m[2], m[3], null);
  }

  CODE_REF.lastIndex = 0;
  while ((m = CODE_REF.exec(src)) !== null) {
    const upper = String(m[1]).toUpperCase();
    // An ambiguous code in the bare form needs a paragraph number to be a
    // citation rather than a date or an abbreviation.
    if (EGW_AMBIGUOUS_CODES.has(upper) && !m[3]) continue;
    push(m.index, m.index + m[0].length, m[1], m[2], m[3], null);
  }

  // Drop any reference wholly contained inside another, keeping the longer.
  found.sort((a, b) => a.start - b.start || b.end - a.end);
  const kept = [];
  let reach = -1;
  for (const ref of found) {
    if (ref.start < reach) continue;
    kept.push(ref);
    reach = ref.end;
  }
  return kept;
}

/** Parse a single reference string, or null. */
function parseEgwReference(text) {
  const all = findEgwReferences(text);
  return all.length ? all[0] : null;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    EGW_BOOKS, EGW_VOLUME_WORKS, EGW_CODE_SET, EGW_TITLE_BY_CODE,
    findEgwReferences, parseEgwReference, formatEgwReference, egwWorkTitle,
  };
}
