import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE, SEEKING, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { resolveMedia } from './ui/Media.jsx'
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
      {/* Huella de un IC tipo SOIC */}
      <g stroke="var(--trace)" strokeWidth="1.4" className="pad" style={{ '--d': '0.5s' }}>
        <rect x="880" y="300" width="84" height="120" rx="4" />
        {[0, 1, 2, 3, 4].map((n) => (
          <g key={n}>
            <rect x="866" y={312 + n * 22} width="12" height="8" rx="1" />
            <rect x="966" y={312 + n * 22} width="12" height="8" rx="1" />
          </g>
        ))}
        <circle cx="894" cy="314" r="3" />
      </g>
    </svg>
  )
}

/** Marco técnico con esquinas de plano. Si la foto aún no existe, muestra un hueco diseñado. */
function PhotoFrame({ t }) {
  const photo = resolveMedia(PROFILE.photo, { allowVideo: false })

  return (
    <div className="relative aspect-4/5 w-full">
      {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'left-0 bottom-0 border-b-2 border-l-2', 'right-0 bottom-0 border-b-2 border-r-2'].map(
        (pos) => (
          <span key={pos} aria-hidden className={`absolute z-20 size-7 border-accent/70 ${pos}`} />
        ),
      )}

      <div className="absolute inset-2.5 overflow-hidden rounded-sm border border-line bg-surface ring-glow">
        {photo ? (
          <img
            src={photo.src}
            alt={PROFILE.name}
            width="800"
            height="1000"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="pcb-dots grid h-full place-items-center bg-surface-2 px-6 text-center">
            <div>
              <span className="font-display text-6xl font-semibold text-ink-faint/60">{PROFILE.initials}</span>
              <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                Photo · {t.soon}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Anotaciones de plano */}
      <span aria-hidden className="absolute -top-6 right-2 font-mono text-[10px] tracking-[0.2em] text-ink-faint">
        REF · NG-01
      </span>
      <div className="absolute -bottom-3 -left-3 z-20 flex items-center gap-2 rounded-lg border border-line bg-bg-elev/95 px-3 py-2 backdrop-blur-sm">
        <Icon name="pin" size={14} className="text-accent" />
        <span className="font-mono text-[11px] tracking-wide text-ink-dim">Bogotá, CO</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { lang, t } = useApp()
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

  return (
    <section id="top" className="relative isolate flex min-h-[92svh] items-center overflow-hidden pt-24 pb-14 md:pt-28">
      <div aria-hidden className="pcb-grid mask-fade-b absolute inset-0 -z-20" />
      <div
        aria-hidden
        className="absolute -top-48 left-1/2 -z-20 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(ellipse at center, var(--glow), transparent 68%)' }}
      />
      <PcbTraces />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1fr_19rem] lg:gap-20">
        <div>
          <motion.p
            {...rise(0)}
            className="mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-accent/30 bg-surface/80 py-1.5 pr-4 pl-3 backdrop-blur-sm"
          >
            <span className="live-dot size-2 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-[11px] leading-snug tracking-wide text-ink">
              {SEEKING[lang]}
              {dates && <span className="text-ink-faint"> · {dates}</span>}
            </span>
          </motion.p>

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
            <span className="mt-1 block text-ink-faint">{PROFILE.university}</span>
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
            <a
              href={PROFILE.cv}
              download
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent"
            >
              <Icon name="download" size={16} />
              {t.ctaCv}
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="grid size-12 place-items-center rounded-full border border-line text-ink-dim transition hover:border-accent/50 hover:text-accent"
            >
              <Icon name="github" size={19} />
            </a>
            {PROFILE.linkedin && (
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="grid size-12 place-items-center rounded-full border border-line text-ink-dim transition hover:border-accent/50 hover:text-accent"
              >
                <Icon name="linkedin" size={18} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={reduced ? false : { opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
          className="mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:mx-0 lg:max-w-none"
        >
          <PhotoFrame t={t} />
        </motion.div>
      </div>
    </section>
  )
}
