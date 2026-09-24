import { LAB, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import { RevealGroup, RevealItem } from './ui/Reveal.jsx'
import Media from './ui/Media.jsx'

const ICONS = ['bench', 'chip', 'pcb', 'scope', 'wave', 'code', 'layers', 'pcb', 'bench']

export default function Lab() {
  const { lang, t } = useApp()

  return (
    <Section id="lab" index="04" kicker={t.labKicker} title={t.labTitle} intro={t.labIntro}>
      <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4" stagger={0.04}>
        {LAB.map((slot, i) => {
          const caption = tx(slot.caption, lang)
          const hint = tx(slot.hint, lang)
          return (
            <RevealItem key={slot.id}>
              <figure className="group overflow-hidden rounded-xl border border-line bg-surface transition hover:border-accent/40">
                <Media
                  base={`/media/lab/${slot.id}`}
                  alt={caption ?? `${t.labPhoto} ${slot.id}`}
                  width={1200}
                  height={900}
                  className="transition duration-500 group-hover:scale-[1.02]"
                  placeholder={{ icon: ICONS[i % ICONS.length], label: hint, sub: t.soon, fig: slot.id, compact: true }}
                />
                <figcaption className="flex items-center justify-between gap-2 border-t border-line px-3 py-2 font-mono text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  <span className="truncate">{caption ?? hint}</span>
                  <span className="text-accent">{slot.id}</span>
                </figcaption>
              </figure>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
