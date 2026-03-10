'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cursor from '@/components/Cursor'
import Particles from '@/components/Particles'

const NAME_CHARS = ['F', 'i', 'd', 'a', 'n']

function useTypewriter(text: string, speed = 75, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i))
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { displayed, done }
}

export default function LandingPage() {
  const router = useRouter()
  const [eggCount, setEggCount] = useState(0)
  const [eggTriggered, setEggTriggered] = useState(false)
  const [eggMsg, setEggMsg] = useState('')
  const [btnLabel, setBtnLabel] = useState('merak ettiysen bak')
  const [btnVisible, setBtnVisible] = useState(false)
  const eggMsgRef = useRef('')

  const subtitle = useTypewriter('haftalarca ne yapacağımı düşündüm.', 75, 1600)

  // Subtitle bitince butonu göster
  useEffect(() => {
    if (subtitle.done && !eggTriggered) setBtnVisible(true)
  }, [subtitle.done, eggTriggered])

  // Easter egg typewriter
  useEffect(() => {
    if (!eggTriggered) return
    setBtnVisible(false)
    const msg = 'adına 3 kez tıkladın. meraklısın. seviyorum.'
    let i = 0
    const iv = setInterval(() => {
      eggMsgRef.current = msg.slice(0, ++i)
      setEggMsg(eggMsgRef.current)
      if (i >= msg.length) {
        clearInterval(iv)
        setTimeout(() => {
          setBtnLabel('tamam tamam, buyur')
          setBtnVisible(true)
        }, 800)
      }
    }, 55)
    return () => clearInterval(iv)
  }, [eggTriggered])

  const handleNameClick = () => {
    setEggCount(c => {
      const next = c + 1
      if (next >= 3 && !eggTriggered) setEggTriggered(true)
      return next
    })
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      userSelect: 'none',
      position: 'relative',
      zIndex: 3,
    }}>
      <Cursor />
      <Particles />

      {/* Label */}
      <p style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        marginBottom: '2.5rem',
        animation: 'fadeUp 0.8s ease both 0.3s',
        opacity: 0,
        animationFillMode: 'forwards',
      }}>
        evet, bu senin için
      </p>

      {/* Name */}
      <h1
        onClick={handleNameClick}
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 'clamp(5rem, 16vw, 13rem)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          display: 'flex',
          gap: '0.02em',
          marginBottom: '2.5rem',
          cursor: 'pointer',
        }}
      >
        {NAME_CHARS.map((char, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: 0,
              animation: `charIn 0.5s cubic-bezier(0.22,1,0.36,1) forwards ${0.8 + i * 0.08}s`,
              transition: 'transform 0.2s, color 0.2s',
              color: 'var(--fg)',
            }}
            onMouseEnter={e => {
              ;(e.target as HTMLElement).style.transform = 'translateY(-8px) rotate(-4deg)'
              ;(e.target as HTMLElement).style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              ;(e.target as HTMLElement).style.transform = ''
              ;(e.target as HTMLElement).style.color = 'var(--fg)'
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
        color: 'var(--muted)',
        marginBottom: '3rem',
        minHeight: '2rem',
        letterSpacing: '0.02em',
      }}>
        {subtitle.displayed}
        {!subtitle.done && (
          <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>|</span>
        )}
      </p>

      {/* Easter egg message */}
      {eggMsg && (
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.72rem',
          color: 'var(--accent)',
          letterSpacing: '0.05em',
          marginTop: '-1.5rem',
          marginBottom: '2rem',
          animation: 'fadeUp 0.4s ease both',
          minHeight: '1.2rem',
        }}>
          {eggMsg}
        </p>
      )}

      {/* CTA Button */}
      {btnVisible && (
        <button
          onClick={() => router.push('/biz')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            background: 'none',
            border: '1px solid var(--fg)',
            padding: '0.8rem 2.2rem',
            cursor: 'pointer',
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: 'var(--fg)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeUp 0.6s ease both',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget
            btn.style.color = 'var(--bg)'
            btn.style.background = 'var(--fg)'
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget
            btn.style.color = 'var(--fg)'
            btn.style.background = 'none'
          }}
        >
          <span>{btnLabel}</span>
          <span style={{ transition: 'transform 0.3s' }}>→</span>
        </button>
      )}

      {/* Footer egg hint */}
      <div
        onClick={handleNameClick}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.6rem',
          color: 'var(--light)',
          letterSpacing: '0.1em',
          cursor: 'pointer',
          transition: 'color 0.3s',
          animation: 'fadeUp 0.8s ease both 2.8s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--light)')}
      >
        ◎
      </div>
    </main>
  )
}