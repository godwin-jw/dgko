'use client'

import { useEffect, useRef, useState } from 'react'
import Cursor from '@/components/Cursor'
import Particles from '@/components/Particles'

// ─────────────────────────────────────────────
// MEKTUBUNU BURAYA YAZ
// Her paragraf ayrı bir string olsun.
const MEKTUP_PARAGRAFLARI = [
  'Merhaba bebe,',
  'Buraya mektubunun ilk paragrafını yaz.',
  'İkinci paragraf...',
  'Üçüncü paragraf...',
  '— senin yazılımcın',
]
// ─────────────────────────────────────────────

const STORAGE_KEY = 'fidan_mektup_cevap'

type Adim = 'kapali' | 'aciliyor' | 'mektup' | 'cevap_yaziliyor' | 'cevap_tamam'

export default function MektupPage() {
  const [adim, setAdim] = useState<Adim>('kapali')
  const [cevap, setCevap] = useState('')
  const [kayitliCevap, setKayitliCevap] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const kayit = localStorage.getItem(STORAGE_KEY)
    if (kayit) setKayitliCevap(kayit)
  }, [])

  const zarfiAc = () => {
    setAdim('aciliyor')
    setTimeout(() => setAdim('mektup'), 900)
  }

  const cevapYaz = () => {
    setAdim('cevap_yaziliyor')
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  const cevapKaydet = () => {
    if (!cevap.trim()) return
    localStorage.setItem(STORAGE_KEY, cevap.trim())
    setKayitliCevap(cevap.trim())
    setCevap('')
    setAdim('cevap_tamam')
  }

  const cevapDuzenle = () => {
    setCevap(kayitliCevap || '')
    setAdim('cevap_yaziliyor')
    setTimeout(() => textareaRef.current?.focus(), 100)
  }

  return (
    <>
      <style>{`
        @keyframes zarfAcil {
          from { transform: rotateX(0deg); }
          to   { transform: rotateX(180deg); }
        }
        .zarf-kapak-acik {
          animation: zarfAcil 0.8s ease forwards;
          transform-origin: top center;
        }
        .fade-in { animation: fadeUp 0.8s ease both; }
        .fi1 { animation: fadeUp 0.7s ease both 0.10s; opacity: 0; animation-fill-mode: forwards; }
        .fi2 { animation: fadeUp 0.7s ease both 0.25s; opacity: 0; animation-fill-mode: forwards; }
        .fi3 { animation: fadeUp 0.7s ease both 0.40s; opacity: 0; animation-fill-mode: forwards; }
        .fi4 { animation: fadeUp 0.7s ease both 0.55s; opacity: 0; animation-fill-mode: forwards; }
        .fi5 { animation: fadeUp 0.7s ease both 0.70s; opacity: 0; animation-fill-mode: forwards; }
        .fi-delay { animation: fadeUp 0.8s ease both 0.3s; opacity: 0; animation-fill-mode: forwards; }
        .spin-slow { animation: spin 8s linear infinite; }
        .zarf-box { transition: transform 0.3s, box-shadow 0.3s; }
        .zarf-box:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(26,20,16,0.14) !important; }
        .btn-fill { transition: background 0.25s, color 0.25s; }
        .btn-fill:hover { background: var(--fg) !important; color: var(--bg) !important; }
        .btn-muted:hover { color: var(--accent) !important; }
        textarea::placeholder { color: var(--muted); opacity: 0.6; }
      `}</style>

      <main style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        zIndex: 3,
      }}>
        <Cursor />
        <Particles />

        {/* ── ZARF ── */}
        {(adim === 'kapali' || adim === 'aciliyor') && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              sana bir şey var
            </p>

            <div className="zarf-box" onClick={zarfiAc} style={{
              width: '200px', height: '140px', background: '#FDFAF5',
              border: '1px solid var(--light)', position: 'relative',
              cursor: 'pointer', boxShadow: '0 4px 24px rgba(26,20,16,0.08)',
            }}>
              <div className={adim === 'aciliyor' ? 'zarf-kapak-acik' : ''} style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '70px',
                background: 'var(--light)', clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '100%', background: 'rgba(232,224,208,0.5)', clipPath: 'polygon(0 100%, 100% 50%, 0 0)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '100%', background: 'rgba(232,224,208,0.5)', clipPath: 'polygon(100% 100%, 0 50%, 100% 0)' }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'var(--accent)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: 'var(--bg)', fontSize: '0.9rem', zIndex: 2,
              }}>✦</div>
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>
              aç bakalım.
            </p>
          </div>
        )}

        {/* ── MEKTUP TEK ── */}
        {adim === 'mektup' && !kayitliCevap && (
          <div className="fade-in" style={{ maxWidth: '560px', width: '100%' }}>
            <MektupIcerik />
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button className="btn-fill" onClick={cevapYaz} style={{
                fontFamily: "'Geist Mono', monospace", fontSize: '0.65rem',
                letterSpacing: '0.15em', background: 'none',
                border: '1px solid var(--fg)', padding: '0.8rem 2rem',
                cursor: 'pointer', color: 'var(--fg)',
              }}>
                cevap yaz →
              </button>
            </div>
          </div>
        )}

        {/* ── MEKTUP + CEVAP ── */}
        {adim === 'mektup' && kayitliCevap && (
          <div className="fade-in" style={{
            display: 'grid', gridTemplateColumns: '1fr 1px 1fr',
            gap: '3rem', maxWidth: '900px', width: '100%', alignItems: 'start',
          }}>
            <MektupIcerik />
            <div style={{ background: 'var(--light)', alignSelf: 'stretch' }} />
            <CevapGorunum cevap={kayitliCevap} onDuzenle={cevapDuzenle} />
          </div>
        )}

        {/* ── CEVAP YAZILIYOR ── */}
        {adim === 'cevap_yaziliyor' && (
          <div className="fade-in" style={{ maxWidth: '560px', width: '100%' }}>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2rem', textAlign: 'center' }}>
              cevabın
            </p>
            <textarea
              ref={textareaRef}
              value={cevap}
              onChange={e => setCevap(e.target.value)}
              placeholder="ne hissediyorsan yaz..."
              style={{
                width: '100%', minHeight: '260px', background: 'none',
                border: 'none', borderBottom: '1px solid var(--light)',
                fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem',
                lineHeight: 1.9, color: 'var(--fg)', resize: 'none',
                outline: 'none', padding: '1rem 0', caretColor: 'var(--accent)', display: 'block',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {cevap.length > 0 ? `${cevap.length} karakter` : ''}
              </span>
              <button
                onClick={cevapKaydet}
                disabled={!cevap.trim()}
                style={{
                  fontFamily: "'Geist Mono', monospace", fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  background: cevap.trim() ? 'var(--fg)' : 'none',
                  border: '1px solid var(--fg)', padding: '0.7rem 1.8rem',
                  cursor: cevap.trim() ? 'pointer' : 'not-allowed',
                  color: cevap.trim() ? 'var(--bg)' : 'var(--muted)',
                  opacity: cevap.trim() ? 1 : 0.5, transition: 'all 0.3s',
                }}
              >
                kaydet ✦
              </button>
            </div>
          </div>
        )}

        {/* ── CEVAP TAMAM ── */}
        {adim === 'cevap_tamam' && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <span className="spin-slow" style={{ fontSize: '2rem', display: 'block', marginBottom: '1.5rem', color: 'var(--accent)' }}>✦</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--fg)', marginBottom: '1rem', lineHeight: 1.2 }}>
              kaydedildi.
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: 'var(--muted)', marginBottom: '2rem' }}>
              her zaman burada olacak.
            </p>
            <button className="btn-muted" onClick={() => setAdim('mektup')} style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px', transition: 'color 0.2s' }}>
              mektubu tekrar oku
            </button>
          </div>
        )}
      </main>
    </>
  )
}

function MektupIcerik() {
  const cls = ['fi1', 'fi2', 'fi3', 'fi4', 'fi5']
  return (
    <div>
      <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2.5rem' }}>
        sana bir mektup
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
        {MEKTUP_PARAGRAFLARI.map((paragraf, i) => (
          <p key={i} className={cls[Math.min(i, cls.length - 1)]} style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: '1.05rem', lineHeight: 1.9,
            color: i === 0 || i === MEKTUP_PARAGRAFLARI.length - 1 ? 'var(--accent2)' : 'var(--fg)',
            fontStyle: i === MEKTUP_PARAGRAFLARI.length - 1 ? 'italic' : 'normal',
          }}>
            {paragraf}
          </p>
        ))}
      </div>
    </div>
  )
}

function CevapGorunum({ cevap, onDuzenle }: { cevap: string; onDuzenle: () => void }) {
  return (
    <div className="fi-delay">
      <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2.5rem' }}>
        senin cevabın
      </p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: 'var(--fg)', whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>
        {cevap}
      </p>
      <button className="btn-muted" onClick={onDuzenle} style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '4px', transition: 'color 0.2s' }}>
        düzenle
      </button>
    </div>
  )
}