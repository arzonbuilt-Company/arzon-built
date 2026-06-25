'use client'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '../three/ParticleField'
import { useCountUp } from '../../hooks/useCountUp'
import { MagneticButton } from '../ui/MagneticButton'
import { TextReveal } from '../ui/TextReveal'
import { useT } from '../../lib/i18n'

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: current, ref } = useCountUp({ end: value, duration: 1800 })
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="glass-lime p-3 sm:p-5 text-center"
    >
      <div suppressHydrationWarning className="font-display-serif text-2xl sm:text-3xl md:text-4xl font-bold text-lime-DEFAULT tabular-nums">
        {current}{suffix}
      </div>
      <div className="text-[9px] sm:text-[10px] text-white/45 mt-1 sm:mt-1.5 uppercase tracking-[.18em] sm:tracking-[.25em] font-sans leading-tight">
        {label}
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t, lang } = useT()

  const stats = [
    { value: 5,    suffix: '+', label: t('hero.stat1') },
    { value: 400,  suffix: '+', label: t('hero.stat2') },
    { value: 2021, suffix: '',  label: t('hero.stat3') },
  ] as const

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: 'radial-gradient(ellipse at 20% 80%, #071510 0%, #030c08 65%)' }}
    >

      {/* Three.js particles bg */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 55 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={2} color="#E3EF26" />
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(3,12,8,0.96) 100%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full py-20 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow mb-8 justify-center"
        >
          <span className="section-rule" />
          {t('hero.eyebrow')}
          <span className="section-rule" />
        </motion.p>

        <h1
          key={lang}
          className="font-display-serif font-black leading-[0.95] mb-8"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 6.5rem)' }}
        >
          <TextReveal text={t('hero.title1')} as="span" className="block text-white" delay={0.15} />
          <TextReveal text={t('hero.title2')} as="span" className="block text-white" delay={0.45} />
          <TextReveal text={t('hero.title3')} as="span" className="block text-lime-gradient italic" delay={0.75} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 justify-center"
        >
          <MagneticButton href="#contact" className="btn-lime text-center">
            {t('hero.cta1')}
          </MagneticButton>
          <MagneticButton href="#transformation" className="btn-outline text-center" strength={0.25}>
            {t('hero.cta2')}
          </MagneticButton>
        </motion.div>

        {/* Stats — centered grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto"
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-sans tracking-[.4em] uppercase text-white/25">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-lime-DEFAULT/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
