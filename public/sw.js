/* eslint-disable no-restricted-globals */
// public/sw.js

self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/sw.js',
          /* Add your other assets here */
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('sync', (event) => {
    if (event.tag === 'my-background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });
  
  function doBackgroundSync() {
    // Perform background sync tasks here
    console.log('Background sync task initiated');
  }
  