'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import type Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    if (isTouch) return

    let cleanup = () => {}
    let cancelled = false

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: LenisLib }, { default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)

        const lenis = new LenisLib({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.4,
        })
        lenisRef.current = lenis

        const onScroll = () => ScrollTrigger.update()
        lenis.on('scroll', onScroll)

        const raf = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)

        cleanup = () => {
          lenis.off('scroll', onScroll)
          gsap.ticker.remove(raf)
          lenis.destroy()
          lenisRef.current = null
        }
      }
    )

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  // Reset scroll to top immediately on path changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [pathname])

  return <>{children}</>
}
