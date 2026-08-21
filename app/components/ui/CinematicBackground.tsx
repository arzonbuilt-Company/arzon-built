'use client'
import { useEffect, useState } from 'react'

export function CinematicBackground() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    const isSmallScreen = window.innerWidth < 768
    if (!isTouch && !isSmallScreen) setIsDesktop(true)
  }, [])

  return (
    <div className="fixed inset-2 sm:inset-4 -z-50 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none shadow-2xl">
      {isDesktop ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
          <source src="/assets/secuencia_1.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/assets/hero-bg-poster.jpg" alt="" className="w-full h-full object-cover opacity-80" />
      )}
      {/* Dark brand overlay for high text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/20 to-bg/65 pointer-events-none" />
    </div>
  )
}
