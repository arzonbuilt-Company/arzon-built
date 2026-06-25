'use client'
import Image from 'next/image'
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
    <footer className="relative border-t border-white/10 pt-16 pb-8 px-6 overflow-hidden bg-surface">
      {/* Top fade */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg to-transparent pointer-events-none z-0" />

      {/* Diamond/checker texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 20px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-6 hover:opacity-90 transition-opacity">
              <Image src="/assets/Logo.png" alt="Arzon Built" width={48} height={48}
                className="h-11 w-auto object-contain"
                style={{ filter: 'brightness(1.1)' }}
              />
              <span className="font-display-serif font-black tracking-wider text-white text-lg sm:text-xl uppercase">
                Arzon <span className="text-lime-DEFAULT italic font-semibold">Built</span>
              </span>
            </a>
            <p className="text-white/30 text-sm font-sans leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-xs font-sans font-semibold tracking-[.3em] uppercase text-white/30 mb-5">{t('footer.servicesHeader')}</h5>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <a href="#services"
                    className="text-sm font-sans text-white/40 hover:text-lime-DEFAULT transition-colors"
                  >{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-xs font-sans font-semibold tracking-[.3em] uppercase text-white/30 mb-5">{t('footer.contactHeader')}</h5>
            <ul className="space-y-3 text-sm font-sans text-white/40">
              <li>{t('contact.info.locationVal')}</li>
              <li><a href="tel:6784399829" className="hover:text-lime-DEFAULT transition-colors">(678) 439-9829</a></li>
              <li><a href="mailto:arzonbuilt@gmail.com" className="hover:text-lime-DEFAULT transition-colors">{t('contact.info.email')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-xs font-sans text-white/20">{t('footer.copyright')}</span>
          <span className="text-xs font-sans text-white/20">{t('footer.licensed')}</span>
        </div>
      </div>
    </footer>
  )
}
