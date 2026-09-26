# Prompt para la siguiente sesión

Este archivo siempre contiene el prompt para arrancar la **siguiente** sesión de Claude Code sobre este
portafolio. Al terminar su trabajo, cada sesión debe **reescribir este archivo** con el prompt para la
sesión que sigue (mismo formato), hasta que el portafolio se considere completo — en ese punto, la sesión
lo dice explícitamente en vez de generar un prompt nuevo.

**Última actualización:** 26 sep 2026, en el commit que pone el Perfil primero, quita «intern» de la vista previa
al compartir, cambia el título de Software, pasa los textos a una redacción más natural y reemplaza el FIR por la
tarjeta «Próximamente» de la tesis (ver `git log`). El commit anterior (`a14e58b`) juntó el carrusel, la
auditoría de diseño y los 4 CV.

---

## Prompt (copiar tal cual al abrir la sesión nueva)

```
Sigo con mi portafolio en C:\Users\nico\Portafolio (https://nicolasgomez.dev). Antes de tocar nada, lee:
- README.md, docs/MATERIALS.md, docs/next_session.md (este archivo), docs/kiwibot-research.md y el bloque
  «Estado» al inicio de docs/design-audit-2026-09-25.md
- La memoria del proyecto en C:\Users\nico\.claude\projects\C--Users-nico-Portafolio\memory\
- git log -5 y el contenido de incoming/ (lo que ya estaba el 25 sep ya se procesó: ver «Ya procesado» en
  docs/MATERIALS.md)

CONTEXTO (26 sep 2026): cada proyecto de hardware muestra un carrusel de fotos y videos que arranca solo, con
puntos, controles al pasar el mouse o tras un toque, deslizar en móvil, visor ampliado y fin en pausa
(src/components/ui/MediaCarousel.jsx y Lightbox.jsx; se prueba con scripts/carousel.mjs). Hay dos proyectos
nuevos armados solo con mis fotos y videos (EEG/EMG y LVDT, marcados ⚠ VERIFICAR). Las 4 hojas de vida están
publicadas, así que los botones de CV abren el selector (si un idioma quedara con un solo archivo, ese botón
descargaría directo; lógica en src/components/ui/cv.js). El orden de las secciones es Perfil → Experiencia →
Hardware → Skills → [Lab] → Software → GitHub → Formación → Contacto y lo define ORDER en
src/components/ui/sections.js (de ahí salen la página, la nav y el menú móvil). La última tarjeta de hardware
es mi tesis (fachada LED interactiva IoT) como «Próximamente», a propósito sin detalles; el FIR se quitó.
La vista previa al compartir el enlace no dice «intern» (TITLE y DESCRIPTION en vite.config.js, SHARE en
content.js y public/og.png). Los textos se escriben como los escribiría una persona: casi sin «:» ni «;», sin
rayas largas en la prosa y sin relleno (ver «Cómo se escribe» en el README).

Tu trabajo, en este orden:

## 1) Procesar lo nuevo que haya subido

- incoming/: procesa solo lo que no esté en «Ya procesado» de docs/MATERIALS.md, contra las tablas de ese
  archivo. Fotos y videos con scripts/media.py (instrucciones y formatos en la sección «Fotos y videos» del
  README). ffmpeg no está instalado: instálalo tú, sin pedir permiso, con
  `npm i --prefix <tu-scratchpad>/tools ffmpeg-static` y exporta FFMPEG a ese binario; para fotos .heif,
  `pip install --target <tu-scratchpad>/py pillow-heif` y PYTHONPATH a esa carpeta.
- Agrega cada medio a HARDWARE[].media en src/data/content.js con su pie de foto { en, es }: videos primero,
  luego fotos de la más llamativa a la menos; `fit: 'contain'` para verticales y capturas, `bg: 'light'` para
  esquemáticos. Revisa que no salgan caras ni datos personales. Si algo no encaja claramente en un slot de
  MATERIALS.md, dime cuál es y para qué slot asumiste que era, antes de moverlo.
- Hojas de vida corregidas (en incoming/cv/ o en Descargas): ábrelas, confirma que el texto es seleccionable,
  compáralas contra la sección 1 de MATERIALS.md y contra el sitio (promedio 4.3, fechas de las monitorías,
  LinkedIn, «Programa Tú»), avísame de cualquier diferencia y reemplaza el PDF en public/assets/cv/ con el
  mismo nombre.
- Si llegó incoming/datos/respuestas.md, aplica cada respuesta en content.js y quita su marca ⚠.

## 2) Re-verificar lo pendiente — vuelve a comprobar cada uno, no asumas que sigue igual

a. **CLI de Vercel** (`npx vercel whoami`): seguía «Logged out» el 26 sep 2026. No la intentes iniciar tú (pide
   un navegador interactivo). Si sigue igual, explícame paso a paso `npx vercel login` desde mi terminal (elegir
   el mismo método con que creé la cuenta, probablemente GitHub; autorizar en el navegador; confirmar con
   `npx vercel whoami`). No bloquea nada: el despliegue por `git push` funciona solo.
b. **Token de Google Apps Script** expuesto en NicoGomez4262/PROTEO_DEF (zip «PROTEO WEB - Github.zip»,
   dashboard.html). Seguía igual el 26 sep 2026 (blob `97237fc…`). Verifícalo con
   `gh api repos/NicoGomez4262/PROTEO_DEF/git/trees/main --jq '.tree[] | select(.path | contains("PROTEO WEB")) | .sha'`.
   Si sigue igual, no lo arregles tú: recuérdame los pasos (propiedad ALERT_TOKEN en el Apps Script, comparar
   contra PropertiesService, nueva versión de la implementación para invalidar el viejo, quitarlo del HTML).
c. **Colaborador en los repos de Ruslán** (VOLLEY-PONG-VHDL y CORRELACIUM-LEVIOSA):
   `gh api repos/RuDomiv/<repo>/contributors --jq '.[].login'`. El 26 sep 2026 solo figuraba RuDomiv.
d. **Redirección www → dominio raíz:** resuelta desde el 24 sep (200 en el apex; 308 desde www, conservando
   la ruta). Solo confírmala con `curl -I https://www.nicolasgomez.dev/x`.
