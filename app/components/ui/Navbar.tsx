'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useT } from '../../lib/i18n'
import { LanguageToggle } from './LanguageToggle'

export function Navbar() {
  const { t } = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const links = [
    { label: t('nav.work'),      href: '/#transformation' },
    { label: t('nav.services'),  href: '/#services'       },
    { label: t('nav.portfolio'), href: '/#portfolio'      },
    { label: t('nav.about'),     href: '/#about'          },
    { label: t('nav.contact'),   href: '/#contact'        },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div 
        className={`w-[95%] sm:w-[90%] max-w-7xl mt-4 sm:mt-6 transition-all duration-500 pointer-events-auto rounded-2xl sm:rounded-full ${
          scrolled 
            ? 'glass border-white/[0.08] py-3 px-6 shadow-2xl backdrop-blur-md' 
            : 'background-transparent border-transparent py-5 px-4'
        } border flex items-center justify-between`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center" data-cursor="true">
          <Image
            src="/Logo.png"
            alt="Arzon Built"
            width={130}
            height={40}
            className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
            style={{ filter: 'brightness(1.15)' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-xs font-semibold tracking-widest uppercase text-white/60 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-lime-DEFAULT group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10" />
          <LanguageToggle />
          <a href="tel:6783468470"
            className="btn-lime text-[11px] font-bold px-5 py-2.5 flex items-center gap-2 rounded-full"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            (678) 346-8470
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden flex flex-col gap-1.5 w-6 py-2 items-end justify-center focus:outline-none"
          aria-label="Toggle menu"
        >
          <motion.span animate={menuOpen ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  className="w-full h-[2px] bg-white block rounded-full" />
          <motion.span animate={menuOpen ? { opacity: 0 }        : { opacity: 1 }}        className="w-4 h-[2px] bg-white/70 block rounded-full" />
          <motion.span animate={menuOpen ? { rotate: -45, y: -7 }: { rotate: 0, y: 0 }}  className="w-full h-[2px] bg-white block rounded-full" />
        </button>
      </div>

      {/* Mobile menu container (overlay) */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 w-[95%] mx-auto mt-2 rounded-2xl glass border border-white/[0.08] shadow-2xl overflow-hidden pointer-events-auto md:hidden"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="text-white/75 hover:text-white transition-colors font-display text-base tracking-wider uppercase"
              >{l.label}</Link>
            ))}
            <div className="h-px bg-white/10 w-full" />
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/40 tracking-wider uppercase">Language / Idioma:</span>
              <LanguageToggle />
            </div>
            <a href="tel:6783468470" className="btn-lime text-center py-3.5 mt-2 rounded-xl text-xs font-bold font-sans">
              (678) 346-8470
            </a>
          </div>
        </motion.div>
      )}

      {/* Scroll progress line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-lime-dark via-lime-DEFAULT to-lime-light origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />
    </motion.header>
  )
}
