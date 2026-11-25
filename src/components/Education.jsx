import { motion } from 'framer-motion'
import Section from './Section.jsx'
import { education } from '../data/education.js'

function TimelineItem({ entry, index }) {
  const Icon = entry.icon
  const left = index % 2 === 0
  const isEmpty = !entry.meta.length && !entry.items.length

  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-16 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
    >
      {/* glowing node */}
      <span
        className="absolute left-0 top-1 z-10 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon via-electric to-magenta text-white shadow-[0_0_0_6px_var(--bg),0_0_28px_4px_rgba(84,39,217,0.8)] md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      >
        <Icon size={18} />
      </span>

      <div className={left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}>
        <article
          className={`glass gradient-border rounded-3xl p-5 sm:p-6 ${
            isEmpty ? 'border-dashed' : ''
          }`}
        >
          <p className="eyebrow">{entry.label}</p>
          <h3 className="mt-2 font-display text-xl font-bold text-main sm:text-2xl">{entry.title}</h3>

          {entry.meta.length > 0 && (
            <dl className={`mt-4 space-y-2 text-sm ${left ? 'md:flex md:flex-col md:items-end' : ''}`}>
              {entry.meta.map(({ k, v }) => (
                <div key={k}>
                  <dt className="inline text-soft">{k}: </dt>
                  <dd className="inline font-semibold text-main">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {entry.items.length > 0 && (
            <ul className={`mt-4 flex flex-wrap gap-2 ${left ? 'md:justify-end' : ''}`}>
              {entry.items.map((i) => (
                <li key={i} className="chip">
                  {i}
                </li>
              ))}
            </ul>
          )}

          {isEmpty && <p className="mt-3 text-sm italic text-soft">To be added — coming soon.</p>}
        </article>
      </div>
    </motion.li>
  )
}

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="My Academic Journey"
      subtitle="Where my Computer Science path is taking shape."
    >
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ originY: 0 }}
          className="animate-line-glow absolute bottom-0 left-5 top-2 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-neon via-electric to-magenta shadow-[0_0_16px_2px_rgba(84,39,217,0.7)] md:left-1/2"
          aria-hidden="true"
        />
        <ol className="space-y-10 md:space-y-12">
          {education.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
