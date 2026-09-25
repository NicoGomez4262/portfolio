/**
 * Bloqueo del scroll del fondo con contador: el menú móvil, el modal de proyecto y el
 * diálogo de la hoja de vida pueden abrirse uno encima de otro sin liberar el scroll antes de tiempo.
 */
let locks = 0

export function lockScroll() {
  if (locks++ === 0) document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  if (locks === 0) return
  if (--locks === 0) document.body.style.overflow = ''
}
