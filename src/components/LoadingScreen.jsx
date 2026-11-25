import { useEffect } from 'react'
import { motion } from 'framer-motion'

const letters = ['M', 'R', 'D', 'V']

export default function LoadingScreen({ onDone, reduced }) {
  const duration = reduced ? 600 : 1900

  useEffect(() => {
    const t = setTimeout(onDone, duration)
    return () => clearTimeout(t)
  }, [onDone, duration])

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-midnight"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-neon via-electric to-magenta opacity-30 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center px-6">
        <div className="flex gap-1 font-display text-6xl font-bold sm:text-7xl" aria-hidden="true">
          {letters.map((l, i) => (
            <motion.span
              key={l}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
              className="bg-gradient-to-br from-[#9B7BFF] via-[#5B9BFF] to-[#FF6FC8] bg-clip-text text-transparent"
            >
              {l}
            </motion.span>
          ))}
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#AAB3D6]">Loading experience</p>
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-neon via-electric to-magenta"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: duration / 1000 - 0.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
