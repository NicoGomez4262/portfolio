import { PROFILE } from '../data/content.js'
import { useApp } from '../hooks/useApp.jsx'
import Icon from './ui/Icon.jsx'

export default function Footer() {
  const { t } = useApp()
  const year = new Date().getFullYear()
  const btn =
    'grid size-11 place-items-center rounded-full border border-line text-ink-faint transition hover:border-accent/50 hover:text-accent'

  return (
    <footer className="border-t border-line px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold text-ink">{PROFILE.name}</p>
          <p className="mt-1 font-mono text-[11px] text-ink-faint">
            © {year} · {t.footerNote}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a href={PROFILE.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className={btn}>
            <Icon name="github" size={16} />
          </a>
          {PROFILE.linkedin && (
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className={btn}>
              <Icon name="linkedin" size={16} />
            </a>
          )}
          <a href={`mailto:${PROFILE.email}`} aria-label={PROFILE.email} className={btn}>
            <Icon name="mail" size={16} />
          </a>
          <a href="#top" aria-label="Back to top" className={btn}>
            <Icon name="arrowDown" size={16} className="rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  )
}
