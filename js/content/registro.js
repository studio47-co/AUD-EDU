/* ==========================================================
   REGISTRO DE CONTEÚDO — onde aulas e questões se "plugam"
   Cada arquivo de conteúdo chama AE.Conteudo.modulo(...) ou
   AE.Atividades.registrar(...). Nada de conteúdo vive aqui.

   Modelo de AULA (js/content/<curso>/modulo-N.js):
   {
     id: "m1a1", titulo, minutos, topicos: [..],
     objetivos: [str],
     conceito:  [ {h}|{p}|{lista:[..]}|{nota:{t,x}}|{codigo:{lang,arquivo,x}} ],
     exemplos:  [ {titulo, lang, arquivo, codigo, explicacao:[str]} ],
     erros:     [ {erro, porque, correcao} ],
     praticas:  [ str ],
     exercicios:[ {titulo, enunciado, dica, resolucao:{lang, codigo, comentario}} ],
     referencias:[ {t, u, fonte} ]
   }

   Modelo de QUESTÃO (js/activities/<curso>.js):
   {
     id, modulo, tipo: "multipla"|"vf"|"codigo"|"erro"|"pratico",
     competencia, enunciado, codigo?: {lang, x},
     alternativas?: [str], correta?: índice, explicacao,
     // só para "pratico":
     criterios?: [str], resolucao?: {lang, codigo, comentario}
   }
   ========================================================== */
(function (AE) {
  const dados = {};   // { slug: { n: { aulas: [...] } } }

  AE.Conteudo = {
    modulo(slug, n, conteudo) {
      (dados[slug] = dados[slug] || {})[n] = conteudo;
    },
    /** Módulos que possuem conteúdo publicado, em ordem. */
    modulosPublicados: (slug) => Object.keys(dados[slug] || {}).map(Number).sort((a, b) => a - b),
    aulasDoModulo: (slug, n) => ((dados[slug] || {})[n] || { aulas: [] }).aulas.map((a) => ({ ...a, modulo: n, curso: slug })),
    /** Lista plana de aulas na ordem do curso. */
    aulas(slug) { return this.modulosPublicados(slug).flatMap((n) => this.aulasDoModulo(slug, n)); },
    aula(slug, id) { return this.aulas(slug).find((a) => a.id === id) || null; },
    vizinhas(slug, id) {
      const l = this.aulas(slug), i = l.findIndex((a) => a.id === id);
      return { anterior: i > 0 ? l[i - 1] : null, proxima: i >= 0 && i < l.length - 1 ? l[i + 1] : null, indice: i, total: l.length };
    },
    /** Um curso só é "completo" se TODOS os módulos previstos têm aulas e questões publicadas. */
    completo(slug) {
      const curso = AE.Cursos.find((c) => c.slug === slug);
      return curso.modulos.every((m) => this.aulasDoModulo(slug, m.n).length > 0 && AE.Atividades.doModulo(slug, m.n).length > 0);
    },
    statusModulo(slug, n) {
      const a = this.aulasDoModulo(slug, n).length, q = AE.Atividades.doModulo(slug, n).length;
      return a > 0 && q > 0 ? "publicado" : "em-producao";
    }
  };

  const banco = {};   // { slug: [questões] }

  AE.Atividades = {
    /** Gira as alternativas de forma determinística (pelo número da questão) para que a
     *  resposta certa não fique sempre na mesma posição. Não usa aleatoriedade: o gabarito é estável. */
    distribuir(q) {
      if (!q.alternativas || q.alternativas.length < 2) return q;
      const n = q.alternativas.length;
      const seq = (q.id.match(/\d+/g) || []).map(Number);
      const k = ((seq[0] || 0) * 3 + (seq[1] || 0) * 5 + (seq[2] || 0)) % n;
      const alt = q.alternativas.map((_, i) => q.alternativas[(i - k + n) % n]);
      return { ...q, alternativas: alt, correta: (q.correta + k) % n };
    },
    registrar(slug, questoes) { banco[slug] = (banco[slug] || []).concat(questoes.map((q) => ({ ...AE.Atividades.distribuir(q), curso: slug }))); },
    doCurso: (slug) => banco[slug] || [],
    doModulo(slug, n) { return this.doCurso(slug).filter((q) => q.modulo === n); },
    objetivas(slug, n) { return (n ? this.doModulo(slug, n) : this.doCurso(slug)).filter((q) => q.tipo !== "pratico"); },
    praticas(slug, n) { return (n ? this.doModulo(slug, n) : this.doCurso(slug)).filter((q) => q.tipo === "pratico"); },
    porId(id) { return Object.values(banco).flat().find((q) => q.id === id) || null; },
    /** Corrige questões objetivas: resp é o índice escolhido. */
    corrigir: (q, resp) => Number(resp) === q.correta,
    sortear(lista, n) {
      const c = lista.slice();
      for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
      return c.slice(0, Math.min(n || c.length, c.length));
    },
    ROTULOS: { multipla: "Múltipla escolha", vf: "Verdadeiro ou falso", codigo: "Interpretação de código", erro: "Identificação de erros", pratico: "Exercício prático" }
  };

  /** Briefings de projeto: js/projects/projetos.js */
  AE.Projetos = { lista: {}, registrar(slug, p) { this.lista[slug] = p; }, porSlug(slug) { return this.lista[slug] || null; } };
})(window.AE);
