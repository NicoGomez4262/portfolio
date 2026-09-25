# Portfolio — Nicolás Andrés Gómez Ramírez

Sitio personal de una sola página, **hardware-first**, pensado para aplicar a prácticas de
hardware / ingeniería eléctrica (enfoque Kiwibot / robot.com, ver [`docs/kiwibot-research.md`](docs/kiwibot-research.md)).
Bilingüe con **inglés por defecto** y toggle a español, tema oscuro y claro.

**En vivo:** <https://nicolasgomez.dev> · **Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Framer Motion 13 · Vercel.

> **¿Retomando el trabajo?** Lee primero [`docs/next_session.md`](docs/next_session.md): tiene el prompt
> con lo pendiente de la sesión anterior y lo que falta entregar (ver también
> [`docs/MATERIALS.md`](docs/MATERIALS.md)).

---

## Cómo correrlo

```bash
npm install
npm run dev       # desarrollo con recarga en caliente
npm run build     # compila a dist/
npm run preview   # sirve dist/ en local (puerto 4173)
npm run lint      # oxlint
```

**Despliegue:** el proyecto de Vercel «portfolio» está conectado a este repo. Cada `git push` a `main`
despliega a producción. Respaldo manual: `npx vercel --prod` (requiere `npx vercel login`).

### Scripts de apoyo

| Script | Qué hace |
| --- | --- |
| `node scripts/verify.mjs [URL] [carpeta]` | Chrome headless por CDP: recorre la página con `scrollTo` instantáneo, captura página completa (`captureBeyondViewport`) en 390 / 768 / 1024 / 1440 y ambos temas, audita scroll horizontal y áreas táctiles < 44 px en 8 anchos, y prueba el selector de hoja de vida y el modal. Informe en `<carpeta>/report.json`. Variables: `WIDTHS`, `FULL`, `THEMES`. |
| `python scripts/stitch.py <carpeta>` | Une los tramos `.partN.png` de `verify.mjs` en un JPEG por captura. |
| `node scripts/og.mjs` | Regenera `public/og.png` (1200 × 630) desde `scripts/og.html` con los datos de `content.js` y `site.config.js`. |
| `python scripts/build_cv.py` | Regenera el CV de **respaldo** en inglés (`public/assets/Nicolas_Gomez_CV.pdf`, exportado con Word). Solo se ofrece mientras falte el CV EN ATS propio. |

---

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| **Dominio** (OG, canonical, JSON-LD, robots.txt, sitemap.xml) | `site.config.js` → `SITE_URL`. Única línea. |
| **Correo, teléfono / WhatsApp, LinkedIn, promedio** | `src/data/content.js` → `PROFILE`. Único lugar de cada dato. |
| **URLs de instituciones** (Javeriana, Merani, Programa Tú, Berlitz) | `content.js` → `INSTITUTIONS`. En los textos se escriben como `{merani}` y se pintan como enlace. |
| **Hojas de vida** | `content.js` → `CV_FILES[idioma][formato]` y `CV_BACKUP`. |
| **Todo el texto** (EN y ES) | `src/data/content.js` |
| Título y descripción SEO | `vite.config.js` → `TITLE`, `DESCRIPTION` |
| Colores y tipografía | `src/index.css` (tokens por tema) |

Constantes de `content.js`:

