'use client'
import { useState } from 'react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { useT } from '../../lib/i18n'

export function ContactSection() {
  const { t, lang } = useT()
  const [activeTab, setActiveTab] = useState<'message' | 'calculator'>('message')
  const [contactMethod, setContactMethod] = useState<'email' | 'sms'>('email')
  
  // General form states
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [email,   setEmail]   = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

  // Calculator states
  const [calcServices, setCalcServices] = useState<string[]>([])
  const [houseSize, setHouseSize] = useState<number>(1500)
  const [quality, setQuality] = useState<'standard' | 'premium' | 'luxury'>('premium')

  const serviceOptions = [
    { id: 'Roofing',         label: t('contact.form.opt.roofing'),  icon: '🏠' },
    { id: 'Painting',        label: t('contact.form.opt.painting'), icon: '🎨' },
    { id: 'Siding',          label: t('contact.form.opt.siding'),   icon: '🪵' },
    { id: 'Windows & Doors', label: t('contact.form.opt.windows'),  icon: '🪟' },
    { id: 'Kitchen',         label: t('contact.form.opt.kitchen'),  icon: '🍳' },
    { id: 'Deck',            label: t('contact.form.opt.deck'),     icon: '📐' },
    { id: 'Full Remodeling', label: t('contact.form.opt.full'),     icon: '🏡' },
  ]

  const toggleCalcService = (srv: string) => {
    if (calcServices.includes(srv)) {
      setCalcServices(calcServices.filter(s => s !== srv))
    } else {
      setCalcServices([...calcServices, srv])
    }
  }

  // Cost calculation logic
  const calculateEstimate = () => {
    if (calcServices.length === 0) return { min: 0, max: 0 }
    
    let baseMin = 0
    let baseMax = 0

    calcServices.forEach(srv => {
      switch (srv) {
        case 'Roofing':
          baseMin += houseSize * 5.0
          baseMax += houseSize * 7.5
          break
        case 'Siding':
          baseMin += houseSize * 7.0
          baseMax += houseSize * 11.0
          break
        case 'Painting':
          baseMin += houseSize * 2.2
          baseMax += houseSize * 3.8
          break
        case 'Deck':
          baseMin += 400 * 20.0 // assume average deck 400sqft
          baseMax += 400 * 35.0
          break
        case 'Kitchen':
          baseMin += 14000
          baseMax += 25000
          break
        case 'Windows & Doors':
          baseMin += 4500
          baseMax += 9000
          break
        case 'Full Remodeling':
          baseMin += houseSize * 90.0
          baseMax += houseSize * 160.0
          break
        default:
          baseMin += 1000
          baseMax += 2000
      }
    })

    // Quality multiplier
    let mult = 1.0
    if (quality === 'premium') mult = 1.3
    if (quality === 'luxury') mult = 1.75

    return {
      min: Math.round(baseMin * mult),
      max: Math.round(baseMax * mult),
    }
  }

  const { min: estMin, max: estMax } = calculateEstimate()

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (contactMethod === 'email') {
      const subject = lang === 'en' ? `Arzon Built Project Inquiry - ${name}` : `Consulta de Proyecto Arzon Built - ${name}`
      const body = lang === 'en'
        ? `Hi Arzon Built team,\n\nI would like to request an estimate for a project.\n\nName: ${name}\nPhone: ${phone || 'Not provided'}\nEmail: ${email}\nInterested Service: ${service || 'General Inquiry'}\n\nMessage/Notes:\n${message || 'None'}\n\nSent from Arzon Built website.`
        : `Hola equipo de Arzon Built,\n\nMe gustaría solicitar una cotización para un proyecto.\n\nNombre: ${name}\nTeléfono: ${phone || 'No provisto'}\nCorreo: ${email}\nServicio de Interés: ${service || 'Consulta General'}\n\nMensaje/Notas:\n${message || 'Ninguno'}\n\nEnviado desde el sitio web de Arzon Built.`
      
      window.open(`mailto:arzonbuilt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
    } else {
      const body = lang === 'en'
        ? `Hi Arzon Built! My name is ${name}. I am interested in ${service || 'a project'}. Best contact email is ${email || 'Not provided'}. Message: ${message || 'None'}`
        : `¡Hola Arzon Built! Mi nombre es ${name}. Estoy interesado en ${service || 'un proyecto'}. Mi correo es ${email || 'No provisto'}. Mensaje: ${message || 'Ninguno'}`
      
      window.open(`sms:+16783468470?&body=${encodeURIComponent(body)}`, '_blank')
    }
  }

  const handleCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const servicesText = calcServices.join(', ')
    
    if (contactMethod === 'email') {
      const subject = lang === 'en' ? `Arzon Built Estimate Request - ${name}` : `Solicitud de Presupuesto Arzon Built - ${name}`
      const body = lang === 'en'
        ? `Hi Arzon Built,\n\nI generated an estimate on your website and would like to proceed with a consultation.\n\nName: ${name}\nPhone: ${phone || 'Not provided'}\nEmail: ${email}\n\nProject details:\n- Selected Services: ${servicesText}\n- Projected Size: ${houseSize} sq ft\n- Quality Grade: ${quality}\n- Approximate Estimate Range: $${estMin.toLocaleString()} - $${estMax.toLocaleString()}\n\nAdditional Notes:\n${message || 'None'}`
        : `Hola Arzon Built,\n\nGeneré un presupuesto estimado en su sitio web y me gustaría proceder con una consulta.\n\nNombre: ${name}\nTeléfono: ${phone || 'No provisto'}\nCorreo: ${email}\n\nDetalles del proyecto:\n- Servicios Seleccionados: ${servicesText}\n- Tamaño Proyectado: ${houseSize} sq ft\n- Calidad de Materiales: ${quality}\n- Rango Estimado Aproximado: $${estMin.toLocaleString()} - $${estMax.toLocaleString()}\n\nNotas Adicionales:\n${message || 'Ninguno'}`
      
      window.open(`mailto:arzonbuilt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank')
    } else {
      const body = lang === 'en'
        ? `Hi Arzon Built! I'm ${name}. I calculated a website estimate: ${servicesText} (${houseSize} sq ft, ${quality} tier). Range: $${estMin.toLocaleString()}-$${estMax.toLocaleString()}. Email: ${email || 'None'}. Notes: ${message || 'None'}`
        : `¡Hola Arzon Built! Soy ${name}. Calculé un presupuesto estimado: ${servicesText} (${houseSize} sq ft, calidad ${quality}). Rango: $${estMin.toLocaleString()}-$${estMax.toLocaleString()}. Correo: ${email || 'Ninguno'}. Notas: ${message || 'Ninguno'}`
      
      window.open(`sms:+16783468470?&body=${encodeURIComponent(body)}`, '_blank')
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-transparent"
    >

      {/* Decorative Gold flare */}
      <div className="absolute left-1/4 bottom-10 w-[400px] h-[400px] rounded-full bg-lime-DEFAULT/3 blur-[140px] pointer-events-none" />

      {/* Horizontal line texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(214,255,56,0.15) 0px, rgba(214,255,56,0.15) 1px, transparent 1px, transparent 24px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mx-auto max-w-2xl mb-12 sm:mb-16"
        >
          <div className="section-eyebrow mb-5 justify-center"><span className="section-rule" /><span>{t('contact.eyebrow')}</span></div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-black leading-[1.05] mb-5 sm:mb-6">
            <span className="text-white">{t('contact.title1')} </span>
            <span className="text-lime-gradient italic">{t('contact.title2')}</span>
          </h2>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed font-sans">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="bg-bg/60 p-1.5 rounded-full border border-white/5 flex gap-2">
            <button
              onClick={() => setActiveTab('message')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'message'
                  ? 'bg-lime-DEFAULT text-bg font-bold shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Direct Inquiry' : 'Consulta Directa'}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'calculator'
                  ? 'bg-lime-DEFAULT text-bg font-bold shadow-lg'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Project Estimator' : 'Estimador de Obra'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT — Info Cards */}
          <div className="lg:col-span-4 space-y-4">
            {[
              { label: t('contact.info.location'), value: t('contact.info.locationVal'), icon: '📍' },
              { label: t('contact.info.call'),     value: '(678) 346-8470', href: 'tel:6783468470', icon: '📞' },
              { label: t('contact.info.whatsapp'), value: t('contact.info.whatsappVal'), href: 'mailto:arzonbuilt@gmail.com', icon: '✉️' },
            ].map(item => (
              <div key={item.label} className="glass p-6 rounded-2xl border border-white/5 hover:border-lime-DEFAULT/20 transition-all duration-300 shadow-xl flex items-start gap-4">
                <span className="text-2xl mt-1">{item.icon}</span>
                <div>
                  <p className="text-[9px] font-sans text-white/30 uppercase tracking-[.25em] mb-1">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="text-white/80 hover:text-lime-DEFAULT transition-colors font-sans text-base font-bold">{item.value}</a>
                    : <p className="text-white/80 font-sans text-base font-bold">{item.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Dynamic Tab Forms */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'message' ? (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <form onSubmit={handleGeneralSubmit} className="glass border border-white/5 p-6 sm:p-10 space-y-6 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-lime-DEFAULT to-transparent" />
                    
                    {/* Preferred contact method */}
                    <div className="bg-bg/40 p-5 rounded-xl border border-white/5">
                      <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-3">
                        {t('contact.form.method')}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setContactMethod('email')}
                          className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-xs font-bold transition-all duration-300 ${
                            contactMethod === 'email'
                              ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT shadow-md'
                              : 'border-white/10 text-white/60 hover:border-lime-DEFAULT/20'
                          }`}
                        >
                          <span>📧</span> {t('contact.form.method.email')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('sms')}
                          className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-xs font-bold transition-all duration-300 ${
                            contactMethod === 'sms'
                              ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT shadow-md'
                              : 'border-white/10 text-white/60 hover:border-lime-DEFAULT/20'
                          }`}
                        >
                          <span>💬</span> {t('contact.form.method.sms')}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-1">
                        <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          placeholder={t('contact.form.namePh')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">
                          {t('contact.form.email')} {contactMethod === 'email' && '*'}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required={contactMethod === 'email'}
                          placeholder={t('contact.form.emailPh')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">
                          {t('contact.form.phone')} {contactMethod === 'sms' && '*'}
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required={contactMethod === 'sms'}
                          placeholder={t('contact.form.phonePh')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Interactive Service Selector Grid */}
                    <div>
                      <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-3">
                        {t('contact.form.service')}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {serviceOptions.map(opt => {
                          const isSelected = service === opt.id
                          return (
                            <motion.button
                              key={opt.id}
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setService(isSelected ? '' : opt.id)}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 relative ${
                                isSelected
                                  ? 'bg-lime-DEFAULT/10 border-lime-DEFAULT text-lime-DEFAULT shadow-lg'
                                  : 'border-white/10 text-white/50 bg-white/[0.01] hover:border-lime-DEFAULT/30 hover:bg-white/[0.03]'
                              }`}
                            >
                              <span className="text-2xl mb-2">{opt.icon}</span>
                              <span className="text-xs font-bold leading-tight">{opt.label}</span>
                              {isSelected && (
                                <motion.span
                                  layoutId="activeTick"
                                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-lime-DEFAULT"
                                />
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{t('contact.form.message')}</label>
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={4}
                        placeholder={t('contact.form.messagePh')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-lime flex items-center justify-center gap-3 rounded-xl font-bold py-4 text-xs tracking-wider uppercase shadow-xl"
                    >
                      <span className="text-base">
                        {contactMethod === 'email' ? '📧' : '💬'}
                      </span>
                      {contactMethod === 'email' 
                        ? (lang === 'en' ? 'Submit via Email' : 'Enviar por Correo')
                        : (lang === 'en' ? 'Submit via Text Message' : 'Enviar por Mensaje de Texto')}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <form onSubmit={handleCalculatorSubmit} className="glass border border-white/5 p-6 sm:p-10 space-y-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-lime-DEFAULT to-transparent" />
                    
                    {/* Preferred contact method */}
                    <div className="bg-bg/40 p-5 rounded-xl border border-white/5">
                      <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-3">
                        {t('contact.form.method')}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setContactMethod('email')}
                          className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-xs font-bold transition-all duration-300 ${
                            contactMethod === 'email'
                              ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT shadow-md'
                              : 'border-white/10 text-white/60 hover:border-lime-DEFAULT/20'
                          }`}
                        >
                          <span>📧</span> {t('contact.form.method.email')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactMethod('sms')}
                          className={`flex items-center justify-center gap-2 py-3 rounded-lg border text-xs font-bold transition-all duration-300 ${
                            contactMethod === 'sms'
                              ? 'bg-lime-DEFAULT text-bg border-lime-DEFAULT shadow-md'
                              : 'border-white/10 text-white/60 hover:border-lime-DEFAULT/20'
                          }`}
                        >
                          <span>💬</span> {t('contact.form.method.sms')}
                        </button>
                      </div>
                    </div>

                    {/* Calculator Step 1: Choose Services (Interactive Cards) */}
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                        {lang === 'en' ? 'Step 1: Select services' : 'Paso 1: Seleccione servicios'}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {serviceOptions.map(opt => {
                          const isSelected = calcServices.includes(opt.id)
                          return (
                            <motion.button
                              key={opt.id}
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => toggleCalcService(opt.id)}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all duration-300 relative ${
                                isSelected
                                  ? 'bg-lime-DEFAULT/10 border-lime-DEFAULT text-lime-DEFAULT shadow-lg'
                                  : 'border-white/10 text-white/50 bg-white/[0.01] hover:border-lime-DEFAULT/30 hover:bg-white/[0.03]'
                              }`}
                            >
                              <span className="text-2xl mb-2">{opt.icon}</span>
                              <span className="text-xs font-bold leading-tight">{opt.label}</span>
                              {isSelected && (
                                <motion.span
                                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-lime-DEFAULT"
                                />
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Calculator Step 2: Slider for Size */}
                    <div>
                      <div className="flex justify-between items-baseline mb-3">
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                          {lang === 'en' ? 'Step 2: Home Area (sq ft)' : 'Paso 2: Área de la casa (pies cuadrados)'}
                        </h4>
                        <span className="text-lime-DEFAULT font-mono text-lg font-bold">{houseSize.toLocaleString()} sq ft</span>
                      </div>
                      <input
                        type="range"
                        min={500}
                        max={5000}
                        step={100}
                        value={houseSize}
                        onChange={e => setHouseSize(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime-DEFAULT"
                      />
                      <div className="flex justify-between text-[10px] text-white/30 font-sans mt-2 font-semibold">
                        <span>500 sq ft</span>
                        <span>2,500 sq ft</span>
                        <span>5,000 sq ft</span>
                      </div>
                    </div>

                    {/* Calculator Step 3: Material Quality Tier */}
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                        {lang === 'en' ? 'Step 3: Quality Tier' : 'Paso 3: Nivel de Calidad'}
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {(
                          [
                            { id: 'standard', title: lang === 'en' ? 'Standard' : 'Estándar', desc: lang === 'en' ? 'High quality basic materials' : 'Materiales básicos de alta calidad' },
                            { id: 'premium', title: lang === 'en' ? 'Premium' : 'Premium', desc: lang === 'en' ? 'Architectural grades, extended warranty' : 'Grado arquitectónico, garantía extendida' },
                            { id: 'luxury', title: lang === 'en' ? 'Luxury' : 'Lujo / Exclusivo', desc: lang === 'en' ? 'High-end structural designs & finishes' : 'Diseños estructurales y acabados exclusivos' },
                          ] as const
                        ).map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setQuality(t.id)}
                            className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between h-28 relative ${
                              quality === t.id
                                ? 'bg-lime-DEFAULT/5 border-lime-DEFAULT shadow-lg'
                                : 'border-white/10 text-white/50 hover:border-lime-DEFAULT/25 hover:bg-white/[0.01]'
                            }`}
                          >
                            <span className={`text-xs font-bold ${quality === t.id ? 'text-lime-DEFAULT' : 'text-white'}`}>{t.title}</span>
                            <span className="text-[9px] text-white/40 leading-snug">{t.desc}</span>
                            {quality === t.id && (
                              <span className="absolute top-3 right-3 text-xs text-lime-DEFAULT font-bold">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculator Estimated Result Banner */}
                    <div className="bg-bg/80 border border-white/5 p-6 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4 shadow-inner">
                      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-lime-DEFAULT/5 blur-2xl pointer-events-none" />
                      <div>
                        <span className="text-[10px] text-white/30 uppercase tracking-[.2em] font-sans block mb-1">
                          {lang === 'en' ? 'Approximate Estimate Range' : 'Rango Estimado Aproximado'}
                        </span>
                        <span className="text-white/45 text-xs font-semibold block">
                          {calcServices.length === 0 
                            ? (lang === 'en' ? 'Select at least one service' : 'Selecciona al menos un servicio')
                            : (lang === 'en' ? 'Subject to physical inspection' : 'Sujeto a inspección física')}
                        </span>
                      </div>
                      <div className="text-right">
                        {calcServices.length > 0 ? (
                          <span className="text-3xl sm:text-4xl font-black font-display text-lime-DEFAULT tracking-tight glow-lime">
                            ${estMin.toLocaleString()} - ${estMax.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-xl sm:text-2xl font-black font-display text-white/20">
                            $0.00
                          </span>
                        )}
                      </div>
                    </div>

                    {/* User credentials for quote */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{t('contact.form.name')}</label>
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          placeholder={t('contact.form.namePh')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">
                          {t('contact.form.email')} {contactMethod === 'email' && '*'}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required={contactMethod === 'email'}
                          placeholder={t('contact.form.emailPh')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">
                          {t('contact.form.phone')} {contactMethod === 'sms' && '*'}
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required={contactMethod === 'sms'}
                          placeholder={t('contact.form.phonePh')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Extra Notes */}
                    <div>
                      <label className="text-xs font-sans text-white/40 uppercase tracking-wider block mb-2">{lang === 'en' ? 'Project Details / Notes (optional)' : 'Detalles de la Obra / Notas (opcional)'}</label>
                      <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={3}
                        placeholder={t('contact.form.messagePh')}
                        className="w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/20 px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-lime-DEFAULT/40 transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={calcServices.length === 0}
                      whileHover={{ scale: calcServices.length > 0 ? 1.01 : 1 }}
                      whileTap={{ scale: calcServices.length > 0 ? 0.98 : 1 }}
                      className={`w-full flex items-center justify-center gap-3 rounded-xl font-bold py-4 text-xs tracking-wider uppercase shadow-xl ${
                        calcServices.length > 0
                          ? 'btn-lime'
                          : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-base">
                        {contactMethod === 'email' ? '📧' : '💬'}
                      </span>
                      {contactMethod === 'email' 
                        ? (lang === 'en' ? 'Get Instant Quote via Email' : 'Obtener Presupuesto por Correo')
                        : (lang === 'en' ? 'Get Instant Quote via Text' : 'Obtener Presupuesto por Mensaje')
                      }
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="text-center text-[10px] font-sans text-white/20 tracking-[.25em] uppercase mt-6">
              {t('contact.form.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
