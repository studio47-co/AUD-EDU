import { useId, useState, type ReactNode } from "react";
import { BotaoTema, Icone, Marca } from "../components/ui";
import { avisar, dataBR, demo, href } from "../lib";
import { auditoria, avaliacoes, certificadosIni, cursosControl, matriculasIni, projetosEnvios, usuarios } from "./dados";

const SECOES: [string, string, string][] = [
  ["geral", "Visão geral", "geral"], ["usuarios", "Usuários", "usuarios"], ["matriculas", "Matrículas", "matriculas"], ["cursos", "Cursos", "cursos"],
  ["conteudos", "Conteúdos", "conteudos"], ["avaliacoes", "Avaliações", "avaliacoes"], ["projetos", "Projetos", "projetos"], ["certificados", "Certificados", "certificados"],
  ["monitoramento", "Monitoramento", "monitoramento"], ["auditoria", "Auditoria", "auditoria"], ["configuracoes", "Configurações", "configuracoes"]
];
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* ---------- blocos reutilizáveis (sistema único de formulários, botões e tabelas) ---------- */
const Campo = ({ rotulo, valor, onChange, tipo = "text", ph }: { rotulo: string; valor: string; onChange: (v: string) => void; tipo?: string; ph?: string }) => {
  const id = useId();
  return <div className="field"><label htmlFor={id}>{rotulo}</label><input id={id} type={tipo} value={valor} placeholder={ph} onChange={(e) => onChange(e.target.value)} /></div>;
};
const Selecao = ({ rotulo, valor, onChange, opcoes }: { rotulo: string; valor: string; onChange: (v: string) => void; opcoes: string[] }) => {
  const id = useId();
  return <div className="field"><label htmlFor={id}>{rotulo}</label><select id={id} value={valor} onChange={(e) => onChange(e.target.value)}>{opcoes.map((o) => <option key={o}>{o}</option>)}</select></div>;
};
const Pilula = ({ t }: { t: string }) => <span className={`pill${["Ativo", "Ativa", "Publicado", "Válido", "Sucesso", "Aprovado"].includes(t) ? " on" : ""}`}>{t}</span>;
const Tabela = ({ cab, linhas, vazio = "Nenhum registro com esses filtros." }: { cab: string[]; linhas: ReactNode[][]; vazio?: string }) => (
  <div className="scroll"><table className="table"><thead><tr>{cab.map((c) => <th key={c}>{c}</th>)}</tr></thead>
    <tbody>{linhas.length ? linhas.map((l, i) => <tr key={i}>{l.map((c, j) => <td key={j}>{c}</td>)}</tr>) : <tr><td colSpan={cab.length}><p className="vazio">{vazio}</p></td></tr>}</tbody></table></div>
);
const Kpi = ({ n, r, alerta }: { n: string; r: string; alerta?: boolean }) => <div className={`kpi${alerta ? " alerta" : ""}`}><b>{n}</b><span>{r}</span></div>;
const Cartao = ({ t, children }: { t: string; children: ReactNode }) => <article className="card"><h2>{t}</h2>{children}</article>;

/* ---------- seções ---------- */
function Geral() {
  return (
    <>
      <div className="kpis"><Kpi n="128" r="Usuários (fictícios)" /><Kpi n="214" r="Matrículas ativas" /><Kpi n="8" r="Cursos no catálogo" /><Kpi n="42" r="Certificados emitidos" /><Kpi n="3" r="Projetos aguardando revisão" alerta /></div>
      <div className="grid grid-2" style={{ alignItems: "start" }}>
        <Cartao t="Atividade recente"><ul className="list">{auditoria.slice(0, 4).map((a) => <li key={a.id} className="item"><div><strong>{a.acao}</strong><span>{a.ator} · {a.data}</span></div><Pilula t={a.resultado} /></li>)}</ul></Cartao>
        <Cartao t="Estado dos serviços (simulado)"><ul className="list">{["Aplicação", "Banco de dados", "Fila de e-mails", "Verificação de certificados"].map((s) => <li key={s} className="item"><div><strong>{s}</strong><span>Operacional</span></div><span className="pill on">OK</span></li>)}</ul></Cartao>
      </div>
    </>
  );
}

