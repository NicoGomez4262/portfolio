import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import manifest from 'virtual:media-manifest'
import Icon from './Icon.jsx'

const IMAGE_EXT = ['webp', 'jpg', 'jpeg', 'png']

/** Busca en el manifiesto la primera variante existente de `base` (sin extensión). */
export function resolveMedia(base, { allowVideo = true } = {}) {
  if (!base) return null
  if (allowVideo && manifest.has(`${base}.mp4`)) {
    const poster = IMAGE_EXT.map((e) => `${base}.${e}`).find((p) => manifest.has(p))
    return { kind: 'video', src: `${base}.mp4`, poster }
  }
  const img = IMAGE_EXT.map((e) => `${base}.${e}`).find((p) => manifest.has(p))
  return img ? { kind: 'image', src: img } : null
}

/**
 * Placeholder diseñado: marco de plano técnico con icono, etiqueta y "coming soon".
 * Nunca un gris muerto.
 */
export function MediaPlaceholder({ icon = 'image', label, sub, fig, compact = false }) {
  return (
    <div className="pcb-dots relative flex h-full w-full items-center justify-center overflow-hidden bg-surface-2">
      {/* Esquinas de plano */}
      {['left-2 top-2 border-l border-t', 'right-2 top-2 border-r border-t', 'left-2 bottom-2 border-b border-l', 'right-2 bottom-2 border-b border-r'].map(
        (pos) => (
          <span key={pos} aria-hidden className={`absolute size-3 border-accent/50 ${pos}`} />
        ),
      )}
      {fig && (
        <span aria-hidden className="absolute top-2.5 left-6 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
          {fig}
        </span>
      )}
      <div className="flex flex-col items-center gap-2.5 px-4 text-center">
        <span
          className={`grid place-items-center rounded-lg border border-line bg-surface text-accent ${compact ? 'size-9' : 'size-12'}`}
        >
          <Icon name={icon} size={compact ? 17 : 22} />
        </span>
        <span className={`font-mono tracking-[0.14em] text-ink-dim uppercase ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
          {label}
        </span>
        {sub && <span className="font-mono text-[10px] tracking-wide text-ink-faint">{sub}</span>}
      </div>
    </div>
  )
}

/**
 * Imagen o video con relación de aspecto fija, carga diferida y respaldo a placeholder.
 * `base` es la ruta pública sin extensión: se prueba .mp4 (si `video`), .webp, .jpg, .jpeg, .png.
 */
export default function Media({
  base,
  alt,
  width = 1600,
  height = 1000,
  video = true,
  eager = false,
  className = '',
  fit = 'cover',
  placeholder,
}) {
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const media = failed ? null : resolveMedia(base, { allowVideo: video })

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      {!media && <MediaPlaceholder {...placeholder} />}

      {media?.kind === 'image' && (
        <img
          src={media.src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      )}

      {media?.kind === 'video' && (
        <video
          src={media.src}
          poster={media.poster}
          width={width}
          height={height}
          muted
          loop
          playsInline
          autoPlay={!reduced}
          controls={reduced}
          preload={eager ? 'auto' : 'metadata'}
          aria-label={alt}
          onError={() => setFailed(true)}
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      )}
    </div>
  )
}
