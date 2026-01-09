const CACHE_NAME = "app-cache-v2";

// Keep this list small and stable; Vite build assets are hashed and change often.
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Never cache non-GET requests.
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Avoid caching cross-origin requests.
  if (url.origin !== self.location.origin) return;

  // Avoid caching API responses.
  if (url.pathname.startsWith("/api")) return;

  event.respondWith(
    (async () => {
      // SPA routing: for navigations, fall back to the app shell when offline.
      if (request.mode === "navigate") {
        try {
          return await fetch(request);
        } catch {
          return (await caches.match("/")) || (await caches.match("/index.html"));
        }
      }

      const cached = await caches.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
      return response;
    })()
  );
});
