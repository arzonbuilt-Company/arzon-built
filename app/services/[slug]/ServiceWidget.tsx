'use client'
import { useState, useRef } from 'react'
import { useT } from '../../lib/i18n'
import type { WidgetType } from '../../lib/services-data'

// ─── 0. Common Interactive Before/After Photo Slider (A2) ───────────────────
interface ImageSliderProps {
  beforeImg: string
  afterImg: string
  beforeFilter?: string
  afterFilter?: string
  afterOverlay?: React.ReactNode
  heightClassName?: string
}

function ImageSlider({
  beforeImg,
  afterImg,
  beforeFilter = '',
  afterFilter = '',
  afterOverlay = null,
  heightClassName = 'h-[280px]'
}: ImageSliderProps) {
  const { lang } = useT()
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percentage)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClassName} bg-[var(--linen)] rounded-md border border-[var(--greige)]/45 overflow-hidden select-none cursor-ew-resize`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => { isDragging.current = true }}
      onMouseUp={() => { isDragging.current = false }}
      onMouseLeave={() => { isDragging.current = false }}
    >
      {/* Background (After / Finished Image) */}
      <img
        src={afterImg}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ filter: afterFilter }}
      />
      {afterOverlay}

      {/* Label After */}
      <div className="absolute right-3 top-3 bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-sm text-[9px] uppercase font-bold tracking-widest text-white z-20 pointer-events-none">
        {lang === 'es' ? 'Terminado' : 'Finished'}
      </div>

      {/* Foreground (Before Image) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImg}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ 
            width: containerRef.current?.getBoundingClientRect().width || '100%', 
            height: '100%',
            filter: beforeFilter 
          }}
        />
      </div>

      {/* Label Before */}
      <div className="absolute left-3 top-3 bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-sm text-[9px] uppercase font-bold tracking-widest text-white/60 z-20 pointer-events-none">
        {lang === 'es' ? 'Antes' : 'Before'}
      </div>

      {/* Slider Split Drag Handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-[var(--sage)] z-30 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[var(--sage)] text-white font-bold border-2 border-white flex items-center justify-center shadow-md text-xs">
          ↔
        </div>
      </div>
    </div>
  )
}

// ─── 1. Painting Widget (🎨 MÓDULO 1) ───────────────────────────────────────
export function PaintingWidget() {
  const { lang } = useT()
  const [activeTab, setActiveTab] = useState<'slider' | 'steps'>('slider')
  const [selectedColor, setSelectedColor] = useState<'white' | 'greige' | 'sage' | 'black'>('white')

  const colors = [
    { id: 'white', label: 'Alabaster', hex: '#FAF8F3', overlay: 'rgba(250, 248, 243, 0.08)' },
    { id: 'greige', label: 'Greige', hex: '#B9B1A3', overlay: 'rgba(185, 177, 163, 0.35)' },
    { id: 'sage', label: 'Sage', hex: '#7E8E6E', overlay: 'rgba(126, 142, 110, 0.35)' },
    { id: 'black', label: 'Iron Ore', hex: '#1F1D1A', overlay: 'rgba(31, 29, 26, 0.45)' }
  ] as const

  const currentColorObj = colors.find(c => c.id === selectedColor)!

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-[var(--greige)]/20 pb-2">
        <button
          onClick={() => setActiveTab('slider')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'slider' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Fachada Comparar' : 'Facade Compare'}
        </button>
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'steps' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Proceso y Preparación' : 'Process & Prep'}
        </button>
      </div>

      {activeTab === 'slider' ? (
        <div className="space-y-4">
          {/* Slider with blend overlay for color paint switcher (A8) */}
          <ImageSlider
            beforeImg="/assets/antes-painting.png"
            afterImg="/assets/terminado-painting.png"
            afterOverlay={
              <div 
                className="absolute inset-0 transition-colors duration-500 pointer-events-none"
                style={{ 
                  backgroundColor: currentColorObj.overlay,
                  mixBlendMode: 'multiply'
                }}
              />
            }
          />

          {/* Color Switcher (A8) */}
          <div className="bg-[var(--linen)] p-4 rounded-md border border-[var(--greige)]/20">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--charcoal)]/60 block mb-2.5">
              {lang === 'es' ? 'Prueba de Tono de Siding (A8)' : 'Siding Color Swatch (A8)'}
            </span>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-all relative ${
                      selectedColor === c.id 
                        ? 'border-[var(--sage)] scale-110 shadow-md' 
                        : 'border-[var(--greige)]/40 hover:scale-105'
                    }`}
                    title={c.label}
                  >
                    {selectedColor === c.id && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color: c.id === 'white' ? '#1F1D1A' : '#FFFFFF' }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-[var(--charcoal)]/80">
                {lang === 'es' ? 'Siding pintado en ' : 'Siding painted in '}
                <strong>{currentColorObj.label}</strong>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-bold text-[13px] text-[var(--charcoal)]">
              {lang === 'es' ? 'Fase de Preparación a Detalle' : 'Preparation Phase in Detail'}
            </h4>
            <p className="text-[11px] leading-relaxed text-[var(--ink)]">
              {lang === 'es'
                ? 'No pintamos sobre problemas. El 80% de un buen acabado es la preparación: lavamos a presión para quitar impurezas, sellamos grietas con calafateo premium de poliuretano y aplicamos una mano base de imprimante antes del acabado acrílico de alta elasticidad.'
                : 'We don\'t paint over issues. 80% of a good paint job is preparation: we pressure wash, caulk gaps with premium polyurethane, and apply a full primer coat before the high-elasticity acrylic finish.'}
            </p>
            <div className="p-3 bg-[var(--linen)] rounded border border-[var(--greige)]/20 text-[10px] text-[var(--ink)]/70">
              ✓ Low-VOC (Baja toxicidad) • Imprimación grado marino
            </div>
          </div>
          <div className="h-[180px] rounded-md overflow-hidden border border-[var(--greige)]/30">
            <img 
              src="/assets/durante-painting.png" 
              alt="Durante pintura" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 2. Roofing Widget (🏠 MÓDULO 2) ────────────────────────────────────────
