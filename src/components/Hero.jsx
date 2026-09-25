import { motion, useReducedMotion } from 'framer-motion'
import { HERO_CHIP, PROFILE, SEEKING, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Avatar from './ui/Avatar.jsx'
import { InstLink } from './ui/InstLink.jsx'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]

/* Trazas de PCB: rutas a 45°, terminadas en pads/vías. Se dibujan una sola vez (≤ 1.2 s). */
const TRACES = [
  { d: 'M0 118H250L310 178H560L600 138H770', end: [770, 138], delay: 0 },
  { d: 'M0 522H170L230 462H420L468 510H640', end: [640, 510], delay: 0.08 },
  { d: 'M1200 92H1010L960 142V262', end: [960, 262], delay: 0.04 },
  { d: 'M1200 612H1040L990 562H820L780 602H690', end: [690, 602], delay: 0.14 },
  { d: 'M1200 382H1080L1040 422V520', end: [1040, 520], delay: 0.2 },
  { d: 'M300 0V58L342 100H486', end: [486, 100], delay: 0.18 },
  { d: 'M40 330H140L190 280H300', end: [300, 280], delay: 0.24 },
  { d: 'M520 700V652L562 610H700', end: [700, 610], delay: 0.28 },
  { d: 'M1200 200H1120L1090 230H1000', end: [1000, 230], delay: 0.3 },
]

function PcbTraces() {
  return (
    <svg
      aria-hidden
      className="mask-radial pointer-events-none absolute inset-0 -z-10 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g stroke="var(--trace)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((t) => (
          <path key={t.d} d={t.d} pathLength="1" className="trace" style={{ '--d': `${t.delay}s` }} />
        ))}
      </g>
      <g stroke="var(--trace)" strokeWidth="1.6">
        {TRACES.map((t, i) => (
          <circle
            key={t.d}
            cx={t.end[0]}
            cy={t.end[1]}
            r={i % 3 === 0 ? 6 : 4.5}
            fill="var(--bg)"
            className="pad"
            style={{ '--d': `${0.72 + t.delay}s` }}
          />
        ))}
      </g>
    </svg>
  )
}

/* Geometría del integrado (DIP de 10 pines): cuerpo, pines y rótulos. */
const BODY = { x: 104, y: 74, w: 112, h: 232 }
const PIN_Y = [110, 150, 190, 230, 270]

/**
 * Bloque técnico del hero: un integrado visto desde arriba, con los pines rotulados con las
 * señales y buses que aparecen en los proyectos. Numeración de DIP: 1–5 a la izquierda, 6–10 a la derecha.
 */
function ChipBlock({ t }) {
  return (
    <figure className="mx-auto w-full max-w-[20rem]">
      <div className="relative">
        {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'left-0 bottom-0 border-b-2 border-l-2', 'right-0 bottom-0 border-b-2 border-r-2'].map(
          (pos) => (
            <span key={pos} aria-hidden className={`absolute size-5 border-accent/60 ${pos}`} />
          ),
        )}
        <span aria-hidden className="absolute -top-6 right-1 font-mono text-[10px] tracking-[0.2em] text-ink-faint">
          REF · U1
        </span>

        <svg viewBox="0 0 320 380" className="block h-auto w-full" role="img" aria-label={`${HERO_CHIP.part}: ${[...HERO_CHIP.left, ...HERO_CHIP.right].join(', ')}`}>
          {/* Trazas decorativas arriba y abajo del integrado */}
          <g stroke="var(--trace)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M160 74V46L186 20H300" pathLength="1" className="trace" style={{ '--d': '0.35s' }} />
            <path d="M136 74V56L112 32H24" pathLength="1" className="trace" style={{ '--d': '0.45s' }} />
            <path d="M160 306V332L136 356H24" pathLength="1" className="trace" style={{ '--d': '0.4s' }} />
            <path d="M184 306V324L208 348H300" pathLength="1" className="trace" style={{ '--d': '0.5s' }} />
          </g>
          <g stroke="var(--trace)" strokeWidth="1.4" fill="var(--bg)">
            {[[300, 20], [24, 32], [24, 356], [300, 348]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="4.5" className="pad" style={{ '--d': `${1 + i * 0.05}s` }} />
            ))}
          </g>

          {/* Pines y rótulos */}
          {PIN_Y.map((y, i) => (
            <g key={y}>
              <rect x={BODY.x - 22} y={y - 5} width="22" height="10" rx="1.5" fill="var(--surface-2)" stroke="var(--trace)" />
              <rect x={BODY.x + BODY.w} y={y - 5} width="22" height="10" rx="1.5" fill="var(--surface-2)" stroke="var(--trace)" />
              <text x={BODY.x - 30} y={y + 4} textAnchor="end" className="fill-ink-dim font-mono text-[12px]">
                {HERO_CHIP.left[i]}
              </text>
              <text x={BODY.x + BODY.w + 30} y={y + 4} className="fill-ink-dim font-mono text-[12px]">
                {HERO_CHIP.right[i]}
              </text>
              <text x={BODY.x + 12} y={y + 3.5} className="fill-ink-faint font-mono text-[9px]">
                {i + 1}
              </text>
              <text x={BODY.x + BODY.w - 12} y={y + 3.5} textAnchor="end" className="fill-ink-faint font-mono text-[9px]">
                {10 - i}
              </text>
            </g>
          ))}

          {/* Cuerpo con muesca y marca de pin 1 */}
          <rect x={BODY.x} y={BODY.y} width={BODY.w} height={BODY.h} rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <path d={`M${BODY.x + BODY.w / 2 - 12} ${BODY.y}a12 12 0 0 0 24 0`} fill="none" stroke="var(--line)" strokeWidth="1.5" />
          <circle cx={BODY.x + 16} cy={BODY.y + 16} r="3.5" fill="var(--accent)" opacity="0.8" />

          {/* Marca de la pieza */}
          <text x="160" y="182" textAnchor="middle" className="fill-ink font-mono text-[20px] font-medium tracking-[0.08em]">
            {HERO_CHIP.part}
          </text>
          <text x="160" y="204" textAnchor="middle" className="fill-ink-faint font-mono text-[10px] tracking-[0.18em]">
            EE · PUJ
          </text>
          <text x="160" y="220" textAnchor="middle" className="fill-accent font-mono text-[10px] tracking-[0.18em]">
            ’{PROFILE.graduation.slice(2)}
          </text>
        </svg>
      </div>

      <figcaption className="mt-4 text-center font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{t.chipCaption}</figcaption>
    </figure>
  )
}

