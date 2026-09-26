/**
 * Prueba del carrusel de medios y del visor ampliado con Chrome headless (CDP).
 *
 *   node scripts/carousel.mjs [URL] [carpeta]      (por defecto http://localhost:5173 y ./shots/carousel)
 *
 * Los proyectos y los conteos salen de HARDWARE[].media en content.js y de los archivos que existen en public/,
 * así que la prueba sigue sirviendo cuando llegan medios nuevos. Prueba:
 * - Escritorio: arranque solo al entrar en pantalla, avance de fotos (5 s) y de videos (al terminar), punto que
 *   se llena, controles solo con el mouse encima o con foco de teclado, pausa con hover y con foco de teclado
 *   (un clic no lo congela), fin → vuelve al primero en pausa, visor ampliado (mismo segundo del video, ← →,
 *   Escape, regreso al medio y al botón «Ampliar»), visor desde la bitácora del modal y reproductor de YouTube.
 * - Móvil (táctil): un toque muestra los controles sin ampliar y se ocultan solos, las fotos siguen avanzando
 *   después de un toque, pausa, deslizar en el carrusel y en el visor.
 * - Movimiento reducido: nada arranca solo y el póster de YouTube es un botón de reproducir.
 * Dura ~2 min. Sale con código 1 si algo falla. CDP_PORT=9334 si otro Chrome headless ya usa el 9333.
 */
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { launch, sleep } from './cdp.mjs'
import { HARDWARE } from '../src/data/content.js'

const BASE = process.argv[2] || 'http://localhost:5173'
const OUT = process.argv[3] || 'shots/carousel'
mkdirSync(OUT, { recursive: true })

/* ------------------------------------------------------------ Qué medios existen (como ui/media.js) */

const has = (path) => existsSync(join('public', path))
const image = (dir, name) => ['webp', 'jpg', 'jpeg', 'png'].map((e) => `${dir}${name}.${e}`).find(has)
const items = (p) =>
  (p.media ?? []).flatMap((m) => {
    const dir = `/media/projects/${p.id}/`
    if (m.type === 'youtube') return ['youtube']
    if (m.type === 'video') return has(`${dir}${m.src}.mp4`) ? ['video'] : []
    return image(dir, m.src) ? ['image'] : []
  })
const PROJECTS = HARDWARE.map((p) => ({ id: p.id, types: items(p) })).filter((p) => p.types.length)
const pick = (fn, label) => {
  const p = PROJECTS.find(fn)
  if (!p) throw new Error(`No hay un proyecto con ${label}`)
  return p
}
const IMAGES = pick((p) => p.types.length >= 5 && p.types.every((t) => t === 'image'), '5 o más fotos y ningún video')
const VIDEOS = PROJECTS.filter((p) => p.types[0] === 'video' && p.types.length >= 3)
if (VIDEOS.length < 1) throw new Error('No hay un proyecto que empiece con un video')
const VIDEO = VIDEOS[0]
const VIEWER = VIDEOS[1] ?? VIDEOS[0]
const YOUTUBE = pick((p) => p.types[0] === 'youtube', 'un video de YouTube primero')
const pad = (n) => String(n).padStart(2, '0')
const of = (i, p) => `${pad(i)} / ${pad(p.types.length)}`
console.log(`fotos: ${IMAGES.id} · video: ${VIDEO.id} · visor: ${VIEWER.id} · YouTube: ${YOUTUBE.id}`)

/* ------------------------------------------------------------ Lectura del estado y entradas */

