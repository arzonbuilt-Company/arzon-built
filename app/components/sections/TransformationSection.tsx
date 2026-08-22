'use client'

import { motion } from 'framer-motion'
import { useT } from '../../lib/i18n'

type Phase = 'problem' | 'repair' | 'result'

interface Panel {
  phase: Phase
  eyebrow: string
  title: string
  sub: string
  num: string
}

const PANELS: Panel[] = [
  {
    phase: 'problem',
    eyebrow: '01 — The Problem / El Problema',
    title: 'Years of damage,\nvisible everywhere.',
    sub: 'Structural exposure. Active moisture. A house that needed saving — fast.',
    num: '01',
  },
  {
    phase: 'repair',
    eyebrow: '02 — The Work / La Obra',
    title: 'Precision demo\nand full rebuild.',
    sub: 'Complete tear-off. Engineered decking. Industrial-grade membrane applied correctly.',
    num: '02',
  },
  {
    phase: 'result',
    eyebrow: '03 — The Result / El Resultado',
    title: 'Built to last\n30 years.',
    sub: 'Architectural shingles. Sealed ridge. Clean finish. Zero callbacks.',
    num: '03',
  },
]

const PHASE_STYLE = {
  problem: {
    tag: '#e27d40', // Copper Rust
    border: 'border-[#e27d40]/30',
    bg: 'bg-[#e27d40]/5',
    text: 'text-[#e27d40]',
    label: 'PROBLEM / PROBLEMA',
  },
  repair: {
    tag: '#D6FF38', // Electric Lime
    border: 'border-lime-DEFAULT/30',
    bg: 'bg-lime-DEFAULT/5',
    text: 'text-lime-DEFAULT',
    label: 'REPAIR / OBRA',
  },
  result: {
    tag: '#10b981', // Emerald/Lime
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/5',
    text: 'text-emerald-500',
    label: 'RESULT / RESULTADO',
  },
} satisfies Record<Phase, object>

export function TransformationSection() {
  const { lang } = useT()

  return (
    <section id="transformation" className="relative py-20 sm:py-32 px-4 sm:px-6 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Cabecera del Proceso */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 sm:mb-24 text-center max-w-2xl mx-auto"
        >
          <div className="section-eyebrow mb-5 justify-center">
            <span className="section-rule" />
            <span>{lang === 'en' ? '02 — THE TRANSFORMATION' : '02 — LA TRANSFORMACIÓN'}</span>
            <span className="section-rule" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
            <span className="text-white">
              {lang === 'en' ? 'Witness the ' : 'Presencia el '}
            </span>
            <span className="text-lime-gradient italic">
              {lang === 'en' ? 'change.' : 'cambio.'}
            </span>
          </h2>
          <p className="text-white/50 mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed font-sans">
            {lang === 'en'
              ? 'From structural damage to architectural perfection. See how we rebuild for decades.'
              : 'De daños estructurales a la perfección arquitectónica. Ve cómo reconstruimos para décadas.'}
          </p>
        </motion.div>

        {/* Tarjetas Secuenciales */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {PANELS.map((p) => {
            const style = PHASE_STYLE[p.phase]
            return (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ scale: 1.01 }}
                className={`glass border ${style.border} ${style.bg} p-8 sm:p-12 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-colors duration-300 cursor-none`}
                data-cursor-text={lang === 'en' ? p.phase.toUpperCase() : (p.phase === 'problem' ? 'PROBLEMA' : p.phase === 'repair' ? 'LA OBRA' : 'RESULTADO')}
              >
                {/* Línea iluminada superior */}
                <div
                  className="absolute top-0 left-0 w-full h-[3px] opacity-80"
                  style={{ background: `linear-gradient(90deg, ${style.tag}, transparent)` }}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Contenido de la Tarjeta */}
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-semibold tracking-widest ${style.text}`}>
                        {style.label}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="font-mono text-xs text-white/30 tracking-wider">
                        {p.eyebrow}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight whitespace-pre-line">
                      {p.title}
                    </h3>

                    <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans">
                      {p.sub}
                    </p>
                  </div>

                  {/* Número de fondo */}
                  <div className="font-display text-7xl sm:text-8xl md:text-9xl font-black text-white/[0.03] select-none group-hover:text-white/[0.06] group-hover:-translate-y-1 transition-all duration-500 ease-out leading-none">
                    {p.num}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
