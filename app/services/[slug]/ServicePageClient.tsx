'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Navbar } from '../../components/ui/Navbar'
import { useT } from '../../lib/i18n'
import type { ServiceData } from '../../lib/services-data'

// Helper for dynamic stat counting (Animation A3)
function StatCounter({ value, suffix }: { value: string | number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const numValue = typeof value === 'number' ? value : parseInt(value) || 0
  const isRange = typeof value === 'string' && value.includes('-')
  const rangeValues = isRange ? (value as string).split('-').map(v => parseInt(v) || 0) : []

  useEffect(() => {
    if (!isInView) return
    if (isNaN(numValue) && !isRange) return

    let start = 0
    const end = isRange ? rangeValues[1] : numValue
    if (end <= 0) return

    const duration = 1.2
    const totalMiliseconds = duration * 1000
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15)

    const timer = setInterval(() => {
      start += Math.ceil(end / 40) // smooth steps
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setCount(start)
    }, incrementTime)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, numValue, isRange])

  if (isRange) {
    return (
      <span ref={ref} className="font-farmhouse-serif font-black text-5xl md:text-6xl text-[var(--sage)]">
        {rangeValues[0]}-{count}
        <span className="text-2xl font-bold ml-0.5">{suffix}</span>
      </span>
    )
  }

  return (
    <span ref={ref} className="font-farmhouse-serif font-black text-5xl md:text-6xl text-[var(--sage)]">
      {count > 0 ? count : value}
      <span className="text-2xl font-bold ml-0.5">{suffix}</span>
    </span>
  )
}

// Stats data per service slug
const SERVICE_STATS: Record<string, { value: string | number; suffix: { es: string; en: string }; label: { es: string; en: string } }[]> = {
  painting: [
    { value: 2, suffix: { es: ' manos', en: ' coats' }, label: { es: 'De pintura premium', en: 'Premium paint coats' } },
    { value: 10, suffix: { es: ' años', en: ' years' }, label: { es: 'De retención de color', en: 'Color warranty' } },
    { value: 7, suffix: { es: '+ años', en: '+ years' }, label: { es: 'De acabado impecable', en: 'Years of pristine finish' } }
  ],
  roofing: [
    { value: 50, suffix: { es: ' años', en: ' years' }, label: { es: 'De garantía limitada de tejas', en: 'Shingle limited warranty' } },
    { value: 25, suffix: { es: ' años', en: ' years' }, label: { es: 'Garantía en mano de obra', en: 'Workmanship warranty' } },
    { value: 130, suffix: { es: ' mph', en: ' mph' }, label: { es: 'Resistencia a ráfagas de viento', en: 'Wind uplift resistance' } }
  ],
  siding: [
    { value: 30, suffix: { es: '+ años', en: '+ years' }, label: { es: 'De vida útil estimada', en: 'Years of durability' } },
    { value: 50, suffix: { es: ' años', en: ' years' }, label: { es: 'De garantía de fábrica', en: 'Manufacturer warranty' } },
    { value: 0, suffix: { es: ' esfuerzo', en: ' effort' }, label: { es: 'Mantenimiento mínimo', en: 'Virtually no maintenance' } }
  ],
  'windows-doors': [
    { value: 25, suffix: { es: '%', en: '%' }, label: { es: 'Menos consumo en clima', en: 'Energy bill savings' } },
    { value: 2, suffix: { es: ' paneles', en: ' panes' }, label: { es: 'De vidrio con gas argón', en: 'Double-pane Low-E glass' } },
    { value: 100, suffix: { es: '%', en: '%' }, label: { es: 'Sello termoacústico', en: 'Weather-tight seal' } }
  ],
  kitchen: [
    { value: 1, suffix: { es: ' equipo', en: ' team' }, label: { es: 'Un solo contratista a cargo', en: 'Single contractor team' } },
    { value: '3-5', suffix: { es: ' sem', en: ' wks' }, label: { es: 'De tiempo de entrega', en: 'Weeks estimated delivery' } },
    { value: 100, suffix: { es: '%', en: '%' }, label: { es: 'Diseño shaker a medida', en: 'Fully custom shaker design' } }
  ],
  deck: [
    { value: 50, suffix: { es: ' años', en: ' years' }, label: { es: 'Garantía Trex disponible', en: 'Trex warranty available' } },
    { value: 100, suffix: { es: '%', en: '%' }, label: { es: 'Resistente a humedad', en: 'Rot and UV-resistant' } },
    { value: 0, suffix: { es: ' astillas', en: ' splinters' }, label: { es: 'Tacto suave y seguro', en: 'Splinter-free safety' } }
  ],
  'full-remodeling': [
    { value: 1, suffix: { es: ' contacto', en: ' contact' }, label: { es: 'Un solo gestor de proyecto', en: 'Single point of contact' } },
    { value: 0, suffix: { es: ' estrés', en: ' stress' }, label: { es: 'Nos encargamos de todo', en: 'Full hands-off process' } },
    { value: 100, suffix: { es: '+ obras', en: '+ projects' }, label: { es: 'Proyectos entregados', en: 'Renovations delivered' } }
  ]
}

