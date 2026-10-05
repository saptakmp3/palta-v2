/* Satrangee Swar Sadhana service worker.
   Bump VERSION whenever you change any app file, so phones pick up the update. */
const VERSION = "sss-v1", SAMPLES = "sss-samples-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "favicon-32.png", "apple-touch-icon.png",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== SAMPLES).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  /* recorded samples: cache first, kept in their own cache so app updates never delete them */
  if (u.pathname.includes("/samples/")) {
    e.respondWith(caches.open(SAMPLES).then(c => c.match(r).then(hit => hit || fetch(r).then(n => {
      if (n.ok) c.put(r, n.clone()); return n; }))));
    return;
  }
  /* pages: network first so updates arrive, cache when offline */
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then(n => { const cp = n.clone(); caches.open(VERSION).then(c => c.put("index.html", cp)); return n; })
      .catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(n => {
    if (n.ok) { const cp = n.clone(); caches.open(VERSION).then(c => c.put(r, cp)); } return n; })));
});
