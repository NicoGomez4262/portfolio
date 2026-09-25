# Prompt para la siguiente sesión

Este archivo siempre contiene el prompt para arrancar la **siguiente** sesión de Claude Code sobre este
portafolio. Al terminar su trabajo, cada sesión debe **reescribir este archivo** con el prompt para la
sesión que sigue (mismo formato), hasta que el portafolio se considere completo — en ese punto, la sesión
lo dice explícitamente en vez de generar un prompt nuevo.

**Última actualización:** 24 sep 2026, después del commit `ebf36ab` (foto del hero, equipo de VOLLEY-PONG
y placa de CORRELACIUM confirmados). Nicolás va a soltar en `incoming/` los videos y fotos que pudo
rescatar de cada proyecto, y los 4 CV.

---

## Prompt (copiar tal cual al abrir la sesión nueva)

```
Sigo con mi portafolio en C:\Users\nico\Portafolio (https://nicolasgomez.dev). Antes de tocar nada, lee:
- README.md, docs/MATERIALS.md, docs/next_session.md (este archivo) y docs/kiwibot-research.md
- La memoria del proyecto en C:\Users\nico\.claude\projects\C--Users-nico-Portafolio\memory\
- git log -5 y el contenido de incoming/ (ahí solté material: fotos, videos y los 4 CV)

CONTEXTO: subí a incoming/ los videos y fotos que pude rescatar de cada proyecto de hardware, y los 4 CV
(EN/ES × ATS/Moderno). Los videos y las fotos son pesados: no les quité el audio ni les bajé la calidad,
así que probablemente haga falta comprimirlos antes de subirlos al sitio.

Tu trabajo, en este orden:

## 1) Procesar lo que subí

- Revisa incoming/ carpeta por carpeta contra las tablas de docs/MATERIALS.md (nombre de archivo, ruta
  final, formato, dimensiones, peso objetivo).
- Videos: quítales el audio y comprímelos a MP4 H.264 sin audio, ~1280×800, 10–20 s, < 4 MB. Si el
  original es más largo, recorta la parte que muestra causa→efecto (qué se toca y qué pasa), no lo dejes
  entero. Genera el poster de cada video (mismo nombre en .webp).
  - No hay ffmpeg instalado en esta máquina. Instálalo tú mismo, sin pedir permiso interactivo, con
    `npm i -D ffmpeg-static` (da un binario portátil vía npm, sin admin) o con
    `winget install --id Gyan.FFmpeg -e --silent` (winget SÍ está disponible). Si ambos fallan, dime
    exactamente qué intentaste y por qué falló, y sigue con las fotos mientras tanto.
- Fotos: recórtalas/optimízalas a WebP en las dimensiones y peso de MATERIALS.md (1600×1000 para
  proyectos, 1200×900 para laboratorio, 480×480 para el avatar si llegó una nueva). Quítales metadatos
  EXIF. Si una foto no encaja claramente en ningún slot de MATERIALS.md, dime cuál es y para qué slot
  asumiste que era, antes de moverla — no adivines en silencio.
- Mueve cada archivo terminado a su ruta final (public/media/projects/<id>/, public/media/lab/,
  public/assets/cv/, etc.), renombrando si el nombre no coincide exactamente con lo que espera content.js.
- Los 4 CV: ábrelos y confirma que el texto es seleccionable (no son un escaneo). Compara su contenido
  contra el sitio — promedio, fechas de las monitorías, LinkedIn, "Programa Tú" (no "Progrma Tu") — y
  avísame de cualquier diferencia ANTES de darlos por buenos y conectarlos en CV_FILES.
- Si llegó incoming/datos/respuestas.md con los ⚠ resueltos (materias, PIC exacto, IIR, THT/SMD, equipo
  y materia de PROTEO, pies de foto del laboratorio, etc.), aplícalos en content.js y quita esa marca ⚠.
- Actualiza también scripts/build_cv.py si algún dato fuente cambió, y regenera el CV de respaldo si
  sigue haciendo falta para algún idioma/formato.

## 2) Revisar lo pendiente de la sesión anterior — vuelve a comprobar cada uno, no asumas que sigue igual

a. **Redirección www → dominio raíz en Vercel.**
   Verificado el 24 sep 2026: YA QUEDÓ BIEN (`curl -I https://nicolasgomez.dev/` da 200 directo;
   `curl -I https://www.nicolasgomez.dev/` da 308 hacia el apex). Confírmalo tú con los mismos comandos
   antes de continuar, por si cambió.

