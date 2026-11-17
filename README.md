# AUDMANI Education — Versão estática de apresentação

Demonstração frontend (React + TypeScript + Vite) da AUDMANI Education V3. **Todos os dados são fictícios** e nada sai do navegador: não há servidor, login, pagamento nem banco de dados.

## Executar
```bash
npm install
npm run dev        # desenvolvimento (http://localhost:5173)
npm run build      # gera a versão estática em dist/
npm run preview    # serve dist/ em http://localhost:4173
```
O build usa `base: "./"` e rotas por hash (`#/rota`), então `dist/` funciona em qualquer hospedagem estática.

## Páginas
- **Públicas:** `#/inicio`, `#/catalogo` (filtros de busca, categoria e nível), `#/curso/html`, `#/formacao/frontend`, `#/metodologia`, `#/como-funciona`, `#/verificar` (código de exemplo: DEMO-0000).
- **Aluno (Alex Martins):** `#/painel`, `#/biblioteca`, `#/aprender/html` (23 aulas navegáveis), `#/atividades`, `#/simulados`, `#/projetos`, `#/certificados`, `#/notas`, `#/conta`, `#/configuracoes`.
- **AUDMANI Control (demonstração):** `#/control/geral`, `usuarios`, `matriculas`, `cursos`, `conteudos`, `avaliacoes`, `projetos`, `certificados`, `monitoramento`, `auditoria`, `configuracoes`.

## Estrutura
```
src/
  App.tsx, main.tsx, lib.ts      layouts, roteamento por hash e estado local
  components/                    UI, Code (bloco de código), Quiz, Modal
  pages/                         páginas públicas e do aluno
  control/                       AUDMANI Control e seus dados fictícios
  data/                          catálogo, aulas HTML5, questões, dados do aluno
  styles/                        CSS da identidade visual + complementos da demo
```

## Origem visual
Os arquivos `ava-core.css`, `education.css` e `control.css` e as fontes Inter foram copiados da cópia local do V3 para manter a identidade visual. Nenhum arquivo da plataforma original foi alterado. Nenhum dado de usuário, e-mail, log ou banco foi copiado; o catálogo usa apenas textos e valores de referência públicos dos cursos.
