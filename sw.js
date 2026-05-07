const CACHE_NAME = 'chronos-v8-cache'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './192x192.png',
  './512x512.png'
];

// 安裝時：快取所有核心檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 攔截網路請求：優先使用快取資料
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});