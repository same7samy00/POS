const CACHE_NAME = 'supplies-system-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/inventory.html',
    '/pos.html',
    '/customers.html',
    '/reports.html',
    '/settings.html',
    '/mobile-scanner.html',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js',
    // يمكنك إضافة المزيد من المكتبات أو الأصول هنا
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If a match is found in the cache, return it
                if (response) {
                    return response;
                }
                // Otherwise, go to the network
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