function Usuarios() {
  const [busca, setBusca] = useState(""), [papel, setPapel] = useState("Todos"), [status, setStatus] = useState("Todos");
  const [f, setF] = useState({ busca: "", papel: "Todos", status: "Todos" });
  const lista = usuarios.filter((u) => (f.papel === "Todos" || u.papel === f.papel) && (f.status === "Todos" || u.status === f.status) && norm(u.nome + u.email).includes(norm(f.busca)));
  return (
    <Cartao t="Usuários">
      <form className="toolbar" onSubmit={(e) => { e.preventDefault(); setF({ busca, papel, status }); }}>
        <Campo rotulo="Busca" valor={busca} onChange={setBusca} ph="Nome ou e-mail" />
        <Selecao rotulo="Papel" valor={papel} onChange={setPapel} opcoes={["Todos", "Aluno", "Professor", "Administrador", "OWNER"]} />
        <Selecao rotulo="Status" valor={status} onChange={setStatus} opcoes={["Todos", "Ativo", "Pendente", "Suspenso"]} />
        <button className="btn btn-solid" type="submit">Filtrar</button></form>
      <Tabela cab={["Nome", "E-mail", "Papel", "Status", "Último acesso", "Ações"]} linhas={lista.map((u) => [u.nome, <span className="mono">{u.email}</span>, u.papel, <Pilula t={u.status} />, u.ultimo === "—" ? "—" : dataBR(u.ultimo),
        <div className="acoes"><button className="btn btn-soft btn-sm" type="button" onClick={() => demo("A alteração de usuário")}>Editar</button><button className="btn perigo btn-sm" type="button" onClick={() => demo("A suspensão")}>Suspender</button></div>])} />
    </Cartao>
  );
}

function Matriculas() {
  const [lista, setLista] = useState(matriculasIni);
  const [g, setG] = useState({ email: "", curso: "HTML5", termina: "" });
  const [busca, setBusca] = useState(""), [curso, setCurso] = useState("Todos"), [status, setStatus] = useState("Todos");
  const [f, setF] = useState({ busca: "", curso: "Todos", status: "Todos" });
  const cursos = cursosControl.map((c) => c.nome);
  const vis = lista.filter((m) => (f.curso === "Todos" || m.curso === f.curso) && (f.status === "Todos" || m.status === f.status) && norm(m.email).includes(norm(f.busca)));
  return (
    <>
      <Cartao t="Conceder matrícula">
        <form className="toolbar" onSubmit={(e) => { e.preventDefault(); if (!g.email) return avisar("Informe um e-mail fictício."); setLista([{ id: `m${Date.now()}`, email: g.email, curso: g.curso, status: "Ativa", termina: g.termina || "2027-12-31" }, ...lista]); setG({ ...g, email: "" }); avisar("Matrícula criada apenas na demonstração."); }}>
          <Campo rotulo="E-mail" tipo="email" valor={g.email} onChange={(v) => setG({ ...g, email: v })} ph="aluno@exemplo.demo" />
          <Selecao rotulo="Curso" valor={g.curso} onChange={(v) => setG({ ...g, curso: v })} opcoes={cursos} />
          <Campo rotulo="Termina em" tipo="date" valor={g.termina} onChange={(v) => setG({ ...g, termina: v })} />
          <button className="btn btn-solid" type="submit">Conceder</button></form></Cartao>
      <Cartao t="Matrículas">
        <form className="toolbar" onSubmit={(e) => { e.preventDefault(); setF({ busca, curso, status }); }}>
          <Campo rotulo="Busca" valor={busca} onChange={setBusca} ph="E-mail" />
          <Selecao rotulo="Curso" valor={curso} onChange={setCurso} opcoes={["Todos", ...cursos]} />
          <Selecao rotulo="Status" valor={status} onChange={setStatus} opcoes={["Todos", "Ativa", "Suspensa", "Expirada"]} />
          <button className="btn btn-solid" type="submit">Filtrar</button></form>
        <Tabela cab={["E-mail", "Curso", "Status", "Termina em", "Ações"]} linhas={vis.map((m) => [<span className="mono">{m.email}</span>, m.curso, <Pilula t={m.status} />, dataBR(m.termina), <button className="btn btn-soft btn-sm" type="button" onClick={() => demo("A revogação")}>Revogar</button>])} />
      </Cartao>
    </>
  );
}

