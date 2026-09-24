# Portfolio — Nicolás Andrés Gómez Ramírez

Sitio personal de una sola página, **hardware-first**, pensado para aplicar a prácticas de
hardware / ingeniería eléctrica (enfoque Kiwibot / robot.com, ver [`docs/kiwibot-research.md`](docs/kiwibot-research.md)).
Bilingüe con **inglés por defecto** y toggle a español, tema oscuro y claro.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion 13 · desplegado en Vercel.

---

## Cómo correrlo

```bash
npm install
npm run dev       # desarrollo con recarga en caliente
npm run build     # compila a dist/
npm run preview   # sirve dist/ en local
```

Cada `git push` a `main` redespliega en Vercel (si el repo está conectado).

---

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| **Dominio** (OG, canonical, JSON-LD, robots.txt, sitemap.xml) | `site.config.js` → `SITE_URL`. Única línea a cambiar al conectar el dominio. |
| **Correo** | `src/data/content.js` → `PROFILE.email`. Único lugar. |
| **Todo el texto** (EN y ES) | `src/data/content.js` |
| Título y descripción SEO | `vite.config.js` → `TITLE`, `DESCRIPTION` |
| Colores y tipografía | `src/index.css` (tokens por tema) |

Constantes de `content.js`:

| Constante | Qué controla |
| --- | --- |
| `PROFILE` | Nombre, correo, GitHub, LinkedIn, foto, CV, promedio |
| `SEEKING` | Badge del hero ("Seeking a Hardware / Electrical Engineering Internship") y fechas |
| `SECTIONS` | Interruptores de secciones (`lab: false` oculta la galería del laboratorio) |
| `UI` | Textos de interfaz, `en` y `es` |
| `ABOUT` | Perfil y áreas de enfoque |
| `HARDWARE` | Proyectos de hardware: specs, "qué hice", galería de slots |
| `SOFTWARE` | Bloque "Software that talks to hardware" |
| `LAB` | 9 fotos del laboratorio con su pie de foto |
| `EXPERIENCE`, `EDUCATION`, `LANGUAGES`, `SKILLS` | Lo que dice su nombre |

**Datos pendientes:** se marcan con `⚠ PENDIENTE` y valen `null`. El sitio los muestra como un
hueco de diseño rayado ("To be confirmed" / "Coming soon"), nunca como texto inventado.
Busca `⚠` en `content.js` para ver la lista completa.

---

## Fotos y videos: qué archivo va en qué ruta

El componente `<Media>` busca archivos por **ruta base sin extensión** y usa el primero que exista, en este orden:
`.mp4` (solo en slots de video) → `.webp` → `.jpg` → `.jpeg` → `.png`.
Si no hay ninguno, muestra un placeholder diseñado con icono y etiqueta. Solo hay que soltar el
archivo en la carpeta y redesplegar; no hace falta tocar código.

> Un manifiesto generado en build sabe qué archivos existen, así que un slot vacío **no** genera un 404.
> En `npm run dev` se recarga solo al agregar o borrar archivos.

### Formatos recomendados

| Tipo | Formato | Tamaño | Peso objetivo |
| --- | --- | --- | --- |
| Portada de proyecto (`cover`) | WebP (o JPG) | **1600 × 1000** (16:10) | < 250 KB |
| Esquemático / layout de PCB | WebP o PNG, fondo claro, recortado | 1600 × 1000 | < 300 KB |
| Placa ensamblada / captura de osciloscopio | WebP o JPG | 1600 × 1000 | < 250 KB |
| Video demo | MP4 H.264, **sin audio**, 10–20 s, 720p | 1280 × 800 | < 4 MB |
| Poster del video | Mismo nombre que el video en `.webp` | 1600 × 1000 | < 200 KB |
| Foto de laboratorio | WebP o JPG | **1200 × 900** (4:3) | < 200 KB |
| Foto personal | JPG o WebP, vertical | **800 × 1000** (4:5) | < 200 KB |

Convertir a WebP: `npx sharp-cli -i foto.jpg -o foto.webp --format webp --quality 80`
(o [squoosh.app](https://squoosh.app)).

### Mapa de rutas

```
public/
├── assets/
│   ├── foto.jpg                  ← foto personal (hero)
│   └── Nicolas_Gomez_CV.pdf      ← CV que se descarga
└── media/
    ├── projects/
    │   ├── fir-pic/        cover · schematic · board · scope · demo(.mp4)
    │   ├── custom-pcbs/    cover · schematic · pcb · board
    │   ├── proteo/         cover · board · schematic · demo(.mp4)
    │   ├── conveyor/       cover · schematic · board · demo(.mp4)
    │   └── dreamsnake/     cover · board · demo(.mp4)
    └── lab/
        └── 01 … 09               ← galería "On the bench"
```

Ejemplos: `public/media/projects/fir-pic/scope.webp`, `public/media/projects/proteo/demo.mp4`
(+ `demo.webp` como poster), `public/media/lab/03.jpg`.

Los slots de cada proyecto se definen en `HARDWARE[].gallery` dentro de `content.js`.
Para la galería del laboratorio, escribe el pie de foto en `LAB[].caption`.

---

## SEO y producción

- `index.html` usa marcadores (`%SITE_URL%`, `%TITLE%`, `%DESCRIPTION%`, `%JSON_LD%`) que llena el plugin `seo()` de `vite.config.js`.
- **JSON-LD `Person`**: alumniOf Javeriana y Merani, knowsLanguage, sameAs GitHub (y LinkedIn cuando exista).
- `robots.txt` y `sitemap.xml` se generan en el build a partir de `SITE_URL`.
- Imagen Open Graph / Twitter: `public/og.png` (1200 × 630).
- Favicons: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`.
- `public/404.html` es la página de error; Vercel la sirve sola.

## Conectar el dominio

1. `npx vercel domains add <dominio>` (o Vercel → Project → Settings → Domains).
2. Si el dominio no está en Vercel: registro `A` del apex → `76.76.21.21`, y `CNAME` de `www` → `cname.vercel-dns.com`
   (Vercel muestra los valores exactos del proyecto en Settings → Domains).
3. Cambiar `SITE_URL` en `site.config.js`, hacer commit y push.

## Notas de implementación

- **Tema e idioma** se guardan en `localStorage` (`ng-theme`, `ng-lang`) dentro de un `try/catch`, y un script en
  `index.html` los aplica antes del primer pintado para evitar parpadeo.
- **Animación:** solo `transform`/`opacity` (más las trazas del hero con `stroke-dashoffset`, una vez, ≤ 1.2 s).
  Todo respeta `prefers-reduced-motion`. Si el `IntersectionObserver` no existe o la pestaña está oculta,
  el contenido se muestra directamente.
- **GitHub en vivo:** API pública sin token, caché de 6 h; los valores en 0 no se muestran.
- **Contraste AA** verificado en ambos temas; áreas táctiles de al menos 44 px.
