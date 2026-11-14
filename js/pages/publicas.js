/* ==========================================================
   PÁGINAS PÚBLICAS — início, catálogo, curso, formação, metodologia
   Contrato: AE.Paginas[nome](params) => { titulo, subtitulo?, html }
   ========================================================== */
(function (AE) {
  const { esc, rich, moeda } = AE;
  const P = AE.Paginas = AE.Paginas || {};
  const ui = AE.ui = AE.ui || { busca: "", categoria: "Todos", nivel: "Todos", aba: {}, aulaAberta: null };

  /* ---------- INÍCIO ---------- */
  P.inicio = () => {
    const pacote = AE.Pacotes[0];
    const totalHoras = AE.Cursos.reduce((s, c) => s + c.horas, 0);
    return {
      titulo: "AUDMANI Education",
      html: `
        <div class="grid grid-hero">
          <article class="card hero">
            <div><span class="kicker">AUDMANI Education</span>
              <h1>Aprenda front-end construindo páginas de verdade.</h1>
              <p>Cursos livres e formações profissionais com aulas completas, exercícios com feedback, simulados e projetos práticos.</p></div>
            <div class="row"><a class="btn" href="${AE.Router.href("catalogo")}">Explorar o catálogo</a>
              <a class="btn btn-ghost" href="${AE.Router.href("formacao", pacote.slug)}">Ver a formação Front-End</a></div>
          </article>
          <article class="card stat" style="gap:14px">
            <div><strong>${AE.Cursos.length} cursos</strong><span>HTML5, CSS3 e JavaScript</span></div>
            <div><strong>${totalHoras} h</strong><span>carga horária proposta (em validação)</span></div>
            <div><strong>${AE.Pacotes.length} formação</strong><span>${esc(pacote.nome)}</span></div>
          </article>
        </div>

        ${UI().secao("Como o estudo funciona", "Sem atalhos: cada curso segue a mesma estrutura.", `
          <div class="grid grid-3">
            <article class="card"><h2>Aulas completas</h2><p class="muted">Cada aula traz objetivos, explicação, exemplos comentados, erros comuns, boas práticas, exercícios com resolução e referências técnicas.</p></article>
            <article class="card"><h2>Prática em cada módulo</h2><p class="muted">Atividades com feedback imediato, simulados corrigidos e um projeto final por curso.</p></article>
            <article class="card"><h2>Progresso transparente</h2><p class="muted">Leitura, desempenho nas questões e requisitos de conclusão são medidos separadamente.</p></article>
          </div>`, `<a class="back" href="${AE.Router.href("metodologia")}">ver a metodologia</a>`)}

        ${UI().secao("Cursos", "Estude individualmente ou em formação.", `<div class="grid grid-3">${AE.Cursos.map(AE.UI.cursoCard).join("")}</div>`, `<a class="back" href="${AE.Router.href("catalogo")}">ver catálogo</a>`)}

        <article class="card"><div class="pack">
          <div class="stack"><span class="tag-static">Formação · ${esc(pacote.nivel)}</span>
            <h2 style="font-size:1.5rem;margin:0;display:block">${esc(pacote.nome)}</h2>
            <p class="muted">${esc(pacote.descricao)}</p>
            <div class="row"><div class="price-big">${moeda(pacote.preco)}<small>em vez de <span class="riscado">${moeda(AE.somaCursos(pacote))}</span> · valores demonstrativos</small></div></div>
            <div class="row"><a class="btn btn-solid" href="${AE.Router.href("formacao", pacote.slug)}">Conhecer a formação</a></div></div>
          <ol>${pacote.cursos.map((s) => { const c = AE.curso(s); return `<li>${esc(c.nome)}<span>${c.horas} h</span></li>`; }).join("")}</ol>
        </div></article>`
    };
  };

  const UI = () => AE.UI;

  /* ---------- CATÁLOGO ---------- */
  const categorias = () => ["Todos", ...new Set(AE.Cursos.map((c) => c.categoria)), "Formações"];
  const niveis = () => ["Todos", ...new Set(AE.Cursos.map((c) => c.nivel))];

  P.catalogoResultados = () => {
    const t = AE.norm(ui.busca);
    const casa = (o) => AE.norm([o.nome, o.resumo, o.categoria, (o.modulos || []).map((m) => m.titulo + " " + m.topicos.join(" ")).join(" ")].join(" ")).includes(t);
    const cursos = ui.categoria === "Formações" ? [] : AE.Cursos.filter((c) => (ui.categoria === "Todos" || c.categoria === ui.categoria) && (ui.nivel === "Todos" || c.nivel === ui.nivel) && casa(c));
    const pacotes = AE.Pacotes.filter((p) => (ui.categoria === "Todos" || ui.categoria === "Formações" || p.categoria === ui.categoria) && (ui.nivel === "Todos" || p.nivel === ui.nivel) && casa({ ...p, modulos: [] }));
    if (!cursos.length && !pacotes.length) return UI().vazio("Nenhum curso encontrado com esses filtros.", `<button class="btn btn-soft" data-acao="limpar-filtros" type="button">Limpar filtros</button>`);
    return `
      ${cursos.length ? UI().secao("Cursos individuais", AE.plural(cursos.length, "curso", "cursos"), `<div class="grid grid-3">${cursos.map(AE.UI.cursoCard).join("")}</div>`) : ""}
      ${pacotes.length ? UI().secao("Formações (pacotes)", "Cursos agrupados com preço de pacote.", `<div class="grid grid-3">${pacotes.map(AE.UI.pacoteCard).join("")}</div>`) : ""}`;
  };

  P.catalogo = () => ({
    titulo: "Catálogo de cursos",
    html: `
      <section class="section"><header><div><h2 style="font-size:1.8rem">Catálogo</h2><p>Pesquise por curso, módulo ou tópico. Preços demonstrativos.</p></div></header></section>
      <article class="card filters">
        <label class="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input id="busca-cat" type="search" placeholder="Buscar curso, módulo ou tópico (ex.: Flexbox)" aria-label="Buscar no catálogo" value="${esc(ui.busca)}"></label>
        <div><div class="kicker" style="margin-bottom:8px">Categoria</div><div class="tabs" role="tablist" id="tabs-cat">${P.tabsCat()}</div></div>
        <div><div class="kicker" style="margin-bottom:8px">Nível</div><div class="tabs" role="tablist" id="tabs-nivel">${P.tabsNivel()}</div></div>
      </article>
      <div id="cat-res" class="stack" style="gap:28px">${P.catalogoResultados()}</div>`
  });
  P.tabsCat = () => categorias().map((c) => `<button class="tab" role="tab" aria-selected="${ui.categoria === c}" data-acao="filtro-cat" data-v="${esc(c)}" type="button">${esc(c)}</button>`).join("");
  P.tabsNivel = () => niveis().map((n) => `<button class="tab" role="tab" aria-selected="${ui.nivel === n}" data-acao="filtro-nivel" data-v="${esc(n)}" type="button">${esc(n)}</button>`).join("");

  /* ---------- CURSO ---------- */
  function programatico(c) {
    return c.modulos.map((m) => {
      const aulas = AE.Conteudo.aulasDoModulo(c.slug, m.n), pub = AE.Conteudo.statusModulo(c.slug, m.n) === "publicado";
      return `<div class="modulo">
        <h3>Módulo ${m.n} — ${esc(m.titulo)} <span>${pub ? `${AE.plural(aulas.length, "aula", "aulas")} · ${AE.horas(aulas.reduce((s, a) => s + a.minutos, 0))} de leitura estimada` : "Conteúdo em produção"}</span></h3>
        ${UI().chips(m.topicos)}
        ${aulas.length ? `<ul class="aulas-lista">${aulas.map((a, i) => `<li><div><strong>Aula ${a.id.replace(/^m(\d+)a(\d+)$/, "$1.$2")} · ${esc(a.titulo)}</strong><span>${a.minutos} min</span></div>
          ${m.n === 1 && i === 0 ? `<a class="pill on" href="${AE.Router.href("aprender", c.slug, a.id)}" style="text-decoration:none">Aula gratuita</a>` : ""}</li>`).join("")}</ul>` : ""}
      </div>`;
    }).join("");
  }

  P.curso = ([slug]) => {
    const c = AE.curso(slug); if (!c) return P.naoencontrada();
    const item = AE.itemCompra(c.slug), mat = AE.Store.matriculado(c.slug), pacote = AE.pacote(c.pacote);
    const projeto = AE.Projetos.porSlug(c.slug), prox = AE.Store.proximaAula(c.slug);
    const publicados = c.modulos.filter((m) => AE.Conteudo.statusModulo(c.slug, m.n) === "publicado").length;
    return {
      titulo: c.nome,
      html: `
        <a class="back" href="${AE.Router.href("catalogo")}">← Voltar ao catálogo</a>
        <div class="grid grid-2" style="align-items:start">
          <div class="stack" style="gap:24px">
            <article class="card"><span class="tag-static">${esc(c.categoria)} · ${esc(c.nivel)}</span>
              <h2 style="font-size:1.8rem;margin:12px 0 8px;display:block;letter-spacing:-.02em">${esc(c.nome)}</h2>
              <p class="lead">${esc(c.descricao)}</p></article>
            <article class="card"><h2>O que você vai aprender</h2><ul class="bullets">${c.aprendera.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></article>
            <article class="card"><h2>Conteúdo programático <span>${publicados} de ${c.modulos.length} módulos publicados</span></h2>${programatico(c)}</article>
            <article class="card"><h2>Pré-requisitos</h2><ul class="bullets">${c.prerequisitos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></article>
            ${projeto ? `<article class="card"><h2>Projeto final</h2><p><b>${esc(projeto.titulo)}</b></p><p class="muted" style="margin-top:6px">${rich(projeto.objetivo)}</p></article>` : ""}
          </div>
          <aside class="card sticky stack">
            <div class="price-big">${moeda(c.preco)}<small>preço demonstrativo, pagamento único</small></div>
            ${mat ? `<a class="btn btn-solid btn-block" href="${AE.Router.href("aprender", c.slug)}">${prox && AE.Store.aulasFeitas(c.slug).length ? "Continuar estudando" : "Começar a estudar"}</a>` : AE.UI.botaoMatricula(item).replace('class="btn', 'class="btn btn-block')}
            <dl class="dl"><div><dt>Carga proposta</dt><dd>${c.horas} h</dd></div><div><dt>Módulos</dt><dd>${c.modulos.length}</dd></div><div><dt>Nível</dt><dd>${esc(c.nivel)}</dd></div></dl>
            ${pacote ? `<div class="aviso" style="flex-direction:column"><p>Também na <b>${esc(pacote.nome)}</b> por ${moeda(pacote.preco)} (3 cursos).</p><a class="back" href="${AE.Router.href("formacao", pacote.slug)}">ver formação →</a></div>` : ""}
            ${AE.UI.aviso("A matrícula é uma <b>simulação</b>: nenhum pagamento é processado.")}
          </aside>
        </div>`
    };
  };

  /* ---------- FORMAÇÃO ---------- */
  P.formacao = ([slug]) => {
    const p = AE.pacote(slug); if (!p) return P.naoencontrada();
    const item = AE.itemCompra("pacote-" + p.slug), soma = AE.somaCursos(p), eco = Math.round((soma - p.preco) * 100) / 100;
    const integrador = AE.Projetos.porSlug(p.slug);
    return {
      titulo: p.nome,
      html: `
        <a class="back" href="${AE.Router.href("catalogo")}">← Voltar ao catálogo</a>
        <article class="card hero"><div><span class="kicker">Formação profissional</span><h1>${esc(p.nome)}</h1><p>${esc(p.descricao)}</p></div>
          <div class="row"><span class="tag-static" style="box-shadow:none;background:var(--on-accent);color:var(--accent)">${AE.horasPacote(p)} h propostas</span><span class="tag-static" style="box-shadow:none;background:var(--on-accent);color:var(--accent)">${p.cursos.length} cursos</span></div></article>
        <div class="grid grid-2" style="align-items:start">
          <div class="stack" style="gap:24px">
            <article class="card"><h2>Sequência recomendada</h2>
              <div class="stack" style="gap:12px">${p.cursos.map((s, i) => { const c = AE.curso(s); return `
                <a class="mod-row" href="${AE.Router.href("curso", c.slug)}"><span class="qdot on">${i + 1}</span><div><strong>${esc(c.nome)}</strong><span>${esc(c.resumo)}</span></div><span class="pill">${c.horas} h</span></a>`; }).join("")}</div></article>
            ${integrador ? `<article class="card"><h2>Projeto integrador</h2><p><b>${esc(integrador.titulo)}</b></p><p class="muted" style="margin-top:6px">${rich(integrador.objetivo)}</p></article>` : ""}
          </div>
          <aside class="card sticky stack">
            <div class="price-big">${moeda(p.preco)}<small>preço demonstrativo da formação</small></div>
            <div><div class="linha"><span>Cursos separados</span><span class="riscado">${moeda(soma)}</span></div>
              <div class="linha"><span>Economia no pacote</span><b>${moeda(eco)} (${Math.round((eco / soma) * 100)}%)</b></div></div>
            ${AE.UI.botaoMatricula(item).replace('class="btn', 'class="btn btn-block')}
            ${AE.UI.aviso("Valores ilustrativos, sujeitos a alteração. Sem pagamento real.")}
          </aside>
        </div>`
    };
  };

  /* ---------- METODOLOGIA ---------- */
  P.metodologia = () => ({
    titulo: "Metodologia",
    html: `
      <section class="section"><header><div><h2 style="font-size:1.8rem">Metodologia</h2><p>Como os cursos são construídos e como o progresso é medido.</p></div></header></section>
      <div class="grid grid-2" style="align-items:start">
        <article class="card"><h2>Anatomia de uma aula</h2>
          <ol class="bullets">${["Objetivos de aprendizagem", "Explicação conceitual", "Exemplos práticos", "Código comentado, quando aplicável", "Explicação do funcionamento do código", "Erros comuns", "Boas práticas", "Exercícios", "Resolução comentada", "Referências técnicas"].map((x) => `<li>${x}</li>`).join("")}</ol></article>
        <article class="card"><h2>Três medidas de progresso</h2><div class="stack">
          <div><b>Leitura</b><p class="muted">Aulas que você marcou como concluídas.</p></div>
          <div><b>Desempenho</b><p class="muted">Percentual de acertos nas questões objetivas (atividades e simulados).</p></div>
          <div><b>Requisitos</b><p class="muted">Condições para elegibilidade ao certificado: aulas, questões, acerto mínimo de ${AE.Store.NOTA_MINIMA}% e projeto entregue.</p></div></div></article>
      </div>
      <article class="card"><h2>Como você pratica</h2><div class="grid grid-3">
        <div><b>Atividades</b><p class="muted">Cinco tipos por módulo: múltipla escolha, verdadeiro ou falso, interpretação de código, identificação de erros e exercícios práticos.</p></div>
        <div><b>Simulados</b><p class="muted">Escolha curso e módulo, responda, envie e veja a correção comentada. O histórico fica salvo.</p></div>
        <div><b>Projetos</b><p class="muted">Briefing, requisitos, etapas, critérios e checklist, com campo para registrar a entrega.</p></div></div></article>
      <article class="card"><h2>O que é demonstrativo nesta versão</h2>
        <ul class="bullets">
          <li>Preços, cupons e matrícula: simulação, sem pagamento e sem dados de cartão.</li>
          <li>Progresso e resultados: ficam no seu navegador (<code>localStorage</code>) e podem ser editados por quem usa o aparelho. Por isso não são prova de aprendizagem.</li>
          <li>Simulados: servem para estudo. Não são certificações.</li>
          <li>Projetos: a entrega é registrada localmente. Não há avaliação automática nem por tutor.</li>
          <li>Certificados: nenhum é emitido. Certificados verificáveis dependem de um servidor (etapa futura).</li>
          <li>Descontos escolares: apenas a interface e a estrutura de dados. Nenhum vínculo é verificado.</li>
        </ul></article>`
  });

  P.naoencontrada = () => ({
    titulo: "Página não encontrada",
    html: UI().vazio("Esse endereço não existe nesta plataforma.", `<a class="btn btn-solid" href="${AE.Router.href("inicio")}">Voltar ao início</a>`)
  });
})(window.AE);
