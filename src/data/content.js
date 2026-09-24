/**
 * Fuente única de verdad del portafolio.
 * Todo el texto vive aquí en EN y ES. Editar aquí lo cambia en todo el sitio.
 *
 * Reglas:
 *  - Inglés es el idioma por defecto; cada entrada lleva `en` y `es` juntos.
 *  - Lo que aún no está confirmado va en `null` con un comentario  ⚠ PENDIENTE.
 *    El sitio lo muestra como un hueco de diseño ("coming soon"), nunca como texto falso.
 *  - Nada de métricas, herramientas ni instrumentos que no estén confirmados.
 */

export const PROFILE = {
  name: 'Nicolás Andrés Gómez Ramírez',
  shortName: 'Nicolás Gómez',
  initials: 'NG',
  // ⚠ PENDIENTE — se reemplaza por el correo del dominio propio. Este es el ÚNICO lugar.
  email: 'nandres-gomez@javeriana.edu.co',
  // El teléfono NO se muestra en el sitio; solo va en el CV.
  location: { en: 'Bogotá, Colombia', es: 'Bogotá, Colombia' },
  github: 'https://github.com/NicoGomez4262',
  githubUser: 'NicoGomez4262',
  linkedin: null, // ⚠ PENDIENTE — URL de LinkedIn. Mientras sea null, no aparece en ningún lado.
  photo: '/assets/foto', // ⚠ PENDIENTE — public/assets/foto.jpg (o .webp). Si no existe, se ve el marco vacío.
  cv: '/assets/Nicolas_Gomez_CV.pdf',
  gpa: '4.25',
  gpaScale: '5.0',
  graduation: '2027',
  university: 'Pontificia Universidad Javeriana',
}

/** Qué busca. `dates` en null = no se muestran fechas. */
export const SEEKING = {
  en: 'Seeking a Hardware / Electrical Engineering Internship',
  es: 'Busco práctica en Ingeniería de Hardware / Eléctrica',
  dates: null, // ⚠ PENDIENTE — ej. { en: 'Summer 2027', es: 'Verano 2027' }
}

/** Interruptores de secciones. */
export const SECTIONS = {
  // 'auto' = la galería aparece sola cuando hay al menos 3 fotos en public/media/lab/, mostrando solo esas.
  // true = siempre visible con los 9 huecos · false = oculta.
  lab: 'auto',
}

export const NAV = [
  { id: 'hardware', en: 'Hardware', es: 'Hardware' },
  { id: 'experience', en: 'Experience', es: 'Experiencia' },
  { id: 'skills', en: 'Skills', es: 'Habilidades' },
  { id: 'lab', en: 'Lab', es: 'Laboratorio' },
  { id: 'software', en: 'Software', es: 'Software' },
  { id: 'contact', en: 'Contact', es: 'Contacto' },
]

