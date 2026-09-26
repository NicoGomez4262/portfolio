import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react'
import { UI } from '../data/content.js'

const AppCtx = createContext(null)

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* modo privado o almacenamiento bloqueado: seguimos sin persistir */
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => (read('ng-theme', 'dark') === 'light' ? 'light' : 'dark'))
  const [lang, setLang] = useState(() => (read('ng-lang', 'en') === 'es' ? 'es' : 'en'))
  const [cvOpen, setCvOpen] = useState(false)
  const cvTrigger = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    write('ng-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
    write('ng-lang', lang)
  }, [lang])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'es' : 'en')), [])

  // Diálogo de la hoja de vida: se abre desde un botón de descarga y devuelve el foco a ese botón.
  const openCv = useCallback((trigger) => {
    cvTrigger.current = trigger ?? null
    setCvOpen(true)
  }, [])
  const closeCv = useCallback(() => {
    setCvOpen(false)
    const el = cvTrigger.current
    if (el?.isConnected) el.focus({ preventScroll: true })
  }, [])

  return (
    <AppCtx.Provider value={{ theme, lang, toggleTheme, toggleLang, t: UI[lang], cvOpen, openCv, closeCv }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}

/** Devuelve el id de la sección visible, para resaltarla en la navegación. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids])

  return active
}
