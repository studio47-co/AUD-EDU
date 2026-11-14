#!/usr/bin/env node
/* Gera a VERSÃO (hash do conteúdo) e a lista de pré-cache dentro de sw.js.
   Uso:  node tools/gerar-sw.js          (rode depois de qualquer alteração no app)
         node tools/gerar-sw.js --check  (falha se o sw.js estiver desatualizado)
   Ferramenta de desenvolvimento: usa só módulos nativos do Node. */
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const RAIZ = path.resolve(__dirname, "..");
const PASTAS = [["css", /\.css$/], ["js", /\.js$/], ["icons", /\.png$/], ["assets/fonts", /\.woff2$/]];
const SOLTOS = ["index.html", "offline.html", "manifest.webmanifest"];

function listar(pasta, filtro) {
  const saida = [];
  (function andar(dir) {
    for (const e of fs.readdirSync(path.join(RAIZ, dir), { withFileTypes: true })) {
      const rel = path.posix.join(dir, e.name);
      if (e.isDirectory()) andar(rel); else if (filtro.test(e.name)) saida.push(rel);
    }
  })(pasta);
  return saida;
}

const arquivos = [...SOLTOS, ...PASTAS.flatMap(([p, f]) => listar(p, f))].sort();
const hash = crypto.createHash("sha256");
for (const a of arquivos) { hash.update(a + "\0"); hash.update(fs.readFileSync(path.join(RAIZ, a))); }
const versao = hash.digest("hex").slice(0, 12);

const alvo = path.join(RAIZ, "sw.js");
const atual = fs.readFileSync(alvo, "utf8");
const bloco = `/*GERADO:INICIO*/\nconst VERSAO = ${JSON.stringify(versao)};\nconst PRECACHE = ${JSON.stringify(arquivos, null, 2)};\n/*GERADO:FIM*/`;
const novo = atual.replace(/\/\*GERADO:INICIO\*\/[\s\S]*?\/\*GERADO:FIM\*\//, bloco);

if (process.argv.includes("--check")) {
  if (novo !== atual) { console.error("sw.js desatualizado: rode `node tools/gerar-sw.js`"); process.exit(1); }
  console.log("sw.js em dia · versão", versao, "·", arquivos.length, "arquivos"); process.exit(0);
}
fs.writeFileSync(alvo, novo);
console.log("sw.js atualizado · versão", versao, "·", arquivos.length, "arquivos no pré-cache");
