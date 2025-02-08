const CACHE_NAME = "easyprice-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/app.js",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png"
];

// Installazione del Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Gestione delle richieste in cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Aggiornamento della cache
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
