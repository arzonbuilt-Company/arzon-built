'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useT } from '../../lib/i18n'

export function PortfolioSection() {
  const { t, lang } = useT()
  const sectionRef = useRef<HTMLElement>(null)
  
  const [photoCount, setPhotoCount] = useState(24) // Default for SSR
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
    if (isMobile) {
      setPhotoCount(8) // Limit to 8 photos per row on mobile to save bandwidth/CPU
    }

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true)
        }
        section.classList.toggle('marquee-paused', !entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '300px' } // Preload images 300px before section scroll
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Generamos los proyectos reales
  const row1Photos = Array.from({ length: photoCount }, (_, i) => ({
    src: `/assets/project_photo_${i + 1}.jpg`,
    tag: lang === 'en' ? 'Completed Work' : 'Proyecto Realizado',
  }))

  const row2Photos = Array.from({ length: photoCount }, (_, i) => ({
    src: `/assets/project_photo_${i + 25}.jpg`,
    tag: lang === 'en' ? 'Completed Work' : 'Proyecto Realizado',
  }))

  // Duplicamos las listas para lograr un efecto infinito fluido
  const doubledRow1 = [...row1Photos, ...row1Photos]
  const doubledRow2 = [...row2Photos, ...row2Photos]

  return (
    <section id="portfolio" ref={sectionRef} className="relative scroll-mt-24 py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      {/* Estilos locales para las dos direcciones del marquee a velocidad óptima */}
      <style>{`
        @keyframes marquee-custom {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-custom {
          animation: marquee-custom 60s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 60s linear infinite;
        }
      `}</style>

      {/* Textura de líneas diagonales de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, rgba(213,168,72,0.4) 0px, rgba(213,168,72,0.4) 1px, transparent 1px, transparent 32px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabecera Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-24 text-center mx-auto max-w-2xl"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('portfolio.eyebrow')}</span></div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05]">
            <span className="text-white">{t('portfolio.title1')} </span>
            <span className="text-lime-gradient italic">{t('portfolio.title2')}</span>
          </h2>
          <p className="text-white/50 mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed font-sans">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Galería de Doble Carrusel en Loop Infinito */}
        <div 
          className="relative w-full lg:w-screen lg:left-1/2 lg:right-1/2 lg:-mx-[50vw] overflow-hidden select-none py-4 space-y-6"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          
          {/* Fila 1: Desplazamiento hacia la Izquierda */}
          <div className="flex gap-6 w-max animate-marquee-custom hover:[animation-play-state:paused] pointer-events-auto">
            {doubledRow1.map((p, i) => (
              <div
                key={`row1-${i}`}
                className="relative w-[240px] sm:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 bg-white/[0.02] group"
              >
                {hasIntersected && (
                  <>
                    {/* Borde de realce con brillo en hover */}
                    <div className="absolute -inset-[1px] border border-lime-DEFAULT/15 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <Image
                      src={p.src}
                      alt={p.tag}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 180px, 320px"
                      quality={60}
                    />
                    
                    {/* Degradado y etiqueta de servicio en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className="bg-lime-DEFAULT text-bg text-[10px] font-mono font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
                          {p.tag}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Fila 2: Desplazamiento hacia la Derecha (Sentido opuesto) */}
          <div className="flex gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused] pointer-events-auto">
            {doubledRow2.map((p, i) => (
              <div
                key={`row2-${i}`}
                className="relative w-[240px] sm:w-[380px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 bg-white/[0.02] group"
              >
                {hasIntersected && (
                  <>
                    {/* Borde de realce con brillo en hover */}
                    <div className="absolute -inset-[1px] border border-lime-DEFAULT/15 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <Image
                      src={p.src}
                      alt={p.tag}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 180px, 320px"
                      quality={60}
                    />
                    
                    {/* Degradado y etiqueta de servicio en hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <span className="bg-lime-DEFAULT text-bg text-[10px] font-mono font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
                          {p.tag}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Footer Cta */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 text-white/35 text-xs font-sans tracking-wider"
        >
          {t('portfolio.foot')}{' '}
          <a href="https://wa.me/16783468470" target="_blank" rel="noopener noreferrer"
            className="text-lime-DEFAULT hover:text-lime-light hover:underline underline-offset-4 transition-colors font-bold">{t('portfolio.footCta')}</a>
        </motion.p>
      </div>
    </section>
  )
}
