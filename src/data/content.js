/**
 * Fuente única de verdad del portafolio.
 * Todo el texto vive aquí en EN y ES. Editar aquí lo cambia en todo el sitio.
 *
 * Reglas:
 *  - Inglés es el idioma por defecto; cada entrada lleva `en` y `es` juntos.
 *  - Lo que aún no está confirmado va en `null` con un comentario  ⚠ PENDIENTE.
 *    El sitio lo muestra como un hueco de diseño ("coming soon"), nunca como texto falso.
 *  - Nada de métricas, herramientas ni instrumentos que no estén confirmados.
 *  - Instituciones: en los textos se escriben como {id} (ej. "{merani}") y se pintan como
 *    enlace a su sitio oficial, tomado de INSTITUTIONS.
 */

/**
 * Instituciones con su sitio oficial (URLs verificadas el 24 sep 2026). ÚNICO lugar de estas URLs.
 * `url: null` = sin sitio oficial confirmado: se muestra el nombre sin enlace.
 */
export const INSTITUTIONS = {
  puj: { name: 'Pontificia Universidad Javeriana', url: 'https://www.javeriana.edu.co' },
  merani: { name: 'Instituto Alberto Merani', url: 'https://www.institutomerani.edu.co' },
  // Programa de acompañamiento escolar del Instituto Merani (su página lo escribe "Programa TU").
  programaTu: { name: 'Programa Tú', url: 'https://programatu.institutomerani.edu.co' },
  berlitz: { name: 'Berlitz', url: 'https://www.berlitz.com/es-co' },
}

export const PROFILE = {
  name: 'Nicolás Andrés Gómez Ramírez',
  shortName: 'Nicolás Gómez',
  initials: 'NG',
  // ⚠ PENDIENTE — se reemplaza por el correo del dominio propio. Este es el ÚNICO lugar.
  email: 'nandres-gomez@javeriana.edu.co',
  // Se muestra en el sitio: WhatsApp es la forma más rápida de contactarlo (decisión del 24 sep 2026).
  phone: '+57 317 269 5193',
  whatsapp: '573172695193', // wa.me: solo dígitos, con indicativo
  location: { en: 'Bogotá, Colombia', es: 'Bogotá, Colombia' },
  github: 'https://github.com/NicoGomez4262',
  githubUser: 'NicoGomez4262',
  linkedin: 'https://www.linkedin.com/in/nicol%C3%A1s-g%C3%B3mez-2b5709428', // ÚNICO lugar
  // ⚠ PENDIENTE — public/assets/foto.webp (+ foto.jpg de respaldo), cuadrada, ~480×480, < 80 KB.
  // Mientras no exista, el avatar muestra las iniciales.
  photo: '/assets/foto',
  gpa: '4.3',
  gpaScale: '5.0',
  graduation: '2027',
  pcbs: 4, // "más de 4 PCB a la medida hasta hoy" (dato de Nicolás)
  university: 'puj', // clave en INSTITUTIONS
}

/**
 * Hojas de vida: idioma × formato. El diálogo de descarga lee de aquí.
 * Si el archivo no está en public/ (según el manifiesto de medios), la opción sale como "Coming soon".
 */
export const CV_FILES = {
  en: { ats: '/assets/cv/Nicolas_Gomez_CV_EN_ATS.pdf', modern: '/assets/cv/Nicolas_Gomez_CV_EN_Modern.pdf' },
  es: { ats: '/assets/cv/Nicolas_Gomez_CV_ES_ATS.pdf', modern: '/assets/cv/Nicolas_Gomez_CV_ES_Moderno.pdf' },
}

/**
 * Respaldo generado con scripts/build_cv.py (inglés, una columna, compatible con ATS).
 * Solo se ofrece mientras falte el archivo propio de ese idioma y formato.
 */
export const CV_BACKUP = {
  en: { ats: '/assets/Nicolas_Gomez_CV.pdf' },
}

export const CV_FORMATS = ['ats', 'modern']

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

/** Pines del bloque técnico del hero: señales y buses que aparecen en los proyectos. */
export const HERO_CHIP = {
  part: 'NG-01',
  left: ['SPI', 'UART', 'I²C', 'GPIO', 'PWM'],
  right: ['ADC', 'DAC', 'VGA', 'MQTT', 'IRQ'],
}

