/* ==========================================================
   COMPONENTE — corpo de uma aula (leitura prolongada)
   Seções fixas, na ordem do plano pedagógico:
   objetivos · conceito · exemplos · erros comuns · boas práticas ·
   exercícios com resolução comentada · referências técnicas
   ========================================================== */
(function (AE) {
  const { esc, rich } = AE;

  /** Renderiza blocos de conteúdo ({h},{p},{lista},{ol},{nota},{codigo}). */
  function blocos(lista) {
    return lista.map((b) => {
      if (b.h) return `<h4>${rich(b.h)}</h4>`;
      if (b.p) return `<p>${rich(b.p)}</p>`;
      if (b.lista) return `<ul>${b.lista.map((i) => `<li>${rich(i)}</li>`).join("")}</ul>`;
      if (b.ol) return `<ol>${b.ol.map((i) => `<li>${rich(i)}</li>`).join("")}</ol>`;
      if (b.nota) return `<div class="nota"><b>${esc(b.nota.t)}</b>${rich(b.nota.x)}</div>`;
      if (b.codigo) return AE.blocoCodigo(b.codigo);
      return "";
    }).join("");
  }

  const secao = (titulo, corpo) => `<section class="lesson-sec"><h3>${titulo}</h3>${corpo}</section>`;

  AE.Lesson = {
    blocos,

    render(a) {
      const exemplos = (a.exemplos || []).map((e) => `
        <div class="exemplo">
          <h4>${rich(e.titulo)}</h4>
          ${AE.blocoCodigo({ lang: e.lang, arquivo: e.arquivo, x: e.codigo })}
          <ul class="exemplo-expl">${e.explicacao.map((x) => `<li>${rich(x)}</li>`).join("")}</ul>
        </div>`).join("");

      const erros = (a.erros || []).map((e) => `
        <div class="erro-item"><span aria-hidden="true">✕</span>
          <div><strong>${rich(e.erro)}</strong>${rich(e.porque)}<br><b>Correção:</b> ${rich(e.correcao)}</div></div>`).join("");

      const praticas = (a.praticas || []).map((p) => `<div class="pratica-item"><span aria-hidden="true">✓</span><div>${rich(p)}</div></div>`).join("");

      const exercicios = (a.exercicios || []).map((e, i) => `
        <div class="exercicio">
          <h4>Exercício ${i + 1} · ${rich(e.titulo)}</h4>
          <div class="prose">${blocos([{ p: e.enunciado }])}</div>
          ${e.codigo ? AE.blocoCodigo(e.codigo) : ""}
          ${e.dica ? `<p class="muted"><b>Dica:</b> ${rich(e.dica)}</p>` : ""}
          <details class="reveal"><summary>Ver resolução comentada</summary>
            <div class="reveal-body">
              ${e.resolucao.codigo ? AE.blocoCodigo({ lang: e.resolucao.lang, x: e.resolucao.codigo }) : ""}
              <div class="prose">${blocos([{ p: e.resolucao.comentario }])}</div>
            </div></details>
        </div>`).join("");

      const refs = (a.referencias || []).map((r) => `
        <li><a href="${esc(r.u)}" target="_blank" rel="noopener noreferrer">${esc(r.t)}<small>${esc(r.fonte || new URL(r.u).hostname)} · abre em nova aba</small></a></li>`).join("");

      return `
        ${secao("Objetivos de aprendizagem", `<ul class="bullets">${a.objetivos.map((o) => `<li>${rich(o)}</li>`).join("")}</ul>`)}
        ${secao("Explicação conceitual", `<div class="prose">${blocos(a.conceito)}</div>`)}
        ${exemplos ? secao("Exemplos práticos", `<div class="stack" style="gap:28px">${exemplos}</div>`) : ""}
        ${erros ? secao("Erros comuns", `<div class="stack" style="gap:10px">${erros}</div>`) : ""}
        ${praticas ? secao("Boas práticas", `<div class="stack" style="gap:10px">${praticas}</div>`) : ""}
        ${exercicios ? secao("Exercícios", `<div class="stack">${exercicios}</div>`) : ""}
        ${refs ? secao("Referências técnicas", `<ul class="refs">${refs}</ul>`) : ""}`;
    }
  };
})(window.AE);
