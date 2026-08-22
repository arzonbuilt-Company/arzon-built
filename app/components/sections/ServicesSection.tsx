'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useT } from '../../lib/i18n'

const SERVICE_SLUGS = ['roofing','painting','siding','windows-doors','kitchen','deck','full-remodeling']

const SERVICE_IMAGES: Record<number, string> = {
  0: '/assets/roofing.png',     // Roofing
  1: '/assets/painting.png',    // Painting
  2: '/assets/siding.png',      // Siding
  3: '/assets/ventanas.png',    // Windows & Doors
  4: '/assets/kitchen.png',     // Kitchen
  5: '/assets/deck.png',        // Deck
  6: '/assets/remodeling.png',  // Full Remodeling
}

export function ServicesSection() {
  const { t, lang } = useT()
  const [activeIdx, setActiveIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRaf = useRef<number | null>(null)

  const services = [
    { num: '01', title: t('services.s1.title'),       desc: t('services.s1.desc')      },
    { num: '02', title: t('services.s2.title'),       desc: t('services.s2.desc')      },
    { num: '03', title: t('services.s3.title'),       desc: t('services.s3.desc')      },
    { num: '04', title: t('services.s4.title'),       desc: t('services.s4.desc')      },
    { num: '05', title: t('services.s5.title'),       desc: t('services.s5.desc')      },
    { num: '06', title: t('services.s6.title'),       desc: t('services.s6.desc')      },
    { num: '07', title: t('services.full.title'),     desc: t('services.full.desc')    },
  ]

  const handleScroll = () => {
    // Reading scrollLeft/scrollWidth on every single scroll event can force
    // a layout reflow mid-scroll — batch it to once per animation frame.
    if (scrollRaf.current !== null) return
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = null
      if (containerRef.current) {
        const container = containerRef.current
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth

        // Calculate active index based on scroll position
        const slideWidth = scrollWidth / services.length
        const index = Math.round(scrollLeft / slideWidth)

        if (index >= 0 && index < services.length && activeIdx !== index) {
          setActiveIdx(index)
        }
      }
    })
  }

  const scrollToSlide = (idx: number) => {
    if (containerRef.current) {
      const container = containerRef.current
      const slideWidth = container.scrollWidth / services.length
      container.scrollTo({
        left: idx * slideWidth,
        behavior: 'smooth'
      })
      setActiveIdx(idx)
    }
  }

  return (
    <section id="services" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-transparent"
    >

      {/* Decorative Gold flare */}
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] rounded-full bg-lime-DEFAULT/3 blur-[120px] pointer-events-none" />

      {/* Dot grid texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(213,168,72,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-24 text-center mx-auto max-w-2xl"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('services.eyebrow')}</span></div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
            <span className="text-white">{t('services.title1')} </span>
            <span className="text-lime-gradient italic">{t('services.title2')}</span>
          </h2>
          <p className="text-white/50 mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed font-sans">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* MOBILE/TABLET VIEW (Horizontal Swipe Carousel) */}
        <div className="lg:hidden">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 pt-2 px-4 -mx-4 scrollbar-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {services.map((s, i) => (
              <Link
                key={s.num}
                href={`/services/${SERVICE_SLUGS[i]}`}
                className="w-[85vw] sm:w-[380px] shrink-0 snap-center glass border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative hover:scale-[1.01] hover:border-lime-DEFAULT/20 transition-all duration-300 group"
                data-cursor-text={lang === 'es' ? 'VER' : 'VIEW'}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-lime-DEFAULT to-transparent" />
                
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={SERVICE_IMAGES[i]}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="85vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-bg/85 border border-white/10 px-2.5 py-0.5 rounded text-[10px] font-mono text-lime-DEFAULT font-black tracking-widest">
                    {s.num}
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display font-black text-white text-xl sm:text-2xl mb-2 group-hover:text-lime-DEFAULT transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  
                  <div className="pt-2 flex justify-between items-center">
                    <span
                      className="inline-flex items-center gap-2 text-[10px] font-sans text-lime-DEFAULT group-hover:text-lime-light tracking-widest uppercase font-bold"
                    >
                      {t('services.learnMore')} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Swipe indicators */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIdx === i
                    ? 'w-6 bg-lime-DEFAULT'
                    : 'w-1.5 bg-white/20'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile Footer CTA */}
          <div className="mt-10 text-center">
            <a href="#contact" className="btn-lime w-full sm:w-auto inline-flex justify-center rounded-xl font-bold shadow-lg py-4 px-8 text-xs tracking-wider uppercase">
              {t('services.full.cta')}
            </a>
          </div>
        </div>

        {/* DESKTOP VIEW (Split Sticky Grid) */}
        <div className="hidden lg:grid grid-cols-12 gap-x-16 gap-y-12 items-start">

          {/* LEFT — Service list */}
          <div className="lg:col-span-5 lg:order-1 order-2">
            <ul className="border-t border-white/5">
              {services.map((s, i) => {
                const isActive = activeIdx === i
                return (
                  <li
                    key={s.num}
                    className={`group relative border-b border-white/5 transition-all duration-300 ${
                      isActive ? 'bg-white/[0.01]' : ''
                    }`}
                  >
                    {/* Active indicator — animated gold line */}
                    {isActive && (
                      <motion.span
                        layoutId="service-bar"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lime-DEFAULT to-lime-dark"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}

                    <Link
                      href={`/services/${SERVICE_SLUGS[i]}`}
                      onMouseEnter={() => setActiveIdx(i)}
                      onFocus={() => setActiveIdx(i)}
                      className="w-full block text-left py-5 sm:py-8 pl-4 sm:pl-6 pr-3 sm:pr-4 flex items-baseline gap-3 sm:gap-5 cursor-none"
                      data-cursor-text={lang === 'es' ? 'VER' : 'VIEW'}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`font-display text-xs font-semibold tracking-[.3em] tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-lime-DEFAULT' : 'text-white/20'
                        }`}
                      >
                        {s.num}
                      </span>

                      <div className="flex-1">
                        <h3
                          className={`font-display font-black leading-tight transition-all duration-300 ${
                            isActive
                              ? 'text-white text-xl sm:text-3xl md:text-3xl'
                              : 'text-white/50 text-lg sm:text-2xl md:text-2xl'
                          }`}
                        >
                          {s.title}
                        </h3>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key="desc"
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="overflow-hidden"
                            >
                              <p className="text-white/50 text-sm md:text-[14px] leading-relaxed mb-4 font-sans">
                                {s.desc}
                              </p>
                              <span
                                className="inline-flex items-center gap-2 text-[10px] font-sans text-lime-DEFAULT group-hover:text-lime-light tracking-widest uppercase transition-colors font-bold">
                                {t('services.learnMore')} →
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <span
                        aria-hidden
                        className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 translate-x-0 text-lime-DEFAULT'
                            : 'opacity-0 -translate-x-2 text-white/40'
                        }`}
                      >
                        →
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Footer CTA below list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 120px 0px' }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a href="#contact" className="btn-lime inline-flex rounded-xl font-bold shadow-lg">{t('services.full.cta')}</a>
              <span className="text-xs font-sans text-white/30 tracking-[.25em] uppercase">
                {t('services.learnMore')} →
              </span>
            </motion.div>
          </div>

          {/* RIGHT — Sticky image preview */}
          <div className="lg:col-span-7 lg:order-2 order-1 lg:sticky lg:top-32">
            <Link 
              href={`/services/${SERVICE_SLUGS[activeIdx]}`}
              className="block relative aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5] overflow-hidden rounded-2xl border border-white/5 bg-surface shadow-2xl cursor-none group"
              data-cursor-text={lang === 'es' ? 'ENTRAR' : 'ENTER'}
            >
              {/* Gold decorative frame */}
              <div className="absolute -inset-2 border border-lime-DEFAULT/10 rounded-[18px] pointer-events-none z-20 group-hover:border-lime-DEFAULT/30 transition-colors duration-300" />
              <div className="absolute -inset-4 border border-lime-DEFAULT/[0.04] rounded-[20px] pointer-events-none z-20" />
 
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1   }}
                  exit={{    opacity: 0, scale: 1   }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SERVICE_IMAGES[activeIdx]}
                    alt={services[activeIdx].title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/10 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
