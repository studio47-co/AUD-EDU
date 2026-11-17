import { useEffect, useRef, type ReactNode } from "react";

/** Diálogo nativo <dialog>: foco preso, Esc fecha, estilo herdado do sistema visual. */
export function Modal({ aberto, onFechar, children }: { aberto: boolean; onFechar: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (aberto && !d.open) d.showModal();
    if (!aberto && d.open) d.close();
  }, [aberto]);
  return <dialog ref={ref} onClose={onFechar} onClick={(e) => { if (e.target === ref.current) onFechar(); }}>{children}</dialog>;
}
