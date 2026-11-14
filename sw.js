/* AUDMANI Education — Service Worker
   Estratégia (etapa inicial):
   · App shell (HTML, CSS, JS, fontes, ícones) é pré-armazenado na instalação e servido do cache.
   · Navegações dentro do escopo recebem o index.html em cache (rotas são por hash: #/...).
   · Navegações fora do app, sem rede, recebem offline.html.
   · Somente requisições GET da mesma origem são tratadas. Nada de APIs, dados de estudante,
     respostas de atividades ou simulados passa por aqui: o progresso fica em localStorage, não em cache.
   · Sem notificações push.
   · A VERSÃO e a lista de arquivos são gerados por `node tools/gerar-sw.js` (hash do conteúdo):
     toda mudança em arquivo do app muda a versão, cria um cache novo e dispara o aviso de atualização. */

const PREFIXO = "audmani-education-";
/*GERADO:INICIO*/
const VERSAO = "87d3766fa45a";
const PRECACHE = [
  "assets/fonts/inter-latin-400-normal.woff2",
  "assets/fonts/inter-latin-500-normal.woff2",
  "assets/fonts/inter-latin-600-normal.woff2",
  "assets/fonts/inter-latin-700-normal.woff2",
  "css/ava-core.css",
  "css/education.css",
  "css/fonts.css",
  "icons/apple-touch-icon.png",
  "icons/favicon-48.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "index.html",
  "js/activities/css.js",
  "js/activities/html.js",
  "js/activities/javascript.js",
  "js/app.js",
  "js/components/code.js",
  "js/components/lesson.js",
  "js/components/quiz.js",
  "js/components/ui.js",
  "js/content/css/modulo-1.js",
  "js/content/css/modulo-2.js",
  "js/content/css/modulo-3.js",
  "js/content/css/modulo-4.js",
  "js/content/html/modulo-1.js",
  "js/content/html/modulo-2.js",
  "js/content/html/modulo-3.js",
  "js/content/html/modulo-4.js",
  "js/content/javascript/modulo-1.js",
  "js/content/javascript/modulo-2.js",
  "js/content/javascript/modulo-3.js",
  "js/content/javascript/modulo-4.js",
  "js/content/registro.js",
  "js/core/router.js",
  "js/core/store.js",
  "js/core/util.js",
  "js/data/cursos.js",
  "js/data/precos.js",
  "js/pages/aluno.js",
  "js/pages/aprender.js",
  "js/pages/avaliacoes.js",
  "js/pages/conta-checkout.js",
  "js/pages/projetos-certificados.js",
  "js/pages/publicas.js",
  "js/projects/projetos.js",
  "js/pwa/pwa.js",
  "manifest.webmanifest",
  "offline.html"
];
/*GERADO:FIM*/
const CACHE = PREFIXO + VERSAO;
const RAIZ = new URL("./", self.registration.scope);
const INDEX = new URL("index.html", RAIZ).href;
const OFFLINE = new URL("offline.html", RAIZ).href;

self.addEventListener("install", (evento) => {
  // Sem skipWaiting automático: a nova versão espera o aluno aceitar ("Atualizar agora"),
  // para não trocar o código no meio de uma atividade ou simulado.
  evento.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(PRECACHE.map((caminho) => new Request(new URL(caminho, RAIZ).href, { cache: "reload" })))
    )
  );
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n.startsWith(PREFIXO) && n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (evento) => {
  if (evento.data && evento.data.tipo === "PULAR_ESPERA") self.skipWaiting();
  if (evento.data && evento.data.tipo === "VERSAO" && evento.ports[0]) evento.ports[0].postMessage(VERSAO);
});

self.addEventListener("fetch", (evento) => {
  const req = evento.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;            // nunca intercepta outras origens
  if (url.pathname === new URL("sw.js", RAIZ).pathname) return;

  if (req.mode === "navigate") {
    const ehApp = url.pathname === RAIZ.pathname || url.pathname === new URL("index.html", RAIZ).pathname;
    evento.respondWith(
      ehApp
        ? caches.match(INDEX).then((r) => r || fetch(req).catch(() => caches.match(OFFLINE)))
        : fetch(req).catch(() => caches.match(OFFLINE))
    );
    return;
  }

  // Recursos estáticos pré-armazenados: cache primeiro. Fora do pré-cache: rede, sem gravar.
  evento.respondWith(
    caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req))
  );
});
