/* ==========================================================
   DADOS DOS CURSOS (metadados + conteúdo programático)
   O conteúdo das aulas fica em js/content/<curso>/modulo-N.js.
   Carga horária: PROPOSTA para validação (não é carga certificada).
   ========================================================== */
(function (AE) {
  AE.CATEGORIA_WEB = "Desenvolvimento Web";

  AE.Cursos = [
    {
      slug: "html", nome: "HTML5", categoria: AE.CATEGORIA_WEB, nivel: "Iniciante", horas: 30, preco: 89.90, pacote: "frontend",
      resumo: "A estrutura de toda página web: semântica, formulários e acessibilidade.",
      descricao: "Do funcionamento da Web à construção de páginas semânticas, com formulários validados e acessíveis. Você termina o curso com uma página institucional completa, escrita à mão e verificada em validadores e leitores de tela.",
      prerequisitos: ["Saber usar um computador e um navegador.", "Nenhum conhecimento prévio de programação."],
      aprendera: [
        "Explicar o que acontece entre digitar um endereço e ver uma página.",
        "Escrever documentos HTML válidos, com a estrutura e os metadados corretos.",
        "Escolher elementos semânticos em vez de blocos genéricos.",
        "Criar formulários com rótulos, validação nativa e acessibilidade.",
        "Publicar tabelas, imagens, áudio e vídeo de forma acessível e otimizada para busca."
      ],
      modulos: [
        { n: 1, titulo: "Introdução ao HTML", topicos: ["Funcionamento da Web", "O que é HTML", "Estrutura de um documento", "Elementos e atributos", "Ferramentas de desenvolvimento"] },
        { n: 2, titulo: "Estrutura e semântica", topicos: ["Títulos e parágrafos", "Listas", "Links", "Imagens", "Elementos semânticos", "Organização de documentos"] },
        { n: 3, titulo: "Formulários", topicos: ["Formulários HTML", "Inputs", "Labels", "Tipos de campos", "Validação nativa", "Acessibilidade de formulários"] },
        { n: 4, titulo: "HTML avançado", topicos: ["Tabelas", "Elementos multimídia", "Metadados", "SEO básico", "Acessibilidade", "Boas práticas"] }
      ]
    },
    {
      slug: "css", nome: "CSS3", categoria: AE.CATEGORIA_WEB, nivel: "Iniciante", horas: 40, preco: 119.90, pacote: "frontend",
      resumo: "Estilo, layout e responsividade: da cascata ao Flexbox e ao Grid.",
      descricao: "Aprenda a linguagem de estilos da Web pelos fundamentos (cascata, especificidade, herança), passe por tipografia e box model e domine Flexbox, Grid e design responsivo. O projeto final transforma a página HTML do primeiro curso em um site responsivo.",
      prerequisitos: ["Conhecimento básico de HTML (recomendado: curso HTML5 desta plataforma).", "Um editor de código e um navegador atual."],
      aprendera: [
        "Escrever seletores precisos e prever qual regra vence na cascata.",
        "Controlar tipografia, cores, bordas, sombras e o box model.",
        "Montar layouts com Flexbox e CSS Grid.",
        "Construir páginas responsivas com abordagem mobile first.",
        "Aplicar transições e animações respeitando a acessibilidade visual."
      ],
      modulos: [
        { n: 1, titulo: "Fundamentos", topicos: ["Sintaxe CSS", "Seletores", "Cascata", "Especificidade", "Herança", "Cores", "Unidades"] },
        { n: 2, titulo: "Estilização", topicos: ["Tipografia", "Backgrounds", "Bordas", "Sombras", "Box Model", "Espaçamento", "Posicionamento"] },
        { n: 3, titulo: "Layouts", topicos: ["Display", "Flexbox", "CSS Grid", "Alinhamento", "Distribuição", "Organização de componentes"] },
        { n: 4, titulo: "Responsividade", topicos: ["Media queries", "Mobile First", "Unidades relativas", "Layouts adaptativos", "Acessibilidade visual", "Transições e animações"] }
      ]
    },
    {
      slug: "javascript", nome: "JavaScript", categoria: AE.CATEGORIA_WEB, nivel: "Intermediário", horas: 60, preco: 179.90, pacote: "frontend",
      resumo: "Lógica de programação e interatividade: da sintaxe ao consumo de APIs.",
      descricao: "Fundamentos da linguagem, funções, estruturas de dados, manipulação do DOM e JavaScript moderno (ES6+, Promises, async/await e Fetch). No projeto final você adiciona interatividade, validação e consumo de API ao site construído nos cursos anteriores.",
      prerequisitos: ["HTML e CSS básicos (recomendado: cursos HTML5 e CSS3 desta plataforma).", "Lógica elementar (sequência, decisão e repetição) ajuda, mas é revista no curso."],
      aprendera: [
        "Declarar variáveis, usar tipos de dados, operadores, condicionais e laços.",
        "Escrever funções, entender escopo e trabalhar com arrays e objetos.",
        "Selecionar elementos, tratar eventos e atualizar a interface pelo DOM.",
        "Validar formulários e guardar dados no navegador.",
        "Consumir APIs com fetch, Promises e async/await, tratando erros."
      ],
      modulos: [
        { n: 1, titulo: "Fundamentos", topicos: ["Introdução ao JavaScript", "Variáveis", "Tipos de dados", "Operadores", "Condicionais", "Laços"] },
        { n: 2, titulo: "Estruturas e funções", topicos: ["Funções", "Escopo", "Arrays", "Objetos", "Métodos", "Manipulação de dados"] },
        { n: 3, titulo: "JavaScript no navegador", topicos: ["DOM", "Seleção de elementos", "Eventos", "Formulários", "Validação", "Atualização de interfaces"] },
        { n: 4, titulo: "JavaScript moderno", topicos: ["ES6+", "Desestruturação", "Módulos", "Promises", "Async/Await", "Fetch API", "Tratamento de erros", "Armazenamento local"] }
      ]
    }
  ];

  AE.Pacotes = [
    {
      slug: "frontend", nome: "Formação Front-End — Fundamentos", cursos: ["html", "css", "javascript"], preco: 299.90,
      resumo: "HTML5, CSS3 e JavaScript em sequência, com um único projeto que cresce ao longo da formação.",
      descricao: "Trilha de três cursos que se encaixam: a página escrita em HTML ganha identidade e responsividade com CSS e, por fim, comportamento real com JavaScript. A formação termina com um projeto integrador que reúne tudo.",
      categoria: AE.CATEGORIA_WEB, nivel: "Iniciante"
    }
  ];

  AE.curso = (slug) => AE.Cursos.find((c) => c.slug === slug) || null;
  AE.pacote = (slug) => AE.Pacotes.find((p) => p.slug === slug) || null;
  AE.horasPacote = (p) => p.cursos.reduce((s, c) => s + AE.curso(c).horas, 0);
  AE.somaCursos = (p) => Math.round(p.cursos.reduce((s, c) => s + AE.curso(c).preco, 0) * 100) / 100;
})(window.AE);
