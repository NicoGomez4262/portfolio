/**
 * Cliente mínimo del Chrome DevTools Protocol, sin dependencias (Node 22: WebSocket y fetch nativos).
 * Lo usan scripts/verify.mjs (capturas y auditoría del sitio) y scripts/og.mjs (imagen Open Graph).
 */
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function connect(url) {
  const ws = new WebSocket(url)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = reject
  })
  let seq = 0
  const pending = new Map()
  const listeners = new Set()
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data)
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id)
      pending.delete(msg.id)
      if (msg.error) reject(new Error(msg.error.message))
      else resolve(msg.result)
    } else if (msg.method) {
      listeners.forEach((fn) => fn(msg))
    }
  }
  return {
    send(method, params = {}, sessionId) {
      const id = ++seq
      ws.send(JSON.stringify({ id, method, params, ...(sessionId && { sessionId }) }))
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
    },
    on(fn) {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
    close: () => ws.close(),
  }
}

export class Page {
  constructor(conn, sessionId) {
    this.conn = conn
    this.session = sessionId
    this.logs = []
  }

  send(method, params) {
    return this.conn.send(method, params, this.session)
  }

  async init() {
    await this.send('Page.enable')
    await this.send('Runtime.enable')
    await this.send('Log.enable')
    this.conn.on((msg) => {
      if (msg.sessionId !== this.session) return
      const p = msg.params
      if (msg.method === 'Runtime.consoleAPICalled' && (p.type === 'error' || p.type === 'warning')) {
        this.logs.push(`[console.${p.type}] ${p.args.map((a) => a.value ?? a.description ?? '').join(' ')}`)
      } else if (msg.method === 'Runtime.exceptionThrown') {
        this.logs.push(`[exception] ${p.exceptionDetails.exception?.description ?? p.exceptionDetails.text}`)
      } else if (msg.method === 'Log.entryAdded' && p.entry.level === 'error') {
        this.logs.push(`[log] ${p.entry.text} ${p.entry.url ?? ''}`.trim())
      }
    })
    return this
  }

  /** Viewport emulado. Por debajo de 768 px se emula un teléfono (touch y user agent móvil). */
  async viewport(width, height, { mobile = width < 768 } = {}) {
    await this.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
    await this.send('Emulation.setTouchEmulationEnabled', mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false })
  }

  async media(features) {
    await this.send('Emulation.setEmulatedMedia', { features })
  }

  /** Script que corre antes que el de la página en cada carga (p. ej. fijar tema e idioma en localStorage). */
  async beforeLoad(source) {
    return this.send('Page.addScriptToEvaluateOnNewDocument', { source })
  }

  async goto(url, { settle = 900 } = {}) {
    const loaded = new Promise((resolve) => {
      const off = this.conn.on((m) => {
        if (m.sessionId === this.session && m.method === 'Page.loadEventFired') {
          off()
          resolve()
        }
      })
    })
    await this.send('Page.navigate', { url })
    await Promise.race([loaded, sleep(25000)])
    await sleep(settle)
  }

  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text)
    return r.result.value
  }

  async key(key, { shift = false } = {}) {
    const codes = { Tab: 9, Escape: 27, Enter: 13 }
    const base = { key, code: key, windowsVirtualKeyCode: codes[key], nativeVirtualKeyCode: codes[key], modifiers: shift ? 8 : 0 }
    await this.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...base })
    await this.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base })
  }

  /** Captura. `full` usa captureBeyondViewport por tramos (el alto de una captura tiene límite) y devuelve los tramos. */
  async screenshot(path, { full = false, format = 'png', quality = 82, segment = 6000 } = {}) {
    if (!full) {
      const { data } = await this.send('Page.captureScreenshot', { format, ...(format === 'jpeg' && { quality }) })
      writeFileSync(path, Buffer.from(data, 'base64'))
      return [path]
    }
    const { width, height } = await this.eval(
      '({ width: document.documentElement.clientWidth, height: Math.ceil(document.documentElement.scrollHeight) })',
    )
    const parts = []
    for (let y = 0, i = 0; y < height; y += segment, i++) {
      const h = Math.min(segment, height - y)
      const { data } = await this.send('Page.captureScreenshot', {
        format,
        ...(format === 'jpeg' && { quality }),
        captureBeyondViewport: true,
        clip: { x: 0, y, width, height: h, scale: 1 },
      })
      const part = path.replace(/(\.\w+)$/, `.part${i}$1`)
      writeFileSync(part, Buffer.from(data, 'base64'))
      parts.push(part)
    }
    return parts
  }
}

/** Puerto de depuración: 9333, o CDP_PORT si otro Chrome headless (otra sesión, og.mjs) ya lo está usando. */
export async function launch({ port = Number(process.env.CDP_PORT) || 9333 } = {}) {
  const profile = mkdtempSync(join(tmpdir(), 'ng-cdp-'))
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--force-color-profile=srgb',
      '--disable-gpu',
      'about:blank',
    ],
    { stdio: 'ignore' },
  )

  let version
  for (let i = 0; i < 60 && !version; i++) {
    try {
      version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()
    } catch {
      await sleep(250)
    }
  }
  if (!version) throw new Error(`Chrome no respondió en el puerto ${port}`)
  const conn = await connect(version.webSocketDebuggerUrl)

  return {
    async newPage() {
      const { targetId } = await conn.send('Target.createTarget', { url: 'about:blank' })
      const { sessionId } = await conn.send('Target.attachToTarget', { targetId, flatten: true })
      return new Page(conn, sessionId).init()
    },
    async close() {
      try {
        await conn.send('Browser.close')
      } catch {
        /* ya cerrado */
      }
      conn.close()
      proc.kill()
      await sleep(400)
      try {
        rmSync(profile, { recursive: true, force: true })
      } catch {
        /* Windows puede retener el perfil unos segundos */
      }
    },
  }
}
