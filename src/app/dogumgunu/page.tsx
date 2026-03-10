'use client'

import { useEffect, useRef, useState } from 'react'
import Cursor from '@/components/Cursor'

const BDAY_LINES = [
  { text: 'bugün dünyaya geldiğin gün.', cls: 'warm', delay: 2200 },
  { text: 've ben bunu bir website yaparak kutluyorum.', cls: 'funny', delay: 3100 },
  { text: 'çünkü böyleyim işte.', cls: 'muted', delay: 3900 },
  { text: 'ama şunu da biliyorsun —', cls: 'warm', delay: 5000 },
  { text: 'o gün shiba\'ya gittiğin için minnettarım.', cls: 'accent', delay: 5900 },
  { text: 've sen akışına bırakmaya devam et.', cls: 'muted', delay: 7000 },
  { text: 'ben de kod yazmaya.', cls: 'funny', delay: 7700 },
  { text: 'bu denge güzel.', cls: 'accent', delay: 8600 },
]

function burstConfetti() {
  const colors = ['#D4A55A', '#B8843A', '#F5F0E8', '#E8C88A', '#C4A882', '#ffffff']
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const c = document.createElement('div')
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.85
      const dur = 1.8 + Math.random() * 1.6
      c.style.cssText = `
        position:fixed; pointer-events:none; z-index:999;
        left:${x}px; top:0;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        width:${4 + Math.random() * 5}px;
        height:${4 + Math.random() * 5}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        opacity:1;
        animation: confFall ${dur}s linear ${Math.random() * 0.6}s forwards;
      `
      document.body.appendChild(c)
      setTimeout(() => c.remove(), (dur + 1) * 1000)
    }, i * 18)
  }
}

export default function DogumgunuPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const [subtitle, setSubtitle] = useState('')
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [sigVisible, setSigVisible] = useState(false)

  // Typewrite subtitle
  useEffect(() => {
    const text = '(ve sen bunu görmek için buraya geldin.)'
    let i = 0
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        setSubtitle(text.slice(0, ++i))
        if (i >= text.length) clearInterval(iv)
      }, 55)
      return () => clearInterval(iv)
    }, 1400)
    return () => clearTimeout(timeout)
  }, [])

  // Reveal lines one by one
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    BDAY_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i])
        if (i === 0) burstConfetti()
      }, line.delay)
      timers.push(t)
    })

    const sigTimer = setTimeout(() => setSigVisible(true), 9600)
    timers.push(sigTimer)

    return () => timers.forEach(clearTimeout)
  }, [])

  // Canvas — starfield
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

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.006 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }))

    let frame = 0

    ctx.fillStyle = '#0D0A08'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height

      ctx.fillStyle = 'rgba(13,10,8,0.14)'
      ctx.fillRect(0, 0, W, H)

      stars.forEach(s => {
        const twinkle = 0.3 + 0.7 * Math.sin(frame * s.speed + s.phase)
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,165,90,${twinkle * 0.65})`
        ctx.fill()
      })

      // Gold dust drifting up
      if (frame % 6 === 0) {
        const p = document.createElement('span')
        p.style.cssText = `
          position:fixed; pointer-events:none; z-index:10;
          left:${Math.random() * window.innerWidth}px;
          top:${window.innerHeight + 10}px;
          font-size:${7 + Math.random() * 6}px;
          opacity:0;
          animation: floatUp ${1.8 + Math.random()}s ease-out forwards;
          transform: translate(-50%,-50%);
          color: rgba(212,165,90,${0.25 + Math.random() * 0.5});
        `
        p.textContent = ['✦', '·', '∗', '✧', '◦'][Math.floor(Math.random() * 5)]
        document.body.appendChild(p)
        setTimeout(() => p.remove(), 2500)
      }

      frame++
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const lineStyle = (cls: string, visible: boolean): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontFamily: cls === 'funny' ? "'Geist Mono', monospace" : "'Cormorant Garamond', serif",
      fontWeight: 300,
      lineHeight: 1.6,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
      textShadow: '0 0 30px rgba(13,10,8,1), 0 0 15px rgba(13,10,8,1)',
      fontSize: cls === 'funny' || cls === 'muted'
        ? 'clamp(0.75rem, 1.4vw, 0.9rem)'
        : 'clamp(0.88rem, 1.7vw, 1.05rem)',
    }

    if (cls === 'accent') return { ...base, color: 'var(--accent2)', fontStyle: 'italic' }
    if (cls === 'muted')  return { ...base, color: 'rgba(245,240,232,0.4)', letterSpacing: '0.03em' }
    if (cls === 'funny')  return { ...base, color: 'rgba(245,240,232,0.6)', letterSpacing: '0.04em' }
    return { ...base, color: 'rgba(245,240,232,0.85)' }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0D0A08',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '6rem 2rem 4rem',
    }}>
      <Cursor />

      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '520px',
        gap: 0,
      }}>
        {/* Date label */}
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(212,165,90,0.5)',
          marginBottom: '1.4rem',
          animation: 'fadeUp 0.8s ease both 0.5s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          16 mayıs — senin günün
        </p>

        {/* Candles */}
        <div style={{
          fontSize: '1.3rem',
          letterSpacing: '0.5rem',
          marginBottom: '1.4rem',
          animation: 'fadeUp 0.8s ease both 1s, candleFlicker 1.8s ease-in-out infinite 2.2s',
          opacity: 0,
          animationFillMode: 'forwards',
          filter: 'drop-shadow(0 0 10px rgba(212,165,90,0.7))',
        }}>
          🕯️🕯️🕯️
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
          color: '#F5F0E8',
          marginBottom: '0.5rem',
          animation: 'fadeUp 1s ease both 0.8s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          iyi ki<br />
          doğdun,{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--accent2)' }}>bebe.</em>
        </h1>

        {/* Subtitle typewriter */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
          color: 'rgba(245,240,232,0.4)',
          letterSpacing: '0.04em',
          marginBottom: '2rem',
          minHeight: '1.4rem',
        }}>
          {subtitle}
        </p>

        {/* Staggered lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem', width: '100%' }}>
          {BDAY_LINES.map((line, i) => (
            <p key={i} style={lineStyle(line.cls, visibleLines.includes(i))}>
              {line.text}
            </p>
          ))}
        </div>

        {/* Signature */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: sigVisible ? 'rgba(212,165,90,0.9)' : 'rgba(212,165,90,0)',
          transition: 'color 2s ease',
          textShadow: '0 0 20px rgba(13,10,8,1)',
        }}>
          — seninle her 16 mayıs, sonsuza kadar ✦
        </p>
      </div>
    </main>
  )
}