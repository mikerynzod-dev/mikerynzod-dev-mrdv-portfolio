import { motion } from 'framer-motion'
import { Eye, Github } from 'lucide-react'
import ProjectPreview from './ProjectPreview.jsx'
import { profile } from '../data/site.js'
import { externalProps } from '../utils/ui.js'

export default function ProjectCard({ project, onOpen }) {
  const hasRepo = Boolean(project.repo)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -8 }}
      className="group glass gradient-border flex flex-col overflow-hidden rounded-3xl transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(84,39,217,0.7)]"
      aria-labelledby={`project-${project.id}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
          <ProjectPreview project={project} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-midnight/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          {project.category}
        </span>
        {project.placeholder && (
          <span className="absolute right-3 top-3 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            Placeholder
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={`project-${project.id}`} className="font-display text-xl font-bold text-main">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-soft">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.length ? (
            project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))
          ) : (
            <li className="chip opacity-70">Tech stack to be added</li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <button type="button" onClick={() => onOpen(project)} className="btn btn-primary btn-sm flex-1">
            <Eye size={16} aria-hidden="true" />
            View Project
          </button>
          <a
            href={hasRepo ? project.repo : profile.github}
            {...externalProps}
            className="btn btn-ghost btn-sm flex-1"
            aria-label={
              hasRepo
                ? `Source code for ${project.title} (opens in a new tab)`
                : `Open my GitHub profile — no repository for ${project.title} yet (opens in a new tab)`
            }
          >
            <Github size={16} aria-hidden="true" />
            {hasRepo ? 'Source Code' : 'GitHub Profile'}
          </a>
        </div>
      </div>
    </motion.article>
  )
}
