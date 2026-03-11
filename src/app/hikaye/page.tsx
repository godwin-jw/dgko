'use client'

import { useState, useEffect } from 'react'
import Cursor from '@/components/Cursor'

type Asama =
  | 'giris'
  | 'bildirim'
  | 'hikaye_acik'
  | 'hikaye_silindi'
  | 'son'

export default function HikayePage() {
  const [asama, setAsama] = useState<Asama>('giris')
  const [sure, setSure] = useState(3)
  const [progress, setProgress] = useState(0)
  const [saat, setSaat] = useState('')

  useEffect(() => {
    const now = new Date()
    setSaat(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`)
  }, [])

  // Hikaye açıkken progress bar ve otomatik silme
  useEffect(() => {
    if (asama !== 'hikaye_acik') return

    const progressIv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressIv)
          return 100
        }
        return p + 1.2
      })
    }, 36)

    const silTimer = setTimeout(() => {
      setAsama('hikaye_silindi')
    }, 3000)

    return () => {
      clearInterval(progressIv)
      clearTimeout(silTimer)
    }
  }, [asama])

  // Giriş ekranında geri sayım
  useEffect(() => {
    if (asama !== 'giris') return
    const iv = setInterval(() => {
      setSure(s => {
        if (s <= 1) {
          clearInterval(iv)
          setAsama('bildirim')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [asama])

  return (
    <>
      <style>{`
        .fade-in  { animation: fadeUp 0.8s ease both; }
        .fi1 { animation: fadeUp 0.7s ease both 0.1s; opacity:0; animation-fill-mode:forwards; }
        .fi2 { animation: fadeUp 0.7s ease both 0.4s; opacity:0; animation-fill-mode:forwards; }
        .fi3 { animation: fadeUp 0.7s ease both 0.7s; opacity:0; animation-fill-mode:forwards; }
        .fi4 { animation: fadeUp 0.7s ease both 1.0s; opacity:0; animation-fill-mode:forwards; }

        /* Telefon */
        .telefon {
          width: 260px;
          height: 520px;
          background: #111;
          border-radius: 36px;
          border: 6px solid #222;
          position: relative;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05);
        }
        .telefon-notch {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 80px; height: 22px;
          background: #111;
          border-radius: 0 0 14px 14px;
          z-index: 10;
        }
        .telefon-ekran {
          width: 100%; height: 100%;
          background: #0a0a0a;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* WhatsApp status bar */
        .wa-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 16px 4px;
          font-size: 9px;
          color: #fff;
          font-family: 'Geist Mono', monospace;
          letter-spacing: 0.05em;
        }
        .wa-icons { display: flex; gap: 4px; align-items: center; }

        /* WhatsApp header */
        .wa-header {
          background: #1a1a2e;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .wa-header-back {
          color: #25D366;
          font-size: 14px;
          cursor: pointer;
        }
        .wa-header-title {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          color: #fff;
          letter-spacing: 0.08em;
        }
        .wa-header-sub {
          font-family: 'Geist Mono', monospace;
          font-size: 8px;
          color: #25D366;
          letter-spacing: 0.05em;
        }

        /* Hikaye halkası */
        .hikaye-halka-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0 10px;
          gap: 6px;
          cursor: pointer;
        }
        .hikaye-halka {
          width: 56px; height: 56px;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          position: relative;
          transition: transform 0.2s;
        }
        .hikaye-halka:hover { transform: scale(1.05); }
        .hikaye-halka-ic {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #222;
          border: 2px solid #111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .hikaye-isim {
          font-family: 'Geist Mono', monospace;
          font-size: 8px;
          color: #aaa;
          letter-spacing: 0.08em;
        }

        /* Bildirim balonu */
        .bildirim {
          margin: 8px 10px;
          background: #1f2937;
          border-radius: 12px;
          padding: 10px 12px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          animation: fadeUp 0.4s ease both;
          cursor: pointer;
          transition: background 0.2s;
          border: 1px solid rgba(37,211,102,0.2);
        }
        .bildirim:hover { background: #252f3d; }
        .bildirim-ikon {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f09433, #dc2743);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }
        .bildirim-metin {
          flex: 1;
        }
        .bildirim-baslik {
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          color: #fff;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }
        .bildirim-alt {
          font-family: 'Geist Mono', monospace;
          font-size: 8px;
          color: #25D366;
          letter-spacing: 0.05em;
        }
        .bildirim-saat {
          font-family: 'Geist Mono', monospace;
          font-size: 7px;
          color: #666;
        }

        /* Hikaye tam ekran */
        .hikaye-tam {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 20;
          display: flex;
          flex-direction: column;
        }
        .hikaye-progress {
          height: 2px;
          background: rgba(255,255,255,0.3);
          margin: 32px 10px 0;
          border-radius: 2px;
          overflow: hidden;
        }
        .hikaye-progress-bar {
          height: 100%;
          background: #fff;
          border-radius: 2px;
          transition: width 0.1s linear;
        }
        .hikaye-icerik {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          gap: 12px;
        }
        .hikaye-emoji { font-size: 40px; }
        .hikaye-yazi {
          font-family: 'Geist Mono', monospace;
          font-size: 11px;
          color: #fff;
          text-align: center;
          line-height: 1.6;
          letter-spacing: 0.08em;
        }
        .hikaye-yazi em {
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          display: block;
          margin-top: 6px;
          color: rgba(255,255,255,0.7);
        }
        .hikaye-alt {
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hikaye-cevapla {
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 20px;
          padding: 6px 16px;
          font-family: 'Geist Mono', monospace;
          font-size: 8px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.1em;
        }

        /* Silindi ekranı */
        .silindi-overlay {
          position: absolute;
          inset: 0;
          background: #000;
          z-index: 30;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: fadeUp 0.4s ease both;
        }
        .silindi-ikon { font-size: 28px; opacity: 0.4; }
        .silindi-yazi {
          font-family: 'Geist Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      `}</style>

      <main style={{
        minHeight: '100vh',
        background: 'var(--bg2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        zIndex: 3,
        gap: '3rem',
      }}>
        <Cursor />

        {/* Başlık */}
        <div style={{ textAlign: 'center' }}>
          <p className="fi1" style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(184,132,58,0.6)',
            marginBottom: '0.8rem',
          }}>
            bir dönem
          </p>
          <h1 className="fi2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            color: '#F5F0E8',
            lineHeight: 1.3,
          }}>
            hikaye atıyordu.<br />
            <span style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.8em' }}>ben bakmadan siliyordu.</span>
          </h1>
        </div>

        {/* Telefon */}
        <div className="fi3">
          <div className="telefon">
            <div className="telefon-notch" />
            <div className="telefon-ekran">

              {/* Status bar */}
              <div className="wa-status">
                <span>{saat}</span>
                <div className="wa-icons">
                  <span>▲</span>
                  <span>WiFi</span>
                  <span>●●●</span>
                </div>
              </div>

              {/* ── GİRİŞ ── */}
              {asama === 'giris' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f09433, #dc2743)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px',
                    animation: 'spin 3s linear infinite',
                  }}>🌸</div>
                  <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textAlign: 'center' }}>
                    yükleniyor...
                  </p>
                  <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '8px', color: '#25D366', letterSpacing: '0.08em' }}>
                    {sure > 0 ? `${sure}s` : ''}
                  </p>
                </div>
              )}

              {/* ── BİLDİRİM ── */}
              {asama === 'bildirim' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* WA Header */}
                  <div className="wa-header">
                    <div>
                      <div className="wa-header-title">WhatsApp</div>
                      <div className="wa-header-sub">durum güncellemeleri</div>
                    </div>
                  </div>

                  {/* Hikaye halkası */}
                  <div className="hikaye-halka-wrap" onClick={() => { setProgress(0); setAsama('hikaye_acik') }}>
                    <div className="hikaye-halka">
                      <div className="hikaye-halka-ic">🌸</div>
                    </div>
                    <span className="hikaye-isim">fidan</span>
                  </div>

                  {/* Bildirim */}
                  <div className="bildirim" onClick={() => { setProgress(0); setAsama('hikaye_acik') }}>
                    <div className="bildirim-ikon">🌸</div>
                    <div className="bildirim-metin">
                      <div className="bildirim-baslik">fidan</div>
                      <div className="bildirim-alt">1 yeni durum güncellendi</div>
                    </div>
                    <div className="bildirim-saat">{saat}</div>
                  </div>

                  <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '8px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '12px', letterSpacing: '0.08em' }}>
                    tıkla
                  </p>
                </div>
              )}

              {/* ── HİKAYE AÇIK ── */}
              {asama === 'hikaye_acik' && (
                <div className="hikaye-tam">
                  <div className="hikaye-progress">
                    <div className="hikaye-progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #f09433, #dc2743)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🌸</div>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: '9px', color: '#fff', letterSpacing: '0.08em' }}>fidan</span>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: '8px', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>{saat}</span>
                  </div>
                  <div className="hikaye-icerik">
                    <div className="hikaye-emoji">🌸</div>
                    <div className="hikaye-yazi">
                      merhaba
                      <em>görüyor musun beni?</em>
                    </div>
                  </div>
                  <div className="hikaye-alt">
                    <div className="hikaye-cevapla">cevapla...</div>
                  </div>
                </div>
              )}

              {/* ── SİLİNDİ ── */}
              {asama === 'hikaye_silindi' && (
                <>
                  <div className="hikaye-tam" style={{ background: '#0a0a0a' }}>
                    <div className="silindi-overlay">
                      <div className="silindi-ikon">🌸</div>
                      <div className="silindi-yazi">bu hikaye silindi</div>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Silindi sonrası yazılar */}
        {asama === 'hikaye_silindi' && (
          <div style={{ textAlign: 'center', maxWidth: '320px', animation: 'fadeUp 0.8s ease both 0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.1rem',
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.7,
              marginBottom: '1rem',
            }}>
              ama baktığını biliyordu.
            </p>
            <button
              onClick={() => { setAsama('son') }}
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                background: 'none',
                border: 'none',
                color: 'rgba(184,132,58,0.6)',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              devam →
            </button>
          </div>
        )}

        {/* Son ekran */}
        {asama === 'son' && (
          <div style={{ textAlign: 'center', maxWidth: '360px', animation: 'fadeUp 0.8s ease both', opacity: 0, animationFillMode: 'forwards' }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: '#F5F0E8',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}>
              hikayeler silinir.<br />
              ama bazı şeyler<br />
              silinmez.
            </p>
          </div>
        )}

      </main>
    </>
  )
}