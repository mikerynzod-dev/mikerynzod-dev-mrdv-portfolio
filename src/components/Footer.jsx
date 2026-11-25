import { ArrowUp, Facebook, Github, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { navLinks, profile } from '../data/site.js'
import { externalProps, scrollToTop } from '../utils/ui.js'

const socials = [
  { label: 'Facebook', icon: Facebook, href: profile.facebook, external: true },
  { label: 'GitHub', icon: Github, href: profile.github, external: true },
  { label: 'Email', icon: Mail, href: `mailto:${profile.email}`, external: false },
]

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-[var(--border)]">
      <div
        className="animate-line-glow absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent shadow-[0_0_20px_2px_rgba(36,107,253,0.8)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr_1fr]">
          <div>
            <a href="#home" className="gradient-text font-display text-4xl font-bold tracking-wider" aria-label="MRDV — back to top">
              {profile.brand}
            </a>
            <p className="mt-3 font-display text-lg font-semibold text-main">{profile.fullName}</p>
            <p className="mt-1 text-soft">{profile.tagline}</p>
            <ul className="mt-6 flex gap-3" aria-label="Social links">
              {socials.map(({ label, icon: Icon, href, external }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    {...(external ? externalProps : {})}
                    aria-label={external ? `${label} (opens in a new tab)` : `${label}: ${profile.email}`}
                    whileHover={{ y: -4 }}
                    className="icon-btn"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-soft">Navigate</h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="inline-flex min-h-[40px] items-center text-main transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-soft">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm sm:text-base">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 break-all text-main hover:text-accent">
                  <Mail size={16} aria-hidden="true" /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.facebook} {...externalProps} className="inline-flex items-center gap-2 break-all text-main hover:text-accent">
                  <Facebook size={16} aria-hidden="true" /> rynzozkie.delavega
                </a>
              </li>
              <li>
                <a href={profile.github} {...externalProps} className="inline-flex items-center gap-2 break-all text-main hover:text-accent">
                  <Github size={16} aria-hidden="true" /> mikerynzod-dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-soft">© {profile.year} Mike Rynzo L. Dela Vega. All Rights Reserved.</p>
          <button type="button" onClick={scrollToTop} className="btn btn-ghost btn-sm">
            <ArrowUp size={16} aria-hidden="true" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