const results = []
const check = (name, ok, detail) => {
  results.push({ name, ok: Boolean(ok), detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail !== undefined ? '  ' + JSON.stringify(detail) : ''}`)
}

const STATE = (id) => `(() => {
  const region = document.getElementById('hw-${id}')?.querySelector('[role=region]')
  const frame = region?.querySelector('[data-controls]')
  if (!frame) return null
  const overlay = [...frame.children].find((c) => String(c.className).includes('group-hover/media:opacity-100'))
  const counter = [...(overlay?.querySelectorAll('span') ?? [])].map((s) => s.textContent.trim()).find((t) => /^\\d\\d \\/ \\d\\d$/.test(t)) ?? null
  const dots = [...region.querySelectorAll(':scope > [role=group] button')]
  const current = dots.findIndex((d) => d.getAttribute('aria-current') === 'true')
  const labels = ['Play', 'Pause', 'Play again from the start']
  const play = [...frame.querySelectorAll('button')].find((b) => labels.includes(b.getAttribute('aria-label')))
  const video = frame.querySelector('video')
  const r = frame.getBoundingClientRect()
  return {
    counter,
    dots: dots.length,
    current,
    fill: dots[current]?.querySelector('span span')?.style.transform ?? null,
    play: play?.getAttribute('aria-label') ?? null,
    controls: frame.dataset.controls,
    overlayOpacity: overlay ? Number(getComputedStyle(overlay).opacity).toFixed(2) : null,
    video: video ? { paused: video.paused, t: Number(video.currentTime.toFixed(2)), d: Number((video.duration || 0).toFixed(2)) } : null,
    iframe: Boolean(frame.querySelector('iframe')),
    rect: { x: r.x, y: r.y, w: r.width, h: r.height },
    viewer: Boolean(document.querySelector('[role=dialog][aria-label$="media viewer"]')),
    active: (document.activeElement?.getAttribute('aria-label') || document.activeElement?.tagName || '').slice(0, 50),
  }
})()`

const VIEWER_STATE = `(() => {
  const d = document.querySelector('[role=dialog][aria-label$="media viewer"]')
  if (!d) return null
  const video = d.querySelector('video')
  return { counter: d.querySelector('p span')?.textContent.trim(), video: video ? { paused: video.paused, t: Number(video.currentTime.toFixed(2)) } : null, focusInside: d.contains(document.activeElement) }
})()`

/** Centro de un elemento (selector CSS) en coordenadas del viewport. */
const at = (page, selector) =>
  page.eval(`(() => { const b = document.querySelector(${JSON.stringify(selector)})?.getBoundingClientRect(); return b ? { x: b.x + b.width / 2, y: b.y + b.height / 2 } : null })()`)
const mid = (rect) => ({ x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 })

const mouseMove = (page, { x, y }) => page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y })
async function mouseClick(page, { x, y }) {
  await mouseMove(page, { x, y })
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 })
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 })
}
async function tap(page, { x, y }) {
  await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  await sleep(60)
  await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
}
async function swipe(page, x0, x1, y) {
  await page.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y }] })
  for (let i = 1; i <= 8; i++) {
    await sleep(16)
    await page.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + ((x1 - x0) * i) / 8, y }] })
  }
  await page.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
}
async function key(page, k, code = k) {
  const vk = { ArrowRight: 39, ArrowLeft: 37, Escape: 27, Shift: 16 }[k]
  await page.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk })
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk })
}
const show = (page, id) => page.eval(`document.querySelector('#hw-${id} [data-controls]').scrollIntoView({ block: 'center', behavior: 'instant' })`)
const away = { x: 4, y: 4 }

async function open(browser, width, height, { reduced = false } = {}) {
  const page = await browser.newPage()
  await page.viewport(width, height)
  await page.media([{ name: 'prefers-color-scheme', value: 'dark' }, { name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }])
  await page.beforeLoad(`try { localStorage.setItem('ng-theme', 'dark'); localStorage.setItem('ng-lang', 'en') } catch (e) {}`)
  await page.goto(BASE, { settle: 1500 })
  return page
}

const browser = await launch()
const logs = []
try {
  /* ------------------------------------------------------------ Escritorio (mouse) */
  const d = await open(browser, 1280, 800)
  await mouseMove(d, away)
  const I = IMAGES.id
  await show(d, I)
  await sleep(2800)
  const a1 = await d.eval(STATE(I))
  check('desk · starts by itself in view; the active dot fills', a1.dots === IMAGES.types.length && a1.play === 'Pause' && a1.fill !== 'scaleX(0)', { dots: a1.dots, play: a1.play, fill: a1.fill })
  await sleep(2800)
  const a2 = await d.eval(STATE(I))
  check('desk · a photo advances after 5 s', a2.counter === of(2, IMAGES) && a2.current === 1, { counter: a2.counter })
  check('desk · controls hidden with the mouse away', a2.overlayOpacity === '0.00', { opacity: a2.overlayOpacity })

  await mouseMove(d, mid(a2.rect))
  await sleep(400)
  const h1 = await d.eval(STATE(I))
  await sleep(1500)
  const h2 = await d.eval(STATE(I))
  check('desk · hover shows the controls', h1.overlayOpacity === '1.00', { opacity: h1.overlayOpacity })
  check('desk · hover pauses the photo timer', h1.fill === h2.fill, { before: h1.fill, after: h2.fill })
  await mouseMove(d, away)
  await sleep(400)
  check('desk · leaving hides the controls', (await d.eval(STATE(I))).overlayOpacity === '0.00')

  // Clic con el mouse en un punto y en «Next»: el foco que dejan no debe congelar el carrusel ni dejar los controles.
  await mouseClick(d, await at(d, `#hw-${I} [role=region] > [role=group] button:nth-child(3)`))
  await mouseMove(d, away)
  await sleep(300)
  const c1 = await d.eval(STATE(I))
  await sleep(1800)
  const c2 = await d.eval(STATE(I))
  check('desk · clicking dot 3 shows item 3', c1.counter === of(3, IMAGES), { counter: c1.counter })
  check('desk · after a mouse click the timer keeps running', c1.fill !== c2.fill, { before: c1.fill, after: c2.fill })
  await mouseClick(d, await at(d, `#hw-${I} [aria-label="Next"]`))
  await mouseMove(d, away)
  await sleep(500)
  const c3 = await d.eval(STATE(I))
  check('desk · mouse click on Next, then away: controls hide', c3.counter === of(4, IMAGES) && c3.overlayOpacity === '0.00', { counter: c3.counter, opacity: c3.overlayOpacity })

  // Foco de teclado dentro del cuadro: controles visibles y fotos detenidas.
  await key(d, 'Shift', 'ShiftLeft')
  await d.eval(`document.querySelector('#hw-${I} [aria-label="Enlarge"]').focus()`)
  await sleep(400)
  const k1 = await d.eval(STATE(I))
  await sleep(1200)
  const k2 = await d.eval(STATE(I))
  check('desk · keyboard focus inside shows the controls and pauses', k1.overlayOpacity === '1.00' && k1.fill === k2.fill, { opacity: k1.overlayOpacity, before: k1.fill, after: k2.fill })
  await key(d, 'ArrowRight')
  await sleep(300)
  check('desk · ArrowRight with focus inside moves on', (await d.eval(STATE(I))).counter === of(5, IMAGES))
  await d.eval(`document.activeElement.blur()`)

  // Fin: desde el último punto, vuelve al primero y queda en pausa.
  await d.eval(`[...document.querySelectorAll('#hw-${I} [role=region] > [role=group] button')].pop().click(); document.activeElement.blur()`)
  await sleep(5700)
  const e1 = await d.eval(STATE(I))
  await sleep(2000)
  const e2 = await d.eval(STATE(I))
  check('desk · after the last item it returns to item 1', e1.counter === of(1, IMAGES), { counter: e1.counter })
  check('desk · …and stays paused with a replay control', e1.play === 'Play again from the start' && e2.counter === e1.counter && e2.fill === 'scaleX(0)', { play: e1.play, fill: e2.fill })
  await d.screenshot(join(OUT, 'desk-ended.png'))

  // Video: arranca sin sonido y avanza al terminar.
  await show(d, VIDEO.id)
  await sleep(1500)
  const v1 = await d.eval(STATE(VIDEO.id))
  check(`desk · ${VIDEO.id}: the video plays muted in view`, v1.video && !v1.video.paused && v1.video.t > 0, v1.video)
  await sleep(Math.min(30000, Math.max(0, (v1.video?.d ?? 0) - (v1.video?.t ?? 0)) * 1000 + 1200))
  check(`desk · ${VIDEO.id}: advances when the video ends`, (await d.eval(STATE(VIDEO.id))).counter === of(2, VIDEO))

  // Visor ampliado con un clic en el cuadro. Primero vuelve al medio 1 (la tarjeta pudo avanzar sola mientras tanto).
  await show(d, VIEWER.id)
  await d.eval(`document.querySelector('#hw-${VIEWER.id} [role=region] > [role=group] button').click(); document.activeElement.blur()`)
  await sleep(1800)
  const f0 = await d.eval(STATE(VIEWER.id))
  await mouseClick(d, mid(f0.rect))
  await sleep(700)
  const l1 = await d.eval(VIEWER_STATE)
  const fc = await d.eval(STATE(VIEWER.id))
  check('desk · a click on the frame opens the viewer', l1?.counter === of(1, VIEWER) && l1.focusInside, l1)
  check('desk · the viewer continues the video near the same second', l1?.video && l1.video.t >= Math.max(0, (f0.video?.t ?? 0) - 0.5), { card: f0.video?.t, viewer: l1?.video?.t })
  check('desk · the card pauses under the viewer', fc.video?.paused === true)
  await d.screenshot(join(OUT, 'desk-viewer.png'))
  await key(d, 'ArrowRight')
  await sleep(450)
  check('desk · ArrowRight in the viewer', (await d.eval(VIEWER_STATE))?.counter === of(2, VIEWER))
  await key(d, 'Escape')
  await sleep(700)
  const f1 = await d.eval(STATE(VIEWER.id))
  check('desk · Escape closes it; the card stays on that item; focus on Enlarge', !f1.viewer && f1.counter === of(2, VIEWER) && f1.active === 'Enlarge', { counter: f1.counter, active: f1.active })

  // Visor desde la bitácora del modal: Escape cierra solo el visor.
  await d.eval(`(() => { const b = [...document.querySelectorAll('#hw-${VIEWER.id} button')].find((x) => !x.getAttribute('aria-label')); b.scrollIntoView({ block: 'center', behavior: 'instant' }); b.click() })()`)
  await sleep(900)
  await d.eval(`document.querySelector('[role=dialog] figure button').click()`)
  await sleep(800)
  check('desk · the viewer opens from the project modal', Boolean(await d.eval(VIEWER_STATE)))
  await key(d, 'Escape')
  await sleep(700)
  const m1 = await d.eval(`({ viewer: Boolean(document.querySelector('[role=dialog][aria-label$="media viewer"]')), modal: Boolean(document.getElementById('project-modal-title')) })`)
  check('desk · Escape closes only the viewer; the modal stays', !m1.viewer && m1.modal, m1)
  await key(d, 'Escape')
  await sleep(600)

  // YouTube: el reproductor se crea al entrar en pantalla.
  await show(d, YOUTUBE.id)
  await sleep(4500)
  check(`desk · ${YOUTUBE.id}: the YouTube player loads in view`, (await d.eval(STATE(YOUTUBE.id))).iframe)
  logs.push(...d.logs)
  await d.send('Page.close').catch(() => {})

  /* ------------------------------------------------------------ Móvil (táctil) */
  const m = await open(browser, 390, 844)
  await show(m, I)
  await sleep(600)
  const t0 = await m.eval(STATE(I))
  await tap(m, mid(t0.rect))
  await sleep(250)
  const t1 = await m.eval(STATE(I))
  check('mob · a tap shows the controls and does not open the viewer', t1.controls === 'on' && t1.overlayOpacity === '1.00' && !t1.viewer, { controls: t1.controls, viewer: t1.viewer })
  await sleep(3600)
  const t2 = await m.eval(STATE(I))
  check('mob · the controls hide again after ~3 s', t2.controls === 'off' && t2.overlayOpacity === '0.00')
  await sleep(5200)
  const t3 = await m.eval(STATE(I))
  check('mob · photos keep advancing after a tap', t3.counter !== t2.counter, { before: t2.counter, after: t3.counter })
  await tap(m, mid(t3.rect))
  await sleep(250)
  await tap(m, await at(m, `#hw-${I} [aria-label="Pause"]`))
  await sleep(300)
  const s0 = await m.eval(STATE(I))
  check('mob · tapping Pause pauses', s0.play === 'Play', { play: s0.play })
  const n0 = Number(s0.counter.slice(0, 2))
  const total = IMAGES.types.length
  await swipe(m, s0.rect.x + s0.rect.w * 0.8, s0.rect.x + s0.rect.w * 0.2, mid(s0.rect).y)
  await sleep(500)
  const s1 = await m.eval(STATE(I))
  check('mob · swipe left = next', s1.counter === of((n0 % total) + 1, IMAGES), { from: s0.counter, to: s1.counter })
  await swipe(m, s1.rect.x + s1.rect.w * 0.2, s1.rect.x + s1.rect.w * 0.8, mid(s1.rect).y)
  await sleep(500)
  check('mob · swipe right = previous', (await m.eval(STATE(I))).counter === s0.counter)
  await tap(m, mid(s1.rect))
  await sleep(300)
  await tap(m, await at(m, `#hw-${I} [aria-label="Enlarge"]`))
  await sleep(800)
  const ml1 = await m.eval(VIEWER_STATE)
  check('mob · tapping Enlarge opens the viewer', Boolean(ml1), ml1)
  await m.screenshot(join(OUT, 'mob-viewer.png'))
  await swipe(m, 330, 60, 420)
  await sleep(600)
  const ml2 = await m.eval(VIEWER_STATE)
  check('mob · swipe inside the viewer', ml2 && ml2.counter !== ml1?.counter, { from: ml1?.counter, to: ml2?.counter })
  await tap(m, await at(m, '[role=dialog][aria-label$="media viewer"] button[aria-label="Close"]'))
  await sleep(700)
  const ml3 = await m.eval(STATE(I))
  check('mob · closing the viewer leaves the card on that item', !ml3.viewer && ml3.counter === ml2?.counter, { card: ml3.counter, viewer: ml2?.counter })
  logs.push(...m.logs)
  await m.send('Page.close').catch(() => {})

  /* ------------------------------------------------------------ Movimiento reducido */
  const r = await open(browser, 390, 844, { reduced: true })
  await show(r, YOUTUBE.id)
  await sleep(1500)
  const y0 = await r.eval(STATE(YOUTUBE.id))
  const play = await at(r, `#hw-${YOUTUBE.id} [data-controls] button[aria-label^="Play"]`)
  check('reduced · YouTube does not start by itself and its poster is a play button', !y0.iframe && Boolean(play), { iframe: y0.iframe, button: Boolean(play) })
  await r.screenshot(join(OUT, 'reduced-youtube.png'))
  if (play) {
    await tap(r, play)
    await sleep(4500)
    check('reduced · tapping the poster starts the YouTube player', (await r.eval(STATE(YOUTUBE.id))).iframe)
  }
  await show(r, I)
  await sleep(2500)
  const r2 = await r.eval(STATE(I))
  check('reduced · photos do not advance by themselves', r2.counter === of(1, IMAGES) && r2.play === 'Play', { counter: r2.counter, play: r2.play })
  // El aviso de framer-motion sobre el movimiento reducido emulado no es un error del sitio.
  logs.push(...r.logs.filter((l) => !l.includes('Reduced Motion')))
  await r.send('Page.close').catch(() => {})
} finally {
  await browser.close()
}

const failed = results.filter((x) => !x.ok)
console.log(`\nconsole: ${logs.length ? logs.join('\n') : 'no errors'}`)
console.log(`${results.length - failed.length}/${results.length} passed`)
if (failed.length || logs.length) process.exit(1)