export function RoofingWidget() {
  const { lang } = useT()
  const [activeTab, setActiveTab] = useState<'slider' | 'layers'>('slider')
  const [selectedLayer, setSelectedLayer] = useState(0)

  const layers = [
    {
      title: lang === 'es' ? '1. Cubierta Estructural (Decking)' : '1. Wood Roof Decking',
      desc: lang === 'es' ? 'Inspección de vigas y reemplazo de láminas de plywood podridas por humedad para lograr una base rígida y segura.' : 'Inspect rafters and replace moisture-damaged plywood boards to establish a structural, safe base.',
      img: '/assets/durante-roofing.png'
    },
    {
      title: lang === 'es' ? '2. Barrera Sintética (Underlayment)' : '2. Synthetic Water Barrier',
      desc: lang === 'es' ? 'Capa aisladora impermeable sintética. Ofrece una resistencia al desgarro 5 veces mayor que el fieltro tradicional y detiene filtraciones.' : 'Impermeable synthetic layer. Outperforms traditional asphalt felt 5x in tear strength and guarantees water tightness.',
      img: '/assets/durante-roofing.png'
    },
    {
      title: lang === 'es' ? '3. Cubierta Teja o Metal (Shingles/Metal)' : '3. Finished Rafters & Shingles',
      desc: lang === 'es' ? 'Instalación final de tejas arquitectónicas de 30 años o paneles de metal standing seam grafito. Resistente a vientos de hasta 130 mph.' : 'Final laying of 30-year architectural shingles or graphite standing seam metal panels. Wind-resistant up to 130 mph.',
      img: '/assets/terminado-roofing.png'
    }
  ]

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      <div className="flex gap-2 border-b border-[var(--greige)]/20 pb-2">
        <button
          onClick={() => setActiveTab('slider')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'slider' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Comparar Techo antes/después' : 'Compare Roof before/after'}
        </button>
        <button
          onClick={() => setActiveTab('layers')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'layers' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Capas Constructivas (A5)' : 'Constructive Layers (A5)'}
        </button>
      </div>

      {activeTab === 'slider' ? (
        <ImageSlider
          beforeImg="/assets/durante-roofing.png"
          afterImg="/assets/terminado-roofing.png"
        />
      ) : (
        <div className="grid md:grid-cols-12 gap-5 items-center">
          {/* Layer Selector Left Column (A5 Staggered reveal effect) */}
          <div className="md:col-span-5 flex flex-col gap-2.5">
            {layers.map((l, i) => (
              <button
                key={i}
                onClick={() => setSelectedLayer(i)}
                className={`text-left p-3 border rounded-sm transition-all ${
                  selectedLayer === i 
                    ? 'border-[var(--sage)] bg-[var(--sage)]/5 font-semibold text-[var(--charcoal)]' 
                    : 'border-[var(--greige)]/20 hover:border-[var(--greige)]/45 text-[var(--charcoal)]/70'
                }`}
              >
                {l.title}
              </button>
            ))}
          </div>

          {/* Layer Photo and Details Right Column */}
          <div className="md:col-span-7 p-4 bg-[var(--linen)] rounded-md border border-[var(--greige)]/30 flex flex-col gap-3 min-h-[200px] justify-between">
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-widest text-[var(--wood)] font-bold">
                {lang === 'es' ? 'Detalle de Construcción' : 'Construction Detail'}
              </span>
              <p className="text-[11px] leading-relaxed text-[var(--ink)]">
                {layers[selectedLayer].desc}
              </p>
            </div>
            <div className="h-[100px] rounded overflow-hidden border border-[var(--greige)]/20 mt-1">
              <img 
                src={layers[selectedLayer].img} 
                alt="Roofing Layer Detail" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 3. Siding Widget (🧱 MÓDULO 3) ─────────────────────────────────────────
export function SidingWidget() {
  const { lang } = useT()
  const [activeTab, setActiveTab] = useState<'slider' | 'switcher'>('slider')
  const [selectedFinish, setSelectedFinish] = useState<'board' | 'lap'>('board')

  const finishImages = {
    board: '/assets/terminado-siding.png',
    lap: '/assets/siding-spruce.png'
  }

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      <div className="flex gap-2 border-b border-[var(--greige)]/20 pb-2">
        <button
          onClick={() => setActiveTab('slider')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'slider' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Fachada Comparar antes/después' : 'Compare Facade before/after'}
        </button>
        <button
          onClick={() => setActiveTab('switcher')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'switcher' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Acabados Disponibles (A8)' : 'Available Finishes (A8)'}
        </button>
      </div>

      {activeTab === 'slider' ? (
        <ImageSlider
          beforeImg="/assets/antes-siding.png"
          afterImg="/assets/terminado-siding.png"
        />
      ) : (
        <div className="space-y-4">
          <div className="relative h-[240px] rounded-md overflow-hidden border border-[var(--greige)]/30">
            <img 
              src={finishImages[selectedFinish]} 
              alt="Siding Finish" 
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute right-3 top-3 bg-black/80 px-2.5 py-0.5 rounded-sm text-[9px] uppercase tracking-widest text-white">
              {selectedFinish === 'board' ? 'Vertical Board & Batten' : 'Horizontal Lap Siding'}
            </div>
          </div>

          {/* Switcher A8 */}
          <div className="bg-[var(--linen)] p-4 rounded-md border border-[var(--greige)]/20 grid grid-cols-2 gap-3 text-center">
            <button
              onClick={() => setSelectedFinish('board')}
              className={`p-2.5 border rounded-sm transition-all flex flex-col items-center justify-center ${
                selectedFinish === 'board' 
                  ? 'border-[var(--sage)] bg-[var(--sage)]/5 font-semibold' 
                  : 'border-[var(--greige)]/20 hover:border-[var(--greige)]/45 text-[var(--charcoal)]/70'
              }`}
            >
              <span className="font-bold text-[12px]">Vertical Board & Batten</span>
              <span className="text-[10px] text-[var(--charcoal)]/60 mt-1">
                {lang === 'es' ? 'Sello visual e icónico Modern Farmhouse' : 'The vertical design defining modern farmhouses'}
              </span>
            </button>

            <button
              onClick={() => setSelectedFinish('lap')}
              className={`p-2.5 border rounded-sm transition-all flex flex-col items-center justify-center ${
                selectedFinish === 'lap' 
                  ? 'border-[var(--sage)] bg-[var(--sage)]/5 font-semibold' 
                  : 'border-[var(--greige)]/20 hover:border-[var(--greige)]/45 text-[var(--charcoal)]/70'
              }`}
            >
              <span className="font-bold text-[12px]">Horizontal Lap Siding</span>
              <span className="text-[10px] text-[var(--charcoal)]/60 mt-1">
                {lang === 'es' ? 'Estilo clásico horizontal James Hardie' : 'Traditional horizontal fiber-cement planks'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 4. Windows Widget (🚪 MÓDULO 4) ────────────────────────────────────────
export function WindowsWidget() {
  const { lang } = useT()
  const [lightOn, setLightOn] = useState(false)

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      <div className="relative">
        {/* Windows picture slider with sepia old filter to make "before" look damaged */}
        <ImageSlider
          beforeImg="/assets/ventanas-showcase.png"
          afterImg="/assets/ventanas-showcase.png"
          beforeFilter="sepia(0.85) contrast(0.85) brightness(0.6) blur(0.5px)"
          afterOverlay={
            <div 
              className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
              style={{ 
                opacity: lightOn ? 1 : 0,
                background: 'radial-gradient(circle at 55% 45%, rgba(254, 240, 138, 0.28) 0%, rgba(169, 116, 79, 0.08) 55%, transparent 100%)',
                mixBlendMode: 'screen'
              }}
            />
          }
        />
        
        {/* Light switch floating overlay */}
        <div className="absolute right-4 bottom-4 z-20">
          <button
            onClick={() => setLightOn(!lightOn)}
            className={`px-3 py-1.5 rounded-sm border font-bold text-[9px] uppercase tracking-wider transition-all shadow-md ${
              lightOn 
                ? 'bg-amber-300 border-amber-300 text-bg shadow-amber-300/25' 
                : 'bg-[var(--charcoal)] border-white/10 text-white/70 hover:text-white'
            }`}
          >
            💡 {lightOn ? (lang === 'es' ? 'Apagar luz solar' : 'Turn off light') : (lang === 'es' ? 'Efecto entra la luz (A10)' : 'Let Light In (A10)')}
          </button>
        </div>
      </div>

      <div className="bg-[var(--linen)] p-3 rounded-md border border-[var(--greige)]/20 text-[11px] text-[var(--ink)]/80 leading-relaxed">
        {lang === 'es'
          ? 'Las ventanas negras mate no solo definen la fachada, sino que reducen significativamente el paso térmico gracias al doble cristal Low-E relleno de gas argón.'
          : 'Matte black window profiles not only define the facade, but also block thermal bleed through a double-pane Low-E design filled with argon gas.'}
      </div>
    </div>
  )
}

// ─── 5. Kitchen Widget (🍳 MÓDULO 5) ────────────────────────────────────────
export function KitchenWidget() {
  const { lang } = useT()
  const [activeTab, setActiveTab] = useState<'slider' | 'details'>('slider')

  const details = [
    {
      title: lang === 'es' ? 'Fregadero Farmhouse' : 'Farmhouse Sink',
      desc: lang === 'es' ? 'Fregadero con delantal profundo que destaca sobre el cuarzo.' : 'Deep apron-front basin that sets the classic center design.'
    },
    {
      title: lang === 'es' ? 'Gabinetes Shaker' : 'Shaker Cabinets',
      desc: lang === 'es' ? 'Líneas limpias y herrajes negros mate para un estilo elegante.' : 'Clean shaker wood rails combined with matte black hardware.'
    },
    {
      title: lang === 'es' ? 'Mesón de Cuarzo' : 'Quartz Countertops',
      desc: lang === 'es' ? 'Piedra procesada de nulo mantenimiento y alta higiene.' : 'Processed quartz stone slab, ultra-hygienic and durable.'
    }
  ]

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      <div className="flex gap-2 border-b border-[var(--greige)]/20 pb-2">
        <button
          onClick={() => setActiveTab('slider')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'slider' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Comparar Cocina antes/después' : 'Compare Kitchen before/after'}
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'details' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Detalles de Diseño (A6)' : 'Design Highlights (A6)'}
        </button>
      </div>

      {activeTab === 'slider' ? (
        <ImageSlider
          beforeImg="/assets/kitchen.png"
          afterImg="/assets/kitchen.png"
          beforeFilter="sepia(0.8) contrast(0.9) brightness(0.7) grayscale(0.25)"
        />
      ) : (
        <div className="grid sm:grid-cols-3 gap-3">
          {details.map((d, i) => (
            <div 
              key={i}
              className="p-4 bg-[var(--linen)] border border-[var(--greige)]/20 rounded-md hover:scale-[1.03] transition-transform duration-300"
            >
              <span className="text-[9px] uppercase tracking-widest text-[var(--sage)] font-bold block mb-1">
                {lang === 'es' ? 'Elemento Clave' : 'Key Element'}
              </span>
              <h4 className="font-bold text-[13px] text-[var(--charcoal)] mb-2">{d.title}</h4>
              <p className="text-[11px] text-[var(--ink)]/80 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── 6. Deck Widget (🪵 MÓDULO 6 DECK) ───────────────────────────────────────
export function DeckWidget() {
  const { lang } = useT()
  const [material, setMaterial] = useState<'cedar' | 'grey'>('cedar')

  const materialTints = {
    cedar: 'rgba(169, 116, 79, 0.16)',
    grey: 'rgba(110, 110, 110, 0.22)'
  }

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      <div className="space-y-4">
        {/* Slider with blend overlay for deck material tint switcher (A8) */}
        <ImageSlider
          beforeImg="/assets/deck.png"
          afterImg="/assets/deck.png"
          beforeFilter="sepia(0.8) contrast(0.8) brightness(0.6) blur(0.5px)"
          afterOverlay={
            <div 
              className="absolute inset-0 transition-colors duration-500 pointer-events-none"
              style={{ 
                backgroundColor: materialTints[material],
                mixBlendMode: 'color-burn'
              }}
            />
          }
        />

        {/* Switcher A8 */}
        <div className="bg-[var(--linen)] p-4 rounded-md border border-[var(--greige)]/20">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--charcoal)]/60 block mb-3 text-center">
            {lang === 'es' ? 'Comparar Acabado de Madera vs Composite (A8)' : 'Compare Cedar vs Composite Finishes (A8)'}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMaterial('cedar')}
              className={`p-2 border rounded-sm transition-all text-center ${
                material === 'cedar' 
                  ? 'border-[var(--sage)] bg-[var(--sage)]/5 font-bold text-[var(--charcoal)]' 
                  : 'border-[var(--greige)]/20 hover:border-[var(--greige)]/45 text-[var(--charcoal)]/75'
              }`}
            >
              🪵 {lang === 'es' ? 'Tonalidad Cedro Natural' : 'Natural Cedar Stain'}
            </button>
            <button
              onClick={() => setMaterial('grey')}
              className={`p-2 border rounded-sm transition-all text-center ${
                material === 'grey' 
                  ? 'border-[var(--sage)] bg-[var(--sage)]/5 font-bold text-[var(--charcoal)]' 
                  : 'border-[var(--greige)]/20 hover:border-[var(--greige)]/45 text-[var(--charcoal)]/75'
              }`}
            >
              🛹 {lang === 'es' ? 'Composite Gris Trex' : 'Grey Synthetic Composite'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 7. Full Remodeling Widget (🏡 MÓDULO 6 COMPLETO) ────────────────────────
export function FullWidget() {
  const { lang } = useT()
  const [activeTab, setActiveTab] = useState<'slider' | 'timeline'>('slider')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      label: lang === 'es' ? 'Fase 1: Diseño' : 'Phase 1: Design',
      title: lang === 'es' ? 'Planos e Ingeniería' : 'Architectural Layouts',
      desc: lang === 'es' ? 'Conceptualización del estilo Modern Farmhouse, mediciones de precisión y trámites municipales.' : 'Farmhouse layouts design, precise framing plans, and permitting.'
    },
    {
      label: lang === 'es' ? 'Fase 2: Demo' : 'Phase 2: Demo',
      title: lang === 'es' ? 'Demolición Estructurada' : 'Surgical Demolition',
      desc: lang === 'es' ? 'Retiro seguro del revestimiento viejo y zonas interiores, protegiendo las vigas originales.' : 'Tearing down degraded structures, inspecting structural health, and repairing framing studs.'
    },
    {
      label: lang === 'es' ? 'Fase 3: Redes' : 'Phase 3: Rough-in',
      title: lang === 'es' ? 'Instalación de Sistemas' : 'Plumbing & Electrical',
      desc: lang === 'es' ? 'Paso de tuberías de plomería y cableado eléctrico dentro de las paredes antes de sellar.' : 'Routing new conduits, electrical panels, and pipe networks inside structural frames.'
    },
    {
      label: lang === 'es' ? 'Fase 4: Acabado' : 'Phase 4: Finishes',
      title: lang === 'es' ? 'Revestimiento y Drywall' : 'Drywall & Siding',
      desc: lang === 'es' ? 'Colocación del Board & Batten vertical, pintura Alabaster y drywall interior.' : 'Hanging drywalls, placing vertical siding, and applying warm low-VOC paint base.'
    },
    {
      label: lang === 'es' ? 'Fase 5: Entrega' : 'Phase 5: Delivery',
      title: lang === 'es' ? 'Llave en mano' : 'Finished Home Walk-through',
      desc: lang === 'es' ? 'Detalles finales de grifería, iluminación, limpieza profunda y entrega final garantizada.' : 'Installing knobs, hardware, custom lighting fixtures, deep cleanup, and project sign-off.'
    }
  ]

  // Progress percentage based on step
  const progressPercent = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-xs">
      <div className="flex gap-2 border-b border-[var(--greige)]/20 pb-2">
        <button
          onClick={() => setActiveTab('slider')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'slider' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Remodelación antes/después' : 'Renovation before/after'}
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-3 py-1 font-semibold uppercase tracking-wider text-[10px] rounded-sm transition-all border ${
            activeTab === 'timeline' 
              ? 'bg-[var(--sage)] border-[var(--sage)] text-white' 
              : 'border-[var(--greige)]/30 text-[var(--charcoal)]/60 hover:border-[var(--greige)]/60'
          }`}
        >
          {lang === 'es' ? 'Línea de Tiempo (A7)' : 'Renovation Timeline (A7)'}
        </button>
      </div>

      {activeTab === 'slider' ? (
        <div className="space-y-4">
          <ImageSlider
            beforeImg="/assets/antes-siding.png"
            afterImg="/assets/terminado-siding.png"
          />

          {/* Continuos scrolling projects marquee (A9) */}
          <div className="bg-[var(--linen)] p-2.5 rounded border border-[var(--greige)]/20 overflow-hidden relative w-full h-[62px]">
            <span className="text-[8px] uppercase tracking-widest text-[var(--charcoal)]/40 font-bold block mb-1">
              {lang === 'es' ? 'Nuestros Proyectos Recientes (A9 marquee)' : 'Recent Projects Loop (A9 marquee)'}
            </span>
            <style>{`
              @keyframes marqueeInfinite {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-scroll {
                display: flex;
                width: max-content;
                animation: marqueeInfinite 24s linear infinite;
              }
              .marquee-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="marquee-scroll gap-2">
              {/* List of images repeated twice for infinite effect */}
              {['antes-siding.png', 'terminado-siding.png', 'durante-roofing.png', 'terminado-roofing.png', 'durante-painting.png', 'terminado-painting.png', 'ventanas-showcase.png'].map((img, idx) => (
                <div key={idx} className="h-6 w-12 rounded overflow-hidden border border-black/10 shrink-0">
                  <img src={`/assets/${img}`} alt="marquee element" className="w-full h-full object-cover" />
                </div>
              ))}
              {['antes-siding.png', 'terminado-siding.png', 'durante-roofing.png', 'terminado-roofing.png', 'durante-painting.png', 'terminado-painting.png', 'ventanas-showcase.png'].map((img, idx) => (
                <div key={`dup-${idx}`} className="h-6 w-12 rounded overflow-hidden border border-black/10 shrink-0">
                  <img src={`/assets/${img}`} alt="marquee element" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 p-1">
          {/* Vertical/Horizontal Interactive Timeline Indicator (A7) */}
          <div className="relative pt-4 pb-2">
            {/* Timeline Line base */}
            <div className="absolute top-1/2 left-0 right-0 h-[2.5px] bg-[var(--greige)]/20 -translate-y-1/2" />
            {/* Progress filled line */}
            <div 
              className="absolute top-1/2 left-0 h-[2.5px] bg-[var(--sage)] -translate-y-1/2 transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />

            {/* Stepper Nodes */}
            <div className="relative flex justify-between">
              {steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] border-2 transition-all duration-300 z-10 ${
                    idx <= currentStep 
                      ? 'bg-[var(--sage)] border-[var(--sage)] text-white scale-110 shadow-md' 
                      : 'bg-[var(--cream)] border-[var(--greige)]/40 text-[var(--charcoal)]/40 hover:border-[var(--greige)]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Labels */}
          <div className="flex justify-between text-[8px] text-[var(--charcoal)]/60 font-bold uppercase tracking-wider px-0.5">
            {steps.map((s, idx) => (
              <span 
                key={idx} 
                className={`cursor-pointer transition-colors ${idx === currentStep ? 'text-[var(--sage)] font-extrabold' : ''}`}
                onClick={() => setCurrentStep(idx)}
              >
                {s.label.split(': ')[1] || s.label}
              </span>
            ))}
          </div>

          {/* Details of Selected Step */}
          <div className="bg-[var(--linen)] p-4 rounded border border-[var(--greige)]/30 min-h-[105px] flex flex-col justify-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--wood)] block mb-1">
              {steps[currentStep].label}
            </span>
            <h4 className="font-bold text-[13px] text-[var(--charcoal)] mb-1.5">{steps[currentStep].title}</h4>
            <p className="text-[11px] text-[var(--ink)] leading-relaxed">{steps[currentStep].desc}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Switch Component ──────────────────────────────────────────────────
export function ServiceWidget({ type }: { type: WidgetType }) {
  switch (type) {
    case 'painting': return <PaintingWidget />
    case 'roofing':  return <RoofingWidget />
    case 'siding':   return <SidingWidget />
    case 'windows':  return <WindowsWidget />
    case 'kitchen':  return <KitchenWidget />
    case 'deck':     return <DeckWidget />
    case 'full':     return <FullWidget />
    default:         return <RoofingWidget />
  }
}
