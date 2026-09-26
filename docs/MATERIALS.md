# Materiales que faltan — qué entregar, dónde y cómo

_Actualizado el 26 sep 2026. Sitio en vivo: <https://nicolasgomez.dev>._

Este archivo lista **solo lo que sigue pendiente**. Lo ya entregado se quita de aquí (queda en el historial de git).

Suelta todo en **`C:\Users\nico\Portafolio\incoming\`** (está en `.gitignore`: nada de ahí se sube a GitHub).
En la siguiente sesión se renombra, se optimiza con `scripts/media.py` (WebP y MP4, peso, dimensiones), se mueve
a su ruta final, se compila, se hace commit y se despliega.

```
incoming/
├── cv/                      ← hojas de vida corregidas (PDF), con el mismo nombre de archivo
├── foto/                    ← la foto editada con Higgsfield (opcional)
├── projects/<id>/           ← proteo · custom-pcbs · eeg-emg · lvdt · conveyor · volley-pong · correlacium · fir-pic · dreamsnake
├── software/<id>/           ← proteo-web · voltio-residencial · video-dj · psicosentir (opcional)
├── lab/                     ← fotos del laboratorio 01 … 09
└── datos/                   ← respuestas.md con los datos pendientes (sección 5)
```

> **Ya procesado (25 y 26 sep 2026):** todo lo que hay hoy en `incoming/cv/` y `incoming/projects/` ya está en
> `public/`. Se descartaron 4 archivos: el video `VID-20241121-WA0055` de CORRELACIUM (salen caras y tiene ~2 s
> útiles), `My movie 2.mp4` de EEG/EMG (repite otro video), dos fotos repetidas de la varita y una foto de
> VOLLEY-PONG con personas al fondo. Al video del osciloscopio del EEG se le quitó el último segundo (sale una cara).

**Reglas de entrega**

- Entrega **originales en la mejor calidad** que tengas (JPG/HEIC del celular, PNG de capturas, MP4/MOV de video).
  Las columnas «Tamaño final» y «Peso final» son lo que produce la sesión; no tienes que comprimir nada.
- Usa los nombres de archivo de las tablas. Si no coinciden, igual se reconocen por la carpeta.
- Fotos: buena luz, fondo limpio, **sin caras ni datos personales visibles** (placas, correos, cédulas).
- Videos: 10–20 s, sin audio (se quita), plano estable; que se vea **causa → efecto** (qué tocas y qué pasa).
- Los PDF de las hojas de vida deben tener **texto seleccionable** (exportados, no escaneados).

**Prioridad para Kiwibot / robot.com** (práctica de hardware): **P0** = sin esto la aplicación queda coja ·
**P1** = sube mucho el nivel · **P2** = complementario.

---

## 1. Correcciones de las hojas de vida «Moderno» (Canva) — P1

Las 4 hojas de vida ya están publicadas (26 sep 2026). Las dos ATS coinciden con el sitio. Las dos «Moderno» se
publicaron como las entregaste, pero todavía tienen estas diferencias con el sitio y con las ATS:

| # | Archivo | Qué corregir | Cómo debería quedar |
|---|---|---|---|
| 1.1 | `Nicolas_Gomez_CV_EN_Modern.pdf` | La entrada «Freelance Web Developer» (Jul 2026 – Present) tiene como organización «Programa Tu, Bogotá, Colombia». | Como en la ATS: «Self-employed, projects for independent businesses» (o «Independent businesses»). |
| 1.2 | `Nicolas_Gomez_CV_EN_Modern.pdf` | «GPA: 4.25/5.0». | «GPA: 4.3/5.0», como el sitio y las otras tres. |
| 1.3 | `Nicolas_Gomez_CV_ES_Moderno.pdf` | El título sale en inglés: «Bachelor of Science in Electronic Engineering». | «Pregrado en Ingeniería Electrónica», como la ATS en español. |
| 1.4 | `Nicolas_Gomez_CV_ES_Moderno.pdf` | «Monitor académico – Diseño de sistemas embebidos». | El nombre oficial, como en la ATS: «Diseño de Sistemas Basados en Procesadores». |
| 1.5 | Las dos «Moderno» | «Programa Tu». | «Programa Tú». |

Para reemplazar una: expórtala de nuevo desde Canva y suéltala en `incoming/cv/` con el nombre exacto de la tabla.

---

## 2. Fotos y videos de proyectos de hardware

Estado del carrusel: PROTEO, PCB a la medida, EEG/EMG, LVDT, banda transportadora, VOLLEY-PONG, CORRELACIUM y
DreamSnake ya tienen medios. **El FIR no tiene ninguno** (su tarjeta dibuja la cadena de señal).

### 2.1 PROTEO (HW-01, insignia) — `projects/proteo/` — P0

Hoy la tarjeta solo tiene el video pitch de YouTube. Falta ver el hardware de cerca.

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 2.1.1 | `demo.mp4` | `incoming/projects/proteo/` | `public/media/projects/proteo/demo.mp4` + `demo.webp` | MP4 H.264, sin audio | 1280 px de ancho, 10–20 s | < 2,5 MB | Clic en «Abrir» en el tablero web → el seguro se acciona; mano frente al IR → alerta y foto automática. |
| 2.1.2 | `board.jpg` | `incoming/projects/proteo/` | `public/media/projects/proteo/board.webp` | WebP | lado largo 1600 px | < 250 KB | Primer plano de la Raspberry Pi y su cableado: sensor IR, servo y solenoide con lo que lo maneje. |
| 2.1.3 | `schematic.png` | `incoming/projects/proteo/` | `public/media/projects/proteo/schematic.webp` | WebP, fondo claro | lado largo 1600 px | < 300 KB | Diagrama de conexiones del nodo tal como está armado (alimentación, GPIO, actuadores). Sirve Fritzing, KiCad o un dibujo limpio. |

### 2.2 Filtrado FIR sobre un PIC (HW-08) — `projects/fir-pic/` — P1

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 2.2.1 | `demo.mp4` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/demo.mp4` + `demo.webp` | MP4, sin audio | 1280 px de ancho, 10–20 s | < 2,5 MB | Enviar `FILTRO(n)` por UART y ver cómo cambia la salida en el osciloscopio. |
| 2.2.2 | `scope.jpg` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/scope.webp` | WebP | lado largo 1600 px | < 250 KB | Osciloscopio con la entrada y la salida filtrada en dos canales. |
| 2.2.3 | `board.jpg` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/board.webp` | WebP | lado largo 1600 px | < 250 KB | El montaje (protoboard o PCB) con el ADC y el DAC. |
| 2.2.4 | `schematic.png` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/schematic.webp` | WebP, fondo claro | lado largo 1600 px | < 300 KB | PIC ↔ MAX11666 ↔ MCP4822 en el bus SPI compartido, más UART. |

### 2.3 Resto de proyectos — P1 / P2

| # | Proyecto | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar | Prioridad |
|---|---|---|---|---|---|---|---|---|---|
| 2.3.1 | PCB a la medida (HW-02) | `board-<n>.jpg` | `incoming/projects/custom-pcbs/` | `public/media/projects/custom-pcbs/board-<n>.webp` | WebP | lado largo 1600 px | < 250 KB | Las **otras** placas que diseñaste (hoy solo se ve la de matrices LED), con una línea de qué hace cada una. | P1 |
| 2.3.2 | PCB a la medida (HW-02) | `layout.png` | `incoming/projects/custom-pcbs/` | `public/media/projects/custom-pcbs/layout.webp` | WebP | lado largo 1600 px | < 300 KB | Captura del layout 2D en Altium con las capas visibles (ya están el render 3D y el esquemático). | P2 |
| 2.3.3 | CORRELACIUM (HW-07) | `demo.mp4` | `incoming/projects/correlacium/` | `public/media/projects/correlacium/demo.mp4` + `demo.webp` | MP4, sin audio | 1280 px de ancho, 5–15 s | < 2,5 MB | Hacer un hechizo con la varita y ver su nombre en la OLED. **Sin caras** (por eso se descartó el video del 21 nov 2024). | P1 |
| 2.3.4 | LVDT (HW-04) | `demo.mp4` | `incoming/projects/lvdt/` | `public/media/projects/lvdt/demo.mp4` + `demo.webp` | MP4, sin audio | 1280 px de ancho, 10–20 s | < 2,5 MB | Girar el tornillo micrométrico y ver cómo cambia la lectura del PIC junto al comparador. | P1 |
| 2.3.5 | EEG/EMG (HW-03) | `schematic.png` | `incoming/projects/eeg-emg/` | `public/media/projects/eeg-emg/schematic.webp` | WebP, fondo claro | lado largo 1600 px | < 300 KB | Esquemático del front-end: amplificador de instrumentación y etapa de filtros. | P2 |
| 2.3.6 | Banda transportadora (HW-05) | `schematic.png` | `incoming/projects/conveyor/` | `public/media/projects/conveyor/schematic.webp` | WebP, fondo claro | lado largo 1600 px | < 300 KB | Arduino + L298N + motor + potenciómetro (y el sensor de RPM, si lo hay). | P2 |

VOLLEY-PONG y DreamSnake están completos.

---

## 3. Laboratorio «On the bench» — P1

La sección aparece sola cuando hay **3 o más** fotos (hoy no hay ninguna, así que no se muestra). Cada foto
necesita un pie de foto corto en inglés y en español (escríbelos en `incoming/datos/respuestas.md`).

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar (sugerencia) |
|---|---|---|---|---|---|---|---|
| 3.1 | `01.jpg` | `incoming/lab/` | `public/media/lab/01.webp` | WebP | 1200 × 900 (4:3) | < 200 KB | Prototipo en protoboard |
| 3.2 | `02.jpg` | `incoming/lab/` | `public/media/lab/02.webp` | WebP | 1200 × 900 | < 200 KB | Soldando / ensamblando una placa |
| 3.3 | `03.jpg` | `incoming/lab/` | `public/media/lab/03.webp` | WebP | 1200 × 900 | < 200 KB | Una PCB a la medida |
| 3.4 | `04.jpg` | `incoming/lab/` | `public/media/lab/04.webp` | WebP | 1200 × 900 | < 200 KB | Instrumentos de banco (osciloscopio, fuente, generador) |
| 3.5 | `05.jpg` | `incoming/lab/` | `public/media/lab/05.webp` | WebP | 1200 × 900 | < 200 KB | Midiendo una señal |
| 3.6 | `06.jpg` | `incoming/lab/` | `public/media/lab/06.webp` | WebP | 1200 × 900 | < 200 KB | Depurando firmware (PC + placa) |
| 3.7 | `07.jpg` | `incoming/lab/` | `public/media/lab/07.webp` | WebP | 1200 × 900 | < 200 KB | Un proyecto ensamblado |
| 3.8 | `08.jpg` | `incoming/lab/` | `public/media/lab/08.webp` | WebP | 1200 × 900 | < 200 KB | Detalle de una placa (macro) |
| 3.9 | `09.jpg` | `incoming/lab/` | `public/media/lab/09.webp` | WebP | 1200 × 900 | < 200 KB | La mesa de laboratorio |

---

## 4. Foto y software — P2

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 4.1 | `foto.jpg` (opcional) | `incoming/foto/` | `public/assets/foto.webp` + `public/assets/foto.jpg` | WebP + JPG de respaldo | 480 × 480 (cuadrada) | < 80 KB cada una | **Ya hay foto en el sitio** (de `Foto_CV.png`, fondo crema). Solo si quieres la versión con fondo pizarra oscuro hecha con Higgsfield: cara y ropa intactas, rostro centrado con margen. |
| 4.2 | `screen.png` | `incoming/software/proteo-web/` | `public/media/software/proteo-web/screen.webp` | WebP | 1600 × 1000 | < 250 KB | Tablero del cliente con el estado del casillero (no la pantalla de login). |
| 4.3 | `screen.png` | `incoming/software/voltio-residencial/` | `public/media/software/voltio-residencial/screen.webp` | WebP | 1600 × 1000 | < 250 KB | Pantalla principal (reserva o reporte de consumo). |
| 4.4 | `screen.png` | `incoming/software/video-dj/` | `public/media/software/video-dj/screen.webp` | WebP | 1600 × 1000 | < 250 KB | La loop station con el seguimiento de manos visible. |
| 4.5 | `screen.png` | `incoming/software/psicosentir/` | `public/media/software/psicosentir/screen.webp` | WebP | 1600 × 1000 | < 250 KB | Solo páginas públicas (proyecto de cliente). |

Las capturas de software son opcionales: las tarjetas las muestran solas si el archivo existe, y sin él no dejan hueco.

---

## 5. Datos pendientes (⚠) — lista única

Respóndelos en `incoming/datos/respuestas.md` con el número de cada ítem. Lo que no sepas con certeza, déjalo en
blanco: en el sitio se sigue viendo como hueco de diseño, nunca como texto inventado. En `content.js` cada uno
está marcado `⚠ PENDIENTE` o `⚠ VERIFICAR`.

| # | Dato | Dónde se usa | Prioridad |
|---|---|---|---|
| 5.1 | **LinkedIn:** confirmar que la URL vigente es `linkedin.com/in/nicolas-gomez-elec` (está en el sitio y en las 4 hojas de vida; LinkedIn no deja comprobarlo sin iniciar sesión) | Hero, contacto, JSON-LD, CV | P0 |
| 5.2 | **Fechas de disponibilidad para la práctica** (ej. «Jan–Jun 2027») y modalidad (presencial / remota / Medellín / San Francisco) | Badge del hero (`SEEKING.dates`) | P0 |
| 5.3 | **PROTEO:** materia, integrantes del equipo (el pitch muestra 3 personas) y tu rol. ¿El código de la Raspberry del prototipo final (solenoide, cámara) está en algún repo? | HW-01 | P0 |
| 5.4 | **PCB a la medida:** número de capas, unidades fabricadas y fabricante; qué hace cada una de las otras placas | HW-02 | P0 |
| 5.5 | **FIR:** referencia exacta del PIC (¿PIC18F46K42, como el del LVDT?) y frecuencia de muestreo real | HW-08 | P0 |
| 5.6 | **¿Diseñaste filtros IIR?** (hoy la hoja de datos dice «FIR / IIR design») | Skills | P0 |
| 5.7 | **EEG/EMG:** ¿individual o en equipo? ¿De qué materia? Tu rol, y la ganancia y banda de paso de cada canal | HW-03 | P1 |
| 5.8 | **LVDT:** integrantes del grupo (las placas dicen «Proyecto IELEC 2 · Grupo 4»), qué materia es «IELEC 2», tu rol, y la resolución y el rango medidos | HW-04 | P1 |
| 5.9 | **PIC del LVDT:** ¿es el PIC18F46K42 (la placa base dice «46K42 V1»)? ¿La foto del 9 oct 2025 (placa antialiasing) es del LVDT o del FIR? | HW-04, HW-08 | P1 |
| 5.10 | **Banda transportadora:** el video del 25 nov 2025 grafica RPM medidas contra una referencia: ¿esa versión es en lazo cerrado? ¿Con qué sensor mide las RPM? (hoy la ficha dice «PWM en lazo abierto») | HW-05 | P1 |
| 5.11 | **FIR:** ¿individual o en equipo? ¿De qué materia? | HW-08 | P1 |
| 5.12 | **VOLLEY-PONG:** nombre exacto de la materia («Sistemas Digitales»?). El equipo ya está confirmado. | HW-06 | P1 |
| 5.13 | **CORRELACIUM:** nombre exacto de la materia («Procesamiento de Señales»?). | HW-07 | P1 |
| 5.14 | **Soldadura:** ¿THT, SMD o ambas? | Skills | P1 |
| 5.15 | **Materias relevantes** con su nombre exacto (EN y ES), 5–8 como máximo | Formación | P1 |
| 5.16 | **Pies de foto del laboratorio** 01–09, en EN y ES | Laboratorio | P1 (con las fotos) |
| 5.17 | **Serigrafía de la PCB de matrices LED:** ¿se deja visible la frase «Shit happens, but light up the world one bit at a time» en las fotos del sitio? | HW-02 | P2 |
| 5.18 | **Estudiantes por monitoría** (Diseño de Sistemas Basados en Procesadores y Arduino 101), solo si es un número exacto | Experiencia | P2 |
| 5.19 | **Correo del dominio** (ej. `hola@nicolasgomez.dev`), si lo vas a crear. Vercel no aloja correo: hace falta un proveedor (Google Workspace, Zoho, ImprovMX…) | `PROFILE.email` | P2 |
| 5.20 | **Nivel de inglés:** ¿se queda «Upper-Intermediate · B2 (Berlitz 2026)» o se agrega el puntaje del EF SET? | Idiomas, CV | P2 |

Resuelto desde la versión anterior de esta lista: las 4 hojas de vida, los medios de 8 de los 9 proyectos, el
video de VOLLEY-PONG, la placa ensamblada, el render 3D y el esquemático de la PCB a la medida, la redirección
`www` → dominio raíz y la ranura «Next build» (se quitó del sitio el 25 sep 2026).

---

## 6. Acciones tuyas (no son archivos)

| # | Acción | Estado (26 sep 2026) | Por qué |
|---|---|---|---|
| 6.1 | Correr `npx vercel login` en tu terminal (ver los pasos en `docs/next_session.md`). | Sigue «Logged out». | No bloquea nada: el despliegue por `git push` funciona solo. |
| 6.2 | Rotar el token de Google Apps Script que está en el código público de `PROTEO_DEF` (`dashboard.html`, dentro del zip). | Sin cambios (blob `97237fc…`). | Cualquiera puede leerlo y disparar correos desde tu script. |
| 6.3 | Pedirle a Ruslán que te agregue como colaborador en `VOLLEY-PONG-VHDL` y `CORRELACIUM-LEVIOSA`. | Solo figura RuDomiv. | Para que los dos proyectos cuenten en tu perfil de GitHub. |
| 6.4 | Decidir los puntos pendientes de la auditoría de diseño (bloque «Estado» de `docs/design-audit-2026-09-25.md`). | Pendiente. | O-1, O-4, O-6, O-8, E-3, E-6, E-7, U-4, D-4, D-5, T-2, T-3, T-4 y T-5. |
