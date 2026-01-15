// BIUPAMA Service Worker - Offline First
const CACHE_NAME = 'biupama-v2';

// Only cache the essential files on install
const CORE_FILES = [
  './',
  './index.html',
  './manifest.json'
];

// Install - cache core files only
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('BIUPAMA: Caching core files');
        return cache.addAll(CORE_FILES);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.log('BIUPAMA: Cache install failed', err))
  );
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Cache everything as you browse (runtime caching)
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (fonts, analytics, etc)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cache if available
      if (cachedResponse) {
        // Update cache in background (stale-while-revalidate)
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, response);
            });
          }
        }).catch(() => {});

        return cachedResponse;
      }

      // Not in cache - fetch and cache
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        // Cache the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Offline and not in cache
        console.log('BIUPAMA: Offline, resource not cached:', event.request.url);
      });
    })
  );
});
