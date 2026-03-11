'use client'

import { useState, useEffect } from 'react'
import Cursor from '@/components/Cursor'

export default function DerbiPage() {
  const [bolum, setBolum] = useState(0)
  const [transferImza, setTransferImza] = useState(false)
  const [skorAcik, setSkorAcik] = useState(false)

  useEffect(() => {
    // Skor tablosu biraz gecikmeli açılsın
    const t = setTimeout(() => setSkorAcik(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        .fade-in { animation: fadeUp 0.8s ease both; }
        .fi1 { animation: fadeUp 0.7s ease both 0.1s; opacity:0; animation-fill-mode:forwards; }
        .fi2 { animation: fadeUp 0.7s ease both 0.3s; opacity:0; animation-fill-mode:forwards; }
        .fi3 { animation: fadeUp 0.7s ease both 0.5s; opacity:0; animation-fill-mode:forwards; }
        .fi4 { animation: fadeUp 0.7s ease both 0.7s; opacity:0; animation-fill-mode:forwards; }
        .fi5 { animation: fadeUp 0.7s ease both 0.9s; opacity:0; animation-fill-mode:forwards; }
        .fi6 { animation: fadeUp 0.7s ease both 1.1s; opacity:0; animation-fill-mode:forwards; }

        /* ── SKOR TABLOSU ── */
        .skor-wrap {
          border: 1px solid var(--light);
          padding: 2rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          max-width: 480px;
          width: 100%;
        }
        .skor-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,82,135,0.06) 0%, rgba(255,210,0,0.06) 50%, rgba(227,27,35,0.06) 100%);
        }
        .skor-header {
          font-family: 'Geist Mono', monospace;
          font-size: 0.70rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .skor-row {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }
        .takim-isim {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 1rem;
          letter-spacing: 0.05em;
        }
        .takim-isim.fb { color: #003580; }
        .takim-isim.gs { color: #e01e26; }
        .skor-sayi {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--fg);
          line-height: 1;
          letter-spacing: 0.1em;
        }
        .skor-alt {
          font-family: 'Geist Mono', monospace;
          font-size: 0.6rem;
          color: var(--muted);
          letter-spacing: 0.1em;
          margin-top: 0.3rem;
        }
        .takim-label {
          font-family: 'Geist Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 0.3rem;
        }
        .takim-label.fb { color: #003580; }
        .takim-label.gs { color: #e01e26; }
        .skor-sonuc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          color: var(--accent2);
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--light);
        }

        /* ── TRANSFER ── */
        .transfer-wrap {
          border: 1px solid var(--light);
          max-width: 480px;
          width: 100%;
          overflow: hidden;
        }
        .transfer-header {
          background: var(--fg);
          color: var(--bg);
          padding: 0.6rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .transfer-header-text {
          font-family: 'Geist Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .transfer-logo {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
        }
        .transfer-body {
          padding: 1.5rem;
          background: #FDFAF5;
        }
        .transfer-rozet {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #e01e26;
          color: white;
          padding: 0.3rem 0.8rem;
          font-family: 'Geist Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .transfer-baslik {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 400;
          color: var(--fg);
          line-height: 1.3;
          margin-bottom: 1rem;
        }
        .transfer-baslik span { color: #e01e26; font-style: italic; }
        .transfer-metin {
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem;
          color: var(--muted);
          line-height: 1.8;
          letter-spacing: 0.03em;
          margin-bottom: 1.2rem;
        }
        .transfer-detay {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          padding: 1rem;
          background: var(--light);
        }
        .transfer-detay-item {
          font-family: 'Geist Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.08em;
        }
        .transfer-detay-label { color: var(--muted); margin-bottom: 0.2rem; text-transform: uppercase; }
        .transfer-detay-value { color: var(--fg); font-weight: 400; }
        .transfer-imza-btn {
          width: 100%;
          background: var(--fg);
          color: var(--bg);
          border: none;
          padding: 0.8rem;
          font-family: 'Geist Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: background 0.2s;
          text-transform: uppercase;
        }
        .transfer-imza-btn:hover { background: var(--accent); }
        .transfer-imzalandi {
          text-align: center;
          padding: 1rem;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--accent2);
          font-size: 1rem;
          animation: fadeUp 0.5s ease both;
        }

        /* ── ZITLAR BİRLEŞİYOR ── */
        .zit-wrap {
          max-width: 480px;
          width: 100%;
          position: relative;
          height: 120px;
          overflow: hidden;
        }
        .zit-sol {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 50%;
          background: linear-gradient(to right, rgba(0,53,128,0.15), rgba(255,210,0,0.1));
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: #003580;
          animation: zitSolGel 1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .zit-sag {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 50%;
          background: linear-gradient(to left, rgba(227,27,35,0.12), rgba(255,210,0,0.1));
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-left: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: #e01e26;
          animation: zitSagGel 1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .zit-orta {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: var(--accent2);
          white-space: nowrap;
          z-index: 2;
          text-align: center;
          background: var(--bg);
          padding: 0 1rem;
        }
        @keyframes zitSolGel {
          from { transform: translateX(-30px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes zitSagGel {
          from { transform: translateX(30px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }

        .devam-btn {
          background: none;
          border: none;
          font-family: 'Geist Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--muted);
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s;
          margin-top: 0.5rem;
        }
        .devam-btn:hover { color: var(--accent); }
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
        gap: '3rem',
      }}>
        <Cursor />

        {/* ── BAŞLIK ── */}
        <div style={{ textAlign: 'center' }}>
          <p className="fi1" style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '0.8rem',
          }}>
            büyük derbi
          </p>
          <h1 className="fi2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--fg)',
            lineHeight: 1.2,
          }}>
            sen <span style={{ color: '#e01e26' }}>Galatasaray</span>,<br />
            ben <span style={{ color: '#003580' }}>Fenerbahçe</span>.<br />
          </h1>
          <p className="fi3" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--muted)',
            marginTop: '0.5rem',
          }}>
            yine de buradayız.
          </p>
        </div>

        {/* ── SKOR TABLOSU ── */}
        <div className={`skor-wrap fi3 ${skorAcik ? '' : ''}`}>
          <div className="skor-header">2026–∞ sezonu — kalıcı derbi</div>
          <div className="skor-row">
            <div>
              <div className="takim-isim fb">Fenerbahçe</div>
              <div className="takim-label fb">sen</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="skor-sayi">∞ - ∞</div>
              <div className="skor-alt">berabere — her zaman</div>
            </div>
            <div>
              <div className="takim-isim gs" style={{ textAlign: 'center' }}>Galatasaray</div>
              <div className="takim-label gs" style={{ textAlign: 'center' }}>ben</div>
            </div>
          </div>
          <p className="skor-sonuc">
            bu maçın galibi yok.<br />ikimiz de kazanmalıyız.
          </p>
        </div>

        {/* ── TRANSFER HABERİ ── */}
        <div className="transfer-wrap fi4">
          <div className="transfer-header">
            <span className="transfer-header-text">⚽ son dakika transfer haberi</span>
            <span className="transfer-logo">derbi.io</span>
          </div>
          <div className="transfer-body">
            <div className="transfer-rozet">
              🔴 resmi açıklama
            </div>
            <h2 className="transfer-baslik">
              Fenerbahçe taraftarı,<br />
              <span>Galatasaray kalbine</span> transfer oldu
            </h2>
            <p className="transfer-metin">
              Uzun süren müzakerelerin ardından taraflar anlaşmaya vardı.
              Transfer bedeli açıklanmadı. Kaynaklar, ödemenin "kafedeki
              bir rastlantı" olduğunu belirtti. Sözleşme süresiz olup
              fesih maddesi bulunmamaktadır.
            </p>
            <div className="transfer-detay">
              <div className="transfer-detay-item">
                <div className="transfer-detay-label">eski kulüp</div>
                <div className="transfer-detay-value" style={{ color: '#003580' }}>Fenerbahçe S.K.</div>
              </div>
              <div className="transfer-detay-item">
                <div className="transfer-detay-label">yeni kulüp</div>
                <div className="transfer-detay-value" style={{ color: '#e01e26' }}>Galatasaray A.Ş.*</div>
              </div>
              <div className="transfer-detay-item">
                <div className="transfer-detay-label">transfer türü</div>
                <div className="transfer-detay-value">kalıcı</div>
              </div>
              <div className="transfer-detay-item">
                <div className="transfer-detay-label">sözleşme</div>
                <div className="transfer-detay-value">ömür boyu</div>
              </div>
            </div>
            <p style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: '0.5rem',
              color: 'var(--muted)',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
            }}>
              * sözleşme şartı: her ne kadar kalplere transfer olsada tüm maçlarda Fenerbahçe desteği devam etmektedir.
            </p>
            {!transferImza ? (
              <button className="transfer-imza-btn" onClick={() => setTransferImza(true)}>
                imzala →
              </button>
            ) : (
              <div className="transfer-imzalandi">
                ✦ imzalandı. hoş geldin, bebe.
              </div>
            )}
          </div>
        </div>

        {/* ── ZITLAR BİRLEŞİYOR ── */}
        <div style={{ width: '100%', maxWidth: '480px' }} className="fi5">
          <div className="zit-wrap">
            <div className="zit-sol">⚽</div>
            <div className="zit-orta">
              ama ikimiz de<br />aynı şeyi istiyoruz
            </div>
            <div className="zit-sag">⚽</div>
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--accent2)',
            textAlign: 'center',
            marginTop: '1.5rem',
            lineHeight: 1.6,
          }}>
            kazanmak.<br />
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              (ve birlikte olmak.)
            </span>
          </p>
        </div>

      </main>
    </>
  )
}