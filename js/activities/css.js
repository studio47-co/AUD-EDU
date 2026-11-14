/* Atividades do curso CSS3 — 4 módulos × 6 questões (24).
   Tipos: multipla · vf (0=Verdadeiro, 1=Falso) · codigo · erro · pratico */
AE.Atividades.registrar("css", [

/* ===================== MÓDULO 1 — Fundamentos ===================== */
{ id: "css-1-01", modulo: 1, tipo: "multipla", competencia: "Aplicar CSS a um documento",
  enunciado: "Qual é a forma recomendada de aplicar CSS a várias páginas de um site?",
  alternativas: ["Arquivo `.css` externo ligado com `<link rel=\"stylesheet\">`", "Atributo `style` em cada elemento", "Elemento `<style>` repetido em todas as páginas", "Comentários dentro do HTML"],
  correta: 0,
  explicacao: "Um arquivo externo é reutilizável, fica em cache e mantém o HTML limpo. O `style` inline e o `<style>` em cada página geram repetição e dificultam a manutenção." },
{ id: "css-1-02", modulo: 1, tipo: "vf", competencia: "Calcular especificidade",
  enunciado: "Um seletor de `id` (como `#topo`) tem especificidade maior do que qualquer quantidade de seletores de classe.",
  correta: 0,
  explicacao: "Verdadeiro. A especificidade é comparada coluna a coluna: (1,0,0) vence (0,N,0), por maior que seja N." },
{ id: "css-1-03", modulo: 1, tipo: "codigo", competencia: "Prever o resultado da cascata",
  enunciado: "Dado o CSS e o HTML, qual será a cor do texto?",
  codigo: { lang: "css", x: `p            { color: black; }
.aviso       { color: orange; }
p.aviso      { color: red; }

/* HTML: <p class="aviso">Texto</p> */` },
  alternativas: ["Vermelho", "Laranja", "Preto", "Depende da ordem das regras"],
  correta: 0,
  explicacao: "`p.aviso` tem especificidade (0,1,1), maior que `.aviso` (0,1,0) e `p` (0,0,1). Vence a mais específica, independente da ordem." },
{ id: "css-1-04", modulo: 1, tipo: "erro", competencia: "Identificar erros de sintaxe CSS",
  enunciado: "O título não fica vermelho nem centralizado. Qual é o problema?",
  codigo: { lang: "css", x: `h1 {
  color: red
  text-align: center;
}` },
  alternativas: ["Falta o `;` depois de `red`, o que invalida as duas declarações", "`text-align` não existe", "`h1` deve ser escrito com maiúsculas", "As chaves estão no lugar errado"],
  correta: 0,
  explicacao: "Sem o `;`, o navegador lê `red text-align: center` como um valor só e ignora a declaração inválida." },
{ id: "css-1-05", modulo: 1, tipo: "multipla", competencia: "Escolher unidades adequadas",
  enunciado: "Qual unidade é mais indicada para o tamanho de fonte quando se quer respeitar a preferência de tamanho do usuário?",
  alternativas: ["`rem`", "`px`", "`cm`", "`pt`"],
  correta: 0,
  explicacao: "`rem` é relativo ao tamanho de fonte da raiz, que o usuário pode ajustar. Unidades absolutas (`px`, `cm`, `pt`) não acompanham essa preferência da mesma forma." },
{ id: "css-1-06", modulo: 1, tipo: "pratico", competencia: "Construir uma folha de estilo com variáveis",
  enunciado: "Crie um `estilo.css` ligado a uma página HTML com: variáveis em `:root` para 3 cores e o espaçamento base; fonte do corpo e título com tamanhos em `rem`; links com sublinhado e estado de foco visível; e um componente `.destaque` usando classe.",
  criterios: ["Variáveis declaradas em `:root` e usadas com `var()`", "Tamanhos de fonte em `rem` e `line-height` sem unidade", "Links com `:hover` e `:focus-visible` visíveis", "Uso de classe (não `id`) para o componente", "Contraste do texto verificado (mínimo 4,5:1)"],
  resolucao: { lang: "css", codigo: `:root {
  --cor-fundo: #ffffff;
  --cor-texto: #212529;
  --cor-destaque: #1864ab;
  --espaco: 1rem;
}

body {
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1 { font-size: 2rem; }

a { color: var(--cor-destaque); text-decoration: underline; }
a:hover { text-decoration-thickness: 2px; }
a:focus-visible { outline: 3px solid var(--cor-destaque); outline-offset: 2px; }

.destaque {
  padding: var(--espaco);
  border-left: 4px solid var(--cor-destaque);
  background-color: #e7f5ff;
}`,
    comentario: "As variáveis concentram as decisões visuais. As cores escolhidas têm bom contraste com o fundo. O foco usa `:focus-visible` com contorno de 3px. O componente usa uma classe de baixa especificidade." } },

/* ============ MÓDULO 2 — Estilização ============ */
{ id: "css-2-01", modulo: 2, tipo: "multipla", competencia: "Dominar o box model",
  enunciado: "Com `box-sizing: border-box`, um elemento com `width: 300px`, `padding: 20px` e `border: 2px solid` ocupa, de largura total (sem margens):",
  alternativas: ["300px", "344px", "320px", "342px"],
  correta: 0,
  explicacao: "Em `border-box`, `width` já inclui padding e borda: o elemento ocupa 300px. Em `content-box` seria 300 + 40 + 4 = 344px." },
{ id: "css-2-02", modulo: 2, tipo: "vf", competencia: "Entender o colapso de margens",
  enunciado: "Duas margens verticais adjacentes entre blocos irmãos (`margin-bottom: 40px` e `margin-top: 20px`) resultam em 60px de espaço entre eles.",
  correta: 1,
  explicacao: "Falso. As margens verticais colapsam: vale a maior (40px), não a soma." },
{ id: "css-2-03", modulo: 2, tipo: "codigo", competencia: "Ler regras de posicionamento",
  enunciado: "Onde o selo `.novo` será posicionado?",
  codigo: { lang: "css", x: `.cartao { position: relative; }
.cartao .novo {
  position: absolute;
  top: 8px;
  right: 8px;
}` },
  alternativas: ["No canto superior direito do `.cartao`, a 8px das bordas", "No canto superior direito da janela", "Abaixo do cartão, deslocado 8px", "Não muda de lugar, pois `absolute` não tem efeito"],
  correta: 0,
  explicacao: "`position: relative` no `.cartao` o torna a referência do filho `absolute`, que é posicionado em relação a ele." },
{ id: "css-2-04", modulo: 2, tipo: "erro", competencia: "Diagnosticar problemas de posicionamento",
  enunciado: "O cabeçalho não gruda ao rolar a página. Qual é a causa mais provável?",
  codigo: { lang: "css", x: `header {
  position: sticky;
  background: #fff;
}` },
  alternativas: ["Falta definir um limite como `top: 0`", "`sticky` só funciona com `display: flex`", "É preciso usar `position: static`", "A propriedade `background` impede o efeito"],
  correta: 0,
  explicacao: "`sticky` precisa de um limite (`top`, `bottom`...) para saber quando fixar. Também falha se um ancestral tiver `overflow` diferente de `visible`." },
{ id: "css-2-05", modulo: 2, tipo: "multipla", competencia: "Aplicar tipografia legível",
  enunciado: "Qual prática ajuda a manter a linha de texto em um tamanho confortável de leitura?",
  alternativas: ["`max-width: 65ch` no bloco de texto", "`text-align: justify` em colunas estreitas", "`font-size: 12px` no corpo", "`line-height: 1` nos parágrafos"],
  correta: 0,
  explicacao: "Cerca de 45 a 75 caracteres por linha é a medida de leitura confortável, e `ch` é a unidade ideal para isso." },
{ id: "css-2-06", modulo: 2, tipo: "pratico", competencia: "Estilizar um componente completo",
  enunciado: "Estilize um cartão de curso: título, descrição, selo \"Novo\" sobreposto no canto, botão. Use box-sizing `border-box`, borda arredondada, sombra suave em duas camadas, padding interno consistente e estado `:hover`/`:focus-visible` no botão.",
  criterios: ["`box-sizing: border-box` aplicado globalmente", "Selo posicionado com `relative` + `absolute`", "Sombra em camadas e borda arredondada", "Botão com `:hover` e `:focus-visible` visíveis", "Espaçamento feito com `padding` (interno) e `margin`/`gap` (externo)"],
  resolucao: { lang: "css", codigo: `*, *::before, *::after { box-sizing: border-box; }

.cartao {
  position: relative;
  padding: 1.25rem;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 8px 20px rgb(0 0 0 / 8%);
}

.cartao .novo {
  position: absolute;
  top: -10px;
  right: 12px;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  background-color: #c2410c;
  color: #fff;
  font-size: 0.75rem;
}

.cartao h3 { margin: 0 0 0.5rem; }

.btn {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 8px;
  background-color: #1971c2;
  color: #fff;
  cursor: pointer;
}
.btn:hover { background-color: #1864ab; }
.btn:focus-visible { outline: 3px solid #74c0fc; outline-offset: 2px; }`,
    comentario: "O cartão é a referência do selo (`relative`). Sombra em duas camadas dá profundidade. O botão tem estados de hover e foco visível. Todos os espaçamentos internos usam padding." } },

/* ============ MÓDULO 3 — Layouts ============ */
{ id: "css-3-01", modulo: 3, tipo: "multipla", competencia: "Escolher a ferramenta de layout",
  enunciado: "Para organizar uma galeria de fotos em linhas e colunas que se ajusta ao espaço, a ferramenta mais adequada é:",
  alternativas: ["CSS Grid", "`float`", "Tabela HTML", "`position: absolute` em cada foto"],
  correta: 0,
  explicacao: "Grid organiza em duas dimensões e, com `repeat(auto-fit, minmax(...))`, adapta o número de colunas sem media queries." },
{ id: "css-3-02", modulo: 3, tipo: "vf", competencia: "Entender os eixos do Flexbox",
  enunciado: "Em um contêiner flex com `flex-direction: column`, `justify-content` passa a alinhar os itens no sentido vertical.",
  correta: 0,
  explicacao: "Verdadeiro. `justify-content` atua no eixo principal, que com `column` é vertical. `align-items` passa a atuar no horizontal." },
{ id: "css-3-03", modulo: 3, tipo: "codigo", competencia: "Calcular distribuição de espaço",
  enunciado: "Um contêiner flex tem 900px e três itens com `flex: 1`, `flex: 2` e `flex: 3` (base 0, sem `gap`). Qual a largura do segundo item?",
  codigo: { lang: "css", x: `.container { display: flex; width: 900px; }
.a { flex: 1; }
.b { flex: 2; }
.c { flex: 3; }` },
  alternativas: ["300px", "150px", "200px", "450px"],
  correta: 0,
  explicacao: "Soma dos fatores = 6; cada parte = 900/6 = 150px. O segundo item tem 2 partes = 300px." },
{ id: "css-3-04", modulo: 3, tipo: "erro", competencia: "Depurar um layout em grid",
  enunciado: "O grid não cria colunas. Qual o erro?",
  codigo: { lang: "css", x: `.galeria {
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}` },
  alternativas: ["Falta `display: grid` no contêiner", "`repeat` não pode ser usado com `fr`", "`gap` só vale em flex", "Falta definir `grid-template-rows`"],
  correta: 0,
  explicacao: "As propriedades de grid só têm efeito em um elemento com `display: grid`." },
{ id: "css-3-05", modulo: 3, tipo: "multipla", competencia: "Organizar CSS por camadas e componentes",
  enunciado: "Qual a vantagem de nomear classes com BEM (`.cartao`, `.cartao__titulo`, `.cartao--destaque`)?",
  alternativas: ["Mantém seletores de uma classe só, com especificidade baixa e uniforme", "Permite usar `id` em vez de classes", "Evita a necessidade de arquivos CSS", "Aumenta automaticamente a especificidade dos seletores"],
  correta: 0,
  explicacao: "BEM deixa a relação entre as partes clara no nome e evita seletores aninhados e longos, o que facilita a manutenção." },
{ id: "css-3-06", modulo: 3, tipo: "pratico", competencia: "Construir um layout de página com grid e flex",
  enunciado: "Monte uma página com cabeçalho (logo à esquerda e menu à direita, usando flex), barra lateral, conteúdo com galeria responsiva de cartões (grid com `auto-fit`) e rodapé fixo no fim da janela. Use áreas nomeadas no layout da página.",
  criterios: ["Layout da página com `grid-template-areas`", "Cabeçalho com flex e `margin-left: auto` (ou `justify-content`)", "Galeria com `repeat(auto-fit, minmax(...))`", "Rodapé no fim mesmo com pouco conteúdo", "A ordem do HTML segue a ordem lógica de leitura"],
  resolucao: { lang: "css", codigo: `*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }

.site {
  display: grid;
  grid-template-columns: 14rem 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "cab cab"
    "lat cont"
    "rod rod";
  min-height: 100vh;
  gap: 1rem;
}
.site > header { grid-area: cab; }
.site > aside  { grid-area: lat; }
.site > main   { grid-area: cont; }
.site > footer { grid-area: rod; }

header { display: flex; align-items: center; gap: 1rem; padding: 1rem; }
header .menu { margin-left: auto; display: flex; gap: 1rem; }

.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}`,
    comentario: "O mapa de áreas descreve o layout; a linha `1fr` empurra o rodapé para o fim. O cabeçalho usa flex (uma dimensão), e a galeria usa grid com `auto-fit`. No HTML, a ordem recomendada é header, main, aside, footer, e a posição visual vem do grid." } },

/* ============ MÓDULO 4 — Responsividade ============ */
{ id: "css-4-01", modulo: 4, tipo: "multipla", competencia: "Aplicar Mobile First",
  enunciado: "Na abordagem Mobile First, as media queries usam principalmente:",
  alternativas: ["`min-width`, acrescentando recursos conforme a tela cresce", "`max-width`, desfazendo o que foi definido para desktop", "`orientation: landscape` apenas", "`print` em todas as regras"],
  correta: 0,
  explicacao: "Mobile First escreve o estilo base para telas pequenas e usa `min-width` para acrescentar layouts maiores." },
{ id: "css-4-02", modulo: 4, tipo: "vf", competencia: "Configurar o viewport",
  enunciado: "Sem `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`, navegadores móveis tendem a simular uma tela larga e reduzir a página, e as media queries parecem não funcionar.",
  correta: 0,
  explicacao: "Verdadeiro. Sem o viewport, a largura de layout simulada é em torno de 980px." },
{ id: "css-4-03", modulo: 4, tipo: "codigo", competencia: "Ler tipografia fluida",
  enunciado: "O que a declaração a seguir faz?",
  codigo: { lang: "css", x: `h1 { font-size: clamp(1.75rem, 1.25rem + 2vw, 3rem); }` },
  alternativas: ["O tamanho cresce com a janela, limitado entre 1,75rem e 3rem", "O tamanho é sempre 3rem", "O tamanho é 2vw, sem limites", "A declaração é inválida"],
  correta: 0,
  explicacao: "`clamp(mín, ideal, máx)` usa o valor ideal, mas nunca abaixo de 1,75rem nem acima de 3rem. Misturar `rem` e `vw` preserva a resposta ao zoom." },
{ id: "css-4-04", modulo: 4, tipo: "erro", competencia: "Identificar problemas de acessibilidade visual",
  enunciado: "Qual o problema de acessibilidade deste botão?",
  codigo: { lang: "css", x: `button {
  outline: none;
  background: #1971c2;
  color: #fff;
}` },
  alternativas: ["Remove o indicador de foco do teclado sem substituto", "A cor branca não tem contraste", "`outline` não é uma propriedade válida", "Falta `display: block`"],
  correta: 0,
  explicacao: "Sem `outline` (ou outro indicador), quem usa o teclado não vê onde está. Estilize `:focus-visible` com um contorno visível." },
{ id: "css-4-05", modulo: 4, tipo: "multipla", competencia: "Animar com bom desempenho",
  enunciado: "Quais propriedades são as mais indicadas para animar com bom desempenho?",
  alternativas: ["`transform` e `opacity`", "`width` e `height`", "`margin` e `padding`", "`top` e `left`"],
  correta: 0,
  explicacao: "`transform` e `opacity` não forçam recálculo de layout a cada quadro. As demais alteram o layout e custam mais." },
{ id: "css-4-06", modulo: 4, tipo: "pratico", competencia: "Tornar uma página responsiva e acessível",
  enunciado: "Pegue uma página sua (ou a do projeto de HTML) e torne-a responsiva: viewport, layout Mobile First com pelo menos dois breakpoints em `rem`, imagens com `max-width: 100%`, foco visível, `prefers-reduced-motion` e teste em 320px, 768px e 1280px, além de zoom de 200%.",
  criterios: ["Meta viewport presente", "Estilo base para celular e `min-width` para telas maiores", "Sem rolagem horizontal em 320px nem com zoom de 200%", "Foco visível em todos os elementos interativos", "Animações respeitam `prefers-reduced-motion`", "Contraste de texto verificado"],
  resolucao: { lang: "css", codigo: `*, *::before, *::after { box-sizing: border-box; }
img, video { max-width: 100%; height: auto; }

body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; }
.container { width: min(100% - 2rem, 70rem); margin-inline: auto; }

.cartoes { display: grid; gap: 1rem; }
@media (min-width: 40rem) { .cartoes { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 64rem) { .cartoes { grid-template-columns: repeat(3, 1fr); } }

:focus-visible { outline: 3px solid #1c7ed6; outline-offset: 2px; }

.cartao { transition: transform 0.2s ease; }
.cartao:hover { transform: translateY(-3px); }
@media (prefers-reduced-motion: reduce) {
  .cartao { transition: none; }
  .cartao:hover { transform: none; }
}`,
    comentario: "Não há um único gabarito: o resultado depende da sua página. O exemplo mostra o essencial: layout base para celular, breakpoints em `rem` com `min-width`, mídia flexível, foco visível e movimento reduzido. Valide os critérios testando nas larguras indicadas e com zoom de 200%." } }

]);
