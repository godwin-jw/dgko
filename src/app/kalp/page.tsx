'use client'

import { useEffect, useRef, useState } from 'react'
import Cursor from '@/components/Cursor'

export default function KalpPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const [msgVisible, setMsgVisible] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)



    let t = 0
    let scale = 4
    const maxScale = 14
    const scaleStep = 0.4
    let cycles = 0
    let revealed = false

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2

      // Subtle fade — trails kalıyor
      ctx.fillStyle = 'rgba(42,14,14,0.008)'
      ctx.fillRect(0, 0, W, H)

      // Pembe → bordo renk geçişi
      const progress = (scale - 4) / (maxScale - 4)
      const r = Math.round(221 - progress * 80)   // 221 → 141
      const g = Math.round(165 - progress * 120)   // 165 → 45
      const b = Math.round(182 - progress * 150)   // 182 → 32
      const alpha = 0.85 + progress * 0.15
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
      ctx.lineWidth = 1.2

      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const tx = 16 * Math.pow(Math.sin(t), 3)
        const ty = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        const px = cx + tx * scale
        const py = cy + ty * scale

        if (i === 0 && t < 0.02) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)

        t += 0.012
      }
      ctx.stroke()


      if (t >= Math.PI * 2) {
        t = 0
        scale += scaleStep
        cycles++

        if (cycles === 1 && !revealed) {
          revealed = true
          setTimeout(() => {
            setMsgVisible(true)
            setHintVisible(true)
          }, 400)
        }

        if (scale > maxScale) {
          scale = 4
          cycles = 0
          ctx.fillStyle = 'rgba(42,14,14,0.35)'
          ctx.fillRect(0, 0, W, H)
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Cursor />


      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />


      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(221,165,182,0.4)',
        }}>
          x = 16·sin³(t)
        </p>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          letterSpacing: '0.05em',
          maxWidth: '340px',
          lineHeight: 1.6,
          textAlign: 'center',
          color: msgVisible ? 'rgba(221,165,182,1)' : 'rgba(221,165,182,0)',
          transition: 'color 1.5s ease',
          textShadow: '0 0 30px rgba(42,14,14,1), 0 0 60px rgba(42,14,14,1), 0 0 4px rgba(42,14,14,1)',
        }}>
          bir formül bu şekli çiziyor.<br />
          ama seni hissetmek için<br />
          formül yetmiyor.
        </p>

        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hintVisible ? 'rgba(197,225,240,0.9)' : 'rgba(197,225,240,0)',
          transition: 'color 1s ease',
          textShadow: '0 0 20px rgba(42,14,14,1), 0 0 40px rgba(42,14,14,1)',
        }}>
          sadece senin için çizildi ♡
        </p>
      </div>
    </main>
  )
}