export const UI = {
  en: {
    role: 'Electronic Engineering Student',
    roleFocus: 'Embedded Systems & PCB Design',
    tagline: 'I design the circuit, write the firmware, and bring the board to life.',
    ctaProjects: 'View hardware projects',
    ctaCv: 'Download résumé (PDF)',
    ctaCvShort: 'Résumé',
    ctaContact: 'Email me',
    avatarAlt: 'Nicolás Gómez',
    chipCaption: 'The signals behind the projects below',

    credGpa: 'GPA',
    credPcbs: 'Custom PCBs designed',
    credTa: 'Teaching-assistant roles',
    credProjects: 'Hardware projects',
    credClass: 'Class of',

    aboutKicker: 'Profile',
    aboutTitle: 'From the circuit to the connected device.',
    focusLabel: 'Focus areas',

    hwKicker: 'Featured hardware',
    hwTitle: 'Boards, firmware and signals',
    hwIntro: 'Embedded, FPGA and signal-processing projects, designed, wired, programmed and debugged. Each one lists the parts and interfaces involved.',
    problemLabel: 'Problem',
    didLabel: 'What I did',
    didTeamLabel: 'What we built',
    specsLabel: 'Specs',
    galleryLabel: 'Build log',
    teamLabel: 'Team',
    courseLabel: 'Course',
    openProject: 'Full breakdown',
    viewCode: 'Source',
    viewDemo: 'Live demo',
    toSoftware: 'Web dashboard',
    toHardware: 'Hardware node',
    close: 'Close',
    starLabel: 'Flagship build',
    nextTitle: 'Next build',
    nextBody: 'A new hardware project is on the bench. Documentation, schematics and photos are coming soon.',

    expKicker: 'Experience',
    expTitle: 'Teaching, tutoring and building for clients',
    expAcademic: 'Academic experience',
    expProfessional: 'Professional experience',
    expSoftwareLink: 'See the software projects',
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
    swIntro: 'I also build the software around the hardware: web apps in production with real users and clients, from the dashboard that commands the PROTEO locker to EV-charging metering and camera-based perception.',
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
    contactBody: "I'm looking for a hardware / electrical engineering internship. WhatsApp is the fastest way to reach me, and I answer email too.",
    waLabel: 'WhatsApp · fastest reply',
    waCta: 'Message me on WhatsApp',
    waText: 'Hi Nicolás, I saw your portfolio and would like to talk about an internship.',
    copyNumber: 'Copy number',
    emailLabel: 'Email',
    copy: 'Copy',
    copied: 'Copied',

    cvTitle: 'Download résumé',
    cvIntro: 'Pick the format that fits where it is going.',
    cvLang: 'Language',
    cvFormats: {
      ats: { title: 'Harvard / International (ATS)', body: 'Single column, plain structure. Best for job portals and applicant-tracking systems.' },
      modern: { title: 'Modern sidebar', body: 'Two columns with a sidebar. Best to send straight to a person.' },
    },
    cvSoon: 'Coming soon',
    cvFallback: 'Meanwhile, the Spanish version is available.',
    cvSwitch: 'Switch to Spanish',

    officialSite: 'official site',
    newTab: 'opens in a new tab',
    soon: 'Coming soon',
    pending: 'To be confirmed',
    footerNote: 'Designed and built by Nicolás Gómez',
    backToTop: 'Back to top',
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
    avatarAlt: 'Nicolás Gómez',
    chipCaption: 'Las señales detrás de los proyectos de abajo',

    credGpa: 'Promedio',
    credPcbs: 'PCB a la medida diseñadas',
    credTa: 'Monitorías',
    credProjects: 'Proyectos de hardware',
    credClass: 'Promoción',

    aboutKicker: 'Perfil',
    aboutTitle: 'Del circuito al dispositivo conectado.',
    focusLabel: 'Áreas de enfoque',

    hwKicker: 'Hardware destacado',
    hwTitle: 'Placas, firmware y señales',
    hwIntro: 'Proyectos embebidos, en FPGA y de procesamiento de señales, diseñados, cableados, programados y depurados. Cada uno detalla los componentes e interfaces que usa.',
    problemLabel: 'Problema',
    didLabel: 'Qué hice',
    didTeamLabel: 'Qué construimos',
    specsLabel: 'Especificaciones',
    galleryLabel: 'Bitácora',
    teamLabel: 'Equipo',
    courseLabel: 'Materia',
    openProject: 'Ver detalle',
    viewCode: 'Código',
    viewDemo: 'Ver en vivo',
    toSoftware: 'Tablero web',
    toHardware: 'Nodo de hardware',
    close: 'Cerrar',
    starLabel: 'Proyecto insignia',
    nextTitle: 'Próximo proyecto',
    nextBody: 'Hay un nuevo proyecto de hardware en la mesa de trabajo. Pronto subiré documentación, esquemáticos y fotos.',

    expKicker: 'Experiencia',
    expTitle: 'Enseñar, acompañar y construir para clientes',
    expAcademic: 'Experiencia académica',
    expProfessional: 'Experiencia profesional',
    expSoftwareLink: 'Ver los proyectos de software',
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
    swIntro: 'También construyo el software alrededor del hardware: aplicaciones web en producción con usuarios y clientes reales, desde el tablero que comanda el casillero PROTEO hasta la medición de carga de vehículos eléctricos y la percepción por cámara.',
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
    contactBody: 'Busco una práctica en ingeniería de hardware / eléctrica. WhatsApp es la forma más rápida de contactarme, y también respondo por correo.',
    waLabel: 'WhatsApp · respuesta más rápida',
    waCta: 'Escríbeme por WhatsApp',
    waText: 'Hola Nicolás, vi tu portafolio y me gustaría hablar contigo sobre una práctica.',
    copyNumber: 'Copiar número',
    emailLabel: 'Correo',
    copy: 'Copiar',
    copied: 'Copiado',

    cvTitle: 'Descargar hoja de vida',
    cvIntro: 'Elige el formato según a dónde va.',
    cvLang: 'Idioma',
    cvFormats: {
      ats: { title: 'Harvard / Internacional (ATS)', body: 'Una columna, estructura simple. Ideal para portales de empleo y sistemas ATS.' },
      modern: { title: 'Sidebar moderno', body: 'Dos columnas con barra lateral. Ideal para enviarla directo a una persona.' },
    },
    cvSoon: 'Próximamente',
    cvFallback: 'Mientras tanto, la versión en inglés ya está disponible.',
    cvSwitch: 'Cambiar a inglés',

    officialSite: 'sitio oficial',
    newTab: 'se abre en una pestaña nueva',
    soon: 'Próximamente',
    pending: 'Por confirmar',
    footerNote: 'Diseñado y construido por Nicolás Gómez',
    backToTop: 'Volver arriba',
    themeLabel: 'Cambiar tema de color',
    langLabel: 'Switch to English',
    menuLabel: 'Abrir menú',
    skip: 'Saltar al contenido',
  },
}

