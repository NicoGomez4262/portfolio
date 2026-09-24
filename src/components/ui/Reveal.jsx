import { motion, useReducedMotion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce.js'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Aparición al entrar en pantalla. `delay` escalona elementos hermanos.
 * Respeta prefers-reduced-motion: sin movimiento, solo el contenido.
 */
export default function Reveal({ children, delay = 0, y = 22, className = '' }) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInViewOnce()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.62, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Contenedor que escalona a sus hijos directos envueltos en <RevealItem>. */
export function RevealGroup({ children, className = '', stagger = 0.08 }) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInViewOnce()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className = '', y = 18 }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}
