"""
Une los tramos .partN.png que deja scripts/verify.mjs en una sola imagen JPEG por captura.
Uso: python scripts/stitch.py <carpeta> [calidad]
"""
import re
import sys
from pathlib import Path

from PIL import Image

folder = Path(sys.argv[1])
quality = int(sys.argv[2]) if len(sys.argv) > 2 else 80
groups = {}
for part in folder.glob('*.part*.png'):
    base, idx = re.match(r'(.+)\.part(\d+)\.png$', part.name).groups()
    groups.setdefault(base, []).append((int(idx), part))

for base, parts in sorted(groups.items()):
    images = [Image.open(p).convert('RGB') for _, p in sorted(parts)]
    width = max(im.width for im in images)
    out = Image.new('RGB', (width, sum(im.height for im in images)), 'black')
    y = 0
    for im in images:
        out.paste(im, (0, y))
        y += im.height
    dest = folder / f'{base}.jpg'
    out.save(dest, 'JPEG', quality=quality, optimize=True, progressive=True)
    print(f'{dest.name}: {out.width}x{out.height}, {dest.stat().st_size // 1024} KB')
