import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { tx } from '../../data/content.js'
import { SCROLL_LOCK_EVENT, isScrollLocked } from '../../hooks/scrollLock.js'
import { fitClass, pad2 } from './media.js'
import { loadYouTube, youtubeWatchUrl } from './youtube.js'
import Icon from './Icon.jsx'

/** Tiempo en pantalla de cada foto mientras el carrusel corre solo. */
const IMAGE_MS = 5000
/** Tiempo que quedan visibles los controles después de un toque en pantallas táctiles. */
const TOUCH_CONTROLS_MS = 3200
const SWIPE_PX = 40

/** Sin reproducción automática con prefers-reduced-motion o con el ahorro de datos activado. */
const canAutoplay = () =>
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches && !navigator.connection?.saveData

/** ¿Foco de teclado? El foco que deja un clic en un punto o una flecha no debe congelar el carrusel. */
const keyboardFocus = (el) => {
  try {
    return el.matches(':focus-visible')
  } catch {
    return true
  }
}

/** Fondo de los medios que no llenan el cuadro: la misma imagen desenfocada, o blanco para los diagramas. */
export function Backdrop({ item }) {
  if (item.fit !== 'contain') return null
  if (item.bg === 'light') return <div aria-hidden className="absolute inset-0 bg-white" />
  const src = item.type === 'image' ? item.src : item.poster
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-black">
      {src && <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full scale-110 object-cover opacity-55 blur-2xl" />}
    </div>
  )
}

/** Marca de video o de YouTube sobre una miniatura. */
export function MediaBadge({ item }) {
  if (item.type === 'image') return null
  return (
    <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white uppercase">
      <Icon name={item.type === 'youtube' ? 'youtube' : 'playTri'} size={12} />
      {item.type === 'youtube' ? 'YouTube' : 'Video'}
    </span>
  )
}

/** Miniatura estática (bitácora del modal): foto, o póster con su marca si es video. */
export function MediaThumb({ item, alt }) {
  const src = item.type === 'image' ? item.src : item.poster
  return (
    <>
      <Backdrop item={item} />
      {src && <img src={src} alt={alt} loading="lazy" decoding="async" className={`relative h-full w-full ${fitClass(item)}`} />}
      <MediaBadge item={item} />
    </>
  )
}

/**
 * Puntos del carrusel: uno por medio, el activo alargado. Con `fillRef` el activo se llena con el avance
 * del medio actual (lo escribe el carrusel directo en el DOM, sin re-render por cuadro).
 */
