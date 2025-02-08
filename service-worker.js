const CACHE_NAME = "easyprice-cache-v2";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Cache vecchia eliminata:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
