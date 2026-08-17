/* ══════════════════════════════════════════════════════════════
   Babylon's Wine — Service Worker (Offline Support)
   Cache-first for static assets, network-first for documents.
══════════════════════════════════════════════════════════════ */

/* Bump this on every change to index.html, assets/app.js or assets/style.css.
   The cache is served before the network, so a returning reader keeps running
   the previous build until the name changes — fixes that are deployed but not
   bumped simply never reach them. */
const CACHE_NAME = "babylons-wine-v11";

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
  // index it reads (assets/answer-index.json, several megabytes) deliberately
  // is not — downloading that on install would charge every visitor for a
  // feature they may never open. It is cached on first use instead.
  "./assets/answer.js",
  // Ellen White citation lookup. As with the answer index, the code is
  // precached but the data under "EGW Writings Lookup/" is not — it is
  // fetched one chapter at a time, only when a citation is opened.
  "./assets/egw-refs.js",
  "./assets/egw-lookup.js",
];

/* ── Install — precache the app shell ──────────────────────── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

/* ── Activate — clean up old caches ───────────────────────── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

/* ── Fetch — stale-while-revalidate for most requests ──────── */
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only cache same-origin requests
  if (url.origin !== location.origin) return;

  // Skip POST, etc.
  if (event.request.method !== "GET") return;

  // Bible translation JSON is immutable scripture text — once fetched it never
  // changes, so serve it cache-first. This keeps verse lookups instant and
  // works offline, instead of paying a network round trip per book.
  if (/\/Bible%20Translations%20Lookup\/|\/Bible Translations Lookup\//.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      })
    );
    return;
  }

  // App shell (HTML/JS/CSS) AND text content (.md/.json): network-first
  // so a new deploy is picked up immediately; the cache is only used when
  // offline. Prevents version skew — e.g. a stale document whose links
  // point at files that were renamed in the same deploy. Heavy assets
  // (PDF/images/vendor libs) keep stale-while-revalidate below.
  const isShell =
    event.request.mode === "navigate" ||
    /\/assets\/(app\.js|style\.css|print-responsive\.css)/.test(url.pathname) ||
    /\.(md|json)$/i.test(url.pathname);

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
          return new Response(
            "<html><body style='background:#0c0f1a;color:#e6c04c;font-family:Georgia,serif;text-align:center;padding:60px 20px'>" +
            "<h1>✦ Offline</h1><p>You are offline and this page has not been cached yet. Please reconnect to the internet.</p></body></html>",
            { headers: { "Content-Type": "text/html" } }
          );
        }
      })
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);

      // Network fetch (and update cache)
      const networkPromise = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => null);

      // Return cached immediately if available, otherwise wait for network
      if (cached) {
        // Revalidate in background
        networkPromise;
        return cached;
      }

      const networkResponse = await networkPromise;
      if (networkResponse) return networkResponse;

      // If both fail, return a basic offline page
      return new Response(
        "<html><body style='background:#0c0f1a;color:#e6c04c;font-family:Georgia,serif;text-align:center;padding:60px 20px'>" +
        "<h1>✦ Offline</h1><p>You are offline and this page has not been cached yet. Please reconnect to the internet.</p></body></html>",
        { headers: { "Content-Type": "text/html" } }
      );
    })
  );
});
