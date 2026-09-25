import { SOFTWARE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import { RevealGroup, RevealItem } from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'
import Media, { resolveMedia } from './ui/Media.jsx'

function SoftwareCard({ p, lang, t }) {
  const copy = p[lang]
  const link = 'inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 font-mono text-[11px] tracking-wide transition'
  // Captura opcional: public/media/software/<id>/screen.webp. Sin archivo, la tarjeta no muestra hueco.
  const shot = `/media/software/${p.id}/screen`
  const hasShot = Boolean(resolveMedia(shot, { allowVideo: false }))

  return (
    <article id={`sw-${p.id}`} className="xlink card card-hover flex h-full scroll-mt-24 flex-col overflow-hidden">
      {hasShot && <Media base={shot} alt={p.name} video={false} className="border-b border-line" />}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
          {p.wip && (
            <span className="rounded-full border border-copper/40 bg-copper/10 px-2 py-0.5 font-mono text-[10px] tracking-wide text-copper">{t.wip}</span>
          )}
          <span className="ml-auto font-mono text-[11px] text-ink-faint tabular">{p.year}</span>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">{copy.tagline}</p>
        {copy.facts && <p className="mt-3 font-mono text-[11px] tracking-wide text-accent">{copy.facts}</p>}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded border border-line-soft bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-dim">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className={`${link} border-accent/40 bg-accent/10 text-accent hover:bg-accent/20`}>
              {t.viewDemo}
              <Icon name="arrowUpRight" size={12} />
            </a>
          )}
          {p.repo ? (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className={`${link} border-line text-ink-dim hover:border-accent/50 hover:text-accent`}>
              <Icon name="github" size={13} />
              {t.viewCode}
            </a>
          ) : (
            p.private && (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
                <Icon name="lock" size={12} />
                {t.privateNote}
              </span>
            )
          )}
          {p.hardware && (
            <a href={`#hw-${p.hardware}`} className={`${link} border-line text-ink-dim hover:border-accent/50 hover:text-accent`}>
              <Icon name="chip" size={13} />
              {t.toHardware}
              <Icon name="arrowRight" size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Software({ index }) {
  const { lang, t } = useApp()

  return (
    <Section id="software" index={index} kicker={t.swKicker} title={t.swTitle} intro={t.swIntro}>
      <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={0.05}>
        {SOFTWARE.map((p) => (
          <RevealItem key={p.id}>
            <SoftwareCard p={p} lang={lang} t={t} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
