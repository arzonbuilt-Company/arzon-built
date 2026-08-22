'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '../../lib/i18n'

export function SplashScreen() {
  const { t } = useT()
  const [visible, setVisible]   = useState(true)
  const [progress, setProgress] = useState(0)
  const [ready, setReady]       = useState(false)

  useEffect(() => {
    // Browsers try to restore the previous scroll position on refresh — force
    // every load (including a refresh) to start at the top instead, UNLESS
    // the URL points at a specific section (e.g. /#services), which should
    // still land there like normal anchor navigation.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    // Deliberately NOT tied to window 'load' or any real resource-loading
    // signal: on iOS, an autoplaying <video> can have its network fetch
    // deferred/throttled by system-level settings (cellular data, Low Power
    // Mode, Safari's "Auto-Play Videos" setting) in ways that are invisible
    // to desktop testing tools — waiting on 'load' there could hang for a
    // long, unpredictable time. A short fixed duration is guaranteed to be
    // consistent everywhere, same lesson as the earlier scroll-lock issue.
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => (p >= 92 ? 92 : Math.min(p + 4, 92)))
    }, 60)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    if (!ready) return
    setProgress(100)
    const t = setTimeout(() => setVisible(false), 150)
    return () => clearTimeout(t)
  }, [ready])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg overflow-hidden"
        >
          {/* bg glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(185,190,138,0.07) 0%, transparent 70%)' }}
          />

          {/* Spinning rings */}
          <div className="relative mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full"
              style={{ border: '1.5px solid transparent', borderTopColor: '#B9BE8A', borderRightColor: 'rgba(185,190,138,0.2)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full"
              style={{ border: '1px solid transparent', borderTopColor: 'rgba(185,190,138,0.4)', borderLeftColor: 'rgba(185,190,138,0.15)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-lime-DEFAULT animate-pulse-glow" />
            </div>
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center"
          >
            <Image src="/Logo.png" alt="Arzon Built" width={130} height={40} priority
              className="h-14 w-auto mx-auto mb-3" style={{ filter: 'brightness(1.1)' }} />
            <p className="font-sans text-xs tracking-[.4em] uppercase text-lime-DEFAULT/50 mt-1">
              Lawrenceville, GA
            </p>
          </motion.div>

          {/* Progress */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-44">
            <div className="flex justify-between text-[10px] font-sans text-white/20 mb-2">
              <span>{t('splash.loading')}</span><span>{progress}%</span>
            </div>
            <div className="h-px bg-white/10 overflow-hidden">
              <div
                className="h-full bg-lime-DEFAULT transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
