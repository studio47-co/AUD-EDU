import type { ReactNode } from "react";
import { alternarTema, href, moeda, useEstado } from "../lib";
import { cursos, pacotes, type Curso, type Pacote } from "../data/catalogo";
import { progressoCurso, matriculado } from "../data/demo";

export const ICONES: Record<string, string> = {
  painel: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  biblioteca: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5",
  atividades: "M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9",
  simulados: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  projetos: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  certificados: "M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM8.5 13.5L7 21l5-3 5 3-1.5-7.5",
  conta: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  notas: "M8 3h8l4 4v14H4V3h4zM8 12h8M8 16h8M8 8h4",
  configuracoes: "M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4",
  geral: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  usuarios: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  matriculas: "M9 11l3 3 8-8M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9",
  cursos: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5",
  conteudos: "M8 3h8l4 4v14H4V3h4zM8 12h8M8 16h8M8 8h4",
  avaliacoes: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  monitoramento: "M3 12h4l3-8 4 16 3-8h4",
  auditoria: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"
};
export const Icone = ({ nome }: { nome: string }) => <svg viewBox="0 0 24 24"><path d={ICONES[nome]} /></svg>;

export const Barra = ({ pct, rotulo }: { pct: number; rotulo?: string }) => (
  <div className="bar" role="progressbar" aria-label={rotulo || "Progresso"} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
    <i style={{ ["--w" as string]: `${pct}%` }} />
  </div>
);
export const Medida = ({ rotulo, valor, pct }: { rotulo: string; valor: string; pct: number }) => (
  <div><div className="lbl"><b>{rotulo}</b><span>{valor}</span></div><Barra pct={pct} rotulo={rotulo} /></div>
);
export const Aviso = ({ children, tag = "Demonstração" }: { children: ReactNode; tag?: string }) => (
  <div className="aviso"><span className="pill on">{tag}</span><p>{children}</p></div>
);
export const Vazio = ({ texto, acao }: { texto: string; acao?: ReactNode }) => <div className="empty"><p>{texto}</p>{acao}</div>;
export const Secao = ({ titulo, sub, extra, children }: { titulo: string; sub?: ReactNode; extra?: ReactNode; children: ReactNode }) => (
  <section className="section"><header><div><h2>{titulo}</h2>{sub && <p>{sub}</p>}</div>{extra}</header>{children}</section>
);
export const Chips = ({ lista }: { lista: string[] }) => <div className="chips">{lista.map((t) => <span key={t} className="tag-static">{t}</span>)}</div>;
export const Data = ({ iso }: { iso: string }) => {
  const MES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const [, m, d] = iso.split("-");
  return <div className="date"><b>{d}</b><small>{MES[Number(m) - 1]}</small></div>;
};

export function CursoCard({ c }: { c: Curso }) {
  const mat = matriculado(c.slug);
  const { concluidas } = useEstado();
  const p = progressoCurso(c.slug, concluidas);
  return (
    <a className="card course" href={mat ? href("aprender", c.slug) : href("curso", c.slug)}>
      <span className="tag">{c.categoria} · {c.nivel}</span>
      <h3>{c.nome}</h3>
      <p>{c.resumo}</p>
      <div className="meta"><span>{c.horas} h propostas</span><span>{c.modulos.length} módulos</span></div>
      <div className="foot">
        {mat ? <span className="pill on">Matriculado · {p}% lido</span> : <span className="price">{moeda(c.preco)}<small>referência</small></span>}
      </div>
    </a>
  );
}
export function PacoteCard({ p }: { p: Pacote }) {
  const horas = p.cursos.reduce((s, sl) => s + cursos.find((c) => c.slug === sl)!.horas, 0);
  const soma = Math.round(p.cursos.reduce((s, sl) => s + cursos.find((c) => c.slug === sl)!.preco, 0) * 100) / 100;
  return (
    <a className="card course" href={href("formacao", p.slug)}>
      <span className="tag">Formação · {p.nivel}</span>
      <h3>{p.nome}</h3>
      <p>{p.resumo}</p>
      <div className="meta"><span>{horas} h propostas</span><span>{p.cursos.length} cursos</span></div>
      <div className="foot"><span className="price">{moeda(p.preco)}<small className="riscado">{moeda(soma)}</small></span></div>
    </a>
  );
}

export const BotaoTema = () => (
  <button className="icon-btn" onClick={alternarTema} type="button" aria-label="Alternar tema">
    <svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  </button>
);
export const Marca = ({ sub = "Education", alvo = href("inicio") }: { sub?: string; alvo?: string }) => (
  <a className="brand" href={alvo} aria-label={`AUDMANI ${sub}`} style={{ textDecoration: "none" }}>
    <div className="brand-mark">A</div><div><b>AUDMANI</b><small>{sub}</small></div>
  </a>
);
