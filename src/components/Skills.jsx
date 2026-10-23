import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SKILLS, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'
import { pad2 } from './ui/media.js'

const EASE = [0.22, 1, 0.36, 1]
const ALL = 'all'
const split = (value) => String(value).split(' · ')

/** Cada fila partida en chips, con EN y ES alineados y la marca de los que van en `top`. */
const GROUPS = SKILLS.filter((g) => g.rows?.length).map((g, i) => {
  const rows = g.rows.map((r) => {
    const es = split(tx(r.v, 'es'))
    return { k: r.k, chips: split(tx(r.v, 'en')).map((en, j) => ({ en, es: es[j] ?? en, top: Boolean(g.top?.includes(en)) })) }
  })
  const chips = rows.flatMap((r) => r.chips)
  const highlights = (g.top ?? []).map((en) => chips.find((c) => c.en === en)).filter(Boolean)
  return { ...g, pin: pad2(i + 1), rows, count: chips.length, highlights }
})
const TOTAL = GROUPS.reduce((n, g) => n + g.count, 0)

function Chip({ chip, lang, strong = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[12px] leading-snug ${
        strong ? 'border-accent/40 bg-accent/10 text-ink' : 'border-line bg-bg text-ink-dim'
      }`}
    >
      {chip[lang]}
    </span>
  )
}

function GroupIcon({ name, className = '' }) {
  return (
    <span aria-hidden className={`grid size-9 shrink-0 place-items-center rounded-lg border border-line text-accent transition-colors ${className}`}>
      <Icon name={name} size={18} />
    </span>
  )
}

/** Vista general: una ficha por área con lo esencial. Toda la ficha abre el detalle. */
function Overview({ lang, t, onSelect }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {GROUPS.map((g) => {
        const more = g.count - g.highlights.length
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelect(g.id)}
            aria-label={`${g[lang]} · ${t.skillsSee} (${g.count})`}
            className="card card-hover group/tile flex h-full cursor-pointer flex-col gap-4 p-4 text-left"
          >
            <span className="flex items-center gap-3">
              <GroupIcon name={g.icon} className="bg-surface-2 group-hover/tile:border-accent/50" />
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] tracking-[0.16em] text-ink-faint">{g.pin}</span>
                <span className="block font-display text-[0.95rem] leading-tight font-semibold text-ink">{g[lang]}</span>
              </span>
              <Icon name="arrowRight" size={15} className="shrink-0 text-ink-faint transition group-hover/tile:translate-x-0.5 group-hover/tile:text-accent" />
            </span>
            <span className="flex flex-wrap gap-1.5">
              {g.highlights.map((c) => (
                <Chip key={c.en} chip={c} lang={lang} />
              ))}
              {more > 0 && (
                <span className="inline-flex items-center rounded-md border border-dashed border-line px-2 py-1 font-mono text-[12px] leading-snug text-ink-faint tabular">
                  +{more}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** Detalle de un área: cada parámetro con sus chips; los de `top` van resaltados. */
function Detail({ group, lang, reduced }) {
  return (
    <div className="card overflow-hidden">
      <div className="pcb-dots flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3 sm:px-5">
        <GroupIcon name={group.icon} className="bg-surface" />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.16em] text-ink-faint">{group.pin}</p>
          <h3 className="font-display text-base leading-tight font-semibold text-ink sm:text-lg">{group[lang]}</h3>
        </div>
        <span className="font-mono text-[11px] text-ink-faint tabular">{group.count}</span>
      </div>
      <motion.dl
        className="divide-y divide-line-soft"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.035 } } }}
      >
        {group.rows.map((r) => (
          <motion.div
            key={tx(r.k, 'en')}
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 6 },
              show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3, ease: EASE } },
            }}
            className="grid gap-2 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-4 sm:px-5"
          >
            <dt className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase">{tx(r.k, lang)}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {r.chips.map((c) => (
                <Chip key={c.en} chip={c} lang={lang} strong={c.top} />
              ))}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </div>
  )
}

/**
 * Hoja de datos con filtro: pestañas por área (con su cantidad) sobre una vista general que muestra lo
 * esencial de cada una. Elegir un área, en las pestañas o en su ficha, muestra el detalle en chips.
 */
export default function Skills({ index }) {
  const { lang, t } = useApp()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(ALL)
  const railRef = useRef(null)

  const tabs = [{ id: ALL, label: t.skillsAll, count: TOTAL }, ...GROUPS.map((g) => ({ id: g.id, label: tx(g.short, lang), count: g.count }))]
  const group = GROUPS.find((g) => g.id === active)

  const select = (id, { focus = false } = {}) => {
    setActive(id)
    const rail = railRef.current
    const tab = rail?.querySelector(`[data-tab="${id}"]`)
    if (!rail || !tab) return
    if (focus) tab.focus()
    // La pestaña elegida queda a la vista dentro del riel (en móvil se desplaza de lado).
    rail.scrollTo({ left: tab.offsetLeft - (rail.clientWidth - tab.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' })
    // Desde una ficha de abajo, el detalle arranca arriba: se sube hasta las pestañas.
    if (rail.getBoundingClientRect().top < 64) rail.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
  }

  const onKeyDown = (e) => {
    const i = tabs.findIndex((tab) => tab.id === active)
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(tabs[(next + tabs.length) % tabs.length].id, { focus: true })
  }

  return (
    <Section id="skills" index={index} kicker={t.skillsKicker} title={t.skillsTitle} intro={t.skillsIntro}>
      <Reveal>
        <div
          ref={railRef}
          role="tablist"
          aria-label={t.skillsAreas}
          onKeyDown={onKeyDown}
          className="flex gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const on = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`skills-tab-${tab.id}`}
                data-tab={tab.id}
                aria-selected={on}
                aria-controls="skills-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => select(tab.id)}
                className={`relative inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-colors ${
                  on ? 'text-accent-ink' : 'text-ink-dim hover:text-ink'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="skills-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
                <span className={`relative font-mono text-[10px] tabular ${on ? 'text-accent-ink/75' : 'text-ink-faint'}`}>{tab.count}</span>
              </button>
            )
          })}
        </div>

        <div id="skills-panel" role="tabpanel" aria-labelledby={`skills-tab-${active}`} className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
            >
              {group ? <Detail group={group} lang={lang} reduced={reduced} /> : <Overview lang={lang} t={t} onSelect={select} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  )
}