/** Nombre de cada idioma escrito en su propio idioma (selector de la hoja de vida). */
export const LANG_NAMES = { en: 'English', es: 'Español' }

/** Enlace de WhatsApp con un mensaje corto prellenado en el idioma activo. */
export const whatsappUrl = (lang) => `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(UI[lang]?.waText ?? UI.en.waText)}`

export const ABOUT = {
  en: {
    body: [
      "I'm an Electronic Engineering student with a background in hardware design, embedded systems and digital electronics. I have experience programming in several languages, developing PCBs, designing digital systems and rapid prototyping.",
      "I'm interested in building and training artificial-intelligence models, in signal processing, and in IoT applications for smart, connected devices. I bring creativity, innovation, responsibility and commitment to each project's goals, along with the analytical skills to work through information, spot opportunities and propose solutions.",
      'I communicate clearly, negotiate well and work with self-confidence, which helps me adapt to different environments and make decisions under pressure. I also enjoy cooperative teamwork: contributing ideas, listening to other perspectives and helping every project reach its goals.',
    ],
    focus: ['IoT', 'Embedded programming', 'PCB design', 'Rapid prototyping', 'Signal processing', 'Digital design', 'Artificial Intelligence'],
  },
  es: {
    body: [
      'Estudiante de Ingeniería Electrónica con conocimientos en diseño de hardware, sistemas embebidos y electrónica digital. Cuento con experiencia en programación en diversos lenguajes, desarrollo de PCB, diseño de sistemas digitales y prototipado rápido.',
      'Me interesan el desarrollo y entrenamiento de modelos de inteligencia artificial, el procesamiento de señales y las aplicaciones IoT para dispositivos inteligentes y conectados. Me caracterizo por mi creatividad, innovación, responsabilidad y compromiso con los objetivos de cada proyecto, así como por mi capacidad de análisis y manejo de información para identificar oportunidades y plantear soluciones.',
      'Cuento con habilidades de comunicación efectiva, negociación y autoconfianza, que me permiten desenvolverme de manera adecuada en diferentes entornos y tomar decisiones bajo presión. Además, tengo facilidad para trabajar en equipo de forma cooperativa, aportando ideas, escuchando diferentes perspectivas y contribuyendo al cumplimiento de objetivos en cada proyecto.',
    ],
    focus: ['IoT', 'Programación embebida', 'Diseño de PCB', 'Prototipado rápido', 'Procesamiento de señales', 'Diseño digital', 'Inteligencia Artificial'],
  },
}

/**
 * Experiencia en dos bloques: `kind: 'academic'` (monitorías) y `kind: 'professional'`.
 * `org` es una clave de INSTITUTIONS; si no hay institución, `orgLabel` da el texto.
 */