export const UI = {
  en: {
    role: 'Electronic Engineering Student',
    roleFocus: 'Embedded Systems & PCB Design',
    tagline: 'I design the circuit, write the firmware, and bring the board to life.',
    ctaProjects: 'View hardware projects',
    ctaCv: 'Download résumé (PDF)',
    ctaCvShort: 'Résumé',
    ctaContact: 'Email me',

    credGpa: 'GPA',
    credTa: 'Teaching-assistant roles',
    credProjects: 'Hardware projects',
    credClass: 'Class of',

    aboutKicker: 'Profile',
    aboutTitle: 'Hardware first, with the software to back it up.',
    focusLabel: 'Focus areas',

    hwKicker: 'Featured hardware',
    hwTitle: 'Boards, firmware and signals',
    hwIntro: 'Embedded projects I designed, wired, programmed and debugged. Each one lists the parts and interfaces involved.',
    problemLabel: 'Problem',
    didLabel: 'What I did',
    specsLabel: 'Specs',
    galleryLabel: 'Build log',
    teamLabel: 'Team',
    openProject: 'Full breakdown',
    viewCode: 'Source',
    viewDemo: 'Live demo',
    close: 'Close',
    starLabel: 'Flagship build',
    nextTitle: 'Next build',
    nextBody: 'A new hardware project is on the bench. Documentation, schematics and photos are coming soon.',

    expKicker: 'Experience',
    expTitle: 'Teaching hardware, hands-on',
    current: 'Current',

    skillsKicker: 'Skills',
    skillsTitle: 'Technical datasheet',
    skillsIntro: 'Grouped the way a datasheet groups features: hardware first, then the tools around it.',
    paramLabel: 'Parameter',
    valueLabel: 'Value',

    labKicker: 'Hardware lab',
    labTitle: 'On the bench',
    labIntro: 'Prototypes, soldering, boards and instruments: the physical side of the work.',
    labPhoto: 'Lab photo',

    swKicker: 'Software that talks to hardware',
    swTitle: 'The code around the circuit',
    swIntro: 'I also build the software that talks to the hardware: web apps in production with real users and clients, from EV-charging metering to camera-based perception.',
    privateNote: 'Private code (client agreement)',
    wip: 'In progress',

    statsKicker: 'Live',
    statsTitle: 'GitHub activity',
    statsRepos: 'Public repos',
    statsLangs: 'Languages',
    statsStars: 'Stars',
    statsFollowers: 'Followers',
    statsSince: 'Active since',
    statsStack: 'Most used languages',
    statsLive: 'Live data from the GitHub API',
    statsLastPush: 'last push',
    statsError: 'GitHub data is unavailable right now.',
    statsLoading: 'Querying GitHub…',

    eduKicker: 'Education',
    eduTitle: 'Education & languages',
    courseworkLabel: 'Relevant coursework',
    langTitle: 'Languages',

    contactKicker: 'Contact',
    contactTitle: "Let's build something.",
    contactBody: 'I am looking for a hardware / electrical engineering internship. Email is the fastest way to reach me.',
    emailLabel: 'Email',
    copy: 'Copy',
    copied: 'Copied',

    soon: 'Coming soon',
    pending: 'To be confirmed',
    footerNote: 'Designed and built by Nicolás Gómez',
    themeLabel: 'Toggle color theme',
    langLabel: 'Cambiar a español',
    menuLabel: 'Open menu',
    skip: 'Skip to content',
  },

  es: {
    role: 'Estudiante de Ingeniería Electrónica',
    roleFocus: 'Sistemas embebidos y diseño de PCB',
    tagline: 'Diseño el circuito, escribo el firmware y hago que la placa cobre vida.',
    ctaProjects: 'Ver proyectos de hardware',
    ctaCv: 'Descargar hoja de vida (PDF)',
    ctaCvShort: 'Hoja de vida',
    ctaContact: 'Escríbeme',

    credGpa: 'Promedio',
    credTa: 'Monitorías',
    credProjects: 'Proyectos de hardware',
    credClass: 'Promoción',

    aboutKicker: 'Perfil',
    aboutTitle: 'Primero el hardware, con el software que lo respalda.',
    focusLabel: 'Áreas de enfoque',

    hwKicker: 'Hardware destacado',
    hwTitle: 'Placas, firmware y señales',
    hwIntro: 'Proyectos embebidos que diseñé, cableé, programé y depuré. Cada uno detalla los componentes e interfaces que usa.',
    problemLabel: 'Problema',
    didLabel: 'Qué hice',
    specsLabel: 'Especificaciones',
    galleryLabel: 'Bitácora',
    teamLabel: 'Equipo',
    openProject: 'Ver detalle',
    viewCode: 'Código',
    viewDemo: 'Ver en vivo',
    close: 'Cerrar',
    starLabel: 'Proyecto insignia',
    nextTitle: 'Próximo proyecto',
    nextBody: 'Hay un nuevo proyecto de hardware en la mesa de trabajo. Pronto subiré documentación, esquemáticos y fotos.',

    expKicker: 'Experiencia',
    expTitle: 'Enseñando hardware, con las manos',
    current: 'Actual',

    skillsKicker: 'Habilidades',
    skillsTitle: 'Hoja de datos técnica',
    skillsIntro: 'Agrupadas como agrupa una hoja de datos: primero el hardware, después las herramientas que lo rodean.',
    paramLabel: 'Parámetro',
    valueLabel: 'Valor',

    labKicker: 'Laboratorio',
    labTitle: 'En la mesa de trabajo',
    labIntro: 'Prototipos, soldadura, placas e instrumentos: el lado físico del trabajo.',
    labPhoto: 'Foto de laboratorio',

    swKicker: 'Software que habla con el hardware',
    swTitle: 'El código alrededor del circuito',
    swIntro: 'También construyo el software que habla con el hardware: aplicaciones web en producción con usuarios y clientes reales, desde la medición de carga de vehículos eléctricos hasta la percepción por cámara.',
    privateNote: 'Código privado (acuerdo con el cliente)',
    wip: 'En construcción',

    statsKicker: 'En vivo',
    statsTitle: 'Actividad en GitHub',
    statsRepos: 'Repos públicos',
    statsLangs: 'Lenguajes',
    statsStars: 'Estrellas',
    statsFollowers: 'Seguidores',
    statsSince: 'Activo desde',
    statsStack: 'Lenguajes más usados',
    statsLive: 'Datos en vivo desde la API de GitHub',
    statsLastPush: 'último push',
    statsError: 'Los datos de GitHub no están disponibles en este momento.',
    statsLoading: 'Consultando GitHub…',

    eduKicker: 'Formación',
    eduTitle: 'Formación e idiomas',
    courseworkLabel: 'Materias relevantes',
    langTitle: 'Idiomas',

    contactKicker: 'Contacto',
    contactTitle: 'Construyamos algo.',
    contactBody: 'Busco una práctica en ingeniería de hardware / eléctrica. El correo es la forma más rápida de contactarme.',
    emailLabel: 'Correo',
    copy: 'Copiar',
    copied: 'Copiado',

    soon: 'Próximamente',
    pending: 'Por confirmar',
    footerNote: 'Diseñado y construido por Nicolás Gómez',
    themeLabel: 'Cambiar tema de color',
    langLabel: 'Switch to English',
    menuLabel: 'Abrir menú',
    skip: 'Saltar al contenido',
  },
}

