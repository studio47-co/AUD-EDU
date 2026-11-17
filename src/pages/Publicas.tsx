import { useState } from "react";
import { cursos, pacotes, curso, categorias, niveis } from "../data/catalogo";
import { matriculado, NOTA_MINIMA } from "../data/demo";
import { CursoCard, PacoteCard, Secao, Vazio, Chips, Aviso } from "../components/ui";
import { demo, href, moeda, plural } from "../lib";

const lista = (n: string[]) => (n.length < 2 ? n.join("") : `${n.slice(0, -1).join(", ")} e ${n[n.length - 1]}`);

export function Inicio() {
  const pacote = pacotes[0];
  const horas = cursos.reduce((s, c) => s + c.horas, 0);
  const soma = Math.round(pacote.cursos.reduce((s, sl) => s + curso(sl)!.preco, 0) * 100) / 100;
  return (
    <>
      <div className="grid grid-hero">
        <article className="card hero">
          <div><span className="kicker">AUDMANI Education</span>
            <h1>Aprenda programação construindo projetos de verdade.</h1>
            <p>Explore diferentes linguagens e tecnologias com aulas estruturadas, exercícios práticos, simulados e projetos que conectam conhecimento à aplicação real.</p></div>
          <div className="row"><a className="btn" href={href("catalogo")}>Explorar o catálogo</a><a className="btn" href={href("metodologia")}>Conhecer nossa metodologia</a></div>
        </article>
        <article className="card stat stat-indicadores">
          <div className="indicador"><strong>{cursos.length} cursos</strong><span>{lista(cursos.map((c) => c.nome))}</span></div>
          <div className="indicador"><strong>{horas} h</strong><span>carga horária proposta (em validação)</span></div>
          <div className="indicador"><strong>{pacotes.length} formação</strong><span>{pacote.nome}</span></div>
        </article>
      </div>
      <Secao titulo="Como o estudo funciona" sub="Sem atalhos: cada curso segue a mesma estrutura." extra={<a className="back" href={href("como-funciona")}>ver como funciona</a>}>
        <div className="grid grid-3">
          <article className="card"><h2>Aulas completas</h2><p className="muted">Cada aula traz objetivos, explicação, exemplos comentados, erros comuns, boas práticas, exercícios com resolução e referências técnicas.</p></article>
          <article className="card"><h2>Prática em cada módulo</h2><p className="muted">Atividades com feedback imediato, simulados corrigidos e um projeto final por curso.</p></article>
          <article className="card"><h2>Progresso transparente</h2><p className="muted">Leitura, desempenho nas questões e requisitos de conclusão são medidos separadamente.</p></article>
        </div>
      </Secao>
      <Secao titulo="Cursos" sub="Estude individualmente ou em formação." extra={<a className="back" href={href("catalogo")}>ver catálogo</a>}>
        <div className="grid grid-3">{cursos.map((c) => <CursoCard key={c.slug} c={c} />)}</div>
      </Secao>
      <article className="card"><div className="pack">
        <div className="stack"><span className="tag-static">Formação · {pacote.nivel}</span>
          <h2 style={{ fontSize: "1.5rem", margin: 0, display: "block" }}>{pacote.nome}</h2>
          <p className="muted">{pacote.descricao}</p>
          <div className="row"><div className="price-big">{moeda(pacote.preco)}<small>em vez de <span className="riscado">{moeda(soma)}</span> · valores demonstrativos</small></div></div>
          <div className="row"><a className="btn btn-solid" href={href("formacao", pacote.slug)}>Conhecer a formação</a></div></div>
        <ol>{pacote.cursos.map((s) => <li key={s}>{curso(s)!.nome}<span>{curso(s)!.horas} h</span></li>)}</ol>
      </div></article>
    </>
  );
}

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Catalogo() {
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState("Todos");
  const [niv, setNiv] = useState("Todos");
  const t = norm(busca);
  const casa = (txt: string) => norm(txt).includes(t);
  const lc = cat === "Formações" ? [] : cursos.filter((c) => (cat === "Todos" || c.categoria === cat) && (niv === "Todos" || c.nivel === niv) && casa([c.nome, c.resumo, c.categoria, ...c.modulos.flatMap((m) => [m.titulo, ...m.topicos])].join(" ")));
  const lp = pacotes.filter((p) => (cat === "Todos" || cat === "Formações" || p.categoria === cat) && (niv === "Todos" || p.nivel === niv) && casa([p.nome, p.resumo, p.categoria].join(" ")));
  return (
    <>
      <section className="section"><header><div><h2 style={{ fontSize: "1.8rem" }}>Catálogo</h2><p>Pesquise por curso, módulo ou tópico. Valores de referência; a matrícula é liberada pela equipe.</p></div></header></section>
      <article className="card filters">
        <label className="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input type="search" placeholder="Buscar curso, módulo ou tópico (ex.: Flexbox)" aria-label="Buscar no catálogo" value={busca} onChange={(e) => setBusca(e.target.value)} /></label>
        <div><div className="kicker" style={{ marginBottom: 8 }}>Categoria</div>
          <div className="tabs" role="tablist">{categorias.map((c) => <button key={c} className="tab" role="tab" aria-selected={cat === c} type="button" onClick={() => setCat(c)}>{c}</button>)}</div></div>
        <div><div className="kicker" style={{ marginBottom: 8 }}>Nível</div>
          <div className="tabs" role="tablist">{niveis.map((n) => <button key={n} className="tab" role="tab" aria-selected={niv === n} type="button" onClick={() => setNiv(n)}>{n}</button>)}</div></div>
      </article>
      <div className="stack" style={{ gap: 28 }}>
        {!lc.length && !lp.length && <Vazio texto="Nenhum curso encontrado com esses filtros." acao={<button className="btn btn-soft" type="button" onClick={() => { setBusca(""); setCat("Todos"); setNiv("Todos"); }}>Limpar filtros</button>} />}
        {lc.length > 0 && <Secao titulo="Cursos individuais" sub={plural(lc.length, "curso", "cursos")}><div className="grid grid-catalogo">{lc.map((c) => <CursoCard key={c.slug} c={c} />)}</div></Secao>}
        {lp.length > 0 && <Secao titulo="Formações (pacotes)" sub="Cursos agrupados com preço de pacote."><div className="grid grid-catalogo">{lp.map((p) => <PacoteCard key={p.slug} p={p} />)}</div></Secao>}
      </div>
    </>
  );
}

