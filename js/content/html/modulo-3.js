/* HTML5 · Módulo 3 — Formulários
   Tópicos cobertos: Formulários HTML · Inputs · Labels · Tipos de campos ·
   Validação nativa · Acessibilidade de formulários */
AE.Conteudo.modulo("html", 3, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m3a1", titulo: "Formulários, inputs e labels", minutos: 50,
  topicos: ["Formulários HTML", "Inputs", "Labels"],
  objetivos: [
    "Montar um formulário com `form`, `input`, `textarea`, `select` e `button`.",
    "Explicar como o navegador monta e envia os dados (`name`, `value`, `method`, `action`).",
    "Associar cada campo ao seu `label` de forma correta.",
    "Agrupar campos relacionados com `fieldset` e `legend`."
  ],
  conceito: [
    { h: "O que é um formulário" },
    { p: 'Um formulário coleta dados do usuário e os envia a um destino. O elemento `<form>` envolve os campos e define para onde e como os dados vão, por meio de dois atributos principais: `action` (a URL que recebe os dados) e `method` (`get` ou `post`).' },
    { lista: [
      '`method="get"`: os dados vão **na URL** (`?nome=Ana&idade=30`). Serve para buscas e filtros, que podem ser compartilhados por link. Nunca use para dados sensíveis.',
      '`method="post"`: os dados vão **no corpo** da requisição. Use para cadastros, logins e qualquer ação que altere dados.'
    ] },
    { h: "Como os dados são montados: `name` e `value`" },
    { p: 'Quando o formulário é enviado, o navegador junta pares `name=value` de cada campo. **Um campo sem `name` não é enviado.** O `name` é o rótulo do dado para o servidor; o `id` é outra coisa (identifica o elemento no documento e liga o `label`). Campos desmarcados (checkbox e radio) e campos `disabled` também não entram no envio.' },
    { h: "Os principais controles" },
    { lista: [
      '`<input>`: o controle mais comum. O atributo `type` define o comportamento (`text`, `email`, `password`, `checkbox`, `radio`... veja a próxima aula).',
      '`<textarea>`: texto de várias linhas (`rows` e `cols` definem o tamanho inicial).',
      '`<select>` com `<option>`: lista de escolha; `<optgroup label>` agrupa opções.',
      '`<button>`: tem `type="submit"` (envia, é o padrão), `type="button"` (não faz nada sozinho) ou `type="reset"` (limpa o formulário).'
    ] },
    { h: "Labels: o nome de cada campo" },
    { p: 'O `<label>` é o texto que identifica um campo. Duas formas de associá-lo: (1) com `for` apontando para o `id` do campo, ou (2) **envolvendo** o campo. Um label bem associado dá nome ao campo para leitores de tela e **aumenta a área de clique**: tocar no texto foca ou marca o controle. Radios e checkboxes ficam especialmente mais fáceis de usar.' },
    { h: "Agrupando campos" },
    { p: 'Use `<fieldset>` para agrupar controles relacionados e `<legend>` para dar um nome ao grupo, como em um conjunto de botões de rádio ("Forma de pagamento"). Leitores de tela anunciam a legenda antes de cada opção do grupo.' },
    { nota: { t: "Radios formam grupo pelo name", x: 'Botões de rádio com o **mesmo** `name` pertencem ao mesmo grupo: marcar um desmarca os outros. O `value` de cada um identifica a escolha enviada.' } }
  ],
  exemplos: [
    { titulo: "Formulário de contato básico", lang: "html", arquivo: "contato.html",
      codigo: `
<form action="/enviar-contato" method="post">
  <p>
    <label for="nome">Nome</label><br>
    <input id="nome" name="nome" type="text">
  </p>
  <p>
    <label for="email">E-mail</label><br>
    <input id="email" name="email" type="email">
  </p>
  <p>
    <label for="assunto">Assunto</label><br>
    <select id="assunto" name="assunto">
      <option value="duvida">Dúvida</option>
      <option value="sugestao">Sugestão</option>
      <option value="outro">Outro</option>
    </select>
  </p>
  <p>
    <label for="mensagem">Mensagem</label><br>
    <textarea id="mensagem" name="mensagem" rows="5"></textarea>
  </p>
  <button type="submit">Enviar</button>
</form>`,
      explicacao: [
        'Cada `label` tem `for` igual ao `id` do campo: clicar no texto "Nome" foca o campo.',
        'Cada campo tem `name`; sem ele, o dado não seria enviado.',
        'O texto exibido nas opções do `<select>` ("Dúvida") pode ser diferente do `value` enviado (`duvida`).',
        'Os `<p>` e `<br>` aqui só organizam o visual enquanto não vemos CSS; em projetos reais o layout é feito com CSS.'
      ] },
    { titulo: "O que é enviado: GET e POST", lang: "txt", arquivo: "envio.txt",
      codigo: `
Formulário (method="get") preenchido com:
  nome = Ana Souza     e-mail = ana@exemplo.com     interesse = css (radio marcado)

Endereço gerado pelo navegador:
  /buscar?nome=Ana+Souza&email=ana%40exemplo.com&interesse=css

Com method="post", os mesmos pares vão no corpo da requisição:
  POST /cadastro HTTP/1.1
  Content-Type: application/x-www-form-urlencoded

  nome=Ana+Souza&email=ana%40exemplo.com&interesse=css`,
      explicacao: [
        'Os pares aparecem como `name=value` separados por `&`.',
        'Espaços viram `+` e caracteres especiais são codificados (`@` vira `%40`).',
        'Com GET, tudo é visível na barra de endereço e no histórico: nunca envie senhas assim.'
      ] },
    { titulo: "Grupos de opções com fieldset e legend", lang: "html", arquivo: "grupos.html",
      codigo: `
<form action="/pedido" method="post">
  <fieldset>
    <legend>Forma de pagamento</legend>
    <label><input type="radio" name="pagamento" value="pix" checked> Pix</label><br>
    <label><input type="radio" name="pagamento" value="cartao"> Cartão</label><br>
    <label><input type="radio" name="pagamento" value="boleto"> Boleto</label>
  </fieldset>

  <fieldset>
    <legend>Quero receber</legend>
    <label><input type="checkbox" name="avisos" value="novidades"> Novidades</label><br>
    <label><input type="checkbox" name="avisos" value="promocoes"> Promoções</label>
  </fieldset>

  <button type="submit">Confirmar</button>
</form>`,
      explicacao: [
        'Os três radios compartilham `name="pagamento"`: só um pode estar marcado. O atributo `checked` define o padrão.',
        'Aqui o `label` **envolve** o campo, então não precisa de `for` e `id`.',
        'Se "Novidades" e "Promoções" estiverem marcados, o navegador envia dois pares: `avisos=novidades&avisos=promocoes`.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o atributo `name` nos campos.", porque: "O campo não é enviado e o servidor não recebe o dado.", correcao: "dê um `name` a todo campo que precise ser enviado." },
    { erro: "Usar o `placeholder` no lugar do `label`.", porque: "O placeholder some ao digitar, tem contraste baixo e nem sempre é lido como nome do campo.", correcao: "use sempre um `label` visível; o placeholder, se houver, serve só de exemplo." },
    { erro: "`for` do label diferente do `id` do campo (ou `id` repetido).", porque: "A associação não funciona: clicar no texto não faz nada e o leitor de tela não anuncia o nome.", correcao: "confira que `for` e `id` são idênticos e que cada `id` é único." },
    { erro: "Não definir `type` em botões dentro de um formulário.", porque: "O padrão de `<button>` é `submit`: um botão \"inocente\" pode enviar o formulário sem querer.", correcao: "declare `type=\"button\"` nos botões que não enviam." },
    { erro: "Enviar senhas ou dados pessoais com `method=\"get\"`.", porque: "Os dados aparecem na URL, no histórico do navegador e em registros de servidores.", correcao: "use `method=\"post\"` e HTTPS." }
  ],
  praticas: [
    'Todo campo tem um `label` visível, associado por `for`/`id` ou por envolvimento.',
    'Use `name` significativos e consistentes com o que o servidor espera.',
    'Agrupe opções relacionadas com `fieldset` e `legend`.',
    'Declare sempre o `type` dos botões.',
    'Use `autocomplete` para ajudar o usuário a preencher dados conhecidos (veremos na aula de acessibilidade).'
  ],
  exercicios: [
    { titulo: "Formulário de inscrição",
      enunciado: 'Construa um formulário de inscrição em um evento com: nome, e-mail, escolha da trilha (Front-end, Back-end ou Design, em lista de seleção), forma de participação (presencial ou online, em rádio) e um campo de comentário. Use `method="post"`.',
      dica: 'Rádios com o mesmo `name`. Cada campo com `label`.',
      resolucao: { lang: "html", codigo: `
<form action="/inscricao" method="post">
  <p><label for="nome">Nome</label><br><input id="nome" name="nome" type="text"></p>
  <p><label for="email">E-mail</label><br><input id="email" name="email" type="email"></p>
  <p>
    <label for="trilha">Trilha</label><br>
    <select id="trilha" name="trilha">
      <option value="front">Front-end</option>
      <option value="back">Back-end</option>
      <option value="design">Design</option>
    </select>
  </p>
  <fieldset>
    <legend>Forma de participação</legend>
    <label><input type="radio" name="participacao" value="presencial" checked> Presencial</label>
    <label><input type="radio" name="participacao" value="online"> Online</label>
  </fieldset>
  <p><label for="comentario">Comentário</label><br><textarea id="comentario" name="comentario" rows="4"></textarea></p>
  <button type="submit">Inscrever-me</button>
</form>`,
        comentario: 'Cada campo tem `label`, `name` e (quando preciso) `id`. A participação usa `fieldset`/`legend` e rádios de mesmo `name`, de modo que só uma opção é possível. O botão tem `type="submit"` explícito.' } },
    { titulo: "O que será enviado?",
      enunciado: 'Um formulário `method="get"` tem: `<input name="q">` preenchido com "html básico", dois checkboxes `name="nivel"` com valores `iniciante` e `avancado`, e o segundo está marcado, e um campo `<input name="cupom" disabled>` preenchido com "ABC". Escreva a URL de consulta gerada (`?...`).',
      dica: 'Campos desabilitados e checkboxes desmarcados não são enviados.',
      resolucao: { lang: "txt", codigo: "?q=html+b%C3%A1sico&nivel=avancado",
        comentario: 'O espaço vira `+` e o `á` é codificado em UTF-8 (`%C3%A1`). Apenas o checkbox marcado é enviado (`nivel=avancado`). O campo `cupom` está `disabled` e, por isso, fica de fora.' } }
  ],
  referencias: [
    { t: "O elemento form", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/form", fonte: "MDN Web Docs" },
    { t: "O elemento label", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/label", fonte: "MDN Web Docs" },
    { t: "Tutorial de formulários acessíveis: rótulos", u: "https://www.w3.org/WAI/tutorials/forms/labels/", fonte: "W3C WAI" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a2", titulo: "Tipos de campos e validação nativa", minutos: 55,
  topicos: ["Tipos de campos", "Validação nativa"],
  objetivos: [
    "Escolher o `type` de `input` adequado a cada dado.",
    "Usar atributos como `required`, `min`, `max`, `minlength`, `maxlength` e `pattern`.",
    "Entender como a validação nativa bloqueia o envio e exibe mensagens.",
    "Explicar por que a validação do navegador não substitui a do servidor."
  ],
  conceito: [
    { h: "Por que existem tantos tipos" },
    { p: 'O `type` do `<input>` diz ao navegador **que tipo de dado** é esperado. Em troca, ele oferece teclado adequado em celulares, controles prontos (como seletor de data) e validação automática.' },
    { lista: [
      'Texto: `text`, `email`, `url`, `tel`, `search`, `password`.',
      'Números: `number` (com `min`, `max`, `step`) e `range` (controle deslizante).',
      'Data e hora: `date`, `time`, `datetime-local`, `month`, `week`.',
      'Escolha: `checkbox` (zero ou mais opções), `radio` (uma opção do grupo).',
      'Outros: `file` (arquivos, com `accept` e `multiple`), `color`, `hidden` (valor que o usuário não vê).'
    ] },
    { nota: { t: "Número nem sempre é `type=\"number\"`", x: 'CPF, CEP, telefone e códigos **não são quantidades**: não se somam nem se incrementam, e podem começar com zero. Para eles, use `type="text"` (ou `tel`) com `inputmode="numeric"` e `pattern`. `type="number"` é para quantidades.' } },
    { h: "Atributos de validação" },
    { lista: [
      '`required`: campo obrigatório.',
      '`minlength` e `maxlength`: tamanho mínimo e máximo de texto.',
      '`min`, `max` e `step`: limites e passos de números e datas.',
      '`pattern`: expressão regular que o valor deve satisfazer por inteiro. Combine com `title` para explicar o formato esperado.',
      '`type="email"` e `type="url"` já validam o formato básico.'
    ] },
    { h: "Como a validação nativa funciona" },
    { p: 'Ao tentar enviar, o navegador verifica cada campo. Se algum for inválido, **bloqueia o envio**, foca o primeiro campo com problema e mostra uma mensagem. Isso acontece sem uma linha de JavaScript. Você pode estilizar os estados com os seletores CSS `:valid` e `:invalid`; em navegadores modernos, `:user-invalid` só se aplica depois que o usuário interage com o campo, o que evita mostrar erros antes da hora. O atributo `novalidate` no `<form>` desliga a validação nativa, útil quando você a faz por conta própria em JavaScript.' },
    { h: "Outros atributos úteis" },
    { lista: [
      '`placeholder`: dica de exemplo (não substitui o `label`).',
      '`readonly`: o usuário vê mas não edita, e o valor **é** enviado. `disabled`: o campo fica inativo e **não** é enviado.',
      '`autocomplete`: ajuda o navegador a preencher dados (`name`, `email`, `tel`...).',
      '`list` + `<datalist>`: sugestões de valores, sem impedir outros.'
    ] },
    { nota: { t: "Validação do cliente não é segurança", x: 'Quem controla o navegador pode contornar qualquer regra do HTML (editando a página ou enviando a requisição diretamente). A validação do navegador melhora a **experiência**; a validação real, de segurança, precisa ser refeita no **servidor**.' } }
  ],
  exemplos: [
    { titulo: "Formulário de cadastro com vários tipos", lang: "html", arquivo: "cadastro.html",
      codigo: `
<form action="/cadastro" method="post">
  <p><label for="nome">Nome completo</label><br>
     <input id="nome" name="nome" type="text" required minlength="3" autocomplete="name"></p>

  <p><label for="email">E-mail</label><br>
     <input id="email" name="email" type="email" required autocomplete="email"></p>

  <p><label for="nasc">Data de nascimento</label><br>
     <input id="nasc" name="nascimento" type="date" min="1920-01-01" max="2012-12-31"></p>

  <p><label for="qtd">Quantidade de ingressos (1 a 5)</label><br>
     <input id="qtd" name="quantidade" type="number" min="1" max="5" value="1"></p>

  <p><label for="site">Site pessoal</label><br>
     <input id="site" name="site" type="url" placeholder="https://"></p>

  <p><label for="cor">Cor preferida</label><br>
     <input id="cor" name="cor" type="color" value="#336699"></p>

  <p><label><input type="checkbox" name="termos" required> Li e aceito os termos de uso</label></p>

  <button type="submit">Cadastrar</button>
</form>`,
      explicacao: [
        'Se o usuário tentar enviar com o campo "Nome" em branco, o navegador bloqueia e avisa. Sem JavaScript.',
        '`type="email"` rejeita valores sem `@` e domínio; `type="url"` exige um endereço completo.',
        '`min` e `max` em `date` e `number` limitam o intervalo aceito.',
        'O checkbox com `required` precisa estar marcado para o envio.'
      ] },
    { titulo: "Padrões com pattern", lang: "html", arquivo: "pattern.html",
      codigo: `
<p>
  <label for="cep">CEP</label><br>
  <input id="cep" name="cep" type="text" inputmode="numeric"
         pattern="[0-9]{5}-?[0-9]{3}" maxlength="9"
         title="Informe 8 números, com ou sem hífen. Exemplo: 01310-100" required>
</p>
<p>
  <label for="user">Nome de usuário (letras minúsculas e números, 4 a 12 caracteres)</label><br>
  <input id="user" name="usuario" type="text"
         pattern="[a-z0-9]{4,12}" title="Use de 4 a 12 letras minúsculas ou números" required>
</p>`,
      explicacao: [
        '`[0-9]{5}-?[0-9]{3}` quer dizer: cinco dígitos, um hífen opcional (`-?`) e três dígitos.',
        'O `pattern` precisa casar com o valor **inteiro**: o navegador o trata como se estivesse entre `^` e `$`.',
        'O `title` entra na mensagem de erro, explicando o formato. Sem ele, o usuário só vê um aviso genérico.',
        'Usamos `type="text"` com `inputmode="numeric"` porque CEP não é quantidade: o teclado numérico aparece, mas zeros à esquerda são preservados.'
      ] },
    { titulo: "Sugestões com datalist e envio de arquivos", lang: "html", arquivo: "datalist.html",
      codigo: `
<p>
  <label for="curso">Curso de interesse</label><br>
  <input id="curso" name="curso" list="lista-cursos" autocomplete="off">
  <datalist id="lista-cursos">
    <option value="HTML5">
    <option value="CSS3">
    <option value="JavaScript">
  </datalist>
</p>
<p>
  <label for="anexos">Anexe até 3 imagens</label><br>
  <input id="anexos" name="anexos" type="file" accept="image/png, image/jpeg" multiple>
</p>`,
      explicacao: [
        'O `<datalist>` oferece sugestões ao digitar, mas o usuário pode escrever outro valor.',
        '`accept` restringe o seletor de arquivos aos tipos indicados (é uma ajuda, não uma garantia: o servidor deve conferir).',
        '`multiple` permite escolher mais de um arquivo.',
        'Para enviar arquivos, o `<form>` deve ter `method="post"` e `enctype="multipart/form-data"`.'
      ] }
  ],
  erros: [
    { erro: "Confiar só na validação do HTML.", porque: "Ela pode ser contornada com facilidade.", correcao: "valide também no servidor." },
    { erro: "Usar `type=\"number\"` para CPF, telefone ou CEP.", porque: "Remove zeros à esquerda, mostra setas de incremento e aceita caracteres como `e`.", correcao: "use `type=\"text\"` ou `tel`, com `inputmode=\"numeric\"` e `pattern`." },
    { erro: "Usar `maxlength` em `type=\"number\"`.", porque: "O atributo não se aplica a números.", correcao: "use `min` e `max`." },
    { erro: "Usar `pattern` sem `title`.", porque: "A mensagem padrão não explica o formato esperado.", correcao: "descreva o formato no `title` (e na instrução visível do campo)." },
    { erro: "Marcar `disabled` num campo cujo valor precisa ser enviado.", porque: "Campos desabilitados não entram no envio.", correcao: "use `readonly`, se o usuário não deve editar mas o valor deve seguir." },
    { erro: "Usar o `placeholder` para instruções essenciais.", porque: "Ele desaparece ao digitar.", correcao: "coloque instruções permanentes no `label` ou em texto de ajuda visível." }
  ],
  praticas: [
    'Escolha o `type` pelo significado do dado: isso dá teclado, controles e validação de graça.',
    'Escreva instruções de formato fora do campo, em texto visível, e repita no `title` do `pattern`.',
    'Use `required` e demais restrições, mas valide de novo no servidor.',
    'Use `autocomplete` com os tokens corretos (`name`, `email`, `tel`, `postal-code`...).'
  ],
  exercicios: [
    { titulo: "Cadastro com validação",
      enunciado: 'Escreva um formulário de cadastro com: nome (obrigatório, 3 a 60 caracteres); e-mail (obrigatório); idade (número de 16 a 99); site (opcional, URL); e CEP (obrigatório, 8 dígitos, com ou sem hífen). Inclua `label` em todos os campos.',
      dica: '`minlength`/`maxlength` para texto; `min`/`max` para número; `pattern` para o CEP.',
      resolucao: { lang: "html", codigo: `
<form action="/cadastro" method="post">
  <p><label for="n">Nome</label><br>
     <input id="n" name="nome" type="text" required minlength="3" maxlength="60" autocomplete="name"></p>
  <p><label for="e">E-mail</label><br>
     <input id="e" name="email" type="email" required autocomplete="email"></p>
  <p><label for="i">Idade (16 a 99)</label><br>
     <input id="i" name="idade" type="number" min="16" max="99"></p>
  <p><label for="s">Site (opcional)</label><br>
     <input id="s" name="site" type="url" placeholder="https://"></p>
  <p><label for="c">CEP</label><br>
     <input id="c" name="cep" type="text" inputmode="numeric" pattern="[0-9]{5}-?[0-9]{3}"
            title="8 números, com ou sem hífen" required autocomplete="postal-code"></p>
  <button type="submit">Cadastrar</button>
</form>`,
        comentario: 'Texto usa `minlength`/`maxlength`; idade usa `min`/`max` em `type="number"`; site é opcional (sem `required`), mas `type="url"` valida o formato quando preenchido. O CEP é `text` com `pattern` e `title`, pois não é uma quantidade.' } },
    { titulo: "Qual atributo resolve?",
      enunciado: 'Indique o atributo ou o `type` para cada necessidade: (a) impedir envio com o campo vazio; (b) aceitar apenas datas a partir de hoje; (c) o campo aparece mas o usuário não pode alterar, e o valor ainda assim deve ser enviado; (d) permitir mais de um arquivo; (e) que o teclado do celular mostre `@`.',
      dica: 'Revise a seção "Outros atributos úteis".',
      resolucao: { lang: "", codigo: "",
        comentario: '(a) `required`. (b) `type="date"` com `min` igual à data de hoje no formato `AAAA-MM-DD`. (c) `readonly` (e não `disabled`, que não enviaria o valor). (d) `multiple` em `type="file"`. (e) `type="email"`, que aciona o teclado adequado.' } }
  ],
  referencias: [
    { t: "O elemento input e seus tipos", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input", fonte: "MDN Web Docs" },
    { t: "Atributo pattern", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Attributes/pattern", fonte: "MDN Web Docs" },
    { t: "Tutorial de formulários acessíveis: validação", u: "https://www.w3.org/WAI/tutorials/forms/validation/", fonte: "W3C WAI" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m3a3", titulo: "Acessibilidade de formulários", minutos: 45,
  topicos: ["Acessibilidade de formulários"],
  objetivos: [
    "Garantir que todo campo tenha nome, instruções e estado compreensíveis por leitores de tela.",
    "Associar instruções e mensagens de erro aos campos com `aria-describedby`.",
    "Usar `autocomplete`, ordem de foco natural e foco visível.",
    "Auditar um formulário usando apenas o teclado."
  ],
  conceito: [
    { h: "Por que formulários são o ponto crítico" },
    { p: 'Formulários são onde a acessibilidade mais pesa, pois é neles que o usuário **cadastra, compra e pede ajuda**. Se um campo não tem nome claro ou se um erro só é indicado pela cor vermelha, parte das pessoas simplesmente não consegue concluir a tarefa. A boa notícia é que o HTML correto resolve a maior parte do problema.' },
    { h: "Nome, instruções e erros" },
    { lista: [
      '**Nome**: todo campo precisa de um `label` visível e associado.',
      '**Instruções**: formatos e regras devem aparecer **antes** do preenchimento, em texto visível, ligadas ao campo com `aria-describedby`.',
      '**Obrigatoriedade**: além de `required`, indique no texto: "(obrigatório)". Não dependa de um asterisco colorido.',
      '**Erros**: escreva mensagens em texto, claras e específicas ("Informe um e-mail no formato nome@dominio.com"), ligadas ao campo (`aria-describedby`) e marcadas com `aria-invalid="true"`. Nunca use só a cor para sinalizar erro.'
    ] },
    { h: "Agrupamento e ordem" },
    { lista: [
      'Use `fieldset` e `legend` para grupos de rádios e checkboxes.',
      'A ordem do código é a ordem do **foco** (tecla `Tab`): mantenha a ordem do HTML igual à ordem visual e **evite `tabindex` positivo**, que bagunça a navegação.',
      'O foco precisa ser **visível**. Remover o contorno (`outline`) sem colocar algo no lugar é uma barreira séria.'
    ] },
    { h: "Preenchimento automático e alvos de clique" },
    { p: 'O atributo `autocomplete` com os tokens corretos (`name`, `email`, `tel`, `postal-code`, `street-address`...) reduz esforço e ajuda quem tem dificuldade motora ou cognitiva. Botões e campos devem ter área de toque confortável, e o texto do botão deve dizer o que ele faz ("Criar conta", e não "Enviar").' },
    { nota: { t: "Teste sem mouse", x: 'O melhor teste simples é preencher o formulário só com o teclado: `Tab` avança, `Shift+Tab` volta, `Espaço` marca, `Enter` envia. Se algo não puder ser alcançado, não é acessível.' } }
  ],
  exemplos: [
    { titulo: "Campo com ajuda e erro associados", lang: "html", arquivo: "campo-acessivel.html",
      codigo: `
<p>
  <label for="senha">Senha <span>(obrigatório)</span></label><br>
  <input id="senha" name="senha" type="password" required minlength="8"
         autocomplete="new-password"
         aria-describedby="senha-ajuda senha-erro" aria-invalid="true">
</p>
<p id="senha-ajuda">Use pelo menos 8 caracteres.</p>
<p id="senha-erro">Erro: a senha tem apenas 5 caracteres. Digite pelo menos 8.</p>`,
      explicacao: [
        '`aria-describedby` lista os `id` dos textos que descrevem o campo. O leitor de tela os anuncia depois do nome: "Senha, obrigatório, edição, Use pelo menos 8 caracteres..."',
        '`aria-invalid="true"` informa o estado de erro; só deve estar presente enquanto houver erro.',
        'A mensagem de erro é **texto** e diz o que aconteceu e como corrigir, e não depende de cor.',
        '`autocomplete="new-password"` permite que gerenciadores de senha sugiram uma senha nova.'
      ] },
    { titulo: "Grupo de opções com legenda", lang: "html", arquivo: "grupo-acessivel.html",
      codigo: `
<fieldset>
  <legend>Como prefere ser contatado?</legend>
  <p><label><input type="radio" name="contato" value="email" checked> Por e-mail</label></p>
  <p><label><input type="radio" name="contato" value="telefone"> Por telefone</label></p>
  <p><label><input type="radio" name="contato" value="nenhum"> Não quero contato</label></p>
</fieldset>`,
      explicacao: [
        'O leitor de tela anuncia: "Como prefere ser contatado?, grupo; Por e-mail, botão de opção, selecionado, 1 de 3".',
        'Sem `fieldset`/`legend`, a pergunta ficaria desconectada das opções.',
        'Cada `label` envolve seu rádio, o que também aumenta a área de clique.'
      ] },
    { titulo: "Formulário de contato acessível completo", lang: "html", arquivo: "contato-acessivel.html",
      codigo: `
<form action="/contato" method="post">
  <h2>Fale conosco</h2>
  <p>Campos marcados com <strong>(obrigatório)</strong> devem ser preenchidos.</p>

  <p>
    <label for="c-nome">Nome <strong>(obrigatório)</strong></label><br>
    <input id="c-nome" name="nome" type="text" required autocomplete="name">
  </p>
  <p>
    <label for="c-email">E-mail <strong>(obrigatório)</strong></label><br>
    <input id="c-email" name="email" type="email" required autocomplete="email"
           aria-describedby="c-email-ajuda">
    <span id="c-email-ajuda">Exemplo: ana@exemplo.com</span>
  </p>
  <p>
    <label for="c-tel">Telefone (opcional)</label><br>
    <input id="c-tel" name="telefone" type="tel" autocomplete="tel">
  </p>
  <p>
    <label for="c-msg">Mensagem <strong>(obrigatório)</strong></label><br>
    <textarea id="c-msg" name="mensagem" rows="5" required></textarea>
  </p>
  <button type="submit">Enviar mensagem</button>
</form>`,
      explicacao: [
        'Todos os campos têm `label` visível, e a obrigatoriedade aparece em **texto**.',
        'O exemplo de formato do e-mail é anunciado pelo `aria-describedby`.',
        '`autocomplete` usa tokens padronizados.',
        'O botão diz exatamente o que faz.',
        'Nenhum `tabindex` foi usado: a ordem de foco é a ordem do código.'
      ] }
  ],
  erros: [
    { erro: "Usar apenas `placeholder` para nomear campos.", porque: "Ele some ao digitar e é lido de forma inconsistente.", correcao: "use `label` visível." },
    { erro: "Sinalizar erro só com cor (borda vermelha).", porque: "Pessoas com daltonismo ou que usam leitor de tela não percebem.", correcao: "escreva a mensagem em texto, associe ao campo e use também ícone ou rótulo \"Erro\"." },
    { erro: "Usar `tabindex` positivo (`tabindex=\"5\"`).", porque: "A ordem do foco deixa de seguir o documento e fica imprevisível.", correcao: "organize o HTML na ordem visual e use apenas `tabindex=\"0\"` ou `\"-1\"` quando realmente necessário." },
    { erro: "Remover o contorno de foco (`outline: none`) sem substituto.", porque: "Quem navega pelo teclado perde a noção de onde está.", correcao: "mantenha o contorno padrão ou crie um indicador de foco bem visível." },
    { erro: "Mensagens genéricas, como \"Campo inválido\".", porque: "Não dizem o que corrigir.", correcao: "explique o problema e a correção: \"Informe o CEP com 8 números\"." },
    { erro: "Usar `div` clicável no lugar de `button`.", porque: "Não recebe foco nem responde ao teclado por padrão.", correcao: "use `<button>` para ações e `<a>` para navegação." }
  ],
  praticas: [
    'Dê um `label` visível a cada campo e coloque instruções antes do preenchimento.',
    'Associe ajuda e erros com `aria-describedby`, e indique `aria-invalid` apenas quando houver erro.',
    'Preserve a ordem natural do foco e um indicador de foco visível.',
    'Use `autocomplete` correto e botões com ações explícitas.',
    'Teste sempre usando só o teclado e, quando possível, com um leitor de tela.'
  ],
  exercicios: [
    { titulo: "Audite este formulário",
      enunciado: 'Liste todos os problemas de acessibilidade do trecho abaixo.',
      codigo: { lang: "html", x: `
<form>
  <input type="text" placeholder="Nome">
  <input type="email" placeholder="E-mail" tabindex="3" style="border: 1px solid red">
  <div onclick="enviar()">Enviar</div>
</form>` },
      dica: 'Procure por: nome dos campos, name, ordem de foco, elemento do botão, erro só por cor.',
      resolucao: { lang: "", codigo: "",
        comentario: '(1) Nenhum campo tem `label`: o `placeholder` não serve de nome. (2) Campos sem `name` não seriam enviados. (3) `tabindex="3"` bagunça a ordem do foco. (4) A borda vermelha é o único sinal de problema, sem texto. (5) O "botão" é um `div` com `onclick`: não recebe foco nem funciona com o teclado. (6) Falta `autocomplete` nos campos de nome e e-mail. (7) Não há indicação de quais campos são obrigatórios.' } },
    { titulo: "Corrija o formulário",
      enunciado: 'Reescreva o formulário do exercício anterior sem os problemas listados.',
      dica: 'Use label, name, autocomplete e um botão de verdade.',
      resolucao: { lang: "html", codigo: `
<form action="/contato" method="post">
  <p><label for="a-nome">Nome <strong>(obrigatório)</strong></label><br>
     <input id="a-nome" name="nome" type="text" required autocomplete="name"></p>
  <p><label for="a-email">E-mail <strong>(obrigatório)</strong></label><br>
     <input id="a-email" name="email" type="email" required autocomplete="email"
            aria-describedby="a-email-ajuda">
     <span id="a-email-ajuda">Exemplo: ana@exemplo.com</span></p>
  <button type="submit">Enviar</button>
</form>`,
        comentario: 'Cada campo ganhou `label`, `name` e `autocomplete`; o `tabindex` foi removido; o `div` virou `<button type="submit">` (focável e acionável por teclado); a obrigatoriedade aparece em texto; a dica de formato é associada com `aria-describedby`. Para erros em tempo de execução, use uma mensagem em texto associada ao campo, como visto no exemplo 1.' } }
  ],
  referencias: [
    { t: "Tutorial de formulários acessíveis: instruções", u: "https://www.w3.org/WAI/tutorials/forms/instructions/", fonte: "W3C WAI" },
    { t: "Tutorial de formulários acessíveis (visão geral)", u: "https://www.w3.org/WAI/tutorials/forms/", fonte: "W3C WAI" },
    { t: "Atributo autocomplete", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Attributes/autocomplete", fonte: "MDN Web Docs" }
  ]
}

] });