export const ABOUT = {
  en: {
    body: [
      'I am an Electronic Engineering student at Pontificia Universidad Javeriana in Bogotá, focused on embedded systems and hardware design. I write firmware in C for PIC and Arduino microcontrollers, design PCBs in Altium, describe digital logic in VHDL and run real-time digital filters on small MCUs.',
      'As a teaching assistant for Processor-Based Systems Design I designed custom PCBs for the course, and I help students debug embedded C, interrupts and timing. At the bench I work with an oscilloscope, multimeter, bench supply, function generator and soldering iron.',
      'I also build the software that talks to the hardware: Python on a Raspberry Pi, MQTT links and web apps in production. That lets me follow a system from the sensor to the screen.',
    ],
    focus: ['Embedded C', 'PCB design', 'Digital design · VHDL', 'Signal processing', 'Rapid prototyping', 'IoT · MQTT'],
  },
  es: {
    body: [
      'Soy estudiante de Ingeniería Electrónica en la Pontificia Universidad Javeriana, en Bogotá, con enfoque en sistemas embebidos y diseño de hardware. Escribo firmware en C para microcontroladores PIC y Arduino, diseño PCB en Altium, describo lógica digital en VHDL y ejecuto filtros digitales en tiempo real sobre microcontroladores pequeños.',
      'Como monitor de Diseño de Sistemas Basados en Procesadores diseñé PCB a la medida para el curso y ayudo a los estudiantes a depurar C embebido, interrupciones y temporización. En la mesa de trabajo uso osciloscopio, multímetro, fuente de banco, generador de funciones y cautín.',
      'También construyo el software que habla con el hardware: Python sobre Raspberry Pi, enlaces MQTT y aplicaciones web en producción. Así puedo seguir un sistema desde el sensor hasta la pantalla.',
    ],
    focus: ['C embebido', 'Diseño de PCB', 'Diseño digital · VHDL', 'Procesamiento de señales', 'Prototipado rápido', 'IoT · MQTT'],
  },
}

export const EXPERIENCE = [
  {
    id: 'ta-processors',
    org: 'Pontificia Universidad Javeriana',
    place: 'Bogotá, Colombia',
    current: true,
    dates: { en: 'Feb 2026 — Present', es: 'Feb 2026 — Actual' },
    tags: ['PCB design', 'Altium', 'Embedded C', 'FSMs', 'Interrupts', 'Timing'],
    students: null, // ⚠ PENDIENTE — número de estudiantes por semestre (solo si es exacto)
    en: {
      role: 'Teaching Assistant — Processor-Based Systems Design',
      bullets: [
        'Designed and developed custom PCBs for the course, enabling hands-on experimentation with its concepts.',
        'Support course projects in embedded systems and microprocessors.',
        'Resolve office-hours questions on embedded C, finite-state machines, interrupts and timing analysis.',
        'Help students understand digital-system architectures and their implementation strategies.',
      ],
    },
    es: {
      role: 'Monitor — Diseño de Sistemas Basados en Procesadores',
      bullets: [
        'Diseñé y desarrollé PCB a la medida para el curso, que permiten experimentar en físico con sus conceptos.',
        'Apoyo los proyectos del curso en sistemas embebidos y microprocesadores.',
        'Resuelvo dudas en horas de consulta sobre C embebido, máquinas de estados, interrupciones y análisis de temporización.',
        'Acompaño a los estudiantes en la comprensión de arquitecturas de sistemas digitales y sus estrategias de implementación.',
      ],
    },
  },
  {
    id: 'ta-arduino',
    org: 'Pontificia Universidad Javeriana',
    place: 'Bogotá, Colombia',
    current: false,
    dates: { en: 'Jan 2025 — Jun 2025', es: 'Ene 2025 — Jun 2025' },
    tags: ['Arduino', 'C', 'Sensors', 'Actuators', 'Debugging'],
    students: null, // ⚠ PENDIENTE — número de estudiantes por semestre (solo si es exacto)
    en: {
      role: 'Teaching Assistant — Arduino 101',
      bullets: [
        'Guided undergraduate students through sensors, actuators and peripheral devices on the Arduino platform.',
        'Mentored student projects from system design through implementation.',
        'Supported students in C and embedded systems: debugging, memory management and code optimization.',
      ],
    },
    es: {
      role: 'Monitor — Arduino 101',
      bullets: [
        'Guié a estudiantes de pregrado en el uso de sensores, actuadores y periféricos sobre la plataforma Arduino.',
        'Acompañé proyectos de estudiantes desde el diseño del sistema hasta su implementación.',
        'Di soporte en C y sistemas embebidos: depuración, manejo de memoria y optimización de código.',
      ],
    },
  },
  {
    id: 'tutor',
    org: 'Programa Tu · Instituto Alberto Merani',
    place: 'Bogotá, Colombia',
    current: true,
    compact: true,
    dates: { en: 'Sep 2024 — Present', es: 'Sep 2024 — Actual' },
    tags: [],
    en: {
      role: 'Academic Tutor',
      bullets: ['One-on-one tutoring in physics, mathematics, critical thinking and language; 22+ contracted hours.'],
    },
    es: {
      role: 'Tutor académico',
      bullets: ['Tutorías uno a uno en física, matemáticas, pensamiento crítico y lenguaje; más de 22 horas bajo contrato.'],
    },
  },
]

