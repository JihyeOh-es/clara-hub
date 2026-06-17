// Clara's Hub Service Worker
// 새 버전 배포 시 아래 CACHE_VERSION 숫자만 올리면 폰이 자동으로 갈아끼움
const CACHE_VERSION = 'claras-hub-v11';

// 오프라인을 위해 미리 캐시할 정적 자원 (잘 안 바뀌는 것들)
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// 설치: 정적 자원 미리 담고, 기다리지 말고 바로 활성화 대기
self.addEventListener('install', (event) => {
  self.skipWaiting();   // 새 SW가 즉시 대기열로 → 옛 코드에 안 갇힘
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.addAll(PRECACHE).catch(() => {})
    )
  );
});

// 활성화: 옛 버전 캐시 싹 삭제 + 즉시 제어권 가져오기
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// fetch 전략:
//  - HTML(페이지 문서): network-first → 온라인이면 항상 최신, 오프라인이면 캐시
//  - 그 외(아이콘/폰트 등): cache-first → 빠르게
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // 같은 출처(github.io)만 처리. Supabase/Google API는 절대 안 건드림
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // network-first: 최신 우선, 실패 시 캐시
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
  } else {
    // cache-first: 있으면 캐시, 없으면 네트워크 받아서 캐시
    event.respondWith(
      caches.match(req).then((cached) =>
        cached || fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          return res;
        }).catch(() => cached)
      )
    );
  }
});
