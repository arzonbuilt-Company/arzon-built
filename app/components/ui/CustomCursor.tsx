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
      rx = lerp(rx, mx, 0.12); ry = lerp(ry, my, 0.12)
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()

    const onMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const text = target.getAttribute('data-cursor-text')
      
      document.body.classList.add('cursor-hover')
      if (text) {
        document.body.classList.add('cursor-hover-text')
        ring.innerHTML = `<span class="cursor-text">${text}</span>`
        ring.classList.add('has-text')
      }
    }

    const onMouseLeave = () => {
      document.body.classList.remove('cursor-hover')
      document.body.classList.remove('cursor-hover-text')
      ring.innerHTML = ''
      ring.classList.remove('has-text')
    }

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-cursor], [data-cursor-text]').forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
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