function Cursos() {
  const [st, setSt] = useState<Record<string, string>>(Object.fromEntries(cursosControl.map((c) => [c.slug, c.status])));
  return (
    <Cartao t="Cursos">
      <Tabela cab={["Curso", "Módulos", "Status de publicação"]} linhas={cursosControl.map((c) => [<b>{c.nome}</b>, c.mod,
        <div className="field" style={{ margin: 0, maxWidth: 220 }}><select aria-label={`Status de ${c.nome}`} value={st[c.slug]} onChange={(e) => { setSt({ ...st, [c.slug]: e.target.value }); avisar(`${c.nome}: status alterado apenas na demonstração.`); }}>{["Publicado", "Rascunho", "Arquivado"].map((o) => <option key={o}>{o}</option>)}</select></div>])} />
    </Cartao>
  );
}

function Conteudos() {
  return (
    <Cartao t="Conteúdos">
      <Tabela cab={["Curso", "Módulo", "Aulas", "Situação"]} linhas={[
        ["HTML5", "1 · Introdução ao HTML", 5, <Pilula t="Publicado" />], ["HTML5", "2 · Estrutura e semântica", 6, <Pilula t="Publicado" />], ["HTML5", "3 · Formulários", 6, <Pilula t="Publicado" />], ["HTML5", "4 · HTML avançado", 6, <Pilula t="Publicado" />],
        ["CSS3", "1 · Fundamentos", 7, <Pilula t="Publicado" />], ["Java", "1 · Introdução", 6, <Pilula t="Em produção" />], ["Kotlin", "1 · Introdução", 6, <Pilula t="Em produção" />]]} />
    </Cartao>
  );
}

function Avaliacoes() {
  const [curso, setCurso] = useState("Todos");
  const vis = avaliacoes.filter((a) => curso === "Todos" || a.curso === curso);
  return (
    <Cartao t="Avaliações">
      <div className="toolbar"><Selecao rotulo="Curso" valor={curso} onChange={setCurso} opcoes={["Todos", "HTML5", "CSS3", "JavaScript"]} /></div>
      <Tabela cab={["Código", "Curso", "Módulo", "Tipo", "Enunciado"]} linhas={vis.map((a) => [<span className="mono">{a.id}</span>, a.curso, a.modulo, a.tipo, <div className="cel-texto">{a.enunciado}</div>])} />
    </Cartao>
  );
}

function Projetos() {
  const [lista, setLista] = useState(projetosEnvios);
  const [status, setStatus] = useState("Todos"), [f, setF] = useState("Todos");
  const vis = lista.filter((p) => f === "Todos" || p.status === f);
  const mudar = (id: string, s: string) => { setLista(lista.map((p) => (p.id === id ? { ...p, status: s } : p))); avisar("Revisão registrada apenas na demonstração."); };
  return (
    <Cartao t="Projetos enviados">
      <form className="toolbar" onSubmit={(e) => { e.preventDefault(); setF(status); }}>
        <Selecao rotulo="Status" valor={status} onChange={setStatus} opcoes={["Todos", "Em revisão", "Aprovado", "Ajustes solicitados"]} />
        <button className="btn btn-solid" type="submit">Filtrar</button></form>
      <Tabela cab={["Aluno", "Curso", "Projeto", "Enviado em", "Status", "Revisão"]} linhas={vis.map((p) => [p.aluno, p.curso, <div className="cel-texto">{p.titulo}</div>, dataBR(p.enviado), <Pilula t={p.status} />,
        <div className="acoes"><button className="btn btn-soft btn-sm" type="button" onClick={() => mudar(p.id, "Aprovado")}>Aprovar</button><button className="btn btn-soft btn-sm" type="button" onClick={() => mudar(p.id, "Ajustes solicitados")}>Pedir ajustes</button></div>])} />
    </Cartao>
  );
}

