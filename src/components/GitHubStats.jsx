import { PROFILE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import { useGitHub } from '../hooks/useGitHub.js'
import Reveal from './ui/Reveal.jsx'
import Counter from './ui/Counter.jsx'
import Icon from './ui/Icon.jsx'

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
                      <div className="flex flex-wrap gap-2">
                        {data.languages.map((l) => (
                          <span key={l.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm text-ink-dim">
                            {l.name}
                            <span className="font-mono text-[11px] text-accent">×{l.count}</span>
                          </span>
                        ))}
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
