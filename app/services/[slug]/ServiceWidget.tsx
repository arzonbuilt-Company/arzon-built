'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WidgetType } from '../../lib/services-data'
import { useT } from '../../lib/i18n'

// ─── Painting 3D Isometric Widget ─────────────────────────────────────────────
type Zone = 'walls' | 'roof' | 'trim' | 'door'

interface PaintColor {
  hex: string
  name: string
  nameEs: string
  code: string
}

interface WallPaintColor extends PaintColor {
  family: 'whites' | 'grays' | 'warm' | 'cool'
  lrv: number
  undertone: { en: string; es: string }
  coordinating: {
    trim: PaintColor
    door: PaintColor
    roof: PaintColor
  }
}

const WALL_PALETTE: WallPaintColor[] = [
  {
    hex: '#ECE9E2',
    name: 'Commercial White',
    nameEs: 'Blanco Comercial',
    code: 'PPG1025-1',
    family: 'whites',
    lrv: 84,
    undertone: { en: 'warm off-white with umber undertone', es: 'blanco cálido con subtono de tierra de sombra' },
    coordinating: {
      trim: { hex: '#FFFFFF', name: 'Extra White', nameEs: 'Blanco Puro', code: 'PPG1001-0' },
      door: { hex: '#1C2E24', name: 'Forest Shadow', nameEs: 'Sombra del Bosque', code: 'PPG1141-7' },
      roof: { hex: '#1E1E1E', name: 'Charcoal Black', nameEs: 'Negro Carbón', code: 'PPG1001-8' },
    }
  },
  {
    hex: '#F3F2EE',
    name: 'Delicate White',
    nameEs: 'Blanco Delicado',
    code: 'PPG1001-1',
    family: 'whites',
    lrv: 87,
    undertone: { en: 'pure crisp neutral white', es: 'blanco neutro puro y nítido' },
    coordinating: {
      trim: { hex: '#FFFFFF', name: 'Extra White', nameEs: 'Blanco Puro', code: 'PPG1001-0' },
      door: { hex: '#0B2545', name: 'Classic Navy', nameEs: 'Azul Marino Clásico', code: 'PPG1045-6' },
      roof: { hex: '#3E3E3E', name: 'Graphite Shingle', nameEs: 'Teja de Grafito', code: 'PPG1001-9' },
    }
  },
  {
    hex: '#D2C9B8',
    name: 'Warm Greige',
    nameEs: 'Greige Cálido',
    code: 'PPG1013-3',
    family: 'warm',
    lrv: 56,
    undertone: { en: 'inviting gray-beige blend', es: 'mezcla acogedora de gris y beige' },
    coordinating: {
      trim: { hex: '#ECE9E2', name: 'Commercial White', nameEs: 'Blanco Comercial', code: 'PPG1025-1' },
      door: { hex: '#8B0000', name: 'Heritage Red', nameEs: 'Rojo Colonial', code: 'PPG1192-7' },
      roof: { hex: '#5C544E', name: 'Weathered Wood', nameEs: 'Madera Envejecida', code: 'PPG1003-7' },
    }
  },
  {
    hex: '#A69B8A',
    name: 'Warm Stone',
    nameEs: 'Piedra Cálida',
    code: 'PPG1013-4',
    family: 'warm',
    lrv: 40,
    undertone: { en: 'balanced earthy taupe', es: 'gris topo terroso equilibrado' },
    coordinating: {
      trim: { hex: '#F0EAD6', name: 'Eggshell Cream', nameEs: 'Crema Hueso', code: 'PPG1025-2' },
      door: { hex: '#1C2E24', name: 'Forest Shadow', nameEs: 'Sombra del Bosque', code: 'PPG1141-7' },
      roof: { hex: '#5C544E', name: 'Weathered Wood', nameEs: 'Madera Envejecida', code: 'PPG1003-7' },
    }
  },
  {
    hex: '#C27A5B',
    name: 'Desert Terracotta',
    nameEs: 'Terracota del Desierto',
    code: 'PPG1033-4',
    family: 'warm',
    lrv: 28,
    undertone: { en: 'warm fired-clay orange', es: 'naranja arcilla cocida cálida' },
    coordinating: {
      trim: { hex: '#ECE9E2', name: 'Commercial White', nameEs: 'Blanco Comercial', code: 'PPG1025-1' },
      door: { hex: '#1A1A1A', name: 'Matte Black', nameEs: 'Negro Mate', code: 'PPG1145-7' },
      roof: { hex: '#1E1E1E', name: 'Charcoal Black', nameEs: 'Negro Carbón', code: 'PPG1001-8' },
    }
  },
  {
    hex: '#5D6B75',
    name: 'Slate Charcoal',
    nameEs: 'Carbón Pizarra',
    code: 'PPG1009-6',
    family: 'grays',
    lrv: 22,
    undertone: { en: 'cool storm-slate blue-gray', es: 'gris azulado frío de pizarra de tormenta' },
    coordinating: {
      trim: { hex: '#FFFFFF', name: 'Extra White', nameEs: 'Blanco Puro', code: 'PPG1001-0' },
      door: { hex: '#D6FF38', name: 'Arzon Lime', nameEs: 'Lima Arzon', code: 'ACCENT' },
      roof: { hex: '#3E3E3E', name: 'Graphite Shingle', nameEs: 'Teja de Grafito', code: 'PPG1001-9' },
    }
  },
  {
    hex: '#7C827D',
    name: 'Industrial Gray',
    nameEs: 'Gris Industrial',
    code: 'PPG1009-4',
    family: 'grays',
    lrv: 41,
    undertone: { en: 'clean architectural concrete gray', es: 'gris cemento arquitectónico limpio' },
    coordinating: {
      trim: { hex: '#FFFFFF', name: 'Extra White', nameEs: 'Blanco Puro', code: 'PPG1001-0' },
      door: { hex: '#0B2545', name: 'Classic Navy', nameEs: 'Azul Marino Clásico', code: 'PPG1045-6' },
      roof: { hex: '#1E1E1E', name: 'Charcoal Black', nameEs: 'Negro Carbón', code: 'PPG1001-8' },
    }
  },
  {
    hex: '#8F9779',
    name: 'Spanish Sage',
    nameEs: 'Salvia Española',
    code: 'PPG1131-5',
    family: 'cool',
    lrv: 34,
    undertone: { en: 'muted organic olive-green', es: 'verde oliva orgánico atenuado' },
    coordinating: {
      trim: { hex: '#F3F2EE', name: 'Delicate White', nameEs: 'Blanco Delicado', code: 'PPG1001-1' },
      door: { hex: '#A0522D', name: 'Sienna Oak', nameEs: 'Roble Siena', code: 'PPG1166-6' },
      roof: { hex: '#5C544E', name: 'Weathered Wood', nameEs: 'Madera Envejecida', code: 'PPG1003-7' },
    }
  },
  {
    hex: '#1C2E24',
    name: 'Forest Shadow',
    nameEs: 'Sombra del Bosque',
    code: 'PPG1141-7',
    family: 'cool',
    lrv: 8,
    undertone: { en: 'ultra-deep pine forest green', es: 'verde pino ultra profundo' },
    coordinating: {
      trim: { hex: '#F0EAD6', name: 'Eggshell Cream', nameEs: 'Crema Hueso', code: 'PPG1025-2' },
      door: { hex: '#A0522D', name: 'Sienna Oak', nameEs: 'Roble Siena', code: 'PPG1166-6' },
      roof: { hex: '#5C544E', name: 'Weathered Wood', nameEs: 'Madera Envejecida', code: 'PPG1003-7' },
    }
  },
  {
    hex: '#2C3E50',
    name: 'Annapolis Blue',
    nameEs: 'Azul Annapolis',
    code: 'PPG1045-6',
    family: 'cool',
    lrv: 15,
    undertone: { en: 'stately deep naval blue', es: 'azul naval señorial profundo' },
    coordinating: {
      trim: { hex: '#FFFFFF', name: 'Extra White', nameEs: 'Blanco Puro', code: 'PPG1001-0' },
      door: { hex: '#ECE9E2', name: 'Commercial White', nameEs: 'Blanco Comercial', code: 'PPG1025-1' },
      roof: { hex: '#1E1E1E', name: 'Charcoal Black', nameEs: 'Negro Carbón', code: 'PPG1001-8' },
    }
  }
]

