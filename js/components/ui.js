/* ==========================================================
   COMPONENTES COMPARTILHADOS — HTML reaproveitando classes do AVA
   .card .course .tag .bar .meta .item .pill .btn .tabs .tab .list .check
   ========================================================== */
(function (AE) {
  const { esc, moeda } = AE;

  const UI = AE.UI = {
    /** Card de curso — adaptação de cursoCard() do AVA (views.js) com preço e carga. */
    cursoCard(c) {
      const mat = AE.Store.matriculado(c.slug), l = AE.Store.leitura(c.slug);
      const pub = AE.Conteudo.completo(c.slug);
      return `
        <a class="card course" href="${AE.Router.href("curso", c.slug)}">
          <span class="tag">${esc(c.categoria)} · ${esc(c.nivel)}</span>
          <h3>${esc(c.nome)}</h3>
          <p>${esc(c.resumo)}</p>
          <div class="meta"><span>${c.horas} h propostas</span><span>${c.modulos.length} módulos</span></div>
          <div class="foot">
            ${mat ? `<span class="pill on">Matriculado · ${l.pct}% lido</span>` : `<span class="price">${moeda(c.preco)}<small>demonstrativo</small></span>`}
            ${pub ? "" : `<span class="pill">Em produção</span>`}
          </div>
        </a>`;
    },

    pacoteCard(p) {
      const mat = AE.Store.formacaoMatriculada(p);
      return `
        <a class="card course" href="${AE.Router.href("formacao", p.slug)}">
          <span class="tag">Formação · ${esc(p.nivel)}</span>
          <h3>${esc(p.nome)}</h3>
          <p>${esc(p.resumo)}</p>
          <div class="meta"><span>${AE.horasPacote(p)} h propostas</span><span>${p.cursos.length} cursos</span></div>
          <div class="foot">
            ${mat ? `<span class="pill on">Matriculado</span>` : `<span class="price">${moeda(p.preco)}<small class="riscado">${moeda(AE.somaCursos(p))}</small></span>`}
          </div>
        </a>`;
    },

    barra: (pct, rotulo) => `<div class="bar" role="progressbar" aria-label="${esc(rotulo || "Progresso")}" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="--w:${pct}%"></i></div>`,

    /** Linha de progresso com rótulo (leitura / desempenho / requisitos). */
    medida: (rotulo, valor, pct) => `<div><div class="lbl"><b>${esc(rotulo)}</b><span>${esc(valor)}</span></div>${UI.barra(pct, rotulo)}</div>`,

    aviso: (texto, tag = "Demonstração") => `<div class="aviso"><span class="pill on">${esc(tag)}</span><p>${texto}</p></div>`,

    vazio: (texto, acaoHtml = "") => `<div class="empty"><p>${texto}</p>${acaoHtml}</div>`,

    chips: (lista) => `<div class="chips">${lista.map((t) => `<span class="tag-static">${esc(t)}</span>`).join("")}</div>`,

    secao: (titulo, subtitulo, corpo, extra = "") => `
      <section class="section"><header><div><h2>${esc(titulo)}</h2>${subtitulo ? `<p>${subtitulo}</p>` : ""}</div>${extra}</header>${corpo}</section>`,

    /** Linha de item no padrão .item do AVA, com ação à direita. */
    item(titulo, sub, acaoHtml = "", dataHtml = "") {
      return `<li class="item">${dataHtml}<div><strong>${titulo}</strong><span>${sub}</span></div>${acaoHtml}</li>`;
    },

    /** Caixa de data do AVA (.item .date) a partir de ISO. */
    data(iso) {
      const MES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
      const [, m, d] = iso.slice(0, 10).split("-");
      return `<div class="date"><b>${d}</b><small>${MES[Number(m) - 1]}</small></div>`;
    },

    botaoMatricula(item) {
      const todos = item.cursos.every((s) => AE.Store.matriculado(s));
      return todos
        ? `<a class="btn btn-soft" href="${AE.Router.href("biblioteca")}">Ver na biblioteca</a>`
        : `<a class="btn btn-solid" href="${AE.Router.href("checkout", item.id)}">Matricular-se · ${moeda(item.preco)}</a>`;
    }
  };
})(window.AE);
