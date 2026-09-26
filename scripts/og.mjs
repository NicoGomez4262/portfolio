/**
 * Genera public/og.png (1200 × 630) desde scripts/og.html con los datos de content.js y site.config.js.
 * Uso: node scripts/og.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SITE_URL } from '../site.config.js'
import { INSTITUTIONS, PROFILE, SHARE, UI } from '../src/data/content.js'
import { launch } from './cdp.mjs'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const values = {
  badge: SHARE.badge,
  name: PROFILE.shortName,
  role: UI.en.role,
  focus: UI.en.roleFocus,
  tagline: UI.en.tagline,
  university: INSTITUTIONS[PROFILE.university].name,
  gpa: `${PROFILE.gpa}/${PROFILE.gpaScale}`,
  graduation: PROFILE.graduation,
  domain: SITE_URL.replace(/^https?:\/\//, ''),
  initials: PROFILE.initials,
}

let html = readFileSync(fileURLToPath(new URL('./og.html', import.meta.url)), 'utf8')
for (const [k, v] of Object.entries(values)) html = html.replaceAll(`{{${k}}}`, esc(v))
const tmp = join(tmpdir(), 'ng-og.html')
writeFileSync(tmp, html)

const browser = await launch({ port: 9334 })
try {
  const page = await browser.newPage()
  await page.viewport(1200, 630, { mobile: false })
  await page.goto(pathToFileURL(tmp).href, { settle: 400 })
  await page.eval('document.fonts.ready.then(() => document.fonts.size)')
  const out = fileURLToPath(new URL('../public/og.png', import.meta.url))
  await page.screenshot(out)
  console.log('og.png →', out, values)
} finally {
  await browser.close()
}
