'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Navbar }         from '../../components/ui/Navbar'
import { CinematicBackground } from '../../components/ui/CinematicBackground'
import { TextReveal }     from '../../components/ui/TextReveal'
import { useT }           from '../../lib/i18n'
import type { ServiceData } from '../../lib/services-data'

const fade  = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.08 } } }

interface MaterialCard {
  id: string
  image: string
  cursor: { es: string; en: string }
  title: { es: string; en: string }
  tag: string
  desc: { es: string; en: string }
}

const SHOWCASE_DATA: Record<string, {
  eyebrow: { es: string; en: string }
  title: { es: string; en: string }
  desc: { es: string; en: string }
  materials: MaterialCard[]
}> = {
  roofing: {
    eyebrow: { es: 'Nuestros Materiales', en: 'Premium Materials' },
    title: { es: 'Materiales de Alta Gama', en: 'First-Class Roofing Materials' },
    desc: {
      es: 'Seleccionamos únicamente materiales de fabricantes líderes para garantizar la longevidad y la resistencia al clima extremo en Georgia.',
      en: 'We work with industry-leading manufacturers to guarantee lifetime durability and storm resistance for your Georgia home.'
    },
    materials: [
      {
        id: 'shingle',
        image: '/assets/roof_shingles.jpg',
        cursor: { es: 'TEJAS', en: 'SHINGLE' },
        title: { es: 'Tejas de Asfalto', en: 'Architectural Shingles' },
        tag: 'GAF Timberline / Owens Corning',
        desc: {
          es: 'Opción clásica y rentable. Tejas tridimensionales de alta resistencia al viento con barreras impermeables y una estética refinada.',
          en: 'The classic, highly durable option. Multilayered architectural shingles offering superior wind resistance, leak barriers, and timeless style.'
        }
      },
      {
        id: 'metal',
        image: '/assets/roof_metal.jpg',
        cursor: { es: 'METAL', en: 'METAL' },
        title: { es: 'Techos de Metal', en: 'Standing Seam Metal' },
        tag: 'Galvalume / Black Matte Steel',
        desc: {
          es: 'Sistemas de junta alzada de última generación. Máxima eficiencia energética, mantenimiento mínimo y una vida útil superior a 50 años.',
          en: 'Architectural-grade standing seam steel. Heat-reflective, virtually maintenance-free, and engineered to last over 50 years.'
        }
      },
      {
        id: 'tpo',
        image: '/assets/roof_tpo.jpg',
        cursor: { es: 'TPO', en: 'TPO' },
        title: { es: 'Membrana TPO Plana', en: 'Flat TPO Membrane' },
        tag: 'Firestone / GAF EverGuard TPO',
        desc: {
          es: 'Especial para techos planos o de baja pendiente. Membrana soldada por calor que refleja el 85% de la radiación solar reduciendo costos de AC.',
          en: 'Heat-welded single-ply membrane for flat sections. Highly solar-reflective (85% reflection) reducing home cooling loads drastically.'
        }
      }
    ]
  },
  painting: {
    eyebrow: { es: 'Nuestra Preparación', en: 'Our Preparation' },
    title: { es: 'El Estándar en Acabados', en: 'The Standard in Finishing' },
    desc: {
      es: 'La clave de una pintura que dura 10 años está en el tratamiento previo. No saltamos pasos para asegurar una adherencia perfecta.',
      en: 'The key to a 10-year paint job is surgical surface preparation. We never take shortcuts, ensuring a perfect long-lasting bond.'
    },
    materials: [
      {
        id: 'prep',
        image: '/assets/paint_prep.jpg',
        cursor: { es: 'LAVADO', en: 'WASH' },
        title: { es: 'Lavado a Presión y Raspado', en: 'Power Wash & Prep' },
        tag: 'Surface Preparation',
        desc: {
          es: 'Eliminamos moho, suciedad y pintura descascarada mediante hidrolavado industrial y lijado orbital para crear una superficie lisa y lista.',
          en: 'We blast away mildew, dirt, and loose paint with industrial power washing followed by orbital sanding to secure a clean surface.'
        }
      },
      {
        id: 'seal',
        image: '/assets/paint_seal.jpg',
        cursor: { es: 'SELLADO', en: 'SEAL' },
        title: { es: 'Calafateado Elástico de Grietas', en: 'Gap Caulking & Sealing' },
        tag: 'Loxon / Sherwin Caulk',
        desc: {
          es: 'Sellamos cada junta de dilatación y grieta de clavos con selladores elásticos acrílicos-uretano que se expanden con los cambios climáticos.',
          en: 'We seal every lap joint, window frame seam, and nail hole using elastic urethane-acrylic sealants that expand and contract with the weather.'
        }
      },
      {
        id: 'finish',
        image: '/assets/paint_finish.jpg',
        cursor: { es: 'PINTURA', en: 'PAINT' },
        title: { es: 'Doble Capa Sherwin-Williams', en: 'Sherwin Premium Coatings' },
        tag: 'Duration / Emerald UV Shield',
        desc: {
          es: 'Aplicación de dos capas completas de pintura acrílica premium Duration de Sherwin-Williams, con protección contra moho y decoloración UV.',
          en: 'Double coats of Sherwin-Williams Duration acrylic coatings, formulated with advanced polymers to resist fading, cracking, and Georgia mildew.'
        }
      }
    ]
  },
  siding: {
    eyebrow: { es: 'Estilos de Revestimiento', en: 'Siding Materials & Styles' },
    title: { es: 'Materiales y Acabados de Siding', en: 'Premium Siding Materials' },
    desc: {
      es: 'Te asesoramos en la elección del material ideal para proteger tu fachada, optimizando el aislamiento térmico y el valor estético de tu hogar.',
      en: 'We guide you in choosing the perfect material to protect your home exterior, optimizing thermal insulation and architectural value.'
    },
    materials: [
      {
        id: 'hardie',
        image: '/assets/siding_hardie.jpg',
        cursor: { es: 'CEMENTO', en: 'FIBER CEMENT' },
        title: { es: 'Fibrocemento (James Hardie)', en: 'Fiber Cement Siding' },
        tag: 'James Hardie HardiePlank',
        desc: {
          es: 'Paneles de fibrocemento de alta densidad resistentes a incendios, termitas e impactos. Su tecnología ColorPlus asegura un tono intacto por 15 años.',
          en: 'Fire-resistant, termite-proof, and impact-resistant fiber cement siding. ColorPlus technology locks in deep color for up to 15 years.'
        }
      },
      {
        id: 'wood',
        image: '/assets/siding-spruce.png',
        cursor: { es: 'MADERA', en: 'WOOD' },
        title: { es: 'Revestimiento de Madera Natural', en: 'Natural Wood Siding' },
        tag: 'Natural Cedar & Spruce Wood',
        desc: {
          es: 'La calidez orgánica del cedro o abeto spruce. Tratados contra la humedad y termitas, aportando un acabado arquitectónico clásico de alto valor.',
          en: 'The organic warmth of cedar or spruce siding. Pressure-treated to repel moisture and insects, providing a premium, high-value architectural finish.'
        }
      },
      {
        id: 'plaster',
        image: '/assets/modern_exterior.jpg',
        cursor: { es: 'ESTUCO', en: 'STUCCO' },
        title: { es: 'Revoque y Estuco (Plastering)', en: 'Exterior Stucco & Plastering' },
        tag: 'Acrylic & Cementitious Stucco',
        desc: {
          es: 'Acabados texturizados de estuco cementicio o acrílico de tres capas. Barrera térmica contínua de alta durabilidad sin juntas visibles.',
          en: 'Traditional three-coat cementitious or acrylic stucco systems. Provides a seamless, highly durable thermal barrier with custom texturing.'
        }
      }
    ]
  },
  'windows-doors': {
    eyebrow: { es: 'Nuestros Materiales', en: 'Premium Materials' },
    title: { es: 'Materiales de Alta Gama', en: 'First-Class Window & Door Materials' },
    desc: {
      es: 'Instalamos únicamente productos con certificación Energy Star y marcos reforzados de los fabricantes más confiables para tu hogar.',
      en: 'We install Energy Star certified products with reinforced frames from the most trusted manufacturers for your home.'
    },
    materials: [
      {
        id: 'vinyl',
        image: '/assets/windows_vinyl.jpg',
        cursor: { es: 'VINILO', en: 'VINYL' },
        title: { es: 'Ventanas de Vinilo (PVC)', en: 'Premium Vinyl Windows' },
        tag: 'Simonton / Alside Energy Star',
        desc: {
          es: 'Excelente aislamiento térmico, marcos soldados por fusión que nunca requieren pintura y vidrios con doble capa Low-E rellenos de gas Argón.',
          en: 'Superior thermal efficiency, fusion-welded frames that never need painting, and double-pane Low-E glass filled with Argon gas.'
        }
      },
      {
        id: 'wood',
        image: '/assets/windows_wood.jpg',
        cursor: { es: 'MADERA', en: 'WOOD' },
        title: { es: 'Madera Revestida en Aluminio', en: 'Aluminum-Clad Wood' },
        tag: 'Marvin / Pella Clad Wood',
        desc: {
          es: 'La calidez inigualable de la madera real en el interior, protegida por un escudo de aluminio extruido de alta resistencia en el exterior.',
          en: 'The warmth of natural wood inside, protected by an industrial-strength extruded aluminum shield on the exterior.'
        }
      },
      {
        id: 'fiberglass',
        image: '/assets/windows_fiberglass.jpg',
        cursor: { es: 'FIBRA', en: 'FIBERGLASS' },
        title: { es: 'Puertas de Fibra de Vidrio', en: 'Fiberglass Entry Systems' },
        tag: 'Therma-Tru / Marvin Integrity',
        desc: {
          es: 'Sistemas de entrada ultra resistentes que imitan el grano de la madera, pero sin deformarse o pudrirse por la humedad en Georgia.',
          en: 'Ultra-durable entry doors that mimic natural wood grain, but will never swell, rot, warp, or crack under Georgia\'s humidity.'
        }
      }
    ]
  },
  kitchen: {
    eyebrow: { es: 'Optimización del Espacio', en: 'Space Optimization' },
    title: { es: 'Distribución e Ingeniería de Cocina', en: 'Kitchen Layout & Cabinet Engineering' },
    desc: {
      es: 'Diseñamos cocinas a medida que combinan ergonomía perfecta con materiales eternos para crear el centro de reunión ideal en tu hogar.',
      en: 'We design custom kitchens that combine perfect ergonomics with lifetime materials to create the ultimate gathering space for your home.'
    },
    materials: [
      {
        id: 'cabinets',
        image: '/assets/kitchen_cabinets.jpg',
        cursor: { es: 'MUEBLES', en: 'CABINETS' },
        title: { es: 'Gabinetes y Almacenaje Inteligente', en: 'Smart Cabinets & Storage' },
        tag: 'Custom Oak & Maple Cabinetry',
        desc: {
          es: 'Estructuras de madera sólida con herrajes de cierre suave, organizadores extraíbles de especias y rinconeras giratorias que duplican el espacio útil.',
          en: 'Solid wood construction with soft-close hinges, pull-out spice racks, and blind-corner carousels that double your functional cabinet space.'
        }
      },
      {
        id: 'countertops',
        image: '/assets/kitchen_countertops.jpg',
        cursor: { es: 'CUBIERTA', en: 'COUNTERTOP' },
        title: { es: 'Encimeras y Cuarzo de Lujo', en: 'Luxury Quartz Countertops' },
        tag: 'Grade-A Non-Porous Quartz',
        desc: {
          es: 'Superficies de cuarzo grado A no porosas. Ultra resistentes a manchas, bacterias y altas temperaturas, con vetas elegantes continuas.',
          en: 'Premium non-porous quartz surfaces. Ultra-resistant to stains, heat, and scratches, featuring elegant continuous bookmatched veining.'
        }
      },
      {
        id: 'lighting',
        image: '/assets/kitchen_lighting.jpg',
        cursor: { es: 'LUZ LED', en: 'LED LIGHTS' },
        title: { es: 'Iluminación y Circuitos Dedicados', en: 'Task Lighting & Smart Power' },
        tag: 'Task & Ambient LED Systems',
        desc: {
          es: 'Tiras de luz LED bajo los gabinetes, tomacorrientes ocultos y circuitos dedicados para electrodomésticos de alta potencia que aseguran un funcionamiento seguro.',
          en: 'Stunning under-cabinet LED task lighting, pop-up power outlets, and dedicated high-amp circuits engineered for modern smart appliances.'
        }
      }
    ]
  },
  deck: {
    eyebrow: { es: 'Ingeniería Exterior', en: 'Outdoor Living Tech' },
    title: { es: 'Seguridad y Durabilidad Estructural', en: 'Structural Safety & Outdoor Luxury' },
    desc: {
      es: 'Construimos terrazas seguras y elegantes que resisten el sol y la lluvia intensa de Georgia por décadas.',
      en: 'We construct secure, premium outdoor decks designed to withstand Georgia\'s heavy storms and high UV indexes for decades.'
    },
    materials: [
      {
        id: 'frame',
        image: '/assets/deck_frame.jpg',
        cursor: { es: 'SOPORTE', en: 'FRAME' },
        title: { es: 'Estructura de Madera Tratada', en: 'Pressure-Treated Framing' },
        tag: 'PT Wood / Heavy-Duty Fasteners',
        desc: {
          es: 'Vigas y postes de madera tratada a presión, con anclajes metálicos atornillados y conectores de alta resistencia para máxima seguridad estructural.',
          en: 'Pressure-treated structural beams and posts anchored with heavy-duty structural screws and connectors for maximum safety load-bearing.'
        }
      },
      {
        id: 'composite',
        image: '/assets/deck_composite.jpg',
        cursor: { es: 'CUBIERTA', en: 'DECKING' },
        title: { es: 'Composite Premium Libre de Astillas', en: 'Splinter-Free Composite' },
        tag: 'Trex / TimberTech Decking',
        desc: {
          es: 'Tablas de composite premium que no requieren sellado, pintura ni lijado. Resistentes al moho y decoloración, instaladas sin tornillos visibles.',
          en: 'High-performance composite boards that never split, splinter, rot, or fade. Installs with hidden fastener clips for a flawless surface.'
        }
      },
      {
        id: 'railing',
        image: '/assets/deck_railing.jpg',
        cursor: { es: 'BARANDA', en: 'RAILING' },
        title: { es: 'Barandillas de Aluminio Reforzadas', en: 'Aluminum Railing Systems' },
        tag: 'Powder-Coated Aluminum Rails',
        desc: {
          es: 'Barandillas de aluminio con recubrimiento de polvo negro. Estilo moderno, visibilidad máxima y resistencia a la corrosión de por vida.',
          en: 'Architectural-grade black powder-coated aluminum railings. Modern look, minimal view obstruction, and lifetime rust prevention.'
        }
      }
    ]
  },
  'full-remodeling': {
    eyebrow: { es: 'Transformación Completa', en: 'Total Home Transformation' },
    title: { es: 'Ingeniería y Redistribución del Hogar', en: 'Whole-Home Architecture & Build' },
    desc: {
      es: 'Reconstruimos tu hogar de extremo a extremo, optimizando el espacio, la iluminación y la habitabilidad para el estilo de vida actual.',
      en: 'We rebuild your home from studs to finish, optimizing space distribution, natural lighting, and flow for modern lifestyles.'
    },
    materials: [
      {
        id: 'plan',
        image: '/assets/remodel_structural.jpg',
        cursor: { es: 'DISEÑO', en: 'DESIGN' },
        title: { es: 'Diseño Estructural y Demolición', en: 'Structural Planning & Demo' },
        tag: 'Demolition & Architectural Layout',
        desc: {
          es: 'Planificación de espacios abiertos y remoción de muros portantes mediante vigas de acero de alta resistencia para crear distribuciones amplias.',
          en: 'Architectural space planning and structural load-bearing wall removals with engineered steel beams to create spacious layouts.'
        }
      },
      {
        id: 'rough',
        image: '/assets/remodeling_detail_1.png',
        cursor: { es: 'ESTRUCTURA', en: 'ROUGH-IN' },
        title: { es: 'Estructuras y Conexiones Internas', en: 'Framing & System Rough-Ins' },
        tag: 'Framing, HVAC, Plumbing & Power',
        desc: {
          es: 'Reconstrucción de la estructura interna del hogar, renovación de cañerías, cableado eléctrico para el hogar inteligente y conductos de climatización.',
          en: 'Framing modifications, replacement of old plumbing, complete electrical rewire for smart devices, and new optimized HVAC venting.'
        }
      },
      {
        id: 'finishes',
        image: '/assets/remodeling_detail_2.png',
        cursor: { es: 'ACABADOS', en: 'FINISHES' },
        title: { es: 'Acabados y Detalles de Lujo', en: 'High-End Architectural Finishes' },
        tag: 'Cabinetry, Trim & Flooring',
        desc: {
          es: 'Pisos de madera de ingeniería LVP de alto tránsito, molduras de corona artesanales, pintura premium y la colocación fina de carpintería y griferías.',
          en: 'Installation of luxury LVP flooring, handcrafted trim profiles, premium finish coatings, custom cabinetry, and high-end plumbing fixtures.'
        }
      }
    ]
  }
}

