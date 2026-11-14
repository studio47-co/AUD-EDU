/* Atividades do curso HTML5 — 4 módulos × 6 questões (24).
   Tipos: multipla · vf (0=Verdadeiro, 1=Falso) · codigo · erro · pratico */
AE.Atividades.registrar("html", [

/* ===================== MÓDULO 1 — Introdução ===================== */
{ id: "html-1-01", modulo: 1, tipo: "multipla", competencia: "Compreender o papel do HTML na web",
  enunciado: "Qual é a função principal do HTML em uma página web?",
  alternativas: ["Definir a estrutura e o significado do conteúdo", "Definir cores, fontes e espaçamentos", "Executar lógica e cálculos no navegador", "Armazenar dados no servidor"],
  correta: 0,
  explicacao: "HTML descreve a **estrutura e o significado** do conteúdo. A aparência é papel do CSS e o comportamento é papel do JavaScript." },
{ id: "html-1-02", modulo: 1, tipo: "vf", competencia: "Distinguir HTML de linguagem de programação",
  enunciado: "HTML é uma linguagem de marcação, não uma linguagem de programação: ela descreve conteúdo, mas não possui lógica como condições e laços.",
  correta: 0,
  explicacao: "Verdadeiro. HTML marca o conteúdo com elementos. Condições e laços são recursos de linguagens como o JavaScript." },
{ id: "html-1-03", modulo: 1, tipo: "codigo", competencia: "Ler a estrutura de um documento HTML",
  enunciado: "Observe o documento e responda: qual texto aparece na **aba** do navegador?",
  codigo: { lang: "html", x: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Receitas da Vó</title>
</head>
<body>
  <h1>Bolo de fubá</h1>
</body>
</html>` },
  alternativas: ["Receitas da Vó", "Bolo de fubá", "pt-BR", "utf-8"],
  correta: 0,
  explicacao: "O conteúdo de `<title>` aparece na aba. O `<h1>` é o título visível dentro da página." },
{ id: "html-1-04", modulo: 1, tipo: "erro", competencia: "Identificar erros de sintaxe e estrutura",
  enunciado: "O trecho abaixo tem um problema de estrutura. Qual é?",
  codigo: { lang: "html", x: `<p>Leia o <strong>aviso importante</p></strong>` },
  alternativas: ["As tags estão mal aninhadas: `</strong>` deve fechar antes de `</p>`", "`<strong>` não pode ser usado dentro de `<p>`", "Falta o atributo `lang`", "`<p>` não deve ser fechado"],
  correta: 0,
  explicacao: "Elementos precisam ser aninhados corretamente: o último a abrir é o primeiro a fechar. O correto é `<p>Leia o <strong>aviso importante</strong></p>`." },
{ id: "html-1-05", modulo: 1, tipo: "multipla", competencia: "Usar as ferramentas de desenvolvimento",
  enunciado: "Qual ferramenta do navegador permite ver o HTML **como o navegador o interpretou** e testar mudanças ao vivo?",
  alternativas: ["O painel Elementos das ferramentas de desenvolvimento", "O gerenciador de downloads", "O histórico de navegação", "O gerenciador de senhas"],
  correta: 0,
  explicacao: "O painel **Elementos** (aberto com F12 ou clique direito → Inspecionar) mostra a árvore DOM atual e permite editar para testar. As alterações não são salvas no arquivo." },
{ id: "html-1-06", modulo: 1, tipo: "pratico", competencia: "Criar um documento HTML válido",
  enunciado: "Crie um arquivo `index.html` com a estrutura mínima de um documento HTML5 em português do Brasil, com título de aba \"Minha primeira página\" e um `<h1>` com o seu nome. Abra o arquivo no navegador.",
  criterios: ["Começa com `<!DOCTYPE html>`", "`<html>` com `lang=\"pt-BR\"`", "`<head>` com `meta charset` e `<title>`", "`<body>` com um `<h1>`", "O arquivo abre no navegador e os acentos aparecem corretamente"],
  resolucao: { lang: "html", codigo: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Minha primeira página</title>
</head>
<body>
  <h1>Ana Souza</h1>
</body>
</html>`,
    comentario: "O `doctype` ativa o modo padrão; `lang` informa o idioma; `charset` garante os acentos; `title` aparece na aba; o `h1` é o título visível. Salve o arquivo em UTF-8." } },

/* ============ MÓDULO 2 — Estrutura e semântica ============ */
{ id: "html-2-01", modulo: 2, tipo: "multipla", competencia: "Estruturar texto com títulos e parágrafos",
  enunciado: "Qual é a melhor prática para o uso dos títulos `h1` a `h6`?",
  alternativas: ["Seguir a hierarquia lógica, sem pular níveis, e ajustar o tamanho visual com CSS", "Escolher o nível pelo tamanho de fonte desejado", "Usar vários `h1` para destacar frases", "Usar `h6` para todo texto pequeno"],
  correta: 0,
  explicacao: "Os títulos formam o sumário da página. O nível expressa a **hierarquia**; o tamanho é decidido pelo CSS." },
{ id: "html-2-02", modulo: 2, tipo: "vf", competencia: "Escolher listas adequadas",
  enunciado: "Para uma receita cujos passos devem ser seguidos em ordem, a lista adequada é `<ol>` (lista ordenada).",
  correta: 0,
  explicacao: "Verdadeiro. `<ol>` comunica que a ordem importa. Para itens sem ordem, use `<ul>`." },
{ id: "html-2-03", modulo: 2, tipo: "codigo", competencia: "Ler links e atributos",
  enunciado: "Observe o código. O que acontece ao clicar no link?",
  codigo: { lang: "html", x: `<a href="https://exemplo.com" target="_blank" rel="noopener">Ver site</a>` },
  alternativas: ["Abre exemplo.com em uma nova aba", "Abre exemplo.com na mesma aba", "Baixa o arquivo exemplo.com", "Nada acontece"],
  correta: 0,
  explicacao: "`target=\"_blank\"` abre em nova aba. O `rel=\"noopener\"` evita que a nova página tenha acesso à janela de origem. O texto \"Ver site\" é o conteúdo clicável." },
{ id: "html-2-04", modulo: 2, tipo: "erro", competencia: "Aplicar texto alternativo em imagens",
  enunciado: "Qual o principal problema do código abaixo, considerando acessibilidade?",
  codigo: { lang: "html", x: `<img src="grafico-vendas.png">` },
  alternativas: ["Falta o atributo `alt`", "Falta a tag de fechamento `</img>`", "Imagens PNG não são permitidas", "O nome do arquivo tem hífen"],
  correta: 0,
  explicacao: "Sem `alt`, quem usa leitor de tela não sabe o que a imagem mostra. `<img>` é um elemento vazio e **não** leva tag de fechamento. Ex.: `alt=\"Vendas cresceram 20% em 2025\"`." },
{ id: "html-2-05", modulo: 2, tipo: "multipla", competencia: "Usar elementos semânticos",
  enunciado: "Qual elemento semântico deve conter o conteúdo principal e único de cada página?",
  alternativas: ["`<main>`", "`<header>`", "`<aside>`", "`<div>`"],
  correta: 0,
  explicacao: "`<main>` marca o conteúdo principal e deve aparecer **uma vez** por página. `<header>`, `<aside>` e `<div>` têm outros papéis." },
{ id: "html-2-06", modulo: 2, tipo: "pratico", competencia: "Estruturar uma página com semântica",
  enunciado: "Monte a estrutura semântica de uma página de blog com cabeçalho, menu de navegação com 3 links, um artigo com título e dois parágrafos, uma barra lateral com links relacionados e um rodapé. Não use `div`.",
  criterios: ["Usa `header`, `nav`, `main`, `article`, `aside` e `footer`", "Apenas um `h1`; títulos em ordem", "Os links do menu estão dentro de uma lista", "Nenhuma `div` utilizada", "Imagens (se houver) têm `alt`"],
  resolucao: { lang: "html", codigo: `<body>
  <header>
    <h1>Blog da Ana</h1>
    <nav aria-label="Principal">
      <ul>
        <li><a href="/">Início</a></li>
        <li><a href="/artigos">Artigos</a></li>
        <li><a href="/sobre">Sobre</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h2>Como começar com HTML</h2>
      <p>Primeiro parágrafo do artigo.</p>
      <p>Segundo parágrafo do artigo.</p>
    </article>
    <aside>
      <h2>Leia também</h2>
      <ul>
        <li><a href="/css">Primeiros passos com CSS</a></li>
        <li><a href="/js">O que é JavaScript</a></li>
      </ul>
    </aside>
  </main>
  <footer><p>&copy; 2026 Blog da Ana</p></footer>
</body>`,
    comentario: "Cada região usa o elemento semântico correspondente. O `h1` identifica o site e o `h2` o artigo e a barra lateral (uma alternativa válida é colocar o título do artigo como `h1`). Não há `div`: os elementos semânticos já descrevem a função de cada bloco." } },

/* ============ MÓDULO 3 — Formulários ============ */
{ id: "html-3-01", modulo: 3, tipo: "multipla", competencia: "Associar labels a campos",
  enunciado: "Como associar corretamente um `<label>` a um campo de formulário?",
  alternativas: ["Usar `for` no label com o mesmo valor do `id` do campo (ou envolver o campo com o label)", "Usar o mesmo `name` no label e no campo", "Colocar o label logo acima, sem atributos", "Usar `placeholder` com o texto do label"],
  correta: 0,
  explicacao: "A associação é feita por `for`/`id` ou por envolvimento. Ela dá nome ao campo para leitores de tela e aumenta a área de clique." },
{ id: "html-3-02", modulo: 3, tipo: "vf", competencia: "Entender o envio de dados",
  enunciado: "Um campo de formulário sem o atributo `name` é enviado normalmente com o formulário.",
  correta: 1,
  explicacao: "Falso. Sem `name`, o campo não participa do envio. O `name` é o nome do par `name=value` recebido pelo servidor." },
{ id: "html-3-03", modulo: 3, tipo: "codigo", competencia: "Ler atributos de validação",
  enunciado: "O que acontece se o usuário clicar em \"Enviar\" com o campo vazio?",
  codigo: { lang: "html", x: `<form action="/cadastro" method="post">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Enviar</button>
</form>` },
  alternativas: ["O navegador bloqueia o envio e mostra uma mensagem de campo obrigatório", "O formulário é enviado com e-mail vazio", "A página recarrega sem avisar", "Ocorre um erro de JavaScript"],
  correta: 0,
  explicacao: "`required` ativa a validação nativa: o envio é bloqueado e o navegador mostra o aviso, sem JavaScript." },
{ id: "html-3-04", modulo: 3, tipo: "erro", competencia: "Identificar problemas de acessibilidade em formulários",
  enunciado: "Qual é o principal problema de acessibilidade deste campo?",
  codigo: { lang: "html", x: `<input type="text" name="nome" placeholder="Nome completo">` },
  alternativas: ["Não há `label`: o placeholder não substitui o nome do campo", "O tipo `text` não é permitido", "Falta o atributo `value`", "O `name` deveria ser maiúsculo"],
  correta: 0,
  explicacao: "O `placeholder` some ao digitar e não é um nome confiável. Todo campo precisa de um `label` visível e associado." },
{ id: "html-3-05", modulo: 3, tipo: "multipla", competencia: "Escolher o tipo de campo adequado",
  enunciado: "Qual `type` é o mais adequado para um CEP (como 01310-100)?",
  alternativas: ["`text` com `inputmode=\"numeric\"` e `pattern`", "`number`", "`range`", "`date`"],
  correta: 0,
  explicacao: "CEP não é uma quantidade: `type=\"number\"` remove zeros à esquerda e mostra setas de incremento. Use `text` com `inputmode` e `pattern`." },
{ id: "html-3-06", modulo: 3, tipo: "pratico", competencia: "Construir um formulário acessível e validado",
  enunciado: "Crie um formulário de contato com: nome (obrigatório), e-mail (obrigatório), assunto (lista com 3 opções), mensagem (obrigatória, mínimo 10 caracteres) e botão de envio. Todos os campos devem ter `label`, `name` e `autocomplete` quando aplicável. Teste a validação tentando enviar vazio e usando só o teclado.",
  criterios: ["Todos os campos têm `label` associado", "Todos os campos têm `name`", "`required` nos campos obrigatórios; `type=\"email\"` para o e-mail", "`minlength=\"10\"` na mensagem", "O formulário pode ser preenchido e enviado só com o teclado"],
  resolucao: { lang: "html", codigo: `<form action="/contato" method="post">
  <p><label for="nome">Nome (obrigatório)</label><br>
     <input id="nome" name="nome" type="text" required autocomplete="name"></p>
  <p><label for="email">E-mail (obrigatório)</label><br>
     <input id="email" name="email" type="email" required autocomplete="email"></p>
  <p><label for="assunto">Assunto</label><br>
     <select id="assunto" name="assunto">
       <option value="duvida">Dúvida</option>
       <option value="sugestao">Sugestão</option>
       <option value="outro">Outro</option>
     </select></p>
  <p><label for="mensagem">Mensagem (obrigatória, mínimo 10 caracteres)</label><br>
     <textarea id="mensagem" name="mensagem" rows="5" required minlength="10"></textarea></p>
  <button type="submit">Enviar mensagem</button>
</form>`,
    comentario: "A obrigatoriedade aparece em texto, não só no atributo. `autocomplete` ajuda no preenchimento. A validação nativa bloqueia o envio vazio; lembre-se de validar também no servidor." } },

/* ============ MÓDULO 4 — HTML avançado ============ */
{ id: "html-4-01", modulo: 4, tipo: "multipla", competencia: "Construir tabelas de dados acessíveis",
  enunciado: "Qual elemento dá um título a uma tabela, anunciado por leitores de tela antes do conteúdo?",
  alternativas: ["`<caption>`", "`<thead>`", "`<title>`", "`<th>`"],
  correta: 0,
  explicacao: "`<caption>` é o título da tabela e deve ser seu primeiro filho. `<title>` pertence ao `<head>` do documento." },
{ id: "html-4-02", modulo: 4, tipo: "vf", competencia: "Aplicar metadados essenciais",
  enunciado: "Sem `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`, páginas costumam aparecer reduzidas em celulares.",
  correta: 0,
  explicacao: "Verdadeiro. Sem o viewport, o navegador mobile simula uma tela larga e diminui o conteúdo." },
{ id: "html-4-03", modulo: 4, tipo: "codigo", competencia: "Ler multimídia e imagens responsivas",
  enunciado: "Observe o código. Qual é o papel do atributo `sizes`?",
  codigo: { lang: "html", x: `<img src="foto-800.jpg"
     srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 800px"
     width="800" height="450" alt="Praia ao entardecer">` },
  alternativas: ["Informar ao navegador quanto espaço a imagem ocupará, para escolher a versão adequada", "Definir a largura real do arquivo", "Redimensionar a imagem no servidor", "Escolher a cor da imagem"],
  correta: 0,
  explicacao: "`srcset` lista os arquivos e suas larguras reais; `sizes` informa a largura de exibição. Com os dois, o navegador baixa a versão mais adequada." },
{ id: "html-4-04", modulo: 4, tipo: "erro", competencia: "Identificar problemas de acessibilidade em mídia incorporada",
  enunciado: "Qual problema de acessibilidade existe neste trecho?",
  codigo: { lang: "html", x: `<iframe src="https://exemplo.com/mapa" width="600" height="400"></iframe>` },
  alternativas: ["Falta o atributo `title` descrevendo o conteúdo do quadro", "O `iframe` precisa de `alt`", "Não é possível usar `width` e `height`", "O endereço deve usar `http`"],
  correta: 0,
  explicacao: "Todo `iframe` precisa de `title` descritivo para que leitores de tela o anunciem. O `alt` é de imagens." },
{ id: "html-4-05", modulo: 4, tipo: "multipla", competencia: "Aplicar boas práticas de acessibilidade",
  enunciado: "Qual afirmação representa a primeira regra do uso de ARIA?",
  alternativas: ["Se existe um elemento HTML nativo com a função desejada, use-o em vez de ARIA", "Use ARIA em todos os elementos", "Prefira `div` com `role` aos elementos nativos", "ARIA substitui o teste com teclado"],
  correta: 0,
  explicacao: "Elementos nativos (como `<button>`) já trazem foco, teclado e anúncio corretos. ARIA complementa; usado sozinho em elementos errados, pode piorar a acessibilidade." },
{ id: "html-4-06", modulo: 4, tipo: "pratico", competencia: "Revisar uma página com critérios objetivos",
  enunciado: "Pegue a página que você fez no módulo 2 e revise-a com a lista de verificação da aula 4.3: valide no validador de marcação do W3C, navegue só pelo teclado e confira título, `description`, `lang`, landmarks, `alt` e textos de link. Corrija o que encontrar.",
  criterios: ["Sem erros no validador de marcação do W3C", "Tem `lang`, `charset`, `viewport`, `title` e `description`", "Um `h1`; títulos sem saltos", "Landmarks `header`, `nav`, `main` e `footer`", "Todas as imagens com `alt` apropriado", "Todos os elementos interativos acessíveis por teclado com foco visível"],
  resolucao: { lang: "", codigo: "",
    comentario: "Não há um único gabarito: o resultado depende da página. Anote cada problema encontrado, corrija e valide novamente. Os problemas mais frequentes são: `alt` ausente ou genérico, saltos na hierarquia de títulos, links \"clique aqui\" e tags sem fechamento. Cumprir todos os critérios da lista indica que a revisão foi concluída." } }

]);
