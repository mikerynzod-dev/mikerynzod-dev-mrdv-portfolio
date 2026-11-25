import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import ProjectPreview from './ProjectPreview.jsx'
import { profile } from '../data/site.js'
import { externalProps } from '../utils/ui.js'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const nodes = dialogRef.current.querySelectorAll(FOCUSABLE)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (previous && previous.focus) previous.focus()
    }
  }, [onClose])

  const hasRepo = Boolean(project.repo)
  const hasDemo = Boolean(project.demo)

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-[var(--border)] bg-[var(--surface-strong)] shadow-[0_30px_100px_-20px_rgba(84,39,217,0.8)] sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="icon-btn absolute right-3 top-3 z-10 bg-midnight/70 text-white backdrop-blur-md"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="aspect-[16/8] w-full">
          <ProjectPreview project={project} />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{project.category}</span>
            {project.placeholder && <span className="chip text-accent">Placeholder — details coming soon</span>}
          </div>

          <h3 id="project-modal-title" className="mt-4 font-display text-2xl font-bold text-main sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-soft">{project.description}</p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-widest text-soft">Overview</h4>
          <p className="mt-2 text-base leading-relaxed text-main">{project.details}</p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-widest text-soft">Technologies</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
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

          {project.images?.length > 0 && (
            <>
              <h4 className="mt-6 text-sm font-semibold uppercase tracking-widest text-soft">Gallery</h4>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.images.map((src, i) => (
                  <li key={src} className="overflow-hidden rounded-xl border border-[var(--border)]">
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {hasDemo ? (
              <a href={project.demo} {...externalProps} className="btn btn-primary flex-1">
                <ExternalLink size={18} aria-hidden="true" />
                Live Demo
              </a>
            ) : (
              <span role="note" aria-disabled="true" className="btn btn-ghost flex-1">
                <ExternalLink size={18} aria-hidden="true" />
                Live demo not available yet
              </span>
            )}
            <a href={hasRepo ? project.repo : profile.github} {...externalProps} className="btn btn-ghost flex-1">
              <Github size={18} aria-hidden="true" />
              {hasRepo ? 'Source Code on GitHub' : 'Visit My GitHub'}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
