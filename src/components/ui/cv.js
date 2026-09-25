import manifest from 'virtual:media-manifest'
import { CV_BACKUP, CV_FILES, CV_FORMATS } from '../../data/content.js'

/** Archivo disponible para un idioma y formato: el propio, o el respaldo generado. null si no hay ninguno. */
export function cvFile(lang, format) {
  const own = CV_FILES[lang]?.[format]
  if (own && manifest.has(own)) return own
  const backup = CV_BACKUP[lang]?.[format]
  return backup && manifest.has(backup) ? backup : null
}

/** ¿Hay al menos una hoja de vida descargable en ese idioma? */
export const hasCv = (lang) => CV_FORMATS.some((f) => cvFile(lang, f))

/** Nombre del archivo descargado: el mismo para el archivo propio y para el respaldo. */
export const cvDownloadName = (lang, format) =>
  `Nicolas_Gomez_CV_${lang.toUpperCase()}_${format === 'ats' ? 'ATS' : lang === 'es' ? 'Moderno' : 'Modern'}.pdf`
