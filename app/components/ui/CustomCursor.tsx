'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0, rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'; dot.style.top = my + 'px'
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animate = () => {
      rx = lerp(rx, mx, 0.11); ry = lerp(ry, my, 0.11)
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const rm = () => document.body.classList.remove('cursor-hover', 'cursor-service')
    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        const type = el.getAttribute('data-cursor')
        el.addEventListener('mouseenter', () => {
          rm()
          document.body.classList.add(type === 'service' ? 'cursor-service' : 'cursor-hover')
        })
        el.addEventListener('mouseleave', rm)
      })
    }
    attachHover()
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
