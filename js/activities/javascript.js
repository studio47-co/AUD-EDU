/* Atividades do curso JavaScript — módulos 1–3 com 6 questões cada, módulo 4 com 7 (25 no total).
   Tipos: multipla · vf (0=Verdadeiro, 1=Falso) · codigo · erro · pratico */
AE.Atividades.registrar("javascript", [

/* ===================== MÓDULO 1 — Fundamentos ===================== */
{ id: "javascript-1-01", modulo: 1, tipo: "multipla", competencia: "Identificar tipos de dados",
  enunciado: "Qual é o resultado de `typeof null`?",
  alternativas: ["`\"object\"`", "`\"null\"`", "`\"undefined\"`", "`\"number\"`"],
  correta: 0,
  explicacao: "É um comportamento histórico da linguagem: `typeof null` devolve `\"object\"`, embora `null` seja um valor primitivo. Para testar `null`, compare com `=== null`." },
{ id: "javascript-1-02", modulo: 1, tipo: "vf", competencia: "Distinguir const e imutabilidade",
  enunciado: "Com `const lista = [];`, a instrução `lista.push(1)` funciona, mas `lista = [1]` gera erro.",
  correta: 0,
  explicacao: "Verdadeiro. `const` impede **reatribuir** a variável, mas não impede alterar o conteúdo de um objeto ou array a que ela se refere." },
{ id: "javascript-1-03", modulo: 1, tipo: "codigo", competencia: "Prever conversões de tipo",
  enunciado: "O que o código imprime?",
  codigo: { lang: "js", x: `console.log("5" + 3, "5" - 3);` },
  alternativas: ["`53 2`", "`8 2`", "`53 53`", "`8 8`"],
  correta: 0,
  explicacao: "O operador `+` com um texto faz **concatenação** (`\"53\"`). O operador `-` só existe para números, então converte `\"5\"` em número (`5 - 3 = 2`)." },
{ id: "javascript-1-04", modulo: 1, tipo: "erro", competencia: "Identificar erros em condicionais",
  enunciado: "O programa sempre mostra \"Maior de idade\", mesmo com `idade = 12`. Qual é o problema?",
  codigo: { lang: "js", x: `let idade = 12;
if (idade = 18) {
  console.log("Maior de idade");
} else {
  console.log("Menor de idade");
}` },
  alternativas: ["Usa-se `=` (atribuição) em vez de `>=` ou `===` (comparação)", "`if` não aceita variáveis `let`", "Falta ponto e vírgula depois do `if`", "`else` deve vir antes do `if`"],
  correta: 0,
  explicacao: "`idade = 18` **atribui** 18 e a expressão vale 18, que é verdadeiro. O correto é comparar: `idade >= 18`." },
{ id: "javascript-1-05", modulo: 1, tipo: "multipla", competencia: "Comparar valores com igualdade estrita e frouxa",
  enunciado: "Qual das expressões abaixo resulta em `true`?",
  alternativas: ["`null == undefined`", "`NaN === NaN`", "`\"5\" === 5`", "`[] === []`"],
  correta: 0,
  explicacao: "`null == undefined` é `true` (caso especial da igualdade frouxa). `NaN` nunca é igual a si mesmo (use `Number.isNaN`), `\"5\" === 5` compara tipos diferentes e dois arrays são objetos distintos, comparados por referência." },
{ id: "javascript-1-06", modulo: 1, tipo: "pratico", competencia: "Combinar variáveis, laços e condicionais",
  enunciado: "Escreva um programa que percorra os números de 1 a 30 e imprima: `Fizz` para múltiplos de 3, `Buzz` para múltiplos de 5, `FizzBuzz` para múltiplos de ambos e o próprio número nos demais casos.",
  criterios: ["Usa um laço (`for`) de 1 a 30 inclusive", "Testa primeiro o caso múltiplo de 3 e de 5", "Usa `%` para testar divisibilidade", "Usa `const`/`let` e comparação estrita", "A saída tem 30 linhas e confere com o enunciado"],
  resolucao: { lang: "js", codigo: `for (let n = 1; n <= 30; n++) {
  if (n % 15 === 0) {
    console.log("FizzBuzz");     // múltiplo de 3 E de 5: precisa vir primeiro
  } else if (n % 3 === 0) {
    console.log("Fizz");
  } else if (n % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(n);
  }
}`,
    comentario: "O caso mais específico (múltiplo de 15, ou seja, de 3 e de 5) deve ser testado antes dos outros; do contrário, a condição de 3 capturaria o 15. O laço usa `<=` para incluir o 30." } },

/* ===================== MÓDULO 2 — Funções, arrays e objetos ===================== */
{ id: "javascript-2-01", modulo: 2, tipo: "multipla", competencia: "Escolher métodos de array",
  enunciado: "Qual dos métodos abaixo **não** altera o array original e devolve um novo array com os elementos transformados?",
  alternativas: ["`map`", "`push`", "`splice`", "`reverse`"],
  correta: 0,
  explicacao: "`map` devolve um array novo. `push`, `splice` e `reverse` alteram o array original (mutam)." },
{ id: "javascript-2-02", modulo: 2, tipo: "vf", competencia: "Entender referências",
  enunciado: "Depois de `const copia = original;` (sendo `original` um array), alterar `copia` não afeta `original`.",
  correta: 1,
  explicacao: "Falso. Arrays são objetos, e a atribuição copia a **referência**: as duas variáveis apontam para o mesmo array. Para copiar, use `[...original]` ou `original.slice()`." },
{ id: "javascript-2-03", modulo: 2, tipo: "codigo", competencia: "Encadear filter e map",
  enunciado: "O que o código imprime?",
  codigo: { lang: "js", x: `const nums = [1, 2, 3, 4];
const r = nums.filter((n) => n % 2 === 0).map((n) => n * 10);
console.log(r);` },
  alternativas: ["`[20, 40]`", "`[10, 20, 30, 40]`", "`[2, 4]`", "`[10, 30]`"],
  correta: 0,
  explicacao: "`filter` mantém os pares (`[2, 4]`) e `map` multiplica cada um por 10, resultando em `[20, 40]`." },
{ id: "javascript-2-04", modulo: 2, tipo: "erro", competencia: "Compreender escopo e closures em laços",
  enunciado: "O código deveria imprimir 0, 1 e 2, mas imprime `3 3 3`. Qual é a causa?",
  codigo: { lang: "js", x: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}` },
  alternativas: ["`var` tem escopo de função: existe uma só `i`, que vale 3 quando os callbacks rodam", "`setTimeout` não aceita arrow functions", "O laço executa uma vez a mais", "`console.log` altera o valor de `i`"],
  correta: 0,
  explicacao: "Com `var` há uma única variável compartilhada; ao final do laço ela vale 3 e só então os callbacks executam. Com `let`, cada iteração cria uma variável própria, e a saída é `0 1 2`." },
{ id: "javascript-2-05", modulo: 2, tipo: "multipla", competencia: "Usar reduce corretamente",
  enunciado: "O que acontece ao executar `[].reduce((a, b) => a + b)` (array vazio e sem valor inicial)?",
  alternativas: ["Lança um `TypeError`", "Devolve `0`", "Devolve `undefined`", "Devolve `NaN`"],
  correta: 0,
  explicacao: "Sem valor inicial e sem elementos, `reduce` lança `TypeError: Reduce of empty array with no initial value`. Informe sempre o valor inicial: `[].reduce((a, b) => a + b, 0)` devolve `0`." },
{ id: "javascript-2-06", modulo: 2, tipo: "pratico", competencia: "Manipular dados com métodos de array",
  enunciado: "Dado o array `pedidos = [{ categoria: \"livros\", valor: 50 }, { categoria: \"jogos\", valor: 120 }, { categoria: \"livros\", valor: 30 }]`, escreva uma função `totalPorCategoria(pedidos)` que devolva um objeto com a soma dos valores por categoria, sem alterar o array de entrada.",
  criterios: ["Usa `reduce` (ou laço) com acumulador inicial `{}`", "Soma corretamente, tratando a categoria que ainda não existe", "Não altera o array nem os objetos de entrada", "Devolve `{ livros: 80, jogos: 120 }` para o exemplo", "Funciona com array vazio (devolve `{}`)"],
  resolucao: { lang: "js", codigo: `function totalPorCategoria(pedidos) {
  return pedidos.reduce((totais, { categoria, valor }) => {
    totais[categoria] = (totais[categoria] ?? 0) + valor;
    return totais;
  }, {});
}

const pedidos = [
  { categoria: "livros", valor: 50 },
  { categoria: "jogos", valor: 120 },
  { categoria: "livros", valor: 30 }
];

console.log(totalPorCategoria(pedidos)); // { livros: 80, jogos: 120 }
console.log(totalPorCategoria([]));      // {}`,
    comentario: "O acumulador começa como `{}` (um objeto novo, criado pela própria chamada, e por isso não altera os dados de entrada). `?? 0` cobre a primeira ocorrência de cada categoria. A desestruturação no parâmetro (`{ categoria, valor }`) deixa o código mais legível." } },

/* ===================== MÓDULO 3 — JavaScript no navegador ===================== */
{ id: "javascript-3-01", modulo: 3, tipo: "multipla", competencia: "Atualizar o DOM com segurança",
  enunciado: "Um comentário digitado por um usuário será exibido na página. Qual abordagem evita a injeção de HTML malicioso (XSS)?",
  alternativas: ["Atribuir o texto a `elemento.textContent`", "Atribuir o texto a `elemento.innerHTML`", "Usar `document.write` com o texto", "Montar a string de HTML e usar `insertAdjacentHTML`"],
  correta: 0,
  explicacao: "`textContent` trata o conteúdo como **texto puro**, sem interpretar tags. As demais opções interpretam o texto como HTML, e permitem executar marcações indesejadas." },
{ id: "javascript-3-02", modulo: 3, tipo: "vf", competencia: "Aplicar delegação de eventos",
  enunciado: "Com a delegação de eventos, um único ouvinte no elemento pai pode tratar cliques de itens adicionados à lista depois que a página carregou.",
  correta: 0,
  explicacao: "Verdadeiro. O evento \"borbulha\" até o pai, e `event.target` (ou `closest`) identifica de onde veio o clique, inclusive em itens criados depois." },
{ id: "javascript-3-03", modulo: 3, tipo: "codigo", competencia: "Prever o comportamento de eventos",
  enunciado: "Dado o código abaixo, o que acontece quando o usuário clica no **texto** do item (e não no botão)?",
  codigo: { lang: "js", x: `// <ul id="lista"><li><span>Estudar</span> <button data-remover>x</button></li></ul>
lista.addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-remover]");
  if (!botao) return;
  botao.closest("li").remove();
});` },
  alternativas: ["Nada: `closest` devolve `null` e a função termina", "O item é removido", "Ocorre um `TypeError`", "O ouvinte é desativado"],
  correta: 0,
  explicacao: "O alvo do clique é o `span`; `closest(\"button[data-remover]\")` sobe a árvore, não encontra o botão e devolve `null`. O `if (!botao) return;` encerra sem fazer nada." },
{ id: "javascript-3-04", modulo: 3, tipo: "erro", competencia: "Controlar o envio de formulários",
  enunciado: "Ao enviar o formulário, as mensagens de erro aparecem por um instante e a página recarrega. O que está faltando?",
  codigo: { lang: "js", x: `form.addEventListener("submit", () => {
  if (!campo.value.trim()) {
    erro.textContent = "Preencha o campo.";
  }
});` },
  alternativas: ["Receber o evento e chamar `evento.preventDefault()` quando houver erro", "Trocar `submit` por `click`", "Usar `innerHTML` no lugar de `textContent`", "Remover o `trim()`"],
  correta: 0,
  explicacao: "Sem `preventDefault()`, o navegador conclui o envio padrão e recarrega a página. Chame-o quando a validação falhar (ou sempre, se o envio for feito por JavaScript)." },
{ id: "javascript-3-05", modulo: 3, tipo: "multipla", competencia: "Validar formulários com acessibilidade",
  enunciado: "Qual prática torna a mensagem de erro de um campo acessível a quem usa leitor de tela?",
  alternativas: ["Associar a mensagem ao campo com `aria-describedby`, marcar `aria-invalid` e mover o foco ao primeiro erro", "Mostrar o erro apenas com borda vermelha", "Exibir o erro num `alert` a cada tecla", "Colocar a mensagem em `display: none`"],
  correta: 0,
  explicacao: "A associação programática (`aria-describedby`, `aria-invalid`) e o foco no primeiro erro fazem a tecnologia assistiva anunciar o problema. Depender só de cor exclui parte dos usuários." },
{ id: "javascript-3-06", modulo: 3, tipo: "pratico", competencia: "Construir uma interface dinâmica e acessível",
  enunciado: "Crie uma lista de tarefas: um campo e um botão \"Adicionar\"; cada tarefa tem uma caixa de seleção para marcar como feita e um botão para remover. Mostre uma mensagem quando a lista estiver vazia e anuncie as ações numa região `role=\"status\"`.",
  criterios: ["Usa `createElement`/`textContent` (sem `innerHTML` com dados do usuário)", "Impede adicionar tarefas vazias, com mensagem de erro", "Usa delegação de eventos na lista", "Mantém o estado em um array/objeto e renderiza a partir dele", "Mensagem de lista vazia e `role=\"status\"` para anunciar as ações", "Devolve o foco a um elemento lógico depois de remover"],
  resolucao: { lang: "js", codigo: `const form = document.querySelector("#form");
const campo = document.querySelector("#nova");
const lista = document.querySelector("#lista");
const status = document.querySelector("#status");   // <p role="status">
const vazio = document.querySelector("#vazio");     // <p>Nenhuma tarefa ainda.</p>

let proximoId = 1;
let tarefas = [];

function renderizar() {
  lista.replaceChildren(...tarefas.map((t) => {
    const li = document.createElement("li");

    const caixa = document.createElement("input");
    caixa.type = "checkbox";
    caixa.checked = t.feita;
    caixa.dataset.id = t.id;
    caixa.id = "t-" + t.id;

    const rotulo = document.createElement("label");
    rotulo.htmlFor = caixa.id;
    rotulo.textContent = t.texto;                     // dado do usuário: textContent

    const remover = document.createElement("button");
    remover.type = "button";
    remover.dataset.remover = t.id;
    remover.textContent = "Remover";

    li.append(caixa, rotulo, remover);
    return li;
  }));
  vazio.hidden = tarefas.length > 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = campo.value.trim();
  if (!texto) {
    status.textContent = "Escreva uma tarefa antes de adicionar.";
    campo.focus();
    return;
  }
  tarefas.push({ id: proximoId++, texto, feita: false });
  campo.value = "";
  renderizar();
  status.textContent = "Tarefa adicionada: " + texto;
  campo.focus();
});

lista.addEventListener("change", (e) => {
  const caixa = e.target.closest("input[type=checkbox]");
  if (!caixa) return;
  const t = tarefas.find((x) => x.id === Number(caixa.dataset.id));
  t.feita = caixa.checked;
  status.textContent = t.feita ? "Concluída: " + t.texto : "Reaberta: " + t.texto;
});

lista.addEventListener("click", (e) => {
  const botao = e.target.closest("button[data-remover]");
  if (!botao) return;
  const id = Number(botao.dataset.remover);
  const t = tarefas.find((x) => x.id === id);
  tarefas = tarefas.filter((x) => x.id !== id);
  renderizar();
  status.textContent = "Removida: " + t.texto;
  campo.focus();                                      // foco volta a um lugar previsível
});

renderizar();`,
    comentario: "O estado fica em `tarefas`, e `renderizar` redesenha a lista a partir dele. Os textos entram com `textContent`, o que impede injeção de HTML. Dois ouvintes delegados na lista tratam as caixas (`change`) e os botões (`click`), inclusive nos itens criados depois. A região `role=\"status\"` anuncia as ações e o foco é devolvido ao campo depois de remover, para que o usuário de teclado não perca a posição." } },

/* ===================== MÓDULO 4 — JavaScript moderno ===================== */
{ id: "javascript-4-01", modulo: 4, tipo: "multipla", competencia: "Usar módulos no navegador",
  enunciado: "Qual conjunto de condições é necessário para usar `import` e `export` numa página web?",
  alternativas: ["`<script type=\"module\">`, caminhos relativos com extensão e página servida por HTTP(S)", "Apenas `<script defer>` e abrir o arquivo pelo disco (`file://`)", "Instalar obrigatoriamente o Node.js no navegador do usuário", "Declarar as funções como `global`"],
  correta: 0,
  explicacao: "Módulos exigem `type=\"module\"`, importações com caminho relativo e extensão (`\"./util.js\"`) e um servidor HTTP(S): abrir por `file://` costuma ser bloqueado por regras de segurança (CORS)." },
{ id: "javascript-4-02", modulo: 4, tipo: "codigo", competencia: "Usar desestruturação com valores padrão",
  enunciado: "O que o código imprime?",
  codigo: { lang: "js", x: `const { x = 10, y = 20 } = { x: undefined, y: null };
console.log(x, y);` },
  alternativas: ["`10 null`", "`10 20`", "`undefined null`", "`undefined 20`"],
  correta: 0,
  explicacao: "O valor padrão só vale quando a propriedade é `undefined`. Como `y` é `null`, ele é mantido como `null`." },
{ id: "javascript-4-03", modulo: 4, tipo: "codigo", competencia: "Prever a ordem de execução assíncrona",
  enunciado: "Em que ordem os números são impressos?",
  codigo: { lang: "js", x: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);` },
  alternativas: ["`1 4 3 2`", "`1 2 3 4`", "`1 4 2 3`", "`1 3 4 2`"],
  correta: 0,
  explicacao: "Primeiro todo o código síncrono (1 e 4). Depois as microtarefas (callbacks de Promises: 3) e só então a tarefa agendada por `setTimeout` (2)." },
{ id: "javascript-4-04", modulo: 4, tipo: "vf", competencia: "Tratar respostas HTTP com fetch",
  enunciado: "A Promise devolvida por `fetch` é rejeitada quando o servidor responde com status 404 ou 500.",
  correta: 1,
  explicacao: "Falso. `fetch` só rejeita em falhas de rede (ou cancelamento). Respostas 404/500 resolvem normalmente: é preciso verificar `resposta.ok` e lançar o erro." },
{ id: "javascript-4-05", modulo: 4, tipo: "erro", competencia: "Usar await corretamente em laços",
  enunciado: "\"Tudo salvo!\" aparece antes de os itens serem salvos. Qual é a causa?",
  codigo: { lang: "js", x: `async function salvarTodos(ids) {
  ids.forEach(async (id) => {
    await salvar(id);
  });
  console.log("Tudo salvo!");
}` },
  alternativas: ["`forEach` ignora as Promises devolvidas pelo callback e não espera por elas", "`salvar` precisa ser declarada com `var`", "`await` só funciona em módulos", "`console.log` é assíncrono"],
  correta: 0,
  explicacao: "`forEach` não aguarda os callbacks assíncronos. Use `for...of` com `await` (sequencial) ou `await Promise.all(ids.map(salvar))` (em paralelo)." },
{ id: "javascript-4-06", modulo: 4, tipo: "multipla", competencia: "Avaliar riscos do armazenamento local",
  enunciado: "Qual destes dados **não** deve ser guardado em `localStorage`?",
  alternativas: ["Um token de sessão de login", "A preferência de tema claro/escuro", "O tamanho de fonte escolhido", "A lista de cursos favoritos"],
  correta: 0,
  explicacao: "Qualquer script da página (inclusive um injetado por XSS) pode ler o `localStorage`. Tokens e senhas não devem ficar lá; preferências sem risco podem." },
{ id: "javascript-4-07", modulo: 4, tipo: "pratico", competencia: "Consumir uma API com tratamento de erros",
  enunciado: "Escreva `obterJson(url)`, que usa `fetch` com limite de tempo de 5 segundos, lança um erro com mensagem clara quando o status não for 2xx e quando a resposta não for JSON válido. Depois, escreva o trecho que chama a função, mostra \"Carregando...\" e trata o erro com uma mensagem para o usuário.",
  criterios: ["Usa `AbortSignal.timeout` (ou `AbortController`)", "Verifica `resposta.ok` e lança `Error` com o status", "Trata JSON inválido separadamente", "Usa `try...catch...finally` na chamada", "Mostra mensagem ao usuário e registra o detalhe técnico no console", "Insere dados na página com `textContent`"],
  resolucao: { lang: "js", codigo: `async function obterJson(url) {
  let resposta;
  try {
    resposta = await fetch(url, { signal: AbortSignal.timeout(5000) });
  } catch (erro) {
    if (erro.name === "TimeoutError") throw new Error("A requisição demorou demais.");
    throw new Error("Falha de rede. Verifique sua conexão.");
  }

  if (!resposta.ok) {
    throw new Error("O servidor respondeu com erro HTTP " + resposta.status + ".");
  }

  try {
    return await resposta.json();
  } catch {
    throw new Error("A resposta não é um JSON válido.");
  }
}

const saida = document.querySelector("#saida");     // <p role="status">

async function carregar() {
  saida.textContent = "Carregando...";
  try {
    const dados = await obterJson("https://jsonplaceholder.typicode.com/users/1");
    saida.textContent = "Olá, " + dados.name;        // textContent: dado externo
  } catch (erro) {
    console.error(erro);                              // detalhe técnico
    saida.textContent = "Não foi possível carregar. Tente novamente.";
  }
}

carregar();`,
    comentario: "Cada tipo de falha (tempo, rede, status HTTP, corpo inválido) vira uma mensagem específica. Na interface, o usuário vê uma mensagem simples, e o detalhe técnico vai para o console. O endereço é uma API pública de testes: o exemplo precisa de conexão com a internet e pode ficar indisponível." } }

]);
