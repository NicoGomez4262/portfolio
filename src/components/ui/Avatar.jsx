import manifest from 'virtual:media-manifest'
import { PROFILE } from '../../data/content.js'

const CORNERS = ['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'left-0 bottom-0 border-b border-l', 'right-0 bottom-0 border-b border-r']

/**
 * Avatar pequeño con marco técnico fino. La foto va a propósito en tamaño reducido:
 * el sitio se evalúa por el trabajo, no por la imagen. Sin foto, muestra las iniciales.
 */
export default function Avatar({ className = '' }) {
  const webp = manifest.has(`${PROFILE.photo}.webp`) ? `${PROFILE.photo}.webp` : null
  const fallback = ['jpg', 'jpeg', 'png'].map((e) => `${PROFILE.photo}.${e}`).find((p) => manifest.has(p)) ?? null
  const src = fallback ?? webp

  return (
    <span className={`relative block shrink-0 ${className}`}>
      {CORNERS.map((pos) => (
        <span key={pos} aria-hidden className={`absolute z-10 size-2.5 border-accent/80 ${pos}`} />
      ))}
      <span className="absolute inset-[3px] overflow-hidden rounded-lg border border-line bg-surface-2">
        {src ? (
          <picture>
            {webp && fallback && <source srcSet={webp} type="image/webp" />}
            <img src={src} alt="" width="480" height="480" loading="eager" decoding="async" className="size-full object-cover" />
          </picture>
        ) : (
          <span aria-hidden className="pcb-dots grid size-full place-items-center font-mono text-sm font-medium tracking-wider text-accent lg:text-base">
            {PROFILE.initials}
          </span>
        )}
      </span>
    </span>
  )
}