export const EXPERIENCE = [
  {
    id: 'ta-processors',
    kind: 'academic',
    org: 'puj',
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
    kind: 'academic',
    org: 'puj',
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
    kind: 'professional',
    org: 'programaTu',
    place: 'Bogotá, Colombia',
    current: true,
    compact: true,
    dates: { en: 'Sep 2024 — Present', es: 'Sep 2024 — Actual' },
    tags: [],
    en: {
      role: 'Academic Tutor',
      bullets: [
        'I provide personalized tutoring in physics, mathematics, critical thinking and language to students at {merani}.',
        '22+ contracted hours.',
      ],
    },
    es: {
      role: 'Tutor académico',
      bullets: [
        'Brindo tutorías personalizadas en física, matemáticas, pensamiento crítico y lenguaje a estudiantes del {merani}.',
        'Más de 22 horas bajo contrato.',
      ],
    },
  },
  {
    id: 'freelance',
    kind: 'professional',
    org: null,
    orgLabel: { en: 'Independent businesses', es: 'Negocios independientes' },
    place: null,
    current: true,
    compact: true,
    dates: { en: 'Jul 2026 — Present', es: 'Jul 2026 — Actual' },
    tags: [],
    link: '#software',
    en: {
      role: 'Freelance Web Developer',
      bullets: [
        'I develop web applications for independent businesses, from defining requirements through implementation and delivery of solutions tailored to their needs.',
      ],
    },
    es: {
      role: 'Desarrollador web freelance',
      bullets: [
        'Desarrollo aplicaciones web para negocios independientes, desde la definición de requerimientos hasta la implementación y entrega de soluciones adaptadas a sus necesidades.',
      ],
    },
  },
]

export const EDUCATION = [
  {
    id: 'puj',
    org: 'puj',
    place: 'Bogotá, Colombia',
    dates: { en: 'Jan 2023 — Expected 2027', es: 'Ene 2023 — Grado previsto 2027' },
    en: { degree: 'BSc in Electronic Engineering', detail: `GPA ${PROFILE.gpa} / ${PROFILE.gpaScale}` },
    es: { degree: 'Ingeniería Electrónica', detail: `Promedio ${PROFILE.gpa} / ${PROFILE.gpaScale}` },
    coursework: null, // ⚠ PENDIENTE — ej. ['Digital Electronics', 'Signals & Systems', 'Processor-Based Systems Design', ...] con nombres exactos
  },
  {
    id: 'merani',
    org: 'merani',
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
    en: { name: 'English', level: 'Upper-Intermediate · B2', note: '{berlitz} English Program, 2026' },
    es: { name: 'Inglés', level: 'Upper-Intermediate · B2', note: 'Programa de inglés de {berlitz}, 2026' },
  },
]

/**
 * Espacios de medios. Cada proyecto busca sus archivos en
 *   public/media/projects/<id>/<slot>.{mp4|webp|jpg}
 * Si el archivo no existe, se muestra un placeholder diseñado con el icono y la etiqueta.
 * `contain: true` = se muestra completo (diagramas, capturas), sin recortar.
 */
export const MEDIA_SLOTS = {
  cover: { icon: 'image', en: 'Cover photo', es: 'Foto de portada' },
  schematic: { icon: 'schematic', en: 'Schematic', es: 'Esquemático', contain: true },
  pcb: { icon: 'pcb', en: 'PCB layout', es: 'Layout de PCB', contain: true },
  board: { icon: 'chip', en: 'Assembled board', es: 'Placa ensamblada' },
  scope: { icon: 'scope', en: 'Oscilloscope capture', es: 'Captura de osciloscopio', contain: true },
  rtl: { icon: 'layers', en: 'RTL diagram', es: 'Diagrama RTL', contain: true },
  plot: { icon: 'wave', en: 'Signal plot', es: 'Gráfica de señales', contain: true },
  demo: { icon: 'play', en: 'Demo video', es: 'Video de demostración', video: true },
}

/**
 * Proyectos de hardware y embebidos, en el orden en que se muestran (define los códigos HW-0X).
 * `specs[].v` en null = pendiente (se ve como hueco). `v` puede ser texto o { en, es }.
 * `captions` = pie de foto por slot de la bitácora. `software` = id del proyecto de SOFTWARE enlazado.
 */
