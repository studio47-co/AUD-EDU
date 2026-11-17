import { useState } from "react";
import { cursos, curso as achar } from "../data/catalogo";
import { NOTA_MINIMA, matriculas, notasAtividades, progressoCurso, projetos, requisitos, simuladosIniciais } from "../data/demo";
import { Aviso, Barra, Vazio } from "../components/ui";
import { Modal } from "../components/Modal";
import { avisar, dataBR, demo, href, pct, plural, setEstado, useEstado } from "../lib";
import { NaoEncontrada } from "./Publicas";
import { aulas } from "../data/aulas";

/* ---------- Projetos ---------- */
const feitosDe = (slug: string, checklist: Record<string, Record<number, boolean>>) => {
  const p = projetos.find((x) => x.slug === slug)!;
  return p.checklist.filter((c, i) => checklist[slug]?.[i] ?? c.feito).length;
};

export function Projetos({ slug }: { slug?: string }) {
  const { checklist, entregas } = useEstado();
  const [link, setLink] = useState("");
  if (!slug) {
    return (
      <>
        <Aviso>Os projetos desta demonstração são fictícios. A entrega é apenas simulada, não há avaliação automática.</Aviso>
        <div className="grid-projetos">{projetos.map((p) => {
          const f = feitosDe(p.slug, checklist), total = p.checklist.length;
          const estado = entregas[p.slug] ? "Entrega registrada" : "Em andamento";
          return (
            <a key={p.slug} className="card course" href={href("projetos", p.slug)}>
              <span className="tag">{p.tipo} · {p.curso}</span>
              <h3>{p.titulo}</h3><p>{p.objetivo}</p>
              <div className="card-base"><Barra pct={pct(f, total)} rotulo="Checklist" /><div className="meta"><span>Checklist {f}/{total}</span><span>{estado}</span></div></div>
            </a>
          );
        })}</div>
      </>
    );
  }
  const p = projetos.find((x) => x.slug === slug);
  if (!p) return <NaoEncontrada />;
  const f = feitosDe(slug, checklist);
  const alternar = (i: number) => setEstado((e) => ({ checklist: { ...e.checklist, [slug]: { ...e.checklist[slug], [i]: !(e.checklist[slug]?.[i] ?? p.checklist[i].feito) } } }));
  return (
    <>
      <a className="back" href={href("projetos")}>← Voltar aos projetos</a>
      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <div className="stack">
          <article className="card"><span className="tag-static">{p.tipo} · {p.curso}</span><h2 style={{ marginTop: 8 }}>{p.titulo}</h2><p className="muted">{p.objetivo}</p></article>
          <article className="card"><h2>Checklist <span>{f}/{p.checklist.length}</span></h2><Barra pct={pct(f, p.checklist.length)} rotulo="Checklist" />
            <div className="stack" style={{ marginTop: 14 }}>{p.checklist.map((c, i) => {
              const feito = checklist[slug]?.[i] ?? c.feito;
              return <button key={i} type="button" className={`check${feito ? " done" : ""}`} aria-pressed={feito} onClick={() => alternar(i)}><span className="box" aria-hidden="true">{feito ? "✓" : ""}</span><div><strong>{c.t}</strong></div></button>;
            })}</div></article>
        </div>
        <article className="card"><h2>Entrega</h2>
          {entregas[slug] ? <><div className="feedback"><b>Entrega registrada (simulação)</b><div>Nenhuma avaliação automática foi feita.</div></div>
            <button className="btn btn-soft" style={{ marginTop: 12 }} type="button" onClick={() => setEstado((e) => ({ entregas: { ...e.entregas, [slug]: false } }))}>Remover registro</button></>
            : <form onSubmit={(e) => { e.preventDefault(); setEstado((s) => ({ entregas: { ...s.entregas, [slug]: true } })); avisar("Entrega registrada apenas nesta demonstração."); }}>
              <div className="field"><label htmlFor="ent-link">Link do projeto (repositório ou página publicada)</label><input id="ent-link" type="url" placeholder="https://…" required value={link} onChange={(e) => setLink(e.target.value)} /></div>
              <button className="btn btn-solid" type="submit">Registrar entrega</button></form>}
        </article>
      </div>
    </>
  );
}

