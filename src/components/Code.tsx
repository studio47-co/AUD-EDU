import type { ReactNode } from "react";
import { avisar } from "../lib";

/* Realce monocromático (peso/estilo, sem cores fora da paleta) — mesmo critério da plataforma. */
const GRAM: Record<string, RegExp> = {
  js: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`)|\b(const|let|var|function|return|if|else|for|while|of|in|new|class|import|export|from|async|await|null|undefined|true|false)\b/g,
  css: /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[a-zA-Z-]+|!important|:root)/g,
  html: /(<!--[\s\S]*?-->)|("[^"\n]*"|'[^'\n]*')|(<\/?[a-zA-Z][\w-]*|<!DOCTYPE|\/?>)/gi
};

function realcar(codigo: string, lang: string): ReactNode[] {
  const re = GRAM[lang];
  if (!re) return [codigo];
  re.lastIndex = 0;
  const saida: ReactNode[] = [];
  let pos = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(codigo))) {
    if (m.index > pos) saida.push(codigo.slice(pos, m.index));
    saida.push(<span key={k++} className={m[1] ? "tk-c" : m[2] ? "tk-s" : "tk-k"}>{m[0]}</span>);
    pos = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  saida.push(codigo.slice(pos));
  return saida;
}
const ROTULO: Record<string, string> = { html: "HTML", css: "CSS", js: "JavaScript", txt: "Texto" };

export function CodeBlock({ lang = "html", arquivo, x }: { lang?: "html" | "css" | "js" | "txt"; arquivo?: string; x: string }) {
  const copiar = () => { navigator.clipboard?.writeText(x).then(() => avisar("Código copiado."), () => avisar("Não foi possível copiar neste navegador.")); };
  return (
    <figure className="code" style={{ margin: 0 }}>
      <div className="code-bar"><span>{arquivo || ROTULO[lang]}</span><button className="pill" type="button" onClick={copiar} aria-label="Copiar código">Copiar</button></div>
      <pre tabIndex={0}><code>{realcar(x, lang)}</code></pre>
    </figure>
  );
}