export const EDUCATION = [
  {
    id: 'puj',
    org: 'Pontificia Universidad Javeriana',
    place: 'Bogotá, Colombia',
    dates: { en: 'Jan 2023 — Expected 2027', es: 'Ene 2023 — Grado previsto 2027' },
    en: { degree: 'BSc in Electronic Engineering', detail: 'GPA 4.25 / 5.0' },
    es: { degree: 'Ingeniería Electrónica', detail: 'Promedio 4.25 / 5.0' },
    coursework: null, // ⚠ PENDIENTE — ej. ['Digital Electronics', 'Signals & Systems', 'Processor-Based Systems Design', ...] con nombres exactos
  },
  {
    id: 'merani',
    org: 'Instituto Alberto Merani',
    place: 'Bogotá, Colombia',
    dates: { en: '2012 — 2022', es: '2012 — 2022' },
    en: { degree: 'High School Diploma', detail: null },
    es: { degree: 'Bachillerato', detail: null },
    coursework: undefined,
  },
]

export const LANGUAGES = [
  { id: 'es', level: 5, en: { name: 'Spanish', level: 'Native', note: null }, es: { name: 'Español', level: 'Nativo', note: null } },
  {
    id: 'en',
    level: 4,
    en: { name: 'English', level: 'Upper-Intermediate · B2', note: 'Berlitz English Program, 2026' },
    es: { name: 'Inglés', level: 'Upper-Intermediate · B2', note: 'Berlitz English Program, 2026' },
  },
]

/**
 * Espacios de medios. Cada proyecto busca sus archivos en
 *   public/media/projects/<id>/<slot>.{mp4|webp|jpg}
 * Si el archivo no existe, se muestra un placeholder diseñado con el icono y la etiqueta.
 */
export const MEDIA_SLOTS = {
  cover: { icon: 'image', en: 'Cover photo', es: 'Foto de portada' },
  schematic: { icon: 'schematic', en: 'Schematic', es: 'Esquemático' },
  pcb: { icon: 'pcb', en: 'PCB layout', es: 'Layout de PCB' },
  board: { icon: 'chip', en: 'Assembled board', es: 'Placa ensamblada' },
  scope: { icon: 'scope', en: 'Oscilloscope capture', es: 'Captura de osciloscopio' },
  demo: { icon: 'play', en: 'Demo video', es: 'Video de demostración', video: true },
}

/**
 * Proyectos de hardware y embebidos. `specs[].v` en null = pendiente (se ve como hueco).
 * `v` puede ser texto o { en, es }.
 */
