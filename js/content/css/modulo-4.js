/* CSS3 · Módulo 4 — Responsividade
   Tópicos: media queries · mobile first · unidades relativas · layouts adaptativos ·
   acessibilidade visual · transições e animações */
AE.Conteudo.modulo("css", 4, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m4a1", titulo: "Media queries e Mobile First", minutos: 55,
  topicos: ["Media queries", "Mobile First"],
  objetivos: [
    "Declarar o `viewport` e explicar por que ele é indispensável.",
    "Escrever media queries por largura, orientação e preferências do usuário.",
    "Aplicar a abordagem Mobile First com `min-width`.",
    "Escolher breakpoints a partir do conteúdo, e não de aparelhos específicos."
  ],
  conceito: [
    { h: "Design responsivo em três ingredientes" },
    { lista: [
      '**Meta viewport** no HTML: `<meta name="viewport" content="width=device-width, initial-scale=1">`. Sem ela, navegadores móveis simulam uma tela larga (cerca de 980px) e reduzem a página.',
      '**Layouts fluidos**: larguras relativas (`%`, `fr`, `min()`, `clamp()`), e não fixas em `px`.',
      '**Media queries**: aplicam regras apenas quando condições são satisfeitas.'
    ] },
    { h: "Media queries" },
    { p: 'A sintaxe é `@media (condição) { regras }`. As condições mais usadas:' },
    { lista: [
      '`(min-width: 40rem)`: janela **a partir de** 40rem de largura. `(max-width: 40rem)`: **até** essa largura.',
      '`(orientation: landscape)` ou `portrait`.',
      '`(prefers-reduced-motion: reduce)`: o usuário pediu menos movimento (acessibilidade).',
      '`(prefers-color-scheme: dark)`: o sistema usa tema escuro.',
      '`(hover: hover)`: o dispositivo principal tem passagem de mouse real (útil para não depender de `:hover` em telas de toque).',
      '`print`: estilos para impressão (`@media print`).',
      'Combinações com `and`, `,` (ou) e `not`. Sintaxe de intervalo moderna: `(40rem <= width <= 60rem)`.'
    ] },
    { h: "Mobile First" },
    { p: '**Mobile First** significa escrever primeiro o CSS para a tela menor, e **acrescentar** recursos conforme a tela cresce, com `min-width`. Vantagens: o código base fica simples (uma coluna), telas pequenas, que costumam ter menos poder de processamento, não precisam desfazer regras de desktop, e o conteúdo se adapta de forma natural. O oposto (Desktop First, com `max-width`) obriga a sobrescrever o que foi definido para telas grandes.' },
    { h: "Escolha de breakpoints" },
    { p: 'Não existe um conjunto "oficial" de larguras. Redimensione a janela e adicione um breakpoint **onde o conteúdo começa a ficar ruim** (linhas longas demais, colunas apertadas). Use `em`/`rem` nos breakpoints para que respeitem o tamanho de fonte do usuário. Poucos breakpoints bastam, e muita coisa se resolve sem eles, com `auto-fit`, `flex-wrap` e `clamp()`.' },
    { nota: { t: "Teste em dispositivos de verdade", x: 'O modo dispositivo das ferramentas de desenvolvimento ajuda, mas não substitui testar em celulares e tablets reais (toque, teclado virtual, barras do navegador). Teste também com zoom de 200% e fonte maior nas configurações do sistema.' } }
  ],
  exemplos: [
    { titulo: "Mobile First: de uma coluna a três", lang: "css", arquivo: "mobile-first.css",
      codigo: `
/* BASE (celular): uma coluna, sem media query */
.cartoes {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}

/* Tablet em diante: duas colunas */
@media (min-width: 40rem) {
  .cartoes {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Telas largas: três colunas e mais respiro */
@media (min-width: 64rem) {
  .cartoes {
    grid-template-columns: repeat(3, 1fr);
    padding: 2rem;
  }
}`,
      explicacao: [
        'Sem media query, o grid tem uma coluna: é o comportamento em telas pequenas.',
        '`min-width: 40rem` (640px com fonte de 16px) acrescenta uma segunda coluna a partir dessa largura.',
        'As regras se **acumulam**: acima de 64rem, valem as três (as de baixo continuam aplicadas, e as maiores sobrescrevem).',
        'Os breakpoints em `rem` acompanham o ajuste de tamanho de fonte do usuário.'
      ] },
    { titulo: "Menu que muda de formato", lang: "css", arquivo: "menu-responsivo.css",
      codigo: `
.menu { list-style: none; margin: 0; padding: 0; }
.menu a { display: block; padding: 0.75rem 1rem; }   /* área de toque confortável */

/* A partir de 48rem, o menu vira uma linha horizontal */
@media (min-width: 48rem) {
  .menu {
    display: flex;
    gap: 0.5rem;
  }
  .menu a { padding: 0.5rem 0.75rem; }
}

/* Efeito de hover só onde há mouse de verdade */
@media (hover: hover) {
  .menu a:hover { background-color: #e7f5ff; }
}`,
      explicacao: [
        'O menu começa vertical, com alvos de toque grandes (pelo menos cerca de 44px de altura).',
        'Em telas largas, `display: flex` o transforma em linha horizontal.',
        '`(hover: hover)` evita estados de hover "presos" em telas de toque.',
        'Em uma versão completa, o menu móvel teria um botão de abrir/fechar (JavaScript no curso 3).'
      ] },
    { titulo: "Preferências do usuário e impressão", lang: "css", arquivo: "preferencias.css",
      codigo: `
:root { --fundo: #ffffff; --texto: #212529; }

/* Respeita o tema escuro do sistema */
@media (prefers-color-scheme: dark) {
  :root { --fundo: #14171a; --texto: #f1f3f5; }
}

body { background-color: var(--fundo); color: var(--texto); }

/* Remove animações para quem pediu menos movimento */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Impressão: esconde navegação e usa preto no branco */
@media print {
  nav, .sem-impressao { display: none; }
  body { background: #fff; color: #000; }
  a[href^="http"]::after { content: " (" attr(href) ")"; }
}`,
      explicacao: [
        'Mudar variáveis em `:root` dentro da media query reconfigura todo o tema de uma vez.',
        'O bloco `prefers-reduced-motion` é um dos poucos usos aceitáveis de `!important`: queremos que ele vença qualquer animação.',
        'Em `print`, o link mostra o endereço entre parênteses usando `attr(href)`.',
        'Estas media queries atendem a necessidades reais: tema, movimento e impressão.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o `<meta name=\"viewport\">`.", porque: "As media queries parecem não funcionar no celular, porque a largura simulada é ~980px.", correcao: "adicione o viewport no `<head>`." },
    { erro: "Escolher breakpoints por modelo de aparelho (iPhone, iPad).", porque: "Os aparelhos mudam o tempo todo.", correcao: "defina pontos de quebra a partir do conteúdo." },
    { erro: "Misturar `min-width` e `max-width` sem planejamento.", porque: "Gera sobreposição e regras difíceis de entender.", correcao: "adote uma abordagem (de preferência Mobile First com `min-width`)." },
    { erro: "Breakpoints em `px` e fontes em `rem`.", porque: "O usuário que aumenta a fonte não aciona o layout correspondente.", correcao: "use `rem`/`em` nos breakpoints." },
    { erro: "Esconder conteúdo importante em telas pequenas.", porque: "Usuários móveis também precisam dele.", correcao: "reorganize em vez de esconder." },
    { erro: "Alvos de toque pequenos.", porque: "Dificultam o uso por toque e por pessoas com limitações motoras.", correcao: "use alvos de pelo menos 44×44px (o ideal), e espaçamento suficiente." }
  ],
  praticas: [
    'Comece pelo celular (Mobile First) e acrescente com `min-width`.',
    'Coloque os breakpoints onde o conteúdo pede, em `rem`.',
    'Use layouts intrinsecamente flexíveis (`auto-fit`, `flex-wrap`, `clamp()`) para reduzir o número de media queries.',
    'Respeite as preferências do usuário (`prefers-reduced-motion`, `prefers-color-scheme`).',
    'Teste em dispositivos reais, com zoom e fontes maiores.'
  ],
  exercicios: [
    { titulo: "Mobile First",
      enunciado: 'Escreva o CSS (Mobile First) de `.layout` com: uma coluna em telas pequenas; duas colunas (`1fr 2fr`) a partir de 48rem; e três colunas (`1fr 2fr 1fr`) a partir de 72rem. Espaço de 1rem entre colunas.',
      dica: 'Duas media queries com `min-width`.',
      resolucao: { lang: "css", codigo: `
.layout {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .layout { grid-template-columns: 1fr 2fr; }
}

@media (min-width: 72rem) {
  .layout { grid-template-columns: 1fr 2fr 1fr; }
}`,
        comentario: 'O padrão (sem media query) é uma coluna: `display: grid` sem colunas definidas empilha os filhos. A segunda e a terceira regras sobrescrevem `grid-template-columns` conforme a janela cresce, o que caracteriza o Mobile First.' } },
    { titulo: "Converta Desktop First em Mobile First",
      enunciado: 'Reescreva em Mobile First: `.menu { display: flex; } @media (max-width: 40rem) { .menu { display: block; } }`',
      dica: 'O padrão passa a ser o bloco; o flex vem com `min-width`.',
      resolucao: { lang: "css", codigo: `
.menu { display: block; }

@media (min-width: 40.0625rem) {
  .menu { display: flex; }
}`,
        comentario: '`max-width: 40rem` significa "até 40rem". O complemento é "acima de 40rem", ou seja, `min-width` ligeiramente maior (40,0625rem = 1px a mais com fonte de 16px). Com a sintaxe de intervalo moderna, `(width > 40rem)` expressa isso diretamente. O ponto central: o estilo base atende o celular, e o desktop acrescenta.' } }
  ],
  referencias: [
    { t: "Design responsivo", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Responsive_Design", fonte: "MDN Web Docs" },
    { t: "Usando media queries", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_media_queries/Using_media_queries", fonte: "MDN Web Docs" },
    { t: "Media Queries Level 4", u: "https://www.w3.org/TR/mediaqueries-4/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a2", titulo: "Unidades relativas e layouts adaptativos", minutos: 50,
  topicos: ["Unidades relativas", "Layouts adaptativos"],
  objetivos: [
    "Construir layouts fluidos com `%`, `rem`, `vw`, `fr`, `min()`, `max()` e `clamp()`.",
    "Fazer imagens e mídia adaptáveis com `max-width`, `aspect-ratio` e `object-fit`.",
    "Usar `container queries` para componentes que respondem ao seu contêiner.",
    "Evitar rolagem horizontal e conteúdo estourado."
  ],
  conceito: [
    { h: "Fluido por natureza" },
    { p: 'Um layout adaptativo não depende de muitos breakpoints: ele é feito de peças que **se ajustam sozinhas**. Ferramentas principais:' },
    { lista: [
      '`min()`, `max()` e `clamp()` para larguras, margens e fontes com limites.',
      '`fr`, `minmax()`, `auto-fit` no grid e `flex-wrap`/`flex-basis` no flex.',
      '`rem` para espaçamento e tipografia; `ch` para largura de texto.',
      '`vw`/`vh` com cuidado: em celulares, `100vh` inclui a área sob as barras do navegador; prefira `100dvh` (altura dinâmica) quando precisar ocupar a tela visível.'
    ] },
    { h: "Imagens e mídia adaptáveis" },
    { p: 'A regra básica: `img, video { max-width: 100%; height: auto; }`. Assim, mídia nunca passa do contêiner e mantém a proporção. `aspect-ratio` reserva o espaço antes do carregamento, e `object-fit: cover | contain` controla como a imagem preenche uma caixa de tamanho fixo. No HTML, `srcset`/`sizes` e `<picture>` (curso de HTML) entregam arquivos do tamanho adequado.' },
    { h: "Evitando o estouro horizontal" },
    { lista: [
      'Rolagem horizontal inesperada geralmente vem de larguras fixas, `100vw` somado a margens (a barra de rolagem entra na conta), imagens sem `max-width`, ou textos/URLs longos.',
      '`overflow-wrap: anywhere`, `min-width: 0` em itens flex/grid e `max-width: 100%` resolvem a maioria dos casos.',
      'Tabelas largas devem ficar dentro de um contêiner com `overflow-x: auto`.'
    ] },
    { h: "Container queries" },
    { p: 'Media queries olham a **janela**. Um componente reutilizável (um cartão) pode estar em uma coluna estreita ou em uma larga na mesma tela. As **container queries** permitem que o componente se adapte ao **tamanho do seu contêiner**: declare `container-type: inline-size` no contêiner e use `@container (min-width: 30rem) { ... }` nos filhos. O suporte é amplo nos navegadores atuais; para quem precisa atender navegadores antigos, deixe o layout base funcional sem elas.' },
    { nota: { t: "Zoom e fontes grandes fazem parte do responsivo", x: 'Com zoom de 200%, a janela efetivamente tem metade da largura em CSS: o layout "de celular" deve entrar em ação. Teste sempre: a página não deve exigir rolagem em duas dimensões (exceto mapas, tabelas largas e similares).' } }
  ],
  exemplos: [
    { titulo: "Contêiner e tipografia fluidos", lang: "css", arquivo: "fluido.css",
      codigo: `
*, *::before, *::after { box-sizing: border-box; }

img, video { max-width: 100%; height: auto; }

.container {
  width: min(100% - 2rem, 70rem);  /* 1rem de cada lado, no máximo 70rem */
  margin-inline: auto;
}

h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem); }  /* fluido e limitado */

.secao { padding-block: clamp(1.5rem, 4vw, 4rem); }

.hero { min-height: 100dvh; }   /* altura visível real em celulares */

.texto { max-width: 65ch; }`,
      explicacao: [
        '`min(100% - 2rem, 70rem)` resolve largura, centralização e respiro em uma única declaração.',
        '`clamp(mín, ideal, máx)` com `ideal` misturando `rem` e `vw` mantém o texto escalável pelo zoom (o `rem` participa do cálculo).',
        'Só com `vw` puro o texto não reagiria ao ajuste de fonte do usuário.',
        '`100dvh` evita que o rodapé do hero fique escondido sob as barras do navegador móvel.'
      ] },
    { titulo: "Imagens e tabelas que não estouram", lang: "css", arquivo: "midia.css",
      codigo: `
.capa {
  width: 100%;
  aspect-ratio: 16 / 9;        /* reserva o espaço antes de carregar */
  object-fit: cover;           /* preenche e recorta sem distorcer */
  border-radius: 12px;
}

.avatar {
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}

/* Tabela larga: rolagem só dentro do contêiner */
.tabela-rolavel {
  overflow-x: auto;
}
.tabela-rolavel table { min-width: 40rem; }

/* Texto ou URL longos */
.comentario { overflow-wrap: anywhere; }

/* HTML:
<div class="tabela-rolavel" role="region" aria-label="Tabela de preços" tabindex="0">
  <table>...</table>
</div> */`,
      explicacao: [
        '`aspect-ratio: 16 / 9` com `object-fit: cover` mantém a mesma proporção em qualquer largura.',
        'A tabela rola horizontalmente apenas dentro do contêiner, e a página não ganha barra de rolagem.',
        '`tabindex="0"` e `role="region"` com `aria-label` permitem que usuários de teclado rolem o contêiner e o identifiquem.',
        '`overflow-wrap: anywhere` quebra URLs longas que, de outra forma, estourariam o layout.'
      ] },
    { titulo: "Container queries", lang: "css", arquivo: "container-queries.css",
      codigo: `
.coluna {
  container-type: inline-size;   /* este elemento vira um contêiner consultável */
  container-name: coluna;
}

/* Cartão base: empilhado */
.produto {
  display: grid;
  gap: 0.75rem;
}

/* Se o CONTÊINER tiver 30rem ou mais, o cartão vira horizontal */
@container coluna (min-width: 30rem) {
  .produto {
    grid-template-columns: 10rem 1fr;
    align-items: start;
  }
}

/* O mesmo cartão em uma coluna estreita continua empilhado,
   mesmo que a janela seja muito larga. */`,
      explicacao: [
        '`container-type: inline-size` faz o navegador acompanhar a largura da `.coluna`.',
        'A regra `@container` reage à largura do contêiner, e não à da janela.',
        'O mesmo componente funciona em uma barra lateral estreita e na área principal larga, sem código extra.',
        'O contêiner consultado não pode depender do tamanho do próprio conteúdo no eixo `inline`.'
      ] }
  ],
  erros: [
    { erro: "Usar `width: 100vw` junto com margens ou padding.", porque: "`100vw` inclui a barra de rolagem: a página ganha rolagem horizontal.", correcao: "use `width: 100%` e `box-sizing: border-box`." },
    { erro: "Tipografia só em `vw`.", porque: "Ignora o ajuste de fonte e o zoom do usuário.", correcao: "use `clamp()` misturando `rem` e `vw`." },
    { erro: "Imagens sem `max-width: 100%`.", porque: "Estouram o layout em telas pequenas.", correcao: "use `max-width: 100%; height: auto;`." },
    { erro: "`height: 100vh` em celulares.", porque: "A barra do navegador cobre parte da área e o rodapé do bloco some.", correcao: "use `min-height: 100dvh`." },
    { erro: "Esconder a rolagem de tabelas largas (`overflow: hidden`).", porque: "Dados ficam inacessíveis.", correcao: "use `overflow-x: auto` e foco por teclado no contêiner." },
    { erro: "Depender de container queries sem layout base funcional.", porque: "Em navegadores antigos o componente fica quebrado.", correcao: "garanta um comportamento razoável sem elas." }
  ],
  praticas: [
    'Prefira componentes intrinsecamente flexíveis a muitos breakpoints.',
    'Use `clamp()` com `rem` na tipografia fluida.',
    'Aplique `max-width: 100%; height: auto;` em mídia e use `aspect-ratio`.',
    'Teste o zoom de 200% e a ausência de rolagem horizontal.',
    'Use container queries em componentes reutilizáveis.'
  ],
  exercicios: [
    { titulo: "Contêiner e título fluidos",
      enunciado: 'Escreva o CSS para: um `.container` de largura máxima 60rem, com 1rem de margem de cada lado em telas pequenas, centralizado; e um `h1` com tamanho entre 1,75rem e 3rem que cresça com a janela, sem ignorar a preferência de fonte do usuário.',
      dica: '`min()` e `clamp()` com `rem + vw`.',
      resolucao: { lang: "css", codigo: `
.container {
  width: min(100% - 2rem, 60rem);
  margin-inline: auto;
}

h1 {
  font-size: clamp(1.75rem, 1.25rem + 2vw, 3rem);
}`,
        comentario: '`min(100% - 2rem, 60rem)` limita a 60rem e mantém 1rem de cada lado em telas estreitas. No `clamp`, o valor ideal mistura `rem` e `vw`: como inclui `rem`, o texto continua reagindo ao ajuste de fonte do usuário e ao zoom.' } },
    { titulo: "Descubra o estouro",
      enunciado: 'Uma página tem rolagem horizontal no celular. O CSS contém: `.faixa { width: 100vw; padding: 0 1rem; }`, `img { width: 600px; }` e `.link { }` mostrando uma URL longa. Aponte as causas e corrija.',
      dica: 'Largura fixa, `100vw` com padding e texto longo.',
      resolucao: { lang: "css", codigo: `
*, *::before, *::after { box-sizing: border-box; }

.faixa {
  width: 100%;
  padding: 0 1rem;
}

img {
  max-width: 100%;
  height: auto;
}

.link { overflow-wrap: anywhere; }`,
        comentario: '(1) `100vw` mais padding excede a janela (e `100vw` conta a barra de rolagem). (2) A imagem com `width: 600px` não cabe em telas estreitas; `max-width: 100%` resolve. (3) A URL longa não quebra por padrão; `overflow-wrap: anywhere` permite a quebra. O reset com `border-box` impede que o padding some à largura.' } }
  ],
  referencias: [
    { t: "Container queries", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_containment/Container_queries", fonte: "MDN Web Docs" },
    { t: "clamp()", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/clamp", fonte: "MDN Web Docs" },
    { t: "Imagens responsivas", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Guides/Responsive_images", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a3", titulo: "Acessibilidade visual", minutos: 45,
  topicos: ["Acessibilidade visual"],
  objetivos: [
    "Garantir contraste de cores adequado em texto, componentes e estados.",
    "Tornar o foco do teclado sempre visível.",
    "Respeitar zoom, tamanho de fonte e preferências do sistema.",
    "Não depender só de cor, movimento ou posição para comunicar informação."
  ],
  conceito: [
    { h: "Contraste" },
    { p: 'As diretrizes WCAG 2.2 (nível AA) pedem razão de contraste de **4,5:1** para texto comum, **3:1** para texto grande (a partir de cerca de 24px, ou 18,66px em negrito) e **3:1** para componentes de interface e gráficos informativos (bordas de campos, ícones, indicadores de foco). Verifique com a ferramenta de contraste do navegador, e teste todos os estados (hover, foco, desabilitado, erro).' },
    { h: "Foco visível" },
    { p: 'Quem navega pelo teclado precisa ver onde está. Use `:focus-visible` com um contorno espesso (2-3px), de bom contraste contra o fundo e com `outline-offset`. Nunca remova o `outline` sem substituto. Garanta que o elemento focado não fique escondido atrás de cabeçalhos fixos (`scroll-margin-top`, `scroll-padding-top`).' },
    { h: "Não dependa só de cor" },
    { p: 'Cerca de 1 em cada 12 homens tem alguma forma de daltonismo, e muitas pessoas usam telas em ambientes de luz forte. Erros, links, estados e gráficos devem ter um **segundo indicador**: ícone, texto, sublinhado, padrão ou forma. Ex.: "Erro: e-mail inválido" ao lado da borda vermelha.' },
    { h: "Zoom, tamanho de texto e espaçamento" },
    { lista: [
      'Use `rem` para fontes e permita zoom: nunca bloqueie com `user-scalable=no` nem `maximum-scale=1`.',
      'O conteúdo deve se reorganizar sem rolagem horizontal com zoom de 200% (e em largura equivalente a 320px de CSS).',
      'O texto deve resistir ao aumento de espaçamento: `line-height` ao menos 1,5, parágrafos com espaço de 2× a fonte, sem alturas fixas que cortem o texto.'
    ] },
    { h: "Preferências do sistema" },
    { lista: [
      '`prefers-reduced-motion`: reduza ou remova animações de movimento amplo (parallax, deslocamentos grandes).',
      '`prefers-color-scheme`: ofereça tema escuro coerente (e verifique o contraste nos dois).',
      '`prefers-contrast: more`: aumente o contraste quando solicitado.',
      '`forced-colors: active` (modo de alto contraste do Windows): evite depender de `box-shadow` ou imagens de fundo para informação; bordas reais funcionam bem.'
    ] },
    { nota: { t: "Alvos de toque e espaçamento", x: 'Botões e links devem ter área de toque de pelo menos 24×24px (mínimo da WCAG 2.2, nível AA) e, idealmente, cerca de 44×44px. Espaçamento adequado evita toques acidentais.' } }
  ],
  exemplos: [
    { titulo: "Foco visível e alvos de toque", lang: "css", arquivo: "foco.css",
      codigo: `
:root { --cor-foco: #1c7ed6; }

/* Contorno de foco forte, visível em fundo claro e escuro */
:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Alvos de toque confortáveis */
button, .btn, input, select, textarea {
  min-height: 2.75rem;   /* 44px */
  padding-inline: 0.75rem;
}

/* Âncoras não ficam sob o cabeçalho fixo */
html { scroll-padding-top: 5rem; }

/* Sublinhado: segundo indicador além da cor do link */
a { text-decoration: underline; text-underline-offset: 0.2em; }
nav a { text-decoration: none; }              /* em menus, o contexto indica que são links */
nav a[aria-current="page"] { border-bottom: 3px solid currentColor; }  /* além da cor */`,
      explicacao: [
        '`:focus-visible` mostra o contorno só quando é útil (teclado) e preserva o estilo para cliques de mouse.',
        '`min-height: 2.75rem` garante alvos de cerca de 44px.',
        '`scroll-padding-top` impede que o conteúdo focado ou a âncora fiquem escondidos sob o cabeçalho fixo.',
        'Na página atual do menu, a borda inferior é um **segundo indicador**: não depende da cor.'
      ] },
    { titulo: "Erro com mais do que cor", lang: "html", arquivo: "erro-campo.html",
      codigo: `
<style>
  .campo { display: grid; gap: 0.25rem; max-width: 24rem; }
  .campo input { border: 2px solid #868e96; border-radius: 6px; padding: 0.5rem; }

  .campo.com-erro input { border-color: #c92a2a; border-width: 3px; }  /* cor + espessura */
  .campo .msg-erro {
    color: #a61e1e;              /* contraste ≥ 4,5:1 sobre fundo branco */
    font-weight: 600;
  }
  .campo .msg-erro::before { content: "⚠ "; }  /* ícone: terceiro indicador */
</style>

<div class="campo com-erro">
  <label for="email">E-mail</label>
  <input id="email" type="email" value="ana@" aria-invalid="true" aria-describedby="email-erro">
  <p id="email-erro" class="msg-erro">Erro: informe um e-mail completo, como ana@exemplo.com.</p>
</div>`,
      explicacao: [
        'O erro é indicado por **cor, espessura da borda, ícone e texto**.',
        'A mensagem tem contraste adequado e explica como corrigir.',
        '`aria-invalid` e `aria-describedby` informam o estado aos leitores de tela.',
        'O ícone gerado por `::before` é decorativo; o texto "Erro:" leva a informação.'
      ] },
    { titulo: "Preferências do usuário", lang: "css", arquivo: "preferencias-a11y.css",
      codigo: `
/* Tema com variáveis e contraste verificado nos dois modos */
:root {
  --fundo: #ffffff;
  --texto: #212529;      /* 16:1 sobre branco */
  --link: #1864ab;       /* ≈ 6:1 sobre branco */
}

@media (prefers-color-scheme: dark) {
  :root {
    --fundo: #14171a;
    --texto: #f1f3f5;
    --link: #74c0fc;     /* ≈ 9:1 sobre o fundo escuro */
  }
}

@media (prefers-contrast: more) {
  :root { --texto: #000; --fundo: #fff; --link: #0b3d91; }
}

@media (forced-colors: active) {
  .cartao { border: 1px solid CanvasText; }   /* bordas reais substituem sombras */
}

body { background-color: var(--fundo); color: var(--texto); }
a { color: var(--link); }`,
      explicacao: [
        'As cores são trocadas por variáveis, e o contraste foi pensado para cada tema.',
        '`prefers-contrast: more` entrega um contraste ainda maior a quem pediu.',
        'Em modo de cores forçadas, sombras e fundos são ignorados; uma borda real mantém o cartão visível.',
        '`CanvasText` é uma cor de sistema que respeita o tema escolhido pelo usuário.'
      ] }
  ],
  erros: [
    { erro: "Cinza claro sobre branco para textos secundários.", porque: "Contraste abaixo de 4,5:1.", correcao: "use um cinza mais escuro (por exemplo, `#495057`) e verifique." },
    { erro: "Indicar erro ou estado apenas por cor.", porque: "Pessoas com daltonismo ou baixa visão podem não perceber.", correcao: "adicione texto, ícone, forma ou borda." },
    { erro: "`outline: none` sem substituto.", porque: "Quem usa teclado perde a referência.", correcao: "estilize `:focus-visible`." },
    { erro: "Bloquear o zoom (`user-scalable=no`).", porque: "Impede que pessoas com baixa visão ampliem o conteúdo.", correcao: "remova a restrição do `viewport`." },
    { erro: "Alturas fixas em `px` em caixas de texto.", porque: "O texto é cortado quando o usuário aumenta a fonte.", correcao: "use `min-height` ou altura automática." },
    { erro: "Ignorar `prefers-reduced-motion`.", porque: "Movimento amplo pode causar desconforto ou enjoo.", correcao: "ofereça versão reduzida das animações." }
  ],
  praticas: [
    'Verifique contraste de texto (4,5:1) e de componentes (3:1) em todos os estados.',
    'Mantenha foco visível e alvos de toque de pelo menos 44px.',
    'Use sempre um segundo indicador além da cor.',
    'Permita zoom e teste com 200% e com fontes maiores.',
    'Respeite as preferências do sistema: movimento, tema, contraste.'
  ],
  exercicios: [
    { titulo: "Revise este CSS",
      enunciado: 'Liste os problemas de acessibilidade visual e reescreva o trecho.',
      codigo: { lang: "css", x: `a { color: #999; text-decoration: none; }
button { outline: none; height: 28px; }
.erro { border: 1px solid red; }
.card { height: 120px; overflow: hidden; }` },
      dica: 'Contraste, sublinhado, foco, tamanho de toque, só cor, altura fixa.',
      resolucao: { lang: "css", codigo: `
a {
  color: #1864ab;
  text-decoration: underline;
}

button {
  min-height: 2.75rem;
}
button:focus-visible {
  outline: 3px solid #1c7ed6;
  outline-offset: 2px;
}

.erro {
  border: 3px solid #c92a2a;
}
/* + mensagem em texto no HTML: "Erro: ..." */

.card {
  min-height: 120px;
}`,
        comentario: '(1) `#999` sobre branco tem ~2,8:1, abaixo do mínimo; e sem sublinhado o link se distingue só pela cor. (2) Sem `outline`, o foco some; `height: 28px` é um alvo pequeno. (3) Erro só por uma borda vermelha fina: acrescente texto e mais espessura. (4) `height` fixo com `overflow: hidden` corta o conteúdo quando a fonte aumenta.' } },
    { titulo: "Verifique o contraste",
      enunciado: 'Texto `#767676` sobre fundo branco tem razão de contraste de cerca de 4,5:1 e `#888` sobre branco, cerca de 3,5:1. Para texto comum de 1rem, quais cumprem o nível AA? E para um ícone de 32px sem texto?',
      dica: 'Texto comum: 4,5:1. Componentes gráficos: 3:1.',
      resolucao: { lang: "txt", codigo: `Texto comum (mín. 4,5:1):
  #767676 sobre branco ≈ 4,5:1  → passa (é o cinza mais claro que passa em AA sobre branco)
  #888888 sobre branco ≈ 3,5:1  → NÃO passa

Ícone/componente gráfico (mín. 3:1):
  #767676 → passa
  #888888 → passa (3,5 ≥ 3)`,
        comentario: 'O limite muda conforme o tipo de elemento: texto comum exige 4,5:1; texto grande e componentes gráficos exigem 3:1. Confirme sempre com uma ferramenta de contraste, pois os números dependem das cores exatas.' } }
  ],
  referencias: [
    { t: "Contraste mínimo (WCAG 2.2)", u: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", fonte: "W3C WAI" },
    { t: "Foco visível (WCAG 2.2)", u: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html", fonte: "W3C WAI" },
    { t: "Acessibilidade em CSS e JavaScript", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Accessibility/CSS_and_JavaScript", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a4", titulo: "Transições e animações", minutos: 50,
  topicos: ["Transições e animações"],
  objetivos: [
    "Criar transições suaves com `transition` e entender quais propriedades podem ser animadas.",
    "Escrever animações com `@keyframes` e `animation`.",
    "Animar com bom desempenho (`transform` e `opacity`).",
    "Respeitar `prefers-reduced-motion` e evitar movimento que cause desconforto."
  ],
  conceito: [
    { h: "Transições" },
    { p: 'Uma **transição** anima a mudança de uma propriedade entre dois estados (por exemplo, normal e `:hover`). Declara-se no estado **base**: `transition: propriedade duração função-de-tempo atraso;`. Exemplo: `transition: background-color 0.2s ease;`.' },
    { lista: [
      '`transition-property`: quais propriedades animar (evite `all`: anima coisas inesperadas e pode custar desempenho).',
      '`transition-duration`: duração (`0.2s`, `200ms`). Interações de interface costumam ficar entre 100 e 300ms.',
      '`transition-timing-function`: curva (`ease`, `linear`, `ease-in-out`, `cubic-bezier(...)`).',
      '`transition-delay`: atraso inicial.'
    ] },
    { h: "Transformações" },
    { p: '`transform` move, gira, escala e inclina um elemento **sem alterar o layout**: `translate(10px, 0)`, `rotate(15deg)`, `scale(1.05)`. É a base da maior parte das animações porque o navegador pode executá-las de forma eficiente. `transform-origin` define o ponto de referência.' },
    { h: "Animações com `@keyframes`" },
    { p: 'Para sequências com mais de dois estados, ou animações automáticas, defina **quadros-chave** e aplique com `animation`: `animation: nome duração função atraso repetições direção preenchimento;`. Exemplo: `animation: pulsar 1.5s ease-in-out infinite;`. Propriedades úteis: `animation-iteration-count`, `animation-direction` (`alternate`), `animation-fill-mode` (`forwards` mantém o estado final) e `animation-play-state`.' },
    { h: "Desempenho" },
    { p: 'Animar `transform` e `opacity` é barato, pois não força o navegador a recalcular o layout. Animar `width`, `height`, `margin`, `top` ou `left` provoca recálculo de layout a cada quadro e pode travar em aparelhos modestos. Use `will-change` com parcimônia e só quando comprovadamente necessário.' },
    { h: "Acessibilidade e bom senso" },
    { lista: [
      'Respeite `prefers-reduced-motion`: desative ou reduza movimentos amplos.',
      'Evite piscadas mais de 3 vezes por segundo (risco de crises em pessoas com epilepsia fotossensível).',
      'Conteúdo em movimento automático por mais de 5 segundos precisa ter botão de pausa.',
      'Animação deve **ajudar** (feedback, transição de estado), e não decorar sem propósito.'
    ] },
    { nota: { t: "Animação não substitui feedback", x: 'Uma transição de cor ao passar o mouse não pode ser a única indicação de estado. Mantenha estados de foco, desabilitado e erro visíveis mesmo sem animação.' } }
  ],
  exemplos: [
    { titulo: "Botão com transição suave", lang: "css", arquivo: "transicao.css",
      codigo: `
.btn {
  background-color: #1971c2;
  color: #fff;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 20%);

  /* declara quais propriedades mudam e como */
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.btn:hover,
.btn:focus-visible {
  background-color: #1864ab;
  transform: translateY(-2px);              /* sobe 2px, sem mexer no layout */
  box-shadow: 0 6px 14px rgb(0 0 0 / 25%);
}

.btn:active { transform: translateY(0); }  /* "afunda" ao clicar */`,
      explicacao: [
        'A `transition` fica no estado **base**: assim ela vale na ida e na volta.',
        'Listamos as propriedades em vez de `all`, o que evita animar o que não deveria e melhora o desempenho.',
        '`transform: translateY(-2px)` move o botão sem deslocar elementos vizinhos.',
        '`:focus-visible` recebe o mesmo estilo de `:hover`: o teclado ganha o mesmo feedback.'
      ] },
    { titulo: "Animação com @keyframes", lang: "css", arquivo: "keyframes.css",
      codigo: `
/* Indicador de carregamento */
@keyframes girar {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 4px solid #dee2e6;
  border-top-color: #1971c2;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

/* Entrada de elemento com fade e deslocamento */
@keyframes entrar {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.aviso {
  animation: entrar 0.4s ease-out both;   /* "both": aplica o estado inicial e final */
}

/* Menos movimento para quem pediu */
@media (prefers-reduced-motion: reduce) {
  .spinner { animation-duration: 2.5s; }  /* ainda indica atividade, mas devagar */
  .aviso   { animation: none; }
}

/* HTML: <div class="spinner" role="status" aria-label="Carregando"></div> */`,
      explicacao: [
        '`from`/`to` equivalem a `0%`/`100%`; para mais etapas, use porcentagens.',
        '`linear` e `infinite` são típicos de indicadores de carregamento.',
        '`animation-fill-mode: both` garante que o estado inicial valha durante o atraso e o final permaneça depois.',
        'Para `prefers-reduced-motion`, o spinner foi desacelerado (indica atividade sem movimento brusco), e a entrada foi removida.',
        '`role="status"` e `aria-label` anunciam o carregamento a leitores de tela.'
      ] },
    { titulo: "Desempenho: o que animar", lang: "css", arquivo: "desempenho.css",
      codigo: `
/* EVITE: muda o layout a cada quadro */
.painel-ruim {
  transition: width 0.3s, margin-left 0.3s;
}
.painel-ruim.aberto { width: 300px; margin-left: 0; }

/* PREFIRA: transform e opacity */
.painel-bom {
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.painel-bom.aberto {
  transform: translateX(0);
  opacity: 1;
}

/* Painel fechado não deve receber foco nem ser lido */
.painel-bom:not(.aberto) { visibility: hidden; transition: transform 0.3s, opacity 0.3s, visibility 0s 0.3s; }`,
      explicacao: [
        'Animar `width` e `margin-left` força o recálculo do layout a cada quadro.',
        '`transform` e `opacity` evitam esse custo.',
        'Um painel fora de tela com `opacity: 0` ainda recebe foco do teclado; por isso a regra final usa `visibility: hidden`, que remove-o do foco e dos leitores de tela.',
        'O atraso `0s 0.3s` na `visibility` espera o fim da animação para esconder o painel.'
      ] }
  ],
  erros: [
    { erro: "Usar `transition: all`.", porque: "Anima propriedades que ninguém planejou (e pode ser pesado).", correcao: "liste as propriedades." },
    { erro: "Declarar a transição só no estado `:hover`.", porque: "Ela anima na ida, mas não na volta.", correcao: "declare no estado base." },
    { erro: "Tentar transicionar `display` ou propriedades sem valor intermediário (`height: auto`).", porque: "Não há como interpolar.", correcao: "anime `opacity`/`transform` e use `visibility`, ou técnicas modernas (`grid-template-rows: 0fr → 1fr`)." },
    { erro: "Animar `width`, `height`, `top` e `left`.", porque: "Provocam recálculo de layout e podem travar.", correcao: "use `transform` e `opacity`." },
    { erro: "Ignorar `prefers-reduced-motion`.", porque: "Movimento amplo prejudica algumas pessoas.", correcao: "ofereça alternativa reduzida." },
    { erro: "Animações infinitas e distrativas ao lado de texto.", porque: "Atrapalham a leitura e a concentração.", correcao: "limite a repetição e ofereça controle de pausa." }
  ],
  praticas: [
    'Use transições curtas (100 a 300ms) para dar feedback de interação.',
    'Anime `transform` e `opacity`; evite propriedades que afetem o layout.',
    'Dê o mesmo feedback a `:hover` e `:focus-visible`.',
    'Trate `prefers-reduced-motion` em toda animação de movimento.',
    'Anime com propósito: indicar estado, guiar a atenção, nunca só enfeitar.'
  ],
  exercicios: [
    { titulo: "Cartão que sobe",
      enunciado: 'Faça um cartão `.card` que, ao passar o mouse ou receber foco (use `:hover` e `:focus-within`), suba 4px e aumente a sombra, com transição de 0,2s. Desative a transição e o movimento para quem prefere menos movimento.',
      dica: '`transform: translateY(-4px)`; media query `prefers-reduced-motion`.',
      resolucao: { lang: "css", codigo: `
.card {
  box-shadow: 0 1px 3px rgb(0 0 0 / 15%);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover,
.card:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgb(0 0 0 / 20%);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .card:hover,
  .card:focus-within { transform: none; }
}`,
        comentario: '`:focus-within` reage quando qualquer elemento interno (um link, por exemplo) recebe o foco. A sombra pode continuar mudando para dar feedback sem movimento. A transição só anima `transform` e `box-shadow`.' } },
    { titulo: "Pulsar",
      enunciado: 'Crie uma animação `pulsar` que alterna a escala de 1 para 1,08 e de volta, em 1,5s, infinita, e aplique a `.alerta-novo`. Desligue-a para `prefers-reduced-motion: reduce`.',
      dica: '`@keyframes` com `0%, 100%` e `50%`.',
      resolucao: { lang: "css", codigo: `
@keyframes pulsar {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.08); }
}

.alerta-novo {
  animation: pulsar 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .alerta-novo { animation: none; }
}`,
        comentario: 'Os quadros `0%` e `100%` são idênticos, de modo que o ciclo recomeça sem salto. Animar apenas `transform` é leve. Como a animação é infinita, convém limitá-la (por exemplo, `animation-iteration-count: 3`) quando não houver necessidade de chamar atenção continuamente.' } }
  ],
  referencias: [
    { t: "Usando transições CSS", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_transitions/Using_CSS_transitions", fonte: "MDN Web Docs" },
    { t: "Usando animações CSS", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_animations/Using_CSS_animations", fonte: "MDN Web Docs" },
    { t: "Animação a partir de interações (WCAG)", u: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html", fonte: "W3C WAI" }
  ]
}

] });
