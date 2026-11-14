/* ==========================================================
   UTIL — namespace global AE e funções puras
   (o AVA original usa scripts globais sem módulos; mantemos o padrão
   para que o projeto abra com duplo clique, sem servidor)
   ========================================================== */
window.AE = window.AE || {};

(function (AE) {
  /** Registros de ações (data-acao) e formulários (data-form), como no AVA (main.js). */
  AE.Acoes = AE.Acoes || {};
  AE.Forms = AE.Forms || {};

  AE.$ = (s, raiz = document) => raiz.querySelector(s);
  AE.$$ = (s, raiz = document) => Array.from(raiz.querySelectorAll(s));

  /** Escapa HTML (mesma função do AVA, views.js). */
  AE.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Texto rico mínimo: `código` e **negrito**. Sempre escapa antes. */
  AE.rich = (s) => AE.esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  AE.moeda = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  AE.p2 = (n) => String(n).padStart(2, "0");
  AE.hojeISO = () => { const d = new Date(); return `${d.getFullYear()}-${AE.p2(d.getMonth() + 1)}-${AE.p2(d.getDate())}`; };
  AE.agoraISO = () => new Date().toISOString();
  AE.dataBR = (iso) => { const [a, m, d] = String(iso).slice(0, 10).split("-"); return `${d}/${m}/${a}`; };
  AE.pct = (parte, todo) => (todo ? Math.round((parte / todo) * 100) : 0);
  AE.plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
  AE.iniciais = (nome) => nome.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  AE.horas = (min) => (min >= 60 ? `${Math.floor(min / 60)} h ${min % 60 ? AE.p2(min % 60) + " min" : ""}`.trim() : `${min} min`);

  /** Normaliza texto para busca (sem acentos, minúsculo). */
  AE.norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  AE.aviso = function (msg) {
    const t = AE.$("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(AE.aviso.id); AE.aviso.id = setTimeout(() => t.classList.remove("on"), 2800);
  };

  /** Ícones SVG (mesmo traço do AVA: 1.7, round). Caminhos novos seguem o mesmo estilo. */
  AE.ICONES = {
    painel: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
    biblioteca: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5",
    atividades: "M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9",
    simulados: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    projetos: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    certificados: "M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8.5 13.5L7 21l5-3 5 3-1.5-7.5",
    conta: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0"
  };
})(window.AE);
