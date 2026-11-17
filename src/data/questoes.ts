/** Banco demonstrativo de questões: múltipla escolha, verdadeiro/falso, identificação de erros e interpretação de código. */
export type Tipo = "mc" | "vf" | "erro" | "cod";
export type Questao = { id: string; tipo: Tipo; enunciado: string; codigo?: string; alts: string[]; certa: number; explicacao: string };
export const ROTULOS: Record<Tipo, string> = { mc: "Múltipla escolha", vf: "Verdadeiro ou falso", erro: "Identificação de erros", cod: "Interpretação de código" };
const VF = ["Verdadeiro", "Falso"];

const q = (id: string, tipo: Tipo, enunciado: string, alts: string[], certa: number, explicacao: string, codigo?: string): Questao => ({ id, tipo, enunciado, alts, certa, explicacao, codigo });

export const banco: Record<string, Record<number, Questao[]>> = {
  html: {
    1: [
      q("h1a", "mc", "Qual elemento marca o título principal de uma página?", ["<title>", "<h1>", "<header>", "<head>"], 1, "h1 é o título principal do conteúdo; title é o nome exibido na aba."),
      q("h1b", "vf", "HTML é uma linguagem de marcação que descreve a estrutura do conteúdo.", VF, 0, "HTML marca o significado; aparência é papel do CSS."),
      q("h1c", "erro", "Qual é o erro neste documento?", ["A declaração DOCTYPE está ausente", "O title está dentro do body", "O parágrafo não foi fechado", "O lang está errado"], 1, "O title pertence ao head.", "<html lang=\"pt-BR\">\n<head></head>\n<body>\n  <title>Minha página</title>\n  <p>Olá</p>\n</body>\n</html>"),
      q("h1d", "cod", "O que este código exibe na página?", ["Apenas o texto \"Olá\"", "Um título com \"Olá\" e nada mais", "Um parágrafo com a palavra \"Olá\"", "Nada, o comentário cobre tudo"], 1, "O comentário é ignorado e o h1 exibe o título.", "<!-- saudação -->\n<h1>Olá</h1>")
    ],
    2: [
      q("h2a", "mc", "Qual elemento deve envolver o menu principal?", ["<menu>", "<nav>", "<aside>", "<section>"], 1, "nav marca blocos de navegação."),
      q("h2b", "vf", "Pode haver vários elementos main na mesma página.", VF, 1, "main deve aparecer uma única vez."),
      q("h2c", "erro", "O que está incorreto neste trecho?", ["A imagem não tem texto alternativo", "O atributo src é inválido", "A tag p está mal fechada", "O h2 deveria ser h1"], 0, "Imagens informativas precisam de alt.", "<img src=\"foto.jpg\">"),
      q("h2d", "cod", "Qual será o resultado visual?", ["Lista numerada com dois itens", "Lista com marcadores e dois itens", "Dois parágrafos", "Uma tabela"], 0, "ol cria lista numerada.", "<ol>\n  <li>Abrir</li>\n  <li>Salvar</li>\n</ol>")
    ],
    3: [
      q("h3a", "mc", "Qual atributo liga um label ao seu campo?", ["name", "for", "href", "src"], 1, "for do label aponta para o id do campo."),
      q("h3b", "vf", "O placeholder substitui o label para fins de acessibilidade.", VF, 1, "Placeholder some ao digitar e não substitui o label."),
      q("h3c", "erro", "Por que este campo não envia seu valor?", ["Falta o atributo name", "Falta o type", "Falta o id", "Falta o for"], 0, "Sem name o dado não é enviado.", "<input type=\"text\" id=\"nome\">"),
      q("h3d", "cod", "O que acontece ao enviar este formulário vazio?", ["O navegador bloqueia e pede o preenchimento", "Os dados são enviados em branco", "A página recarrega", "Nada"], 0, "required aciona a validação nativa.", "<form>\n  <input name=\"email\" type=\"email\" required>\n  <button>Enviar</button>\n</form>")
    ],
    4: [
      q("h4a", "mc", "Qual elemento dá título a uma tabela?", ["<title>", "<caption>", "<thead>", "<legend>"], 1, "caption descreve a tabela."),
      q("h4b", "vf", "A meta viewport é importante para páginas responsivas em celulares.", VF, 0, "Sem ela o celular simula uma tela larga."),
      q("h4c", "erro", "O que há de errado neste vídeo?", ["Não há legendas nem alternativa em texto", "Falta o atributo href", "controls é inválido", "width deveria ser maior"], 0, "Conteúdo de mídia precisa de legendas ou transcrição.", "<video controls src=\"aula.mp4\"></video>"),
      q("h4d", "cod", "Qual é o papel do atributo aria-expanded?", ["Informa se o menu está aberto", "Altera a cor do botão", "Define a largura", "Carrega um script"], 0, "Comunica o estado a tecnologias assistivas.", "<button aria-expanded=\"false\" aria-controls=\"menu\">Menu</button>")
    ]
  },
  css: { 0: [
    q("c1", "mc", "Qual propriedade altera a cor do texto?", ["background", "color", "font", "border"], 1, "color define a cor do texto."),
    q("c2", "vf", "Seletores de classe começam com ponto.", VF, 0, ".nome seleciona uma classe."),
    q("c3", "erro", "Por que esta regra não funciona?", ["Falta o ponto e vírgula entre declarações", "A cor é inválida", "O seletor está errado", "Nada está errado"], 0, "Declarações são separadas por ponto e vírgula.", "p { color: red font-size: 16px; }"),
    q("c4", "cod", "Quantas colunas cria este grid?", ["Duas", "Três", "Quatro", "Uma"], 1, "repeat(3, 1fr) cria três colunas iguais.", ".galeria { display: grid; grid-template-columns: repeat(3, 1fr); }")
  ] },
  javascript: { 0: [
    q("j1", "mc", "Qual palavra declara uma constante?", ["var", "let", "const", "def"], 2, "const declara um valor que não é reatribuído."),
    q("j2", "vf", "O operador === compara valor e tipo.", VF, 0, "=== é a igualdade estrita."),
    q("j3", "erro", "O que há de errado neste código?", ["Reatribuição de uma const", "Falta ponto e vírgula", "O console.log está errado", "Nada"], 0, "Uma const não pode ser reatribuída.", "const total = 1;\ntotal = 2;"),
    q("j4", "cod", "Qual é a saída?", ["6", "\"24\"", "24", "undefined"], 0, "A função soma 2 + 4.", "const soma = (a, b) => a + b;\nconsole.log(soma(2, 4));")
  ] }
};
export const questoesDe = (curso: string, modulo: number) => banco[curso]?.[modulo] ?? banco[curso]?.[0] ?? [];
export const todasDoCurso = (curso: string) => Object.values(banco[curso] ?? {}).flat();
