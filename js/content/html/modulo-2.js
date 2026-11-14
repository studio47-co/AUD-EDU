/* HTML5 · Módulo 2 — Estrutura e semântica
   Tópicos cobertos: Títulos e parágrafos · Listas · Links · Imagens ·
   Elementos semânticos · Organização de documentos */
AE.Conteudo.modulo("html", 2, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m2a1", titulo: "Títulos, parágrafos e listas", minutos: 45,
  topicos: ["Títulos e parágrafos", "Listas"],
  objetivos: [
    "Usar `<h1>` a `<h6>` para construir uma hierarquia de seções, e não para escolher tamanho de letra.",
    "Marcar parágrafos, ênfase, importância, citações e texto pré-formatado com o elemento adequado.",
    "Escolher entre lista não ordenada, ordenada e de descrição, inclusive com listas aninhadas.",
    "Explicar por que a estrutura correta ajuda leitores de tela e buscadores."
  ],
  conceito: [
    { h: "Títulos: hierarquia, não tamanho" },
    { p: 'Os elementos `<h1>` a `<h6>` formam o **esqueleto** de um texto: `<h1>` é o assunto da página, `<h2>` são as grandes seções, `<h3>` as subseções, e assim por diante. O tamanho padrão da letra é só um efeito colateral: quem controla a aparência é o CSS.' },
    { p: 'Isso importa porque usuários de leitores de tela navegam **pulando de título em título**, como se fosse um índice, e buscadores usam os títulos para entender o assunto da página.' },
    { lista: [
      'Use um `<h1>` por página, descrevendo-a. (A especificação não proíbe vários, mas um só é a prática recomendada.)',
      'Não pule níveis: depois de `<h2>` vem `<h3>`, e não `<h4>`.',
      'Nunca escolha um nível por causa da aparência. Se o título ficou grande demais, ajuste no CSS.'
    ] },
    { h: "Parágrafos e marcações de texto" },
    { p: 'Cada bloco de texto corrido vai em um `<p>`. O espaçamento entre parágrafos vem do CSS, não de `<br>` repetidos. Dentro do texto, escolha a marcação pelo **significado**:' },
    { lista: [
      '`<em>`: ênfase (muda o sentido da frase se for dita com outra entonação). Costuma aparecer em itálico.',
      '`<strong>`: importância, seriedade ou urgência. Costuma aparecer em negrito.',
      '`<b>` e `<i>`: apenas estilo, sem importância extra (nomes de produtos, termos estrangeiros). Use com moderação.',
      '`<mark>` destaca um trecho por relevância; `<code>` marca código; `<abbr title="...">` marca abreviações; `<br>` é uma quebra de linha **que faz parte do conteúdo** (endereços, versos); `<hr>` marca uma mudança de assunto.',
      '`<blockquote>` é uma citação em bloco e `<q>` uma citação curta, no meio do texto. `<cite>` nomeia a obra citada.',
      '`<pre>` preserva espaços e quebras de linha, como em blocos de código.'
    ] },
    { h: "Listas" },
    { p: 'Quando o conteúdo é uma sequência de itens, use uma lista: ela diz ao navegador e a quem usa leitor de tela quantos itens existem e onde cada um começa.' },
    { lista: [
      '`<ul>` (*unordered list*): itens sem ordem importante. Cada item é um `<li>`.',
      '`<ol>` (*ordered list*): a ordem importa (passos, ranking). Aceita `start` (número inicial), `reversed` (contagem regressiva) e `type`.',
      '`<dl>` (*description list*): pares de termo (`<dt>`) e descrição (`<dd>`), como em glossários.'
    ] },
    { p: 'Para aninhar listas, coloque a lista interna **dentro de um `<li>`**, nunca diretamente dentro de `<ul>` ou `<ol>`. A pergunta que decide entre `<ul>` e `<ol>`: **se eu embaralhar os itens, muda o sentido?** Se sim, é `<ol>`.' }
  ],
  exemplos: [
    { titulo: "Hierarquia de títulos", lang: "html", arquivo: "titulos.html",
      codigo: `
<h1>Guia de estudos de HTML</h1>

<h2>Estrutura do documento</h2>
<h3>O elemento head</h3>
<p>No head ficam as informações sobre o documento.</p>
<h3>O elemento body</h3>
<p>No body ficam os conteúdos visíveis.</p>

<h2>Formulários</h2>
<p>Formulários coletam dados do usuário.</p>

<!-- Evite: pular do h2 direto para o h4 deixa a hierarquia incoerente -->
<!-- <h2>Seção</h2><h4>Subseção</h4> -->`,
      explicacao: [
        'Lido só pelos títulos, o documento vira um sumário: Estrutura (head, body) e Formulários.',
        'Os dois `<h3>` pertencem à seção do `<h2>` anterior.',
        'Pular níveis (o trecho comentado) faz a hierarquia parecer ter "buracos" para quem navega por títulos.'
      ] },
    { titulo: "Ênfase, importância e citações", lang: "html", arquivo: "texto.html",
      codigo: `
<p>Atenção: o prazo termina <strong>amanhã</strong>.</p>
<p>Eu <em>realmente</em> gostei do curso.</p>
<p>O <abbr title="HyperText Markup Language">HTML</abbr> descreve a estrutura da página.</p>
<p>Como disse o autor, <q>a Web é para todos</q>.</p>
<blockquote cite="https://exemplo.org/artigo">
  <p>A acessibilidade começa na estrutura do documento.</p>
</blockquote>
<p>Execute o comando <code>npm install</code> no terminal.</p>
<pre>
Linha 1
   Linha 2, recuada
</pre>`,
      explicacao: [
        '`<strong>` diz que "amanhã" é importante; `<em>` mudaria a entonação de "realmente".',
        '`<abbr>` guarda a forma completa no atributo `title`.',
        '`<blockquote>` pode ter o atributo `cite` com o endereço da fonte e o texto citado fica em `<p>` dentro dele.',
        'Em `<pre>` os espaços e as quebras de linha são preservados, ao contrário do que acontece no resto do HTML.'
      ] },
    { titulo: "Listas: ordenada, não ordenada, aninhada e de descrição", lang: "html", arquivo: "listas.html",
      codigo: `
<h2>Receita de bolo simples</h2>
<h3>Ingredientes</h3>
<ul>
  <li>3 ovos</li>
  <li>2 xícaras de farinha</li>
  <li>Cobertura
    <ul>
      <li>Chocolate</li>
      <li>Leite</li>
    </ul>
  </li>
</ul>

<h3>Modo de preparo</h3>
<ol>
  <li>Bata os ovos.</li>
  <li>Misture a farinha.</li>
  <li>Asse por 40 minutos.</li>
</ol>

<h3>Glossário</h3>
<dl>
  <dt>Fermento</dt>
  <dd>Ingrediente que faz a massa crescer.</dd>
  <dt>Forno pré-aquecido</dt>
  <dd>Forno já na temperatura correta antes de assar.</dd>
</dl>`,
      explicacao: [
        'Ingredientes não têm ordem obrigatória, então usam `<ul>`; os passos exigem ordem, então usam `<ol>`.',
        'A lista de cobertura está **dentro** do `<li>` "Cobertura", e não solta entre os itens.',
        'O glossário usa `<dl>`: cada termo (`<dt>`) é seguido da sua descrição (`<dd>`).'
      ] }
  ],
  erros: [
    { erro: "Escolher `<h3>` ou `<h4>` porque a letra \"fica melhor\".", porque: "Isso embaralha a hierarquia para leitores de tela e buscadores.", correcao: "use o nível correto da estrutura e ajuste o tamanho com CSS." },
    { erro: "Separar parágrafos com vários `<br>`.", porque: "Não existem parágrafos de verdade, apenas linhas em branco, e o espaço não pode ser controlado pelo CSS.", correcao: "use um `<p>` por parágrafo." },
    { erro: "Usar `<b>` e `<i>` quando o sentido é de importância ou ênfase.", porque: "A aparência é parecida, mas leitores de tela só dão entonação a `<strong>` e `<em>`.", correcao: "use `<strong>` e `<em>` para significado e CSS para estilo." },
    { erro: "Digitar \"- item\" ou \"1.\" dentro de parágrafos para imitar listas.", porque: "O navegador não reconhece uma lista, e leitores de tela não anunciam a quantidade de itens.", correcao: "use `<ul>` ou `<ol>` com `<li>`." },
    { erro: "Colocar `<ul>` diretamente dentro de outro `<ul>`.", porque: "Os filhos diretos de uma lista devem ser `<li>`; o validador acusa erro.", correcao: "aninhe a lista dentro de um `<li>`." }
  ],
  praticas: [
    'Leia a página só pelos títulos: se o sumário fizer sentido, a hierarquia está boa.',
    'Para decidir entre `<ul>` e `<ol>`, embaralhe mentalmente os itens: se o sentido muda, use `<ol>`.',
    'Reserve `<br>` para quebras que fazem parte do conteúdo, como endereços e poemas.',
    'Não use `<blockquote>` apenas para recuar um texto: o recuo é papel do CSS.'
  ],
  exercicios: [
    { titulo: "Estruture o texto",
      enunciado: 'Transforme o texto abaixo em HTML estruturado: um título principal, duas seções, uma lista com os materiais (sem ordem), uma lista com os passos (em ordem) e uma palavra importante em destaque.',
      codigo: { lang: "txt", x: `
Como plantar um feijão
Materiais: algodão, feijão e copo plástico.
Preparação: Umedeça o algodão. Coloque o feijão no copo. Deixe em local iluminado.
Importante: não encharque o algodão.` },
      dica: 'Materiais não têm ordem. Os passos têm.',
      resolucao: { lang: "html", codigo: `
<h1>Como plantar um feijão</h1>

<h2>Materiais</h2>
<ul>
  <li>Algodão</li>
  <li>Feijão</li>
  <li>Copo plástico</li>
</ul>

<h2>Preparação</h2>
<ol>
  <li>Umedeça o algodão.</li>
  <li>Coloque o feijão no copo.</li>
  <li>Deixe em local iluminado.</li>
</ol>
<p><strong>Importante:</strong> não encharque o algodão.</p>`,
        comentario: 'O título principal é um `<h1>` e as duas seções são `<h2>`. Os materiais usam `<ul>` porque a ordem é indiferente; os passos usam `<ol>` porque a ordem importa. A advertência é uma questão de importância, então usa `<strong>`.' } },
    { titulo: "Escolha o elemento",
      enunciado: 'Para cada situação, diga qual elemento usar: (a) o ranking dos 5 mais vendidos; (b) um endereço com rua, número e cidade em linhas separadas; (c) a palavra "nunca" numa frase de alerta de segurança; (d) um trecho de código de 3 linhas com recuos; (e) um glossário de termos.',
      dica: 'Pense no significado, não na aparência.',
      resolucao: { lang: "", codigo: "",
        comentario: '(a) `<ol>`, pois a ordem importa; (b) `<br>` entre as linhas (a quebra faz parte do conteúdo), dentro de um `<address>` se for contato da página ou do autor; (c) `<strong>`, por importância; (d) `<pre>` com `<code>`, que preserva espaços; (e) `<dl>` com `<dt>` e `<dd>`.' } }
  ],
  referencias: [
    { t: "Elementos de título (h1 a h6)", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Heading_Elements", fonte: "MDN Web Docs" },
    { t: "O elemento ul (lista não ordenada)", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/ul", fonte: "MDN Web Docs" },
    { t: "Tutorial de estrutura de página (cabeçalhos)", u: "https://www.w3.org/WAI/tutorials/page-structure/headings/", fonte: "W3C WAI" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a2", titulo: "Links e imagens", minutos: 50,
  topicos: ["Links", "Imagens"],
  objetivos: [
    "Criar links para páginas, trechos de uma página, e-mail e telefone, usando caminhos corretos.",
    "Diferenciar caminho absoluto e relativo e escrever caminhos relativos sem errar.",
    "Inserir imagens com texto alternativo adequado e dimensões declaradas.",
    "Escolher formato de imagem e usar `srcset`, `figure` e carregamento preguiçoso."
  ],
  conceito: [
    { h: "Links" },
    { p: 'O elemento `<a>` (âncora) cria um hiperlink. O atributo `href` guarda o destino; o conteúdo do elemento é o texto clicável: `<a href="contato.html">Fale conosco</a>`.' },
    { h: "Caminhos: absoluto e relativo" },
    { lista: [
      '**URL absoluta** traz o endereço completo: `https://exemplo.com/sobre.html`. Use para sites externos.',
      '**Caminho relativo** é calculado a partir do arquivo atual: `sobre.html` (mesma pasta), `paginas/sobre.html` (subpasta), `../index.html` (uma pasta acima).',
      '**Caminho a partir da raiz do site** começa com `/`: `/img/logo.png`. Só funciona em servidor, e não com `file://`.'
    ] },
    { p: 'Prefira caminhos **relativos** dentro do mesmo site: o projeto continua funcionando se mudar de domínio ou de pasta.' },
    { h: "Outros destinos" },
    { lista: [
      '**Âncora interna**: `<a href="#contato">` leva ao elemento com `id="contato"`.',
      '**E-mail**: `href="mailto:ola@exemplo.com"` abre o programa de e-mail.',
      '**Telefone**: `href="tel:+5511999999999"` chama o número em celulares.',
      '**Download**: `<a href="guia.pdf" download>` sugere salvar o arquivo.',
      '**Nova aba**: `target="_blank"`, acompanhado de `rel="noopener noreferrer"`. Use com critério: abrir abas sem avisar pode confundir.'
    ] },
    { nota: { t: "Texto do link", x: 'Leitores de tela listam todos os links da página fora de contexto. "Clique aqui" ou "saiba mais" repetidos não dizem nada. Escreva o destino no próprio texto: "Baixar o guia de estudos (PDF, 2 MB)".' } },
    { h: "Imagens" },
    { p: 'O elemento vazio `<img>` insere uma imagem. Dois atributos são obrigatórios: `src` (o caminho do arquivo) e `alt` (o texto alternativo). Declare também `width` e `height`, que permitem ao navegador reservar espaço antes de a imagem carregar e evitam que a página "pule" durante o carregamento.' },
    { h: "Como escrever o texto alternativo" },
    { lista: [
      '**Imagem informativa**: descreva a informação, não a aparência. Um gráfico de vendas: "Vendas cresceram 20% entre 2024 e 2025".',
      '**Imagem que é um link**: descreva o destino ("Página inicial da AUDMANI"), não a imagem.',
      '**Imagem decorativa**: use `alt=""` (vazio). Assim leitores de tela a ignoram. Omitir o atributo é diferente: o leitor pode ler o nome do arquivo.',
      'Evite "imagem de" ou "foto de": o leitor de tela já anuncia que é uma imagem.'
    ] },
    { h: "Formatos" },
    { lista: [
      '**JPEG**: fotografias. **PNG**: transparência e imagens com bordas nítidas.',
      '**WebP** e **AVIF**: formatos modernos, em geral menores com a mesma qualidade.',
      '**SVG**: gráfico vetorial, ótimo para logotipos e ícones: não perde nitidez ao ampliar.'
    ] },
    { h: "Figura e legenda; imagens responsivas" },
    { p: '`<figure>` agrupa uma imagem (ou código, ou tabela) com a legenda `<figcaption>`. Para entregar imagens de tamanhos diferentes conforme a tela, o `srcset` lista as versões e `sizes` diz qual largura a imagem ocupará. O atributo `loading="lazy"` adia o carregamento de imagens que estão fora da tela.' }
  ],
  exemplos: [
    { titulo: "Caminhos relativos na prática", lang: "html", arquivo: "paginas/sobre.html",
      codigo: `
<!-- Estrutura:
meu-site/
  index.html
  img/logo.png
  paginas/
    sobre.html   <- este arquivo
    contato.html
-->
<a href="contato.html">Contato</a>                  <!-- mesma pasta -->
<a href="../index.html">Início</a>                  <!-- sobe uma pasta -->
<img src="../img/logo.png" alt="Logotipo da AUDMANI"> <!-- sobe e entra em img -->
<a href="https://developer.mozilla.org/pt-BR/">Documentação MDN</a>`,
      explicacao: [
        'O caminho é sempre calculado **a partir do arquivo que contém o link**, e não a partir do index.',
        '`..` significa "pasta acima". Para chegar em `img/logo.png` a partir de `paginas/`, sobe-se uma pasta e entra-se em `img`.',
        'O último link usa URL absoluta porque o site é externo.'
      ] },
    { titulo: "Links para trechos, e-mail, telefone e download", lang: "html", arquivo: "links-especiais.html",
      codigo: `
<nav>
  <a href="#servicos">Serviços</a>
  <a href="#contato">Contato</a>
</nav>

<h2 id="servicos">Serviços</h2>
<p>Conheça o que oferecemos.</p>

<h2 id="contato">Contato</h2>
<p>
  <a href="mailto:ola@exemplo.com">ola@exemplo.com</a><br>
  <a href="tel:+5511999999999">(11) 99999-9999</a>
</p>
<p><a href="guia-html.pdf" download>Baixar o guia de HTML (PDF)</a></p>`,
      explicacao: [
        'Clicar em "Serviços" rola a página até o elemento cujo `id` é `servicos`. Observe que o link usa `#` e o `id`, não.',
        '`mailto:` e `tel:` são **esquemas** de URL que acionam programas do dispositivo.',
        '`download` faz o navegador salvar o arquivo em vez de abri-lo.'
      ] },
    { titulo: "Imagens acessíveis, com legenda e responsivas", lang: "html", arquivo: "imagens.html",
      codigo: `
<!-- Informativa, com legenda -->
<figure>
  <img src="img/vendas.png" width="640" height="360"
       alt="Gráfico de barras: as vendas cresceram 20% entre 2024 e 2025">
  <figcaption>Evolução das vendas, 2024 a 2025</figcaption>
</figure>

<!-- Decorativa -->
<img src="img/divisor.svg" alt="" width="200" height="8">

<!-- Link com imagem: o alt descreve o destino -->
<a href="index.html"><img src="img/logo.svg" alt="Página inicial da AUDMANI" width="120" height="32"></a>

<!-- Responsiva e com carregamento preguiçoso -->
<img src="img/banner-800.jpg"
     srcset="img/banner-400.jpg 400w, img/banner-800.jpg 800w, img/banner-1600.jpg 1600w"
     sizes="(min-width: 800px) 800px, 100vw"
     width="800" height="450" loading="lazy"
     alt="Estudantes trabalhando em computadores em uma sala de aula">`,
      explicacao: [
        'No gráfico, o `alt` informa o dado que a imagem comunica; a legenda aparece para todos, visualmente.',
        'No divisor, `alt=""` faz o leitor de tela ignorar a imagem, pois ela não carrega informação.',
        'No logotipo-link, o `alt` descreve **para onde o link leva**.',
        'Em `srcset`, `400w`, `800w` e `1600w` são as larguras reais dos arquivos. `sizes` diz que, em telas de 800 px ou mais, a imagem ocupa 800 px; em telas menores, a largura toda. O navegador escolhe a melhor versão.',
        '`loading="lazy"` não deve ser usado em imagens que já aparecem na primeira tela (no topo).'
      ] }
  ],
  erros: [
    { erro: "Usar \"clique aqui\" como texto do link.", porque: "Fora de contexto o texto não diz para onde vai, o que prejudica leitores de tela e SEO.", correcao: "escreva um texto que descreva o destino." },
    { erro: "Omitir o `alt` ou escrever apenas \"imagem\".", porque: "O leitor de tela lê o nome do arquivo ou nada informa. O validador também acusa erro.", correcao: "descreva a função da imagem; use `alt=\"\"` se for decorativa." },
    { erro: "Usar caminhos do computador, como `C:\\Users\\...\\logo.png`.", porque: "Só funciona na sua máquina; na Web, o arquivo não existe nesse caminho.", correcao: "use caminhos relativos à pasta do projeto." },
    { erro: "Carregar uma imagem de 4000 px e reduzi-la apenas com `width`.", porque: "O usuário baixa o arquivo inteiro, mesmo que seja exibido pequeno.", correcao: "exporte a imagem no tamanho necessário e use `srcset` para telas diferentes." },
    { erro: "Colocar texto importante dentro de uma imagem.", porque: "Quem usa leitor de tela, não consegue selecionar o texto nem traduzir a página.", correcao: "escreva o texto em HTML e estilize-o com CSS." }
  ],
  praticas: [
    'Escreva textos de link que façam sentido sozinhos e evite repeti-los para destinos diferentes.',
    'Declare `width` e `height` em todas as imagens para evitar saltos de layout durante o carregamento.',
    'Use SVG para logotipos e ícones e WebP/AVIF ou JPEG otimizado para fotos.',
    'Adie com `loading="lazy"` apenas as imagens abaixo da primeira tela.',
    'Avise o usuário quando um link abrir em nova aba ou baixar um arquivo.'
  ],
  exercicios: [
    { titulo: "Mapa de caminhos",
      enunciado: 'Considere a estrutura: `site/index.html`, `site/cursos/html.html`, `site/cursos/css.html`, `site/img/capa.jpg`. Escreva, **dentro de `cursos/html.html`**: (a) um link para `css.html`; (b) um link para o `index.html`; (c) a imagem `capa.jpg` com um `alt` adequado para uma capa de curso de HTML.',
      dica: 'Sempre parta da pasta do arquivo atual.',
      resolucao: { lang: "html", codigo: `
<a href="css.html">Curso de CSS</a>
<a href="../index.html">Voltar ao início</a>
<img src="../img/capa.jpg" alt="Capa do curso de HTML" width="600" height="338">`,
        comentario: '(a) `css.html` está na mesma pasta, então basta o nome. (b) `index.html` está uma pasta acima, daí `../`. (c) `capa.jpg` fica em `img`, que também é irmã de `cursos`: sobe com `../` e entra em `img/`.' } },
    { titulo: "Escreva os textos alternativos",
      enunciado: 'Escreva o `alt` mais adequado para cada imagem: (1) um ornamento floral entre dois parágrafos; (2) um gráfico de pizza mostrando que 60% dos alunos preferem aulas à noite; (3) o logotipo da escola dentro de um link que leva à página inicial.',
      dica: 'Pergunte: qual informação ou função esta imagem tem?',
      resolucao: { lang: "html", codigo: `
<img src="floral.svg" alt="" width="120" height="16">
<img src="pizza.png" alt="Gráfico de pizza: 60% dos alunos preferem aulas à noite" width="400" height="400">
<a href="index.html"><img src="logo.svg" alt="Página inicial da Escola Exemplo" width="120" height="40"></a>`,
        comentario: '(1) Decorativa: `alt` vazio. (2) Informativa: o texto transmite o dado do gráfico. (3) A imagem é um link, então o `alt` descreve o destino, e não a aparência do logotipo.' } }
  ],
  referencias: [
    { t: "O elemento a (âncora)", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/a", fonte: "MDN Web Docs" },
    { t: "O elemento img", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/img", fonte: "MDN Web Docs" },
    { t: "Tutorial de imagens e texto alternativo", u: "https://www.w3.org/WAI/tutorials/images/", fonte: "W3C WAI" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a3", titulo: "Elementos semânticos e organização do documento", minutos: 50,
  topicos: ["Elementos semânticos", "Organização de documentos"],
  objetivos: [
    "Explicar o que é semântica em HTML e por que ela vale mais que `<div>` para tudo.",
    "Usar `header`, `nav`, `main`, `article`, `section`, `aside` e `footer` nos lugares certos.",
    "Decidir entre `section`, `article` e `div` para agrupar conteúdo.",
    "Organizar uma página institucional com marcos (landmarks) claros."
  ],
  conceito: [
    { h: "O que é semântica" },
    { p: 'Um elemento é **semântico** quando seu nome diz o que o conteúdo é: `<nav>` é navegação, `<footer>` é rodapé. Já `<div>` e `<span>` são **genéricos**: não dizem nada e só servem de gancho para CSS e JavaScript. Uma página feita apenas de `<div>` (a "sopa de divs") parece idêntica na tela, mas é opaca para leitores de tela, buscadores e para quem mantém o código.' },
    { h: "Os elementos de estrutura" },
    { lista: [
      '`<header>`: cabeçalho de uma página **ou** de uma seção/artigo (logotipo, título, introdução).',
      '`<nav>`: bloco de **navegação principal** (menu, índice). Não é para qualquer grupo de links.',
      '`<main>`: conteúdo principal e único da página. Deve haver **apenas um** `<main>` visível por página.',
      '`<article>`: conteúdo independente, que faria sentido sozinho (post, notícia, cartão de produto).',
      '`<section>`: agrupamento temático que normalmente tem um título (`<h2>`...).',
      '`<aside>`: conteúdo tangencial (barra lateral, destaques, anúncios).',
      '`<footer>`: rodapé da página ou de uma seção/artigo (autoria, direitos, links secundários).'
    ] },
    { p: 'Esses elementos formam os **marcos** (*landmarks*) que leitores de tela oferecem como atalhos: "ir para a navegação", "ir para o conteúdo principal". Por isso a estrutura semântica é também uma questão de acessibilidade.' },
    { h: "Section, article ou div?" },
    { lista: [
      'Pergunta 1: o conteúdo é **independente** e faria sentido republicado sozinho? Use `<article>`.',
      'Pergunta 2: é um **agrupamento temático** que merece um título? Use `<section>` com `<h2>`.',
      'Pergunta 3: o agrupamento serve só para estilo ou script? Use `<div>`.'
    ] },
    { h: "Elementos de apoio" },
    { lista: [
      '`<time datetime="2026-11-13">13 de novembro</time>` marca datas e horas de forma legível por máquinas.',
      '`<address>` traz contato do autor ou da página.',
      '`<figure>` e `<figcaption>` ilustram o conteúdo (imagem, código, tabela) com legenda.',
      'Quando houver mais de um `<nav>`, rotule cada um: `<nav aria-label="Principal">`.'
    ] },
    { nota: { t: "Semântica não é aparência", x: 'Escolher `<aside>` porque a caixa fica "do lado" é um engano: o critério é o significado (conteúdo tangencial), não a posição. O CSS posiciona qualquer elemento onde você quiser.' } }
  ],
  exemplos: [
    { titulo: "O esqueleto de uma página institucional", lang: "html", arquivo: "esqueleto.html",
      codigo: `
<body>
  <header>
    <a href="index.html"><img src="img/logo.svg" alt="Escola Exemplo, página inicial" width="120" height="40"></a>
    <nav aria-label="Principal">
      <ul>
        <li><a href="index.html">Início</a></li>
        <li><a href="cursos.html">Cursos</a></li>
        <li><a href="contato.html">Contato</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Escola Exemplo</h1>

    <section>
      <h2>Quem somos</h2>
      <p>Formamos pessoas para o mercado de tecnologia desde 2015.</p>
    </section>

    <section>
      <h2>Notícias</h2>
      <article>
        <h3>Inscrições abertas</h3>
        <p><time datetime="2026-11-13">13 de novembro de 2026</time></p>
        <p>As inscrições para o próximo semestre já estão abertas.</p>
      </article>
    </section>

    <aside>
      <h2>Aviso</h2>
      <p>A secretaria fecha às 17h na sexta-feira.</p>
    </aside>
  </main>

  <footer>
    <address>Rua das Flores, 100 · contato@exemplo.com</address>
    <p>&copy; 2026 Escola Exemplo</p>
  </footer>
</body>`,
      explicacao: [
        'O menu está em `<nav>` com `aria-label`, e as opções, em uma lista: assim o leitor de tela anuncia "navegação, lista com 3 itens".',
        'Há um único `<main>`, e seu conteúdo é diferente do que se repete em todas as páginas (cabeçalho e rodapé).',
        'Cada `<section>` tem um título. A notícia é um `<article>`, pois faz sentido por conta própria.',
        '`<time datetime>` guarda a data no formato `AAAA-MM-DD`, que máquinas entendem.',
        'Quando o código é lido só pelos elementos, o mapa da página aparece: cabeçalho, navegação, principal, aviso lateral e rodapé.'
      ] },
    { titulo: "Sopa de divs e a versão semântica", lang: "html", arquivo: "refatoracao.html",
      codigo: `
<!-- Antes: nada diz o que é cada bloco -->
<div class="topo">
  <div class="menu"><div><a href="/">Início</a></div></div>
</div>
<div class="conteudo">
  <div class="titulo">Bem-vindo</div>
  <div class="texto">Conheça nossos cursos.</div>
</div>
<div class="rodape">Todos os direitos reservados</div>

<!-- Depois: cada elemento descreve o seu papel -->
<header>
  <nav aria-label="Principal"><ul><li><a href="/">Início</a></li></ul></nav>
</header>
<main>
  <h1>Bem-vindo</h1>
  <p>Conheça nossos cursos.</p>
</main>
<footer><p>Todos os direitos reservados</p></footer>`,
      explicacao: [
        'A versão nova é **mais curta** e dispensa as classes que existiam só para dar nome aos blocos.',
        '"Bem-vindo" vira `<h1>` (um título de verdade) e o texto vira `<p>`.',
        'Se o visual tinha de ser preservado, o CSS faz isso: o HTML não deve ser escolhido pela aparência.'
      ] },
    { titulo: "Dois menus na mesma página", lang: "html", arquivo: "dois-navs.html",
      codigo: `
<nav aria-label="Principal">
  <a href="index.html">Início</a> <a href="cursos.html">Cursos</a>
</nav>

<main>
  <h1>Guia de HTML</h1>
  <nav aria-label="Neste guia">
    <ul>
      <li><a href="#titulos">Títulos</a></li>
      <li><a href="#listas">Listas</a></li>
    </ul>
  </nav>
</main>`,
      explicacao: [
        'Os dois blocos são de navegação, mas diferentes: o primeiro leva a outras páginas; o segundo, a trechos desta página.',
        'Os rótulos permitem que o leitor de tela anuncie "Navegação principal" e "Navegação neste guia".'
      ] }
  ],
  erros: [
    { erro: "Montar a página inteira com `<div>`.", porque: "O código fica opaco: sem marcos, sem estrutura e mais difícil de manter.", correcao: "use `<header>`, `<nav>`, `<main>`, `<footer>` e demais elementos antes de recorrer a `<div>`." },
    { erro: "Ter mais de um `<main>` visível ou colocá-lo dentro de `<header>` ou `<footer>`.", porque: "`<main>` representa o conteúdo principal único da página e serve de marco.", correcao: "use um único `<main>` fora de `header`, `footer`, `nav` e `aside`." },
    { erro: "Usar `<section>` sem título, apenas para agrupar.", porque: "Sem título ela perde o sentido temático; é um `<div>` disfarçado.", correcao: "se for só para estilo, use `<div>`; se for um tema, dê-lhe um título." },
    { erro: "Colocar todo grupo de links em `<nav>`.", porque: "Marcos em excesso poluem a navegação de quem usa leitor de tela.", correcao: "reserve `<nav>` para os blocos principais de navegação." },
    { erro: "Escolher o elemento pela posição visual (\"é uma caixa lateral, então `<aside>`\").", porque: "A semântica descreve significado, e não posição.", correcao: "pergunte o que o conteúdo é; o CSS cuida do lugar." }
  ],
  praticas: [
    'Comece sempre pela estrutura: desenhe os blocos e só então escolha os elementos.',
    'Use `<div>` e `<span>` como último recurso, quando nenhum elemento semântico se aplica.',
    'Mantenha apenas um `<h1>` e uma hierarquia de títulos coerente em todo o documento.',
    'Rotule `<nav>` quando houver mais de um e teste a página navegando apenas pelo teclado.'
  ],
  exercicios: [
    { titulo: "Refatore a sopa de divs",
      enunciado: 'Reescreva o trecho usando os elementos semânticos mais adequados.',
      codigo: { lang: "html", x: `
<div id="topo"><div class="logo">Blog Café</div><div class="menu"><a href="/">Início</a> <a href="/sobre">Sobre</a></div></div>
<div id="principal">
  <div class="post"><div class="titulo-post">Como coar um bom café</div><div class="data">13/11/2026</div><div class="texto">Use água a 92 graus.</div></div>
  <div class="lateral">Receitas populares</div>
</div>
<div id="base">Blog Café, 2026</div>` },
      dica: 'O post é independente. A data tem um elemento próprio.',
      resolucao: { lang: "html", codigo: `
<header>
  <p>Blog Café</p>
  <nav aria-label="Principal">
    <a href="/">Início</a> <a href="/sobre">Sobre</a>
  </nav>
</header>
<main>
  <h1>Blog Café</h1>
  <article>
    <h2>Como coar um bom café</h2>
    <p><time datetime="2026-11-13">13/11/2026</time></p>
    <p>Use água a 92 graus.</p>
  </article>
  <aside>
    <h2>Receitas populares</h2>
  </aside>
</main>
<footer><p>Blog Café, 2026</p></footer>`,
        comentario: 'O topo virou `<header>` com `<nav>`; o miolo, `<main>` com um `<article>` (o post faz sentido sozinho) e um `<aside>` (conteúdo complementar). A data usa `<time>` com `datetime`. O rodapé virou `<footer>`. O `<h1>` do `<main>` descreve a página; o título do post é `<h2>`.' } },
    { titulo: "Planeje a estrutura de uma página",
      enunciado: 'Uma página de receita tem: logotipo e menu no topo; título da receita; lista de ingredientes; modo de preparo; uma caixa "Receitas relacionadas" e o rodapé com o nome do autor. Liste, em ordem, o elemento de cada parte.',
      dica: 'Não esqueça de `main` e dos títulos.',
      resolucao: { lang: "", codigo: "",
        comentario: 'Topo: `<header>` com `<nav>`. Conteúdo: `<main>` com `<h1>` (título), `<section>` "Ingredientes" (`<h2>` + `<ul>`), `<section>` "Modo de preparo" (`<h2>` + `<ol>`) e, opcionalmente, o conjunto como `<article>` se a receita puder ser republicada sozinha. "Receitas relacionadas" é `<aside>` com `<h2>`. Autoria e direitos: `<footer>` (com `<address>`, se houver contato).' } }
  ],
  referencias: [
    { t: "O elemento main", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/main", fonte: "MDN Web Docs" },
    { t: "O elemento article", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/article", fonte: "MDN Web Docs" },
    { t: "Tutorial de estrutura de página: regiões", u: "https://www.w3.org/WAI/tutorials/page-structure/regions/", fonte: "W3C WAI" }
  ]
}

] });
