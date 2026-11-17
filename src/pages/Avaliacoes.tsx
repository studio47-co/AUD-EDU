import { useState } from "react";
import { cursos, curso as achar } from "../data/catalogo";
import { matriculas, pendentes, simuladosIniciais } from "../data/demo";
import { questoesDe, todasDoCurso, type Questao } from "../data/questoes";
import { QuestaoCard } from "../components/Quiz";
import { Aviso, Secao, Vazio } from "../components/ui";
import { avisar, dataBR, href, pct, plural, setEstado, useEstado } from "../lib";
import { NaoEncontrada } from "./Publicas";

export function Atividades({ slug, modulo }: { slug?: string; modulo?: string }) {
  if (slug && modulo) {
    const c = achar(slug), m = c?.modulos.find((x) => x.n === Number(modulo));
    if (!c || !m) return <NaoEncontrada />;
    return <ModuloAtividades slug={slug} n={Number(modulo)} nome={`${c.nome} · Módulo ${m.n} — ${m.titulo}`} />;
  }
  const mat = cursos.filter((c) => c.slug in matriculas);
  return (
    <>
      <Aviso>Atividades de demonstração: você escolhe a alternativa, responde e recebe feedback imediato. Nada é salvo em servidor.</Aviso>
      {mat.map((c) => (
        <Secao key={c.slug} titulo={c.nome} sub={plural(c.modulos.length, "módulo", "módulos")}>
          <div className="grid grid-3">{c.modulos.map((m) => {
            const p = pendentes.find((x) => x.curso === c.slug && x.modulo === m.n);
            return (
              <a key={m.n} className="card course" href={href("atividades", c.slug, m.n)}>
                <span className="tag">Módulo {m.n}</span><h3>{m.titulo}</h3>
                <p>{p ? `Faltam ${p.restam} de ${p.total} questões` : "Todas as questões respondidas"}</p>
                <div className="foot"><span className={`pill${p ? "" : " on"}`}>{p ? "Pendente" : "Concluída"}</span></div></a>
            );
          })}</div>
        </Secao>
      ))}
    </>
  );
}

function ModuloAtividades({ slug, n, nome }: { slug: string; n: number; nome: string }) {
  const qs = questoesDe(slug, n);
  const [feitas, setFeitas] = useState<Record<string, boolean>>({});
  const acertos = Object.values(feitas).filter(Boolean).length;
  return (
    <>
      <a className="back" href={href("atividades")}>← Todas as atividades</a>
      <article className="card"><h2>{nome}</h2><p className="muted">{Object.keys(feitas).length} de {qs.length} respondidas · {acertos} acertos nesta sessão (demonstração)</p></article>
      <div className="q-list">{qs.map((q, i) => <QuestaoCard key={q.id} q={q} n={i + 1} onResponder={(ok) => setFeitas((f) => ({ ...f, [q.id]: ok }))} />)}</div>
    </>
  );
}

/* ---------- Simulados ---------- */
export function Simulados({ partes }: { partes: string[] }) {
  const { simulados } = useEstado();
  const [a, b] = partes;
  if (a === "executar" && b) return <Executar slug={b} />;
  if (a === "resultado" && b) return <Resultado id={b} />;
  const hist = [...simuladosIniciais, ...simulados].sort((x, y) => y.data.localeCompare(x.data));
  return (
    <>
      <Aviso>Simulados de demonstração: o resultado fica apenas na memória deste navegador e é perdido ao recarregar a página.</Aviso>
      <Secao titulo="Iniciar um simulado" sub="Escolha o curso.">
        <div className="grid grid-3">{cursos.filter((c) => c.slug in matriculas).map((c) => (
          <a key={c.slug} className="card course" href={href("simulados", "executar", c.slug)}>
            <span className="tag">{c.categoria}</span><h3>{c.nome}</h3><p>{todasDoCurso(c.slug).length} questões disponíveis na demonstração.</p>
            <div className="foot"><span className="pill on">Iniciar</span></div></a>))}</div>
      </Secao>
      <article className="card"><h2>Histórico</h2>
        {hist.length ? <ul className="list">{hist.map((t) => <li key={t.id} className="item"><div><strong>{achar(t.curso)?.nome} · {t.titulo.replace("Simulado · ", "")}</strong><span>{t.acertos} de {t.total} acertos ({pct(t.acertos, t.total)}%) · {dataBR(t.data)}</span></div>
          {t.itens && <a className="pill" style={{ textDecoration: "none" }} href={href("simulados", "resultado", t.id)}>Ver correção</a>}</li>)}</ul> : <Vazio texto="Nenhum simulado ainda." />}</article>
    </>
  );
}

