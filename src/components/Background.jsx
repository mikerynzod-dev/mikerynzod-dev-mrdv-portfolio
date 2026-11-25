import { useEffect, useRef } from 'react'

const COLORS = ['124,92,255', '36,107,253', '232,62,174', '22,217,232']

/**
 * Fixed technology-themed background:
 *  - soft gradient blobs
 *  - faint grid
 *  - a canvas particle network (paused when the tab is hidden, static when reduced motion)
 *  - a radial glow that follows the mouse
 */
export default function Background({ reduced }) {
  const canvasRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let w = 0
    let h = 0
    let raf = 0
    let pts = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},0.75)`
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = dx * dx + dy * dy
          if (d < 14400) {
            ctx.strokeStyle = `rgba(${p.c},${(1 - d / 14400) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.floor((w * h) / 24000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.5 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
      if (reduced) draw()
    }

    const tick = () => {
      draw()
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!reduced && !raf) raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    start()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  // Mouse-responsive glow (desktop only)
  useEffect(() => {
    const el = glowRef.current
    if (!el || reduced) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let raf = 0
    let nx = 0
    let ny = 0
    const apply = () => {
      el.style.setProperty('--mx', `${nx}px`)
      el.style.setProperty('--my', `${ny}px`)
      raf = 0
    }
    const onMove = (e) => {
      nx = e.clientX
      ny = e.clientY
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="animate-blob absolute -left-32 top-10 h-[460px] w-[460px] rounded-full bg-neon opacity-[0.22] blur-[120px]" />
      <div
        className="animate-blob absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-electric opacity-[0.2] blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-blob absolute bottom-[-120px] left-1/3 h-[380px] w-[380px] rounded-full bg-magenta opacity-[0.14] blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000 10%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse at 50% 30%, #000 10%, transparent 70%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(520px circle at var(--mx, 50%) var(--my, 25%), rgba(124,92,255,0.16), transparent 65%)',
        }}
      />
    </div>
  )
}
