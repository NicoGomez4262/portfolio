import Reveal from './Reveal.jsx'

/** Envoltura estándar de sección: ancla, ancho máximo y encabezado con índice tipo plano. */
export default function Section({ id, index, kicker, title, intro, children, className = '', aside = null }) {
  return (
    <section id={id} className={`relative scroll-mt-16 px-4 py-20 sm:px-8 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(kicker || title) && (
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <div className="max-w-3xl">
              {kicker && (
                <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  {index && <span className="text-ink-faint">{index}</span>}
                  <span aria-hidden className="h-px w-8 bg-accent/60" />
                  {kicker}
                </p>
              )}
              {title && <h2 className="text-3xl font-semibold text-ink sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">{title}</h2>}
              {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-dim md:text-lg">{intro}</p>}
            </div>
            {aside}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
