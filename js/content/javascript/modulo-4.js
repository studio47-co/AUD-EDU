/* JavaScript · Módulo 4 — JavaScript moderno
   Tópicos: ES6+ · desestruturação · módulos · promises · async/await · fetch API ·
   tratamento de erros · armazenamento local */
AE.Conteudo.modulo("javascript", 4, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m4a1", titulo: "ES6+ e desestruturação", minutos: 60,
  topicos: ["ES6+", "Desestruturação"],
  objetivos: [
    "Reconhecer e usar os recursos modernos mais importantes da linguagem (ES2015 em diante).",
    "Aplicar desestruturação em arrays, objetos e parâmetros de função.",
    "Usar *spread*, *rest*, parâmetros padrão e *shorthand* de objetos.",
    "Usar `Map`, `Set`, `?.`, `??`, `Array.at`, `structuredClone` e outros recursos úteis."
  ],
  conceito: [
    { h: "O que é \"ES6+\"" },
    { p: 'A linguagem é padronizada pela **ECMAScript**. A edição de 2015 (ES6/ES2015) foi a maior atualização da história e, desde então, sai uma edição por ano. "ES6+" refere-se a esse conjunto de recursos modernos, hoje disponíveis nos navegadores atuais. Antes de usar um recurso muito recente, confira a compatibilidade (MDN, *Can I use*) e se o seu público precisa de navegadores antigos.' },
    { h: "Recursos que você já viu e outros" },
    { lista: [
      '`let`/`const`, *template literals*, *arrow functions*, parâmetros padrão, `for...of`, `?.` e `??`.',
      '**Shorthand de objetos**: `{ nome, idade }` e métodos `{ falar() {} }`; **chaves computadas**: `{ [campo]: valor }`.',
      '**Classes**: `class Pessoa { constructor(nome) { this.nome = nome; } falar() { ... } }`; com `extends` e `static`. São açúcar sintático sobre protótipos. Em muito código moderno, objetos simples e funções bastam.',
      '**`Map` e `Set`**: coleções de chave-valor (qualquer tipo de chave) e de valores únicos.',
      '**Iteráveis e geradores** (`function*`), `Symbol`: recursos avançados que sustentam `for...of`.',
      '**Métodos novos**: `Array.at`, `Object.fromEntries`, `Object.hasOwn`, `String.replaceAll`, `structuredClone`, `Array.toSorted`, `Object.groupBy`.'
    ] },
    { h: "Desestruturação" },
    { p: 'Permite "desmontar" arrays e objetos em variáveis, em uma só linha:' },
    { lista: [
      '**Array** (por posição): `const [a, b] = [1, 2];` e pular itens com vírgula: `const [, segundo] = lista;`.',
      '**Objeto** (por nome): `const { nome, idade } = pessoa;`.',
      '**Renomear**: `const { nome: titulo } = produto;`. **Valor padrão**: `const { tema = "claro" } = config;`.',
      '**Aninhada**: `const { endereco: { cidade } } = pessoa;`.',
      '**Em parâmetros**: `function exibir({ nome, preco = 0 }) { ... }`, ótimo para funções com muitas opções.',
      '**Trocar valores**: `[a, b] = [b, a];`.'
    ] },
    { h: "Spread e rest" },
    { p: 'Os três pontos têm dois papéis, conforme o contexto: **spread** *espalha* os elementos (`[...a, ...b]`, `{ ...obj, novo: 1 }`, `Math.max(...numeros)`) e **rest** *junta* o que sobra (`function soma(...n)`, `const [primeiro, ...resto] = lista`, `const { id, ...demais } = obj`). Lembre: spread faz cópia **rasa**.' },
    { nota: { t: "Use com moderação", x: 'Desestruturação aninhada profunda e muitos valores padrão ficam ilegíveis. Se a linha exige esforço para ser lida, divida em partes. Recursos modernos existem para deixar o código **mais claro**, e não mais "esperto".' } }
  ],
  exemplos: [
    { titulo: "Desestruturação", lang: "js", arquivo: "desestruturacao.js",
      codigo: `
// Arrays: por posição
const [primeiro, segundo, ...resto] = ["a", "b", "c", "d"];
console.log(primeiro, segundo, resto);       // a b ["c","d"]

let x = 1, y = 2;
[x, y] = [y, x];                             // troca sem variável auxiliar
console.log(x, y);                           // 2 1

// Objetos: por nome
const produto = { id: 7, nome: "Caderno", preco: 1590, tags: ["escola"] };

const { nome, preco } = produto;
console.log(nome, preco);                    // Caderno 1590

const { nome: titulo, estoque = 0 } = produto;   // renomear e valor padrão
console.log(titulo, estoque);                // Caderno 0

const { id, ...semId } = produto;            // rest em objeto
console.log(id, semId);                      // 7 { nome, preco, tags }

// Aninhada
const pessoa = { nome: "Ana", endereco: { cidade: "Recife", uf: "PE" } };
const { endereco: { cidade } } = pessoa;
console.log(cidade);                         // Recife

// Em parâmetros de função
function exibirProduto({ nome, preco = 0, tags = [] }) {
  return \`\${nome}: \${(preco / 100).toFixed(2)} [\${tags.join(", ")}]\`;
}
console.log(exibirProduto(produto));        // Caderno: 15.90 [escola]
console.log(exibirProduto({ nome: "Brinde" })); // Brinde: 0.00 []

// Com Object.entries e for...of
for (const [chave, valor] of Object.entries({ a: 1, b: 2 })) {
  console.log(chave, valor);
}`,
      explicacao: [
        'Em arrays, a **posição** importa; em objetos, o **nome** importa e a ordem não.',
        'Valores padrão só valem quando a propriedade é `undefined`.',
        'Desestruturar o parâmetro documenta quais propriedades a função usa e dá valores padrão a opções ausentes.',
        'O rest em objetos (`...semId`) copia as demais propriedades para um novo objeto.'
      ] },
    { titulo: "Spread, rest, Map e Set", lang: "js", arquivo: "spread-map-set.js",
      codigo: `
// Spread em arrays e objetos
const a = [1, 2];
const b = [3, 4];
console.log([...a, ...b, 5]);                // [1,2,3,4,5]
console.log(Math.max(...[3, 9, 4]));         // 9

const base = { tema: "claro", fonte: 16 };
console.log({ ...base, fonte: 18 });         // { tema: "claro", fonte: 18 }

// Set: valores únicos
const unicos = new Set([1, 2, 2, 3, 3, 3]);
console.log(unicos.size, [...unicos]);       // 3 [1,2,3]
unicos.add(4);
console.log(unicos.has(4));                  // true

// Map: chaves de qualquer tipo, ordem de inserção, size
const contagem = new Map();
for (const palavra of "a b a c b a".split(" ")) {
  contagem.set(palavra, (contagem.get(palavra) ?? 0) + 1);
}
console.log(contagem.get("a"), contagem.size);   // 3 3
console.log([...contagem.entries()]);        // [["a",3],["b",2],["c",1]]

// Classes: exemplo enxuto
class Conta {
  #saldo = 0;                                // campo privado
  constructor(titular) { this.titular = titular; }
  depositar(valor) {
    if (valor <= 0) throw new RangeError("Valor inválido");
    this.#saldo += valor;
    return this;                             // permite encadear
  }
  get saldo() { return this.#saldo; }
}
const conta = new Conta("Ana").depositar(100).depositar(50);
console.log(conta.titular, conta.saldo);     // Ana 150
// console.log(conta.#saldo);                // SyntaxError: campo privado`,
      explicacao: [
        '`Set` remove duplicados e oferece `has` rápido; `Map` evita os problemas de usar objetos como dicionários.',
        'Spread espalha elementos em arrays e propriedades em objetos; em chamadas de função, espalha argumentos.',
        'Campos privados (`#saldo`) só são acessíveis dentro da classe, e protegem o estado.',
        '`get saldo()` expõe leitura sem permitir atribuição direta.'
      ] },
    { titulo: "Pequenas novidades úteis", lang: "js", arquivo: "novidades.js",
      codigo: `
const lista = [10, 20, 30];
console.log(lista.at(-1));                       // 30 (último)
console.log("a-b-c".replaceAll("-", "+"));       // a+b+c
console.log(Object.hasOwn({ x: 1 }, "x"));       // true
console.log(Object.fromEntries([["a", 1], ["b", 2]])); // { a: 1, b: 2 }

// Copia profunda
const original = { nome: "Ana", prefs: { tema: "claro" } };
const copia = structuredClone(original);
copia.prefs.tema = "escuro";
console.log(original.prefs.tema);                // claro

// Ordenação sem alterar o original (navegadores atuais)
console.log(lista.toSorted((a, b) => b - a), lista);  // [30,20,10] [10,20,30]

// Separador numérico e BigInt
console.log(1_000_000, 2n ** 64n);

// Intl: formatação por região
console.log(new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" })
  .format(new Date("2026-03-08T12:00:00Z")));    // 8 de março de 2026
console.log(new Intl.NumberFormat("pt-BR").format(1234567.891)); // 1.234.567,891`,
      explicacao: [
        '`at`, `replaceAll`, `Object.hasOwn`, `structuredClone` e `toSorted` simplificam tarefas comuns.',
        '`toSorted` e métodos "to..." devolvem cópias; exigem navegadores recentes (confira a compatibilidade).',
        '`Intl` formata datas e números segundo a região: prefira-o a montar textos manualmente.',
        '`timeZone: "UTC"` aqui garante a mesma saída em qualquer fuso horário.'
      ] }
  ],
  erros: [
    { erro: "Desestruturar um valor que pode ser `undefined` ou `null` (`const { a } = obj;` com `obj` indefinido).", porque: "Lança `TypeError`.", correcao: "ofereça um padrão: `const { a } = obj ?? {};`." },
    { erro: "Confiar em valor padrão para `null`.", porque: "O padrão só vale para `undefined`.", correcao: "trate `null` à parte, ou use `??`." },
    { erro: "Achar que o spread copia profundamente.", porque: "A cópia é rasa: objetos internos continuam compartilhados.", correcao: "use `structuredClone` quando precisar de cópia profunda." },
    { erro: "Usar o mesmo nome para variável desestruturada e uma existente no mesmo escopo.", porque: "`SyntaxError`: variável já declarada.", correcao: "renomeie com `{ nome: titulo }`." },
    { erro: "Usar um recurso novo sem verificar compatibilidade.", porque: "Pode falhar em navegadores desatualizados.", correcao: "consulte a MDN e defina quais navegadores você precisa atender." },
    { erro: "Abusar de classes e de herança profunda.", porque: "Aumenta a complexidade sem necessidade.", correcao: "prefira funções e objetos simples; use classes quando houver ganho real." }
  ],
  praticas: [
    'Desestruture parâmetros para documentar as opções de uma função.',
    'Use `Map`/`Set` quando a estrutura combinar com o problema.',
    'Prefira cópias (`spread`, `structuredClone`, `toSorted`) a mutar dados compartilhados.',
    'Verifique a compatibilidade de recursos recentes.',
    'Escolha clareza antes de concisão.'
  ],
  exercicios: [
    { titulo: "Refatore com desestruturação",
      enunciado: 'Reescreva usando desestruturação, parâmetros padrão e spread: `function criarUsuario(dados) { const nome = dados.nome; const papel = dados.papel === undefined ? "leitor" : dados.papel; const resto = {}; for (const k in dados) { if (k !== "nome" && k !== "papel") resto[k] = dados[k]; } return { nome: nome, papel: papel, criadoEm: "2026-01-01", ...resto }; }`',
      dica: 'Parâmetro `{ nome, papel = "leitor", ...resto }`.',
      resolucao: { lang: "js", codigo: `
function criarUsuario({ nome, papel = "leitor", ...resto }) {
  return { nome, papel, criadoEm: "2026-01-01", ...resto };
}

console.log(criarUsuario({ nome: "Ana", idade: 30 }));
// { nome: "Ana", papel: "leitor", criadoEm: "2026-01-01", idade: 30 }
console.log(criarUsuario({ nome: "Bia", papel: "admin" }));
// { nome: "Bia", papel: "admin", criadoEm: "2026-01-01" }`,
        comentario: 'O parâmetro desestruturado extrai `nome` e `papel` (com padrão `"leitor"`) e junta o restante em `resto` com rest. O retorno usa shorthand (`nome, papel`) e spread para acrescentar as demais propriedades. Observação: aqui `...resto` vem por último e pode sobrescrever `criadoEm`, se alguém enviar essa chave; escolha a ordem de acordo com a regra de negócio.' } },
    { titulo: "Contagem com Map",
      enunciado: 'Dada `const votos = ["ana", "bia", "ana", "caio", "bia", "ana"];`, use um `Map` para contar os votos e imprima o ranking em ordem decrescente: `ana: 3`, `bia: 2`, `caio: 1`.',
      dica: '`[...mapa.entries()].sort(...)`.',
      resolucao: { lang: "js", codigo: `
const votos = ["ana", "bia", "ana", "caio", "bia", "ana"];
const contagem = new Map();

for (const voto of votos) {
  contagem.set(voto, (contagem.get(voto) ?? 0) + 1);
}

const ranking = [...contagem.entries()].sort(([, a], [, b]) => b - a);

for (const [nome, total] of ranking) {
  console.log(\`\${nome}: \${total}\`);
}
// ana: 3
// bia: 2
// caio: 1`,
        comentario: 'O `Map` guarda os totais. `entries()` entrega pares `[nome, total]`, e a desestruturação no comparador (`[, a], [, b]`) ignora o nome e compara só os totais. O `sort` atua sobre o array novo criado pelo spread, não sobre o `Map`.' } }
  ],
  referencias: [
    { t: "Atribuição via desestruturação", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", fonte: "MDN Web Docs" },
    { t: "Sintaxe de espalhamento (spread)", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax", fonte: "MDN Web Docs" },
    { t: "Map", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Map", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a2", titulo: "Módulos", minutos: 45,
  topicos: ["Módulos"],
  objetivos: [
    "Dividir um programa em arquivos com `export` e `import`.",
    "Distinguir exportação nomeada e padrão (`default`).",
    "Usar módulos no navegador com `<script type=\"module\">` e entender suas regras.",
    "Organizar um projeto em módulos coesos, sem dependências circulares."
  ],
  conceito: [
    { h: "Por que módulos" },
    { p: 'Conforme o código cresce, um arquivo único vira um labirinto. **Módulos** permitem dividir o programa em arquivos, cada um com seu **escopo próprio** (nada vaza para o global) e uma **interface pública** explícita: o que o arquivo exporta. Quem precisa de algo, importa.' },
    { h: "Exportar e importar" },
    { lista: [
      '**Exportação nomeada**: `export const PI = 3.14;`, `export function somar(a, b) {...}`. Importa-se com o **mesmo nome**, entre chaves: `import { PI, somar } from "./matematica.js";`.',
      '**Renomear**: `import { somar as adicionar } from "./matematica.js";`.',
      '**Importar tudo**: `import * as mat from "./matematica.js";` (`mat.somar(...)`).',
      '**Exportação padrão** (uma por arquivo): `export default function criarApp() {...}`. Importa-se com **qualquer nome**, sem chaves: `import criarApp from "./app.js";`. Muitos guias de estilo preferem exportações nomeadas por serem mais explícitas.',
      '**Reexportar**: `export { somar } from "./matematica.js";` (útil em arquivos "índice").',
      '**Importação dinâmica**: `const modulo = await import("./grafico.js");` carrega o arquivo **sob demanda**, e devolve uma Promise.'
    ] },
    { h: "Módulos no navegador" },
    { lista: [
      '`<script type="module" src="app.js"></script>`. Módulos são **deferidos por padrão** (executam depois do HTML), rodam em **modo estrito** e executam **uma única vez**, mesmo que importados por vários arquivos.',
      'Os caminhos de importação precisam ser **relativos com extensão**: `"./utils.js"`, `"../dados/api.js"`.',
      'Exigem **HTTP(S)**: abrir o HTML direto do disco (`file://`) costuma ser bloqueado por regras de segurança (CORS). Use um servidor local (por exemplo, `npx serve`, a extensão Live Server do editor, ou `python -m http.server`).',
      'Variáveis de um módulo **não** viram propriedades de `window`.',
      'Para compartilhar com o HTML (`onclick` inline), seria preciso expor no global: mais um motivo para usar `addEventListener` dentro do módulo.'
    ] },
    { h: "Organização" },
    { lista: [
      'Um módulo, uma responsabilidade: `dados.js` (acesso a dados), `render.js` (DOM), `util.js` (funções puras), `app.js` (ponto de entrada que junta tudo).',
      'Evite **dependências circulares** (A importa B e B importa A): sinal de que a divisão está errada.',
      'Funções puras em módulos próprios são fáceis de testar.',
      'Em projetos maiores, ferramentas de *build* (Vite, esbuild...) empacotam os módulos; e o `npm` instala bibliotecas de terceiros. Para aprender e para sites pequenos, módulos nativos bastam.'
    ] },
    { nota: { t: "Módulos e segurança", x: 'Importar código de terceiros (por CDN ou `npm`) executa esse código na sua página. Use fontes confiáveis, fixe versões e, quando carregar de CDN, considere *Subresource Integrity*. Nunca importe scripts de origens que você não conhece.' } }
  ],
  exemplos: [
    { titulo: "Dois módulos e um ponto de entrada", lang: "js", arquivo: "modulos.js",
      codigo: `
// ===== arquivo: util/moeda.js =====
const formatador = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarMoeda(centavos) {
  return formatador.format(centavos / 100);
}

export const MOEDA = "BRL";

// ===== arquivo: dados/carrinho.js =====
import { formatarMoeda } from "../util/moeda.js";

export default function criarCarrinho() {
  const itens = [];
  return {
    adicionar(nome, precoCentavos, qtd = 1) {
      itens.push({ nome, precoCentavos, qtd });
    },
    total() {
      return itens.reduce((soma, i) => soma + i.precoCentavos * i.qtd, 0);
    },
    resumo() {
      return \`\${itens.length} itens, total \${formatarMoeda(this.total())}\`;
    }
  };
}

// ===== arquivo: app.js (ponto de entrada) =====
import criarCarrinho from "./dados/carrinho.js";   // padrão: sem chaves, nome livre
import { formatarMoeda, MOEDA } from "./util/moeda.js";  // nomeadas: com chaves

const carrinho = criarCarrinho();
carrinho.adicionar("Caderno", 1590);
carrinho.adicionar("Caneta", 350, 3);

console.log(carrinho.resumo());                   // 2 itens, total R$ 26,40
console.log(formatarMoeda(100), MOEDA);

// ===== index.html =====
// <script type="module" src="app.js"></script>`,
      explicacao: [
        'O arquivo foi dividido em três: utilitário de formatação, lógica do carrinho e ponto de entrada.',
        '`formatador` não é exportado: é um detalhe interno do módulo `moeda.js`.',
        'Exportação padrão (`criarCarrinho`) é importada sem chaves; as nomeadas, com chaves e o mesmo nome.',
        'Este bloco reúne **vários arquivos** para fins didáticos: cada trecho "=== arquivo: ===" seria um arquivo separado.'
      ] },
    { titulo: "Importação dinâmica e módulo de índice", lang: "js", arquivo: "dinamico.js",
      codigo: `
// ===== arquivo: componentes/index.js (reexporta) =====
export { criarBotao } from "./botao.js";
export { criarCartao } from "./cartao.js";

// Em outro arquivo: um só import para tudo
// import { criarBotao, criarCartao } from "./componentes/index.js";

// ===== Carregamento sob demanda =====
const botaoGrafico = document.querySelector("#mostrar-grafico");

botaoGrafico?.addEventListener("click", async () => {
  try {
    const { desenharGrafico } = await import("./grafico.js");   // baixa só agora
    desenharGrafico(document.querySelector("#area-grafico"));
  } catch (erro) {
    console.error("Não foi possível carregar o gráfico", erro);
  }
}, { once: true });

// ===== Detalhe: módulos executam uma única vez =====
// Se "a.js" e "b.js" importarem "config.js", o código de config.js roda uma vez,
// e os dois recebem a MESMA instância (estado compartilhado).`,
      explicacao: [
        'Um arquivo de índice reexporta o que quer tornar público e simplifica as importações.',
        '`import()` devolve uma Promise, e permite carregar código pesado só quando o usuário precisa.',
        'O `try...catch` trata a falha de rede ao carregar o módulo.',
        'Como módulos são executados uma vez, um módulo pode guardar estado compartilhado (use com cuidado).'
      ] },
    { titulo: "Servidor local e ligação no HTML", lang: "html", arquivo: "index.html",
      codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>App com módulos</title>
  <!-- type="module": deferido, estrito, escopo próprio -->
  <script type="module" src="app.js"></script>
  <!-- Navegadores sem suporte a módulos ignoram o script acima; opcionalmente: -->
  <script nomodule src="legado.js"></script>
</head>
<body>
  <button id="mostrar-grafico">Mostrar gráfico</button>
  <div id="area-grafico"></div>
</body>
</html>

<!-- Para testar localmente (módulos exigem http://, e não file://):
       npx serve .
       python3 -m http.server 8000      e abrir http://localhost:8000 -->`,
      explicacao: [
        '`type="module"` já é deferido: não precisa de `defer`.',
        'Abrir o HTML por `file://` costuma falhar ao importar módulos: use um servidor local.',
        '`nomodule` é uma alternativa para navegadores muito antigos, e hoje raramente é necessária.',
        'Sempre confira o painel Rede e o console se um import não carregar (caminho ou extensão errados).'
      ] }
  ],
  erros: [
    { erro: "Importar sem a extensão ou sem `./` (`import x from \"util\"`).", porque: "No navegador, o caminho precisa ser relativo e completo.", correcao: "use `\"./util.js\"`." },
    { erro: "Abrir o HTML pelo disco (`file://`) e esperar que os módulos funcionem.", porque: "Os navegadores bloqueiam por segurança.", correcao: "use um servidor local." },
    { erro: "Importar com nome diferente uma exportação nomeada.", porque: "O nome precisa coincidir (ou ser renomeado com `as`).", correcao: "use `{ nome }` ou `{ nome as outro }`." },
    { erro: "Usar chaves ao importar uma exportação padrão (ou o contrário).", porque: "São mecanismos diferentes.", correcao: "padrão: sem chaves; nomeada: com chaves." },
    { erro: "Dependência circular entre módulos.", porque: "Pode devolver valores ainda não inicializados.", correcao: "extraia o código comum para um terceiro módulo." },
    { erro: "Esperar que variáveis do módulo existam em `window`.", porque: "Têm escopo próprio.", correcao: "exporte e importe o que for necessário." }
  ],
  praticas: [
    'Prefira exportações nomeadas e arquivos pequenos e coesos.',
    'Use um ponto de entrada (`app.js`) que apenas conecta os módulos.',
    'Mantenha funções puras separadas da interface.',
    'Teste localmente com servidor HTTP.',
    'Carregue código pesado sob demanda com `import()`.'
  ],
  exercicios: [
    { titulo: "Divida em módulos",
      enunciado: 'Divida este código em dois módulos: `texto.js` (exportando `capitalizar` e `contarPalavras`) e `app.js` (importando e usando as duas funções). Código original: `function capitalizar(t) { return t.charAt(0).toUpperCase() + t.slice(1); } function contarPalavras(t) { return t.trim().split(/\\s+/).filter(Boolean).length; } console.log(capitalizar("olá mundo"), contarPalavras("um dois três"));`',
      dica: '`export function` e `import { ... } from "./texto.js"`.',
      resolucao: { lang: "js", codigo: `
// ===== texto.js =====
export function capitalizar(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function contarPalavras(t) {
  return t.trim().split(/\\s+/).filter(Boolean).length;
}

// ===== app.js =====
import { capitalizar, contarPalavras } from "./texto.js";

console.log(capitalizar("olá mundo"));        // Olá mundo
console.log(contarPalavras("um dois três"));  // 3
console.log(contarPalavras("   "));           // 0 (filter(Boolean) descarta o vazio)

// ===== index.html =====
// <script type="module" src="app.js"></script>`,
        comentario: 'As funções são exportadas por nome e importadas com o mesmo nome. O `filter(Boolean)` trata o caso de texto vazio (um `split` sobre "" devolve `[""]`, que daria 1 palavra). O HTML usa `type="module"` e precisa ser servido por HTTP.' } },
    { titulo: "Decida: nomeada ou padrão?",
      enunciado: 'Um arquivo `config.js` tem: a constante `API_URL`, a constante `TIMEOUT` e uma função `criarCliente()` que é a principal do arquivo. Escreva as exportações e as importações em `app.js`, justificando a escolha.',
      dica: 'Constantes e utilitários: nomeadas; o item principal pode ser padrão.',
      resolucao: { lang: "js", codigo: `
// ===== config.js =====
export const API_URL = "https://api.exemplo.com";
export const TIMEOUT = 5000;

export default function criarCliente() {
  return { url: API_URL, timeout: TIMEOUT };
}

// ===== app.js =====
import criarCliente, { API_URL, TIMEOUT } from "./config.js";

const cliente = criarCliente();
console.log(cliente, API_URL, TIMEOUT);`,
        comentario: 'Constantes são naturalmente nomeadas (várias por arquivo, nomes fixos). A função principal pode ser `default`, importada sem chaves. Alternativa igualmente válida: exportar tudo por nome, o que evita que cada arquivo escolha um apelido diferente para o mesmo item e facilita buscas no código.' } }
  ],
  referencias: [
    { t: "Módulos JavaScript (guia)", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Modules", fonte: "MDN Web Docs" },
    { t: "import", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import", fonte: "MDN Web Docs" },
    { t: "export", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/export", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a3", titulo: "Promises e async/await", minutos: 70,
  topicos: ["Promises", "Async/Await"],
  objetivos: [
    "Explicar a diferença entre código síncrono e assíncrono e o papel do *event loop*.",
    "Criar e consumir Promises com `then`, `catch` e `finally`.",
    "Escrever funções `async` e usar `await` com `try...catch`.",
    "Executar tarefas em paralelo com `Promise.all`, `allSettled`, `race` e `any`."
  ],
  conceito: [
    { h: "Código assíncrono" },
    { p: 'Operações lentas (requisições de rede, leitura de arquivos, temporizadores) não podem **travar** a página. O JavaScript executa em **uma única linha de execução** (*thread*) e, em vez de esperar, **agenda** o que fazer quando a operação terminar, enquanto segue com outras tarefas. O mecanismo que coordena isso é o ***event loop***: uma fila de tarefas que só é consumida quando a pilha de chamadas está vazia.' },
    { p: 'Por isso `setTimeout(f, 0)` **não** executa `f` imediatamente: ele a coloca na fila, e ela roda depois que o código atual termina. A ordem de saída de código assíncrono costuma surpreender no início: teste e observe.' },
    { h: "Do callback às Promises" },
    { p: 'Antigamente, o assíncrono usava *callbacks* aninhados (o "inferno de callbacks"). Uma **Promise** é um objeto que representa um valor **futuro**, em um de três estados: ***pending*** (pendente), ***fulfilled*** (cumprida, com um valor) ou ***rejected*** (rejeitada, com um motivo). Depois de resolvida, **não muda mais**.' },
    { lista: [
      '`new Promise((resolver, rejeitar) => { ... })` cria uma Promise (você raramente precisa criar uma manualmente; quase sempre consome as que APIs já devolvem).',
      '`.then(valor => ...)` trata o sucesso e **devolve outra Promise**, o que permite encadear.',
      '`.catch(erro => ...)` trata qualquer rejeição ocorrida na cadeia acima.',
      '`.finally(() => ...)` roda sempre, no fim (limpar *spinner*, reabilitar botão).'
    ] },
    { h: "`async` e `await`" },
    { p: 'A sintaxe moderna deixa o código assíncrono parecido com o síncrono:' },
    { lista: [
      'Uma função declarada com `async` **sempre devolve uma Promise**.',
      '`await promessa` **pausa a função** até a Promise ser resolvida e devolve o valor (ou lança o erro, se rejeitada). Só pode ser usado dentro de função `async` (ou no nível superior de módulos).',
      'Trate erros com `try...catch`, como no código síncrono.',
      '`await` **não trava a página**: apenas pausa **aquela** função; o resto da aplicação continua.'
    ] },
    { h: "Sequencial x paralelo" },
    { p: 'Dois `await` seguidos executam **em sequência**: o segundo só começa quando o primeiro termina. Se as operações forem independentes, inicie-as juntas e espere todas:' },
    { lista: [
      '`Promise.all([p1, p2])`: resolve quando **todas** cumprem; rejeita **imediatamente** se **qualquer uma** falhar.',
      '`Promise.allSettled([...])`: espera todas e devolve o resultado de cada uma (`status: "fulfilled" | "rejected"`), sem rejeitar nunca.',
      '`Promise.race([...])`: resolve/rejeita como a **primeira** a terminar (útil para limites de tempo).',
      '`Promise.any([...])`: resolve com a primeira **cumprida**; rejeita só se todas falharem.'
    ] },
    { h: "Armadilhas" },
    { lista: [
      '**Esquecer o `await`**: você recebe a Promise, e não o valor.',
      '**`await` dentro de `forEach`** não espera: `forEach` ignora Promises. Use `for...of` (sequencial) ou `Promise.all(lista.map(...))` (paralelo).',
      '**Rejeições não tratadas** geram avisos no console (`unhandledrejection`) e comportamento imprevisível.',
      '**Promise não é cancelável** por si só: para cancelar requisições, use `AbortController` (aula 4.4).'
    ] },
    { nota: { t: "Pense em linha do tempo", x: 'Ao ler código assíncrono, desenhe uma linha do tempo: o que roda agora, o que fica agendado e o que roda **depois**. Dentro de uma função `async`, tudo antes do primeiro `await` roda de forma síncrona; o restante roda depois da resolução.' } }
  ],
  exemplos: [
    { titulo: "A ordem de execução (event loop)", lang: "js", arquivo: "event-loop.js",
      codigo: `
console.log("1: início");

setTimeout(() => console.log("4: setTimeout (fila de tarefas)"), 0);

Promise.resolve().then(() => console.log("3: promise (fila de microtarefas)"));

console.log("2: fim do código síncrono");

// Saída:
// 1: início
// 2: fim do código síncrono
// 3: promise (fila de microtarefas)
// 4: setTimeout (fila de tarefas)`,
      explicacao: [
        'Primeiro roda **todo** o código síncrono (1 e 2).',
        'Depois, as **microtarefas** (callbacks de Promises) vêm antes das tarefas do `setTimeout`.',
        '`setTimeout(f, 0)` só agenda: a função roda quando a pilha esvaziar.',
        'Entender essa ordem evita bugs do tipo "por que meu valor ainda está vazio?".'
      ] },
    { titulo: "Promises: then, catch e finally", lang: "js", arquivo: "promises.js",
      codigo: `
// Função que devolve uma Promise (simula uma operação lenta)
function esperar(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

function buscarUsuario(id) {
  return new Promise((resolver, rejeitar) => {
    setTimeout(() => {
      if (id > 0) resolver({ id, nome: "Ana" });
      else rejeitar(new Error("ID inválido"));
    }, 100);
  });
}

buscarUsuario(1)
  .then((usuario) => {
    console.log("Usuário:", usuario.nome);
    return buscarUsuario(-1);                 // devolve outra Promise: encadeia
  })
  .then((outro) => console.log("não chega aqui", outro))
  .catch((erro) => console.log("Erro capturado:", erro.message))   // pega qualquer falha acima
  .finally(() => console.log("Fim (sempre executa)"));

// Estados de uma Promise
const p = Promise.resolve(42);
console.log(p);                               // Promise { 42 }
esperar(200).then(() => console.log("200 ms depois"));`,
      explicacao: [
        'O `resolver` cumpre a Promise com um valor; `rejeitar` a falha com um erro (use sempre objetos `Error`).',
        'O segundo `.then` não executa, pois a Promise anterior foi rejeitada: o fluxo pula direto para o `.catch`.',
        '`.finally` roda em ambos os casos.',
        '`esperar(ms)` é um utilitário muito útil para simular atrasos e fazer pausas em testes.'
      ] },
    { titulo: "async/await com tratamento de erros", lang: "js", arquivo: "async-await.js",
      codigo: `
const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

async function buscarUsuario(id) {
  await esperar(100);
  if (id <= 0) throw new Error("ID inválido");
  return { id, nome: "Ana" };
}

async function mostrarUsuario(id) {
  try {
    const usuario = await buscarUsuario(id);     // pausa até resolver
    console.log("Olá,", usuario.nome);
  } catch (erro) {
    console.log("Falhou:", erro.message);
  } finally {
    console.log("Concluído:", id);
  }
}

await mostrarUsuario(1);    // Olá, Ana / Concluído: 1
await mostrarUsuario(-1);   // Falhou: ID inválido / Concluído: -1
// (o await de nível superior funciona em módulos; fora deles, use uma função async)

// Uma função async SEMPRE devolve Promise
async function exemplo() { return 7; }
console.log(exemplo());                          // Promise { <pending> } ou { 7 }
exemplo().then((v) => console.log("valor:", v));   // 7`,
      explicacao: [
        '`await` pausa **apenas** `mostrarUsuario`; o restante da página continua responsiva.',
        'Um `throw` dentro de uma função `async` rejeita a Promise que ela devolve.',
        'O `try...catch` captura tanto erros síncronos como rejeições aguardadas com `await`.',
        'Para usar `await` no nível superior fora de módulos, envolva o código em uma função `async`.'
      ] },
    { titulo: "Sequencial x paralelo, e Promise.all", lang: "js", arquivo: "paralelo.js",
      codigo: `
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const buscar = async (nome, ms) => { await esperar(ms); return nome; };

async function sequencial() {
  const inicio = Date.now();
  const a = await buscar("A", 300);
  const b = await buscar("B", 300);          // só começa depois de A
  console.log("sequencial:", a, b, Math.round((Date.now() - inicio) / 100) * 100, "ms");   // ≈ 600
}

async function paralelo() {
  const inicio = Date.now();
  const [a, b] = await Promise.all([buscar("A", 300), buscar("B", 300)]);  // iniciam juntas
  console.log("paralelo:", a, b, Math.round((Date.now() - inicio) / 100) * 100, "ms");     // ≈ 300
}

async function tolerante() {
  const resultados = await Promise.allSettled([
    buscar("ok", 50),
    Promise.reject(new Error("falhou")),
    buscar("ok2", 80)
  ]);
  for (const r of resultados) {
    console.log(r.status, r.status === "fulfilled" ? r.value : r.reason.message);
  }
}

async function comLimiteDeTempo(promessa, ms) {
  const limite = new Promise((_, rejeitar) =>
    setTimeout(() => rejeitar(new Error("Tempo esgotado")), ms));
  return Promise.race([promessa, limite]);
}

await sequencial();
await paralelo();
await tolerante();
try {
  await comLimiteDeTempo(buscar("lenta", 500), 100);
} catch (e) {
  console.log(e.message);                    // Tempo esgotado
}

// ERRO COMUM: await dentro de forEach NÃO espera
// [1, 2, 3].forEach(async (n) => { await esperar(100); console.log(n); });
// console.log("terminou?");   // imprime ANTES dos números
// Correto (sequencial):  for (const n of [1, 2, 3]) { await esperar(100); console.log(n); }
// Correto (paralelo):    await Promise.all([1, 2, 3].map(async (n) => { ... }));`,
      explicacao: [
        'Em `sequencial`, o segundo `await` só começa depois do primeiro: ≈ 600 ms. Em `paralelo`, as duas começam juntas: ≈ 300 ms.',
        '`Promise.all` rejeita de imediato se uma falhar; `allSettled` espera todas e informa o resultado de cada uma.',
        '`Promise.race` com uma Promise de limite de tempo é o padrão para *timeout*.',
        '`forEach` ignora as Promises devolvidas pelo callback: o código seguinte não espera.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o `await`.", porque: "Você usa a Promise como se fosse o valor (`[object Promise]`/`undefined`).", correcao: "use `await` (dentro de função `async`)." },
    { erro: "Fazer `await` em sequência para tarefas independentes.", porque: "Soma os tempos sem necessidade.", correcao: "inicie juntas e use `Promise.all`." },
    { erro: "`await` dentro de `forEach`.", porque: "`forEach` não espera: o código segue adiante.", correcao: "use `for...of` ou `Promise.all(lista.map(...))`." },
    { erro: "Não tratar rejeições.", porque: "Gera `unhandledrejection` e falhas silenciosas.", correcao: "use `try...catch` ou `.catch`." },
    { erro: "Rejeitar com texto (`reject(\"erro\")`) em vez de `Error`.", porque: "Perde a pilha de chamadas e a mensagem padrão.", correcao: "use `new Error(\"mensagem\")`." },
    { erro: "Usar `new Promise` para envolver algo que já devolve Promise.", porque: "Complica sem necessidade.", correcao: "devolva a Promise existente." }
  ],
  praticas: [
    'Prefira `async/await` com `try...catch` à cadeia de `.then`.',
    'Execute em paralelo o que for independente (`Promise.all`).',
    'Use `Promise.allSettled` quando falhas parciais forem aceitáveis.',
    'Sempre rejeite com `Error`, e trate rejeições.',
    'Mostre estados de carregamento e erro na interface.'
  ],
  exercicios: [
    { titulo: "Ordem de saída",
      enunciado: 'Qual a ordem das mensagens? `console.log("A"); setTimeout(() => console.log("B"), 0); Promise.resolve().then(() => console.log("C")); (async () => { console.log("D"); await null; console.log("E"); })(); console.log("F");`',
      dica: 'Síncrono primeiro; depois microtarefas; depois tarefas. O código da função async roda de forma síncrona até o primeiro `await`.',
      resolucao: { lang: "txt", codigo: `A
D
F
C
E
B`,
        comentario: 'Síncrono: A, depois a função async imprime D e pausa no `await`, depois F. Microtarefas, na ordem em que foram agendadas: o `then` de C e a continuação da função async (E). Por último, a tarefa do `setTimeout` (B).' } },
    { titulo: "Carregar em paralelo, com tolerância a falhas",
      enunciado: 'Escreva `carregarTudo(ids)` que, para cada id, chama `buscarItem(id)` (assíncrona, pode falhar), executa **em paralelo** e devolve `{ ok: [...itens], falhas: [...ids] }`, sem que uma falha derrube as demais.',
      dica: '`Promise.allSettled` com `map`.',
      resolucao: { lang: "js", codigo: `
async function carregarTudo(ids) {
  const resultados = await Promise.allSettled(ids.map((id) => buscarItem(id)));

  const ok = [];
  const falhas = [];
  resultados.forEach((resultado, i) => {
    if (resultado.status === "fulfilled") ok.push(resultado.value);
    else falhas.push(ids[i]);
  });

  return { ok, falhas };
}

// Teste com uma função simulada
const buscarItem = async (id) => {
  if (id % 2 === 0) throw new Error("falhou " + id);
  return { id };
};

console.log(await carregarTudo([1, 2, 3, 4]));
// { ok: [{id:1},{id:3}], falhas: [2,4] }`,
        comentario: '`map` dispara todas as buscas ao mesmo tempo. `allSettled` nunca rejeita: devolve o estado de cada uma, na mesma ordem dos ids (por isso `ids[i]` identifica quem falhou). O `forEach` aqui é síncrono e seguro, pois não há `await` dentro dele.' } }
  ],
  referencias: [
    { t: "Usando Promises", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Using_promises", fonte: "MDN Web Docs" },
    { t: "async function", u: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function", fonte: "MDN Web Docs" },
    { t: "Introdução ao JavaScript assíncrono", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Asynchronous", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a4", titulo: "Fetch API e tratamento de erros", minutos: 70,
  topicos: ["Fetch API", "Tratamento de erros"],
  objetivos: [
    "Fazer requisições HTTP com `fetch` (GET e POST com JSON) e ler a resposta.",
    "Entender que `fetch` só rejeita em falhas de rede, e verificar `response.ok`.",
    "Tratar erros com `try...catch`, erros personalizados e mensagens úteis ao usuário.",
    "Cancelar requisições e limitar o tempo com `AbortController`; conhecer CORS e boas práticas de segurança."
  ],
  conceito: [
    { h: "A Fetch API" },
    { p: '`fetch(url, opções)` faz uma requisição HTTP e devolve uma **Promise** que resolve com um objeto `Response`. Em seguida, lê-se o corpo da resposta com outra Promise: `response.json()`, `response.text()` ou `response.blob()`.' },
    { codigo: { lang: "js", x: `const resposta = await fetch("https://api.exemplo.com/produtos");
const dados = await resposta.json();` } },
    { h: "Pegadinha: `fetch` não rejeita em erros HTTP" },
    { p: 'A Promise do `fetch` só é **rejeitada** em **falhas de rede** (sem conexão, DNS, CORS bloqueado). Uma resposta `404` ou `500` **resolve normalmente**! É preciso verificar `resposta.ok` (verdadeiro para status 200-299) ou `resposta.status` e lançar o erro você mesmo.' },
    { h: "Requisições com corpo (POST, PUT...)" },
    { lista: [
      '`method: "POST"` (ou `PUT`, `PATCH`, `DELETE`).',
      '`headers: { "Content-Type": "application/json" }` e `body: JSON.stringify(objeto)` para enviar JSON.',
      '`headers: { Accept: "application/json" }` indica o formato esperado.',
      'Parâmetros de consulta: monte com `new URLSearchParams({ q: "html", pagina: 2 })` e ``` `${url}?${params}` ``` (ele codifica os valores corretamente).'
    ] },
    { h: "Tratamento de erros" },
    { lista: [
      '`try { ... } catch (erro) { ... } finally { ... }`: captura erros lançados (`throw`) e rejeições aguardadas com `await`.',
      '`throw new Error("mensagem")`: lance sempre objetos `Error` (ou subclasses). Eles trazem `name`, `message` e `stack`.',
      '**Erros personalizados**: `class ErroHttp extends Error { constructor(status, mensagem) { super(mensagem); this.name = "ErroHttp"; this.status = status; } }` permitem distinguir tipos de falha com `instanceof`.',
      'Separe **a mensagem técnica** (registrada no console/serviço de monitoramento) da **mensagem para o usuário** (clara e útil: "Não foi possível carregar. Verifique sua conexão e tente novamente.").',
      '**Não engula erros**: um `catch` vazio esconde falhas. Trate, repasse (`throw erro`) ou registre.',
      'Distinga erros **esperados** (campo inválido, 404) de **inesperados** (bugs).'
    ] },
    { h: "Cancelamento e tempo limite" },
    { p: '`AbortController` permite **cancelar** uma requisição: passe `signal` ao `fetch` e chame `controller.abort()`. O `fetch` rejeita com `AbortError`. `AbortSignal.timeout(ms)` cria um sinal que cancela sozinho depois do tempo. Cancelar é importante, por exemplo, em buscas instantâneas, para descartar a requisição anterior antes de iniciar a nova.' },
    { h: "CORS e segurança" },
    { lista: [
      '**CORS**: por segurança, o navegador só deixa uma página ler respostas de **outra origem** se o servidor permitir (cabeçalhos `Access-Control-Allow-*`). Erros de CORS **não** se resolvem no front-end: o servidor precisa autorizar. Um proxy no seu próprio servidor é a solução usual.',
      '**Nunca coloque segredos** (chaves de API privadas, senhas) no código do navegador: qualquer pessoa pode lê-los.',
      '**Dados da API são dados externos**: ao exibir, use `textContent` (nunca `innerHTML` direto) para evitar XSS.',
      'Use **HTTPS**. Valide o formato da resposta antes de usar (um campo pode faltar).',
      'Respeite **limites de uso** (rate limits) das APIs e evite chamadas desnecessárias (cache, *debounce*).'
    ] },
    { nota: { t: "APIs públicas para treinar", x: 'Para praticar, existem APIs públicas de teste, como a JSONPlaceholder (`jsonplaceholder.typicode.com`), que devolve posts, usuários e comentários fictícios (e simula o POST sem gravar nada). Elas podem mudar ou ficar indisponíveis: o código deve estar preparado para falhar com elegância.' } }
  ],
  exemplos: [
    { titulo: "GET com verificação de status", lang: "js", arquivo: "fetch-get.js",
      codigo: `
class ErroHttp extends Error {
  constructor(status, mensagem) {
    super(mensagem);
    this.name = "ErroHttp";
    this.status = status;
  }
}

async function buscarJson(url, { signal } = {}) {
  const resposta = await fetch(url, {
    headers: { Accept: "application/json" },
    signal
  });

  if (!resposta.ok) {                              // 404, 500...: fetch NÃO rejeita sozinho
    throw new ErroHttp(resposta.status, \`Falha HTTP \${resposta.status}\`);
  }
  return resposta.json();
}

async function carregarPosts() {
  const params = new URLSearchParams({ _limit: 3 });
  try {
    const posts = await buscarJson(
      \`https://jsonplaceholder.typicode.com/posts?\${params}\`,
      { signal: AbortSignal.timeout(5000) }        // desiste após 5 s
    );
    for (const { id, title } of posts) console.log(id, title);
  } catch (erro) {
    if (erro instanceof ErroHttp) {
      console.error("O servidor respondeu com erro:", erro.status);
    } else if (erro.name === "TimeoutError" || erro.name === "AbortError") {
      console.error("A requisição demorou demais ou foi cancelada.");
    } else {
      console.error("Falha de rede ou erro inesperado:", erro);
    }
  }
}

carregarPosts();`,
      explicacao: [
        '`resposta.ok` é `true` para 200-299; nos demais casos lançamos um `ErroHttp` com o status.',
        '`URLSearchParams` monta a consulta com codificação correta.',
        '`AbortSignal.timeout(5000)` cancela a requisição depois de 5 segundos (rejeita com `TimeoutError`).',
        'O `catch` distingue **tipos de erro** com `instanceof` e `name`, e mostra a ação adequada a cada um.',
        'O endereço é uma API pública de testes; o exemplo precisa de conexão com a internet.'
      ] },
    { titulo: "POST com JSON", lang: "js", arquivo: "fetch-post.js",
      codigo: `
async function criarPost(dados) {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dados)
  });

  if (!resposta.ok) {
    throw new Error(\`Não foi possível criar (HTTP \${resposta.status})\`);
  }
  return resposta.json();
}

const botao = document.querySelector("#enviar");
const mensagem = document.querySelector("#mensagem");     // <p role="status">

botao?.addEventListener("click", async () => {
  botao.disabled = true;                                  // evita envios duplicados
  mensagem.textContent = "Enviando...";
  try {
    const criado = await criarPost({ title: "Olá", body: "Texto do post", userId: 1 });
    mensagem.textContent = \`Post criado com id \${criado.id}\`;
  } catch (erro) {
    console.error(erro);                                  // detalhe técnico
    mensagem.textContent = "Não foi possível enviar. Tente novamente.";   // mensagem ao usuário
  } finally {
    botao.disabled = false;                               // sempre reabilita
  }
});`,
      explicacao: [
        'Para enviar JSON: `Content-Type` correto e `body` como texto (`JSON.stringify`).',
        'O botão é desabilitado durante o envio, e o `finally` o reabilita em qualquer caso.',
        'O erro técnico vai para o console; ao usuário vai uma mensagem simples e sem jargões.',
        'Um elemento `role="status"` anuncia o andamento a leitores de tela.'
      ] },
    { titulo: "Cancelar buscas antigas e estados da interface", lang: "js", arquivo: "fetch-busca.js",
      codigo: `
const campo = document.querySelector("#busca");
const resultados = document.querySelector("#resultados");
const status = document.querySelector("#status");       // role="status"

let controlador = null;                                  // controla a requisição atual

async function buscar(termo) {
  controlador?.abort();                                  // cancela a requisição anterior
  controlador = new AbortController();

  if (termo.trim() === "") {
    resultados.replaceChildren();
    status.textContent = "";
    return;
  }

  status.textContent = "Buscando...";
  try {
    const params = new URLSearchParams({ q: termo });
    const resposta = await fetch(\`/api/busca?\${params}\`, { signal: controlador.signal });
    if (!resposta.ok) throw new Error(\`HTTP \${resposta.status}\`);

    const itens = await resposta.json();                 // supondo: array de { titulo }
    resultados.replaceChildren(...itens.map(({ titulo }) => {
      const li = document.createElement("li");
      li.textContent = titulo;                           // dado externo: textContent
      return li;
    }));
    status.textContent = \`\${itens.length} resultados\`;
  } catch (erro) {
    if (erro.name === "AbortError") return;              // cancelamento é normal: ignore
    resultados.replaceChildren();
    status.textContent = "Erro ao buscar. Tente novamente.";
    console.error(erro);
  }
}

// debounce simples
let temporizador;
campo.addEventListener("input", () => {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => buscar(campo.value), 300);
});`,
      explicacao: [
        'Cada nova busca **cancela a anterior**, e evita que uma resposta lenta e antiga apareça depois da mais recente.',
        '`AbortError` é esperado nesse fluxo e deve ser ignorado, e não mostrado como erro.',
        'O debounce reduz a quantidade de requisições.',
        'Os dados da API entram na página com `textContent`.',
        '`/api/busca` é um endereço ilustrativo: troque pelo da sua API.'
      ] }
  ],
  erros: [
    { erro: "Achar que `fetch` rejeita em respostas 404 ou 500.", porque: "Ele só rejeita em falhas de rede.", correcao: "verifique `resposta.ok` e lance um erro." },
    { erro: "Esquecer `await resposta.json()` (ou ler o corpo duas vezes).", porque: "O corpo é uma Promise e só pode ser lido uma vez.", correcao: "use `await` e `clone()` se precisar ler de novo." },
    { erro: "Um `catch` vazio (`catch (e) {}`).", porque: "Esconde os problemas.", correcao: "registre, trate ou repasse o erro." },
    { erro: "Enviar JSON sem o cabeçalho `Content-Type`.", porque: "O servidor pode não interpretar o corpo.", correcao: "inclua `\"Content-Type\": \"application/json\"`." },
    { erro: "Colocar chave de API privada no código do navegador.", porque: "Qualquer pessoa pode copiá-la.", correcao: "use um servidor intermediário que guarde o segredo." },
    { erro: "Inserir dados da API com `innerHTML`.", porque: "Permite XSS se o dado contiver HTML.", correcao: "use `textContent`." },
    { erro: "Tentar \"resolver\" erros de CORS no front-end.", porque: "A permissão é do servidor.", correcao: "configure o CORS no servidor ou use um proxy próprio." }
  ],
  praticas: [
    'Sempre verifique `resposta.ok` e trate os erros.',
    'Separe mensagens técnicas das mensagens ao usuário.',
    'Mostre estados: carregando, erro, vazio, dados.',
    'Use `AbortController`/`AbortSignal.timeout` para cancelar e limitar o tempo.',
    'Trate dados externos como não confiáveis: valide e use `textContent`.'
  ],
  exercicios: [
    { titulo: "Função de requisição robusta",
      enunciado: 'Escreva `obterJson(url)` que: faça `fetch` com limite de 5 s; lance um erro com mensagem útil se o status não for 2xx (incluindo o status); e lance outro erro claro se o corpo não for JSON válido.',
      dica: '`AbortSignal.timeout`, `resposta.ok`, `try/catch` em volta de `resposta.json()`.',
      resolucao: { lang: "js", codigo: `
async function obterJson(url) {
  let resposta;
  try {
    resposta = await fetch(url, { signal: AbortSignal.timeout(5000) });
  } catch (erro) {
    if (erro.name === "TimeoutError") throw new Error("A requisição demorou demais (5 s).");
    throw new Error("Falha de rede: verifique sua conexão.");
  }

  if (!resposta.ok) {
    throw new Error(\`O servidor respondeu com erro HTTP \${resposta.status}.\`);
  }

  try {
    return await resposta.json();
  } catch {
    throw new Error("A resposta não é um JSON válido.");
  }
}

// Uso
try {
  const dados = await obterJson("https://jsonplaceholder.typicode.com/users/1");
  console.log(dados.name);
} catch (erro) {
  console.error(erro.message);
}`,
        comentario: 'Cada tipo de falha vira uma mensagem específica: tempo, rede, status HTTP e corpo inválido. O `return await` dentro de `try` é necessário para que o `catch` capture a rejeição de `json()`. `catch {` sem parâmetro é permitido quando o erro original não é usado (aqui ele é substituído por uma mensagem mais clara; para depuração, considere guardá-lo com a opção `cause`).' } },
    { titulo: "Quem está errado?",
      enunciado: 'Este código mostra "Usuário carregado!" mesmo quando a API devolve 500. Explique o motivo e corrija: `try { const r = await fetch("/api/usuario"); const u = await r.json(); mostrar(u); alert("Usuário carregado!"); } catch (e) { alert("Erro"); }`',
      dica: '`fetch` só rejeita em falha de rede.',
      resolucao: { lang: "js", codigo: `
try {
  const r = await fetch("/api/usuario");
  if (!r.ok) throw new Error(\`HTTP \${r.status}\`);   // <- faltava
  const u = await r.json();
  mostrar(u);
  alert("Usuário carregado!");
} catch (e) {
  console.error(e);
  alert("Não foi possível carregar o usuário.");
}`,
        comentario: 'Com status 500, `fetch` **resolve** normalmente; o `r.json()` pode até funcionar (se o servidor devolver um JSON de erro) e o código segue como se estivesse tudo certo. A verificação de `r.ok` converte o erro HTTP em uma exceção que o `catch` trata. Melhor ainda: substituir os `alert` por mensagens na própria página.' } }
  ],
  referencias: [
    { t: "Usando a Fetch API", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch", fonte: "MDN Web Docs" },
    { t: "AbortController", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/AbortController", fonte: "MDN Web Docs" },
    { t: "Controle de acesso HTTP (CORS)", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/CORS", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a5", titulo: "Armazenamento local", minutos: 55,
  topicos: ["Armazenamento local"],
  objetivos: [
    "Usar `localStorage` e `sessionStorage` para guardar dados no navegador.",
    "Serializar e ler dados com JSON de forma segura (`try...catch`, validação, versionamento).",
    "Conhecer limites, riscos de segurança e privacidade do armazenamento no cliente.",
    "Persistir o estado de uma aplicação e restaurá-lo ao recarregar a página."
  ],
  conceito: [
    { h: "Web Storage" },
    { p: 'O navegador oferece dois armazenamentos simples de pares **chave → texto**, separados por **origem** (protocolo + domínio + porta):' },
    { lista: [
      '**`localStorage`**: persiste **indefinidamente** (até ser limpo), e é compartilhado entre abas da mesma origem.',
      '**`sessionStorage`**: dura **só enquanto a aba** estiver aberta.'
    ] },
    { p: 'API (idêntica nos dois): `setItem(chave, valor)`, `getItem(chave)` (devolve `null` se não existir), `removeItem(chave)`, `clear()`, `key(i)` e `length`. **Só guardam texto**: números e objetos viram texto, e é preciso converter com `JSON.stringify` e `JSON.parse`.' },
    { h: "Boas práticas" },
    { lista: [
      '**Namespace nas chaves**: `"minhaapp:tarefas"`, para evitar colisões com outros scripts.',
      '**`try...catch` ao ler JSON**: o conteúdo pode estar corrompido, vazio ou ter sido alterado pelo usuário.',
      '**Valide o formato** do que foi lido antes de usar (um array? os campos esperados?), e tenha um valor padrão.',
      '**Versione os dados** (`{ versao: 1, ... }`) para poder migrar quando o formato mudar.',
      '**Capture erros ao gravar**: o armazenamento tem limite (cerca de 5 MB por origem) e pode estar indisponível (modo privado, bloqueio de cookies): `setItem` pode lançar `QuotaExceededError`.',
      'Operações são **síncronas**: grave dados pequenos, e não grave a cada tecla (use *debounce*).'
    ] },
    { h: "Segurança e privacidade" },
    { lista: [
      '**Nunca guarde** senhas, tokens de sessão sensíveis, dados de cartão, documentos ou dados pessoais delicados: qualquer script da página (inclusive um injetado por XSS ou uma biblioteca de terceiros) **pode lê-los**, e o usuário pode vê-los e alterá-los no navegador.',
      '**Não confie** no que foi lido: trate como entrada do usuário (valide, e use `textContent` ao exibir).',
      'Dados no navegador **não são backup**: o usuário pode limpá-los a qualquer momento, e eles não acompanham outros dispositivos.',
      'Informe o usuário se guardar dados dele e respeite a legislação de privacidade aplicável (como a LGPD): guarde o mínimo necessário.',
      '**Nunca baseie decisões de segurança ou verificação** (permissões, certificados, pagamentos) em dados do `localStorage`: ele é totalmente manipulável pelo usuário.'
    ] },
    { h: "Alternativas" },
    { lista: [
      '**Cookies**: enviados ao servidor em cada requisição; com `HttpOnly`/`Secure`/`SameSite` são o mecanismo apropriado para sessões.',
      '**IndexedDB**: banco de dados assíncrono no navegador, para volumes maiores e dados estruturados.',
      '**Servidor/banco de dados**: o lugar certo para dados que precisam ser confiáveis, sincronizados e seguros.'
    ] },
    { nota: { t: "Evento `storage`", x: 'Quando outra aba da mesma origem altera o `localStorage`, esta aba recebe o evento `storage` (`window.addEventListener("storage", ...)`): útil para sincronizar abas abertas (por exemplo, tema ou carrinho).' } }
  ],
  exemplos: [
    { titulo: "Guardando e lendo valores", lang: "js", arquivo: "storage-basico.js",
      codigo: `
// Só texto: números e objetos precisam de conversão
localStorage.setItem("minhaapp:tema", "escuro");
localStorage.setItem("minhaapp:visitas", String(5));

console.log(localStorage.getItem("minhaapp:tema"));      // "escuro"
console.log(localStorage.getItem("minhaapp:inexistente")); // null
console.log(Number(localStorage.getItem("minhaapp:visitas")) + 1);   // 6

// Objetos: JSON
const preferencias = { tema: "escuro", fonte: 18, idioma: "pt-BR" };
localStorage.setItem("minhaapp:prefs", JSON.stringify(preferencias));

const lido = JSON.parse(localStorage.getItem("minhaapp:prefs"));
console.log(lido.fonte);                                 // 18

// Cuidado: JSON.parse(null) devolve null; texto inválido lança erro
console.log(JSON.parse("null"));                         // null

localStorage.removeItem("minhaapp:visitas");
console.log(localStorage.length);

// Prefixo: remover só as chaves do app
for (const chave of Object.keys(localStorage)) {
  if (chave.startsWith("minhaapp:")) localStorage.removeItem(chave);
}`,
      explicacao: [
        '`getItem` devolve `null` quando a chave não existe: sempre trate esse caso.',
        'Valores são sempre **texto**; por isso a conversão com `Number` e `JSON`.',
        'O prefixo `minhaapp:` evita colisões e permite limpar só os dados do seu app.',
        'Este código precisa de um navegador (usa `localStorage`).'
      ] },
    { titulo: "Funções seguras para guardar e ler JSON", lang: "js", arquivo: "storage-seguro.js",
      codigo: `
const PREFIXO = "tarefas-app:";

function salvar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
    return true;
  } catch (erro) {
    // Cota excedida, modo privado ou armazenamento bloqueado
    console.warn("Não foi possível salvar:", erro.name);
    return false;
  }
}

function carregar(chave, padrao, valido = () => true) {
  try {
    const texto = localStorage.getItem(PREFIXO + chave);
    if (texto === null) return padrao;
    const valor = JSON.parse(texto);
    return valido(valor) ? valor : padrao;      // descarta dados em formato inesperado
  } catch {
    return padrao;                              // JSON corrompido ou storage indisponível
  }
}

// Uso com validação do formato e versionamento
const VERSAO = 1;
const ehEstadoValido = (v) =>
  v && v.versao === VERSAO && Array.isArray(v.tarefas) &&
  v.tarefas.every((t) => typeof t.id === "number" && typeof t.texto === "string");

const estado = carregar("estado", { versao: VERSAO, tarefas: [] }, ehEstadoValido);
console.log(estado.tarefas.length);

estado.tarefas.push({ id: Date.now(), texto: "Estudar", feita: false });
salvar("estado", estado);`,
      explicacao: [
        '`salvar` e `carregar` isolam o `try...catch`, e o resto do código não precisa se preocupar com falhas.',
        '`carregar` devolve um valor padrão para: chave ausente, JSON inválido, formato inesperado.',
        'O `versao` permite, no futuro, **migrar** dados antigos para um novo formato.',
        'A validação confirma o que foi lido: o conteúdo do `localStorage` não é confiável.'
      ] },
    { titulo: "Persistindo o estado de uma aplicação", lang: "js", arquivo: "persistencia.js",
      codigo: `
// Continuação da lista de tarefas (aula 3.4): salvar a cada mudança e restaurar ao abrir.

const CHAVE = "tarefas-app:estado";

function carregarEstado() {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE));
    if (bruto && Array.isArray(bruto.tarefas)) {
      return {
        proximoId: Number(bruto.proximoId) || 1,
        tarefas: bruto.tarefas.filter(
          (t) => typeof t.id === "number" && typeof t.texto === "string"
        )
      };
    }
  } catch { /* usa o padrão abaixo */ }
  return { proximoId: 1, tarefas: [] };
}

const estado = carregarEstado();

function persistir() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch (erro) {
    console.warn("Dados não foram salvos:", erro.name);
  }
}

// Chame persistir() depois de cada alteração do estado:
//   estado.tarefas.push(...);  renderizar();  persistir();

// Sincronizar com outras abas abertas
window.addEventListener("storage", (evento) => {
  if (evento.key === CHAVE) {
    const novo = carregarEstado();
    estado.tarefas = novo.tarefas;
    estado.proximoId = novo.proximoId;
    renderizar();
  }
});

// Botão para apagar os dados do app (controle do usuário)
document.querySelector("#limpar")?.addEventListener("click", () => {
  if (confirm("Apagar todas as tarefas salvas neste navegador?")) {
    localStorage.removeItem(CHAVE);
    estado.tarefas = [];
    estado.proximoId = 1;
    renderizar();
  }
});`,
      explicacao: [
        'Ao abrir a página, `carregarEstado` restaura os dados e sanitiza o formato.',
        'Depois de cada mudança, `persistir()` grava o estado inteiro (é pequeno).',
        'O evento `storage` mantém várias abas sincronizadas: ele dispara nas **outras** abas, e não na que gravou.',
        'Oferecer ao usuário uma forma de **apagar** seus dados é uma boa prática de privacidade.',
        '`renderizar` é a função da aula 3.4.'
      ] }
  ],
  erros: [
    { erro: "Guardar senhas, tokens sensíveis ou dados pessoais delicados no `localStorage`.", porque: "Qualquer script da página pode lê-los; o usuário também pode alterá-los.", correcao: "não guarde; use cookies `HttpOnly` e o servidor." },
    { erro: "Usar `JSON.parse` sem `try...catch`.", porque: "Dados corrompidos derrubam a aplicação inteira.", correcao: "envolva em `try...catch` e valide o formato." },
    { erro: "Gravar objetos sem `JSON.stringify` (`setItem(\"x\", obj)`).", porque: "Vira `\"[object Object]\"`.", correcao: "serialize com `JSON.stringify`." },
    { erro: "Confiar em dados do `localStorage` para decisões de segurança (permissões, certificados, preços).", porque: "O usuário pode editar o conteúdo livremente no navegador.", correcao: "decisões confiáveis devem ser tomadas e guardadas no servidor." },
    { erro: "Não tratar `getItem` devolvendo `null`.", porque: "Quebra na primeira visita.", correcao: "defina um valor padrão." },
    { erro: "Gravar a cada tecla digitada.", porque: "Operações síncronas repetidas podem travar a interface.", correcao: "grave ao concluir uma ação ou use debounce." },
    { erro: "Ignorar falhas de gravação.", porque: "Em modo privado ou com cota cheia, `setItem` lança erro.", correcao: "capture a exceção e informe ou degrade com elegância." }
  ],
  praticas: [
    'Use um prefixo (namespace) nas chaves.',
    'Encapsule leitura e escrita em funções com `try...catch` e validação.',
    'Versione o formato dos dados.',
    'Guarde o mínimo necessário e nada sensível.',
    'Trate o conteúdo lido como entrada não confiável.',
    'Dê ao usuário um jeito de apagar os dados salvos.'
  ],
  exercicios: [
    { titulo: "Tema que persiste",
      enunciado: 'Um botão `#tema` alterna a classe `escuro` no `<body>`. Faça o tema escolhido persistir entre visitas (`localStorage`), e, na primeira visita (sem escolha salva), respeite a preferência do sistema (`prefers-color-scheme`).',
      dica: '`matchMedia("(prefers-color-scheme: dark)").matches`.',
      resolucao: { lang: "js", codigo: `
const CHAVE = "minhaapp:tema";
const botao = document.querySelector("#tema");

function temaSalvo() {
  try {
    return localStorage.getItem(CHAVE);          // "escuro", "claro" ou null
  } catch {
    return null;                                 // storage indisponível
  }
}

function aplicar(tema) {
  document.body.classList.toggle("escuro", tema === "escuro");
  botao.setAttribute("aria-pressed", String(tema === "escuro"));
}

const inicial =
  temaSalvo() ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");
aplicar(inicial);

botao.addEventListener("click", () => {
  const novo = document.body.classList.contains("escuro") ? "claro" : "escuro";
  aplicar(novo);
  try { localStorage.setItem(CHAVE, novo); } catch { /* sem persistência */ }
});`,
        comentario: 'Na primeira visita, `temaSalvo()` devolve `null`, e `??` usa a preferência do sistema. Depois do primeiro clique, a escolha explícita do usuário prevalece. Os dois acessos ao `localStorage` estão protegidos com `try...catch`, e o botão reflete o estado em `aria-pressed`.' } },
    { titulo: "O que não guardar",
      enunciado: 'Classifique cada item como "pode ir para o localStorage" ou "não deve": (a) tema e tamanho de fonte; (b) rascunho de um comentário; (c) token de sessão de login; (d) senha digitada; (e) lista de cursos favoritos; (f) "certificado emitido: sim".',
      dica: 'Sensibilidade e manipulação pelo usuário.',
      resolucao: { lang: "txt", codigo: `(a) pode            - preferência sem risco
(b) pode (com cuidado) - não sensível; avisar o usuário se for compartilhado
(c) NÃO deve        - qualquer script pode ler; use cookie HttpOnly/servidor
(d) NÃO deve        - nunca guarde senhas
(e) pode            - preferência sem risco
(f) NÃO deve        - o usuário pode editar; um certificado só vale se for
                      emitido e verificado no servidor`,
        comentario: 'O critério é a **confiança**: dados no navegador são do usuário, e podem ser lidos por scripts e alterados por ele. Servem para conveniência (preferências, rascunhos), e nunca para segurança ou para comprovar fatos (aprovação, pagamento, certificação).' } }
  ],
  referencias: [
    { t: "Web Storage API", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API", fonte: "MDN Web Docs" },
    { t: "Usando a Web Storage API", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API", fonte: "MDN Web Docs" },
    { t: "Lei Geral de Proteção de Dados (LGPD)", u: "https://www.gov.br/anpd/pt-br", fonte: "ANPD (gov.br)" }
  ]
}

] });
