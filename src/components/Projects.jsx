import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projectCategories, projects } from '../data/projects.js'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const closeModal = useCallback(() => setSelected(null), [])

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const countFor = (c) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length)

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="My Creative Projects"
      subtitle="A growing showcase of what I design and build. Placeholder cards will be replaced as I complete and publish more work."
    >
      <Reveal>
        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap justify-center gap-2.5">
          {projectCategories.map((c) => {
            const active = filter === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={active}
                className={`relative isolate min-h-[44px] rounded-full border px-4 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-transparent text-white'
                    : 'border-[var(--border)] bg-[var(--surface)] text-soft hover:text-main'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-neon via-electric to-magenta shadow-[0_8px_24px_-8px_rgba(84,39,217,0.9)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {c}
                <span className="ml-1.5 text-xs opacity-70">{countFor(c)}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence>
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </Section>
  )
}
