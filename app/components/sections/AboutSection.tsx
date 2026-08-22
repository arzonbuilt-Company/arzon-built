'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useT } from '../../lib/i18n'
import { useCountUp } from '../../hooks/useCountUp'

function AboutStatCard({ value, suffix, label }: { value: number | string; suffix: string; label: string }) {
  const isNumeric = typeof value === 'number'
  const { value: current, ref } = useCountUp({ 
    end: isNumeric ? (value as number) : 0, 
    duration: 1800 
  })

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-bg/85 px-4 sm:px-6 py-6 sm:py-8 text-center relative group"
    >
      <div className="absolute inset-0 bg-lime-DEFAULT/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div 
        suppressHydrationWarning 
        className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-lime-DEFAULT tracking-tight tabular-nums"
      >
        {isNumeric ? `${current}${suffix}` : `${value}${suffix}`}
      </div>
      <div className="text-[9px] sm:text-[10px] font-sans text-white/40 mt-2.5 tracking-[.25em] uppercase">
        {label}
      </div>
    </div>
  )
}

const trustContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const trustItem = {
  hidden: { opacity: 0, y: 15 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const marqueeItems = [
  'Roofing', 'Siding', 'Painting', 'Windows', 'Kitchen', 'Deck',
  'Full Remodeling', 'Lawrenceville GA', 'Est. 2021', '400+ Projects',
]

export function AboutSection() {
  const { t, lang } = useT()
  const doubled = [...marqueeItems, ...marqueeItems]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const trusts = [
    t('about.trust1'),
    t('about.trust2'),
    t('about.trust3'),
    t('about.trust4'),
    t('about.trust5'),
    t('about.trust6'),
  ]

  const stats = [
    { value: 5,    suffix: '+', label: t('about.stat.years')    },
    { value: 400,  suffix: '+', label: t('about.stat.projects') },
    { value: 2021, suffix: '',  label: t('about.stat.est')      },
    { value: 'Lic.', suffix: '', label: t('about.stat.insured')  },
  ]

  const processSteps = [
    {
      num: '01',
      title: lang === 'en' ? 'Consultation' : 'Consulta',
      desc: lang === 'en' ? 'Free on-site inspection and detailed assessment.' : 'Inspección gratuita en el lugar y evaluación detallada.'
    },
    {
      num: '02',
      title: lang === 'en' ? 'Design & Scope' : 'Diseño y Alcance',
      desc: lang === 'en' ? 'Material selection and architectural structural planning.' : 'Selección de materiales y planificación estructural.'
    },
    {
      num: '03',
      title: lang === 'en' ? 'Execution' : 'Ejecución',
      desc: lang === 'en' ? 'Precision construction by our dedicated local crew.' : 'Construcción de precisión por nuestro propio equipo local.'
    },
    {
      num: '04',
      title: lang === 'en' ? 'Delivery' : 'Entrega',
      desc: lang === 'en' ? 'Walkthrough validation and written structural guarantee.' : 'Validación en conjunto y garantía por escrito.'
    }
  ]

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-32 overflow-hidden bg-transparent"
    >

      {/* Decorative background glow */}
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] rounded-full bg-lime-DEFAULT/3 blur-[140px] pointer-events-none" />

      {/* Cross/plus grid texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(213,168,72,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(213,168,72,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Marquee */}
      <div className="relative overflow-hidden mb-20 border-y border-white/5 py-5 bg-black/10">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="text-xs font-semibold tracking-widest uppercase text-white/20 shrink-0 flex items-center gap-8 font-sans">
              {item}
              <span className="text-lime-DEFAULT/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Centered editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('about.eyebrow')}</span></div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] mb-6">
            <span className="text-white">{t('about.title1')} </span>
            <span className="text-lime-gradient italic">{t('about.title2')}</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-white/60 text-base md:text-lg leading-relaxed text-center mx-auto max-w-2xl mb-16 font-sans"
        >
          {t('about.body')}
        </motion.p>

        {/* Stat block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden glass-lime mb-20 shadow-2xl"
        >
          {mounted && stats.map(s => (
            <AboutStatCard key={s.label} {...s} />
          ))}
        </motion.div>

        {/* Trust list */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-24 max-w-3xl mx-auto"
          variants={trustContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: '0px 0px 120px 0px' }}
        >
          {trusts.map((text) => (
            <motion.div
              key={text}
              variants={trustItem}
              className="flex items-center gap-4 glass border border-white/5 hover:border-lime-DEFAULT/20 p-5 rounded-xl transition-all duration-300 shadow-lg"
            >
              <span className="font-display text-lime-DEFAULT font-bold text-lg shrink-0">✓</span>
              <span className="text-sm font-semibold text-white/70 font-sans tracking-wide">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Our Process (New Interactive Step Progression) ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
            className="text-center mb-16"
          >
            <span className="section-eyebrow mb-4 justify-center">
              <span className="section-rule" />
              {lang === 'en' ? '05 — HOW WE WORK' : '05 — CÓMO TRABAJAMOS'}
              <span className="section-rule" />
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-black text-white">
              {lang === 'en' ? 'Our Rebuilding Process' : 'Nuestro Proceso de Trabajo'}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-white/5 relative group hover:border-lime-DEFAULT/20 transition-all duration-300 cursor-none"
                data-cursor-text={lang === 'en' ? `STEP ${idx + 1}` : `PASO ${idx + 1}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-black font-display text-lime-DEFAULT/20 group-hover:text-lime-DEFAULT/40 transition-colors">{step.num}</span>
                  <div className="w-8 h-8 rounded-full bg-lime-DEFAULT/10 flex items-center justify-center font-bold text-xs text-lime-DEFAULT">
                    {idx + 1}
                  </div>
                </div>
                <h4 className="text-white text-lg font-black font-display mb-2">{step.title}</h4>
                <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <a href="#contact" className="btn-lime inline-block rounded-xl font-bold shadow-lg">{t('about.cta')}</a>
        </motion.div>
      </div>
    </section>
  )
}