function Executar({ slug }: { slug: string }) {
  const c = achar(slug);
  const qs: Questao[] = c ? todasDoCurso(slug).slice(0, 8) : [];
  const [atual, setAtual] = useState(0);
  const [resp, setResp] = useState<Record<number, number>>({});
  if (!c || !qs.length) return <NaoEncontrada />;
  const q = qs[atual];
  const enviar = () => {
    const itens = qs.map((x, i) => ({ enunciado: x.enunciado, certa: resp[i] === x.certa, correta: x.alts[x.certa], explicacao: x.explicacao }));
    const id = `s${Date.now()}`;
    const acertos = itens.filter((x) => x.certa).length;
    setEstado((e) => ({ simulados: [...e.simulados, { id, curso: slug, titulo: "Simulado · curso completo", data: new Date().toISOString().slice(0, 10), acertos, total: qs.length, itens }] }));
    avisar("Simulado corrigido (resultado local, apenas demonstração).");
    location.hash = href("simulados", "resultado", id);
  };
  return (
    <>
      <a className="back" href={href("simulados")}>← Cancelar simulado</a>
      <article className="card"><h2>Simulado · {c.nome}</h2><p className="muted">Questão {atual + 1} de {qs.length} · {Object.keys(resp).length} respondidas</p></article>
      <article className="card q">
        <div className="q-head"><span className="pill">Questão {atual + 1}</span></div>
        <div className="q-enun"><p>{q.enunciado}</p></div>
        {q.codigo && <pre className="code" style={{ padding: 14, overflow: "auto" }}><code>{q.codigo}</code></pre>}
        <div className="opts" role="radiogroup">{q.alts.map((alt, i) => (
          <button key={i} className={`check opt${resp[atual] === i ? " sel" : ""}`} role="radio" aria-checked={resp[atual] === i} type="button" onClick={() => setResp((r) => ({ ...r, [atual]: i }))}>
            <span className="box" aria-hidden="true">{"ABCD"[i]}</span><div><strong>{alt}</strong></div></button>))}</div>
        <div className="lesson-nav">
          <button className="btn btn-soft" type="button" disabled={atual === 0} onClick={() => setAtual(atual - 1)}>← Anterior</button>
          {atual < qs.length - 1 ? <button className="btn btn-solid" type="button" onClick={() => setAtual(atual + 1)}>Próxima →</button>
            : <button className="btn btn-solid" type="button" onClick={enviar}>Enviar simulado</button>}
        </div>
      </article>
    </>
  );
}

function Resultado({ id }: { id: string }) {
  const { simulados } = useEstado();
  const t = simulados.find((x) => x.id === id);
  if (!t) return <Vazio texto="Resultado não encontrado (a demonstração não guarda dados ao recarregar)." acao={<a className="btn btn-solid" href={href("simulados")}>Voltar aos simulados</a>} />;
  return (
    <>
      <a className="back" href={href("simulados")}>← Voltar aos simulados</a>
      <article className="card hero"><div><span className="kicker">Resultado do simulado</span><h2>{pct(t.acertos, t.total)}%</h2><p>{t.acertos} de {t.total} acertos · {achar(t.curso)?.nome}</p></div></article>
      <div className="q-list">{t.itens?.map((it, i) => (
        <article key={i} className="card q"><div className="q-head"><span className="pill">Questão {i + 1}</span></div><div className="q-enun"><p>{it.enunciado}</p></div>
          <div className="feedback"><b>{it.certa ? "Correto" : `Incorreto · resposta certa: ${it.correta}`}</b><div>{it.explicacao}</div></div></article>))}</div>
    </>
  );
}
