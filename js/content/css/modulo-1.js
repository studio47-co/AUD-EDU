/* CSS3 · Módulo 1 — Fundamentos
   Tópicos: o que é CSS · sintaxe · seletores · cascata e especificidade · herança · unidades e cores */
AE.Conteudo.modulo("css", 1, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m1a1", titulo: "O que é CSS, sintaxe e como aplicar", minutos: 45,
  topicos: ["O que é CSS", "Sintaxe", "Como aplicar CSS"],
  objetivos: [
    "Explicar o papel do CSS e sua relação com o HTML.",
    "Ler e escrever uma regra CSS (seletor, propriedade, valor).",
    "Aplicar CSS de três formas e saber qual usar em cada caso.",
    "Usar comentários e organizar um arquivo `.css`."
  ],
  conceito: [
    { h: "A aparência da web" },
    { p: 'CSS (*Cascading Style Sheets*, folhas de estilo em cascata) descreve **como** os elementos HTML são apresentados: cores, fontes, espaçamentos, posicionamento, animações. O HTML fornece estrutura e significado; o CSS cuida da apresentação. Separar as duas coisas permite mudar o visual de um site inteiro sem tocar no conteúdo.' },
    { h: "Anatomia de uma regra" },
    { p: 'Uma regra CSS é formada por um **seletor** (quem será estilizado) e um **bloco de declarações** entre chaves. Cada declaração é um par `propriedade: valor;` terminado em ponto e vírgula.' },
    { codigo: { lang: "css", x: `seletor {
  propriedade: valor;
  outra-propriedade: valor;
}` } },
    { h: "Três formas de aplicar CSS" },
    { lista: [
      '**Arquivo externo** (recomendado): `<link rel="stylesheet" href="estilo.css">` no `<head>`. Um só arquivo estiliza muitas páginas e o navegador o guarda em cache.',
      '**Elemento `<style>`** no `<head>`: útil em exemplos rápidos ou em uma página isolada.',
      '**Atributo `style`** (inline): vale só para aquele elemento, tem alta prioridade e mistura estrutura com aparência. Evite, salvo em casos pontuais.'
    ] },
    { h: "Comentários e organização" },
    { p: 'Comentários em CSS usam `/* ... */`. Espaços e quebras de linha não afetam o resultado, mas um estilo consistente (uma declaração por linha, indentação fixa) torna o arquivo legível. Agrupe regras por assunto: base da página, tipografia, componentes, layout.' },
    { nota: { t: "Erros não quebram o arquivo todo", x: 'Se uma declaração é inválida (por exemplo, um valor desconhecido), o navegador **ignora só aquela declaração** e segue para a próxima. Por isso, um erro de digitação costuma fazer um estilo "não funcionar" silenciosamente. Use as ferramentas de desenvolvimento para ver o que foi riscado.' } }
  ],
  exemplos: [
    { titulo: "Primeiro arquivo CSS ligado a uma página", lang: "html", arquivo: "index.html",
      codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Meu primeiro estilo</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <h1>Olá, CSS!</h1>
  <p>Este parágrafo será estilizado.</p>
</body>
</html>`,
      explicacao: [
        'O `<link>` dentro do `<head>` conecta o arquivo `estilo.css` à página.',
        'O caminho em `href` é relativo ao arquivo HTML: `estilo.css` está na mesma pasta.',
        'Se o estilo não aparecer, confira o nome, o caminho e se o `<link>` está no `<head>`.'
      ] },
    { titulo: "O arquivo estilo.css", lang: "css", arquivo: "estilo.css",
      codigo: `
/* Base da página */
body {
  font-family: Arial, sans-serif;  /* fonte do texto */
  color: #222222;                  /* cor do texto */
  background-color: #f5f5f5;       /* cor de fundo */
}

/* Título principal */
h1 {
  color: #0b5394;
  text-align: center;
}

/* Parágrafos */
p {
  line-height: 1.5;  /* altura da linha: melhora a leitura */
}`,
      explicacao: [
        '`body`, `h1` e `p` são **seletores de elemento**: valem para todos os elementos dessas tags.',
        '`font-family` lista fontes em ordem de preferência; `sans-serif` é a família genérica de reserva.',
        '`color` é a cor do texto; `background-color` é a do fundo.',
        'Cada declaração termina em `;`. As chaves `{}` delimitam o bloco.',
        'Os comentários explicam o objetivo de cada regra e não afetam a página.'
      ] },
    { titulo: "Estilo em `<style>` e inline, e a prioridade entre eles", lang: "html", arquivo: "formas.html",
      codigo: `
<head>
  <style>
    p { color: blue; }      /* vale para todos os parágrafos */
  </style>
</head>
<body>
  <p>Azul, vindo do elemento style.</p>
  <p style="color: green;">Verde, vindo do atributo style.</p>
</body>`,
      explicacao: [
        'A regra do `<style>` deixa todos os parágrafos azuis.',
        'O atributo `style` do segundo parágrafo **vence** a regra do `<style>`, porque estilos inline têm especificidade maior (veremos na aula 1.4).',
        'Por esse motivo, o inline dificulta a manutenção: para mudar a cor depois, é preciso caçar o atributo em cada elemento.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o ponto e vírgula entre declarações.", porque: "As duas declarações se juntam, ficam inválidas e o navegador as ignora.", correcao: "termine cada declaração com `;`." },
    { erro: "Escrever `colour` ou `background_color` (nome inventado ou com sublinhado).", porque: "O navegador ignora propriedades que não conhece, sem mostrar erro na página.", correcao: "use `color` e `background-color` (com hífen) e confirme nas ferramentas de desenvolvimento." },
    { erro: "Colocar o `<link>` no `<body>` com caminho errado.", porque: "O arquivo não é encontrado e a página aparece sem estilo.", correcao: "coloque o `<link>` no `<head>` e confira o caminho no painel Rede." },
    { erro: "Usar `{}` e `:` fora de lugar (`p: { color; red }`).", porque: "A sintaxe é `seletor { propriedade: valor; }`: o `:` fica entre propriedade e valor.", correcao: "revise a anatomia da regra." },
    { erro: "Usar CSS inline em tudo.", porque: "Espalha estilos pelo HTML e torna a manutenção cara.", correcao: "concentre os estilos em arquivos `.css`." }
  ],
  praticas: [
    'Prefira arquivos externos e mantenha o HTML limpo.',
    'Escreva uma declaração por linha, com indentação consistente.',
    'Comente seções do arquivo para orientar quem for editá-lo (inclusive você, no futuro).',
    'Teste suas regras com as ferramentas de desenvolvimento do navegador.'
  ],
  exercicios: [
    { titulo: "Estilize a página",
      enunciado: 'Dado o HTML com um `<h1>` e dois `<p>`, escreva um `estilo.css` que: deixe o fundo da página em `#fafafa`, o texto em `#333`, centralize o `h1` e dê cor `#a61e4d` a ele, e use `line-height: 1.6` nos parágrafos.',
      dica: 'Três seletores de elemento: `body`, `h1` e `p`.',
      resolucao: { lang: "css", codigo: `
body {
  background-color: #fafafa;
  color: #333;
}

h1 {
  color: #a61e4d;
  text-align: center;
}

p {
  line-height: 1.6;
}`,
        comentario: 'Cada regra usa um seletor de elemento. A cor do texto definida em `body` é **herdada** pelos parágrafos (veja a aula sobre herança), e o `h1` sobrescreve a cor com a sua própria regra.' } },
    { titulo: "Encontre o erro",
      enunciado: 'Por que o título abaixo continua preto?',
      codigo: { lang: "css", x: `h1 {
  colour: red
  text-align: center;
}` },
      dica: 'Há dois problemas na primeira declaração.',
      resolucao: { lang: "css", codigo: `h1 {
  color: red;
  text-align: center;
}`,
        comentario: '(1) A propriedade correta é `color` (grafia americana); `colour` não existe e é ignorada. (2) Faltou o `;` após `red`: sem ele, a declaração seguinte seria "engolida" pela anterior. Ambos os erros, isoladamente, já impediriam a cor vermelha.' } }
  ],
  referencias: [
    { t: "Introdução ao CSS (primeiros passos)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Getting_started", fonte: "MDN Web Docs" },
    { t: "Como o CSS é estruturado", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/What_is_CSS", fonte: "MDN Web Docs" },
    { t: "CSS: especificação (W3C)", u: "https://www.w3.org/Style/CSS/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a2", titulo: "Seletores", minutos: 55,
  topicos: ["Seletores"],
  objetivos: [
    "Usar seletores de elemento, classe, `id` e atributo.",
    "Combinar seletores com descendente, filho direto e irmão.",
    "Aplicar pseudo-classes (`:hover`, `:focus`, `:nth-child`) e pseudo-elementos (`::before`, `::after`).",
    "Escolher o seletor mais simples que resolve o problema."
  ],
  conceito: [
    { h: "Seletores básicos" },
    { lista: [
      '**Elemento**: `p { }` seleciona todos os parágrafos.',
      '**Classe**: `.destaque { }` seleciona todo elemento com `class="destaque"`. Pode ser reutilizada e combinada (`class="card destaque"`).',
      '**Id**: `#topo { }` seleciona o único elemento com `id="topo"`. O `id` deve ser único na página.',
      '**Universal**: `* { }` seleciona tudo (use com cuidado).',
      '**Agrupamento**: `h1, h2, h3 { }` aplica a mesma regra a vários seletores.'
    ] },
    { p: 'Em geral, estilize com **classes**: são reutilizáveis e têm especificidade moderada, o que facilita a manutenção. Ids são mais "pesados" na cascata e servem melhor como âncoras e alvos de JavaScript.' },
    { h: "Combinadores" },
    { lista: [
      '**Descendente** (espaço): `nav a { }` — qualquer `a` dentro de `nav`, em qualquer profundidade.',
      '**Filho direto** (`>`): `ul > li { }` — apenas `li` que são filhos diretos de `ul`.',
      '**Irmão adjacente** (`+`): `h2 + p { }` — o `p` imediatamente após um `h2`.',
      '**Irmãos gerais** (`~`): `h2 ~ p { }` — todos os `p` irmãos posteriores ao `h2`.'
    ] },
    { h: "Seletores de atributo" },
    { p: '`a[href]` seleciona links com `href`; `a[target="_blank"]` com valor exato; `a[href^="https"]` começa com; `a[href$=".pdf"]` termina com; `a[href*="exemplo"]` contém.' },
    { h: "Pseudo-classes e pseudo-elementos" },
    { lista: [
      '**Pseudo-classes** (um `:`) descrevem um **estado**: `:hover` (mouse sobre), `:focus` (foco do teclado), `:focus-visible`, `:active`, `:first-child`, `:last-child`, `:nth-child(2n)`, `:not(.x)`.',
      '**Pseudo-elementos** (dois `::`) criam ou selecionam **partes** de um elemento: `::before` e `::after` (inserem conteúdo gerado com `content`), `::first-line`, `::placeholder`.'
    ] },
    { nota: { t: "Estados de foco importam", x: 'Sempre estilize `:focus-visible` (ou mantenha o padrão do navegador). Quem navega pelo teclado depende do indicador de foco para saber onde está. `outline: none` sem substituto é uma barreira de acessibilidade.' } }
  ],
  exemplos: [
    { titulo: "Classes, ids e agrupamento", lang: "css", arquivo: "seletores-basicos.css",
      codigo: `
/* elemento */
p { line-height: 1.5; }

/* classe: reutilizável */
.destaque {
  background-color: #fff3bf;
  padding: 4px 8px;
}

/* id: único na página */
#topo {
  border-bottom: 2px solid #333;
}

/* agrupamento: mesma regra para vários seletores */
h1, h2, h3 {
  font-family: Georgia, serif;
}`,
      explicacao: [
        'O ponto (`.`) indica classe; o `#` indica id.',
        '`class="destaque"` pode aparecer em quantos elementos você quiser.',
        'O agrupamento evita repetir as mesmas declarações para `h1`, `h2` e `h3`.',
        '`padding` (espaçamento interno) será estudado em detalhes na aula 2.3.'
      ] },
    { titulo: "Combinadores em ação", lang: "html", arquivo: "combinadores.html",
      codigo: `
<!-- HTML -->
<nav class="menu">
  <ul>
    <li><a href="/">Início</a></li>
    <li><a href="/cursos">Cursos</a>
      <ul>
        <li><a href="/cursos/html">HTML</a></li>
      </ul>
    </li>
  </ul>
</nav>
<h2>Título</h2>
<p>Primeiro parágrafo (logo após o h2).</p>
<p>Segundo parágrafo.</p>

<style>
  .menu a { text-decoration: none; }     /* descendente: todos os links do menu */
  .menu > ul > li { display: inline-block; } /* filhos diretos, nível a nível */
  h2 + p { font-weight: bold; }          /* só o primeiro p após o h2 */
  h2 ~ p { color: #555; }                /* todos os p irmãos posteriores */
</style>`,
      explicacao: [
        '`.menu a` atinge **todos** os links dentro do menu, inclusive os do submenu.',
        '`.menu > ul > li` percorre a estrutura só pelos filhos diretos: não alcança o `li` do submenu.',
        '`h2 + p` formata apenas o primeiro parágrafo; `h2 ~ p` formata os dois (o primeiro herda também o negrito da regra anterior, pois as duas regras se aplicam).',
        'Dois `<style>` e HTML no mesmo bloco são só para exibição: em um projeto, o CSS fica em arquivo próprio.'
      ] },
    { titulo: "Atributos, pseudo-classes e pseudo-elementos", lang: "css", arquivo: "pseudo.css",
      codigo: `
/* seletores de atributo */
a[target="_blank"]::after {
  content: " ↗";               /* pseudo-elemento: texto gerado */
}
a[href$=".pdf"] { font-weight: 600; }

/* estados */
a:hover,
a:focus-visible {
  background-color: #e7f5ff;
  outline: 2px solid #1971c2;  /* indicador de foco visível */
}

/* posição na lista */
li:nth-child(odd)  { background-color: #f1f3f5; }
li:last-child      { border-bottom: none; }
li:not(.ativo)     { opacity: 0.85; }

/* campo de formulário */
input::placeholder { color: #868e96; }`,
      explicacao: [
        '`a[target="_blank"]::after` acrescenta uma seta após cada link que abre em nova aba. O `content` gera o texto sem alterar o HTML.',
        '`a:hover, a:focus-visible` aplica o mesmo estilo ao passar o mouse e ao focar pelo teclado. A vírgula agrupa os dois seletores.',
        '`:nth-child(odd)` cria listras alternadas; `:not(.ativo)` exclui os que têm a classe `ativo`.',
        'Conteúdo gerado por `content` não é confiável para informações essenciais: leitores de tela podem ou não anunciá-lo.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o ponto da classe (`destaque { }`).", porque: "O navegador procura uma tag `<destaque>`, que não existe.", correcao: "use `.destaque` para classes e `#topo` para ids." },
    { erro: "Usar o mesmo `id` em vários elementos.", porque: "Ids devem ser únicos; o comportamento fica imprevisível (e quebra `label for` e âncoras).", correcao: "use classes para o que se repete." },
    { erro: "Seletores muito longos (`body div.main ul li a span`).", porque: "Ficam frágeis (qualquer mudança no HTML os quebra) e difíceis de sobrescrever.", correcao: "dê uma classe ao elemento e use-a." },
    { erro: "Confundir `:` com `::`.", porque: "Pseudo-classes (`:hover`) e pseudo-elementos (`::before`) são coisas diferentes.", correcao: "estado = um dois-pontos; parte gerada ou selecionada = dois." },
    { erro: "`::before` sem a propriedade `content`.", porque: "Sem `content`, o pseudo-elemento não é gerado.", correcao: "declare `content` (mesmo `content: \"\"`)." },
    { erro: "Remover o `outline` do foco.", porque: "Quem usa teclado perde a referência de onde está.", correcao: "estilize `:focus-visible` com um indicador visível." }
  ],
  praticas: [
    'Prefira classes com nomes que descrevam a função (`.card`, `.menu-principal`), e não a aparência (`.vermelho`).',
    'Mantenha os seletores curtos e de baixa especificidade.',
    'Estilize sempre `:focus-visible` junto com `:hover`.',
    'Use `:not()` e `:nth-child()` para evitar classes só de posição.'
  ],
  exercicios: [
    { titulo: "Qual seletor?",
      enunciado: 'Escreva o seletor para cada caso: (a) todos os links dentro de um elemento com classe `rodape`; (b) apenas os `li` filhos diretos de `ul.menu`; (c) o primeiro `p` imediatamente após cada `h2`; (d) links que apontam para arquivos `.pdf`; (e) o último item de qualquer lista.',
      dica: 'Combinadores: espaço, `>`, `+`; atributos: `$=`; pseudo-classe: `:last-child`.',
      resolucao: { lang: "css", codigo: `
.rodape a { }
ul.menu > li { }
h2 + p { }
a[href$=".pdf"] { }
li:last-child { }`,
        comentario: '(a) descendente: espaço entre `.rodape` e `a`. (b) filho direto com `>`. (c) irmão adjacente com `+`. (d) `$=` significa "termina com". (e) `:last-child` aplica-se ao último elemento entre os irmãos.' } },
    { titulo: "Botão com estados",
      enunciado: 'Escreva as regras de um botão com a classe `.btn`: fundo `#1971c2`, texto branco, cantos arredondados de 6px e padding `8px 16px`. Ao passar o mouse ou focar com teclado, o fundo deve escurecer para `#1864ab`, e o foco deve ter contorno visível de 3px.',
      dica: 'Use `:hover` e `:focus-visible` agrupados em uma só regra.',
      resolucao: { lang: "css", codigo: `
.btn {
  background-color: #1971c2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn:hover,
.btn:focus-visible {
  background-color: #1864ab;
}

.btn:focus-visible {
  outline: 3px solid #74c0fc;
  outline-offset: 2px;
}`,
        comentario: 'Os dois estados compartilham a cor mais escura. O contorno do foco é declarado em regra própria para valer só no teclado (`:focus-visible`), com `outline-offset` para dar respiro. `cursor: pointer` sinaliza que o elemento é clicável.' } }
  ],
  referencias: [
    { t: "Seletores CSS", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_selectors", fonte: "MDN Web Docs" },
    { t: "Pseudo-classes", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/Pseudo-classes", fonte: "MDN Web Docs" },
    { t: "Seletores de nível 4", u: "https://www.w3.org/TR/selectors-4/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a3", titulo: "Cascata, especificidade e herança", minutos: 50,
  topicos: ["Cascata", "Especificidade", "Herança"],
  objetivos: [
    "Prever qual regra vence quando duas entram em conflito.",
    "Calcular a especificidade de um seletor.",
    "Distinguir propriedades herdadas das não herdadas e usar `inherit`, `initial` e `unset`.",
    "Depurar conflitos de estilo com as ferramentas de desenvolvimento."
  ],
  conceito: [
    { h: "O que é a cascata" },
    { p: 'O "C" de CSS é *Cascading*: quando várias regras atingem o mesmo elemento e propriedade, o navegador decide **uma** vencedora seguindo critérios nesta ordem:' },
    { ol: [
      '**Origem e importância**: estilos do autor vencem os do navegador; declarações com `!important` invertem essa ordem.',
      '**Especificidade**: o seletor mais específico vence.',
      '**Ordem de aparição**: com especificidades iguais, vence a regra que vem **por último**.'
    ] },
    { h: "Calculando a especificidade" },
    { p: 'Pense em três colunas: **(A, B, C)**.' },
    { lista: [
      '**A**: quantidade de `id`s (`#topo`).',
      '**B**: quantidade de classes, atributos e pseudo-classes (`.card`, `[type]`, `:hover`).',
      '**C**: quantidade de elementos e pseudo-elementos (`p`, `::before`).',
      'O estilo inline (atributo `style`) está acima de todos. O seletor universal `*` e os combinadores não contam.'
    ] },
    { p: 'Compara-se coluna por coluna, da esquerda para a direita: `(1,0,0)` vence qualquer quantidade de classes, e `(0,2,0)` vence qualquer quantidade de elementos. Exemplos: `p` = (0,0,1); `.destaque` = (0,1,0); `nav .item:hover` = (0,2,1); `#topo .item` = (1,1,0).' },
    { h: "`!important`: último recurso" },
    { p: '`!important` na declaração faz com que ela vença regras normais. Isso cria uma "corrida armamentista" na qual só outro `!important` mais específico pode vencer. Use somente para utilitários intencionais, e evite em componentes.' },
    { h: "Herança" },
    { p: 'Algumas propriedades são **herdadas**: se você as define no pai, os filhos as recebem. Em geral, são as propriedades de **texto**: `color`, `font-family`, `font-size`, `line-height`, `text-align`. As de **caixa** não são herdadas: `margin`, `padding`, `border`, `background`, `width`.' },
    { lista: [
      '`inherit`: força herdar o valor do pai.',
      '`initial`: volta ao valor padrão da especificação.',
      '`unset`: herda se a propriedade for herdada; senão, volta ao inicial.'
    ] },
    { nota: { t: "Dica de projeto", x: 'Defina `font-family`, `color` e `line-height` uma vez em `body` e deixe os descendentes herdarem. Mantenha seletores de baixa especificidade e organize o arquivo do geral ao específico: assim, a ordem de aparição resolve a maior parte dos conflitos sem `!important`.' } }
  ],
  exemplos: [
    { titulo: "Quem vence?", lang: "css", arquivo: "cascata.css",
      codigo: `
p            { color: black; }   /* (0,0,1) */
.aviso       { color: orange; }  /* (0,1,0) */
p.aviso      { color: red; }     /* (0,1,1) */
#destaque    { color: blue; }    /* (1,0,0) */

/* HTML: <p id="destaque" class="aviso">Texto</p>
   Resultado: azul. O id (1,0,0) é mais específico que todas as outras. */`,
      explicacao: [
        'As quatro regras atingem o mesmo parágrafo; a de maior especificidade vence: `#destaque` (1,0,0).',
        'Sem o `id`, venceria `p.aviso` (0,1,1) sobre `.aviso` (0,1,0).',
        'A ordem das regras no arquivo só desempata quando a especificidade é igual.'
      ] },
    { titulo: "Ordem de aparição e herança", lang: "css", arquivo: "heranca.css",
      codigo: `
body {
  font-family: Arial, sans-serif;  /* herdada por todos os descendentes */
  color: #222;                     /* herdada */
  border: 1px solid red;           /* NÃO herdada */
}

a { color: inherit; }              /* links usam a cor do texto ao redor */

button { font-family: inherit; }   /* botões não herdam a fonte por padrão: forçamos */

.nota { color: #666; }
.nota { color: #c92a2a; }          /* mesma especificidade: a última vence (vermelho) */`,
      explicacao: [
        '`font-family` e `color` fluem de `body` para todos os descendentes. A `border` fica só no `body`.',
        'Links e botões têm estilos padrão do navegador que não herdam do pai; `inherit` faz com que sigam o texto ao redor.',
        'Nas duas regras `.nota`, a especificidade é igual: vence a **última**, e o texto fica vermelho.',
        'Misturar regras iguais assim é um sinal de desorganização: junte-as ou apague a que não vale.'
      ] },
    { titulo: "Depurando um conflito", lang: "html", arquivo: "depuracao.html",
      codigo: `
<style>
  .card p      { color: gray; }
  .destaque    { color: crimson; }
</style>

<div class="card">
  <p class="destaque">Por que não fica vermelho?</p>
</div>

<!-- Análise:
  .card p     = (0,1,1)
  .destaque   = (0,1,0)   <- perde para (0,1,1)
  Solução: aumentar a especificidade de forma proposital, e não com !important -->

<style>
  .card .destaque { color: crimson; }  /* (0,2,0) vence (0,1,1) */
</style>`,
      explicacao: [
        '`.card p` (0,1,1) é mais específico que `.destaque` (0,1,0), então o cinza vence apesar de `.destaque` ser mais "direto".',
        'Nas ferramentas de desenvolvimento, a declaração perdedora aparece **riscada** no painel Estilos.',
        '`.card .destaque` (0,2,0) vence (0,1,1) sem recorrer a `!important`.',
        'Uma solução melhor, em projetos novos, é manter todas as regras de componentes com a mesma baixa especificidade (apenas uma classe).'
      ] }
  ],
  erros: [
    { erro: "Usar `!important` para \"resolver\" um conflito.", porque: "Torna futuras mudanças ainda mais difíceis e exige outro `!important` para vencer.", correcao: "entenda a especificidade e ajuste a regra ou a ordem." },
    { erro: "Achar que o elemento mais próximo no HTML vence automaticamente.", porque: "Proximidade só importa na herança. Em conflito direto, vale especificidade e depois ordem.", correcao: "calcule a especificidade de cada seletor." },
    { erro: "Esperar que `margin` ou `border` do pai passem para os filhos.", porque: "Propriedades de caixa não são herdadas.", correcao: "aplique-as ao próprio elemento (ou use `inherit` conscientemente)." },
    { erro: "Usar `id` em todos os estilos.", porque: "A alta especificidade deixa o CSS rígido e difícil de sobrescrever.", correcao: "use classes e reserve o `id` para âncoras e JavaScript." },
    { erro: "Colocar uma regra geral depois da específica e esperar que a específica vença.", porque: "Com especificidades iguais vence a última; com diferentes, vence a mais específica, independente da ordem.", correcao: "organize do geral ao específico e confira a especificidade." }
  ],
  praticas: [
    'Defina o texto base em `body` e aproveite a herança.',
    'Mantenha a especificidade baixa e uniforme (uma classe por componente).',
    'Organize o CSS do geral para o específico.',
    'Reserve `!important` para utilitários deliberados.',
    'Use o painel Estilos do navegador para ver as regras que se aplicam e as que foram riscadas.'
  ],
  exercicios: [
    { titulo: "Calcule a especificidade",
      enunciado: 'Escreva a especificidade (A,B,C) de cada seletor: (a) `ul li a`; (b) `.menu .item:hover`; (c) `#topo nav a.ativo`; (d) `input[type="text"]`; (e) `p::first-line`.',
      dica: 'A = ids; B = classes, atributos e pseudo-classes; C = elementos e pseudo-elementos.',
      resolucao: { lang: "txt", codigo: `(a) ul li a              = (0,0,3)
(b) .menu .item:hover    = (0,3,0)
(c) #topo nav a.ativo    = (1,1,2)
(d) input[type="text"]   = (0,1,1)
(e) p::first-line        = (0,0,2)`,
        comentario: '(b) duas classes e uma pseudo-classe somam 3 na coluna B. (c) um id, uma classe (`.ativo`) e dois elementos (`nav` e `a`). (d) o atributo conta como classe (B) e `input` como elemento (C). (e) o pseudo-elemento conta como elemento.' } },
    { titulo: "Descubra a cor",
      enunciado: 'Qual será a cor do texto do parágrafo `<p class="a b" id="c">`? Regras: `p { color: red; }`, `.a { color: green; }`, `.b { color: blue; }`, `.a.b { color: orange; }`, `#c { color: purple; }`. E se removermos a regra `#c`?',
      dica: '`.a.b` conta duas classes (0,2,0).',
      resolucao: { lang: "txt", codigo: `Com #c:   purple  (1,0,0) vence tudo
Sem #c:   orange  (0,2,0) vence .a e .b (0,1,0) e p (0,0,1)`,
        comentario: 'Com o `id`, a especificidade (1,0,0) supera as demais. Sem ele, `.a.b` soma duas classes (0,2,0) e vence as que têm apenas uma (`.a` e `.b`, ambas (0,1,0)) e a do elemento `p`. Se as regras `.a` e `.b` fossem as únicas, a última no arquivo (`.b`, azul) venceria pela ordem.' } }
  ],
  referencias: [
    { t: "Cascata, especificidade e herança", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Cascade_and_inheritance", fonte: "MDN Web Docs" },
    { t: "Especificidade", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/Specificity", fonte: "MDN Web Docs" },
    { t: "CSS Cascading and Inheritance Level 4", u: "https://www.w3.org/TR/css-cascade-4/", fonte: "W3C" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a4", titulo: "Unidades, cores e valores", minutos: 45,
  topicos: ["Unidades", "Cores", "Valores"],
  objetivos: [
    "Escolher entre unidades absolutas e relativas (`px`, `rem`, `em`, `%`, `vw`, `vh`).",
    "Escrever cores em nome, hexadecimal, `rgb()` e `hsl()`.",
    "Usar funções de valor como `calc()`, `min()`, `max()` e `clamp()`.",
    "Declarar e usar variáveis CSS (`--nome`, `var()`)."
  ],
  conceito: [
    { h: "Unidades de medida" },
    { lista: [
      '`px`: pixel de CSS. Previsível, mas **não acompanha** a preferência de tamanho de fonte do usuário.',
      '`rem`: múltiplo do tamanho de fonte do elemento raiz (`html`). Em geral 1rem = 16px. É a unidade recomendada para tamanhos de fonte e espaçamentos que devem respeitar o ajuste do usuário.',
      '`em`: múltiplo do tamanho de fonte **do próprio elemento** (ou do pai, em `font-size`). Útil para componentes que escalam com o texto; cuidado com o efeito cumulativo em elementos aninhados.',
      '`%`: percentual em relação ao valor do **pai** (a propriedade de referência varia: largura do pai para `width`, por exemplo).',
      '`vw` e `vh`: 1% da largura e da altura da janela. `dvh` considera a barra do navegador móvel.',
      '`ch`: largura do caractere "0" da fonte; ótimo para limitar a largura de um texto (`max-width: 65ch`).',
      'Valores sem unidade: `0`, `line-height: 1.5` e `opacity`.'
    ] },
    { h: "Formas de escrever cores" },
    { lista: [
      '**Nome**: `red`, `rebeccapurple`, `transparent`. Poucos, mas práticos.',
      '**Hexadecimal**: `#rrggbb` (`#1971c2`), abreviado `#rgb` (`#fff`) e com transparência `#rrggbbaa`.',
      '**`rgb()`**: `rgb(25 113 194)`, e com opacidade `rgb(25 113 194 / 50%)`.',
      '**`hsl()`**: matiz (0-360), saturação e luminosidade: `hsl(210 77% 42%)`. É a forma mais **fácil de ajustar** (variar luminosidade gera tons da mesma cor).',
      '`currentColor`: usa o valor atual de `color`, e é ótimo para bordas e ícones que acompanham o texto.'
    ] },
    { nota: { t: "Contraste de cores", x: 'A cor do texto precisa de contraste suficiente com o fundo. As diretrizes WCAG pedem pelo menos 4,5:1 para texto comum e 3:1 para texto grande. Confira com a ferramenta de contraste do navegador. Não use só a cor para transmitir informação.' } },
    { h: "Funções matemáticas" },
    { lista: [
      '`calc()`: faz contas misturando unidades (`calc(100% - 2rem)`). Em `+` e `-`, os espaços ao redor são obrigatórios.',
      '`min(a, b)` escolhe o menor; `max(a, b)`, o maior.',
      '`clamp(mín, ideal, máx)`: valor flexível limitado. `font-size: clamp(1rem, 2.5vw, 2rem)` cresce com a janela, sem passar de 2rem nem cair abaixo de 1rem.'
    ] },
    { h: "Variáveis CSS (propriedades personalizadas)" },
    { p: 'Declare com dois hifens (`--cor-primaria: #1971c2;`), normalmente em `:root` (o elemento raiz), e use com `var(--cor-primaria)`. Diferentemente das variáveis de pré-processadores, elas são **dinâmicas**: respeitam a cascata e podem ser alteradas por JavaScript ou por contexto (por exemplo, para um tema escuro). `var(--x, valor-padrão)` aceita um valor reserva.' }
  ],
  exemplos: [
    { titulo: "Unidades na prática", lang: "css", arquivo: "unidades.css",
      codigo: `
html { font-size: 100%; }            /* respeita a configuração do usuário (em geral 16px) */

body {
  font-size: 1rem;                   /* 16px por padrão */
  line-height: 1.6;                  /* sem unidade: múltiplo do tamanho da fonte */
}

h1 { font-size: 2rem; margin-bottom: 0.5em; }  /* margem proporcional ao próprio h1 */

.artigo {
  max-width: 65ch;                   /* linhas confortáveis de ler */
  margin-inline: auto;               /* centraliza horizontalmente */
  padding: 1.5rem;
}

.hero { min-height: 60vh; }          /* 60% da altura da janela */
.coluna { width: 50%; }              /* metade da largura do pai */`,
      explicacao: [
        '`rem` mantém tamanhos proporcionais à configuração de fonte do usuário.',
        '`line-height: 1.6` sem unidade evita problemas de herança: cada elemento multiplica o **seu** tamanho de fonte.',
        '`max-width: 65ch` limita a largura do texto a cerca de 65 caracteres, uma boa medida de leitura.',
        '`margin-inline: auto` centraliza um bloco com largura definida (propriedade lógica, equivale a `margin-left` e `margin-right`).'
      ] },
    { titulo: "A mesma cor em várias notações", lang: "css", arquivo: "cores.css",
      codigo: `
.azul-1 { color: #1971c2; }
.azul-2 { color: rgb(25 113 194); }
.azul-3 { color: hsl(210 77% 42%); }

/* Tons da mesma cor, variando só a luminosidade (fácil com hsl) */
.claro  { background-color: hsl(210 77% 92%); }
.medio  { background-color: hsl(210 77% 42%); }
.escuro { background-color: hsl(210 77% 22%); }

/* Transparência */
.vidro  { background-color: rgb(0 0 0 / 40%); }

/* Borda que acompanha a cor do texto */
.tag {
  color: #2b8a3e;
  border: 1px solid currentColor;
}`,
      explicacao: [
        'As três primeiras classes produzem **a mesma cor**, em notações diferentes.',
        'Em `hsl`, para obter um tom mais claro ou mais escuro, basta mudar o terceiro valor.',
        '`rgb(0 0 0 / 40%)` é preto com 40% de opacidade: o fundo atrás aparece.',
        '`currentColor` na borda usa o verde definido em `color`, então a cor só precisa ser declarada uma vez.'
      ] },
    { titulo: "Variáveis, calc() e clamp()", lang: "css", arquivo: "variaveis.css",
      codigo: `
:root {
  --cor-primaria: #1971c2;
  --cor-texto: #212529;
  --espaco: 1rem;
  --raio: 8px;
}

body { color: var(--cor-texto); }

.btn {
  background-color: var(--cor-primaria);
  padding: calc(var(--espaco) / 2) var(--espaco);  /* 0.5rem 1rem */
  border-radius: var(--raio);
}

.sidebar { width: calc(100% - 2 * var(--espaco)); }

h1 { font-size: clamp(1.75rem, 4vw, 3rem); }       /* fluido, com limites */

/* Mudando as variáveis em um contexto: tema escuro */
.tema-escuro {
  --cor-texto: #f1f3f5;
  --cor-primaria: #74c0fc;
}`,
      explicacao: [
        'As variáveis são declaradas em `:root` e ficam disponíveis em toda a página.',
        '`calc(var(--espaco) / 2)` combina variável e divisão.',
        '`clamp(1.75rem, 4vw, 3rem)` deixa o título fluido entre 1,75rem e 3rem.',
        'Dentro de `.tema-escuro`, as variáveis recebem outro valor, e **todos** os elementos que as usam mudam. Isso mostra o poder da cascata aplicada às variáveis.'
      ] }
  ],
  erros: [
    { erro: "Usar `px` em tudo, inclusive em fontes.", porque: "O texto não acompanha a preferência de tamanho de fonte do usuário.", correcao: "use `rem` para tipografia e espaçamentos que devem escalar." },
    { erro: "Escrever `calc(100%-2rem)` sem espaços.", porque: "Os operadores `+` e `-` exigem espaços; a declaração fica inválida e é ignorada.", correcao: "escreva `calc(100% - 2rem)`." },
    { erro: "Dar unidade ao `line-height` (`1.5em`) em um pai.", porque: "O valor calculado é herdado como pixels fixos e pode ficar apertado nos filhos com fonte maior.", correcao: "use número sem unidade (`1.5`)." },
    { erro: "Usar `em` aninhado sem perceber o efeito cumulativo.", porque: "`font-size: 1.2em` em elementos aninhados se multiplica a cada nível.", correcao: "prefira `rem` para fontes, ou controle o aninhamento." },
    { erro: "Texto cinza claro sobre fundo branco.", porque: "O contraste insuficiente impede a leitura por muitas pessoas.", correcao: "verifique a razão de contraste (mínimo 4,5:1)." },
    { erro: "Variável usada fora do escopo onde foi declarada.", porque: "Variáveis seguem a cascata e a herança: se declaradas em `.tema`, só valem dentro dele.", correcao: "declare em `:root` quando forem globais." }
  ],
  praticas: [
    'Use `rem` para fontes e espaços, `%`/`fr` para larguras flexíveis e `px` só onde precisão fixa importa (bordas, sombras).',
    'Centralize cores, espaçamentos e raios em variáveis em `:root`.',
    'Prefira `hsl()` para criar variações de uma cor.',
    'Use `clamp()` para tipografia fluida com limites seguros.',
    'Verifique sempre o contraste do texto.'
  ],
  exercicios: [
    { titulo: "Crie uma paleta com variáveis",
      enunciado: 'Declare em `:root` as variáveis `--cor-fundo` (`#f8f9fa`), `--cor-texto` (`#212529`), `--cor-destaque` (`#d9480f`) e `--espaco` (`1rem`). Use-as em `body` (fundo e texto) e em `.aviso` (borda esquerda de 4px na cor de destaque e padding igual ao espaço).',
      dica: 'Use `var(--nome)`.',
      resolucao: { lang: "css", codigo: `
:root {
  --cor-fundo: #f8f9fa;
  --cor-texto: #212529;
  --cor-destaque: #d9480f;
  --espaco: 1rem;
}

body {
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
}

.aviso {
  border-left: 4px solid var(--cor-destaque);
  padding: var(--espaco);
}`,
        comentario: 'As variáveis são declaradas uma vez e reutilizadas. Para mudar a cor de destaque em todo o site, basta alterar a linha em `:root`.' } },
    { titulo: "Converta e calcule",
      enunciado: '(a) Se `html` tem 16px, quantos px valem 1,5rem? (b) Escreva `font-size` fluido que fique entre 1rem e 1,5rem, ideal 2vw. (c) Escreva a largura de uma coluna que ocupe 100% do pai menos 3rem. (d) A cor `#ffffff` em `rgb()`.',
      dica: '(b) clamp; (c) calc.',
      resolucao: { lang: "txt", codigo: `(a) 1,5 × 16 = 24px
(b) font-size: clamp(1rem, 2vw, 1.5rem);
(c) width: calc(100% - 3rem);
(d) rgb(255 255 255)`,
        comentario: '(a) rem é múltiplo do tamanho da raiz. (b) `clamp(mín, ideal, máx)`. (c) espaços ao redor do `-` são obrigatórios. (d) `#ff` em hexadecimal vale 255 em cada canal.' } }
  ],
  referencias: [
    { t: "Valores e unidades CSS", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Values_and_units", fonte: "MDN Web Docs" },
    { t: "Propriedades personalizadas (variáveis CSS)", u: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties", fonte: "MDN Web Docs" },
    { t: "Contraste mínimo (WCAG)", u: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", fonte: "W3C WAI" }
  ]
}

] });