export function ServicePageClient({ service: s }: { service: ServiceData }) {
  const { lang, t } = useT()
  const title    = s.title[lang]
  const subtitle = s.subtitle[lang]
  const body     = s.body[lang]
  const features = s.features[lang]
  const process  = s.process[lang]

  const showcase = SHOWCASE_DATA[s.slug]

  return (
    <main className="min-h-screen bg-transparent relative">
      <CinematicBackground />

      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Particle field removed as per request */}
        <div className="absolute inset-0 z-1 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(9,9,11,0.93) 100%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-6 w-full py-16 text-center">
          {/* Back link */}
          <div className="animate-fade-up" style={{ animationDelay: '0s' }}>
            <Link href="/#services"
              className="inline-flex items-center gap-2 text-[10px] font-sans text-white/35 tracking-[.3em] uppercase hover:text-lime-DEFAULT transition-colors mb-10"
            >
              ← All Services
            </Link>
          </div>

          {/* Eyebrow */}
          <p
            className="section-eyebrow mb-6 justify-center animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="section-rule" />
            {s.num} — {lang === 'es' ? 'Servicio' : 'Service'}
            <span className="section-rule" />
          </p>

          {/* Title */}
          <h1 className="font-display-serif font-black leading-[0.95] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            <TextReveal text={title} as="span" className="block text-lime-gradient italic" delay={0.2} />
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/55 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: '0.8s' }}
          >
            {subtitle}
          </p>

          <div
            className="flex gap-4 justify-center animate-fade-up"
            style={{ animationDelay: '1.0s' }}
          >
            <a href="/#contact" className="btn-lime text-sm">
              {lang === 'es' ? 'Cotización Gratis' : 'Get Free Estimate'}
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-10" />
      </section>

      {/* ── Material Showcase Section ── */}
      {showcase && (
        <section className="relative py-24 px-6 bg-transparent overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(185,190,138,0.07) 0%, transparent 70%)' }} />

          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true, margin: '0px 0px 120px 0px' }} 
              variants={fade}
              transition={{ duration: 0.7 }} 
              className="text-center mb-16"
            >
              <p className="section-eyebrow mb-4 justify-center">
                <span className="section-rule" />
                {showcase.eyebrow[lang]}
                <span className="section-rule" />
              </p>
              <h2 className="font-display-serif text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-wider">
                {showcase.title[lang]}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mt-4 text-sm md:text-base leading-relaxed font-sans">
                {showcase.desc[lang]}
              </p>
            </motion.div>

            {/* Materials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {showcase.materials.map((mat, idx) => (
                <motion.div
                  key={mat.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative flex flex-col rounded-2xl border border-white/5 bg-black/45 overflow-hidden shadow-2xl hover:border-lime-DEFAULT/25 hover:scale-[1.02] transition-all duration-500 cursor-none"
                  data-cursor-text={mat.cursor[lang] || mat.cursor.en}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={mat.image}
                      alt={mat.title[lang]}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-4 left-4 bg-bg/85 border border-white/10 px-2.5 py-0.5 rounded text-[9px] font-mono text-lime-DEFAULT font-black tracking-widest uppercase">
                      {mat.tag}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-display-serif font-black text-white text-xl mb-2 group-hover:text-lime-DEFAULT transition-colors duration-300">
                        {mat.title[lang]}
                      </h3>
                      <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed">
                        {mat.desc[lang]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Body + Features ── */}
      <section className="relative py-24 px-6 bg-transparent overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — body copy */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px 120px 0px' }} variants={fade}
            transition={{ duration: 0.7 }}>
            <p className="section-eyebrow mb-5">
              <span className="section-rule" />
              {lang === 'es' ? 'Por qué funciona' : 'Why it works'}
            </p>
            <h2 className="font-display-serif text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              {lang === 'es' ? 'El trabajo.\nSin atajos.' : 'The work.\nNo shortcuts.'}
            </h2>
            <p className="text-white/55 text-base leading-relaxed">{body}</p>
          </motion.div>

          {/* Right — features */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px 120px 0px' }} variants={stagger}
            transition={{ delayChildren: 0.2 }} className="space-y-3 pt-2">
            <p className="text-[10px] font-sans text-white/30 tracking-[.35em] uppercase mb-4">
              {lang === 'es' ? 'Lo que incluye' : "What's included"}
            </p>
            {features.map(f => (
              <motion.div key={f} variants={fade} transition={{ duration: 0.5 }}
                className="flex items-center gap-4 glass p-4">
                <span className="font-display-serif text-lime-DEFAULT shrink-0 text-lg">—</span>
                <span className="text-sm font-sans text-white/70">{f}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Craftsmanship Gallery ── */}
      <section className="relative py-24 px-6 bg-transparent overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <p className="section-eyebrow mb-4 justify-center">
              <span className="section-rule" />
              {t('services.gallery.eyebrow')}
            </p>
            <h2 className="font-display-serif text-3xl md:text-5xl font-black text-white mb-4">
              {t('services.gallery.title')}
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-sans">
              {t('services.gallery.desc')}
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {s.gallery.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-bg shadow-2xl cursor-none"
                data-cursor-text={lang === 'es' ? 'GALERÍA' : 'GALLERY'}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.caption[lang]}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end min-h-[40%]">
                  {/* Decorative line */}
                  <span className="w-8 h-[2px] bg-lime-DEFAULT mb-3 transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <p className="text-white text-base md:text-sm font-sans font-bold leading-snug tracking-wide opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {item.caption[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="relative py-24 px-6 bg-transparent overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-DEFAULT/10 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px 120px 0px' }} variants={fade}
            transition={{ duration: 0.7 }} className="text-center mb-16">
            <p className="section-eyebrow mb-4 justify-center">
              <span className="section-rule" />
              {lang === 'es' ? 'Cómo funciona' : 'How it works'}
            </p>
            <h2 className="font-display-serif text-4xl md:text-5xl font-black text-white">
              {lang === 'es' ? 'El proceso.' : 'The process.'}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[1.45rem] top-0 bottom-0 w-px bg-white/6 hidden md:block" />

            <div className="space-y-6">
              {process.map((p, i) => (
                <motion.div key={p.step}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px 120px 0px' }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex gap-6 items-start">
                  {/* Step number circle */}
                  <div className="shrink-0 w-11 h-11 rounded-full glass-lime flex items-center justify-center z-10">
                    <span className="font-display-serif text-lime-DEFAULT font-bold text-sm tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="glass p-5 flex-1">
                    <h3 className="font-display-serif text-lg font-bold text-white mb-1">{p.step}</h3>
                    <p className="text-sm font-sans text-white/50 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Arzon Standard ── */}
      <section className="relative py-24 px-6 bg-transparent overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 120px 0px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="section-eyebrow mb-4 justify-center">
              <span className="section-rule" />
              {lang === 'es' ? 'Compromiso de Satisfacción' : 'Our Quality Commitment'}
            </p>
            <h2 className="font-display-serif text-4xl md:text-5xl font-black text-white">
              {lang === 'es' ? 'El Estándar Arzon.' : 'The Arzon Standard.'}
            </h2>
            <p className="text-white/45 max-w-xl mx-auto mt-4 font-sans text-sm md:text-base">
              {lang === 'es' 
                ? 'Cuatro pilares de profesionalismo que rigen cada uno de nuestros proyectos de remodelación.'
                : 'Four pillars of craftsmanship and professionalism that guide every single project we build.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '👷‍♂️',
                title: lang === 'es' ? 'Solo Personal Propio' : 'No Subcontractors',
                desc: lang === 'es' 
                  ? 'Nunca delegamos tu proyecto a subcontratistas externos desconocidos. Todo el trabajo es realizado por nuestro propio equipo experimentado y de confianza.'
                  : 'We never hand your project off to third-party subcontractors. Every stage of your build is handled directly by our own skilled, trusted crew.'
              },
              {
                icon: '🧹',
                title: lang === 'es' ? 'Garantía de Limpieza' : 'Spotless Site Guarantee',
                desc: lang === 'es' 
                  ? 'Realizamos barridos magnéticos diarios para recoger clavos, protegemos tus plantas con lonas y dejamos tu propiedad impecable al finalizar la jornada.'
                  : 'We perform daily magnetic sweeps to collect nails, lay protective drop cloths over your landscaping, and leave your property cleaner than we found it.'
              },
              {
                icon: '📜',
                title: lang === 'es' ? 'Garantía por Escrito' : 'Written Warranties',
                desc: lang === 'es' 
                  ? 'Sin promesas vacías ni sorpresas. Recibes un contrato transparente y una garantía escrita y firmada que certifica la excelencia de nuestra mano de obra.'
                  : 'No loose promises. You receive a fully transparent contract and a signed, written warranty covering our workmanship alongside manufacturer warranties.'
              },
              {
                icon: '🛡️',
                title: lang === 'es' ? '100% Protegidos' : 'Licensed & Fully Insured',
                desc: lang === 'es' 
                  ? 'Contamos con licencia de contratista activa en Georgia, con seguros completos de responsabilidad civil y compensación laboral para tu total tranquilidad.'
                  : 'Fully licensed in Georgia with active general liability and worker\'s compensation policies, ensuring complete protection for you and your home.'
              }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px 120px 0px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-lime-DEFAULT/20 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl block mb-4">{pillar.icon}</span>
                  <h3 className="font-display-serif text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm font-sans text-white/50 leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden bg-transparent">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(185,190,138,0.14) 0%, transparent 70%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px 120px 0px' }} transition={{ duration: 0.7 }} className="relative z-10">
          <p className="section-eyebrow justify-center mb-6">
            <span className="section-rule" />
            {lang === 'es' ? 'Sin compromiso' : 'No commitment'}
          </p>
          <h2 className="font-display-serif text-4xl md:text-5xl font-black text-white mb-4">
            {lang === 'es' ? 'Tu cotización, gratis.' : 'Your estimate, free.'}
          </h2>
          <p className="text-white/45 max-w-md mx-auto mb-10 font-sans text-base leading-relaxed">
            {lang === 'es'
              ? `Te responderemos en 24 horas con números reales para tu ${s.title.es.toLowerCase()}.`
              : `We'll reply within 24 hours with real numbers for your ${s.title.en.toLowerCase()} project.`}
          </p>
          <a href="/#contact" className="btn-lime inline-block">
            {lang === 'es' ? 'Cotización Gratis' : 'Get Free Estimate'}
          </a>
        </motion.div>
      </section>
    </main>
  )
}