export default function Hero() {
  const { lang, t, openCv } = useApp()
  const reduced = useReducedMotion()

  const rise = (i) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.05 + i * 0.07, duration: 0.6, ease: EASE },
        }

  const dates = SEEKING.dates ? tx(SEEKING.dates, lang) : null
  const iconLink =
    'grid size-12 place-items-center rounded-full border border-line text-ink-dim transition hover:border-accent/50 hover:text-accent'

  return (
    <section id="top" className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-24 pb-14 md:pt-28">
      <div aria-hidden className="pcb-grid mask-fade-b absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="absolute -top-48 left-1/2 -z-20 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(ellipse at center, var(--glow), transparent 68%)' }}
      />
      <PcbTraces />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1fr_19rem] lg:gap-16">
        <div className="min-w-0">
          <motion.div {...rise(0)} className="mb-7 flex items-center gap-3 sm:gap-4">
            <Avatar className="size-16 sm:size-[4.5rem] lg:size-20" />
            <p className="inline-flex min-w-0 items-center gap-2.5 rounded-full border border-accent/30 bg-surface/80 py-1.5 pr-4 pl-3 backdrop-blur-sm">
              <span className="live-dot size-2 shrink-0 rounded-full bg-accent" />
              <span className="font-mono text-[11px] leading-snug tracking-wide text-ink">
                {SEEKING[lang]}
                {dates && <span className="text-ink-faint"> · {dates}</span>}
              </span>
            </p>
          </motion.div>

          <motion.h1
            {...rise(1)}
            className="text-[2.9rem] leading-[1] font-semibold tracking-tight text-ink sm:text-7xl lg:text-[5.25rem]"
          >
            {PROFILE.shortName}
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 font-mono text-sm leading-relaxed tracking-wide sm:text-[0.95rem]">
            <span className="text-ink">{t.role}</span>
            <span aria-hidden className="mx-2.5 text-ink-faint">·</span>
            <span className="text-accent">{t.roleFocus}</span>
            <span className="mt-1 block text-ink-faint">
              <InstLink id={PROFILE.university} />
            </span>
          </motion.p>

          <motion.p {...rise(3)} className="mt-7 max-w-xl text-xl leading-relaxed text-ink-dim sm:text-2xl sm:leading-snug">
            {t.tagline}
          </motion.p>

          <motion.div {...rise(4)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#hardware"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink transition hover:brightness-110"
            >
              {t.ctaProjects}
              <Icon name="arrowDown" size={16} className="transition group-hover:translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={(e) => openCv(e.currentTarget)}
              aria-haspopup="dialog"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent"
            >
              <Icon name="download" size={16} />
              {t.ctaCv}
            </button>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
              <Icon name="github" size={19} />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
              <Icon name="linkedin" size={18} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={reduced ? false : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
          className="hidden lg:block"
        >
          <ChipBlock t={t} />
        </motion.div>
      </div>
    </section>
  )
}