export function Dots({ items, index, onSelect, lang, t, label, fillRef, dark = false }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center justify-center">
      {items.map((it, i) => {
        const active = i === index
        const track = dark
          ? active
            ? 'bg-white/25'
            : 'bg-white/45 group-hover/dot:bg-white/85'
          : active
            ? 'bg-ink-faint/30'
            : 'bg-line group-hover/dot:bg-ink-faint'
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${t.mediaGoTo} ${i + 1} ${t.mediaOf} ${items.length}: ${tx(it.caption, lang) ?? ''}`}
            aria-current={active ? 'true' : undefined}
            className="group/dot grid size-11 place-items-center"
          >
            <span className={`relative block h-1.5 overflow-hidden rounded-full ${active ? 'w-7' : 'w-1.5'} ${track}`}>
              {active && (
                <span
                  ref={fillRef}
                  className="absolute inset-0 origin-left bg-accent"
                  style={{ transform: fillRef ? 'scaleX(0)' : 'scaleX(1)' }}
                />
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ Diapositivas */

function ImageSlide({ item, alt, mediaRef, eager }) {
  useEffect(() => {
    mediaRef.current = { key: item.key, kind: 'image' }
    return () => {
      if (mediaRef.current?.key === item.key) mediaRef.current = null
    }
  }, [item.key, mediaRef])

  return (
    <>
      <Backdrop item={item} />
      <img
        src={item.src}
        alt={alt}
        draggable={false}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`relative h-full w-full ${fitClass(item)}`}
      />
    </>
  )
}

function VideoSlide({ item, alt, running, mediaRef, onEnded, onBlocked }) {
  const ref = useRef(null)

  useEffect(() => {
    mediaRef.current = { key: item.key, kind: 'video', el: ref.current }
    return () => {
      if (mediaRef.current?.key === item.key) mediaRef.current = null
    }
  }, [item.key, mediaRef])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!running) {
      video.pause()
      return
    }
    video.muted = true
    video.play()?.catch((err) => {
      // Reproducción automática bloqueada (p. ej. modo de bajo consumo): el carrusel queda en pausa.
      if (err?.name === 'NotAllowedError') onBlocked()
    })
  }, [running, onBlocked])

  return (
    <>
      <Backdrop item={item} />
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        playsInline
        preload={running ? 'auto' : 'none'}
        aria-label={alt}
        onEnded={() => onEnded(item.key)}
        onError={() => {
          // Sin video: queda el póster y el carrusel lo trata como una foto.
          if (mediaRef.current?.key === item.key) mediaRef.current = { key: item.key, kind: 'image' }
        }}
        className={`relative h-full w-full ${fitClass(item)}`}
      />
    </>
  )
}

function YouTubeSlide({ item, alt, running, mediaRef, onEnded, onPlay, t }) {
  const hostRef = useRef(null)
  const playerRef = useRef(null)
  const runningRef = useRef(running)
  const [state, setState] = useState('poster') // poster · ready · failed

  useEffect(() => {
    runningRef.current = running
  })

  useEffect(() => {
    mediaRef.current = { key: item.key, kind: 'youtube', player: null }
    return () => {
      if (mediaRef.current?.key === item.key) mediaRef.current = null
    }
  }, [item.key, mediaRef])

  // El reproductor se crea la primera vez que el carrusel pone a correr este video.
  useEffect(() => {
    if (!running || playerRef.current || state === 'failed') return
    let cancelled = false
    const fail = () => {
      setState('failed')
      if (mediaRef.current?.key === item.key) mediaRef.current = { key: item.key, kind: 'image' }
    }
    loadYouTube()
      .then((YT) => {
        if (cancelled || !hostRef.current || playerRef.current) return
        const el = document.createElement('div')
        hostRef.current.appendChild(el)
        playerRef.current = new YT.Player(el, {
          host: 'https://www.youtube-nocookie.com',
          videoId: item.id,
          width: '100%',
          height: '100%',
          playerVars: { autoplay: 1, mute: 1, playsinline: 1, rel: 0, modestbranding: 1 },
          events: {
            onReady: (e) => {
              e.target.getIframe?.().setAttribute('title', alt)
              e.target.mute()
              if (runningRef.current) e.target.playVideo()
              if (mediaRef.current?.key === item.key) mediaRef.current = { key: item.key, kind: 'youtube', player: e.target }
              setState('ready')
            },
            onStateChange: (e) => {
              if (e.data === YT.PlayerState.ENDED) onEnded(item.key)
            },
            onError: fail,
          },
        })
      })
      .catch(() => {
        if (!cancelled) fail()
      })
    return () => {
      cancelled = true
    }
  }, [running, state, item.key, item.id, alt, mediaRef, onEnded])

  useEffect(() => {
    const player = playerRef.current
    if (state !== 'ready' || !player) return
    if (running) player.playVideo?.()
    else player.pauseVideo?.()
  }, [running, state])

  useEffect(
    () => () => {
      try {
        playerRef.current?.destroy?.()
      } catch {
        /* el iframe ya no existe */
      }
      playerRef.current = null
    },
    [],
  )

  return (
    <>
      <div ref={hostRef} className="absolute inset-0 bg-black [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:h-full [&>iframe]:w-full" />
      {state !== 'ready' && (
        <div className="absolute inset-0">
          <Backdrop item={item} />
          {item.poster && <img src={item.poster} alt={alt} loading="lazy" decoding="async" className={`relative h-full w-full ${fitClass(item)}`} />}
          {/* Mientras no corre (movimiento reducido, en pausa o al terminar), todo el póster es el botón de reproducir:
              sirve con el mouse, con un toque y con el teclado. */}
          {state === 'poster' && !running ? (
            <button type="button" onClick={onPlay} aria-label={`${t.mediaPlay}: ${alt}`} className="group/yt absolute inset-0 grid cursor-pointer place-items-center">
              <span className="grid size-14 place-items-center rounded-full bg-black/65 text-white transition group-hover/yt:scale-105 group-hover/yt:bg-black/80">
                <Icon name="youtube" size={26} />
              </span>
            </button>
          ) : (
            <span aria-hidden className="absolute inset-0 grid place-items-center">
              <span className="grid size-14 place-items-center rounded-full bg-black/65 text-white">
                <Icon name="youtube" size={26} />
              </span>
            </span>
          )}
          {state === 'failed' && (
            <a
              href={youtubeWatchUrl(item.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 bottom-3 inline-flex h-11 items-center gap-2 rounded-full bg-black/70 px-4 font-mono text-[12px] text-white"
            >
              {t.mediaWatchYouTube}
              <Icon name="arrowUpRight" size={13} />
            </a>
          )}
        </div>
      )}
    </>
  )
}

function Slide(props) {
  if (props.item.type === 'youtube') return <YouTubeSlide {...props} />
  if (props.item.type === 'video') return <VideoSlide {...props} />
  return <ImageSlide {...props} />
}

/* ------------------------------------------------------------------ Carrusel */

/**
 * Carrusel de medios de una tarjeta de proyecto.
 * - Empieza solo cuando entra en pantalla: cada video hasta el final y cada foto IMAGE_MS; al terminar el
 *   último vuelve al primero y se queda en pausa (no gira para siempre).
 * - Debajo, un punto por medio: muestran el total y el actual, y el activo se llena con el avance.
 * - Flechas, contador, pausa y ampliar solo aparecen con el mouse encima, con el foco dentro o tras un toque,
 *   para no tapar lo que se está reproduciendo. En táctil se desliza; con teclado, flechas ← →.
 * - Se detiene fuera de pantalla, con la pestaña oculta o con un diálogo abierto encima.
 * - `onExpand({ index, time, trigger, onClose })` abre el visor ampliado; `onClose(i)` vuelve a ese medio.
 */
export default function MediaCarousel({ items, label, lang, t, onExpand, eager = false }) {
  const reduced = useReducedMotion()
  const n = items.length
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [mode, setMode] = useState(() => (canAutoplay() ? 'idle' : 'paused')) // idle · playing · paused · ended
  const [inView, setInView] = useState(false)
  const [locked, setLocked] = useState(isScrollLocked)
  const [hidden, setHidden] = useState(() => document.hidden)
  const [controls, setControls] = useState(false)

  const frameRef = useRef(null)
  const expandRef = useRef(null)
  const fillRef = useRef(null)
  const mediaRef = useRef(null)
  const indexRef = useRef(0)
  const elapsedRef = useRef(0)
  const hoverRef = useRef(false)
  const focusRef = useRef(false)
  const pointerRef = useRef({ type: 'mouse', x: 0, y: 0, down: false })
  const controlsTimer = useRef(0)

  const item = items[index] ?? items[0]
  const running = mode === 'playing' && inView && !locked && !hidden

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const el = frameRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      setMode((m) => (m === 'idle' ? 'playing' : m))
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        const visible = e.isIntersecting && e.intersectionRatio >= 0.5
        setInView(visible)
        // La primera vez que se ve, arranca solo.
        if (visible) setMode((m) => (m === 'idle' ? 'playing' : m))
      },
      { threshold: [0, 0.5, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onLock = (e) => setLocked(Boolean(e.detail))
    const onVisibility = () => setHidden(document.hidden)
    window.addEventListener(SCROLL_LOCK_EVENT, onLock)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener(SCROLL_LOCK_EVENT, onLock)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => () => clearTimeout(controlsTimer.current), [])

  const setFill = useCallback((p) => {
    const el = fillRef.current
    if (el) el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`
  }, [])

  const advance = useCallback(() => {
    const i = indexRef.current
    elapsedRef.current = 0
    if (i < n - 1) {
      setIndex(i + 1)
    } else {
      setIndex(0)
      setCycle((c) => c + 1)
      setMode('ended')
    }
  }, [n])

  const onEnded = useCallback(
    (key) => {
      if (key === items[indexRef.current]?.key) advance()
    },
    [items, advance],
  )

  const onBlocked = useCallback(() => setMode('paused'), [])
  const onPlay = useCallback(() => setMode('playing'), [])

  useEffect(() => {
    elapsedRef.current = 0
    setFill(0)
  }, [index, cycle, setFill])

  // Motor: llena el punto activo y hace avanzar las fotos (los videos avanzan al terminar).
  useEffect(() => {
    if (!running) return
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      const m = mediaRef.current
      const own = m && m.key === items[indexRef.current]?.key
      if (own && m.kind === 'video' && m.el) {
        setFill(m.el.duration ? m.el.currentTime / m.el.duration : 0)
      } else if (own && m.kind === 'youtube') {
        const duration = m.player?.getDuration?.() || 0
        setFill(duration ? (m.player.getCurrentTime?.() || 0) / duration : 0)
      } else {
        if (!hoverRef.current && !focusRef.current) elapsedRef.current += dt
        setFill(elapsedRef.current / IMAGE_MS)
        if (elapsedRef.current >= IMAGE_MS) {
          advance()
          return
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [running, index, items, advance, setFill])

  const goTo = useCallback(
    (i) => {
      elapsedRef.current = 0
      setIndex(((i % n) + n) % n)
      // Navegar vuelve a poner el carrusel en marcha, salvo que la persona lo haya pausado.
      setMode((m) => (m === 'paused' ? 'paused' : 'playing'))
    },
    [n],
  )

  const toggle = () => setMode((m) => (m === 'playing' ? 'paused' : 'playing'))

  const revealControls = () => {
    setControls(true)
    clearTimeout(controlsTimer.current)
    controlsTimer.current = setTimeout(() => setControls(false), TOUCH_CONTROLS_MS)
  }

  const expand = (trigger) => {
    if (!onExpand) return
    const m = mediaRef.current
    const time = m?.key === item.key && m.kind === 'video' && m.el ? m.el.currentTime : 0
    onExpand({ index: indexRef.current, time, trigger, onClose: (i) => goTo(i) })
  }

  const onPointerDown = (e) => {
    pointerRef.current = { type: e.pointerType, x: e.clientX, y: e.clientY, down: true }
  }

  const onPointerUp = (e) => {
    const start = pointerRef.current
    pointerRef.current = { ...start, down: false }
    if (e.pointerType === 'mouse' || !start.down) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (n > 1 && Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
      goTo(indexRef.current + (dx < 0 ? 1 : -1))
      revealControls()
      return
    }
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) revealControls()
  }

  const onFrameClick = (e) => {
    // Con el mouse, clic en el medio = ampliar. En táctil el toque solo muestra los controles.
    // YouTube se arranca con el botón de su póster y después se maneja con sus propios controles.
    if (pointerRef.current.type !== 'mouse' || item.type === 'youtube' || e.target.closest('button, a')) return
    // Al cerrar el visor, el foco vuelve al botón de ampliar (el cuadro no es enfocable).
    expand(expandRef.current ?? e.currentTarget)
  }

  const onKeyDown = (e) => {
    if (n < 2) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(indexRef.current + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(indexRef.current - 1)
    }
  }

  if (!n) return null

  const caption = (it) => tx(it.caption, lang) ?? label
  const youtube = item.type === 'youtube'
  const ctl =
    'pointer-events-none grid size-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/80 group-hover/media:pointer-events-auto group-data-[controls=on]/media:pointer-events-auto'
  const play = {
    playing: { icon: 'pause', label: t.mediaPause },
    ended: { icon: 'replay', label: t.mediaReplay },
  }[mode] ?? { icon: 'playTri', label: t.mediaPlay }

  return (
    <div
      role="region"
      aria-roledescription={t.mediaCarousel}
      aria-label={`${label} · ${t.mediaLabel}`}
      onKeyDown={onKeyDown}
      onFocus={(e) => (focusRef.current = keyboardFocus(e.target))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) focusRef.current = false
      }}
    >
      <div
        ref={frameRef}
        data-controls={controls ? 'on' : 'off'}
        className={`group/media relative aspect-[16/10] w-full touch-pan-y overflow-hidden bg-surface-2 select-none ${youtube ? '' : 'cursor-zoom-in'}`}
        // Solo el mouse cuenta como hover: tras un toque, el navegador emite un mouseenter de compatibilidad
        // que dejaría el carrusel en pausa hasta tocar en otra parte.
        onPointerEnter={(e) => e.pointerType === 'mouse' && (hoverRef.current = true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && (hoverRef.current = false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerRef.current = { ...pointerRef.current, down: false })}
        onClick={onFrameClick}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={`${item.key}:${cycle}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
            role="group"
            aria-roledescription={t.mediaSlide}
            aria-label={`${index + 1} ${t.mediaOf} ${n}`}
          >
            <Slide
              item={item}
              alt={caption(item)}
              running={running}
              mediaRef={mediaRef}
              onEnded={onEnded}
              onBlocked={onBlocked}
              onPlay={onPlay}
              eager={eager && index === 0}
              t={t}
            />
          </motion.div>
        </AnimatePresence>

        {/* Controles: con el mouse encima, con el foco de teclado dentro o tras un toque. Nunca tapan el medio en reposo. */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/media:opacity-100 group-has-[:focus-visible]/media:opacity-100 group-data-[controls=on]/media:opacity-100">
          {!youtube && (
            <>
              <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              <span aria-hidden className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-white tabular">
                {pad2(index + 1)} / {pad2(n)}
              </span>
              {onExpand && (
                <button ref={expandRef} type="button" onClick={(e) => expand(e.currentTarget)} aria-label={t.mediaEnlarge} aria-haspopup="dialog" className={`${ctl} absolute top-1.5 right-1.5`}>
                  <Icon name="expand" size={17} />
                </button>
              )}
              <button type="button" onClick={toggle} aria-label={play.label} className={`${ctl} absolute bottom-1.5 left-1.5`}>
                <Icon name={play.icon} size={16} />
              </button>
              <p aria-hidden className="absolute right-4 bottom-4 left-16 truncate text-right font-mono text-[11px] tracking-wide text-white/90">
                {caption(item)}
              </p>
            </>
          )}
          {n > 1 && (
            <>
              <button type="button" onClick={() => goTo(index - 1)} aria-label={t.mediaPrev} className={`${ctl} absolute top-1/2 left-1.5 -translate-y-1/2`}>
                <Icon name="chevronLeft" size={20} />
              </button>
              <button type="button" onClick={() => goTo(index + 1)} aria-label={t.mediaNext} className={`${ctl} absolute top-1/2 right-1.5 -translate-y-1/2`}>
                <Icon name="chevronRight" size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {n > 1 && (
        <Dots items={items} index={index} onSelect={goTo} lang={lang} t={t} label={`${label} · ${t.mediaLabel}`} fillRef={fillRef} />
      )}
    </div>
  )
}
