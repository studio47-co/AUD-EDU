import { curso } from "../data/catalogo";
import { aulas, aula as achar } from "../data/aulas";
import { matriculas } from "../data/demo";
import { Barra, Chips, Vazio } from "../components/ui";
import { CodeBlock } from "../components/Code";
import { QuestaoCard } from "../components/Quiz";
import { avisar, href, pct, setEstado, useEstado } from "../lib";
import { questoesDe } from "../data/questoes";
import { NaoEncontrada } from "./Publicas";

/** Ambiente de aprendizagem. Percurso completo e navegável: HTML5. Os demais cursos mostram o conteúdo programático. */
export function Aprender({ slug, aulaId }: { slug: string; aulaId?: string }) {
  const c = curso(slug);
  const { concluidas } = useEstado();
  if (!c) return <NaoEncontrada />;
  if (slug !== "html") {
    return (
      <>
        <a className="back" href={href("biblioteca")}>← Voltar à biblioteca</a>
        <article className="card"><h2>{c.nome} · conteúdo programático</h2>
          <p className="muted">Nesta demonstração, o percurso de aulas navegável é o do <b>HTML5</b>. Os demais cursos seguem a mesma estrutura.</p>
          <div className="row" style={{ marginTop: 14 }}><a className="btn btn-solid" href={href("aprender", "html")}>Abrir o percurso de HTML5</a></div></article>
        <div className="stack">{c.modulos.map((m) => <article key={m.n} className="card modulo"><h3>Módulo {m.n} — {m.titulo}</h3><Chips lista={m.topicos} /></article>)}</div>
      </>
    );
  }
  const alvo = achar(aulaId || "") ?? achar(matriculas.html.aula!) ?? aulas[0];
  const i = aulas.indexOf(alvo);
  const ant = aulas[i - 1], prox = aulas[i + 1];
  const feita = concluidas.includes(alvo.id);
  const total = aulas.length, ok = concluidas.length, p = pct(ok, total);
  const alternar = () => {
    setEstado((e) => ({ concluidas: feita ? e.concluidas.filter((x) => x !== alvo.id) : [...e.concluidas, alvo.id] }));
    avisar(feita ? "Aula desmarcada (estado local da demonstração)." : "Aula marcada como concluída (estado local da demonstração).");
  };
  const ultimaDoModulo = !prox || prox.modulo !== alvo.modulo;
  const modulo = c.modulos.find((m) => m.n === alvo.modulo)!;
  const quest = questoesDe("html", alvo.modulo).slice(0, 1);

  return (
    <>
      <a className="back" href={href("curso", slug)}>← Voltar ao curso</a>
      <div className="lesson-grid">
        <div className="stack" style={{ gap: 24, minWidth: 0 }}>
          <article className="card lesson-head">
            <div className="row"><span className="tag-static">Módulo {alvo.modulo} · Aula {i + 1}</span><span className="muted">{alvo.minutos} min · aula {i + 1} de {total}</span></div>
            <h2>{alvo.titulo}</h2>
            <Chips lista={[modulo.titulo, "HTML5", "Demonstração"]} />
          </article>
          <article className="card lesson-body">
            <section className="lesson-sec"><h3>Objetivos de aprendizagem</h3><ul className="bullets">{alvo.objetivos.map((o) => <li key={o}>{o}</li>)}</ul></section>
            <section className="lesson-sec"><h3>Explicação conceitual</h3><div className="prose">{alvo.conceito.map((t) => <p key={t}>{t}</p>)}</div></section>
            <section className="lesson-sec"><h3>Exemplo comentado</h3>
              <div className="exemplo"><CodeBlock lang={alvo.codigo.lang} arquivo={alvo.codigo.arquivo} x={alvo.codigo.x} /><ul className="exemplo-expl">{alvo.explicacao.map((t) => <li key={t}>{t}</li>)}</ul></div></section>
            <section className="lesson-sec"><h3>Exercício</h3>
              <div className="exercicio"><div className="prose"><p>{alvo.exercicio.enunciado}</p></div>
                <p className="muted"><b>Dica:</b> {alvo.exercicio.dica}</p>
                <details className="reveal"><summary>Ver resolução comentada</summary><div className="reveal-body"><CodeBlock lang="html" x={alvo.exercicio.resolucao} /></div></details></div></section>
            {quest.length > 0 && <section className="lesson-sec"><h3>Verifique o que aprendeu</h3>{quest.map((q) => <QuestaoCard key={q.id} q={q} n={1} />)}</section>}
            <div className="lesson-nav">
              {ant ? <a className="btn btn-soft" href={href("aprender", slug, ant.id)}>← Anterior</a> : <span />}
              <div className="row">
                <button className={`btn ${feita ? "btn-soft" : "btn-solid"}`} type="button" aria-pressed={feita} onClick={alternar}>{feita ? "✓ Concluída (desmarcar)" : "Marcar como concluída"}</button>
                {ultimaDoModulo && <a className="btn btn-soft" href={href("atividades", "html", alvo.modulo)}>Atividades do módulo</a>}
                {prox && <a className="btn btn-soft" href={href("aprender", slug, prox.id)}>Próxima →</a>}
              </div>
            </div>
          </article>
        </div>
        <aside className="card lesson-side" aria-label="Conteúdo do curso">
          <div><b>{c.nome}</b><Barra pct={p} rotulo="Leitura do curso" /><span className="muted">{ok} de {total} aulas concluídas · {p}%</span></div>
          <nav className="outline">
            {c.modulos.map((m) => (
              <div key={m.n} className="stack" style={{ gap: 8 }}>
                <h3>Módulo {m.n} · {m.titulo}</h3>
                {aulas.filter((a) => a.modulo === m.n).map((a) => (
                  <a key={a.id} className={`check${concluidas.includes(a.id) ? " done" : ""}`} aria-current={a.id === alvo.id ? "true" : undefined} href={href("aprender", slug, a.id)} style={{ textDecoration: "none", color: "inherit" }}>
                    <span className="box" aria-hidden="true">{concluidas.includes(a.id) ? "✓" : ""}</span><div><strong>{a.titulo}</strong><span>{a.minutos} min</span></div></a>
                ))}
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
export const SemAulas = () => <Vazio texto="Conteúdo em produção." />;
