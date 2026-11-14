/* ==========================================================
   COMPONENTE — bloco de código (inset do AVA) + realce monocromático
   O realce usa só peso/estilo (comentário esmaecido, palavra-chave em negrito,
   texto entre aspas sublinhado pontilhado) para não criar cores fora da paleta.
   ========================================================== */
(function (AE) {
  const PALAVRAS_JS = "const|let|var|function|return|if|else|for|while|do|of|in|new|class|extends|import|export|from|default|async|await|try|catch|finally|throw|switch|case|break|continue|typeof|instanceof|null|undefined|true|false|this|static";

  const GRAMATICAS = {
    js: new RegExp(`(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|("(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|\`(?:\\\\.|[^\`\\\\])*\`)|\\b(${PALAVRAS_JS})\\b`, "g"),
    css: /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[a-zA-Z-]+|!important|:root)/g,
    html: /(<!--[\s\S]*?-->)|("[^"\n]*"|'[^'\n]*')|(<\/?[a-zA-Z][\w-]*|<!DOCTYPE|\/?>)/gi
  };
  GRAMATICAS.javascript = GRAMATICAS.js;

  /** Devolve HTML seguro com <span class="tk-*">. */
  AE.realcar = function (codigo, lang) {
    const re = GRAMATICAS[lang];
    if (!re) return AE.esc(codigo);
    re.lastIndex = 0;
    let saida = "", pos = 0, m;
    while ((m = re.exec(codigo))) {
      saida += AE.esc(codigo.slice(pos, m.index));
      const classe = m[1] ? "tk-c" : m[2] ? "tk-s" : "tk-k";
      saida += `<span class="${classe}">${AE.esc(m[0])}</span>`;
      pos = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    return saida + AE.esc(codigo.slice(pos));
  };

  const ROTULO_LANG = { html: "HTML", css: "CSS", js: "JavaScript", javascript: "JavaScript", txt: "Texto", json: "JSON" };

  /** {lang, arquivo?, x} -> HTML. Remove a quebra inicial/final do template string. */
  AE.blocoCodigo = function ({ lang = "txt", arquivo, x }) {
    const limpo = String(x).replace(/^\n/, "").replace(/\s+$/, "");
    return `<figure class="code" style="margin:0">
      <div class="code-bar"><span>${AE.esc(arquivo || ROTULO_LANG[lang] || lang)}</span>
        <button class="pill" data-acao="copiar" type="button" aria-label="Copiar código">Copiar</button></div>
      <pre tabindex="0"><code>${AE.realcar(limpo, lang)}</code></pre></figure>`;
  };
})(window.AE);
