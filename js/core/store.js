/* ==========================================================
   STORE — estado + persistência (localStorage) + regras
   Mesmo padrão do AVA (js/store.js): objeto Store com carregar/salvar/reiniciar.

   IMPORTANTE: tudo aqui é DEMONSTRATIVO e manipulável no navegador.
   Nada deste estado serve como prova de aprendizagem ou certificação.

   Três medidas de progresso são mantidas separadas:
     1) LEITURA     – aulas marcadas como concluídas
     2) DESEMPENHO  – acertos nas questões objetivas (atividades e simulados)
     3) REQUISITOS  – conjunto de condições para elegibilidade (certificados)
   ========================================================== */
(function (AE) {
  const CHAVE = "audmani-education-v1";
  const NOTA_MINIMA = 70; // % de acerto exigido nos requisitos (regra demonstrativa)

  const inicial = () => ({
    tema: null,
    usuario: { nome: "Estudante Demo", email: "estudante@exemplo.com" },
    matriculas: {},      // { slug: { data, origem } }
    aulas: {},           // { slug: [idAula] }
    ultima: null,        // { slug, aula, data }
    respostas: {},       // { idQuestao: { resp, certa, tentativas, data } }
    praticas: {},        // { idQuestao: true }  exercícios práticos marcados como feitos
    simulados: [],       // histórico de tentativas finalizadas
    simAtual: null,      // simulado em andamento
    projetos: {},        // { slug: { checklist: {i:true}, entrega: {link, notas, data} } }
    pedidos: [],         // matrículas demonstrativas
    cupomAplicado: null, // código do cupom no checkout
    beneficio: null      // solicitação de benefício individual (demonstrativa)
  });

  const Store = AE.Store = {
    estado: inicial(),

    carregar() {
      try { const s = localStorage.getItem(CHAVE); if (s) this.estado = { ...inicial(), ...JSON.parse(s) }; } catch (e) { /* sem storage */ }
    },
    salvar() {
      try { localStorage.setItem(CHAVE, JSON.stringify(this.estado)); } catch (e) { /* sem storage */ }
    },
    reiniciar() {
      try { localStorage.removeItem(CHAVE); } catch (e) { /* sem storage */ }
      this.estado = inicial();
    },

    /* ---------- matrícula ---------- */
    matriculado: (slug) => Boolean(Store.estado.matriculas[slug]),
    matriculados: () => AE.Cursos.filter((c) => Store.matriculado(c.slug)),
    matricular(slugs, origem) {
      slugs.forEach((s) => { if (!this.estado.matriculas[s]) this.estado.matriculas[s] = { data: AE.agoraISO(), origem }; });
      this.salvar();
    },
    formacaoMatriculada: (pacote) => pacote.cursos.every((s) => Store.matriculado(s)),

    /* ---------- leitura ---------- */
    aulasFeitas: (slug) => Store.estado.aulas[slug] || [],
    aulaConcluida: (slug, id) => Store.aulasFeitas(slug).includes(id),
    alternarAula(slug, id) {
      const f = this.aulasFeitas(slug);
      this.estado.aulas[slug] = f.includes(id) ? f.filter((x) => x !== id) : [...f, id];
      this.salvar();
    },
    marcarUltima(slug, aula) {
      this.estado.ultima = { slug, aula, data: AE.agoraISO() };
      this.salvar();
    },
    leitura(slug) {
      const todas = AE.Conteudo.aulas(slug).map((a) => a.id);
      const feitas = this.aulasFeitas(slug).filter((id) => todas.includes(id)).length;
      return { feitas, total: todas.length, pct: AE.pct(feitas, todas.length) };
    },
    proximaAula(slug) {
      const feitas = this.aulasFeitas(slug);
      return AE.Conteudo.aulas(slug).find((a) => !feitas.includes(a.id)) || null;
    },

    /* ---------- desempenho (atividades) ---------- */
    resposta: (id) => Store.estado.respostas[id] || null,
    responder(questao, resp) {
      const certa = AE.Atividades.corrigir(questao, resp);
      const ant = this.estado.respostas[questao.id];
      this.estado.respostas[questao.id] = { resp, certa, tentativas: (ant ? ant.tentativas : 0) + 1, data: AE.agoraISO() };
      this.salvar();
      return certa;
    },
    limparResposta(id) { delete this.estado.respostas[id]; this.salvar(); },
    praticaFeita: (id) => Boolean(Store.estado.praticas[id]),
    alternarPratica(id) { this.estado.praticas[id] = !this.estado.praticas[id]; this.salvar(); },

    /** Resumo das questões objetivas de um curso (ou de um módulo). */
    desempenho(slug, modulo) {
      const qs = AE.Atividades.objetivas(slug, modulo);
      const resp = qs.map((q) => this.resposta(q.id)).filter(Boolean);
      const acertos = resp.filter((r) => r.certa).length;
      return { total: qs.length, respondidas: resp.length, acertos, pct: AE.pct(acertos, resp.length), cobertura: AE.pct(resp.length, qs.length) };
    },
    praticasResumo(slug, modulo) {
      const qs = AE.Atividades.praticas(slug, modulo);
      return { total: qs.length, feitas: qs.filter((q) => this.praticaFeita(q.id)).length };
    },

    /* ---------- projetos ---------- */
    projeto(slug) { return this.estado.projetos[slug] || { checklist: {}, entrega: null }; },
    alternarChecklist(slug, i) {
      const p = this.estado.projetos[slug] || (this.estado.projetos[slug] = { checklist: {}, entrega: null });
      p.checklist[i] = !p.checklist[i]; this.salvar();
    },
    registrarEntrega(slug, link, notas) {
      const p = this.estado.projetos[slug] || (this.estado.projetos[slug] = { checklist: {}, entrega: null });
      p.entrega = { link, notas, data: AE.agoraISO() }; this.salvar();
    },
    removerEntrega(slug) { if (this.estado.projetos[slug]) { this.estado.projetos[slug].entrega = null; this.salvar(); } },

    /* ---------- requisitos / elegibilidade (demonstrativo) ---------- */
    requisitos(slug) {
      const l = this.leitura(slug), d = this.desempenho(slug), p = this.projeto(slug);
      const producaoCompleta = AE.Conteudo.completo(slug);
      return [
        { rotulo: "Conteúdo do curso totalmente publicado na plataforma", ok: producaoCompleta },
        { rotulo: `Todas as aulas concluídas (${l.feitas}/${l.total})`, ok: l.total > 0 && l.feitas === l.total },
        { rotulo: `Todas as questões objetivas respondidas (${d.respondidas}/${d.total})`, ok: d.total > 0 && d.respondidas === d.total },
        { rotulo: `Acerto mínimo de ${NOTA_MINIMA}% nas questões (atual: ${d.respondidas ? d.pct + "%" : "—"})`, ok: d.respondidas > 0 && d.pct >= NOTA_MINIMA },
        { rotulo: "Projeto final com entrega registrada", ok: Boolean(p.entrega) }
      ];
    },
    elegivel(slug) { return this.requisitos(slug).every((r) => r.ok); },

    /** Progresso geral = média da LEITURA dos cursos matriculados. */
    progressoGeral() {
      const m = this.matriculados();
      if (!m.length) return 0;
      return Math.round(m.reduce((s, c) => s + this.leitura(c.slug).pct, 0) / m.length);
    },

    /* ---------- simulados ---------- */
    iniciarSimulado(slug, modulo, quantidade) {
      const pool = AE.Atividades.objetivas(slug, modulo);
      const q = AE.Atividades.sortear(pool, quantidade);
      this.estado.simAtual = { slug, modulo: modulo || 0, ids: q.map((x) => x.id), respostas: {}, atual: 0, inicio: AE.agoraISO() };
      this.salvar();
    },
    marcarSim(i, opcao) { this.estado.simAtual.respostas[i] = opcao; this.salvar(); },
    irSim(i) { this.estado.simAtual.atual = i; this.salvar(); },
    descartarSim() { this.estado.simAtual = null; this.salvar(); },
    finalizarSimulado() {
      const s = this.estado.simAtual; if (!s) return null;
      const detalhe = s.ids.map((id, i) => {
        const q = AE.Atividades.porId(id), resp = s.respostas[i];
        return { id, resp: resp === undefined ? null : resp, certa: resp === undefined ? false : AE.Atividades.corrigir(q, resp) };
      });
      const tentativa = {
        id: "s" + Date.now(), slug: s.slug, modulo: s.modulo, data: AE.agoraISO(), detalhe,
        total: detalhe.length, acertos: detalhe.filter((d) => d.certa).length, emBranco: detalhe.filter((d) => d.resp === null).length
      };
      this.estado.simulados.unshift(tentativa);
      this.estado.simAtual = null;
      this.salvar();
      return tentativa;
    },
    tentativa: (id) => Store.estado.simulados.find((t) => t.id === id),

    NOTA_MINIMA
  };
})(window.AE);
