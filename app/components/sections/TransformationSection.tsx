'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useT } from '../../lib/i18n'

const FRAME_COUNT = 91
const framePath = (i: number) =>
  `/scroll-frames/frame_${String(i).padStart(3, '0')}.webp`

const SCROLL_LENGTH = '+=3000%'
const SCRUB = 0.3

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = 'problem' | 'repair' | 'result'

interface Panel {
  phase: Phase
  eyebrow: string
  title: string
  sub: string
  frameStart: number
  frameEnd: number
}

// ─── Scene data ──────────────────────────────────────────────────────────────

const PANELS: Panel[] = [
  {
    phase: 'problem',
    eyebrow: '01 — The Problem',
    title: 'Years of damage,\nvisible everywhere.',
    sub: 'Structural exposure. Active moisture. A house that needed saving — fast.',
    frameStart: 0,
    frameEnd: 28,
  },
  {
    phase: 'repair',
    eyebrow: '02 — The Work',
    title: 'Precision demo\nand full rebuild.',
    sub: 'Complete tear-off. Engineered decking. Industrial-grade membrane applied correctly.',
    frameStart: 29,
    frameEnd: 62,
  },
  {
    phase: 'result',
    eyebrow: '03 — The Result',
    title: 'Built to last\n30 years.',
    sub: 'Architectural shingles. Sealed ridge. Clean finish. Zero callbacks.',
    frameStart: 63,
    frameEnd: 90,
  },
]

// ─── Styling maps ─────────────────────────────────────────────────────────────

const PHASE_STYLE = {
  problem: {
    tag: '#fb923c',
    border: 'rgba(251,146,60,0.4)',
    bg: 'rgba(251,146,60,0.07)',
    glow: 'rgba(251,146,60,0.5)',
    glowSoft: 'rgba(251,146,60,0.12)',
  },
  repair: {
    tag: '#E3EF26',
    border: 'rgba(227,239,38,0.4)',
    bg: 'rgba(227,239,38,0.07)',
    glow: 'rgba(227,239,38,0.5)',
    glowSoft: 'rgba(227,239,38,0.12)',
  },
  result: {
    tag: '#ffffff',
    border: 'rgba(255,255,255,0.28)',
    bg: 'rgba(255,255,255,0.05)',
    glow: 'rgba(255,255,255,0.4)',
    glowSoft: 'rgba(255,255,255,0.08)',
  },
} satisfies Record<Phase, object>