e. **Decisiones pendientes de la auditoría de diseño** (bloque «Estado» de docs/design-audit-2026-09-25.md:
   O-1, O-4, O-6, O-8, E-3, E-6, E-7, U-4, D-4, D-5, T-2, T-3, T-4 y T-5). Pregúntame cuáles aplicar antes de
   tocarlas. O-1 (diagrama de la insignia) quizá ya no haga falta: PROTEO muestra el pitch de YouTube.

Para cada uno (a–e), di explícitamente en tu respuesta final: **resuelto**, **sigue pendiente** (con los
pasos), o **no pude verificarlo** (y por qué).

## 3) Deja todo funcionando

- `npm run build` sin errores y `npm run lint` sin errores nuevos.
- Si escribiste o cambiaste textos: que no queden «:» ni «;» de más y que suenen escritos por una persona.
- Si tocaste el carrusel, el visor o los medios: `node scripts/carousel.mjs` contra `npm run dev` (todas
  deben pasar). El panel Browser suele estar oculto y ahí no corren animaciones ni observadores: prueba con
  Chrome headless (scripts/carousel.mjs y scripts/verify.mjs).
- Commit en inglés y push a main (dispara el deploy solo). Confirma que el deploy de ese commit quedó
  "success": `gh api "repos/NicoGomez4262/portfolio/deployments?sha=<sha>" --jq '.[0].id'` y luego
  `gh api repos/NicoGomez4262/portfolio/deployments/<id>/statuses --jq '.[0].state'`.
- Verifica en vivo con `node scripts/verify.mjs https://nicolasgomez.dev <carpeta-scratch>` (y con
  `SITE_LANG=es`): cero scroll horizontal, cero áreas táctiles < 44 px, selector de CV y modal de proyecto
  funcionando, sin errores de consola. Une los tramos con `python scripts/stitch.py <carpeta>` y envíame las
  capturas de página completa con SendUserFile (390, 768, 1024, 1440; oscuro y claro).
- Si hay otra sesión trabajando en paralelo sobre el repo: repártanse los archivos por SendMessage antes de
  editar; la última en terminar hace el commit y el push de todo junto. Usa `CDP_PORT=9334` para no chocar
  con el Chrome headless de la otra.

