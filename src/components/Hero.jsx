import { motion } from 'framer-motion'
import {
  ArrowRight,
  Atom,
  Braces,
  Code2,
  Database,
  Facebook,
  Figma,
  GitBranch,
  Github,
  GraduationCap,
  Layers,
  Lightbulb,
  Mail,
  Palette,
  Send,
} from 'lucide-react'
import useTypewriter from '../hooks/useTypewriter.js'
import { profile, typingWords } from '../data/site.js'
import { externalProps } from '../utils/ui.js'
import portraitWebp from '../assets/images/portrait.webp'
import portraitSmWebp from '../assets/images/portrait-sm.webp'
import portraitJpg from '../assets/images/portrait.jpg'

const container = {
  hide: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hide: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const infoCards = [
  { label: 'Computer Science Student', icon: GraduationCap, pos: 'md:-left-24 md:top-[6%]', dur: 5.5 },
  { label: 'UI/UX Enthusiast', icon: Palette, pos: 'md:-right-20 md:top-[20%]', dur: 6.5 },
  { label: 'Aspiring Web Developer', icon: Code2, pos: 'md:-left-24 md:bottom-[22%]', dur: 6 },
  { label: 'Creative Problem Solver', icon: Lightbulb, pos: 'md:-right-24 md:bottom-[6%]', dur: 7 },
]

const orbs = [
  { icon: Atom, color: '#16D9E8', cls: 'left-[-2%] top-[2%]', dur: 6 },
  { icon: Braces, color: '#F5C542', cls: 'right-[8%] top-[-3%]', dur: 7 },
  { icon: Figma, color: '#E83EAE', cls: 'right-[-4%] top-[44%]', dur: 5.5 },
  { icon: Database, color: '#5B9BFF', cls: 'left-[-5%] top-[52%]', dur: 6.5 },
  { icon: GitBranch, color: '#FF7A59', cls: 'left-[10%] bottom-[-3%]', dur: 7.5 },
  { icon: Layers, color: '#9B7BFF', cls: 'right-[6%] bottom-[2%]', dur: 6.2 },
]

const socials = [
  { label: 'GitHub', icon: Github, href: profile.github, external: true },
  { label: 'Facebook', icon: Facebook, href: profile.facebook, external: true },
  { label: 'Email', icon: Mail, href: `mailto:${profile.email}`, external: false },
]

export default function Hero({ ready, reduced }) {
  const typed = useTypewriter(typingWords, { disabled: !!reduced })

  return (
    <section id="home" aria-label="Introduction" className="relative flex min-h-[100svh] items-center pb-16 pt-28 lg:pt-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        {/* ---------- Text ---------- */}
        <motion.div variants={container} initial="hide" animate={ready ? 'show' : 'hide'} className="text-center lg:text-left">
          <motion.p variants={item} className="eyebrow inline-flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-neon to-magenta" aria-hidden="true" />
            Hello, I&apos;m Mike Rynzo
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 text-balance text-4xl font-bold leading-[1.1] sm:text-5xl xl:text-6xl"
          >
            <span className="gradient-text">{profile.fullName}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-display text-lg font-medium text-main sm:text-xl">
            {profile.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 font-display text-2xl font-semibold leading-snug text-main sm:text-3xl"
          >
            Turning Ideas Into <span className="gradient-text">Digital Experiences.</span>
          </motion.p>

          <motion.div variants={item} className="mt-5 flex min-h-[2rem] items-center justify-center gap-2 text-base sm:text-lg lg:justify-start">
            <span className="text-soft" aria-hidden="true">
              I&apos;m a
            </span>
            <span className="font-semibold text-accent" aria-hidden="true">
              {typed}
              <span className="caret" />
            </span>
            <span className="sr-only">{typingWords.join(', ')}</span>
          </motion.div>

          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-soft sm:text-lg lg:mx-0">
            I&apos;m Mike Rynzo L. Dela Vega, a Computer Science student passionate about technology,
            programming, web development, and creative UI/UX design. I enjoy transforming ideas into
            beautiful, functional, and user-friendly digital experiences.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row lg:justify-start">
            <motion.a href="#projects" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="btn btn-primary">
              Explore My Projects
              <ArrowRight size={18} aria-hidden="true" />
            </motion.a>
            <motion.a href="#contact" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="btn btn-ghost">
              <Send size={18} aria-hidden="true" />
              Let&apos;s Connect
            </motion.a>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex items-center justify-center gap-3 lg:justify-start" aria-label="Social links">
            {socials.map(({ label, icon: Icon, href, external }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  {...(external ? externalProps : {})}
                  aria-label={external ? `${label} (opens in a new tab)` : `${label}: ${profile.email}`}
                  title={label}
                  whileHover={{ y: -3 }}
                  className="icon-btn"
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------- Portrait ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-[400px] sm:max-w-[440px]"
        >
          <div className="relative mx-auto w-[78%]">
            {/* gradient circle + orbit rings behind portrait */}
            <div
              className="absolute left-1/2 top-1/2 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neon via-electric to-magenta opacity-80 blur-[1px]"
              aria-hidden="true"
            />
            <div
              className="spin-slow absolute left-1/2 top-1/2 aspect-square w-[148%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--accent)] opacity-40"
              aria-hidden="true"
            />
            <div
              className="spin-rev absolute left-1/2 top-1/2 aspect-square w-[168%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] opacity-70"
              aria-hidden="true"
            />

            {/* glowing frame */}
            <div className="animate-glow relative rounded-t-full rounded-b-[2rem] bg-gradient-to-br from-neon via-electric to-magenta p-[3px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[calc(2rem-3px)] bg-white">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${portraitSmWebp} 480w, ${portraitWebp} 800w`}
                    sizes="(min-width: 1024px) 340px, 70vw"
                  />
                  <img
                    src={portraitJpg}
                    alt="Portrait of Mike Rynzo L. Dela Vega wearing a black suit, white shirt and black tie"
                    width="800"
                    height="1075"
                    decoding="async"
                    fetchPriority="high"
                    className="h-full w-full object-cover object-top"
                  />
                </picture>
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_40px_rgba(8,13,32,0.18)]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-midnight/45 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* floating technology icons */}
            {orbs.map(({ icon: Icon, color, cls, dur }, i) => (
              <motion.div
                key={i}
                className={`tech-orb absolute hidden h-12 w-12 sm:grid ${cls}`}
                animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
                transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                aria-hidden="true"
              >
                <Icon size={22} color={color} strokeWidth={2} />
              </motion.div>
            ))}

            {/* floating glass info cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 md:mt-0 md:block">
              {infoCards.map(({ label, icon: Icon, pos, dur }, i) => (
                <motion.div
                  key={label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  className={`glass gradient-border bg-[var(--surface-strong)] flex items-center gap-2.5 rounded-2xl px-3 py-2.5 md:absolute md:whitespace-nowrap md:px-4 md:py-3 ${pos}`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-neon to-electric text-white">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold leading-tight text-main sm:text-sm">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
