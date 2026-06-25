'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useT } from '../../lib/i18n'

interface GalleryItem {
  id: number
  category: 'roofing' | 'painting' | 'siding' | 'windows' | 'kitchen' | 'deck' | 'full'
  image: string
  titleEn: string
  titleEs: string
  descEn: string
  descEs: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: 'full',
    image: '/assets/full-remodeling.png',
    titleEn: 'Modern Spruce Renovation',
    titleEs: 'Renovación Moderna Abeto',
    descEn: 'Full exterior transformation with spruce green siding, a new charcoal roof, black-trim windows, and cedar wood columns.',
    descEs: 'Transformación exterior completa con revestimiento verde abeto, techo nuevo carbón, ventanas negras y columnas de cedro.'
  },
  {
    id: 2,
    category: 'roofing',
    image: '/assets/roofing.png',
    titleEn: 'Charcoal Architectural Roof',
    titleEs: 'Techo Arquitectónico Carbón',
    descEn: 'Brand-new shingle roof with premium ridge ventilation and black gutters.',
    descEs: 'Techo de tejas nuevo con ventilación de cumbrera premium y canaletas negras.'
  },
  {
    id: 3,
    category: 'windows',
    image: '/assets/ventanas.png',
    titleEn: 'Energy-Efficient Black Windows',
    titleEs: 'Ventanas Negras de Alta Eficiencia',
    descEn: 'Double-pane windows with modern black trim and custom cedar surrounds.',
    descEs: 'Ventanas de doble panel con marcos negros modernos y marcos de cedro personalizados.'
  },
  {
    id: 4,
    category: 'siding',
    image: '/assets/siding-spruce.png',
    titleEn: 'Spruce Green Siding Panels',
    titleEs: 'Paneles de Revestimiento Verde Abeto',
    descEn: 'Durable fiber cement siding paired with cedar wood trim details.',
    descEs: 'Revestimiento de fibrocemento duradero con detalles de molduras de madera de cedro.'
  },
  {
    id: 5,
    category: 'painting',
    image: '/assets/painting.png',
    titleEn: 'Precision Siding Painting',
    titleEs: 'Pintura de Precisión de Fachada',
    descEn: 'Premium UV-resistant paint application for lasting exterior protection.',
    descEs: 'Aplicación de pintura premium resistente a UV para protección exterior duradera.'
  },
  {
    id: 6,
    category: 'deck',
    image: '/assets/deck.png',
    titleEn: 'Custom Cedar Decking',
    titleEs: 'Terraza de Cedro a Medida',
    descEn: 'Spacious backyard cedar deck with elegant black railings and code-compliant framing.',
    descEs: 'Terraza trasera espaciosa de madera de cedro con barandas negras elegantes.'
  },
  {
    id: 7,
    category: 'kitchen',
    image: '/assets/kitchen.png',
    titleEn: 'Premium Kitchen Remodel',
    titleEs: 'Remodelación de Cocina Premium',
    descEn: 'Custom forest green cabinetry with gold accents and solid cedar beams.',
    descEs: 'Gabinetes verdes foresta personalizados con detalles dorados y vigas de cedro sólido.'
  }
]

export function PortfolioSection() {
  const { t, lang } = useT()
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  // Double the items for seamless infinite scroll loop
  const doubledItems = [...GALLERY_ITEMS, ...GALLERY_ITEMS]

  return (
    <section id="portfolio" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-bg">
      {/* Top & bottom dark fades */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none z-0" />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none z-0" />

      {/* Dynamic Background Blobs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-lime-DEFAULT/[0.04] rounded-full filter blur-[90px] animate-blob" />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-lime-DEFAULT/[0.02] rounded-full filter blur-[80px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center mx-auto max-w-2xl"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('portfolio.eyebrow')}</span></div>
          <h2 className="font-display-serif text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05]">
            <span className="text-white">{lang === 'es' ? 'Galería de' : 'Project'} </span>
            <span className="text-lime-gradient italic">{lang === 'es' ? 'Proyectos' : 'Gallery'}</span>
          </h2>
          <p className="text-white/50 mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed">
            {t('portfolio.gallery.subtitle')}
          </p>
        </motion.div>

        {/* Infinite Loop Auto-scrolling Carousel Section */}
        <div className="relative overflow-hidden py-4">
          {/* Left & Right fading shadows */}
          <div className="absolute top-0 bottom-0 left-0 w-20 md:w-32 bg-gradient-to-r from-bg via-bg/70 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 md:w-32 bg-gradient-to-l from-bg via-bg/70 to-transparent z-20 pointer-events-none" />

          <div 
            className="flex gap-6 animate-marquee cursor-none"
            style={{ width: 'max-content' }}
          >
            {doubledItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedItem(item)}
                className="group inline-block relative w-[280px] sm:w-[350px] md:w-[380px] aspect-[4/3] overflow-hidden bg-surface border border-white/5 select-none shrink-0 cursor-none"
                data-cursor="true"
              >
                <Image
                  src={item.image}
                  alt={lang === 'es' ? item.titleEs : item.titleEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="380px"
                  draggable={false}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left whitespace-normal">
                  <span className="text-[10px] font-sans text-lime-DEFAULT tracking-widest uppercase mb-1">
                    {t(`portfolio.gallery.category.${item.category}`)}
                  </span>
                  <h4 className="font-display-serif font-bold text-white text-lg sm:text-xl leading-tight">
                    {lang === 'es' ? item.titleEs : item.titleEn}
                  </h4>
                  <p className="text-white/50 text-xs mt-1 leading-normal line-clamp-2">
                    {lang === 'es' ? item.descEs : item.descEn}
                  </p>
                </div>
                {/* Magnifying glass indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 text-white/35 text-sm font-sans"
        >
          {t('portfolio.foot')}{' '}
          <a href="mailto:arzonbuilt@gmail.com"
            className="text-lime-DEFAULT hover:underline underline-offset-4 cursor-none" data-cursor="true">{t('portfolio.footCta')}</a>
        </motion.p>
      </div>

      {/* Lightbox modal overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-lime-DEFAULT transition-colors cursor-none font-sans"
              data-cursor="true"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-surface border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              {/* Image box */}
              <div className="relative aspect-video md:aspect-[4/3] md:w-3/5 overflow-hidden bg-black">
                <Image
                  src={selectedItem.image}
                  alt={lang === 'es' ? selectedItem.titleEs : selectedItem.titleEn}
                  fill
                  className="object-contain"
                  sizes="60vw"
                  priority
                />
              </div>

              {/* Text detail box */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between bg-surface">
                <div>
                  <span className="inline-block text-[10px] font-sans text-lime-DEFAULT tracking-widest uppercase border border-lime-DEFAULT/20 px-2.5 py-1 mb-4">
                    {t(`portfolio.gallery.category.${selectedItem.category}`)}
                  </span>
                  <h3 className="font-display-serif font-black text-white text-2xl md:text-3xl leading-tight mb-3">
                    {lang === 'es' ? selectedItem.titleEs : selectedItem.titleEn}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {lang === 'es' ? selectedItem.descEs : selectedItem.descEn}
                  </p>
                </div>

                <div>
                  <a
                    href={`mailto:arzonbuilt@gmail.com?subject=${encodeURIComponent(lang === 'es' ? `Consulta de Servicio: ${selectedItem.titleEs}` : `Service Inquiry: ${selectedItem.titleEn}`)}`}
                    className="btn-lime w-full text-center text-xs tracking-wider font-sans uppercase py-3 cursor-none block"
                    data-cursor="true"
                  >
                    {lang === 'es' ? 'Preguntar por correo' : 'Inquire by email'}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
