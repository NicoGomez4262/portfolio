import manifest from 'virtual:media-manifest'

const IMAGE_EXT = ['webp', 'jpg', 'jpeg', 'png']

export const pad2 = (n) => String(n).padStart(2, '0')
export const fitClass = (item) => (item.fit === 'contain' ? 'object-contain' : 'object-cover')

/**
 * Medios de un proyecto, en el orden de HARDWARE[].media, resueltos contra el manifiesto de public/:
 * solo quedan los que existen (un archivo que falta no deja hueco ni 404).
 *   video   → /media/projects/<id>/<src>.mp4 con su póster <src>.webp
 *   image   → /media/projects/<id>/<src>.webp | .jpg | .png
 *   youtube → id del video; `poster` = imagen local (si no hay, la miniatura de YouTube)
 */
export function projectMedia(project) {
  const dir = `/media/projects/${project.id}/`
  const image = (name) => (name ? IMAGE_EXT.map((e) => `${dir}${name}.${e}`).find((p) => manifest.has(p)) : undefined)
  return (project.media ?? []).flatMap((m) => {
    if (m.type === 'youtube') {
      return [{ ...m, key: `yt:${m.id}`, poster: image(m.poster) ?? `https://i.ytimg.com/vi/${m.id}/hqdefault.jpg` }]
    }
    if (m.type === 'video') {
      const src = `${dir}${m.src}.mp4`
      return manifest.has(src) ? [{ ...m, key: src, src, poster: image(m.src) }] : []
    }
    const src = image(m.src)
    return src ? [{ ...m, key: src, src }] : []
  })
}