export const HARDWARE = [
  {
    id: 'fir-pic',
    star: true,
    name: { en: 'Real-time FIR filtering on a PIC', es: 'Filtrado FIR en tiempo real sobre un PIC' },
    year: '2025',
    repo: 'https://github.com/NicoGomez4262/DAC-y-ADC-por-comunicaci-n-SERIAL',
    demo: null,
    team: null, // ⚠ PENDIENTE — ¿individual o en equipo? ¿de qué materia?
    gallery: ['schematic', 'board', 'scope', 'demo'],
    specs: [
      { k: 'MCU', v: 'Microchip PIC · 64 MHz' },
      { k: 'ADC', v: 'MAX11666 · 2-ch · 12-bit' },
      { k: 'DAC', v: 'MCP4822 · 2-ch · 12-bit' },
      { k: { en: 'Interfaces', es: 'Interfaces' }, v: 'SPI (shared bus) · UART' },
      { k: { en: 'Filters', es: 'Filtros' }, v: { en: 'FIR · order 12 & 14', es: 'FIR · orden 12 y 14' } },
      { k: { en: 'Toolchain', es: 'Herramientas' }, v: 'MPLAB X · MCC · C' },
      { k: { en: 'Sample rate', es: 'Muestreo' }, v: null }, // ⚠ PENDIENTE — frecuencia de muestreo real
    ],
    en: {
      tagline: 'A two-channel signal chain on a microcontroller: 12-bit ADC in, FIR filter in firmware, 12-bit DAC out, reconfigurable live over UART.',
      problem: 'Real-time DSP on a small MCU with no OS: every sample has to be read, filtered and written back before the next one arrives, with the ADC and the DAC sharing a single SPI bus.',
      did: [
        'Wrote SPI drivers for a MAX11666 dual-channel ADC and an MCP4822 dual DAC on one shared bus, handling chip-select and LDAC timing.',
        'Implemented order-12 (13-tap) and order-14 (15-tap) FIR filters in C with circular sample buffers.',
        'Built a UART command parser and state machine (FILTRO(n), IN(n), DAC(ch,sig)) to switch filter, input and output routing at runtime without reflashing.',
        'Exposed six routable signals per DAC channel: A, B, A+B, |A−B|, scaled A·B and the filter output. IIR slots are reserved in the state machine.',
      ],
    },
    es: {
      tagline: 'Cadena de señal de dos canales en un microcontrolador: ADC de 12 bits a la entrada, filtro FIR en firmware y DAC de 12 bits a la salida, reconfigurable en vivo por UART.',
      problem: 'DSP en tiempo real sobre un microcontrolador pequeño y sin sistema operativo: cada muestra se lee, se filtra y se escribe antes de que llegue la siguiente, con el ADC y el DAC compartiendo un solo bus SPI.',
      did: [
        'Escribí los drivers SPI de un ADC MAX11666 de dos canales y un DAC MCP4822 doble sobre un mismo bus, manejando los tiempos de chip-select y LDAC.',
        'Implementé filtros FIR de orden 12 (13 coeficientes) y 14 (15 coeficientes) en C con buffers circulares.',
        'Construí un parser de comandos UART y una máquina de estados (FILTRO(n), IN(n), DAC(ch,sig)) para cambiar filtro, entrada y ruteo en ejecución, sin volver a programar.',
        'Seis señales enrutables por canal del DAC: A, B, A+B, |A−B|, A·B escalado y la salida del filtro. La máquina de estados deja espacios reservados para filtros IIR.',
      ],
    },
  },
  {
    id: 'custom-pcbs',
    name: { en: 'Custom PCBs for Processor-Based Systems Design', es: 'PCB a la medida para Diseño de Sistemas Basados en Procesadores' },
    year: '2026',
    repo: null,
    demo: null,
    team: null,
    gallery: ['schematic', 'pcb', 'board'],
    specs: [
      { k: 'EDA', v: 'Altium Designer' },
      { k: { en: 'Context', es: 'Contexto' }, v: { en: 'Teaching assistant · 2026', es: 'Monitoría · 2026' } },
      { k: { en: 'Board function', es: 'Función' }, v: null }, // ⚠ PENDIENTE — qué hace cada placa
      { k: 'MCU', v: null }, // ⚠ PENDIENTE — microcontrolador / procesador
      { k: { en: 'Layers', es: 'Capas' }, v: null }, // ⚠ PENDIENTE
      { k: { en: 'Units built', es: 'Unidades' }, v: null }, // ⚠ PENDIENTE — cuántas se fabricaron
    ],
    en: {
      tagline: 'Boards I designed as a teaching assistant so students could work through the course concepts on real hardware.',
      problem: 'The course needed hardware that let students experiment hands-on with its core concepts: embedded C, finite-state machines, interrupts and timing.',
      did: [
        'Designed and developed custom PCBs in Altium Designer for the course.',
        'Supported students working on embedded C, FSMs, interrupts and timing analysis during office hours.',
      ],
    },
    es: {
      tagline: 'Placas que diseñé como monitor para que los estudiantes trabajaran los conceptos del curso sobre hardware real.',
      problem: 'El curso necesitaba hardware para que los estudiantes experimentaran en físico con sus conceptos centrales: C embebido, máquinas de estados, interrupciones y temporización.',
      did: [
        'Diseñé y desarrollé PCB a la medida en Altium Designer para el curso.',
        'Acompañé a los estudiantes en C embebido, máquinas de estados, interrupciones y análisis de temporización durante las horas de consulta.',
      ],
    },
  },
  {
    id: 'proteo',
    name: { en: 'PROTEO — Raspberry Pi IoT node', es: 'PROTEO — nodo IoT en Raspberry Pi' },
    year: '2025',
    repo: 'https://github.com/NicoGomez4262/PROTEO_Fase2',
    demo: 'https://mi-app-vsc.web.app',
    team: null, // ⚠ PENDIENTE — contexto: qué es PROTEO, materia, equipo y tu rol
    gallery: ['board', 'schematic', 'demo'],
    specs: [
      { k: 'SBC', v: 'Raspberry Pi' },
      { k: { en: 'Sensor', es: 'Sensor' }, v: { en: 'IR · digital GPIO', es: 'IR · GPIO digital' } },
      { k: { en: 'Actuator', es: 'Actuador' }, v: { en: 'Servo · µs pulses (pigpio)', es: 'Servo · pulsos en µs (pigpio)' } },
      { k: { en: 'Protocol', es: 'Protocolo' }, v: 'MQTT · QoS 1 · LWT' },
      { k: { en: 'Software', es: 'Software' }, v: 'Python · HTML/CSS/JS' },
      { k: { en: 'Hosting', es: 'Hosting' }, v: 'Firebase' },
    ],
    en: {
      tagline: 'A Raspberry Pi edge node that links a sensor and an actuator to a live web app over MQTT.',
      problem: 'Bridging the physical and the web: a sensor reading has to reach a browser, and a click in the browser has to move a motor, reliably and across a network.',
      did: [
        'Wrote a Python service on a Raspberry Pi: an IR sensor on GPIO publishes its state to MQTT (QoS 1) whenever it changes.',
        'Drove a servo from MQTT angle commands with microsecond pulse widths through pigpio, with per-position trim and an optional hold mode to stop servo buzz.',
        'Used per-device topics and a retained Last-Will status topic (online / offline) so the web app knows when the node drops.',
        'Deployed the web interface on Firebase Hosting.',
      ],
    },
    es: {
      tagline: 'Nodo de borde en Raspberry Pi que conecta un sensor y un actuador con una aplicación web en vivo por MQTT.',
      problem: 'Unir lo físico con la web: una lectura del sensor tiene que llegar al navegador, y un clic en el navegador tiene que mover un motor, de forma confiable y a través de la red.',
      did: [
        'Escribí un servicio en Python sobre Raspberry Pi: un sensor IR en GPIO publica su estado en MQTT (QoS 1) cada vez que cambia.',
        'Controlé un servo con comandos de ángulo por MQTT, con anchos de pulso en microsegundos vía pigpio, ajuste fino por posición y un modo de retención opcional para eliminar el zumbido.',
        'Topics por dispositivo y un topic de estado con Last Will retenido (online / offline), para que la web sepa cuándo se cae el nodo.',
        'Desplegué la interfaz web en Firebase Hosting.',
      ],
    },
  },
  {
    id: 'conveyor',
    name: { en: 'DC motor control for a conveyor belt', es: 'Control de motor DC para banda transportadora' },
    year: '2025',
    repo: 'https://github.com/NicoGomez4262/Control_BandaTransportadora',
    demo: null,
    team: null,
    gallery: ['schematic', 'board', 'demo'],
    specs: [
      { k: 'MCU', v: 'Arduino Uno' },
      { k: { en: 'Driver', es: 'Driver' }, v: { en: 'L298N H-bridge', es: 'Puente H L298N' } },
      { k: { en: 'Control', es: 'Control' }, v: { en: 'Open-loop PWM', es: 'PWM en lazo abierto' } },
      { k: { en: 'Input', es: 'Entrada' }, v: { en: 'Potentiometer · ADC', es: 'Potenciómetro · ADC' } },
      { k: { en: 'Telemetry', es: 'Telemetría' }, v: 'Serial (UART)' },
      { k: { en: 'Language', es: 'Lenguaje' }, v: 'C' },
    ],
    en: {
      tagline: 'Direction and speed of a DC motor from a single potentiometer, with an H-bridge, a dead zone and a friction-aware minimum PWM.',
      problem: 'One potentiometer has to control two things at once, direction and speed, without the motor jittering at the centre or stalling from static friction.',
      did: [
        'Mapped one potentiometer to both direction and speed: lower half reverse, upper half forward, and a centre dead zone that stops the motor.',
        'Drove the motor through an L298N H-bridge: two pins for direction, one PWM pin for speed.',
        'Set a minimum PWM duty so the motor overcomes static friction at start-up instead of stalling.',
        'Streamed telemetry over serial for live monitoring.',
      ],
    },
    es: {
      tagline: 'Dirección y velocidad de un motor DC con un solo potenciómetro, puente H, zona muerta y un PWM mínimo que tiene en cuenta la fricción.',
      problem: 'Un potenciómetro tiene que controlar dos cosas a la vez, sentido y velocidad, sin que el motor tiemble en el centro ni se trabe por fricción estática.',
      did: [
        'Mapeé un potenciómetro a sentido y velocidad: mitad inferior en reversa, mitad superior hacia adelante y una zona muerta central que detiene el motor.',
        'Manejé el motor con un puente H L298N: dos pines de dirección y uno de PWM para la velocidad.',
        'Fijé un ciclo útil mínimo de PWM para que el motor venza la fricción estática al arrancar en lugar de trabarse.',
        'Envié telemetría por serial para monitoreo en vivo.',
      ],
    },
  },
  {
    id: 'dreamsnake',
    name: { en: 'DreamSnake — two-player Snake on an Arduino Mega', es: 'DreamSnake — Snake para dos jugadores en Arduino Mega' },
    year: '2023',
    repo: 'https://github.com/NicoGomez4262/DreamSnake',
    demo: null,
    team: { en: 'With Juan Conrado and Felipe Useche', es: 'Con Juan Conrado y Felipe Useche' },
    gallery: ['board', 'demo'],
    specs: [
      { k: 'MCU', v: 'Arduino Mega 2560' },
      { k: { en: 'Display', es: 'Pantalla' }, v: { en: '2× MAX7219 8×8 LED · 20×4 I²C LCD', es: '2× MAX7219 LED 8×8 · LCD I²C 20×4' } },
      { k: { en: 'Input', es: 'Entrada' }, v: { en: 'Push-buttons · pull-up', es: 'Pulsadores · pull-up' } },
      { k: { en: 'Language', es: 'Lenguaje' }, v: 'C++ (Arduino)' },
      { k: { en: 'Team', es: 'Equipo' }, v: { en: '3 students', es: '3 estudiantes' } },
    ],
    en: {
      tagline: 'A real-time, two-player game on an 8-bit microcontroller, with LED matrices, an I²C LCD and a tune sequenced by a state machine.',
      problem: 'A real-time game on a microcontroller has to juggle display refresh, input and game state inside very limited memory.',
      did: [
        'Drove two MAX7219 8×8 LED matrices as the game field and a 20×4 I²C LCD.',
        'Read push-button input (pull-up) for two players.',
        'Sequenced a Pac-Man-inspired tune with a finite-state machine.',
        'Published the code openly as study material for other students.',
      ],
    },
    es: {
      tagline: 'Juego en tiempo real para dos jugadores sobre un microcontrolador de 8 bits, con matrices LED, una LCD I²C y una melodía secuenciada por una máquina de estados.',
      problem: 'Un juego en tiempo real sobre un microcontrolador tiene que manejar refresco de pantalla, entrada y estado del juego dentro de una memoria muy limitada.',
      did: [
        'Manejé dos matrices LED MAX7219 de 8×8 como campo de juego y una LCD I²C de 20×4.',
        'Leí la entrada de pulsadores (pull-up) para dos jugadores.',
        'Secuencié una melodía inspirada en Pac-Man con una máquina de estados.',
        'Publiqué el código abierto como material de estudio para otros estudiantes.',
      ],
    },
  },
  // ⚠ PENDIENTE — ranura para el próximo proyecto. Cuando exista, reemplazar por una ficha completa.
  { id: 'next', placeholder: true },
]

