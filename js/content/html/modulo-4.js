/* HTML5 · Módulo 4 — HTML avançado
   Tópicos cobertos: Tabelas · Multimídia · Metadados · SEO básico ·
   Acessibilidade · Boas práticas */
AE.Conteudo.modulo("html", 4, { aulas: [

/* ------------------------------------------------------------------ */
{
  id: "m4a1", titulo: "Tabelas e multimídia", minutos: 55,
  topicos: ["Tabelas", "Multimídia"],
  objetivos: [
    "Construir tabelas de dados acessíveis com `caption`, `thead`, `tbody`, `th` e `scope`.",
    "Usar `colspan` e `rowspan` com critério.",
    "Incorporar áudio e vídeo com `audio`, `video` e `source`, incluindo legendas com `track`.",
    "Servir imagens responsivas com `srcset`, `sizes` e `picture`.",
    "Incorporar conteúdo externo com `iframe` de forma segura."
  ],
  conceito: [
    { h: "Tabelas servem para dados, não para layout" },
    { p: 'Use `<table>` para dados que fazem sentido em linhas e colunas (horários, preços, comparativos). **Nunca** para posicionar elementos na página: isso confunde leitores de tela e atrapalha a responsividade. Para layout, use CSS (veremos no curso de CSS).' },
    { h: "Anatomia de uma tabela" },
    { lista: [
      '`<table>`: o contêiner. `<caption>`: o título da tabela (deve ser o primeiro filho).',
      '`<thead>`, `<tbody>`, `<tfoot>`: cabeçalho, corpo e rodapé. Dividem a tabela em regiões semânticas.',
      '`<tr>`: uma linha. `<th>`: célula de **cabeçalho**. `<td>`: célula de dado.',
      '`scope="col"` ou `scope="row"` no `<th>` informa se ele rotula uma coluna ou uma linha, e ajuda leitores de tela a anunciar o cabeçalho certo em cada célula.',
      '`colspan` e `rowspan` mesclam células. Use pouco: tabelas com muitas mesclagens são difíceis de navegar com tecnologias assistivas.'
    ] },
    { h: "Áudio e vídeo" },
    { p: 'Os elementos `<audio>` e `<video>` incorporam mídia sem plug-ins. O atributo `controls` mostra os controles do navegador. Vários `<source>` oferecem formatos alternativos (o navegador usa o primeiro que suportar). O texto dentro do elemento aparece só em navegadores sem suporte.' },
    { lista: [
      '`<track kind="captions" src="..." srclang="pt" label="Português">` adiciona **legendas** em formato WebVTT. Legendas são essenciais para pessoas surdas e úteis a todos.',
      '`poster` define a imagem exibida antes do vídeo iniciar. `preload="metadata"` evita baixar o vídeo inteiro antes de o usuário apertar play.',
      '`autoplay` com som é frustrante e muitas vezes bloqueado pelos navegadores; se usar, combine com `muted` e ofereça controle ao usuário.'
    ] },
    { h: "Imagens responsivas" },
    { p: 'Em telas pequenas, baixar uma imagem de 2000 px desperdiça dados. `srcset` lista versões da mesma imagem com suas larguras (`800w`) e `sizes` diz qual largura ela ocupará na página, para o navegador escolher a mais adequada. Com `<picture>`, você pode trocar a imagem por **formato** (`type="image/webp"`) ou por **recorte** (arte diferente em telas pequenas), com `<img>` como fallback obrigatório.' },
    { nota: { t: "Sempre `width`, `height` e `alt`", x: 'Declarar `width` e `height` reserva o espaço da imagem antes de carregar, evitando que o conteúdo "pule" (o chamado deslocamento de layout). E `loading="lazy"` adia o carregamento das imagens fora da tela.' } },
    { h: "Conteúdo incorporado: iframe" },
    { p: 'O `<iframe>` exibe outra página dentro da sua. Sempre dê a ele um `title` descritivo (leitores de tela o anunciam). Ao incorporar conteúdo de terceiros, considere `loading="lazy"` e o atributo `sandbox`, que restringe o que o conteúdo incorporado pode fazer. Incorpore apenas fontes em que você confia.' }
  ],
  exemplos: [
    { titulo: "Tabela de dados acessível", lang: "html", arquivo: "tabela.html",
      codigo: `
<table>
  <caption>Plano de estudos da semana</caption>
  <thead>
    <tr>
      <th scope="col">Dia</th>
      <th scope="col">Tema</th>
      <th scope="col">Duração (h)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Segunda</th>
      <td>Estrutura HTML</td>
      <td>2</td>
    </tr>
    <tr>
      <th scope="row">Quarta</th>
      <td>Formulários</td>
      <td>3</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="2">Total</th>
      <td>5</td>
    </tr>
  </tfoot>
</table>`,
      explicacao: [
        '`<caption>` nomeia a tabela. É anunciado antes do conteúdo.',
        'Os `<th scope="col">` rotulam colunas e os `<th scope="row">` rotulam linhas: ao chegar na célula "3", o leitor de tela diz "Quarta, Duração, 3".',
        '`colspan="2"` faz a célula "Total" ocupar duas colunas. O total de células da linha continua somando 3 colunas.',
        'Observe que o dia da semana é `<th>`, não `<td>`: ele é o rótulo da linha.'
      ] },
    { titulo: "Vídeo com legendas e fallback", lang: "html", arquivo: "video.html",
      codigo: `
<video controls width="640" height="360" poster="capa.jpg" preload="metadata">
  <source src="aula.webm" type="video/webm">
  <source src="aula.mp4" type="video/mp4">
  <track kind="captions" src="aula-pt.vtt" srclang="pt" label="Português" default>
  <p>Seu navegador não suporta vídeo.
     <a href="aula.mp4">Baixe o arquivo</a>.</p>
</video>

<audio controls>
  <source src="podcast.ogg" type="audio/ogg">
  <source src="podcast.mp3" type="audio/mpeg">
  <a href="podcast.mp3">Baixar o episódio</a>
</audio>`,
      explicacao: [
        'O navegador escolhe o primeiro `<source>` cujo formato ele reproduz.',
        '`<track>` carrega as legendas WebVTT; `default` as ativa por padrão.',
        '`preload="metadata"` baixa só as informações iniciais; o vídeo completo só é baixado ao dar play.',
        'O conteúdo interno (parágrafo e link) é o *fallback* para navegadores sem suporte, e oferece uma alternativa de download.'
      ] },
    { titulo: "Imagem responsiva e iframe", lang: "html", arquivo: "imagens.html",
      codigo: `
<!-- O navegador escolhe a versão mais adequada à tela -->
<img src="paisagem-800.jpg"
     srcset="paisagem-400.jpg 400w, paisagem-800.jpg 800w, paisagem-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 800px"
     width="800" height="450" loading="lazy"
     alt="Montanhas ao amanhecer, com neblina nos vales">

<!-- Troca por formato: WebP se houver suporte; JPEG como fallback -->
<picture>
  <source srcset="logo.webp" type="image/webp">
  <img src="logo.jpg" alt="Logotipo da AUDMANI" width="200" height="60">
</picture>

<!-- Conteúdo incorporado com título e restrições -->
<iframe src="https://exemplo.com/mapa" title="Mapa com a localização do evento"
        width="600" height="400" loading="lazy" sandbox="allow-scripts"></iframe>`,
      explicacao: [
        '`400w`, `800w`, `1600w` informam a **largura real** de cada arquivo; `sizes` informa quanto espaço a imagem ocupará: 100% da janela em telas até 600 px, e 800 px nas demais.',
        '`<picture>` permite oferecer formatos modernos mantendo um `<img>` de reserva, que também é onde ficam `alt`, `width` e `height`.',
        'O `title` do iframe descreve seu conteúdo a quem usa leitor de tela. `sandbox` restringe poderes do conteúdo incorporado.',
        'O endereço do iframe é fictício: use apenas fontes confiáveis nos seus projetos.'
      ] }
  ],
  erros: [
    { erro: "Usar tabela para montar o layout da página.", porque: "Quebra a semântica, atrapalha leitores de tela e não é responsiva.", correcao: "use CSS (flexbox ou grid) para layout, e tabelas só para dados." },
    { erro: "Tabela sem `<th>`: tudo em `<td>`.", porque: "Não há cabeçalhos para as tecnologias assistivas associarem às células.", correcao: "marque os cabeçalhos com `<th>` e `scope`." },
    { erro: "Vídeo sem legendas ou transcrição.", porque: "Exclui pessoas surdas e quem assiste sem som.", correcao: "inclua `<track kind=\"captions\">` e, se possível, uma transcrição." },
    { erro: "Imagens sem `width` e `height`.", porque: "A página \"pula\" quando as imagens carregam.", correcao: "declare as dimensões intrínsecas (o CSS ajusta o tamanho visual)." },
    { erro: "`iframe` sem `title`.", porque: "O leitor de tela não consegue dizer o que é aquele quadro.", correcao: "dê sempre um `title` descritivo." },
    { erro: "`autoplay` com som.", porque: "Surpreende o usuário, atrapalha quem usa leitor de tela e costuma ser bloqueado.", correcao: "deixe o usuário apertar play; se precisar de autoplay, use `muted`." }
  ],
  praticas: [
    'Uma tabela de dados tem `caption`, `thead`/`tbody` e `th` com `scope`.',
    'Evite mesclar células quando uma tabela mais simples resolve.',
    'Todo conteúdo em áudio ou vídeo deve ter alternativa em texto (legendas, transcrição).',
    'Prefira `preload="metadata"` e `loading="lazy"` para economizar dados.',
    'Use `srcset`/`sizes` em imagens grandes e mantenha `alt` significativo.'
  ],
  exercicios: [
    { titulo: "Tabela de notas",
      enunciado: 'Monte uma tabela com título "Notas do bimestre", cabeçalhos "Aluno", "Nota 1", "Nota 2" e "Média", duas linhas de alunos (use valores de sua escolha) e uma linha final "Média da turma" que ocupe as três primeiras colunas.',
      dica: 'Use `thead`, `tbody`, `tfoot`, `scope` e `colspan="3"`.',
      resolucao: { lang: "html", codigo: `
<table>
  <caption>Notas do bimestre</caption>
  <thead>
    <tr>
      <th scope="col">Aluno</th>
      <th scope="col">Nota 1</th>
      <th scope="col">Nota 2</th>
      <th scope="col">Média</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Ana</th><td>8</td><td>9</td><td>8,5</td></tr>
    <tr><th scope="row">Bruno</th><td>6</td><td>7</td><td>6,5</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row" colspan="3">Média da turma</th><td>7,5</td></tr>
  </tfoot>
</table>`,
        comentario: 'O nome do aluno é `<th scope="row">` por ser rótulo da linha. O `colspan="3"` faz o rótulo do rodapé ocupar três colunas, e a quarta célula traz o valor. As médias são calculadas à mão: (8+9)/2 = 8,5; (6+7)/2 = 6,5; (8,5+6,5)/2 = 7,5.' } },
    { titulo: "Vídeo acessível",
      enunciado: 'Escreva o HTML de um vídeo `entrevista.mp4` (640×360) com controles, legendas em português (`entrevista-pt.vtt`) e um link de download como alternativa para navegadores sem suporte.',
      dica: 'Use `video`, `track` e conteúdo interno.',
      resolucao: { lang: "html", codigo: `
<video controls width="640" height="360" preload="metadata">
  <source src="entrevista.mp4" type="video/mp4">
  <track kind="captions" src="entrevista-pt.vtt" srclang="pt" label="Português" default>
  <p>Seu navegador não suporta vídeo. <a href="entrevista.mp4">Baixe a entrevista</a>.</p>
</video>`,
        comentario: '`controls` dá ao usuário o controle da reprodução; `track kind="captions"` fornece as legendas; o parágrafo interno é o *fallback* com alternativa de download; `preload="metadata"` evita carregar o arquivo todo antes da hora.' } }
  ],
  referencias: [
    { t: "O elemento table", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table", fonte: "MDN Web Docs" },
    { t: "Tutorial de tabelas acessíveis", u: "https://www.w3.org/WAI/tutorials/tables/", fonte: "W3C WAI" },
    { t: "Imagens responsivas", u: "https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content/HTML_images", fonte: "MDN Web Docs" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a2", titulo: "Metadados e SEO básico", minutos: 45,
  topicos: ["Metadados", "SEO básico"],
  objetivos: [
    "Configurar o `<head>` com `charset`, `viewport`, `title` e `meta description`.",
    "Declarar o idioma e usar `link rel` para favicon e folhas de estilo.",
    "Compartilhar páginas com metadados Open Graph.",
    "Aplicar práticas básicas de SEO baseadas em HTML bem estruturado."
  ],
  conceito: [
    { h: "O que é o `<head>`" },
    { p: 'O `<head>` contém informações **sobre** a página, que não aparecem no conteúdo: codificação, título, descrição, ícones, folhas de estilo e dados para buscadores e redes sociais. Quem lê esses dados são navegadores, mecanismos de busca e sites de compartilhamento.' },
    { h: "Metadados essenciais" },
    { lista: [
      '`<meta charset="utf-8">`: codificação de caracteres. Deve ser a primeira coisa no `<head>`, antes de qualquer texto com acentos, para que "ação" não vire "aÃ§Ã£o".',
      '`<html lang="pt-BR">`: idioma da página. Define a pronúncia do leitor de tela e ajuda tradutores e buscadores.',
      '`<meta name="viewport" content="width=device-width, initial-scale=1">`: faz a página ocupar a largura real do celular. Sem ele, o navegador mobile finge uma tela larga e reduz tudo.',
      '`<title>`: o título que aparece na aba, nos favoritos e nos resultados de busca. Cada página deve ter um **único** título descritivo.',
      '`<meta name="description" content="...">`: resumo exibido sob o título nos buscadores. Escreva uma frase útil de cerca de 150 caracteres.'
    ] },
    { h: "Links no head" },
    { lista: [
      '`<link rel="stylesheet" href="estilo.css">`: carrega o CSS.',
      '`<link rel="icon" href="favicon.svg">`: ícone da aba.',
      '`<link rel="canonical" href="https://...">`: indica o endereço preferido da página quando ela é acessível por mais de uma URL.'
    ] },
    { h: "Compartilhamento: Open Graph" },
    { p: 'Quando alguém cola o link da sua página em uma rede social ou mensageiro, o título e a imagem de pré-visualização costumam vir de metadados **Open Graph**: `og:title`, `og:description`, `og:image`, `og:url` e `og:type`. São escritos como `<meta property="og:title" content="...">`.' },
    { h: "SEO básico: o que o HTML pode fazer" },
    { p: 'SEO (otimização para mecanismos de busca) é um campo amplo, mas a base é HTML bem escrito. Nenhuma marcação garante posição nos resultados; o objetivo é **facilitar que os buscadores entendam** a página, o que também ajuda os usuários.' },
    { lista: [
      'Um `<title>` e uma `description` únicos e descritivos por página.',
      'Um `<h1>` por página e hierarquia de títulos sem saltos.',
      'Elementos semânticos (`main`, `nav`, `article`, `section`) em vez de `div` genéricos.',
      'Texto de link descritivo ("Ver preços do plano Pro"), e não "clique aqui".',
      '`alt` significativo nas imagens.',
      'URLs legíveis e conteúdo realmente útil: o fator mais importante.'
    ] },
    { nota: { t: "A meta keywords é inútil", x: 'A antiga `<meta name="keywords">` é ignorada pelos principais buscadores há anos. Não perca tempo com ela. Do mesmo modo, `meta description` não aumenta posição por si só: ela melhora o texto exibido e, com isso, a chance de clique.' } }
  ],
  exemplos: [
    { titulo: "Um `<head>` completo", lang: "html", arquivo: "head.html",
      codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Padaria Trigo Bom | Pães artesanais em São Paulo</title>
  <meta name="description" content="Pães de fermentação natural, assados todos os dias. Veja o cardápio, os horários e como fazer encomendas.">

  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="estilo.css">
  <link rel="canonical" href="https://www.exemplo.com.br/">

  <!-- Compartilhamento em redes sociais -->
  <meta property="og:title" content="Padaria Trigo Bom">
  <meta property="og:description" content="Pães artesanais, assados todos os dias.">
  <meta property="og:image" content="https://www.exemplo.com.br/img/capa.jpg">
  <meta property="og:url" content="https://www.exemplo.com.br/">
  <meta property="og:type" content="website">
</head>
<body>
  <h1>Padaria Trigo Bom</h1>
</body>
</html>`,
      explicacao: [
        '`charset` vem primeiro, antes do `<title>`, que pode conter acentos.',
        '`lang="pt-BR"` informa idioma e variante regional.',
        'O `<title>` segue um padrão útil: nome da página, separador e nome do site.',
        'A `description` é uma frase natural, e não uma lista de palavras-chave.',
        'Os valores de `og:` usam URLs absolutas, porque quem lê é um site externo. O domínio `exemplo.com.br` é fictício.'
      ] },
    { titulo: "Antes e depois: estrutura amigável a buscadores", lang: "html", arquivo: "seo-antes-depois.html",
      codigo: `
<!-- ANTES: pouco informativo -->
<title>Página</title>
<div class="titulo">Bem-vindo</div>
<div>
  <a href="/cardapio">Clique aqui</a> para ver mais.
  <img src="pao.jpg">
</div>

<!-- DEPOIS: claro para pessoas e buscadores -->
<title>Cardápio de pães | Padaria Trigo Bom</title>
<main>
  <h1>Cardápio de pães artesanais</h1>
  <p>Veja o <a href="/cardapio">cardápio completo de pães e doces</a>.</p>
  <img src="pao.jpg" width="400" height="300"
       alt="Pão de fermentação natural recém-saído do forno">
</main>`,
      explicacao: [
        'O título descreve o conteúdo e o site, em vez de apenas "Página".',
        '`<h1>` e `<main>` dão estrutura. A `div` com classe "titulo" não tem significado para buscadores nem leitores de tela.',
        'O link "cardápio completo de pães e doces" faz sentido fora de contexto, ao contrário de "Clique aqui".',
        'A imagem ganhou `alt` descritivo e dimensões.'
      ] },
    { titulo: "Metadados de um artigo", lang: "html", arquivo: "artigo.html",
      codigo: `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Como escolher um bom pão integral | Blog Trigo Bom</title>
  <meta name="description" content="Aprenda a ler o rótulo, identificar farinhas integrais de verdade e reconhecer um pão bem fermentado.">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="article">
  <meta property="og:title" content="Como escolher um bom pão integral">
</head>`,
      explicacao: [
        '`robots` com `index, follow` é o comportamento padrão: só é útil declarar quando se quer o contrário (`noindex` impede a indexação, por exemplo em páginas de teste).',
        '`og:type` como `article` indica que se trata de um conteúdo editorial.',
        'Título e descrição são específicos deste artigo: cada página do site precisa dos seus.'
      ] }
  ],
  erros: [
    { erro: "Esquecer o `<meta name=\"viewport\">`.", porque: "No celular a página aparece minúscula, como versão desktop reduzida.", correcao: "inclua `width=device-width, initial-scale=1`." },
    { erro: "Omitir `charset` ou colocá-lo depois de textos com acento.", porque: "Caracteres acentuados podem aparecer quebrados.", correcao: "coloque `<meta charset=\"utf-8\">` logo no início do `<head>`." },
    { erro: "Mesmo `<title>` e `description` em todas as páginas.", porque: "Os buscadores não distinguem as páginas e os resultados ficam repetitivos.", correcao: "escreva títulos e descrições únicos por página." },
    { erro: "Encher o `<title>` de palavras-chave repetidas.", porque: "Fica ilegível e não ajuda posição.", correcao: "descreva o conteúdo com uma frase natural, e mantenha o título curto." },
    { erro: "Usar `\"clique aqui\"` como texto de link.", porque: "Não diz para onde o link leva (importante para leitores de tela e buscadores).", correcao: "use um texto que descreva o destino." },
    { erro: "Esquecer o `lang` no `<html>`.", porque: "O leitor de tela pode pronunciar o texto no idioma errado.", correcao: "declare `lang=\"pt-BR\"`." }
  ],
  praticas: [
    'Comece todo documento com `doctype`, `lang`, `charset` e `viewport`.',
    'Um `title` único e descritivo (em geral até cerca de 60 caracteres) e uma `description` útil em cada página.',
    'Use hierarquia de títulos e elementos semânticos.',
    'Escreva textos de link e `alt` que façam sentido isoladamente.',
    'Lembre-se: SEO bom nasce de conteúdo útil e HTML bem estruturado, sem truques.'
  ],
  exercicios: [
    { titulo: "Monte o head",
      enunciado: 'Escreva o `<head>` completo de uma página "Contato" de uma escola de música chamada "Som & Cia", em português do Brasil, com: charset, viewport, título, descrição, link para `estilo.css` e favicon `icone.png`.',
      dica: 'Lembre da ordem: charset primeiro. E o `&` no texto deve ser escrito como entidade.',
      resolucao: { lang: "html", codigo: `
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contato | Som &amp; Cia, escola de música</title>
  <meta name="description" content="Fale com a escola Som &amp; Cia: telefone, endereço, horários de atendimento e formulário para agendar uma aula experimental.">
  <link rel="icon" href="icone.png" type="image/png">
  <link rel="stylesheet" href="estilo.css">
</head>`,
        comentario: 'O `<html lang="pt-BR">` deve estar na tag de abertura do documento (fora deste trecho). O `&` é escrito como `&amp;` no HTML. Título e descrição são específicos para a página de contato.' } },
    { titulo: "Melhore o texto dos links",
      enunciado: 'Reescreva este trecho para que os links façam sentido isoladamente: `<p>Para ver os preços, <a href="/precos">clique aqui</a>. Para falar conosco, <a href="/contato">clique aqui</a>.</p>`',
      dica: 'O texto do link deve descrever o destino.',
      resolucao: { lang: "html", codigo: `<p>Consulte a <a href="/precos">tabela de preços</a> ou <a href="/contato">fale conosco</a>.</p>`,
        comentario: 'Agora quem navega por uma lista de links (leitor de tela ou buscador) ouve "tabela de preços" e "fale conosco", que são informativos, em vez de dois "clique aqui" idênticos.' } }
  ],
  referencias: [
    { t: "Metadados no head: o elemento meta", u: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/meta", fonte: "MDN Web Docs" },
    { t: "Guia de fundamentos de SEO", u: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br", fonte: "Google Search Central" },
    { t: "The Open Graph protocol", u: "https://ogp.me/", fonte: "ogp.me" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "m4a3", titulo: "Acessibilidade e boas práticas", minutos: 50,
  topicos: ["Acessibilidade", "Boas práticas"],
  objetivos: [
    "Aplicar as regras de ouro da acessibilidade: HTML semântico primeiro, ARIA depois.",
    "Usar landmarks, texto alternativo e ordem de foco corretamente.",
    "Validar documentos e reconhecer erros comuns de marcação.",
    "Revisar uma página com uma lista de verificação objetiva."
  ],
  conceito: [
    { h: "Acessibilidade é qualidade de código" },
    { p: 'Acessibilidade significa que pessoas com diferentes capacidades (visuais, auditivas, motoras, cognitivas) e em diferentes situações (sol forte, conexão lenta, mão ocupada) conseguem usar o que você construiu. Grande parte dela vem de graça com **HTML semântico bem usado**.' },
    { h: "Primeira regra do ARIA" },
    { p: 'ARIA é um conjunto de atributos (`role`, `aria-label`, `aria-describedby`, `aria-expanded`...) que complementa o HTML quando ele não basta. A primeira regra é: **se existe um elemento HTML nativo com a função desejada, use-o**. Um `<button>` já é focável, acionável por teclado e anunciado corretamente. Um `<div role="button">` exige que você reconstrua tudo isso. E ARIA mal usado **piora** a acessibilidade, pois só muda o que é anunciado, não o comportamento.' },
    { h: "Pontos essenciais" },
    { lista: [
      '**Landmarks**: `header`, `nav`, `main`, `aside`, `footer` permitem que usuários de leitor de tela pulem direto para as regiões da página. Use um `main` por página. Se houver mais de um `nav`, diferencie-os com `aria-label`.',
      '**Títulos**: formam o "sumário" navegável da página. Um `h1`, sem saltos de nível.',
      '**Texto alternativo**: `alt` descreve a função ou o conteúdo da imagem. Imagem decorativa recebe `alt=""` (vazio), para ser ignorada.',
      '**Links e botões**: link navega, botão executa uma ação. Ambos precisam de nome claro.',
      '**Idioma**: `lang` no `<html>` e, para trechos em outro idioma, `lang` no elemento.',
      '**Teclado**: tudo deve funcionar sem mouse, com foco visível e ordem lógica.',
      '**Cor e contraste**: não use só cor para comunicar informação; mantenha contraste suficiente (as diretrizes WCAG pedem 4,5:1 para texto comum).',
      '**Link de pular navegação**: um link "Ir para o conteúdo" no início da página ajuda quem navega por teclado a evitar repetir o menu.'
    ] },
    { h: "Boas práticas de marcação" },
    { lista: [
      'Feche todas as tags e aninhe corretamente: `<p><strong>texto</strong></p>`, e não `<p><strong>texto</p></strong>`.',
      '`id` únicos na página. Atributos entre aspas. Nomes de tags e atributos em minúsculas por convenção.',
      'Separe responsabilidades: **HTML** para estrutura, **CSS** para aparência, **JavaScript** para comportamento. Evite `style` e `onclick` inline.',
      'Use entidades para caracteres reservados: `&lt;`, `&gt;`, `&amp;`.',
      'Use um padrão consistente de indentação e nomes de arquivo (minúsculos, sem espaços ou acentos).',
      '**Valide** o código com o validador de marcação do W3C e teste a página só com o teclado.'
    ] },
    { nota: { t: "Ferramentas ajudam, mas não bastam", x: 'Verificadores automáticos (como o Lighthouse e o validador do W3C) encontram só uma parte dos problemas. Teste manualmente: navegue com `Tab`, aumente o zoom para 200% e, se possível, experimente um leitor de tela.' } }
  ],
  exemplos: [
    { titulo: "Página com landmarks e link de pular conteúdo", lang: "html", arquivo: "landmarks.html",
      codigo: `
<body>
  <a href="#conteudo">Ir para o conteúdo principal</a>

  <header>
    <p>Escola Som &amp; Cia</p>
    <nav aria-label="Principal">
      <ul>
        <li><a href="/" aria-current="page">Início</a></li>
        <li><a href="/cursos">Cursos</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  </header>

  <main id="conteudo">
    <h1>Aulas de música para todas as idades</h1>
    <section>
      <h2>Nossos cursos</h2>
      <p>...</p>
    </section>
  </main>

  <footer>
    <nav aria-label="Rodapé">
      <a href="/privacidade">Política de privacidade</a>
    </nav>
  </footer>
</body>`,
      explicacao: [
        'O primeiro link permite pular o menu com um `Enter`. Ele costuma ficar visível apenas ao receber foco (isso é feito com CSS).',
        'Há dois `<nav>`: o `aria-label` os diferencia ("Principal" e "Rodapé") na lista de regiões.',
        '`aria-current="page"` indica ao leitor de tela qual é a página atual.',
        '`<main>` é único; seu `id` é o destino do link de pular conteúdo.'
      ] },
    { titulo: "Nativo vs. ARIA", lang: "html", arquivo: "nativo-vs-aria.html",
      codigo: `
<!-- Ruim: div que imita botão; sem foco, sem teclado -->
<div class="botao" role="button" onclick="abrirMenu()">Menu</div>

<!-- Bom: elemento nativo. Foco, Enter/Espaço e anúncio vêm prontos -->
<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>
  <li><a href="/cursos">Cursos</a></li>
  <li><a href="/contato">Contato</a></li>
</ul>

<!-- Imagem informativa x decorativa -->
<img src="grafico-vendas.png" alt="Vendas cresceram 20% em 2025, de 500 para 600 unidades">
<img src="divisor.svg" alt="">`,
      explicacao: [
        'O `<div role="button">` só **diz** que é um botão. Ele ainda precisaria de `tabindex="0"` e de código para o teclado.',
        'No `<button>`, `aria-expanded` e `aria-controls` descrevem o estado do menu: o JavaScript do curso 3 vai alternar o valor.',
        'O `hidden` esconde o menu de todos, inclusive dos leitores de tela, até ser removido.',
        'A imagem informativa tem um `alt` que traz a **informação** do gráfico. A decorativa tem `alt=""` para ser ignorada.'
      ] },
    { titulo: "Lista de verificação rápida", lang: "txt", arquivo: "checklist.txt",
      codigo: `
[ ] <!DOCTYPE html>, <html lang="pt-BR">, charset e viewport presentes
[ ] <title> único e descritivo; meta description
[ ] Um <h1>; títulos sem saltos de nível
[ ] Landmarks: header, nav, main, footer
[ ] Todas as imagens com alt (vazio se decorativas)
[ ] Todo campo de formulário com label associado
[ ] Links com texto que faz sentido sozinho
[ ] Botões são <button>; links são <a>
[ ] Tudo acessível por teclado, com foco visível
[ ] Informação não depende só da cor
[ ] Código validado (W3C) e testado em mais de um navegador`,
      explicacao: [
        'Use esta lista como revisão final do projeto do módulo.',
        'Cada item corresponde a algo estudado nas aulas anteriores.',
        'Itens que exigem verificação manual (teclado, foco, cor) não podem ser conferidos por ferramentas automáticas.'
      ] }
  ],
  erros: [
    { erro: "Usar `div` e `span` com `onclick` no lugar de `button` e `a`.", porque: "Não recebem foco nem respondem ao teclado.", correcao: "use os elementos nativos." },
    { erro: "Aplicar ARIA em excesso (`role` redundante, como `<button role=\"button\">`).", porque: "Adiciona ruído e risco de erros sem ganho.", correcao: "use ARIA apenas quando o HTML nativo não cobrir a necessidade." },
    { erro: "`alt=\"imagem\"` ou `alt=\"foto\"`.", porque: "Não informa nada; o leitor de tela já avisa que é uma imagem.", correcao: "descreva o conteúdo ou a função (ou deixe `alt=\"\"` se for decorativa)." },
    { erro: "Pular níveis de título para obter um tamanho de fonte.", porque: "Quebra o sumário navegável.", correcao: "escolha o título pelo nível lógico e ajuste o tamanho com CSS." },
    { erro: "Tags mal aninhadas ou sem fechamento.", porque: "O navegador \"corrige\" de forma imprevisível e o resultado varia.", correcao: "valide a marcação e feche cada tag." },
    { erro: "Dois ou mais `id` iguais na mesma página.", porque: "Quebra `label for`, âncoras e `aria-describedby`.", correcao: "garanta que cada `id` seja único." },
    { erro: "Texto cinza claro sobre fundo branco.", porque: "Contraste insuficiente dificulta a leitura.", correcao: "verifique a razão de contraste (mínimo 4,5:1 para texto comum)." }
  ],
  praticas: [
    'Primeiro o HTML nativo; ARIA só para complementar.',
    'Landmarks e títulos bem estruturados: são a navegação do usuário de leitor de tela.',
    'Teste com teclado, zoom de 200% e, quando possível, leitor de tela.',
    'Valide o HTML e corrija avisos em vez de ignorá-los.',
    'Mantenha estrutura, aparência e comportamento em arquivos separados.'
  ],
  exercicios: [
    { titulo: "Corrija os problemas",
      enunciado: 'Liste e corrija os problemas de acessibilidade e boas práticas do trecho a seguir.',
      codigo: { lang: "html", x: `
<html>
<body>
  <div class="menu">
    <span onclick="ir('inicio')">Início</span>
    <span onclick="ir('contato')">Contato</span>
  </div>
  <div class="titulo">Bem-vindo à loja</div>
  <img src="banner.jpg" alt="imagem">
  <a href="/promo">Clique aqui</a>
</body>
</html>` },
      dica: 'Doctype, lang, title, nav, botões/links, título, alt, texto de link.',
      resolucao: { lang: "html", codigo: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Loja Exemplo | Início</title>
</head>
<body>
  <header>
    <nav aria-label="Principal">
      <ul>
        <li><a href="/" aria-current="page">Início</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Bem-vindo à loja</h1>
    <img src="banner.jpg" width="1200" height="400"
         alt="Vitrine com produtos em promoção de fim de ano">
    <p><a href="/promo">Veja as promoções de fim de ano</a></p>
  </main>
</body>
</html>`,
        comentario: 'Problemas: sem `doctype`, `lang`, `head`, `title`; menu feito com `span onclick` (sem foco/teclado) em vez de `nav` com links; título em `div` em vez de `h1`; `alt="imagem"` sem informação; sem `main`; link "Clique aqui" sem sentido isolado. O `onclick` inline também foi substituído por links reais.' } },
    { titulo: "Decidir: nativo ou ARIA?",
      enunciado: 'Para cada caso, diga se basta HTML nativo ou se ARIA é necessário: (a) botão que abre um menu; (b) campo com texto de ajuda associado; (c) dois `<nav>` na mesma página; (d) um link para outra página.',
      dica: 'Pense: existe elemento nativo para isso? O que o HTML não consegue expressar?',
      resolucao: { lang: "", codigo: "",
        comentario: '(a) Use `<button>` nativo; `aria-expanded` e `aria-controls` complementam o estado. (b) O `label` nomeia; `aria-describedby` associa o texto de ajuda. (c) Use `aria-label` para diferenciar os dois `nav`. (d) Apenas `<a href>`: nenhum ARIA é necessário.' } }
  ],
  referencias: [
    { t: "Introdução à acessibilidade na web", u: "https://www.w3.org/WAI/fundamentals/accessibility-intro/pt-br", fonte: "W3C WAI" },
    { t: "Uso de ARIA: regras básicas", u: "https://www.w3.org/TR/using-aria/", fonte: "W3C" },
    { t: "WCAG 2: diretrizes de acessibilidade", u: "https://www.w3.org/WAI/standards-guidelines/wcag/pt-br", fonte: "W3C WAI" }
  ]
}

] });
