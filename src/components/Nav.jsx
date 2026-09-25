import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, PROFILE } from '../data/content.js'
import { sectionVisible } from './ui/sections.js'
import { useApp, useActiveSection } from '../hooks/useApp.jsx'
import { lockScroll, unlockScroll } from '../hooks/scrollLock.js'
import Icon from './ui/Icon.jsx'

const ITEMS = NAV.filter((n) => sectionVisible(n.id))
// Se observan también las secciones fuera del menú, para no dejar resaltado un enlace viejo.
const IDS = ['top', 'about', ...ITEMS.map((n) => n.id), 'education']

export default function Nav() {
  const { lang, theme, toggleLang, toggleTheme, t, openCv } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    if (!open) return
    lockScroll()
    return unlockScroll
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const iconBtn =
    'grid size-11 place-items-center rounded-full border border-line text-ink-dim transition hover:border-accent/50 hover:text-accent'

  const controls = (
    <>
      <button
        type="button"
        onClick={toggleLang}
        className="flex h-11 items-center gap-1 rounded-full border border-line px-3.5 font-mono text-xs font-medium text-ink-dim transition hover:border-accent/50 hover:text-accent"
      >
        {/* El nombre accesible empieza con el texto visible (WCAG 2.5.3) y luego explica la acción. */}
        <span className={lang === 'en' ? 'text-accent' : ''}>EN</span>
        <span className="text-ink-faint">/</span>
        <span className={lang === 'es' ? 'text-accent' : ''}>ES</span>
        <span className="sr-only" lang={lang === 'en' ? 'es' : 'en'}>
          {' '}
          — {t.langLabel}
        </span>
      </button>
      <button type="button" onClick={toggleTheme} aria-label={t.themeLabel} className={iconBtn}>
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
      </button>
    </>
  )

  return (
    <>
      <a
        href="#hardware"
        className="sr-only z-[70] rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:inline-flex focus:h-11 focus:items-center"
      >
        {t.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
          <a href="#top" className="group flex h-11 min-w-11 items-center gap-2.5 font-display text-sm font-semibold text-ink">
            <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface font-mono text-[11px] text-accent transition group-hover:border-accent/50">
              {PROFILE.initials}
            </span>
            <span className="hidden sm:inline">{PROFILE.shortName}</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative flex h-11 items-center rounded-full px-3.5 text-sm transition ${
                    active === item.id ? 'text-ink' : 'text-ink-dim hover:text-ink'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-x-0 inset-y-1.5 rounded-full border border-line bg-surface"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item[lang]}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">{controls}</div>
            <button
              type="button"
              onClick={(e) => openCv(e.currentTarget)}
              aria-haspopup="dialog"
              className="hidden h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-ink transition hover:brightness-110 md:inline-flex"
            >
              <Icon name="download" size={15} />
              {t.ctaCvShort}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={t.menuLabel}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`${iconBtn} lg:hidden`}
            >
              <Icon name={open ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-full flex-col justify-center gap-1 px-6 pt-16 pb-10">
              {ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.04, duration: 0.3 }}
                  className="flex items-baseline border-b border-line-soft py-4 font-display text-2xl font-medium text-ink"
                >
                  <span className="mr-4 font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {item[lang]}
                </motion.a>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {controls}
                <button
                  type="button"
                  onClick={(e) => openCv(e.currentTarget)}
                  aria-haspopup="dialog"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink"
                >
                  <Icon name="download" size={15} />
                  {t.ctaCvShort}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
