/* ==========================================================
   ÁREA DO ESTUDANTE — painel (dashboard) e biblioteca
   Nenhum número é inventado: tudo vem do Store ou dos registros de conteúdo.
   ========================================================== */
(function (AE) {
  const { esc, moeda } = AE;
  const P = AE.Paginas;

  const primeiroNome = () => AE.Store.estado.usuario.nome.split(" ")[0];

  /** Três medidas separadas de um curso (leitura, desempenho, requisitos). */
  AE.medidasCurso = function (slug) {
    const l = AE.Store.leitura(slug), d = AE.Store.desempenho(slug), r = AE.Store.requisitos(slug), ok = r.filter((x) => x.ok).length;
    return `<div class="progress-set">
      ${AE.UI.medida("Leitura", `${l.feitas} de ${l.total} aulas`, l.pct)}
      ${AE.UI.medida("Desempenho", d.respondidas ? `${d.acertos} acertos em ${d.respondidas} respondidas · ${d.pct}%` : `nenhuma questão respondida (${d.total} disponíveis)`, d.respondidas ? d.pct : 0)}
      ${AE.UI.medida("Requisitos do certificado", `${ok} de ${r.length} atendidos`, AE.pct(ok, r.length))}
    </div>`;
  };

  /* ---------- BIBLIOTECA ---------- */
  P.biblioteca = () => {
    const mat = AE.Store.matriculados();
    const corpo = mat.length ? `<div class="grid" style="gap:24px">${mat.map((c) => {
      const prox = AE.Store.proximaAula(c.slug), feitas = AE.Store.aulasFeitas(c.slug).length;
      return `<article class="card stack">
        <div class="row"><div><span class="tag-static">${esc(c.categoria)}</span><h2 style="font-size:1.4rem;margin:8px 0 0;display:block">${esc(c.nome)}</h2>
          <p class="muted">Matrícula demonstrativa em ${AE.dataBR(AE.Store.estado.matriculas[c.slug].data)}</p></div></div>
        ${AE.medidasCurso(c.slug)}
        <div class="row">
          <a class="btn btn-solid" href="${AE.Router.href("aprender", c.slug)}">${feitas && prox ? "Continuar estudando" : prox ? "Começar" : "Rever aulas"}</a>
          <a class="btn btn-soft" href="${AE.Router.href("atividades", c.slug)}">Atividades</a>
          <a class="btn btn-soft" href="${AE.Router.href("projetos", c.slug)}">Projeto</a>
          <a class="btn btn-soft" href="${AE.Router.href("certificados")}">Certificado</a>
        </div></article>`;
    }).join("")}</div>` : AE.UI.vazio("Sua biblioteca está vazia. Matricule-se em um curso para começar a estudar.", `<a class="btn btn-solid" href="${AE.Router.href("catalogo")}">Explorar o catálogo</a>`);
    return { titulo: "Biblioteca", subtitulo: mat.length ? `${AE.plural(mat.length, "curso matriculado", "cursos matriculados")}.` : "Seus cursos matriculados aparecem aqui.", html: corpo };
  };

  /* ---------- PAINEL ---------- */
  function atividadesPendentes() {
    const out = [];
    AE.Store.matriculados().forEach((c) => c.modulos.forEach((m) => {
      if (AE.Conteudo.statusModulo(c.slug, m.n) !== "publicado") return;
      const d = AE.Store.desempenho(c.slug, m.n);
      if (d.respondidas < d.total) out.push({ c, m, restam: d.total - d.respondidas, d });
    }));
    return out;
  }

  function resultadosRecentes() {
    const itens = [];
    AE.Store.estado.simulados.slice(0, 5).forEach((t) => {
      const c = AE.curso(t.slug);
      itens.push({ data: t.data, titulo: `Simulado · ${c.nome}${t.modulo ? ` · módulo ${t.modulo}` : ""}`, sub: `${t.acertos} de ${t.total} acertos (${AE.pct(t.acertos, t.total)}%)`, href: AE.Router.href("simulados", "resultado", t.id) });
    });
    Object.entries(AE.Store.estado.respostas).forEach(([id, r]) => {
      const q = AE.Atividades.porId(id); if (!q) return;
      itens.push({ data: r.data, titulo: `Atividade · ${AE.curso(q.curso).nome} · módulo ${q.modulo}`, sub: `${r.certa ? "Acertou" : "Errou"}: ${q.competencia}`, href: AE.Router.href("atividades", q.curso, q.modulo) });
    });
    return itens.sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);
  }

  P.painel = () => {
    const mat = AE.Store.matriculados(), ult = AE.Store.estado.ultima;
    let hero;
    const aulaUlt = ult && AE.Store.matriculado(ult.slug) ? AE.Conteudo.aula(ult.slug, ult.aula) : null;
    const proxima = (() => { for (const c of mat) { const a = AE.Store.proximaAula(c.slug); if (a) return { c, a }; } return null; })();
    if (aulaUlt) {
      const c = AE.curso(ult.slug);
      hero = `<div><small>Continue de onde parou</small><h2>${esc(c.nome)}</h2><p>Última aula acessada · ${esc(aulaUlt.titulo)}</p></div>
        <a class="btn" href="${AE.Router.href("aprender", ult.slug, ult.aula)}">Continuar aula</a>`;
    } else if (proxima) {
      hero = `<div><small>Próxima aula</small><h2>${esc(proxima.c.nome)}</h2><p>${esc(proxima.a.titulo)}</p></div><a class="btn" href="${AE.Router.href("aprender", proxima.c.slug, proxima.a.id)}">Começar aula</a>`;
    } else {
      hero = `<div><small>Comece agora</small><h2>Escolha seu primeiro curso</h2><p>Você ainda não está matriculado em nenhum curso.</p></div><a class="btn" href="${AE.Router.href("catalogo")}">Explorar o catálogo</a>`;
    }

    const geral = AE.Store.progressoGeral();
    const totalAulas = mat.reduce((s, c) => s + AE.Store.leitura(c.slug).total, 0), feitasAulas = mat.reduce((s, c) => s + AE.Store.leitura(c.slug).feitas, 0);
    const respondidas = mat.reduce((s, c) => s + AE.Store.desempenho(c.slug).respondidas, 0), acertos = mat.reduce((s, c) => s + AE.Store.desempenho(c.slug).acertos, 0);

    const pend = atividadesPendentes().slice(0, 4);
    const recentes = resultadosRecentes();
    const projPend = mat.filter((c) => !AE.Store.projeto(c.slug).entrega);
    const pacotes = AE.Pacotes.filter((p) => p.cursos.some((s) => AE.Store.matriculado(s)));

    return {
      titulo: `Olá, ${primeiroNome()} 👋`,
      subtitulo: mat.length ? `Você está matriculado em ${AE.plural(mat.length, "curso", "cursos")}.` : "Matricule-se para acompanhar seu progresso.",
      html: `
        <div class="grid grid-hero">
          <article class="card hero">${hero}</article>
          <article class="card stat">
            <div class="ring" style="--p:${geral}" data-label="${geral}%"></div>
            <strong>${respondidas ? Math.round((acertos / respondidas) * 100) + "%" : "—"}</strong>
            <span>${respondidas ? `Acerto nas questões (${acertos}/${respondidas})` : "Acerto: nenhuma questão respondida"} · leitura ${geral}% (${feitasAulas}/${totalAulas} aulas)</span>
          </article>
        </div>

        <div class="grid grid-2">
          <article class="card"><h2>Cursos matriculados <a class="back" href="${AE.Router.href("biblioteca")}">biblioteca</a></h2>
            ${mat.length ? `<div class="grid grid-3">${mat.map(AE.UI.cursoCard).join("")}</div>` : AE.UI.vazio("Nenhum curso matriculado.", `<a class="btn btn-solid" href="${AE.Router.href("catalogo")}">Ver catálogo</a>`)}</article>
          <article class="card"><h2>Próximas atividades <a class="back" href="${AE.Router.href("atividades")}">ver todas</a></h2>
            <ul class="list">${pend.map((x) => AE.UI.item(`${esc(x.c.nome)} · Módulo ${x.m.n}`, `${esc(x.m.titulo)} · faltam ${x.restam} de ${x.d.total} questões`, `<a class="pill on" style="text-decoration:none" href="${AE.Router.href("atividades", x.c.slug, x.m.n)}">Praticar</a>`)).join("") || `<p class="muted">${mat.length ? "Nenhuma atividade pendente nos módulos publicados." : "Matricule-se para ver suas atividades."}</p>`}</ul></article>
        </div>

        <div class="grid grid-2">
          <article class="card"><h2>Resultados recentes</h2>
            <ul class="list">${recentes.map((r) => AE.UI.item(esc(r.titulo), `${esc(r.sub)} · ${AE.dataBR(r.data)}`, `<a class="pill" style="text-decoration:none" href="${r.href}">Abrir</a>`)).join("") || `<p class="muted">Nenhum resultado ainda. Responda uma atividade ou faça um simulado.</p>`}</ul></article>
          <article class="card"><h2>Projetos pendentes <a class="back" href="${AE.Router.href("projetos")}">ver projetos</a></h2>
            <ul class="list">${projPend.map((c) => { const p = AE.Projetos.porSlug(c.slug), feitos = Object.values(AE.Store.projeto(c.slug).checklist).filter(Boolean).length; return AE.UI.item(esc(p.titulo), `${esc(c.nome)} · checklist ${feitos}/${p.checklist.length}`, `<a class="pill on" style="text-decoration:none" href="${AE.Router.href("projetos", c.slug)}">Abrir</a>`); }).join("") || `<p class="muted">${mat.length ? "Todos os projetos têm entrega registrada." : "Sem projetos: nenhuma matrícula."}</p>`}</ul></article>
        </div>

        <article class="card"><h2>Formação em andamento</h2>
          ${pacotes.length ? pacotes.map((p) => `<div class="stack"><b>${esc(p.nome)}</b>
            <ul class="list">${p.cursos.map((s) => { const c = AE.curso(s), m = AE.Store.matriculado(s), l = AE.Store.leitura(s); return AE.UI.item(esc(c.nome), m ? `${l.pct}% lido · ${l.feitas}/${l.total} aulas` : `Não matriculado · ${moeda(c.preco)}`, m ? `<a class="pill on" style="text-decoration:none" href="${AE.Router.href("aprender", s)}">Estudar</a>` : `<a class="pill" style="text-decoration:none" href="${AE.Router.href("checkout", s)}">Matricular</a>`); }).join("")}</ul></div>`).join("") : AE.UI.vazio("Você não está em nenhuma formação.", `<a class="btn btn-soft" href="${AE.Router.href("formacao", "frontend")}">Conhecer a Formação Front-End</a>`)}
        </article>`
    };
  };
})(window.AE);
