import { motion } from 'framer-motion'

/** Fades/slides children in once when they scroll into view. */
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
