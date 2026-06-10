var C='dash2-v1';
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./dashboard.html']);}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
 if(e.request.url.indexOf('script.google.com')>=0)return; /* APIは常にネット */
 e.respondWith(fetch(e.request).then(function(r){var cl=r.clone();caches.open(C).then(function(c){c.put(e.request,cl);});return r;}).catch(function(){return caches.match(e.request);}));
});
