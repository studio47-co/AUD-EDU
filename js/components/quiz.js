/* ==========================================================
   COMPONENTE — questão (atividades, simulados e revisão)
   Opções reaproveitam .check do AVA. Certo/errado = símbolo + peso
   (sem cores novas): ✓ preenchido para a correta, ✕ riscada para a marcada errada.
   ========================================================== */
(function (AE) {
  const { esc, rich } = AE;
  const LETRAS = ["A", "B", "C", "D", "E", "F"];

  function alternativas(q) { return q.tipo === "vf" ? ["Verdadeiro", "Falso"] : q.alternativas; }

  AE.Quiz = {
    /** Seleção ainda não confirmada nas atividades (só em memória). */
    selecao: {},

    cabecalho(q, n) {
      return `<div class="q-head"><span class="pill">${esc(AE.Atividades.ROTULOS[q.tipo])}</span>
        <span class="q-meta">${n ? `Questão ${n} · ` : ""}Competência: ${esc(q.competencia)}</span></div>
        <div class="q-enun">${rich(q.enunciado)}</div>
        ${q.codigo ? AE.blocoCodigo(q.codigo) : ""}`;
    },

    /**
     * modo "atividade": confirma e mostra feedback na hora.
     * modo "simulado": só marca; feedback apenas na revisão.
     * modo "revisao": tudo travado, com gabarito e explicação.
     */
    opcoes(q, { marcada, travado, gabarito, acao }) {
      return `<div class="opts" role="radiogroup" aria-label="Alternativas">` + alternativas(q).map((alt, i) => {
        const certa = gabarito && i === q.correta;
        const errada = gabarito && marcada === i && i !== q.correta;
        const cls = ["check", "opt", marcada === i && !gabarito ? "sel" : "", certa ? "certa" : "", errada ? "errada" : ""].filter(Boolean).join(" ");
        const simbolo = certa ? "✓" : errada ? "✕" : LETRAS[i];
        const dados = acao ? `data-acao="${acao}" data-q="${q.id}" data-i="${i}"` : "";
        return `<button class="${cls}" ${dados} role="radio" aria-checked="${marcada === i}" ${travado ? "disabled" : ""} type="button">
          <span class="box" aria-hidden="true">${simbolo}</span><div><strong>${rich(alt)}</strong></div></button>`;
      }).join("") + `</div>`;
    },

    feedback(q, certa, marcada) {
      const resp = q.correta !== undefined ? LETRAS[q.correta] : "";
      return `<div class="feedback" role="status"><b>${certa ? "Correto" : `Incorreto · resposta certa: ${resp}`}</b>
        <div>${rich(q.explicacao)}</div></div>`;
    },

    /** Cartão de uma questão de ATIVIDADE (objetiva ou prática). */
    atividade(q, n) {
      return `<article class="card q" data-q="${q.id}" data-n="${n || ""}">${AE.Quiz.corpoAtividade(q, n)}</article>`;
    },

    corpoAtividade(q, n) {
      if (q.tipo === "pratico") {
        const feita = AE.Store.praticaFeita(q.id);
        return `${AE.Quiz.cabecalho(q, n)}
          <ul class="bullets">${q.criterios.map((c) => `<li>${rich(c)}</li>`).join("")}</ul>
          <details class="reveal"><summary>Ver resolução comentada</summary><div class="reveal-body">
            ${q.resolucao.codigo ? AE.blocoCodigo({ lang: q.resolucao.lang, x: q.resolucao.codigo }) : ""}
            <div class="prose">${AE.Lesson.blocos([{ p: q.resolucao.comentario }])}</div></div></details>
          <div class="row"><button class="btn ${feita ? "btn-soft" : "btn-solid"}" data-acao="pratica" data-q="${q.id}" type="button">${feita ? "✓ Marcado como feito (desmarcar)" : "Marcar como feito"}</button>
            <span class="muted">Exercício prático: sem correção automática. Compare com a resolução e avalie seu resultado.</span></div>`;
      }
      const r = AE.Store.resposta(q.id);
      if (r) {
        return `${AE.Quiz.cabecalho(q, n)}${AE.Quiz.opcoes(q, { marcada: r.resp, travado: true, gabarito: true })}
          ${AE.Quiz.feedback(q, r.certa, r.resp)}
          <div class="row"><button class="btn btn-soft" data-acao="refazer" data-q="${q.id}" type="button">Tentar novamente</button>
            <span class="muted">${AE.plural(r.tentativas, "tentativa", "tentativas")}</span></div>`;
      }
      const sel = AE.Quiz.selecao[q.id];
      return `${AE.Quiz.cabecalho(q, n)}${AE.Quiz.opcoes(q, { marcada: sel, acao: "opcao" })}
        <div class="row"><button class="btn btn-solid" data-acao="responder" data-q="${q.id}" type="button" ${sel === undefined ? "disabled" : ""}>Responder</button></div>`;
    },

    /** Atualiza só a questão alterada (mantém rolagem e foco). */
    atualizar(id) {
      const el = AE.$(`.q[data-q="${id}"]`); if (!el) return;
      const q = AE.Atividades.porId(id);
      const n = el.getAttribute("data-n");
      el.innerHTML = AE.Quiz.corpoAtividade(q, n ? Number(n) : 0);
    },

    /** Revisão após o simulado. */
    revisao(q, resp, n) {
      const branco = resp === null || resp === undefined;
      const certa = !branco && AE.Atividades.corrigir(q, resp);
      return `<article class="card q">${AE.Quiz.cabecalho(q, n)}
        ${AE.Quiz.opcoes(q, { marcada: branco ? undefined : resp, travado: true, gabarito: true })}
        ${branco ? `<div class="feedback"><b>Em branco · resposta certa: ${LETRAS[q.correta]}</b><div>${rich(q.explicacao)}</div></div>` : AE.Quiz.feedback(q, certa, resp)}</article>`;
    }
  };
})(window.AE);
