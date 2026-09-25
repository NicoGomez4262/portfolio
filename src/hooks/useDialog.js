import { useEffect, useRef } from 'react'
import { lockScroll, unlockScroll } from './scrollLock.js'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Comportamiento común de los diálogos modales: bloquea el scroll del fondo, pone el foco inicial,
 * atrapa Tab / Shift+Tab dentro del panel y cierra con Escape.
 * Devolver el foco al disparador le toca a quien abre el diálogo.
 */
export function useDialog(panelRef, { onClose, initialFocus } = {}) {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    lockScroll()

    const items = () => [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.getClientRects().length > 0)
    ;(initialFocus?.current ?? items()[0] ?? panel).focus({ preventScroll: true })

    const onKey = (e) => {
      if (e.key === 'Escape') {
        // Captura en document: el Escape no llega al menú móvil que pueda estar debajo.
        e.stopPropagation()
        onCloseRef.current?.()
        return
      }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) {
        e.preventDefault()
        return
      }
      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement
      if (!panel.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      unlockScroll()
    }
  }, [panelRef, initialFocus])
}
