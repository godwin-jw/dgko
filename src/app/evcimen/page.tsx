'use client'

import { useState, useEffect } from 'react'
import Cursor from '@/components/Cursor'
import Particles from '@/components/Particles'

export default function EvcimensPage() {
  const [kapi, setKapi] = useState(false)
  const [pencere1, setPencere1] = useState(false)
  const [pencere2, setPencere2] = useState(false)
  const [cevap, setCevap] = useState<'ben' | 'sen' | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Işıklar rastgele yanıp sönsün
    const iv1 = setInterval(() => setPencere1(p => !p), 3200)
    const iv2 = setInterval(() => setPencere2(p => !p), 4700)
    return () => { clearInterval(iv1); clearInterval(iv2) }
  }, [])

  return (
    <>
      <style>{`
        .fade-in { animation: fadeUp 0.8s ease both; }
        .fi1 { animation: fadeUp 0.7s ease both 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .fi2 { animation: fadeUp 0.7s ease both 0.5s; opacity: 0; animation-fill-mode: forwards; }
        .fi3 { animation: fadeUp 0.7s ease both 0.8s; opacity: 0; animation-fill-mode: forwards; }
        .fi4 { animation: fadeUp 0.7s ease both 1.1s; opacity: 0; animation-fill-mode: forwards; }

        .ev-wrap {
          position: relative;
          width: 220px;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .ev-wrap:hover { transform: translateY(-6px); }

        /* Çatı */
        .cati {
          width: 0;
          height: 0;
          border-left: 110px solid transparent;
          border-right: 110px solid transparent;
          border-bottom: 80px solid var(--accent);
          position: relative;
          z-index: 2;
          transition: border-bottom-color 0.3s;
        }
        .ev-wrap:hover .cati { border-bottom-color: var(--accent2); }

        /* Baca */
        .baca {
          position: absolute;
          top: -30px;
          left: 130px;
          width: 20px;
          height: 35px;
          background: var(--fg);
          z-index: 3;
        }
        .duman {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1rem;
          animation: dumanYuksel 2s ease-in-out infinite;
          opacity: 0.6;
        }
        @keyframes dumanYuksel {
          0%   { transform: translateX(-50%) translateY(0) scale(0.8); opacity: 0.6; }
          100% { transform: translateX(-50%) translateY(-20px) scale(1.4); opacity: 0; }
        }

        /* Gövde */
        .govde {
          width: 220px;
          height: 160px;
          background: #F0EAE0;
          border: 2px solid var(--accent);
          position: relative;
          z-index: 1;
          border-top: none;
        }

        /* Kapı */
        .kapi-wrap {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 52px;
          height: 75px;
          perspective: 300px;
        }
        .kapi {
          width: 52px;
          height: 75px;
          background: var(--accent);
          border-radius: 26px 26px 0 0;
          position: relative;
          transform-origin: left center;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
          transform: rotateY(${kapi ? '-60deg' : '0deg'});
          backface-visibility: hidden;
        }
        .kapi-kol {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F0EAE0;
        }

        /* Pencereler */
        .pencere {
          position: absolute;
          width: 42px;
          height: 42px;
          border: 2px solid var(--accent);
          top: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 2px;
          padding: 2px;
          transition: background 0.4s;
        }
        .pencere.sol { left: 20px; }
        .pencere.sag { right: 20px; }
        .pencere.acik { background: rgba(212,165,90,0.25); }
        .pencere-cam {
          background: transparent;
          transition: background 0.4s;
        }
        .pencere.acik .pencere-cam { background: rgba(212,165,90,0.35); }

        /* Zemin */
        .zemin {
          width: 260px;
          height: 12px;
          background: linear-gradient(to right, transparent, var(--accent), transparent);
          opacity: 0.3;
          margin-top: -1px;
        }

        /* Cevap butonları */
        .cevap-btn {
          background: none;
          border: 1px solid var(--light);
          padding: 0.7rem 1.6rem;
          cursor: pointer;
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--fg);
          transition: all 0.25s;
        }
        .cevap-btn:hover, .cevap-btn.secili {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg);
        }
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
        gap: 0,
      }}>
        <Cursor />
        <Particles />

        {/* Üst label */}
        <p className="fi1" style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '1rem',
        }}>
          evcimen (sıfat)
        </p>

        {/* Tanım */}
        <h1 className="fi2" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          color: 'var(--fg)',
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: 1.5,
          marginBottom: '3rem',
        }}>
          evden çıkmayan, ama<br />
          seninle her yere gidebilen.
        </h1>

        {/* Ev */}
        {mounted && (
          <div
            className="fi3 ev-wrap"
            onClick={() => setKapi(k => !k)}
            title="tıkla"
          >
            {/* Çatı + baca */}
            <div style={{ position: 'relative' }}>
              <div className="baca">
                <span className="duman">☁</span>
              </div>
              <div className="cati" />
            </div>

            {/* Gövde */}
            <div className="govde">
              {/* Sol pencere */}
              <div className={`pencere sol ${pencere1 ? 'acik' : ''}`}>
                <div className="pencere-cam" />
                <div className="pencere-cam" />
                <div className="pencere-cam" />
                <div className="pencere-cam" />
              </div>

              {/* Sağ pencere */}
              <div className={`pencere sag ${pencere2 ? 'acik' : ''}`}>
                <div className="pencere-cam" />
                <div className="pencere-cam" />
                <div className="pencere-cam" />
                <div className="pencere-cam" />
              </div>

              {/* Kapı */}
              <div className="kapi-wrap">
                <div className="kapi" style={{ transform: `rotateY(${kapi ? '-60deg' : '0deg'})` }}>
                  <div className="kapi-kol" />
                </div>
              </div>
            </div>

            {/* Zemin çizgisi */}
            <div className="zemin" style={{ width: '260px', marginLeft: '-20px' }} />
          </div>
        )}

        {/* Kapı hint */}
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.55rem',
          color: 'var(--muted)',
          letterSpacing: '0.12em',
          marginTop: '0.8rem',
          marginBottom: '3rem',
          opacity: 0.6,
        }}>
          {kapi ? 'kapı açık. girecek misin?' : 'kapa tıkla →'}
        </p>

        {/* Soru */}
        <div className="fi4" style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--muted)',
            marginBottom: '1.5rem',
            letterSpacing: '0.03em',
          }}>
            peki bu tanım kime göre?
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              className={`cevap-btn ${cevap === 'ben' ? 'secili' : ''}`}
              onClick={() => setCevap('ben')}
            >
              bana göre
            </button>
            <button
              className={`cevap-btn ${cevap === 'sen' ? 'secili' : ''}`}
              onClick={() => setCevap('sen')}
            >
              sana göre
            </button>
          </div>

          {/* Cevaba göre tepki */}
          {cevap && (
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--accent2)',
              marginTop: '1.5rem',
              animation: 'fadeUp 0.6s ease both',
              letterSpacing: '0.03em',
            }}>
              {cevap === 'ben'
                ? 'yani sen de evcimensin. iyi ki. zaten ikimiz de çıkmıyoruz.'
                : 'haklısın. ama evcimen olmak seninle güzel.'}
            </p>
          )}
        </div>

      </main>
    </>
  )
}