function Certificados() {
  const [lista, setLista] = useState(certificadosIni);
  const [g, setG] = useState({ email: "", curso: "HTML5" });
  const [busca, setBusca] = useState(""), [status, setStatus] = useState("Todos"), [f, setF] = useState({ busca: "", status: "Todos" });
  const vis = lista.filter((c) => (f.status === "Todos" || c.status === f.status) && norm(c.email + c.id).includes(norm(f.busca)));
  return (
    <>
      <Cartao t="Emitir certificado (simulação)">
        <form className="toolbar" onSubmit={(e) => { e.preventDefault(); if (!g.email) return avisar("Informe um e-mail fictício."); setLista([{ id: `DEMO-${String(lista.length + 1).padStart(4, "0")}`, email: g.email, curso: g.curso, status: "Válido", emitido: "2026-11-17" }, ...lista]); setG({ ...g, email: "" }); avisar("Certificado fictício criado. Sem validade oficial."); }}>
          <Campo rotulo="E-mail" tipo="email" valor={g.email} onChange={(v) => setG({ ...g, email: v })} ph="aluno@exemplo.demo" />
          <Selecao rotulo="Curso" valor={g.curso} onChange={(v) => setG({ ...g, curso: v })} opcoes={cursosControl.map((c) => c.nome)} />
          <button className="btn btn-solid" type="submit">Emitir</button></form></Cartao>
      <Cartao t="Certificados">
        <form className="toolbar" onSubmit={(e) => { e.preventDefault(); setF({ busca, status }); }}>
          <Campo rotulo="Busca" valor={busca} onChange={setBusca} ph="E-mail ou código" />
          <Selecao rotulo="Status" valor={status} onChange={setStatus} opcoes={["Todos", "Válido", "Revogado"]} />
          <button className="btn btn-solid" type="submit">Filtrar</button></form>
        <Tabela cab={["Código", "E-mail", "Curso", "Status", "Emitido em", "Ações"]} linhas={vis.map((c) => [<span className="mono">{c.id}</span>, <span className="mono">{c.email}</span>, c.curso, <Pilula t={c.status} />, dataBR(c.emitido),
          <button className="btn perigo btn-sm" type="button" disabled={c.status === "Revogado"} onClick={() => { setLista(lista.map((x) => (x.id === c.id ? { ...x, status: "Revogado" } : x))); avisar("Revogação simulada."); }}>Revogar</button>])} />
      </Cartao>
    </>
  );
}

function Monitoramento() {
  const serie = [32, 41, 38, 55, 62, 58, 71, 66, 74, 69, 80, 77];
  return (
    <>
      <div className="kpis"><Kpi n="1,2 mil" r="Requisições / hora" /><Kpi n="0,4%" r="Taxa de erro" /><Kpi n="86 ms" r="Latência mediana" /><Kpi n="23" r="Sessões ativas" /></div>
      <Cartao t="Requisições nas últimas 12 horas (simulado)">
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }} role="img" aria-label="Gráfico de barras de requisições por hora">
          {serie.map((v, i) => <div key={i} style={{ flex: 1, height: `${v}%`, borderRadius: 8, background: "var(--accent)", opacity: 0.35 + v / 160 }} title={`${v} mil`} />)}</div></Cartao>
    </>
  );
}

