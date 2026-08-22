'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useT } from '../../lib/i18n'

export function ContactFloat() {
  const { lang } = useT()
  const [hoveredBtn, setHoveredBtn] = useState<'call' | 'msg' | null>(null)

  const handleMouseEnter = (btn: 'call' | 'msg') => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    if (!isTouch) setHoveredBtn(btn)
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3.5 items-end">
      
      {/* ── Botón de Llamada (Alex: 6784399829) ── */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredBtn === 'call' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="absolute right-12 mr-2 bg-bg/95 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider text-white shadow-xl whitespace-nowrap uppercase backdrop-blur-md"
            >
              {lang === 'es' ? 'Llamar a Alex' : 'Call Alex'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Círculo pulsante de fondo para la llamada (ligeramente desfasado) */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: '#9EFF00' }}
          animate={{ scale: [1, 1.75], opacity: [0.35, 0] }}
          transition={{ delay: 4.4, duration: 2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeOut' }}
        />

        <motion.a
          href="tel:+16784399829"
          aria-label="Call Alex"
          onMouseEnter={() => handleMouseEnter('call')}
          onMouseLeave={() => setHoveredBtn(null)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3.1, type: 'spring', stiffness: 200, damping: 18 }}
          whileHover={{ scale: 1.12, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
          whileTap={{ scale: 0.88 }}
          className="relative w-[43px] h-[43px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-lime-DEFAULT text-white shadow-lime-glow hover:bg-lime-light transition-colors duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px]" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </motion.a>
      </div>

      {/* ── Botón de Mensaje (SMS: 6783468470) ── */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {hoveredBtn === 'msg' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="absolute right-12 mr-2 bg-bg/95 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider text-white shadow-xl whitespace-nowrap uppercase backdrop-blur-md"
            >
              {lang === 'es' ? 'Enviar Mensaje' : 'Send Message'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Círculo pulsante de fondo para el mensaje */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: '#9EFF00' }}
          animate={{ scale: [1, 1.75], opacity: [0.35, 0] }}
          transition={{ delay: 4.2, duration: 2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeOut' }}
        />

        <motion.a
          href="sms:+16783468470"
          aria-label="Send us a text message"
          onMouseEnter={() => handleMouseEnter('msg')}
          onMouseLeave={() => setHoveredBtn(null)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3, type: 'spring', stiffness: 200, damping: 18 }}
          whileHover={{ scale: 1.12, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
          whileTap={{ scale: 0.88 }}
          className="relative w-[43px] h-[43px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-lime-DEFAULT text-white shadow-lime-glow hover:bg-lime-light transition-colors duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px]" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </motion.a>
      </div>

    </div>
  )
}