b. **Sesión de la CLI de Vercel** (`npx vercel whoami`).
   Seguía "Logged out" el 24 sep 2026. Tú tampoco puedes iniciarla (pide un navegador interactivo de
   Nicolás). Si sigue deslogueada, no lo intentes de nuevo: en tu respuesta final explícale, paso a paso,
   cómo correr `npx vercel login` desde su terminal y qué opción elegir. Aclara que esto NO bloquea nada:
   el despliegue por `git push` sigue funcionando solo.

c. **Token de Google Apps Script expuesto** en el repo público NicoGomez4262/PROTEO_DEF (dentro del zip,
   `dashboard.html`, variable `TOKEN = "Token_Super_Seguro_12321"`).
   Seguía sin rotar el 24 sep 2026 (mismo blob SHA `97237fc…`). Verifica el SHA actual del archivo con
   `gh api repos/NicoGomez4262/PROTEO_DEF/git/trees/main --jq '.tree[] | select(.path | contains("PROTEO WEB"))'`.
   Si sigue igual, no lo arregles tú (el Apps Script vive fuera de este repo): explícale a Nicolás, paso a
   paso, cómo generar un secreto nuevo en el proyecto de Apps Script, cómo dejar de tener el token en
   texto plano en el HTML (moverlo a `PropertiesService` o validar el remitente del lado del servidor) y
   cómo actualizar el HTML del repo con el nuevo valor.

Para cada uno de los tres (a, b, c), di explícitamente en tu respuesta final: **resuelto**, **sigue
pendiente** (con los pasos), o **no pude verificarlo** (y por qué).

## 3) Deja todo funcionando

- `npm run build` sin errores y `npm run lint` sin errores nuevos.
- Verifica en vivo con `node scripts/verify.mjs https://nicolasgomez.dev <carpeta-scratch>` (Chrome
  headless por CDP): cero scroll horizontal, cero áreas táctiles < 44 px, selector de CV y modal de
  proyecto funcionando, sin errores de consola. Envíame las capturas de página completa con
  SendUserFile (390, 768, 1024, 1440; oscuro y claro).
- Al cerrar cada bloque de cambios: commit en inglés, push a main (dispara el deploy solo) y confirma con
  `gh api repos/NicoGomez4262/portfolio/deployments...` que el deploy de ese commit quedó "success" antes
  de seguir al siguiente bloque.

## 4) Lista de lo que todavía me falta

Al final, dame una lista actualizada — en tablas, con las mismas columnas que docs/MATERIALS.md (archivo,
ruta final, formato, dimensiones, peso, qué debe mostrar) — de las fotos, videos y datos que TODAVÍA no
entregué después de este bloque: lo que subí y no encajó en ningún slot, los proyectos que siguen sin
video o sin foto, y cualquier ⚠ que quede en content.js. Prioriza igual que MATERIALS.md (P0/P1/P2).
Actualiza también docs/MATERIALS.md para que refleje solo lo que sigue pendiente (tacha o quita lo ya
resuelto, no dupliques la lista en dos archivos distintos).

## 5) Cierra el ciclo

Antes de terminar, reescribe docs/next_session.md con el prompt para la sesión que sigue después de esta
(mismo formato que este archivo: instrucciones para procesar lo nuevo que suba, re-verificar qué de lo
pendiente de HOY quedó resuelto, dejar todo funcionando con build + verificación + commit + deploy, y la
lista actualizada de lo que falta). Sigue con este patrón sesión tras sesión. El día en que ya no quede
nada pendiente en la lista del punto 4 ni en el punto 2, dilo explícitamente en tu respuesta y en
docs/next_session.md — en vez de un prompt nuevo, escribe que el portafolio se considera completo y por
qué, y deja de regenerar este archivo.
```

---

## Historial

- **24 sep 2026** (commit `ebf36ab`): primer prompt de esta cadena, escrito al cerrar el rediseño
  hardware-first (dominio nicolasgomez.dev, selector de CV, PROTEO como insignia, VOLLEY-PONG y
  CORRELACIUM-LEVIOSA documentados desde sus repos, contacto con WhatsApp, avatar con foto real).
  Pendiente para la siguiente sesión: procesar `incoming/`, y volver a revisar la redirección de `www`
  (ya resuelta), la sesión de la CLI de Vercel y el token expuesto en PROTEO_DEF.
