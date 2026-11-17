import { useState } from "react";
import { cursos, curso as achar } from "../data/catalogo";
import { ALUNO, matriculas, pendentes, projetos, progressoCurso, simuladosIniciais, notasAtividades } from "../data/demo";
import { aula } from "../data/aulas";
import { CursoCard, Barra, Data, Medida, Vazio } from "../components/ui";
import { dataBR, href, pct, useEstado } from "../lib";

const ORDENS: [string, string][] = [["ultimos", "Últimos acessados"], ["progresso", "Progresso"], ["recentes", "Recém-comprados"]];
const ts = (iso: string | null | undefined) => (iso ? Date.parse(iso) || 0 : 0);

export function Painel() {
  const { concluidas, simulados, checklist } = useEstado();
  const [ordem, setOrdem] = useState("ultimos");
  const mat = cursos.filter((c) => c.slug in matriculas);
  const progresso = (s: string) => progressoCurso(s, concluidas);
  const chave: Record<string, (s: string) => number> = {
    ultimos: (s) => ts(matriculas[s].ultimoAcesso),          // nunca acessado vai para o fim
    progresso: (s) => progresso(s),
    recentes: (s) => ts(matriculas[s].data)
  };
  const ordenados = [...mat].sort((a, b) => chave[ordem](b.slug) - chave[ordem](a.slug));   // ordena ANTES de cortar em 6
  const geral = Math.round(mat.reduce((s, c) => s + progresso(c.slug), 0) / (mat.length || 1));
  const todosSim = [...simuladosIniciais, ...simulados];
  const acertos = notasAtividades.reduce((s, n) => s + n.acertos, 0) + todosSim.reduce((s, n) => s + n.acertos, 0);
  const totalQ = notasAtividades.reduce((s, n) => s + n.total, 0) + todosSim.reduce((s, n) => s + n.total, 0);
  const desempenho = pct(acertos, totalQ);
  const ultimo = mat.slice().sort((a, b) => ts(matriculas[b.slug].ultimoAcesso) - ts(matriculas[a.slug].ultimoAcesso))[0];
  const aulaAtual = aula(matriculas.html.aula || "a1");
  const projPend = projetos.filter((p) => !p.entregue && (p.slug === "frontend" ? false : p.slug in matriculas));
  const recentes = [...notasAtividades.map((n) => ({ t: n.avaliacao, s: `${n.acertos} de ${n.total} acertos`, d: n.data })), ...todosSim.map((s) => ({ t: `Simulado · ${achar(s.curso)?.nome}`, s: `${s.acertos} de ${s.total} acertos (${pct(s.acertos, s.total)}%)`, d: s.data }))].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 5);

  return (
    <>
      <div className="grid grid-hero">
        <article className="card hero">
          <div><span className="kicker">Continue de onde parou</span><h2>{ultimo.nome}</h2><p>{ultimo.slug === "html" && aulaAtual ? `Última aula acessada · ${aulaAtual.titulo}` : "Retome o curso"}</p></div>
          <div className="row"><a className="btn btn-soft" href={href("aprender", ultimo.slug, ultimo.slug === "html" ? matriculas.html.aula! : "")}>Continuar aula</a></div>
        </article>
        <article className="card stat">
          <div className="ring" style={{ ["--p" as string]: geral }} data-label={`${geral}%`} aria-label={`Progresso geral ${geral}%`} />
          <span>Progresso geral · desempenho nas questões {desempenho}% · {mat.length} cursos matriculados</span>
        </article>
      </div>

      <div className="kpis">
        <div className="kpi"><b>{mat.length}</b><span>Cursos matriculados</span></div>
        <div className="kpi"><b>{geral}%</b><span>Progresso geral</span></div>
        <div className="kpi"><b>{notasAtividades.length + todosSim.length}</b><span>Atividades e simulados realizados</span></div>
        <div className="kpi"><b>{desempenho}%</b><span>Desempenho nas questões</span></div>
        <div className="kpi"><b>0</b><span>Certificados emitidos</span></div>
      </div>

      <div className="painel-cols">
        <div className="stack painel-col">
          <article className="card"><h2>Cursos matriculados <a className="back" href={href("biblioteca")}>Ver biblioteca</a></h2>
            {mat.length ? (<>
              <div className="ordem-cursos" role="group" aria-label="Ordenar cursos">{ORDENS.map(([v, r]) => <button key={v} type="button" aria-pressed={ordem === v} onClick={() => setOrdem(v)}>{r}</button>)}</div>
              <div className="grid grid-cursos">{ordenados.slice(0, 6).map((c) => <CursoCard key={c.slug} c={c} />)}</div>
              {mat.length > 6 && <p className="muted" style={{ marginTop: 14 }}>Mostrando 6 de {mat.length} cursos. <a href={href("biblioteca")}>Ver biblioteca completa</a></p>}
            </>) : <Vazio texto="Nenhum curso matriculado." />}
          </article>
          <article className="card card-rolagem"><h2>Resultados recentes <a className="back" href={href("notas")}>Minhas notas</a></h2>
            <ul className="list">{recentes.map((r, i) => <li key={i} className="item"><Data iso={r.d} /><div><strong>{r.t}</strong><span>{r.s} · {dataBR(r.d)}</span></div></li>)}</ul></article>
        </div>
        <div className="stack painel-col">
          <article className="card card-rolagem card-oito"><h2>Próximas atividades <a className="back" href={href("atividades")}>ver todas</a></h2>
            <ul className="list">{pendentes.map((x) => (
              <li key={x.curso + x.modulo} className="item"><Data iso={x.prazo} />
                <div><strong>{achar(x.curso)!.nome} · Módulo {x.modulo}</strong><span>{x.titulo} · faltam {x.restam} de {x.total} questões</span></div>
                <a className="pill on" style={{ textDecoration: "none" }} href={href("atividades", x.curso, x.modulo)}>Praticar</a></li>))}</ul></article>
          <article className="card card-rolagem"><h2>Projetos pendentes <a className="back" href={href("projetos")}>ver projetos</a></h2>
            <ul className="list">{projPend.map((p) => {
              const feitos = p.checklist.filter((c, i) => checklist[p.slug]?.[i] ?? c.feito).length;
              return <li key={p.slug} className="item"><div><strong>{p.titulo}</strong><span>{p.curso} · checklist {feitos}/{p.checklist.length}</span></div><a className="pill on" style={{ textDecoration: "none" }} href={href("projetos", p.slug)}>Abrir</a></li>;
            })}</ul></article>
        </div>
      </div>
      <article className="card"><h2>Progresso por curso</h2><div className="progress-set">
        {mat.map((c) => <Medida key={c.slug} rotulo={c.nome} valor={`${progresso(c.slug)}%`} pct={progresso(c.slug)} />)}</div></article>
      <p className="muted" style={{ fontSize: ".8rem" }}>Aluno de demonstração: {ALUNO.nome}. Dados fictícios.</p>
    </>
  );
}

export function Biblioteca() {
  const { concluidas } = useEstado();
  const mat = cursos.filter((c) => c.slug in matriculas);
  return (
    <>
      <div className="grid grid-catalogo">
        {mat.map((c) => {
          const p = progressoCurso(c.slug, concluidas);
          return (
            <article key={c.slug} className="card course">
              <span className="tag">{c.categoria} · {c.nivel}</span><h3>{c.nome}</h3><p>{c.resumo}</p>
              <div className="meta"><span>{c.horas} h propostas</span><span>{c.modulos.length} módulos</span></div>
              <div><div className="lbl"><b>Leitura</b><span>{p}%</span></div><Barra pct={p} rotulo={`Leitura de ${c.nome}`} /></div>
              <div className="foot"><a className="btn btn-solid" href={href("aprender", c.slug)}>{p > 0 ? "Continuar estudando" : "Começar"}</a></div>
            </article>
          );
        })}
      </div>
    </>
  );
}
