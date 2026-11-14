/* Projetos práticos. Não há correção automática: o aluno confere o checklist e registra o que entregou. */

AE.Projetos.registrar("html", {
  titulo: "Página institucional",
  objetivo: "Construir uma página institucional completa e acessível, em HTML puro, aplicando estrutura semântica, formulário, tabela, mídia e metadados.",
  briefing: [
    "Escolha uma organização real ou fictícia (uma padaria, uma escola de música, um estúdio, um coletivo). Você será responsável por escrever a página que a apresenta.",
    "A página deve funcionar em um único arquivo `index.html`, com textos próprios (sem *lorem ipsum*) e sem depender de CSS ou JavaScript. A aparência virá no curso de CSS3.",
    "Imagens e vídeos podem ser de sua autoria ou de bancos com licença livre. Registre a fonte e a licença no rodapé."
  ],
  requisitos: [
    "Documento válido: `doctype`, `lang`, `charset`, `viewport`, `title` único e `meta description`.",
    "Estrutura semântica: `header`, `nav` (com pelo menos 4 links âncora para as seções), `main`, pelo menos 3 `section` e `footer`. Um único `h1` e hierarquia de títulos sem saltos.",
    "Seção \"Sobre\": texto com pelo menos 2 parágrafos e uma imagem com `alt` apropriado (`width` e `height` declarados).",
    "Seção \"Serviços\" ou \"Preços\": uma tabela de dados com `caption`, `thead`, `tbody` e `th` com `scope`.",
    "Seção \"Contato\": formulário com `label` associado em todos os campos, `name`, `required` onde fizer sentido, `type` adequados e `autocomplete`.",
    "Pelo menos um recurso de multimídia (vídeo com legendas `track`, áudio ou imagem responsiva com `srcset`).",
    "Link \"Ir para o conteúdo principal\" no início da página.",
    "Sem `div` desnecessária, sem `style` inline e sem tabelas para layout.",
    "Validado no validador de marcação do W3C, sem erros."
  ],
  etapas: [
    { t: "1. Planejar o conteúdo", x: "Liste as seções, escreva o rascunho dos textos e escolha as imagens. Defina o título e a descrição da página." },
    { t: "2. Esqueleto do documento", x: "Monte `doctype`, `html lang`, `head` completo e `body` com as regiões `header`, `main` e `footer`." },
    { t: "3. Conteúdo e semântica", x: "Escreva as seções com títulos, parágrafos, listas, imagens e links âncora. Revise a hierarquia de títulos." },
    { t: "4. Tabela e multimídia", x: "Crie a tabela de serviços ou preços e incorpore o recurso de mídia com alternativa em texto." },
    { t: "5. Formulário", x: "Construa o formulário de contato, teste a validação nativa e o preenchimento só com o teclado." },
    { t: "6. Revisão", x: "Valide no W3C, navegue com `Tab`, aumente o zoom para 200% e percorra a lista de verificação da aula 4.3." }
  ],
  criterios: [
    { c: "Estrutura e semântica", d: "Uso correto de landmarks, títulos e listas; ausência de `div` sem função." },
    { c: "Acessibilidade", d: "`alt`, `label`, `lang`, link de pular conteúdo, ordem de foco natural e alternativas em texto para mídia." },
    { c: "Formulário e tabela", d: "Campos com tipos e validações adequados; tabela de dados com cabeçalhos corretos." },
    { c: "Metadados e validade", d: "Cabeçalho completo e documento sem erros de validação." },
    { c: "Qualidade do conteúdo", d: "Textos claros, próprios e coerentes com a organização escolhida." }
  ],
  checklist: [
    "O documento tem `doctype`, `lang=\"pt-BR\"`, `charset` e `viewport`",
    "O `title` e a `meta description` são únicos e descritivos",
    "Há `header`, `nav`, `main`, 3 ou mais `section` e `footer`",
    "Existe um único `h1` e os títulos não pulam níveis",
    "O `nav` tem pelo menos 4 links âncora que funcionam",
    "A imagem principal tem `alt`, `width` e `height`",
    "A tabela tem `caption`, `thead`, `tbody` e `th` com `scope`",
    "Todos os campos do formulário têm `label`, `name` e `type` adequado",
    "O formulário bloqueia o envio incompleto (validação nativa)",
    "Há ao menos um recurso de multimídia com alternativa em texto",
    "O link \"Ir para o conteúdo principal\" funciona",
    "Não há `style` inline nem `div` desnecessária",
    "O validador do W3C não aponta erros",
    "Consegui usar a página inteira só com o teclado"
  ]
});

