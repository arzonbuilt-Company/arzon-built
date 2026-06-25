'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import { useT } from '../../lib/i18n'
import { LanguageToggle } from './LanguageToggle'

export function Navbar() {
  const { t } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const links = [
    { label: t('nav.work'),      href: '#transformation' },
    { label: t('nav.services'),  href: '#services'       },
    { label: t('nav.portfolio'), href: '#portfolio'      },
    { label: t('nav.about'),     href: '#about'          },
    { label: t('nav.contact'),   href: '#contact'        },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/5 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/assets/Logo.png"
            alt="Arzon Built"
            width={48}
            height={48}
            className="h-11 w-auto object-contain"
            style={{ filter: 'brightness(1.1)' }}
          />
          <span className="font-display-serif font-black tracking-wider text-white text-lg sm:text-xl uppercase">
            Arzon <span className="text-lime-DEFAULT italic font-semibold">Built</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-white/50 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lime-DEFAULT group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <LanguageToggle />
          <a href="tel:6784399829"
            className="btn-lime text-xs px-5 py-2.5 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            (678) 439-9829
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 w-6 py-1">
          <motion.span animate={menuOpen ? { rotate: 45, y: 8 }  : { rotate: 0, y: 0 }}  className="w-full h-px bg-white block" />
          <motion.span animate={menuOpen ? { opacity: 0 }        : { opacity: 1 }}        className="w-4 h-px bg-white/50 block" />
          <motion.span animate={menuOpen ? { rotate: -45, y: -8 }: { rotate: 0, y: 0 }}  className="w-full h-px bg-white block" />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden glass border-t border-white/5"
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white transition-colors font-display text-lg"
            >{l.label}</a>
          ))}
          <div className="pt-2"><LanguageToggle /></div>
          <a href="tel:6784399829" className="btn-lime text-center mt-2">(678) 439-9829</a>
        </div>
      </motion.div>
      {/* Scroll progress line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-lime-DEFAULT/50 origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  )
}
