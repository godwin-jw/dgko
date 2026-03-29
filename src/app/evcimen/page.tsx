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
    const iv1 = setInterval(() => setPencere1(p => !p), 3200)
    const iv2 = setInterval(() => setPencere2(p => !p), 4700)
    return () => { clearInterval(iv1); clearInterval(iv2) }
  }, [])

  return (
    <>
      <style>{`
        .fi1 { animation: fadeUp 0.7s ease both 0.2s; opacity:0; animation-fill-mode:forwards; }
        .fi2 { animation: fadeUp 0.7s ease both 0.5s; opacity:0; animation-fill-mode:forwards; }
        .fi3 { animation: fadeUp 0.7s ease both 0.8s; opacity:0; animation-fill-mode:forwards; }
        .fi4 { animation: fadeUp 0.7s ease both 1.1s; opacity:0; animation-fill-mode:forwards; }
        .fi5 { animation: fadeUp 0.7s ease both 1.4s; opacity:0; animation-fill-mode:forwards; }

        @keyframes dumanYuksel {
          0%   { transform: translateX(-50%) translateY(0) scale(0.8); opacity:0.7; }
          100% { transform: translateX(-50%) translateY(-24px) scale(1.5); opacity:0; }
        }
        @keyframes pencereIsi {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }

        .ev-wrap {
          position: relative;
          width: 240px;
          cursor: pointer;
          filter: drop-shadow(0 8px 32px rgba(106,44,44,0.18));
          transition: filter 0.3s, transform 0.3s;
        }
        .ev-wrap:hover {
          filter: drop-shadow(0 16px 48px rgba(106,44,44,0.28));
          transform: translateY(-4px);
        }
        .ev-wrap:active { transform: translateY(-2px); }

        /* Çatı */
        .cati {
          width: 0; height: 0;
          border-left: 120px solid transparent;
          border-right: 120px solid transparent;
          border-bottom: 88px solid var(--accent);
          position: relative; z-index: 2;
          transition: border-bottom-color 0.4s;
        }
        .ev-wrap:hover .cati { border-bottom-color: var(--accent2); }

        /* Çatı detay çizgisi */
        .cati-iz {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 100%;
          width: 0; height: 0;
          border-left: 112px solid transparent;
          border-right: 112px solid transparent;
          border-bottom: 82px solid rgba(255,255,255,0.06);
          z-index: 3;
          pointer-events: none;
        }

        /* Baca */
        .baca {
          position: absolute;
          top: -38px; left: 148px;
          width: 22px; height: 38px;
          background: var(--fg);
          z-index: 3;
          border-radius: 2px 2px 0 0;
        }
        .baca::after {
          content: '';
          position: absolute;
          top: -3px; left: -3px; right: -3px;
          height: 6px;
          background: var(--accent);
          border-radius: 2px;
        }
        .duman {
          position: absolute;
          top: -10px; left: 50%;
          transform: translateX(-50%);
          font-size: 1.1rem;
          animation: dumanYuksel 2.4s ease-in-out infinite;
          opacity: 0.7;
        }
        .duman:nth-child(2) { animation-delay: 0.8s; font-size: 0.85rem; left: 40%; }

        /* Gövde */
        .govde {
          width: 240px; height: 168px;
          background: #f5e6ec;
          border: 2px solid var(--accent);
          border-top: none;
          position: relative; z-index: 1;
        }

        /* Tuğla desen */
        .govde::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(106,44,44,0.06) 18px,
              rgba(106,44,44,0.06) 19px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 38px,
              rgba(106,44,44,0.04) 38px,
              rgba(106,44,44,0.04) 39px
            );
          pointer-events: none;
        }

        /* Kapı */
        .kapi-wrap {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 54px; height: 78px;
          perspective: 400px;
        }
        .kapi {
          width: 54px; height: 78px;
          background: var(--accent);
          border-radius: 27px 27px 0 0;
          position: relative;
          transform-origin: left center;
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
          backface-visibility: hidden;
        }
        .kapi::before {
          content: '';
          position: absolute;
          top: 12px; left: 50%; right: 6px;
          bottom: 20px;
          border: 1px solid rgba(245,230,236,0.25);
          border-radius: 20px 20px 0 0;
        }
        .kapi-kol {
          position: absolute;
          right: 9px; top: 50%;
          transform: translateY(-50%);
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #f5e6ec;
          box-shadow: 0 0 4px rgba(106,44,44,0.3);
        }

        /* Pencereler */
        .pencere {
          position: absolute;
          width: 44px; height: 44px;
          border: 2px solid var(--accent);
          top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 2px; padding: 3px;
          transition: background 0.5s;
          background: rgba(221,165,182,0.08);
        }
        .pencere.sol { left: 18px; }
        .pencere.sag { right: 18px; }
        .pencere::before {
          content: '';
          position: absolute;
          top: -6px; left: 50%;
          transform: translateX(-50%);
          width: 2px; height: 6px;
          background: var(--accent);
          opacity: 0.5;
        }
        .pencere.acik {
          background: rgba(197,225,240,0.2);
          animation: pencereIsi 2s ease-in-out infinite;
        }
        .pencere-cam { background: transparent; transition: background 0.5s; }
        .pencere.acik .pencere-cam { background: rgba(197,225,240,0.3); }

        /* Zemin */
        .zemin {
          height: 10px;
          background: linear-gradient(to right, transparent, var(--accent), transparent);
          opacity: 0.2;
          margin-top: -1px;
        }

        /* Yol */
        .yol {
          width: 44px; height: 20px;
          background: linear-gradient(to bottom, var(--accent), transparent);
          opacity: 0.15;
          margin: 0 auto;
        }

        /* Cevap butonları */
        .cevap-btn {
          background: none;
          border: 1px solid rgba(106,44,44,0.2);
          padding: 0.75rem 1.8rem;
          cursor: pointer;
          font-family: 'Geist Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: var(--fg);
          transition: all 0.25s;
          border-radius: 0;
        }
        .cevap-btn:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg);
        }
        .cevap-btn.secili {
          background: var(--accent);
          border-color: var(--accent);
          color: var(--bg);
        }

        /* Hint text */
        .kapi-hint {
          font-family: 'Geist Mono', monospace;
          font-size: 0.52rem;
          letter-spacing: 0.14em;
          color: var(--muted);
          opacity: 0.55;
          transition: opacity 0.3s;
          text-align: center;
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

        {/* Label */}
        <p className="fi1" style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '0.8rem',
        }}>
          evcimen (sıfat)
        </p>

        {/* Tanım */}
        <h1 className="fi2" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.3rem, 3vw, 2rem)',
          color: 'var(--fg)',
          textAlign: 'center',
          maxWidth: '400px',
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
          >
            {/* Çatı + baca */}
            <div style={{ position: 'relative' }}>
              <div className="baca">
                <span className="duman">☁</span>
                <span className="duman" style={{ animationDelay: '0.8s', fontSize: '0.85rem', left: '40%' }}>☁</span>
              </div>
              <div className="cati">
                <div className="cati-iz" />
              </div>
            </div>

            {/* Gövde */}
            <div className="govde">
              <div className={`pencere sol ${pencere1 ? 'acik' : ''}`}>
                <div className="pencere-cam" /><div className="pencere-cam" />
                <div className="pencere-cam" /><div className="pencere-cam" />
              </div>
              <div className={`pencere sag ${pencere2 ? 'acik' : ''}`}>
                <div className="pencere-cam" /><div className="pencere-cam" />
                <div className="pencere-cam" /><div className="pencere-cam" />
              </div>
              <div className="kapi-wrap">
                <div className="kapi" style={{ transform: `rotateY(${kapi ? '-65deg' : '0deg'})` }}>
                  <div className="kapi-kol" />
                </div>
              </div>
            </div>

            {/* Zemin + yol */}
            <div className="zemin" />
            <div className="yol" />
          </div>
        )}

        {/* Kapı hint */}
        <p className="fi3 kapi-hint" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
          {kapi ? 'kapı açık — girecek misin?' : 'eve dokun →'}
        </p>

        {/* Ayırıcı */}
        <div className="fi4" style={{
          width: '100%', maxWidth: '320px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(106,44,44,0.2), transparent)',
          marginBottom: '2.5rem',
        }} />

        {/* Soru */}
        <div className="fi4" style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: 'var(--fg)',
            marginBottom: '1.5rem',
            letterSpacing: '0.02em',
            opacity: 0.8,
          }}>
            peki bu tanım kime göre?
          </p>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
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
        </div>

        {/* Cevap tepkisi */}
        {cevap && (
          <p className="fi5" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--accent)',
            marginTop: '1.8rem',
            maxWidth: '340px',
            textAlign: 'center',
            lineHeight: 1.6,
            letterSpacing: '0.02em',
          }}>
            {cevap === 'ben'
              ? 'yani sen de evcimensin. iyi ki. zaten ikimiz de çıkmıyoruz.'
              : 'haklısın. ama evcimen olmak seninle güzel.'}
          </p>
        )}

      </main>
    </>
  )
}