import { motion } from 'framer-motion'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { databaseCategory, skillCategories } from '../data/skills.js'
import { spotlight } from '../utils/ui.js'

function SkillTile({ skill, index }) {
  const Icon = skill.icon
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="group glass gradient-border flex min-h-[64px] items-center gap-3 rounded-2xl p-3 transition-shadow duration-300 hover:shadow-[0_12px_30px_-10px_var(--tile)]"
      style={{ '--tile': skill.color }}
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
        style={{
          background: `linear-gradient(145deg, ${skill.color}33, ${skill.color}11)`,
          border: `1px solid ${skill.color}66`,
          boxShadow: `0 0 18px -4px ${skill.color}88`,
        }}
      >
        <Icon size={20} color={skill.color} aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold leading-tight text-main">{skill.name}</span>
    </motion.li>
  )
}

function CategoryCard({ category, delay = 0, wide = false }) {
  const Icon = category.icon
  return (
    <Reveal delay={delay} className={wide ? 'lg:col-span-3' : ''}>
      <article
        onMouseMove={spotlight}
        className="spotlight glass gradient-border h-full rounded-3xl p-5 sm:p-6"
        aria-labelledby={`skills-${category.id}`}
      >
        <header className="mb-5 flex items-center gap-3">
          <span
            className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-[0_10px_24px_-8px_rgba(84,39,217,0.9)]`}
          >
            <Icon size={22} aria-hidden="true" />
          </span>
          <h3 id={`skills-${category.id}`} className="font-display text-lg font-bold text-main sm:text-xl">
            {category.title}
          </h3>
        </header>
        <ul className={`grid gap-3 ${wide ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 min-[420px]:grid-cols-2'}`}>
          {category.items.map((s, i) => (
            <SkillTile key={s.name} skill={s} index={i} />
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="My Technical Skills"
      subtitle="The languages, design practices, and tools I work with while learning and building."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {skillCategories.map((c, i) => (
          <CategoryCard key={c.id} category={c} delay={i * 0.1} />
        ))}
        <CategoryCard category={databaseCategory} delay={0.3} wide />
      </div>
    </Section>
  )
}
