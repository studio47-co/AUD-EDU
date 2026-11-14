/* ==========================================================
   APP — render, navegação, ações globais, tema e inicialização
   (estrutura equivalente a js/main.js do AVA: ROTAS, render, ACOES, FORMS)
   ========================================================== */
(function (AE) {
  const { $, esc } = AE;

  /* ---------- menus ---------- */
  const MENU_ALUNO = [
    { rota: "painel", rotulo: "Painel" },
    { rota: "biblioteca", rotulo: "Biblioteca", ativoEm: ["aprender"] },
    { rota: "atividades", rotulo: "Atividades" },
    { rota: "simulados", rotulo: "Simulados" },
    { rota: "projetos", rotulo: "Projetos" },
    { rota: "certificados", rotulo: "Certificados", curto: "Certif." },
    { rota: "conta", rotulo: "Conta" }
  ];
  const MENU_PUBLICO = [
    { rota: "inicio", rotulo: "Início", href: AE.Router.href("inicio") },
    { rota: "catalogo", rotulo: "Catálogo", href: AE.Router.href("catalogo"), ativoEm: ["curso", "checkout"] },
    { rota: "formacao", rotulo: "Formação Front-End", href: AE.Router.href("formacao", "frontend") },
    { rota: "metodologia", rotulo: "Metodologia", href: AE.Router.href("metodologia") }
  ];
  const ativo = (m, nome) => m.rota === nome || (m.ativoEm || []).includes(nome);

  /* ---------- tema (idêntico ao AVA) ---------- */
  AE.aplicarTema = function () {
    const t = AE.Store.estado.tema;
    t ? document.documentElement.setAttribute("data-theme", t) : document.documentElement.removeAttribute("data-theme");
  };

  /* ---------- render ---------- */
  AE.renderizar = function () {
    const r = AE.Router.atual();
    const fabrica = AE.Paginas[r.nome === "naoencontrada" ? "naoencontrada" : r.nome];
    const pagina = fabrica(r.params);
    if (pagina.redirect) { location.replace(pagina.redirect); return; }

    const publico = r.area === "pub";
    $("#pub").hidden = !publico; $("#shell").hidden = publico;
    document.title = `${pagina.titulo} · AUDMANI Education`;

    if (publico) {
      $("#pub-nav").innerHTML = MENU_PUBLICO.map((m) => `<a href="${m.href}" ${ativo(m, r.nome) ? 'aria-current="page"' : ""}>${m.rotulo}</a>`).join("");
      $("#pub-app").innerHTML = pagina.html;
    } else {
      $("#titulo").textContent = pagina.titulo;
      $("#subtitulo").textContent = pagina.subtitulo || "";
      $("#avatar").textContent = AE.iniciais(AE.Store.estado.usuario.nome);
      $("#nav").innerHTML = MENU_ALUNO.map((m) => `
        <button data-acao="ir" data-rota="${m.rota}" ${ativo(m, r.nome) ? 'aria-current="page"' : ""} type="button">
          <svg viewBox="0 0 24 24"><path d="${AE.ICONES[m.rota]}"/></svg>
          <span class="nav-long">${m.rotulo}</span><span class="nav-short">${m.curto || m.rotulo}</span></button>`).join("");
      $("#app").innerHTML = pagina.html;
    }
  };

  /* ---------- ações globais (data-acao) ---------- */
  Object.assign(AE.Acoes, {
    ir: (el) => { AE.Router.ir(el.dataset.rota); },
    tema: () => {
      const escuro = AE.Store.estado.tema ? AE.Store.estado.tema === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      AE.Store.estado.tema = escuro ? "light" : "dark"; AE.Store.salvar(); AE.aplicarTema();
    },
    copiar: (el) => {
      const texto = el.closest(".code").querySelector("pre").innerText;
      const ok = () => { el.textContent = "Copiado"; setTimeout(() => (el.textContent = "Copiar"), 1600); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto).then(ok, () => AE.aviso("Não foi possível copiar."));
      else { const ta = document.createElement("textarea"); ta.value = texto; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) { AE.aviso("Não foi possível copiar."); } ta.remove(); }
    },
    concluir: (el) => {
      AE.Store.alternarAula(el.dataset.curso, el.dataset.aula); AE.renderizar();
      AE.aviso(AE.Store.aulaConcluida(el.dataset.curso, el.dataset.aula) ? "Aula marcada como concluída." : "Conclusão desmarcada.");
    },
    "filtro-cat": (el) => { AE.ui.categoria = el.dataset.v; AE.Paginas.atualizarCatalogo(); },
    "filtro-nivel": (el) => { AE.ui.nivel = el.dataset.v; AE.Paginas.atualizarCatalogo(); },
    "limpar-filtros": () => { Object.assign(AE.ui, { busca: "", categoria: "Todos", nivel: "Todos" }); AE.renderizar(); }
  });

  AE.Paginas.atualizarCatalogo = () => {
    AE.$("#tabs-cat").innerHTML = AE.Paginas.tabsCat(); AE.$("#tabs-nivel").innerHTML = AE.Paginas.tabsNivel();
    AE.$("#cat-res").innerHTML = AE.Paginas.catalogoResultados();
  };

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-acao]");
    if (el && AE.Acoes[el.dataset.acao] && !el.disabled) AE.Acoes[el.dataset.acao](el, e);
  });

  document.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-form]"); if (!f) return;
    e.preventDefault(); if (AE.Forms[f.dataset.form]) AE.Forms[f.dataset.form](f);
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "busca-cat") { AE.ui.busca = e.target.value; AE.$("#cat-res").innerHTML = AE.Paginas.catalogoResultados(); }
  });

  window.addEventListener("hashchange", () => { AE.renderizar(); window.scrollTo(0, 0); });

  /* ---------- inicialização ---------- */
  AE.Store.carregar(); AE.aplicarTema(); AE.renderizar();
})(window.AE);
