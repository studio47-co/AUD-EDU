import { useState } from "react";
import { ROTULOS, type Questao } from "../data/questoes";
import { CodeBlock } from "./Code";

const LETRAS = ["A", "B", "C", "D"];

/** Questão interativa local: seleciona, responde, recebe feedback demonstrativo e pode tentar de novo. */
export function QuestaoCard({ q, n, onResponder }: { q: Questao; n: number; onResponder?: (certa: boolean) => void }) {
  const [sel, setSel] = useState<number | null>(null);
  const [resp, setResp] = useState(false);
  const responder = () => { if (sel === null) return; setResp(true); onResponder?.(sel === q.certa); };
  return (
    <article className="card q">
      <div className="q-head"><span className="pill">{ROTULOS[q.tipo]}</span><span className="q-meta">Questão {n}</span></div>
      <div className="q-enun"><p>{q.enunciado}</p></div>
      {q.codigo && <CodeBlock lang="html" x={q.codigo} />}
      <div className="opts" role="radiogroup" aria-label="Alternativas">
        {q.alts.map((alt, i) => {
          const cls = ["check", "opt", sel === i && !resp ? "sel" : "", resp && i === q.certa ? "certa" : "", resp && sel === i && i !== q.certa ? "errada" : ""].filter(Boolean).join(" ");
          const simbolo = resp && i === q.certa ? "✓" : resp && sel === i ? "✕" : LETRAS[i];
          return (
            <button key={i} className={cls} role="radio" aria-checked={sel === i} disabled={resp} type="button" onClick={() => setSel(i)}>
              <span className="box" aria-hidden="true">{simbolo}</span><div><strong>{alt}</strong></div>
            </button>
          );
        })}
      </div>
      {resp ? (
        <>
          <div className="feedback" role="status"><b>{sel === q.certa ? "Correto" : `Incorreto · resposta certa: ${LETRAS[q.certa]}`}</b><div>{q.explicacao}</div></div>
          <div className="row"><button className="btn btn-soft" type="button" onClick={() => { setResp(false); setSel(null); }}>Tentar novamente</button><span className="muted">Feedback demonstrativo: nada é salvo em servidor.</span></div>
        </>
      ) : (
        <div className="row"><button className="btn btn-solid" type="button" disabled={sel === null} onClick={responder}>Responder</button></div>
      )}
    </article>
  );
}
