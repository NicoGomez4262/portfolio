import { LAB, SECTIONS } from '../../data/content.js'
import { resolveMedia } from './Media.jsx'

/** Fotos del laboratorio que ya existen en public/media/lab/. */
export const LAB_FILLED = LAB.filter((s) => resolveMedia(`/media/lab/${s.id}`))

/**
 * Modo de la galería del laboratorio:
 *  'all'    → los 9 espacios, con placeholder donde falte foto
 *  'filled' → solo las fotos existentes (modo 'auto' con 3 o más fotos)
 *  'hidden' → sección y enlace ocultos
 */
export const LAB_MODE =
  SECTIONS.lab === 'auto' ? (LAB_FILLED.length >= 3 ? 'filled' : 'hidden') : SECTIONS.lab ? 'all' : 'hidden'

export const sectionVisible = (id) => (id === 'lab' ? LAB_MODE !== 'hidden' : SECTIONS[id] !== false)

/**
 * Orden de las secciones numeradas, pensado para un reclutador de hardware (Kiwibot / robot.com):
 * experiencia primero, después la prueba técnica, y el perfil y la formación como contexto al final.
 * La página, la nav, el menú móvil y el número de cada encabezado salen de aquí.
 */
export const ORDER = ['experience', 'hardware', 'skills', 'lab', 'software', 'about', 'education', 'contact'].filter(sectionVisible)

/** Número de una sección ("01", "02"…) según su posición en ORDER. */
export const sectionIndex = (id) => String(ORDER.indexOf(id) + 1).padStart(2, '0')
