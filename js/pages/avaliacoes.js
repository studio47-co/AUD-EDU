/* ==========================================================
   ATIVIDADES E SIMULADOS
   - Atividades: questões por módulo, com feedback imediato.
   - Simulados: sorteio de questões objetivas, correção ao enviar,
     resultado com explicações e histórico de tentativas.
   Tudo local e demonstrativo: NÃO é certificação.
   ========================================================== */
(function (AE) {
  const { esc, rich } = AE;
  const P = AE.Paginas, ui = AE.ui;

  const gateMatricula = (c) => ({
    titulo: c.nome, subtitulo: "Disponível para matriculados",
    html: AE.UI.vazio(`As atividades de <b>${esc(c.nome)}</b> são exclusivas para quem está matriculado (simulação).`,
      `<a class="btn btn-solid" href="${AE.Router.href("checkout", c.slug)}">Matricular-se · ${AE.moeda(c.preco)}</a>`)
  });

  /* ---------- ATIVIDADES ---------- */
  function linhasModulos(c) {
    return c.modulos.map((m) => {
      const pub = AE.Conteudo.statusModulo(c.slug, m.n) === "publicado";
      if (!pub) return `<div class="mod-row"><span class="qdot">${m.n}</span><div><strong>Módulo ${m.n} · ${esc(m.titulo)}</strong><span>Conteúdo e atividades em produção</span></div><span class="pill">Em produção</span></div>`;
      const d = AE.Store.desempenho(c.slug, m.n), pr = AE.Store.praticasResumo(c.slug, m.n);
      return `<a class="mod-row" href="${AE.Router.href("atividades", c.slug, m.n)}"><span class="qdot ${d.respondidas === d.total ? "on" : ""}">${m.n}</span>
        <div><strong>Módulo ${m.n} · ${esc(m.titulo)}</strong>
        <span>${d.respondidas}/${d.total} questões respondidas${d.respondidas ? ` · ${d.pct}% de acerto` : ""} · ${pr.feitas}/${pr.total} exercícios práticos feitos</span></div>
        <span class="pill on">Praticar</span></a>`;
    }).join("");
  }

  P.atividades = ([slug, n]) => {
    if (!slug) {
      const mat = AE.Store.matriculados();
      return {
        titulo: "Atividades", subtitulo: "Questões por módulo, com feedback imediato.",
        html: mat.length ? mat.map((c) => `<article class="card"><h2>${esc(c.nome)} <a class="back" href="${AE.Router.href("atividades", c.slug)}">abrir curso</a></h2><div class="stack" style="gap:12px">${linhasModulos(c)}</div></article>`).join("")
          : AE.UI.vazio("Você ainda não está matriculado em nenhum curso.", `<a class="btn btn-solid" href="${AE.Router.href("catalogo")}">Explorar o catálogo</a>`)
      };
    }
    const c = AE.curso(slug); if (!c) return P.naoencontrada();
    if (!AE.Store.matriculado(slug)) return gateMatricula(c);

    if (!n) return { titulo: c.nome, subtitulo: "Atividades por módulo",
      html: `<a class="back" href="${AE.Router.href("atividades")}">← Todas as atividades</a><article class="card"><h2>Módulos</h2><div class="stack" style="gap:12px">${linhasModulos(c)}</div></article>` };

    const mod = c.modulos.find((m) => m.n === Number(n));
    if (!mod) return P.naoencontrada();
    const qs = AE.Atividades.doModulo(slug, mod.n);
    if (!qs.length) return { titulo: c.nome, subtitulo: `Módulo ${mod.n} · ${mod.titulo}`, html: AE.UI.vazio("As atividades deste módulo ainda estão em produção.", `<a class="btn btn-soft" href="${AE.Router.href("atividades", slug)}">Voltar</a>`) };

    return {
      titulo: c.nome, subtitulo: `Atividades · Módulo ${mod.n} · ${mod.titulo}`,
      html: `
        <a class="back" href="${AE.Router.href("atividades", slug)}">← Módulos de ${esc(c.nome)}</a>
        <article class="card" id="resumo-mod">${P.resumoModulo(slug, mod.n)}</article>
        <div class="q-list">${qs.map((q, i) => AE.Quiz.atividade(q, i + 1)).join("")}</div>
        <div class="lesson-nav">
          <a class="btn btn-soft" href="${AE.Router.href("aprender", slug, AE.Conteudo.aulasDoModulo(slug, mod.n)[0].id)}">Rever as aulas do módulo</a>
          <div class="row"><button class="btn btn-solid" data-acao="simular-modulo" data-curso="${slug}" data-modulo="${mod.n}" type="button">Fazer simulado deste módulo</button></div>
        </div>`
    };
  };

  P.resumoModulo = (slug, n) => {
    const d = AE.Store.desempenho(slug, n), pr = AE.Store.praticasResumo(slug, n);
    return `<h2>Seu desempenho neste módulo</h2><div class="progress-set">
      ${AE.UI.medida("Questões objetivas respondidas", `${d.respondidas} de ${d.total}`, d.cobertura)}
      ${AE.UI.medida("Acertos entre as respondidas", d.respondidas ? `${d.acertos} de ${d.respondidas} · ${d.pct}%` : "ainda sem respostas", d.respondidas ? d.pct : 0)}
      ${AE.UI.medida("Exercícios práticos marcados como feitos", `${pr.feitas} de ${pr.total}`, AE.pct(pr.feitas, pr.total))}</div>`;
  };

  /* ---------- SIMULADOS ---------- */
  const cfg = () => {
    const mat = AE.Store.matriculados();
    if (!ui.sim || !mat.some((c) => c.slug === ui.sim.slug)) ui.sim = { slug: mat[0] ? mat[0].slug : null, modulo: 0, qtd: 5 };
    return ui.sim;
  };

  function configurador() {
    const mat = AE.Store.matriculados(); if (!mat.length) return AE.UI.vazio("Matricule-se em um curso para fazer simulados.", `<a class="btn btn-solid" href="${AE.Router.href("catalogo")}">Explorar o catálogo</a>`);
    const k = cfg(), c = AE.curso(k.slug);
    const pubs = c.modulos.filter((m) => AE.Conteudo.statusModulo(c.slug, m.n) === "publicado");
    const pool = AE.Atividades.objetivas(k.slug, k.modulo);
    const opcoes = [5, 10].filter((q) => q < pool.length).concat([pool.length]);
    if (!opcoes.includes(k.qtd)) k.qtd = opcoes[0];
    const tab = (acao, v, rot, atual) => `<button class="tab" role="tab" aria-selected="${atual === v}" data-acao="${acao}" data-v="${v}" type="button">${rot}</button>`;
    return `<div class="stack" style="gap:20px">
      <div><div class="kicker" style="margin-bottom:8px">Curso</div><div class="tabs" role="tablist">${mat.map((x) => tab("sim-curso", x.slug, esc(x.nome), k.slug)).join("")}</div></div>
      <div><div class="kicker" style="margin-bottom:8px">Módulo</div><div class="tabs" role="tablist">${tab("sim-modulo", 0, "Todos os módulos", k.modulo)}${pubs.map((m) => tab("sim-modulo", m.n, `Módulo ${m.n}`, k.modulo)).join("")}</div></div>
      <div><div class="kicker" style="margin-bottom:8px">Quantidade de questões</div><div class="tabs" role="tablist">${opcoes.map((q) => tab("sim-qtd", q, q === pool.length ? `Todas (${q})` : q, k.qtd)).join("")}</div></div>
      <div class="row"><button class="btn btn-solid" data-acao="iniciar-sim" type="button" ${pool.length ? "" : "disabled"}>Iniciar simulado</button>
        <span class="muted">${pool.length} questões objetivas disponíveis · ordem sorteada</span></div></div>`;
  }

  P.simulados = ([a, id]) => {
    if (a === "executar") return executar();
    if (a === "resultado") return resultado(id);
    if (a) return P.naoencontrada();
    const atual = AE.Store.estado.simAtual, hist = AE.Store.estado.simulados;
    return {
      titulo: "Simulados", subtitulo: "Treino cronometrado só por você: sem certificação.",
      html: `
        ${AE.UI.aviso("Os simulados são <b>demonstrativos</b>: servem para estudo e ficam salvos apenas neste navegador. Não são exames nem certificações.")}
        ${atual ? `<article class="card"><h2>Simulado em andamento</h2><p class="muted">${esc(AE.curso(atual.slug).nome)} · ${atual.ids.length} questões · ${Object.keys(atual.respostas).length} respondidas</p>
          <div class="row" style="margin-top:16px"><a class="btn btn-solid" href="${AE.Router.href("simulados", "executar")}">Continuar</a><button class="btn btn-soft" data-acao="sim-descartar" type="button">Descartar</button></div></article>` : ""}
        <article class="card"><h2>Novo simulado</h2>${configurador()}</article>
        <article class="card"><h2>Histórico de tentativas <span>${hist.length}</span></h2>
          <ul class="list">${hist.map((t) => AE.UI.item(`${esc(AE.curso(t.slug).nome)}${t.modulo ? ` · módulo ${t.modulo}` : " · todos os módulos"}`, `${t.acertos} de ${t.total} acertos (${AE.pct(t.acertos, t.total)}%)${t.emBranco ? ` · ${t.emBranco} em branco` : ""} · ${AE.dataBR(t.data)}`, `<a class="pill on" style="text-decoration:none" href="${AE.Router.href("simulados", "resultado", t.id)}">Ver correção</a>`)).join("") || `<p class="muted">Nenhuma tentativa ainda.</p>`}</ul></article>`
    };
  };

  function executar() {
    const s = AE.Store.estado.simAtual;
    if (!s) return { redirect: AE.Router.href("simulados") };
    const q = AE.Atividades.porId(s.ids[s.atual]), c = AE.curso(s.slug), n = s.ids.length;
    const branco = n - Object.keys(s.respostas).length;
    return {
      titulo: "Simulado", subtitulo: `${c.nome}${s.modulo ? ` · módulo ${s.modulo}` : ""} · demonstrativo`,
      html: `
        <article class="card stack">
          <div class="row"><b>Questão ${s.atual + 1} de ${n}</b><span class="muted right">${branco ? `${branco} sem resposta` : "todas respondidas"}</span></div>
          <div class="dots" role="group" aria-label="Navegação entre questões">${s.ids.map((_, i) => `<button class="qdot ${s.respostas[i] !== undefined ? "on" : ""} ${i === s.atual ? "cur" : ""}" data-acao="sim-ir" data-n="${i}" type="button" aria-label="Ir para a questão ${i + 1}" ${i === s.atual ? 'aria-current="true"' : ""}>${i + 1}</button>`).join("")}</div>
        </article>
        <article class="card q">${AE.Quiz.cabecalho(q, 0)}${AE.Quiz.opcoes(q, { marcada: s.respostas[s.atual], acao: "sim-opcao" })}
          <p class="muted">O gabarito e a explicação aparecem depois de enviar as respostas.</p></article>
        <div class="lesson-nav">
          <button class="btn btn-soft" data-acao="sim-ir" data-n="${s.atual - 1}" type="button" ${s.atual === 0 ? "disabled" : ""}>← Anterior</button>
          <div class="row">
            <button class="btn btn-soft" data-acao="sim-ir" data-n="${s.atual + 1}" type="button" ${s.atual === n - 1 ? "disabled" : ""}>Próxima →</button>
            <button class="btn btn-solid" data-acao="sim-enviar" type="button">Enviar respostas${branco ? ` (${branco} em branco)` : ""}</button>
          </div></div>`
    };
  }

  function resultado(id) {
    const t = AE.Store.tentativa(id); if (!t) return P.naoencontrada();
    const c = AE.curso(t.slug), p = AE.pct(t.acertos, t.total);
    return {
      titulo: "Resultado do simulado", subtitulo: `${c.nome}${t.modulo ? ` · módulo ${t.modulo}` : " · todos os módulos"} · ${AE.dataBR(t.data)}`,
      html: `
        <article class="card"><div class="score"><div class="big">${t.acertos}/${t.total}</div>
          <div><b>${p}% de acerto</b><p class="muted">${t.emBranco ? `${t.emBranco} questões em branco. ` : ""}${p >= AE.Store.NOTA_MINIMA ? `Acima da referência de ${AE.Store.NOTA_MINIMA}% usada nos requisitos.` : `Abaixo da referência de ${AE.Store.NOTA_MINIMA}% usada nos requisitos. Revise as explicações abaixo.`}</p></div></div></article>
        ${AE.UI.aviso("Resultado <b>demonstrativo</b>, armazenado no navegador. Não é certificação nem comprova aprendizagem.")}
        <div class="q-list">${t.detalhe.map((d, i) => AE.Quiz.revisao(AE.Atividades.porId(d.id), d.resp, i + 1)).join("")}</div>
        <div class="row"><a class="btn btn-solid" href="${AE.Router.href("simulados")}">Novo simulado</a>
          <a class="btn btn-soft" href="${AE.Router.href("atividades", t.slug)}">Voltar às atividades</a></div>`
    };
  }

  /* ---------- AÇÕES ---------- */
  Object.assign(AE.Acoes, {
    opcao: (el) => { AE.Quiz.selecao[el.dataset.q] = Number(el.dataset.i); AE.Quiz.atualizar(el.dataset.q); },
    responder: (el) => {
      const q = AE.Atividades.porId(el.dataset.q), sel = AE.Quiz.selecao[q.id]; if (sel === undefined) return;
      AE.Store.responder(q, sel); delete AE.Quiz.selecao[q.id]; AE.Quiz.atualizar(q.id);
      const r = AE.$("#resumo-mod"); if (r) r.innerHTML = P.resumoModulo(q.curso, q.modulo);
    },
    refazer: (el) => {
      const q = AE.Atividades.porId(el.dataset.q); AE.Store.limparResposta(q.id); delete AE.Quiz.selecao[q.id]; AE.Quiz.atualizar(q.id);
      const r = AE.$("#resumo-mod"); if (r) r.innerHTML = P.resumoModulo(q.curso, q.modulo);
    },
    pratica: (el) => {
      const q = AE.Atividades.porId(el.dataset.q); AE.Store.alternarPratica(q.id); AE.Quiz.atualizar(q.id);
      const r = AE.$("#resumo-mod"); if (r) r.innerHTML = P.resumoModulo(q.curso, q.modulo);
    },
    "sim-curso": (el) => { ui.sim = { slug: el.dataset.v, modulo: 0, qtd: 5 }; AE.renderizar(); },
    "sim-modulo": (el) => { cfg().modulo = Number(el.dataset.v); AE.renderizar(); },
    "sim-qtd": (el) => { cfg().qtd = Number(el.dataset.v); AE.renderizar(); },
    "iniciar-sim": () => { const k = cfg(); AE.Store.iniciarSimulado(k.slug, k.modulo, k.qtd); AE.Router.ir("simulados", "executar"); },
    "simular-modulo": (el) => { AE.Store.iniciarSimulado(el.dataset.curso, Number(el.dataset.modulo), 0); AE.Router.ir("simulados", "executar"); },
    "sim-opcao": (el) => { const s = AE.Store.estado.simAtual; AE.Store.marcarSim(s.atual, Number(el.dataset.i)); AE.renderizar(); },
    "sim-ir": (el) => { const n = Number(el.dataset.n), s = AE.Store.estado.simAtual; if (s && n >= 0 && n < s.ids.length) { AE.Store.irSim(n); AE.renderizar(); } },
    "sim-enviar": () => { const t = AE.Store.finalizarSimulado(); if (t) AE.Router.ir("simulados", "resultado", t.id); },
    "sim-descartar": () => { AE.Store.descartarSim(); AE.renderizar(); AE.aviso("Simulado descartado."); }
  });
})(window.AE);
