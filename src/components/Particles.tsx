'use client'

import { useEffect } from 'react'

const CHARS = ['✦', '·', '∗', '◦', '✧', '⁎', '♡']

export default function Particles() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (Math.random() > 0.88) {
        const p = document.createElement('span')
        p.className = 'particle'
        p.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
        p.style.left = e.clientX + 'px'
        p.style.top = e.clientY + 'px'
        document.body.appendChild(p)
        setTimeout(() => p.remove(), 1400)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return null
}