'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TextRevealProps {
  text: string
  className?: string
  as?: 'span' | 'div'
  stagger?: number
  delay?: number
}

export function TextReveal({
  text,
  className = '',
  as = 'span',
  stagger = 0.06,
  delay = 0,
}: TextRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return as === 'div' ? <div className={className}>{text}</div> : <span className={className}>{text}</span>
  }

  const words = text.split(' ')

  const inner = words.map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="inline-block overflow-hidden align-bottom"
      style={{ marginRight: '0.25em' }}
    >
      <motion.span
        className="inline-block"
        initial={{ y: '105%' }}
        animate={{ y: '0%' }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + i * stagger,
        }}
      >
        {word}
      </motion.span>
    </span>
  ))

  return as === 'div' ? <div className={className}>{inner}</div> : <span className={className}>{inner}</span>
}
