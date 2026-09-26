import manifest from 'virtual:media-manifest'
import { CV_FILES, CV_FORMATS } from '../../data/content.js'

/** Archivo de un idioma y formato, o null si no está en public/ (según el manifiesto de medios). */
export function cvFile(lang, format) {
  const file = CV_FILES[lang]?.[format]
  return file && manifest.has(file) ? file : null
}

/** Formatos con archivo disponible en un idioma. */
export const cvFormatsFor = (lang) => CV_FORMATS.filter((f) => cvFile(lang, f))

/** ¿Hay al menos una hoja de vida descargable en ese idioma? */
export const hasCv = (lang) => cvFormatsFor(lang).length > 0

export const otherLang = (lang) => (lang === 'en' ? 'es' : 'en')

/** Nombre del archivo descargado. */
export const cvDownloadName = (lang, format) =>
  `Nicolas_Gomez_CV_${lang.toUpperCase()}_${format === 'ats' ? 'ATS' : lang === 'es' ? 'Moderno' : 'Modern'}.pdf`

/**
 * Descarga directa cuando no hay nada que elegir: el idioma del sitio tiene un solo archivo, o no tiene
 * ninguno y en total existe uno solo. Devuelve { lang, format, href, download }, o null si hay opciones
 * y toca abrir el selector.
 */
export function cvDirect(lang) {
  const own = cvFormatsFor(lang)
  const rest = cvFormatsFor(otherLang(lang))
  const pick = own.length === 1 ? [lang, own[0]] : !own.length && rest.length === 1 ? [otherLang(lang), rest[0]] : null
  if (!pick) return null
  const [l, format] = pick
  return { lang: l, format, href: cvFile(l, format), download: cvDownloadName(l, format) }
}
