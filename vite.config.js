import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { SITE_URL } from './site.config.js'
import { PROFILE, INSTITUTIONS, CV_FILES } from './src/data/content.js'

const PUBLIC_DIR = 'public'
const MANIFEST_ID = 'virtual:media-manifest'
const MANIFEST_RESOLVED = '\0' + MANIFEST_ID

/** Lista recursiva de archivos bajo public/<dir>, como rutas públicas ("/media/…"). */
function listPublic(dir) {
  const root = join(PUBLIC_DIR, dir)
  if (!existsSync(root)) return []
  const out = []
  const walk = (d) => {
    for (const name of readdirSync(d)) {
      const full = join(d, name)
      if (statSync(full).isDirectory()) walk(full)
      else out.push('/' + relative(PUBLIC_DIR, full).split(sep).join('/'))
    }
  }
  walk(root)
  return out
}

/**
 * Manifiesto de medios: el componente <Media> sabe qué archivos existen sin pedirlos,
 * así un hueco vacío no genera un 404 en la consola.
 */
function mediaManifest() {
  const collect = () => [...listPublic('media'), ...listPublic('assets')]
  return {
    name: 'media-manifest',
    resolveId: (id) => (id === MANIFEST_ID ? MANIFEST_RESOLVED : null),
    load: (id) => (id === MANIFEST_RESOLVED ? `export default new Set(${JSON.stringify(collect())})` : null),
    configureServer(server) {
      const refresh = (file) => {
        const rel = relative(PUBLIC_DIR, file)
        if (rel.startsWith('..')) return
        const mod = server.moduleGraph.getModuleById(MANIFEST_RESOLVED)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

const TITLE = 'Nicolás Gómez — Electronics & Hardware Engineering Intern Portfolio'
const DESCRIPTION = `Electronic Engineering student at Pontificia Universidad Javeriana (GPA ${PROFILE.gpa}/${PROFILE.gpaScale}) seeking a hardware / electrical engineering internship. Embedded C, custom PCBs in Altium, FPGA design in VHDL and IoT on Raspberry Pi.`

/** Metadatos, JSON-LD, robots.txt y sitemap.xml, todos derivados de SITE_URL y PROFILE. */
function seo() {
  const assets = listPublic('assets')
  const photo = ['webp', 'jpg', 'jpeg', 'png'].map((e) => `${PROFILE.photo}.${e}`).find((p) => assets.includes(p))
  // <noscript>: la hoja de vida EN ATS.
  const cvNoscript = CV_FILES.en.ats
  const org = (id, type) => ({ '@type': type, name: INSTITUTIONS[id].name, ...(INSTITUTIONS[id].url && { url: INSTITUTIONS[id].url }) })

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: PROFILE.shortName,
    url: SITE_URL,
    image: photo ? SITE_URL + photo : `${SITE_URL}/og.png`,
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phone,
    jobTitle: 'Electronic Engineering Student',
    description: DESCRIPTION,
    address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
    alumniOf: [org('puj', 'CollegeOrUniversity'), org('merani', 'EducationalOrganization')],
    knowsLanguage: [
      { '@type': 'Language', name: 'Spanish', alternateName: 'es' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    knowsAbout: ['Embedded systems', 'PCB design', 'Altium Designer', 'Embedded C', 'VHDL', 'FPGA', 'Digital signal processing', 'FIR filters', 'Microcontrollers', 'Raspberry Pi', 'MQTT', 'IoT'],
    sameAs: [PROFILE.github, PROFILE.linkedin].filter(Boolean),
  }

  const today = new Date().toISOString().slice(0, 10)

  return {
    name: 'seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%TITLE%', TITLE)
        .replaceAll('%DESCRIPTION%', DESCRIPTION)
        .replaceAll('%CV_NOSCRIPT%', cvNoscript)
        .replace('%JSON_LD%', JSON.stringify(person).replace(/</g, '\\u003c'))
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), mediaManifest(), seo()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
