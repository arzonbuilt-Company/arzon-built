'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useCountUp } from '../../hooks/useCountUp'
import { MagneticButton } from '../ui/MagneticButton'
import { TextReveal } from '../ui/TextReveal'
import { useT } from '../../lib/i18n'

// Three.js/@react-three-fiber is a large dependency — load it only when it
// will actually render (desktop), so mobile never even downloads it.
const HeroParticles = dynamic(() => import('../three/HeroParticles'), { ssr: false })

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: current, ref } = useCountUp({ end: value, duration: 1800 })
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="glass-lime p-4 sm:p-6 rounded-2xl relative overflow-hidden group hover:border-lime-DEFAULT/40 transition-all duration-300 shadow-xl"
    >
      <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-lime-DEFAULT/5 blur-xl group-hover:scale-150 transition-transform duration-500" />
      <div suppressHydrationWarning className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-lime-DEFAULT tracking-tight tabular-nums">
        {current}{suffix}
      </div>
      <div className="text-[9px] sm:text-[10px] text-white/50 mt-2 uppercase tracking-[.25em] font-sans leading-tight">
        {label}
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t, lang } = useT()
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    const isSmallScreen = window.innerWidth < 768
    if (!isTouch && !isSmallScreen) setShowParticles(true)
  }, [])

  const stats = [
    { value: 5,    suffix: '+', label: t('hero.stat1') },
    { value: 400,  suffix: '+', label: t('hero.stat2') },
    { value: 2021, suffix: '',  label: t('hero.stat3') },
  ] as const

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-transparent"
    >
      {/* Three.js particles bg — desktop only, skipped on mobile/touch for performance */}
      {showParticles && (
        <div className="absolute inset-0 z-0 opacity-40">
          <HeroParticles />
        </div>
      )}

      {/* Radial Gold Flare Overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-lime-DEFAULT/5 blur-[120px] pointer-events-none" />

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 10%, rgba(6,11,8,0.95) 100%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full py-16 text-center">
        <p
          className="section-eyebrow mb-6 justify-center animate-fade-up"
          style={{ animationDelay: '0s' }}
        >
          <span className="section-rule" />
          {t('hero.eyebrow')}
          <span className="section-rule" />
        </p>

        <h1
          key={lang}
          className="font-display font-black leading-[0.9] tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.75rem, 8.5vw, 6.25rem)' }}
        >
          <TextReveal text={t('hero.title1')} as="span" className="block text-white" delay={0.1} />
          <TextReveal text={t('hero.title2')} as="span" className="block text-white" delay={0.3} />
          <TextReveal text={t('hero.title3')} as="span" className="block text-lime-gradient font-medium italic mt-2" delay={0.5} />
        </h1>

        <p
          className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-sans animate-fade-up"
          style={{ animationDelay: '0.8s' }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 justify-center animate-fade-up"
          style={{ animationDelay: '1.0s' }}
        >
          <MagneticButton href="#contact" className="btn-lime text-center rounded-xl font-bold shadow-lg">
            {t('hero.cta1')}
          </MagneticButton>
          <MagneticButton href="#transformation" className="btn-outline text-center rounded-xl font-bold" strength={0.2}>
            {t('hero.cta2')}
          </MagneticButton>
        </div>

        {/* Stats — centered grid */}
        <div
          className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto animate-fade-up"
          style={{ animationDelay: '1.2s' }}
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up"
        style={{ animationDelay: '1.8s', opacity: 0.7 }}
      >
        <span className="text-[9px] font-sans tracking-[.4em] uppercase text-white/40">{t('hero.scroll')}</span>
        <div
          className="w-px h-8 bg-gradient-to-b from-lime-DEFAULT/80 to-transparent animate-float"
        />
      </div>
    </section>
  )
}
