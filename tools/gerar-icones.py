#!/usr/bin/env python3
"""Gera os ícones do PWA a partir da marca existente (.brand-mark do AVA):
quadrado arredondado #141414 com a letra "A" em Inter 700, cor #eeebe5.
Uso:  python3 tools/gerar-icones.py        (requer: pip install pillow fonttools brotli)
Ferramenta de desenvolvimento: NÃO é necessária para executar a plataforma."""
import io, pathlib
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FUNDO, TINTA = "#141414", "#eeebe5"          # --accent / --on-accent do tema claro
ESCALA_LETRA = 0.40                          # altura da letra / lado (dentro da zona segura do maskable)

def fonte(px):
    f = TTFont(str(RAIZ / "assets/fonts/inter-latin-700-normal.woff2")); f.flavor = None
    buf = io.BytesIO(); f.save(buf); buf.seek(0)
    return ImageFont.truetype(buf, px)

def desenhar(lado, raio_pct, transparente):
    S = 4                                                   # supersampling
    L = lado * S
    img = Image.new("RGBA", (L, L), (0, 0, 0, 0) if transparente else FUNDO)
    d = ImageDraw.Draw(img)
    if transparente:
        d.rounded_rectangle((0, 0, L - 1, L - 1), radius=int(L * raio_pct), fill=FUNDO)
    ft = fonte(int(L * ESCALA_LETRA / 0.727))               # cap-height do Inter ≈ 0,727 em
    cx, cy = L / 2, L / 2
    d.text((cx, cy), "A", font=ft, fill=TINTA, anchor="mm")
    box = d.textbbox((cx, cy), "A", font=ft, anchor="mm")   # centraliza opticamente pela caixa real
    dx, dy = cx - (box[0] + box[2]) / 2, cy - (box[1] + box[3]) / 2
    img2 = Image.new("RGBA", (L, L), (0, 0, 0, 0) if transparente else FUNDO)
    d2 = ImageDraw.Draw(img2)
    if transparente:
        d2.rounded_rectangle((0, 0, L - 1, L - 1), radius=int(L * raio_pct), fill=FUNDO)
    d2.text((cx + dx, cy + dy), "A", font=ft, fill=TINTA, anchor="mm")
    return img2.resize((lado, lado), Image.LANCZOS)

saidas = {
    "icon-192.png":          (192, 0.35, True),    # "any": mesma proporção da .brand-mark (14/40)
    "icon-512.png":          (512, 0.35, True),
    "icon-maskable-512.png": (512, 0.0,  False),   # sangra até a borda; letra na zona segura
    "apple-touch-icon.png":  (180, 0.0,  False),   # iOS: opaco, o sistema arredonda
    "favicon-48.png":        (48,  0.35, True),
}
pasta = RAIZ / "icons"; pasta.mkdir(exist_ok=True)
for nome, (lado, raio, transp) in saidas.items():
    im = desenhar(lado, raio, transp)
    (im if transp else im.convert("RGB")).save(pasta / nome, optimize=True); print("ok", nome)
