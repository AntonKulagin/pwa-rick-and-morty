const staticCacheName = 'static-site-v5'
const dinamicCacheName = 'dinamic-site-v5'

const ASSETS = [
  '/',
  '/index.html',
  '/icons/icon-144x144.png',
  '/favicon.ico',
  'https://leonardo.osnova.io/0770936f-8b7a-e992-b0f8-2f59bc227872/-/preview/1100/-/format/webp/',
]

//что мы будем кэшировать
self.addEventListener('install', async (event) => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(ASSETS)
})

//управлять кэшированием. Очистить кэш
self.addEventListener('activate', async (event) => {
  const cachesKeysArr = await caches.keys()
  await Promise.all(
    cachesKeysArr.filter((key) => key !== staticCacheName && key !== dinamicCacheName).map((key) => caches.delete(key)),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  try {
    return (
      cached ??
      (await fetch(request).then((response) => {
        return networkFirst(request)
      }))
    )
  } catch (error) {
    return networkFirst(request)
  }
}

async function networkFirst(request) {
  const cache = await caches.open(dinamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    return cached
  }
}
