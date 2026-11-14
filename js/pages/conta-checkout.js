/* ==========================================================
   CONTA e CHECKOUT DEMONSTRATIVO
   - Nenhum pagamento real. Nenhum dado de cartão é solicitado.
   - Cupons por escola e benefício individual: apenas interface e estrutura
     de dados. Nenhum vínculo escolar é verificado.
   ========================================================== */
(function (AE) {
  const { esc, moeda } = AE;
  const P = AE.Paginas;

  /* ---------- CHECKOUT ---------- */
  P.checkout = ([id]) => {
    const item = AE.itemCompra(id); if (!item) return P.naoencontrada();
    const codigo = AE.Store.estado.cupomAplicado, t = AE.calcularTotal(item, codigo);
    const jaTem = item.cursos.filter((s) => AE.Store.matriculado(s)), faltam = item.cursos.filter((s) => !AE.Store.matriculado(s));
    const v = codigo ? AE.validarCupom(codigo) : null;

    if (!faltam.length) return { titulo: "Matrícula", html: AE.UI.vazio(`Você já está matriculado em <b>${esc(item.nome)}</b>.`, `<a class="btn btn-solid" href="${AE.Router.href("biblioteca")}">Ir para a biblioteca</a>`) };

    return {
      titulo: "Matrícula demonstrativa",
      html: `
        <a class="back" href="${item.href}">← Voltar para ${esc(item.nome)}</a>
        ${AE.UI.aviso("<b>Simulação.</b> Nenhum pagamento é processado, nenhum dado de cartão é solicitado e nenhuma cobrança será feita. A matrícula só existe neste navegador.", "SIMULAÇÃO")}
        <div class="checkout">
          <div class="stack" style="gap:24px">
            <article class="card"><h2>Resumo do pedido</h2>
              <p><b>${esc(item.nome)}</b> <span class="muted">· ${item.tipo === "pacote" ? "formação" : "curso individual"} · ${item.horas} h propostas</span></p>
              <ul class="bullets" style="margin-top:12px">${item.cursos.map((s) => `<li>${esc(AE.curso(s).nome)}${AE.Store.matriculado(s) ? " <span class='muted'>(já matriculado, será mantido)</span>" : ""}</li>`).join("")}</ul></article>
            <article class="card"><h2>Cupom de escola parceira</h2>
              <div class="coupon-row"><div class="field"><label for="cupom">Código do cupom</label><input id="cupom" value="${esc(codigo || "")}" placeholder="Ex.: ESCOLA-EXEMPLO" autocomplete="off"></div>
                <button class="btn btn-soft" data-acao="aplicar-cupom" type="button">Aplicar</button></div>
              ${v ? `<div class="feedback" style="margin-top:14px"><b>${v.ok ? "Cupom aplicado" : "Cupom inválido"}</b><div>${v.ok ? `${esc(v.cupom.instituicao)} · ${v.cupom.percentual}% de desconto · válido até ${AE.dataBR(v.cupom.validade)}` : esc(v.msg)}</div></div>` : ""}
              <p class="muted" style="margin-top:12px">Cupons de teste: <code>ESCOLA-EXEMPLO</code> (válido) e <code>COLEGIO-MODELO</code> (expirado). Nenhum vínculo escolar é verificado nesta versão.</p></article>
          </div>
          <aside class="card sticky stack">
            <h2>Total</h2>
            <div><div class="linha"><span>Subtotal</span><span>${moeda(t.subtotal)}</span></div>
              <div class="linha"><span>Desconto${t.cupom ? ` (${t.cupom.percentual}%)` : ""}</span><span>${t.desconto ? "− " + moeda(t.desconto) : "—"}</span></div>
              <div class="linha total"><span>Total demonstrativo</span><span>${moeda(t.total)}</span></div></div>
            <button class="btn btn-solid btn-block" data-acao="confirmar-matricula" data-item="${item.id}" type="button">Confirmar matrícula demonstrativa</button>
            <p class="muted">Valores ilustrativos, sujeitos a alteração.</p>
          </aside>
        </div>`
    };
  };

  /* ---------- CONTA ---------- */
  P.conta = () => {
    const u = AE.Store.estado.usuario, b = AE.Store.estado.beneficio, pedidos = AE.Store.estado.pedidos;
    return {
      titulo: "Minha conta", subtitulo: "Dados e preferências (guardados só neste navegador).",
      html: `
        <div class="grid grid-2" style="align-items:start">
          <article class="card">
            <div class="profile"><div class="avatar">${AE.iniciais(u.nome)}</div><div><h2 style="margin:0">${esc(u.nome)}</h2><p class="muted">${esc(u.email)}</p></div></div>
            <form data-form="conta" style="margin-top:24px">
              <div class="field"><label for="c-nome">Nome</label><input id="c-nome" name="nome" value="${esc(u.nome)}" required></div>
              <div class="field"><label for="c-email">E-mail</label><input id="c-email" name="email" type="email" value="${esc(u.email)}" required></div>
              <div class="row"><button class="btn btn-solid" type="submit">Salvar alterações</button>
                <button class="btn btn-soft" data-acao="tema" type="button">Alternar tema</button></div>
            </form>
            <p class="muted" style="margin-top:16px">Esta versão não tem login: a conta é local. Dados de cartão nunca são solicitados.</p>
          </article>
          <article class="card"><h2>Resumo</h2><ul class="list">
            <li class="item"><div><strong>${AE.Store.matriculados().length} de ${AE.Cursos.length}</strong><span>Cursos matriculados</span></div></li>
            <li class="item"><div><strong>${AE.Store.progressoGeral()}%</strong><span>Progresso geral de leitura</span></div></li>
            <li class="item"><div><strong>${AE.Store.estado.simulados.length}</strong><span>Simulados realizados</span></div></li></ul>
            <div class="row" style="margin-top:20px"><button class="btn btn-soft" data-acao="reiniciar" type="button">Reiniciar demonstração</button></div>
            <p class="muted" style="margin-top:10px">Apaga matrículas, progresso, respostas, simulados, projetos e pedidos deste navegador.</p></article>
        </div>

        <div class="grid grid-2" style="align-items:start">
          <article class="card"><h2>Campanhas escolares <span>pública</span></h2>
            <p class="muted" style="margin-bottom:14px">Cada escola parceira recebe um cupom com percentual e prazo. Dados de demonstração.</p>
            <ul class="list">${AE.Cupons.map((c) => { const ok = c.validade >= AE.hojeISO(); return AE.UI.item(`<code>${esc(c.codigo)}</code>`, `${esc(c.instituicao)} · ${c.percentual}% · ${ok ? "válido até" : "expirou em"} ${AE.dataBR(c.validade)}`, `<span class="pill ${ok ? "on" : ""}">${ok ? "Ativo" : "Expirado"}</span>`); }).join("")}</ul></article>
          <article class="card"><h2>Benefício individual <span>demonstrativo</span></h2>
            ${b ? `<div class="feedback"><b>Solicitação registrada (simulação)</b><div>Instituição: ${esc(b.instituicao)}${b.obs ? `<br>${esc(b.obs)}` : ""}<br>Situação: ${esc(b.status)} · ${AE.dataBR(b.data)}</div></div>
              <p class="muted" style="margin:12px 0">A verificação de vínculo e a autorização individual ainda não existem. Nenhum desconto foi associado à sua conta.</p>
              <button class="btn btn-soft" data-acao="cancelar-beneficio" type="button">Cancelar solicitação</button>`
            : `<p class="muted" style="margin-bottom:14px">Estudantes poderão pedir um desconto individual associado à conta, após verificação futura do vínculo com a escola.</p>
              <form data-form="beneficio"><div class="field"><label for="b-inst">Instituição de ensino</label><input id="b-inst" name="instituicao" required></div>
                <div class="field"><label for="b-obs">Observações (opcional)</label><textarea id="b-obs" name="obs" rows="3"></textarea></div>
                <button class="btn btn-solid" type="submit">Solicitar benefício (simulado)</button></form>`}
          </article>
        </div>

        <article class="card"><h2>Pedidos demonstrativos <span>${pedidos.length}</span></h2>
          <ul class="list">${pedidos.map((p) => AE.UI.item(esc(p.nome), `${AE.dataBR(p.data)} · total demonstrativo ${moeda(p.total)}${p.cupom ? ` · cupom ${esc(p.cupom)}` : ""}`, `<span class="pill">Simulado</span>`)).join("") || `<p class="muted">Nenhuma matrícula demonstrativa até agora.</p>`}</ul></article>`
    };
  };

  /* ---------- AÇÕES ---------- */
  Object.assign(AE.Acoes, {
    "aplicar-cupom": () => {
      const v = AE.$("#cupom").value.trim();
      AE.Store.estado.cupomAplicado = v || null; AE.Store.salvar(); AE.renderizar();
    },
    "confirmar-matricula": (el) => {
      const item = AE.itemCompra(el.dataset.item), t = AE.calcularTotal(item, AE.Store.estado.cupomAplicado);
      AE.Store.matricular(item.cursos, item.id);
      AE.Store.estado.pedidos.unshift({ id: "p" + Date.now(), nome: item.nome, total: t.total, cupom: t.cupom ? t.cupom.codigo : null, data: AE.agoraISO() });
      AE.Store.estado.cupomAplicado = null; AE.Store.salvar();
      AE.aviso("Matrícula demonstrativa confirmada. Nenhuma cobrança foi feita.");
      AE.Router.ir("biblioteca");
    },
    "cancelar-beneficio": () => { AE.Store.estado.beneficio = null; AE.Store.salvar(); AE.renderizar(); },
    reiniciar: () => { AE.Store.reiniciar(); AE.aplicarTema(); AE.Router.ir("inicio"); AE.renderizar(); AE.aviso("Demonstração reiniciada."); }
  });
  AE.Forms.conta = (f) => {
    Object.assign(AE.Store.estado.usuario, { nome: f.nome.value.trim(), email: f.email.value.trim() });
    AE.Store.salvar(); AE.renderizar(); AE.aviso("Dados atualizados.");
  };
  AE.Forms.beneficio = (f) => {
    AE.Store.estado.beneficio = { instituicao: f.instituicao.value.trim(), obs: f.obs.value.trim(), status: "em análise (simulada)", data: AE.agoraISO() };
    AE.Store.salvar(); AE.renderizar(); AE.aviso("Solicitação registrada (simulação).");
  };
})(window.AE);