| Constante | Qué controla |
| --- | --- |
| `INSTITUTIONS` | Nombre y sitio oficial de cada institución |
| `PROFILE` | Nombre, correo, teléfono, WhatsApp, GitHub, LinkedIn, foto, promedio, PCB diseñadas |
| `CV_FILES`, `CV_BACKUP`, `CV_FORMATS` | Rutas de las 4 hojas de vida y del respaldo generado |
| `SEEKING` | Badge del hero y fechas de disponibilidad |
| `SECTIONS` | Interruptores de secciones (`lab: 'auto'` la muestra con 3+ fotos) |
| `HERO_CHIP` | Rótulos de los pines del integrado del hero |
| `UI` | Textos de interfaz, `en` y `es` (incluye el mensaje prellenado de WhatsApp) |
| `ABOUT` | Perfil y áreas de enfoque |
| `EXPERIENCE` | Experiencia; `kind: 'academic' \| 'professional'` la separa en dos bloques |
| `HARDWARE` | Proyectos de hardware en orden (define HW-0X): specs, "qué hice", bitácora, pies de foto, materia y equipo |
| `SOFTWARE` | Bloque "Software that talks to hardware" (`hardware` enlaza con su tarjeta de hardware) |
| `LAB` | 9 fotos del laboratorio con su pie de foto |
| `EDUCATION`, `LANGUAGES`, `SKILLS` | Lo que dice su nombre |

**Datos pendientes:** se marcan con `⚠ PENDIENTE` (o `⚠ VERIFICAR`) y valen `null`. El sitio los muestra como un
hueco de diseño rayado ("To be confirmed" / "Coming soon"), nunca como texto inventado.
La lista completa de lo que falta entregar está en [`docs/MATERIALS.md`](docs/MATERIALS.md).

---

## Hojas de vida: idioma × formato

Todos los botones de descarga (hero, nav, menú móvil, contacto) abren un diálogo que pregunta el formato:
**Harvard / International (ATS)** o **Modern sidebar**. El idioma es el del sitio y se cambia dentro del
diálogo sin cerrarlo. Si un archivo no existe, su opción aparece deshabilitada con "Coming soon".

```
public/assets/cv/
├── Nicolas_Gomez_CV_EN_ATS.pdf
├── Nicolas_Gomez_CV_EN_Modern.pdf
├── Nicolas_Gomez_CV_ES_ATS.pdf
└── Nicolas_Gomez_CV_ES_Moderno.pdf
public/assets/Nicolas_Gomez_CV.pdf   ← respaldo generado (solo cubre EN · ATS mientras falte el propio)
```

---

## Fotos y videos: qué archivo va en qué ruta

El componente `<Media>` busca archivos por **ruta base sin extensión** y usa el primero que exista, en este orden:
`.mp4` (solo en slots de video) → `.webp` → `.jpg` → `.jpeg` → `.png`.
Si no hay ninguno, muestra un placeholder diseñado con icono y etiqueta. Solo hay que soltar el archivo en la
carpeta y redesplegar; no hace falta tocar código.

> Un manifiesto generado en build sabe qué archivos existen, así que un slot vacío **no** genera un 404.
> En `npm run dev` se recarga solo al agregar o borrar archivos.
>
> La portada de una tarjeta usa `cover`; si no existe, usa el primer medio real de su bitácora.

### Formatos recomendados

| Tipo | Formato | Tamaño | Peso objetivo |
| --- | --- | --- | --- |
| Portada de proyecto (`cover`) | WebP (o JPG) | **1600 × 1000** (16:10) | < 250 KB |
| Esquemático / layout de PCB / RTL / gráfica | WebP o PNG, recortado | 1600 × 1000 | < 300 KB |
| Placa ensamblada / captura de osciloscopio | WebP o JPG | 1600 × 1000 | < 250 KB |
| Video demo | MP4 H.264, **sin audio**, 10–20 s, 720p | 1280 × 800 | < 4 MB |
| Poster del video | Mismo nombre que el video en `.webp` | 1600 × 1000 | < 200 KB |
| Foto de laboratorio | WebP o JPG | **1200 × 900** (4:3) | < 200 KB |
| Foto personal (avatar) | WebP + JPG de respaldo, **cuadrada** | **480 × 480** | < 80 KB |
| Captura de software (opcional) | WebP | 1600 × 1000 | < 250 KB |

