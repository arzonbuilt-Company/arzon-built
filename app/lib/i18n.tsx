'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'en' | 'es'

const STORAGE_KEY = 'arzon-built:lang'

const dict = {
  en: {
    // Nav
    'nav.work':      'Our Work',
    'nav.services':  'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about':     'About',
    'nav.contact':   'Contact',

    // Hero
    'hero.eyebrow':   'Lawrenceville, GA',
    'hero.title1':    'We Transform',
    'hero.title2':    'Houses Into',
    'hero.title3':    'Dream Homes.',
    'hero.subtitle':  'Premium renovations in Lawrenceville, GA — roofing, siding, painting, windows and full remodels.',
    'hero.cta1':      'Get Free Estimate',
    'hero.cta2':      'See Our Work ↓',
    'hero.scroll':    'Scroll',
    'hero.stat1':     'Years Experience',
    'hero.stat2':     'Projects Completed',
    'hero.stat3':     'Founded',

    // Services
    'services.eyebrow':   '02 — What We Do',
    'services.title1':    'The work',
    'services.title2':    'we do.',
    'services.subtitle':  'Every project starts with a free consultation and ends with a transformation engineered to last decades.',
    'services.tag':       'Service',
    'services.learnMore': 'Learn more',
    'services.s1.title':  'Roofing',
    'services.s1.desc':   'Architectural shingles engineered for 30 years. Synthetic underlayment, sealed ridge, full warranty.',
    'services.s2.title':  'Painting',
    'services.s2.desc':   'Interior and exterior. Marine-grade primer, acrylic finish — UV-stable, ten-year coating.',
    'services.s3.title':  'Siding',
    'services.s3.desc':   'Fiber cement, vinyl, and natural wood. 50-year warranty options on premium boards.',
    'services.s4.title':  'Windows & Doors',
    'services.s4.desc':   'Energy-efficient double-pane glass, black-trim frames anchored true. Cuts utility bills, lifts curb appeal.',
    'services.s5.title':  'Kitchen',
    'services.s5.desc':   'Complete remodels — cabinetry, countertops, flooring, backsplash. Built for daily use.',
    'services.s6.title':  'Deck',
    'services.s6.desc':   'Custom decks in cedar, composite, and Trex. Engineered for Georgia weather.',
    'services.full.eyebrow': '07 — Full Build',
    'services.full.title':   'Full Remodeling',
    'services.full.desc':    'From a single room to the entire house. Precision craft, premium materials. One team, zero subcontractors.',
    'services.full.cta':     'Get Free Estimate',
    'services.transformation.eyebrow': '02 — Transformation',
    'services.transformation.title': 'Witness the change.',
    'services.transformation.desc': 'Drag the slider to see the transition from the compromised structure to our completed work.',
    'services.gallery.eyebrow': '03 — Craftsmanship',
    'services.gallery.title': 'The details of our work.',
    'services.gallery.desc': 'View close-up detail photos and highlights showing the high standards we build into every single project.',

    // Portfolio
    'portfolio.eyebrow':  '03 — Our Work',
    'portfolio.title1':   'Our Premium',
    'portfolio.title2':   'Renovations.',
    'portfolio.subtitle': 'A showcase of our detailed craft and completed projects.',
    'portfolio.foot':     'New projects added monthly.',
    'portfolio.footCta':  'See more on WhatsApp',

    // About
    'about.eyebrow':       '04 — Who We Are',
    'about.title1':        'Built on trust.',
    'about.title2':        'Finished to last.',
    'about.body':          'A family-owned studio in Lawrenceville, GA. We work with our own crew — no subcontractor chain, no surprise hand-offs — committed to clean work and honest timelines on every job.',
    'about.stat.years':    'Years',
    'about.stat.projects': 'Projects',
    'about.stat.est':      'Est.',
    'about.stat.insured':  'Insured',
    'about.trust1':        'Licensed & Insured',
    'about.trust2':        'Free estimates — always',
    'about.trust3':        'Quality guaranteed in writing',
    'about.trust4':        'English & Spanish speaking',
    'about.trust5':        'Family-owned business',
    'about.trust6':        'No subcontractors — ever',
    'about.cta':           'Get Your Free Estimate',

    // Contact
    'contact.eyebrow':           '05 — Start Your Project',
    'contact.title1':            'Your estimate,',
    'contact.title2':            'no commitment.',
    'contact.subtitle':          'Tell us what you have in mind. We’ll reply within 24 hours with real numbers.',
    'contact.info.location':     'Location',
    'contact.info.locationVal':  'Lawrenceville, GA',
    'contact.info.call':         'Call / Text',
    'contact.info.whatsapp':     'Email Us',
    'contact.info.whatsappVal':  'arzonbuilt@gmail.com',
    'contact.form.name':         'Your Name',
    'contact.form.namePh':       'John Smith',
    'contact.form.phone':        'Phone Number',
    'contact.form.phonePh':      '(678) 346-8470',
    'contact.form.email':        'Email Address',
    'contact.form.emailPh':      'john@example.com',
    'contact.form.method':       'Preferred Contact Method',
    'contact.form.method.email': 'Email',
    'contact.form.method.sms':   'Text Message / SMS',
    'contact.form.service':      'Service Interested In',
    'contact.form.message':      'Message (optional)',
    'contact.form.messagePh':    'Describe your project briefly...',
    'contact.form.submit':       'Send Request',
    'contact.form.disclaimer':   'Free estimate · No commitment',
    'contact.form.opt.roofing':  'Roofing',
    'contact.form.opt.painting': 'Painting',
    'contact.form.opt.siding':   'Siding',
    'contact.form.opt.windows':  'Windows',
    'contact.form.opt.kitchen':  'Kitchen',
    'contact.form.opt.deck':     'Deck',
    'contact.form.opt.full':     'Full Remodel',
    'contact.wa.greeting':       'Hi Arzon Built! My name is',
    'contact.wa.phone':          'Phone',
    'contact.wa.interested':     'I’m interested in',
    'contact.wa.general':        'General inquiry',
    'contact.wa.message':        'Message',

    // Footer
    'footer.tagline':         'Premium home renovations in Lawrenceville, GA. Family-owned. Licensed & Insured.',
    'footer.servicesHeader':  'Services',
    'footer.contactHeader':   'Contact',
    'footer.copyright':       '© 2026 Arzon Built. Lawrenceville, GA.',
    'footer.licensed':        'Licensed & Insured',

    // Transformation
    'transformation.loading': 'Loading transformation',

    // Splash
    'splash.loading': 'Loading',

    // Language toggle
    'lang.label': 'Language',
    'lang.en':    'English',
    'lang.es':    'Español',
  },

  es: {
    // Nav
    'nav.work':      'Proyectos',
    'nav.services':  'Servicios',
    'nav.portfolio': 'Portafolio',
    'nav.about':     'Nosotros',
    'nav.contact':   'Contacto',

    // Hero
    'hero.eyebrow':   'Lawrenceville, GA',
    'hero.title1':    'Transformamos',
    'hero.title2':    'Casas en Hogares',
    'hero.title3':    'de Ensueño.',
    'hero.subtitle':  'Remodelaciones premium en Lawrenceville, GA — techos, fachadas, pintura, ventanas y remodelaciones completas.',
    'hero.cta1':      'Cotización Gratis',
    'hero.cta2':      'Ver Nuestro Trabajo ↓',
    'hero.scroll':    'Desliza',
    'hero.stat1':     'Años de Experiencia',
    'hero.stat2':     'Proyectos Completados',
    'hero.stat3':     'Fundada',

    // Services
    'services.eyebrow':   '02 — Lo que Hacemos',
    'services.title1':    'El trabajo',
    'services.title2':    'que hacemos.',
    'services.subtitle':  'Cada proyecto empieza con una consulta gratis y termina con una transformación pensada para durar décadas.',
    'services.tag':       'Servicio',
    'services.learnMore': 'Saber más',
    'services.s1.title':  'Techos',
    'services.s1.desc':   'Tejas arquitectónicas con garantía de 30 años. Membrana sintética, cumbrera sellada, garantía completa.',
    'services.s2.title':  'Pintura',
    'services.s2.desc':   'Interior y exterior. Imprimante grado marino, acabado acrílico — resistente UV, 10 años de duración.',
    'services.s3.title':  'Fachadas',
    'services.s3.desc':   'Fibrocemento, vinilo y madera natural. Opciones con garantía de 50 años en tableros premium.',
    'services.s4.title':  'Ventanas y Puertas',
    'services.s4.desc':   'Vidrio doble panel eficiente, marcos negros bien anclados. Reduce facturas, mejora la fachada.',
    'services.s5.title':  'Cocina',
    'services.s5.desc':   'Remodelaciones completas — gabinetes, mesones, pisos, salpicadero. Hechas para el uso diario.',
    'services.s6.title':  'Terraza',
    'services.s6.desc':   'Terrazas a la medida en cedro, compuesto y Trex. Diseñadas para el clima de Georgia.',
    'services.full.eyebrow': '07 — Construcción Total',
    'services.full.title':   'Remodelación Completa',
    'services.full.desc':    'Desde un cuarto hasta toda la casa. Trabajo de precisión, materiales premium. Un solo equipo, cero subcontratistas.',
    'services.full.cta':     'Cotización Gratis',
    'services.transformation.eyebrow': '02 — Transformación',
    'services.transformation.title': 'Presencia el cambio.',
    'services.transformation.desc': 'Arrastra el control para ver la transición desde la estructura dañada hasta nuestro trabajo terminado.',
    'services.gallery.eyebrow': '03 — Calidad en Detalle',
    'services.gallery.title': 'Los detalles de nuestra obra.',
    'services.gallery.desc': 'Mira fotos de detalle y acabados que demuestran los altos estándares que aplicamos en cada proyecto.',

    // Portfolio
    'portfolio.eyebrow':  '03 — Nuestro Trabajo',
    'portfolio.title1':   'Nuestras Obras',
    'portfolio.title2':   'Terminadas.',
    'portfolio.subtitle': 'Una muestra de nuestro trabajo detallado y proyectos finalizados.',
    'portfolio.foot':     'Nuevos proyectos cada mes.',
    'portfolio.footCta':  'Ver más por WhatsApp',

    // About
    'about.eyebrow':       '04 — Quiénes Somos',
    'about.title1':        'Construido en confianza.',
    'about.title2':        'Terminado para durar.',
    'about.body':          'Un estudio familiar en Lawrenceville, GA. Trabajamos con nuestro propio equipo — sin cadena de subcontratistas, sin sorpresas — comprometidos con trabajo limpio y plazos honestos en cada obra.',
    'about.stat.years':    'Años',
    'about.stat.projects': 'Proyectos',
    'about.stat.est':      'Est.',
    'about.stat.insured':  'Asegurados',
    'about.trust1':        'Licenciados y Asegurados',
    'about.trust2':        'Cotizaciones gratis — siempre',
    'about.trust3':        'Calidad garantizada por escrito',
    'about.trust4':        'Hablamos inglés y español',
    'about.trust5':        'Empresa familiar',
    'about.trust6':        'Sin subcontratistas — nunca',
    'about.cta':           'Obtén tu Cotización Gratis',

    // Contact
    'contact.eyebrow':           '05 — Empieza tu Proyecto',
    'contact.title1':            'Tu cotización,',
    'contact.title2':            'sin compromiso.',
    'contact.subtitle':          'Cuéntanos qué tienes en mente. Te respondemos en 24 horas con números reales.',
    'contact.info.location':     'Ubicación',
    'contact.info.locationVal':  'Lawrenceville, GA',
    'contact.info.call':         'Llama / Texto',
    'contact.info.whatsapp':     'Correo Electrónico',
    'contact.info.whatsappVal':  'arzonbuilt@gmail.com',
    'contact.form.name':         'Tu Nombre',
    'contact.form.namePh':       'Juan Pérez',
    'contact.form.phone':        'Teléfono',
    'contact.form.phonePh':      '(678) 346-8470',
    'contact.form.email':        'Correo Electrónico',
    'contact.form.emailPh':      'juan@ejemplo.com',
    'contact.form.method':       'Método de Contacto Preferido',
    'contact.form.method.email': 'Correo Electrónico',
    'contact.form.method.sms':   'Mensaje de Texto / SMS',
    'contact.form.service':      'Servicio de Interés',
    'contact.form.message':      'Mensaje (opcional)',
    'contact.form.messagePh':    'Describe tu proyecto brevemente...',
    'contact.form.submit':       'Enviar Solicitud',
    'contact.form.disclaimer':   'Cotización gratis · Sin compromiso',
    'contact.form.opt.roofing':  'Techos',
    'contact.form.opt.painting': 'Pintura',
    'contact.form.opt.siding':   'Fachadas',
    'contact.form.opt.windows':  'Ventanas',
    'contact.form.opt.kitchen':  'Cocina',
    'contact.form.opt.deck':     'Terraza',
    'contact.form.opt.full':     'Remodelación Total',
    'contact.wa.greeting':       '¡Hola Arzon Built! Mi nombre es',
    'contact.wa.phone':          'Teléfono',
    'contact.wa.interested':     'Estoy interesado en',
    'contact.wa.general':        'Consulta general',
    'contact.wa.message':        'Mensaje',

    // Footer
    'footer.tagline':         'Remodelaciones premium en Lawrenceville, GA. Empresa familiar. Licenciados y asegurados.',
    'footer.servicesHeader':  'Servicios',
    'footer.contactHeader':   'Contacto',
    'footer.copyright':       '© 2026 Arzon Built. Lawrenceville, GA.',
    'footer.licensed':        'Licenciados y Asegurados',

    // Transformation
    'transformation.loading': 'Cargando transformación',

    // Splash
    'splash.loading': 'Cargando',

    // Language toggle
    'lang.label': 'Idioma',
    'lang.en':    'English',
    'lang.es':    'Español',
  },
} as const

type Key = keyof typeof dict.en

interface I18nContext {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  t: (key: Key) => string
}

const Ctx = createContext<I18nContext | null>(null)

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null
  if (stored === 'en' || stored === 'es') return stored
  const browser = window.navigator.language.toLowerCase()
  if (browser.startsWith('es')) return 'es'
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    setMounted(true)
    const next = detectInitialLang()
    if (next !== lang) setLangState(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, l)
  }

  const toggleLang = () => setLang(lang === 'en' ? 'es' : 'en')

  const t = (key: Key) => {
    const activeLang = mounted ? lang : 'en'
    return dict[activeLang][key] ?? dict.en[key] ?? key
  }

  return <Ctx.Provider value={{ lang, setLang, toggleLang, t }}>{children}</Ctx.Provider>
}

export function useT() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useT must be used inside <LanguageProvider>')
  return ctx
}
