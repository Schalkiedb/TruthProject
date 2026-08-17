/* ══════════════════════════════════════════════════════════════
   EGW LOOKUP — read the extracted writings
   ──────────────────────────────────────────────────────────────
   Reads "EGW Writings Lookup/" the way the Bible pill reads
   "Bible Translations Lookup/": straight from JSON on disk, no
   API key and no network service at run time.

   A citation names a work and a printed page ("GC 434"). The index
   records the page range of every chapter, so resolving a citation
   costs one small index fetch and then exactly one chapter file —
   never a whole book.

   Data access only; the reference parsing lives in egw-refs.js and
   the modal lives in app.js.
══════════════════════════════════════════════════════════════ */

const EGW_LOOKUP_ROOT = "EGW Writings Lookup";
const EGW_INDEX_URL = encodeURIComponent(EGW_LOOKUP_ROOT) + "/_index.json";

let _egwIndex = null;
let _egwIndexPromise = null;
const _egwChapterCache = new Map();

/** The catalogue: every extracted work, its chapters and their page ranges. */
async function loadEgwIndex(fetchImpl) {
  if (_egwIndex) return _egwIndex;
  if (_egwIndexPromise) return _egwIndexPromise;
  const doFetch = fetchImpl || (typeof fetch === "function" ? fetch : null);
  if (!doFetch) throw new Error("no fetch available");
  _egwIndexPromise = (async () => {
    const res = await doFetch(EGW_INDEX_URL);
    if (!res.ok) throw new Error(`EGW index ${res.status}`);
    _egwIndex = await res.json();
    return _egwIndex;
  })();
  try {
    return await _egwIndexPromise;
  } catch (err) {
    _egwIndexPromise = null; // allow a later retry
    throw err;
  }
}

/** True if this work was extracted. Compilations still in copyright are not. */
function egwHasWork(code, index) {
  const idx = index || _egwIndex;
  return !!(idx && idx[String(code)]);
}

/**
 * Which chapter file holds a given printed page.
 * @returns {{file:string, chapter:object, work:object}|null}
 */
function resolveEgwPage(code, page, index) {
  const idx = index || _egwIndex;
  if (!idx) return null;
  const work = idx[String(code)];
  if (!work) return null;
  const wanted = parseInt(page, 10);
  if (!Number.isFinite(wanted)) return null;

  for (const chapter of work.chapters || []) {
    const first = chapter.first;
    const last = chapter.last;
    if (first == null || last == null) continue;
    if (wanted >= first && wanted <= last) {
      return { file: chapter.file, chapter, work };
    }
  }
  return null;
}

/** Fetch and cache one chapter file. */
async function loadEgwChapter(relativePath, fetchImpl) {
  if (_egwChapterCache.has(relativePath)) return _egwChapterCache.get(relativePath);
  const doFetch = fetchImpl || (typeof fetch === "function" ? fetch : null);
  if (!doFetch) throw new Error("no fetch available");
  // The folder name contains spaces, so every segment is encoded — the same
  // treatment the Bible lookup gives its own path.
  const url = encodeURIComponent(EGW_LOOKUP_ROOT) + "/" +
    relativePath.split("/").map(encodeURIComponent).join("/");
  const res = await doFetch(url);
  if (!res.ok) throw new Error(`EGW chapter ${res.status}`);
  const data = await res.json();
  _egwChapterCache.set(relativePath, data);
  return data;
}

/**
 * The paragraphs printed on one page of one work.
 * @returns {{code,title,chapterTitle,chapterNumber,page,paragraphs:Array<{n,text}>}|null}
 */
async function fetchEgwPage(code, page, options) {
  const opts = options || {};
  const index = opts.index || (await loadEgwIndex(opts.fetch));
  const resolved = resolveEgwPage(code, page, index);
  if (!resolved) return null;

  const payload = await loadEgwChapter(resolved.file, opts.fetch);
  const body = payload && payload[String(code)];
  if (!body) return null;

  const pageKey = String(parseInt(page, 10));
  const paragraphs = body.pages && body.pages[pageKey];
  if (!paragraphs) return null;

  return {
    code: String(code),
    title: body.title || index[String(code)].title,
    chapterTitle: body.chapterTitle || "",
    chapterNumber: body.chapter,
    page: parseInt(page, 10),
    paragraphs: Object.keys(paragraphs)
      .sort((a, b) => (parseInt(a, 10) || 0) - (parseInt(b, 10) || 0))
      .map((n) => ({ n, text: paragraphs[n] })),
  };
}

/** Reader-facing citation, e.g. "The Great Controversy, p. 434". */
function egwCitationLabel(code, page, index) {
  const idx = index || _egwIndex;
  const work = idx && idx[String(code)];
  const title = work ? work.title : String(code);
  return `${title}, p. ${page}`;
}

/** Link to the same passage on the publisher's site. */
function egwExternalUrl(code, page) {
  return "https://text.egwwritings.org/search?query=" +
    encodeURIComponent(`${code} ${page}`);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    EGW_LOOKUP_ROOT, EGW_INDEX_URL,
    loadEgwIndex, egwHasWork, resolveEgwPage, loadEgwChapter,
    fetchEgwPage, egwCitationLabel, egwExternalUrl,
  };
}