export const HARDWARE = [
  {
    id: 'proteo',
    star: true,
    name: { en: 'PROTEO — Raspberry Pi IoT node', es: 'PROTEO — nodo IoT en Raspberry Pi' },
    year: '2025',
    repo: 'https://github.com/NicoGomez4262/PROTEO_Fase2',
    demo: 'https://mi-app-vsc.web.app',
    software: 'proteo-web',
    team: null, // ⚠ PENDIENTE — materia, equipo y rol de Nicolás en PROTEO
    gallery: ['board', 'schematic', 'demo'],
    specs: [
      { k: 'SBC', v: 'Raspberry Pi' },
      { k: { en: 'Sensors', es: 'Sensores' }, v: { en: 'IR on GPIO · door state', es: 'IR en GPIO · estado de puerta' } },
      { k: { en: 'Actuators', es: 'Actuadores' }, v: { en: 'Servo latch (pigpio µs) · FIT0620 solenoid', es: 'Pestillo con servo (pigpio µs) · solenoide FIT0620' } },
      { k: { en: 'Protocol', es: 'Protocolo' }, v: 'MQTT · QoS 1 · LWT' },
      { k: 'Cloud', v: 'Firebase · Firestore · Storage' },
      { k: { en: 'Camera', es: 'Cámara' }, v: { en: 'Photo on request or on tamper', es: 'Foto a pedido o ante manipulación' } },
      { k: { en: 'Software', es: 'Software' }, v: 'Python · JavaScript' },
    ],
    en: {
      tagline: 'A smart luggage locker for hotels: a Raspberry Pi node that senses tampering, drives the lock and stays in sync with a live web dashboard.',
      problem: 'Guests often arrive before check-in or leave hours after check-out with nowhere safe for their bags. A connected locker has to open from a phone, report every opening and flag tampering, reliably and across the network.',
      did: [
        'Wrote the Raspberry Pi node in Python: an IR sensor on GPIO publishes to MQTT (QoS 1) only when its state changes, on per-device topics.',
        'Drove the servo latch from MQTT commands with microsecond pulse widths through pigpio, with per-position trim and an optional hold mode to stop servo buzz.',
        'Added a retained Last-Will status topic (online / offline) so the dashboard knows the moment the node drops.',
        'Final prototype: node and dashboard share a Firestore command document. Unlock (FIT0620 solenoid) and photo requests go down; door state, IR readings and camera photos come back in real time.',
      ],
    },
    es: {
      tagline: 'Guardaequipajes inteligente para hoteles: un nodo en Raspberry Pi que detecta manipulación, acciona el seguro y se mantiene sincronizado con un tablero web en vivo.',
      problem: 'Muchos huéspedes llegan antes del check-in o se van horas después del check-out sin un lugar seguro para sus maletas. Un casillero conectado tiene que abrirse desde el celular, reportar cada apertura y alertar ante manipulación, de forma confiable y a través de la red.',
      did: [
        'Escribí el nodo en Python sobre Raspberry Pi: un sensor IR en GPIO publica en MQTT (QoS 1) solo cuando cambia su estado, en topics por dispositivo.',
        'Controlé el pestillo con servo desde comandos MQTT, con anchos de pulso en microsegundos vía pigpio, ajuste fino por posición y un modo de retención opcional para eliminar el zumbido.',
        'Agregué un topic de estado con Last Will retenido (online / offline) para que el tablero sepa en el momento en que se cae el nodo.',
        'Prototipo final: nodo y tablero comparten un documento de comandos en Firestore. Bajan la apertura (solenoide FIT0620) y las solicitudes de foto; suben el estado de la puerta, las lecturas IR y las fotos de la cámara, en tiempo real.',
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
      { k: { en: 'Units built', es: 'Unidades' }, v: null }, // ⚠ PENDIENTE — cuántas se fabricaron (y fabricante)
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
    id: 'fir-pic',
    name: { en: 'Real-time FIR filtering on a PIC', es: 'Filtrado FIR en tiempo real sobre un PIC' },
    year: '2025',
    repo: 'https://github.com/NicoGomez4262/DAC-y-ADC-por-comunicaci-n-SERIAL',
    demo: null,
    team: null, // ⚠ PENDIENTE — ¿individual o en equipo? ¿de qué materia?
    gallery: ['schematic', 'board', 'scope', 'demo'],
    specs: [
      { k: 'MCU', v: 'Microchip PIC · 64 MHz' }, // ⚠ PENDIENTE — referencia exacta del PIC
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
    id: 'volley-pong',
    name: { en: 'VOLLEY-PONG — two-player volleyball game on an FPGA', es: 'VOLLEY-PONG — voleibol para dos jugadores en FPGA' },
    year: '2024',
    repo: 'https://github.com/RuDomiv/VOLLEY-PONG-VHDL',
    demo: null,
    // ⚠ VERIFICAR — el repo VOLLEY-PONG no nombra al compañero. El nombre sale del repo CORRELACIUM
    // (mismo dueño, @RuDomiv) y del informe del taller SVGA que está en este repo.
    team: { en: 'With Ruslán Domínguez Ivanova', es: 'Con Ruslán Domínguez Ivanova' },
    // ⚠ VERIFICAR — nombre exacto de la materia. El repo dice "final exam of the digital systems course".
    course: { en: 'Digital Systems · final exam', es: 'Sistemas Digitales · examen final' },
    gallery: ['board', 'demo', 'scope', 'rtl', 'schematic'],
    captions: {
      scope: { en: 'Joystick comparator outputs on the scope', es: 'Salidas del comparador del joystick en el osciloscopio' },
      rtl: { en: 'Quartus RTL view of the top level', es: 'Vista RTL del nivel superior en Quartus' },
      schematic: { en: 'Joystick interface · LM393 comparators', es: 'Interfaz del joystick · comparadores LM393' },
    },
    specs: [
      { k: 'FPGA', v: 'Intel Cyclone IV E · EP4CE115F29C7' },
      { k: { en: 'Board', es: 'Tarjeta' }, v: 'Terasic DE2-115' },
      { k: 'HDL', v: 'VHDL' },
      { k: { en: 'Tools', es: 'Herramientas' }, v: 'Quartus II 13.1 · ModelSim' },
      { k: { en: 'Clock', es: 'Reloj' }, v: '50 MHz' },
      { k: { en: 'Video', es: 'Video' }, v: { en: 'VGA 800×600 · 24-bit RGB', es: 'VGA 800×600 · RGB de 24 bits' } },
      { k: { en: 'Inputs', es: 'Entradas' }, v: { en: '2 joysticks (LM393) · push-buttons', es: '2 joysticks (LM393) · pulsadores' } },
      { k: { en: 'Techniques', es: 'Técnicas' }, v: { en: 'Counters · clock-enable dividers · edge detection · fixed-point math', es: 'Contadores · divisores por habilitación · detección de flancos · aritmética en punto fijo' } },
    ],
    en: {
      tagline: 'Volleyball-style Pong in pure VHDL on a DE2-115: SVGA video, ball physics with gravity, a boost meter and first-to-7 scoring, played with two joysticks.',
      problem: 'Everything a video game needs (video timing, physics, collisions, scoring and graphics) has to be built as parallel digital hardware, with no processor and no frame buffer, in step with a 50 MHz pixel clock.',
      did: [
        'Built the video pipeline in VHDL: an 800×600 sync generator (H/V counters, porches and retrace) driving 24-bit RGB to the board’s VGA port, with line timing checked in a ModelSim testbench (21.1 µs per line).',
        'Implemented the ball physics in hardware with fixed-point integer math: gravity, bounces off walls, ceiling, net and paddles, and a return angle that depends on where the ball hits the paddle.',
        'Added a per-player boost (15 % faster return, 8 s recharge) and first-to-7 scoring with edge-detected single pulses; the serve side comes from the parity of a free-running counter.',
        'Drew every object from sprite ROMs (8 bits per channel) through a per-pixel priority multiplexer, and read the joysticks through LM393 comparators, checked on the oscilloscope.',
      ],
    },
    es: {
      tagline: 'Pong estilo voleibol en VHDL puro sobre una DE2-115: video SVGA, física de la pelota con gravedad, medidor de boost y marcador a 7 puntos, con dos joysticks.',
      problem: 'Todo lo que necesita un videojuego (temporización de video, física, colisiones, marcador y gráficos) tiene que construirse como hardware digital en paralelo, sin procesador ni frame buffer, al ritmo de un reloj de píxel de 50 MHz.',
      did: [
        'Construimos el pipeline de video en VHDL: un generador de sincronía de 800×600 (contadores H/V, porches y retrazo) que entrega RGB de 24 bits al puerto VGA de la tarjeta, con la temporización de línea verificada en un testbench de ModelSim (21,1 µs por línea).',
        'Implementamos la física de la pelota en hardware con aritmética entera en punto fijo: gravedad, rebotes contra paredes, techo, red y paletas, y un ángulo de salida que depende de dónde golpea la pelota en la paleta.',
        'Agregamos un boost por jugador (15 % más de velocidad, recarga de 8 s) y un marcador a 7 puntos con pulsos únicos por detección de flanco; el lado del saque sale de la paridad de un contador libre.',
        'Dibujamos cada objeto desde ROM de sprites (8 bits por canal) con un multiplexor de prioridad por píxel, y leímos los joysticks con comparadores LM393, verificados en el osciloscopio.',
      ],
    },
  },
  {
    id: 'correlacium',
    name: { en: 'CORRELACIUM-LEVIOSA — gesture recognition by correlation', es: 'CORRELACIUM-LEVIOSA — reconocimiento de gestos por correlación' },
    year: '2024',
    repo: 'https://github.com/RuDomiv/CORRELACIUM-LEVIOSA',
    demo: null,
    team: { en: 'With Ruslán Domínguez Ivanova', es: 'Con Ruslán Domínguez Ivanova' },
    // ⚠ VERIFICAR — nombre exacto de la materia. El repo dice "final project of the Signal Processing course".
    course: { en: 'Signal Processing · final project', es: 'Procesamiento de Señales · proyecto final' },
    gallery: ['board', 'demo', 'plot'],
    captions: {
      plot: { en: 'Recorded X/Y/Z templates · data from the repo', es: 'Plantillas X/Y/Z grabadas · datos del repo' },
    },
    specs: [
      // ⚠ VERIFICAR — el código usa MicroPython con pines GP0/GP1/GP2 (nomenclatura de la Raspberry Pi Pico).
      { k: 'MCU', v: 'Raspberry Pi Pico · MicroPython' },
      { k: 'Sensor', v: { en: 'ADXL345 3-axis accelerometer · ±2 g', es: 'Acelerómetro ADXL345 de 3 ejes · ±2 g' } },
      { k: 'Bus', v: 'I²C · 400 kHz' },
      { k: { en: 'Sampling', es: 'Muestreo' }, v: { en: '100 Hz timer · 100-sample window', es: 'Timer de 100 Hz · ventana de 100 muestras' } },
      { k: { en: 'Display', es: 'Pantalla' }, v: 'OLED SSD1306 · 128×64' },
      { k: { en: 'Technique', es: 'Técnica' }, v: { en: 'Correlation vs. recorded templates', es: 'Correlación con plantillas grabadas' } },
    ],
    en: {
      tagline: 'A wand that recognizes four Harry Potter spells from its motion: 3-axis acceleration sampled at 100 Hz, matched by correlation against recorded templates, with the result on an OLED.',
      problem: 'Recognizing a gesture from raw acceleration on a microcontroller, in real time and without a trained model: the signal is noisy, no two casts are identical, and the system still has to decide which spell it saw.',
      did: [
        'Set up an ADXL345 accelerometer over I²C (400 kHz, ±2 g, full resolution) and sampled all three axes at 100 Hz from a periodic timer into 100-sample sliding windows.',
        'Wrote a capture script: a push-button on a GPIO with pull-up starts a one-second recording and saves the X/Y/Z template to a file.',
        'Recorded templates for four spells (Leviosa, Expelliarmus, Lumos and Expecto Patronus) and scored every window by correlation on each axis, with a tuned threshold per spell.',
        'Showed the last detected spell on a 128×64 SSD1306 OLED that shares the same I²C bus.',
      ],
    },
    es: {
      tagline: 'Una varita que reconoce cuatro hechizos de Harry Potter por su movimiento: aceleración en 3 ejes muestreada a 100 Hz y comparada por correlación con plantillas grabadas, con el resultado en una OLED.',
      problem: 'Reconocer un gesto a partir de la aceleración cruda en un microcontrolador, en tiempo real y sin un modelo entrenado: la señal es ruidosa, ningún lanzamiento es idéntico y aun así el sistema tiene que decidir qué hechizo vio.',
      did: [
        'Configuramos un acelerómetro ADXL345 por I²C (400 kHz, ±2 g, resolución completa) y muestreamos los tres ejes a 100 Hz con un timer periódico, en ventanas deslizantes de 100 muestras.',
        'Escribimos un script de captura: un pulsador en un GPIO con pull-up inicia una grabación de un segundo y guarda la plantilla X/Y/Z en un archivo.',
        'Grabamos plantillas de cuatro hechizos (Leviosa, Expelliarmus, Lumos y Expecto Patronus) y puntuamos cada ventana por correlación en cada eje, con un umbral ajustado por hechizo.',
        'Mostramos el último hechizo detectado en una OLED SSD1306 de 128×64 que comparte el mismo bus I²C.',
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
        'Manejamos dos matrices LED MAX7219 de 8×8 como campo de juego y una LCD I²C de 20×4.',
        'Leímos la entrada de pulsadores (pull-up) para dos jugadores.',
        'Secuenciamos una melodía inspirada en Pac-Man con una máquina de estados.',
        'Publicamos el código abierto como material de estudio para otros estudiantes.',
      ],
    },
  },
  // ⚠ PENDIENTE — ranura para el próximo proyecto. Cuando exista, reemplazar por una ficha completa.
  { id: 'next', placeholder: true },
]

/**
 * Software secundario: compacto, enmarcado desde su relación con el hardware.
 * `hardware` = id del proyecto de HARDWARE enlazado.
 */
export const SOFTWARE = [
  {
    id: 'proteo-web',
    name: 'PROTEO — Web dashboard',
    year: '2025',
    repo: 'https://github.com/NicoGomez4262/PROTEO_DEF',
    demo: 'https://mi-app-vsc.web.app',
    hardware: 'proteo',
    stack: ['JavaScript', 'Firebase', 'Firestore', 'Chart.js'],
    en: {
      tagline: 'The web side of the PROTEO locker. It sends unlock and photo commands to the Raspberry Pi through a Firestore document, mirrors the door state and IR sensor live, and on a suspicious opening fires an email alert with an automatic photo. Separate dashboards for guests, hosts and admins.',
      facts: 'Firebase Auth · 3 roles · live Firestore sync',
    },
    es: {
      tagline: 'La cara web del casillero PROTEO. Envía comandos de apertura y de foto a la Raspberry Pi mediante un documento de Firestore, refleja en vivo el estado de la puerta y del sensor IR y, ante una apertura sospechosa, dispara una alerta por correo con foto automática. Tableros separados para huéspedes, anfitriones y administradores.',
      facts: 'Firebase Auth · 3 roles · sincronización en vivo con Firestore',
    },
  },
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
      { k: { en: 'Boards designed', es: 'Placas diseñadas' }, v: { en: '4+ custom PCBs to date', es: 'Más de 4 PCB a la medida hasta hoy' } },
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
      { k: { en: 'Embedded Linux', es: 'Linux embebido' }, v: 'Raspberry Pi (ARM) · Python · GPIO' },
      { k: { en: 'Buses', es: 'Buses' }, v: 'SPI · UART · I²C · 1-Wire' },
      { k: 'Firmware', v: { en: 'C · C++ · MicroPython · interrupts · timing', es: 'C · C++ · MicroPython · interrupciones · temporización' } },
      { k: 'FSM', v: { en: 'Finite-state machines: UART command parser, tune sequencer', es: 'Máquinas de estados finitos: parser de comandos UART, secuenciador de melodía' } },
      { k: { en: 'Sensors', es: 'Sensores' }, v: { en: 'IR · ADXL345 accelerometer · analog via ADC · external 12-bit ADC', es: 'IR · acelerómetro ADXL345 · analógicos por ADC · ADC externo de 12 bits' } },
      { k: { en: 'Displays', es: 'Pantallas' }, v: { en: 'SSD1306 OLED · 20×4 I²C LCD · MAX7219 LED matrices', es: 'OLED SSD1306 · LCD I²C 20×4 · matrices LED MAX7219' } },
      { k: { en: 'Motor control', es: 'Control de motores' }, v: { en: 'DC · PWM + H-bridge · servo pulses', es: 'DC · PWM + puente H · pulsos de servo' } },
      { k: 'IoT', v: 'MQTT (QoS, LWT) · Firebase' },
    ],
  },
  {
    id: 'digital',
    code: 'HW-03',
    en: 'Digital Design',
    es: 'Diseño digital',
    rows: [
      { k: 'HDL', v: 'VHDL · Verilog' },
      { k: 'FPGA', v: 'Intel Cyclone IV E (DE2-115)' },
      { k: { en: 'Synthesis', es: 'Síntesis' }, v: 'Intel Quartus' },
      { k: { en: 'Simulation', es: 'Simulación' }, v: 'ModelSim · testbenches' },
      { k: { en: 'Techniques', es: 'Técnicas' }, v: { en: 'Counters · clock-enable dividers · VGA timing', es: 'Contadores · divisores por habilitación · temporización VGA' } },
    ],
  },
  {
    id: 'signals',
    code: 'HW-04',
    en: 'Signals & Analysis',
    es: 'Señales y análisis',
    rows: [
      { k: { en: 'Tools', es: 'Herramientas' }, v: 'MATLAB' },
      { k: { en: 'Digital filters', es: 'Filtros digitales' }, v: { en: 'FIR / IIR design · FIR on MCU', es: 'Diseño FIR / IIR · FIR en MCU' } }, // ⚠ VERIFICAR — ¿diseñó IIR?
      { k: { en: 'Analog filters', es: 'Filtros analógicos' }, v: { en: 'Analog filter design · anti-aliasing filters', es: 'Diseño de filtros analógicos · filtros anti-aliasing' } },
      { k: { en: 'Detection', es: 'Detección' }, v: { en: 'Correlation against recorded templates', es: 'Correlación con plantillas grabadas' } },
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
      { k: 'OS', v: 'Linux · Windows' },
      { k: { en: 'Version control', es: 'Control de versiones' }, v: 'Git · GitHub' },
      { k: 'IDE', v: 'MPLAB X · Arduino IDE' },
      { k: 'Deploy', v: 'Vercel · Firebase Hosting' },
    ],
  },
  {
    id: 'ai',
    code: 'AI-01',
    en: 'AI',
    es: 'IA',
    rows: [
      { k: { en: 'Coding agents', es: 'Agentes de código' }, v: 'Claude Code · Codex' },
      { k: { en: 'Generative media', es: 'Medios generativos' }, v: 'Higgsfield' },
    ],
  },
]

/** Devuelve el texto en el idioma activo, sea string plano o { en, es }. */
export const tx = (value, lang) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value

/** Cantidad real de proyectos de hardware (sin contar la ranura vacía). */
export const HARDWARE_COUNT = HARDWARE.filter((p) => !p.placeholder).length