AE.Projetos.registrar("css", {
  titulo: "Transformar uma página HTML em um site responsivo",
  objetivo: "Estilizar do zero a página institucional do curso de HTML5 (ou outra página sua), transformando-a em um site visualmente consistente, responsivo e acessível, apenas com CSS.",
  briefing: [
    "Parta de uma página HTML semântica e sem estilos (o projeto do curso de HTML5 serve). Não altere a estrutura além do necessário, como incluir classes e o `<link>` do CSS.",
    "O objetivo é construir um **sistema visual**: variáveis, tipografia, espaçamento e componentes coerentes. O resultado deve funcionar em celular, tablet e desktop.",
    "Não use frameworks nem bibliotecas de CSS: o objetivo é demonstrar domínio dos fundamentos."
  ],
  requisitos: [
    "Arquivo CSS externo organizado em seções (variáveis, reset/base, layout, componentes, utilitários) e comentado.",
    "Variáveis CSS para cores, espaçamentos e raios; `box-sizing: border-box` global.",
    "Tipografia em `rem`, `line-height` adequado, medida de leitura limitada (`ch`) e hierarquia clara de títulos.",
    "Layout Mobile First com pelo menos 2 breakpoints (em `rem`, com `min-width`), usando grid para a estrutura e flex em componentes.",
    "Pelo menos 3 componentes reutilizáveis (por exemplo: botão, cartão, alerta ou menu) com variações via modificadores ou variáveis.",
    "Imagens e tabelas que não estouram a tela (`max-width`, `aspect-ratio`, contêiner rolável).",
    "Acessibilidade visual: contraste mínimo de 4,5:1 no texto, foco visível, alvos de toque confortáveis, informação nunca só por cor.",
    "Pelo menos uma transição de interface (`transform`/`opacity`) e tratamento de `prefers-reduced-motion`.",
    "Sem `!important` (exceto no bloco de movimento reduzido), sem seletores de `id` para estilização e sem CSS inline."
  ],
  etapas: [
    { t: "1. Preparar", x: "Copie a página HTML, adicione o `<link>` e as classes necessárias. Defina a paleta e a escala tipográfica." },
    { t: "2. Fundamentos", x: "Escreva as variáveis, o reset e a base: tipografia, links, listas, imagens e tabelas." },
    { t: "3. Layout", x: "Monte a estrutura da página com grid (cabeçalho, conteúdo, rodapé) e organize o menu com flex, primeiro para celular." },
    { t: "4. Componentes", x: "Crie botão, cartão e um terceiro componente, com variações e estados (`:hover`, `:focus-visible`, `:disabled`)." },
    { t: "5. Responsividade", x: "Acrescente os breakpoints `min-width`, teste de 320px a 1440px e com zoom de 200%, e corrija estouros." },
    { t: "6. Acessibilidade e movimento", x: "Verifique contraste e foco, trate `prefers-reduced-motion` e navegue pelo teclado." }
  ],
  criterios: [
    { c: "Organização e manutenibilidade", d: "CSS em camadas, nomes consistentes, baixa especificidade, variáveis bem usadas." },
    { c: "Layout responsivo", d: "Mobile First, grid/flex usados com propósito, sem estouro horizontal em 320px nem com zoom de 200%." },
    { c: "Componentes", d: "Reutilizáveis, com variações e todos os estados necessários." },
    { c: "Acessibilidade visual", d: "Contraste, foco, alvos de toque, segundo indicador além da cor, movimento reduzido." },
    { c: "Qualidade visual", d: "Hierarquia, espaçamento e consistência entre as páginas." }
  ],
  checklist: [
    "O CSS está em arquivo externo, organizado e comentado",
    "Há variáveis para cores, espaçamentos e raios, e `box-sizing: border-box` global",
    "As fontes estão em `rem` e as linhas de texto têm no máximo cerca de 65ch",
    "O layout parte do celular e usa `min-width` em pelo menos 2 breakpoints",
    "A estrutura usa grid e os componentes usam flex ou grid com propósito",
    "Há pelo menos 3 componentes reutilizáveis com variações",
    "Imagens e tabelas não geram rolagem horizontal",
    "Não há rolagem horizontal em 320px nem com zoom de 200%",
    "O contraste do texto é de pelo menos 4,5:1 (conferi com uma ferramenta)",
    "Todos os elementos interativos têm foco visível",
    "Nenhuma informação depende só da cor",
    "As animações usam `transform`/`opacity` e respeitam `prefers-reduced-motion`",
    "Não há `!important` indevido, `id` em seletores nem CSS inline"
  ]
});

