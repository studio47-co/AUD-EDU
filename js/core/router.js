/* ==========================================================
   ROUTER — rotas por location.hash (mesma abordagem do AVA)
   Formato: #/nome/param1/param2
   ========================================================== */
(function (AE) {
  /** area: "pub" (layout público) | "aluno" (sidebar). max = nº máximo de parâmetros. */
  const TABELA = {
    inicio:       { area: "pub",   max: 0 },
    catalogo:     { area: "pub",   max: 0 },
    curso:        { area: "pub",   max: 1, min: 1 },
    formacao:     { area: "pub",   max: 1, min: 1 },
    metodologia:  { area: "pub",   max: 0 },
    checkout:     { area: "pub",   max: 1, min: 1 },
    painel:       { area: "aluno", max: 0 },
    biblioteca:   { area: "aluno", max: 0 },
    aprender:     { area: "aluno", max: 2, min: 1 },
    atividades:   { area: "aluno", max: 2 },
    simulados:    { area: "aluno", max: 2 },
    projetos:     { area: "aluno", max: 1 },
    certificados: { area: "aluno", max: 0 },
    conta:        { area: "aluno", max: 0 }
  };

  AE.Router = {
    atual() {
      const partes = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
      if (!partes.length) return { nome: "inicio", params: [], area: "pub" };
      const [nome, ...params] = partes;
      const def = TABELA[nome];
      if (!def || params.length > def.max || params.length < (def.min || 0)) return { nome: "naoencontrada", params: [], area: "pub" };
      return { nome, params, area: def.area };
    },
    href: (...partes) => "#/" + partes.join("/"),
    ir(...partes) { location.hash = this.href(...partes); }
  };
})(window.AE);
