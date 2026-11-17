import dados from "./catalogo.json";

export type Modulo = { n: number; titulo: string; topicos: string[] };
export type Curso = { slug: string; nome: string; categoria: string; nivel: string; horas: number; preco: number; resumo: string; descricao: string; aprendera: string[]; modulos: Modulo[] };
export type Pacote = { slug: string; nome: string; nivel: string; categoria: string; resumo: string; descricao: string; cursos: string[]; preco: number };

/** Catálogo público (textos e valores de referência já exibidos na plataforma; nada privado). */
export const cursos = dados.cursos as Curso[];
export const pacotes = dados.pacotes as Pacote[];
export const curso = (slug: string) => cursos.find((c) => c.slug === slug);
export const categorias = ["Todos", ...Array.from(new Set(cursos.map((c) => c.categoria))), "Formações"];
export const niveis = ["Todos", ...Array.from(new Set(cursos.map((c) => c.nivel)))];
