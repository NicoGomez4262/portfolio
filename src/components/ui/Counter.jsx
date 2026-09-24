import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'

/**
 * Número que cuenta hacia arriba la primera vez que entra en pantalla.
 * Muestra el valor final desde el principio si no hay animación, así nunca queda en 0.
 */
export default function Counter({ value, decimals = 0, duration = 1100 }) {
  const [ref, inView] = useInViewOnce({ margin: '0px 0px -40px 0px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(value)
  const [armed, setArmed] = useState(false)

  // Arranca desde 0 solo cuando la animación es posible.
  useEffect(() => {
    if (reduced || typeof value !== 'number') return
    setArmed(true)
  }, [reduced, value])

  useEffect(() => {
    if (!armed || !inView) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setN(value * (1 - Math.pow(1 - p, 3))) // ease-out cúbico
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [armed, inView, value, duration])

  const shown = armed && !inView ? 0 : n
  return (
    <span ref={ref} className="tabular">
      {typeof shown === 'number' ? shown.toFixed(decimals) : shown}
    </span>
  )
}
