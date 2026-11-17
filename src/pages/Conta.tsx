import { useState } from "react";
import { ALUNO, matriculas } from "../data/demo";
import { alternarTema, avisar, demo, iniciais, useEstado } from "../lib";
import { cursos } from "../data/catalogo";
import { dataBR } from "../lib";

export function Conta() {
  const [nome, setNome] = useState(ALUNO.nome);
  return (
    <div className="grid grid-2" style={{ alignItems: "start" }}>
      <article className="card"><h2>Perfil</h2>
        <div className="row" style={{ marginBottom: 16 }}><span className="avatar" aria-hidden="true">{iniciais(nome)}</span><div><b>{nome}</b><p className="muted" style={{ margin: 0 }}>{ALUNO.email}</p></div></div>
        <form onSubmit={(e) => { e.preventDefault(); avisar("Perfil atualizado apenas nesta demonstração."); }}>
          <div className="field"><label htmlFor="nome">Nome</label><input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
          <div className="field"><label htmlFor="email">E-mail (fictício)</label><input id="email" value={ALUNO.email} readOnly /></div>
          <button className="btn btn-solid" type="submit">Salvar alterações</button></form></article>
      <article className="card"><h2>Matrículas</h2>
        <ul className="list">{cursos.filter((c) => c.slug in matriculas).map((c) => <li key={c.slug} className="item"><div><strong>{c.nome}</strong><span>Matriculado em {dataBR(matriculas[c.slug].data)} · liberado pela equipe (simulação)</span></div></li>)}</ul>
        <div className="row" style={{ marginTop: 14 }}><button className="btn btn-soft" type="button" onClick={() => demo("A troca de senha")}>Alterar senha</button><button className="btn btn-soft" type="button" onClick={() => demo("O encerramento da sessão")}>Sair</button></div></article>
    </div>
  );
}

export function Configuracoes() {
  const { tema } = useEstado();
  const [n, setN] = useState({ lembretes: true, resumo: false });
  const chave = (k: "lembretes" | "resumo", r: string, d: string) => (
    <button type="button" className={`check${n[k] ? " done" : ""}`} aria-pressed={n[k]} onClick={() => setN({ ...n, [k]: !n[k] })}>
      <span className="box" aria-hidden="true">{n[k] ? "✓" : ""}</span><div><strong>{r}</strong><span>{d}</span></div></button>
  );
  return (
    <div className="grid grid-2" style={{ alignItems: "start" }}>
      <article className="card"><h2>Aparência</h2><p className="muted">Tema claro ou escuro. A escolha fica guardada só neste navegador.</p>
        <div className="row"><button className="btn btn-soft" type="button" onClick={alternarTema}>Usar tema {tema === "light" ? "escuro" : "claro"}</button><span className="pill on">Atual: {tema === "light" ? "claro" : "escuro"}</span></div></article>
      <article className="card"><h2>Notificações (simulação)</h2><div className="stack">
        {chave("lembretes", "Lembretes de atividades", "Aviso de atividades pendentes.")}
        {chave("resumo", "Resumo semanal", "Resumo do progresso por e-mail.")}</div>
        <p className="muted" style={{ marginTop: 12 }}>Nenhuma notificação é enviada: não há e-mail nem servidor.</p></article>
    </div>
  );
}