// Farmhouse style descriptions
const STYLE_DESCRIPTIONS: Record<string, { es: string; en: string }> = {
  painting: {
    es: 'Combinamos tonos blancos cálidos (como Alabaster o Swiss Coffee) en revestimientos y paredes con acentos en negro mate (Iron Ore) en molduras, carpinterías y puertas, logrando el contraste clásico y elegante del estilo.',
    en: 'We pair warm white tones (such as Alabaster or Swiss Coffee) on siding and walls with matte black (Iron Ore) accents on trim, windows, and doors, achieving the classic high-contrast look.'
  },
  roofing: {
    es: 'Las tejas de asfalto arquitectónicas en tonos oscuros (como carbón o negro) son la elección ideal del estilo Modern Farmhouse, ofreciendo textura, profundidad y un fuerte contraste con la fachada clara.',
    en: 'Architectural asphalt shingles in dark tones (such as charcoal or black) are the ideal choice for the Modern Farmhouse style, offering texture, depth, and a bold contrast against light siding.'
  },
  siding: {
    es: 'Instalamos Board & Batten vertical en color blanco puro para alargar visualmente la casa, contrastando con molduras oscuras y acentos de madera natural cálida en las columnas y el porche.',
    en: 'We install vertical Board & Batten siding in pure white to draw the eyes upward, contrasted with dark trim and warm natural wood accents at the porch and columns.'
  },
  'windows-doors': {
    es: 'Las ventanas con perfil negro mate y retícula tipo cuadrícula (grid), junto con puertas principales de madera robusta teñida y puertas corredizas de granero (barn doors) en interiores, estructuran la calidez del hogar.',
    en: 'Matte black window frames with grids, paired with stained solid wood entry doors and sliding interior barn doors, establish the structural warmth of the farmhouse style.'
  },
  kitchen: {
    es: 'Gabinetes tipo shaker en blanco cálido o verde salvia, una isla central generosa con encimera contrastante, herrajes de metal negro mate y el fregadero de delantal (farmhouse sink) definen el corazón de la casa.',
    en: 'Warm white or sage green shaker cabinets, a spacious central island, matte black hardware, and the classic apron-front farmhouse sink define the heart of the home.'
  },
  deck: {
    es: 'Vigas estructurales expuestas en madera rústica combinadas con tablones Trex en cedro o gris pálido, complementados con barandillas negras minimalistas para prolongar el salón hacia el exterior.',
    en: 'Exposed structural framing in rustic timber paired with Trex planks in warm cedar or cool gray, framed by minimal black railings to extend the living space outdoors.'
  },
  'full-remodeling': {
    es: 'Unificamos la coherencia del estilo Modern Farmhouse de principio a fin, vinculando el exterior (siding blanco vertical, techos de metal negro) con el interior (pisos de madera cálida, gabinetes shaker y griferías negras).',
    en: 'We harmonize the entire Modern Farmhouse aesthetic from start to finish, linking the exterior (vertical white siding, black metal roofs) with the interior (warm wood flooring, shaker cabinets, and matte black fixtures).'
  }
}

