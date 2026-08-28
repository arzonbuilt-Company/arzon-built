'use client'
import { useT } from '../../lib/i18n'

export function ContactFloat() {
  const { lang } = useT()

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3.5 items-end will-change-transform transform-gpu">
      
      {/* ── Botón de Llamada (Alex: 6784399829) ── */}
      <div className="relative flex items-center group">
        {/* Label on Hover (Desktop only) */}
        <div className="hidden lg:block absolute right-12 mr-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none bg-bg/95 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider text-white shadow-xl whitespace-nowrap uppercase backdrop-blur-md">
          {lang === 'es' ? 'Llamar a Alex' : 'Call Alex'}
        </div>

        <a
          href="tel:+16784399829"
          aria-label="Call Alex"
          className="relative w-[43px] h-[43px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-lime-DEFAULT text-white shadow-lime-glow hover:bg-lime-light hover:scale-110 active:scale-90 transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px]" aria-hidden>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>
      </div>

      {/* ── Botón de Mensaje (SMS: 6783468470) ── */}
      <div className="relative flex items-center group">
        {/* Label on Hover (Desktop only) */}
        <div className="hidden lg:block absolute right-12 mr-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none bg-bg/95 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider text-white shadow-xl whitespace-nowrap uppercase backdrop-blur-md">
          {lang === 'es' ? 'Enviar Mensaje' : 'Send Message'}
        </div>

        <a
          href="sms:+16783468470"
          aria-label="Send us a text message"
          className="relative w-[43px] h-[43px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center bg-lime-DEFAULT text-white shadow-lime-glow hover:bg-lime-light hover:scale-110 active:scale-90 transition-all duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[19px] h-[19px] sm:w-[22px] sm:h-[22px]" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </a>
      </div>

    </div>
  )
}
