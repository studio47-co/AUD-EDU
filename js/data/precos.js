/* ==========================================================
   PREÇOS, CUPONS E PARCERIAS ESCOLARES — 100% DEMONSTRATIVO
   Os valores abaixo NÃO são preços definitivos.
   Não há integração de pagamento nem validação real de vínculo escolar.
   ========================================================== */
(function (AE) {
  /** Campanha pública: cupom por escola, com validade, percentual e instituição. */
  AE.Cupons = [
    { codigo: "ESCOLA-EXEMPLO", instituicao: "Escola Exemplo (fictícia)", percentual: 15, validade: "2026-12-31" },
    { codigo: "COLEGIO-MODELO", instituicao: "Colégio Modelo (fictício)", percentual: 20, validade: "2026-01-31" }
  ];

  /** Benefício individual: estrutura de dados prevista (somente interface demonstrativa). */
  AE.MODELO_BENEFICIO = {
    estudante: "nome",
    instituicao: "texto livre",
    status: "em-analise | autorizado | negado",   // verificação de vínculo: ETAPA FUTURA
    autorizadoPor: "responsável (futuro)",
    percentual: "associado à conta (futuro)"
  };

  AE.validarCupom = function (codigo) {
    const c = AE.Cupons.find((x) => x.codigo === String(codigo).trim().toUpperCase());
    if (!c) return { ok: false, msg: "Cupom não encontrado." };
    if (c.validade < AE.hojeISO()) return { ok: false, msg: `Cupom de ${c.instituicao} expirado em ${AE.dataBR(c.validade)}.` };
    return { ok: true, cupom: c };
  };

  /** Resolve um item de compra ("html", "css", "javascript" ou "pacote-frontend"). */
  AE.itemCompra = function (id) {
    if (id.startsWith("pacote-")) {
      const p = AE.pacote(id.slice(7)); if (!p) return null;
      return { id, tipo: "pacote", nome: p.nome, preco: p.preco, cursos: p.cursos, horas: AE.horasPacote(p), href: AE.Router.href("formacao", p.slug) };
    }
    const c = AE.curso(id); if (!c) return null;
    return { id, tipo: "curso", nome: c.nome, preco: c.preco, cursos: [c.slug], horas: c.horas, href: AE.Router.href("curso", c.slug) };
  };

  AE.calcularTotal = function (item, codigo) {
    const v = codigo ? AE.validarCupom(codigo) : null;
    const desconto = v && v.ok ? Math.round(item.preco * v.cupom.percentual) / 100 : 0;
    return { subtotal: item.preco, desconto, total: Math.round((item.preco - desconto) * 100) / 100, cupom: v && v.ok ? v.cupom : null };
  };
})(window.AE);