/** Software secundario: compacto, enmarcado desde su relación con el hardware. */
export const SOFTWARE = [
  {
    id: 'voltio-residencial',
    name: 'Voltio Residencial',
    year: '2026',
    repo: 'https://github.com/NicoGomez4262/voltio-residencial',
    demo: 'https://voltio-red.web.app',
    stack: ['JavaScript', 'Firebase', 'PWA'],
    en: {
      tagline: 'Shared EV-charging infrastructure for a residential complex: kWh metering from a photo of the meter, host-confirmed bookings and monthly per-tower consumption reports.',
      facts: 'Pilot · 3 towers · 96 apartments',
    },
    es: {
      tagline: 'Infraestructura de carga compartida para vehículos eléctricos en un conjunto residencial: medición de kWh con una foto del contador, reservas confirmadas por el anfitrión y reportes mensuales de consumo por torre.',
      facts: 'Piloto · 3 torres · 96 apartamentos',
    },
  },
  {
    id: 'voltio-mapa',
    name: 'Voltio — Carga Compartida',
    year: '2026',
    repo: 'https://github.com/NicoGomez4262/voltio-carga-compartida',
    demo: 'https://voltio-red.web.app',
    stack: ['JavaScript', 'Firebase', 'Leaflet', 'PWA'],
    en: {
      tagline: 'Open map of neighbour-to-neighbour EV chargers with power, connector type and price per kWh, built around the meter-based billing calculator.',
      facts: null,
    },
    es: {
      tagline: 'Mapa abierto de cargadores entre vecinos para vehículos eléctricos, con potencia, tipo de conector y precio por kWh, construido alrededor de la calculadora de cobro por contador.',
      facts: null,
    },
  },
  {
    id: 'video-dj',
    name: 'Video_DJ',
    year: '2026',
    wip: true,
    repo: 'https://github.com/NicoGomez4262/Video_DJ',
    demo: null,
    stack: ['TypeScript', 'Computer vision', 'Web Audio'],
    en: {
      tagline: 'Camera-based perception mapped to actions: a loop station driven by hand and body tracking. Started from an 11-document engineering plan with a latency analysis and ADRs.',
      facts: null,
    },
    es: {
      tagline: 'Percepción por cámara convertida en acciones: una loop station controlada por seguimiento de manos y cuerpo. Arrancó con un plan de ingeniería de 11 documentos, con análisis de latencia y ADRs.',
      facts: null,
    },
  },
  {
    id: 'psicosentir',
    name: 'Psicosentir y Actuar',
    year: '2026',
    private: true,
    repo: null,
    demo: 'https://psicosentir-y-actuar.vercel.app',
    stack: ['Next.js', 'TypeScript', 'Firebase'],
    en: { tagline: 'Production platform and design system for a clinical psychologist. Real client.', facts: null },
    es: { tagline: 'Plataforma en producción y sistema de diseño para una psicóloga clínica. Cliente real.', facts: null },
  },
  {
    id: 'figaro',
    name: 'FIGARO',
    year: '2026',
    private: true,
    repo: null,
    demo: 'https://figaro-web.vercel.app',
    stack: ['Next.js', 'Supabase', 'PostgreSQL'],
    en: { tagline: 'At-home booking platform for a real client: Postgres with row-level security and double-booking protection.', facts: null },
    es: { tagline: 'Plataforma de reservas a domicilio para un cliente real: Postgres con row-level security y protección contra doble reserva.', facts: null },
  },
]

