/* ==========================================================
   PWA — instalação, registro do Service Worker, atualização e tema do sistema
   · Instalação nativa só quando o navegador a oferece (evento `beforeinstallprompt`).
   · Sem o evento (iOS, Safari, Firefox, Chromium sem elegibilidade): instruções reais, nunca instalação fictícia.
   · Atualização controlada: o aluno decide quando trocar de versão; atividades em andamento pedem confirmação.
   · Nenhum dado do estudante passa por aqui.
   ========================================================== */
(function (AE) {
  const UA = navigator.userAgent;
  const seguro = location.protocol === "https:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const temSW = "serviceWorker" in navigator && seguro;

  let eventoInstalacao = null;       // guardado de `beforeinstallprompt`
  let instaladoNaSessao = false;     // `appinstalled` recebido
  let registro = null;
  let atualizando = false;           // o aluno pediu a atualização (só então recarregamos)

  /* ---------- ambiente ---------- */
  const ehIOS = () => /iPad|iPhone|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const versaoIOS = () => { const m = UA.match(/OS (\d+)[_.](\d+)/); return m ? [Number(m[1]), Number(m[2])] : [0, 0]; };
  const emModoApp = () =>
    matchMedia("(display-mode: standalone)").matches || matchMedia("(display-mode: window-controls-overlay)").matches ||
    matchMedia("(display-mode: minimal-ui)").matches || navigator.standalone === true;

  function plataforma() {
    const ios = ehIOS(), android = /Android/.test(UA);
    const firefox = /Firefox|FxiOS/.test(UA), edge = /Edg(e|A|iOS)?\//.test(UA);
    const safari = /Safari\//.test(UA) && !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|Edg\//.test(UA);
    const chromium = !ios && /Chrome|Chromium|Edg\//.test(UA);
    return { ios, android, firefox, edge, safari, chromium };
  }

  /* ---------- botões "Instalar aplicativo" ---------- */
  function modo() {
    if (emModoApp() || instaladoNaSessao) return "instalado";
    if (eventoInstalacao) return "nativo";
    if (ehIOS()) return "manual";                    // iOS nunca dispara o evento: sempre instruções
    if (temSW) return "manual";
    return "indisponivel";                           // sem HTTPS/SW (ex.: file://): instalar não é possível
  }

  function atualizarBotoes() {
    const visivel = modo() === "nativo" || modo() === "manual";
    document.querySelectorAll('[data-pwa="instalar"]').forEach((b) => { b.hidden = !visivel; });
  }

  /* ---------- instruções de instalação manual ---------- */
  function instrucoes() {
    const p = plataforma();
    if (p.ios) {
      const [maior, menor] = versaoIOS(), recente = maior > 16 || (maior === 16 && menor >= 4);
      if (!recente && !p.safari) return { intro: "No iPhone e no iPad com este sistema, a instalação só funciona pelo Safari.", passos: ["Abra este mesmo endereço no Safari.", "Toque em Compartilhar e escolha “Adicionar à Tela de Início”."] };
      return {
        intro: recente ? "No iPhone e no iPad, a instalação é feita pelo menu de compartilhamento do navegador." : "No iPhone e no iPad, a instalação é feita pelo menu de compartilhamento do Safari.",
        passos: [
          "Toque no botão Compartilhar (quadrado com uma seta para cima), na barra do navegador.",
          "Escolha “Adicionar à Tela de Início”. Se não aparecer, role a lista ou toque em “Ver mais”.",
          "Confirme em “Adicionar”. Se existir a opção “Abrir como aplicativo web”, mantenha-a ativada."
        ]
      };
    }
    if (p.firefox && !p.android) return { intro: "O Firefox para computador não instala aplicativos web.", passos: ["Abra este endereço no Google Chrome ou no Microsoft Edge e use o botão “Instalar aplicativo”.", "No Safari (macOS 14 ou superior), use Arquivo → Adicionar ao Dock."] };
    if (p.firefox && p.android) return { intro: "No Firefox para Android, a instalação fica no menu.", passos: ["Toque no menu ⋮.", "Escolha “Instalar”."] };
    if (p.safari) return { intro: "No Safari para Mac (macOS 14 Sonoma ou superior), o aplicativo é adicionado ao Dock.", passos: ["Na barra de menus, abra Arquivo.", "Escolha “Adicionar ao Dock…” e confirme."] };
    if (p.android) return { intro: "Neste navegador, a instalação é feita pelo menu.", passos: ["Toque no menu ⋮ do navegador.", "Escolha “Instalar aplicativo” (ou “Adicionar à tela inicial”).", "Confirme em “Instalar”."], nota: "Se a opção não aparecer, o aplicativo já pode estar instalado ou o navegador não permite a instalação." };
    if (p.chromium) return { intro: "Neste navegador, a instalação é feita pelo ícone da barra de endereço ou pelo menu.", passos: ["Procure o ícone de instalação à direita da barra de endereço e clique nele.", "Ou abra o menu do navegador e procure “Instalar…” (Edge: Aplicativos → “Instalar este site como um aplicativo”).", "Confirme em “Instalar”."], nota: "Se a opção não aparecer, o aplicativo já pode estar instalado ou o navegador não permite a instalação." };
    return { intro: "Este navegador pode não permitir a instalação.", passos: ["Procure no menu do navegador por “Instalar” ou “Adicionar à tela inicial”.", "Se não existir, use o Google Chrome ou o Microsoft Edge."] };
  }

  function abrirDialogo(html) {
    const d = AE.$("#modal"); d.innerHTML = html;
    if (typeof d.showModal === "function" && !d.open) d.showModal();
    return d;
  }

  function mostrarInstrucoes() {
    const i = instrucoes();
    abrirDialogo(`
      <h2>Instalar aplicativo</h2>
      <p class="muted">${i.intro}</p>
      <ol class="pwa-passos">${i.passos.map((x) => `<li>${x}</li>`).join("")}</ol>
      ${i.nota ? `<p class="muted">${i.nota}</p>` : ""}
      <form method="dialog" class="row"><button class="btn btn-solid" type="submit" autofocus>Entendi</button></form>`);
  }

  async function instalar() {
    if (!eventoInstalacao) { mostrarInstrucoes(); return; }
    const e = eventoInstalacao; eventoInstalacao = null;       // o evento só pode ser usado uma vez
    atualizarBotoes();
    try {
      await e.prompt();
      const r = await e.userChoice;
      if (r.outcome === "accepted") AE.aviso("Instalação iniciada.");
    } catch (_) { mostrarInstrucoes(); }
    atualizarBotoes();
  }

  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); eventoInstalacao = e; atualizarBotoes(); });
  window.addEventListener("appinstalled", () => { instaladoNaSessao = true; eventoInstalacao = null; atualizarBotoes(); AE.aviso("Aplicativo instalado."); });
  matchMedia("(display-mode: standalone)").addEventListener("change", atualizarBotoes);

  /* ---------- atualização do app ---------- */
  function emAndamento() {
    const s = AE.Store.estado.simAtual;
    const naoConfirmadas = AE.Quiz && Object.keys(AE.Quiz.selecao || {}).some((id) => !AE.Store.resposta(id));
    return Boolean(s) || Boolean(naoConfirmadas);
  }

  function aplicarAtualizacao(worker) { atualizando = true; worker.postMessage({ tipo: "PULAR_ESPERA" }); }

  function pedirConfirmacao(worker) {
    const d = abrirDialogo(`
      <h2>Atualizar agora?</h2>
      <p class="muted">Há uma atividade ou um simulado em andamento. Respostas de simulado já marcadas ficam salvas neste dispositivo, mas seleções ainda não confirmadas em atividades serão perdidas ao recarregar.</p>
      <div class="row"><button class="btn btn-solid" data-pwa-confirma type="button">Atualizar agora</button>
        <button class="btn btn-soft" data-pwa-cancela type="button" autofocus>Continuar estudando</button></div>`);
    d.querySelector("[data-pwa-confirma]").addEventListener("click", () => { d.close(); aplicarAtualizacao(worker); });
    d.querySelector("[data-pwa-cancela]").addEventListener("click", () => d.close());
  }

  function avisarAtualizacao(worker) {
    if (AE.$("#pwa-update")) return;
    const el = document.createElement("div");
    el.id = "pwa-update"; el.className = "pwa-update card"; el.setAttribute("role", "status");
    el.innerHTML = `<p>Uma nova versão da AUDMANI Education está disponível.</p>
      <div class="row"><button class="btn btn-solid" data-pwa-agora type="button">Atualizar agora</button>
      <button class="btn btn-soft" data-pwa-depois type="button">Depois</button></div>`;
    el.querySelector("[data-pwa-agora]").addEventListener("click", () => { emAndamento() ? pedirConfirmacao(worker) : aplicarAtualizacao(worker); });
    el.querySelector("[data-pwa-depois]").addEventListener("click", () => el.remove());
    document.body.appendChild(el);
  }

  function registrarSW() {
    if (!temSW) return;
    navigator.serviceWorker.register("sw.js", { scope: "./" }).then((reg) => {
      registro = reg;
      if (reg.waiting && navigator.serviceWorker.controller) avisarAtualizacao(reg.waiting);
      reg.addEventListener("updatefound", () => {
        const novo = reg.installing; if (!novo) return;
        novo.addEventListener("statechange", () => {
          if (novo.state === "installed" && navigator.serviceWorker.controller) avisarAtualizacao(novo);
        });
      });
      const verificar = () => reg.update().catch(() => {});
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") verificar(); });
      setInterval(verificar, 60 * 60 * 1000);
    }).catch((erro) => console.warn("PWA: não foi possível registrar o Service Worker.", erro));

    navigator.serviceWorker.addEventListener("controllerchange", () => { if (atualizando) location.reload(); });
  }

  /* ---------- cor da barra do sistema acompanha o tema (claro/escuro) ---------- */
  function sincronizarCorDoTema() {
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    if (!bg) return;
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove());
    const m = document.createElement("meta"); m.name = "theme-color"; m.content = bg; document.head.appendChild(m);
  }
  new MutationObserver(sincronizarCorDoTema).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", sincronizarCorDoTema);

  /* ---------- ações e inicialização ---------- */
  AE.Acoes["pwa-instalar"] = instalar;
  AE.PWA = { modo, versaoSW: () => new Promise((ok) => {
    const sw = navigator.serviceWorker && navigator.serviceWorker.controller; if (!sw) return ok(null);
    const c = new MessageChannel(); c.port1.onmessage = (e) => ok(e.data); sw.postMessage({ tipo: "VERSAO" }, [c.port2]);
  }), emAndamento };

  sincronizarCorDoTema(); atualizarBotoes(); registrarSW();
})(window.AE);
