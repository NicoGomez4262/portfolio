# Auditoría de diseño: nicolasgomez.dev (25 sep 2026)

> ⚠️ DEGRADED: single-context (sin sub-agentes). La revisión visual se hizo en una sola sesión y el detector
> automático corrió **después** de formar el juicio visual, para que no lo sesgara.

**Alcance:** solo diagnóstico. No se tocó código, contenido, `incoming/` ni nada de Vercel.
**Evidencia:** `scripts/verify.mjs` sobre el sitio en vivo en los 8 anchos (360–1440), oscuro y claro, EN y ES
(32 capturas de página completa + selector de CV + modal). El recorrido interactivo se hizo en el panel Browser:
menú móvil, selector de CV (EN → ES → Escape con el menú abierto debajo), modal de PROTEO, tema e idioma. Las
métricas de longitud salen de `getBoundingClientRect` en vivo. Las capturas que ilustran los hallazgos están en
[`docs/design-audit-2026-09-25/`](design-audit-2026-09-25/).

**Restricciones respetadas:** tema técnico oscuro, retícula PCB, cian + cobre, Archivo / IBM Plex, sin cursor
custom, partículas, 3D, parallax ni scroll-jacking. Ninguna recomendación agrega datos: todo es reorganizar,
quitar, condensar o cambiar el énfasis de lo que ya está confirmado en `content.js`.

> **Estado (25 sep 2026, misma fecha):** Nicolás aprobó los puntos 2 y 3 del resumen ejecutivo y los 9 quick wins,
> y pidió que **Experiencia sea la primera sección** (y la primera de la nav).
> - **Aplicado:** orden nuevo (Experiencia → Hardware → Skills → [Lab] → Software → GitHub → Perfil → Formación →
>   Contacto, definido en `ui/sections.js` → `ORDER`). Perfil movido después de Software; es la opción "bajar" de O-3.
>   También: un solo botón relleno por pantalla (U-1), descarga directa del CV cuando no hay nada que elegir y un
>   idioma del CV independiente del sitio (U-2), sin "Next build" ni "Relevant coursework" vacíos, un solo punto
>   que late (hero), menú móvil completo y con los mismos números de las secciones (O-7), GitHub + LinkedIn juntos
>   en el hero (D-3 a), Skills sin códigos HW-0X (E-4) y el número de WhatsApp que abre WhatsApp (U-5).
> - **Lo aplica la sesión paralela de materiales** en `HardwareProjects.jsx`: la tarjeta como resumen (carrusel de
>   medios + 1–3 oraciones + "Ver más" en contorno, con el detalle en el modal) y sin portadas vacías ni estiradas.
>   Cubre O-2, D-2 y D-3 b; el "Live demo" sin punto que late (T-1) quedó pedido a esa sesión.
> - **Pendiente, a decisión de Nicolás:** O-1 (diagrama de la insignia), O-4, O-6, O-8, E-3, E-6, E-7, U-4, D-4, D-5,
>   T-2, T-3, T-4 y T-5.

---

## Resumen ejecutivo: las 3 cosas con más impacto

1. **La sección Hardware, que es la prueba del sitio, hoy da la impresión de estar incompleta, y la insignia es
   la tarjeta que se ve más vacía.** 5 de las 7 portadas son huecos "Coming soon", incluida la de PROTEO, cuyo hueco
   ocupa media tarjeta (862 px de alto a 1440 y 985 px a 1024, medidos en vivo, porque se estira a toda la
   altura de la tarjeta). Las únicas
   imágenes reales (osciloscopio de VOLLEY-PONG y gráfica de CORRELACIUM) quedan en HW-04/05 y se llevan la
   mirada, así que la jerarquía queda al revés. Solución: mientras un proyecto no tenga medios, que su tarjeta no
   muestre portada. Para la insignia, un diagrama de bloques hecho **solo** con su tabla de specs, validado por ti.
   (→ O-1, E-1)
2. **El sitio es demasiado largo antes y dentro de la prueba.** Mide 13,8 pantallas a 1440 y 25,5 a 375; solo
   Hardware ocupa 5,2 y 10,6. En móvil, cada tarjeta mide entre 1,2 y 1,75 pantallas, y el primer proyecto aparece
   hacia la pantalla 3,5, después de 1,7 pantallas de Perfil. Además, la tarjeta ya trae el 70–85 % de lo que
   muestra el modal: en PROTEO, "Full breakdown" solo agrega una viñeta, una spec y tres huecos. Solución: que la
   tarjeta sea un resumen y el modal el detalle, y bajar o condensar el Perfil. (→ O-2, O-3, D-1, D-2)
3. **No queda claro cuál es la acción principal, y descargar el CV tiene fricción.** En la primera pantalla hay dos
   botones cian rellenos con acciones distintas (nav "Résumé" y hero "View hardware projects"), y cada tarjeta suma
   un tercer estilo de botón "primario" (blanco en oscuro, negro en claro). El selector de CV hoy es un paso extra
   con **una** opción en EN y **ninguna** en ES; en ES, la única salida es "Cambiar a inglés", que cambia el
   idioma de todo el sitio. Solución: un solo botón relleno por pantalla, descarga directa mientras haya un solo
   archivo y separar el idioma del CV del idioma del sitio. (→ U-1, U-2, E-2)

---

## Puntajes (criterios del skill `impeccable`)

### Salud técnica