const ROOF_PALETTE: PaintColor[] = [
  { hex: '#1E1E1E', name: 'Charcoal Black', nameEs: 'Negro Carbón', code: 'PPG1001-8' },
  { hex: '#3E3E3E', name: 'Graphite Shingle', nameEs: 'Teja de Grafito', code: 'PPG1001-9' },
  { hex: '#5C544E', name: 'Weathered Wood', nameEs: 'Madera Envejecida', code: 'PPG1003-7' },
  { hex: '#2E3A2F', name: 'Hunter Green', nameEs: 'Verde Cazador', code: 'PPG1126-7' },
]

const TRIM_PALETTE: PaintColor[] = [
  { hex: '#FFFFFF', name: 'Extra White', nameEs: 'Blanco Puro', code: 'PPG1001-0' },
  { hex: '#F3F2EE', name: 'Delicate White', nameEs: 'Blanco Delicado', code: 'PPG1001-1' },
  { hex: '#ECE9E2', name: 'Commercial White', nameEs: 'Blanco Comercial', code: 'PPG1025-1' },
  { hex: '#F0EAD6', name: 'Eggshell Cream', nameEs: 'Crema Hueso', code: 'PPG1025-2' },
  { hex: '#1A1A1A', name: 'Tricorn Black', nameEs: 'Negro Tricornio', code: 'PPG1001-7' },
  { hex: '#7C827D', name: 'Industrial Gray', nameEs: 'Gris Industrial', code: 'PPG1009-4' },
]

const DOOR_PALETTE: PaintColor[] = [
  { hex: '#8B0000', name: 'Heritage Red', nameEs: 'Rojo Colonial', code: 'PPG1192-7' },
  { hex: '#0B2545', name: 'Classic Navy', nameEs: 'Azul Marino Clásico', code: 'PPG1045-6' },
  { hex: '#1A1A1A', name: 'Matte Black', nameEs: 'Negro Mate', code: 'PPG1145-7' },
  { hex: '#D6FF38', name: 'Arzon Lime', nameEs: 'Lima Arzon', code: 'ACCENT' },
  { hex: '#A0522D', name: 'Sienna Oak', nameEs: 'Roble Siena', code: 'PPG1166-6' },
]

const getColorMeta = (z: Zone, hex: string): PaintColor | null => {
  if (z === 'walls') {
    return WALL_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase()) || null
  }
  if (z === 'roof') {
    return ROOF_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase()) || null
  }
  if (z === 'trim') {
    return TRIM_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase()) || null
  }
  if (z === 'door') {
    return DOOR_PALETTE.find(c => c.hex.toLowerCase() === hex.toLowerCase()) || null
  }
  return null
}

const ZONE_LABELS: Record<Zone, string> = { walls: 'Walls', roof: 'Roof', trim: 'Trim', door: 'Door' }
const ZONE_LABELS_ES: Record<Zone, string> = { walls: 'Paredes', roof: 'Techo', trim: 'Molduras', door: 'Puerta' }


