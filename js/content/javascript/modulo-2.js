/* JavaScript · Módulo 2 — Estruturas e funções
   Tópicos: funções · escopo · arrays · objetos · métodos · manipulação de dados */
AE.Conteudo.modulo("javascript", 2, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m2a1", titulo: "Funções e escopo", minutos: 65,
  topicos: ["Funções", "Escopo"],
  objetivos: [
    "Declarar funções (declaração, expressão e arrow function) e chamá-las com parâmetros.",
    "Usar `return`, valores padrão, parâmetros *rest* e entender que funções são valores.",
    "Explicar escopo de bloco, de função e global, e o que são *closures*.",
    "Escrever funções pequenas, puras e com nomes claros."
  ],
  conceito: [
    { h: "Por que funções" },
    { p: 'Uma **função** é um bloco de código nomeado e reutilizável: recebe **parâmetros** (entradas), executa instruções e pode devolver um **resultado** com `return`. Funções eliminam repetição, dão nomes às ideias do programa e permitem testar partes isoladas.' },
    { h: "Formas de declarar" },
    { lista: [
      '**Declaração**: `function somar(a, b) { return a + b; }`. É *içada* (*hoisted*): pode ser chamada antes de aparecer no código.',
      '**Expressão**: `const somar = function (a, b) { return a + b; };`. Não é içada.',
      '***Arrow function***: `const somar = (a, b) => a + b;`. Sintaxe curta; com uma única expressão, o `return` é implícito. Com várias instruções, use chaves e `return`. Não tem `this` próprio (relevante no módulo 3).'
    ] },
    { h: "Parâmetros e retorno" },
    { lista: [
      '**Parâmetros** são os nomes na definição; **argumentos** são os valores passados na chamada.',
      '**Valor padrão**: `function saudar(nome = "visitante") { ... }` (usado quando o argumento é `undefined`).',
      '**Rest**: `function somar(...numeros) { ... }` junta os argumentos restantes em um array.',
      '`return` encerra a função e devolve um valor. Sem `return`, a função devolve `undefined`.',
      'Para devolver vários valores, retorne um objeto ou um array.'
    ] },
    { h: "Funções são valores" },
    { p: 'Em JavaScript, funções podem ser guardadas em variáveis, passadas como argumento e devolvidas por outras funções. Uma função recebida como argumento chama-se ***callback***. É o princípio por trás de `forEach`, `map`, eventos (módulo 3) e Promises (módulo 4).' },
    { h: "Escopo" },
    { lista: [
      '**Escopo de bloco** (`let` e `const`): a variável existe só dentro das chaves `{ }` onde foi declarada (`if`, `for`, função...).',
      '**Escopo de função**: variáveis declaradas dentro de uma função não são visíveis fora dela.',
      '**Escopo global**: fora de qualquer função/bloco. Evite criar variáveis globais: elas podem colidir e dificultam a manutenção.',
      'Funções enxergam as variáveis do escopo em que **foram criadas**, e dos escopos externos a ele (cadeia de escopos).'
    ] },
    { h: "Closures" },
    { p: 'Uma ***closure*** (fechamento) ocorre quando uma função "lembra" das variáveis do escopo onde foi criada, mesmo depois que esse escopo terminou de executar. É assim que se criam contadores privados e funções configuráveis.' },
    { h: "Boas práticas" },
    { lista: [
      'Uma função faz **uma** coisa e tem nome de **verbo** (`calcularTotal`, `validarEmail`).',
      'Prefira **funções puras**: dados os mesmos argumentos, devolvem o mesmo resultado e não alteram nada fora delas.',
      'Poucos parâmetros (até 3 ou 4); acima disso, receba um objeto.',
      'Evite efeitos colaterais escondidos (alterar variáveis globais, mutar argumentos).'
    ] },
    { nota: { t: "`var` e o escopo", x: '`var` tem escopo de função (ignora blocos) e sofre *hoisting*: a declaração é "içada" com valor `undefined`. Por isso é fonte de bugs. Com `let` e `const`, acessar a variável antes da declaração gera `ReferenceError` (a chamada "zona morta temporal"), o que é um comportamento mais seguro.' } }
  ],
  exemplos: [
    { titulo: "Três formas de declarar uma função", lang: "js", arquivo: "funcoes.js",
      codigo: `
// 1) Declaração (içada: pode ser chamada antes)
console.log(dobro(4));                  // 8
function dobro(n) {
  return n * 2;
}

// 2) Expressão de função
const triplo = function (n) {
  return n * 3;
};

// 3) Arrow function
const quadrado = (n) => n * n;          // retorno implícito
const saudar = (nome = "visitante") => \`Olá, \${nome}!\`;

console.log(triplo(4));                 // 12
console.log(quadrado(5));               // 25
console.log(saudar());                  // Olá, visitante!
console.log(saudar("Ana"));             // Olá, Ana!

// Rest: quantidade variável de argumentos
function somar(...numeros) {
  let total = 0;
  for (const n of numeros) total += n;
  return total;
}
console.log(somar(1, 2, 3, 4));         // 10

// Sem return, devolve undefined
function semRetorno() { const x = 1; }
console.log(semRetorno());              // undefined`,
      explicacao: [
        'A declaração \`dobro\` pode ser chamada antes da linha em que foi escrita (*hoisting*); as outras formas não.',
        'Em `saudar`, o valor padrão só é usado se o argumento for `undefined`.',
        '`...numeros` coleta todos os argumentos em um array real.',
        'Uma função sem `return` devolve `undefined`.'
      ] },
    { titulo: "Escopo e closures", lang: "js", arquivo: "escopo.js",
      codigo: `
const global = "visível em todo lugar";

function externa() {
  const daExterna = "só dentro de externa e das funções dentro dela";

  function interna() {
    const daInterna = "só dentro de interna";
    console.log(global, "|", daExterna, "|", daInterna);   // enxerga os três
  }

  interna();
  // console.log(daInterna);   // ReferenceError: fora do escopo
}
externa();

// Escopo de bloco
if (true) {
  let dentro = 1;
  var vazou = 2;               // var ignora o bloco!
}
// console.log(dentro);        // ReferenceError
console.log(vazou);            // 2

// Closure: contador com estado privado
function criarContador(inicio = 0) {
  let valor = inicio;          // fica "guardada" na closure
  return {
    incrementar() { valor++; return valor; },
    atual() { return valor; }
  };
}

const c1 = criarContador();
const c2 = criarContador(100);
c1.incrementar();
c1.incrementar();
c2.incrementar();
console.log(c1.atual(), c2.atual());   // 2 101
// "valor" não é acessível de fora: só pelos métodos`,
      explicacao: [
        'Cada função enxerga o próprio escopo e os externos, e não o contrário.',
        '`let` respeita o bloco; `var` não, e por isso `vazou` existe fora do `if`.',
        'Cada chamada de `criarContador` cria um escopo novo, com a sua própria variável `valor`, que as funções retornadas continuam a enxergar.',
        'Os dois contadores são independentes: é a closure em ação.'
      ] },
    { titulo: "Funções como valores e funções puras", lang: "js", arquivo: "callbacks.js",
      codigo: `
// Função que recebe outra função (callback)
function repetir(vezes, acao) {
  for (let i = 1; i <= vezes; i++) {
    acao(i);
  }
}
repetir(3, (n) => console.log("Volta", n));

// Função que devolve outra função
function criarMultiplicador(fator) {
  return (n) => n * fator;
}
const vezesDez = criarMultiplicador(10);
console.log(vezesDez(7));              // 70

// Pura: mesmos argumentos, mesmo resultado, sem efeitos colaterais
function calcularTotal(precoCentavos, quantidade) {
  return precoCentavos * quantidade;
}

// Impura: depende de e altera algo fora dela
let acumulado = 0;
function somarAoAcumulado(valor) {
  acumulado += valor;                  // efeito colateral
  return acumulado;
}

console.log(calcularTotal(1500, 2));   // 3000 (sempre)
console.log(somarAoAcumulado(5));      // 5
console.log(somarAoAcumulado(5));      // 10 (mesmo argumento, resultado diferente)`,
      explicacao: [
        '`repetir` não sabe o que será feito a cada volta: recebe isso como parâmetro, o que a torna reutilizável.',
        '`criarMultiplicador` devolve uma função configurada (closure sobre `fator`).',
        '`calcularTotal` é pura: fácil de testar e de raciocinar.',
        '`somarAoAcumulado` é impura: o resultado depende do estado externo.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o `return` em uma função que deveria devolver um valor.", porque: "O resultado é `undefined`.", correcao: "devolva explicitamente (e confira arrow functions com chaves, que não têm retorno implícito)." },
    { erro: "Chamar a função sem parênteses (`saudar` em vez de `saudar()`).", porque: "Você passa a própria função, e não o resultado dela.", correcao: "use `()` para executar." },
    { erro: "Usar uma variável global para trocar informações entre funções.", porque: "Cria dependências escondidas e conflitos.", correcao: "passe valores por parâmetros e devolva com `return`." },
    { erro: "Arrow function com chaves sem `return`: `(a, b) => { a + b }`.", porque: "Com chaves, o retorno deixa de ser implícito e devolve `undefined`.", correcao: "use `(a, b) => a + b` ou `{ return a + b; }`." },
    { erro: "Mutar os argumentos recebidos (arrays/objetos).", porque: "Altera os dados de quem chamou.", correcao: "devolva uma cópia modificada." },
    { erro: "Funções longas que fazem muitas coisas.", porque: "São difíceis de entender e testar.", correcao: "divida em funções menores com nomes claros." }
  ],
  praticas: [
    'Nome de função = verbo (`calcularTotal`); nome de valor = substantivo (`total`).',
    'Funções curtas, com uma responsabilidade.',
    'Prefira funções puras, e isole os efeitos colaterais.',
    'Use arrow functions para callbacks curtos e declarações para funções de nome importante.',
    'Evite variáveis globais.'
  ],
  exercicios: [
    { titulo: "Funções utilitárias",
      enunciado: 'Escreva: (a) `ehPar(n)` que devolve `true` se `n` for par; (b) `media(...numeros)` que devolve a média (ou `0` se não houver argumentos); (c) `formatarMoeda(centavos)` que devolve texto como `R$ 12,50`.',
      dica: 'Em (c), divida por 100 e use `toFixed(2)`.',
      resolucao: { lang: "js", codigo: `
const ehPar = (n) => n % 2 === 0;

function media(...numeros) {
  if (numeros.length === 0) return 0;
  let soma = 0;
  for (const n of numeros) soma += n;
  return soma / numeros.length;
}

const formatarMoeda = (centavos) =>
  "R$ " + (centavos / 100).toFixed(2).replace(".", ",");

console.log(ehPar(10), ehPar(7));        // true false
console.log(media(8, 6, 10));            // 8
console.log(media());                    // 0
console.log(formatarMoeda(1250));        // R$ 12,50`,
        comentario: '`media` trata o caso sem argumentos para evitar divisão por zero (`0/0` seria `NaN`). `formatarMoeda` recebe centavos inteiros, evitando erros de ponto flutuante. As três funções são puras.' } },
    { titulo: "Closure: gerador de IDs",
      enunciado: 'Escreva `criarGeradorDeId(prefixo)` que devolve uma função; cada chamada dessa função deve devolver `prefixo-1`, `prefixo-2`, ... de forma independente para cada gerador.',
      dica: 'Guarde um contador na closure.',
      resolucao: { lang: "js", codigo: `
function criarGeradorDeId(prefixo) {
  let contador = 0;
  return function () {
    contador++;
    return \`\${prefixo}-\${contador}\`;
  };
}

const novoPedido = criarGeradorDeId("PED");
const novoCliente = criarGeradorDeId("CLI");

console.log(novoPedido());    // PED-1
console.log(novoPedido());    // PED-2
console.log(novoCliente());   // CLI-1
console.log(novoPedido());    // PED-3`,
        comentario: 'Cada chamada de `criarGeradorDeId` cria um `contador` próprio, que a função retornada mantém vivo (closure). Os geradores não interferem entre si, e o contador não pode ser alterado de fora.' } }
  ],
  referencias: [
    { t: "Funções", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions", fonte: "MDN Web Docs" },
    { t: "Closures", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures", fonte: "MDN Web Docs" },
    { t: "Arrow functions", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a2", titulo: "Arrays", minutos: 55,
  topicos: ["Arrays", "Métodos"],
  objetivos: [
    "Criar e acessar arrays por índice, e usar `length`.",
    "Adicionar, remover e localizar elementos (`push`, `pop`, `shift`, `unshift`, `splice`, `includes`, `indexOf`).",
    "Copiar arrays corretamente com *spread* e entender referência x valor.",
    "Distinguir métodos que **alteram** o array dos que devolvem um novo."
  ],
  conceito: [
    { h: "O que é um array" },
    { p: 'Um **array** é uma lista ordenada de valores, indexada a partir de **0**. Pode misturar tipos, mas na prática costuma guardar itens do mesmo tipo. `const frutas = ["maçã", "banana"]`. O tamanho vem de `frutas.length`; o primeiro item é `frutas[0]` e o último, `frutas[frutas.length - 1]` (ou `frutas.at(-1)`). Acessar um índice inexistente devolve `undefined`.' },
    { h: "Alterando o array (mutação)" },
    { lista: [
      '`push(x)`: adiciona ao **fim**; `pop()`: remove do fim.',
      '`unshift(x)`: adiciona ao **início**; `shift()`: remove do início.',
      '`splice(início, quantidadeAremover, ...novos)`: remove e/ou insere em qualquer posição.',
      '`sort()`, `reverse()`: ordenam e invertem o **próprio array**.',
      '`array[i] = valor`: altera um elemento.'
    ] },
    { h: "Consultando (sem alterar)" },
    { lista: [
      '`includes(x)`: `true` se contém. `indexOf(x)`: posição ou `-1`.',
      '`slice(início, fim)`: cópia de um trecho (o `fim` não entra).',
      '`concat`, `join(separador)`, `at(i)`.',
      '`find(fn)` e `findIndex(fn)`: primeiro elemento (ou posição) que satisfaz a condição. `some(fn)` e `every(fn)`: algum/todos satisfazem.'
    ] },
    { h: "Referência e cópia" },
    { p: 'Arrays (e objetos) são guardados por **referência**: `const b = a` não copia, e os dois nomes apontam para o **mesmo** array. Para copiar: `[...a]` (spread) ou `a.slice()`. A cópia é **rasa**: se houver objetos dentro, eles continuam compartilhados (cópia profunda: `structuredClone(a)`).' },
    { h: "Mutável x imutável" },
    { p: 'Métodos que alteram o array original (`push`, `splice`, `sort`) podem causar surpresas, principalmente quando o array é compartilhado. Em código moderno, prefira estilos **não mutáveis** quando fizer sentido: `[...lista, novo]` em vez de `push`; `lista.filter(...)` em vez de `splice`; e, para ordenar sem alterar o original, `toSorted()` (ou `[...lista].sort()`). `toSorted`, `toReversed` e `with` estão disponíveis em navegadores atuais.' },
    { nota: { t: "`sort()` ordena como texto por padrão", x: '`[10, 9, 1].sort()` resulta em `[1, 10, 9]`, porque compara os valores como **texto**. Para números, passe uma função de comparação: `sort((a, b) => a - b)`. Para textos com acentos, `a.localeCompare(b, "pt-BR")`.' } }
  ],
  exemplos: [
    { titulo: "Criar, acessar e modificar", lang: "js", arquivo: "arrays-basico.js",
      codigo: `
const frutas = ["maçã", "banana", "uva"];

console.log(frutas[0]);               // maçã
console.log(frutas.at(-1));           // uva (último)
console.log(frutas.length);           // 3
console.log(frutas[10]);              // undefined

frutas.push("manga");                 // fim
frutas.unshift("abacaxi");            // início
console.log(frutas);                  // ["abacaxi","maçã","banana","uva","manga"]

const removida = frutas.pop();        // "manga"
frutas.shift();                       // remove "abacaxi"

// splice(posição, quantos remover, ...inserir)
frutas.splice(1, 1, "kiwi", "pera");  // remove "banana" e insere 2
console.log(frutas);                  // ["maçã","kiwi","pera","uva"]

console.log(frutas.includes("uva"));  // true
console.log(frutas.indexOf("pera"));  // 2
console.log(frutas.indexOf("figo"));  // -1 (não existe)
console.log(frutas.join(" | "));      // maçã | kiwi | pera | uva`,
      explicacao: [
        'Os índices começam em 0, e `at(-1)` acessa o último sem precisar de `length - 1`.',
        '`pop` e `shift` devolvem o item removido.',
        '`splice(1, 1, "kiwi", "pera")` remove 1 item na posição 1 e insere dois no lugar.',
        '`indexOf` devolve `-1` quando não encontra: nunca teste com `if (indexOf(...))`, pois `0` é um índice válido, mas *falsy*.'
      ] },
    { titulo: "Referência x cópia", lang: "js", arquivo: "copia.js",
      codigo: `
const a = [1, 2, 3];
const b = a;                 // NÃO copia: mesma referência
b.push(4);
console.log(a);              // [1,2,3,4]  <- a também mudou!
console.log(a === b);        // true

const c = [...a];            // cópia rasa com spread
c.push(5);
console.log(a);              // [1,2,3,4]  (intacto)
console.log(c);              // [1,2,3,4,5]

// Cópia rasa: objetos internos continuam compartilhados
const alunos = [{ nome: "Ana" }];
const copia = [...alunos];
copia[0].nome = "Bia";
console.log(alunos[0].nome); // "Bia"  <- o objeto é o mesmo

// Cópia profunda
const profunda = structuredClone(alunos);
profunda[0].nome = "Carla";
console.log(alunos[0].nome); // "Bia"  (não mudou)

// Estilo não mutável
const lista = [3, 1, 2];
const comNovo = [...lista, 4];              // novo array com 4 no fim
const ordenada = [...lista].sort((x, y) => x - y);
console.log(lista, comNovo, ordenada);      // [3,1,2] [3,1,2,4] [1,2,3]`,
      explicacao: [
        '`const b = a` cria um segundo nome para o **mesmo** array, e não uma cópia.',
        'O spread `[...a]` cria um array novo, mas objetos dentro continuam compartilhados (cópia rasa).',
        '`structuredClone` faz cópia profunda de dados simples (objetos, arrays, datas...), sem funções.',
        'Copiar antes de `sort` preserva o array original.'
      ] },
    { titulo: "Ordenação e busca", lang: "js", arquivo: "ordenar.js",
      codigo: `
const numeros = [10, 9, 1, 100];
console.log([...numeros].sort());               // [1, 10, 100, 9]  (como texto!)
console.log([...numeros].sort((a, b) => a - b)); // [1, 9, 10, 100]  (crescente)
console.log([...numeros].sort((a, b) => b - a)); // [100, 10, 9, 1]  (decrescente)

const nomes = ["Érica", "ana", "Zeca", "bruno"];
console.log([...nomes].sort());                              // maiúsculas e acentos atrapalham
console.log([...nomes].sort((a, b) => a.localeCompare(b, "pt-BR"))); // ordem natural do idioma

const produtos = [
  { nome: "Caneta", preco: 3 },
  { nome: "Caderno", preco: 18 },
  { nome: "Régua", preco: 5 }
];
const maisCaro = produtos.find((p) => p.preco > 10);
console.log(maisCaro.nome);                     // Caderno
console.log(produtos.some((p) => p.preco > 15));   // true
console.log(produtos.every((p) => p.preco > 4));   // false
console.log(produtos.findIndex((p) => p.nome === "Régua")); // 2`,
      explicacao: [
        'Sem função de comparação, `sort` converte tudo em texto: `10` vem antes de `9`.',
        'A função `(a, b) => a - b` devolve negativo, zero ou positivo para definir a ordem.',
        '`localeCompare` respeita acentos e maiúsculas do idioma.',
        '`find` devolve o elemento (ou `undefined`); `some` e `every` devolvem booleanos.'
      ] }
  ],
  erros: [
    { erro: "Achar que `const b = a` copia o array.", porque: "Os dois nomes apontam para o mesmo objeto.", correcao: "copie com `[...a]` (rasa) ou `structuredClone(a)` (profunda)." },
    { erro: "Usar `sort()` em números sem função de comparação.", porque: "Ordena como texto.", correcao: "use `sort((a, b) => a - b)`." },
    { erro: "`if (lista.indexOf(x))` para testar presença.", porque: "`0` é *falsy*, e `-1` é *truthy*.", correcao: "use `lista.includes(x)` ou compare `!== -1`." },
    { erro: "Confundir `slice` com `splice`.", porque: "`slice` copia e **não** altera; `splice` altera o original.", correcao: "lembre: *splice* = emenda, mexe no array." },
    { erro: "Esperar que `delete array[i]` remova o elemento.", porque: "Deixa um \"buraco\" e mantém o tamanho.", correcao: "use `splice` ou `filter`." },
    { erro: "Modificar o array enquanto o percorre.", porque: "Pula elementos.", correcao: "percorra uma cópia, ou gere um novo array." }
  ],
  praticas: [
    'Use `at(-1)` para o último elemento.',
    'Use `includes` para testar presença e `find` para obter o elemento.',
    'Copie antes de mutar quando o array for compartilhado.',
    'Passe sempre uma função de comparação ao ordenar números.',
    'Prefira estilos não mutáveis: spread, `filter`, `map`, `toSorted`.'
  ],
  exercicios: [
    { titulo: "Lista de tarefas",
      enunciado: 'Com `const tarefas = ["estudar", "treinar"];`, faça: adicionar "ler" ao fim; adicionar "acordar" ao início; remover "treinar"; verificar se "ler" existe; e imprimir a lista final unida por vírgula.',
      dica: '`push`, `unshift`, `indexOf` + `splice`, `includes`, `join`.',
      resolucao: { lang: "js", codigo: `
const tarefas = ["estudar", "treinar"];

tarefas.push("ler");                  // ["estudar","treinar","ler"]
tarefas.unshift("acordar");           // ["acordar","estudar","treinar","ler"]

const i = tarefas.indexOf("treinar");
if (i !== -1) tarefas.splice(i, 1);   // remove 1 elemento na posição i

console.log(tarefas.includes("ler")); // true
console.log(tarefas.join(", "));      // acordar, estudar, ler`,
        comentario: 'Para remover pelo valor, primeiro localize o índice com `indexOf` e confira se não é `-1`, para não remover o último elemento por engano (`splice(-1, 1)`). `join` produz o texto final.' } },
    { titulo: "Cópia segura",
      enunciado: 'Dado `const notas = [8, 5, 9, 7];`, produza `ordenadas` (decrescente) sem alterar `notas`, e `comBonus` com `10` acrescentado ao fim, também sem alterar `notas`. Confirme imprimindo `notas` no final.',
      dica: 'Spread antes do `sort`.',
      resolucao: { lang: "js", codigo: `
const notas = [8, 5, 9, 7];

const ordenadas = [...notas].sort((a, b) => b - a);
const comBonus = [...notas, 10];

console.log(ordenadas);   // [9, 8, 7, 5]
console.log(comBonus);    // [8, 5, 9, 7, 10]
console.log(notas);       // [8, 5, 9, 7] (intacto)`,
        comentario: '`sort` altera o array em que é chamado, então a cópia (`[...notas]`) vem antes. O spread também permite acrescentar elementos sem usar `push`, que alteraria o original.' } }
  ],
  referencias: [
    { t: "Array", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array", fonte: "MDN Web Docs" },
    { t: "Arrays (guia de aprendizado)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Arrays", fonte: "MDN Web Docs" },
    { t: "structuredClone()", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Window/structuredClone", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a3", titulo: "Objetos", minutos: 55,
  topicos: ["Objetos", "Métodos"],
  objetivos: [
    "Criar objetos literais e acessar, adicionar, alterar e remover propriedades.",
    "Usar `Object.keys`, `Object.values`, `Object.entries` e o *spread* em objetos.",
    "Definir métodos e entender o `this` básico.",
    "Converter dados para e de JSON."
  ],
  conceito: [
    { h: "O que é um objeto" },
    { p: 'Um **objeto** agrupa dados relacionados em pares **chave: valor** (as *propriedades*): `const pessoa = { nome: "Ana", idade: 30 };`. É a estrutura central do JavaScript: quase tudo (arrays, funções, datas) é um objeto.' },
    { h: "Acesso e alteração" },
    { lista: [
      '**Notação de ponto**: `pessoa.nome`. **Colchetes**: `pessoa["nome"]` (necessário com chaves dinâmicas ou com caracteres especiais).',
      'Adicionar/alterar: `pessoa.cidade = "Recife"`. Remover: `delete pessoa.idade`.',
      'Testar existência: `"nome" in pessoa` ou `Object.hasOwn(pessoa, "nome")`.',
      'Propriedade inexistente devolve `undefined`; com encadeamento opcional (`?.`) é possível navegar com segurança.',
      '**Atalhos**: `{ nome, idade }` (nome da variável = chave) e **chaves computadas** `{ [chave]: valor }`.'
    ] },
    { h: "Percorrendo objetos" },
    { lista: [
      '`Object.keys(obj)`: array de chaves.',
      '`Object.values(obj)`: array de valores.',
      '`Object.entries(obj)`: array de pares `[chave, valor]` (combina bem com `for...of`).',
      '`Object.fromEntries(pares)` faz o caminho inverso.'
    ] },
    { h: "Copiar e mesclar" },
    { p: 'Como os arrays, objetos são guardados por **referência**. Cópia rasa e mesclagem com *spread*: `{ ...a }`, `{ ...a, ...b }` (propriedades posteriores sobrescrevem as anteriores). `Object.freeze(obj)` impede alterações (de forma rasa).' },
    { h: "Métodos e `this`" },
    { p: 'Um **método** é uma função guardada em uma propriedade. Dentro dele, `this` refere-se ao objeto pelo qual o método foi chamado: `pessoa.apresentar()` faz `this` ser `pessoa`. Cuidado: ao separar o método (`const f = pessoa.apresentar; f();`), `this` se perde. Arrow functions **não** têm `this` próprio: não as use como métodos de objeto quando precisar de `this`.' },
    { h: "JSON" },
    { p: '**JSON** (*JavaScript Object Notation*) é um formato de **texto** para trocar dados. `JSON.stringify(obj)` converte objeto em texto; `JSON.parse(texto)` faz o inverso (e lança erro se o texto for inválido). Em JSON, chaves e textos usam **aspas duplas**; funções, `undefined` e datas não são preservados como tal (datas viram texto).' },
    { nota: { t: "Objetos como dicionários", x: 'Para coleções de chaves dinâmicas, considere `Map`, que aceita qualquer tipo de chave, mantém a ordem de inserção e tem `size`. Para listas de itens únicos, use `Set`. Ambos são iteráveis com `for...of`.' } }
  ],
  exemplos: [
    { titulo: "Criar, ler, alterar e percorrer", lang: "js", arquivo: "objetos.js",
      codigo: `
const pessoa = {
  nome: "Ana",
  idade: 30,
  endereco: { cidade: "Recife", uf: "PE" }
};

console.log(pessoa.nome);                 // Ana
console.log(pessoa["idade"]);             // 30
console.log(pessoa.endereco.cidade);      // Recife
console.log(pessoa.telefone);             // undefined
console.log(pessoa.contato?.email);       // undefined (sem erro)

pessoa.idade = 31;                        // altera
pessoa.profissao = "Dev";                 // adiciona
delete pessoa.profissao;                  // remove

console.log("nome" in pessoa);            // true

console.log(Object.keys(pessoa));         // ["nome","idade","endereco"]
console.log(Object.values(pessoa).length);// 3

for (const [chave, valor] of Object.entries({ a: 1, b: 2 })) {
  console.log(chave, "=>", valor);
}

// Atalhos
const titulo = "Dev";
const campo = "salario";
const obj = { titulo, [campo]: 5000 };    // { titulo: "Dev", salario: 5000 }
console.log(obj);`,
      explicacao: [
        'Objetos aninhados são acessados em cadeia: `pessoa.endereco.cidade`.',
        'Acessar uma propriedade inexistente devolve `undefined`, mas acessar a propriedade **de** `undefined` lança erro; `?.` evita isso.',
        '`Object.entries` devolve pares que combinam com `for...of` e desestruturação.',
        'Chaves computadas (`[campo]`) permitem criar a chave a partir de uma variável.'
      ] },
    { titulo: "Cópia, mesclagem e this", lang: "js", arquivo: "objetos-copia.js",
      codigo: `
const base = { tema: "claro", fonte: 16, notificacoes: true };
const preferencias = { tema: "escuro", fonte: 18 };

// Mescla: o último vence
const final = { ...base, ...preferencias };
console.log(final);   // { tema: "escuro", fonte: 18, notificacoes: true }

// Atualização sem mutar (padrão muito usado em interfaces)
const atualizado = { ...final, fonte: 20 };
console.log(final.fonte, atualizado.fonte);   // 18 20

// Referência: dois nomes, um objeto
const a = { n: 1 };
const b = a;
b.n = 2;
console.log(a.n);                             // 2

// Métodos e this
const conta = {
  titular: "Ana",
  saldo: 100,
  depositar(valor) {
    this.saldo += valor;                      // this = conta
    return this.saldo;
  },
  descricao() {
    return \`\${this.titular}: R$ \${this.saldo.toFixed(2)}\`;
  }
};
conta.depositar(50);
console.log(conta.descricao());               // Ana: R$ 150.00

// this se perde ao separar o método
const soltar = conta.descricao;
// soltar();   // TypeError ou valores undefined: this não é mais "conta"
const preso = conta.descricao.bind(conta);    // bind fixa o this
console.log(preso());                         // Ana: R$ 150.00`,
      explicacao: [
        'O spread mescla propriedades: se houver chaves repetidas, vale a última.',
        '`{ ...final, fonte: 20 }` cria um objeto novo, sem alterar o original.',
        'Dentro de `depositar`, `this` aponta para `conta`, porque foi assim que o método foi chamado.',
        'Ao guardar o método em outra variável, `this` deixa de apontar para `conta`; `bind` fixa o `this` desejado.'
      ] },
    { titulo: "JSON: de objeto para texto e de volta", lang: "js", arquivo: "json.js",
      codigo: `
const produto = {
  id: 7,
  nome: "Caderno",
  precoCentavos: 1590,
  tags: ["escola", "papelaria"],
  ativo: true,
  desconto: undefined,           // será omitido
  criadoEm: new Date("2026-01-15T10:00:00Z")
};

const texto = JSON.stringify(produto);
console.log(texto);
// {"id":7,"nome":"Caderno","precoCentavos":1590,"tags":["escola","papelaria"],"ativo":true,"criadoEm":"2026-01-15T10:00:00.000Z"}

const volta = JSON.parse(texto);
console.log(volta.nome);                 // Caderno
console.log(typeof volta.criadoEm);      // "string" (a data virou texto)

// Formatado, para ler
console.log(JSON.stringify({ a: 1, b: [1, 2] }, null, 2));

// JSON inválido lança erro
try {
  JSON.parse("{ nome: 'Ana' }");         // aspas simples e chave sem aspas: inválido
} catch (e) {
  console.log("Erro:", e.name);          // SyntaxError
}`,
      explicacao: [
        '`undefined` e funções são omitidos pelo `stringify`; datas viram texto no formato ISO.',
        'Depois do `parse`, `criadoEm` é uma `string`: se precisar da data, reconstrua com `new Date(volta.criadoEm)`.',
        'O terceiro argumento (`2`) indenta o texto, e facilita a leitura.',
        '`JSON.parse` lança `SyntaxError` para texto inválido: use `try...catch` ao ler dados externos.'
      ] }
  ],
  erros: [
    { erro: "Usar `obj.chave` com chave dinâmica (`obj.campo` em vez de `obj[campo]`).", porque: "O ponto procura literalmente a propriedade \"campo\".", correcao: "use colchetes com a variável." },
    { erro: "Acessar propriedade de um valor que pode ser `undefined`/`null`.", porque: "Lança `TypeError`.", correcao: "use `?.` ou verifique antes." },
    { erro: "Copiar com `const b = a` e alterar `b`.", porque: "Altera `a` também.", correcao: "use `{ ...a }` (ou `structuredClone`)." },
    { erro: "Perder o `this` ao passar um método como callback.", porque: "`this` deixa de ser o objeto.", correcao: "use `bind`, ou uma arrow function que chame o método." },
    { erro: "Usar arrow function como método que depende de `this`.", porque: "Arrow functions não têm `this` próprio.", correcao: "use a sintaxe de método (`depositar(valor) { ... }`)." },
    { erro: "Escrever JSON com aspas simples ou vírgula sobrando.", porque: "JSON exige aspas duplas e não aceita vírgula final.", correcao: "gere o JSON com `JSON.stringify` em vez de escrevê-lo à mão." }
  ],
  praticas: [
    'Use `Object.entries` para percorrer chaves e valores.',
    'Atualize objetos criando cópias (`{ ...obj, campo: novo }`).',
    'Use `?.` e `??` para dados incompletos.',
    'Valide e proteja o `JSON.parse` com `try...catch`.',
    'Para dicionários com chaves dinâmicas, considere `Map`.'
  ],
  exercicios: [
    { titulo: "Carrinho de compras",
      enunciado: 'Dado `const item = { nome: "Caneta", precoCentavos: 350, quantidade: 3 };`, crie: (a) um novo objeto `comDesconto` igual ao `item`, com `precoCentavos` reduzido em 10% (arredonde com `Math.round`), sem alterar `item`; (b) a função `subtotal(item)` que devolve preço × quantidade em centavos.',
      dica: 'Spread para copiar; `Math.round(preco * 0.9)`.',
      resolucao: { lang: "js", codigo: `
const item = { nome: "Caneta", precoCentavos: 350, quantidade: 3 };

const comDesconto = {
  ...item,
  precoCentavos: Math.round(item.precoCentavos * 0.9)   // 315
};

const subtotal = (it) => it.precoCentavos * it.quantidade;

console.log(item.precoCentavos);     // 350 (intacto)
console.log(comDesconto);            // { nome: "Caneta", precoCentavos: 315, quantidade: 3 }
console.log(subtotal(item));         // 1050
console.log(subtotal(comDesconto));  // 945`,
        comentario: 'O spread copia as propriedades e a última (`precoCentavos`) sobrescreve o valor. `Math.round` mantém o preço em centavos inteiros. `subtotal` é uma função pura, que lê o objeto sem alterá-lo.' } },
    { titulo: "Contagem de palavras",
      enunciado: 'Dado o texto `"a casa a porta a janela casa"`, conte quantas vezes cada palavra aparece, usando um objeto, e imprima os pares com `Object.entries`.',
      dica: '`texto.split(" ")` e `contagem[p] = (contagem[p] ?? 0) + 1`.',
      resolucao: { lang: "js", codigo: `
const texto = "a casa a porta a janela casa";
const contagem = {};

for (const palavra of texto.split(" ")) {
  contagem[palavra] = (contagem[palavra] ?? 0) + 1;
}

for (const [palavra, vezes] of Object.entries(contagem)) {
  console.log(palavra, vezes);
}
// a 3
// casa 2
// porta 1
// janela 1`,
        comentario: 'Cada palavra vira uma chave. `?? 0` cobre a primeira ocorrência (quando a chave ainda não existe). Com `Map`, o padrão seria o mesmo, mas sem risco de colisão com chaves como "constructor".' } }
  ],
  referencias: [
    { t: "Trabalhando com objetos", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Working_with_objects", fonte: "MDN Web Docs" },
    { t: "Básico sobre objetos", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Object_basics", fonte: "MDN Web Docs" },
    { t: "JSON", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m2a4", titulo: "Métodos de array e manipulação de dados", minutos: 65,
  topicos: ["Métodos", "Manipulação de dados"],
  objetivos: [
    "Usar `forEach`, `map`, `filter` e `reduce` para transformar coleções.",
    "Encadear métodos para resolver problemas de dados.",
    "Agrupar, contar, ordenar e totalizar listas de objetos.",
    "Escolher entre laço tradicional e métodos funcionais."
  ],
  conceito: [
    { h: "Pensando em transformações" },
    { p: 'Muitos problemas de dados seguem o mesmo roteiro: **filtrar** o que interessa, **transformar** cada item e **resumir** o resultado. Os métodos de array recebem uma função (*callback*) e executam esses passos sem laços manuais, com código mais declarativo.' },
    { h: "Os principais métodos" },
    { lista: [
      '`forEach(fn)`: executa `fn` para cada item. **Não devolve nada**: serve para efeitos (imprimir, atualizar a tela).',
      '`map(fn)`: devolve um **novo array** com o resultado de `fn` para cada item (mesmo tamanho).',
      '`filter(fn)`: devolve um novo array só com os itens para os quais `fn` devolve *truthy*.',
      '`reduce((acumulador, item) => ..., valorInicial)`: reduz o array a **um valor** (soma, objeto, texto...). Informe sempre o valor inicial.',
      '`find`, `some`, `every`, `findIndex`: buscas e testes (vistos na aula anterior).',
      '`flat()` e `flatMap(fn)`: achatam arrays aninhados.',
      '`sort(fn)`: ordenação com comparador. `toSorted(fn)` faz o mesmo **sem** alterar o original.'
    ] },
    { p: 'O callback recebe `(item, índice, array)`. Nenhum desses métodos altera o array original (exceto `sort`, e `forEach` se **você** alterar dentro dele).' },
    { h: "Encadeamento" },
    { p: 'Como `map` e `filter` devolvem arrays, dá para **encadear**: `lista.filter(...).map(...).reduce(...)`. Cada etapa fica legível e com uma responsabilidade. Em listas muito grandes, várias passagens têm custo, mas na prática a clareza costuma valer mais.' },
    { h: "Padrões de dados" },
    { lista: [
      '**Totalizar**: `reduce((soma, x) => soma + x.valor, 0)`.',
      '**Agrupar**: `reduce` montando um objeto cujas chaves são as categorias; ou `Object.groupBy(lista, fn)` / `Map.groupBy`, disponíveis em navegadores recentes.',
      '**Contar ocorrências**: `reduce` com objeto contador.',
      '**Remover duplicados**: `[...new Set(lista)]`.',
      '**Ordenar por campo**: `sort((a, b) => a.preco - b.preco)`; por texto, `localeCompare`.'
    ] },
    { h: "`for` ou métodos?" },
    { p: 'Métodos funcionais são mais claros para transformações. Um laço `for...of` continua sendo a melhor opção quando você precisa de `break`/`continue`, quando há lógica de várias etapas com estado, ou em trechos críticos de desempenho. Clareza primeiro; otimize só com medição.' },
    { nota: { t: "`map` não é `forEach`", x: 'Se você não usa o array devolvido, use `forEach` (ou `for...of`). Usar `map` apenas pelos efeitos colaterais cria um array descartado e confunde quem lê. Já um `forEach` com `push` dentro de um array externo costuma ser um `map` ou `filter` disfarçado.' } }
  ],
  exemplos: [
    { titulo: "map, filter e reduce", lang: "js", arquivo: "map-filter-reduce.js",
      codigo: `
const numeros = [1, 2, 3, 4, 5, 6];

const dobrados = numeros.map((n) => n * 2);
console.log(dobrados);                      // [2, 4, 6, 8, 10, 12]

const pares = numeros.filter((n) => n % 2 === 0);
console.log(pares);                         // [2, 4, 6]

const soma = numeros.reduce((acc, n) => acc + n, 0);
console.log(soma);                          // 21

// Encadeando: soma dos quadrados dos ímpares
const resultado = numeros
  .filter((n) => n % 2 !== 0)               // [1, 3, 5]
  .map((n) => n ** 2)                       // [1, 9, 25]
  .reduce((acc, n) => acc + n, 0);          // 35
console.log(resultado);

// O callback também recebe o índice
console.log(["a", "b", "c"].map((letra, i) => \`\${i}:\${letra}\`));  // ["0:a","1:b","2:c"]

// Duplicados
console.log([...new Set([1, 2, 2, 3, 3, 3])]);   // [1, 2, 3]`,
      explicacao: [
        '`map` e `filter` devolvem **novos** arrays e não alteram `numeros`.',
        'No `reduce`, `acc` é o acumulador e `0` é seu valor inicial. Esquecer o valor inicial é fonte de bugs com arrays vazios.',
        'O encadeamento lê-se como uma frase: filtrar ímpares, elevar ao quadrado, somar.',
        '`Set` guarda valores únicos; o spread o converte de volta em array.'
      ] },
    { titulo: "Trabalhando com uma lista de objetos", lang: "js", arquivo: "pedidos.js",
      codigo: `
const pedidos = [
  { id: 1, cliente: "Ana",   categoria: "livros",  valor: 120 },
  { id: 2, cliente: "Bruno", categoria: "jogos",   valor: 300 },
  { id: 3, cliente: "Ana",   categoria: "jogos",   valor: 80 },
  { id: 4, cliente: "Carla", categoria: "livros",  valor: 45 },
  { id: 5, cliente: "Bruno", categoria: "livros",  valor: 150 }
];

// Total geral
const total = pedidos.reduce((soma, p) => soma + p.valor, 0);
console.log(total);                                   // 695

// Pedidos acima de 100, só os clientes (sem repetição)
const clientes = [...new Set(
  pedidos.filter((p) => p.valor > 100).map((p) => p.cliente)
)];
console.log(clientes);                                // ["Ana","Bruno"]

// Total por categoria (agrupamento com reduce)
const porCategoria = pedidos.reduce((acc, p) => {
  acc[p.categoria] = (acc[p.categoria] ?? 0) + p.valor;
  return acc;
}, {});
console.log(porCategoria);                            // { livros: 315, jogos: 380 }

// Ranking de clientes por gasto
const gastoPorCliente = pedidos.reduce((acc, p) => {
  acc[p.cliente] = (acc[p.cliente] ?? 0) + p.valor;
  return acc;
}, {});
const ranking = Object.entries(gastoPorCliente)
  .map(([cliente, gasto]) => ({ cliente, gasto }))
  .sort((a, b) => b.gasto - a.gasto);
console.log(ranking);
// [{cliente:"Bruno",gasto:450},{cliente:"Ana",gasto:200},{cliente:"Carla",gasto:45}]`,
      explicacao: [
        'O agrupamento com `reduce` usa um objeto como acumulador (o valor inicial é `{}`).',
        '`?? 0` trata a primeira ocorrência de cada chave.',
        'Para o ranking, converte-se o objeto em lista de pares, mapeia-se para objetos e ordena-se de forma decrescente.',
        'Confira as contas: livros = 120+45+150 = 315; jogos = 300+80 = 380; Bruno = 300+150 = 450.'
      ] },
    { titulo: "Busca e filtros combinados", lang: "js", arquivo: "filtros.js",
      codigo: `
const livros = [
  { titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, paginas: 256 },
  { titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", ano: 1881, paginas: 220 },
  { titulo: "Vidas Secas", autor: "Graciliano Ramos", ano: 1938, paginas: 176 },
  { titulo: "Capitães da Areia", autor: "Jorge Amado", ano: 1937, paginas: 280 }
];

// Normaliza texto para busca sem acento e sem diferenciar maiúsculas
const normalizar = (s) =>
  s.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();

function buscar(lista, { termo = "", anoMinimo = 0 } = {}) {
  const t = normalizar(termo);
  return lista.filter(
    (l) =>
      l.ano >= anoMinimo &&
      (normalizar(l.titulo).includes(t) || normalizar(l.autor).includes(t))
  );
}

console.log(buscar(livros, { termo: "machado" }).map((l) => l.titulo));
// ["Dom Casmurro", "Memórias Póstumas de Brás Cubas"]
console.log(buscar(livros, { termo: "memorias" }).length);           // 1 (acentos ignorados)
console.log(buscar(livros, { anoMinimo: 1930 }).map((l) => l.titulo));
// ["Vidas Secas", "Capitães da Areia"]

// Média de páginas
const mediaPaginas = livros.reduce((s, l) => s + l.paginas, 0) / livros.length;
console.log(mediaPaginas);                // 233`,
      explicacao: [
        '`normalize("NFD")` separa as letras dos acentos, e a expressão regular remove os acentos (a faixa Unicode dos sinais combinantes).',
        'A função `buscar` recebe um objeto de opções com valores padrão, e é fácil de estender.',
        '`filter` combina duas condições com `&&` e `||`.',
        'Média: (256+220+176+280)/4 = 233.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o valor inicial no `reduce`.", porque: "Em array vazio lança `TypeError`; e o primeiro item vira o acumulador (problemático com objetos).", correcao: "sempre informe o valor inicial (`0`, `{}`, `[]`)." },
    { erro: "Esquecer o `return` no callback com chaves (`map((x) => { x * 2 })`).", porque: "Devolve `undefined` em cada posição.", correcao: "use retorno implícito ou `return`." },
    { erro: "Usar `map` só para efeitos colaterais.", porque: "Cria um array inútil.", correcao: "use `forEach` ou `for...of`." },
    { erro: "Esquecer o `return acc` dentro do `reduce` com chaves.", porque: "O acumulador vira `undefined` na volta seguinte.", correcao: "sempre devolva o acumulador." },
    { erro: "Alterar os objetos dentro de `map` (`item.preco = ...`).", porque: "Altera os dados originais, embora `map` devolva um novo array.", correcao: "devolva um novo objeto: `({ ...item, preco })`." },
    { erro: "Ordenar com `sort` dentro de uma cadeia sem copiar.", porque: "Altera o array original.", correcao: "use `toSorted` ou copie antes." }
  ],
  praticas: [
    'Use `filter` → `map` → `reduce` para pipelines legíveis.',
    'Dê nomes descritivos aos parâmetros do callback (`pedido`, e não `x`).',
    'Sempre informe o valor inicial no `reduce`.',
    'Devolva novos objetos em vez de alterar os originais.',
    'Use `for...of` quando precisar de `break` ou de lógica com estado.'
  ],
  exercicios: [
    { titulo: "Relatório de vendas",
      enunciado: 'Com `const vendas = [{ produto: "A", qtd: 2, preco: 50 }, { produto: "B", qtd: 1, preco: 120 }, { produto: "C", qtd: 5, preco: 10 }];`, calcule: (a) o total faturado (qtd × preço de cada venda, somados); (b) a lista dos nomes dos produtos em ordem alfabética; (c) as vendas cujo subtotal é maior ou igual a 100, como objetos `{ produto, subtotal }`.',
      dica: 'Um `reduce` para (a); `map` + `sort` para (b); `map` + `filter` para (c).',
      resolucao: { lang: "js", codigo: `
const vendas = [
  { produto: "A", qtd: 2, preco: 50 },
  { produto: "B", qtd: 1, preco: 120 },
  { produto: "C", qtd: 5, preco: 10 }
];

const total = vendas.reduce((soma, v) => soma + v.qtd * v.preco, 0);

const nomes = vendas
  .map((v) => v.produto)
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

const grandes = vendas
  .map((v) => ({ produto: v.produto, subtotal: v.qtd * v.preco }))
  .filter((v) => v.subtotal >= 100);

console.log(total);    // 270  (100 + 120 + 50)
console.log(nomes);    // ["A","B","C"]
console.log(grandes);  // [{produto:"A",subtotal:100},{produto:"B",subtotal:120}]`,
        comentario: 'Subtotais: A = 2×50 = 100, B = 1×120 = 120, C = 5×10 = 50; total = 270. O `map` cria objetos novos (sem alterar `vendas`), e o `filter` fica com os subtotais ≥ 100. `map` devolve um novo array, então o `sort` não altera `vendas`.' } },
    { titulo: "Agrupar por inicial",
      enunciado: 'Dada `const palavras = ["abacaxi", "banana", "amora", "cereja", "bergamota"];`, produza um objeto que agrupe as palavras pela letra inicial: `{ a: [...], b: [...], c: [...] }`.',
      dica: '`reduce` com objeto; crie o array da chave se não existir.',
      resolucao: { lang: "js", codigo: `
const palavras = ["abacaxi", "banana", "amora", "cereja", "bergamota"];

const porInicial = palavras.reduce((grupos, palavra) => {
  const inicial = palavra[0];
  (grupos[inicial] ??= []).push(palavra);
  return grupos;
}, {});

console.log(porInicial);
// { a: ["abacaxi","amora"], b: ["banana","bergamota"], c: ["cereja"] }`,
        comentario: '`grupos[inicial] ??= []` cria o array da letra na primeira vez em que ela aparece, e o `push` acrescenta a palavra. O `return grupos` é indispensável a cada volta do `reduce`.' } }
  ],
  referencias: [
    { t: "Array.prototype.map()", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map", fonte: "MDN Web Docs" },
    { t: "Array.prototype.reduce()", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce", fonte: "MDN Web Docs" },
    { t: "Array.prototype.filter()", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter", fonte: "MDN Web Docs" }
  ]
}

] });
