const CACHE_NAME = "easyprice-cache-v1";
const urlsToCache = [
    "index.html",
    "style.css",
    "app.js",
    "manifest.json",
    "easyprice-192.png",
    "easyprice-512.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
