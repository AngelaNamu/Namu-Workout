
const CACHE_NAME = 'forgeher-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './lat_pulldown.svg',
  './seated_cable_row.svg',
  './leg_press.svg',
  './goblet_squat.svg',
  './romanian_deadlift.svg',
  './walking_lunge.svg',
  './hip_thrust.svg',
  './shoulder_press.svg',
  './farmer_carry.svg',
  './plank.svg',
  './run_intervals.svg'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
