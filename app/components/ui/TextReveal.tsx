'use client'

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
      <span
        className="inline-block reveal-word"
        style={{
          animationDelay: `${delay + i * stagger}s`,
        }}
      >
        {word}
      </span>
    </span>
  ))

  return as === 'div' ? <div className={className}>{inner}</div> : <span className={className}>{inner}</span>
}
