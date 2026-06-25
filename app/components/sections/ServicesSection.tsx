'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useT } from '../../lib/i18n'

const SERVICE_SLUGS = ['roofing','painting','siding','windows-doors','kitchen','deck','full-remodeling']

// Maps each service to a representative image.
const SERVICE_IMAGES: Record<number, string> = {
  0: '/assets/roofing.png',     // Roofing
  1: '/assets/painting.png',    // Painting
  2: '/assets/siding-spruce.png',  // Siding
  3: '/assets/ventanas.png',    // Windows & Doors
  4: '/assets/kitchen.png',     // Kitchen
  5: '/assets/deck.png',        // Deck
  6: '/assets/full-remodeling.png', // Full Remodeling
}

export function ServicesSection() {
  const { t } = useT()
  const router = useRouter()
  const [activeIdx, setActiveIdx] = useState(0)

  const services = [
    { num: '01', title: t('services.s1.title'),       desc: t('services.s1.desc')      },
    { num: '02', title: t('services.s2.title'),       desc: t('services.s2.desc')      },
    { num: '03', title: t('services.s3.title'),       desc: t('services.s3.desc')      },
    { num: '04', title: t('services.s4.title'),       desc: t('services.s4.desc')      },
    { num: '05', title: t('services.s5.title'),       desc: t('services.s5.desc')      },
    { num: '06', title: t('services.s6.title'),       desc: t('services.s6.desc')      },
    { num: '07', title: t('services.full.title'),     desc: t('services.full.desc')    },
  ]

  return (
    <section id="services" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-bg">
      {/* Top & bottom dark fade for section transitions */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none z-0" />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none z-0" />

      {/* Dynamic Background Blobs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-45">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-lime-DEFAULT/[0.04] rounded-full filter blur-[80px] animate-blob" />
        <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] bg-lime-DEFAULT/[0.03] rounded-full filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center mx-auto max-w-2xl"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('services.eyebrow')}</span></div>
          <h2 className="font-display-serif text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
            <span className="text-white">{t('services.title1')} </span>
            <span className="text-lime-gradient italic">{t('services.title2')}</span>
          </h2>
          <p className="text-white/50 mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Split: list left, sticky image right */}
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-12 items-start">

          {/* LEFT — Service list */}
          <div className="lg:col-span-5 lg:order-1 order-2">
            <ul
              className="border-t border-white/8"
              onMouseLeave={() => { /* keep last hovered active — feels less twitchy */ }}
            >
              {services.map((s, i) => {
                const isActive = activeIdx === i
                return (
                  <li
                    key={s.num}
                    className={`group relative border-b border-white/8 cursor-none service-row ${
                      isActive ? 'service-row-active' : ''
                    }`}
                    data-cursor="service"
                  >
                    {/* Active indicator — animated lime line */}
                    {isActive && (
                      <motion.span
                        layoutId="service-bar"
                        className="absolute left-0 top-0 bottom-0 w-px bg-lime-DEFAULT"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}

                    <button
                      type="button"
                      onMouseEnter={() => setActiveIdx(i)}
                      onFocus={() => setActiveIdx(i)}
                      onClick={() => {
                        if (isActive || (typeof window !== 'undefined' && window.innerWidth >= 1024)) {
                          router.push(`/services/${SERVICE_SLUGS[i]}`)
                        } else {
                          setActiveIdx(i)
                        }
                      }}
                      className="w-full text-left py-4 sm:py-7 pl-4 sm:pl-6 pr-3 sm:pr-4 flex items-baseline gap-3 sm:gap-5 cursor-none"
                      data-cursor="service"
                      aria-pressed={isActive}
                    >
                      <span
                        className={`font-display-serif text-xs font-semibold tracking-[.3em] tabular-nums transition-colors duration-300 ${
                          isActive ? 'text-lime-DEFAULT' : 'text-white/25 group-hover:text-lime-DEFAULT'
                        }`}
                      >
                        {s.num}
                      </span>

                      <div className="flex-1">
                        <h3
                          className={`font-display-serif font-bold leading-tight transition-all duration-300 ${
                            isActive
                              ? 'text-white text-xl sm:text-3xl md:text-4xl'
                              : 'text-white/60 text-lg sm:text-2xl md:text-3xl group-hover:text-white'
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
                              <p className="text-white/55 text-sm md:text-[15px] leading-relaxed mb-3">
                                {s.desc}
                              </p>
                              <span className="inline-flex items-center gap-2 text-[11px] font-sans text-lime-DEFAULT/70 group-hover:text-lime-DEFAULT tracking-widest uppercase transition-colors">
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
                            : 'opacity-0 -translate-x-2 text-white/40 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-lime-DEFAULT'
                        }`}
                      >
                        →
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Footer CTA below list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a href="#contact" className="btn-lime inline-flex">{t('services.full.cta')}</a>
              <span className="text-xs font-sans text-white/35 tracking-[.2em] uppercase">
                {t('services.learnMore')} →
              </span>
            </motion.div>
          </div>

          {/* RIGHT — Sticky image preview */}
          <div className="lg:col-span-7 lg:order-2 order-1 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5] overflow-hidden bg-surface">
              {/* Lime decorative frame */}
              <div className="absolute -inset-2 border border-lime-DEFAULT/15 pointer-events-none z-20" />
              <div className="absolute -inset-5 border border-lime-DEFAULT/[0.06] pointer-events-none z-20" />

              <AnimatePresence mode="sync">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1   }}
                  exit={{    opacity: 0, scale: 1   }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SERVICE_IMAGES[activeIdx]}
                    alt={services[activeIdx].title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/15 to-transparent" />
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
