'use client'

import { useT } from '../../lib/i18n'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT()

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center border border-white/15 text-[11px] font-sans tracking-[.15em] uppercase ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-2.5 py-1 transition-colors ${
          lang === 'en' ? 'bg-lime-DEFAULT text-bg font-semibold' : 'text-white/55 hover:text-white'
        }`}
      >
        EN
      </button>
      <span className="w-px h-4 bg-white/15" aria-hidden />
      <button
        type="button"
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
        className={`px-2.5 py-1 transition-colors ${
          lang === 'es' ? 'bg-lime-DEFAULT text-bg font-semibold' : 'text-white/55 hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  )
}
