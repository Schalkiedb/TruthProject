/* ══════════════════════════════════════════════════════════════
   Babylon's Wine — Service Worker (Offline Support)
   Network-first for the app shell (index.html, app.js, style.css) and for
   .md/.json study text, so a deploy is picked up as soon as the reader is
   online. Cache-first for published scripture and Ellen White text, which
   never changes. Heavy assets (PDFs, images, vendor libraries) use
   stale-while-revalidate.

   NOTE: the "?v=" query strings on app.js and style.css in index.html are the
   real cache key. Leaving them unchanged across a deploy lets a device keep an
   old copy under the same URL — bump them whenever those files change.
══════════════════════════════════════════════════════════════ */

/* Bump this on every change to index.html, assets/app.js or assets/style.css.
   The cache is served before the network, so a returning reader keeps running
   the previous build until the name changes — fixes that are deployed but not
   bumped simply never reach them. */
const CACHE_NAME = "babylons-wine-v18";

/* Published text — Bible translations and Ellen White chapters — is held in a
   second, deliberately unversioned cache. It used to live in CACHE_NAME, which
   activate() deletes on every bump: a reader who had downloaded a few hundred
   megabytes of scripture lost all of it to a one-line CSS fix. Nothing here is
   ever revalidated, so if a generation bug ever needs flushing, rename this
   constant — that is the only thing that clears it. */
const IMMUTABLE_CACHE = "babylons-wine-immutable-v1";

/* Same-origin paths holding that published text. */
const IMMUTABLE_PATHS = [
  /\/Bible%20Translations%20Lookup\/|\/Bible Translations Lookup\//,
  /\/EGW%20Writings%20Lookup\/|\/EGW Writings Lookup\//,
];

const PRECACHE_URLS = [
  "./index.html",
  "./assets/style.css",
  "./assets/app.js",
  "./assets/print-responsive.css",
  "./assets/infographics-theme.css",
  "./assets/videos.json",
  "./assets/infographics-manifest.json",
  "./assets/source-documents-catholic.json",
  // Interactive tools + self-hosted map libraries (offline-capable
  // except the online basemap tiles).
  "./prophecy_map.html",
  "./assets/live-events.js",
  "./assets/vendor/leaflet/leaflet.css",
  "./assets/vendor/leaflet/leaflet.js",
  "./assets/vendor/markercluster/MarkerCluster.css",
  "./assets/vendor/markercluster/MarkerCluster.Default.css",
  "./assets/vendor/markercluster/leaflet.markercluster.js",
  "./assets/vendor/d3/d3.min.js",
  "./assets/vendor/d3/topojson.min.js",
  "./assets/vendor/d3/countries-110m.json",
  // Markdown pipeline — self-hosted so documents render offline.
  "./assets/vendor/marked/marked.min.js",
  "./assets/vendor/dompurify/purify.min.js",
  // Ask the Library. The ranking code is precached because it is small; the
  // index it reads (assets/answer-index.json, ~6 MB) deliberately is not —
  // downloading that on install would charge every visitor for a feature they
  // may never open. It is cached on first use instead, by the
  // stale-while-revalidate branch of the fetch handler.
  "./assets/answer.js",
  // Ellen White citation lookup. As with the answer index, the code is
  // precached but the data under "EGW Writings Lookup/" is not — it is
  // fetched one chapter at a time, only when a citation is opened, and then
  // kept in IMMUTABLE_CACHE.
  "./assets/egw-refs.js",
  "./assets/egw-lookup.js",
];

/* NB: the entries above are listed at their bare paths, while the pages
   request several of them with a "?v=" query string. That is intentional — it
   keeps the version stamps in one place, index.html — but it means an exact
   cache lookup misses. The fetch handler retries with { ignoreSearch: true }
   once the network is known to be unavailable. */

