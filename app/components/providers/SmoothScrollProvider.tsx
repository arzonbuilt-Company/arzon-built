'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    // Lenis/GSAP are only ever used for the desktop smooth-scroll feel below —
    // nothing in the app registers a real ScrollTrigger animation, so on touch
    // there is nothing to gain from downloading either library at all.
    if (isTouch) return

    let cleanup = () => {}
    let cancelled = false

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.4,
        })

        const onScroll = () => ScrollTrigger.update()
        lenis.on('scroll', onScroll)

        const raf = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)

        cleanup = () => {
          lenis.off('scroll', onScroll)
          gsap.ticker.remove(raf)
          lenis.destroy()
        }
      }
    )

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return <>{children}</>
}