| # | Dimensión | Puntaje | Hallazgo clave |
|---|---|---|---|
| 1 | Accesibilidad | 3/4 | Contraste AA en ambos temas (ink-faint 5,1–5,9:1), trampa y retorno de foco correctos, áreas táctiles ≥ 44 px en los 8 anchos. Quedan: micro-etiquetas de 10 px en mayúsculas y un número "WhatsApp" que en realidad es un enlace `tel:`. |
| 2 | Rendimiento | 3/4 (estimado, sin Lighthouse) | Fuentes que no bloquean, medios diferidos, manifiesto sin 404. Nada que corregir desde diseño. |
| 3 | Responsive | 3/4 | 0 px de scroll horizontal en EN y ES. Quedan: LinkedIn huérfano en el hero (1024 EN/ES, 360 ES), tarjetas apretadas a 768–820 y el hueco de la insignia estirado a 1024+. |
| 4 | Temas | 4/4 | Sistema de tokens completo; la composición se sostiene igual en claro y oscuro (ver E-5). |
| 5 | Integridad | 3/4 | El detector marca 1 advertencia (retícula de fondo, `index.css:112`), que es **falso positivo**: la retícula PCB es una decisión del brief. Deriva real: 6 tamaños y 8 trackings de micro-etiqueta, 3 estilos de botón primario y los códigos HW-0X reutilizados. |
| | **Total** | **16/20** | **Bueno**: la base técnica es sólida y lo pendiente es de diseño y organización. |

### Heurísticas de Nielsen (modo *Experience*: la 7 y la 10 son n/a en un portafolio)

| # | Heurística | Puntaje | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Nav activa, "Copied" y "Coming soon" claros; el punto pulsante "live" está sobreusado (T-1). |
| 2 | Lenguaje del usuario | 3 | La metáfora de hoja de datos le habla a un ingeniero; "×3" de GitHub no se explica y HW-0X significa dos cosas. |
| 3 | Control y libertad | 4 | Escape, cierre y retorno de foco en todos los diálogos; con el menú móvil debajo, Escape cierra solo la capa de arriba. |
| 4 | Consistencia | 2 | 3 estilos de primario, HW-01 = PROTEO y también = "PCB & Hardware Design", menú "05 Contact" vs. sección "06". |
| 5 | Prevención de errores | 3 | Las opciones de CV deshabilitadas se ven claras, pero cambiar el idioma dentro del diálogo cambia todo el sitio. |
| 6 | Reconocer antes que recordar | 3 | Formación no está en la navegación. |
| 7 | Flexibilidad | n/a | Portafolio. |
| 8 | Estética y minimalismo | 2 | Huecos, contenido repetido tarjeta ↔ modal ↔ experiencia y 7 puntos pulsantes. |
| 9 | Recuperación de errores | 3 | GitHub avisa si falla; el respaldo del CV existe pero cambia el idioma del sitio. |
| 10 | Ayuda | n/a | Portafolio. |
| | **Total** | **23/32 (72 %)** | **Bueno, con poco margen**: la base es sólida y lo débil es la jerarquía. |

**Carga cognitiva:** 3 de 8 puntos fallan (foco único en el hero, jerarquía visual en Hardware, agrupación en
Skills con 8 grupos y unas 37 filas). Carga **moderada**.

**Especificidad del diseño:** **pasa.** El sistema se siente hecho para este perfil: tabla de specs, bloque "Problem"
en cobre, códigos HW-0X y FIG. XX, hoja de datos y chip del hero. No es una plantilla intercambiable de
portafolio. El riesgo no es genericidad sino **exceso de instrumentación**: tantas etiquetas mono, códigos y
puntos "live" compiten con el contenido real.

### Personas (derivadas del público que describiste)

- **Reclutadora de hardware con 30 s (probablemente en móvil):** abre el sitio, ve nombre, rol y Javeriana, y
  toca "View hardware projects". Lo primero que encuentra es un recuadro vacío "COVER PHOTO · Coming soon" con
  la etiqueta "Flagship build". Si baja, encuentra dos huecos más antes de la primera imagen real. Si en cambio
  sigue en orden sin tocar el CTA, recorre 1,7 pantallas de rasgos blandos antes del primer proyecto. Si toca
  "Résumé" en español, no puede descargar nada sin cambiar el sitio a inglés.
- **Ingeniero técnico que vuelve con calma (escritorio):** abre "Full breakdown" de PROTEO esperando esquemático
  y video, y encuentra lo mismo de la tarjeta, una viñeta más y tres marcos vacíos. En Skills busca "Altium",
  "C++" o "Python" en 37 filas con el mismo peso visual y etiquetas de 10 px.
- **Visitante no técnico (RR. HH.):** la hoja de datos (FSM, 1-Wire, LWT, pigpio µs) no tiene resumen en
  lenguaje llano; se queda con las credenciales y el contacto, que sí funcionan bien.

---

## Hoy vs. con todas las fotos y videos

| Desaparece cuando lleguen los medios | Sigue existiendo aunque haya foto y video en todos los slots |
|---|---|
| Portadas vacías (5/7) y jerarquía invertida en Hardware (si PROTEO recibe una portada fuerte) | Tarjeta ≈ modal (O-2) y longitud total (D-1, D-2) |
| Bitácoras vacías en el modal (19 de 23 slots hoy) | Perfil antes de la prueba y con rasgos blandos sin evidencia (O-3, T-2) |
| Sensación de "sitio en construcción" en tema claro (E-5) | Botón "primario" compitiendo en el hero y 3 estilos de botón (U-1, E-2) |
| — | HW-02 repitiendo la monitoría (O-4) |
| — | Selector de CV que cambia el idioma de todo el sitio (U-2) |
| — | Legibilidad de la hoja de datos, choque de códigos HW-0X y deriva tipográfica (U-4, E-3, E-4) |
| — | 7 puntos pulsantes, contadores animados y grupo de IA (T-1, T-3, T-4) |
| — | Columna vacía de Experiencia a 1280–1440 y tarjetas apretadas a 768 (D-4, D-5) |