export function CursoPagina({ slug }: { slug: string }) {
  const c = curso(slug);
  if (!c) return <NaoEncontrada />;
  const mat = matriculado(c.slug);
  return (
    <>
      <a className="back" href={href("catalogo")}>← Voltar ao catálogo</a>
      <div className="grid grid-hero">
        <article className="card hero"><div><span className="kicker">{c.categoria} · {c.nivel}</span><h1>{c.nome}</h1><p>{c.descricao}</p></div>
          <div className="row">{mat ? <a className="btn" href={href("aprender", c.slug)}>Acessar o curso</a> : <button className="btn" type="button" onClick={() => demo("A solicitação de matrícula")}>Solicitar matrícula</button>}</div></article>
        <article className="card stat stat-indicadores">
          <div className="indicador"><strong>{c.horas} h</strong><span>carga horária proposta</span></div>
          <div className="indicador"><strong>{c.modulos.length} módulos</strong><span>{c.modulos.reduce((s, m) => s + m.topicos.length, 0)} tópicos</span></div>
          <div className="indicador"><strong>{moeda(c.preco)}</strong><span>valor de referência (demonstração)</span></div>
        </article>
      </div>
      <Secao titulo="O que você vai aprender"><article className="card"><ul className="bullets">{c.aprendera.map((x) => <li key={x}>{x}</li>)}</ul></article></Secao>
      <Secao titulo="Conteúdo programático">
        <div className="stack">{c.modulos.map((m) => <article key={m.n} className="card modulo"><h3>Módulo {m.n} — {m.titulo}</h3><Chips lista={m.topicos} /></article>)}</div>
      </Secao>
    </>
  );
}

export function Formacao({ slug }: { slug: string }) {
  const p = pacotes.find((x) => x.slug === slug);
  if (!p) return <NaoEncontrada />;
  return (
    <>
      <a className="back" href={href("catalogo")}>← Voltar ao catálogo</a>
      <article className="card hero"><div><span className="kicker">Formação · {p.nivel}</span><h1>{p.nome}</h1><p>{p.descricao}</p></div>
        <div className="row"><button className="btn" type="button" onClick={() => demo("A solicitação de matrícula")}>Solicitar matrícula</button></div></article>
      <Secao titulo="Cursos da formação"><div className="grid grid-catalogo">{p.cursos.map((s) => <CursoCard key={s} c={curso(s)!} />)}</div></Secao>
    </>
  );
}

