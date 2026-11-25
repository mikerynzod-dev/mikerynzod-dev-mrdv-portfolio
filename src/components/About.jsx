import { motion } from 'framer-motion'
import { GraduationCap, Mail, Sparkles, Target, User } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { profile } from '../data/site.js'
import portraitSmWebp from '../assets/images/portrait-sm.webp'

const interests = ['UI/UX Design', 'Programming', 'Web Development', 'Technology']

const infoRows = [
  { icon: User, label: 'Full Name', value: profile.fullName },
  { icon: GraduationCap, label: 'Course', value: 'Bachelor of Science in Computer Science' },
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Target, label: 'Career Goal', value: 'To become a skilled technology professional and creative developer.' },
]

export default function About() {
  return (
    <Section id="about" eyebrow="About Me" title="Get to Know Me">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Profile info card */}
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <motion.div
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-magenta to-neon opacity-60 blur-2xl"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-electric opacity-30 blur-3xl" aria-hidden="true" />

            <div className="glass gradient-border relative rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0">
                  <div className="spin-slow absolute -inset-1.5 rounded-full border border-dashed border-[var(--accent)] opacity-60" aria-hidden="true" />
                  <img
                    src={portraitSmWebp}
                    alt="Mike Rynzo L. Dela Vega"
                    loading="lazy"
                    decoding="async"
                    width="80"
                    height="80"
                    className="h-20 w-20 rounded-full border-2 border-electric bg-white object-cover object-[50%_12%]"
                  />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-main">{profile.fullName}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-accent">
                    <Sparkles size={14} aria-hidden="true" /> {profile.brand}
                  </p>
                </div>
              </div>

              <dl className="mt-7 space-y-5">
                {infoRows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-neon to-electric text-white shadow-[0_8px_20px_-8px_rgba(84,39,217,0.9)]">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-soft">{label}</dt>
                      <dd className="mt-0.5 break-words text-sm font-medium text-main sm:text-base">
                        {href ? (
                          <a href={href} className="hover:text-accent">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <Reveal delay={0.1}>
          <h3 className="font-display text-2xl font-bold text-main sm:text-3xl">
            Technology, design, and <span className="gradient-text">meaningful experiences.</span>
          </h3>
          <p className="mt-5 text-base leading-relaxed text-soft sm:text-lg">
            I&apos;m a passionate Computer Science student who loves exploring technology and creating
            meaningful digital experiences. I enjoy learning new programming languages, designing
            creative interfaces, and developing solutions that combine functionality and innovation.
          </p>

          <h4 className="mt-8 text-sm font-semibold uppercase tracking-widest text-soft">Interests</h4>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {interests.map((i, idx) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass gradient-border rounded-full px-4 py-2 text-sm font-medium text-main"
              >
                {i}
              </motion.li>
            ))}
          </ul>

          <div className="glass gradient-border mt-8 rounded-2xl p-5 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
              <Target size={16} aria-hidden="true" /> Career Goal
            </p>
            <p className="mt-2 text-base leading-relaxed text-main sm:text-lg">
              To become a skilled technology professional and creative developer.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
