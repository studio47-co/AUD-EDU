/* ==========================================================
   LEITOR DE AULAS — #/aprender/:curso[/:aula]
   Sidebar de módulos e aulas + leitura prolongada + anterior/próxima
   + marcação de conclusão. A 1ª aula de cada curso é gratuita (prévia).
   ========================================================== */
(function (AE) {
  const { esc } = AE;
  const P = AE.Paginas;

  const ehPrevia = (slug, id) => { const a = AE.Conteudo.aulas(slug)[0]; return Boolean(a && a.id === id); };
  const rotuloAula = (id) => id.replace(/^m(\d+)a(\d+)$/, "$1.$2");

  function outline(c, atual) {
    const feitas = AE.Store.aulasFeitas(c.slug);
    return AE.Conteudo.modulosPublicados(c.slug).map((n) => {
      const m = c.modulos.find((x) => x.n === n);
      return `<h3>Módulo ${n} · ${esc(m.titulo)}</h3>` + AE.Conteudo.aulasDoModulo(c.slug, n).map((a) => `
        <a class="check ${feitas.includes(a.id) ? "done" : ""}" href="${AE.Router.href("aprender", c.slug, a.id)}" ${a.id === atual ? 'aria-current="true"' : ""}>
          <span class="box" aria-hidden="true">${feitas.includes(a.id) ? "✓" : ""}</span>
          <div><strong>${rotuloAula(a.id)} · ${esc(a.titulo)}</strong><span>${a.minutos} min</span></div></a>`).join("");
    }).join("");
  }

  P.aprender = ([slug, aulaId]) => {
    const c = AE.curso(slug); if (!c) return P.naoencontrada();
    const todas = AE.Conteudo.aulas(slug);
    if (!todas.length) return { titulo: c.nome, subtitulo: "Conteúdo em produção", html: AE.UI.vazio("O conteúdo deste curso ainda está em produção. Nenhuma aula foi publicada.", `<a class="btn btn-soft" href="${AE.Router.href("curso", slug)}">Voltar ao curso</a>`) };

    if (!aulaId) {
      const ult = AE.Store.estado.ultima;
      const alvo = (ult && ult.slug === slug && AE.Conteudo.aula(slug, ult.aula)) ? ult.aula : (AE.Store.proximaAula(slug) || todas[0]).id;
      return { redirect: AE.Router.href("aprender", slug, typeof alvo === "string" ? alvo : alvo.id) };
    }
    const aula = AE.Conteudo.aula(slug, aulaId); if (!aula) return P.naoencontrada();

    const mat = AE.Store.matriculado(slug), previa = ehPrevia(slug, aula.id);
    const modulo = c.modulos.find((m) => m.n === aula.modulo);

    if (!mat && !previa) {
      return {
        titulo: c.nome, subtitulo: "Conteúdo exclusivo para matriculados",
        html: AE.UI.vazio(`A aula <b>${esc(aula.titulo)}</b> faz parte do curso ${esc(c.nome)}. Matricule-se (simulação) para acessar todas as aulas, ou veja a aula gratuita.`,
          `<div class="row" style="justify-content:center"><a class="btn btn-solid" href="${AE.Router.href("checkout", slug)}">Matricular-se · ${AE.moeda(c.preco)}</a>
           <a class="btn btn-soft" href="${AE.Router.href("aprender", slug, todas[0].id)}">Ver aula gratuita</a></div>`)
      };
    }
    if (mat) AE.Store.marcarUltima(slug, aula.id);

    const viz = AE.Conteudo.vizinhas(slug, aula.id), feita = AE.Store.aulaConcluida(slug, aula.id), l = AE.Store.leitura(slug);
    const ultimaDoModulo = !viz.proxima || viz.proxima.modulo !== aula.modulo;
    const acoes = `
      <div class="lesson-nav">
        ${viz.anterior ? `<a class="btn btn-soft" href="${AE.Router.href("aprender", slug, viz.anterior.id)}">← Anterior</a>` : `<span></span>`}
        <div class="row">
          ${mat ? `<button class="btn ${feita ? "btn-soft" : "btn-solid"}" data-acao="concluir" data-curso="${slug}" data-aula="${aula.id}" type="button" aria-pressed="${feita}">${feita ? "✓ Concluída (desmarcar)" : "Marcar como concluída"}</button>`
                 : `<a class="btn btn-solid" href="${AE.Router.href("checkout", slug)}">Matricular-se para registrar progresso</a>`}
          ${ultimaDoModulo ? `<a class="btn btn-soft" href="${AE.Router.href("atividades", slug, aula.modulo)}">Atividades do módulo</a>` : ""}
          ${viz.proxima ? `<a class="btn btn-soft" href="${AE.Router.href("aprender", slug, viz.proxima.id)}">Próxima →</a>` : ""}
        </div>
      </div>`;

    return {
      titulo: c.nome,
      subtitulo: `Módulo ${aula.modulo} · ${modulo.titulo}`,
      html: `
        <a class="back" href="${AE.Router.href("curso", slug)}">← Voltar ao curso</a>
        <div class="lesson-grid">
          <div class="stack" style="gap:24px;min-width:0">
            <article class="card lesson-head">
              <div class="row"><span class="tag-static">Módulo ${aula.modulo} · Aula ${rotuloAula(aula.id)}</span>
                ${previa && !mat ? `<span class="pill on">Aula gratuita</span>` : ""}
                <span class="muted">${aula.minutos} min · aula ${viz.indice + 1} de ${viz.total}</span></div>
              <h2>${esc(aula.titulo)}</h2>
              ${AE.UI.chips(aula.topicos)}
            </article>
            <article class="card lesson-body">${AE.Lesson.render(aula)}${acoes}</article>
          </div>
          <aside class="card lesson-side" aria-label="Conteúdo do curso">
            <div><b>${esc(c.nome)}</b>${AE.UI.barra(l.pct, "Leitura do curso")}<span class="muted">${l.feitas} de ${l.total} aulas concluídas · ${l.pct}%</span></div>
            <nav class="outline">${outline(c, aula.id)}</nav>
          </aside>
        </div>`
    };
  };
})(window.AE);
