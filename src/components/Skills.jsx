import { SKILLS, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import { RevealGroup, RevealItem } from './ui/Reveal.jsx'
import Pending from './ui/Pending.jsx'

/** Un grupo de habilidades como tabla de hoja de datos. */
function Datasheet({ group, lang, t }) {
  return (
    <div className={`card card-hover flex h-full flex-col overflow-hidden ${group.pending ? 'border-dashed' : ''}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-3">
        <h3 className="font-display text-[0.95rem] font-semibold text-ink">{group[lang]}</h3>
        <span className="font-mono text-[10px] tracking-[0.16em] text-accent">{group.code}</span>
      </div>

      {group.pending ? (
        <div className="hatch flex flex-1 flex-col items-start justify-center gap-2 px-4 py-6">
          <Pending label={t.soon} />
          <p className="text-sm text-ink-faint">{t.pending}</p>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="sr-only">
            <tr>
              <th scope="col">{t.paramLabel}</th>
              <th scope="col">{t.valueLabel}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {group.rows.map((r) => (
              <tr key={tx(r.k, 'en')} className="align-top">
                <th scope="row" className="w-[34%] px-4 py-2.5 font-mono text-[10px] font-normal tracking-[0.12em] text-ink-faint uppercase">
                  {tx(r.k, lang)}
                </th>
                <td className="px-4 py-2.5 pl-0 font-mono text-[12.5px] leading-relaxed text-ink">{tx(r.v, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default function Skills({ index }) {
  const { lang, t } = useApp()

  return (
    <Section id="skills" index={index} kicker={t.skillsKicker} title={t.skillsTitle} intro={t.skillsIntro}>
      <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {SKILLS.map((g) => (
          <RevealItem key={g.id} className={g.id === 'embedded' ? 'lg:row-span-2' : ''}>
            <Datasheet group={g} lang={lang} t={t} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
