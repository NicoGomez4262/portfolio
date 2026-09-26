"""
Procesa fotos y videos de incoming/ para el sitio (public/media/…).

  python scripts/media.py video <origen> <destino-sin-ext> [--ss S] [--to S] [--crop W:H:X:Y] [--width N] [--crf N] [--poster S]
  python scripts/media.py image <origen> <destino-sin-ext> [--max N] [--box l,t,r,b] [--trim-black] [--quality N]
  python scripts/media.py still <video> <destino-sin-ext> --at S [--max N]

- video: recorta el tramo [--ss, --to], quita el audio, convierte HDR (HLG/PQ de celular) a SDR,
  recorta (--crop en píxeles del cuadro ya rotado), escala a --width de ancho (alto par), baja a 30 fps y
  codifica H.264 (High, yuv420p, +faststart). Deja <destino>.mp4 y su póster <destino>.webp
  (fotograma en el segundo --poster del clip ya recortado).
- image: aplica la orientación EXIF, recorta (--box en fracciones 0–1, o --trim-black para quitar
  franjas negras de capturas de pantalla), escala el lado largo a --max y guarda WebP sin metadatos.
  Lee HEIF/HEIC si está instalado pillow-heif.
- still: saca un fotograma de un video como WebP (p. ej. una foto del prototipo desde un video largo).

ffmpeg: variable FFMPEG o `ffmpeg` en el PATH (sirve el binario portátil de `npm i ffmpeg-static`).
"""
import argparse
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

try:  # HEIF/HEIC del celular (opcional)
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

FFMPEG = os.environ.get('FFMPEG', 'ffmpeg')
TONEMAP = 'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv'


def run(args):
    r = subprocess.run(args, capture_output=True, text=True, errors='replace')
    if r.returncode:
        sys.exit(r.stderr[-2000:])
    return r


def probe(src):
    info = subprocess.run([FFMPEG, '-hide_banner', '-i', str(src)], capture_output=True, text=True, errors='replace').stderr
    hdr = bool(re.search(r'arib-std-b67|smpte2084', info))
    return hdr


def save_webp(img, dst, quality=80):
    img = img.convert('RGB')
    img.save(f'{dst}.webp', 'WEBP', quality=quality, method=6)
    return Path(f'{dst}.webp')


def video(a):
    Path(a.dst).parent.mkdir(parents=True, exist_ok=True)
    hdr = probe(a.src)
    chain = ['fps=30']
    if a.crop:
        chain.append(f'crop={a.crop}')
    if hdr:
        # Escala antes de pasar a flotante: el mapeo de tonos a 4K es lento.
        chain.append(f'zscale=w={a.width}:h=-2:f=lanczos')
        chain.append(TONEMAP)
    else:
        chain.append(f'scale={a.width}:-2:flags=lanczos')
    chain.append('format=yuv420p')
    cut = (['-ss', str(a.ss)] if a.ss else []) + (['-to', str(a.to)] if a.to else [])
    out = f'{a.dst}.mp4'
    run([FFMPEG, '-v', 'error', '-y', *cut, '-i', str(a.src), '-map', '0:v:0', '-an', '-vf', ','.join(chain),
         '-c:v', 'libx264', '-preset', 'slow', '-crf', str(a.crf), '-profile:v', 'high', '-pix_fmt', 'yuv420p',
         '-movflags', '+faststart', '-tag:v', 'avc1', out])
    poster(out, a.dst, a.poster)
    size = os.path.getsize(out) / 1e6
    print(f'{out}  {size:.2f} MB  (+ póster .webp)')


def poster(clip, dst, at):
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / 'p.png'
        run([FFMPEG, '-v', 'error', '-y', '-ss', str(at), '-i', clip, '-frames:v', '1', str(png)])
        save_webp(Image.open(png), dst, quality=78)


def image(a):
    Path(a.dst).parent.mkdir(parents=True, exist_ok=True)
    img = ImageOps.exif_transpose(Image.open(a.src)).convert('RGB')
    if a.trim_black:
        mask = img.convert('L').point(lambda v: 255 if v > 18 else 0)
        box = mask.getbbox()
        if box:
            img = img.crop(box)
    if a.box:
        l, t, r, b = (float(v) for v in a.box.split(','))
        w, h = img.size
        img = img.crop((round(l * w), round(t * h), round(r * w), round(b * h)))
    img.thumbnail((a.max, a.max), Image.LANCZOS)
    out = save_webp(img, a.dst, a.quality)
    print(f'{out}  {img.size[0]}x{img.size[1]}  {os.path.getsize(out) / 1e3:.0f} KB')


def still(a):
    Path(a.dst).parent.mkdir(parents=True, exist_ok=True)
    hdr = probe(a.src)
    with tempfile.TemporaryDirectory() as tmp:
        png = Path(tmp) / 's.png'
        vf = (TONEMAP + ',format=yuv420p') if hdr else 'null'
        run([FFMPEG, '-v', 'error', '-y', '-ss', str(a.at), '-i', str(a.src), '-frames:v', '1', '-vf', vf, str(png)])
        img = Image.open(png)
        img.thumbnail((a.max, a.max), Image.LANCZOS)
        out = save_webp(img, a.dst, a.quality)
    print(f'{out}  {img.size[0]}x{img.size[1]}  {os.path.getsize(out) / 1e3:.0f} KB')


if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest='cmd', required=True)

    v = sub.add_parser('video')
    v.add_argument('src')
    v.add_argument('dst')
    v.add_argument('--ss', type=float)
    v.add_argument('--to', type=float)
    v.add_argument('--crop')
    v.add_argument('--width', type=int, default=1280)
    v.add_argument('--crf', type=int, default=27)
    v.add_argument('--poster', type=float, default=1.0)
    v.set_defaults(fn=video)

    i = sub.add_parser('image')
    i.add_argument('src')
    i.add_argument('dst')
    i.add_argument('--max', type=int, default=1600)
    i.add_argument('--box')
    i.add_argument('--trim-black', action='store_true')
    i.add_argument('--quality', type=int, default=80)
    i.set_defaults(fn=image)

    s = sub.add_parser('still')
    s.add_argument('src')
    s.add_argument('dst')
    s.add_argument('--at', type=float, required=True)
    s.add_argument('--max', type=int, default=1600)
    s.add_argument('--quality', type=int, default=80)
    s.set_defaults(fn=still)

    args = p.parse_args()
    args.fn(args)