/**
 * Galería del laboratorio: public/media/lab/01.webp … 09.webp (o .jpg / .mp4).
 * `caption` en null = aún sin foto; el placeholder muestra `hint`.
 */
export const LAB = [
  { id: '01', hint: { en: 'Breadboard prototype', es: 'Prototipo en protoboard' }, caption: null }, // ⚠ PENDIENTE
  { id: '02', hint: { en: 'Soldering & assembly', es: 'Soldadura y ensamble' }, caption: null }, // ⚠ PENDIENTE
  { id: '03', hint: { en: 'Custom PCB', es: 'PCB a la medida' }, caption: null }, // ⚠ PENDIENTE
  { id: '04', hint: { en: 'Bench instruments', es: 'Instrumentos de banco' }, caption: null }, // ⚠ PENDIENTE
  { id: '05', hint: { en: 'Signal measurement', es: 'Medición de señales' }, caption: null }, // ⚠ PENDIENTE
  { id: '06', hint: { en: 'Firmware debugging', es: 'Depuración de firmware' }, caption: null }, // ⚠ PENDIENTE
  { id: '07', hint: { en: 'Assembled project', es: 'Proyecto ensamblado' }, caption: null }, // ⚠ PENDIENTE
  { id: '08', hint: { en: 'Board detail', es: 'Detalle de placa' }, caption: null }, // ⚠ PENDIENTE
  { id: '09', hint: { en: 'Lab bench', es: 'Mesa de laboratorio' }, caption: null }, // ⚠ PENDIENTE
]

