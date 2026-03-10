'use client'

import { useEffect, useState } from 'react'
import Cursor from '@/components/Cursor'

export default function BebePage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem 4rem',
      position: 'relative',
      zIndex: 3,
    }}>
      <Cursor />

      <div style={{
        textAlign: 'center',
        maxWidth: '480px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}>

        {/* Tag */}
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '2rem',
        }}>
          gizli sayfa — /bebe
        </p>

        {/* Ornament */}
        <span style={{
          fontSize: '1.5rem',
          color: 'var(--accent)',
          marginBottom: '1.5rem',
          display: 'block',
          animation: 'spin 8s linear infinite',
        }}>
          ✦
        </span>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          lineHeight: 1,
          marginBottom: '2rem',
          color: '#F5F0E8',
          animation: 'fadeUp 0.8s ease both 0.3s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          buldun.<br />tabii ki buldun.
        </h1>

        {/* Text */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '1.05rem',
          color: '#A09080',
          lineHeight: 1.9,
          marginBottom: '2.5rem',
          animation: 'fadeUp 0.8s ease both 0.6s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          bu URL'i sana vermek için doğru anı bekliyordum.<br />
          ya da belki kendin buldun. her ikisi de seni anlatıyor.<br />
          <br />
          bir kafede tanıştık, plan yoktu.<br />
          ama o günden beri her şeyi planlıyorum —<br />
          sadece seninle ilgili olanları değil,<br />
          her şeyi biraz daha dikkatli.<br />
          <br />
          bu site bitmedi daha.<br />
          seninle birlikte büyüyecek.
        </p>

        {/* Signature */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'var(--accent2)',
          animation: 'fadeUp 0.8s ease both 0.9s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          — her zaman, senin yazılımcın
        </p>
      </div>
    </main>
  )
}