Convertir a WebP: `npx sharp-cli -i foto.jpg -o foto.webp --format webp --quality 80`
(o [squoosh.app](https://squoosh.app)).

### Mapa de rutas

```
public/
├── assets/
│   ├── foto.webp · foto.jpg      ← avatar del hero (sin foto: iniciales NG)
│   ├── cv/                       ← las 4 hojas de vida
│   └── Nicolas_Gomez_CV.pdf      ← CV de respaldo generado
└── media/
    ├── projects/
    │   ├── proteo/         cover · board · schematic · demo(.mp4)
    │   ├── custom-pcbs/    cover · schematic · pcb · board
    │   ├── fir-pic/        cover · schematic · board · scope · demo(.mp4)
    │   ├── volley-pong/    cover · board · demo(.mp4) · scope ✓ · rtl ✓ · schematic ✓
    │   ├── correlacium/    cover · board · demo(.mp4) · plot ✓
    │   ├── conveyor/       cover · schematic · board · demo(.mp4)
    │   └── dreamsnake/     cover · board · demo(.mp4)
    ├── software/<id>/screen      ← captura opcional (proteo-web, voltio-residencial, video-dj, psicosentir)
    └── lab/
        └── 01 … 09               ← galería "On the bench"
```

✓ = ya existe. En VOLLEY-PONG vienen del repo (captura del osciloscopio y esquemático del LM393 del informe del
taller SVGA, vista RTL de Quartus); en CORRELACIUM es una gráfica de las plantillas grabadas en su código.

Los slots de cada proyecto se definen en `HARDWARE[].gallery` y sus pies de foto en `HARDWARE[].captions`.
Para la galería del laboratorio, escribe el pie de foto en `LAB[].caption`.

**Entrega de materiales:** suelta los originales en `incoming/` (ignorada por git); ver `docs/MATERIALS.md`.

---

## SEO y producción

- `index.html` usa marcadores (`%SITE_URL%`, `%TITLE%`, `%DESCRIPTION%`, `%JSON_LD%`, `%CV_NOSCRIPT%`) que llena el plugin `seo()` de `vite.config.js`.
- **JSON-LD `Person`**: teléfono, `sameAs` (GitHub y LinkedIn), `alumniOf` con la URL oficial de cada institución, `knowsLanguage`.
- `<noscript>` enlaza el CV EN ATS (o el respaldo mientras no exista).
- `robots.txt` y `sitemap.xml` se generan en el build a partir de `SITE_URL`.
- Imagen Open Graph / Twitter: `public/og.png` (1200 × 630), generada con `node scripts/og.mjs`.
- Favicons: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`.
- `public/404.html` es la página de error; Vercel la sirve con estado 404 real.

## Dominio

`nicolasgomez.dev` se compró en Vercel, su DNS lo maneja Vercel y está asignado al proyecto «portfolio».
El canonical es el dominio raíz, así que en **Settings → Domains** `www.nicolasgomez.dev` debe redirigir (308)
a `nicolasgomez.dev`, y no al revés.

## Notas de implementación

- **Tema e idioma** se guardan en `localStorage` (`ng-theme`, `ng-lang`) dentro de un `try/catch`, y un script en
  `index.html` los aplica antes del primer pintado para evitar parpadeo.
- **Diálogos** (hoja de vida y modal de proyecto): `useDialog` da foco inicial, trampa de foco, cierre con Escape y
  bloqueo de scroll con contador (`scrollLock.js`), para que el menú móvil, el modal y el diálogo se apilen bien.
  En móvil funcionan como bottom sheet con scroll interno.
- **Animación:** solo `transform`/`opacity` (más las trazas del hero con `stroke-dashoffset`, una vez, ≤ 1.2 s).
  Todo respeta `prefers-reduced-motion`. Si el `IntersectionObserver` no existe o la pestaña está oculta,
  el contenido se muestra directamente.
- **GitHub en vivo:** API pública sin token, caché de 6 h; los valores en 0 no se muestran.
- **Contraste AA** verificado en ambos temas; áreas táctiles de al menos 44 px.