function Auditoria() {
  const [acao, setAcao] = useState(""), [ator, setAtor] = useState(""), [res, setRes] = useState("Todos");
  const [f, setF] = useState({ acao: "", ator: "", res: "Todos" });
  const vis = auditoria.filter((a) => norm(a.acao).includes(norm(f.acao)) && norm(a.ator).includes(norm(f.ator)) && (f.res === "Todos" || a.resultado === f.res));
  return (
    <Cartao t="Auditoria">
      <form className="toolbar" onSubmit={(e) => { e.preventDefault(); setF({ acao, ator, res }); }}>
        <Campo rotulo="Ação" valor={acao} onChange={setAcao} ph="ex.: auth.login" />
        <Campo rotulo="Ator" valor={ator} onChange={setAtor} ph="usuário" />
        <Selecao rotulo="Resultado" valor={res} onChange={setRes} opcoes={["Todos", "Sucesso", "Falha", "Negado"]} />
        <button className="btn btn-solid" type="submit">Filtrar</button>
        <button className="btn btn-soft" type="button" onClick={() => avisar("Integridade verificada (simulação): cadeia de registros fictícios íntegra.")}>Verificar integridade</button></form>
      <Tabela cab={["Data", "Ator", "Ação", "Alvo", "Resultado"]} linhas={vis.map((a) => [a.data, a.ator, <span className="mono">{a.acao}</span>, <span className="mono">{a.alvo}</span>, <Pilula t={a.resultado} />])} />
    </Cartao>
  );
}

function Configuracoes() {
  const [c, setC] = useState({ manutencao: false, cadastro: true, mfa: true });
  const t = (k: keyof typeof c, r: string, d: string) => (
    <button type="button" className={`check${c[k] ? " done" : ""}`} aria-pressed={c[k]} onClick={() => { setC({ ...c, [k]: !c[k] }); avisar("Configuração alterada apenas na demonstração."); }}>
      <span className="box" aria-hidden="true">{c[k] ? "✓" : ""}</span><div><strong>{r}</strong><span>{d}</span></div></button>
  );
  return <Cartao t="Configurações"><div className="stack">{t("manutencao", "Modo de manutenção", "Exibe um aviso e bloqueia novas sessões de alunos.")}{t("cadastro", "Cadastro de novos usuários", "Permite que novas contas sejam criadas.")}{t("mfa", "Verificação em duas etapas para administradores", "Exige segundo fator no Control.")}</div></Cartao>;
}

const VISTAS: Record<string, () => ReactNode> = { geral: Geral, usuarios: Usuarios, matriculas: Matriculas, cursos: Cursos, conteudos: Conteudos, avaliacoes: Avaliacoes, projetos: Projetos, certificados: Certificados, monitoramento: Monitoramento, auditoria: Auditoria, configuracoes: Configuracoes };

export function ControlApp({ secao }: { secao?: string }) {
  const atual = secao && VISTAS[secao] ? secao : "geral";
  const Vista = VISTAS[atual];
  const rotulo = SECOES.find((s) => s[0] === atual)![1];
  return (
    <div className="app">
      <aside className="sidebar">
        <Marca sub="Control" alvo={href("control")} />
        <nav className="nav" aria-label="Seções do painel">
          {SECOES.map(([id, nome, ic]) => (
            <button key={id} type="button" aria-current={atual === id ? "page" : undefined} onClick={() => { location.hash = href("control", id); }}><Icone nome={ic} /><span className="nav-long">{nome}</span><span className="nav-short">{nome}</span></button>
          ))}
        </nav>
        <div className="side-foot"><a className="btn btn-soft" href={href("painel")}>Voltar à plataforma</a></div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div><h1>{rotulo}</h1><p>AUDMANI Control · demonstração visual</p></div>
          <div className="actions"><span className="pill">Helena Duarte · OWNER (fictício)</span><BotaoTema /></div>
        </header>
        <div className="view">
          <div className="faixa-lab">DEMONSTRAÇÃO VISUAL · dados fictícios · nenhuma operação administrativa real é executada</div>
          <Vista />
        </div>
      </main>
    </div>
  );
}