## 4) Lista de lo que todavía me falta

Al final, dame una lista actualizada — en tablas, con las mismas columnas que docs/MATERIALS.md — de las fotos,
videos y datos que TODAVÍA no entregué después de este bloque: lo que subí y no encajó en ningún slot, los
proyectos que siguen sin video o sin foto (hoy PROTEO solo tiene el pitch, y el video de DreamSnake en YouTube
se ve diminuto porque se subió vertical), las diferencias anotadas de las hojas de vida «Moderno» (Nicolás
las dio por finales; es opcional) y cualquier ⚠ que quede
en content.js. Prioriza igual que
MATERIALS.md (P0/P1/P2). Actualiza docs/MATERIALS.md para que refleje solo lo que sigue pendiente (quita lo
resuelto y agrega lo nuevo a «Ya procesado»; no dupliques la lista en dos archivos distintos).

## 5) Cierra el ciclo

Antes de terminar, actualiza la memoria del proyecto si cambió algo que valga la pena recordar, y reescribe
docs/next_session.md con el prompt para la sesión que sigue (mismo formato que este archivo: procesar lo nuevo,
re-verificar lo pendiente de HOY, dejar todo funcionando con build + pruebas + commit + deploy + verificación en
vivo, y la lista actualizada de lo que falta). Sigue con este patrón sesión tras sesión. El día en que ya no
quede nada pendiente en la lista del punto 4 ni en el punto 2, dilo explícitamente en tu respuesta y en
docs/next_session.md — en vez de un prompt nuevo, escribe que el portafolio se considera completo y por qué,
y deja de regenerar este archivo.
```

---

## Historial

- **24 sep 2026** (commit `ebf36ab`): primer prompt de esta cadena, escrito al cerrar el rediseño
  hardware-first (dominio nicolasgomez.dev, selector de CV, PROTEO como insignia, VOLLEY-PONG y
  CORRELACIUM-LEVIOSA documentados desde sus repos, contacto con WhatsApp, avatar con foto real).
  Pendiente para la siguiente sesión: procesar `incoming/`, y volver a revisar la redirección de `www`
  (ya resuelta), la sesión de la CLI de Vercel y el token expuesto en PROTEO_DEF.
- **25–26 sep 2026** (un solo commit con el trabajo de tres sesiones):
  - *Materiales:* 10 videos y 19 fotos procesados con `scripts/media.py`; carrusel en cada tarjeta y visor
    ampliado; proyectos nuevos EEG/EMG y LVDT; pitch de PROTEO y video de DreamSnake desde YouTube; CV ATS EN y ES.
  - *Auditoría de diseño* (`docs/design-audit-2026-09-25.md`): orden nuevo con Experiencia primero (`ORDER`),
    un solo botón relleno por pantalla, CV con descarga directa o selector con idioma propio, menú móvil
    numerado, WhatsApp que abre WhatsApp.
  - *Cierre:* carrusel probado en Chrome headless y corregido (un clic o un toque ya no lo congelan, el póster
    de YouTube es un botón de reproducir, el foco vuelve a «Ampliar», las flechas del visor no chocan con los
    controles del video); `scripts/carousel.mjs`; CV «Moderno» EN y ES publicados (con correcciones pendientes,
    ver MATERIALS.md §1); se quitó el CV de respaldo generado.
  - Pendiente: Vercel CLI, token de PROTEO_DEF, colaborador en los repos de Ruslán, decisiones de la auditoría,
    material de PROTEO y del FIR, y los datos ⚠ de MATERIALS.md §5.
- **26 sep 2026** (segundo commit, pedidos de Nicolás): el Perfil pasa a ser la primera sección; la vista previa
  al compartir (título, descripción y og.png) ya no dice «intern»; Software se titula «I love software too, and
  it often backs up my hardware» / «También me encanta el software, y muchas veces respalda mi hardware»; todos
  los textos quedaron sin «:» ni «;» y con una redacción más natural; el FIR sobre un PIC se quitó y al final
  quedó la tarjeta «Próximamente» de la tesis (Fachada LED interactiva IoT).
