import { pct, type Simulado } from "../lib";
import { aulas } from "./aulas";

/** TODOS os dados abaixo são fictícios e existem apenas nesta demonstração. */
export const ALUNO = { nome: "Alex Martins", email: "alex.martins@exemplo.demo" };

type Matricula = { data: string; ultimoAcesso: string | null; aula?: string; progressoFixo?: number };
export const matriculas: Record<string, Matricula> = {
  html: { data: "2026-08-12", ultimoAcesso: "2026-11-16", aula: "a16" },
  css: { data: "2026-09-30", ultimoAcesso: "2026-11-12", progressoFixo: 30 },
  javascript: { data: "2026-11-05", ultimoAcesso: "2026-11-09", progressoFixo: 10 }
};
export const matriculado = (slug: string) => slug in matriculas;

export const totalAulasHtml = aulas.length;
/** HTML5 acompanha as aulas concluídas no estado local; os demais usam o valor fixo da demonstração. */
export const progressoCurso = (slug: string, concluidas: string[]) =>
  slug === "html" ? pct(concluidas.length, totalAulasHtml) : matriculas[slug]?.progressoFixo ?? 0;

/* ---------- atividades pendentes ---------- */
export type Pendente = { curso: string; modulo: number; titulo: string; restam: number; total: number; prazo: string };
export const pendentes: Pendente[] = [
  { curso: "html", modulo: 3, titulo: "Formulários", restam: 3, total: 4, prazo: "2026-11-19" },
  { curso: "css", modulo: 2, titulo: "Estilização", restam: 4, total: 4, prazo: "2026-11-21" },
  { curso: "html", modulo: 4, titulo: "HTML avançado", restam: 4, total: 4, prazo: "2026-11-24" },
  { curso: "javascript", modulo: 1, titulo: "Fundamentos", restam: 2, total: 4, prazo: "2026-11-25" },
  { curso: "css", modulo: 3, titulo: "Layouts", restam: 4, total: 4, prazo: "2026-11-27" },
  { curso: "javascript", modulo: 2, titulo: "Estruturas e funções", restam: 4, total: 4, prazo: "2026-11-30" },
  { curso: "css", modulo: 4, titulo: "Responsividade", restam: 4, total: 4, prazo: "2026-12-02" },
  { curso: "javascript", modulo: 3, titulo: "JavaScript no navegador", restam: 4, total: 4, prazo: "2026-12-04" },
  { curso: "html", modulo: 2, titulo: "Estrutura e semântica", restam: 1, total: 4, prazo: "2026-12-06" },
  { curso: "javascript", modulo: 4, titulo: "JavaScript moderno", restam: 4, total: 4, prazo: "2026-12-09" }
];

