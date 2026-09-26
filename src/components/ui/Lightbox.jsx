import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { tx } from '../../data/content.js'
import { useDialog } from '../../hooks/useDialog.js'
import { Dots } from './MediaCarousel.jsx'
import { pad2 } from './media.js'
import { youtubeEmbedUrl } from './youtube.js'
import Icon from './Icon.jsx'

const SWIPE_PX = 40

function Viewed({ item, alt, time }) {
  if (item.type === 'youtube') {
    return (
      <div className="aspect-video max-h-full w-full max-w-5xl overflow-hidden rounded-lg bg-black">
        <iframe
          src={youtubeEmbedUrl(item.id)}
          title={alt}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    )
  }
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        muted
        playsInline
        aria-label={alt}
        onLoadedMetadata={(e) => {
          if (time) e.currentTarget.currentTime = time
        }}
        className="max-h-full max-w-full rounded-lg bg-black"
      />
    )
  }
  return (
    <img
      src={item.src}
      alt={alt}
      draggable={false}
      className={`max-h-full max-w-full rounded-lg object-contain ${item.bg === 'light' ? 'bg-white' : ''}`}
    />
  )
}

/**
 * Visor ampliado de los medios de un proyecto: ocupa toda la pantalla, con foco atrapado y Escape.
 * Se navega con ← →, deslizando, con las flechas laterales (pantallas medianas en adelante) o con los puntos.
 * Los videos se reproducen con sus controles nativos; no hay avance automático.
 * `onClose(i)` recibe el medio que quedó a la vista, para que la tarjeta vuelva a ese mismo.
 */
export default function Lightbox({ items, start = 0, time = 0, label, lang, t, onClose }) {
  const reduced = useReducedMotion()
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const touchRef = useRef(null)
  const [index, setIndex] = useState(start)
  const indexRef = useRef(start)
  const n = items.length
  const item = items[index]
  const caption = tx(item.caption, lang) ?? label

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const close = useCallback(() => onClose(indexRef.current), [onClose])
  useDialog(panelRef, { onClose: close, initialFocus: closeRef })

  const go = useCallback((i) => setIndex(((i % n) + n) % n), [n])

  useEffect(() => {
    if (n < 2) return
    const onKey = (e) => {
      // Con el foco en el video, las flechas adelantan o atrasan el video (controles nativos).
      if (e.target instanceof HTMLMediaElement) return
      if (e.key === 'ArrowRight') go(indexRef.current + 1)
      else if (e.key === 'ArrowLeft') go(indexRef.current - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [n, go])

  const arrow =
    'absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15 sm:grid'

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-black/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${label} · ${t.mediaViewer}`}
        className="flex h-full flex-col outline-none"
      >
        <div className="flex items-center justify-between gap-3 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:px-6">
          <p className="min-w-0 truncate font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">
            <span className="text-white tabular">
              {pad2(index + 1)} / {pad2(n)}
            </span>
            <span aria-hidden className="mx-2 text-white/40">·</span>
            {label}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.close}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-2 py-2 sm:px-20"
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse') touchRef.current = { x: e.clientX, y: e.clientY }
          }}
          onPointerUp={(e) => {
            const s = touchRef.current
            touchRef.current = null
            if (!s || n < 2) return
            const dx = e.clientX - s.x
            if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.2) go(indexRef.current + (dx < 0 ? 1 : -1))
          }}
          onPointerCancel={() => (touchRef.current = null)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={item.key}
              className="flex h-full w-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.18 }}
            >
              <Viewed item={item} alt={caption} time={index === start ? time : 0} />
            </motion.div>
          </AnimatePresence>

          {n > 1 && (
            <>
              <button type="button" onClick={() => go(index - 1)} aria-label={t.mediaPrev} className={`${arrow} left-4`}>
                <Icon name="chevronLeft" size={22} />
              </button>
              <button type="button" onClick={() => go(index + 1)} aria-label={t.mediaNext} className={`${arrow} right-4`}>
                <Icon name="chevronRight" size={22} />
              </button>
            </>
          )}
        </div>

        <div className="px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-white/85" aria-live="polite">
            {caption}
          </p>
          {n > 1 && (
            <div className="mt-1">
              <Dots items={items} index={index} onSelect={go} lang={lang} t={t} label={`${label} · ${t.mediaLabel}`} dark />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
