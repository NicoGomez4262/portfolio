import { EXPERIENCE, HARDWARE_COUNT, PROFILE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Reveal from './ui/Reveal.jsx'
import Counter from './ui/Counter.jsx'

const TA_ROLES = EXPERIENCE.filter((e) => e.id.startsWith('ta-')).length

/** Franja de credenciales bajo el hero: promedio, monitorías, proyectos y promoción. */
export default function Credentials() {
  const { t } = useApp()

  const cells = [
    { id: 'gpa', value: <Counter value={Number(PROFILE.gpa)} decimals={2} />, unit: `/ ${PROFILE.gpaScale}`, label: t.credGpa },
    { id: 'ta', value: <Counter value={TA_ROLES} />, label: t.credTa },
    { id: 'hw', value: <Counter value={HARDWARE_COUNT} />, label: t.credProjects },
    { id: 'class', value: PROFILE.graduation, label: t.credClass, prefix: true },
  ]

  return (
    <div className="relative px-4 sm:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4" style={{ gap: 1 }}>
          {cells.map((c) => (
            <div key={c.id} className="flex flex-col justify-between gap-3 bg-surface px-5 py-5 sm:px-7 sm:py-6">
              <dt className="order-2 font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
                {c.prefix ? `${c.label} ${c.value}` : c.label}
              </dt>
              <dd className="order-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
                {c.prefix ? <span className="text-accent">’{String(c.value).slice(2)}</span> : c.value}
                {c.unit && <span className="ml-1.5 font-mono text-sm font-normal text-ink-faint">{c.unit}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  )
}