AE.Projetos.registrar("javascript", {
  titulo: "Aplicação interativa de tarefas e leitura de API",
  objetivo: "Construir uma aplicação web em JavaScript puro que valide um formulário, atualize a interface a partir de um estado, consuma uma API pública com tratamento de erros e guarde preferências no navegador.",
  briefing: [
    "Você vai criar um pequeno \"painel de estudos\": uma lista de tarefas com formulário validado, um bloco que carrega dados de uma API pública e um botão de tema que lembra a escolha do usuário.",
    "Use apenas HTML, CSS e JavaScript (módulos nativos). Sem bibliotecas, sem frameworks. Para testar os módulos, sirva a pasta por HTTP (por exemplo, `python3 -m http.server`).",
    "Use uma API pública de testes (como `jsonplaceholder.typicode.com`) e deixe claro, na própria página, que os dados vêm dela. Não use chaves de API nem dados reais de pessoas."
  ],
  requisitos: [
    "Código dividido em pelo menos 3 módulos ES (`import`/`export`): por exemplo, `estado.js`, `render.js`, `api.js`, com `app.js` como ponto de entrada.",
    "Formulário de nova tarefa com validação em JavaScript: campo obrigatório, mínimo de caracteres, mensagem de erro associada com `aria-describedby`, `aria-invalid` e foco no primeiro erro.",
    "Estado em uma estrutura de dados única (array de objetos) e função de renderização a partir dele; marcar como feita e remover, com delegação de eventos.",
    "Nenhum dado do usuário ou da API inserido com `innerHTML` (use `textContent`/`createElement`).",
    "Um bloco que carrega dados da API com `fetch` + `async/await`: estados de carregando, erro e sucesso; verificação de `resposta.ok`; limite de tempo com `AbortSignal.timeout`.",
    "Uma região `role=\"status\"` que anuncia ações e estados (tarefa adicionada, carregando, erro).",
    "Persistência com `localStorage`: tarefas e tema, com `try...catch`, valor padrão e validação do formato ao ler; botão para apagar os dados salvos.",
    "Funciona só com o teclado e sem erros no console; funções puras (validação, filtros) separadas da interface."
  ],
  etapas: [
    { t: "1. Planejar", x: "Desenhe os dados (formato de uma tarefa), as telas e a divisão em módulos. Decida o que é estado, o que é interface e o que é acesso à API." },
    { t: "2. Estrutura HTML", x: "Escreva o HTML semântico: formulário com `label`, lista, região de status, bloco da API e botão de tema." },
    { t: "3. Estado e renderização", x: "Crie o módulo de estado (adicionar, alternar, remover) e a função que renderiza a lista a partir dele." },
    { t: "4. Formulário e validação", x: "Implemente a validação com mensagens acessíveis e teste os casos vazio, curto e válido." },
    { t: "5. API", x: "Crie `api.js` com `obterJson`, trate rede, tempo, status e JSON inválido, e mostre os três estados na página." },
    { t: "6. Persistência", x: "Salve e restaure tarefas e tema, com validação ao ler. Teste recarregando a página e com o armazenamento limpo." },
    { t: "7. Revisão", x: "Percorra tudo só com o teclado, teste a falha da API (desconecte a rede) e revise o console." }
  ],
  criterios: [
    { c: "Organização do código", d: "Módulos coesos, funções pequenas, nomes claros, sem variáveis globais e sem dependências circulares." },
    { c: "Correção e robustez", d: "Estados de carregamento e erro, validação de entradas e dados lidos, sem exceções não tratadas." },
    { c: "Manipulação do DOM", d: "Renderização a partir do estado, delegação de eventos, sem `innerHTML` com dados externos." },
    { c: "Assincronia e API", d: "Uso correto de `async/await`, `resposta.ok`, tempo limite e mensagens úteis ao usuário." },
    { c: "Acessibilidade e privacidade", d: "Foco, mensagens associadas, região de status, uso só do teclado e nenhum dado sensível no `localStorage`." }
  ],
  checklist: [
    "O código está dividido em pelo menos 3 módulos ES e é servido por HTTP",
    "O formulário valida no JavaScript e associa as mensagens ao campo (`aria-describedby`, `aria-invalid`)",
    "O foco vai ao primeiro campo com erro",
    "A lista é renderizada a partir de um estado único",
    "Eventos da lista usam delegação",
    "Nenhum `innerHTML` recebe dados do usuário ou da API",
    "O `fetch` verifica `resposta.ok` e tem limite de tempo",
    "Os estados carregando, erro e sucesso aparecem na página",
    "Existe uma região `role=\"status\"` que anuncia as ações",
    "Tarefas e tema persistem após recarregar, com `try...catch` e validação",
    "Há um botão para apagar os dados salvos",
    "Nenhum dado sensível é guardado no navegador",
    "A aplicação funciona só com o teclado",
    "O console está sem erros e testei a falha de rede da API"
  ]
});

