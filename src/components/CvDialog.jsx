import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CV_FORMATS, LANG_NAMES } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { useDialog } from '../hooks/useDialog.js'
import { cvDownloadName, cvFile, hasCv, otherLang } from './ui/cv.js'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]
const FORMAT_ICON = { ats: 'file', modern: 'layers' }

/** Panel del diálogo: se monta al abrir, así el foco inicial y el bloqueo de scroll viven con él. */
function CvPanel({ onClose }) {
  const { lang, t } = useApp()
  const reduced = useReducedMotion()
  const panelRef = useRef(null)
  const firstRef = useRef(null)
  // El idioma de la hoja de vida es propio del diálogo: cambiarlo aquí no cambia el idioma del sitio.
  // Arranca en el del sitio, o en el otro si el del sitio aún no tiene archivos.
  const [cvLang, setCvLang] = useState(() => (!hasCv(lang) && hasCv(otherLang(lang)) ? otherLang(lang) : lang))
  useDialog(panelRef, { onClose, initialFocus: firstRef })

  const other = otherLang(cvLang)
  const files = CV_FORMATS.map((format) => ({ format, href: cvFile(cvLang, format) }))
  const firstAvailable = files.find((f) => f.href)?.format
  const showFallback = !firstAvailable && hasCv(other)

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
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
        aria-labelledby="cv-title"
        aria-describedby="cv-desc"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 56 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.36, ease: EASE }}
        className="relative flex max-h-[88svh] w-full max-w-lg flex-col rounded-t-2xl border border-line bg-bg-elev shadow-[var(--shadow)] outline-none sm:rounded-2xl"
      >
        <span aria-hidden className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line sm:hidden" />

        <div className="flex items-start justify-between gap-4 px-5 pt-3 sm:px-7 sm:pt-6">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">PDF · {cvLang.toUpperCase()}</p>
            <h2 id="cv-title" className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
              {t.cvTitle}
            </h2>
            <p id="cv-desc" className="mt-1.5 text-sm leading-relaxed text-ink-dim">
              {t.cvIntro}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink-dim transition hover:border-accent/50 hover:text-accent"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-7 sm:pb-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span id="cv-lang" className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
              {t.cvLang}
            </span>
            <div role="group" aria-labelledby="cv-lang" className="inline-flex rounded-full border border-line bg-surface p-1">
              {['en', 'es'].map((l) => (
                <button
                  key={l}
                  type="button"
                  lang={l}
                  aria-pressed={cvLang === l}
                  onClick={() => setCvLang(l)}
                  className={`h-11 min-w-[6rem] rounded-full px-4 text-sm transition ${
                    cvLang === l ? 'bg-accent font-semibold text-accent-ink' : 'text-ink-dim hover:text-ink'
                  }`}
                >
                  {LANG_NAMES[l]}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-5 grid gap-3">
            {files.map(({ format, href }) => {
              const copy = t.cvFormats[format]
              return (
                <li key={format}>
                  {href ? (
                    <a
                      ref={format === firstAvailable ? firstRef : undefined}
                      href={href}
                      hrefLang={cvLang}
                      download={cvDownloadName(cvLang, format)}
                      onClick={onClose}
                      className="group flex min-h-[5rem] items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-accent/60"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-accent">
                        <Icon name={FORMAT_ICON[format]} size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-ink">{copy.title}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-ink-dim">{copy.body}</span>
                      </span>
                      <Icon name="download" size={18} className="shrink-0 text-ink-faint transition group-hover:text-accent" />
                    </a>
                  ) : (
                    <div aria-disabled="true" className="hatch flex min-h-[5rem] items-center gap-4 rounded-xl border border-dashed border-line p-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-dashed border-line text-ink-faint">
                        <Icon name={FORMAT_ICON[format]} size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-ink-dim">{copy.title}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-ink-faint">{copy.body}</span>
                        <span className="mt-2 inline-block rounded-full border border-line bg-bg-elev px-2.5 py-1 font-mono text-[10px] tracking-wider text-ink-faint uppercase">
                          {t.cvSoon}
                        </span>
                      </span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {showFallback && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm text-ink-dim">{t.cvFallback[other]}</p>
              <button
                type="button"
                onClick={() => setCvLang(other)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-accent/50 px-4 text-sm font-medium text-accent transition hover:bg-accent/10"
              >
                {t.cvSwitch[other]}
                <Icon name="arrowRight" size={14} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Selector de hoja de vida: pregunta el idioma y el formato (ATS o moderno) antes de descargar.
 * Solo se abre cuando hay algo que elegir; si no, los botones descargan directo (ui/CvTrigger.jsx).
 */
export default function CvDialog() {
  const { cvOpen, closeCv } = useApp()
  return <AnimatePresence>{cvOpen && <CvPanel onClose={closeCv} />}</AnimatePresence>
}
