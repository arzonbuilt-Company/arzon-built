'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useT } from '../../lib/i18n'

export function Footer() {
  const { t } = useT()

  const services = [
    t('services.s1.title'),
    t('services.s2.title'),
    t('services.s3.title'),
    t('services.s4.title'),
    t('services.s5.title'),
    t('services.s6.title'),
    t('services.full.title'),
  ]

  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden bg-transparent"
    >

      {/* Diamond/checker texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(213,168,72,0.4) 0px, rgba(213,168,72,0.4) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(213,168,72,0.4) 0px, rgba(213,168,72,0.4) 1px, transparent 1px, transparent 20px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/">
              <Image src="/Logo.png" alt="Arzon Built" width={130} height={40}
                className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
                style={{ filter: 'brightness(1.15)' }}
              />
            </Link>
            <p className="text-white/40 text-sm font-sans leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-[.25em] uppercase text-white/30 mb-6 font-sans">{t('footer.servicesHeader')}</h3>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <Link href="/#services"
                    className="text-sm font-sans text-white/50 hover:text-lime-DEFAULT transition-colors"
                  >{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[.25em] uppercase text-white/30 mb-6 font-sans">{t('footer.contactHeader')}</h3>
            <ul className="space-y-4 text-sm font-sans text-white/50">
              <li className="flex items-start gap-2.5">
                <span className="text-lime-DEFAULT font-bold">📍</span>
                <span>{t('contact.info.locationVal')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-lime-DEFAULT font-bold">📞</span>
                <a href="tel:6783468470" className="hover:text-lime-DEFAULT transition-colors">(678) 346-8470</a>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-lime-DEFAULT font-bold">💬</span>
                <a href="https://wa.me/16783468470" target="_blank" rel="noopener noreferrer" className="hover:text-lime-DEFAULT transition-colors">{t('contact.info.whatsappVal')}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs font-sans text-white/25">{t('footer.copyright')}</span>
          <span className="text-xs font-sans text-white/25 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-DEFAULT animate-pulse" />
            {t('footer.licensed')}
          </span>
        </div>
      </div>
    </footer>
  )
}