export function PaintingWidget() {
  const { lang } = useT()
  const [mounted, setMounted] = useState(false)
  const [zone, setZone] = useState<Zone>('walls')
  const [hovered, setHovered] = useState<Zone | null>(null)
  
  const [colors, setColors] = useState<Record<Zone, string>>({
    walls: '#ECE9E2', // Default: Commercial White PPG1025-1
    roof:  '#1E1E1E', // Default: Charcoal Black
    trim:  '#FFFFFF', // Default: Extra White
    door:  '#1C2E24', // Default: Forest Shadow
  })
  
  const [colorFamilyFilter, setColorFamilyFilter] = useState<'all' | 'whites' | 'grays' | 'warm' | 'cool'>('all')

  useEffect(() => {
    setMounted(true)
  }, [])

  const activePalette = zone === 'walls'
    ? (colorFamilyFilter === 'all' ? WALL_PALETTE : WALL_PALETTE.filter(c => c.family === colorFamilyFilter))
    : zone === 'roof' ? ROOF_PALETTE
    : zone === 'trim' ? TRIM_PALETTE
    : DOOR_PALETTE

  const wallColorObj = WALL_PALETTE.find(c => c.hex.toLowerCase() === colors.walls.toLowerCase()) || WALL_PALETTE[0]
  const activeColorMeta = getColorMeta(zone, colors[zone])

  const applyCoordinatingPalette = () => {
    if (!wallColorObj) return
    setColors({
      walls: wallColorObj.hex,
      trim: wallColorObj.coordinating.trim.hex,
      door: wallColorObj.coordinating.door.hex,
      roof: wallColorObj.coordinating.roof.hex,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Architectural Blueprint Visualizer */}
      <div className="lg:col-span-7 space-y-4">
        <p className="text-center text-xs font-sans text-white/35 tracking-[.15em] uppercase leading-relaxed">
          {lang === 'en' 
            ? 'Click any surface on the blueprint to select it' 
            : 'Haz clic en cualquier superficie del diseño para seleccionarla'}
        </p>

        {/* Blueprint Container */}
        <div className="relative aspect-[4/3] w-full bg-black/35 rounded-2xl border border-white/5 shadow-2xl overflow-hidden p-4 flex items-center justify-center">
          {mounted ? (
            <svg viewBox="0 0 500 350" className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg">
              {/* Architectural Grid lines in background */}
              <g opacity="0.04" stroke="currentColor" strokeWidth="0.5">
                <line x1="50" y1="0" x2="50" y2="350" />
                <line x1="150" y1="0" x2="150" y2="350" />
                <line x1="250" y1="0" x2="250" y2="350" />
                <line x1="350" y1="0" x2="350" y2="350" />
                <line x1="450" y1="0" x2="450" y2="350" />
                <line x1="0" y1="100" x2="500" y2="100" />
                <line x1="0" y1="200" x2="500" y2="200" />
                <line x1="0" y1="300" x2="500" y2="300" />
              </g>

              {/* Sun backdrop */}
              <circle cx="380" cy="120" r="60" fill="currentColor" opacity="0.02" />

              {/* Ground slab (Concrete Foundation) */}
              <polygon points="30,270 470,270 450,285 50,285" fill="#2E3033" opacity="0.6" />
              
              {/* Main House Volume (Walls) */}
              <g cursor="pointer">
                {/* WALLS: Left front-facing volume */}
                <polygon 
                  points="70,270 70,120 200,90 200,230" 
                  fill={colors.walls} 
                  onClick={() => setZone('walls')}
                  onMouseEnter={() => setHovered('walls')}
                  onMouseLeave={() => setHovered(null)}
                  className="transition-all duration-300"
                  stroke={hovered === 'walls' || zone === 'walls' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'walls' || zone === 'walls' ? 2 : 0}
                />
                
                {/* WALLS: Right side-facing volume */}
                <polygon 
                  points="200,230 200,90 320,110 320,250" 
                  fill={colors.walls}
                  onClick={() => setZone('walls')}
                  onMouseEnter={() => setHovered('walls')}
                  onMouseLeave={() => setHovered(null)}
                  className="transition-all duration-300"
                  stroke={hovered === 'walls' || zone === 'walls' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'walls' || zone === 'walls' ? 2 : 0}
                />
                
                {/* Side wall 3D shadow overlay (shading) */}
                <polygon 
                  points="200,230 200,90 320,110 320,250" 
                  fill="#000000" 
                  opacity="0.12" 
                  pointerEvents="none" 
                />
                
                {/* WALLS: Right Garage wing volume */}
                <polygon 
                  points="320,250 320,150 430,170 430,270" 
                  fill={colors.walls}
                  onClick={() => setZone('walls')}
                  onMouseEnter={() => setHovered('walls')}
                  onMouseLeave={() => setHovered(null)}
                  className="transition-all duration-300"
                  stroke={hovered === 'walls' || zone === 'walls' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'walls' || zone === 'walls' ? 2 : 0}
                />
                <polygon 
                  points="320,250 320,150 430,170 430,270" 
                  fill="#000000" 
                  opacity="0.18" 
                  pointerEvents="none" 
                />
              </g>

              {/* NATURAL ACCENT: Vertical Cedar Wood Siding (not paintable) */}
              <g>
                <polygon points="140,248 140,130 190,119 190,232" fill="#8A532B" />
                {/* Wood grain details */}
                <line x1="150" y1="244" x2="150" y2="132" stroke="#683B1B" strokeWidth="1" opacity="0.4" />
                <line x1="160" y1="242" x2="160" y2="130" stroke="#683B1B" strokeWidth="1" opacity="0.4" />
                <line x1="170" y1="239" x2="170" y2="127" stroke="#683B1B" strokeWidth="1" opacity="0.4" />
                <line x1="180" y1="236" x2="180" y2="124" stroke="#683B1B" strokeWidth="1" opacity="0.4" />
              </g>

              {/* ROOF Layer */}
              <g cursor="pointer">
                {/* Main Left Roof slab */}
                <polygon 
                  points="55,120 200,90 205,100 60,130" 
                  fill={colors.roof}
                  onClick={() => setZone('roof')}
                  onMouseEnter={() => setHovered('roof')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'roof' || zone === 'roof' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'roof' || zone === 'roof' ? 2 : 0}
                />
                
                {/* Main Right Roof slab */}
                <polygon 
                  points="200,90 330,110 325,120 195,100" 
                  fill={colors.roof}
                  onClick={() => setZone('roof')}
                  onMouseEnter={() => setHovered('roof')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'roof' || zone === 'roof' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'roof' || zone === 'roof' ? 2 : 0}
                />
                <polygon points="200,90 330,110 325,120 195,100" fill="#000000" opacity="0.15" pointerEvents="none" />
                
                {/* Garage Roof slab */}
                <polygon 
                  points="310,150 440,170 435,180 305,160" 
                  fill={colors.roof}
                  onClick={() => setZone('roof')}
                  onMouseEnter={() => setHovered('roof')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'roof' || zone === 'roof' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'roof' || zone === 'roof' ? 2 : 0}
                />
                <polygon points="310,150 440,170 435,180 305,160" fill="#000000" opacity="0.2" pointerEvents="none" />
              </g>

              {/* TRIM Layer (Window Frames, Porch Column) */}
              <g cursor="pointer">
                {/* Porch Column (Left) */}
                <polygon 
                  points="130,250 130,132 135,131 135,249" 
                  fill={colors.trim}
                  onClick={() => setZone('trim')}
                  onMouseEnter={() => setHovered('trim')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'trim' || zone === 'trim' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'trim' || zone === 'trim' ? 2 : 0}
                />

                {/* Window 1 (Main Left, Second Floor) Frame */}
                <polygon 
                  points="85,170 85,130 115,123 115,163" 
                  fill={colors.trim}
                  onClick={() => setZone('trim')}
                  onMouseEnter={() => setHovered('trim')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'trim' || zone === 'trim' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'trim' || zone === 'trim' ? 1.5 : 0}
                />

                {/* Window 2 (Side Right, Second Floor) Frame */}
                <polygon 
                  points="230,165 230,135 290,145 290,175" 
                  fill={colors.trim}
                  onClick={() => setZone('trim')}
                  onMouseEnter={() => setHovered('trim')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'trim' || zone === 'trim' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'trim' || zone === 'trim' ? 1.5 : 0}
                />
                <polygon points="230,165 230,135 290,145 290,175" fill="#000000" opacity="0.1" pointerEvents="none" />
              </g>

              {/* Window Glasses (Cyan-Blue Glossy Gradients) */}
              <g pointerEvents="none">
                {/* Window 1 Glass */}
                <polygon points="88,166 88,133 112,127 112,160" fill="url(#glass-grad)" opacity="0.7" />
                <line x1="90" y1="140" x2="110" y2="135" stroke="white" strokeWidth="0.5" opacity="0.3" />

                {/* Window 2 Glass */}
                <polygon points="234,161 234,138 286,147 286,170" fill="url(#glass-grad)" opacity="0.6" />
                <polygon points="234,161 234,138 286,147 286,170" fill="#000000" opacity="0.1" />
                <line x1="240" y1="145" x2="280" y2="152" stroke="white" strokeWidth="0.5" opacity="0.3" />
              </g>

              {/* DOOR Layer (Main Front Door & Garage Door) */}
              <g cursor="pointer">
                {/* Main Entrance Door */}
                <polygon 
                  points="95,257 95,180 125,173 125,250" 
                  fill={colors.door}
                  onClick={() => setZone('door')}
                  onMouseEnter={() => setHovered('door')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'door' || zone === 'door' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'door' || zone === 'door' ? 2 : 0}
                />
                {/* Door Knob */}
                <circle cx="120" cy="215" r="2" fill="#E3EF26" />

                {/* Garage Door (Right Wing) */}
                <polygon 
                  points="340,256 340,190 410,203 410,269" 
                  fill={colors.door}
                  onClick={() => setZone('door')}
                  onMouseEnter={() => setHovered('door')}
                  onMouseLeave={() => setHovered(null)}
                  stroke={hovered === 'door' || zone === 'door' ? '#E3EF26' : 'transparent'}
                  strokeWidth={hovered === 'door' || zone === 'door' ? 2 : 0}
                />
                <polygon points="340,256 340,190 410,203 410,269" fill="#000000" opacity="0.15" pointerEvents="none" />
                
                {/* Garage horizontal panel lines */}
                <line x1="340" y1="210" x2="410" y2="223" stroke="black" strokeWidth="0.75" opacity="0.3" pointerEvents="none" />
                <line x1="340" y1="230" x2="410" y2="243" stroke="black" strokeWidth="0.75" opacity="0.3" pointerEvents="none" />
                <line x1="340" y1="250" x2="410" y2="263" stroke="black" strokeWidth="0.75" opacity="0.3" pointerEvents="none" />
              </g>

              {/* Definitions for Gradients */}
              <defs>
                <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8fdaec" />
                  <stop offset="50%" stopColor="#2c7fa0" />
                  <stop offset="100%" stopColor="#0f4c61" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-sans text-white/30 tracking-widest uppercase">
              Loading Architectural Design...
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Color Studio Controls (Home Depot / Glidden Style) */}
      <div className="lg:col-span-5 space-y-5 bg-white/[0.02] border border-white/5 rounded-2xl p-5 shadow-xl">
        <div className="space-y-1 border-b border-white/5 pb-3">
          <span className="text-[9px] font-sans font-extrabold text-lime-DEFAULT tracking-[0.3em] uppercase">
            {lang === 'en' ? 'Studio Coordinator' : 'Coordinador de Estudio'}
          </span>
          <h3 className="text-white font-display font-black text-lg tracking-wider uppercase">
            {lang === 'en' ? 'Color Customizer' : 'Personalizador de Color'}
          </h3>
        </div>

        {/* Zone switcher (Segmented Control) */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-sans text-white/40 tracking-wider uppercase">
            {lang === 'en' ? 'Select Surface' : 'Seleccionar Superficie'}
          </label>
          <div className="grid grid-cols-4 gap-1 bg-black/30 p-1 rounded-xl border border-white/5">
            {(Object.keys(ZONE_LABELS) as Zone[]).map(z => (
              <button key={z}
                onClick={() => setZone(z)}
                className={`py-2 rounded-lg text-[10px] font-sans tracking-wider uppercase transition-all duration-200 ${
                  zone === z
                    ? 'bg-lime-DEFAULT text-bg font-extrabold shadow-sm'
                    : 'text-white/50 hover:text-white/90 hover:bg-white/[0.02]'
                }`}
              >
                {lang === 'en' ? ZONE_LABELS[z] : ZONE_LABELS_ES[z]}
              </button>
            ))}
          </div>
        </div>

        {/* Color Family Tabs (Only for Walls) */}
        {zone === 'walls' && (
          <div className="space-y-1.5">
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(['all', 'whites', 'grays', 'warm', 'cool'] as const).map(family => (
                <button
                  key={family}
                  onClick={() => setColorFamilyFilter(family)}
                  className={`px-3 py-1 rounded-full text-[9px] font-sans tracking-wider uppercase whitespace-nowrap border transition-all duration-200 ${
                    colorFamilyFilter === family
                      ? 'bg-white/10 border-white/20 text-white font-semibold'
                      : 'border-white/5 text-white/40 hover:border-white/10 hover:text-white/60'
                  }`}
                >
                  {family === 'all' && (lang === 'en' ? 'All' : 'Todos')}
                  {family === 'whites' && (lang === 'en' ? 'Whites' : 'Blancos')}
                  {family === 'grays' && (lang === 'en' ? 'Grays' : 'Grises')}
                  {family === 'warm' && (lang === 'en' ? 'Warm Neutrals' : 'Cálidos')}
                  {family === 'cool' && (lang === 'en' ? 'Cool Tones' : 'Fríos')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Chips Grid */}
        <div className="space-y-2">
          <label className="text-[10px] font-sans text-white/40 tracking-wider uppercase">
            {lang === 'en' ? 'Available Shades' : 'Tonos Disponibles'}
          </label>
          <div className="flex flex-wrap gap-2">
            {activePalette.map((colorItem) => {
              const isSelected = colors[zone].toLowerCase() === colorItem.hex.toLowerCase()
              return (
                <button
                  key={colorItem.hex}
                  onClick={() => {
                    setColors(p => ({ ...p, [zone]: colorItem.hex }))
                  }}
                  title={lang === 'en' ? colorItem.name : colorItem.nameEs}
                  style={{ backgroundColor: colorItem.hex }}
                  className={`w-9 h-9 rounded-xl border transition-all duration-200 hover:scale-105 relative ${
                    isSelected
                      ? 'border-lime-DEFAULT scale-105 shadow-lime-glow shadow-md'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-md">✓</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Color Card */}
        {activeColorMeta && (
          <div className="glass border border-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl shadow-md border border-white/10 flex-shrink-0" style={{ backgroundColor: activeColorMeta.hex }} />
              <div className="min-w-0">
                <div className="text-[8px] uppercase font-mono tracking-widest text-lime-DEFAULT/80 font-bold">
                  {lang === 'en' ? 'PPG / Glidden Color System' : 'Sistema de Color PPG / Glidden'}
                </div>
                <h4 className="text-white font-display font-black text-sm tracking-wide uppercase truncate">
                  {lang === 'en' ? activeColorMeta.name : activeColorMeta.nameEs}
                </h4>
                <p className="text-[10px] font-mono text-white/50">
                  {activeColorMeta.code}
                </p>
              </div>
            </div>
            {zone === 'walls' && wallColorObj && (
              <div className="pt-2.5 border-t border-white/5 grid grid-cols-2 gap-3 text-[10px] font-sans">
                <div>
                  <span className="text-white/35 uppercase tracking-widest block font-mono text-[8px] mb-0.5">LRV (Reflectancia)</span>
                  <span className="font-bold text-white/80">{wallColorObj.lrv}%</span>
                </div>
                <div>
                  <span className="text-white/35 uppercase tracking-widest block font-mono text-[8px] mb-0.5">Undertone / Subtono</span>
                  <span className="font-semibold text-white/80 leading-tight block">
                    {lang === 'en' ? wallColorObj.undertone.en : wallColorObj.undertone.es}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Coordinating Palette (Only for Walls) */}
        {zone === 'walls' && wallColorObj && (
          <div className="glass border border-white/5 rounded-2xl p-4 space-y-3">
            <h5 className="text-[10px] font-sans font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-DEFAULT" />
              {lang === 'en' ? 'Professional Pairings' : 'Combinación Sugerida'}
            </h5>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Trim */}
              <div className="space-y-1 text-center bg-black/10 p-1.5 rounded-xl border border-white/[0.02]">
                <div className="h-6 rounded-lg border border-white/10" style={{ backgroundColor: wallColorObj.coordinating.trim.hex }} />
                <p className="text-[7px] uppercase tracking-wider text-white/40 font-mono">Trim / Moldura</p>
                <p className="text-[9px] font-sans font-bold text-white/80 truncate leading-none">
                  {lang === 'en' ? wallColorObj.coordinating.trim.name : wallColorObj.coordinating.trim.nameEs}
                </p>
              </div>

              {/* Accent/Door */}
              <div className="space-y-1 text-center bg-black/10 p-1.5 rounded-xl border border-white/[0.02]">
                <div className="h-6 rounded-lg border border-white/10" style={{ backgroundColor: wallColorObj.coordinating.door.hex }} />
                <p className="text-[7px] uppercase tracking-wider text-white/40 font-mono">Door / Puerta</p>
                <p className="text-[9px] font-sans font-bold text-white/80 truncate leading-none">
                  {lang === 'en' ? wallColorObj.coordinating.door.name : wallColorObj.coordinating.door.nameEs}
                </p>
              </div>

              {/* Roof */}
              <div className="space-y-1 text-center bg-black/10 p-1.5 rounded-xl border border-white/[0.02]">
                <div className="h-6 rounded-lg border border-white/10" style={{ backgroundColor: wallColorObj.coordinating.roof.hex }} />
                <p className="text-[7px] uppercase tracking-wider text-white/40 font-mono">Roof / Techo</p>
                <p className="text-[9px] font-sans font-bold text-white/80 truncate leading-none">
                  {lang === 'en' ? wallColorObj.coordinating.roof.name : wallColorObj.coordinating.roof.nameEs}
                </p>
              </div>
            </div>

            <button
              onClick={applyCoordinatingPalette}
              className="w-full mt-2 py-2 bg-lime-DEFAULT text-bg font-sans font-black text-[10px] tracking-widest uppercase rounded-lg border border-lime-DEFAULT hover:bg-transparent hover:text-lime-DEFAULT transition-all duration-200 flex items-center justify-center gap-1 shadow-md shadow-lime-DEFAULT/15"
            >
              ✨ {lang === 'en' ? 'Apply Harmonious Palette' : 'Aplicar Combinación'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Roofing Layered 3D Cutaway Widget ────────────────────────────────────────
interface RoofLayer {
  id: string
  title: string
  titleEs: string
  desc: string
  descEs: string
  color: string
  badge: string
  badgeEs: string
}

const ROOF_LAYERS: RoofLayer[] = [
  {
    id: 'deck',
    title: '1. Plywood Decking',
    titleEs: '1. Base de Contrachapado',
    desc: 'Solid structural foundation. We check and replace rotten plywood down to the rafters before installing shingles.',
    descEs: 'Base estructural sólida. Inspeccionamos y reemplazamos madera dañada en toda la base antes de instalar tejas.',
    color: '#8A5E38',
    badge: 'No Rot Left Behind',
    badgeEs: 'Cero Madera Podrida',
  },
  {
    id: 'barrier',
    title: '2. Ice & Water Shield',
    titleEs: '2. Barrera contra Hielo y Agua',
    desc: 'Self-sealing waterproof membrane installed in valleys and roof edges to prevent leaks from standing water.',
    descEs: 'Membrana impermeable autosellante instalada en valles y bordes críticos para evitar infiltraciones.',
    color: '#1E2229',
    badge: 'Leak Prevention Shield',
    badgeEs: 'Barrera Anti-Filtración',
  },
  {
    id: 'underlayment',
    title: '3. Synthetic Underlayment',
    titleEs: '3. Membrana Sintética',
    desc: 'High-performance secondary water barrier. Synthetic material that resists tearing and won\'t rot like traditional paper felt.',
    descEs: 'Barrera de agua de alto rendimiento. Material sintético premium que no se desgarra ni se pudre como el fieltro tradicional.',
    color: '#0B4F2A',
    badge: 'Premium Material Upgrade',
    badgeEs: 'Material de Alta Durabilidad',
  },
  {
    id: 'shingles',
    title: '4. Architectural Shingles',
    titleEs: '4. Tejas Arquitectónicas',
    desc: 'Heavy-duty laminated fiberglass shingles with a 30-year manufacturer warranty, hand-nailed for maximum wind stability.',
    descEs: 'Tejas de fibra de vidrio laminadas pesadas con garantía de 30 años, fijadas a mano para resistir vientos tormentosos.',
    color: '#434A54',
    badge: '130 MPH Wind Resistant',
    badgeEs: 'Resistencia Vientos 130 MPH',
  },
]

export function RoofingWidget() {
  const { lang } = useT()
  const [activeLayer, setActiveLayer] = useState<string>('shingles')

  const current = ROOF_LAYERS.find(l => l.id === activeLayer)!

  return (
    <div className="space-y-6">
      <p className="text-center text-xs font-sans text-white/35 tracking-[.25em] uppercase">
        {lang === 'en' ? 'Hover/Click layers to see structural details' : 'Pasa el cursor o haz clic en las capas estructurales'}
      </p>

      {/* Graphic 3D layered stack */}
      <div className="relative aspect-[4/3] max-w-sm mx-auto bg-black/10 rounded-2xl p-6 border border-white/5 shadow-inner overflow-hidden flex flex-col justify-end">
        
        {/* Sky / Rain background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent" />
        </div>

        {/* 3D Staggered Layers stack */}
        <div className="relative space-y-2 z-10">
          {ROOF_LAYERS.map((layer, idx) => {
            const isActive = activeLayer === layer.id
            return (
              <motion.div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onClick={() => setActiveLayer(layer.id)}
                className={`relative h-14 rounded-xl cursor-pointer border transition-all duration-300 ${
                  isActive 
                    ? 'border-lime-DEFAULT shadow-lime-glow z-20 scale-[1.03]' 
                    : 'border-white/5 opacity-60 hover:opacity-90 hover:scale-[1.01]'
                }`}
                style={{
                  background: layer.color,
                  marginLeft: `${idx * 16}px`,
                  marginRight: `${(3 - idx) * 16}px`,
                }}
              >
                {/* Layer label */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-lime-DEFAULT' : 'bg-white/40'}`} />
                  <span className="text-[11px] font-sans font-bold text-white tracking-wider uppercase">
                    {lang === 'en' ? layer.title : layer.titleEs}
                  </span>
                </div>
                {/* Shingle visual details overlay */}
                {layer.id === 'shingles' && (
                  <div aria-hidden className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, #000 15px, #000 30px), repeating-linear-gradient(0deg, transparent, transparent 8px, #000 8px, #000 16px)',
                    }}
                  />
                )}
                {layer.id === 'deck' && (
                  <div aria-hidden className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 12px)',
                    }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Layer description box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="glass p-5 rounded-2xl border border-white/5 text-center min-h-[110px] flex flex-col justify-center max-w-sm mx-auto shadow-xl"
        >
          <div className="flex justify-center mb-1">
            <span className="bg-lime-DEFAULT/15 text-lime-DEFAULT text-[9px] font-sans font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-widest border border-lime-DEFAULT/20 animate-pulse">
              {lang === 'en' ? current.badge : current.badgeEs}
            </span>
          </div>
          <h4 className="text-white font-display font-black text-sm mb-1 uppercase tracking-wider">
            {lang === 'en' ? current.title : current.titleEs}
          </h4>
          <p className="text-white/60 text-xs font-sans leading-relaxed">
            {lang === 'en' ? current.desc : current.descEs}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ─── Siding Material Texture Lab ──────────────────────────────────────────────
interface SidingMat {
  id: string
  label: string
  labelEs: string
  hex: string
  texture: 'cement' | 'vinyl' | 'wood'
  desc: string
  descEs: string
}

const SIDING_MATS: SidingMat[] = [
  {
    id: 'james-hardie',
    label: 'James Hardie®',
    labelEs: 'James Hardie®',
    hex: '#4A5056',
    texture: 'cement',
    desc: 'Fiber cement boards. Fire-resistant, rot-proof, and rated for 50 years.',
    descEs: 'Tableros de fibrocemento. Resistentes al fuego, no se pudren y duran 50 años.',
  },
  {
    id: 'premium-vinyl',
    label: 'Premium Vinyl',
    labelEs: 'Vinilo Premium',
    hex: '#D2C9B8',
    texture: 'vinyl',
    desc: 'Interlocking vinyl panels. UV-stable coating, maintenance-free finish.',
    descEs: 'Paneles de vinilo entrelazados. Recubrimiento resistente a UV, sin mantenimiento.',
  },
  {
    id: 'cedar-stained',
    label: 'Cedar Wood Siding',
    labelEs: 'Madera de Cedro',
    hex: '#8A532B',
    texture: 'wood',
    desc: 'Stained western red cedar. Natural beauty, premium structural protection.',
    descEs: 'Cedro rojo occidental teñido. Belleza natural con máxima protección estructural.',
  },
]

export function SidingWidget() {
  const { lang } = useT()
  const [activeMat, setActiveMat] = useState<string>('james-hardie')
  const [color, setColor] = useState<string>('')
  
  const mat = SIDING_MATS.find(m => m.id === activeMat)!
  const activeColor = color || mat.hex

  const customColors = [
    { hex: '#4A5056', name: 'Iron Gray' },
    { hex: '#1C2E24', name: 'Forest Green' },
    { hex: '#D2C9B8', name: 'Cobble Greige' },
    { hex: '#8A532B', name: 'Natural Cedar' },
    { hex: '#1F2937', name: 'Midnight Charcoal' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center flex-wrap">
        {SIDING_MATS.map(m => (
          <button
            key={m.id}
            onClick={() => {
              setActiveMat(m.id)
              setColor('')
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-sans tracking-widest border transition-all duration-200 ${
              activeMat === m.id
                ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT font-bold'
                : 'border-white/10 text-white/50 hover:border-lime-DEFAULT/40'
            }`}
          >
            {lang === 'en' ? m.label : m.labelEs}
          </button>
        ))}
      </div>

      {/* Siding Texture Canvas Display */}
      <div className="relative aspect-video max-w-sm mx-auto bg-black/10 rounded-2xl border border-white/5 shadow-inner overflow-hidden">
        {/* Render siding planks */}
        <div className="absolute inset-0 flex flex-col justify-between p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-full relative shadow-md border-b border-black/25 flex items-end p-2 transition-all duration-500"
              style={{
                height: '16%',
                backgroundColor: activeColor,
                filter: `brightness(${1.0 - i * 0.03})`,
              }}
            >
              {/* Highlight wood grain/texture style */}
              {mat.texture === 'wood' && (
                <div aria-hidden className="absolute inset-0 opacity-15 mix-blend-overlay"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px), repeating-linear-gradient(90deg, transparent, transparent 150px, #000 150px, #000 300px)',
                  }}
                />
              )}
              {mat.texture === 'cement' && (
                <div aria-hidden className="absolute inset-0 opacity-10 mix-blend-overlay"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
              )}
              {/* Shadow gap line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Siding Color Picker */}
      <div className="flex gap-2 justify-center">
        {customColors.map(c => (
          <button
            key={c.hex}
            onClick={() => setColor(c.hex)}
            className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
              activeColor === c.hex ? 'border-lime-DEFAULT scale-110' : 'border-white/10'
            }`}
            style={{ backgroundColor: c.hex }}
            title={c.name}
          />
        ))}
      </div>

      <p className="text-center text-xs font-sans text-white/50 max-w-xs mx-auto leading-relaxed">
        {lang === 'en' ? mat.desc : mat.descEs}
      </p>
    </div>
  )
}

// ─── Windows & Doors Thermal efficiency Widget ──────────────────────────────
export function WindowsWidget() {
  const { lang } = useT()
  const [isSummer, setIsSummer] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-bg/60 p-1 rounded-full border border-white/5 flex gap-1">
          <button
            onClick={() => setIsSummer(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              isSummer ? 'bg-lime-DEFAULT text-bg' : 'text-white/60 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Summer / Heat' : 'Verano / Calor'}
          </button>
          <button
            onClick={() => setIsSummer(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              !isSummer ? 'bg-lime-DEFAULT text-bg' : 'text-white/60 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Winter / Cold' : 'Invierno / Frío'}
          </button>
        </div>
      </div>

      {/* 3D Glass Pane Thermal Energy Diagram */}
      <div className="relative aspect-video max-w-sm mx-auto bg-black/20 rounded-2xl border border-white/5 shadow-inner overflow-hidden p-6 flex items-center justify-between">
        
        {/* Left: Exterior Wave */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-wider uppercase font-bold text-white/35 mb-2">
            {lang === 'en' ? 'Exterior' : 'Exterior'}
          </span>
          <AnimatePresence mode="wait">
            {isSummer ? (
              <motion.div
                key="hot"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold border border-red-500/30 text-lg animate-pulse"
              >
                ☀️
              </motion.div>
            ) : (
              <motion.div
                key="cold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30 text-lg animate-pulse"
              >
                ❄️
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center: Double Glass Pane cutaway with air gap */}
        <div className="flex gap-4 relative">
          {/* Glass Pane 1 */}
          <div className="w-4 h-32 rounded-md bg-gradient-to-r from-blue-300/20 to-blue-300/40 border border-blue-300/40 relative">
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-white/30 whitespace-nowrap">Glass</span>
          </div>

          {/* Argon Gas Chamber (center gap) */}
          <div className="w-10 h-32 flex flex-col justify-around items-center border border-dashed border-white/10 rounded-md bg-white/[0.01]">
            <span className="text-[8px] text-lime-DEFAULT font-bold uppercase tracking-widest font-mono rotate-90">ARGON</span>
          </div>

          {/* Glass Pane 2 */}
          <div className="w-4 h-32 rounded-md bg-gradient-to-r from-blue-300/20 to-blue-300/40 border border-blue-300/40 relative">
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-white/30 whitespace-nowrap">Glass</span>
          </div>
        </div>

        {/* Right: Interior climate */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-wider uppercase font-bold text-white/35 mb-2">
            {lang === 'en' ? 'Interior' : 'Interior'}
          </span>
          <div className="w-10 h-10 rounded-full bg-lime-DEFAULT/10 flex items-center justify-center text-lime-DEFAULT font-mono text-xs font-bold border border-lime-DEFAULT/25">
            72°F
          </div>
        </div>

      </div>

      <p className="text-center text-xs font-sans text-white/50 max-w-xs mx-auto leading-relaxed mt-4">
        {lang === 'en' 
          ? 'Double-pane argon insulation reflects outer thermal waves, keeping your home at constant comfortable temperature.' 
          : 'El aislamiento de doble panel con gas argón refleja las ondas térmicas externas, manteniendo su hogar a temperatura óptima.'}
      </p>
    </div>
  )
}

// ─── Kitchen Design Customizer Widget ─────────────────────────────────────────
export function KitchenWidget() {
  const { lang } = useT()
  const [cabinet, setCabinet] = useState<string>('#1C2E24') // forest
  const [counter, setCounter] = useState<string>('marble')

  const cabinetColors = [
    { hex: '#1C2E24', name: 'Forest Green' },
    { hex: '#0B2545', name: 'Navy Blue' },
    { hex: '#1E1E1E', name: 'Matte Black' },
    { hex: '#EAE6DF', name: 'Warm Cream' },
  ]

  const counters = [
    { id: 'marble', label: lang === 'en' ? 'Quartz Marble' : 'Mármol Cuarzo', color: '#ECEAE6', pattern: 'marble' },
    { id: 'slate',  label: lang === 'en' ? 'Black Slate' : 'Pizarra Negra', color: '#2B2B2B', pattern: 'none' },
    { id: 'oak',    label: lang === 'en' ? 'Natural Oak' : 'Madera de Roble', color: '#C89D7C', pattern: 'wood' },
  ]

  return (
    <div className="space-y-6">
      {/* 3D Isometric Kitchen Cabinetry Render */}
      <div className="relative aspect-video max-w-sm mx-auto bg-black/10 rounded-2xl border border-white/5 shadow-inner overflow-hidden p-4 flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          {/* Floor */}
          <polygon points="10,180 310,180 230,220 90,220" fill="#141916" />

          {/* Kitchen Island Base (Cabinet color) */}
          <polygon points="60,160 170,125 170,195 60,195" fill={cabinet} style={{ filter: 'brightness(0.9)' }} />
          <polygon points="170,125 260,150 260,195 170,195" fill={cabinet} />

          {/* Drawers / Cabinet Details */}
          <g stroke="rgba(0,0,0,0.15)" strokeWidth="1">
            {/* Left face drawer lines */}
            <polygon points="70,185 110,172 110,190 70,190" fill="none" stroke="#E2FF66" strokeWidth="0.5" />
            <polygon points="120,169 160,156 160,190 120,190" fill="none" stroke="#E2FF66" strokeWidth="0.5" />
          </g>

          {/* Countertop Slab (Counter color and pattern) */}
          <polygon points="50,120 170,80 270,110 150,150" fill={counters.find(c => c.id === counter)!.color} />
          {/* Slab edge */}
          <polygon points="50,120 150,150 150,155 50,125" fill="#CCCCCC" style={{ filter: 'brightness(0.8)' }} />
          <polygon points="150,150 270,110 270,115 150,155" fill="#CCCCCC" style={{ filter: 'brightness(0.8)' }} />

          {/* Marble Veins Overlay */}
          {counter === 'marble' && (
            <g stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none">
              <path d="M70,110 Q90,105 130,115 T210,100" />
              <path d="M120,100 Q150,90 190,105" />
            </g>
          )}

          {/* Gold Hardware Handles */}
          <line x1="90" y1="180" x2="90" y2="183" stroke="#E2FF66" strokeWidth="2" />
          <line x1="140" y1="174" x2="140" y2="177" stroke="#E2FF66" strokeWidth="2" />
        </svg>
      </div>

      {/* Select Cabinet color */}
      <div className="space-y-2">
        <label className="text-[10px] tracking-wider font-sans text-white/40 uppercase block text-center">Cabinet Color</label>
        <div className="flex gap-2.5 justify-center">
          {cabinetColors.map(c => (
            <button
              key={c.hex}
              onClick={() => setCabinet(c.hex)}
              className={`w-7 h-7 rounded-full border transition-transform duration-200 ${
                cabinet === c.hex ? 'border-lime-DEFAULT scale-110 shadow-lime-glow' : 'border-white/10'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Select Countertop material */}
      <div className="space-y-2">
        <label className="text-[10px] tracking-wider font-sans text-white/40 uppercase block text-center">Countertop Material</label>
        <div className="flex gap-2 justify-center">
          {counters.map(c => (
            <button
              key={c.id}
              onClick={() => setCounter(c.id)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all duration-200 ${
                counter === c.id
                  ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT'
                  : 'border-white/10 text-white/50 hover:border-lime-DEFAULT/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Deck Planking Material Widget ──────────────────────────────────────────
export function DeckWidget() {
  const { lang } = useT()
  const [deckColor, setDeckColor] = useState<string>('#A0522D') // sienna

  const deckStains = [
    { hex: '#A0522D', name: 'Sienna Red' },
    { hex: '#CD853F', name: 'Golden Oak' },
    { hex: '#8B4513', name: 'Dark Walnut' },
    { hex: '#5C5C5C', name: 'Composite Slate' },
  ]

  return (
    <div className="space-y-6">
      {/* 3D Isometric Deck lounge rendering */}
      <div className="relative aspect-video max-w-sm mx-auto bg-black/10 rounded-2xl border border-white/5 shadow-inner overflow-hidden p-4 flex items-center justify-center">
        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          {/* Background Sky */}
          <rect width="320" height="220" fill="#0E1612" />

          {/* Perspective deck deckPlanks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <polygon
              key={i}
              points={`0,${100 + i * 10} 320,${100 + i * 10} 320,${108 + i * 10} 0,${108 + i * 10}`}
              fill={deckColor}
              style={{ filter: `brightness(${1.0 - i * 0.02})` }}
            />
          ))}

          {/* Glass Railing */}
          {/* Post left */}
          <rect x="30" y="40" width="6" height="80" fill="#2E3033" />
          {/* Post right */}
          <rect x="280" y="40" width="6" height="80" fill="#2E3033" />
          {/* Glass panels */}
          <rect x="36" y="46" width="244" height="68" fill="rgba(100,200,255,0.12)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Top rail */}
          <rect x="25" y="36" width="266" height="6" fill="#1A1C1E" />
        </svg>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] tracking-wider font-sans text-white/40 uppercase block text-center">Wood Stain Style</label>
        <div className="flex gap-2.5 justify-center">
          {deckStains.map(s => (
            <button
              key={s.hex}
              onClick={() => setDeckColor(s.hex)}
              className={`w-7 h-7 rounded-full border transition-transform duration-200 ${
                deckColor === s.hex ? 'border-lime-DEFAULT scale-110 shadow-lime-glow' : 'border-white/10'
              }`}
              style={{ backgroundColor: s.hex }}
              title={s.name}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-xs font-sans text-white/50 max-w-xs mx-auto leading-relaxed">
        {lang === 'en'
          ? 'Custom deck builders using stained premium western red cedar and composites. Built structurally true.'
          : 'Constructores de terrazas a medida utilizando cedro rojo de primera calidad y materiales compuestos.'}
      </p>
    </div>
  )
}

// ─── Full Remodeling Phase Tracker ──────────────────────────────────────────
export function FullWidget() {
  const { lang } = useT()
  const phases = [
    { label: 'Scope & Design', labelEs: 'Diseño e Ingeniería', pct: 100 },
    { label: 'Structural Build', labelEs: 'Construcción Estructural', pct: 100 },
    { label: 'Interior Remodel', labelEs: 'Remodelación Interior', pct: 75 },
    { label: 'Final Fine Finishing', labelEs: 'Acabados y Entrega', pct: 0 },
  ]

  return (
    <div className="space-y-5 glass border border-white/5 p-6 rounded-2xl shadow-xl max-w-sm mx-auto">
      <span className="text-[9px] font-sans text-white/30 tracking-[.3em] uppercase block mb-2">Project Execution Map</span>
      {phases.map((ph, idx) => (
        <div key={ph.label} className="space-y-1.5">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-sans font-bold text-white/70">{lang === 'en' ? ph.label : ph.labelEs}</span>
            <span className={`text-[10px] font-sans font-semibold ${ph.pct > 0 ? 'text-lime-DEFAULT' : 'text-white/20'}`}>
              {ph.pct}%
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-lime-DEFAULT to-lime-light"
              initial={{ width: 0 }}
              animate={{ width: `${ph.pct}%` }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Main Switch Component ───────────────────────────────────────────────────
export function ServiceWidget({ type }: { type: WidgetType }) {
  switch (type) {
    case 'painting': return <PaintingWidget />
    case 'roofing':  return <RoofingWidget />
    case 'siding':   return <SidingWidget />
    case 'windows':  return <WindowsWidget />
    case 'kitchen':  return <KitchenWidget />
    case 'deck':     return <DeckWidget />
    case 'full':     return <FullWidget />
  }
}
