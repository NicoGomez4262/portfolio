/**
 * Verificación del sitio con Chrome headless (CDP): capturas y auditoría responsive.
 *
 *   node scripts/verify.mjs [URL] [carpeta]      (por defecto https://nicolasgomez.dev y ./shots)
 *
 * - Recorre la página con scrollTo({ behavior: 'instant' }): con scroll suave las animaciones de entrada no disparan.
 * - Captura la página completa con captureBeyondViewport (por tramos) en los anchos de FULL y en ambos temas.
 * - Audita cada ancho: scroll horizontal, áreas táctiles de menos de 44 px y errores de consola.
 * - Prueba el selector de hoja de vida desde todos los puntos de descarga (foco inicial, trampa de foco,
 *   cambio de idioma sin cerrar, Escape y regreso del foco) y el modal de proyecto con su enlace cruzado.
 * El informe queda en <carpeta>/report.json. Las capturas quedan en tramos .partN.png para unirlas después.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { launch, sleep } from './cdp.mjs'

const BASE = process.argv[2] || 'https://nicolasgomez.dev'
const OUT = process.argv[3] || 'shots'
const SIZES = { 360: 780, 390: 844, 414: 896, 768: 1024, 820: 1180, 1024: 768, 1280: 800, 1440: 900 }
const WIDTHS = (process.env.WIDTHS || Object.keys(SIZES).join(',')).split(',').map(Number)
const FULL = (process.env.FULL || '390,768,1024,1440').split(',').map(Number)
const THEMES = (process.env.THEMES || 'dark,light').split(',')
mkdirSync(OUT, { recursive: true })

const REVEAL = `(async () => {
  const H = () => document.documentElement.scrollHeight
  const step = Math.max(280, Math.round(innerHeight * 0.55))
  for (let y = 0; y < H(); y += step) {
    window.scrollTo({ top: y, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 90))
  }
  window.scrollTo({ top: H(), behavior: 'instant' })
  await new Promise((r) => setTimeout(r, 500))
  window.scrollTo({ top: 0, behavior: 'instant' })
  await new Promise((r) => setTimeout(r, 1400))
  const hero = document.getElementById('top')
  if (hero) hero.style.minHeight = getComputedStyle(hero).minHeight
  return H()
})()`

const AUDIT = `(() => {
  const vw = document.documentElement.clientWidth
  const overflow = document.documentElement.scrollWidth - vw
  const offenders = overflow > 0
    ? [...document.querySelectorAll('body *')]
        .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > vw + 1 })
        .slice(0, 10)
        .map((el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + ' .' + String(el.className).slice(0, 70))
    : []
  const small = [...document.querySelectorAll('a[href], button')]
    .filter((el) => {
      if (el.classList.contains('inst-link')) return false
      const r = el.getBoundingClientRect()
      if (r.width <= 1 || r.height <= 1) return false
      const cs = getComputedStyle(el)
      if (cs.visibility === 'hidden' || cs.display === 'none') return false
      return r.height < 44 || r.width < 44
    })
    .map((el) => {
      const r = el.getBoundingClientRect()
      return { el: (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 48), w: Math.round(r.width), h: Math.round(r.height) }
    })
  return { vw, height: document.documentElement.scrollHeight, overflow, offenders, small }
})()`

const DIALOG_STATE = `(() => {
  const d = document.querySelector('[role=dialog]')
  return {
    open: Boolean(d),
    label: d ? document.getElementById(d.getAttribute('aria-labelledby'))?.textContent : null,
    activeInside: d ? d.contains(document.activeElement) : false,
    active: (document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 60),
    lang: document.documentElement.lang,
    options: d ? [...d.querySelectorAll('li')].map((li) => li.textContent.trim().replace(/\\s+/g, ' ').slice(0, 80)) : [],
    hrefs: d ? [...d.querySelectorAll('li a[href]')].map((a) => a.getAttribute('href') + ' → ' + a.getAttribute('download')) : [],
    bodyLocked: document.body.style.overflow === 'hidden',
  }
})()`

const report = { base: BASE, date: new Date().toISOString(), widths: {}, full: [], cv: [], modal: null, links: null, logs: [] }

async function openPage(browser, width, theme, lang = 'en') {
  const page = await browser.newPage()
  await page.viewport(width, SIZES[width] ?? 900)
  await page.media([{ name: 'prefers-color-scheme', value: theme }, { name: 'prefers-reduced-motion', value: 'no-preference' }])
  await page.beforeLoad(`try { localStorage.setItem('ng-theme', '${theme}'); localStorage.setItem('ng-lang', '${lang}') } catch (e) {}`)
  await page.goto(BASE, { settle: 1200 })
  return page
}

async function close(page) {
  report.logs.push(...page.logs)
  await page.send('Page.close').catch(() => {})
}

/** Abre el selector desde `selector`, prueba foco, trampa, idioma y Escape, y captura. */
async function testCv(page, name, selector, shot) {
  const result = { from: name }
  const ok = await page.eval(`(() => { const b = document.querySelector(${JSON.stringify(selector)}); if (!b) return false; b.scrollIntoView({ block: 'center', behavior: 'instant' }); b.click(); return true })()`)
  if (!ok) return report.cv.push({ ...result, error: 'trigger not found' })
  await sleep(700)
  result.opened = await page.eval(DIALOG_STATE)
  if (shot) await page.screenshot(join(OUT, `${shot}.png`))
  let trapped = true
  for (let i = 0; i < 9; i++) {
    await page.key('Tab')
    trapped &&= await page.eval(`Boolean(document.querySelector('[role=dialog]')?.contains(document.activeElement))`)
  }
  for (let i = 0; i < 4; i++) {
    await page.key('Tab', { shift: true })
    trapped &&= await page.eval(`Boolean(document.querySelector('[role=dialog]')?.contains(document.activeElement))`)
  }
  result.focusTrapped = trapped
  const other = result.opened.lang === 'en' ? 'es' : 'en'
  await page.eval(`document.querySelector('[role=dialog] [role=group] button[lang=${other}]')?.click()`)
  await sleep(450)
  result.afterLangSwitch = await page.eval(DIALOG_STATE)
  if (shot) await page.screenshot(join(OUT, `${shot}-${other}.png`))
  await page.eval(`document.querySelector('[role=dialog] [role=group] button[lang=${result.opened.lang}]')?.click()`)
  await sleep(300)
  await page.key('Escape')
  await sleep(650)
  result.afterEscape = await page.eval(`(() => ({ open: Boolean(document.querySelector('[role=dialog]')), focusBack: document.activeElement === document.querySelector(${JSON.stringify(selector)}), bodyLocked: document.body.style.overflow === 'hidden' }))()`)
  report.cv.push(result)
}

