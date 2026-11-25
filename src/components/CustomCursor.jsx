import { useEffect, useRef, useState } from 'react'

/** Dot + trailing ring cursor. Only on fine-pointer devices without reduced motion. */
export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduce)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const root = document.documentElement
    root.classList.add('custom-cursor')

    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let raf = 0
    let shown = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!shown && dot.current && ring.current) {
        shown = true
        dot.current.style.opacity = '1'
        ring.current.style.opacity = '1'
        rx = x
        ry = y
      }
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      const t = e.target
      const hot = t && t.closest ? t.closest('a, button, input, textarea, select, label, [role="button"]') : null
      if (ring.current) ring.current.dataset.hot = hot ? '1' : '0'
    }
    const onLeave = () => {
      shown = false
      if (dot.current) dot.current.style.opacity = '0'
      if (ring.current) ring.current.style.opacity = '0'
    }
    const loop = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      root.classList.remove('custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ring} className="cursor-ring" data-hot="0" aria-hidden="true">
        <span />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
