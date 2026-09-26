import { Fragment, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HARDWARE, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { useDialog } from '../hooks/useDialog.js'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import MediaCarousel, { MediaThumb } from './ui/MediaCarousel.jsx'
import { pad2, projectMedia } from './ui/media.js'
import Lightbox from './ui/Lightbox.jsx'
import Pending from './ui/Pending.jsx'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]
const code = (i) => `HW-${pad2(i + 1)}`
const didLabel = (project, t) => (project.team ? t.didTeamLabel : t.didLabel)

/** Medios de cada proyecto, resueltos una vez contra el manifiesto del build. */
const MEDIA = Object.fromEntries(HARDWARE.map((p) => [p.id, projectMedia(p)]))

/** Tabla de especificaciones estilo hoja de datos. */
function SpecTable({ specs, lang }) {
  return (
    <dl className="divide-y divide-line-soft rounded-lg border border-line bg-bg/40 font-mono text-[12px]">
      {specs.map((s) => (
        <div key={tx(s.k, 'en')} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 px-3.5 py-2 sm:grid-cols-[7.5rem_1fr]">
          <dt className="text-[10px] tracking-[0.14em] text-ink-faint uppercase">{tx(s.k, lang)}</dt>
          <dd className="min-w-0 text-ink">{s.v == null ? <Pending /> : tx(s.v, lang)}</dd>
        </div>
      ))}
    </dl>
  )
}

function Links({ project, t, onNavigate }) {
  const base = 'inline-flex h-11 items-center gap-2 rounded-full border px-4 font-mono text-[12px] tracking-wide transition'
  return (
    <>
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`${base} border-accent/40 bg-accent/10 text-accent hover:bg-accent/20`}>
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          {t.viewDemo}
          <Icon name="arrowUpRight" size={13} />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className={`${base} border-line text-ink-dim hover:border-accent/50 hover:text-accent`}>
          <Icon name="github" size={14} />
          {t.viewCode}
        </a>
      )}
      {project.software && (
        <a href={`#sw-${project.software}`} onClick={onNavigate} className={`${base} border-line text-ink-dim hover:border-accent/50 hover:text-accent`}>
          <Icon name="code" size={14} />
          {t.toSoftware}
          <Icon name="arrowRight" size={13} />
        </a>
      )}
    </>
  )
}

/**
 * Cadena de señal dibujada con datos confirmados de la ficha, para los proyectos que todavía no tienen
 * fotos ni video. No es un placeholder: resume la arquitectura (bloques y buses) en el mismo cuadro 16:10.
 */
