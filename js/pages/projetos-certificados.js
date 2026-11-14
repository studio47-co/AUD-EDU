/* ==========================================================
   PROJETOS PRÁTICOS e CERTIFICADOS
   - Projetos: briefing, objetivo, requisitos, etapas, critérios, checklist
     e registro de entrega (local). SEM avaliação automática.
   - Certificados: apenas acompanhamento de requisitos e elegibilidade.
     NENHUM certificado é emitido (dependem de servidor e verificação).
   ========================================================== */
(function (AE) {
  const { esc, rich } = AE;
  const P = AE.Paginas;

  /** O projeto integrador usa o slug do pacote ("frontend"). */
  const ehIntegrador = (slug) => Boolean(AE.pacote(slug));
  const estaLiberado = (slug) => ehIntegrador(slug) ? AE.Store.formacaoMatriculada(AE.pacote(slug)) : AE.Store.matriculado(slug);
  const nomeDe = (slug) => ehIntegrador(slug) ? AE.pacote(slug).nome : AE.curso(slug).nome;
  const todosOsProjetos = () => [...AE.Cursos.map((c) => c.slug), ...AE.Pacotes.map((p) => p.slug)].filter((s) => AE.Projetos.porSlug(s));

  /* ---------- PROJETOS ---------- */
  P.projetos = ([slug]) => {
    if (!slug) {
      const itens = todosOsProjetos();
      return {
        titulo: "Projetos", subtitulo: "Um projeto final por curso e um integrador na formação.",
        html: `${AE.UI.aviso("A entrega é <b>registrada localmente</b>. Não há avaliação automática: use os critérios para autoavaliar o seu trabalho.")}
          <div class="grid grid-3">${itens.map((s) => {
            const p = AE.Projetos.porSlug(s), st = AE.Store.projeto(s), feitos = Object.values(st.checklist).filter(Boolean).length, lib = estaLiberado(s);
            return `<a class="card course" href="${AE.Router.href("projetos", s)}">
              <span class="tag">${ehIntegrador(s) ? "Projeto integrador" : "Projeto final"} · ${esc(nomeDe(s))}</span>
              <h3>${esc(p.titulo)}</h3><p>${rich(p.objetivo)}</p>
              ${AE.UI.barra(AE.pct(feitos, p.checklist.length), "Checklist")}
              <div class="meta"><span>Checklist ${feitos}/${p.checklist.length}</span><span>${st.entrega ? "Entrega registrada" : lib ? "Sem entrega" : "Bloqueado"}</span></div></a>`;
          }).join("")}</div>`
      };
    }
    const p = AE.Projetos.porSlug(slug); if (!p) return P.naoencontrada();
    if (!estaLiberado(slug)) {
      const alvo = ehIntegrador(slug) ? AE.Router.href("formacao", slug) : AE.Router.href("checkout", slug);
      return { titulo: p.titulo, subtitulo: nomeDe(slug), html: AE.UI.vazio(ehIntegrador(slug) ? "O projeto integrador é liberado para quem estiver matriculado nos três cursos da formação." : "Este projeto é liberado para quem estiver matriculado no curso (simulação).", `<a class="btn btn-solid" href="${alvo}">${ehIntegrador(slug) ? "Ver formação" : "Matricular-se"}</a>`) };
    }
    const st = AE.Store.projeto(slug), feitos = Object.values(st.checklist).filter(Boolean).length;
    return {
      titulo: p.titulo, subtitulo: `${ehIntegrador(slug) ? "Projeto integrador" : "Projeto final"} · ${nomeDe(slug)}`,
      html: `
        <a class="back" href="${AE.Router.href("projetos")}">← Todos os projetos</a>
        <div class="grid grid-2" style="align-items:start">
          <div class="stack" style="gap:24px">
            <article class="card"><h2>Briefing</h2><div class="prose">${p.briefing.map((x) => `<p>${rich(x)}</p>`).join("")}</div></article>
            <article class="card"><h2>Objetivo</h2><p>${rich(p.objetivo)}</p></article>
            <article class="card"><h2>Requisitos</h2><ul class="bullets">${p.requisitos.map((x) => `<li>${rich(x)}</li>`).join("")}</ul></article>
            <article class="card"><h2>Etapas</h2><div class="stack" style="gap:12px">${p.etapas.map((e, i) => `<div class="erro-item"><span>${i + 1}</span><div><strong>${rich(e.t)}</strong>${rich(e.x)}</div></div>`).join("")}</div></article>
            <article class="card"><h2>Critérios de avaliação <span>autoavaliação</span></h2>
              <div class="scroll-x"><table class="table criterios"><thead><tr><th>Critério</th><th>O que se espera</th></tr></thead><tbody>${p.criterios.map((c) => `<tr><td><b>${rich(c.c)}</b></td><td>${rich(c.d)}</td></tr>`).join("")}</tbody></table></div></article>
          </div>
          <div class="stack sticky" style="gap:24px">
            <article class="card"><h2>Checklist <span>${feitos}/${p.checklist.length}</span></h2>${AE.UI.barra(AE.pct(feitos, p.checklist.length), "Checklist do projeto")}
              <div class="stack" style="gap:10px;margin-top:14px">${p.checklist.map((x, i) => `<button class="check ${st.checklist[i] ? "done" : ""}" data-acao="checklist" data-slug="${slug}" data-i="${i}" type="button" aria-pressed="${Boolean(st.checklist[i])}"><span class="box" aria-hidden="true">${st.checklist[i] ? "✓" : ""}</span><div><strong>${rich(x)}</strong></div></button>`).join("")}</div></article>
            <article class="card"><h2>Registrar entrega</h2>
              ${st.entrega ? `<div class="feedback"><b>Entrega registrada em ${AE.dataBR(st.entrega.data)}</b><div>${st.entrega.link ? `Link: ${esc(st.entrega.link)}<br>` : ""}${st.entrega.notas ? esc(st.entrega.notas) : ""}</div></div>
                <p class="muted" style="margin:12px 0">Registro local e demonstrativo. Nenhuma avaliação foi realizada.</p>
                <button class="btn btn-soft" data-acao="remover-entrega" data-slug="${slug}" type="button">Remover registro</button>`
              : `<form data-form="entrega-projeto" data-slug="${slug}">
                  <div class="field"><label for="ent-link">Link do projeto (repositório ou página publicada)</label><input id="ent-link" name="link" type="url" placeholder="https://…"></div>
                  <div class="field"><label for="ent-notas">Observações sobre a sua entrega</label><textarea id="ent-notas" name="notas" rows="4" placeholder="O que você construiu e o que gostaria de melhorar"></textarea></div>
                  <button class="btn btn-solid" type="submit">Registrar entrega (simulado)</button></form>`}
            </article>
          </div>
        </div>`
    };
  };

  /* ---------- CERTIFICADOS ---------- */
  function listaRequisitos(reqs) {
    return `<div class="stack" style="gap:8px">${reqs.map((r) => `<div class="pratica-item"><span aria-hidden="true">${r.ok ? "✓" : "–"}</span><div>${esc(r.rotulo)}</div></div>`).join("")}</div>`;
  }

  P.certificados = () => {
    const cursos = AE.Cursos.map((c) => {
      const mat = AE.Store.matriculado(c.slug), reqs = AE.Store.requisitos(c.slug), el = mat && reqs.every((r) => r.ok);
      return `<article class="card stack"><div class="row"><div><span class="tag-static">${esc(c.categoria)}</span><h2 style="margin:8px 0 0;display:block;font-size:1.3rem">${esc(c.nome)}</h2></div>
        <span class="pill ${el ? "on" : ""} right">${!mat ? "Não matriculado" : el ? "Requisitos atendidos" : "Requisitos pendentes"}</span></div>
        ${mat ? AE.medidasCurso(c.slug) : `<p class="muted">Matricule-se para acompanhar o progresso deste curso.</p>`}
        ${mat ? `<details class="reveal"><summary>Ver requisitos</summary><div class="reveal-body">${listaRequisitos(reqs)}</div></details>` : ""}
        <button class="btn btn-soft" type="button" disabled>${el ? "Emissão indisponível nesta versão" : "Certificado indisponível"}</button></article>`;
    }).join("");

    const pac = AE.Pacotes[0], matPac = AE.Store.formacaoMatriculada(pac);
    const reqPac = [
      ...pac.cursos.map((s) => ({ rotulo: `Requisitos de ${AE.curso(s).nome} atendidos`, ok: AE.Store.matriculado(s) && AE.Store.elegivel(s) })),
      { rotulo: "Projeto integrador com entrega registrada", ok: Boolean(AE.Store.projeto(pac.slug).entrega) }
    ];
    const elPac = matPac && reqPac.every((r) => r.ok);

    return {
      titulo: "Certificados", subtitulo: "Elegibilidade e requisitos por curso e formação.",
      html: `
        ${AE.UI.aviso("<b>Nenhum certificado é emitido nesta versão.</b> Esta área mostra apenas se você cumpriria os requisitos. Certificados reais e verificáveis dependem de um servidor, que ainda não existe: dados guardados no navegador podem ser alterados por quem usa o aparelho.", "Importante")}
        <div class="grid grid-3" style="grid-template-columns:repeat(auto-fill,minmax(min(320px,100%),1fr))">${cursos}</div>
        <article class="card stack"><div class="row"><div><span class="tag-static">Formação</span><h2 style="margin:8px 0 0;display:block;font-size:1.3rem">${esc(pac.nome)}</h2></div>
          <span class="pill ${elPac ? "on" : ""} right">${!matPac ? "Não matriculado na formação" : elPac ? "Requisitos atendidos" : "Requisitos pendentes"}</span></div>
          ${listaRequisitos(reqPac)}
          <button class="btn btn-soft" type="button" disabled>Emissão indisponível nesta versão</button></article>`
    };
  };

  /* ---------- AÇÕES ---------- */
  Object.assign(AE.Acoes, {
    checklist: (el) => { AE.Store.alternarChecklist(el.dataset.slug, Number(el.dataset.i)); AE.renderizar(); },
    "remover-entrega": (el) => { AE.Store.removerEntrega(el.dataset.slug); AE.renderizar(); AE.aviso("Registro de entrega removido."); }
  });
  AE.Forms["entrega-projeto"] = (f) => {
    const link = f.link.value.trim(), notas = f.notas.value.trim();
    if (!link && !notas) { AE.aviso("Informe um link ou escreva uma observação."); return; }
    AE.Store.registrarEntrega(f.dataset.slug, link, notas); AE.renderizar(); AE.aviso("Entrega registrada (simulação).");
  };
})(window.AE);
