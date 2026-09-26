import { EXPERIENCE, tx } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'
import { InstLink, RichText } from './ui/InstLink.jsx'

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
        <span className={`size-1.5 rounded-full ${item.current ? 'bg-accent' : 'bg-ink-faint'}`} />
      </span>

      <Reveal delay={delay}>
        <div className={`card card-hover ${item.compact ? 'p-5' : 'p-5 sm:p-7'}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5">
            <h4 className={`font-semibold text-ink ${item.compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>{copy.role}</h4>
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
            {item.org ? <InstLink id={item.org} /> : tx(item.orgLabel, lang)}
            {item.place && <span className="text-ink-faint"> · {item.place}</span>}
          </p>

          <ul className={`space-y-2.5 ${item.compact ? 'mt-3' : 'mt-5'}`}>
            {copy.bullets.map((b, i) => (
              <li key={b} className={`flex gap-3 text-sm leading-relaxed ${i === 0 && !item.compact ? 'text-ink' : 'text-ink-dim'}`}>
                <span aria-hidden className={`mt-2 h-px w-3 shrink-0 ${i === 0 && !item.compact ? 'bg-accent' : 'bg-ink-faint/60'}`} />
                <span>
                  <RichText text={b} />
                </span>
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

          {item.link && (
            <a
              href={item.link}
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 font-mono text-[12px] tracking-wide text-ink-dim transition hover:border-accent/50 hover:text-accent"
            >
              {t.expSoftwareLink}
              <Icon name="arrowRight" size={13} />
            </a>
          )}
        </div>
      </Reveal>
    </li>
  )
}

/** Un bloque de experiencia con su propio título y línea de tiempo. */
function Timeline({ id, icon, title, items, lang, t }) {
  return (
    <div role="group" aria-labelledby={id}>
      <Reveal>
        <h3 id={id} className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-ink-dim uppercase">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent">
            <Icon name={icon} size={16} />
          </span>
          {title}
          <span aria-hidden className="h-px flex-1 bg-line-soft" />
          <span aria-hidden className="text-ink-faint tabular">{String(items.length).padStart(2, '0')}</span>
        </h3>
      </Reveal>
      <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-3 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-line before:to-transparent sm:before:left-[0.9375rem]">
        {items.map((item, i) => (
          <Entry key={item.id} item={item} lang={lang} t={t} delay={i * 0.06} />
        ))}
      </ol>
    </div>
  )
}

export default function Experience({ index }) {
  const { lang, t } = useApp()
  const academic = EXPERIENCE.filter((e) => e.kind === 'academic')
  const professional = EXPERIENCE.filter((e) => e.kind === 'professional')

  return (
    <Section id="experience" index={index} kicker={t.expKicker} title={t.expTitle}>
      <div className="max-w-4xl space-y-14 md:space-y-16">
        <Timeline id="exp-academic" icon="cap" title={t.expAcademic} items={academic} lang={lang} t={t} />
        <Timeline id="exp-professional" icon="briefcase" title={t.expProfessional} items={professional} lang={lang} t={t} />
      </div>
    </Section>
  )
}
