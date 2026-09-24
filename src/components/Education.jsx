import { motion, useReducedMotion } from 'framer-motion'
import { EDUCATION, LANGUAGES } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { useInViewOnce } from '../hooks/useInViewOnce.js'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import Pending from './ui/Pending.jsx'
import Icon from './ui/Icon.jsx'

function LevelBar({ level }) {
  const reduced = useReducedMotion()
  const [ref, inView] = useInViewOnce()
  return (
    <div ref={ref} className="flex gap-1.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.span
          key={n}
          initial={reduced ? false : { scaleX: 0 }}
          animate={reduced || inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: n * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`h-1.5 w-8 origin-left rounded-full ${n <= level ? 'bg-accent' : 'bg-line'}`}
        />
      ))}
    </div>
  )
}

export default function Education({ index }) {
  const { lang, t } = useApp()

  return (
    <Section id="education" index={index} kicker={t.eduKicker} title={t.eduTitle}>
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-4">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.06}>
              <article className="card card-hover p-5 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-ink sm:text-xl">{e[lang].degree}</h3>
                  <span className="font-mono text-[11px] tracking-wide text-ink-faint">{e.dates[lang]}</span>
                </div>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-accent">
                  <Icon name="cap" size={15} />
                  {e.org} <span className="text-ink-faint">· {e.place}</span>
                </p>
                {e[lang].detail && <p className="mt-4 font-mono text-sm text-ink">{e[lang].detail}</p>}

                {e.coursework !== undefined && (
                  <div className="mt-5 border-t border-line-soft pt-4">
                    <p className="mb-2.5 font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">{t.courseworkLabel}</p>
                    {e.coursework ? (
                      <div className="flex flex-wrap gap-1.5">
                        {e.coursework.map((c) => (
                          <span key={c} className="rounded border border-line-soft bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-dim">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        <Pending label={t.soon} />
                        <span className="hatch h-5 w-20 rounded border border-dashed border-line" aria-hidden />
                        <span className="hatch h-5 w-28 rounded border border-dashed border-line" aria-hidden />
                      </div>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card h-full p-5 sm:p-7">
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-ink">
              <Icon name="globe" size={18} className="text-accent" />
              {t.langTitle}
            </h3>
            <div className="space-y-6">
              {LANGUAGES.map((l) => (
                <div key={l.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-semibold text-ink">{l[lang].name}</h4>
                    <span className="font-mono text-[11px] tracking-wide text-accent">{l[lang].level}</span>
                  </div>
                  <div className="mt-3">
                    <LevelBar level={l.level} />
                  </div>
                  {l[lang].note && <p className="mt-2.5 font-mono text-[11px] text-ink-faint">{l[lang].note}</p>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
