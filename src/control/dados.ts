/** Dados FICTÍCIOS do AUDMANI Control (nenhum dado real). */
export type Usuario = { id: string; nome: string; email: string; papel: string; status: string; ultimo: string };
export const usuarios: Usuario[] = [
  { id: "u1", nome: "Alex Martins", email: "alex.martins@exemplo.demo", papel: "Aluno", status: "Ativo", ultimo: "2026-11-16" },
  { id: "u2", nome: "Bruna Costa", email: "bruna.costa@exemplo.demo", papel: "Aluno", status: "Ativo", ultimo: "2026-11-15" },
  { id: "u3", nome: "Carlos Nogueira", email: "carlos.nogueira@exemplo.demo", papel: "Aluno", status: "Suspenso", ultimo: "2026-10-02" },
  { id: "u4", nome: "Daniela Rocha", email: "daniela.rocha@exemplo.demo", papel: "Professor", status: "Ativo", ultimo: "2026-11-16" },
  { id: "u5", nome: "Eduardo Lima", email: "eduardo.lima@exemplo.demo", papel: "Aluno", status: "Pendente", ultimo: "—" },
  { id: "u6", nome: "Fernanda Alves", email: "fernanda.alves@exemplo.demo", papel: "Administrador", status: "Ativo", ultimo: "2026-11-14" },
  { id: "u7", nome: "Gustavo Pires", email: "gustavo.pires@exemplo.demo", papel: "Aluno", status: "Ativo", ultimo: "2026-11-11" },
  { id: "u8", nome: "Helena Duarte", email: "helena.duarte@exemplo.demo", papel: "OWNER", status: "Ativo", ultimo: "2026-11-17" }
];
export const matriculasIni = [
  { id: "m1", email: "alex.martins@exemplo.demo", curso: "HTML5", status: "Ativa", termina: "2027-08-12" },
  { id: "m2", email: "alex.martins@exemplo.demo", curso: "CSS3", status: "Ativa", termina: "2027-09-30" },
  { id: "m3", email: "alex.martins@exemplo.demo", curso: "JavaScript", status: "Ativa", termina: "2027-11-05" },
  { id: "m4", email: "bruna.costa@exemplo.demo", curso: "Python", status: "Ativa", termina: "2027-03-10" },
  { id: "m5", email: "carlos.nogueira@exemplo.demo", curso: "Java", status: "Suspensa", termina: "2026-12-01" },
  { id: "m6", email: "gustavo.pires@exemplo.demo", curso: "Node.js", status: "Expirada", termina: "2026-10-31" }
];
export const avaliacoes = [
  { id: "h1a", curso: "HTML5", modulo: 1, tipo: "Múltipla escolha", enunciado: "Qual elemento marca o título principal de uma página?" },
  { id: "h3c", curso: "HTML5", modulo: 3, tipo: "Identificação de erros", enunciado: "Por que este campo de formulário, que tem type e id definidos mas nenhum atributo name, não envia o valor digitado pelo usuário quando o formulário é submetido ao servidor?" },
  { id: "c4", curso: "CSS3", modulo: 1, tipo: "Interpretação de código", enunciado: "Quantas colunas cria a declaração grid-template-columns: repeat(3, 1fr) aplicada a um contêiner com display grid e quais são as larguras relativas entre elas quando o contêiner tem 900 px?" },
  { id: "j3", curso: "JavaScript", modulo: 1, tipo: "Identificação de erros", enunciado: "O que há de errado neste código que reatribui uma constante declarada com const?" },
  { id: "j2", curso: "JavaScript", modulo: 1, tipo: "Verdadeiro ou falso", enunciado: "O operador === compara valor e tipo." }
];
export const projetosEnvios = [
  { id: "p1", aluno: "Alex Martins", curso: "HTML5", titulo: "Página institucional", enviado: "2026-11-12", status: "Em revisão" },
  { id: "p2", aluno: "Bruna Costa", curso: "Python", titulo: "Aplicação Python que resolve um problema real", enviado: "2026-11-08", status: "Aprovado" },
  { id: "p3", aluno: "Gustavo Pires", curso: "Node.js", titulo: "API REST com autenticação, banco e testes", enviado: "2026-11-05", status: "Ajustes solicitados" },
  { id: "p4", aluno: "Eduardo Lima", curso: "CSS3", titulo: "Site responsivo", enviado: "2026-11-02", status: "Em revisão" }
];
export const certificadosIni = [
  { id: "DEMO-0001", email: "bruna.costa@exemplo.demo", curso: "Python", status: "Válido", emitido: "2026-11-09" },
  { id: "DEMO-0002", email: "gustavo.pires@exemplo.demo", curso: "Node.js", status: "Válido", emitido: "2026-10-21" },
  { id: "DEMO-0003", email: "carlos.nogueira@exemplo.demo", curso: "Java", status: "Revogado", emitido: "2026-09-18" }
];
export const auditoria = [
  { id: 1, data: "2026-11-17 08:41", ator: "helena.duarte", acao: "course.status.update", resultado: "Sucesso", alvo: "curso:kotlin" },
  { id: 2, data: "2026-11-17 08:12", ator: "fernanda.alves", acao: "enrollment.grant", resultado: "Sucesso", alvo: "user:bruna.costa" },
  { id: 3, data: "2026-11-16 22:03", ator: "alex.martins", acao: "auth.login", resultado: "Sucesso", alvo: "sessão" },
  { id: 4, data: "2026-11-16 21:57", ator: "desconhecido", acao: "auth.login", resultado: "Falha", alvo: "sessão" },
  { id: 5, data: "2026-11-16 18:20", ator: "daniela.rocha", acao: "project.review", resultado: "Sucesso", alvo: "projeto:p2" },
  { id: 6, data: "2026-11-15 10:44", ator: "fernanda.alves", acao: "certificate.revoke", resultado: "Sucesso", alvo: "cert:DEMO-0003" },
  { id: 7, data: "2026-11-14 09:31", ator: "helena.duarte", acao: "user.suspend", resultado: "Negado", alvo: "user:helena.duarte" }
];
export const cursosControl = [
  { slug: "html", nome: "HTML5", status: "Publicado", mod: 4 }, { slug: "css", nome: "CSS3", status: "Publicado", mod: 4 },
  { slug: "javascript", nome: "JavaScript", status: "Publicado", mod: 4 }, { slug: "java", nome: "Java", status: "Rascunho", mod: 12 },
  { slug: "kotlin", nome: "Kotlin", status: "Rascunho", mod: 12 }, { slug: "julia", nome: "Julia", status: "Arquivado", mod: 12 },
  { slug: "python", nome: "Python", status: "Publicado", mod: 12 }, { slug: "nodejs", nome: "Node.js", status: "Publicado", mod: 12 }
];
