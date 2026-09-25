import { useEffect, useRef, useState } from 'react'
import { PROFILE, whatsappUrl } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

function CopyButton({ text, label, t }) {
  const [done, setDone] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setDone(false), 1800)
    } catch {
      /* el navegador bloqueó el portapapeles: el texto sigue siendo seleccionable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-line px-4 font-mono text-[12px] text-ink-dim transition hover:border-accent/50 hover:text-accent"
    >
      <Icon name={done ? 'check' : 'copy'} size={13} />
      <span aria-live="polite">{done ? t.copied : label ?? t.copy}</span>
    </button>
  )
}

const cardLink = 'card card-hover group flex h-full min-h-[5.5rem] w-full items-center gap-4 p-5 text-left'
const cardIcon =
  'grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition group-hover:border-accent/40'

/** Contacto, en orden de rapidez: WhatsApp, correo, LinkedIn, GitHub y hoja de vida. */
export default function Contact({ index }) {
  const { lang, t, openCv } = useApp()

  const links = [
    { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: PROFILE.shortName, href: PROFILE.linkedin },
    { id: 'github', icon: 'github', label: 'GitHub', value: `@${PROFILE.githubUser}`, href: PROFILE.github },
  ].filter((l) => l.href)

  return (
    <Section id="contact" index={index} kicker={t.contactKicker} title={t.contactTitle} intro={t.contactBody}>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card relative h-full overflow-hidden p-6 sm:p-8">
            <span aria-hidden className="pcb-dots pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">
                <span className="live-dot size-1.5 rounded-full bg-accent" />
                {t.waLabel}
              </p>
              <a
                href={`tel:+${PROFILE.whatsapp}`}
                className="mt-2 inline-flex min-h-11 items-center font-display text-2xl font-semibold whitespace-nowrap text-ink transition hover:text-accent sm:text-3xl"
              >
                {PROFILE.phone}
              </a>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink transition hover:brightness-110"
                >
                  <Icon name="whatsapp" size={18} />
                  {t.waCta}
                </a>
                <CopyButton text={PROFILE.phone} label={t.copyNumber} t={t} />
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">{t.emailLabel}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex min-h-11 min-w-0 items-center font-display text-lg font-semibold break-all text-ink transition hover:text-accent sm:text-xl"
                  >
                    {PROFILE.email}
                  </a>
                  <CopyButton text={PROFILE.email} t={t} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {links.map((l, i) => (
            <Reveal key={l.id} delay={0.06 * (i + 1)}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={cardLink}>
                <span className={cardIcon}>
                  <Icon name={l.icon} size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">{l.label}</span>
                  <span className="mt-0.5 block truncate text-ink">{l.value}</span>
                </span>
                <Icon name="arrowUpRight" size={16} className="shrink-0 text-ink-faint transition group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.18}>
            <button type="button" onClick={(e) => openCv(e.currentTarget)} aria-haspopup="dialog" className={cardLink}>
              <span className={cardIcon}>
                <Icon name="file" size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">PDF</span>
                <span className="mt-0.5 block truncate text-ink">{t.ctaCvShort}</span>
              </span>
              <Icon name="download" size={16} className="shrink-0 text-ink-faint transition group-hover:text-accent" />
            </button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
