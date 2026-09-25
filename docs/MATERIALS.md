# Materiales que faltan — qué entregar, dónde y cómo

_Actualizado el 24 sep 2026. Sitio en vivo: <https://nicolasgomez.dev>._

Suelta todo en **`C:\Users\nico\Portafolio\incoming\`** (está en `.gitignore`: nada de ahí se sube a GitHub).
En la siguiente sesión se renombra, se optimiza (WebP, peso, dimensiones), se mueve a su ruta final, se
compila, se hace commit y se despliega.

```
incoming/
├── cv/                      ← las 4 hojas de vida (PDF)
├── foto/                    ← la foto editada con Higgsfield
├── projects/<id>/           ← proteo · custom-pcbs · fir-pic · volley-pong · correlacium · conveyor · dreamsnake
├── software/<id>/           ← proteo-web · voltio-residencial · video-dj · psicosentir (opcional)
├── lab/                     ← fotos del laboratorio 01 … 09
└── datos/                   ← respuestas.md con los datos pendientes (sección 6)
```

**Reglas de entrega**

- Entrega **originales en la mejor calidad** que tengas (JPG/HEIC del celular, PNG de capturas, MP4/MOV de video).
  Las columnas «Tamaño final» y «Peso final» son lo que yo produzco; no tienes que comprimir nada.
- Usa los nombres de archivo de las tablas. Si no coinciden, igual los reconozco por la carpeta.
- Fotos: horizontales, buena luz, fondo limpio, sin personas ni datos personales visibles (placas, correos, cédulas).
- Videos: 10–20 s, sin audio (se quita), plano estable; que se vea **causa → efecto** (qué tocas y qué pasa).
- Los PDF de las hojas de vida deben tener **texto seleccionable** (exportados, no escaneados): los ATS no leen imágenes.

**Prioridad para Kiwibot / robot.com** (práctica de hardware): **P0** = sin esto la aplicación queda coja ·
**P1** = sube mucho el nivel · **P2** = complementario.

---

## 1. Hojas de vida — P0

El selector del sitio ya está listo: cuando estos archivos existan, cada opción se activa sola. Mientras tanto,
solo «EN · ATS» funciona, con el CV de respaldo generado por `scripts/build_cv.py`.

| # | Archivo (nombre exacto) | Entrega | Ruta final | Formato | Tamaño | Peso final | Qué debe tener |
|---|---|---|---|---|---|---|---|
| 1.1 | `Nicolas_Gomez_CV_EN_ATS.pdf` | `incoming/cv/` | `public/assets/cv/Nicolas_Gomez_CV_EN_ATS.pdf` | PDF con texto | Carta, 1 página | < 300 KB | Inglés, formato Harvard / internacional, una columna, sin tablas ni íconos. **El más importante para Kiwibot.** |
| 1.2 | `Nicolas_Gomez_CV_EN_Modern.pdf` | `incoming/cv/` | `public/assets/cv/Nicolas_Gomez_CV_EN_Modern.pdf` | PDF con texto | Carta, 1 página | < 500 KB | Inglés, formato sidebar moderno, para enviar directo a una persona. |
| 1.3 | `Nicolas_Gomez_CV_ES_ATS.pdf` | `incoming/cv/` | `public/assets/cv/Nicolas_Gomez_CV_ES_ATS.pdf` | PDF con texto | Carta, 1 página | < 300 KB | Español, formato Harvard / internacional. Revisa «Programa Tú» (no «Progrma Tu»). |
| 1.4 | `Nicolas_Gomez_CV_ES_Moderno.pdf` | `incoming/cv/` | `public/assets/cv/Nicolas_Gomez_CV_ES_Moderno.pdf` | PDF con texto | Carta, 1 página | < 500 KB | Español, formato sidebar moderno. |

Al recibirlos comparo su contenido con el sitio (promedio 4.3 / 5.0, fechas de monitorías, proyectos, contacto,
LinkedIn) y te reporto diferencias. **No incluyas cédula ni dirección de residencia** en ninguna versión.

---

## 2. Proyecto insignia y diseño de PCB — P0

Lo primero que ve un reclutador de hardware es la tarjeta grande de PROTEO. Hoy muestra un hueco de diseño.

### 2.1 PROTEO — `projects/proteo/` (tarjeta insignia)

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 2.1.1 | `cover.jpg` | `incoming/projects/proteo/` | `public/media/projects/proteo/cover.webp` | WebP | 1600 × 1000 (16:10) | < 250 KB | El prototipo completo del casillero, de frente, con el nodo visible. Es la imagen grande de la tarjeta. |
| 2.1.2 | `board.jpg` | `incoming/projects/proteo/` | `public/media/projects/proteo/board.webp` | WebP | 1600 × 1000 | < 250 KB | Primer plano de la Raspberry Pi y su cableado: sensor IR (GPIO 17), servo (GPIO 18) y solenoide con lo que lo maneje. |
| 2.1.3 | `schematic.png` | `incoming/projects/proteo/` | `public/media/projects/proteo/schematic.webp` | WebP, fondo claro | 1600 × 1000 | < 300 KB | Diagrama de conexiones del nodo tal como está armado (alimentación, GPIO, actuadores). Sirve Fritzing, KiCad o un dibujo limpio. |
| 2.1.4 | `demo.mp4` | `incoming/projects/proteo/` | `public/media/projects/proteo/demo.mp4` + `demo.webp` (póster) | MP4 H.264, sin audio | 1280 × 800, 10–20 s | < 4 MB | Clic en «Abrir» en el tablero web → el seguro se acciona; mano frente al IR → alerta y foto automática. |

### 2.2 PCB a la medida — `projects/custom-pcbs/`

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 2.2.1 | `pcb.png` | `incoming/projects/custom-pcbs/` | `public/media/projects/custom-pcbs/pcb.webp` | WebP, fondo claro u oscuro de Altium | 1600 × 1000 | < 300 KB | Captura del layout en Altium (2D con capas visibles o vista 3D). **Muy valioso para Kiwibot**: piden Altium. |
| 2.2.2 | `schematic.png` | `incoming/projects/custom-pcbs/` | `public/media/projects/custom-pcbs/schematic.webp` | WebP, fondo claro | 1600 × 1000 | < 300 KB | Esquemático exportado de Altium (PDF → PNG sirve), recortado a la hoja. |
| 2.2.3 | `board.jpg` | `incoming/projects/custom-pcbs/` | `public/media/projects/custom-pcbs/board.webp` | WebP | 1600 × 1000 | < 250 KB | Placa fabricada y ensamblada, en macro, con la soldadura visible. |
| 2.2.4 | `cover.jpg` | `incoming/projects/custom-pcbs/` | `public/media/projects/custom-pcbs/cover.webp` | WebP | 1600 × 1000 | < 250 KB | Las placas juntas sobre la mesa (o una en uso en el curso). |

### 2.3 Filtrado FIR sobre un PIC — `projects/fir-pic/`

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 2.3.1 | `scope.jpg` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/scope.webp` | WebP | 1600 × 1000 | < 250 KB | Osciloscopio con la entrada y la salida filtrada en dos canales (captura del equipo o foto de frente a la pantalla). |
| 2.3.2 | `schematic.png` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/schematic.webp` | WebP, fondo claro | 1600 × 1000 | < 300 KB | PIC ↔ MAX11666 ↔ MCP4822 en el bus SPI compartido, más UART. |
| 2.3.3 | `board.jpg` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/board.webp` | WebP | 1600 × 1000 | < 250 KB | El montaje (protoboard o PCB) con ADC y DAC. |
| 2.3.4 | `demo.mp4` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/demo.mp4` | MP4, sin audio | 1280 × 800, 10–20 s | < 4 MB | Enviar `FILTRO(n)` por UART y ver cómo cambia la salida en el osciloscopio. |
| 2.3.5 | `cover.jpg` | `incoming/projects/fir-pic/` | `public/media/projects/fir-pic/cover.webp` | WebP | 1600 × 1000 | < 250 KB | El banco completo: placa, generador de funciones y osciloscopio. |

---

## 3. Resto de proyectos de hardware — P1

VOLLEY-PONG y CORRELACIUM ya muestran material real sacado de sus repos (captura del osciloscopio, esquemático
del LM393 y vista RTL de Quartus; gráfica de las plantillas del acelerómetro). Falta lo físico.

| # | Proyecto | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|---|
| 3.1 | VOLLEY-PONG | `demo.mp4` | `incoming/projects/volley-pong/` | `public/media/projects/volley-pong/demo.mp4` | MP4, sin audio | 1280 × 800, 10–20 s | < 4 MB | Una jugada en el monitor VGA: rebotes, red, barra de boost y marcador. |
| 3.2 | VOLLEY-PONG | `board.jpg` | `incoming/projects/volley-pong/` | `public/media/projects/volley-pong/board.webp` | WebP | 1600 × 1000 | < 250 KB | La DE2-115 con el circuito de los joysticks (LM393) conectado. |
| 3.3 | VOLLEY-PONG | `cover.jpg` | `incoming/projects/volley-pong/` | `public/media/projects/volley-pong/cover.webp` | WebP | 1600 × 1000 | < 250 KB | El juego en pantalla con la tarjeta al frente. Reemplaza la portada actual (captura del osciloscopio). |
| 3.4 | CORRELACIUM | `demo.mp4` | `incoming/projects/correlacium/` | `public/media/projects/correlacium/demo.mp4` | MP4, sin audio | 1280 × 800, 10–20 s | < 4 MB | Hacer un hechizo con la varita y ver su nombre en la OLED. |
| 3.5 | CORRELACIUM | `board.jpg` | `incoming/projects/correlacium/` | `public/media/projects/correlacium/board.webp` | WebP | 1600 × 1000 | < 250 KB | La varita / montaje: placa, ADXL345 y OLED. |
| 3.6 | Banda transportadora | `demo.mp4` | `incoming/projects/conveyor/` | `public/media/projects/conveyor/demo.mp4` | MP4, sin audio | 1280 × 800, 10–20 s | < 4 MB | Girar el potenciómetro: reversa → parada (zona muerta) → adelante. |
| 3.7 | Banda transportadora | `board.jpg` | `incoming/projects/conveyor/` | `public/media/projects/conveyor/board.webp` | WebP | 1600 × 1000 | < 250 KB | Arduino, L298N, motor y banda. |
| 3.8 | Banda transportadora | `schematic.png` | `incoming/projects/conveyor/` | `public/media/projects/conveyor/schematic.webp` | WebP, fondo claro | 1600 × 1000 | < 300 KB | Arduino + L298N + motor + potenciómetro. |
| 3.9 | Banda transportadora | `cover.jpg` | `incoming/projects/conveyor/` | `public/media/projects/conveyor/cover.webp` | WebP | 1600 × 1000 | < 250 KB | La banda funcionando, vista general. |
| 3.10 | DreamSnake | `demo.mp4` | `incoming/projects/dreamsnake/` | `public/media/projects/dreamsnake/demo.mp4` | MP4, sin audio | 1280 × 800, 10–20 s | < 4 MB | Una partida de dos jugadores en las matrices LED. |
| 3.11 | DreamSnake | `board.jpg` | `incoming/projects/dreamsnake/` | `public/media/projects/dreamsnake/board.webp` | WebP | 1600 × 1000 | < 250 KB | Arduino Mega, dos MAX7219 y la LCD 20×4. |
| 3.12 | DreamSnake | `cover.jpg` | `incoming/projects/dreamsnake/` | `public/media/projects/dreamsnake/cover.webp` | WebP | 1600 × 1000 | < 250 KB | El juego encendido, vista general. |

---

## 4. Laboratorio «On the bench» — P1

La sección aparece sola cuando hay **3 o más** fotos. Cada foto necesita un pie de foto corto en inglés y en
español (escríbelos en `incoming/datos/respuestas.md`).

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar (sugerencia) |
|---|---|---|---|---|---|---|---|
| 4.1 | `01.jpg` | `incoming/lab/` | `public/media/lab/01.webp` | WebP | 1200 × 900 (4:3) | < 200 KB | Prototipo en protoboard |
| 4.2 | `02.jpg` | `incoming/lab/` | `public/media/lab/02.webp` | WebP | 1200 × 900 | < 200 KB | Soldando / ensamblando una placa |
| 4.3 | `03.jpg` | `incoming/lab/` | `public/media/lab/03.webp` | WebP | 1200 × 900 | < 200 KB | Una PCB a la medida |
| 4.4 | `04.jpg` | `incoming/lab/` | `public/media/lab/04.webp` | WebP | 1200 × 900 | < 200 KB | Instrumentos de banco (osciloscopio, fuente, generador) |
| 4.5 | `05.jpg` | `incoming/lab/` | `public/media/lab/05.webp` | WebP | 1200 × 900 | < 200 KB | Midiendo una señal |
| 4.6 | `06.jpg` | `incoming/lab/` | `public/media/lab/06.webp` | WebP | 1200 × 900 | < 200 KB | Depurando firmware (PC + placa) |
| 4.7 | `07.jpg` | `incoming/lab/` | `public/media/lab/07.webp` | WebP | 1200 × 900 | < 200 KB | Un proyecto ensamblado |
| 4.8 | `08.jpg` | `incoming/lab/` | `public/media/lab/08.webp` | WebP | 1200 × 900 | < 200 KB | Detalle de una placa (macro) |
| 4.9 | `09.jpg` | `incoming/lab/` | `public/media/lab/09.webp` | WebP | 1200 × 900 | < 200 KB | La mesa de laboratorio |

---

## 5. Foto y software — P2

| # | Archivo | Entrega | Ruta final | Formato | Tamaño final | Peso final | Qué debe mostrar |
|---|---|---|---|---|---|---|---|
| 5.1 | `foto.jpg` (o `.png`) | `incoming/foto/` | `public/assets/foto.webp` + `public/assets/foto.jpg` | WebP + JPG de respaldo | 480 × 480 (cuadrada) | < 80 KB cada una | La foto editada con Higgsfield: fondo pizarra oscuro, cara y ropa intactas, rostro centrado con margen. Se ve pequeña (64–80 px) junto al badge. |
| 5.2 | `screen.png` | `incoming/software/proteo-web/` | `public/media/software/proteo-web/screen.webp` | WebP | 1600 × 1000 | < 250 KB | Tablero del cliente con el estado del casillero (no la pantalla de login). |
| 5.3 | `screen.png` | `incoming/software/voltio-residencial/` | `public/media/software/voltio-residencial/screen.webp` | WebP | 1600 × 1000 | < 250 KB | Pantalla principal (reserva o reporte de consumo). |
| 5.4 | `screen.png` | `incoming/software/video-dj/` | `public/media/software/video-dj/screen.webp` | WebP | 1600 × 1000 | < 250 KB | La loop station con el seguimiento de manos visible. |
| 5.5 | `screen.png` | `incoming/software/psicosentir/` | `public/media/software/psicosentir/screen.webp` | WebP | 1600 × 1000 | < 250 KB | Solo páginas públicas (proyecto de cliente). |

Las capturas de software son opcionales: las tarjetas ya las muestran solas si el archivo existe, y sin él no dejan hueco.

---

## 6. Datos pendientes (⚠) — lista única

Respóndelos en `incoming/datos/respuestas.md` con el número de cada ítem. Lo que no sepas con certeza, déjalo en
blanco: en el sitio se sigue viendo como hueco de diseño, nunca como texto inventado.

| # | Dato | Dónde se usa | Prioridad |
|---|---|---|---|
| 6.1 | **Fechas de disponibilidad para la práctica** (ej. «Jan–Jun 2027») y modalidad (presencial / remota / Medellín / San Francisco) | Badge del hero (`SEEKING.dates`) | P0 |
| 6.2 | **PCB a la medida:** qué hace cada placa, MCU o procesador, número de capas, unidades fabricadas y fabricante | Tarjeta HW-02, CV | P0 |
| 6.3 | **FIR:** referencia exacta del PIC (ej. PIC18F…) y frecuencia de muestreo real | Tarjeta HW-03, CV | P0 |
| 6.4 | **FIR:** ¿individual o en equipo? ¿De qué materia? | Tarjeta HW-03 | P1 |
| 6.5 | **¿Diseñaste filtros IIR?** (hoy la hoja de datos dice «FIR / IIR design») | Skills HW-04, CV | P0 |
| 6.6 | **PROTEO:** materia, integrantes del equipo y tu rol. (El propósito ya está confirmado por el código: guardaequipajes inteligente para hoteles.) ¿El código de la Raspberry del prototipo final (solenoide, cámara) está en algún repo? | Tarjeta HW-01, CV | P0 |
| 6.7 | **VOLLEY-PONG:** confirmar el compañero (Ruslán Domínguez Ivanova) y si Luis Alberto Muñoz Rodríguez, coautor del informe del taller SVGA, fue parte del proyecto final; nombre exacto de la materia («Sistemas Digitales»?) | Tarjeta HW-04 | P1 |
| 6.8 | **CORRELACIUM:** confirmar la placa (el código usa pines GP0/GP1/GP2, propios de la Raspberry Pi Pico) y el nombre exacto de la materia («Procesamiento de Señales»?) | Tarjeta HW-05 | P1 |
| 6.9 | **Soldadura:** ¿THT, SMD o ambas? | Skills HW-05, CV | P1 |
| 6.10 | **Materias relevantes** con su nombre exacto (EN y ES), 5–8 como máximo | Formación | P1 |
| 6.11 | **Estudiantes por monitoría** (Diseño de Sistemas Basados en Procesadores y Arduino 101), solo si es un número exacto | Experiencia | P2 |
| 6.12 | **Pies de foto del laboratorio** 01–09, en EN y ES | Laboratorio | P1 (con las fotos) |
| 6.13 | **Correo del dominio** (ej. `hola@nicolasgomez.dev`), si lo vas a crear. Vercel no aloja correo: hace falta un proveedor (Google Workspace, Zoho, ImprovMX…) | `PROFILE.email` | P2 |
| 6.14 | **Nivel de inglés:** ¿se queda «Upper-Intermediate · B2 (Berlitz 2026)» o se agrega el puntaje del EF SET? | Idiomas, CV | P2 |
| 6.15 | **Próximo proyecto:** nombre y descripción cuando exista (hoy es la ranura «Next build») | HW-08 | P2 |

Resuelto en esta sesión (ya no está pendiente): URL oficial de Programa Tú
(<https://programatu.institutomerani.edu.co>), LinkedIn, teléfono y WhatsApp, propósito de PROTEO, tarjeta y
reloj de VOLLEY-PONG (DE2-115, 50 MHz), compañero de CORRELACIUM.

---

## 7. Acciones tuyas (no son archivos)

| # | Acción | Por qué |
|---|---|---|
| 7.1 | Vercel → proyecto «portfolio» → **Settings → Domains**: editar `www.nicolasgomez.dev` → «Redirect to» `nicolasgomez.dev` (308), y dejar `nicolasgomez.dev` sin redirección. | Hoy es al revés: `nicolasgomez.dev` redirige a `www`. El canonical del sitio es el dominio raíz. |
| 7.2 | Volver a correr `npx vercel login` en la terminal. | La CLI aparece «Logged out». El despliegue por `git push` sí funciona. |
| 7.3 | Pedirle a tu compañero que te agregue como colaborador en los dos repos (ver el mensaje en la entrega). | Para que VOLLEY-PONG y CORRELACIUM cuenten en tu perfil de GitHub. |
| 7.4 | Revisar el token de Google Apps Script que está en el código público de `PROTEO_DEF` (`dashboard.html`). | Cualquiera puede leerlo y disparar correos desde tu script; conviene rotarlo o validarlo del lado del servidor. |