/* ---------- Certificados ---------- */
export function Certificados() {
  const { concluidas } = useEstado();
  const [exemplo, setExemplo] = useState(false);
  return (
    <>
      <article className="card cert-ajuda"><p className="muted" style={{ margin: 0 }}>Na plataforma real, certificados são emitidos pelo servidor, por curso, quando todos os requisitos estão cumpridos. Aqui nada é emitido: é uma <b>demonstração</b>. <a href={href("verificar")}>Verificar certificado</a></p>
        <details className="reveal"><summary>Como funciona</summary><div className="reveal-body">Requisitos: todas as aulas, todas as questões, acerto mínimo de {NOTA_MINIMA}% e projeto entregue. Cada certificado real tem um código público de verificação.</div></details>
        <div className="row" style={{ marginTop: 12 }}><button className="btn btn-soft" type="button" onClick={() => setExemplo(true)}>Ver exemplo de certificado (fictício)</button></div></article>
      <div className="grid-cert">{cursos.map((c) => {
        const mat = c.slug in matriculas;
        const reqs = requisitos(c.slug, concluidas), ok = reqs.filter((r) => r.ok).length;
        const lidas = c.slug === "html" ? concluidas.length : 0;
        const total = c.slug === "html" ? aulas.length : c.modulos.reduce((s, m) => s + m.topicos.length, 0);
        const p = progressoCurso(c.slug, concluidas);
        return (
          <article key={c.slug} className="card cert-card">
            <header><span className="tag-static">{c.categoria}</span><h3>{c.nome}</h3><span className="pill">{mat ? "Em andamento" : "Não matriculado"}</span></header>
            {mat ? <>
              <div className="stack" style={{ gap: 10 }}>
                <div className="cert-num"><span>Aulas: {c.slug === "html" ? `${lidas}/${total}` : `${p}% lidas`}</span><span>Desempenho: {c.slug === "html" ? "78%" : "—"}</span></div>
                <Barra pct={pct(ok, reqs.length)} rotulo="Requisitos atendidos" />
                <div className="req-resumo">{ok} de {reqs.length} requisitos atendidos · mínimo de {NOTA_MINIMA}% de acerto e projeto entregue</div></div>
              <details className="reveal"><summary>Ver requisitos</summary><div className="reveal-body"><div className="stack" style={{ gap: 8 }}>{reqs.map((r) => <div key={r.rotulo} className="pratica-item"><span aria-hidden="true">{r.ok ? "✓" : "–"}</span><div>{r.rotulo}</div></div>)}</div></div></details>
            </> : <p className="muted">Solicite a matrícula para acompanhar o progresso deste curso.</p>}
            <div className="cert-fim"><span className="muted">Certificado disponível ao cumprir todos os requisitos.</span></div>
          </article>
        );
      })}</div>
      <Modal aberto={exemplo} onFechar={() => setExemplo(false)}>
        <div className="cert-exemplo">
          <span className="pill on">MODELO DE DEMONSTRAÇÃO · SEM VALIDADE</span>
          <p className="kicker" style={{ marginTop: 18 }}>Documento ilustrativo</p>
          <h2 style={{ margin: "6px 0" }}>Certificado de exemplo</h2>
          <p>Este documento é fictício e serve apenas para mostrar como um certificado seria apresentado na plataforma. Não é um certificado oficial emitido pela AUDMANI.</p>
          <p className="muted">Aluno: Alex Martins (fictício) · Curso: HTML5 · Código: DEMO-0000</p>
          <div className="row" style={{ marginTop: 16 }}><button className="btn btn-soft" type="button" onClick={() => demo("O download")}>Baixar PDF</button><button className="btn btn-solid" type="button" onClick={() => setExemplo(false)}>Fechar</button></div>
        </div>
      </Modal>
    </>
  );
}

export function Verificar() {
  const [cod, setCod] = useState("");
  const [res, setRes] = useState<null | boolean>(null);
  return (
    <>
      <article className="card"><h2>Verificar certificado</h2><p className="muted">Na demonstração, apenas o código <b>DEMO-0000</b> é reconhecido, e ele identifica um certificado fictício.</p>
        <form className="toolbar" onSubmit={(e) => { e.preventDefault(); setRes(cod.trim().toUpperCase() === "DEMO-0000"); }}>
          <div className="field"><label htmlFor="cod">Código</label><input id="cod" value={cod} onChange={(e) => setCod(e.target.value)} placeholder="DEMO-0000" /></div>
          <button className="btn btn-solid" type="submit">Verificar</button></form>
        {res === true && <div className="feedback"><b>Código reconhecido (simulação)</b><div>Certificado fictício de HTML5. Não possui validade oficial.</div></div>}
        {res === false && <div className="feedback"><b>Código não encontrado</b><div>Nenhum certificado com esse código na demonstração.</div></div>}</article>
    </>
  );
}

/* ---------- Minhas notas ---------- */
export function Notas() {
  const { simulados } = useEstado();
  const todos = [...simuladosIniciais, ...simulados];
  const grupos = cursos.filter((c) => c.slug in matriculas).map((c) => {
    const linhas = [
      ...todos.filter((s) => s.curso === c.slug).map((s) => ({ data: s.data, avaliacao: s.titulo, tipo: "Simulado", a: s.acertos, t: s.total })),
      ...notasAtividades.filter((n) => n.curso === c.slug).map((n) => ({ data: n.data, avaliacao: n.avaliacao, tipo: n.tipo, a: n.acertos, t: n.total }))
    ].sort((x, y) => y.data.localeCompare(x.data));
    return { c, linhas };
  }).filter((g) => g.linhas.length);
  if (!grupos.length) return <Vazio texto="Você ainda não tem notas." />;
  return (
    <>
      <Aviso>Histórico demonstrativo: percentuais calculados a partir de dados fictícios. A única referência de limite é o desempenho mínimo de {NOTA_MINIMA}% exigido para o certificado.</Aviso>
      {grupos.map((g) => (
        <article key={g.c.slug} className="card"><h2>{g.c.nome} <span>{plural(g.linhas.length, "registro", "registros")}</span></h2>
          <div className="scroll-x"><table className="table notas"><thead><tr><th>Módulo ou avaliação</th><th>Tipo</th><th>Nota ou percentual</th><th>Data</th><th>Situação</th></tr></thead>
            <tbody>{g.linhas.map((l, i) => {
              const p = pct(l.a, l.t);
              return <tr key={i}><td><b>{l.avaliacao}</b></td><td>{l.tipo}</td><td>{p}% ({l.a} de {l.t})</td><td>{dataBR(l.data)}</td><td>{p >= NOTA_MINIMA ? `Atingiu o desempenho mínimo (${NOTA_MINIMA}%)` : `Abaixo do desempenho mínimo (${NOTA_MINIMA}%)`}</td></tr>;
            })}</tbody></table></div></article>
      ))}
    </>
  );
}