function SignalChain({ chain, lang, label }) {
  const summary = chain.blocks.map((b) => `${b.part} (${tx(b.role, lang)})`).join(` → ${chain.bus} → `)
  return (
    <div role="img" aria-label={`${label}: ${summary}. ${tx(chain.control, lang)}`} className="pcb-dots relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-5 overflow-hidden bg-surface-2 px-3 sm:px-6">
      {['left-2 top-2 border-l border-t', 'right-2 top-2 border-r border-t', 'left-2 bottom-2 border-b border-l', 'right-2 bottom-2 border-b border-r'].map((pos) => (
        <span key={pos} aria-hidden className={`absolute size-3 border-accent/50 ${pos}`} />
      ))}
      <span aria-hidden className="absolute top-2.5 left-6 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
        {tx(chain.title, lang)}
      </span>
      <div aria-hidden className="flex w-full max-w-lg items-center">
        {chain.blocks.map((b, i) => (
          <Fragment key={b.part}>
            {i > 0 && (
              <div className="flex min-w-7 flex-1 flex-col items-center gap-1">
                <span className="font-mono text-[9px] tracking-[0.14em] text-accent sm:text-[10px]">{chain.bus}</span>
                <span className="relative h-px w-full bg-accent/60">
                  <span className="absolute -top-[3px] right-0 size-0 border-y-[3.5px] border-l-[6px] border-y-transparent border-l-accent/80" />
                </span>
              </div>
            )}
            <div className={`rounded-lg border bg-surface px-2 py-2 text-center sm:px-3 sm:py-2.5 ${b.core ? 'border-accent/50' : 'border-line'}`}>
              <p className="font-mono text-[11px] font-medium text-ink sm:text-[13px]">{b.part}</p>
              <p className="mt-0.5 font-mono text-[9px] leading-tight text-ink-faint sm:text-[10px]">{tx(b.role, lang)}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <p aria-hidden className="font-mono text-[10px] tracking-wide text-ink-dim sm:text-[11px]">
        {tx(chain.control, lang)}
      </p>
    </div>
  )
}

/**
 * Fachada de LEDs para la tarjeta «Próximamente»: una franja de luz fija que cruza la retícula en diagonal, con
 * algunos LEDs cobre sueltos. Es decorativa y no se anima (el único punto que late en el sitio es el del hero).
 */
const FACADE_COLS = 18
const FACADE_ROWS = 8
const FACADE_SPARKS = new Set(['15,1', '2,6', '16,5', '5,0', '11,7'])
const FACADE = Array.from({ length: FACADE_ROWS * FACADE_COLS }, (_, i) => {
  const x = i % FACADE_COLS
  const y = Math.floor(i / FACADE_COLS)
  if (FACADE_SPARKS.has(`${x},${y}`)) return 'bg-copper shadow-[0_0_8px_var(--copper)]'
  const glow = 1 - Math.abs(x - (3 + y * 1.4)) / 3
  if (glow > 0.66) return 'bg-accent shadow-[0_0_8px_var(--accent)]'
  if (glow > 0.33) return 'bg-accent/60'
  if (glow > 0) return 'bg-accent/25'
  return 'bg-line'
})

function Facade() {
  return (
    <div aria-hidden className="pcb-dots relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-surface-2">
      {['left-2 top-2 border-l border-t', 'right-2 top-2 border-r border-t', 'left-2 bottom-2 border-b border-l', 'right-2 bottom-2 border-b border-r'].map((pos) => (
        <span key={pos} className={`absolute size-3 border-accent/50 ${pos}`} />
      ))}
      <div className="grid w-[64%] grid-cols-[repeat(18,minmax(0,1fr))] gap-1.5 rounded-md border border-line bg-bg/40 p-3 sm:gap-2 sm:p-4">
        {FACADE.map((led, i) => (
          <span key={i} className={`aspect-square rounded-full ${led}`} />
        ))}
      </div>
    </div>
  )
}

/** Tarjeta «Próximamente» (la tesis): la fachada, el nombre y una línea. Sin specs ni modal: que quede a la intriga. */
function SoonCard({ project, index, lang, t }) {
  return (
    <Reveal delay={(index % 2) * 0.06}>
      <article id={`hw-${project.id}`} className="card flex h-full scroll-mt-24 flex-col overflow-hidden">
        <div className="border-b border-line">
          <Facade />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
            <span className="text-accent">{code(index)}</span>
            <span className="text-copper">{t.soon}</span>
            <span aria-hidden className="h-px flex-1 bg-line-soft" />
          </div>
          <h3 className="text-xl font-semibold text-ink sm:text-2xl">{tx(project.name, lang)}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-dim">{project[lang].tagline}</p>
        </div>
      </article>
    </Reveal>
  )
}

function ProjectCard({ project, index, lang, t, onOpen, onExpand }) {
  const copy = project[lang]
  const star = project.star
  const name = tx(project.name, lang)
  const items = MEDIA[project.id]
  const visual = items.length > 0 || project.chain

  return (
    <Reveal className={star ? 'md:col-span-2' : ''} delay={star ? 0 : (index % 2) * 0.06}>
      <article
        id={`hw-${project.id}`}
        className={`xlink card card-hover flex h-full scroll-mt-24 flex-col overflow-hidden ${star ? 'lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]' : ''}`}
      >
        {visual && (
          <div className={`border-line ${star ? 'border-b lg:border-r lg:border-b-0' : 'border-b'}`}>
            {items.length > 0 ? (
              <MediaCarousel items={items} label={name} lang={lang} t={t} eager={star} onExpand={(v) => onExpand(project, v)} />
            ) : (
              <SignalChain chain={project.chain} lang={lang} label={name} />
            )}
          </div>
        )}

        <div className={`flex flex-1 flex-col p-5 sm:p-7 ${star ? 'lg:justify-center lg:p-10' : ''}`}>
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
            <span className="text-accent">{code(index)}</span>
            {star && (
              <span className="inline-flex items-center gap-1.5 text-copper">
                <Icon name="star" size={11} />
                {t.starLabel}
              </span>
            )}
            <span aria-hidden className="h-px flex-1 bg-line-soft" />
            <span className="tabular">{project.year}</span>
          </div>

          <h3 className={`font-semibold text-ink ${star ? 'text-2xl sm:text-[1.75rem] sm:leading-tight' : 'text-xl sm:text-2xl'}`}>{name}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-dim">{copy.tagline}</p>

          <div className={star ? 'pt-7' : 'mt-auto pt-6'}>
            <button
              type="button"
              onClick={(e) => onOpen(project, e.currentTarget)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 font-mono text-[12px] tracking-wide text-ink transition hover:border-accent/60 hover:text-accent"
            >
              {t.openProject}
              <Icon name="arrowRight" size={13} />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function ProjectModal({ project, index, lang, t, onClose, onView }) {
  const reduced = useReducedMotion()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const copy = project[lang]
  const name = tx(project.name, lang)
  const items = MEDIA[project.id]
  useDialog(panelRef, { onClose, initialFocus: closeRef })

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.38, ease: EASE }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border border-line bg-bg-elev outline-none sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 border-b border-line bg-bg-elev/95 backdrop-blur-xl">
          <span aria-hidden className="mx-auto mt-2.5 block h-1 w-10 rounded-full bg-line sm:hidden" />
          <div className="flex items-start justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-5">
            <div className="min-w-0">
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                {code(index)} · {project.year}
              </p>
              <h3 id="project-modal-title" className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
                {name}
              </h3>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink-dim transition hover:border-accent/50 hover:text-accent"
            >
              <Icon name="close" size={17} />
            </button>
          </div>
        </div>

        <div className="px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-8">
          <p className="text-lg leading-relaxed text-ink">{copy.tagline}</p>

          {(project.team || project.course) && (
            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-ink-faint">
              {project.team && (
                <div className="flex items-center gap-2">
                  <Icon name="star" size={13} className="shrink-0 text-copper" />
                  <dt className="sr-only">{t.teamLabel}</dt>
                  <dd>{tx(project.team, lang)}</dd>
                </div>
              )}
              {project.course && (
                <div className="flex items-center gap-2">
                  <Icon name="cap" size={14} className="shrink-0 text-accent" />
                  <dt className="sr-only">{t.courseLabel}</dt>
                  <dd>{tx(project.course, lang)}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-6 rounded-xl border border-line bg-surface p-5">
            <p className="mb-2 font-mono text-[10px] tracking-[0.16em] text-copper uppercase">{t.problemLabel}</p>
            <p className="text-sm leading-relaxed text-ink-dim">{copy.problem}</p>
          </div>

          <div className="mt-7 grid gap-8">
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{didLabel(project, t)}</p>
              <ul className="space-y-3">
                {copy.did.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{t.specsLabel}</p>
              <SpecTable specs={project.specs} lang={lang} />
            </div>
          </div>

          {items.length > 0 && (
            <div className="mt-9">
              <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
                {t.galleryLabel} <span className="text-ink-faint/70">· {items.length}</span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((it, i) => {
                  const caption = tx(it.caption, lang) ?? name
                  return (
                    <figure key={it.key} className="overflow-hidden rounded-xl border border-line">
                      <button
                        type="button"
                        onClick={(e) => onView(project, { index: i, trigger: e.currentTarget })}
                        aria-label={`${t.mediaEnlarge}: ${caption}`}
                        aria-haspopup="dialog"
                        className="group/thumb relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-surface-2"
                      >
                        <MediaThumb item={it} alt="" />
                        <span aria-hidden className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition-opacity group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100">
                          <Icon name="expand" size={14} />
                        </span>
                      </button>
                      <figcaption className="flex items-start justify-between gap-3 border-t border-line bg-surface px-3.5 py-2.5 font-mono text-[10.5px] leading-snug tracking-wide text-ink-faint">
                        <span>{caption}</span>
                        <span className="shrink-0 tracking-[0.14em]">FIG. {pad2(i + 1)}</span>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          )}

          {(project.repo || project.demo || project.software) && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
              <Links project={project} t={t} onNavigate={onClose} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HardwareProjects({ index }) {
  const { lang, t } = useApp()
  const [open, setOpen] = useState(null)
  const [viewer, setViewer] = useState(null)
  const triggerRef = useRef(null)

  const openProject = (project, trigger) => {
    triggerRef.current = trigger
    setOpen(project)
  }
  const close = useCallback(() => {
    setOpen(null)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  // Visor ampliado: desde el carrusel de una tarjeta o desde la bitácora del modal.
  const openViewer = (project, { index: start, time = 0, trigger, onClose }) => {
    setViewer({ project, start, time, trigger, onClose })
  }
  const closeViewer = (last) => {
    const v = viewer
    setViewer(null)
    v?.onClose?.(last)
    if (v?.trigger?.isConnected) v.trigger.focus({ preventScroll: true })
  }

  return (
    <Section id="hardware" index={index} kicker={t.hwKicker} title={t.hwTitle} intro={t.hwIntro}>
      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {HARDWARE.map((p, i) =>
          p.soon ? (
            <SoonCard key={p.id} project={p} index={i} lang={lang} t={t} />
          ) : (
            <ProjectCard key={p.id} project={p} index={i} lang={lang} t={t} onOpen={openProject} onExpand={openViewer} />
          ),
        )}
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} index={HARDWARE.indexOf(open)} lang={lang} t={t} onClose={close} onView={openViewer} />}
      </AnimatePresence>

      <AnimatePresence>
        {viewer && (
          <Lightbox
            key={viewer.project.id}
            items={MEDIA[viewer.project.id]}
            start={viewer.start}
            time={viewer.time}
            label={tx(viewer.project.name, lang)}
            lang={lang}
            t={t}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
