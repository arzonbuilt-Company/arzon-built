'use client'
import { useEffect, useRef, useState } from 'react'

export function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState('')

  useEffect(() => {
    // Delay loading the heavy video by 1000ms to let page build and render first
    const timer = setTimeout(() => {
      setVideoSrc('/assets/secuencia_1.mp4')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!videoSrc) return
    const video = videoRef.current
    if (!video) return

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
  }, [videoSrc])

  return (
    <div
      className="fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 h-[calc(100svh-1rem)] sm:h-[calc(100svh-2rem)] -z-50 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none shadow-2xl bg-[#060B08]"
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/modern_exterior.jpg"
          // @ts-expect-error — fetchPriority isn't in React's video attribute types yet
          fetchPriority="high"
          className="w-full h-full object-cover opacity-80 transition-opacity duration-1000"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        // Render fallback poster image statically while the video is deferred
        <div 
          className="w-full h-full bg-cover bg-center opacity-45 transition-opacity duration-1000"
          style={{ backgroundImage: "url('/assets/modern_exterior.jpg')" }}
        />
      )}
      {/* Dark brand overlay for high text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060B08]/65 via-[#060B08]/20 to-[#060B08]/65 pointer-events-none" />
    </div>
  )
}