---

## 1. Organización de la información

### O-1 · Crítico: la jerarquía entre proyectos se invierte por los medios
- **Dónde:** Hardware; [HardwareProjects.jsx:84-98](../src/components/HardwareProjects.jsx#L84-L98) (portada), orden de `HARDWARE` en `content.js`.
- **Qué pasa:** la insignia ocupa 2 columnas y lleva el sello cobre "Flagship build", pero media tarjeta es un
  hueco. HW-02 y HW-03 también son huecos, y HW-04/05 son las primeras con imagen real (osciloscopio y gráfica
  de señales), así que se convierten en lo más llamativo de la sección. Las seis tarjetas no insignia pesan
  visualmente igual.
- **Por qué importa:** quien escanea 30 s juzga la sección por su primera pantalla. Hoy esa pantalla dice "aún
  no hay fotos" justo del proyecto que el sitio declara más importante.
- **Opciones:**
  1. **Sin portada mientras no haya medio:** si `coverBase()` no encuentra nada, la tarjeta se pinta solo con
     texto (sin recuadro 16:10). La insignia pasa a una sola columna de texto a lo ancho, sin mitad vacía.
     Es honesto y compacto.
  2. **Diagrama de bloques para la insignia**, dibujado en el lenguaje PCB del sitio y **solo con datos ya
     confirmados** en su tabla de specs: sensor IR → GPIO → Raspberry Pi → MQTT (QoS 1, LWT) → Firestore →
     tablero web, y servo/solenoide como actuadores. No agrega datos, pero **tienes que validarlo** antes de
     publicarlo. Lo mismo serviría para FIR (ADC → PIC/FIR → DAC por SPI, control por UART). Cuando llegue
     la foto, el diagrama puede pasar a la bitácora.

### O-2 · Importante: la tarjeta repite casi todo el modal
- **Dónde:** `ProjectCard` vs. `ProjectModal` ([HardwareProjects.jsx:127](../src/components/HardwareProjects.jsx#L127), [:137](../src/components/HardwareProjects.jsx#L137)). Captura `05-modal-proteo-390.png`.
- **Qué pasa:** la tarjeta ya muestra tagline, Problem, 2–3 de 4 viñetas y 4–6 de 6–8 specs. El modal repite
  todo y agrega una viñeta, una o dos specs y la bitácora; hoy 19 de sus 23 slots son huecos. En PROTEO, el
  modal termina en tres marcos "Coming soon" seguidos.
- **Por qué importa:** "Full breakdown" promete profundidad y entrega repetición, y así se pierde la
  confianza en el siguiente clic. Además, la repetición es lo que hace larga la sección (D-2).
- **Opciones:**
  1. **Tarjeta = resumen, modal = detalle:** la tarjeta muestra tagline + 3 specs clave + botones, y el
     Problem y "What I did" pasan solo al modal. La sección se acorta mucho sin quitar información.
  2. Si prefieres tarjetas completas: quitar el modal hasta que haya ≥ 2 medios reales por proyecto y
     convertir el botón en "Build log (n)" solo cuando existan.

### O-3 · Importante: el Perfil va antes de la prueba y es lo más genérico del sitio
- **Dónde:** `About` (sección 00), [App.jsx:32](../src/App.jsx#L32); `ABOUT` en `content.js`.
- **Qué pasa:** 3 párrafos + 7 áreas de enfoque ocupan 0,9 pantallas a 1440 y 1,7 a 375, **antes** de Hardware.
  El párrafo 1 es útil; los párrafos 2 y 3 son rasgos blandos (creatividad, innovación, negociación,
  autoconfianza, decisiones bajo presión) sin evidencia junto a ellos (ver T-2). Las áreas de enfoque repiten
  lo que ya dicen el hero ("Embedded Systems & PCB Design") y Skills.
- **Por qué importa:** en móvil, quien no toca el CTA atraviesa casi dos pantallas de prosa antes del primer proyecto.
- **Opciones:**
  1. **Moverlo abajo** y fusionarlo con Formación e idiomas en un "Perfil y formación" (ver tabla de orden).
  2. **Dejarlo arriba pero condensado:** solo el párrafo 1 + las áreas como chips en una línea (≈0,6 pantallas en móvil).

### O-4 · Importante: HW-02 (PCB a la medida) repite la monitoría
- **Dónde:** `HARDWARE[1]` vs. `EXPERIENCE[0]`. Captura `07-redundancia-pcb-vs-monitoria.jpg`.
- **Qué pasa:** las dos viñetas de "What I did" de HW-02 son casi textuales a las de la monitoría ("Designed and
  developed custom PCBs…", "Supported students… embedded C, FSMs, interrupts and timing…"), y su Problem repite
  la lista de conceptos del curso. Es la segunda tarjeta de la sección, pero la más delgada: sin repo, sin
  medio y con 2 specs "To be confirmed" visibles. El dato "4+ PCBs" aparece además en las credenciales y en Skills.
- **Por qué importa:** para Kiwibot, "Altium + PCB" es lo más valioso que tienes, y hoy se presenta como
  la tarjeta más débil, en el lugar más visible después de la insignia.
- **Opciones:**
  1. Dejar la tarjeta **solo sobre las placas** (quitar las viñetas de docencia, que ya viven en Experiencia) y
     **moverla después de FIR / VOLLEY-PONG** hasta que lleguen función, MCU y capas. Esto cambia el orden que
     acordaste; decides tú.
  2. Mientras falten esos datos, pasar HW-02 a un bloque destacado **dentro** de la monitoría ("Designed 4+
     custom PCBs in Altium for this course"), y devolverlo a Hardware como proyecto completo cuando haya
     esquemático o placa.

### O-5 · Importante: "Next build" (HW-08) es una promesa sin evidencia
- **Dónde:** `NextBuild` ([HardwareProjects.jsx:157](../src/components/HardwareProjects.jsx#L157)); `HARDWARE` último elemento.
- **Por qué importa:** cierra la sección más importante con otro "Coming soon". En un portafolio formal, una
  tarjeta vacía no suma y resta.
- **Opción:** ocultarla hasta que exista (mismo patrón que `SECTIONS.lab: 'auto'`).

### O-6 · Menor: GitHub como bloque propio
- **Dónde:** [App.jsx:38](../src/App.jsx#L38), `GitHubStats`.
- **Qué pasa:** es un bloque de ancho completo entre Software y Formación, con cifras modestas (9 repos, 5
  lenguajes) y chips "×3 / ×2 / ×1" que no se explican. Su etiqueta "Languages" se cruza con "Languages" (idiomas)
  de la sección siguiente.
- **Opciones:** (1) reducirlo a una línea al pie de Software ("9 public repos · active since 2023 · @NicoGomez4262 ↗");
  (2) conservar el bloque pero quitar los chips de lenguajes.

### O-7 · Menor: la navegación no coincide con las secciones
- **Dónde:** menú móvil, [Nav.jsx:155](../src/components/Nav.jsx#L155); `NAV` en `content.js`.
- **Qué pasa:** el menú numera "05 Contact", pero la sección se titula "06 · Contact" porque Formación (05) no
  está en el menú. Formación tampoco está en la nav de escritorio.
- **Opciones:** tomar el número del índice real de la sección, o quitar los números del menú. Agregar Formación
  a la nav, o darlo por cubierto con las credenciales.

### O-8 · Menor: "Software that talks to hardware" no describe los 4 proyectos
- **Dónde:** `swKicker` / `swIntro` ([content.js:157](../src/data/content.js#L157), [:274](../src/data/content.js#L274)).
- **Qué pasa:** PROTEO-web sí habla con hardware; Voltio y Video_DJ solo de lejos; Psicosentir es una plataforma
  para una psicóloga. Un lector técnico nota que el título no se cumple.
- **Opciones:** (1) retitular a algo verdadero para los 4 ("Software & web"); (2) dividir: el tablero de PROTEO se
  queda enlazado a su nodo, y los otros tres van como trabajo freelance/web, conectados a esa entrada de Experiencia.

### Orden de secciones: actual vs. propuesto

| # | Actual | Propuesto | Razón |
|---|---|---|---|
| 1 | Hero | Hero | Sin cambio. |
| 2 | Credenciales (5 celdas) | Credenciales (3–4 celdas) | "'27" ya está en el chip y en Formación; "2 TA roles" como cifra grande pesa poco (ver T-4). |
| 3 | Perfil (00) | **Hardware** | La prueba técnica primero: hoy el primer proyecto está en la pantalla ≈3,5 en móvil. |
| 4 | Hardware | **Laboratorio** (cuando haya 3+ fotos) | Es evidencia física y va pegada a los proyectos; hoy está programada después de Skills. |
| 5 | Experiencia | Experiencia | Sin cambio: la monitoría con PCB refuerza Hardware. |
| 6 | Skills | Skills | Sin cambio. |
| 7 | (Laboratorio, oculto) | Software **+ GitHub como línea al pie** | GitHub no necesita un bloque propio (O-6). |
| 8 | Software | **Perfil y formación** (Perfil condensado + Formación + idiomas) | Es contexto; responde "¿quién es?" después de "¿qué ha hecho?". |
| 9 | GitHub | — | Fusionado en Software. |
| 10 | Formación e idiomas | — | Fusionada en el punto 8. |
| 11 | Contacto | Contacto | Sin cambio. |

Alternativa mínima si prefieres no mover secciones: dejar el orden, condensar el Perfil (O-3 opción 2) y quitar
el bloque de GitHub (O-6 opción 1).

---

## 2. Estética y jerarquía visual

### E-1 · Crítico: los huecos "Coming soon", cuántos hay y cómo se ven
- **Inventario hoy (EN, sin abrir modales):** 5 portadas vacías, 2 specs "To be confirmed" en HW-02, la tarjeta
  "Next build" y "Relevant coursework" en Formación, es decir **9 huecos a la vista**. Dentro de los modales hay
  **19 de 23** slots de bitácora vacíos y 3 specs pendientes más. En el selector de CV hay 1 de 2 formatos
  "Coming soon" en EN y 2 de 2 en ES. El Laboratorio está bien oculto por `'auto'`.
- **El placeholder en sí:** es un recuadro 16:10 grande con "COVER PHOTO · Coming soon", igual 5 veces. En la
  insignia se estira a toda la altura de la tarjeta (`lg:h-full`, [HardwareProjects.jsx:91](../src/components/HardwareProjects.jsx#L91) y [:97](../src/components/HardwareProjects.jsx#L97)). En la
  bitácora repite la etiqueta dos veces ("FIG. 01" arriba a la izquierda y otra vez en el pie; "Assembled board"
  en el centro y otra vez en el pie). Capturas `01-…`, `03-…` y `09-…`.
- **Por qué importa:** un "Coming soon" aislado se lee como honestidad; nueve en la primera pasada se leen
  como un sitio en construcción.
- **Opciones:**
  1. **No pintar portadas vacías** (O-1, opción 1). En la bitácora, si **todos** los slots están vacíos, mostrar
     una sola línea ("Photos and video in progress") en lugar de 3–5 marcos.
  2. Si prefieres conservar el hueco como marca de diseño: franja fina (4:1 en lugar de 16:10), una sola
     etiqueta y sin `lg:h-full` en la insignia.
  3. Ocultar "Relevant coursework" mientras sea `null` (hoy muestra "COMING SOON" más dos barras rayadas junto
     al promedio, justo en la tarjeta que valida tu carrera).

### E-2 · Importante: tres estilos de botón "primario"
- **Dónde:** relleno cian (hero, nav, WhatsApp), relleno de tinta (`Full breakdown`, [HardwareProjects.jsx:144](../src/components/HardwareProjects.jsx#L144):
  blanco en oscuro, **negro** en claro) y tinte cian con punto pulsante (`Live demo`).
- **Qué pasa:** los 7 "Full breakdown" son lo más pesado de cada tarjeta; en tema claro, la píldora negra pesa
  más que el título del proyecto. En la insignia hay 4 píldoras de 3 estilos que en móvil ocupan 2 filas.
- **Opciones:** (1) "Full breakdown" en contorno (como "Source") y el título + la portada como zona clicable;
  (2) un solo relleno en todo el sitio (cian) y todo lo demás en contorno.

### E-3 · Menor: deriva en la tipografía de micro-etiquetas
- **Qué pasa:** las etiquetas mono en mayúsculas usan 6 tamaños (9, 10, 10,5, 11, 12 y 12,5 px; hay 23 usos de
  `text-[10px]` y 32 de `text-[11px]`) y 8 valores de tracking (0,08–0,2 em). La etiqueta más común (specs,
  Problem, hoja de datos) es de 10 px.
- **Por qué importa:** a esos tamaños la diferencia no se percibe como jerarquía, se percibe como ruido; y 10 px
  en mayúsculas espaciadas cuesta leerlo (U-4).
- **Opción:** dos tokens nada más: etiqueta (11 px, 0,14 em) y valor (12,5–13 px, sin tracking).

### E-4 · Menor: los códigos HW-0X significan dos cosas
- **Dónde:** `SKILLS[].code` ([content.js:889-978](../src/data/content.js#L889-L978)) vs. `code()` de proyectos ([HardwareProjects.jsx:13](../src/components/HardwareProjects.jsx#L13)).
- **Qué pasa:** HW-01 es PROTEO en Hardware y "PCB & Hardware Design" en Skills. Un lector atento que aprendió
  el código en la sección anterior se confunde. Captura `08-skills-datasheet-1440.jpg`.
- **Opción:** quitar los códigos de Skills o usar otro prefijo.

### E-5 · Menor: paridad claro / oscuro
- **Bien:** todos los tokens pasan AA en ambos temas, el cobre (#b45309) se mantiene sobrio en claro y la
  composición no cambia.
- **Diferencias:** (a) en claro, los huecos (gris pálido con puntos) se leen como "imagen rota", más que en
  oscuro, donde pasan por paneles; (b) "Full breakdown" se vuelve una píldora negra, lo más pesado de la
  página. Las dos se resuelven con E-1 y E-2. Captura `09-huecos-tema-claro-1440.jpg`.

### E-6 · Menor: las trazas del hero pasan por detrás del texto
- **Dónde:** `PcbTraces` / `mask-radial` (centrada en 60 % 45 %).
- **Qué pasa:** a 1280–1440 una traza corre justo bajo la tagline y otra entre los botones. Captura `02-hero-ctas-1440.jpg`.
- **Opción:** mover el centro de la máscara hacia la derecha (zona del chip) o bajar la opacidad de las trazas en
  la columna de texto. Es un ajuste, no un cambio de decisión.

### E-7 · Menor: el cian hace demasiados trabajos
- **Qué pasa:** el acento cian+cobre se lee **profesional**, no estridente: el cobre está bien contenido
  (Problem e insignia). El que está diluido es el cian: CTAs, enlaces, códigos, etiquetas de sección, puntos,
  "Current", `facts`, barras de idioma y foco.
- **Opción:** reservar el relleno cian para un CTA, y pasar códigos y kickers a `ink-dim`.

---

## 3. Intuitividad y usabilidad

### U-1 · Importante: dos acciones primarias en la primera pantalla
- **Dónde:** nav "Résumé" relleno cian ([Nav.jsx:115](../src/components/Nav.jsx#L115)) + hero "View hardware projects" relleno cian ([Hero.jsx:195](../src/components/Hero.jsx#L195)). Captura `02-hero-ctas-1440.jpg`.
- **Qué pasa:** los dos pesan igual y llevan a destinos distintos. En el hero hay además "Download résumé" en
  contorno, GitHub y LinkedIn: 4 acciones en el hero y 5 contando la nav.
- **Opciones:** (1) **Recomendada:** "Résumé" de la nav en contorno, y el relleno solo en "View hardware projects".
  (2) Si decides que la acción principal es el CV (es lo que más pide un reclutador), invertir: "Download résumé"
  relleno en el hero y "View hardware projects" en contorno. Lo importante es que haya una sola.

### U-2 · Importante: el selector de CV es un paso extra con una opción, y cambia el idioma del sitio
- **Dónde:** [CvDialog.jsx:82](../src/components/CvDialog.jsx#L82) y [:140](../src/components/CvDialog.jsx#L140) (`setLang`). Captura `06-selector-cv-en-es-390.png`.
- **Qué pasa:** en EN hay 1 formato disponible (el respaldo ATS) y 1 "Coming soon"; en ES, 0 y 2. Elegir
  "Español" dentro del diálogo pasa **todo el sitio** a español; en ES la salida es "Cambiar a inglés", que lo
  pasa todo a inglés. Para quien lee en español (el equipo de Medellín, por ejemplo), descargar el CV cuesta 3 toques y le cambia la página detrás.
- **Por qué importa:** el selector tiene sentido con 4 archivos; con 1, es fricción.
- **Opciones:**
  1. **Descarga directa** mientras el idioma activo tenga un solo archivo disponible; el diálogo aparece solo
     cuando hay ≥ 2 opciones reales.
  2. **Separar los idiomas:** el diálogo lista todo lo disponible ("English · ATS ↓", "Español · ATS —
     próximamente") y **no** toca el idioma del sitio.

### U-3 · Menor: una portada vacía que se puede cliquear lleva a más vacío
- **Qué pasa:** la portada es un botón que abre el modal. Si es un hueco, el clic lleva a otros tres huecos.
  "Full breakdown" sí deja clara la afordancia; el título no es clicable.
- **Opción:** sin medio, sin portada (E-1); hacer clicable el título.

### U-4 · Importante: la hoja de datos es completa pero cuesta escanearla
- **Dónde:** `Skills`, [Skills.jsx:32](../src/components/Skills.jsx#L32) (clave en `w-[34%]`, 10 px). Captura `08-skills-datasheet-1440.jpg`.
- **Qué pasa:** son 8 grupos y unas 37 filas, todas con el mismo peso visual. Las claves van en 10 px, en
  mayúsculas y en `ink-faint`, y se parten en 2 líneas ("BOARDS DESIGNED", "EMBEDDED LINUX", "MOTOR CONTROL").
  En móvil son 3,3 pantallas. Para un ingeniero, el formato funciona; alguien no técnico no encuentra "Altium"
  o "C++" más rápido que "1-Wire" o "LWT".
- **Opciones:**
  1. **Énfasis, no contenido nuevo:** resaltar en `ink` y seminegrita las 5–6 herramientas que coinciden con
     el aviso (Altium, LTspice, C/C++, Python, Raspberry Pi, oscilloscope) y dejar el resto en `ink-dim`.
  2. **Menos grupos, claves legibles:** fusionar Software + Tools, pasar IA a Tools (T-3), claves a 11 px con
     columna mínima de 8 rem. Quedan 6 grupos y la retícula cierra pareja.

### U-5 · Menor: el número "WhatsApp" es un enlace de llamada
- **Dónde:** [Contact.jsx:62](../src/components/Contact.jsx#L62) (`tel:`).
- **Qué pasa:** la etiqueta dice "WhatsApp · fastest reply", pero el número grande abre una **llamada**; en
  escritorio, `tel:` no hace nada útil o abre un selector de apps.
- **Opciones:** que el número abra el mismo enlace de WhatsApp que el botón, o que sea texto (ya existe "Copy number").
- **Nota (no es un cambio de decisión):** WhatsApp como canal principal es decisión tuya y se respeta. Solo
  como dato: la práctica abierta es en San Francisco, y allí el correo es el canal esperado. Puedes darle al
  correo el mismo peso visual sin quitarle el primer lugar a WhatsApp.

### U-6 · Menor: detalles de lectura
- "×3" en los chips de GitHub no dice que son repos (se resuelve con O-6).
- Dentro del diálogo, Escape cierra solo el diálogo y deja el menú móvil abierto, con el foco de vuelta: **correcto**.

---

## 4. Densidad y equilibrio

### D-1 · Importante: longitud por sección (medida en vivo)

| Sección | 1440 × 900 (pantallas) | 375 × 812 (pantallas) |
|---|---|---|
| Hero | 0,92 | 0,92 |
| Credenciales | 0,15 | 0,42 |
| Perfil | 0,91 | 1,71 |
| **Hardware** | **5,17** | **10,64** |
| Experiencia | 1,76 | 2,68 |
| Skills | 1,41 | 3,30 |
| Software | 1,17 | 2,23 |
| GitHub | 0,57 | 0,89 |
| Formación | 0,79 | 1,09 |
| Contacto | 0,85 | 1,36 |
| **Total** | **13,8** (Contacto empieza en la 12,9) | **25,5** (Contacto empieza en la 23,9) |

En español es más largo: 14,3 pantallas a 1440 y **28,2** a 360. La mitad del recorrido en móvil es Hardware.
- **Opciones:** O-2 (tarjeta-resumen), O-3, O-5, O-6 y U-4 opción 2. Juntas deberían recortar del orden de un
  tercio en móvil (estimado, no medido).

### D-2 · Importante: tarjetas de 1,2 a 1,75 pantallas en móvil
- **Dato:** a 375 px, las tarjetas miden 970–1419 px (PROTEO 1419). Cada una tiene portada, tagline, Problem,
  viñetas, specs y 2–4 botones. Captura `10-movil-390-perfil-y-hardware.jpg`.
- **Opción:** por debajo de 768 px, tarjeta = tagline + 3 specs + botones (O-2 aplicado solo en móvil, si no se
  quiere tocar escritorio).

### D-3 · Importante: roturas a 1024 px
- **Dónde:** hero ([Hero.jsx:159](../src/components/Hero.jsx#L159), [:192](../src/components/Hero.jsx#L192)) y la insignia. Captura `03-1024-hero-e-insignia.jpg`.
- **Qué pasa:** (a) la fila de CTAs se parte y **LinkedIn queda solo** en una segunda línea, en EN y ES; a 360 ES
  pasa lo mismo. (b) La insignia pasa a dos columnas y el hueco se estira a 985 px de alto (a 1440, a 862 px): más
  de una pantalla entera de recuadro vacío.
- **Opciones:** (a) agrupar GitHub + LinkedIn en un contenedor que no se parta, o ponerlos junto al avatar o
  el badge; (b) quitar `lg:h-full` cuando no hay medio, o usar el layout lado a lado para la insignia solo desde 1280.

### D-4 · Menor: 768–820 px con 2 columnas apretadas
- **Qué pasa:** las tarjetas quedan de ≈350 px de ancho: títulos de 3 líneas ("Custom PCBs for / Processor-Based
  / Systems Design"), valores de specs partidos y chips "TO BE CONFIRMED" apretados. Captura `11-tarjetas-768-apretadas.jpg`.
- **Opción:** 1 columna hasta 1024 (`md:grid-cols-2` → `lg:grid-cols-2`, [HardwareProjects.jsx:324](../src/components/HardwareProjects.jsx#L324)).

### D-5 · Menor: la columna derecha de Experiencia queda vacía a 1280–1440
- **Dónde:** [Experience.jsx:106](../src/components/Experience.jsx#L106) (`max-w-4xl`).
- **Qué pasa:** las demás secciones usan todo el ancho (`max-w-6xl`); Experiencia queda en unos 900 px pegada a
  la izquierda y deja casi un tercio vacío durante 1,8 pantallas. Se ve accidental.
- **Opciones:** (1) desde 1280, académica y profesional lado a lado en dos columnas; (2) centrar el bloque.

### D-6 · Menor: bordes inferiores desparejos en la retícula de Skills
- A 1440, "PCB & Hardware Design" y "Lab & Instrumentation" quedan con espacio vacío abajo por el `row-span-2`
  de Embedded. Se resuelve con U-4 opción 2 (6 grupos) o con filas de igual alto.

**Lo que sí está bien acomodado:** el ritmo vertical entre secciones es constante (`py-20 / md:py-28`), el
contenedor es consistente, y Contacto y Formación tienen buena densidad en todos los anchos.

---

## 5. Tono (portafolio formal de ingeniería)

### T-1 · Importante: 7 puntos pulsantes a la vez
- **Dónde:** badge del hero, "Live demo" (tarjeta y modal), 3 viñetas "Current" en Experiencia, "Live" de
  GitHub y la etiqueta de WhatsApp (`live-dot` en 5 componentes).
- **Qué pasa:** el mismo pulso significa "busco práctica", "demo en línea", "trabajo actual", "datos en vivo"
  y "respondo rápido". Por repetición deja de significar algo y queda un parpadeo periférico mientras se lee.
- **Opción:** dejar un solo punto (disponibilidad en el hero), incluso estático; los demás, fijos.

### T-2 · Importante: los párrafos 2 y 3 del Perfil suenan a CV genérico
- **Qué pasa:** frente a un sitio que por lo demás es concreto y verificable (QoS 1, LDAC, 21,1 µs por línea),
  "creativity, innovation, responsibility…", "negotiate well and work with self-confidence" son adjetivos sin
  prueba. Un ingeniero que evalúa los descuenta, y pueden restarle credibilidad al resto.
- **Opciones:** (1) quitarlos del sitio (siguen en el CV); (2) dejar una sola frase de trabajo en equipo, que
  **sí** tiene evidencia en VOLLEY-PONG, CORRELACIUM y DreamSnake ("What we built").

### T-3 · Menor (revisa una decisión previa): el grupo "AI" en la hoja de datos
- **Dónde:** `SKILLS` `AI-01` ([content.js:978-983](../src/data/content.js#L978-L983)); "Artificial Intelligence" en las áreas de enfoque.
- **Qué pasa:** "Higgsfield · Generative media" no tiene relación con una práctica de hardware, y tener IA como
  área de enfoque sin un proyecto que la respalde (CORRELACIUM aclara que funciona "without a trained model")
  debilita el mensaje. Puede despertar dudas sobre cuánto trabajo es propio.
- **Recomendación (es una decisión que ya tomaste, la reviso a propósito):** pasar "Claude Code · Codex" a
  Tools como "AI coding assistants", quitar Higgsfield de la hoja de datos y dejar el interés en IA solo en el
  Perfil.

### T-4 · Menor: números animados
- **Dónde:** `Counter` en credenciales y GitHub.
- **Qué pasa:** el promedio que sube de 0,0 a 4,3 es un recurso de landing de marketing. En un portafolio
  formal, un número fijo se lee más serio. Además, "2" monitorías como cifra grande pesa poco.
- **Opción:** números estáticos; credenciales en 3–4 celdas (promedio, PCB, proyectos, y opcionalmente monitorías).

### T-5 · Menor: copy de interfaz
- "Let's build something." / "Construyamos algo." es informal frente al resto; una alternativa sobria es
  "Contact" / "Contacto" como título.
- "22+ contracted hours." es ambiguo (¿por semana?, ¿en total?): pregúntate cuál es el dato exacto antes de
  reescribirlo. No se completa sin tu confirmación.
- "Real client." es un fragmento; "Sidebar moderno" es un anglicismo en ES ("Moderno con barra lateral").
- Títulos de sección: ninguno es redundante y suenan bien en EN y ES.

### T-6 · Nota: chip del hero, trazas y retícula
- **Chip NG-01:** es decorativo pero coherente con el tema y tiene un pie que lo explica ("The signals behind
  the projects below"); lo que rotula es real. No lo quitaría ahora. Cuando llegue una foto buena de PROTEO,
  la placa real en ese lugar sería mejor evidencia que un chip simbólico.
- **Trazas del hero:** se dibujan una vez, en ≤ 1,2 s, y son sutiles. Están bien (solo E-6).
- **Retícula PCB** (el detector la marca como patrón genérico): se mantiene porque es del brief. Sugerencia
  menor: reservarla para el hero y no repetirla en GitHub, Contacto y los huecos, para que siga significando algo.

### T-7 · Qué falta para transmitir rigor (sin inventar)
- El **rol en la insignia**: `team: null` en PROTEO. Es el proyecto más importante y el único donde no se sabe
  si fue individual o en equipo, ni de qué materia. Es un dato por confirmar (ya está en MATERIALS), no algo
  de diseño, pero es el hueco de contenido que más pesa.
- Las **fechas de disponibilidad** del badge (`SEEKING.dates`). Un reclutador pregunta "¿cuándo?" antes que
  cualquier otra cosa.

---

## Qué funciona bien (mantener)

- **Sistema visual propio:** tablas de specs, bloque Problem en cobre, FIG./HW- y la hoja de datos hacen que se
  lea como el portafolio de un ingeniero electrónico, no como una plantilla.
- **Honestidad visible:** lo pendiente se ve como pendiente, nunca como texto inventado. El problema es de
  cantidad y tamaño, no de principio.
- **Accesibilidad y robustez:** AA en ambos temas, foco bien manejado en diálogos apilados, 0 overflow y 0
  errores de consola en 16 combinaciones de ancho × idioma, y `prefers-reduced-motion` respetado.
- **Cruces hardware ↔ software** (PROTEO nodo ↔ tablero): el enlace lleva a la tarjeta y la resalta; bien resuelto.
- **Contacto:** claro y accionable en todos los anchos (WhatsApp, copiar número, correo y CV).

---

## Quick wins (poco esfuerzo, alto impacto)

1. Ocultar la tarjeta **"Next build"** hasta que exista (O-5).
2. Ocultar **"Relevant coursework"** mientras sea `null` (E-1).
3. **"Résumé" de la nav en contorno**, para que quede un solo primario en el hero (U-1).
4. **Descarga directa del CV** cuando el idioma activo tenga un solo archivo (U-2, opción 1).
5. Quitar el estiramiento **`lg:h-full`** del hueco de la insignia (D-3 b / E-1).
6. Dejar **un solo punto pulsante** (T-1).
7. Numerar el menú móvil con el índice real de cada sección (O-7).
8. Agrupar **GitHub + LinkedIn** del hero para que no quede ninguno huérfano (D-3 a).
9. Quitar los códigos **HW-0X de Skills** (E-4).
10. Que el número de **WhatsApp** abra WhatsApp y no una llamada (U-5).
11. Quitar la etiqueta duplicada **"FIG. 0X"** del hueco de la bitácora (E-1).

## Cambios grandes (requieren trabajo o una decisión tuya)

1. **Tarjeta = resumen / modal = detalle** (O-2, D-2). Es el cambio de mayor impacto en longitud.
2. **Portadas:** sin portada cuando no hay medio y **diagrama de bloques de la insignia** a partir de sus specs, que tendrías que validar (O-1, E-1).
3. **Nuevo orden de secciones:** Perfil + Formación juntos al final y GitHub dentro de Software (tabla de la sección 1).
4. **HW-02:** enfocarlo en las placas y reubicarlo hasta que lleguen sus datos (O-4). Cambia un orden que ya acordaste.
5. **Hoja de datos:** 6 grupos, claves legibles y énfasis en las herramientas del aviso (U-4, D-6).
6. **Botones:** un solo estilo relleno y "Full breakdown" en contorno (E-2).
7. **Experiencia** a dos columnas desde 1280 (D-5) y 1 columna de proyectos hasta 1024 (D-4).
8. Decisiones de contenido: **párrafos 2–3 del Perfil** (T-2), **grupo de IA y Higgsfield** (T-3) y **números estáticos** (T-4).
9. Consolidar la **tipografía de micro-etiquetas** en 2 tokens (E-3).

## Capturas de referencia

| Archivo | Ilustra |
|---|---|
| `01-hardware-jerarquia-1440-oscuro.jpg` | O-1, E-1: insignia con media tarjeta vacía; las imágenes reales de HW-04/05 dominan. |
| `02-hero-ctas-1440.jpg` | U-1, E-6: dos rellenos cian y trazas bajo la tagline. |
| `03-1024-hero-e-insignia.jpg` | D-3: LinkedIn huérfano y hueco estirado a toda la altura. |
| `05-modal-proteo-390.png` | O-2: el modal repite la tarjeta y termina en 3 huecos. |
| `06-selector-cv-en-es-390.png` | U-2: 1 de 2 en EN, 0 de 2 en ES. |
| `07-redundancia-pcb-vs-monitoria.jpg` | O-4: viñetas casi idénticas en HW-02 y en la monitoría. |
| `08-skills-datasheet-1440.jpg` | U-4, E-4: claves de 10 px y códigos HW-0X repetidos. |
| `09-huecos-tema-claro-1440.jpg` | E-5: los huecos en claro se leen como imagen rota. |
| `10-movil-390-perfil-y-hardware.jpg` | O-3, D-2: Perfil y tarjetas largas en móvil. |
| `11-tarjetas-768-apretadas.jpg` | D-4: dos columnas apretadas a 768 px. |