export function ServicePageClient({ service: s }: { service: ServiceData }) {
  const { lang } = useT()
  const [scrollY, setScrollY] = useState(0)

  // Scroll handler for parallax (Animation A4)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Force body colors for this page (Dark Green theme matching the homepage)
  useEffect(() => {
    document.body.classList.add('modern-farmhouse-cursor')
    // Smooth transition style override
    const styleEl = document.createElement('style')
    styleEl.id = 'farmhouse-body-override'
    styleEl.innerHTML = `
      body {
        background-color: #030c08 !important;
        color: #FFFDEE !important;
      }
      #cursor-dot {
        background: #E3EF26 !important;
      }
      #cursor-ring {
        border-color: rgba(227, 239, 38, 0.5) !important;
        background: rgba(227, 239, 38, 0.05) !important;
      }
    `
    document.head.appendChild(styleEl)

    return () => {
      document.body.classList.remove('modern-farmhouse-cursor')
      const override = document.getElementById('farmhouse-body-override')
      if (override) override.remove()
    }
  }, [])

  const title = s.title[lang]
  const subtitle = s.subtitle[lang]
  const body = s.body[lang]
  const features = s.features[lang]
  const stats = SERVICE_STATS[s.slug] || []
  const styleText = STYLE_DESCRIPTIONS[s.slug] || { es: '', en: '' }

  // List animations (A5 stagger)
  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  }

  return (
    <main className="modern-farmhouse min-h-screen bg-[var(--cream)] text-[var(--charcoal)] font-farmhouse-sans overflow-x-hidden selection:bg-[#E3EF26]/20 selection:text-[#E3EF26]">
      <Navbar />

      {/* ── 1. Hero Section (Parallax A4) ── */}
      <section className="relative h-[80vh] min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Photo */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none scale-105"
          style={{ 
            backgroundImage: `url(${s.image})`,
            transform: `translateY(${scrollY * 0.22}px) scale(1.05)`,
            transition: 'transform 0.05s linear'
          }}
        />
        {/* Dark warm matte overlay for high legibility */}
        <div className="absolute inset-0 bg-black/45 z-1 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center md:text-left text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            {/* Back link */}
            <Link 
              href="/#services"
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 hover:text-[var(--sage)] transition-colors mb-6"
            >
              ← {lang === 'es' ? 'Todos los Servicios' : 'All Services'}
            </Link>

            {/* Title (Fraunces serif modern) */}
            <h1 className="font-farmhouse-serif font-black leading-[1.05] tracking-tight mb-6 text-5xl md:text-7xl">
              {title}
            </h1>

            {/* Phrase-bandera (tagline) - short & concise */}
            <p className="text-white/80 font-farmhouse-sans text-lg md:text-xl font-light mb-8 max-w-lg leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Button */}
            <a 
              href="/#contact" 
              className="inline-block bg-[var(--sage)] hover:bg-[var(--sage-deep)] text-white px-8 py-4 font-semibold tracking-wide text-sm rounded-sm transition-all shadow-md hover:scale-105"
            >
              {lang === 'es' ? 'Solicitar cotización' : 'Request Estimate'}
            </a>
          </motion.div>
        </div>

        {/* Elegant bottom divider curve/angle in farmhouse style */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[var(--cream)] pointer-events-none z-10" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* ── 2. Definición Section (A1 Scroll reveal) ── */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-b border-[var(--greige)]/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--sage)] font-bold block mb-4">
            {lang === 'es' ? 'El Servicio' : 'The Service'}
          </span>
          <h2 className="font-farmhouse-serif font-medium text-2xl md:text-3xl lg:text-4xl text-[var(--charcoal)] leading-snug italic max-w-3xl mx-auto">
            &ldquo;{s.body[lang].split('.')[0]}.&rdquo;
          </h2>
        </motion.div>
      </section>

      {/* ── 3 & 4. Descripción Práctica + Qué Incluye (A5 Staggered reveal) ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Practical description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="md:col-span-6 space-y-6"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--sage)] font-bold">
            {lang === 'es' ? 'Descripción Práctica' : 'Practical Approach'}
          </p>
          <h3 className="font-farmhouse-serif font-black text-3xl md:text-4xl leading-tight">
            {lang === 'es' ? 'Materiales reales. Ejecución sin atajos.' : 'Real materials. No shortcuts.'}
          </h3>
          <p className="text-[var(--ink)] text-base leading-relaxed font-light">
            {body}
          </p>
        </motion.div>

        {/* Right Column: Qué incluye (Staggered list) */}
        <div className="md:col-span-6 bg-[var(--linen)] p-8 md:p-10 rounded-lg border border-[var(--greige)]/35">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--charcoal)]/50 font-bold mb-6">
            {lang === 'es' ? 'Lo que incluye' : 'What is included'}
          </p>

          <motion.ul 
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-4"
          >
            {features.map((f, idx) => (
              <motion.li 
                key={idx} 
                variants={itemVariants}
                className="flex items-start gap-3.5 text-[var(--ink)] text-sm leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-[var(--sage)]/10 text-[var(--sage)] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>{f}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── 5. Proceso Paso a Paso (Timeline A7 / reveal A1) ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-t border-[var(--greige)]/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--sage)] font-bold block mb-4">
            {lang === 'es' ? 'Fase por Fase' : 'Phase by Phase'}
          </span>
          <h2 className="font-farmhouse-serif font-black text-3xl md:text-5xl text-[var(--charcoal)] mb-4">
            {lang === 'es' ? 'Nuestro Proceso de Trabajo' : 'Our Working Process'}
          </h2>
          <p className="text-[var(--ink)] max-w-md mx-auto font-farmhouse-sans text-sm font-light leading-relaxed">
            {lang === 'es' 
              ? 'Un flujo estructurado sin atajos, diseñado para asegurar la máxima calidad y durabilidad en cada paso.' 
              : 'A structured workflow with no shortcuts, engineered to ensure maximum quality and durability at every step.'}
          </p>
        </motion.div>

        {/* Timeline representation */}
        <div className="relative border-l border-[var(--greige)]/30 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12 py-4">
          {s.process[lang].map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Timeline dot / step number */}
              <span className="absolute -left-12 md:-left-20 top-1.5 w-8 h-8 rounded-full bg-[var(--linen)] border border-[var(--sage)] flex items-center justify-center text-[var(--sage)] text-xs font-bold font-farmhouse-sans">
                {idx + 1}
              </span>
              
              <div className="bg-[var(--linen)] p-6 md:p-8 rounded-lg border border-[var(--greige)]/35 hover:border-[var(--sage)]/35 transition-all duration-300">
                <h3 className="font-farmhouse-serif font-bold text-lg md:text-xl text-[var(--charcoal)] mb-2">
                  {p.step}
                </h3>
                <p className="text-[var(--ink)] text-sm leading-relaxed font-light font-farmhouse-sans">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. Dato Clave (A3 counters) ── */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-6 bg-[var(--linen)]/50 rounded-lg border border-[var(--greige)]/15">
              <StatCounter value={stat.value} suffix={stat.suffix[lang]} />
              <span className="text-xs uppercase tracking-widest text-[var(--charcoal)]/55 font-bold mt-4 max-w-[200px] leading-relaxed">
                {stat.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Estilo Modern Farmhouse Section (A8 / A6) ── */}
      <section className="py-24 px-6 bg-[var(--linen)] border-t border-[var(--greige)]/20 overflow-hidden relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          {/* Text details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--wood)] font-bold block">
              {lang === 'es' ? 'La Estética' : 'The Aesthetic'}
            </span>
            <h2 className="font-farmhouse-serif font-black text-3xl md:text-4xl text-[var(--charcoal)]">
              {lang === 'es' ? 'El Sello Modern Farmhouse' : 'The Modern Farmhouse Seal'}
            </h2>
            <p className="text-[var(--ink)] text-base leading-relaxed font-light">
              {styleText[lang]}
            </p>
            {/* Color swatches showcase */}
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-black/10 bg-[#FAF8F3]" />
                <span className="text-xs text-[var(--ink)]/70">Alabaster</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-black/10 bg-[#1F1D1A]" />
                <span className="text-xs text-[var(--ink)]/70">Iron Ore</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border border-black/10 bg-[#7E8E6E]" />
                <span className="text-xs text-[var(--ink)]/70">Sage</span>
              </div>
            </div>
          </motion.div>

          {/* Styled Photo Frame */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative p-3 bg-white rounded-sm border border-[var(--greige)]/45 shadow-md rotate-2 hover:rotate-0 transition-transform duration-500 max-w-sm w-full">
              <img 
                src={s.image} 
                alt="Modern Farmhouse Style" 
                className="w-full aspect-[4/3] object-cover rounded-sm"
              />
              <div className="pt-3 text-center">
                <span className="font-farmhouse-serif text-sm italic text-[var(--charcoal)]">Arzon Built Showcase</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. CTA Final Section ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden bg-[var(--cream)] border-t border-[var(--greige)]/20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--sage)] font-bold block mb-4">
            {lang === 'es' ? 'Presupuesto Sin Compromiso' : 'No-Obligation Estimate'}
          </span>
          <h2 className="font-farmhouse-serif font-black text-4xl md:text-5xl text-[var(--charcoal)] mb-4">
            {lang === 'es' ? 'Tu cotización, gratis.' : 'Your estimate, free.'}
          </h2>
          <p className="text-[var(--ink)]/70 max-w-md mx-auto mb-10 font-sans text-base leading-relaxed">
            {lang === 'es'
              ? `Te responderemos en 24 horas con números reales para tu proyecto de ${s.title.es.toLowerCase()}.`
              : `We'll reply within 24 hours with real numbers for your ${s.title.en.toLowerCase()} project.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Phone CTA */}
            <a 
              href="tel:+16784399829" 
              className="w-full sm:w-auto text-center border-2 border-[var(--charcoal)] text-[var(--charcoal)] px-8 py-4 font-semibold tracking-wide text-sm rounded-sm transition-all hover:bg-[var(--charcoal)] hover:text-[#030c08]"
            >
              📞 {lang === 'es' ? 'Llamar ahora' : 'Call Now'}
            </a>
            {/* Email CTA */}
            <a 
              href={`mailto:arzonbuilt@gmail.com?subject=${encodeURIComponent(lang === 'es' ? `Cotización para Proyecto de ${s.title.es}` : `Estimate Request for ${s.title.en} Project`)}`}
              className="w-full sm:w-auto text-center bg-[var(--sage)] hover:bg-[var(--sage-deep)] text-[#030c08] px-8 py-4 font-semibold tracking-wide text-sm rounded-sm transition-all shadow-md hover:scale-105"
            >
              ✉️ {lang === 'es' ? 'Enviar correo' : 'Email Us'}
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
