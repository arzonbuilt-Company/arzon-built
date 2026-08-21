'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Tag = 'a' | 'button'

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: Tag
  href?: string
  strength?: number
  className?: string
  children: React.ReactNode
}

export function MagneticButton({
  as = 'a',
  href,
  strength = 0.35,
  className = '',
  children,
  ...rest
}: MagneticButtonProps) {
  const elRef = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLSpanElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = elRef.current
    const inner = innerRef.current
    if (!el || !inner) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      targetRef.current.x = dx * strength
      targetRef.current.y = dy * strength
    }
    const onLeave = () => {
      targetRef.current.x = 0
      targetRef.current.y = 0
    }

    const tick = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.18
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.18
      inner.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`
      rafRef.current = requestAnimationFrame(tick)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength, reduced])

  const inner = (
    <span ref={innerRef} className="inline-block will-change-transform">
      {children}
    </span>
  )

  if (as === 'button') {
    return (
      <button
        ref={elRef as React.RefObject<HTMLButtonElement>}
        className={className}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    )
  }

  return (
    <a
      ref={elRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={className}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {inner}
    </a>
  )
}