AE.Projetos.registrar("frontend", {
  titulo: "Projeto integrador: site responsivo e interativo",
  objetivo: "Integrar HTML, CSS e JavaScript em um único site: estrutura semântica, layout responsivo e acessível e interações com dados, sem bibliotecas externas.",
  briefing: [
    "Reúna o que você produziu nos três cursos em um único projeto: parta da página institucional (HTML), aplique o sistema de estilos responsivo (CSS) e acrescente interações com JavaScript.",
    "Escolha o tema do site (uma escola, um evento, uma loja fictícia, um portfólio). O conteúdo deve ser autoral; mencione fonte e licença de imagens e dados.",
    "Este projeto não é avaliado automaticamente. Ele serve como portfólio e como evidência do que você consegue construir. Revise-o com o checklist e, se possível, peça a revisão de uma pessoa."
  ],
  requisitos: [
    "Pelo menos 3 páginas ou seções navegáveis, com estrutura semântica, títulos hierárquicos e link para pular ao conteúdo.",
    "CSS em arquivo externo, com variáveis, abordagem mobile first e pelo menos 2 breakpoints, sem rolagem horizontal de 320px a 1440px.",
    "Pelo menos 3 componentes reutilizáveis com estados (`:hover`, `:focus-visible`, `:disabled`).",
    "Um formulário com validação em HTML e em JavaScript, mensagens acessíveis e envio simulado (sem enviar dados reais a nenhum servidor).",
    "Uma interação que consome dados (de um arquivo JSON próprio ou de uma API pública), com estados de carregando, erro e vazio.",
    "Preferências do usuário (tema ou tamanho de texto) guardadas no navegador, sem dados sensíveis.",
    "Acessibilidade verificada: contraste, foco visível, navegação por teclado, textos alternativos, `prefers-reduced-motion`.",
    "Código organizado em módulos, sem erros no console e com validação de marcação."
  ],
  etapas: [
    { t: "1. Escopo", x: "Defina o tema, as páginas e as interações. Liste o que reaproveitará dos projetos anteriores." },
    { t: "2. Estrutura", x: "Monte o HTML das páginas e a navegação. Valide a marcação." },
    { t: "3. Estilo", x: "Aplique variáveis, tipografia, layout com grid/flex e componentes, partindo do celular." },
    { t: "4. Interações", x: "Implemente o formulário, a leitura de dados e as preferências, com estados e tratamento de erros." },
    { t: "5. Acessibilidade e desempenho", x: "Teste o teclado, o contraste, o zoom de 200% e imagens otimizadas." },
    { t: "6. Publicação local e revisão", x: "Revise o checklist, escreva um `README` curto explicando o projeto e como executá-lo." }
  ],
  criterios: [
    { c: "Integração das três tecnologias", d: "HTML semântico, CSS organizado e JavaScript modular trabalhando em conjunto." },
    { c: "Responsividade", d: "Sem estouro em 320px, com layout adaptado e componentes consistentes." },
    { c: "Interatividade e dados", d: "Estados completos, tratamento de erros e validação de entradas." },
    { c: "Acessibilidade", d: "Teclado, contraste, foco, alternativas em texto e movimento reduzido." },
    { c: "Qualidade do código e documentação", d: "Organização, comentários úteis, `README` claro e ausência de erros no console." }
  ],
  checklist: [
    "O site tem pelo menos 3 páginas ou seções com navegação e link \"pular para o conteúdo\"",
    "A marcação foi validada e os títulos têm hierarquia correta",
    "O CSS é externo, usa variáveis e parte do celular",
    "Não há rolagem horizontal de 320px a 1440px",
    "Há 3 componentes reutilizáveis com todos os estados",
    "O formulário valida no HTML e no JavaScript, com mensagens acessíveis",
    "O envio é simulado e nenhum dado real é enviado",
    "A leitura de dados mostra carregando, erro e vazio",
    "Preferências são guardadas sem dados sensíveis",
    "O contraste e o foco foram conferidos e o site funciona só com o teclado",
    "As imagens têm `alt` e há tratamento de `prefers-reduced-motion`",
    "O JavaScript é modular e o console está sem erros",
    "Existe um `README` explicando o projeto e como executá-lo"
  ]
});
