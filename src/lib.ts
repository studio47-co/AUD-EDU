import { useEffect, useState, useSyncExternalStore } from "react";

/* ---------- utilidades ---------- */
export const moeda = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const pct = (a: number, t: number) => (t ? Math.round((a / t) * 100) : 0);
export const plural = (n: number, s: string, p: string) => `${n} ${n === 1 ? s : p}`;
export const dataBR = (iso: string) => { const [a, m, d] = iso.slice(0, 10).split("-"); return `${d}/${m}/${a}`; };
export const iniciais = (nome: string) => nome.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

/* ---------- roteamento por hash (#/rota/param/param) ---------- */
export const href = (...partes: (string | number)[]) => "#/" + partes.join("/");
export function useRota(): string[] {
  const ler = () => (location.hash.replace(/^#\/?/, "") || "inicio").split("/").map(decodeURIComponent);
  const [rota, setRota] = useState<string[]>(ler);
  useEffect(() => {
    const f = () => { setRota(ler()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  return rota;
}

/* ---------- estado local da demonstração (nada sai do navegador) ---------- */
export type Simulado = { id: string; curso: string; titulo: string; data: string; acertos: number; total: number; itens?: { enunciado: string; certa: boolean; correta: string; explicacao: string }[] };
type Estado = {
  tema: "light" | "dark";
  concluidas: string[];                       // ids de aulas do HTML5 já concluídas
  simulados: Simulado[];
  checklist: Record<string, Record<number, boolean>>;
  entregas: Record<string, boolean>;
  toast: string | null;
};

const CONCLUIDAS_INICIAIS = Array.from({ length: 15 }, (_, i) => `a${i + 1}`);   // 15 de 23 aulas = 65%
let estado: Estado = {
  tema: (localStorage.getItem("audmani-demo-tema") as "light" | "dark") || "light",
  concluidas: CONCLUIDAS_INICIAIS,
  simulados: [],
  checklist: {},
  entregas: {},
  toast: null
};
const ouvintes = new Set<() => void>();
export const getEstado = () => estado;
export function setEstado(parcial: Partial<Estado> | ((e: Estado) => Partial<Estado>)) {
  estado = { ...estado, ...(typeof parcial === "function" ? parcial(estado) : parcial) };
  ouvintes.forEach((f) => f());
}
export const useEstado = () => useSyncExternalStore((f) => { ouvintes.add(f); return () => ouvintes.delete(f); }, getEstado);

let relogio: number | undefined;
export function avisar(msg: string) {
  setEstado({ toast: msg });
  window.clearTimeout(relogio);
  relogio = window.setTimeout(() => setEstado({ toast: null }), 3400);
}
export const demo = (acao = "Esta ação") => avisar(`${acao} é uma simulação: a demonstração não usa servidor.`);

export function alternarTema() {
  const tema = estado.tema === "light" ? "dark" : "light";
  localStorage.setItem("audmani-demo-tema", tema);
  setEstado({ tema });
}
export function useTema() {
  const { tema } = useEstado();
  useEffect(() => { document.documentElement.setAttribute("data-theme", tema); }, [tema]);
}
