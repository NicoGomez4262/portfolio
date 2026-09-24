import { useState } from 'react'
import { PROFILE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Section from './ui/Section.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

function CopyButton({ text, t }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* el navegador bloqueó el portapapeles: el correo sigue siendo seleccionable */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-line px-4 font-mono text-[12px] text-ink-dim transition hover:border-accent/50 hover:text-accent"
    >
      <Icon name={done ? 'check' : 'copy'} size={13} />
      <span aria-live="polite">{done ? t.copied : t.copy}</span>
    </button>
  )
}

export default function Contact({ index }) {
  const { t } = useApp()

  const links = [
    { id: 'github', icon: 'github', label: 'GitHub', value: `@${PROFILE.githubUser}`, href: PROFILE.github },
    PROFILE.linkedin && { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', value: PROFILE.shortName, href: PROFILE.linkedin },
  ].filter(Boolean)

  return (
    <Section id="contact" index={index} kicker={t.contactKicker} title={t.contactTitle} intro={t.contactBody}>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="card relative h-full overflow-hidden p-6 sm:p-8">
            <span aria-hidden className="pcb-dots pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">{t.emailLabel}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className="min-w-0 font-display text-xl font-semibold break-all text-ink transition hover:text-accent sm:text-2xl">
                  {PROFILE.email}
                </a>
                <CopyButton text={PROFILE.email} t={t} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink transition hover:brightness-110"
                >
                  <Icon name="mail" size={16} />
                  {t.ctaContact}
                </a>
                <a
                  href={PROFILE.cv}
                  download
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-medium text-ink transition hover:border-accent/50 hover:text-accent"
                >
                  <Icon name="download" size={16} />
                  {t.ctaCv}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {links.map((l, i) => (
            <Reveal key={l.id} delay={0.06 * (i + 1)}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="card card-hover group flex h-full min-h-[5.5rem] items-center gap-4 p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition group-hover:border-accent/40">
                  <Icon name={l.icon} size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">{l.label}</span>
                  <span className="mt-0.5 block truncate text-ink">{l.value}</span>
                </span>
                <Icon name="arrowUpRight" size={16} className="text-ink-faint transition group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.18}>
            <a
              href={PROFILE.cv}
              download
              className="card card-hover group flex h-full min-h-[5.5rem] items-center gap-4 p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent transition group-hover:border-accent/40">
                <Icon name="file" size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">PDF</span>
                <span className="mt-0.5 block truncate text-ink">{t.ctaCvShort}</span>
              </span>
              <Icon name="download" size={16} className="text-ink-faint transition group-hover:text-accent" />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