/* ── Install — precache the app shell ──────────────────────── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

/* ── Activate — clean up old versioned caches ─────────────── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME && name !== IMMUTABLE_CACHE)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

/* ── Offline fallback ─────────────────────────────────────────
   A page gets the offline notice. Anything else — a script, a stylesheet, a
   JSON fetch — must get an actual failure: handing a script tag a document of
   HTML makes the browser try to execute it, and the caller sees a parse error
   instead of "you are offline". */
function offlineResponse(request) {
  if (request.mode === "navigate") {
    return new Response(
      "<html><body style='background:#0c0f1a;color:#e6c04c;font-family:Georgia,serif;text-align:center;padding:60px 20px'>" +
      "<h1>✦ Offline</h1><p>You are offline and this page has not been cached yet. Please reconnect to the internet.</p></body></html>",
      { headers: { "Content-Type": "text/html" } }
    );
  }
  return new Response("Offline and not cached.", {
    status: 503,
    statusText: "Offline",
    headers: { "Content-Type": "text/plain" },
  });
}

/* ── Fetch ────────────────────────────────────────────────── */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache same-origin requests
  if (url.origin !== location.origin) return;

  // Skip POST, etc.
  if (event.request.method !== "GET") return;

  // Published Bible translations and Ellen White chapters are fixed text —
  // once fetched they never change, so serve them cache-first out of the
  // unversioned cache. Verse and citation lookups stay instant and work
  // offline instead of paying a network round trip per book or chapter.
  if (IMMUTABLE_PATHS.some((re) => re.test(url.pathname))) {
    event.respondWith(
      caches.open(IMMUTABLE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        try {
          const response = await fetch(event.request);
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        } catch {
          return offlineResponse(event.request);
        }
      })
    );
    return;
  }

  // App shell (HTML/JS/CSS) AND study text (.md/.json): network-first so a new
  // deploy is picked up immediately; the cache is only used when offline.
  // Prevents version skew — e.g. a stale document whose links point at files
  // that were renamed in the same deploy.
  //
  // answer-index.json is deliberately exempt. It is 6 MB, and network-first
  // meant every session that opened Ask the Library downloaded the whole thing
  // again. It falls through to stale-while-revalidate below, which serves the
  // cached copy at once and picks up a rebuilt index on the following visit.
  const isShell =
    event.request.mode === "navigate" ||
    /\/assets\/(app\.js|style\.css|print-responsive\.css)/.test(url.pathname) ||
    (/\.(md|json)$/i.test(url.pathname) &&
      !/\/assets\/answer-index\.json$/i.test(url.pathname));

  if (isShell) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(event.request);
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        } catch {
          const cached = await cache.match(event.request, { ignoreSearch: true });
          if (cached) return cached;
          return offlineResponse(event.request);
        }
      })
    );
    return;
  }

  // Everything else — PDFs, images, vendor libraries, the answer index:
  // stale-while-revalidate.
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);

      const networkPromise = fetch(event.request)
        .then((response) => {
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => null);

      // Serve the cached copy at once and refresh in the background. waitUntil
      // keeps the worker alive for that refresh — without it the browser is
      // free to shut us down the moment the cached response is returned, and
      // the revalidation silently never happens.
      if (cached) {
        event.waitUntil(networkPromise);
        return cached;
      }

      const networkResponse = await networkPromise;
      if (networkResponse) return networkResponse;

      // Offline with no exact hit. The precache stores these files at their
      // bare paths ("./assets/answer.js"), but the pages request them with a
      // cache-busting query ("assets/answer.js?v=20260821a"), so an exact
      // match misses and Ask the Library, the Ellen White lookup and the
      // prophecy map's data layer all failed offline. Retry ignoring the query
      // string. Only on this path, after the network is known to be gone:
      // doing it up front would let a stale "?v=" copy outrank a fresh one.
      const looseMatch = await cache.match(event.request, { ignoreSearch: true });
      if (looseMatch) return looseMatch;

      return offlineResponse(event.request);
    })
  );
});
