# Prompt: auditoría de diseño

Prompt independiente (no forma parte del ciclo de `docs/next_session.md`) para pedir una auditoría de
diseño del portafolio: organización de la información, estética, intuitividad y qué tan bien encaja con
un portafolio formal para reclutadores de hardware. Es un diagnóstico — **no implementa cambios**; produce
un informe priorizado para que Nicolás decida qué aplicar y cuándo.

Se puede correr en esta misma sesión o en una nueva; no depende de `incoming/` ni de lo pendiente de
Vercel/seguridad.

---

## Prompt (copiar tal cual)

```
Quiero una auditoría de DISEÑO de mi portafolio (C:\Users\nico\Portafolio, en vivo en
https://nicolasgomez.dev). No me arregles nada todavía: quiero un diagnóstico con opciones concretas,
para decidir yo qué aplicar. Antes de empezar:

- Carga el skill `impeccable` (tiene los criterios estructurados para este tipo de auditoría).
- Lee README.md, src/data/content.js completo y la memoria del proyecto en
  C:\Users\nico\.claude\projects\C--Users-nico-Portafolio\memory\ (sobre todo portafolio-decisiones.md):
  ahí están las decisiones de estilo YA TOMADAS a propósito — tema técnico oscuro, retícula tipo PCB,
  acento cian + cobre, Archivo/IBM Plex Sans/IBM Plex Mono, SIN cursor custom, partículas, 3D, parallax
  ni scroll-jacking. Trátalas como restricciones del proyecto, no como fallas a corregir. Si de verdad
  crees que alguna ya no tiene sentido con el sitio como creció, dilo explícitamente como una recomendación
  aparte y justifícala — no la ignores en silencio.
- Recuerda la regla de honestidad del sitio: nada de contenido inventado. Puedes recomendar REORGANIZAR,
  reagrupar o cambiar el énfasis de lo que ya existe, pero nunca sugerir agregar una métrica, logro o dato
  que no esté confirmado, aunque "ayudaría al balance visual".

CONTEXTO QUE DEBES TENER EN CUENTA
El sitio es de una sola página, bilingüe (EN por defecto, ES), con tema oscuro y claro, y su único
propósito hoy es conseguir una práctica de hardware / eléctrica (aplicación a Kiwibot / robot.com — ver
docs/kiwibot-research.md). El público objetivo es un reclutador o ingeniero técnico que lo revisa por
primera vez, probablemente en menos de un minuto, y que puede volver a mirarlo con más calma después.
Orden actual de secciones: Hero → franja de credenciales → Perfil (About) → Hardware (7 proyectos, PROTEO
como insignia) → Experiencia (académica + profesional) → Skills (tablas tipo datasheet) → Laboratorio →
Software → GitHub en vivo → Formación e idiomas → Contacto → Footer. Varios proyectos todavía muestran
huecos de diseño ("Coming soon") porque las fotos y videos reales no han llegado — evalúa cómo se ve el
sitio HOY con esos huecos, y por separado, qué problemas de fondo seguirían existiendo aunque ya hubiera
foto y video en todos los slots.

MÉTODO — no audites solo leyendo el código, tienes que VERLO renderizado:
1. Usa `node scripts/verify.mjs https://nicolasgomez.dev <carpeta>` para capturar página completa en los
   8 anchos ya definidos (360, 390, 414, 768, 820, 1024, 1280, 1440), en oscuro y claro (y ejecútalo una
   vez más con `SITE_LANG=es` para ver la versión en español, que tiene textos más largos).
2. Además de esas capturas, ábrelo de verdad en el panel Browser (o Chrome headless interactivo): recorre
   el flujo completo — abre el selector de CV, abre un modal de proyecto, prueba el menú móvil, cambia de
   tema y de idioma — para juzgar transiciones, afordancias y sensación general, no solo estados estáticos.
3. Compara oscuro vs. claro y EN vs. ES: un problema que solo aparece en una combinación cuenta igual.

QUÉ EVALUAR (para cada uno: qué está mal o es mejorable, POR QUÉ importa en un escenario concreto — ej.
"un reclutador que escanea 30 s puede no llegar a X porque Y" —, y 1-2 opciones concretas de solución,
no vagas):

1. ORGANIZACIÓN DE LA INFORMACIÓN
   - ¿El orden de secciones sigue siendo el correcto ahora que el sitio creció (7 proyectos, experiencia
     en dos bloques, grupo de IA en Skills)? ¿Se vuelve demasiado largo antes de llegar a Formación o
     Contacto? Si crees que otro orden serviría mejor, proponlo explícitamente (no lo apliques).
   - ¿Hay contenido redundante o repetido entre secciones (p. ej. Perfil vs. Experiencia vs. Skills)?
   - ¿Cada sección agrupa bien lo que le corresponde, o hay algo que está en el lugar equivocado?
   - ¿La tarjeta insignia de PROTEO y el resto de proyectos comunican bien cuál es más importante y por
     qué, o todos compiten por la misma atención?

