import { Fragment } from 'react'
import { INSTITUTIONS } from '../../data/content.js'
import { useApp } from '../../hooks/useApp.jsx'

/** Nombre de una institución enlazado a su sitio oficial, en pestaña nueva. Sin URL confirmada: solo el nombre. */
export function InstLink({ id, className = '' }) {
  const { t } = useApp()
  const inst = INSTITUTIONS[id]
  if (!inst) return null
  if (!inst.url) return <span className={className}>{inst.name}</span>

  return (
    <a
      href={inst.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${inst.name}, ${t.officialSite} (${t.newTab})`}
      className={`inst-link ${className}`}
    >
      {inst.name}
    </a>
  )
}

/** Texto con marcadores {id} de INSTITUTIONS: cada marcador se pinta como <InstLink>. */
export function RichText({ text }) {
  if (!text) return null
  return text
    .split(/\{(\w+)\}/)
    .map((part, i) => (i % 2 ? <InstLink key={i} id={part} /> : <Fragment key={i}>{part}</Fragment>))
}
