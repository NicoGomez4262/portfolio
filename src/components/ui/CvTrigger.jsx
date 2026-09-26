import { LANG_NAMES } from '../../data/content.js'
import { useApp } from '../../hooks/useApp.jsx'
import { cvDirect } from './cv.js'

/**
 * Botón de hoja de vida. Si no hay nada que elegir, es un enlace de descarga directa; si hay varios
 * idiomas o formatos, abre el selector. `data-cv` dice cuál de los dos es (lo lee scripts/verify.mjs).
 */
export default function CvTrigger({ className = '', children }) {
  const { lang, openCv } = useApp()
  const direct = cvDirect(lang)

  if (direct) {
    return (
      <a href={direct.href} download={direct.download} hrefLang={direct.lang} type="application/pdf" data-cv="direct" className={className}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={(e) => openCv(e.currentTarget)} aria-haspopup="dialog" data-cv="dialog" className={className}>
      {children}
    </button>
  )
}

/**
 * Marca de idioma para una descarga directa que no está en el idioma del sitio
 * (por ejemplo, el sitio en español mientras solo existe la hoja de vida en inglés).
 */
export function CvLangTag({ className = '' }) {
  const { lang } = useApp()
  const direct = cvDirect(lang)
  if (!direct || direct.lang === lang) return null

  return (
    <span className={`rounded border border-current/35 px-1.5 font-mono text-[10px] leading-4 tracking-wider uppercase ${className}`}>
      <span aria-hidden>{direct.lang}</span>
      <span className="sr-only">
        {' '}
        (<span lang={direct.lang}>{LANG_NAMES[direct.lang]}</span>)
      </span>
    </span>
  )
}
