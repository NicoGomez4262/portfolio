import { ABOUT } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal.jsx'

export default function About({ index }) {
  const { lang, t } = useApp()
  const copy = ABOUT[lang]

  return (
    <Section id="about" index={index} kicker={t.aboutKicker} title={t.aboutTitle}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="space-y-5">
          {copy.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className={i === 0 ? 'text-lg leading-relaxed text-ink sm:text-xl' : 'text-base leading-relaxed text-ink-dim sm:text-[1.05rem]'}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <div>
          <Reveal>
            <p className="mb-5 font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">{t.focusLabel}</p>
          </Reveal>
          <RevealGroup className="divide-y divide-line-soft border-y border-line-soft" stagger={0.05}>
            {copy.focus.map((f, i) => (
              <RevealItem key={f}>
                <div className="flex items-center gap-4 py-3.5">
                  <span className="font-mono text-[11px] text-accent tabular">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[0.95rem] text-ink">{f}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}
