/**
 * Bloqueo del scroll del fondo con contador: el menú móvil, el modal de proyecto, el visor de medios y el
 * diálogo de la hoja de vida pueden abrirse uno encima de otro sin liberar el scroll antes de tiempo.
 * Cada cambio entre bloqueado y libre se avisa con el evento SCROLL_LOCK_EVENT (detail: true | false):
 * los carruseles de las tarjetas se pausan mientras hay algo abierto encima.
 */
let locks = 0

export const SCROLL_LOCK_EVENT = 'ng:scroll-lock'
export const isScrollLocked = () => locks > 0

const emit = () => window.dispatchEvent(new CustomEvent(SCROLL_LOCK_EVENT, { detail: locks > 0 }))

export function lockScroll() {
  if (locks++ === 0) {
    document.body.style.overflow = 'hidden'
    emit()
  }
}

export function unlockScroll() {
  if (locks === 0) return
  if (--locks === 0) {
    document.body.style.overflow = ''
    emit()
  }
}
