import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HARDWARE, MEDIA_SLOTS, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { useDialog } from '../hooks/useDialog.js'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import Media, { resolveMedia } from './ui/Media.jsx'
import Pending from './ui/Pending.jsx'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]
const code = (i) => `HW-${String(i + 1).padStart(2, '0')}`
const mediaBase = (project, slot) => `/media/projects/${project.id}/${slot}`
const didLabel = (project, t) => (project.team ? t.didTeamLabel : t.didLabel)

/** Tabla de especificaciones estilo hoja de datos. */
function SpecTable({ specs, lang, limit }) {
  const rows = limit ? specs.slice(0, limit) : specs
  return (
    <dl className="divide-y divide-line-soft rounded-lg border border-line bg-bg/40 font-mono text-[12px]">
      {rows.map((s) => (
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
          <span className="live-dot size-1.5 rounded-full bg-accent" />
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
 * Portada de la tarjeta: la foto `cover` si existe; si no, el primer medio real de la bitácora
 * (una captura, un diagrama), y si no hay ninguno, el placeholder diseñado.
 */
function coverBase(project) {
  if (resolveMedia(mediaBase(project, 'cover'), { allowVideo: false })) return mediaBase(project, 'cover')
  const slot = project.gallery?.find((s) => resolveMedia(mediaBase(project, s), { allowVideo: false }))
  return mediaBase(project, slot ?? 'cover')
}

function coverPlaceholder(project, lang, t) {
  const first = MEDIA_SLOTS[project.gallery?.[0]] ?? MEDIA_SLOTS.cover
  return { icon: first.icon, label: MEDIA_SLOTS.cover[lang], sub: t.soon, fig: 'FIG. 00' }
}

function ProjectCard({ project, index, lang, t, onOpen }) {
  const copy = project[lang]
  const star = project.star
  const name = tx(project.name, lang)

  return (
    <Reveal className={star ? 'md:col-span-2' : ''} delay={star ? 0 : (index % 2) * 0.06}>
      <article
        id={`hw-${project.id}`}
        className={`xlink card card-hover group flex h-full scroll-mt-24 flex-col overflow-hidden ${star ? 'lg:grid lg:grid-cols-[1.08fr_1fr]' : ''}`}
      >
        <button
          type="button"
          onClick={(e) => onOpen(project, e.currentTarget)}
          aria-label={`${t.openProject}: ${name}`}
          className={`relative block w-full overflow-hidden border-line text-left ${star ? 'border-b lg:border-r lg:border-b-0' : 'border-b'}`}
        >
          <Media
            base={coverBase(project)}
            alt={name}
            video={false}
            className={`transition duration-500 group-hover:scale-[1.015] ${star ? 'lg:h-full' : ''}`}
            placeholder={coverPlaceholder(project, lang, t)}
          />
          {star && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-copper/40 bg-bg/85 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-copper uppercase backdrop-blur-sm">
              <Icon name="star" size={11} />
              {t.starLabel}
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
            <span className="text-accent">{code(index)}</span>
            <span aria-hidden className="h-px flex-1 bg-line-soft" />
            <span className="tabular">{project.year}</span>
          </div>

          <h3 className={`font-semibold text-ink ${star ? 'text-2xl sm:text-[1.75rem] sm:leading-tight' : 'text-xl sm:text-2xl'}`}>{name}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-dim">{copy.tagline}</p>

          <div className="mt-5 border-l-2 border-copper/60 pl-4">
            <p className="mb-1 font-mono text-[10px] tracking-[0.16em] text-copper uppercase">{t.problemLabel}</p>
            <p className="text-sm leading-relaxed text-ink-dim">{copy.problem}</p>
          </div>

          <div className="mt-5">
            <p className="mb-2.5 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{didLabel(project, t)}</p>
            <ul className="space-y-2">
              {copy.did.slice(0, star ? 3 : 2).map((d) => (
                <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-ink-dim">
                  <Icon name="check" size={14} className="mt-[3px] shrink-0 text-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <SpecTable specs={project.specs} lang={lang} limit={star ? 6 : 4} />
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            <button
              type="button"
              onClick={(e) => onOpen(project, e.currentTarget)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 font-mono text-[12px] tracking-wide text-bg transition hover:bg-accent hover:text-accent-ink"
            >
              {t.openProject}
              <Icon name="arrowRight" size={13} />
            </button>
            <Links project={project} t={t} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function NextBuild({ t }) {
  return (
    <Reveal className="md:col-span-2">
      <div className="hatch flex flex-col items-start gap-4 rounded-[0.875rem] border border-dashed border-line p-6 sm:flex-row sm:items-center sm:p-7">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-dashed border-accent/50 bg-surface text-accent">
          <Icon name="plus" size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">{code(HARDWARE.length - 1)} · {t.soon}</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">{t.nextTitle}</h3>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-dim">{t.nextBody}</p>
        </div>
      </div>
    </Reveal>
  )
}

function ProjectModal({ project, index, lang, t, onClose }) {
  const reduced = useReducedMotion()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const copy = project[lang]
  const name = tx(project.name, lang)
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

          <div className="mt-9">
            <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{t.galleryLabel}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.gallery.map((slot, i) => {
                const meta = MEDIA_SLOTS[slot]
                const fig = `FIG. ${String(i + 1).padStart(2, '0')}`
                const caption = tx(project.captions?.[slot], lang) ?? meta[lang]
                return (
                  <figure key={slot} className="overflow-hidden rounded-xl border border-line">
                    <Media
                      base={mediaBase(project, slot)}
                      alt={`${name} — ${caption}`}
                      video={Boolean(meta.video)}
                      fit={meta.contain ? 'contain' : 'cover'}
                      placeholder={{ icon: meta.icon, label: meta[lang], sub: t.soon, fig, compact: true }}
                    />
                    <figcaption className="flex items-start justify-between gap-3 border-t border-line bg-surface px-3.5 py-2.5 font-mono text-[10.5px] leading-snug tracking-wide text-ink-faint">
                      <span>{caption}</span>
                      <span className="shrink-0 tracking-[0.14em]">{fig}</span>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </div>

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
  const triggerRef = useRef(null)

  const openProject = (project, trigger) => {
    triggerRef.current = trigger
    setOpen(project)
  }
  const close = useCallback(() => {
    setOpen(null)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <Section id="hardware" index={index} kicker={t.hwKicker} title={t.hwTitle} intro={t.hwIntro}>
      <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
        {HARDWARE.map((p, i) =>
          p.placeholder ? (
            <NextBuild key={p.id} t={t} />
          ) : (
            <ProjectCard key={p.id} project={p} index={i} lang={lang} t={t} onOpen={openProject} />
          ),
        )}
      </div>

      <AnimatePresence>
        {open && (
          <ProjectModal
            project={open}
            index={HARDWARE.indexOf(open)}
            lang={lang}
            t={t}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