/**
 * Habilidades como hoja de datos: grupo → filas parámetro / valor.
 * `pending: true` = grupo sin confirmar; se ve como hueco, sin listar nada como hecho.
 */
export const SKILLS = [
  {
    id: 'pcb',
    code: 'HW-01',
    en: 'PCB & Hardware Design',
    es: 'Diseño de PCB y hardware',
    rows: [
      { k: 'EDA', v: 'Altium Designer' },
      { k: { en: 'Simulation', es: 'Simulación' }, v: 'LTspice' },
      { k: { en: 'Delivered', es: 'Entregado' }, v: { en: 'Custom course PCBs (TA, 2026)', es: 'PCB del curso (monitoría, 2026)' } },
      { k: { en: 'Mechanical', es: 'Mecánica' }, v: { en: '3D design & printing', es: 'Diseño e impresión 3D' } },
    ],
  },
  {
    id: 'embedded',
    code: 'HW-02',
    en: 'Embedded Systems',
    es: 'Sistemas embebidos',
    rows: [
      { k: 'MCUs', v: 'PIC (MPLAB) · Arduino Uno / Mega 2560' },
      { k: { en: 'Embedded Linux', es: 'Linux embebido' }, v: { en: 'Raspberry Pi (ARM) · Python · GPIO', es: 'Raspberry Pi (ARM) · Python · GPIO' } },
      { k: { en: 'Buses', es: 'Buses' }, v: 'SPI · UART · I²C' },
      { k: 'Firmware', v: { en: 'C · C++ · FSMs · interrupts · timing', es: 'C · C++ · FSM · interrupciones · temporización' } },
      { k: { en: 'Sensors', es: 'Sensores' }, v: { en: 'IR · analog via ADC · external 12-bit ADC', es: 'IR · analógicos por ADC · ADC externo de 12 bits' } },
      { k: { en: 'Motor control', es: 'Control de motores' }, v: { en: 'DC · PWM + H-bridge · servo pulses', es: 'DC · PWM + puente H · pulsos de servo' } },
      { k: 'IoT', v: 'MQTT (QoS, LWT)' },
    ],
  },
  {
    id: 'digital',
    code: 'HW-03',
    en: 'Digital Design',
    es: 'Diseño digital',
    rows: [
      { k: 'HDL', v: 'VHDL' },
      { k: { en: 'Synthesis', es: 'Síntesis' }, v: 'Intel Quartus' },
      { k: { en: 'Simulation', es: 'Simulación' }, v: 'ModelSim' },
    ],
  },
  {
    id: 'signals',
    code: 'HW-04',
    en: 'Signals & Analysis',
    es: 'Señales y análisis',
    rows: [
      { k: { en: 'Tools', es: 'Herramientas' }, v: 'MATLAB' },
      { k: { en: 'Filters', es: 'Filtros' }, v: { en: 'FIR / IIR design · FIR on MCU', es: 'Diseño FIR / IIR · FIR en MCU' } },
      { k: { en: 'Conversion', es: 'Conversión' }, v: { en: '12-bit ADC / DAC over SPI', es: 'ADC / DAC de 12 bits por SPI' } },
    ],
  },
  {
    id: 'lab',
    code: 'HW-05',
    en: 'Lab & Instrumentation',
    es: 'Laboratorio e instrumentación',
    rows: [
      { k: { en: 'Measurement', es: 'Medición' }, v: { en: 'Oscilloscope · digital multimeter', es: 'Osciloscopio · multímetro digital' } },
      { k: { en: 'Sources', es: 'Fuentes' }, v: { en: 'Bench power supply · function generator', es: 'Fuente de banco · generador de funciones' } },
      { k: { en: 'Assembly', es: 'Ensamble' }, v: { en: 'Soldering', es: 'Soldadura' } }, // ⚠ PENDIENTE — ¿THT, SMD o ambas?
    ],
  },
  {
    id: 'software',
    code: 'SW-01',
    en: 'Software',
    es: 'Software',
    rows: [
      { k: { en: 'Languages', es: 'Lenguajes' }, v: 'Python · C · C++ · JavaScript · TypeScript' },
      { k: 'Web', v: 'React · Next.js · PWA' },
      { k: { en: 'Backend', es: 'Backend' }, v: 'Firebase · Supabase · PostgreSQL' },
    ],
  },
  {
    id: 'tools',
    code: 'SW-02',
    en: 'Tools',
    es: 'Herramientas',
    rows: [
      { k: 'OS', v: 'Linux' },
      { k: { en: 'Version control', es: 'Control de versiones' }, v: 'Git · GitHub' },
      { k: { en: 'Numerical', es: 'Numérico' }, v: 'MATLAB' },
      { k: 'IDE', v: 'MPLAB X · Arduino IDE' },
    ],
  },
]

/** Devuelve el texto en el idioma activo, sea string plano o { en, es }. */
export const tx = (value, lang) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value

/** Cantidad real de proyectos de hardware (sin contar la ranura vacía). */
export const HARDWARE_COUNT = HARDWARE.filter((p) => !p.placeholder).length
