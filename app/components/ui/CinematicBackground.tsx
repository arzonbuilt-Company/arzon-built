'use client'
import { useEffect, useRef } from 'react'

export function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Some mobile browsers hold autoplay until the user has interacted with
    // the page at all — try immediately, then fall back to the first tap
    // anywhere on screen so it always ends up playing on loop.
    video.play().catch(() => {})

    const playOnFirstTouch = () => {
      video.play().catch(() => {})
      window.removeEventListener('touchstart', playOnFirstTouch)
      window.removeEventListener('click', playOnFirstTouch)
    }
    window.addEventListener('touchstart', playOnFirstTouch, { once: true })
    window.addEventListener('click', playOnFirstTouch, { once: true })

    return () => {
      window.removeEventListener('touchstart', playOnFirstTouch)
      window.removeEventListener('click', playOnFirstTouch)
    }
  }, [])

  return (
    <div className="fixed inset-2 sm:inset-4 -z-50 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none shadow-2xl">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hero-bg-poster.jpg"
        // @ts-expect-error — fetchpriority isn't in React's video attribute types yet
        fetchpriority="high"
        className="w-full h-full object-cover opacity-80"
      >
        <source src="/assets/secuencia_1.mp4" type="video/mp4" />
      </video>
      {/* Dark brand overlay for high text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-bg/20 to-bg/65 pointer-events-none" />
    </div>
  )
}
