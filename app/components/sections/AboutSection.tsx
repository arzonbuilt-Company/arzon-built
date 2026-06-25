'use client'
import { motion } from 'framer-motion'
import { useT } from '../../lib/i18n'

const trustContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const trustItem = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

const marqueeItems = [
  'Roofing', 'Siding', 'Painting', 'Windows', 'Kitchen', 'Deck',
  'Full Remodeling', 'Lawrenceville GA', 'Est. 2021', '400+ Projects',
]

export function AboutSection() {
  const { t } = useT()
  const doubled = [...marqueeItems, ...marqueeItems]

  const trusts = [
    t('about.trust1'),
    t('about.trust2'),
    t('about.trust3'),
    t('about.trust4'),
    t('about.trust5'),
    t('about.trust6'),
  ]

  const stats = [
    { value: '5+',   label: t('about.stat.years')    },
    { value: '400+', label: t('about.stat.projects') },
    { value: '2021', label: t('about.stat.est')      },
    { value: 'Lic.', label: t('about.stat.insured')  },
  ]

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden bg-surface">
      {/* Top & bottom dark fades */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none z-0" />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none z-0" />

      {/* Dynamic Background Blobs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-45">
        <div className="absolute top-1/4 left-1/3 w-[380px] h-[380px] bg-lime-DEFAULT/[0.04] rounded-full filter blur-[90px] animate-blob" />
        <div className="absolute bottom-1/3 right-1/3 w-[420px] h-[420px] bg-lime-DEFAULT/[0.03] rounded-full filter blur-[100px] animate-blob animation-delay-2000" />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden mb-24 border-y border-white/5 py-4">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {doubled.map((item, i) => (
            <span key={i} className="text-sm font-sans text-white/12 shrink-0 flex items-center gap-8">
              {item}
              <span className="text-lime-DEFAULT/25">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Centered editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('about.eyebrow')}</span></div>
          <h2 className="font-display-serif text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] mb-6">
            <span className="text-white">{t('about.title1')} </span>
            <span className="text-lime-gradient italic">{t('about.title2')}</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-white/55 text-lg md:text-xl leading-relaxed text-center mx-auto max-w-2xl mb-16"
        >
          {t('about.body')}
        </motion.p>

        {/* Stat block — replaces the spinning ring widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 glass-lime mb-16"
        >
          {stats.map(s => (
            <div key={s.label} className="bg-bg/80 px-4 sm:px-6 py-6 sm:py-8 text-center">
              <div className="font-display-serif text-3xl sm:text-4xl md:text-5xl font-black text-lime-DEFAULT tabular-nums">{s.value}</div>
              <div className="text-[9px] sm:text-[10px] font-sans text-white/40 mt-1.5 sm:mt-2 tracking-[.2em] sm:tracking-[.3em] uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Trust list — clean, no emoji */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 max-w-2xl mx-auto"
          variants={trustContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {trusts.map((text) => (
            <motion.div
              key={text}
              variants={trustItem}
              className="flex items-center gap-4 glass p-4"
            >
              <span className="font-display-serif text-lime-DEFAULT/70 shrink-0">—</span>
              <span className="text-sm text-white/65 font-sans">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <a href="#contact" className="btn-lime inline-block">{t('about.cta')}</a>
        </motion.div>
      </div>
    </section>
  )
}