const browser = await launch()
try {
  // 1) Auditoría por ancho (tema oscuro) y capturas de página completa por tema.
  for (const width of WIDTHS) {
    for (const theme of THEMES) {
      const full = FULL.includes(width)
      if (theme !== 'dark' && !full) continue
      const page = await openPage(browser, width, theme)
      await page.eval(REVEAL)
      if (theme === 'dark') report.widths[width] = await page.eval(AUDIT)
      if (full) {
        const parts = await page.screenshot(join(OUT, `full-${width}-${theme}.png`), { full: true })
        report.full.push({ width, theme, parts })
      }
      await close(page)
    }
  }

  // 2) Selector de hoja de vida desde todos los puntos de descarga.
  const mob = await openPage(browser, 390, 'dark')
  await testCv(mob, 'hero (390)', '#top button[aria-haspopup=dialog]', 'cv-390-dark')
  await testCv(mob, 'contact card (390)', '#contact button[aria-haspopup=dialog]', null)
  await mob.eval(`window.scrollTo({ top: 0, behavior: 'instant' }); document.querySelector('header button[aria-controls=mobile-menu]').click()`)
  await sleep(500)
  await testCv(mob, 'mobile menu (390)', '#mobile-menu button[aria-haspopup=dialog]', null)
  await mob.eval(`document.querySelector('header button[aria-controls=mobile-menu]')?.click()`)
  await sleep(400)

  // 3) Modal de proyecto en móvil y enlace cruzado hardware → software.
  await mob.eval(`(() => { const b = [...document.querySelectorAll('#hw-proteo button')].find((x) => !x.getAttribute('aria-label')); b.scrollIntoView({ block: 'center', behavior: 'instant' }); b.click() })()`)
  await sleep(800)
  report.modal = await mob.eval(DIALOG_STATE)
  await mob.screenshot(join(OUT, 'modal-390-dark.png'))
  await mob.eval(`document.querySelector('[role=dialog]').scrollTo({ top: 99999, behavior: 'instant' })`)
  await sleep(300)
  await mob.screenshot(join(OUT, 'modal-390-dark-bottom.png'))
  await mob.eval(`document.querySelector('[role=dialog] a[href="#sw-proteo-web"]')?.click()`)
  await sleep(1600)
  report.links = await mob.eval(`(() => { const el = document.getElementById('sw-proteo-web'); const r = el.getBoundingClientRect(); return { hash: location.hash, modalOpen: Boolean(document.querySelector('[role=dialog]')), targetTop: Math.round(r.top), inView: r.top >= 0 && r.top < innerHeight, bodyLocked: document.body.style.overflow === 'hidden' } })()`)
  await close(mob)

  const light = await openPage(browser, 390, 'light')
  await testCv(light, 'hero (390, light)', '#top button[aria-haspopup=dialog]', 'cv-390-light')
  await light.eval(`(() => { const b = [...document.querySelectorAll('#hw-volley-pong button')].find((x) => !x.getAttribute('aria-label')); b.scrollIntoView({ block: 'center', behavior: 'instant' }); b.click() })()`)
  await sleep(800)
  await light.screenshot(join(OUT, 'modal-390-light-volley.png'))
  await close(light)

  const desk = await openPage(browser, 1280, 'dark')
  await testCv(desk, 'nav (1280)', 'header button[aria-haspopup=dialog]', 'cv-1280-dark')
  await close(desk)

  const es = await openPage(browser, 390, 'dark', 'es')
  await testCv(es, 'hero (390, ES)', '#top button[aria-haspopup=dialog]', 'cv-390-dark-es-start')
  await close(es)
} finally {
  await browser.close()
}

writeFileSync(join(OUT, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
