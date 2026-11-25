import Reveal from './Reveal'

export default function SectionTitle({ eyebrow, title }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan">{eyebrow}</p>
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        <span className="grad-text">{title}</span>
      </h2>
      <div className="mx-auto mt-5 h-1 w-24 rounded-full grad-bg" />
    </Reveal>
  )
}
