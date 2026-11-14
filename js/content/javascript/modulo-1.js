/* JavaScript · Módulo 1 — Fundamentos
   Tópicos: introdução · variáveis · tipos de dados · operadores · condicionais · laços */
AE.Conteudo.modulo("javascript", 1, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m1a1", titulo: "Introdução ao JavaScript", minutos: 50,
  topicos: ["Introdução ao JavaScript"],
  objetivos: [
    "Explicar o que é JavaScript e onde ele roda (navegador e Node.js).",
    "Executar código no console do navegador e em uma página HTML.",
    "Escrever instruções, comentários e saídas com `console.log`.",
    "Entender o fluxo de execução e ler mensagens de erro."
  ],
  conceito: [
    { h: "O que é JavaScript" },
    { p: 'JavaScript (JS) é uma linguagem de programação **interpretada**, de tipagem **dinâmica**, criada para dar comportamento a páginas web. Hoje roda também fora do navegador, por exemplo no **Node.js**, em servidores e ferramentas de linha de comando. Se o HTML é a estrutura e o CSS é a aparência, o JavaScript é o **comportamento**: reagir a cliques, validar formulários, buscar dados e atualizar a página sem recarregá-la.' },
    { p: 'JavaScript **não é Java**: são linguagens diferentes, com nomes parecidos por razões históricas. A linguagem é padronizada pela especificação **ECMAScript** (ES); as versões modernas (ES2015 em diante) trouxeram recursos que veremos no módulo 4.' },
    { h: "Onde escrever e executar" },
    { lista: [
      '**Console do navegador** (F12 → Console): ideal para testar linhas rapidamente.',
      '**Arquivo `.js`** ligado ao HTML com `<script src="app.js" defer></script>`. O atributo `defer` faz o script rodar só depois de o HTML ser lido, o que evita erros por elementos ainda inexistentes.',
      '**Node.js**: `node arquivo.js` no terminal.',
      'Evite escrever código dentro de atributos HTML (`onclick="..."`) e em `<script>` misturado ao HTML: separe estrutura, estilo e comportamento.'
    ] },
    { h: "Instruções, comentários e saída" },
    { lista: [
      'Um programa é uma sequência de **instruções**, executadas de cima para baixo. O ponto e vírgula ao fim é recomendado; o JS tem inserção automática de `;`, mas confiar nela causa raros e confusos erros.',
      'Comentários: `// uma linha` e `/* várias linhas */`.',
      '`console.log(valor)` escreve no console: sua principal ferramenta de depuração. Também existem `console.error`, `console.warn` e `console.table`.',
      'JavaScript diferencia **maiúsculas de minúsculas**: `nome` e `Nome` são identificadores diferentes.'
    ] },
    { h: "Lendo erros" },
    { p: 'Quando algo dá errado, o console mostra um erro com o **tipo** (`ReferenceError`, `TypeError`, `SyntaxError`), a **mensagem** e o **arquivo e a linha**. Ler a mensagem com calma resolve a maioria dos problemas. `SyntaxError` é um erro de escrita (o script nem executa); `ReferenceError` indica uma variável que não existe; `TypeError`, uma operação inválida para o tipo do valor (como chamar algo que não é função).' },
    { nota: { t: "Modo estrito", x: 'Adicionar `"use strict";` no topo do arquivo ativa um modo mais rigoroso, que transforma erros silenciosos em erros visíveis (como usar uma variável não declarada). Módulos ES (módulo 4) já são estritos por padrão.' } }
  ],
  exemplos: [
    { titulo: "Primeiro script ligado a uma página", lang: "html", arquivo: "index.html",
      codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Olá, JavaScript</title>
  <script src="app.js" defer></script>
</head>
<body>
  <h1>Abra o console (F12)</h1>
</body>
</html>`,
      explicacao: [
        'O `<script>` fica no `<head>`, mas com `defer` o navegador só o executa depois de montar o HTML.',
        'Sem `defer`, um script no `<head>` rodaria antes de a página existir e não encontraria os elementos.',
        'O caminho `app.js` é relativo ao arquivo HTML.'
      ] },
    { titulo: "app.js: saídas e comentários", lang: "js", arquivo: "app.js",
      codigo: `
"use strict";

// Isto é um comentário de uma linha
console.log("Olá, mundo!");        // texto entre aspas é uma string
console.log(2 + 3);                // 5: o JS calcula antes de imprimir
console.log("Soma:", 2 + 3);       // vários valores separados por vírgula

/* Comentário
   de várias linhas */

console.warn("Isto é um aviso");
console.error("Isto é um erro registrado (o programa continua)");
console.table([{ nome: "Ana", nota: 9 }, { nome: "Bia", nota: 8 }]);`,
      explicacao: [
        'As instruções executam na ordem em que aparecem.',
        '`console.log` aceita vários argumentos e os mostra separados por espaço.',
        '`console.error` apenas **registra** um erro: não interrompe o programa (diferente de lançar um erro, que veremos no módulo 4).',
        '`console.table` mostra arrays e objetos em formato de tabela: ótimo para inspecionar dados.'
      ] },
    { titulo: "Tipos de erro mais comuns", lang: "js", arquivo: "erros.js",
      codigo: `
// SyntaxError: o script nem roda (parêntese não fechado)
// console.log("oi";

// ReferenceError: variável que não existe
// console.log(idade);        // ReferenceError: idade is not defined

// TypeError: operação inválida para o tipo do valor
// const nome = "Ana";
// nome();                    // TypeError: nome is not a function

// Leitura de propriedade de algo indefinido: o TypeError mais comum
// const usuario = undefined;
// console.log(usuario.nome); // TypeError: Cannot read properties of undefined

console.log("As linhas acima estão comentadas para o arquivo rodar.");`,
      explicacao: [
        'Descomente uma linha por vez para ver cada mensagem no console.',
        'O erro mostra a **linha** onde ocorreu: comece por ela.',
        'Em erro de execução, o script **para naquela linha**: o que vem depois não roda.',
        'Para tratar erros previstos de forma controlada, usamos `try...catch` (módulo 4).'
      ] }
  ],
  erros: [
    { erro: "Carregar o script antes do HTML sem `defer` e buscar elementos.", porque: "Os elementos ainda não existem, e o resultado é `null`.", correcao: "use `defer` (ou coloque o `<script>` no fim do `<body>`)." },
    { erro: "Esquecer de abrir ou fechar aspas e parênteses.", porque: "Gera `SyntaxError` e o arquivo inteiro não executa.", correcao: "use um editor com destaque e fechamento automático." },
    { erro: "Confundir maiúsculas e minúsculas (`Console.log`).", porque: "`Console` não existe: `ReferenceError`.", correcao: "o objeto é `console`, em minúsculas." },
    { erro: "Ignorar a mensagem de erro e tentar adivinhar.", porque: "O console já diz o tipo, o arquivo e a linha.", correcao: "leia a mensagem completa, da primeira linha." },
    { erro: "Misturar JavaScript com HTML (`onclick=\"...\"`).", porque: "Dificulta a manutenção e a reutilização.", correcao: "use arquivos `.js` e `addEventListener` (módulo 3)." }
  ],
  praticas: [
    'Separe HTML, CSS e JavaScript em arquivos próprios.',
    'Use `defer` ao ligar scripts no `<head>`.',
    'Use `console.log` e `console.table` para inspecionar valores enquanto desenvolve (e remova os que sobrarem).',
    'Leia as mensagens de erro do começo ao fim.',
    'Ative o modo estrito (`"use strict"`) ou use módulos.'
  ],
  exercicios: [
    { titulo: "Script ligado a uma página",
      enunciado: 'Crie `index.html` e `app.js`. No arquivo JS, imprima no console seu nome, o resultado de `7 * 6` e a frase "JavaScript funcionando". Ligue o script com `defer`.',
      dica: 'Três chamadas de `console.log`.',
      resolucao: { lang: "js", codigo: `
"use strict";

console.log("Ana Souza");
console.log(7 * 6);                 // 42
console.log("JavaScript funcionando");`,
        comentario: 'No HTML: `<script src="app.js" defer></script>`. Abra o console (F12) para ver as três linhas. `7 * 6` é avaliado como número antes de ser impresso.' } },
    { titulo: "Classifique o erro",
      enunciado: 'Qual o tipo de erro de cada linha: (a) `console.log("oi"`; (b) `console.log(total);` sem `total` declarada; (c) `const x = 5; x();`; (d) `Console.log("a");`',
      dica: 'SyntaxError, ReferenceError ou TypeError.',
      resolucao: { lang: "txt", codigo: `(a) SyntaxError    - parêntese não fechado; o script nem executa
(b) ReferenceError - "total is not defined"
(c) TypeError      - "x is not a function"
(d) ReferenceError - "Console is not defined" (o correto é console)`,
        comentario: 'SyntaxError acontece na leitura do código (antes de executar). ReferenceError e TypeError acontecem durante a execução: o primeiro quando o nome não existe; o segundo, quando o valor existe, mas a operação não é válida para ele.' } }
  ],
  referencias: [
    { t: "Primeiros passos com JavaScript", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/First_steps", fonte: "MDN Web Docs" },
    { t: "O que é JavaScript?", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/What_is_JavaScript", fonte: "MDN Web Docs" },
    { t: "Especificação ECMAScript", u: "https://tc39.es/ecma262/", fonte: "Ecma TC39" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a2", titulo: "Variáveis e tipos de dados", minutos: 60,
  topicos: ["Variáveis", "Tipos de dados"],
  objetivos: [
    "Declarar variáveis com `const` e `let`, e saber por que evitar `var`.",
    "Identificar os tipos primitivos (`string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`) e objetos.",
    "Usar `typeof` e converter valores entre tipos.",
    "Montar textos com *template literals* e entender as armadilhas de ponto flutuante."
  ],
  conceito: [
    { h: "Variáveis: `const`, `let` e `var`" },
    { p: 'Uma **variável** é um nome associado a um valor guardado na memória. Em JavaScript moderno:' },
    { lista: [
      '`const nome = valor;`: o nome **não pode ser reatribuído**. Use como padrão.',
      '`let nome = valor;`: o nome pode receber outro valor depois. Use quando precisar reatribuir (contadores, acumuladores).',
      '`var`: forma antiga, com escopo de função e *hoisting* confuso. **Evite** em código novo.'
    ] },
    { p: '`const` não torna o valor imutável: um objeto ou array declarado com `const` continua podendo ter o **conteúdo** alterado (veremos no módulo 2). O que não muda é a ligação entre o nome e o valor.' },
    { p: 'Nomes: começam com letra, `_` ou `$`; seguem o padrão `camelCase` (`totalDoPedido`); devem descrever o conteúdo. Não podem ser palavras reservadas (`class`, `let`, `return`...).' },
    { h: "Tipos primitivos" },
    { lista: [
      '`string`: texto, entre aspas simples, duplas ou crases (`` ` ``).',
      '`number`: inteiros e decimais (ponto flutuante de 64 bits), mais `NaN` ("não é um número") e `Infinity`.',
      '`boolean`: `true` ou `false`.',
      '`undefined`: variável declarada sem valor.',
      '`null`: ausência **intencional** de valor.',
      '`bigint` (inteiros enormes, `123n`) e `symbol` (identificadores únicos): menos comuns.',
      '**Objetos** (incluindo arrays e funções) formam o tipo não primitivo.'
    ] },
    { h: "`typeof` e conversões" },
    { p: '`typeof valor` retorna o tipo como texto. Curiosidades: `typeof null` é `"object"` (um erro histórico mantido por compatibilidade), e `typeof []` também é `"object"`; para arrays use `Array.isArray(x)`.' },
    { p: 'Conversões explícitas: `Number("42")`, `parseInt("42px", 10)`, `parseFloat("3.14")`, `String(42)`, `Boolean(valor)`. Uma conversão inválida de número resulta em `NaN`, e `Number.isNaN(x)` o detecta. O JS também faz **coerção implícita** (`"5" * 2` vale 10, mas `"5" + 2` vale `"52"`), fonte frequente de bugs.' },
    { h: "Valores falsy" },
    { p: 'Em contextos de condição, estes valores são tratados como falsos (*falsy*): `false`, `0`, `""` (texto vazio), `null`, `undefined`, `NaN` (e `0n`). **Todo o resto é *truthy***, incluindo `"0"`, `"false"`, `[]` e `{}`.' },
    { h: "Template literals" },
    { p: 'Textos com **crases** permitem inserir expressões com `${...}` e ocupar várias linhas: `` `Olá, ${nome}!` ``. É a forma recomendada de montar texto, no lugar de concatenar com `+`.' },
    { nota: { t: "Ponto flutuante", x: 'Números decimais são aproximados em binário: `0.1 + 0.2` dá `0.30000000000000004`. Para dinheiro, trabalhe em **centavos inteiros** e converta só na exibição (`toFixed(2)` ou `Intl.NumberFormat`). Nunca compare decimais com `===` depois de cálculos.' } }
  ],
  exemplos: [
    { titulo: "Declarando variáveis", lang: "js", arquivo: "variaveis.js",
      codigo: `
const nome = "Ana";            // não será reatribuída
let pontos = 0;                // vai mudar

pontos = pontos + 10;          // ok: let permite reatribuir
pontos += 5;                   // atalho para pontos = pontos + 5

// nome = "Bia";               // TypeError: Assignment to constant variable.

const idade = 30;
const altura = 1.72;
const ativo = true;
let apelido;                   // undefined: declarada sem valor
const vazio = null;            // ausência intencional

console.log(nome, pontos);     // Ana 15
console.log(apelido);          // undefined
console.log(vazio);            // null`,
      explicacao: [
        '`const` é a escolha padrão; use `let` só quando o valor precisar mudar.',
        'Reatribuir uma `const` gera `TypeError`: o erro protege você de mudanças acidentais.',
        '`apelido` foi declarada sem valor, e o JS a inicializa com `undefined`.',
        '`null` precisa ser atribuído explicitamente: indica "nada, de propósito".'
      ] },
    { titulo: "typeof, conversões e armadilhas", lang: "js", arquivo: "tipos.js",
      codigo: `
console.log(typeof "texto");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object"  <- peculiaridade histórica
console.log(typeof [1, 2]);         // "object"
console.log(Array.isArray([1, 2])); // true

// Conversões explícitas
console.log(Number("42"));          // 42
console.log(Number("abc"));         // NaN
console.log(parseInt("42px", 10));  // 42  (ignora o que não é número no fim)
console.log(String(123));           // "123"

// Coerção implícita: cuidado
console.log("5" + 2);               // "52"  (concatenação)
console.log("5" - 2);               // 3     (conversão para número)
console.log(Number.isNaN(Number("abc"))); // true

// Ponto flutuante
console.log(0.1 + 0.2);                    // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);            // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON); // true`,
      explicacao: [
        '`typeof null` retornar `"object"` é uma peculiaridade histórica: teste `valor === null` para `null`.',
        '`"5" + 2` concatena; `"5" - 2` converte e subtrai: o `+` tem duplo papel.',
        '`Number("abc")` não lança erro, e retorna `NaN`; verifique com `Number.isNaN`.',
        'Compara-se decimais com uma tolerância (`Number.EPSILON`), e não com `===`.'
      ] },
    { titulo: "Template literals, falsy e dinheiro", lang: "js", arquivo: "templates.js",
      codigo: `
const nome = "Ana";
const itens = 3;
const precoEmCentavos = 1999;               // R$ 19,99 guardado como inteiro

// Template literal: expressões em \${...}
const mensagem = \`Olá, \${nome}! Você tem \${itens} itens.\`;
console.log(mensagem);

// Várias linhas
const recibo = \`Recibo
Cliente: \${nome}
Total: R$ \${(precoEmCentavos * itens / 100).toFixed(2).replace(".", ",")}\`;
console.log(recibo);

// Formatação monetária correta para o Brasil
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
console.log(moeda.format(precoEmCentavos * itens / 100));   // R$ 59,97

// Valores falsy
const valores = [false, 0, "", null, undefined, NaN, "0", [], {}];
for (const v of valores) {
  console.log(v, "=>", Boolean(v));
}`,
      explicacao: [
        'Em um template literal, `${...}` aceita qualquer expressão (até chamadas de função).',
        'Dinheiro guardado em **centavos inteiros** evita erros de ponto flutuante nos cálculos.',
        '`Intl.NumberFormat` formata moeda conforme a região.',
        'Note que `"0"`, `[]` e `{}` são *truthy*, e muitos erros vêm de assumir o contrário.'
      ] }
  ],
  erros: [
    { erro: "Usar `var` por hábito.", porque: "Tem escopo de função e *hoisting*, e produz comportamentos inesperados.", correcao: "use `const` e `let`." },
    { erro: "Declarar tudo com `let`.", porque: "Perde a proteção contra reatribuição acidental.", correcao: "use `const`, e `let` só quando precisar mudar o valor." },
    { erro: "Somar texto de formulário sem converter (`\"5\" + \"3\"` = `\"53\"`).", porque: "Valores de `input` chegam como `string`.", correcao: "converta com `Number()` antes de calcular." },
    { erro: "Comparar decimais com `===` após cálculos.", porque: "`0.1 + 0.2 !== 0.3`.", correcao: "use centavos inteiros ou tolerância." },
    { erro: "Usar `typeof` para detectar `null` ou array.", porque: "Ambos retornam `\"object\"`.", correcao: "use `=== null` e `Array.isArray()`." },
    { erro: "Assumir que `\"0\"` ou `[]` são falsos.", porque: "São *truthy*.", correcao: "compare explicitamente (`=== 0`, `.length === 0`)." }
  ],
  praticas: [
    '`const` por padrão; `let` quando necessário; nunca `var`.',
    'Nomes em `camelCase` que descrevem o conteúdo.',
    'Converta explicitamente os valores vindos de formulários e da web.',
    'Guarde dinheiro em centavos e formate só na exibição.',
    'Prefira template literals à concatenação com `+`.'
  ],
  exercicios: [
    { titulo: "Predição de resultados",
      enunciado: 'Diga o que será impresso: (a) `console.log("10" + 5);` (b) `console.log("10" - 5);` (c) `console.log(typeof null);` (d) `console.log(Boolean("false"));` (e) `console.log(Number(""));`',
      dica: 'Lembre da coerção e dos valores *truthy/falsy*.',
      resolucao: { lang: "txt", codigo: `(a) "105"      - o + com string concatena
(b) 5          - o - converte para número
(c) "object"   - peculiaridade histórica
(d) true       - qualquer string não vazia é truthy
(e) 0          - string vazia converte para 0`,
        comentario: '(e) é uma pegadinha: `Number("")` vale 0, e não `NaN`; por isso, um campo em branco pode passar despercebido se você só verifica `NaN`. Verifique também se o texto está vazio (`texto.trim() === ""`).' } },
    { titulo: "Resumo do pedido",
      enunciado: 'Dados `const produto = "Caderno";`, `const precoCentavos = 1590;` e `const quantidade = 4;`, calcule o total em centavos e imprima, com template literal, `Caderno x4 = R$ 63,60` (formate com `toFixed(2)` e troque o ponto por vírgula, ou use `Intl.NumberFormat`).',
      dica: 'Total = 1590 × 4 = 6360 centavos.',
      resolucao: { lang: "js", codigo: `
const produto = "Caderno";
const precoCentavos = 1590;
const quantidade = 4;

const totalCentavos = precoCentavos * quantidade;       // 6360 (inteiro, sem erro de arredondamento)
const totalReais = (totalCentavos / 100).toFixed(2).replace(".", ",");

console.log(\`\${produto} x\${quantidade} = R$ \${totalReais}\`);
// Caderno x4 = R$ 63,60

// Alternativa com Intl.NumberFormat:
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
console.log(moeda.format(totalCentavos / 100));         // R$ 63,60 (com espaço sem quebra)`,
        comentario: 'O cálculo é feito com inteiros e só é dividido por 100 na exibição. `toFixed(2)` retorna texto com duas casas, e `replace` troca o separador. `Intl.NumberFormat` é a opção mais robusta (e o espaço entre "R$" e o número é um espaço sem quebra).' } }
  ],
  referencias: [
    { t: "Variáveis", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Variables", fonte: "MDN Web Docs" },
    { t: "Tipos de dados e estruturas de dados em JavaScript", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Data_structures", fonte: "MDN Web Docs" },
    { t: "Template literals", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Template_literals", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a3", titulo: "Operadores e condicionais", minutos: 60,
  topicos: ["Operadores", "Condicionais"],
  objetivos: [
    "Usar operadores aritméticos, de atribuição, de comparação e lógicos.",
    "Diferenciar `==` de `===` e usar sempre a comparação estrita.",
    "Escrever decisões com `if/else if/else`, `switch` e o operador ternário.",
    "Aplicar `&&`, `||`, `??` e `?.` para valores padrão e acesso seguro."
  ],
  conceito: [
    { h: "Operadores aritméticos e de atribuição" },
    { lista: [
      '`+ - * / %` (resto da divisão) e `**` (potência). `++` e `--` incrementam e decrementam.',
      'Atribuição composta: `+=`, `-=`, `*=`, `/=`: `x += 5` equivale a `x = x + 5`.',
      'A ordem de precedência segue a matemática (`*` e `/` antes de `+` e `-`); use parênteses para deixar a intenção clara.'
    ] },
    { h: "Comparação" },
    { lista: [
      '`===` (igual, **sem conversão**) e `!==`: **use sempre**.',
      '`==` e `!=` fazem coerção de tipos e produzem resultados surpreendentes (`0 == ""` é `true`; `null == undefined` é `true`). Evite.',
      '`<  >  <=  >=` comparam números e, entre textos, a ordem de caracteres.',
      '`NaN` não é igual a nada, nem a ele mesmo: use `Number.isNaN()`.',
      'Objetos e arrays são comparados por **referência**, e não por conteúdo: `[1] === [1]` é `false`.'
    ] },
    { h: "Operadores lógicos" },
    { lista: [
      '`&&` (E), `||` (OU), `!` (NÃO).',
      '`&&` e `||` fazem **curto-circuito** e retornam um dos operandos (não necessariamente `true`/`false`): `a || b` retorna `a` se for *truthy*, senão `b`; `a && b` retorna `a` se for *falsy*, senão `b`.',
      '`??` (coalescência nula): `a ?? b` retorna `b` **só se `a` for `null` ou `undefined`**. Diferente de `||`, preserva `0`, `""` e `false`.',
      '`?.` (encadeamento opcional): `usuario?.endereco?.cidade` devolve `undefined` em vez de lançar erro se algo no caminho for `null`/`undefined`.'
    ] },
    { h: "Condicionais" },
    { p: '`if (condição) { ... } else if (outra) { ... } else { ... }` executa o primeiro bloco cuja condição for *truthy*. Use chaves **sempre**, mesmo para uma linha. Retornos antecipados (`return` cedo) e condições simples deixam o código mais legível que muitos `if` aninhados.' },
    { p: '`switch (valor) { case x: ...; break; default: ... }` compara com `===` e é útil para muitos valores fixos. Sem `break`, a execução "cai" nos casos seguintes (*fall-through*). O **operador ternário** `condição ? valorSeVerdadeiro : valorSeFalso` serve para escolher entre dois **valores**, mas não aninhe vários.' },
    { nota: { t: "Chaves e legibilidade", x: 'Prefira condições com nomes claros: `const podeComprar = idade >= 18 && temSaldo;` e depois `if (podeComprar) {...}`. Isso documenta a regra de negócio e simplifica testes.' } }
  ],
  exemplos: [
    { titulo: "Comparações e a armadilha do ==", lang: "js", arquivo: "comparacao.js",
      codigo: `
console.log(5 === 5);          // true
console.log(5 === "5");        // false: tipos diferentes
console.log(5 == "5");         // true:  coerção (evite ==)
console.log(0 == "");          // true:  surpresa
console.log(null == undefined);// true
console.log(null === undefined);// false

console.log(7 % 3);            // 1  (resto)
console.log(2 ** 10);          // 1024
console.log(10 / 4);           // 2.5 (não existe divisão inteira "automática")
console.log(Math.floor(10 / 4)); // 2

console.log([1] === [1]);      // false: referências diferentes
console.log(NaN === NaN);      // false
console.log(Number.isNaN(NaN));// true`,
      explicacao: [
        '`===` compara valor **e** tipo, e é a escolha segura.',
        'As coerções de `==` seguem regras complexas; evitá-lo elimina uma classe inteira de bugs.',
        'Arrays e objetos só são `===` se forem a **mesma referência**.',
        '`Math.floor` arredonda para baixo, útil para divisão inteira.'
      ] },
    { titulo: "if/else e switch", lang: "js", arquivo: "condicionais.js",
      codigo: `
const nota = 7.5;

if (nota >= 9) {
  console.log("Excelente");
} else if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}
// Aprovado

// Variáveis com nome expressivo documentam a regra
const idade = 17;
const temAutorizacao = true;
const podeEntrar = idade >= 18 || temAutorizacao;
console.log(podeEntrar);       // true

// switch: valores fixos
const dia = 3;
let nomeDoDia;
switch (dia) {
  case 1:  nomeDoDia = "Domingo"; break;
  case 2:  nomeDoDia = "Segunda"; break;
  case 3:  nomeDoDia = "Terça";   break;
  default: nomeDoDia = "Outro dia";
}
console.log(nomeDoDia);        // Terça

// Ternário para escolher um valor
const situacao = nota >= 7 ? "aprovado" : "reprovado";
console.log(situacao);`,
      explicacao: [
        'Os `else if` são avaliados em ordem; assim que um é verdadeiro, os demais são ignorados, então a ordem das condições importa.',
        'No `switch`, cada `break` evita a execução dos casos seguintes.',
        '`default` cobre o que não foi listado.',
        'O ternário é conciso para valores simples, mas fica ilegível se aninhado.'
      ] },
    { titulo: "Valores padrão e acesso seguro: ||, ??, ?.", lang: "js", arquivo: "padrao.js",
      codigo: `
const config = { volume: 0, nome: "", tema: null, usuario: null };

// || trata 0 e "" como "sem valor": às vezes é um bug
console.log(config.volume || 50);     // 50  (errado se 0 for válido!)
// ?? só troca null/undefined
console.log(config.volume ?? 50);     // 0   (correto)
console.log(config.nome ?? "Anônimo");// ""  (texto vazio preservado)
console.log(config.tema ?? "claro");  // "claro"

// Encadeamento opcional: acesso seguro
console.log(config.usuario?.endereco?.cidade);  // undefined (sem erro)
// console.log(config.usuario.endereco);        // TypeError sem o ?.

// Curto-circuito com &&: executa só se a primeira parte for truthy
const logado = true;
logado && console.log("Bem-vindo de volta!");

// Atribuição com ??=: só atribui se for null/undefined
config.tema ??= "escuro";
console.log(config.tema);             // "escuro"`,
      explicacao: [
        'Com `||`, o valor `0` seria substituído por 50, o que é um bug se 0 é um volume válido; `??` resolve.',
        '`?.` evita o `TypeError` ao navegar por propriedades que podem não existir.',
        '`&&` pode ser usado como atalho de "se verdadeiro, execute", mas em código que não seja trivial, prefira um `if` explícito.',
        '`??=` atribui apenas quando o valor atual é `null` ou `undefined`.'
      ] }
  ],
  erros: [
    { erro: "Usar `=` em vez de `===` na condição (`if (x = 5)`).", porque: "Atribui 5 a `x` e a condição fica sempre verdadeira.", correcao: "use `===` para comparar." },
    { erro: "Usar `==` por hábito.", porque: "A coerção produz resultados como `0 == \"\"`.", correcao: "use `===` e `!==`." },
    { erro: "Esquecer o `break` no `switch`.", porque: "A execução continua nos casos seguintes.", correcao: "termine cada caso com `break` (ou `return`)." },
    { erro: "Usar `||` para valor padrão quando `0` ou `\"\"` são válidos.", porque: "Esses valores *falsy* são descartados.", correcao: "use `??`." },
    { erro: "Aninhar ternários.", porque: "Fica ilegível.", correcao: "use `if/else` ou uma função." },
    { erro: "Comparar arrays ou objetos com `===` esperando comparar o conteúdo.", porque: "Compara a referência.", correcao: "compare os elementos (ou use `JSON.stringify` em casos simples)." }
  ],
  praticas: [
    'Use `===` e `!==` sempre.',
    'Dê nomes a condições complexas (`const podeComprar = ...`).',
    'Use chaves em todos os `if`.',
    'Prefira retornos antecipados a muitos níveis de aninhamento.',
    'Use `??` para valores padrão e `?.` para acessos que podem falhar.'
  ],
  exercicios: [
    { titulo: "Classificação de IMC",
      enunciado: 'Dados `peso` (kg) e `altura` (m), calcule o IMC (`peso / altura ** 2`) e classifique: menor que 18,5 "Abaixo do peso"; até 24,9 "Peso normal"; até 29,9 "Sobrepeso"; acima, "Obesidade". Imprima o IMC com 1 casa decimal e a classe.',
      dica: 'Use `if / else if / else` na ordem crescente de limites.',
      resolucao: { lang: "js", codigo: `
const peso = 70;
const altura = 1.75;
const imc = peso / altura ** 2;

let classe;
if (imc < 18.5) {
  classe = "Abaixo do peso";
} else if (imc < 25) {
  classe = "Peso normal";
} else if (imc < 30) {
  classe = "Sobrepeso";
} else {
  classe = "Obesidade";
}

console.log(\`IMC: \${imc.toFixed(1)} - \${classe}\`);
// IMC: 22.9 - Peso normal`,
        comentario: 'A ordem importa: cada `else if` só é testado se os anteriores forem falsos, então basta o limite superior de cada faixa. Usar `< 25` e `< 30` evita buracos entre 24,9 e 25 em valores com mais casas decimais.' } },
    { titulo: "Valor padrão correto",
      enunciado: 'Dado `const opcoes = { quantidade: 0, apelido: "" };`, escreva expressões que resultem em: (a) a quantidade, ou 1 se for `null`/`undefined`; (b) o apelido, ou "Visitante" se for vazio (texto vazio também deve ser substituído); (c) a cidade de `opcoes.endereco`, sem erro caso não exista.',
      dica: 'Em (b) vale um `||`; em (a) um `??`.',
      resolucao: { lang: "js", codigo: `
const opcoes = { quantidade: 0, apelido: "" };

const quantidade = opcoes.quantidade ?? 1;         // 0   (zero é válido)
const apelido    = opcoes.apelido || "Visitante";  // "Visitante" ("" deve ser substituído)
const cidade     = opcoes.endereco?.cidade;        // undefined (sem erro)

console.log(quantidade, apelido, cidade);`,
        comentario: 'Em (a), `0` é um valor válido e deve ser preservado: `??`. Em (b), a regra do enunciado trata "" como ausente, então `||` é adequado. Em (c), `?.` impede o `TypeError` quando `endereco` não existe.' } }
  ],
  referencias: [
    { t: "Operadores", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators", fonte: "MDN Web Docs" },
    { t: "Tomando decisões no código: condicionais", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Conditionals", fonte: "MDN Web Docs" },
    { t: "Igualdade e comparações", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m1a4", titulo: "Laços de repetição", minutos: 55,
  topicos: ["Laços"],
  objetivos: [
    "Escolher entre `for`, `while`, `do...while`, `for...of` e `for...in`.",
    "Controlar o fluxo com `break` e `continue`.",
    "Usar acumuladores, contadores e laços aninhados.",
    "Evitar laços infinitos e erros de limite (*off-by-one*)."
  ],
  conceito: [
    { h: "Repetição" },
    { p: 'Laços executam um bloco várias vezes. A escolha depende do que você sabe de antemão: **quantas vezes** repetir (`for`), **até quando** (`while`) ou **quais itens** percorrer (`for...of`).' },
    { h: "Os laços" },
    { lista: [
      '`for (inicial; condição; passo) { ... }`: o clássico, com contador. Ex.: `for (let i = 0; i < 5; i++)`.',
      '`while (condição) { ... }`: repete enquanto a condição for verdadeira; a condição é testada **antes**.',
      '`do { ... } while (condição);`: executa **pelo menos uma vez**, e testa depois.',
      '`for (const item of colecao) { ... }`: percorre os **valores** de arrays, strings, `Map`, `Set` e outros iteráveis. É a forma mais legível quando você não precisa do índice.',
      '`for (const chave in objeto) { ... }`: percorre as **chaves** de um objeto. **Não use em arrays** (itera índices como texto e pode incluir propriedades herdadas).'
    ] },
    { h: "`break` e `continue`" },
    { lista: [
      '`break`: encerra o laço imediatamente.',
      '`continue`: pula para a próxima iteração.'
    ] },
    { h: "Padrões comuns" },
    { lista: [
      '**Acumulador**: `let soma = 0; for (...) soma += valor;`.',
      '**Contador**: contar itens que atendem a um critério.',
      '**Busca**: percorrer até achar e dar `break`.',
      '**Aninhados**: um laço dentro do outro (tabuadas, matrizes). O custo cresce multiplicando as repetições.'
    ] },
    { h: "Cuidados" },
    { lista: [
      '**Laço infinito**: condição que nunca fica falsa (esquecer de atualizar a variável). Trava a aba do navegador.',
      '***Off-by-one***: `<` versus `<=` em limites. Para um array de tamanho `n`, os índices vão de `0` a `n - 1`: use `i < array.length`.',
      'Declare o contador com `let` dentro do `for` (escopo do laço).',
      'Não altere o tamanho do array que está sendo percorrido dentro do laço.',
      'Para transformar ou filtrar arrays, os métodos `map`, `filter` e `reduce` (módulo 2) são, muitas vezes, mais claros que um `for`.'
    ] },
    { nota: { t: "Depurando laços", x: 'Para entender o que ocorre a cada volta, use `console.log(i, valor)` dentro do laço, ou coloque um *breakpoint* nas ferramentas de desenvolvimento (aba Fontes) e avance passo a passo.' } }
  ],
  exemplos: [
    { titulo: "for, while e do...while", lang: "js", arquivo: "lacos.js",
      codigo: `
// for: sabemos quantas vezes
for (let i = 1; i <= 5; i++) {
  console.log("Volta", i);
}

// Acumulador: soma de 1 a 100
let soma = 0;
for (let n = 1; n <= 100; n++) {
  soma += n;
}
console.log(soma);                 // 5050

// while: repete até uma condição
let saldo = 1000;
let anos = 0;
while (saldo < 2000) {
  saldo *= 1.10;                   // 10% ao ano
  anos++;
}
console.log(\`Levou \${anos} anos\`);   // 8 anos

// do...while: executa ao menos uma vez
let tentativa = 0;
do {
  tentativa++;
  console.log("Tentativa", tentativa);
} while (tentativa < 3);`,
      explicacao: [
        'No `for`, as três partes (início, condição, passo) ficam juntas, o que reduz o risco de esquecer de atualizar o contador.',
        'O acumulador `soma` começa em 0 e recebe cada valor.',
        'No `while`, **você** precisa garantir que a condição, em algum momento, fique falsa (aqui, `saldo` cresce).',
        '`do...while` executa o bloco antes de testar: útil para menus e validações de entrada.'
      ] },
    { titulo: "for...of, for...in, break e continue", lang: "js", arquivo: "percorrer.js",
      codigo: `
const frutas = ["maçã", "banana", "laranja", "uva"];

// for...of: valores do array
for (const fruta of frutas) {
  console.log(fruta);
}

// Com índice: entries()
for (const [indice, fruta] of frutas.entries()) {
  console.log(indice, fruta);
}

// for...in: chaves de um objeto
const pessoa = { nome: "Ana", idade: 30, cidade: "Recife" };
for (const chave in pessoa) {
  console.log(chave, "=", pessoa[chave]);
}

// break: parar ao achar
let encontrada = null;
for (const fruta of frutas) {
  if (fruta.startsWith("l")) {
    encontrada = fruta;
    break;                        // encerra o laço
  }
}
console.log(encontrada);          // "laranja"

// continue: pular itens
for (let n = 1; n <= 10; n++) {
  if (n % 2 === 0) continue;      // ignora pares
  console.log(n);                 // 1 3 5 7 9
}`,
      explicacao: [
        '`for...of` entrega diretamente cada valor, e não precisa de índice.',
        '`entries()` combina com desestruturação para obter índice e valor (a desestruturação é vista no módulo 4).',
        '`for...in` percorre as **chaves** do objeto, e o valor é acessado com `pessoa[chave]`.',
        '`break` evita continuar a procurar depois de achar; `continue` pula a iteração atual.'
      ] },
    { titulo: "Laços aninhados e erro de limite", lang: "js", arquivo: "aninhados.js",
      codigo: `
// Tabuada de 1 a 3 com laços aninhados
for (let a = 1; a <= 3; a++) {
  let linha = "";
  for (let b = 1; b <= 5; b++) {
    linha += (a * b) + "\\t";       // \\t é uma tabulação
  }
  console.log(linha);
}

// Erro de limite (off-by-one)
const notas = [8, 6, 9];
// for (let i = 0; i <= notas.length; i++) {  // ERRADO: <= acessa o índice 3 (undefined)
//   console.log(notas[i]);
// }
for (let i = 0; i < notas.length; i++) {      // CERTO: < tamanho
  console.log(notas[i]);
}

// Média usando for...of
let total = 0;
for (const nota of notas) total += nota;
console.log((total / notas.length).toFixed(1)); // 7.7`,
      explicacao: [
        'O laço de fora controla as linhas e o de dentro, as colunas: 3 × 5 = 15 execuções do bloco interno.',
        'Os índices de um array de tamanho 3 são 0, 1 e 2: use `<` com `length`.',
        'Com `<=`, a última volta acessa `notas[3]`, que é `undefined`.',
        'O `\\t` dentro de uma string do arquivo de curso aparece como `\\t` (tabulação) no seu código.'
      ] }
  ],
  erros: [
    { erro: "Esquecer de atualizar a variável da condição no `while`.", porque: "Cria um laço infinito e trava a página.", correcao: "garanta que algo dentro do laço leve a condição a ser falsa." },
    { erro: "Usar `<=` com `length`.", porque: "Acessa um índice além do fim (*off-by-one*).", correcao: "use `i < array.length`." },
    { erro: "Usar `for...in` para percorrer arrays.", porque: "Percorre índices como texto e pode incluir propriedades extras.", correcao: "use `for...of` ou um `for` com índice." },
    { erro: "Declarar o contador com `var`.", porque: "Vaza para fora do laço e confunde callbacks.", correcao: "use `let`." },
    { erro: "Modificar o array enquanto o percorre.", porque: "Pula elementos ou entra em laço infinito.", correcao: "percorra uma cópia ou construa um novo array." },
    { erro: "`break`/`continue` fora de um laço.", porque: "Gera `SyntaxError`.", correcao: "use-os apenas dentro de laços (e `break` em `switch`)." }
  ],
  praticas: [
    '`for...of` para percorrer valores; `for` clássico quando precisar do índice ou de passo diferente.',
    'Use `let` para contadores e `const` para o item de `for...of`.',
    'Para cada `while`, verifique mentalmente o que o fará terminar.',
    'Confira os limites com valores pequenos (0, 1 e 2 elementos).',
    'Para transformar coleções, considere `map`, `filter` e `reduce`.'
  ],
  exercicios: [
    { titulo: "Estatísticas de notas",
      enunciado: 'Dado `const notas = [7.5, 4, 9, 6, 10, 3.5];`, use um laço para calcular: a soma, a média, a maior nota e quantas notas estão abaixo de 5. Imprima os quatro resultados.',
      dica: 'Inicialize `maior` com a primeira nota (ou `-Infinity`).',
      resolucao: { lang: "js", codigo: `
const notas = [7.5, 4, 9, 6, 10, 3.5];

let soma = 0;
let maior = -Infinity;
let abaixoDeCinco = 0;

for (const nota of notas) {
  soma += nota;
  if (nota > maior) maior = nota;
  if (nota < 5) abaixoDeCinco++;
}

const media = soma / notas.length;
console.log("Soma:", soma);                    // 40
console.log("Média:", media.toFixed(2));       // 6.67
console.log("Maior:", maior);                  // 10
console.log("Abaixo de 5:", abaixoDeCinco);    // 2`,
        comentario: 'Um único laço atualiza três acumuladores. `-Infinity` como ponto de partida de `maior` funciona para qualquer lista de números. Confira à mão: 7,5+4+9+6+10+3,5 = 40; 40/6 ≈ 6,67; abaixo de 5: 4 e 3,5 = 2.' } },
    { titulo: "Primos até N",
      enunciado: 'Escreva um programa que imprima os números primos de 2 a 30. Dica: um número é primo se nenhum inteiro de 2 até a sua raiz quadrada o divide exatamente.',
      dica: 'Laço aninhado, `break` no primeiro divisor encontrado.',
      resolucao: { lang: "js", codigo: `
const primos = [];

for (let n = 2; n <= 30; n++) {
  let ehPrimo = true;
  for (let d = 2; d * d <= n; d++) {   // basta testar até a raiz de n
    if (n % d === 0) {
      ehPrimo = false;
      break;                            // achou divisor: não precisa continuar
    }
  }
  if (ehPrimo) primos.push(n);
}

console.log(primos.join(", "));
// 2, 3, 5, 7, 11, 13, 17, 19, 23, 29`,
        comentario: 'O laço externo percorre os candidatos; o interno procura um divisor. A condição `d * d <= n` equivale a `d <= √n` e evita raízes. O `break` interrompe a procura assim que o número se prova composto. 2 é primo porque o laço interno nem executa (2×2 > 2).' } }
  ],
  referencias: [
    { t: "Laços e iteração", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Loops_and_iteration", fonte: "MDN Web Docs" },
    { t: "Código em laço (aprendizado)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Loops", fonte: "MDN Web Docs" },
    { t: "for...of", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for...of", fonte: "MDN Web Docs" }
  ]
}

] });
