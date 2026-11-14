/* HTML5 · Módulo 1 — Introdução ao HTML
   Tópicos cobertos: Funcionamento da Web · O que é HTML · Estrutura de um documento ·
   Elementos e atributos · Ferramentas de desenvolvimento */
AE.Conteudo.modulo("html", 1, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m1a1", titulo: "Como a Web funciona e o que é HTML", minutos: 35,
  topicos: ["Funcionamento da Web", "O que é HTML"],
  objetivos: [
    "Descrever o caminho de uma requisição: navegador, DNS, servidor e resposta.",
    "Distinguir cliente, servidor, URL, HTTP e HTTPS.",
    "Explicar o papel do HTML ao lado de CSS e JavaScript.",
    "Reconhecer que HTML é uma linguagem de marcação, e não de programação."
  ],
  conceito: [
    { h: "Cliente, servidor e protocolo" },
    { p: 'A Web funciona por pedidos e respostas. **Clientes** (em geral, navegadores) pedem recursos a **servidores**, computadores que guardam arquivos e respondem aos pedidos. A conversa segue um protocolo: o **HTTP**, ou **HTTPS** quando a comunicação é criptografada.' },
    { h: "O que acontece quando você digita um endereço" },
    { ol: [
      'O navegador lê a **URL**. Em `https://exemplo.com.br/cursos/index.html` há o protocolo (`https`), o domínio (`exemplo.com.br`) e o caminho (`/cursos/index.html`).',
      'Ele consulta o **DNS**, que traduz o domínio em um endereço IP. É a "lista telefônica" da internet.',
      'Abre uma conexão com o servidor desse IP e envia uma **requisição HTTP**, com o método `GET`, pedindo aquele caminho.',
      'O servidor responde com um **código de status** (200 significa sucesso; 404, recurso não encontrado) e com o conteúdo, normalmente um arquivo HTML.',
      'O navegador lê o HTML, descobre que precisa de outros recursos (CSS, imagens, scripts), pede cada um deles e monta a página.'
    ] },
    { h: "Onde o HTML entra" },
    { p: '**HTML** (*HyperText Markup Language*) é a linguagem de marcação que descreve o conteúdo e a estrutura de uma página: o que é título, parágrafo, link, imagem, formulário. Ele diz **o que** cada pedaço de conteúdo é, não como deve parecer nem como deve se comportar.' },
    { lista: [
      '**HTML**: estrutura e significado do conteúdo.',
      '**CSS**: apresentação (cores, tipografia, layout).',
      '**JavaScript**: comportamento (reagir a cliques, validar, buscar dados).'
    ] },
    { p: 'O prefixo "hiper" vem dos **links**: um documento HTML pode apontar para outros, e a URL identifica cada recurso. Foi essa ideia que transformou documentos soltos em uma teia.' },
    { nota: { t: "Marcação não é programação", x: 'HTML não tem variáveis, condições nem laços: ele descreve, não calcula. Um erro de HTML também não "derruba" a página como um erro de programa: o navegador tolera e tenta corrigir. O resultado, porém, pode ser diferente do que você esperava, e é por isso que aprender a escrever HTML correto importa.' } }
  ],
  exemplos: [
    { titulo: "Anatomia de uma URL", lang: "txt", arquivo: "url.txt",
      codigo: `
URL completa : https://www.exemplo.com.br:443/cursos/html/index.html?aula=2#exercicios
protocolo    : https
domínio      : www.exemplo.com.br
porta        : 443 (padrão do HTTPS; normalmente omitida)
caminho      : /cursos/html/index.html
consulta     : ?aula=2
fragmento    : #exercicios (aponta para um trecho da página)`,
      explicacao: [
        'O **domínio** identifica o servidor; o **caminho** identifica o recurso dentro dele.',
        'A **consulta** (`?aula=2`) envia parâmetros ao servidor.',
        'O **fragmento** (`#exercicios`) é usado só pelo navegador, para rolar até um trecho da página; ele **não** é enviado ao servidor.'
      ] },
    { titulo: "Uma requisição e uma resposta HTTP, simplificadas", lang: "txt", arquivo: "http.txt",
      codigo: `
--- Requisição (navegador -> servidor) ---
GET /cursos/index.html HTTP/1.1
Host: www.exemplo.com.br

--- Resposta (servidor -> navegador) ---
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html lang="pt-BR">
  ...`,
      explicacao: [
        'A primeira linha da requisição traz o **método** (`GET`), o **caminho** e a versão do protocolo.',
        '`Host` diz a qual site o pedido se destina: um mesmo servidor pode hospedar vários.',
        'Na resposta, `200 OK` é o **status** e `Content-Type` informa que o corpo é HTML, codificado em UTF-8.',
        'Depois de uma linha em branco vem o **corpo** da resposta: o documento HTML.'
      ] },
    { titulo: "O mesmo conteúdo, nas três camadas", lang: "html", arquivo: "tres-camadas.html",
      codigo: `
<!-- HTML: o que é cada coisa -->
<h1>Bem-vindo</h1>
<button>Saudar</button>

<!-- CSS: como aparece -->
<style>
  h1 { color: darkblue; }
</style>

<!-- JavaScript: o que acontece ao clicar -->
<script>
  document.querySelector("button")
    .addEventListener("click", () => alert("Olá!"));
</script>`,
      explicacao: [
        'Sem o CSS e o JavaScript, o HTML continua válido e legível: ele **sempre** é a base.',
        'Aqui as três camadas estão no mesmo arquivo só para ilustrar. Em projetos reais, vão em arquivos separados (o curso de CSS e o de JavaScript mostram como).'
      ] }
  ],
  erros: [
    { erro: "Achar que HTML é uma linguagem de programação.", porque: "HTML não tem lógica, apenas descreve conteúdo. Esperar que ele \"calcule\" ou \"decida\" leva a frustração.", correcao: "use HTML para estrutura e deixe a lógica para o JavaScript." },
    { erro: "Confundir abrir um arquivo local com acessar a Web.", porque: "Ao dar duplo clique em um arquivo, o navegador usa `file://`, sem servidor e sem HTTP. Para estudar HTML isso basta, mas alguns recursos (como o `fetch`) se comportam de outro modo.", correcao: "quando precisar de comportamento de servidor, use um servidor local (a aula 3 mostra como)." },
    { erro: "Publicar páginas com formulários em HTTP simples.", porque: "Sem criptografia, o que o usuário digita pode ser lido por terceiros no caminho.", correcao: "sirva o site por HTTPS." },
    { erro: "Nomear arquivos com espaços, acentos ou maiúsculas misturadas.", porque: "Servidores diferentes tratam esses nomes de forma diferente, e links que funcionam no seu computador quebram depois.", correcao: "use minúsculas, sem espaços nem acentos: `sobre-nos.html`." }
  ],
  praticas: [
    'Antes de pensar em aparência, pergunte **o que** o conteúdo é: título, lista, navegação, citação?',
    'Mantenha estrutura (HTML), apresentação (CSS) e comportamento (JavaScript) separados à medida que o projeto cresce.',
    'Prefira HTTPS sempre que o site for publicado.',
    'Padronize nomes de arquivos e pastas: minúsculas, hífen no lugar de espaço, sem acentos.'
  ],
  exercicios: [
    { titulo: "Decifrando uma URL",
      enunciado: 'Dada a URL `https://escola.exemplo.org/matematica/aula-3.html#resumo`, identifique protocolo, domínio, caminho e fragmento. Diga também qual dessas partes não é enviada ao servidor.',
      dica: 'Procure primeiro o `://`, que separa o protocolo do resto.',
      resolucao: { lang: "txt", codigo: `
protocolo : https
domínio   : escola.exemplo.org
caminho   : /matematica/aula-3.html
fragmento : #resumo   <- não é enviado ao servidor`,
        comentario: 'O protocolo termina antes de `://`; o domínio vai até a primeira `/`; o caminho segue até um `?` ou `#`. O fragmento é tratado apenas pelo navegador, que rola a página até o elemento com `id="resumo"`.' } },
    { titulo: "Observe a Web trabalhando",
      enunciado: 'Abra qualquer site, pressione `F12` e vá à aba **Rede** (*Network*). Recarregue a página e responda: qual é o status do primeiro item (o documento HTML)? Quantos outros recursos foram pedidos e de que tipos (CSS, imagens, scripts)?',
      dica: 'Se a lista estiver vazia, recarregue a página com a aba Rede já aberta.',
      resolucao: { lang: "", codigo: "",
        comentario: 'O primeiro item costuma ter tipo `document` e status `200`. Em seguida aparecem dezenas de pedidos de `stylesheet`, `script`, `image` e `font`. Isso mostra o passo 5 da lista: o HTML é só o começo, e cada recurso extra é uma requisição própria. Se algum item aparece com status `404`, o recurso não foi encontrado no servidor.' } }
  ],
  referencias: [
    { t: "Visão geral do HTTP", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Overview", fonte: "MDN Web Docs" },
    { t: "HTML: linguagem de marcação de hipertexto", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML", fonte: "MDN Web Docs" },
    { t: "HTML Standard (especificação)", u: "https://html.spec.whatwg.org/multipage/", fonte: "WHATWG" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a2", titulo: "Estrutura de um documento, elementos e atributos", minutos: 45,
  topicos: ["Estrutura de um documento", "Elementos e atributos"],
  objetivos: [
    "Escrever um documento HTML mínimo e válido, explicando cada parte.",
    "Identificar tag de abertura, conteúdo, tag de fechamento e elementos vazios.",
    "Aninhar elementos corretamente e usar atributos, incluindo os globais.",
    "Usar comentários e caracteres especiais sem quebrar o documento."
  ],
  conceito: [
    { h: "O documento HTML mínimo" },
    { codigo: { lang: "html", arquivo: "index.html", x: `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Minha primeira página</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <p>Esta é a minha primeira página em HTML.</p>
  </body>
</html>` } },
    { lista: [
      '`<!DOCTYPE html>`: declara que o documento usa o HTML atual e faz o navegador renderizar em **modo padrão**. Sem ele, o navegador pode entrar em "modo quirks", imitando comportamentos antigos.',
      '`<html lang="pt-BR">`: elemento raiz. O atributo `lang` informa o idioma, e leitores de tela, tradutores e buscadores o utilizam.',
      '`<head>`: informações **sobre** o documento, que não aparecem na página: codificação, título, viewport, ligações com CSS.',
      '`<meta charset="utf-8">`: codificação de caracteres. Sem ela, acentos e `ç` podem aparecer como símbolos estranhos. Deve ficar nos primeiros 1024 bytes do arquivo.',
      '`<meta name="viewport" ...>`: faz a página se ajustar à largura de telas de celular (será essencial no curso de CSS).',
      '`<title>`: aparece na aba, nos favoritos e nos resultados de busca. É obrigatório e deve descrever a página.',
      '`<body>`: todo o conteúdo visível.'
    ] },
    { h: "Elementos: abertura, conteúdo e fechamento" },
    { p: 'Um **elemento** é formado pela tag de abertura, pelo conteúdo e pela tag de fechamento: `<p>Texto</p>`. Alguns elementos são **vazios** (*void*): não têm conteúdo nem tag de fechamento. Exemplos: `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>`, `<link>`.' },
    { p: 'Elementos podem conter outros elementos (**aninhamento**). A regra é simples: **o que abre por último fecha primeiro**.' },
    { h: "Atributos" },
    { p: 'Atributos ficam na tag de abertura, em pares `nome="valor"`: `<a href="contato.html" title="Fale conosco">`. Use sempre aspas duplas. Atributos **booleanos** (`required`, `disabled`, `checked`) valem pela simples presença. Alguns são **globais**, ou seja, valem para qualquer elemento: `id` (único no documento), `class`, `lang`, `title`, `hidden`, `tabindex` e `data-*`.' },
    { nota: { t: "Maiúsculas e minúsculas", x: 'Os nomes de elementos e atributos não diferenciam maiúsculas de minúsculas, mas a convenção é escrevê-los em minúsculas. Já os **valores** de `id` e `class` diferenciam: `Menu` e `menu` são nomes distintos.' } },
    { h: "Comentários, espaços e caracteres especiais" },
    { lista: [
      'Comentários: `<!-- assim -->`. Não aparecem na página, mas qualquer pessoa pode lê-los no código-fonte.',
      'Vários espaços e quebras de linha seguidos são **colapsados em um único espaço** na renderização. Para separar conteúdo, use elementos (`<p>`, `<br>`), não espaços.',
      'Os caracteres `<`, `>` e `&` têm significado especial. Para exibi-los como texto, use as **entidades** `&lt;`, `&gt;` e `&amp;`. Também existem `&quot;` (aspas) e `&copy;` (©).'
    ] }
  ],
  exemplos: [
    { titulo: "Aninhamento incorreto e correto", lang: "html", arquivo: "aninhamento.html",
      codigo: `
<!-- Incorreto: o <strong> abriu primeiro, mas o <em> fechou depois dele -->
<p>Este texto é <strong>muito <em>importante</strong></em>.</p>

<!-- Correto: quem abre por último fecha primeiro -->
<p>Este texto é <strong>muito <em>importante</em></strong>.</p>`,
      explicacao: [
        'No primeiro caso os elementos se "cruzam". O navegador tenta consertar, mas cada navegador pode consertar de um jeito.',
        'No segundo, `<em>` está inteiramente dentro de `<strong>`: a estrutura é uma árvore, e é assim que o navegador a representa (o **DOM**).'
      ] },
    { titulo: "Atributos em ação", lang: "html", arquivo: "atributos.html",
      codigo: `
<a href="https://developer.mozilla.org/pt-BR/" target="_blank" rel="noopener noreferrer"
   title="Documentação da MDN">Abrir a MDN</a>

<img src="logo.png" alt="Logotipo da escola" width="120" height="40">

<input type="text" name="nome" required>`,
      explicacao: [
        '`href` é o destino do link; `target="_blank"` abre em nova aba e `rel="noopener noreferrer"` evita que a página aberta tenha acesso à original.',
        '`src` indica o arquivo da imagem; `alt` é o texto alternativo (obrigatório para acessibilidade); `width` e `height` reservam espaço antes de a imagem carregar.',
        '`required` é booleano: basta escrevê-lo para o campo se tornar obrigatório.',
        '`<img>` e `<input>` são elementos vazios: não há `</img>` nem `</input>`.'
      ] },
    { titulo: "Entidades e colapso de espaços", lang: "html", arquivo: "entidades.html",
      codigo: `
<p>Para mostrar uma tag como texto, escreva &lt;p&gt; no código.</p>
<p>Perguntas &amp; respostas &copy; 2026</p>
<p>Vários      espaços
e quebras de linha     viram um espaço só.</p>`,
      explicacao: [
        'O navegador exibe `<p>` como texto (não como elemento) porque o código usa `&lt;` e `&gt;`.',
        'Sem `&amp;`, um "e comercial" solto pode ser interpretado como o início de uma entidade.',
        'No terceiro parágrafo, o código tem muitos espaços e uma quebra de linha, mas a página mostra uma frase corrida com espaços simples.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o `<!DOCTYPE html>`.", porque: "O navegador entra em modo quirks, e medidas e alinhamentos podem mudar sem aviso.", correcao: "sempre comece o arquivo com `<!DOCTYPE html>`." },
    { erro: "Esquecer `lang` no `<html>`.", porque: "Leitores de tela podem pronunciar o texto no idioma errado, e o navegador pode oferecer tradução indevida.", correcao: "use `lang=\"pt-BR\"` (ou o idioma correto)." },
    { erro: "Omitir `<meta charset=\"utf-8\">`.", porque: "Caracteres acentuados podem aparecer corrompidos.", correcao: "coloque a meta de codificação logo no início do `<head>` e salve o arquivo em UTF-8." },
    { erro: "Aninhar elementos de forma cruzada ou esquecer de fechar tags.", porque: "O navegador \"adivinha\" a intenção e cada caso pode ser lido de um jeito diferente.", correcao: "feche na ordem inversa da abertura e use a indentação para enxergar a árvore." },
    { erro: "Repetir o mesmo `id` em dois elementos.", porque: "O `id` deve ser único; links internos e scripts passam a apontar para o elemento errado.", correcao: "use `class` para agrupar e `id` só para itens únicos." }
  ],
  praticas: [
    'Indente com dois espaços cada nível de aninhamento: a indentação revela erros de estrutura.',
    'Use sempre aspas duplas nos valores e nomes em minúsculas.',
    'Escolha `id` e `class` pelo significado (`menu-principal`), não pela aparência (`caixa-azul`).',
    'Dê a cada página um `<title>` único e descritivo.'
  ],
  exercicios: [
    { titulo: "Corrija o documento",
      enunciado: 'O documento abaixo tem pelo menos sete problemas. Encontre todos e reescreva-o corretamente.',
      codigo: { lang: "html", x: `
<html>
<head>
<title>Minha escola
</head>
<body>
<h1>Bem-vindos<h1>
<p>Aprenda com <strong>qualidade</p></strong>
<img src=foto.jpg>
</body>` },
      dica: 'Pense em DOCTYPE, idioma, codificação, tags não fechadas, aninhamento e o atributo obrigatório da imagem.',
      resolucao: { lang: "html", codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Minha escola</title>
  </head>
  <body>
    <h1>Bem-vindos</h1>
    <p>Aprenda com <strong>qualidade</strong></p>
    <img src="foto.jpg" alt="Fachada da escola">
  </body>
</html>`,
        comentario: 'Problemas encontrados: (1) faltava o `<!DOCTYPE html>`; (2) faltava `lang`; (3) faltava `meta charset`; (4) o `<title>` não foi fechado; (5) o `<h1>` foi "fechado" com outra tag de abertura; (6) `<strong>` e `<p>` estavam cruzados; (7) `<img>` sem `alt` e com valor de `src` sem aspas. Corrigir (5) e (6) é o que mais muda a estrutura.' } },
    { titulo: "Escreva do zero",
      enunciado: 'Crie um arquivo `index.html` sem copiar o modelo: com DOCTYPE, idioma, codificação, título, um `<h1>` com o seu nome, um parágrafo que mostre o texto `<h1>` como texto (não como elemento) e um comentário.',
      dica: 'Para exibir `<h1>` como texto, use entidades.',
      resolucao: { lang: "html", codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Página de Ana Souza</title>
  </head>
  <body>
    <!-- Cabeçalho principal da página -->
    <h1>Ana Souza</h1>
    <p>O título acima foi criado com o elemento &lt;h1&gt;.</p>
  </body>
</html>`,
        comentario: 'O `<h1>` do parágrafo aparece como texto graças a `&lt;` e `&gt;`. O comentário não aparece na tela, mas está no código-fonte (`Ctrl+U`). Se algo falhar, valide o arquivo: a aula seguinte mostra como.' } }
  ],
  referencias: [
    { t: "Elementos HTML (referência)", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element", fonte: "MDN Web Docs" },
    { t: "Atributos globais", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Global_attributes", fonte: "MDN Web Docs" },
    { t: "HTML Standard: a estrutura de documentos", u: "https://html.spec.whatwg.org/multipage/dom.html", fonte: "WHATWG" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a3", titulo: "Ferramentas de desenvolvimento", minutos: 35,
  topicos: ["Ferramentas de desenvolvimento"],
  objetivos: [
    "Montar um ambiente mínimo: editor, navegador e pasta de projeto organizada.",
    "Abrir e recarregar uma página local, com ou sem servidor local.",
    "Usar os painéis Elementos, Console e Rede das ferramentas de desenvolvedor.",
    "Validar um documento no validador do W3C e interpretar as mensagens."
  ],
  conceito: [
    { h: "O ambiente mínimo" },
    { p: 'Para escrever HTML você precisa de três coisas: um **editor de texto** (o Visual Studio Code é muito usado, mas qualquer editor serve), um **navegador atual** e uma **pasta de projeto**. Organize a pasta desde o início:' },
    { codigo: { lang: "txt", arquivo: "estrutura-do-projeto.txt", x: `
meu-site/
  index.html
  css/
    estilos.css
  js/
    principal.js
  img/
    logo.png` } },
    { p: 'A página inicial de um site se chama `index.html`: servidores a entregam quando o endereço não indica um arquivo.' },
    { h: "Abrindo e recarregando" },
    { p: 'O modo mais simples é dar duplo clique no arquivo: o navegador o abre por `file://`. Depois de editar e **salvar**, atualize a página com `F5`. Uma alternativa mais confortável é um **servidor local** (por exemplo, a extensão *Live Server* do VS Code): ele serve a pasta em `http://localhost` e recarrega sozinho quando você salva.' },
    { h: "Ferramentas de desenvolvedor (DevTools)" },
    { p: 'Todo navegador moderno tem ferramentas para inspecionar páginas. Abra-as com `F12` (ou `Ctrl+Shift+I`; no macOS, `Cmd+Option+I`). Os painéis mais úteis agora:' },
    { lista: [
      '**Elementos**: mostra a árvore da página (o DOM), permite selecionar um elemento e editar texto e atributos para testar.',
      '**Console**: exibe mensagens e erros e permite executar comandos JavaScript.',
      '**Rede**: lista cada requisição, com status, tipo e tempo. Ótimo para achar arquivos não encontrados (404).',
      '**Lighthouse** (em alguns navegadores): audita desempenho, acessibilidade e SEO.'
    ] },
    { nota: { t: "DOM não é o arquivo", x: 'O painel Elementos mostra o **DOM**, a versão que o navegador montou, já com correções. Se você omitir uma tag, ele pode mostrá-la fechada. As edições feitas ali são **temporárias**: ao recarregar, voltam ao que está no arquivo.' } },
    { h: "Validação" },
    { p: 'O validador do W3C (**Nu Html Checker**, em `validator.w3.org/nu`) lê seu HTML e aponta erros e avisos. Você pode enviar o endereço, um arquivo ou colar o código. **Erros** violam a especificação; **avisos** sugerem melhorias. Valide sempre antes de dar uma página por pronta.' },
    { h: "O fluxo de trabalho" },
    { ol: ['Editar o código.', 'Salvar o arquivo (`Ctrl+S`).', 'Atualizar o navegador (`F5`).', 'Inspecionar com as DevTools se algo estiver estranho.', 'Validar o documento.'] }
  ],
  exemplos: [
    { titulo: "Um arquivo de laboratório para as DevTools", lang: "html", arquivo: "laboratorio.html",
      codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Laboratório</title>
</head>
<body>
  <h1>Laboratório de HTML</h1>
  <p>Primeiro parágrafo
  <p>Segundo parágrafo
  <img src="nao-existe.png" alt="Imagem de teste">
</body>
</html>`,
      explicacao: [
        '**Elementos**: o primeiro `<p>` aparece fechado antes do segundo. Em HTML, a tag de fechamento do `<p>` pode ser omitida quando outro parágrafo começa, então isso é válido, mas é uma prática ruim (feche sempre).',
        '**Rede**: a imagem `nao-existe.png` aparece com status `404`.',
        '**Console**: o navegador registra a falha ao carregar o recurso.',
        'Clique duas vezes no texto do `<h1>` no painel Elementos e edite: a mudança some ao recarregar com `F5`.'
      ] },
    { titulo: "Primeiros comandos no Console", lang: "js", arquivo: "Console",
      codigo: `
document.title                          // lê o título da página
document.querySelector("h1")            // devolve o primeiro <h1>
document.querySelector("h1").textContent = "Editado pelo Console"`,
      explicacao: [
        '`document` representa a página inteira; `document.title` lê o conteúdo do `<title>`.',
        '`querySelector("h1")` encontra o primeiro `<h1>`; atribuir a `textContent` troca o texto dele.',
        'Você aprenderá a fundo o DOM no curso de JavaScript. Aqui o objetivo é só ver que a página é um objeto que você pode inspecionar.'
      ] },
    { titulo: "O que o validador aponta", lang: "html", arquivo: "validador.html",
      codigo: `
<!-- O validador acusa: faltam o atributo alt na imagem e o <title> no head -->
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"></head>
<body>
  <img src="foto.jpg">
</body>
</html>`,
      explicacao: [
        'Cada mensagem informa o tipo (erro ou aviso), a linha e o trecho de código.',
        'Corrija de cima para baixo: um erro de estrutura no começo pode gerar mensagens "em cascata" mais adiante.',
        'Depois de corrigir, valide de novo até não restarem erros.'
      ] }
  ],
  erros: [
    { erro: "Editar o arquivo e não salvar, ou atualizar a aba errada.", porque: "O navegador continua mostrando a versão anterior e você conclui que o código não funciona.", correcao: "salve com `Ctrl+S` e confira o nome do arquivo na aba do navegador." },
    { erro: "Referenciar arquivos com caminho incorreto.", porque: "`img/Logo.png` e `img/logo.png` são nomes diferentes em muitos servidores.", correcao: "copie o nome exato e mantenha tudo em minúsculas." },
    { erro: "Editar na aba Elementos e esquecer de copiar a mudança para o arquivo.", porque: "As edições das DevTools são temporárias.", correcao: "use o painel para testar e depois escreva a alteração no editor." },
    { erro: "Confiar apenas em \"aparece certo no meu navegador\".", porque: "O navegador tolera erros, que podem se manifestar em outros navegadores ou em leitores de tela.", correcao: "valide o HTML e teste em mais de um navegador." }
  ],
  praticas: [
    'Mantenha o painel de DevTools aberto enquanto desenvolve e leia a mensagem de erro por inteiro.',
    'Use controle de versão (Git) assim que o projeto tiver mais de um arquivo.',
    'Valide o HTML a cada etapa importante, não só no fim.',
    'Teste em pelo menos dois navegadores e em uma janela estreita (modo responsivo das DevTools).'
  ],
  exercicios: [
    { titulo: "Monte o ambiente",
      enunciado: 'Crie a pasta `meu-site` com as subpastas `css`, `js` e `img` e um `index.html` mínimo. Abra-o no navegador, mude o `<title>`, salve, atualize e confirme que o texto da aba mudou.',
      dica: 'Se a aba não mudar, confira se você salvou o arquivo certo.',
      resolucao: { lang: "html", codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <title>Meu primeiro site</title>
  </head>
  <body>
    <h1>Ambiente pronto</h1>
  </body>
</html>`,
        comentario: 'O fluxo é editar, salvar, atualizar. O que aparece na aba do navegador vem do `<title>`. Se você usa o Live Server, a atualização acontece automaticamente depois de salvar.' } },
    { titulo: "Caça ao erro com DevTools e validador",
      enunciado: 'Salve o arquivo de laboratório do exemplo 1. (a) Encontre o status 404 na aba Rede. (b) Veja no painel Elementos como o navegador fechou os parágrafos. (c) Cole o código no validador do W3C e anote as mensagens. (d) Corrija tudo.',
      dica: 'Para o item (d), feche os `<p>` e use uma imagem que exista (ou remova a tag).',
      resolucao: { lang: "html", codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Laboratório</title>
</head>
<body>
  <h1>Laboratório de HTML</h1>
  <p>Primeiro parágrafo</p>
  <p>Segundo parágrafo</p>
  <img src="img/logo.png" alt="Logotipo do laboratório">
</body>
</html>`,
        comentario: 'O 404 vinha do arquivo inexistente; ao apontar para uma imagem que existe na pasta `img`, o erro some. O validador não acusa erro nos `<p>` sem fechamento (é permitido), mas fechar é mais seguro e legível. Se alguma mensagem restar, leia a linha indicada e compare com o exemplo.' } }
  ],
  referencias: [
    { t: "Documentação do Chrome DevTools", u: "https://developer.chrome.com/docs/devtools", fonte: "Chrome for Developers" },
    { t: "Nu Html Checker (validador do W3C)", u: "https://validator.w3.org/nu/", fonte: "W3C" },
    { t: "Documentação do Visual Studio Code", u: "https://code.visualstudio.com/docs", fonte: "Microsoft" }
  ]
}

] });