/* ---------- projetos ---------- */
export type Projeto = { slug: string; curso: string; tipo: string; titulo: string; objetivo: string; checklist: { t: string; feito: boolean }[]; entregue: boolean };
const lista = (itens: string[], feitos: number) => itens.map((t, i) => ({ t, feito: i < feitos }));
export const projetos: Projeto[] = [
  { slug: "html", curso: "HTML5", tipo: "Projeto final", titulo: "Página institucional", entregue: false,
    objetivo: "Construir uma página institucional completa e acessível, em HTML puro, aplicando estrutura semântica, formulário, tabela, mídia e metadados.",
    checklist: lista(["Documento válido com lang e charset", "Header, nav, main e footer", "Hierarquia de títulos correta", "Lista de serviços", "Imagens com alt", "Formulário de contato com labels", "Validação nativa nos campos", "Tabela de preços com caption", "Metadados e description", "Navegação por teclado testada", "Validação no validador do W3C", "Textos revisados", "Página publicada", "Link de entrega"], 9) },
  { slug: "css", curso: "CSS3", tipo: "Projeto final", titulo: "Transformar a página HTML em um site responsivo",
    entregue: false, objetivo: "Estilizar do zero a página institucional do curso de HTML5, transformando-a em um site visualmente consistente, responsivo e acessível, apenas com CSS.",
    checklist: lista(["Variáveis de cor e espaçamento", "Tipografia definida", "Layout com Flexbox", "Layout com Grid", "Breakpoints para tablet e celular", "Estados de foco e hover", "Contraste verificado", "Entrega publicada"], 3) },
  { slug: "javascript", curso: "JavaScript", tipo: "Projeto final", titulo: "Aplicação interativa de tarefas e leitura de API",
    entregue: false, objetivo: "Construir uma aplicação web em JavaScript puro que valide um formulário, atualize a interface a partir de um estado e consuma uma API pública com tratamento de erros.",
    checklist: lista(["Estado da aplicação em um objeto", "Adicionar e remover tarefas", "Validação do formulário", "Persistência local", "Consumo de uma API pública", "Tratamento de erros de rede", "Acessibilidade dos controles", "Entrega publicada"], 1) },
  { slug: "frontend", curso: "Formação Front-End — Fundamentos", tipo: "Projeto integrador", titulo: "Projeto integrador: site responsivo e interativo",
    entregue: false, objetivo: "Integrar HTML, CSS e JavaScript em um único site: estrutura semântica, layout responsivo e interações com dados, sem bibliotecas externas.",
    checklist: lista(["Estrutura semântica", "Layout responsivo", "Interações em JavaScript", "Dados carregados de uma API", "Acessibilidade revisada", "Publicação"], 0) }
];

/* ---------- simulados e notas ---------- */
export const simuladosIniciais: Simulado[] = [
  { id: "s1", curso: "html", titulo: "Simulado · módulo 1", data: "2026-09-04", acertos: 4, total: 5 },
  { id: "s2", curso: "html", titulo: "Simulado · módulo 2", data: "2026-09-28", acertos: 5, total: 6 },
  { id: "s3", curso: "css", titulo: "Simulado · módulo 1", data: "2026-10-22", acertos: 5, total: 7 }
];
export type NotaAtiv = { curso: string; avaliacao: string; tipo: string; acertos: number; total: number; data: string };
export const notasAtividades: NotaAtiv[] = [
  { curso: "html", avaliacao: "Atividades · módulo 1 · Introdução ao HTML", tipo: "Atividade objetiva", acertos: 4, total: 4, data: "2026-08-20" },
  { curso: "html", avaliacao: "Atividades · módulo 2 · Estrutura e semântica", tipo: "Atividade objetiva", acertos: 3, total: 4, data: "2026-09-14" },
  { curso: "html", avaliacao: "Atividades · módulo 3 · Formulários", tipo: "Atividade objetiva", acertos: 1, total: 4, data: "2026-11-10" },
  { curso: "css", avaliacao: "Atividades · módulo 1 · Fundamentos", tipo: "Atividade objetiva", acertos: 3, total: 4, data: "2026-10-12" },
  { curso: "javascript", avaliacao: "Atividades · módulo 1 · Fundamentos", tipo: "Atividade objetiva", acertos: 2, total: 4, data: "2026-11-08" }
];
export const NOTA_MINIMA = 70;

/* ---------- certificados (requisitos fictícios) ---------- */
export type Requisito = { rotulo: string; ok: boolean };
export function requisitos(slug: string, concluidas: string[]): Requisito[] {
  const l = slug === "html" ? pct(concluidas.length, totalAulasHtml) : matriculas[slug]?.progressoFixo ?? 0;
  const base = matriculas[slug] ? [{ rotulo: "Todas as aulas concluídas", ok: l === 100 }, { rotulo: "Todas as questões respondidas", ok: false }, { rotulo: `Acerto mínimo de ${NOTA_MINIMA}%`, ok: slug === "html" }, { rotulo: "Projeto final entregue", ok: false }] : [];
  return base;
}
