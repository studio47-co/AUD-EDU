/* JavaScript · Módulo 3 — JavaScript no navegador
   Tópicos: DOM · seleção de elementos · eventos · formulários · validação · atualização de interfaces */
AE.Conteudo.modulo("javascript", 3, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m3a1", titulo: "DOM e seleção de elementos", minutos: 60,
  topicos: ["DOM", "Seleção de elementos"],
  objetivos: [
    "Explicar o que é o DOM e como o navegador transforma o HTML em uma árvore de objetos.",
    "Selecionar elementos com `querySelector`, `querySelectorAll` e `getElementById`.",
    "Ler e alterar texto, atributos, classes e estilos de forma segura.",
    "Criar, inserir e remover elementos sem abrir brechas de segurança (XSS)."
  ],
  conceito: [
    { h: "O que é o DOM" },
    { p: 'O **DOM** (*Document Object Model*) é a representação do documento HTML como uma **árvore de objetos** que o JavaScript pode ler e modificar. Cada tag vira um **nó** de elemento; textos e comentários também são nós. O objeto global `document` é a porta de entrada: `document.body`, `document.title`, `document.querySelector(...)`.' },
    { p: 'Alterar o DOM altera o que o usuário vê, **sem recarregar a página**. Importante: o DOM é a versão "viva" do HTML na memória: ela pode diferir do arquivo original depois que scripts a modificam. O painel Elementos das ferramentas de desenvolvimento mostra o DOM atual.' },
    { h: "Selecionando elementos" },
    { lista: [
      '`document.querySelector(seletorCSS)`: devolve o **primeiro** elemento que casa, ou `null`.',
      '`document.querySelectorAll(seletorCSS)`: devolve uma `NodeList` com **todos** (pode estar vazia). É iterável com `for...of` e `forEach`; use `Array.from(...)` ou `[...]` para obter `map`/`filter`.',
      '`document.getElementById("id")`: direto e rápido (sem `#`).',
      'Os seletores são os mesmos do CSS: `".card"`, `"#menu a"`, `"input[type=email]"`, `"li:first-child"`.',
      'A busca também funciona **a partir de um elemento**: `lista.querySelector("li")`.',
      '`elemento.closest(seletor)` sobe a árvore até achar um ancestral; `elemento.matches(seletor)` testa se ele casa.'
    ] },
    { p: '**Sempre confira se o resultado não é `null`** antes de usar: se o elemento não existe (erro de digitação no seletor, script rodando cedo demais), `null.textContent` lança `TypeError`.' },
    { h: "Lendo e alterando conteúdo" },
    { lista: [
      '`textContent`: lê/escreve **texto puro**. É seguro: qualquer `<` vira texto, e não marcação. **Prefira sempre.**',
      '`innerHTML`: lê/escreve HTML. Perigoso quando recebe dados do usuário (permite injetar `<script>` e atributos de evento: ataque **XSS**). Use apenas com HTML que **você** controla, ou escape o conteúdo.',
      '`value` (em `input`, `textarea`, `select`): o valor atual do campo.',
      '`hidden`: propriedade booleana que esconde/mostra o elemento.'
    ] },
    { h: "Atributos, classes e estilos" },
    { lista: [
      '`getAttribute`, `setAttribute`, `removeAttribute`, `hasAttribute`. Para atributos comuns há propriedades (`img.src`, `a.href`).',
      '`dataset`: atributos `data-*`. `<li data-id="7">` lê-se como `li.dataset.id` (sempre texto).',
      '`classList.add/remove/toggle/contains/replace`: o jeito certo de mudar classes.',
      '`elemento.style.propriedade`: define estilo inline pontual. Para mudar a aparência de modo geral, prefira **alternar classes** definidas no CSS.',
      'Atributos ARIA (`aria-expanded`, `aria-hidden`) também se alteram por `setAttribute`, e devem acompanhar mudanças visuais.'
    ] },
    { h: "Criando e removendo elementos" },
    { lista: [
      '`document.createElement("li")` cria o elemento (ainda fora da página).',
      '`pai.append(filho)`, `pai.prepend(filho)`, `elemento.after(novo)`, `elemento.before(novo)`: inserem.',
      '`elemento.remove()`: remove. `pai.replaceChildren(...novos)`: substitui todos os filhos (e sem argumentos, esvazia o pai).',
      '`elemento.cloneNode(true)` copia um elemento com os descendentes; `<template>` guarda um modelo HTML que você clona.',
      'Para inserir **muitos** itens, crie todos e insira de uma vez (por exemplo, com `append(...itens)`), em vez de mexer na página a cada item.'
    ] },
    { nota: { t: "Quando o script roda", x: 'Se o `<script>` executa antes de o HTML ser lido, os elementos ainda não existem. Use `defer` no `<script>` (recomendado) ou o evento `DOMContentLoaded`. Com `defer`, os elementos já estão disponíveis quando o script executa.' } }
  ],
  exemplos: [
    { titulo: "A página de exemplo (HTML)", lang: "html", arquivo: "index.html",
      codigo: `
<h1 id="titulo">Lista de compras</h1>
<ul id="lista">
  <li class="item" data-id="1">Arroz</li>
  <li class="item destaque" data-id="2">Feijão</li>
  <li class="item" data-id="3">Café</li>
</ul>
<script src="app.js" defer></script>`,
      explicacao: [
        'Esta é a página usada nos exemplos seguintes: um título, uma lista e o `<script>` com `defer`.',
        'Os `data-id` serão lidos pelo JavaScript via `dataset`.'
      ] },
    { titulo: "Selecionando e lendo elementos", lang: "js", arquivo: "app.js",
      codigo: `
const titulo = document.getElementById("titulo");
const lista = document.querySelector("#lista");
const itens = document.querySelectorAll(".item");          // NodeList com 3

console.log(titulo.textContent);                           // Lista de compras
console.log(itens.length);                                 // 3
console.log(lista.querySelector(".destaque").textContent);// Feijão
console.log(itens[2].dataset.id);                          // "3" (sempre texto)

// Percorrendo
for (const item of itens) {
  console.log(item.textContent);
}

// Convertendo para array para usar map/filter
const nomes = [...itens].map((li) => li.textContent);
console.log(nomes);                                        // ["Arroz","Feijão","Café"]

// Elemento que não existe
const inexistente = document.querySelector(".nao-existe");
console.log(inexistente);                                  // null
// inexistente.textContent;                                // TypeError!`,
      explicacao: [
        '`querySelectorAll` devolve uma lista que não é um array: o spread `[...itens]` permite usar `map`.',
        '`dataset.id` devolve **texto** (`"3"`), e não número.',
        '`querySelector` devolve `null` quando não encontra: confira antes de usar.',
        'Abra a página e o console para ver as saídas.'
      ] },
    { titulo: "Alterando texto, classes e atributos", lang: "js", arquivo: "app.js",
      codigo: `
const titulo = document.querySelector("#titulo");
const itens = document.querySelectorAll(".item");

// Texto (seguro)
titulo.textContent = "Compras da semana";

// Classes: o jeito certo de mudar a aparência
itens[0].classList.add("comprado");
itens[1].classList.toggle("destaque");       // liga/desliga
console.log(itens[1].classList.contains("destaque"));   // false (foi desligada)

// Atributos
const link = document.createElement("a");
link.setAttribute("href", "https://exemplo.com");
link.setAttribute("target", "_blank");
link.setAttribute("rel", "noopener");
link.textContent = "Ver loja";
document.body.append(link);

// data-* e ARIA
itens[2].dataset.status = "pendente";        // cria data-status="pendente"
const botao = document.querySelector("#menu-botao");
if (botao) {
  botao.setAttribute("aria-expanded", "true");
}

// Estilo pontual (prefira classes)
titulo.style.color = "#1864ab";
titulo.style.setProperty("--espaco", "1rem");   // também funciona com variáveis CSS`,
      explicacao: [
        '`classList.toggle` adiciona a classe se não existir e remove se existir.',
        'Mudar aparência por **classes** mantém o CSS no lugar certo; `style` inline deve ser exceção.',
        'O `if (botao)` protege contra `null` quando o elemento não existe nesta página.',
        '`setAttribute("aria-expanded", "true")` mantém a acessibilidade em sincronia com o visual.'
      ] },
    { titulo: "Criando elementos e segurança contra XSS", lang: "js", arquivo: "app.js",
      codigo: `
const lista = document.querySelector("#lista");

// Criar e inserir com segurança (textContent)
function criarItem(texto, id) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.id = String(id);
  li.textContent = texto;               // seguro mesmo se "texto" vier do usuário
  return li;
}

lista.append(criarItem("Leite", 4));

// Vários itens de uma vez
const novos = ["Pão", "Ovos"].map((nome, i) => criarItem(nome, 5 + i));
lista.append(...novos);

// Remover
document.querySelector('[data-id="1"]')?.remove();

// Esvaziar e repopular
lista.replaceChildren(...novos);

// PERIGO: dados do usuário em innerHTML
const entrada = '<img src=x onerror="alert(\\'XSS\\')">';
// lista.innerHTML = "<li>" + entrada + "</li>";   // EXECUTARIA o código malicioso!
lista.textContent = entrada;                       // vira texto inofensivo na tela

// Template: modelo HTML reutilizável
// <template id="modelo-item"><li class="item"><span class="nome"></span></li></template>
const modelo = document.querySelector("#modelo-item");
if (modelo) {
  const clone = modelo.content.cloneNode(true);
  clone.querySelector(".nome").textContent = "Item do template";
  lista.append(clone);
}`,
      explicacao: [
        '`textContent` trata o valor sempre como texto: nenhuma marcação é interpretada.',
        'Com `innerHTML` e dados do usuário, o navegador interpretaria o HTML e executaria o `onerror`: é a base do ataque XSS.',
        '`append(...novos)` insere vários nós em uma operação.',
        'O `<template>` mantém o modelo HTML fora da página até ser clonado; os dados continuam sendo inseridos com `textContent`.'
      ] }
  ],
  erros: [
    { erro: "Usar `innerHTML` com dados digitados pelo usuário ou vindos de uma API.", porque: "Permite injeção de código (XSS).", correcao: "use `textContent` ou crie elementos com `createElement`." },
    { erro: "Usar o resultado de `querySelector` sem verificar `null`.", porque: "`TypeError: Cannot set properties of null`.", correcao: "confira o seletor, a ordem de carregamento e use `if` ou `?.`." },
    { erro: "Esquecer o `#` ou o `.` no `querySelector` (`querySelector(\"titulo\")`).", porque: "Procura uma tag `<titulo>`.", correcao: "use `\"#titulo\"` ou `\".classe\"` (só `getElementById` dispensa o `#`)." },
    { erro: "Tratar a `NodeList` como array (`itens.map(...)`).", porque: "`NodeList` não tem `map`/`filter`.", correcao: "use `[...itens]` ou `Array.from(itens)`." },
    { erro: "Mudar `style` inline para tudo.", porque: "Espalha CSS pelo JavaScript e dificulta a manutenção.", correcao: "alterne classes definidas no CSS." },
    { erro: "Esperar que `dataset.id` seja número.", porque: "Sempre devolve texto.", correcao: "converta com `Number(...)`." }
  ],
  praticas: [
    'Carregue o script com `defer` e confira se os elementos existem.',
    'Prefira `textContent`; trate `innerHTML` como perigoso.',
    'Mude a aparência alternando **classes**; mantenha `aria-*` em sincronia.',
    'Guarde referências a elementos em variáveis `const` no topo do arquivo.',
    'Insira vários elementos de uma vez para evitar reprocessamentos.'
  ],
  exercicios: [
    { titulo: "Lista dinâmica",
      enunciado: 'Dado um array `const tarefas = ["Estudar", "Treinar", "Ler"];` e um `<ul id="tarefas"></ul>` no HTML, escreva o JS que cria um `<li>` para cada tarefa (com `textContent`) e os insere na lista de uma vez. Marque a primeira com a classe `feita`.',
      dica: '`map` para criar os `li`, `append(...itens)`.',
      resolucao: { lang: "js", codigo: `
const tarefas = ["Estudar", "Treinar", "Ler"];
const ul = document.querySelector("#tarefas");

const itens = tarefas.map((texto) => {
  const li = document.createElement("li");
  li.textContent = texto;
  return li;
});

itens[0].classList.add("feita");
ul.append(...itens);`,
        comentario: 'Os elementos são criados e preparados antes de entrar na página; `append(...itens)` insere todos de uma vez. O texto vem de `textContent`, e a aparência de "feita" vem de uma classe definida no CSS.' } },
    { titulo: "Por que isto é perigoso?",
      enunciado: 'Explique o problema do código abaixo e corrija-o: `const nome = prompt("Seu nome?"); document.querySelector("#saudacao").innerHTML = "Olá, " + nome + "!";`',
      dica: 'Pense no que acontece se o usuário digitar HTML.',
      resolucao: { lang: "js", codigo: `
const nome = prompt("Seu nome?");
document.querySelector("#saudacao").textContent = \`Olá, \${nome}!\`;`,
        comentario: 'Com `innerHTML`, se o usuário digitar algo como `<img src=x onerror=...>`, o navegador interpretará como HTML e executará o script (XSS). `textContent` mostra o que foi digitado como texto, sem interpretar marcação. Em aplicações reais, o mesmo cuidado vale para dados vindos de APIs, URLs e do armazenamento local.' } }
  ],
  referencias: [
    { t: "Introdução ao DOM", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction", fonte: "MDN Web Docs" },
    { t: "Manipulando documentos", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/DOM_scripting", fonte: "MDN Web Docs" },
    { t: "Document.querySelector()", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Document/querySelector", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a2", titulo: "Eventos", minutos: 60,
  topicos: ["Eventos"],
  objetivos: [
    "Registrar e remover ouvintes com `addEventListener`.",
    "Usar o objeto de evento (`target`, `currentTarget`, `preventDefault`, `key`).",
    "Aplicar delegação de eventos em listas dinâmicas.",
    "Tornar interações acessíveis ao teclado e a leitores de tela."
  ],
  conceito: [
    { h: "O que são eventos" },
    { p: 'Um **evento** é algo que acontece na página: um clique, uma tecla, o envio de um formulário, o carregamento de uma imagem. Seu código **reage** registrando uma função (*ouvinte* ou *handler*) para o evento de um elemento: `elemento.addEventListener("click", funcao)`. É o caso clássico de *callback*: a função só é chamada **quando** o evento ocorre.' },
    { h: "Registrando e removendo" },
    { lista: [
      '`addEventListener(tipo, funcao, opcoes)`. Tipos comuns: `click`, `input`, `change`, `submit`, `keydown`, `keyup`, `focus`, `blur`, `mouseenter`, `DOMContentLoaded`, `load`, `scroll`, `resize`.',
      '`removeEventListener(tipo, mesmaFuncao)`: exige a **mesma referência** de função (arrow function anônima não pode ser removida). A opção `{ once: true }` remove o ouvinte automaticamente após a primeira execução.',
      'Evite `onclick="..."` no HTML e `elemento.onclick = ...`: o primeiro mistura estruturas; o segundo permite um só ouvinte por evento.'
    ] },
    { h: "O objeto de evento" },
    { p: 'O navegador passa um objeto `evento` ao ouvinte:' },
    { lista: [
      '`evento.target`: o elemento **onde** o evento começou (o mais interno clicado). `evento.currentTarget`: o elemento ao qual o ouvinte está ligado.',
      '`evento.preventDefault()`: cancela o comportamento padrão (enviar formulário, seguir link).',
      '`evento.stopPropagation()`: interrompe a propagação (use raramente).',
      'Teclado: `evento.key` (`"Enter"`, `"Escape"`, `"a"`), `evento.shiftKey`, `evento.ctrlKey`.',
      'Mouse: `evento.clientX`, `evento.clientY`.'
    ] },
    { h: "Propagação e delegação" },
    { p: 'Os eventos **sobem** (*bubbling*) do elemento clicado até o `document`. Isso permite a **delegação de eventos**: em vez de registrar um ouvinte em cada item de uma lista, registre **um** no pai e descubra quem foi clicado com `evento.target.closest("seletor")`. Vantagens: menos ouvintes, e funciona automaticamente para itens criados **depois**.' },
    { h: "`input` x `change`" },
    { p: '`input` dispara a **cada alteração** (digitar, colar) e serve para busca instantânea e contadores. `change` dispara quando o valor é **confirmado** (sair do campo, escolher uma opção). Em `checkbox`, `radio` e `select`, `change` é o evento usual.' },
    { h: "Acessibilidade de interações" },
    { lista: [
      'Use elementos **nativamente interativos**: `<button>` para ações, `<a href>` para navegação. Eles já funcionam com teclado (`Enter` e `Espaço`) e são anunciados corretamente.',
      'Se usar um `<div>` clicável (evite), terá de adicionar `role`, `tabindex="0"` e tratamento de `Enter`/`Espaço`: o botão nativo resolve tudo isso.',
      'Não dependa só de `hover` e de `mouseenter`: usuários de teclado e de toque não os acionam. Ofereça `focus` e `click` equivalentes.',
      'Após abrir um painel ou diálogo, gerencie o **foco** (`elemento.focus()`) e permita fechar com `Escape`.',
      'Anuncie mudanças importantes com regiões `aria-live` (veremos na aula 3.4).'
    ] },
    { nota: { t: "Funções nomeadas facilitam a depuração", x: 'Ao passar uma arrow function anônima, você não consegue removê-la depois e a pilha de chamadas fica mais difícil de ler. Para ouvintes que podem precisar de remoção, declare uma função nomeada e passe a referência (sem parênteses).' } }
  ],
  exemplos: [
    { titulo: "Contador com botões", lang: "js", arquivo: "contador.js",
      codigo: `
// HTML:
// <p>Valor: <output id="valor">0</output></p>
// <button type="button" id="menos">-1</button>
// <button type="button" id="mais">+1</button>
// <button type="button" id="zerar">Zerar</button>

const valor = document.querySelector("#valor");
let contador = 0;

function atualizar() {
  valor.textContent = String(contador);
}

document.querySelector("#mais").addEventListener("click", () => {
  contador++;
  atualizar();
});

document.querySelector("#menos").addEventListener("click", () => {
  contador--;
  atualizar();
});

document.querySelector("#zerar").addEventListener("click", () => {
  contador = 0;
  atualizar();
});`,
      explicacao: [
        'O estado (`contador`) fica em uma variável; a função `atualizar` reflete-o na tela, e o padrão se repete em aplicações maiores.',
        'Usamos `<button type="button">`: acessível por teclado e sem enviar formulários.',
        '`<output>` é o elemento semântico para resultados de cálculo e é anunciado por leitores de tela.',
        'O ouvinte é chamado a cada clique: a função não executa na hora do registro.'
      ] },
    { titulo: "Objeto de evento e teclado", lang: "js", arquivo: "eventos.js",
      codigo: `
// HTML:
// <input id="busca" type="search" aria-label="Buscar">
// <p id="contagem"></p>
// <a id="sair" href="/sair">Sair</a>
// <dialog id="ajuda">Ajuda...</dialog>

const busca = document.querySelector("#busca");
const contagem = document.querySelector("#contagem");

// input: a cada alteração
busca.addEventListener("input", (evento) => {
  const texto = evento.target.value;             // ou busca.value
  contagem.textContent = \`\${texto.length} caracteres\`;
});

// Teclas
busca.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    busca.value = "";
    contagem.textContent = "";
  }
  if (evento.key === "Enter") {
    console.log("Buscar:", busca.value);
  }
});

// preventDefault: cancela o comportamento padrão
document.querySelector("#sair").addEventListener("click", (evento) => {
  evento.preventDefault();                       // não navega
  if (confirm("Deseja mesmo sair?")) {
    window.location.href = evento.currentTarget.href;   // navega manualmente
  }
});

// Ouvinte que roda uma vez e depois se remove
window.addEventListener("scroll", () => console.log("Primeira rolagem"), { once: true });

// Ouvinte removível: precisa de função nomeada
function aoRedimensionar() {
  console.log("Largura:", window.innerWidth);
}
window.addEventListener("resize", aoRedimensionar);
// window.removeEventListener("resize", aoRedimensionar);`,
      explicacao: [
        '`evento.target.value` lê o conteúdo atual do campo.',
        '`evento.key` descreve a tecla: use-o em vez dos antigos `keyCode`.',
        '`preventDefault` impede a navegação do link, e depois a decisão fica com o código.',
        '`{ once: true }` remove o ouvinte automaticamente.',
        'Para `removeEventListener`, precisa-se da **mesma** função: por isso `aoRedimensionar` é nomeada.'
      ] },
    { titulo: "Delegação de eventos em lista dinâmica", lang: "js", arquivo: "delegacao.js",
      codigo: `
// HTML:
// <form id="form-tarefa"><input id="nova" aria-label="Nova tarefa"><button>Adicionar</button></form>
// <ul id="tarefas"></ul>

const form = document.querySelector("#form-tarefa");
const campo = document.querySelector("#nova");
const lista = document.querySelector("#tarefas");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();                       // não recarrega a página
  const texto = campo.value.trim();
  if (texto === "") return;

  const li = document.createElement("li");

  const rotulo = document.createElement("span");
  rotulo.textContent = texto;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.dataset.acao = "remover";
  botao.textContent = "Remover";
  botao.setAttribute("aria-label", \`Remover tarefa: \${texto}\`);

  li.append(rotulo, " ", botao);
  lista.append(li);

  campo.value = "";
  campo.focus();                                 // devolve o foco ao campo
});

// UM ouvinte no pai atende TODOS os botões, inclusive os criados depois
lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest('[data-acao="remover"]');
  if (!botao) return;                            // clique em outra coisa
  botao.closest("li").remove();
  campo.focus();
});`,
      explicacao: [
        'O ouvinte de `submit` é ligado ao **formulário** (não ao botão), e o Enter no campo também envia.',
        '`preventDefault()` evita o recarregamento padrão do envio.',
        'A delegação usa **um** ouvinte na lista; `closest` encontra o botão mesmo que o clique caia em um elemento interno.',
        'Itens adicionados depois já funcionam, pois o ouvinte está no pai.',
        '`aria-label` dá a cada botão "Remover" um nome único para leitores de tela, e o foco volta ao campo após cada ação.'
      ] }
  ],
  erros: [
    { erro: "Chamar a função no registro: `addEventListener(\"click\", salvar())`.", porque: "Executa `salvar` imediatamente e registra o **resultado**.", correcao: "passe a referência: `addEventListener(\"click\", salvar)`." },
    { erro: "Esquecer `preventDefault()` no `submit`.", porque: "A página recarrega e o estado se perde.", correcao: "chame `evento.preventDefault()` no início do ouvinte." },
    { erro: "Registrar um ouvinte em cada item de uma lista dinâmica.", porque: "Itens novos ficam sem ouvinte, e há muitos ouvintes.", correcao: "use delegação no elemento pai." },
    { erro: "Tentar remover um ouvinte passando uma nova arrow function.", porque: "A referência é outra: nada é removido.", correcao: "use uma função nomeada." },
    { erro: "Usar `div` ou `span` clicável.", porque: "Não recebe foco nem aciona com `Enter`/`Espaço`.", correcao: "use `<button>` ou `<a>`." },
    { erro: "Registrar o mesmo ouvinte repetidamente (por exemplo, dentro de outra função chamada várias vezes).", porque: "A ação executa várias vezes por evento.", correcao: "registre uma única vez na inicialização." }
  ],
  praticas: [
    'Use `addEventListener`, e nunca `onclick=\"\"` inline.',
    'Passe a referência da função, sem parênteses.',
    'Use delegação para listas e conteúdos dinâmicos.',
    'Garanta que toda ação seja possível com teclado e gerencie o foco.',
    'Mantenha a lógica em funções nomeadas e testáveis; o ouvinte só traduz o evento em uma chamada.'
  ],
  exercicios: [
    { titulo: "Alternar tema",
      enunciado: 'Há um `<button id="tema" aria-pressed="false">Tema escuro</button>`. Ao clicar, alterne a classe `escuro` no `<body>` e atualize `aria-pressed` (`"true"`/`"false"`) para refletir o estado.',
      dica: '`classList.toggle` devolve `true` se a classe ficou ativa.',
      resolucao: { lang: "js", codigo: `
const botao = document.querySelector("#tema");

botao.addEventListener("click", () => {
  const ativo = document.body.classList.toggle("escuro");   // true se ficou escuro
  botao.setAttribute("aria-pressed", String(ativo));
});`,
        comentario: '`toggle` devolve se a classe está presente depois da operação, e o valor alimenta `aria-pressed`, que informa a leitores de tela o estado do botão de alternância. O visual fica no CSS (`body.escuro { ... }`).' } },
    { titulo: "Cartões clicáveis por delegação",
      enunciado: 'Uma `<ul id="cursos">` tem itens `<li><button data-curso="html">HTML</button></li>` (e outros). Com um único ouvinte, mostre em `<p id="selecionado">` o texto "Curso selecionado: X" (usando o `data-curso`) quando um botão for clicado.',
      dica: '`evento.target.closest("button[data-curso]")`.',
      resolucao: { lang: "js", codigo: `
const lista = document.querySelector("#cursos");
const saida = document.querySelector("#selecionado");

lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-curso]");
  if (!botao) return;
  saida.textContent = \`Curso selecionado: \${botao.dataset.curso}\`;
});`,
        comentario: 'Um ouvinte no `<ul>` cobre todos os botões, inclusive os adicionados depois. O `closest` com o seletor de atributo garante que só cliques em botões com `data-curso` sejam tratados.' } }
  ],
  referencias: [
    { t: "Introdução a eventos", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Events", fonte: "MDN Web Docs" },
    { t: "EventTarget.addEventListener()", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/EventTarget/addEventListener", fonte: "MDN Web Docs" },
    { t: "Delegação de eventos (guia de eventos)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/Event_bubbling", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a3", titulo: "Formulários e validação", minutos: 65,
  topicos: ["Formulários", "Validação"],
  objetivos: [
    "Ler dados de formulários com `FormData`, `value`, `checked` e `elements`.",
    "Usar a API de validação nativa (`checkValidity`, `validity`, `setCustomValidity`).",
    "Escrever validações próprias com mensagens claras e acessíveis.",
    "Entender por que a validação do cliente não substitui a do servidor."
  ],
  conceito: [
    { h: "Lendo dados do formulário" },
    { lista: [
      '`input.value` devolve **sempre texto**: converta com `Number(...)` quando precisar de números.',
      '`checkbox.checked` e `radio.checked` são booleanos; para um grupo de rádios, `form.elements.nome.value` devolve o valor do selecionado.',
      '`select.value` é o `value` da opção escolhida; `select.selectedOptions` para múltiplos.',
      '**`new FormData(form)`** reúne todos os campos com `name` (os mesmos que seriam enviados). Converta com `Object.fromEntries(new FormData(form))` para um objeto simples (atenção: nomes repetidos, como checkboxes múltiplos, ficam só com o último valor; use `formData.getAll("nome")`).',
      'Sempre use `evento.preventDefault()` no `submit` quando for tratar o envio por JavaScript.'
    ] },
    { h: "Validação nativa pela API" },
    { p: 'Os atributos HTML (`required`, `minlength`, `pattern`, `type="email"`...) já ativam a validação do navegador. O JavaScript pode consultá-la e complementá-la:' },
    { lista: [
      '`form.checkValidity()` / `campo.checkValidity()`: `true` se válido (dispara o evento `invalid` nos campos inválidos).',
      '`form.reportValidity()`: valida **e** mostra as mensagens nativas.',
      '`campo.validity`: objeto com detalhes (`valueMissing`, `typeMismatch`, `tooShort`, `patternMismatch`, `rangeOverflow`...).',
      '`campo.validationMessage`: o texto da mensagem nativa.',
      '`campo.setCustomValidity("mensagem")`: define uma mensagem **personalizada** e torna o campo inválido; `setCustomValidity("")` limpa. É a forma de criar regras próprias (como "as senhas devem ser iguais") integradas ao navegador.'
    ] },
    { h: "Validação própria e acessível" },
    { p: 'Quando você substitui as mensagens nativas por mensagens suas (`novalidate` no `<form>`, ou o evento `invalid`), assuma a acessibilidade:' },
    { lista: [
      'Escreva mensagens **específicas e em texto** ("Informe um e-mail no formato nome@dominio.com"), ligadas ao campo com `aria-describedby`.',
      'Marque o campo com `aria-invalid="true"` enquanto houver erro, e remova-o quando corrigido.',
      'Ao enviar com erros, **mova o foco para o primeiro campo inválido** e anuncie um resumo (por exemplo, em um elemento com `role="alert"` ou `aria-live="polite"`).',
      'Valide ao **sair do campo** (`blur`) ou ao enviar, e não a cada tecla na primeira digitação (mostrar erro antes de o usuário terminar é frustrante).',
      'Não dependa só de cor: use texto e ícones.'
    ] },
    { h: "Cliente x servidor" },
    { p: 'A validação em JavaScript melhora a **experiência**, mas qualquer pessoa pode contorná-la (desativar o script, alterar o HTML, enviar a requisição diretamente). **O servidor deve sempre validar de novo** e nunca confiar nos dados recebidos. Nunca decida segurança (preços, permissões, descontos) apenas no navegador.' },
    { nota: { t: "Evite validações excessivamente rígidas", x: 'Validar nomes e e-mails com regras muito estritas exclui pessoas reais (nomes com apóstrofo, hífen, acento ou um só nome; e-mails válidos incomuns). Para e-mail, `type="email"` já basta no cliente; a confirmação real é enviar uma mensagem ao endereço.' } }
  ],
  exemplos: [
    { titulo: "Lendo o formulário com FormData", lang: "js", arquivo: "form-dados.js",
      codigo: `
// HTML:
// <form id="cadastro" novalidate>
//   <label for="nome">Nome</label>
//   <input id="nome" name="nome" required>
//   <label for="idade">Idade</label>
//   <input id="idade" name="idade" type="number" min="0" max="120">
//   <fieldset><legend>Nível</legend>
//     <label><input type="radio" name="nivel" value="iniciante" checked> Iniciante</label>
//     <label><input type="radio" name="nivel" value="avancado"> Avançado</label>
//   </fieldset>
//   <label><input type="checkbox" name="interesses" value="html"> HTML</label>
//   <label><input type="checkbox" name="interesses" value="css"> CSS</label>
//   <button>Enviar</button>
// </form>

const form = document.querySelector("#cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = new FormData(form);
  const objeto = Object.fromEntries(dados);            // nomes repetidos: só o último
  const interesses = dados.getAll("interesses");       // todos os checkboxes marcados

  const pessoa = {
    nome: objeto.nome.trim(),
    idade: objeto.idade === "" ? null : Number(objeto.idade),   // texto vazio -> null
    nivel: objeto.nivel,
    interesses
  };

  console.log(pessoa);
});`,
      explicacao: [
        '`FormData(form)` coleta os campos com `name`, exatamente como o envio normal.',
        'Todos os valores chegam como **texto**: a idade é convertida explicitamente.',
        'Como `Number("")` é `0`, o texto vazio é tratado antes, e vira `null` (campo não preenchido).',
        '`getAll` devolve todos os valores de nomes repetidos (checkboxes).'
      ] },
    { titulo: "Validação própria com mensagens acessíveis", lang: "js", arquivo: "validacao.js",
      codigo: `
// HTML (resumido):
// <form id="login" novalidate>
//   <div class="campo">
//     <label for="email">E-mail</label>
//     <input id="email" name="email" type="email" required aria-describedby="email-erro">
//     <p id="email-erro" class="erro" hidden></p>
//   </div>
//   <div class="campo">
//     <label for="senha">Senha (mínimo 8 caracteres)</label>
//     <input id="senha" name="senha" type="password" required minlength="8" aria-describedby="senha-erro">
//     <p id="senha-erro" class="erro" hidden></p>
//   </div>
//   <button>Entrar</button>
// </form>

const form = document.querySelector("#login");

function mensagemDeErro(campo) {
  const v = campo.validity;
  if (v.valueMissing) return "Este campo é obrigatório.";
  if (v.typeMismatch) return "Informe um e-mail no formato nome@dominio.com.";
  if (v.tooShort)     return \`Use pelo menos \${campo.minLength} caracteres.\`;
  return "";                                    // válido
}

function validarCampo(campo) {
  const erro = document.getElementById(campo.getAttribute("aria-describedby"));
  const mensagem = mensagemDeErro(campo);

  erro.textContent = mensagem;
  erro.hidden = mensagem === "";
  if (mensagem) {
    campo.setAttribute("aria-invalid", "true");
  } else {
    campo.removeAttribute("aria-invalid");
  }
  return mensagem === "";
}

// Valida ao sair do campo, e revalida a cada digitação se já estava com erro
for (const campo of form.elements) {
  if (!(campo instanceof HTMLInputElement)) continue;
  campo.addEventListener("blur", () => validarCampo(campo));
  campo.addEventListener("input", () => {
    if (campo.hasAttribute("aria-invalid")) validarCampo(campo);
  });
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const campos = [...form.elements].filter((c) => c instanceof HTMLInputElement);
  const invalidos = campos.filter((c) => !validarCampo(c));

  if (invalidos.length > 0) {
    invalidos[0].focus();                       // foco no primeiro erro
    return;
  }
  console.log("Formulário válido: enviar ao servidor");
});`,
      explicacao: [
        '`campo.validity` informa o **motivo** do erro, e a mensagem é escrita em português claro.',
        'A mensagem fica em um elemento ligado ao campo por `aria-describedby`; `aria-invalid` sinaliza o estado.',
        'A validação ocorre no `blur` e, depois do primeiro erro, a cada digitação: o usuário vê a correção na hora.',
        'No envio, o foco vai para o primeiro campo inválido.',
        'Este código mostra o princípio; em produção, considere também um resumo de erros no topo do formulário.'
      ] },
    { titulo: "Regra personalizada: confirmar senha", lang: "js", arquivo: "confirmar-senha.js",
      codigo: `
// HTML: <input id="senha" type="password"> <input id="confirmacao" type="password">

const senha = document.querySelector("#senha");
const confirmacao = document.querySelector("#confirmacao");

function verificarConfirmacao() {
  if (confirmacao.value !== senha.value) {
    confirmacao.setCustomValidity("As senhas não conferem.");   // torna o campo inválido
  } else {
    confirmacao.setCustomValidity("");                           // limpa: volta a ser válido
  }
}

senha.addEventListener("input", verificarConfirmacao);
confirmacao.addEventListener("input", verificarConfirmacao);

// Com o <form> sem novalidate, o navegador bloqueia o envio e mostra a mensagem personalizada.
// Para ler o estado:
console.log(confirmacao.validity.customError);     // true enquanto houver mensagem personalizada
console.log(confirmacao.validationMessage);`,
      explicacao: [
        '`setCustomValidity` com texto torna o campo inválido, e a mensagem aparece no balão do navegador.',
        'É **essencial** limpar com `setCustomValidity("")`; senão, o campo permanece inválido mesmo corrigido.',
        'Ambos os campos disparam a verificação, porque mudar a senha também pode quebrar a confirmação.',
        'O mesmo mecanismo serve para qualquer regra própria (CPF, datas, disponibilidade de nome...).'
      ] }
  ],
  erros: [
    { erro: "Esquecer `preventDefault()` no `submit`.", porque: "O envio normal recarrega a página.", correcao: "chame-o no começo do ouvinte." },
    { erro: "Somar valores de campos sem converter (`idade + 1` com `\"30\"`).", porque: "Resulta em `\"301\"`.", correcao: "converta com `Number(...)`." },
    { erro: "Usar `Number(\"\")` achando que dá `NaN`.", porque: "Dá `0`.", correcao: "teste o texto vazio antes de converter." },
    { erro: "Não limpar `setCustomValidity(\"\")`.", porque: "O campo continua inválido para sempre.", correcao: "sempre limpe quando a regra estiver satisfeita." },
    { erro: "Validar apenas no cliente.", porque: "Pode ser contornado.", correcao: "valide de novo no servidor." },
    { erro: "Mensagens vagas (\"Campo inválido\") só em vermelho.", porque: "Não dizem como corrigir e excluem quem não percebe cores.", correcao: "use mensagens específicas em texto, ligadas ao campo." },
    { erro: "Mostrar erros antes de o usuário terminar de digitar.", porque: "Frustra e confunde.", correcao: "valide no `blur` e no envio." }
  ],
  praticas: [
    'Use `FormData` para ler formulários, e converta tipos explicitamente.',
    'Aproveite a validação nativa e complemente com `setCustomValidity`.',
    'Mensagens em texto, específicas, associadas ao campo e anunciáveis.',
    'Leve o foco ao primeiro campo com erro.',
    'Nunca confie no cliente: valide também no servidor.'
  ],
  exercicios: [
    { titulo: "Calculadora de desconto",
      enunciado: 'Um formulário tem `preco` (número) e `desconto` (0 a 100, número). Ao enviar, valide que ambos são números não negativos e que o desconto não passa de 100; se válido, mostre em `<output id="resultado">` o preço final formatado em reais. Se inválido, mostre uma mensagem clara (em um elemento com `role="alert"`).',
      dica: '`Number()`, `Number.isNaN`, `Intl.NumberFormat`.',
      resolucao: { lang: "js", codigo: `
const form = document.querySelector("#calculo");
const resultado = document.querySelector("#resultado");
const aviso = document.querySelector("#aviso");      // <p id="aviso" role="alert"></p>

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = new FormData(form);
  const textoPreco = String(dados.get("preco")).trim();
  const textoDesconto = String(dados.get("desconto")).trim();

  const preco = Number(textoPreco);
  const desconto = Number(textoDesconto);

  if (textoPreco === "" || Number.isNaN(preco) || preco < 0) {
    aviso.textContent = "Informe um preço válido (zero ou maior).";
    resultado.textContent = "";
    return;
  }
  if (textoDesconto === "" || Number.isNaN(desconto) || desconto < 0 || desconto > 100) {
    aviso.textContent = "O desconto deve estar entre 0 e 100.";
    resultado.textContent = "";
    return;
  }

  aviso.textContent = "";
  const final = preco * (1 - desconto / 100);
  resultado.textContent = moeda.format(final);
});`,
        comentario: 'O texto vazio é verificado antes da conversão, porque `Number("")` vale 0. Cada erro tem mensagem específica no elemento `role="alert"`, que leitores de tela anunciam. O cálculo só ocorre com dados válidos. Em um sistema real, o servidor recalcularia o preço.' } },
    { titulo: "Contador de caracteres acessível",
      enunciado: 'Em um `<textarea id="mensagem" maxlength="200">` com `<p id="restante" aria-live="polite"></p>`, mostre "X caracteres restantes", atualizando a cada digitação.',
      dica: 'Evento `input`; `maxlength` e `value.length`.',
      resolucao: { lang: "js", codigo: `
const campo = document.querySelector("#mensagem");
const restante = document.querySelector("#restante");

function atualizar() {
  const n = campo.maxLength - campo.value.length;
  restante.textContent = \`\${n} caracteres restantes\`;
}

campo.addEventListener("input", atualizar);
atualizar();                       // estado inicial`,
        comentario: '`maxLength` lê o atributo do HTML (200), e o código não repete o número. `aria-live="polite"` anuncia a mudança sem interromper quem digita (em um contador que muda a cada tecla, convém limitar os anúncios, por exemplo só nos últimos 20 caracteres).' } }
  ],
  referencias: [
    { t: "Validação de formulários no lado do cliente", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms/Form_validation", fonte: "MDN Web Docs" },
    { t: "FormData", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/FormData", fonte: "MDN Web Docs" },
    { t: "Constraint Validation API", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Constraint_validation", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a4", titulo: "Atualização de interfaces", minutos: 65,
  topicos: ["Atualização de interfaces"],
  objetivos: [
    "Separar **estado**, **renderização** e **eventos** em uma pequena aplicação.",
    "Renderizar listas a partir de dados de forma segura e eficiente.",
    "Atualizar a interface mantendo foco, acessibilidade e mensagens de status.",
    "Construir um componente completo (lista de tarefas com filtro) sem bibliotecas."
  ],
  conceito: [
    { h: "Estado → interface" },
    { p: 'Quanto mais interativa a página, mais difícil é manter a tela coerente se cada evento "remenda" o DOM por conta própria. Um padrão simples e poderoso: guardar os dados em um **estado** (variáveis/objetos) e ter uma função `renderizar()` que **desenha a interface a partir do estado**. Os eventos só **alteram o estado** e chamam `renderizar()`. É a ideia por trás de bibliotecas como React e Vue, mas funciona em JavaScript puro.' },
    { lista: [
      '**Estado**: a "fonte da verdade". Ex.: `{ tarefas: [...], filtro: "todas" }`.',
      '**Renderização**: lê o estado e produz o DOM (`replaceChildren`).',
      '**Eventos**: traduzem ações do usuário em mudanças no estado.'
    ] },
    { p: 'Vantagens: a tela nunca fica fora de sincronia com os dados; a lógica fica testável (o estado é um objeto comum); e fica fácil acrescentar persistência (módulo 4) e atualizações vindas da rede.' },
    { h: "Renderizando listas" },
    { lista: [
      'Crie os elementos com `createElement` e `textContent` (seguro), e insira com `replaceChildren(...)`.',
      'Dê a cada item um **identificador estável** (`id`) guardado em `data-id`, para a delegação de eventos descobrir qual item mudou.',
      'Para listas muito grandes, considere renderizar só o necessário (paginação ou rolagem virtual): redesenhar milhares de nós a cada tecla é lento.',
      '`replaceChildren` redesenha **tudo**: o foco e a seleção de texto dentro da lista se perdem. Devolva o foco explicitamente quando fizer sentido.'
    ] },
    { h: "Estados vazios, carregando e erro" },
    { p: 'Toda interface baseada em dados tem **pelo menos quatro estados**: *carregando*, *vazio*, *com dados* e *erro*. Projete os quatro: uma lista vazia deve dizer "Nenhuma tarefa ainda" em vez de mostrar um espaço em branco.' },
    { h: "Acessibilidade ao atualizar a tela" },
    { lista: [
      '**Regiões vivas**: um elemento com `aria-live="polite"` (ou `role="status"`) tem seu texto anunciado quando muda. Use para mensagens como "Tarefa adicionada" ou "3 resultados". `role="alert"` (ou `aria-live="assertive"`) é para erros urgentes.',
      'A região viva deve **já existir** no HTML antes de seu conteúdo mudar.',
      '**Foco**: ao remover o item focado, mova o foco para um lugar lógico (próximo item, campo de entrada); senão ele volta ao início da página.',
      'Atualize `aria-pressed`, `aria-expanded`, `aria-current` e `aria-selected` junto com o visual.',
      'Evite mudanças abruptas de conteúdo sem aviso; respeite `prefers-reduced-motion` em animações.'
    ] },
    { h: "Desempenho básico" },
    { lista: [
      'Agrupe mudanças de DOM: construa tudo e insira de uma vez.',
      'Em eventos que disparam muito (`input`, `scroll`, `resize`), use **debounce** (esperar um instante após o último evento) para não recalcular a cada disparo.',
      'Leia o layout (`offsetHeight`...) e escreva estilos em momentos separados para evitar recálculos repetidos.'
    ] },
    { nota: { t: "Quando usar uma biblioteca", x: 'Para aplicações grandes, com muito estado compartilhado e muitos componentes, bibliotecas e frameworks (React, Vue, Svelte...) trazem organização e ferramentas. Entender o padrão estado → renderização em JavaScript puro é o melhor preparo para usá-las bem.' } }
  ],
  exemplos: [
    { titulo: "Estado e renderização: lista de tarefas", lang: "js", arquivo: "tarefas.js",
      codigo: `
// HTML:
// <form id="form"><label for="nova">Nova tarefa</label> <input id="nova" required> <button>Adicionar</button></form>
// <ul id="lista"></ul>
// <p id="status" role="status"></p>

const form = document.querySelector("#form");
const campo = document.querySelector("#nova");
const lista = document.querySelector("#lista");
const status = document.querySelector("#status");

// 1) ESTADO: a fonte da verdade
const estado = {
  proximoId: 1,
  tarefas: []                       // { id, texto, feita }
};

// 2) RENDERIZAÇÃO: desenha a interface a partir do estado
function renderizar() {
  if (estado.tarefas.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Nenhuma tarefa ainda.";
    lista.replaceChildren(vazio);
    return;
  }

  const itens = estado.tarefas.map((tarefa) => {
    const li = document.createElement("li");
    li.dataset.id = String(tarefa.id);

    const caixa = document.createElement("input");
    caixa.type = "checkbox";
    caixa.checked = tarefa.feita;
    caixa.id = \`t-\${tarefa.id}\`;
    caixa.dataset.acao = "alternar";

    const rotulo = document.createElement("label");
    rotulo.htmlFor = caixa.id;
    rotulo.textContent = tarefa.texto;
    if (tarefa.feita) rotulo.style.textDecoration = "line-through";

    const remover = document.createElement("button");
    remover.type = "button";
    remover.dataset.acao = "remover";
    remover.textContent = "Remover";
    remover.setAttribute("aria-label", \`Remover tarefa: \${tarefa.texto}\`);

    li.append(caixa, " ", rotulo, " ", remover);
    return li;
  });

  lista.replaceChildren(...itens);
}

// 3) EVENTOS: alteram o estado e chamam renderizar()
form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = campo.value.trim();
  if (texto === "") return;

  estado.tarefas.push({ id: estado.proximoId++, texto, feita: false });
  campo.value = "";
  renderizar();
  status.textContent = \`Tarefa adicionada: \${texto}\`;
  campo.focus();
});

lista.addEventListener("click", (evento) => {
  const elemento = evento.target.closest("[data-acao]");
  if (!elemento) return;
  const id = Number(elemento.closest("li").dataset.id);
  const tarefa = estado.tarefas.find((t) => t.id === id);
  if (!tarefa) return;

  if (elemento.dataset.acao === "alternar") {
    tarefa.feita = elemento.checked;
    renderizar();
    document.querySelector(\`#t-\${id}\`).focus();       // preserva o foco no item
  } else if (elemento.dataset.acao === "remover") {
    estado.tarefas = estado.tarefas.filter((t) => t.id !== id);
    renderizar();
    status.textContent = \`Tarefa removida: \${tarefa.texto}\`;
    campo.focus();
  }
});

renderizar();                       // estado inicial`,
      explicacao: [
        'O **estado** é um objeto comum; nada no código lê dados do DOM para saber o que existe.',
        '`renderizar()` sempre desenha a tela completa a partir do estado, inclusive o estado vazio.',
        'O ouvinte único na lista usa delegação e o `data-id` para achar a tarefa no estado.',
        'Após cada ação, a região `role="status"` anuncia o que aconteceu, e o foco é devolvido a um lugar lógico.',
        'Todo texto do usuário entra por `textContent` (seguro contra XSS). O estilo `line-through` inline é só para o exemplo: no projeto real, use uma classe.'
      ] },
    { titulo: "Filtro e busca com debounce", lang: "js", arquivo: "filtro.js",
      codigo: `
// Continua o exemplo anterior: acrescenta filtro e busca ao estado.
// HTML: <input id="busca" type="search" aria-label="Buscar tarefas">
//       <select id="filtro" aria-label="Mostrar"><option value="todas">Todas</option>
//         <option value="abertas">Abertas</option><option value="feitas">Feitas</option></select>

const estado = { tarefas: [], filtro: "todas", busca: "" };

function tarefasVisiveis() {
  const termo = estado.busca.trim().toLowerCase();
  return estado.tarefas
    .filter((t) =>
      estado.filtro === "todas" ||
      (estado.filtro === "feitas" ? t.feita : !t.feita))
    .filter((t) => t.texto.toLowerCase().includes(termo));
}

// Função de debounce: só executa depois de "espera" ms sem novos disparos
function debounce(funcao, espera = 250) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => funcao(...args), espera);
  };
}

const atualizarBusca = debounce((texto) => {
  estado.busca = texto;
  renderizar();                                   // renderiza com tarefasVisiveis()
  document.querySelector("#status").textContent =
    \`\${tarefasVisiveis().length} tarefas encontradas\`;
}, 300);

document.querySelector("#busca").addEventListener("input", (e) => atualizarBusca(e.target.value));
document.querySelector("#filtro").addEventListener("change", (e) => {
  estado.filtro = e.target.value;
  renderizar();
});`,
      explicacao: [
        'O filtro e a busca fazem parte do **estado**; `tarefasVisiveis()` é uma função pura que os aplica sobre a lista.',
        'O `debounce` evita redesenhar a lista a cada tecla: espera 300 ms de pausa na digitação.',
        'A mensagem de status ("3 tarefas encontradas") anuncia o resultado aos leitores de tela.',
        'Neste trecho, `renderizar()` deve usar `tarefasVisiveis()` em vez de `estado.tarefas` (a função completa está no exemplo anterior).'
      ] },
    { titulo: "Estados: carregando, vazio, erro", lang: "js", arquivo: "estados.js",
      codigo: `
// HTML: <section id="painel" aria-busy="false"></section> <p id="aviso" role="status"></p>

const painel = document.querySelector("#painel");
const aviso = document.querySelector("#aviso");

function mostrar(estado, dados = []) {
  painel.setAttribute("aria-busy", String(estado === "carregando"));

  if (estado === "carregando") {
    painel.textContent = "Carregando...";
    aviso.textContent = "Carregando dados";
    return;
  }
  if (estado === "erro") {
    painel.textContent = "Não foi possível carregar. Tente novamente.";
    aviso.textContent = "Erro ao carregar dados";
    return;
  }
  if (dados.length === 0) {
    painel.textContent = "Nada por aqui ainda.";
    aviso.textContent = "Nenhum resultado";
    return;
  }

  const ul = document.createElement("ul");
  ul.append(...dados.map((d) => {
    const li = document.createElement("li");
    li.textContent = d;
    return li;
  }));
  painel.replaceChildren(ul);
  aviso.textContent = \`\${dados.length} itens carregados\`;
}

// Simulação (no módulo 4 isto virá de uma requisição real)
mostrar("carregando");
setTimeout(() => mostrar("dados", ["HTML", "CSS", "JavaScript"]), 800);`,
      explicacao: [
        'A interface tem **quatro** estados bem definidos, e cada um tem mensagem clara.',
        '`aria-busy` informa que a região está sendo atualizada.',
        'O elemento `role="status"` anuncia a transição de estado sem mover o foco.',
        '`setTimeout` simula a espera; no módulo 4, isso será substituído por uma requisição real com `fetch`.'
      ] }
  ],
  erros: [
    { erro: "Ler o estado a partir do DOM (por exemplo, contar `li`s para saber quantas tarefas existem).", porque: "O DOM pode divergir dos dados, e fica difícil de testar.", correcao: "guarde o estado em dados e renderize a partir deles." },
    { erro: "Atualizar parte do DOM e esquecer outras partes que dependem do mesmo dado.", porque: "A tela fica incoerente.", correcao: "concentre tudo em `renderizar()`." },
    { erro: "Perder o foco ao redesenhar a lista.", porque: "Usuários de teclado voltam ao topo da página.", correcao: "devolva o foco ao elemento adequado após `renderizar()`." },
    { erro: "Anunciar mudanças só visualmente.", porque: "Leitores de tela não percebem.", correcao: "use `role=\"status\"`/`aria-live` já presente no HTML." },
    { erro: "Redesenhar a cada tecla em listas grandes.", porque: "Deixa a interface lenta.", correcao: "use debounce e limite o que é renderizado." },
    { erro: "Não projetar os estados vazio e de erro.", porque: "O usuário vê uma tela em branco e não sabe o que aconteceu.", correcao: "defina mensagem para cada estado." }
  ],
  praticas: [
    'Separe estado, renderização e eventos.',
    'Faça `renderizar()` idempotente: chamá-la duas vezes gera o mesmo resultado.',
    'Use `data-id` e delegação para identificar itens.',
    'Anuncie mudanças com regiões vivas e gerencie o foco.',
    'Projete os estados: carregando, vazio, dados e erro.'
  ],
  exercicios: [
    { titulo: "Carrinho simples",
      enunciado: 'Implemente um carrinho: `estado.itens` (array de `{ id, nome, precoCentavos, qtd }`), botões "+" e "−" por item (delegação, `data-acao="mais"`/`"menos"`), remoção do item ao chegar a 0, e total formatado em reais atualizado a cada mudança. Quando vazio, mostre "Carrinho vazio".',
      dica: '`renderizar()` desenha lista e total; a função de total usa `reduce`.',
      resolucao: { lang: "js", codigo: `
// HTML: <ul id="itens"></ul> <p>Total: <output id="total"></output></p>

const estado = {
  itens: [
    { id: 1, nome: "Caderno", precoCentavos: 1590, qtd: 1 },
    { id: 2, nome: "Caneta",  precoCentavos: 350,  qtd: 3 }
  ]
};

const lista = document.querySelector("#itens");
const total = document.querySelector("#total");
const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const totalEmCentavos = () =>
  estado.itens.reduce((soma, i) => soma + i.precoCentavos * i.qtd, 0);

function renderizar() {
  if (estado.itens.length === 0) {
    const vazio = document.createElement("li");
    vazio.textContent = "Carrinho vazio";
    lista.replaceChildren(vazio);
  } else {
    lista.replaceChildren(...estado.itens.map((item) => {
      const li = document.createElement("li");
      li.dataset.id = String(item.id);

      const nome = document.createElement("span");
      nome.textContent = \`\${item.nome} - \${moeda.format(item.precoCentavos / 100)} x \${item.qtd} \`;

      const menos = document.createElement("button");
      menos.type = "button"; menos.dataset.acao = "menos"; menos.textContent = "−";
      menos.setAttribute("aria-label", \`Diminuir \${item.nome}\`);

      const mais = document.createElement("button");
      mais.type = "button"; mais.dataset.acao = "mais"; mais.textContent = "+";
      mais.setAttribute("aria-label", \`Aumentar \${item.nome}\`);

      li.append(nome, menos, " ", mais);
      return li;
    }));
  }
  total.textContent = moeda.format(totalEmCentavos() / 100);
}

lista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) return;
  const id = Number(botao.closest("li").dataset.id);
  const item = estado.itens.find((i) => i.id === id);
  if (!item) return;

  item.qtd += botao.dataset.acao === "mais" ? 1 : -1;
  if (item.qtd <= 0) estado.itens = estado.itens.filter((i) => i.id !== id);
  renderizar();
});

renderizar();`,
        comentario: 'O total (em centavos inteiros) é calculado a partir do estado, e nunca lido do DOM. A delegação usa `data-acao` e `data-id`. Ao chegar a zero, o item é removido com `filter`. O estado vazio tem mensagem própria. Em uma versão completa, convém também devolver o foco após remover um item e anunciar a mudança em uma região `role="status"`.' } },
    { titulo: "Identifique as falhas",
      enunciado: 'Um colega escreveu: `botao.addEventListener("click", () => { lista.innerHTML += "<li>" + campo.value + "</li>"; });`. Liste ao menos 3 problemas (segurança, estado, interface) e descreva a correção.',
      dica: 'XSS, perda de ouvintes ao reescrever `innerHTML`, ausência de estado.',
      resolucao: { lang: "", codigo: "",
        comentario: '(1) **XSS**: `campo.value` entra como HTML. Use `createElement` e `textContent`. (2) `innerHTML +=` **reconstrói toda a lista**: ouvintes, foco e estados de campos dentro dela se perdem; insira com `append`. (3) **Sem estado**: os dados só existem no DOM, o que dificulta filtrar, remover ou persistir; mantenha um array de tarefas e renderize a partir dele. (4) Não valida entrada vazia nem trata o texto com `trim()`. (5) Não anuncia a mudança a leitores de tela nem devolve o foco ao campo.' } }
  ],
  referencias: [
    { t: "Manipulando documentos (DOM)", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Scripting/DOM_scripting", fonte: "MDN Web Docs" },
    { t: "ARIA live regions", u: "https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA/Guides/Live_regions", fonte: "MDN Web Docs" },
    { t: "Element.replaceChildren()", u: "https://developer.mozilla.org/pt-BR/docs/Web/API/Element/replaceChildren", fonte: "MDN Web Docs" }
  ]
}

] });
