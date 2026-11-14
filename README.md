# AUDMANI Education — primeira versão (demonstrativa)

Projeto independente (HTML + CSS + JavaScript puros, sem dependências, sem build). Identidade visual copiada do AVA; o AVA original não foi alterado.

## Como abrir
- Abra `index.html` no navegador (funciona por `file://`) ou sirva a pasta por HTTP: `python3 -m http.server 8000`.
- Rotas por hash: `#/inicio #/catalogo #/curso/<slug> #/formacao/frontend #/biblioteca #/painel #/aprender/<curso>[/<aula>] #/atividades #/simulados #/projetos #/certificados #/metodologia #/conta`.

## Estrutura
- `css/` tokens do AVA (`ava-core.css`, cópia literal), fontes e estilos do Education.
- `js/core/` util, store (localStorage, chave `audmani-education-v1`), router.
- `js/data/` catálogo de cursos e preços (demonstrativo).
- `js/components/` código, UI, leitor de aula, questões.
- `js/pages/` páginas públicas, área do aluno, leitor, avaliações, projetos/certificados, conta/checkout.
- `js/content/<curso>/modulo-N.js` aulas; `js/activities/<curso>.js` questões; `js/projects/projetos.js` projetos.

## PWA (instalável e offline)
- Arquivos: `manifest.webmanifest`, `sw.js`, `offline.html`, `icons/` (192, 512, maskable, Apple Touch, favicon), `js/pwa/pwa.js`.
- **Depois de qualquer alteração nos arquivos do app, rode `node tools/gerar-sw.js`** (gera a versão por hash e a lista de pré-cache; `--check` confere). Sem isso, os alunos continuam com a versão antiga em cache.
- Ícones: `python3 tools/gerar-icones.py` (ferramenta de desenvolvimento; precisa de pillow, fonttools e brotli).
- Exige HTTPS ou `localhost` (ex.: `python3 -m http.server 8000`). Em `file://` o app funciona como site, mas sem Service Worker nem instalação.
- Hospedagem: sirva `sw.js` sem cache longo de HTTP (ou com revalidação) para que as atualizações sejam detectadas rápido.
- Offline: todo o app (HTML, CSS, JS, fontes, ícones **e o conteúdo dos cursos, que é código estático público do próprio app**) é pré-armazenado. Respostas, progresso e tema ficam no `localStorage`, nunca no cache do Service Worker. Quando houver conteúdo privado ou pago, o cache dele deve ser uma etapa própria, com autorização e controle de armazenamento.
- Sem notificações push.

## Limites conhecidos (leia antes de usar)
- **Tudo é demonstrativo e local.** Matrícula, cupom, compra, parceria escolar e progresso ficam no `localStorage` e podem ser editados pelo usuário. Não há pagamento real, nem dados de cartão, nem verificação de matrícula escolar.
- **Nenhum certificado é emitido.** A área só mostra elegibilidade; certificado verificável exige servidor.
- Os links de referências (MDN, W3C, WCAG etc.) não foram verificados automaticamente (o ambiente de desenvolvimento não acessa sites externos). Confira antes de publicar.
- As cargas horárias (30 h/40 h/60 h) são **propostas** de carga total (leitura + exercícios + atividades + projeto). O tempo de leitura das aulas produzidas é menor (ver relatório).
- Exemplos de rede (`fetch`) usam a API pública JSONPlaceholder e não foram executados contra a rede real.
