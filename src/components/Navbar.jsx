import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import { profile } from '../data/site.js'

export default function Navbar({ links, active, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'nav-solid' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          className="group flex items-center gap-2 font-display text-2xl font-bold tracking-wider"
          aria-label={`${profile.brand} — back to top`}
          onClick={() => setOpen(false)}
        >
          <span className="gradient-text transition-all duration-300 group-hover:tracking-[0.18em]">
            {profile.brand}
          </span>
          <span className="h-2 w-2 rounded-full bg-magenta shadow-[0_0_12px_2px_#E83EAE]" aria-hidden="true" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.id
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-main' : 'text-soft hover:text-main'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-[0_0_20px_-4px_rgba(84,39,217,0.7)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                  <span
                    className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-neon via-electric to-magenta transition-all duration-300 ${
                      isActive ? 'w-5' : 'w-0'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-[var(--border)] lg:hidden"
          >
            <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {links.map((l, i) => {
                const isActive = active === l.id
                return (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 text-base font-medium transition-colors ${
                        isActive
                          ? 'border border-[var(--border)] bg-[var(--surface)] text-main'
                          : 'text-soft hover:bg-[var(--surface)] hover:text-main'
                      }`}
                    >
                      {l.label}
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-magenta shadow-[0_0_10px_2px_#E83EAE]" aria-hidden="true" />
                      )}
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
