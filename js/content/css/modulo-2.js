/* CSS3 · Módulo 2 — Estilização
   Tópicos: tipografia · backgrounds · bordas · sombras · box model · espaçamento · posicionamento */
AE.Conteudo.modulo("css", 2, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m2a1", titulo: "Tipografia", minutos: 50,
  topicos: ["Tipografia"],
  objetivos: [
    "Definir família, tamanho, peso, estilo e altura de linha de forma legível.",
    "Carregar fontes próprias com `@font-face` e escolher pilhas de fontes seguras.",
    "Controlar alinhamento, decoração, espaçamento e quebra de texto.",
    "Aplicar boas práticas de legibilidade (medida, contraste, ritmo vertical)."
  ],
  conceito: [
    { h: "Propriedades essenciais de fonte" },
    { lista: [
      '`font-family`: lista de fontes por preferência. Termine sempre com uma família genérica (`sans-serif`, `serif`, `monospace`). Nomes com espaço vão entre aspas: `"Open Sans"`.',
      '`font-size`: tamanho. Prefira `rem` para respeitar a preferência do usuário.',
      '`font-weight`: peso (`400` normal, `700` negrito; fontes variáveis aceitam valores intermediários).',
      '`font-style`: `normal`, `italic`, `oblique`.',
      '`line-height`: altura da linha. Para textos corridos, valores entre 1,4 e 1,7 (sem unidade) leem bem.',
      'Atalho `font`: `font: italic 600 1rem/1.5 Georgia, serif;` (a ordem e o `/` importam; use com cautela).'
    ] },
    { h: "Texto: alinhamento e decoração" },
    { lista: [
      '`text-align`: `left`, `right`, `center`, `justify`. Justificado costuma gerar espaços irregulares; prefira `left` em textos longos.',
      '`text-decoration`: `underline`, `line-through`, `none`. **Não remova o sublinhado de links** sem outro indicador claro: só a cor não basta.',
      '`text-transform`: `uppercase`, `capitalize`. Muda a exibição, não o conteúdo.',
      '`letter-spacing` e `word-spacing`: ajustam espaçamento entre letras e palavras.',
      '`text-overflow: ellipsis`, `white-space`, `overflow-wrap`: controle de quebra e truncamento.'
    ] },
    { h: "Fontes próprias com `@font-face`" },
    { p: '`@font-face` registra um arquivo de fonte e dá um nome a ele. O formato recomendado é **WOFF2** (compacto e amplamente suportado). `font-display: swap` mostra o texto com a fonte reserva enquanto a fonte nova carrega, evitando "texto invisível". Hospede arquivos de fonte sob licença que permita o uso (fontes livres como as da licença OFL).' },
    { h: "Pilhas de fontes do sistema" },
    { p: 'Uma alternativa sem baixar nada é usar as fontes do sistema operacional: `font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;`. Carregam instantaneamente e combinam com a interface do usuário.' },
    { nota: { t: "Legibilidade em primeiro lugar", x: 'Mantenha linhas de **45 a 75 caracteres** (`max-width: 65ch`), `line-height` confortável, contraste adequado e tamanho de texto de pelo menos 16px (1rem) no corpo. Evite blocos longos em maiúsculas ou itálico.' } }
  ],
  exemplos: [
    { titulo: "Tipografia de um artigo", lang: "css", arquivo: "tipografia.css",
      codigo: `
body {
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #212529;
}

h1, h2, h3 {
  font-family: Georgia, "Times New Roman", serif;
  line-height: 1.2;          /* títulos pedem linhas mais justas */
  font-weight: 700;
}

h1 { font-size: clamp(2rem, 4vw, 3rem); }
h2 { font-size: 1.5rem; margin-top: 2em; }

.artigo p { max-width: 65ch; }

.legenda {
  font-size: 0.875rem;
  font-style: italic;
  color: #495057;
}

.etiqueta {
  text-transform: uppercase;
  letter-spacing: 0.08em;    /* maiúsculas ficam melhores com um pouco de espaço */
  font-size: 0.75rem;
  font-weight: 600;
}`,
      explicacao: [
        'A fonte do corpo vem da pilha do sistema; os títulos usam uma fonte com serifa para contraste.',
        '`line-height: 1.6` no corpo e `1.2` nos títulos: títulos grandes pedem altura menor.',
        '`max-width: 65ch` mantém a medida da linha confortável.',
        '`letter-spacing` leve em texto maiúsculo melhora a leitura.'
      ] },
    { titulo: "Fonte própria com @font-face", lang: "css", arquivo: "fonte-propria.css",
      codigo: `
@font-face {
  font-family: "Inter";
  src: url("fontes/inter-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;   /* mostra a fonte reserva até a Inter carregar */
}

@font-face {
  font-family: "Inter";
  src: url("fontes/inter-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Inter", system-ui, sans-serif;  /* reserva se o arquivo falhar */
}`,
      explicacao: [
        'Cada `@font-face` registra **uma variação** (peso/estilo) sob o mesmo nome, `"Inter"`.',
        '`src` aponta o arquivo (caminho relativo ao CSS) e declara o formato.',
        '`font-display: swap` evita texto invisível durante o carregamento.',
        'A pilha em `body` mantém fontes reserva (`system-ui`, `sans-serif`) caso o arquivo não carregue.',
        'Os nomes dos arquivos são ilustrativos: use arquivos que você tem licença para usar.'
      ] },
    { titulo: "Controle de texto e truncamento", lang: "css", arquivo: "texto.css",
      codigo: `
/* Link com sublinhado discreto, mas visível */
a {
  color: #1864ab;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
a:hover { text-decoration-thickness: 2px; }

/* Título em uma linha só, com reticências se não couber */
.cartao-titulo {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Quebrar palavras muito longas (URLs, por exemplo) sem estourar o layout */
.comentario { overflow-wrap: anywhere; }

/* Limitar a 3 linhas */
.resumo {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,
      explicacao: [
        '`text-underline-offset` afasta o sublinhado do texto para melhorar a leitura, sem removê-lo.',
        'As três propriedades de `.cartao-titulo` juntas produzem o truncamento com reticências; faltando qualquer uma, não funciona.',
        '`overflow-wrap: anywhere` permite quebrar strings longas.',
        'O limite de linhas usa a sintaxe de prefixo `-webkit-`, hoje suportada por todos os navegadores principais; a propriedade `line-clamp` padrão ainda está se firmando.'
      ] }
  ],
  erros: [
    { erro: "Esquecer a família genérica no fim de `font-family`.", porque: "Se nenhuma fonte listada existir, o navegador escolhe uma padrão qualquer.", correcao: "sempre termine com `sans-serif`, `serif` ou `monospace`." },
    { erro: "Nomes de fonte com espaço sem aspas (`font-family: Open Sans`).", porque: "Pode funcionar em alguns casos, mas é frágil e semanticamente incorreto.", correcao: "use `\"Open Sans\"`." },
    { erro: "Usar tamanho de fonte menor que 14px no corpo do texto.", porque: "Dificulta a leitura, especialmente em telas pequenas.", correcao: "use 1rem (16px) como base." },
    { erro: "Remover o sublinhado dos links sem outra marca.", porque: "Quem não distingue cores não identifica o que é link.", correcao: "mantenha o sublinhado ou outro indicador não baseado só em cor." },
    { erro: "Usar texto justificado em colunas estreitas.", porque: "Gera \"rios\" de espaço branco e atrapalha a leitura.", correcao: "use `text-align: left`." },
    { erro: "Carregar muitos pesos e fontes.", porque: "Cada arquivo adiciona tempo de carregamento.", correcao: "use poucos pesos, formato WOFF2 e `font-display: swap`." }
  ],
  praticas: [
    'Corpo em `1rem` com `line-height` entre 1,5 e 1,7; títulos com `line-height` menor.',
    'Limite a medida da linha a cerca de 65 caracteres.',
    'Use pilhas de fontes com reserva e família genérica final.',
    'Prefira WOFF2 com `font-display: swap`, e confira a licença das fontes.',
    'Não transmita informação apenas por cor ou peso de fonte.'
  ],
  exercicios: [
    { titulo: "Estilize um artigo",
      enunciado: 'Escreva CSS para um artigo: corpo em fonte do sistema, 1rem, `line-height` 1,6; títulos `h1`/`h2` em Georgia (reserva `serif`) com `line-height` 1,2; parágrafos limitados a 65ch e centralizados; links azuis `#1864ab` com sublinhado visível.',
      dica: '`margin-inline: auto` centraliza um bloco com `max-width`.',
      resolucao: { lang: "css", codigo: `
body {
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1, h2 {
  font-family: Georgia, serif;
  line-height: 1.2;
}

p {
  max-width: 65ch;
  margin-inline: auto;
}

a {
  color: #1864ab;
  text-decoration: underline;
}`,
        comentario: 'A medida é limitada por `max-width: 65ch`; `margin-inline: auto` centraliza horizontalmente. O sublinhado foi mantido, o que preserva a identificação dos links.' } },
    { titulo: "Diagnostique o texto",
      enunciado: 'Um site tem texto cinza claro (`#bbb`) de 12px sobre fundo branco, em parágrafos justificados, com links sem sublinhado e da mesma cor do texto. Liste os problemas de legibilidade e proponha correções.',
      dica: 'Contraste, tamanho, alinhamento, identificação dos links.',
      resolucao: { lang: "", codigo: "",
        comentario: '(1) Contraste: `#bbb` sobre branco é cerca de 1,9:1, muito abaixo dos 4,5:1; use `#495057` ou mais escuro. (2) Tamanho: 12px é pequeno; use pelo menos 1rem. (3) Justificado em coluna estreita cria espaços irregulares; use `text-align: left`. (4) Links sem sublinhado e sem cor distinta ficam invisíveis; restaure o sublinhado e use uma cor com bom contraste.' } }
  ],
  referencias: [
    { t: "Estilizando texto: fundamentos", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Text_styling/Fundamentals", fonte: "MDN Web Docs" },
    { t: "@font-face", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/@font-face", fonte: "MDN Web Docs" },
    { t: "Texto legível (WCAG): espaçamento de texto", u: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html", fonte: "W3C WAI" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a2", titulo: "Backgrounds, bordas e sombras", minutos: 50,
  topicos: ["Backgrounds", "Bordas", "Sombras"],
  objetivos: [
    "Aplicar cores, imagens e gradientes de fundo e controlar posição e tamanho.",
    "Usar `border`, `border-radius` e `outline` corretamente.",
    "Criar sombras com `box-shadow` e `text-shadow`, inclusive sombras internas e em camadas.",
    "Garantir que fundos e sombras não prejudiquem o contraste do texto."
  ],
  conceito: [
    { h: "Backgrounds" },
    { lista: [
      '`background-color`: cor de fundo.',
      '`background-image`: imagem (`url("foto.jpg")`) ou gradiente (`linear-gradient(...)`, `radial-gradient(...)`).',
      '`background-repeat`: `no-repeat`, `repeat-x`, `repeat`.',
      '`background-size`: `cover` (cobre toda a área, podendo cortar), `contain` (cabe inteira) ou medidas.',
      '`background-position`: onde a imagem fica (`center`, `top right`, `50% 20%`).',
      '`background`: atalho para vários valores; aceita múltiplas camadas separadas por vírgula (a primeira fica por cima).'
    ] },
    { nota: { t: "Imagem de fundo não tem `alt`", x: 'Imagens colocadas por CSS são **decorativas**: leitores de tela não as descrevem. Se a imagem transmite informação, use `<img>` com `alt` no HTML. Garanta também contraste do texto sobre a imagem (uma camada de gradiente escuro por cima ajuda).' } },
    { h: "Bordas" },
    { lista: [
      '`border: 1px solid #ccc;` define espessura, estilo (`solid`, `dashed`, `dotted`, `none`) e cor. Dá para definir por lado: `border-bottom`.',
      '`border-radius`: arredonda cantos. `50%` em um quadrado produz um círculo; `9999px` produz extremos totalmente arredondados ("pílula").',
      '`outline`: contorno que **não ocupa espaço** e não afeta o layout. É o mecanismo do indicador de foco. `outline-offset` o afasta da borda.'
    ] },
    { h: "Sombras" },
    { p: '`box-shadow: deslocamento-x deslocamento-y desfoque espalhamento cor;`. Exemplo: `0 4px 12px rgb(0 0 0 / 15%)`. A palavra-chave `inset` coloca a sombra por dentro. Várias sombras separadas por vírgula criam profundidade realista (uma pequena e nítida, outra grande e suave). `text-shadow` segue a mesma ideia para texto (sem espalhamento). Sombras não afetam o layout e são desenhadas fora do fluxo.' },
    { p: 'Use com moderação: sombras pesadas distraem, e `blur` alto em muitos elementos pode pesar a renderização em aparelhos modestos.' }
  ],
  exemplos: [
    { titulo: "Fundos: cor, imagem e gradiente", lang: "css", arquivo: "fundos.css",
      codigo: `
.hero {
  min-height: 60vh;
  color: #fff;

  /* camadas: a primeira (gradiente) fica por cima da imagem */
  background-image:
    linear-gradient(rgb(0 0 0 / 55%), rgb(0 0 0 / 55%)),
    url("capa.jpg");
  background-size: cover;       /* preenche a área, cortando o excesso */
  background-position: center;
  background-repeat: no-repeat;
  background-color: #1c1c1c;    /* reserva enquanto a imagem carrega */
}

.faixa {
  background: linear-gradient(90deg, #1971c2, #74c0fc);  /* esquerda → direita */
}

.listrado {
  background-color: #f1f3f5;
  background-image: repeating-linear-gradient(45deg, transparent 0 10px, rgb(0 0 0 / 5%) 10px 20px);
}`,
      explicacao: [
        'O gradiente escuro sobre a imagem garante contraste para o texto branco.',
        '`cover` preenche toda a área; `background-position: center` define qual parte da imagem fica visível.',
        'O `background-color` serve de reserva se a imagem demorar ou falhar.',
        'Gradientes são imagens geradas por CSS e dispensam arquivos externos.'
      ] },
    { titulo: "Bordas, cantos e contorno de foco", lang: "css", arquivo: "bordas.css",
      codigo: `
.cartao {
  border: 1px solid #dee2e6;
  border-radius: 12px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;           /* quadrado vira círculo */
  border: 3px solid #fff;
}

.pilula {
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  background-color: #e7f5ff;
}

.citacao {
  border-left: 4px solid #1971c2;   /* só um lado */
  padding-left: 1rem;
}

.campo:focus-visible {
  outline: 3px solid #1971c2;
  outline-offset: 2px;          /* afasta o contorno e não muda o layout */
}`,
      explicacao: [
        '`border-radius: 50%` só forma círculo se largura e altura forem iguais.',
        '`border` aumenta o tamanho total da caixa (veremos o cálculo no box model); `outline` não.',
        'Bordas definidas só em um lado (`border-left`) são ótimas para destacar citações e avisos.',
        'O contorno do foco com `outline-offset` é visível e não desloca os elementos vizinhos.'
      ] },
    { titulo: "Sombras", lang: "css", arquivo: "sombras.css",
      codigo: `
.cartao {
  /* duas camadas: uma curta e nítida, outra longa e suave */
  box-shadow:
    0 1px 2px rgb(0 0 0 / 12%),
    0 8px 24px rgb(0 0 0 / 10%);
  transition: box-shadow 0.2s ease;
}

.cartao:hover {
  box-shadow:
    0 2px 4px rgb(0 0 0 / 14%),
    0 14px 32px rgb(0 0 0 / 14%);
}

.campo {
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 10%);  /* sombra interna: efeito "afundado" */
}

.titulo-sobre-foto {
  color: #fff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 60%);       /* melhora leitura sobre imagem */
}`,
      explicacao: [
        'As duas camadas de sombra imitam a luz real e ficam mais naturais que uma sombra única.',
        '`inset` cria a sombra por dentro, usada em campos e botões "pressionados".',
        '`text-shadow` ajuda a leitura sobre fotos, mas não substitui o contraste adequado.',
        '`transition` anima a mudança de sombra ao passar o mouse (será visto em detalhes na aula 4.6).'
      ] }
  ],
  erros: [
    { erro: "Usar `background-size: cover` sem definir altura.", porque: "Elementos sem altura colapsam e a imagem não aparece.", correcao: "defina `height`, `min-height` ou preencha o conteúdo." },
    { erro: "Texto sobre imagem sem verificar o contraste.", porque: "Dependendo da região da foto, o texto fica ilegível.", correcao: "adicione uma camada escura (gradiente) ou um fundo sólido atrás do texto." },
    { erro: "Usar imagem de fundo para conteúdo informativo.", porque: "Não existe `alt` para imagens de CSS.", correcao: "use `<img alt=\"...\">` no HTML." },
    { erro: "Esquecer `border-style`.", porque: "`border: 2px red;` (sem estilo) não desenha borda: o estilo padrão é `none`.", correcao: "declare também `solid`, `dashed`..." },
    { erro: "Usar `outline: none` sem substituto.", porque: "Remove o indicador de foco do teclado.", correcao: "mantenha o padrão ou defina um contorno visível." },
    { erro: "Sombras muito grandes e escuras em vários elementos.", porque: "Polui o visual e pode pesar a renderização.", correcao: "use valores suaves e poucas camadas." }
  ],
  praticas: [
    'Sempre defina uma `background-color` de reserva ao usar imagem de fundo.',
    'Use gradiente escuro como camada para garantir contraste de texto sobre imagens.',
    'Use `outline` para o foco e `border` para a decoração.',
    'Prefira sombras suaves em camadas e use-as com moderação.',
    'Verifique o contraste final do texto depois de aplicar fundos.'
  ],
  exercicios: [
    { titulo: "Cartão de produto",
      enunciado: 'Crie as regras de `.produto`: fundo branco, borda `1px solid #dee2e6`, cantos de 12px, sombra suave de duas camadas e, ao passar o mouse, uma sombra um pouco maior. Em `.produto .selo`, crie uma "pílula" com fundo `#fff3bf`, padding `0.25rem 0.75rem` e cantos totalmente arredondados.',
      dica: 'Use `border-radius: 9999px` para a pílula.',
      resolucao: { lang: "css", codigo: `
.produto {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 6px 18px rgb(0 0 0 / 8%);
  transition: box-shadow 0.2s ease;
}

.produto:hover {
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 12px 28px rgb(0 0 0 / 12%);
}

.produto .selo {
  display: inline-block;
  background-color: #fff3bf;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}`,
        comentario: 'A sombra em duas camadas dá profundidade natural e `:hover` intensifica o efeito. `border-radius: 9999px` arredonda totalmente as extremidades. A `transition` suaviza a mudança.' } },
    { titulo: "Hero com texto legível",
      enunciado: 'Escreva as regras de uma seção `.hero` com a imagem `capa.jpg` cobrindo toda a área, centralizada, altura mínima de 50vh, texto branco e garantia de contraste usando uma camada escura de 50% por cima da imagem.',
      dica: 'Duas camadas em `background-image`: gradiente primeiro, `url()` depois.',
      resolucao: { lang: "css", codigo: `
.hero {
  min-height: 50vh;
  color: #fff;
  background-color: #222;
  background-image:
    linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),
    url("capa.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
        comentario: 'A primeira camada (o gradiente de cor uniforme) cobre a foto e escurece-a, o que assegura contraste para o texto branco. `cover` e `center` preenchem e centralizam; `background-color` é a reserva.' } }
  ],
  referencias: [
    { t: "Backgrounds e bordas", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Backgrounds_and_borders", fonte: "MDN Web Docs" },
    { t: "box-shadow", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/box-shadow", fonte: "MDN Web Docs" },
    { t: "Gradientes CSS", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/gradient", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a3", titulo: "Box model e espaçamento", minutos: 55,
  topicos: ["Box Model", "Espaçamento"],
  objetivos: [
    "Descrever as quatro camadas do box model (conteúdo, padding, borda, margem).",
    "Explicar a diferença entre `content-box` e `border-box` e adotar `border-box` como padrão.",
    "Usar `margin` e `padding` com atalhos e valores lógicos, e entender o colapso de margens.",
    "Distinguir elementos `block`, `inline` e `inline-block` quanto ao box model."
  ],
  conceito: [
    { h: "Tudo é uma caixa" },
    { p: 'Para o navegador, cada elemento é uma caixa retangular composta, de dentro para fora, por: **conteúdo** (`width` e `height`), **padding** (espaçamento interno, que mostra o fundo do elemento), **border** (borda) e **margin** (espaçamento externo, sempre transparente).' },
    { h: "`content-box` x `border-box`" },
    { p: 'Por padrão (`box-sizing: content-box`), `width` e `height` medem **só o conteúdo**: um elemento com `width: 300px; padding: 20px; border: 2px solid` ocupa 300 + 40 + 4 = **344px**. Com `box-sizing: border-box`, `width` inclui padding e borda: o elemento ocupa exatamente 300px e o conteúdo encolhe para caber. Isso torna os cálculos de layout previsíveis, e por isso é prática quase universal:' },
    { codigo: { lang: "css", x: `*, *::before, *::after {
  box-sizing: border-box;
}` } },
    { h: "Padding e margin" },
    { lista: [
      'Atalhos: `margin: 10px` (4 lados); `margin: 10px 20px` (vertical | horizontal); `margin: 10px 20px 30px` (topo | horizontal | base); `margin: 10px 20px 30px 40px` (topo, direita, base, esquerda: sentido horário).',
      'Propriedades lógicas (`margin-inline`, `margin-block`, `padding-inline`, `padding-block`) se adaptam ao sentido da escrita.',
      '`margin: 0 auto` (ou `margin-inline: auto`) centraliza horizontalmente um bloco **com largura definida**.',
      'Margens **verticais** adjacentes entre blocos podem **colapsar**: vale a maior das duas, e não a soma. Não acontece com padding, nem em contêineres flex e grid.',
      'Margens negativas puxam o elemento; use raramente.'
    ] },
    { h: "Tipos de exibição e o box model" },
    { lista: [
      '`block` (como `div`, `p`, `h1`): ocupa a largura toda disponível, começa em nova linha e respeita `width`, `height`, `margin` e `padding` nos quatro lados.',
      '`inline` (como `span`, `a`, `strong`): flui com o texto; **ignora** `width` e `height`, e margens/padding verticais não afetam o layout das linhas vizinhas.',
      '`inline-block`: flui como inline, mas aceita `width`, `height` e margens como um bloco.'
    ] },
    { nota: { t: "Dica de depuração", x: 'No painel Elementos das ferramentas de desenvolvimento, selecione um elemento e veja o diagrama do box model (conteúdo, padding, borda e margem com seus valores). Passar o mouse sobre ele destaca cada camada na página.' } },
    { h: "Overflow e dimensões mínimas/máximas" },
    { p: 'Quando o conteúdo é maior que a caixa, ele "transborda". `overflow: hidden` corta, `overflow: auto` adiciona barras de rolagem quando necessário. Prefira `min-height` e `max-width` a `height` e `width` fixos: caixas com altura fixa quebram quando o texto cresce (por exemplo, quando o usuário aumenta a fonte).' }
  ],
  exemplos: [
    { titulo: "O cálculo das caixas", lang: "css", arquivo: "box-model.css",
      codigo: `
/* Padrão: content-box */
.a {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  /* largura total = 300 + 20×2 + 2×2 = 344px */
}

/* border-box: width inclui padding e borda */
.b {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  /* largura total = 300px (conteúdo = 300 - 40 - 4 = 256px) */
}

/* Reset recomendado, no início do CSS */
*, *::before, *::after { box-sizing: border-box; }`,
      explicacao: [
        'Em `.a`, o `width` mede só o conteúdo; padding e borda **somam** à largura final.',
        'Em `.b`, o `width` é a largura total: o conteúdo encolhe para 256px.',
        'O reset com `border-box` em todos os elementos evita contas manuais e estouros de layout.',
        'Incluir os pseudo-elementos `::before` e `::after` no seletor garante que eles sigam a mesma regra.'
      ] },
    { titulo: "Atalhos de margin e padding e centralização", lang: "css", arquivo: "espacamento.css",
      codigo: `
.exemplo-1 { margin: 16px; }                     /* os 4 lados */
.exemplo-2 { margin: 16px 32px; }                /* vertical 16 | horizontal 32 */
.exemplo-3 { margin: 8px 16px 24px; }            /* topo 8 | laterais 16 | base 24 */
.exemplo-4 { margin: 8px 16px 24px 32px; }       /* topo, direita, base, esquerda */

.container {
  width: min(100% - 2rem, 60rem);   /* nunca passa de 60rem, e deixa 1rem de cada lado */
  margin-inline: auto;              /* centraliza horizontalmente */
  padding-block: 2rem;              /* espaço em cima e embaixo */
}

.cartao {
  padding: 1rem 1.5rem;
}

.cartao + .cartao {
  margin-top: 1rem;                 /* espaço apenas ENTRE cartões */
}`,
      explicacao: [
        'A ordem dos 4 valores é horária: topo, direita, base, esquerda.',
        '`margin-inline: auto` só centraliza porque o contêiner tem **largura definida**.',
        '`min()` limita a largura máxima sem precisar de `max-width` e de uma regra a mais.',
        'O seletor `.cartao + .cartao` aplica margem apenas entre irmãos, e evita sobra de espaço no último item.'
      ] },
    { titulo: "Colapso de margens e display", lang: "html", arquivo: "colapso.html",
      codigo: `
<style>
  .caixa { background: #e7f5ff; }
  .p1 { margin-bottom: 40px; }
  .p2 { margin-top: 20px; }
  /* Entre .p1 e .p2 o espaço será 40px (a maior), e NÃO 60px */

  .pai { background: #fff3bf; }
  .pai > p { margin-top: 30px; }
  /* A margem do filho "vaza" pelo pai e empurra o pai para baixo.
     Evitar: padding no pai, ou display: flow-root no pai. */
  .contem { display: flow-root; background: #d3f9d8; }
  .contem > p { margin-top: 30px; }   /* agora a margem fica DENTRO do pai */

  .em-linha { display: inline-block; width: 120px; height: 40px; background: #ffe3e3; }
</style>

<div class="caixa"><p class="p1">Parágrafo 1</p><p class="p2">Parágrafo 2</p></div>
<div class="pai"><p>Margem que vaza</p></div>
<div class="contem"><p>Margem contida</p></div>
<span class="em-linha">inline-block</span>`,
      explicacao: [
        'Margens verticais adjacentes entre blocos colapsam: o espaço é a **maior** margem (40px), não a soma.',
        'A margem do primeiro filho pode "vazar" para fora do pai sem borda nem padding. Uma solução simples é `display: flow-root` no pai.',
        '`inline-block` permite largura e altura em um elemento que flui na linha.',
        'Em contêineres `flex` e `grid` as margens **não** colapsam (assunto do módulo 3).'
      ] }
  ],
  erros: [
    { erro: "Somar `width: 100%` com padding e borda sem `border-box`.", porque: "A caixa passa de 100% e provoca barra de rolagem horizontal.", correcao: "use `box-sizing: border-box`." },
    { erro: "Dar `width` a um `<span>` e esperar que funcione.", porque: "Elementos `inline` ignoram `width` e `height`.", correcao: "use `display: inline-block` ou `block`." },
    { erro: "Centralizar com `margin: 0 auto` sem definir largura.", porque: "O bloco já ocupa 100% da largura: não há espaço para dividir.", correcao: "defina `width`, `max-width` ou `inline-size`." },
    { erro: "Esperar que duas margens verticais somem.", porque: "Margens verticais adjacentes colapsam.", correcao: "use `padding`, `gap` (flex/grid) ou uma só margem." },
    { erro: "Altura fixa em `px` para caixas com texto.", porque: "O texto transborda quando a fonte aumenta ou o conteúdo é maior.", correcao: "use `min-height` ou deixe a altura automática." },
    { erro: "Usar `margin` para criar espaço interno.", porque: "O fundo e a borda do elemento não acompanham.", correcao: "use `padding` para espaço interno e `margin` para espaço externo." }
  ],
  praticas: [
    'Adote `box-sizing: border-box` globalmente desde o início.',
    'Use `padding` para espaço interno e `margin` para o externo.',
    'Prefira `min-height` e `max-width` a dimensões fixas.',
    'Use propriedades lógicas (`margin-inline`, `padding-block`) em projetos novos.',
    'Confira o box model no painel Elementos ao depurar espaçamentos.'
  ],
  exercicios: [
    { titulo: "Calcule o tamanho real",
      enunciado: 'Um elemento tem `width: 200px; height: 100px; padding: 10px 20px; border: 5px solid; margin: 15px;`. Qual o tamanho total ocupado na página (largura × altura, incluindo margens) com (a) `content-box` e (b) `border-box`?',
      dica: 'Largura: conteúdo + padding horizontal×2 + borda×2 + margem×2.',
      resolucao: { lang: "txt", codigo: `(a) content-box:
   largura da caixa = 200 + 20×2 + 5×2 = 250px;  com margens: 250 + 15×2 = 280px
   altura da caixa  = 100 + 10×2 + 5×2 = 130px;  com margens: 130 + 15×2 = 160px
   Total: 280 × 160

(b) border-box:
   largura da caixa = 200px (já inclui padding e borda);  com margens: 230px
   altura da caixa  = 100px;  com margens: 130px
   Total: 230 × 130`,
        comentario: 'Em `content-box`, padding e borda se somam ao conteúdo. Em `border-box`, `width` e `height` já os incluem, restando só a margem como acréscimo externo.' } },
    { titulo: "Centralize e espace",
      enunciado: 'Escreva as regras para um `.container` com largura máxima de 60rem (ocupando menos se a tela for menor, com 1rem de respiro em cada lado), centralizado, com 2rem de padding em cima e embaixo; e para `.cartao` com padding 1rem 1.5rem e 1rem de espaço apenas ENTRE cartões consecutivos.',
      dica: '`min()`, `margin-inline: auto`, `.cartao + .cartao`.',
      resolucao: { lang: "css", codigo: `
*, *::before, *::after { box-sizing: border-box; }

.container {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
  padding-block: 2rem;
}

.cartao {
  padding: 1rem 1.5rem;
}

.cartao + .cartao {
  margin-top: 1rem;
}`,
        comentario: '`width: min(100% - 2rem, 60rem)` resolve respiro lateral e largura máxima em uma linha. `margin-inline: auto` centraliza (há largura definida). O seletor `+` cria espaço só entre irmãos consecutivos, sem sobra no fim.' } }
  ],
  referencias: [
    { t: "O modelo de caixa", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Box_model", fonte: "MDN Web Docs" },
    { t: "Colapso de margens", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing", fonte: "MDN Web Docs" },
    { t: "CSS Box Model Module Level 3", u: "https://www.w3.org/TR/css-box-3/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a4", titulo: "Posicionamento", minutos: 50,
  topicos: ["Posicionamento"],
  objetivos: [
    "Explicar o fluxo normal e como a propriedade `position` o altera.",
    "Usar `relative`, `absolute`, `fixed` e `sticky` nos casos adequados.",
    "Controlar a sobreposição com `z-index` e entender os contextos de empilhamento.",
    "Evitar o uso de posicionamento para construir layouts que flex e grid resolvem melhor."
  ],
  conceito: [
    { h: "Fluxo normal" },
    { p: 'Sem regras especiais, os elementos seguem o **fluxo normal**: blocos empilham de cima para baixo e elementos em linha fluem junto ao texto. A propriedade `position` permite tirar um elemento desse fluxo, ou deslocá-lo dentro dele.' },
    { h: "Os valores de `position`" },
    { lista: [
      '`static` (padrão): fluxo normal; `top`, `left`, `z-index` não têm efeito.',
      '`relative`: continua no fluxo (o espaço original é mantido), mas pode ser deslocado com `top/right/bottom/left`. Sua principal função é servir de **referência** para filhos `absolute`.',
      '`absolute`: sai do fluxo; é posicionado em relação ao ancestral **posicionado** mais próximo (o primeiro com `position` diferente de `static`). Se não houver, usa a página.',
      '`fixed`: sai do fluxo e fica fixo em relação à janela (viewport), mesmo com rolagem. Usado em barras e botões flutuantes.',
      '`sticky`: híbrido. Comporta-se como `relative` até atingir um limite de rolagem (`top: 0`, por exemplo) e então "gruda". Só funciona dentro do contêiner pai, e nenhum ancestral pode ter `overflow` que o impeça de rolar.'
    ] },
    { h: "`z-index` e empilhamento" },
    { p: '`z-index` define quem fica na frente quando elementos posicionados se sobrepõem (maior vale mais). Só funciona em elementos posicionados (ou itens de flex/grid). Cada **contexto de empilhamento** (criado por `position` com `z-index`, `opacity < 1`, `transform` e outros) isola seus filhos: um `z-index: 9999` dentro de um contexto não passa por cima de um irmão do contexto pai com valor maior. Mantenha uma escala pequena e organizada, por exemplo, em variáveis (`--z-menu: 100`, `--z-modal: 200`).' },
    { h: "Quando usar (e quando não)" },
    { p: 'Posicionamento é ótimo para **sobreposições**: selos sobre imagens, menus suspensos, modais, tooltips, cabeçalhos fixos. **Não** use `absolute` para montar o layout da página em colunas: `flexbox` e `grid` (módulo 3) são mais robustos, responsivos e acessíveis.' },
    { nota: { t: "Cuidado com `fixed` e acessibilidade", x: 'Cabeçalhos `fixed` altos cobrem conteúdo e, em telas pequenas, deixam pouco espaço. Se um elemento fixo cobre o campo que recebe o foco, o usuário de teclado perde a referência. Use `scroll-margin-top` nas âncoras para compensar a altura do cabeçalho fixo.' } }
  ],
  exemplos: [
    { titulo: "Selo sobre um cartão (relative + absolute)", lang: "css", arquivo: "selo.css",
      codigo: `
.cartao {
  position: relative;          /* vira a referência dos filhos absolutos */
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1rem;
}

.cartao .selo {
  position: absolute;          /* sai do fluxo */
  top: -10px;                  /* 10px acima da borda superior do cartão */
  right: 12px;
  background-color: #d9480f;
  color: #fff;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
}`,
      explicacao: [
        '`position: relative` no `.cartao` não muda seu lugar: apenas o torna a referência para o selo.',
        'Sem isso, o selo se posicionaria em relação à página (ou ao próximo ancestral posicionado).',
        '`top` negativo deixa o selo "pendurado" para fora do cartão.',
        'Como o selo saiu do fluxo, ele não ocupa espaço dentro do cartão.'
      ] },
    { titulo: "Cabeçalho fixo e sticky", lang: "css", arquivo: "fixo-sticky.css",
      codigo: `
:root { --altura-cabecalho: 4rem; --z-cabecalho: 100; }

.cabecalho {
  position: sticky;            /* gruda ao rolar */
  top: 0;
  height: var(--altura-cabecalho);
  background-color: #fff;
  box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
  z-index: var(--z-cabecalho);
}

/* Âncoras não ficam escondidas atrás do cabeçalho */
:target, h2[id] { scroll-margin-top: calc(var(--altura-cabecalho) + 1rem); }

.voltar-ao-topo {
  position: fixed;             /* fica na janela */
  right: 1rem;
  bottom: 1rem;
}

.indice {
  position: sticky;            /* índice lateral que acompanha a leitura */
  top: calc(var(--altura-cabecalho) + 1rem);
}`,
      explicacao: [
        '`sticky` com `top: 0` faz o cabeçalho acompanhar a rolagem, sem sair do fluxo antes do ponto de fixação.',
        '`scroll-margin-top` compensa o cabeçalho para que o título de destino não fique coberto ao clicar em um link âncora.',
        '`fixed` posiciona em relação à janela: o botão permanece visível.',
        'O `z-index` vem de uma variável: uma escala central evita "guerras" de números altos.'
      ] },
    { titulo: "Modal simples e empilhamento", lang: "css", arquivo: "modal.css",
      codigo: `
.fundo-modal {
  position: fixed;
  inset: 0;                      /* top, right, bottom, left = 0: cobre a janela */
  background-color: rgb(0 0 0 / 50%);
  display: grid;
  place-items: center;           /* centraliza o conteúdo (grid, módulo 3) */
  z-index: 200;
}

.modal {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: min(90vw, 32rem);
}

/* Contexto de empilhamento: o z-index do filho só vale DENTRO do pai */
.pai { position: relative; z-index: 1; }
.pai .filho { position: absolute; z-index: 9999; }
/* O .filho nunca passa por cima de outro elemento com z-index maior que 1 fora do .pai */`,
      explicacao: [
        '`inset: 0` é o atalho de `top/right/bottom/left: 0` e faz o fundo cobrir toda a janela.',
        'A centralização com grid será estudada no módulo 3.',
        'Em um modal real, também é necessário gerenciar o foco e o fechamento por `Esc`: o elemento `<dialog>` já traz isso pronto.',
        '`z-index: 9999` não garante nada se o pai criou um contexto de empilhamento com valor baixo.'
      ] }
  ],
  erros: [
    { erro: "Usar `absolute` sem um ancestral `relative`.", porque: "O elemento se posiciona em relação à página inteira, e aparece em lugar inesperado.", correcao: "coloque `position: relative` no contêiner que serve de referência." },
    { erro: "Montar o layout em colunas com `position: absolute`.", porque: "Os elementos saem do fluxo, o pai colapsa e o layout quebra em telas diferentes.", correcao: "use `flexbox` ou `grid`." },
    { erro: "`sticky` que não gruda.", porque: "Faltou definir `top` (ou outro limite), ou algum ancestral tem `overflow` diferente de `visible`.", correcao: "defina `top` e verifique `overflow` nos ancestrais." },
    { erro: "Escalar `z-index` para valores como 99999.", porque: "Vira uma corrida difícil de manter e não ultrapassa contextos de empilhamento.", correcao: "use uma escala pequena e variáveis; entenda os contextos." },
    { erro: "Esperar que `z-index` funcione em elementos `static`.", porque: "Só atua em elementos posicionados e itens de flex/grid.", correcao: "defina `position` (por exemplo, `relative`)." },
    { erro: "Cabeçalho `fixed` cobrindo o conteúdo no topo.", porque: "O primeiro conteúdo fica escondido, porque o elemento fixo saiu do fluxo.", correcao: "use `sticky`, ou compense com `padding-top`/`scroll-margin-top`." }
  ],
  praticas: [
    'Use `relative` + `absolute` para sobreposições pontuais e `sticky` para elementos que acompanham a rolagem.',
    'Evite posicionamento para layout geral: use flex e grid.',
    'Centralize os valores de `z-index` em variáveis.',
    'Teste com o teclado e com zoom: elementos fixos não devem tapar conteúdo nem foco.',
    'Prefira `<dialog>` e `popover` nativos a modais feitos à mão, sempre que possível.'
  ],
  exercicios: [
    { titulo: "Selo \"Novo\"",
      enunciado: 'Escreva o CSS para que um elemento `.novo` apareça no canto superior direito de `.produto`, 8px para dentro das bordas superior e direita, fundo `#2b8a3e`, texto branco e padding `2px 8px`.',
      dica: 'O pai precisa ser referência de posicionamento.',
      resolucao: { lang: "css", codigo: `
.produto {
  position: relative;
}

.produto .novo {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #2b8a3e;
  color: #fff;
  padding: 2px 8px;
}`,
        comentario: '`.produto` vira a referência com `position: relative`; `.novo` sai do fluxo e é posicionado por `top`/`right` em relação ao pai.' } },
    { titulo: "Por que não gruda?",
      enunciado: 'Um cabeçalho com `position: sticky;` não gruda ao rolar. O CSS é `header { position: sticky; background: #fff; }` e o pai direto do cabeçalho é um `div` com `overflow: hidden`. Aponte os dois problemas.',
      dica: 'Limite de rolagem e overflow.',
      resolucao: { lang: "css", codigo: `
header {
  position: sticky;
  top: 0;              /* faltava o limite */
  background: #fff;
  z-index: 100;        /* para ficar acima do conteúdo que rola */
}

/* e no pai, trocar overflow: hidden por overflow: visible (ou remover),
   ou usar overflow: clip */`,
        comentario: '(1) `sticky` precisa de um limite (`top: 0`) para saber quando grudar. (2) Um ancestral com `overflow: hidden` (ou `auto`/`scroll`) vira o contêiner de rolagem do `sticky`, e ele deixa de acompanhar a rolagem da janela. O `z-index` evita que o conteúdo passe por cima do cabeçalho.' } }
  ],
  referencias: [
    { t: "Posicionamento", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Positioning", fonte: "MDN Web Docs" },
    { t: "position", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/position", fonte: "MDN Web Docs" },
    { t: "Contexto de empilhamento", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context", fonte: "MDN Web Docs" }
  ]
}

] });
