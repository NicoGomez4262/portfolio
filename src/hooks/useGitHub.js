import { useEffect, useState } from 'react'
import { PROFILE } from '../data/content.js'

const CACHE_KEY = 'ng-gh-cache'
const CACHE_TTL = 1000 * 60 * 60 * 6 // 6 horas: la API pública limita a 60 req/hora por IP

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.at > CACHE_TTL) return null
    return parsed.data
  } catch {
    return null
  }
}

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* sin caché: se vuelve a pedir en la próxima visita */
  }
}

/**
 * Estadísticas públicas de GitHub. Sin token: solo endpoints anónimos.
 * Cachea 6 h en el navegador para no agotar el límite de la API.
 */
export function useGitHub() {
  const [state, setState] = useState({ status: 'loading', data: readCache() })

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setState({ status: 'ready', data: cached })
      return
    }

    const controller = new AbortController()

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${PROFILE.githubUser}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?per_page=100&sort=pushed`, { signal: controller.signal }),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API')

        const user = await userRes.json()
        const repos = await reposRes.json()

        const byLang = {}
        for (const repo of repos) {
          if (repo.language) byLang[repo.language] = (byLang[repo.language] || 0) + 1
        }

        const languages = Object.entries(byLang)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }))

        const lastPush = repos.length
          ? repos.reduce((max, r) => (r.pushed_at > max ? r.pushed_at : max), repos[0].pushed_at)
          : null

        const data = {
          repos: user.public_repos ?? repos.length,
          stars: repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
          followers: user.followers ?? 0,
          since: user.created_at ? new Date(user.created_at).getFullYear() : null,
          lastPush,
          languages,
        }

        writeCache(data)
        setState({ status: 'ready', data })
      } catch (err) {
        if (err.name === 'AbortError') return
        setState({ status: 'error', data: null })
      }
    }

    load()
    return () => controller.abort()
  }, [])

  return state
}