const PHASE_LABEL: Record<Phase, string> = {
  problem: 'PROBLEM',
  repair: 'REPAIR',
  result: 'RESULT',
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function TransformationSection() {
  const { t } = useT()

  const sectionRef      = useRef<HTMLElement>(null)
  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const imagesRef       = useRef<HTMLImageElement[]>([])
  const stateRef        = useRef({ frame: 0 })
  const displayFrameRef = useRef(0)

  const [progress,     setProgress]     = useState(0)
  const [ready,        setReady]        = useState(false)
  const [displayFrame, setDisplayFrame] = useState(0)

  // ── Preload frames ──────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    let loaded = 0
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image()
      img.src = framePath(i)
      img.onload = () => {
        loaded++
        if (cancelled) return
        setProgress(Math.round((loaded / FRAME_COUNT) * 100))
        if (loaded === FRAME_COUNT) setReady(true)
      }
      img.onerror = () => {
        loaded++
        if (cancelled) return
        if (loaded === FRAME_COUNT) setReady(true)
      }
      images.push(img)
    }
    imagesRef.current = images
    return () => { cancelled = true }
  }, [])

  // ── GSAP ScrollTrigger ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready || !sectionRef.current || !canvasRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    if (!ctx) return

    const sizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      canvas.width  = Math.round(rect.width)  || 1280
      canvas.height = Math.round(rect.height) || 720
    }
    sizeCanvas()

    const drawFrame = (img: HTMLImageElement) => {
      const { naturalWidth: iw, naturalHeight: ih } = img
      const { width: cw, height: ch } = canvas
      // Portrait = mobile: video card framed in upper area, contained
      const isPortrait = ch > cw * 1.2

      ctx.clearRect(0, 0, cw, ch)

      if (isPortrait) {
        // Mobile: fill upper 63% of screen — enough height, moderate crop
        const scaleW = cw / iw
        const scaleH = (ch * 0.63) / ih
        const scale  = Math.max(scaleW, scaleH)
        const dw = iw * scale
        const dh = ih * scale
        ctx.drawImage(img, (cw - dw) / 2, 0, dw, dh)
      } else {
        // Desktop: full cover
        const scale = Math.max(cw / iw, ch / ih)
        const dw = iw * scale
        const dh = ih * scale
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      }
    }

    const render = () => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(stateRef.current.frame)))
      const img = imagesRef.current[idx]
      if (img?.complete) drawFrame(img)
    }
    render()

    const ro = new ResizeObserver(() => { sizeCanvas(); render() })
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const tween = gsap.to(stateRef.current, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      onUpdate: render,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: SCROLL_LENGTH,
        scrub: SCRUB,
        pin: true,
        anticipatePin: 1,
      },
    })

    let rafId: number
    const syncFrame = () => {
      const f = Math.round(stateRef.current.frame)
      if (f !== displayFrameRef.current) {
        displayFrameRef.current = f
        setDisplayFrame(f)
      }
      rafId = requestAnimationFrame(syncFrame)
    }
    rafId = requestAnimationFrame(syncFrame)

    ScrollTrigger.refresh()

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(st => st.kill())
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [ready])

  // ── Derived state ───────────────────────────────────────────────────────────
  const currentPanel =
    PANELS.find(p => displayFrame >= p.frameStart && displayFrame <= p.frameEnd) ?? PANELS[0]

  const phaseProgress = Math.min(
    1,
    (displayFrame - currentPanel.frameStart) /
    Math.max(1, currentPanel.frameEnd - currentPanel.frameStart),
  )

  const ps = PHASE_STYLE[currentPanel.phase]

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="transformation"
      className="relative h-screen w-full overflow-hidden bg-bg"
    >
      {/* ── Canvas ── */}
      <div className="absolute inset-0">
        <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
      </div>

      {/* ── Desktop vignette (subtle radial) ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 30%, rgba(6,35,29,0.65) 100%)',
        }}
      />

      {/* ── Mobile: cinematic gradient — fades video into text below ── */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          zIndex: 3,
          background: 'linear-gradient(to bottom, rgba(6,35,29,0.5) 0%, transparent 12%, transparent 52%, rgba(6,35,29,0.75) 63%, rgba(6,35,29,0.97) 72%, rgba(6,35,29,1) 80%)',
        }}
      />

      {/* ── Bottom info panel ── */}
      {ready && (
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
            paddingRight: 'max(1rem, env(safe-area-inset-right))',
            paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom, 1.75rem))',
            paddingTop: 'clamp(1.25rem, 6vh, 5rem)',
            zIndex: 20,
          }}
        >
          {/* Desktop gradient behind text */}
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background:
                'linear-gradient(to top, rgba(6,35,29,0.95) 0%, rgba(6,35,29,0.65) 55%, transparent 100%)',
            }}
          />

          <div className="max-w-4xl mx-auto relative">

            {/* Phase progress bars */}
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5">
              {PANELS.map(p => {
                const s        = PHASE_STYLE[p.phase]
                const isActive = p.phase === currentPanel.phase
                const isPast   = displayFrame > p.frameEnd
                const barWidth = isPast ? '100%' : isActive ? `${phaseProgress * 100}%` : '0%'
                return (
                  <div key={p.phase} className="flex-1 flex flex-col gap-1.5">
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: isActive ? s.tag : 'rgba(255,255,255,0.22)',
                        transition: 'color 0.4s',
                      }}
                    >
                      {PHASE_LABEL[p.phase]}
                    </span>
                    <div className="h-px w-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: s.tag }}
                        animate={{ width: barWidth }}
                        transition={{ duration: 0.12 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Panel copy */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPanel.phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{    opacity: 0, y: -6  }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="section-eyebrow mb-2 sm:mb-3"
                  style={{ justifyContent: 'flex-start' }}
                >
                  <span className="section-rule" />
                  {currentPanel.eyebrow}
                </p>

                <h2
                  className="font-display-serif font-black text-white leading-tight mb-2 sm:mb-3"
                  style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)', whiteSpace: 'pre-line' }}
                >
                  {currentPanel.title}
                </h2>

                <p className="text-white/50 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed">
                  {currentPanel.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Phase accent rule */}
            <motion.div
              className="mt-4 h-px"
              style={{
                background: `linear-gradient(to right, ${ps.tag}80, transparent)`,
                maxWidth: 160,
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        </div>
      )}

      {/* ── Top-right phase indicator (desktop only) ── */}
      {ready && (
        <div
          className="absolute top-4 sm:top-6 right-4 sm:right-6 pointer-events-none text-right hidden md:block"
          style={{ zIndex: 20 }}
        >
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: ps.tag,
              marginBottom: 4,
              transition: 'color 0.4s',
            }}
          >
            {PHASE_LABEL[currentPanel.phase]}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            {String(displayFrame + 1).padStart(2, '0')} / {FRAME_COUNT}
          </div>
        </div>
      )}

      {/* ── Loading screen ── */}
      {!ready && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-bg"
          style={{ zIndex: 40 }}
        >
          <div className="text-[10px] tracking-[.4em] uppercase text-lime-DEFAULT/60 mb-4">
            {t('transformation.loading')}
          </div>
          <div className="w-48 h-px bg-white/10 overflow-hidden">
            <div
              className="h-full bg-lime-DEFAULT transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[10px] text-white/30 mt-3 font-sans tabular-nums">
            {progress}%
          </div>
        </div>
      )}
    </section>
  )
}
