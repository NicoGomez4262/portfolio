/**
 * Carga perezosa de la API de iframes de YouTube: solo se pide cuando un carrusel pone a correr un
 * video de YouTube. El reproductor usa youtube-nocookie.com.
 */
let api = null

export function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!api) {
    api = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        previous?.()
        resolve(window.YT)
      }
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => {
        api = null
        reject(new Error('YouTube API unavailable'))
      }
      document.head.appendChild(script)
    })
  }
  return api
}

export const youtubeWatchUrl = (id) => `https://www.youtube.com/watch?v=${id}`

/** Iframe simple para el visor ampliado: arranca solo y sin sonido; el sonido se activa desde el reproductor. */
export const youtubeEmbedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
