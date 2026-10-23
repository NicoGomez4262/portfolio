import { PROFILE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { useGitHub } from '../hooks/useGitHub.js'
import Reveal from './ui/Reveal.jsx'
import Counter from './ui/Counter.jsx'
import Icon from './ui/Icon.jsx'
import { LANGS, inkOn } from './ui/langs.js'

/** Color de un lenguaje que no está en LANGS (el cian del sitio). */
const FALLBACK = '#22d3ee'

export default function GitHubStats() {
  const { lang, t } = useApp()
  const { status, data } = useGitHub()

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })

  // Un cero grande resta: solo se muestran los valores mayores que 0.
  const stats = data
    ? [
        { k: data.repos, v: t.statsRepos },
        { k: data.languages.length, v: t.statsLangs },
        { k: data.stars, v: t.statsStars },
        { k: data.followers, v: t.statsFollowers },
        { k: data.since, v: t.statsSince, raw: true },
      ]
        .filter((s) => typeof s.k === 'number' && s.k > 0)
        .slice(0, 4)
    : []

  return (
    <section aria-labelledby="gh-title" className="relative px-4 py-14 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-10">
            <span aria-hidden className="pcb-grid pointer-events-none absolute inset-0 opacity-70" />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {t.statsKicker}
                  </p>
                  <h2 id="gh-title" className="text-2xl font-semibold text-ink">
                    {t.statsTitle}
                  </h2>
                </div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-bg px-4 font-mono text-xs text-ink-dim transition hover:border-accent/50 hover:text-accent"
                >
                  <Icon name="github" size={14} />@{PROFILE.githubUser}
                  <Icon name="arrowUpRight" size={12} />
                </a>
              </div>

              {status === 'loading' && !data && <p className="mt-8 font-mono text-sm text-ink-faint">{t.statsLoading}</p>}
              {status === 'error' && <p className="mt-8 font-mono text-sm text-ink-faint">{t.statsError}</p>}

              {data && stats.length > 0 && (
                <>
                  <dl className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {stats.map((s) => (
                      <div key={s.v}>
                        <dt className="sr-only">{s.v}</dt>
                        <dd className="font-display text-3xl font-semibold text-ink sm:text-4xl">{s.raw ? s.k : <Counter value={s.k} />}</dd>
                        <dd aria-hidden className="mt-1.5 font-mono text-[11px] tracking-wider text-ink-faint uppercase">
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {data.languages.length > 0 && (
                    <div className="mt-9">
                      <p className="mb-3 font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">{t.statsStack}</p>
                      <div className="flex flex-wrap gap-x-2.5">
                        {data.languages.map((l) => {
                          const { color = FALLBACK, logo } = LANGS[l.name] ?? {}
                          const repos = `${l.count} repo${l.count === 1 ? '' : 's'}`
                          return (
                            <a
                              key={l.name}
                              href={`${PROFILE.github}?tab=repositories&language=${encodeURIComponent(l.name.toLowerCase())}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label={`${l.name} · ${repos}`}
                              className="group/badge inline-flex h-11 items-center"
                            >
                              {/* Badge al estilo de shields.io: etiqueta gris con el logo y valor con el color del lenguaje. */}
                              <span
                                aria-hidden
                                className="relative inline-flex h-6 overflow-hidden rounded-[4px] text-[12px] leading-none shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition duration-200 group-hover/badge:-translate-y-0.5 group-hover/badge:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.45)]"
                                style={{ fontFamily: 'Verdana, "DejaVu Sans", Geneva, sans-serif' }}
                              >
                                <span className="inline-flex items-center gap-1.5 bg-[#555] px-2 text-white [text-shadow:0_1px_0_rgba(1,1,1,0.3)]">
                                  {logo && (
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" focusable="false">
                                      <path d={logo} />
                                    </svg>
                                  )}
                                  {l.name}
                                </span>
                                <span className="inline-flex items-center px-2 tabular" style={{ background: color, color: inkOn(color) }}>
                                  {repos}
                                </span>
                                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-black/10" />
                              </span>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <p className="mt-8 border-t border-line pt-5 font-mono text-[11px] text-ink-faint">
                    {t.statsLive}
                    {data.lastPush && ` · ${t.statsLastPush} ${formatDate(data.lastPush)}`}
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
