'use client'

import { useEffect, useRef, useState } from 'react'
import Cursor from '@/components/Cursor'

const STORAGE_KEY = 'fidan_evren_yildizlar'

type Yildiz = {
  id: string
  x: number // 0-1 oransal
  y: number // 0-1 oransal
  not: string
  ozel?: boolean
  isim?: string
}

const OZEL_YILDIZLAR: Yildiz[] = [
  { id: 'nurettin', x: 0.35, y: 0.38, not: '', ozel: true, isim: 'nurettin' },
  { id: 'fidan',    x: 0.62, y: 0.44, not: '', ozel: true, isim: 'fidan' },
  { id: 'shiba',    x: 0.48, y: 0.28, not: 'shiba kafe — başlangıç', ozel: true, isim: '✦' },
]

function kalanGun() {
  const simdi = new Date()
  const yil = simdi.getMonth() > 3 || (simdi.getMonth() === 4 && simdi.getDate() > 16)
    ? simdi.getFullYear() + 1
    : simdi.getFullYear()
  const hedef = new Date(yil, 4, 16)
  const fark = Math.ceil((hedef.getTime() - simdi.getTime()) / (1000 * 60 * 60 * 24))
  return fark === 0 ? null : fark
}

export default function EvrenPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const starsRef = useRef<{ x: number; y: number; r: number; speed: number; opacity: number }[]>([])

  const [yildizlar, setYildizlar] = useState<Yildiz[]>([])
  const [secili, setSecili] = useState<Yildiz | null>(null)
  const [eklemeMode, setEklemeMode] = useState(false)
  const [bekleyenPos, setBekleyenPos] = useState<{ x: number; y: number } | null>(null)
  const [notText, setNotText] = useState('')
  const [bugun16Mayis, setBugun16Mayis] = useState(false)
  const [kutlama, setKutlama] = useState(false)
  const gun = kalanGun()

  // LocalStorage
  useEffect(() => {
    try {
      const kayit = localStorage.getItem(STORAGE_KEY)
      if (kayit) setYildizlar(JSON.parse(kayit))
    } catch {}

    const simdi = new Date()
    if (simdi.getMonth() === 4 && simdi.getDate() === 16) {
      setBugun16Mayis(true)
      setTimeout(() => setKutlama(true), 1200)
    }
  }, [])

  useEffect(() => {
    if (yildizlar.length === 0) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(yildizlar))
  }, [yildizlar])

  // Canvas arka plan yıldızları
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Yıldızları oluştur
      starsRef.current = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.12 + 0.03,
        opacity: Math.random() * 0.6 + 0.2,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      starsRef.current.forEach(s => {
        // Hafif titreme
        const flicker = Math.sin(frame * 0.02 + s.x) * 0.15
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245,240,232,${Math.max(0.05, s.opacity + flicker)})`
        ctx.fill()
        // Yavaş yukarı akış
        s.y -= s.speed
        if (s.y < -2) s.y = canvas.height + 2
      })

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const tumYildizlar = [...OZEL_YILDIZLAR, ...yildizlar]

  const handleCanvasTouch = (e: React.TouchEvent | React.MouseEvent) => {
    if (!eklemeMode) return
    const rect = (e.target as HTMLElement).closest('.evren-wrap')?.getBoundingClientRect()
    if (!rect) return
    let clientX: number, clientY: number
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = (e as React.MouseEvent).clientX
      clientY = (e as React.MouseEvent).clientY
    }
    const x = (clientX - rect.left) / rect.width
    const y = (clientY - rect.top) / rect.height
    setBekleyenPos({ x, y })
  }

  const yildizEkle = () => {
    if (!bekleyenPos || !notText.trim()) return
    const yeni: Yildiz = {
      id: Date.now().toString(),
      x: bekleyenPos.x,
      y: bekleyenPos.y,
      not: notText.trim(),
    }
    setYildizlar(prev => [...prev, yeni])
    setBekleyenPos(null)
    setNotText('')
    setEklemeMode(false)
  }

  const yildizSil = (id: string) => {
    setYildizlar(prev => prev.filter(y => y.id !== id))
    setSecili(null)
  }

  return (
    <>
      <style>{`
        @keyframes starPop {
          0%   { transform: translate(-50%,-50%) scale(0); opacity:0; }
          60%  { transform: translate(-50%,-50%) scale(1.3); opacity:1; }
          100% { transform: translate(-50%,-50%) scale(1); opacity:1; }
        }
        @keyframes starPulse {
          0%,100% { box-shadow: 0 0 4px 1px rgba(184,132,58,0.4); }
          50%      { box-shadow: 0 0 10px 3px rgba(184,132,58,0.8); }
        }
        @keyframes ozelPulse {
          0%,100% { box-shadow: 0 0 6px 2px rgba(90,184,255,0.5); }
          50%      { box-shadow: 0 0 14px 5px rgba(90,184,255,0.9); }
        }
        @keyframes kutlamaFlash {
          0%   { opacity:0; }
          20%  { opacity:0.15; }
          40%  { opacity:0; }
          60%  { opacity:0.1; }
          100% { opacity:0; }
        }
        .yildiz-nokta {
          position: absolute;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
          animation: starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .yildiz-nokta:active { transform: translate(-50%,-50%) scale(0.85); }
        .yildiz-normal {
          width: 8px; height: 8px;
          background: #B8843A;
          animation: starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both, starPulse 2.5s ease-in-out infinite 0.5s;
        }
        .yildiz-ozel {
          width: 11px; height: 11px;
          background: #5ab8ff;
          animation: starPop 0.5s both, ozelPulse 3s ease-in-out infinite 0.5s;
        }
        .yildiz-label {
          position: absolute;
          transform: translateX(-50%);
          font-family: 'Geist Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          white-space: nowrap;
          pointer-events: none;
          margin-top: 8px;
        }
        .cizgi-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .kutlama-overlay {
          position: absolute;
          inset: 0;
          background: rgba(90,184,255,0.12);
          pointer-events: none;
          animation: kutlamaFlash 3s ease both;
        }
        .fi1 { animation: fadeUp .7s ease both .1s; opacity:0; animation-fill-mode:forwards; }
        .fi2 { animation: fadeUp .7s ease both .3s; opacity:0; animation-fill-mode:forwards; }
        .fi3 { animation: fadeUp .7s ease both .5s; opacity:0; animation-fill-mode:forwards; }
      `}</style>

      <main style={{
        minHeight: '100vh',
        background: '#060810',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '5rem 1.5rem 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Cursor />

        {/* Canvas arka plan */}
        <canvas ref={canvasRef} style={{
          position: 'fixed', inset: 0, zIndex: 0,
          pointerEvents: 'none',
        }}/>

        {/* Başlık */}
        <div className="fi1" style={{ textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '1.5rem' }}>
          <p style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(90,184,255,0.5)',
            marginBottom: '0.5rem',
          }}>
            {bugun16Mayis ? '✦ bugün 16 mayıs ✦' : gun ? `16 mayıs'a ${gun} gün` : '16 mayıs'}
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            color: '#F5F0E8',
            lineHeight: 1.2,
          }}>
            ikimizin evreni.
          </h1>
        </div>

        {/* Yıldız haritası alanı */}
        <div
          className="evren-wrap fi2"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            aspectRatio: '1 / 1.1',
            zIndex: 2,
            cursor: eklemeMode ? 'crosshair' : 'default',
          }}
          onTouchStart={handleCanvasTouch}
          onClick={handleCanvasTouch}
        >
          {/* 16 Mayıs kutlama flash */}
          {kutlama && <div className="kutlama-overlay"/>}

          {/* Çizgiler SVG */}
          <svg className="cizgi-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Nurettin — Fidan ana çizgisi */}
            <line
              x1={`${OZEL_YILDIZLAR[0].x * 100}`} y1={`${OZEL_YILDIZLAR[0].y * 100}`}
              x2={`${OZEL_YILDIZLAR[1].x * 100}`} y2={`${OZEL_YILDIZLAR[1].y * 100}`}
              stroke="rgba(90,184,255,0.25)" strokeWidth="0.3" strokeDasharray="1,1.5"
            />
            {/* Shiba — Nurettin */}
            <line
              x1={`${OZEL_YILDIZLAR[2].x * 100}`} y1={`${OZEL_YILDIZLAR[2].y * 100}`}
              x2={`${OZEL_YILDIZLAR[0].x * 100}`} y2={`${OZEL_YILDIZLAR[0].y * 100}`}
              stroke="rgba(90,184,255,0.15)" strokeWidth="0.2" strokeDasharray="0.8,2"
            />
            {/* Shiba — Fidan */}
            <line
              x1={`${OZEL_YILDIZLAR[2].x * 100}`} y1={`${OZEL_YILDIZLAR[2].y * 100}`}
              x2={`${OZEL_YILDIZLAR[1].x * 100}`} y2={`${OZEL_YILDIZLAR[1].y * 100}`}
              stroke="rgba(90,184,255,0.15)" strokeWidth="0.2" strokeDasharray="0.8,2"
            />
            {/* Kullanıcı yıldızları arası bağlantı — en yakın ozel yıldıza */}
            {yildizlar.map(y => {
              const enYakin = OZEL_YILDIZLAR.reduce((a, b) =>
                Math.hypot(a.x - y.x, a.y - y.y) < Math.hypot(b.x - y.x, b.y - y.y) ? a : b
              )
              return (
                <line key={y.id}
                  x1={`${y.x * 100}`} y1={`${y.y * 100}`}
                  x2={`${enYakin.x * 100}`} y2={`${enYakin.y * 100}`}
                  stroke="rgba(184,132,58,0.18)" strokeWidth="0.2" strokeDasharray="0.5,2"
                />
              )
            })}
          </svg>

          {/* Özel yıldızlar */}
          {tumYildizlar.map(y => (
            <div key={y.id}>
              <div
                className={`yildiz-nokta ${y.ozel ? 'yildiz-ozel' : 'yildiz-normal'}`}
                style={{ left: `${y.x * 100}%`, top: `${y.y * 100}%` }}
                onClick={e => { e.stopPropagation(); if (!eklemeMode) setSecili(secili?.id === y.id ? null : y) }}
                onTouchEnd={e => { e.stopPropagation(); if (!eklemeMode) setSecili(secili?.id === y.id ? null : y) }}
              />
              {/* Label */}
              {y.isim && (
                <div style={{
                  position: 'absolute',
                  left: `${y.x * 100}%`,
                  top: `calc(${y.y * 100}% + 10px)`,
                  transform: 'translateX(-50%)',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.48rem',
                  letterSpacing: '0.12em',
                  color: y.ozel ? 'rgba(90,184,255,0.7)' : 'rgba(184,132,58,0.7)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  textTransform: 'uppercase',
                }}>
                  {y.isim}
                </div>
              )}
            </div>
          ))}

          {/* Bekleyen pozisyon işareti */}
          {bekleyenPos && (
            <div style={{
              position: 'absolute',
              left: `${bekleyenPos.x * 100}%`,
              top: `${bekleyenPos.y * 100}%`,
              transform: 'translate(-50%,-50%)',
              width: '14px', height: '14px',
              borderRadius: '50%',
              border: '1.5px solid rgba(184,132,58,0.8)',
              animation: 'starPop 0.3s both',
            }}/>
          )}
        </div>

        {/* Seçili yıldız popup */}
        {secili && (
          <div className="fi1" style={{
            position: 'relative', zIndex: 3,
            marginTop: '1.5rem',
            maxWidth: '320px', width: '100%',
            border: '1px solid rgba(90,184,255,0.15)',
            padding: '1rem 1.2rem',
            background: 'rgba(6,8,16,0.92)',
          }}>
            <p style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: secili.ozel ? 'rgba(90,184,255,0.6)' : 'rgba(184,132,58,0.6)',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}>
              {secili.isim || '✦'}
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: '#F5F0E8',
              lineHeight: 1.6,
              marginBottom: secili.ozel ? 0 : '0.8rem',
            }}>
              {secili.not || 'bu yıldız burada.'}
            </p>
            {!secili.ozel && (
              <button
                onClick={() => yildizSil(secili.id)}
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: '0.5rem',
                  letterSpacing: '0.12em',
                  background: 'none', border: 'none',
                  color: 'rgba(245,240,232,0.25)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                sil
              </button>
            )}
            <button
              onClick={() => setSecili(null)}
              style={{
                position: 'absolute', top: '0.8rem', right: '0.8rem',
                background: 'none', border: 'none',
                color: 'rgba(245,240,232,0.3)',
                cursor: 'pointer', fontSize: '0.9rem',
              }}
            >×</button>
          </div>
        )}

        {/* Yeni yıldız formu */}
        {bekleyenPos && (
          <div className="fi1" style={{
            position: 'relative', zIndex: 3,
            marginTop: '1.5rem',
            maxWidth: '320px', width: '100%',
            border: '1px solid rgba(184,132,58,0.2)',
            padding: '1rem 1.2rem',
            background: 'rgba(6,8,16,0.95)',
          }}>
            <p style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              color: 'rgba(184,132,58,0.6)',
              textTransform: 'uppercase',
              marginBottom: '0.8rem',
            }}>
              yeni yıldız
            </p>
            <input
              value={notText}
              onChange={e => setNotText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && yildizEkle()}
              placeholder="kısa bir not..."
              autoFocus
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(184,132,58,0.2)',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1rem',
                color: '#F5F0E8',
                padding: '0.4rem 0',
                outline: 'none',
                caretColor: '#B8843A',
                marginBottom: '1rem',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => { setBekleyenPos(null); setNotText('') }}
                style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: '0.55rem',
                  letterSpacing: '0.1em', background: 'none', border: 'none',
                  color: 'rgba(245,240,232,0.3)', cursor: 'pointer',
                }}
              >iptal</button>
              <button
                onClick={yildizEkle}
                disabled={!notText.trim()}
                style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  background: notText.trim() ? '#B8843A' : 'none',
                  border: '1px solid rgba(184,132,58,0.4)',
                  color: notText.trim() ? '#060810' : 'rgba(184,132,58,0.4)',
                  padding: '0.5rem 1.2rem', cursor: notText.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
              >ekle ✦</button>
            </div>
          </div>
        )}

        {/* Alt butonlar */}
        <div className="fi3" style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: '1rem',
          marginTop: '2rem',
        }}>
          <button
            onClick={() => { setEklemeMode(m => !m); setBekleyenPos(null); setNotText(''); setSecili(null) }}
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              background: eklemeMode ? 'rgba(184,132,58,0.15)' : 'none',
              border: `1px solid ${eklemeMode ? 'rgba(184,132,58,0.6)' : 'rgba(245,240,232,0.1)'}`,
              color: eklemeMode ? '#B8843A' : 'rgba(245,240,232,0.4)',
              padding: '0.7rem 1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {eklemeMode ? '— iptal' : '+ yıldız ekle'}
          </button>
        </div>

        {eklemeMode && (
          <p style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.5rem',
            letterSpacing: '0.12em',
            color: 'rgba(184,132,58,0.4)',
            marginTop: '0.8rem',
            position: 'relative', zIndex: 2,
            textAlign: 'center',
          }}>
            haritaya dokun
          </p>
        )}

      </main>
    </>
  )
}