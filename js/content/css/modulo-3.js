/* CSS3 · Módulo 3 — Layouts
   Tópicos: display · flexbox · grid · alinhamento · distribuição · organização de componentes */
AE.Conteudo.modulo("css", 3, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m3a1", titulo: "Display e fluxo de layout", minutos: 40,
  topicos: ["Display"],
  objetivos: [
    "Explicar o papel da propriedade `display` na forma como um elemento participa do layout.",
    "Distinguir `block`, `inline`, `inline-block`, `none`, `flex` e `grid`.",
    "Diferenciar `display: none`, `visibility: hidden` e o atributo `hidden`.",
    "Escolher a ferramenta de layout correta (fluxo normal, flex ou grid) para cada situação."
  ],
  conceito: [
    { h: "O que `display` decide" },
    { p: 'A propriedade `display` define dois aspectos de um elemento: como **ele próprio** se comporta no fluxo (como bloco ou em linha) e como **os seus filhos** são organizados (fluxo normal, flex, grid). É por isso que `display: flex` transforma um elemento em um "contêiner flex" ao mesmo tempo em que ele continua ocupando a largura toda, como um bloco.' },
    { h: "Principais valores" },
    { lista: [
      '`block`: ocupa a linha inteira; respeita largura, altura e margens.',
      '`inline`: flui com o texto; ignora largura e altura.',
      '`inline-block`: flui como texto, mas aceita largura, altura e margens.',
      '`flex` e `inline-flex`: contêiner de layout em **uma dimensão** (linha ou coluna).',
      '`grid` e `inline-grid`: contêiner de layout em **duas dimensões** (linhas e colunas).',
      '`flow-root`: cria um novo contexto de formatação de bloco (contém margens e flutuações).',
      '`contents`: o elemento "desaparece" e seus filhos passam a participar do layout do avô. Use com cautela: pode afetar a acessibilidade de alguns elementos.',
      '`none`: remove o elemento do layout **e** da árvore de acessibilidade.'
    ] },
    { h: "Esconder elementos: três formas diferentes" },
    { lista: [
      '`display: none`: não aparece, não ocupa espaço e leitores de tela o ignoram.',
      '`visibility: hidden`: não aparece, mas **continua ocupando espaço**; também é ignorado por leitores de tela.',
      '`hidden` (atributo HTML): equivale a `display: none` por padrão do navegador.',
      'Para esconder só visualmente, mas manter para leitores de tela (rótulos de ícones, por exemplo), usa-se a técnica "somente leitor de tela" (`.sr-only`), com `position: absolute`, tamanho de 1px e `overflow: hidden`.'
    ] },
    { h: "Que ferramenta usar?" },
    { lista: [
      '**Fluxo normal**: texto, parágrafos e blocos simples empilhados.',
      '**Flexbox**: barras de navegação, linhas de botões, cartões lado a lado, centralização, alinhar itens em **uma** direção.',
      '**Grid**: layouts de página, galerias, qualquer organização em **linhas e colunas** simultâneas.',
      'Elas se combinam: um grid de página contendo componentes flex, por exemplo.'
    ] },
    { nota: { t: "Floats e tabelas de layout", x: '`float` foi usado por muito tempo para criar colunas, mas hoje serve apenas para fazer o texto contornar uma imagem. Tabelas para layout são um erro de semântica. Para layouts, use flex e grid.' } }
  ],
  exemplos: [
    { titulo: "Comparando os valores de display", lang: "html", arquivo: "display.html",
      codigo: `
<style>
  .caixa { background: #e7f5ff; border: 1px solid #1971c2; padding: 4px; margin: 4px; }
  .bloco        { display: block; }
  .linha        { display: inline; }          /* ignora width e height */
  .linha-bloco  { display: inline-block; width: 120px; height: 40px; }
  .oculto-1     { display: none; }            /* some e não ocupa espaço */
  .oculto-2     { visibility: hidden; }       /* some, mas mantém o espaço */
</style>

<div class="caixa bloco">block: ocupa a linha toda</div>
<span class="caixa linha">inline</span>
<span class="caixa linha">inline</span>
<span class="caixa linha-bloco">inline-block</span>
<p>Antes</p>
<p class="oculto-1">display: none</p>
<p class="oculto-2">visibility: hidden</p>
<p>Depois</p>`,
      explicacao: [
        'O `block` ocupa a linha toda; os `inline` ficam lado a lado e ignoram dimensões; o `inline-block` aceita largura e altura.',
        'Entre "Antes" e "Depois", o `display: none` não deixa vestígio; o `visibility: hidden` deixa um espaço em branco do tamanho do parágrafo.',
        'Abra a página e inspecione cada elemento para ver o box model resultante.'
      ] },
    { titulo: "Texto visível só para leitor de tela", lang: "css", arquivo: "sr-only.css",
      codigo: `
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* Uso (HTML):
   <button type="button">
     <svg aria-hidden="true">...</svg>
     <span class="sr-only">Abrir menu</span>
   </button>
*/`,
      explicacao: [
        'O texto continua na árvore de acessibilidade, mas não ocupa espaço visual.',
        '`display: none` **não** serviria: ele remove o texto para leitores de tela também.',
        'O ícone SVG leva `aria-hidden="true"` para não ser anunciado, e o `span` oferece o nome do botão.',
        'Alternativamente, o atributo `aria-label` no botão resolve casos simples.'
      ] },
    { titulo: "Escolhendo a ferramenta", lang: "css", arquivo: "ferramentas.css",
      codigo: `
/* Página: grid em duas dimensões */
.pagina {
  display: grid;
  grid-template-columns: 16rem 1fr;
  min-height: 100vh;
}

/* Barra de navegação: flex em uma dimensão */
.barra {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Texto simples: fluxo normal, sem display especial */
.artigo p { max-width: 65ch; }`,
      explicacao: [
        'Layout de página com colunas fixas e fluidas: **grid**.',
        'Itens em fila com espaçamento: **flex**.',
        'Parágrafos de texto não precisam de nada especial: o fluxo normal já resolve.',
        'Os detalhes de `flex` e `grid` vêm nas próximas aulas.'
      ] }
  ],
  erros: [
    { erro: "Usar `display: none` para esconder texto que leitores de tela deveriam ler.", porque: "O conteúdo some da árvore de acessibilidade.", correcao: "use a técnica `.sr-only`." },
    { erro: "Aplicar `display: flex` em um elemento e esperar efeito nos netos.", porque: "O `display` afeta os filhos **diretos**.", correcao: "aplique `flex` ou `grid` ao pai direto dos itens (ou aninhe contêineres)." },
    { erro: "Usar `display: inline` e depois definir `width`/`height`.", porque: "Dimensões são ignoradas em `inline`.", correcao: "use `inline-block` ou `block`." },
    { erro: "Montar layouts de página com `float`.", porque: "É frágil e exige correções (`clearfix`).", correcao: "use grid ou flex." },
    { erro: "Abusar de `display: contents`.", porque: "Pode remover semântica de elementos como botões e listas em alguns navegadores.", correcao: "use só em contêineres sem papel semântico próprio, e teste." }
  ],
  praticas: [
    'Escolha flex para uma dimensão e grid para duas.',
    'Combine as duas ferramentas em vez de forçar uma a fazer tudo.',
    'Use `hidden` ou `display: none` quando o conteúdo realmente deve sair da página (inclusive para leitores de tela).',
    'Teste `visibility: hidden` e `.sr-only` para casos específicos.'
  ],
  exercicios: [
    { titulo: "Escolha o recurso",
      enunciado: 'Indique a melhor ferramenta (fluxo normal, flex ou grid) para cada caso: (a) menu horizontal com logo à esquerda e links à direita; (b) galeria de fotos em 3 colunas que se ajusta ao tamanho da tela; (c) parágrafos de um artigo; (d) cabeçalho, barra lateral, conteúdo e rodapé de uma página; (e) centralizar um ícone dentro de um botão.',
      dica: 'Uma dimensão x duas dimensões.',
      resolucao: { lang: "txt", codigo: `(a) flex  (justify-content: space-between ou margin-left: auto no primeiro link)
(b) grid  (repeat(auto-fit, minmax(...)))
(c) fluxo normal
(d) grid  (áreas nomeadas ou colunas e linhas)
(e) flex  (ou grid com place-items: center)`,
        comentario: 'Menus, filas de itens e centralização de um item são casos clássicos de uma dimensão (flex). Galerias e layouts de página são bidimensionais (grid). Texto corrido não precisa de nada especial.' } },
    { titulo: "Escondendo corretamente",
      enunciado: 'Qual técnica usar em cada caso: (a) um painel que o usuário abre/fecha e deve sumir por completo quando fechado; (b) um espaço reservado que deve manter o tamanho enquanto o conteúdo carrega; (c) um rótulo de ícone que só leitores de tela devem ouvir.',
      dica: 'Pense em espaço ocupado e em leitores de tela.',
      resolucao: { lang: "txt", codigo: `(a) display: none (ou atributo hidden)
(b) visibility: hidden
(c) classe .sr-only (ou aria-label no botão)`,
        comentario: '(a) `display: none` remove do layout e da árvore de acessibilidade. (b) `visibility: hidden` preserva o espaço. (c) o texto precisa continuar acessível a tecnologias assistivas, sem aparecer.' } }
  ],
  referencias: [
    { t: "display", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/display", fonte: "MDN Web Docs" },
    { t: "Introdução a layouts CSS", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Introduction", fonte: "MDN Web Docs" },
    { t: "Fluxo normal", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Normal_Flow", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a2", titulo: "Flexbox, alinhamento e distribuição", minutos: 65,
  topicos: ["Flexbox", "Alinhamento", "Distribuição"],
  objetivos: [
    "Criar um contêiner flex e entender os eixos principal e transversal.",
    "Usar `justify-content`, `align-items`, `gap`, `flex-wrap` e `flex-direction`.",
    "Controlar o tamanho dos itens com `flex-grow`, `flex-shrink`, `flex-basis` e o atalho `flex`.",
    "Resolver padrões comuns: barra de navegação, centralização, cartões que quebram de linha, rodapé colado ao fim."
  ],
  conceito: [
    { h: "O modelo flex" },
    { p: 'Ao aplicar `display: flex` a um elemento (o **contêiner**), seus filhos diretos (os **itens**) passam a ser dispostos ao longo de um **eixo principal**, e alinhados em um **eixo transversal**, perpendicular a ele. Por padrão, o eixo principal é horizontal (`flex-direction: row`), e o transversal é vertical. Se a direção for `column`, os eixos se invertem.' },
    { h: "Propriedades do contêiner" },
    { lista: [
      '`flex-direction`: `row` (padrão), `row-reverse`, `column`, `column-reverse`.',
      '`flex-wrap`: `nowrap` (padrão: os itens encolhem para caber), `wrap` (quebram em novas linhas).',
      '`justify-content`: distribui os itens no eixo **principal** (`flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`).',
      '`align-items`: alinha os itens no eixo **transversal** (`stretch` padrão, `center`, `flex-start`, `flex-end`, `baseline`).',
      '`align-content`: distribui as **linhas** quando há quebra.',
      '`gap` (`row-gap`, `column-gap`): espaço entre itens, sem margens extras nas pontas.'
    ] },
    { h: "Propriedades dos itens" },
    { lista: [
      '`flex-basis`: tamanho inicial no eixo principal (antes de crescer ou encolher).',
      '`flex-grow`: quanto o item **cresce** para ocupar o espaço livre (proporção). `0` não cresce.',
      '`flex-shrink`: quanto **encolhe** quando falta espaço. `0` impede o encolhimento.',
      '`flex`: atalho `grow shrink basis`. `flex: 1` equivale a `1 1 0%`: divide o espaço livre igualmente. `flex: none` equivale a `0 0 auto`.',
      '`align-self`: sobrescreve o `align-items` para um item.',
      '`order`: altera a ordem **visual**. Cuidado: não altera a ordem de foco do teclado; evite quando a ordem lógica importa.',
      '`margin-left: auto` em um item o empurra para o fim do eixo principal (excelente para separar o grupo de links à direita).'
    ] },
    { nota: { t: "`min-width: 0` e textos longos", x: 'Itens flex têm, por padrão, `min-width: auto`, o que impede que encolham abaixo do tamanho do conteúdo. Se um item com texto longo (ou uma URL) estoura o contêiner, adicione `min-width: 0` ao item e controle a quebra com `overflow-wrap`.' } }
  ],
  exemplos: [
    { titulo: "Barra de navegação", lang: "css", arquivo: "barra.css",
      codigo: `
.barra {
  display: flex;
  align-items: center;          /* centraliza verticalmente */
  gap: 1rem;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
}

.barra .logo { font-weight: 700; }

.barra .busca { margin-left: auto; }  /* empurra este item e os seguintes para a direita */

/* HTML:
<nav class="barra">
  <a class="logo" href="/">Escola</a>
  <a href="/cursos">Cursos</a>
  <a href="/contato">Contato</a>
  <form class="busca">...</form>
</nav>
*/`,
      explicacao: [
        '`display: flex` coloca logo e links em uma linha.',
        '`align-items: center` alinha-os verticalmente pelo centro.',
        '`gap` cria o espaço entre eles sem margens individuais.',
        '`margin-left: auto` consome todo o espaço livre à esquerda do item e o leva para a direita.'
      ] },
    { titulo: "Centralização e cartões que quebram de linha", lang: "css", arquivo: "flex-cartoes.css",
      codigo: `
/* Centralizar algo no meio da área */
.centro {
  display: flex;
  justify-content: center;   /* eixo principal (horizontal) */
  align-items: center;       /* eixo transversal (vertical) */
  min-height: 50vh;
}

/* Cartões lado a lado que quebram para a linha seguinte */
.lista-cartoes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.lista-cartoes > .cartao {
  flex: 1 1 16rem;           /* cresce, encolhe, base de 16rem */
  /* Cada cartão tem pelo menos ~16rem; se couber mais, eles dividem o espaço livre */
}`,
      explicacao: [
        '`justify-content` atua no eixo principal e `align-items` no transversal: juntos, centralizam nos dois sentidos.',
        '`flex: 1 1 16rem` significa: base de 16rem, pode crescer e pode encolher.',
        'Com `flex-wrap: wrap`, quando não cabe mais um cartão na linha, ele passa para a linha seguinte.',
        'A última linha pode ficar com cartões mais largos que os das anteriores: para colunas rígidas, o grid é mais adequado.'
      ] },
    { titulo: "Rodapé no fim da página e colunas", lang: "css", arquivo: "flex-pagina.css",
      codigo: `
/* Rodapé sempre no fim da janela, mesmo com pouco conteúdo */
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;    /* eixo principal vertical */
}

main { flex: 1; }            /* ocupa todo o espaço livre; empurra o rodapé para baixo */

/* Barra lateral de largura fixa + conteúdo flexível */
.com-lateral { display: flex; gap: 1.5rem; }
.com-lateral > aside { flex: 0 0 15rem; }   /* não cresce, não encolhe, 15rem */
.com-lateral > section { flex: 1; min-width: 0; }  /* ocupa o resto; min-width evita estouro */`,
      explicacao: [
        'Com `flex-direction: column`, o `main` com `flex: 1` toma a altura que sobra e empurra o rodapé para o fim.',
        '`flex: 0 0 15rem` fixa a barra lateral em 15rem.',
        '`min-width: 0` permite que o conteúdo encolha mesmo com conteúdo largo (código, tabelas, URLs).',
        'Para dispor de forma responsiva, nesse padrão, é comum usar `flex-wrap` ou uma media query (módulo 4).'
      ] }
  ],
  erros: [
    { erro: "Confundir `justify-content` com `align-items`.", porque: "Eles atuam em eixos diferentes, e o eixo principal muda com `flex-direction`.", correcao: "identifique primeiro qual é o eixo principal." },
    { erro: "Aplicar propriedades de item (`flex: 1`) ao contêiner.", porque: "`flex` vale para os **filhos**; o contêiner usa `display: flex`.", correcao: "coloque `flex` nos itens." },
    { erro: "Esquecer o `flex-wrap`.", porque: "Por padrão os itens encolhem em vez de quebrar linha, e ficam espremidos.", correcao: "use `flex-wrap: wrap` e defina `flex-basis`." },
    { erro: "Usar margens em vez de `gap`.", porque: "Gera espaço extra na primeira ou na última posição.", correcao: "use `gap`." },
    { erro: "Usar `order` para reorganizar o conteúdo.", porque: "A ordem visual diverge da ordem do teclado e dos leitores de tela.", correcao: "reordene o HTML." },
    { erro: "Item com texto longo estourando o contêiner.", porque: "`min-width: auto` impede o encolhimento.", correcao: "use `min-width: 0` no item e `overflow-wrap: anywhere` no texto." }
  ],
  praticas: [
    'Pense primeiro em eixos: principal e transversal.',
    'Use `gap` para espaçamento entre itens.',
    'Defina o tamanho dos itens com `flex` (atalho) em vez das três propriedades isoladas.',
    'Use `margin: auto` para empurrar itens específicos.',
    'Não use `order` para alterar a ordem lógica do conteúdo.'
  ],
  exercicios: [
    { titulo: "Cabeçalho com logo e menu",
      enunciado: 'Monte o CSS de um cabeçalho `.topo` com: logo à esquerda, três links no centro-direita e um botão "Entrar" colado ao canto direito. Tudo alinhado verticalmente ao centro, com espaço de 1rem entre os itens.',
      dica: '`margin-left: auto` no botão.',
      resolucao: { lang: "css", codigo: `
.topo {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
}

.topo .entrar {
  margin-left: auto;
}

/* HTML:
<header class="topo">
  <a href="/">Logo</a>
  <a href="/a">Cursos</a>
  <a href="/b">Preços</a>
  <a href="/c">Contato</a>
  <a class="entrar" href="/entrar">Entrar</a>
</header>
*/`,
        comentario: '`gap` espaça os itens; `align-items: center` os alinha verticalmente; `margin-left: auto` no último item absorve todo o espaço livre e o encosta à direita.' } },
    { titulo: "Quanto cada coluna recebe?",
      enunciado: 'Um contêiner flex tem 900px de largura e três itens com `flex-basis: 100px` e sem `gap`. Os fatores `flex-grow` são 1, 2 e 3. Quantos pixels tem cada item no final?',
      dica: 'Espaço livre = 900 − 300. Distribua na proporção 1:2:3.',
      resolucao: { lang: "txt", codigo: `Espaço livre = 900 - (3 × 100) = 600px
Soma dos fatores = 1 + 2 + 3 = 6  →  cada "parte" = 100px

Item 1: 100 + 1×100 = 200px
Item 2: 100 + 2×100 = 300px
Item 3: 100 + 3×100 = 400px
(200 + 300 + 400 = 900)`,
        comentario: 'O `flex-grow` distribui apenas o **espaço livre**, que é somado à base de cada item. Por isso, itens com `flex: 1` (base 0) dividem o espaço total igualmente, e itens com base maior começam já mais largos.' } }
  ],
  referencias: [
    { t: "Flexbox (guia básico)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Flexbox", fonte: "MDN Web Docs" },
    { t: "Conceitos básicos de flexbox", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox", fonte: "MDN Web Docs" },
    { t: "CSS Flexible Box Layout Module Level 1", u: "https://www.w3.org/TR/css-flexbox-1/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a3", titulo: "CSS Grid", minutos: 65,
  topicos: ["CSS Grid", "Alinhamento", "Distribuição"],
  objetivos: [
    "Criar grids com `grid-template-columns`/`rows` e a unidade `fr`.",
    "Usar `repeat()`, `minmax()`, `auto-fit` e `auto-fill` para grades responsivas sem media queries.",
    "Posicionar itens por linhas, spans e áreas nomeadas (`grid-template-areas`).",
    "Alinhar e distribuir o conteúdo com `gap`, `justify-*`, `align-*` e `place-*`."
  ],
  conceito: [
    { h: "O modelo grid" },
    { p: 'Com `display: grid`, o contêiner é dividido em **linhas e colunas** (as *tracks*), formando uma grade. Os filhos diretos são colocados nas células. Diferente do flex (uma dimensão), o grid controla as duas ao mesmo tempo, e por isso é a melhor opção para layouts de página e galerias.' },
    { h: "Definindo trilhas" },
    { lista: [
      '`grid-template-columns: 200px 1fr 1fr;` — uma coluna fixa e duas flexíveis.',
      '`fr`: fração do espaço **livre**. `1fr 2fr` divide em 1/3 e 2/3.',
      '`repeat(3, 1fr)`: atalho para `1fr 1fr 1fr`.',
      '`minmax(200px, 1fr)`: a trilha tem no mínimo 200px e cresce até 1fr.',
      '`grid-template-rows`: define linhas; quando omitidas, as linhas são criadas automaticamente (`grid-auto-rows` controla o tamanho delas).',
      '`gap`: espaço entre linhas e colunas.'
    ] },
    { h: "Grade responsiva sem media queries" },
    { p: 'A combinação `repeat(auto-fit, minmax(16rem, 1fr))` cria quantas colunas de pelo menos 16rem couberem; ao redimensionar, o número de colunas muda sozinho. A diferença: `auto-fit` **estica** as colunas para ocupar o espaço, quando há poucos itens; `auto-fill` mantém colunas vazias reservadas.' },
    { h: "Posicionando itens" },
    { lista: [
      'Por linhas: `grid-column: 1 / 3;` (da linha 1 até a 3, ocupando 2 colunas); `grid-row: 2 / span 2`.',
      '`span`: `grid-column: span 2` ocupa duas colunas a partir da posição atual.',
      '**Áreas nomeadas**: define-se o desenho do layout em texto e atribui-se `grid-area` aos filhos. Muito legível e fácil de reorganizar em media queries.'
    ] },
    { h: "Alinhamento" },
    { p: 'No grid, `justify-*` atua no eixo **horizontal (inline)** e `align-*` no **vertical (block)**. `justify-items`/`align-items` alinham os itens dentro da célula; `justify-content`/`align-content` distribuem a grade dentro do contêiner quando ela é menor que ele. Os atalhos `place-items` e `place-content` definem os dois de uma vez (`place-items: center` centraliza).' },
    { nota: { t: "Grid e acessibilidade", x: 'Como no flex, reposicionar itens visualmente com `grid-area`, `order` ou linhas não altera a ordem de foco do teclado. Mantenha a ordem do HTML igual à ordem visual sempre que possível.' } }
  ],
  exemplos: [
    { titulo: "Grade responsiva de cartões", lang: "css", arquivo: "grid-galeria.css",
      codigo: `
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}

.galeria > .cartao {
  /* sem larguras: o grid cuida de tudo */
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1rem;
}

.galeria > .destaque {
  grid-column: 1 / -1;        /* ocupa da primeira à última linha de coluna: largura total */
}`,
      explicacao: [
        '`auto-fit` + `minmax(16rem, 1fr)`: tantas colunas de pelo menos 16rem quantas couberem; elas dividem o espaço sobrando.',
        'Em telas estreitas haverá 1 coluna; em telas largas, várias. Nenhuma media query foi necessária.',
        '`grid-column: 1 / -1` usa o índice `-1` (última linha) para ocupar a largura inteira, qualquer que seja o número de colunas.'
      ] },
    { titulo: "Layout de página com áreas nomeadas", lang: "css", arquivo: "grid-pagina.css",
      codigo: `
.pagina {
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "topo    topo"
    "lateral conteudo"
    "rodape  rodape";
  min-height: 100vh;
  gap: 1rem;
}

.pagina > header { grid-area: topo; }
.pagina > aside  { grid-area: lateral; }
.pagina > main   { grid-area: conteudo; }
.pagina > footer { grid-area: rodape; }

/* O desenho é redefinido facilmente para telas pequenas (módulo 4) */
@media (max-width: 40rem) {
  .pagina {
    grid-template-columns: 1fr;
    grid-template-areas:
      "topo"
      "conteudo"
      "lateral"
      "rodape";
  }
}`,
      explicacao: [
        'O texto em `grid-template-areas` desenha o layout: cada string é uma linha, cada palavra, uma coluna.',
        'Cada filho recebe o nome da sua área com `grid-area`.',
        'Na versão móvel, basta redesenhar o mapa: uma coluna, com o conteúdo antes da barra lateral.',
        'A ordem do HTML deve seguir a ordem lógica (topo, conteúdo, lateral, rodapé) para o teclado e leitores de tela, mesmo que a tela grande mostre a lateral à esquerda.'
      ] },
    { titulo: "Alinhamento e posicionamento por linhas", lang: "css", arquivo: "grid-alinhar.css",
      codigo: `
/* Centralizar um item na célula e no contêiner */
.centro {
  display: grid;
  place-items: center;        /* centraliza horizontal e verticalmente */
  min-height: 50vh;
}

/* Grade de 4 colunas com um item que se estende */
.quadro {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(6rem, auto);   /* linhas criadas automaticamente */
  gap: 0.75rem;
}

.quadro .grande {
  grid-column: span 2;         /* 2 colunas */
  grid-row: span 2;            /* 2 linhas */
}

.quadro .item { align-self: start; }  /* alinha ao topo da célula, e não estica */`,
      explicacao: [
        '`place-items: center` é a forma mais curta de centralizar um filho em um contêiner grid.',
        '`grid-auto-rows` define o tamanho das linhas que o grid cria automaticamente quando há mais itens que linhas declaradas.',
        '`span 2` em colunas e linhas faz o item ocupar um bloco 2×2.',
        '`align-self` altera o alinhamento de um item individual.'
      ] }
  ],
  erros: [
    { erro: "Confundir `fr` com `%`.", porque: "`fr` divide o espaço livre depois de descontados `gap` e trilhas fixas; `%` mede em relação ao contêiner e pode estourar com `gap`.", correcao: "prefira `fr` ou `minmax()`." },
    { erro: "Usar `grid-template-areas` com linhas de tamanhos diferentes.", porque: "Todas as linhas devem ter o mesmo número de células e as áreas devem formar retângulos.", correcao: "confira o mapa; use `.` para células vazias." },
    { erro: "Esperar que `grid-column` funcione sem `display: grid` no pai.", porque: "As propriedades de itens só valem dentro de um contêiner grid.", correcao: "defina `display: grid` no pai direto." },
    { erro: "Usar `auto-fit` com colunas fixas sem `minmax`.", porque: "Não adapta o número de colunas ao espaço de forma útil.", correcao: "use `repeat(auto-fit, minmax(min, 1fr))`." },
    { erro: "Reordenar visualmente com grid e deixar o HTML em outra ordem.", porque: "Prejudica a navegação por teclado e a leitura por leitores de tela.", correcao: "mantenha ordem do HTML = ordem visual." },
    { erro: "Fixar alturas das linhas em `px`.", porque: "O conteúdo estoura se o texto crescer.", correcao: "use `auto`, `minmax(…, auto)` ou `fr`." }
  ],
  praticas: [
    'Use grid para layouts de página e galerias; flex para componentes lineares.',
    'Prefira `fr`, `minmax()` e `auto-fit` a larguras fixas e media queries.',
    'Use áreas nomeadas para layouts complexos: ficam legíveis.',
    'Use `gap` para espaçamento e `place-items` para centralizar.',
    'Teste a navegação por teclado depois de reposicionar itens.'
  ],
  exercicios: [
    { titulo: "Galeria responsiva",
      enunciado: 'Escreva o CSS de uma galeria `.fotos` com colunas de pelo menos 12rem que se adaptam ao espaço disponível, espaço de 0,75rem entre as células e imagens (`img`) que preencham a célula sem distorcer, com proporção 4/3.',
      dica: '`aspect-ratio`, `object-fit: cover`.',
      resolucao: { lang: "css", codigo: `
.fotos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.75rem;
}

.fotos img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;     /* recorta em vez de distorcer */
  display: block;
}`,
        comentario: '`auto-fit` e `minmax(12rem, 1fr)` criam colunas responsivas. `aspect-ratio` mantém a proporção; `object-fit: cover` preenche a área recortando o excesso, sem esticar a imagem. `display: block` elimina o pequeno espaço extra que imagens inline deixam abaixo.' } },
    { titulo: "Página em áreas",
      enunciado: 'Desenhe com `grid-template-areas` uma página com cabeçalho (largura total), duas colunas (menu de 12rem e conteúdo flexível) e rodapé (largura total). Escreva o contêiner e a atribuição das áreas.',
      dica: 'Três linhas e duas colunas. Linha do meio `1fr`.',
      resolucao: { lang: "css", codigo: `
.site {
  display: grid;
  grid-template-columns: 12rem 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "cab  cab"
    "menu cont"
    "rod  rod";
  min-height: 100vh;
}

.site > header { grid-area: cab; }
.site > nav    { grid-area: menu; }
.site > main   { grid-area: cont; }
.site > footer { grid-area: rod; }`,
        comentario: 'A linha do meio com `1fr` absorve a altura livre, mantendo o rodapé embaixo mesmo com pouco conteúdo. O mapa de áreas dá uma visão clara do layout, e o repete nas duas colunas para cabeçalho e rodapé.' } }
  ],
  referencias: [
    { t: "CSS Grid (guia básico)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Grids", fonte: "MDN Web Docs" },
    { t: "Conceitos básicos do grid", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout", fonte: "MDN Web Docs" },
    { t: "CSS Grid Layout Module Level 1", u: "https://www.w3.org/TR/css-grid-1/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a4", titulo: "Organização de componentes", minutos: 45,
  topicos: ["Organização de componentes"],
  objetivos: [
    "Estruturar o CSS por camadas (base, layout, componentes, utilitários).",
    "Nomear classes de forma consistente (BEM ou equivalente) e manter a especificidade baixa.",
    "Criar componentes reutilizáveis (botão, cartão, alerta) com variáveis e variações.",
    "Dividir o código em arquivos e documentar decisões."
  ],
  conceito: [
    { h: "Por que organizar" },
    { p: 'Folhas de estilo crescem. Sem organização, aparecem seletores longos, `!important`, regras duplicadas e a famosa sensação de que "mexer aqui quebra ali". Algumas decisões simples evitam isso.' },
    { h: "Ordem das camadas" },
    { p: 'Organize o arquivo (ou os arquivos) do **mais geral para o mais específico**, de modo que a ordem de aparição resolva conflitos naturalmente:' },
    { ol: [
      '**Variáveis e reset** (`:root`, `box-sizing`, margens básicas).',
      '**Base**: estilos de elementos (`body`, `h1`, `a`, `p`).',
      '**Layout**: contêineres, grids de página, cabeçalho e rodapé.',
      '**Componentes**: `.btn`, `.cartao`, `.alerta`, `.menu`.',
      '**Utilitários**: classes pequenas e únicas (`.sr-only`, `.texto-centro`).'
    ] },
    { p: 'O recurso `@layer` formaliza isso: cada camada declarada tem prioridade definida pela ordem, independentemente da especificidade dentro delas.' },
    { h: "Nomenclatura: BEM" },
    { p: 'BEM (*Block, Element, Modifier*) é uma convenção para nomes de classes: `.bloco`, `.bloco__elemento` e `.bloco--modificador`. Exemplo: `.cartao`, `.cartao__titulo`, `.cartao--destaque`. Os nomes deixam clara a relação entre as partes e permitem seletores de **uma classe só**, o que mantém a especificidade baixa e uniforme.' },
    { h: "Componentes parametrizados" },
    { p: 'Use variáveis CSS para tornar componentes configuráveis: o componente define valores padrão e variações apenas sobrescrevem as variáveis. Isso reduz duplicação e facilita temas.' },
    { h: "Organização em arquivos" },
    { lista: [
      'Um arquivo por camada ou por componente (`base.css`, `layout.css`, `componentes/botao.css`...).',
      'Em projetos sem ferramenta de build, `@import` no CSS gera requisições em cascata e deixa o carregamento lento; prefira vários `<link>` ou um arquivo único consolidado.',
      'Documente com comentários o objetivo, as variações e a forma de uso de cada componente.'
    ] },
    { nota: { t: "Estados e acessibilidade fazem parte do componente", x: 'Um componente completo define também `:hover`, `:focus-visible`, `:disabled` e variações de tamanho. Se o botão não tem foco visível, o componente está incompleto.' } }
  ],
  exemplos: [
    { titulo: "Botão com variações via variáveis", lang: "css", arquivo: "botao.css",
      codigo: `
/* Componente: botão */
.btn {
  --btn-fundo: #1971c2;
  --btn-texto: #fff;
  --btn-borda: transparent;

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font: inherit;
  font-weight: 600;
  color: var(--btn-texto);
  background-color: var(--btn-fundo);
  border: 2px solid var(--btn-borda);
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover { filter: brightness(0.92); }
.btn:focus-visible { outline: 3px solid #74c0fc; outline-offset: 2px; }
.btn:disabled { opacity: 0.55; cursor: not-allowed; }

/* Modificadores: só trocam as variáveis */
.btn--secundario {
  --btn-fundo: transparent;
  --btn-texto: #1971c2;
  --btn-borda: #1971c2;
}

.btn--perigo { --btn-fundo: #c92a2a; }

.btn--grande { padding: 0.75rem 1.5rem; font-size: 1.125rem; }`,
      explicacao: [
        'As variáveis locais (`--btn-*`) definem a "aparência padrão" do botão.',
        'Os modificadores `--secundario` e `--perigo` sobrescrevem só as variáveis, e as regras principais ficam intactas.',
        'Todas as classes têm especificidade (0,1,0): a ordem de aparição decide, e não há `!important`.',
        'O foco visível e o estado `:disabled` fazem parte do componente.'
      ] },
    { titulo: "Cartão com BEM", lang: "html", arquivo: "cartao.html",
      codigo: `
<!-- HTML -->
<article class="cartao cartao--destaque">
  <img class="cartao__imagem" src="curso.jpg" alt="" width="400" height="225">
  <div class="cartao__corpo">
    <h3 class="cartao__titulo">HTML5 do zero</h3>
    <p class="cartao__texto">30 horas, para iniciantes.</p>
    <a class="btn" href="/curso/html">Ver curso</a>
  </div>
</article>

<style>
  .cartao { display: grid; border: 1px solid #dee2e6; border-radius: 12px; overflow: hidden; }
  .cartao__imagem { width: 100%; height: auto; display: block; }
  .cartao__corpo { padding: 1rem; display: grid; gap: 0.5rem; }
  .cartao__titulo { margin: 0; font-size: 1.125rem; }
  .cartao__texto { margin: 0; color: #495057; }
  .cartao--destaque { border-color: #1971c2; box-shadow: 0 0 0 2px rgb(25 113 194 / 20%); }
</style>`,
      explicacao: [
        'Nomes `cartao__titulo` e `cartao__corpo` deixam clara a hierarquia sem depender da estrutura do HTML.',
        '`cartao--destaque` é uma variação do bloco; é combinado com `cartao` (as duas classes no elemento).',
        'Todos os seletores têm uma classe só: fáceis de sobrescrever e de ler.',
        'A imagem é decorativa neste exemplo (`alt=""`): o título já descreve o conteúdo.'
      ] },
    { titulo: "Camadas com @layer e estrutura de arquivos", lang: "css", arquivo: "camadas.css",
      codigo: `
/* Declara a ordem de prioridade: a última camada vence as anteriores */
@layer reset, base, layout, componentes, utilitarios;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  body { font-family: system-ui, sans-serif; line-height: 1.6; }
  a { color: #1864ab; }
}

@layer componentes {
  .btn { padding: 0.5rem 1rem; }
}

@layer utilitarios {
  .texto-centro { text-align: center; }
}

/* Estrutura sugerida de pastas:
   css/
     tokens.css           variáveis (:root)
     base.css             reset + elementos
     layout.css           grids e contêineres
     componentes/
       botao.css
       cartao.css
     utilitarios.css                                  */`,
      explicacao: [
        '`@layer` declarado no topo define a ordem: `utilitarios` vence `componentes`, que vence `layout`, e assim por diante, **mesmo com especificidade menor**.',
        'Estilos fora de qualquer camada têm prioridade maior que todos os que estão em camadas.',
        'A organização em arquivos espelha as camadas e ajuda a encontrar rapidamente onde mudar.',
        '`@layer` tem amplo suporte em navegadores atuais; em projetos que precisam atender a navegadores antigos, a ordem dos arquivos faz o mesmo papel.'
      ] }
  ],
  erros: [
    { erro: "Seletores aninhados e longos (`.pagina .coluna .cartao h3 span`).", porque: "Alta especificidade e dependência da estrutura do HTML.", correcao: "use classes únicas (BEM) e seletores curtos." },
    { erro: "Estilizar pelo nome de elementos dentro de componentes (`.cartao h3`).", porque: "Se o `h3` virar `h2`, o estilo quebra, e a semântica (nível do título) passa a depender da aparência.", correcao: "use uma classe (`.cartao__titulo`)." },
    { erro: "Usar `!important` para vencer conflitos de componentes.", porque: "Cria um ciclo de escalada.", correcao: "organize as camadas e mantenha a especificidade uniforme." },
    { erro: "Copiar e colar o mesmo conjunto de declarações em vários lugares.", porque: "Torna as mudanças trabalhosas e inconsistentes.", correcao: "crie um componente ou use variáveis." },
    { erro: "Usar `@import` em cadeia no CSS.", porque: "Cada importação gera requisição extra, e o carregamento fica lento.", correcao: "use `<link>` múltiplos ou concatene os arquivos." },
    { erro: "Componente sem estados de foco e desabilitado.", porque: "Exclui usuários de teclado e comunica mal o estado.", correcao: "defina `:focus-visible` e `:disabled`." }
  ],
  praticas: [
    'Organize do geral para o específico: variáveis, base, layout, componentes, utilitários.',
    'Use classes com nomenclatura consistente (BEM) e especificidade uniforme.',
    'Parametrize componentes com variáveis CSS.',
    'Defina todos os estados do componente.',
    'Comente o objetivo e as variações de cada componente.'
  ],
  exercicios: [
    { titulo: "Componente de alerta",
      enunciado: 'Crie o componente `.alerta` com padding `1rem`, borda esquerda de 4px, cantos de 8px, fundo claro e texto escuro. Crie os modificadores `--info` (azul), `--sucesso` (verde) e `--erro` (vermelho) usando **apenas variáveis**. Use BEM e nenhuma regra com mais de uma classe.',
      dica: 'Defina `--alerta-cor` e `--alerta-fundo` em cada modificador.',
      resolucao: { lang: "css", codigo: `
.alerta {
  --alerta-cor: #1971c2;
  --alerta-fundo: #e7f5ff;

  padding: 1rem;
  border-left: 4px solid var(--alerta-cor);
  border-radius: 8px;
  background-color: var(--alerta-fundo);
  color: #212529;
}

.alerta__titulo { margin: 0 0 0.25rem; font-weight: 700; }

.alerta--sucesso { --alerta-cor: #2b8a3e; --alerta-fundo: #ebfbee; }
.alerta--erro    { --alerta-cor: #c92a2a; --alerta-fundo: #fff5f5; }

/* HTML: <div class="alerta alerta--erro" role="alert">
           <p class="alerta__titulo">Erro</p> Não foi possível salvar.</div> */`,
        comentario: 'O padrão (info) é definido no próprio `.alerta`; os modificadores só trocam as variáveis. O texto mantém cor escura em todos os casos, para garantir o contraste. A mensagem inclui a palavra "Erro" em texto: a informação não depende só da cor. `role="alert"` anuncia a mensagem a leitores de tela.' } },
    { titulo: "Organize este CSS",
      enunciado: 'Reordene as regras em camadas (reset, base, componentes, utilitários) e reescreva o seletor `.pagina .lista .item a.link-forte` com uma única classe.',
      codigo: { lang: "css", x: `.texto-centro { text-align: center; }
.btn { padding: 0.5rem 1rem; }
*, *::before, *::after { box-sizing: border-box; }
.pagina .lista .item a.link-forte { font-weight: 700; }
body { font-family: system-ui, sans-serif; }` },
      dica: 'Do geral ao específico. No HTML, o link ganha a classe `link-forte`.',
      resolucao: { lang: "css", codigo: `
/* reset */
*, *::before, *::after { box-sizing: border-box; }

/* base */
body { font-family: system-ui, sans-serif; }

/* componentes */
.btn { padding: 0.5rem 1rem; }
.link-forte { font-weight: 700; }

/* utilitários */
.texto-centro { text-align: center; }`,
        comentario: 'A ordem do mais geral para o mais específico faz com que os utilitários, por virem por último, vençam os componentes quando houver conflito. O seletor longo (0,3,1) virou `.link-forte` (0,1,0): menos acoplado à estrutura e mais fácil de sobrescrever.' } }
  ],
  referencias: [
    { t: "@layer", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/@layer", fonte: "MDN Web Docs" },
    { t: "Organização de CSS", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Organizing", fonte: "MDN Web Docs" },
    { t: "BEM: nomenclatura", u: "https://getbem.com/naming/", fonte: "getbem.com" }
  ]
}

] });
