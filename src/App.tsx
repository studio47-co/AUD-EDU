import type { ReactNode } from "react";
import { BotaoTema, Icone, Marca } from "./components/ui";
import { href, iniciais, useEstado, useRota, useTema, avisar } from "./lib";
import { ALUNO } from "./data/demo";
import { CursoPagina, Catalogo, ComoFunciona, Formacao, Inicio, Metodologia, NaoEncontrada } from "./pages/Publicas";
import { Biblioteca, Painel } from "./pages/Painel";
import { Aprender } from "./pages/Aprender";
import { Atividades, Simulados } from "./pages/Avaliacoes";
import { Certificados, Notas, Projetos, Verificar } from "./pages/ProjCert";
import { Configuracoes, Conta } from "./pages/Conta";
import { ControlApp } from "./control/ControlApp";

const MENU_PUBLICO = [["inicio", "Início"], ["catalogo", "Catálogo"], ["metodologia", "Metodologia"], ["como-funciona", "Como funciona"]];
const MENU_ALUNO: [string, string, string][] = [
  ["painel", "Painel", "Painel"], ["biblioteca", "Biblioteca", "Biblio."], ["atividades", "Atividades", "Ativ."], ["simulados", "Simulados", "Simul."],
  ["projetos", "Projetos", "Proj."], ["certificados", "Certificados", "Certif."], ["notas", "Minhas notas", "Notas"], ["conta", "Conta", "Conta"], ["configuracoes", "Configurações", "Config."]
];
const AREA_ALUNO = new Set(["painel", "biblioteca", "aprender", "atividades", "simulados", "projetos", "certificados", "notas", "conta", "configuracoes"]);
const TITULOS: Record<string, [string, string]> = {
  painel: ["Olá, Alex 👋", "Você está matriculado em 3 cursos. Dados de demonstração."],
  biblioteca: ["Biblioteca", "Seus cursos matriculados."],
  aprender: ["Ambiente de aprendizagem", "Aulas, exemplos e exercícios."],
  atividades: ["Atividades", "Pratique por módulo com feedback imediato."],
  simulados: ["Simulados", "Treine com questões de todo o curso."],
  projetos: ["Projetos", "Um projeto final por curso e um integrador na formação."],
  certificados: ["Certificados", "Requisitos, emissão e verificação."],
  notas: ["Minhas notas", "Resultados de simulados, atividades e projetos, por curso."],
  conta: ["Minha conta", "Perfil e matrículas."],
  configuracoes: ["Configurações", "Preferências da demonstração."]
};

function Publica({ rota, children }: { rota: string; children: ReactNode }) {
  return (
    <div className="pub">
      <header className="card pub-head">
        <Marca />
        <nav className="pub-nav" aria-label="Navegação pública">{MENU_PUBLICO.map(([r, t]) => <a key={r} href={href(r)} aria-current={rota === r ? "page" : undefined}>{t}</a>)}</nav>
        <div className="actions"><span className="pill">Demonstração</span><BotaoTema /><a className="btn btn-solid" href={href("painel")}>Minha área</a></div>
      </header>
      <main className="view">{children}</main>
      <footer className="pub-foot">
        <p><b>AUDMANI Education</b> · versão estática de apresentação. Todos os dados são fictícios; não há servidor, login nem pagamentos.</p>
        <p><a href={href("metodologia")}>Sobre a metodologia</a> · <a href={href("control")}>Ver demonstração do AUDMANI Control</a></p>
      </footer>
    </div>
  );
}

function Aluno({ rota, children }: { rota: string; children: ReactNode }) {
  const [t, s] = TITULOS[rota];
  return (
    <div className="app">
      <aside className="sidebar">
        <Marca />
        <nav className="nav" aria-label="Navegação principal">
          {MENU_ALUNO.map(([r, rot, curto]) => (
            <button key={r} type="button" aria-current={rota === r || (rota === "aprender" && r === "biblioteca") ? "page" : undefined} onClick={() => { location.hash = href(r); }}>
              <Icone nome={r} /><span className="nav-long">{rot}</span><span className="nav-short">{curto}</span></button>
          ))}
          <a className="btn-nav-control" href={href("control")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 14, textDecoration: "none", color: "inherit" }}>
            <Icone nome="auditoria" /><span className="nav-long">AUDMANI Control</span><span className="nav-short">Control</span></a>
        </nav>
        <div className="side-foot"><a className="btn btn-soft" href={href("catalogo")}>Explorar catálogo</a></div>
      </aside>
      <main className="main">
        <header className="topbar">
          <div><h1>{t}</h1><p>{s}</p></div>
          <div className="actions">
            <span className="pill">Demonstração</span>
            <a className="icon-btn" href={href("catalogo")} aria-label="Explorar catálogo" title="Catálogo" style={{ textDecoration: "none" }}><Icone nome="biblioteca" /></a>
            <BotaoTema />
            <a className="avatar" href={href("conta")} aria-label={`Minha conta — ${ALUNO.nome}`} style={{ textDecoration: "none" }}>{iniciais(ALUNO.nome)}</a>
          </div>
        </header>
        <div className="view">{children}</div>
      </main>
    </div>
  );
}

export default function App() {
  useTema();
  const rota = useRota();
  const { toast } = useEstado();
  const [r, a, b] = rota;
  let pagina: ReactNode;
  if (r === "control") pagina = <ControlApp secao={a} />;
  else if (AREA_ALUNO.has(r)) {
    const corpo =
      r === "painel" ? <Painel /> : r === "biblioteca" ? <Biblioteca /> : r === "aprender" ? <Aprender slug={a || "html"} aulaId={b} />
      : r === "atividades" ? <Atividades slug={a} modulo={b} /> : r === "simulados" ? <Simulados partes={rota.slice(1)} />
      : r === "projetos" ? <Projetos slug={a} /> : r === "certificados" ? <Certificados /> : r === "notas" ? <Notas />
      : r === "conta" ? <Conta /> : <Configuracoes />;
    pagina = <Aluno rota={r}>{corpo}</Aluno>;
  } else {
    const corpo =
      r === "inicio" ? <Inicio /> : r === "catalogo" ? <Catalogo /> : r === "curso" ? <CursoPagina slug={a} /> : r === "formacao" ? <Formacao slug={a} />
      : r === "metodologia" ? <Metodologia /> : r === "como-funciona" ? <ComoFunciona /> : r === "verificar" ? <Verificar /> : <NaoEncontrada />;
    pagina = <Publica rota={r}>{corpo}</Publica>;
  }
  return <>{pagina}{toast && <div id="toast" role="status" className="on">{toast}</div>}</>;
}
export { avisar };
