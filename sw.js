/* ══════════════════════════════════════════════════════════════
   Babylon's Wine — Service Worker (Offline Support)
   Cache-first for static assets, network-first for documents.
══════════════════════════════════════════════════════════════ */

const CACHE_NAME = "babylons-wine-v4";

const PRECACHE_URLS = [
  "./index.html",
  "./assets/style.css",
  "./assets/app.js",
  "./assets/print-responsive.css",
  "./assets/videos.json",
  "./assets/infographics-manifest.json",
  "./assets/source-documents-catholic.json",
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
