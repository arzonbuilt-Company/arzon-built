'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface CountUpOptions {
  end: number
  duration?: number
  start?: number
  decimals?: number
}

export function useCountUp({ end, duration = 1800, start = 0, decimals = 0 }: CountUpOptions) {
  const [value, setValue] = useState(start)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!ref.current) return
    if (reduced) {
      setValue(end)
      return
    }

    const node = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [end, hasStarted, reduced])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = start + (end - start) * eased
      setValue(decimals === 0 ? Math.floor(current) : Number(current.toFixed(decimals)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [hasStarted, end, start, duration, decimals])

  return { value, ref }
}
