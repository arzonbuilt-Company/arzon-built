'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useT } from '../../lib/i18n'

export function ContactSection() {
  const { t } = useT()
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

  const serviceOptions = [
    { id: 'Roofing',         label: t('contact.form.opt.roofing')  },
    { id: 'Painting',        label: t('contact.form.opt.painting') },
    { id: 'Siding',          label: t('contact.form.opt.siding')   },
    { id: 'Windows & Doors', label: t('contact.form.opt.windows')  },
    { id: 'Kitchen',         label: t('contact.form.opt.kitchen')  },
    { id: 'Deck',            label: t('contact.form.opt.deck')     },
    { id: 'Full Remodeling', label: t('contact.form.opt.full')     },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `New Project Estimate Request: ${service || 'General Inquiry'}`
    const body = `Name: ${name}
Phone: ${phone}
Service: ${service || 'General Inquiry'}
Message: ${message || 'No additional message'}`
    window.location.href = `mailto:arzonbuilt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-bg">
      {/* Top & bottom dark fades */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none z-0" />
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none z-0" />

      {/* Dynamic Background Blobs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-lime-DEFAULT/[0.04] rounded-full filter blur-[90px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-lime-DEFAULT/[0.03] rounded-full filter blur-[80px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Centered header — "the page meets the visitor" */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mx-auto max-w-2xl mb-12 sm:mb-20"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('contact.eyebrow')}</span></div>
          <h2 className="font-display-serif text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] mb-5 sm:mb-6">
            <span className="text-white">{t('contact.title1')} </span>
            <span className="text-lime-gradient italic">{t('contact.title2')}</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — contact info */}
          <div>
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="space-y-4"
            >
              {[
                { label: t('contact.info.location'), value: t('contact.info.locationVal') },
                { label: t('contact.info.call'),     value: '(678) 439-9829',              href: 'tel:6784399829' },
                { label: t('contact.info.email'),    value: t('contact.info.emailVal'),    href: `mailto:${t('contact.info.emailVal')}` },
              ].map(item => (
                <div key={item.label} className="glass p-5">
                  <p className="text-[10px] font-sans text-white/30 uppercase tracking-[.3em] mb-1.5">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-white/80 hover:text-lime-DEFAULT transition-colors font-sans text-base">{item.value}</a>
                    : <p className="text-white/80 font-sans text-base">{item.value}</p>
                  }
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass border border-white/5 p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder={t('contact.form.namePh')}
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    placeholder={t('contact.form.phonePh')}
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/50 transition-colors"
                  />
                </div>
              </div>

              {/* Service selector */}
              <div>
                <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-3">{t('contact.form.service')}</label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map(opt => (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setService(service === opt.id ? '' : opt.id)}
                      className={`px-4 py-2 text-xs font-sans border transition-all duration-200 ${
                        service === opt.id
                          ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT font-semibold'
                          : 'border-white/15 text-white/55 hover:border-lime-DEFAULT/40 hover:text-white/85'
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{t('contact.form.message')}</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                  placeholder={t('contact.form.messagePh')}
                  className="w-full bg-white/5 border border-white/15 text-white placeholder-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                className="w-full btn-lime flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('contact.form.submit')}
              </motion.button>

              <p className="text-center text-[10px] font-sans text-white/25 tracking-[.2em] uppercase">
                {t('contact.form.disclaimer')}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
