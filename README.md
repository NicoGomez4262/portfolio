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
| `node scripts/verify.mjs [URL] [carpeta]` | Chrome headless por CDP: recorre la página con `scrollTo` instantáneo, captura página completa (`captureBeyondViewport`) en 390 / 768 / 1024 / 1440 y ambos temas, audita scroll horizontal y áreas táctiles < 44 px en 8 anchos, y prueba los botones de hoja de vida (descarga directa: que el archivo exista; selector: foco, idioma del CV y Escape) y el modal. Informe en `<carpeta>/report.json`. Variables: `WIDTHS`, `FULL`, `THEMES`, `SITE_LANG=es`, y `CDP_PORT` si otro Chrome headless ya usa el puerto 9333. |
| `node scripts/carousel.mjs [URL] [carpeta]` | Prueba el carrusel de medios y el visor en Chrome headless (~2 min, 35 pruebas): arranque solo, avance de fotos y videos, controles con mouse / teclado / toque, deslizar, fin en pausa, visor ampliado y YouTube con movimiento reducido. Los proyectos y conteos salen de `content.js`. Por defecto `http://localhost:5173`. Sale con código 1 si algo falla. |
| `python scripts/stitch.py <carpeta>` | Une los tramos `.partN.png` de `verify.mjs` en un JPEG por captura. |
| `node scripts/og.mjs` | Regenera `public/og.png` (1200 × 630) desde `scripts/og.html` con los datos de `content.js` y `site.config.js`. |
| `python scripts/media.py video\|image\|still …` | Procesa fotos y videos de `incoming/` para el carrusel (ver [Fotos y videos](#fotos-y-videos-carrusel-de-cada-proyecto)). |
| `python scripts/build_cv.py` | Borrador de CV en inglés con los datos del sitio, en `docs/cv/` (DOCX + PDF exportado con Word). **El sitio ya no lo publica**: sirve las 4 hojas de vida propias. |

---

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| **Dominio** (OG, canonical, JSON-LD, robots.txt, sitemap.xml) | `site.config.js` → `SITE_URL`. Única línea. |
| **Correo, teléfono / WhatsApp, LinkedIn, promedio** | `src/data/content.js` → `PROFILE`. Único lugar de cada dato. |
| **URLs de instituciones** (Javeriana, Merani, Programa Tú, Berlitz) | `content.js` → `INSTITUTIONS`. En los textos se escriben como `{merani}` y se pintan como enlace. |
| **Hojas de vida** | `content.js` → `CV_FILES[idioma][formato]` (los PDF, en `public/assets/cv/`). |
| **Fotos y videos de un proyecto** | `content.js` → `HARDWARE[].media` (los archivos, en `public/media/projects/<id>/`). |
| **Todo el texto** (EN y ES) | `src/data/content.js` |
| **Orden de las secciones** (página, nav, menú móvil y número de cada encabezado) | `src/components/ui/sections.js` → `ORDER` |
| **Vista previa al compartir** (título, descripción e imagen) | `vite.config.js` → `TITLE`, `DESCRIPTION`; badge de la imagen en `content.js` → `SHARE`, y `node scripts/og.mjs` para regenerar `public/og.png`. Sin «intern» a propósito. |
| Colores y tipografía | `src/index.css` (tokens por tema) |

Constantes de `content.js`:

| Constante | Qué controla |
| --- | --- |
| `INSTITUTIONS` | Nombre y sitio oficial de cada institución |
| `PROFILE` | Nombre, correo, teléfono, WhatsApp, GitHub, LinkedIn, foto, promedio, PCB diseñadas |
| `CV_FILES`, `CV_FORMATS` | Rutas de las 4 hojas de vida (idioma × formato) |
| `SEEKING` | Badge del hero y fechas de disponibilidad |
| `SHARE` | Badge de la imagen para compartir (`og.png`) |
| `SECTIONS` | Interruptores de secciones (`lab: 'auto'` la muestra con 3+ fotos) |
| `NAV` | Etiquetas de la navegación; `menuOnly: true` = solo en el menú móvil (el orden sale de `ORDER`) |
| `HERO_CHIP` | Rótulos de los pines del integrado del hero |
| `UI` | Textos de interfaz, `en` y `es` (incluye el mensaje prellenado de WhatsApp) |
| `ABOUT` | Perfil y áreas de enfoque |
| `EXPERIENCE` | Experiencia; `kind: 'academic' \| 'professional'` la separa en dos bloques |
| `HARDWARE` | Proyectos de hardware en orden (define HW-0X): medios del carrusel con sus pies de foto, specs, "qué hice", materia y equipo. `soon: true` = tarjeta «Próximamente» (hoy, la tesis) |
| `SOFTWARE` | Bloque de software, «I love software too, and it often backs up my hardware» (`hardware` enlaza con su tarjeta de hardware) |
| `LAB` | 9 fotos del laboratorio con su pie de foto |
| `EDUCATION`, `LANGUAGES`, `SKILLS` | Lo que dice su nombre |

**Datos pendientes:** se marcan con `⚠ PENDIENTE` (o `⚠ VERIFICAR`) y valen `null`. El sitio los muestra como un
hueco de diseño rayado ("To be confirmed" / "Coming soon"), nunca como texto inventado.
La lista completa de lo que falta entregar está en [`docs/MATERIALS.md`](docs/MATERIALS.md).

**Cómo se escribe** (pedido de Nicolás, 26 sep 2026): que suene escrito por una persona. Casi sin «:» ni «;» en
los textos (se prefiere punto o coma), sin rayas largas en medio de la prosa y sin frases de relleno. Nada
inventado: lo que no está confirmado queda como hueco.

---

## Hojas de vida: idioma × formato

Los botones de descarga (hero, nav, menú móvil, contacto) **descargan directo cuando no hay nada que elegir**:
si el idioma del sitio tiene un solo archivo, o si no tiene ninguno y en total existe uno solo. En ese último caso
el botón muestra una marca con el idioma del archivo (p. ej. **EN** en el sitio en español).

Cuando hay más opciones, abren un diálogo que pregunta el idioma y el formato: **Harvard / International (ATS)**
o **Modern sidebar**. El idioma del CV se elige dentro del diálogo y **no cambia el idioma del sitio**; arranca en
el del sitio, o en el otro si el del sitio aún no tiene archivos. Si un archivo no existe, su opción aparece
deshabilitada con "Coming soon". La lógica está en `src/components/ui/cv.js` y `CvTrigger.jsx`.

Desde el 26 sep 2026 existen los 4 archivos, así que todos los botones abren el selector. Para reemplazar una
hoja de vida basta con sobrescribir su PDF con el mismo nombre y desplegar.

```
public/assets/cv/
├── Nicolas_Gomez_CV_EN_ATS.pdf       ← Word, formato internacional de la Javeriana (carta, 1 página)
├── Nicolas_Gomez_CV_EN_Modern.pdf    ← Canva, sidebar (A4, 1 página)
├── Nicolas_Gomez_CV_ES_ATS.pdf
└── Nicolas_Gomez_CV_ES_Moderno.pdf
```

---

## Fotos y videos (carrusel de cada proyecto)

Cada tarjeta de hardware muestra un **carrusel** con los medios de `HARDWARE[].media`, en ese orden: videos
primero, luego fotos de la más llamativa a la menos. El modal «Ver más» los repite como bitácora (FIG. 01, 02…).
Los archivos van en `public/media/projects/<id>/`:

```js
media: [
  { type: 'video', src: 'demo', caption: { en: '…', es: '…' } },               // demo.mp4 + póster demo.webp
  { type: 'image', src: 'board', fit: 'contain', caption: { en: '…', es: '…' } }, // board.webp (o .jpg / .png)
  { type: 'youtube', id: '6g7JhK-fa98', poster: 'locker', caption: { … } },       // YouTube; póster local sin extensión
]
```

- `fit: 'contain'` = el medio se ve completo sobre la misma imagen desenfocada (verticales, capturas, placas
  recortadas). Sin `fit`, llena el cuadro 16:10.
- `bg: 'light'` = fondo blanco en vez del desenfoque (esquemáticos, renders, vistas RTL).
- Un archivo que no existe se omite solo: el manifiesto de `vite.config.js` sabe qué hay en `public/`, así que no
  queda hueco ni sale un 404. En `npm run dev` se recarga solo al agregar o borrar archivos.
- Un proyecto sin ningún medio puede mostrar su `chain` (cadena de señal dibujada con datos confirmados).
- `soon: true` es la tarjeta «Próximamente» (la tesis, al final): una fachada de LEDs dibujada, el nombre y una
  línea, sin medios, specs ni modal, y no cuenta en el número de proyectos del hero.

**Cómo se comporta** (`src/components/ui/MediaCarousel.jsx` y `Lightbox.jsx`):

| Qué | Comportamiento |
| --- | --- |
| Arranque | Solo, cuando la mitad del cuadro entra en pantalla. Con `prefers-reduced-motion` o ahorro de datos no arranca: queda en pausa con su botón de reproducir. |
| Avance | Cada video hasta el final (sin sonido) y cada foto 5 s. El punto activo se llena con el avance. |
| Fin | Al terminar el último vuelve al primero y **se queda en pausa** (botón «Volver a reproducir»). |
| Se detiene | Fuera de pantalla, con la pestaña oculta o con un diálogo encima. Las fotos, además, con el mouse encima o con el foco de teclado dentro (un clic no lo congela). |
| Controles | Contador, ampliar, pausa, flechas y pie de foto aparecen solo con el mouse encima, con foco de teclado o 3 s tras un toque. Debajo, un punto por medio. |
| Táctil | Un toque muestra los controles (no amplía); deslizar cambia de medio. |
| Teclado | ← → con el foco dentro del carrusel. |
| Visor ampliado | Clic en el medio o botón «Ampliar»: pantalla completa, el video sigue en el mismo segundo, ← → / deslizar / puntos y Escape. Al cerrar, la tarjeta queda en el medio que se estaba viendo y el foco vuelve a «Ampliar». |
| YouTube | La API se carga solo cuando le toca reproducir (youtube-nocookie.com). Mientras no corre, todo el póster es el botón de reproducir (mouse, toque o teclado). |

### Formatos

Lo que produce `scripts/media.py` (los originales llegan a `incoming/` en la mejor calidad posible):

| Tipo | Formato | Tamaño | Peso |
| --- | --- | --- | --- |
| Video | MP4 H.264 sin audio, 30 fps, `+faststart`; el HDR del celular se pasa a SDR | 1280 px de ancho, 5–20 s | < 2,5 MB (tope 4 MB) |
| Póster del video | Mismo nombre en `.webp` | el del video | < 120 KB |
| Foto, captura o esquemático | WebP sin metadatos EXIF, con la orientación aplicada | lado largo 1600 px | < 250 KB |
| Foto de laboratorio | WebP | 1200 × 900 (4:3) | < 200 KB |
| Avatar | WebP + JPG de respaldo, cuadrado | 480 × 480 | < 80 KB |
| Captura de software (opcional) | WebP | 1600 × 1000 | < 250 KB |

```bash
# ffmpeg no está instalado en la máquina: binario portátil, sin admin, en una carpeta temporal.
npm i --prefix <carpeta-temporal> ffmpeg-static
export FFMPEG=<carpeta-temporal>/node_modules/ffmpeg-static/ffmpeg.exe
pip install pillow-heif    # solo si llegan fotos .heif / .heic

python scripts/media.py video incoming/projects/<id>/<original>.mp4 public/media/projects/<id>/demo --ss 3 --to 18
python scripts/media.py image incoming/projects/<id>/<original>.jpg public/media/projects/<id>/board
python scripts/media.py still incoming/projects/<id>/<original>.mp4 public/media/projects/<id>/frame --at 12.5
```

Opciones: `video` acepta `--crop W:H:X:Y`, `--width` (1280), `--crf` (27) y `--poster S` (segundo del póster);
`image`, `--max` (1600), `--box l,t,r,b` (fracciones), `--trim-black` y `--quality` (80). Detalle en el propio script.
Antes de publicar, revisa que no se vean caras ni datos personales (en el lote del 25 sep se descartaron o
recortaron por eso).

### Mapa de rutas

```
public/
├── assets/
│   ├── foto.webp · foto.jpg      ← avatar del hero (sin foto: iniciales NG)
│   └── cv/                       ← las 4 hojas de vida
└── media/
    ├── projects/<id>/            ← medios del carrusel (HARDWARE[].media)
    │   ├── proteo/        locker (póster del pitch, que vive en YouTube)
    │   ├── custom-pcbs/   tetris.mp4 · board · render · schematic · bare · prototype
    │   ├── eeg-emg/       emg.mp4 · eeg-scope.mp4 · test-bench.mp4 · board · scope-decode
    │   ├── lvdt/          system · jig · pcb · bench · cad
    │   ├── conveyor/      belt.mp4 · rpm-plot.mp4 · setup
    │   ├── volley-pong/   gameplay.mp4 · board · scope · rtl · schematic
    │   ├── correlacium/   cad.mp4 · print.mp4 · wand · electronics · sensor · plot
    │   └── dreamsnake/    video (póster del video de YouTube) · prototype
    ├── software/<id>/screen      ← captura opcional (proteo-web, voltio-residencial, video-dj, psicosentir)
    └── lab/01 … 09               ← galería «On the bench»: aparece sola con 3 o más fotos
```

El laboratorio y las capturas de
software usan el componente `<Media>`, que busca por ruta base sin extensión (`.mp4` → `.webp` → `.jpg` →
`.jpeg` → `.png`) y muestra un placeholder diseñado si no hay archivo. Pies de foto del laboratorio: `LAB[].caption`.

**Entrega de materiales:** suelta los originales en `incoming/` (ignorada por git); ver `docs/MATERIALS.md`.

---

## SEO y producción

- `index.html` usa marcadores (`%SITE_URL%`, `%TITLE%`, `%DESCRIPTION%`, `%JSON_LD%`, `%CV_NOSCRIPT%`) que llena el plugin `seo()` de `vite.config.js`.
- **JSON-LD `Person`**: teléfono, `sameAs` (GitHub y LinkedIn), `alumniOf` con la URL oficial de cada institución, `knowsLanguage`.
- `<noscript>` enlaza el CV EN ATS.
- `robots.txt` y `sitemap.xml` se generan en el build a partir de `SITE_URL`.
- Imagen Open Graph / Twitter: `public/og.png` (1200 × 630), generada con `node scripts/og.mjs`. Su badge sale de
  `SHARE.badge`. WhatsApp, LinkedIn y demás guardan la vista previa en caché: tras cambiarla, LinkedIn se refresca
  en su Post Inspector y WhatsApp puede tardar días (o compartir el enlace con `?v=2`).
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
