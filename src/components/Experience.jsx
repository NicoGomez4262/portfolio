import { EXPERIENCE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'

function Entry({ item, lang, t, delay }) {
  const copy = item[lang]

  return (
    <li className="relative pl-9 sm:pl-12">
      <span
        aria-hidden
        className={`absolute top-1.5 left-0 z-10 grid size-6 place-items-center rounded-full border sm:left-[0.1875rem] ${
          item.current ? 'border-accent bg-bg' : 'border-line bg-surface'
        }`}
      >
        <span className={`size-1.5 rounded-full ${item.current ? 'live-dot bg-accent' : 'bg-ink-faint'}`} />
      </span>

      <Reveal delay={delay}>
        <div className={`card card-hover ${item.compact ? 'p-5' : 'p-5 sm:p-7'}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
            <h3 className={`font-semibold text-ink ${item.compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>{copy.role}</h3>
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide whitespace-nowrap text-ink-faint">
              {item.current && (
                <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] tracking-[0.12em] text-accent uppercase">
                  {t.current}
                </span>
              )}
              {item.dates[lang]}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-accent">
            {item.org} <span className="text-ink-faint">· {item.place}</span>
          </p>

          <ul className={`space-y-2.5 ${item.compact ? 'mt-3' : 'mt-5'}`}>
            {copy.bullets.map((b, i) => (
              <li key={b} className={`flex gap-3 text-sm leading-relaxed ${i === 0 && !item.compact ? 'text-ink' : 'text-ink-dim'}`}>
                <span aria-hidden className={`mt-2 h-px w-3 shrink-0 ${i === 0 && !item.compact ? 'bg-accent' : 'bg-ink-faint/60'}`} />
                {b}
              </li>
            ))}
          </ul>

          {item.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded border border-line-soft bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-dim">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </li>
  )
}

export default function Experience() {
  const { lang, t } = useApp()

  return (
    <Section id="experience" index="02" kicker={t.expKicker} title={t.expTitle}>
      <ol className="relative max-w-4xl space-y-5 before:absolute before:top-2 before:bottom-2 before:left-3 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-line before:to-transparent sm:before:left-[0.9375rem]">
        {EXPERIENCE.map((item, i) => (
          <Entry key={item.id} item={item} lang={lang} t={t} delay={i * 0.06} />
        ))}
      </ol>
    </Section>
  )
}