export function Metodologia() {
  return (
    <>
      <section className="section"><header><div><h2 style={{ fontSize: "1.8rem" }}>Metodologia</h2><p>Como os cursos são construídos e como o progresso é medido.</p></div></header></section>
      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <article className="card"><h2>Anatomia de uma aula</h2>
          <ol className="bullets">{["Objetivos de aprendizagem", "Explicação conceitual", "Exemplos práticos", "Código comentado, quando aplicável", "Explicação do funcionamento do código", "Erros comuns", "Boas práticas", "Exercícios", "Resolução comentada", "Referências técnicas"].map((x) => <li key={x}>{x}</li>)}</ol></article>
        <article className="card"><h2>Três medidas de progresso</h2><div className="stack">
          <div><b>Leitura</b><p className="muted">Aulas que você marcou como concluídas.</p></div>
          <div><b>Desempenho</b><p className="muted">Percentual de acertos nas questões objetivas (atividades e simulados).</p></div>
          <div><b>Requisitos</b><p className="muted">Condições para elegibilidade ao certificado: aulas, questões, acerto mínimo de {NOTA_MINIMA}% e projeto entregue.</p></div></div></article>
      </div>
      <article className="card"><h2>Como você pratica</h2><div className="grid grid-3">
        <div><b>Atividades</b><p className="muted">Cinco tipos por módulo: múltipla escolha, verdadeiro ou falso, interpretação de código, identificação de erros e exercícios práticos.</p></div>
        <div><b>Simulados</b><p className="muted">Escolha curso e módulo, responda, envie e veja a correção comentada. O histórico fica salvo.</p></div>
        <div><b>Projetos</b><p className="muted">Briefing, requisitos, etapas, critérios e checklist, com campo para registrar a entrega.</p></div></div></article>
    </>
  );
}

const PASSOS: [string, string][] = [
  ["Cursos e módulos", "Cada curso é dividido em módulos que avançam do básico ao aplicado. Os módulos seguem a mesma estrutura em todas as linguagens e áreas, então você sabe o que esperar."],
  ["Aulas", "Dentro de cada módulo estão as aulas: objetivos, explicação, exemplos comentados, erros comuns, boas práticas, exercícios com resolução e referências técnicas. Você marca as aulas concluídas conforme avança."],
  ["Atividades e avaliações", "Ao final de cada módulo, atividades de cinco tipos: múltipla escolha, verdadeiro ou falso, interpretação de código, identificação de erros e exercícios práticos. As objetivas têm feedback imediato."],
  ["Simulados", "Escolha o curso e o módulo, responda, envie e veja a correção comentada. O histórico de simulados fica salvo na sua conta."],
  ["Projetos", "Cada curso tem um projeto com briefing, requisitos, etapas, critérios e checklist. Você registra o link da entrega; não há avaliação automática."],
  ["Acompanhamento do progresso", `Leitura (aulas concluídas), desempenho (acertos nas questões objetivas) e requisitos do certificado (aulas, questões, acerto mínimo de ${NOTA_MINIMA}% e projeto entregue) são medidos separadamente e aparecem no seu painel.`]
];
export function ComoFunciona() {
  return (
    <>
      <section className="section"><header><div><h2 style={{ fontSize: "1.8rem" }}>Como funciona</h2><p>O processo de aprendizagem da AUDMANI, do primeiro módulo ao projeto final.</p></div></header></section>
      <div className="grid grid-passos">{PASSOS.map(([t, x], i) => <article key={t} className="card passo"><span className="tag-static">Passo {i + 1}</span><h2 style={{ margin: 0 }}>{t}</h2><p className="muted">{x}</p></article>)}</div>
      <article className="card"><h2>Teoria e prática juntas</h2>
        <p className="muted" style={{ maxWidth: "74ch" }}>A metodologia combina cada conceito com aplicação imediata: você lê a explicação, vê o código funcionando, pratica nos exercícios, confirma o entendimento nas atividades e, ao final, integra tudo em um projeto.</p>
        <div className="row" style={{ marginTop: 16 }}><a className="btn btn-solid" href={href("catalogo")}>Explorar o catálogo</a><a className="btn btn-soft" href={href("metodologia")}>Conhecer nossa metodologia</a></div></article>
    </>
  );
}

export function NaoEncontrada() {
  return <Vazio texto="Esse endereço não existe nesta demonstração." acao={<a className="btn btn-solid" href={href("inicio")}>Voltar ao início</a>} />;
}
export const AvisoDemo = () => <Aviso>Versão de apresentação: todos os dados são fictícios e nada é enviado a servidores.</Aviso>;
