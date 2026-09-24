import { useEffect, useRef, useState } from 'react'

/**
 * Marca `true` la primera vez que el elemento entra en pantalla, y deja de observar.
 * Sirve para disparar las animaciones de entrada sin repetirlas al volver a subir.
 */
export function useInViewOnce({ margin = '0px 0px -70px 0px', threshold = 0 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin IntersectionObserver, o con la pestaña oculta (el observer no dispara),
    // mostramos el contenido de una vez: nunca debe quedar invisible.
    if (typeof IntersectionObserver === 'undefined' || document.visibilityState === 'hidden') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: margin, threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [margin, threshold])

  return [ref, inView]
}
