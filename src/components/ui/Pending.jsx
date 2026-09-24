import { useApp } from '../../hooks/useApp.jsx'

/**
 * Hueco de diseño para un dato aún sin confirmar (⚠ PENDIENTE en content.js).
 * Se ve como una franja rayada con "to be confirmed", nunca como texto inventado.
 */
export default function Pending({ label, className = '' }) {
  const { t } = useApp()
  return (
    <span
      className={`hatch inline-flex items-center rounded border border-dashed border-line px-2 py-0.5 font-mono text-[10px] tracking-wider text-ink-faint uppercase ${className}`}
    >
      {label ?? t.pending}
    </span>
  )
}
