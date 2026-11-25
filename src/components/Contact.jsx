import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Facebook,
  Github,
  Loader2,
  Mail,
  Send,
} from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { profile } from '../data/site.js'
import { externalProps, spotlight } from '../utils/ui.js'

// Formspree ID: set `formspreeId` in the config block of index.html (standalone) or VITE_FORMSPREE_ID in .env (Vite).
const FORM_ID =
  (typeof window !== 'undefined' && window.MRDV_CONFIG && window.MRDV_CONFIG.formspreeId) ||
  (import.meta.env && import.meta.env.VITE_FORMSPREE_ID) ||
  ''
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const cards = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    gradient: 'from-magenta to-neon',
    external: false,
  },
  {
    label: 'Facebook',
    value: 'facebook.com/rynzozkie.delavega',
    href: profile.facebook,
    icon: Facebook,
    gradient: 'from-electric to-neon',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/mikerynzod-dev',
    href: profile.github,
    icon: Github,
    gradient: 'from-neon to-electric',
    external: true,
  },
]

const initialValues = { name: '', email: '', subject: '', message: '', _gotcha: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.subject.trim()) e.subject = 'Please enter a subject.'
  if (!v.message.trim()) e.message = 'Please write a message.'
  else if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.'
  return e
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-main">
        {label} <span className="text-accent" aria-hidden="true">*</span>
        <span className="sr-only"> (required)</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--danger)]">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const [copied, setCopied] = useState(false)
  const formRef = useRef(null)

  const setField = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onBlur = (e) => {
    const { name } = e.target
    if (name === '_gotcha') return
    const next = validate(values)
    setErrors((er) => ({ ...er, [name]: next[name] }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const mailtoFallback = () =>
    `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`,
    )}`

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status.state === 'loading') return
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      setStatus({ state: 'idle', message: '' })
      return
    }
    // Honeypot: bots fill this hidden field. Pretend success, send nothing.
    if (values._gotcha) {
      setStatus({ state: 'success', message: 'Thank you! Your message has been sent.' })
      return
    }
    // Never pretend a message was sent when no backend is configured.
    if (!FORM_ID) {
      setStatus({
        state: 'unconfigured',
        message:
          'The contact form is not connected to an email service yet, so your message was NOT sent. Please use the button below to email me directly.',
      })
      return
    }

    setStatus({ state: 'loading', message: '' })
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          _replyto: values.email.trim(),
          _subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      })
      if (res.ok) {
        setStatus({ state: 'success', message: "Thank you! Your message has been sent. I'll get back to you soon." })
        setValues(initialValues)
        setErrors({})
      } else {
        let detail = ''
        try {
          const data = await res.json()
          detail = data?.errors?.map((x) => x.message).join(' ') || ''
        } catch {
          /* no JSON body */
        }
        setStatus({
          state: 'error',
          message: `Sorry, your message could not be sent. ${detail || 'Please try again or email me directly.'}`,
        })
      }
    } catch {
      setStatus({
        state: 'error',
        message: 'Network error — your message could not be sent. Please check your connection or email me directly.',
      })
    }
  }

  const loading = status.state === 'loading'
  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: setField,
    onBlur,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    disabled: loading,
  })

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's Build Something Amazing!"
      subtitle="I'm always excited to learn, collaborate, and explore new opportunities in technology and design. Feel free to connect with me!"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Contact cards */}
        <div className="space-y-4">
          {cards.map(({ label, value, href, icon: Icon, gradient, external }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <motion.a
                href={href}
                {...(external ? externalProps : {})}
                onMouseMove={spotlight}
                whileHover={{ y: -4, x: 4 }}
                aria-label={external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
                className="spotlight glass gradient-border group flex min-h-[84px] items-center gap-4 rounded-2xl p-4 sm:p-5"
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-[0_10px_24px_-8px_rgba(84,39,217,0.9)] transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110`}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-soft">{label}</span>
                  <span className="mt-0.5 block break-words text-sm font-semibold text-main sm:text-base">{value}</span>
                </span>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                />
              </motion.a>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <button type="button" onClick={copyEmail} className="btn btn-ghost btn-sm w-full sm:w-auto">
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? 'Email copied!' : 'Copy email address'}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact form"
            className="glass gradient-border space-y-5 rounded-3xl p-5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full Name" error={errors.name}>
                <input {...inputProps('name')} type="text" autoComplete="name" placeholder="Your full name" className="field" />
              </Field>
              <Field id="email" label="Email Address" error={errors.email}>
                <input
                  {...inputProps('email')}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="field"
                />
              </Field>
            </div>
            <Field id="subject" label="Subject" error={errors.subject}>
              <input {...inputProps('subject')} type="text" placeholder="What is this about?" className="field" />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea {...inputProps('message')} rows={6} placeholder="Write your message here..." className="field resize-y" />
            </Field>

            {/* Honeypot (hidden from people and screen readers) */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" value={values._gotcha} onChange={setField} />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? undefined : { y: -3 }}
              whileTap={loading ? undefined : { scale: 0.98 }}
              className="btn btn-primary w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} aria-hidden="true" />
                  Send Message
                </>
              )}
            </motion.button>

            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {status.state === 'success' && (
                  <motion.p
                    key="ok"
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-[var(--ok)] bg-[var(--surface)] p-4 text-sm text-[var(--ok)]"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {status.message}
                  </motion.p>
                )}
                {(status.state === 'error' || status.state === 'unconfigured') && (
                  <motion.div
                    key="err"
                    role="alert"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-[var(--danger)] bg-[var(--surface)] p-4 text-sm text-[var(--danger)]"
                  >
                    <p className="flex items-start gap-2">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                      {status.message}
                    </p>
                    <a href={mailtoFallback()} className="btn btn-ghost btn-sm mt-3">
                      <Mail size={16} aria-hidden="true" />
                      Email me directly
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
