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

    // Fill black once
    ctx.fillStyle = '#1A1410'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

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

      // Subtle fade — keeps trails
      ctx.fillStyle = 'rgba(26,20,16,0.008)'
      ctx.fillRect(0, 0, W, H)

      // Color shifts warm as scale grows
      const progress = (scale - 4) / (maxScale - 4)
      const r = Math.round(180 + progress * 60)
      const g = Math.round(100 + progress * 60)
      const b = Math.round(30 + progress * 20)
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

      // Full revolution done
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
          ctx.fillStyle = 'rgba(26,20,16,0.35)'
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
      background: '#1A1410',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Cursor />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Overlay text */}
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
          color: 'rgba(184,132,58,0.5)',
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
          color: msgVisible ? 'rgba(245,240,232,1)' : 'rgba(245,240,232,0)',
          transition: 'color 1.5s ease',
          textShadow: '0 0 30px rgba(26,20,16,1), 0 0 60px rgba(26,20,16,1), 0 0 4px rgba(26,20,16,1)',
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
          color: hintVisible ? 'rgba(212,165,90,1)' : 'rgba(184,132,58,0)',
          transition: 'color 1s ease',
          textShadow: '0 0 20px rgba(26,20,16,1), 0 0 40px rgba(26,20,16,1)',
        }}>
          sadece senin için çizildi ♡
        </p>
      </div>
    </main>
  )
}