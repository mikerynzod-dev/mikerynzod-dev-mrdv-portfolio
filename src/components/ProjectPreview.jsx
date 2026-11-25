/** Preview image for a project — uses a real screenshot when provided, otherwise a branded gradient. */
export default function ProjectPreview({ project, className = '' }) {
  const Icon = project.icon
  const [a, b] = project.gradient
  return (
    <div
      className={`preview-grid relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" aria-hidden="true" />
          <span className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-black/25 blur-2xl" aria-hidden="true" />
          <span className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/30 bg-white/15 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <Icon size={38} className="text-white" strokeWidth={1.6} aria-hidden="true" />
          </span>
        </>
      )}
    </div>
  )
}
