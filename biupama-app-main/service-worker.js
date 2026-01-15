// BIUPAMA Service Worker for offline functionality
const CACHE_NAME = 'biupama-v1';

// Files to cache for offline use
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Images
  './images/Different schistosoma eggs.png',
  './images/Thin smear morphology plasmodium spp.png',
  './images/schistosomiasis hotspots.jpg',
  './images/malaria_LifeCycle.gif',
  './images/malaria-world-map-2025.jpg',
  './images/Five-different-human-malaria-Plasmodium-species-and-their-life-stages-in-thin-blood-film.jpg',
  './images/AB coverage.png',
  // Huidafwijkingen images
  './images/huidafwijkingen/Strongyloides stercoralis.jpg',
  './images/huidafwijkingen/Tungiasis.jpg',
  './images/huidafwijkingen/Cutane leishmaniasis.jpg',
  './images/huidafwijkingen/Cutane myiasis.jpg',
  './images/huidafwijkingen/bed bug.webp',
  './images/huidafwijkingen/persisterende insectenbeten.jpg',
  './images/huidafwijkingen/Trench_foot.jpg',
  './images/huidafwijkingen/scabies.jpg',
  './images/huidafwijkingen/fotosensitiviteit.webp',
  './images/huidafwijkingen/Kwallensteek.png',
  './images/huidafwijkingen/Cutaneous-larva-migrans-669x1024.jpg',
  './images/huidafwijkingen/miliaria.jpg',
  './images/huidafwijkingen/cellulitis.jpeg',
  './images/huidafwijkingen/Epicurves_Figure_2.png'
];

// Install event - cache all files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('BIUPAMA: Caching files for offline use');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('BIUPAMA: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Return offline fallback if needed
        console.log('BIUPAMA: Offline - serving from cache');
      })
  );
});
