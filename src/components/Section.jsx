import Reveal from './Reveal.jsx'

/** Shared section wrapper: consistent spacing, container and animated heading. */
export default function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="mt-3 text-3xl font-bold text-main sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <div
            className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-neon via-electric to-magenta"
            aria-hidden="true"
          />
          {subtitle && <p className="mt-5 text-base leading-relaxed text-soft sm:text-lg">{subtitle}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