2. ESTÉTICA Y JERARQUÍA VISUAL
   - Escala tipográfica, ritmo vertical, uso del color (¿el acento cian+cobre se lee profesional o
     llamativo de más para un portafolio formal?), consistencia de tarjetas/componentes entre secciones.
   - Tratamiento de los huecos de diseño ("Coming soon"): ¿cuántos hay hoy, y qué tan bien o mal se ve la
     primera impresión con tantos placeholders? ¿Hay algo que se pueda mejorar en el placeholder mismo?
   - Paridad real entre tema oscuro y tema claro (no solo contraste: ¿la composición se sostiene igual
     de bien en los dos?).

3. INTUITIVIDAD Y USABILIDAD
   - Claridad de la navegación y de las llamadas a la acción: ¿"View hardware projects", "Download résumé"
     y los botones de contacto compiten entre sí o queda claro cuál es la acción principal?
   - ¿Se entiende que las tarjetas de proyecto son clicables y abren un modal? ¿El selector de CV se
     siente como un paso extra molesto o como algo que ayuda a elegir bien?
   - Las tablas tipo "datasheet" de Skills: ¿son legibles y claras para alguien no técnico que las
     escanea rápido, o el formato oscurece la información?
   - Facilidad para encontrar el contacto y para actuar sobre él (WhatsApp, correo, LinkedIn).

4. DENSIDAD Y EQUILIBRIO ("acomodado": ni apretado ni vacío)
   - Densidad por sección en cada ancho: ¿algo se ve apretado en 360-414 px o con demasiado espacio vacío
     en 1280-1440 px?
   - ¿Las proporciones de la tarjeta insignia y de las grillas (Hardware 2 columnas, Skills, Software 2×2)
     se sienten intencionales o accidentales en cada ancho?
   - Balance entre bloques de texto largo (Perfil, "Problem"/"What I did") y bloques visuales.

5. TONO ACORDE A UN PORTAFOLIO FORMAL
   - ¿Algún elemento decorativo o de movimiento (trazas PCB del hero, el punto pulsante "live", el bloque
     del chip) se siente fuera de lugar o distrae para el contexto de una aplicación de trabajo seria?
   - ¿El copy de la interfaz (labels, textos de introducción de cada sección) suena profesional y sin
     redundancias, en EN y en ES?
   - Compáralo mentalmente con lo que esperarías de un portafolio de ingeniería serio (no uno creativo /
     de diseño): ¿hay algo que se sienta "de más" o, al contrario, algo que falte para transmitir rigor?

QUÉ NO HACER
- No implementes ningún cambio de código, ni de contenido, ni de estilo en esta sesión.
- No toques incoming/, la redirección de Vercel, la sesión de la CLI ni el token de PROTEO_DEF — eso vive
  en docs/next_session.md.
- No propongas contenido inventado para "rellenar" un hueco visual.

ENTREGABLE
- Un resumen ejecutivo al principio: si Nicolás solo lee 3 cosas, ¿cuáles son las 3 con más impacto?
- El informe completo en docs/design-audit-<fecha-de-hoy>.md, con los hallazgos agrupados por las 5
  categorías de arriba, cada uno con: severidad (Crítico / Importante / Menor), dónde está (sección o
  archivo:línea), qué está mal, por qué importa (escenario concreto) y 1-2 opciones de solución.
- Si propones un orden de secciones alternativo, inclúyelo como una tabla "orden actual vs. propuesto"
  con la razón de cada cambio.
- Envíame con SendUserFile las capturas más relevantes para entender los hallazgos (no todas las que
  genere verify.mjs, solo las que ilustren un problema real).
- Cierra con una lista corta de "quick wins" (cambios de bajo esfuerzo y alto impacto) separada de los
  cambios más grandes que requieren más trabajo o decisión de mi parte.
```

---

## Notas

- Este prompt no modifica el sitio: no hace falta build, commit ni deploy al terminar la auditoría en sí.
  Si de esa auditoría sale una lista de cambios que Nicolás aprueba, esos se implementan en una sesión
  aparte (siguiendo el flujo normal: build → verify.mjs en vivo → commit → push → confirmar deploy).
- Si además de `impeccable` hace falta comparar contra patrones de layout/paleta/tipografía ya
  catalogados, el skill `ui-ux-pro-max` sirve como referencia complementaria.
