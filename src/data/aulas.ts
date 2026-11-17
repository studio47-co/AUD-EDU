import { curso } from "./catalogo";

/** Percurso demonstrativo completo: HTML5 (23 aulas, uma por tópico do catálogo). Conteúdo resumido, escrito para a apresentação. */
export type Aula = {
  id: string; modulo: number; titulo: string; minutos: number;
  objetivos: string[]; conceito: string[];
  codigo: { arquivo: string; lang: "html" | "css" | "js"; x: string }; explicacao: string[];
  exercicio: { enunciado: string; dica: string; resolucao: string };
};
type Semente = [string, number, string[], string[], string, string, string[], string, string, string];
// [arquivo, minutos, objetivos, conceito(2 parágrafos), código, (vazio), explicação, enunciado, dica, resolução]
const S = (arquivo: string, minutos: number, obj: string[], conceito: string[], x: string, expl: string[], enunciado: string, dica: string, resolucao: string) =>
  ({ arquivo, minutos, obj, conceito, x, expl, enunciado, dica, resolucao });

const conteudo = [
  S("web.html", 12, ["Descrever o ciclo requisição → resposta.", "Distinguir cliente e servidor."],
    ["Quando você digita um endereço, o navegador pede o documento a um servidor, que responde com HTML. O navegador lê esse HTML e monta a página.", "O HTML chega como texto; CSS e JavaScript chegam como arquivos separados, referenciados pelo próprio documento."],
    `<!-- O servidor devolve este texto; o navegador o interpreta -->\n<h1>Olá, Web!</h1>`,
    ["O comentário não aparece na página.", "O elemento h1 vira um título grande."],
    "Abra qualquer site, use \"Exibir código-fonte\" e localize a tag <title>.", "O atalho costuma ser Ctrl+U.", "<title>Nome do site</title>"),
  S("primeira.html", 10, ["Definir o que é HTML.", "Reconhecer que HTML descreve estrutura, não aparência."],
    ["HTML (HyperText Markup Language) é a linguagem de marcação que dá significado ao conteúdo: o que é título, parágrafo, lista ou link.", "A aparência fica por conta do CSS e o comportamento por conta do JavaScript. Separar as três responsabilidades facilita a manutenção."],
    `<h1>Meu primeiro título</h1>\n<p>Um parágrafo de texto.</p>`,
    ["h1 marca o título principal.", "p marca um parágrafo."],
    "Escreva um título e dois parágrafos sobre um assunto que você domina.", "Use um único h1 por página.", "<h1>Café</h1>\n<p>Bebida feita da infusão dos grãos torrados.</p>\n<p>Existem várias formas de preparo.</p>"),
  S("documento.html", 14, ["Escrever o esqueleto de um documento válido.", "Declarar idioma e codificação."],
    ["Todo documento começa com a declaração do tipo e tem duas partes: head (metadados) e body (conteúdo visível).", "Declarar lang e charset evita erros de acentuação e ajuda leitores de tela a pronunciar o texto corretamente."],
    `<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Minha página</title>\n</head>\n<body>\n  <h1>Olá!</h1>\n</body>\n</html>`,
    ["lang informa o idioma principal.", "title aparece na aba do navegador."],
    "Monte o esqueleto completo e troque o título da aba.", "O title fica dentro do head.", "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head><meta charset=\"UTF-8\"><title>Alex</title></head>\n<body></body>\n</html>"),
  S("atributos.html", 11, ["Diferenciar elemento e atributo.", "Usar atributos globais como id e class."],
    ["Um elemento é composto de tag de abertura, conteúdo e tag de fechamento. Atributos acrescentam informação à tag de abertura.", "id identifica um elemento único; class agrupa elementos que compartilham um estilo."],
    `<p id="intro" class="destaque">Texto em destaque</p>\n<img src="foto.jpg" alt="Equipe reunida">`,
    ["id deve ser único no documento.", "img é um elemento vazio: não tem tag de fechamento."],
    "Acrescente id e class ao parágrafo e identifique o atributo obrigatório da imagem.", "Pense em acessibilidade.", "<p id=\"nota\" class=\"aviso\">Texto</p>\n<img src=\"a.png\" alt=\"Descrição\">"),
  S("devtools.html", 9, ["Abrir as ferramentas de desenvolvedor.", "Inspecionar e alterar um elemento ao vivo."],
    ["Todo navegador moderno traz ferramentas para inspecionar a árvore de elementos, ver estilos aplicados e testar mudanças sem editar o arquivo.", "As alterações feitas ali são temporárias: recarregar a página devolve o documento original."],
    `<!-- F12 ou clique direito > Inspecionar -->\n<button>Clique</button>`,
    ["O painel Elementos mostra o HTML já interpretado.", "O painel Console mostra erros e mensagens."],
    "Inspecione o botão e altere o texto dele pelo painel Elementos.", "Duplo clique no texto permite editar.", "(sem código: prática no navegador)"),

  S("titulos.html", 10, ["Hierarquizar títulos de h1 a h6.", "Escrever parágrafos e quebras com critério."],
    ["Os níveis de título formam o índice da página. Pular níveis confunde leitores de tela e mecanismos de busca.", "Use p para parágrafos; br apenas para quebras que fazem parte do conteúdo, como endereços."],
    `<h1>Guia de estudos</h1>\n<h2>Semana 1</h2>\n<p>Revisar a estrutura de um documento.</p>`,
    ["h2 é subseção de h1.", "Não escolha o nível pelo tamanho visual."],
    "Estruture um roteiro com um h1 e três h2.", "Ajuste o tamanho depois, com CSS.", "<h1>Roteiro</h1>\n<h2>Dia 1</h2>\n<h2>Dia 2</h2>\n<h2>Dia 3</h2>"),
  S("listas.html", 10, ["Escolher entre lista ordenada e não ordenada.", "Aninhar listas."],
    ["Use ol quando a ordem importa (passos) e ul quando não importa (itens soltos). Cada item é um li.", "Listas podem ser aninhadas colocando outra ul/ol dentro de um li."],
    `<ol>\n  <li>Abrir o editor</li>\n  <li>Salvar o arquivo</li>\n</ol>`,
    ["ol numera automaticamente.", "Apenas li é filho direto de ol e ul."],
    "Crie uma lista de compras com uma sublista.", "A sublista fica dentro do li.", "<ul>\n  <li>Frutas\n    <ul><li>Maçã</li></ul>\n  </li>\n</ul>"),
  S("links.html", 11, ["Criar links internos e externos.", "Escrever textos de link que façam sentido fora de contexto."],
    ["O elemento a cria hiperlinks por meio do atributo href. Caminhos relativos apontam para arquivos do próprio site.", "Evite \"clique aqui\": o texto do link deve dizer para onde ele leva."],
    `<a href="contato.html">Fale com a equipe</a>\n<a href="https://exemplo.org" target="_blank" rel="noopener">Site externo</a>`,
    ["rel=\"noopener\" protege ao abrir em nova aba.", "Âncoras (#id) levam a um ponto da mesma página."],
    "Crie um link para outra página e outro para um ponto da própria página.", "O destino do segundo precisa de um id.", "<a href=\"#fim\">Ir ao fim</a>\n<p id=\"fim\">Fim</p>"),
  S("imagens.html", 12, ["Inserir imagens acessíveis.", "Escolher formatos adequados."],
    ["Toda imagem informativa precisa de um alt descrevendo o conteúdo; imagens decorativas usam alt vazio.", "Prefira formatos modernos e defina width e height para evitar saltos de layout."],
    `<img src="grafico.webp" alt="Barras mostrando o crescimento de 2024 a 2026" width="640" height="360" loading="lazy">`,
    ["loading=\"lazy\" adia o carregamento de imagens fora da tela.", "width e height reservam o espaço."],
    "Escreva o alt de uma foto de equipe em reunião.", "Descreva o que importa, sem começar com \"imagem de\".", "<img src=\"equipe.jpg\" alt=\"Cinco pessoas discutindo um quadro de tarefas\">"),
  S("semantica.html", 13, ["Substituir div genérica por elementos semânticos.", "Reconhecer header, nav, main e footer."],
    ["Elementos semânticos descrevem o papel de cada região, o que melhora acessibilidade, SEO e manutenção.", "Uma página costuma ter header, nav, um único main e footer; article e section organizam o miolo."],
    `<header><h1>Blog</h1></header>\n<nav>...</nav>\n<main>\n  <article>...</article>\n</main>\n<footer>© 2026</footer>`,
    ["main aparece uma vez por página.", "article é conteúdo independente."],
    "Reescreva uma página feita só de div usando elementos semânticos.", "Comece identificando o menu.", "<header></header><nav></nav><main></main><footer></footer>"),
  S("organizacao.html", 12, ["Organizar um documento longo.", "Usar section e aside com títulos."],
    ["Agrupe conteúdo relacionado em section, cada uma com seu título. Informação complementar vai em aside.", "Um bom documento pode ser lido apenas pelos títulos e ainda fazer sentido."],
    `<main>\n  <section>\n    <h2>Introdução</h2>\n  </section>\n  <aside><p>Você sabia?</p></aside>\n</main>`,
    ["section sem título costuma ser div disfarçada.", "aside é conteúdo tangencial."],
    "Divida um artigo em três seções e adicione um aside.", "Cada section ganha um h2.", "<section><h2>A</h2></section><section><h2>B</h2></section><section><h2>C</h2></section>"),

  S("form.html", 12, ["Criar um formulário funcional.", "Entender action e method."],
    ["O elemento form agrupa campos e define para onde e como os dados são enviados.", "Nesta demonstração nenhum dado é enviado: a ideia é entender a estrutura."],
    `<form action="/enviar" method="post">\n  <button type="submit">Enviar</button>\n</form>`,
    ["method=post envia os dados no corpo da requisição.", "O botão submit dispara o envio."],
    "Escreva a estrutura de um formulário de contato com botão.", "Lembre do type=submit.", "<form method=\"post\"><button type=\"submit\">Enviar</button></form>"),
  S("inputs.html", 12, ["Usar input, textarea e select.", "Aplicar name e value."],
    ["O atributo name identifica o campo no envio. textarea é para textos longos e select para escolhas em lista.", "Cada controle deve ter um name; sem ele, o dado não é enviado."],
    `<input type="text" name="nome">\n<textarea name="mensagem"></textarea>\n<select name="curso">\n  <option>HTML5</option>\n</select>`,
    ["input é elemento vazio.", "option define cada escolha."],
    "Crie campos de nome, mensagem e curso.", "Todos precisam de name.", "<input name=\"nome\"><textarea name=\"msg\"></textarea>"),
  S("labels.html", 10, ["Associar label a campos.", "Ampliar a área de clique."],
    ["O label descreve o campo e, quando associado por for/id, permite clicar no texto para focar o controle.", "Placeholder não substitui label: some ao digitar e não é lido de forma confiável."],
    `<label for="email">E-mail</label>\n<input id="email" name="email" type="email">`,
    ["for aponta para o id do campo.", "Leitores de tela leem o label ao focar."],
    "Associe labels a dois campos.", "O valor de for é igual ao id.", "<label for=\"n\">Nome</label><input id=\"n\">"),
  S("tipos.html", 11, ["Escolher o type adequado.", "Aproveitar teclados móveis."],
    ["Tipos como email, tel, number, date e password habilitam teclados e validações apropriados.", "Escolher o tipo certo reduz erros de digitação no celular."],
    `<input type="email" name="email">\n<input type="date" name="nascimento">\n<input type="number" min="1" max="10" name="nota">`,
    ["min e max limitam números e datas.", "type=password oculta o conteúdo."],
    "Crie um campo de data e outro numérico de 1 a 5.", "Use min e max.", "<input type=\"number\" min=\"1\" max=\"5\">"),
  S("validacao.html", 13, ["Aplicar validação nativa.", "Mostrar mensagens úteis."],
    ["Atributos como required, minlength, pattern e type validam no navegador antes do envio.", "A validação do navegador melhora a experiência, mas nunca substitui a validação no servidor."],
    `<input type="text" name="cpf" required pattern="[0-9]{11}" title="11 dígitos">`,
    ["required impede envio vazio.", "title ajuda a explicar o padrão."],
    "Exija um campo de e-mail e um de senha com 8 caracteres.", "minlength=\"8\".", "<input type=\"email\" required><input type=\"password\" minlength=\"8\" required>"),
  S("acess-form.html", 12, ["Agrupar campos com fieldset.", "Comunicar erros de forma acessível."],
    ["fieldset e legend agrupam campos relacionados, como opções de uma mesma pergunta.", "Indique obrigatoriedade e erros em texto, não apenas por cor."],
    `<fieldset>\n  <legend>Período</legend>\n  <label><input type="radio" name="p"> Manhã</label>\n  <label><input type="radio" name="p"> Noite</label>\n</fieldset>`,
    ["legend dá nome ao grupo.", "Rádios do mesmo grupo compartilham o name."],
    "Agrupe duas opções de turno em um fieldset.", "Mesmo name nos dois rádios.", "<fieldset><legend>Turno</legend></fieldset>"),

  S("tabelas.html", 12, ["Montar tabelas com cabeçalhos.", "Usar thead, tbody e caption."],
    ["Tabelas são para dados tabulares, nunca para layout. Os cabeçalhos devem usar th com scope.", "caption dá um título à tabela e é lido por tecnologias assistivas."],
    `<table>\n  <caption>Notas</caption>\n  <thead><tr><th scope="col">Curso</th><th scope="col">Nota</th></tr></thead>\n  <tbody><tr><td>HTML5</td><td>8,5</td></tr></tbody>\n</table>`,
    ["th scope=col descreve a coluna.", "thead/tbody separam cabeçalho e dados."],
    "Monte uma tabela de três cursos com nota.", "Não esqueça o caption.", "<table><caption>Notas</caption></table>"),
  S("multimidia.html", 11, ["Incorporar áudio e vídeo.", "Oferecer alternativas em texto."],
    ["audio e video aceitam controles nativos e várias fontes. Legendas e transcrição tornam o conteúdo acessível.", "Evite reprodução automática com som."],
    `<video controls width="480">\n  <source src="aula.mp4" type="video/mp4">\n  <track kind="captions" src="aula.vtt" srclang="pt">\n</video>`,
    ["controls exibe os botões nativos.", "track adiciona legendas."],
    "Incorpore um áudio com controles.", "Use o atributo controls.", "<audio controls src=\"a.mp3\"></audio>"),
  S("metadados.html", 10, ["Preencher meta tags essenciais.", "Configurar a viewport."],
    ["Metadados descrevem o documento: codificação, viewport, descrição e ícone.", "A meta viewport é indispensável para layouts responsivos em celulares."],
    `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="Curso de HTML5">`,
    ["A description costuma aparecer nos resultados de busca.", "Sem viewport o celular simula uma tela larga."],
    "Escreva as três metas básicas de uma página.", "charset, viewport e description.", "<meta charset=\"UTF-8\">"),
  S("seo.html", 10, ["Aplicar SEO básico.", "Escrever títulos e descrições úteis."],
    ["Título único, descrição objetiva, hierarquia de títulos e links com texto claro ajudam a busca a entender a página.", "SEO começa por conteúdo bem estruturado, não por truques."],
    `<title>Curso de HTML5 | AUDMANI</title>\n<meta name="description" content="Aprenda HTML5 do zero, com projetos.">`,
    ["Mantenha o title curto.", "Uma descrição por página."],
    "Escreva title e description para uma página sobre CSS.", "Seja específico.", "<title>CSS3 do básico ao responsivo</title>"),
  S("acessibilidade.html", 13, ["Aplicar práticas de acessibilidade.", "Testar navegando só pelo teclado."],
    ["Acessibilidade começa em HTML correto: semântica, textos alternativos, contraste e foco visível.", "Teste: consegue usar toda a página apenas com Tab, Enter e Esc?"],
    `<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>\n<nav id="menu" hidden>...</nav>`,
    ["aria-expanded informa o estado.", "Prefira elementos nativos a ARIA."],
    "Liste três problemas de acessibilidade em um botão feito de div.", "Pense em foco, teclado e papel.", "Sem foco, sem teclado, sem papel semântico."),
  S("boas-praticas.html", 9, ["Revisar o código com um checklist.", "Validar o documento."],
    ["Valide o HTML, use indentação consistente, nomes de classe claros e comentários só onde agregam.", "Revisar o próprio código com um checklist antes de publicar evita a maioria dos erros."],
    `<!-- Checklist: lang, title, viewport, um h1, alt nas imagens, labels nos campos -->`,
    ["Um validador acusa tags mal fechadas.", "Consistência vale mais que preferência pessoal."],
    "Aplique o checklist em uma página sua.", "Anote o que encontrou.", "(prática: aplicar o checklist)")
];

let n = 0;
export const aulas: Aula[] = curso("html")!.modulos.flatMap((m) =>
  m.topicos.map((t) => {
    const c = conteudo[n];
    n += 1;
    return {
      id: `a${n}`, modulo: m.n, titulo: t, minutos: c.minutos, objetivos: c.obj, conceito: c.conceito,
      codigo: { arquivo: c.arquivo, lang: "html" as const, x: c.x }, explicacao: c.expl,
      exercicio: { enunciado: c.enunciado, dica: c.dica, resolucao: c.resolucao }
    };
  })
);
export const aula = (id: string) => aulas.find((a) => a.id === id);
