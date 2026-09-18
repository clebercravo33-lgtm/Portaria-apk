const CACHE = "nfty-shell-v1";
const SHELL = ["./pwa.html", "./manifest.json"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache the local shell; API/ntfy traffic remains network-first.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req))
  );
});

// This allows a real Push API provider to wake the service worker
// even when the PWA UI is closed. The existing Nfty/ntfy SSE connection
// itself cannot be kept alive after the browser terminates the page.
self.addEventListener("push", event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch (_) { data = { body: event.data ? event.data.text() : "Nova notificação" }; }

  const title = data.title || "Nfty";
  const options = {
    body: data.body || data.message || "Nova notificação",
    tag: data.tag || "nfty",
    renotify: true,
    data: { url: data.url || "./pwa.html" }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : "./pwa.html";

  event.waitUntil(
    clients.matchAll({type: "window", includeUncontrolled: true}).then(list => {
      for (const client of list) {
        if ("focus" in client) {
          client.navigate(target);
          return client.focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});
