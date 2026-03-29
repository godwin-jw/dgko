'use client'

import { useState, useEffect } from 'react'
import Cursor from '@/components/Cursor'
import Particles from '@/components/Particles'

// ─────────────────────────────────────────────
// BAŞLANGIÇ MADDELERİ — istediğin gibi değiştir
const BASLANGIC: Madde[] = [
  { id: '1', metin: 'shiba kafe\'ye tekrar gitmek', ekleyen: 'ben', yapildi: false },
  { id: '2', metin: 'birlikte film maratonu', ekleyen: 'ben', yapildi: false },
  { id: '3', metin: 'deniz kenarında yürümek', ekleyen: 'ben', yapildi: false },
  { id: '4', metin: 'sabah kahvaltısı yapmak', ekleyen: 'ben', yapildi: false },
  { id: '5', metin: 'birlikte kitap okumak', ekleyen: 'ben', yapildi: false },
]
// ─────────────────────────────────────────────

type Madde = {
  id: string
  metin: string
  ekleyen: 'ben' | 'o'
  yapildi: boolean
}

const STORAGE_KEY = 'fidan_liste'

export default function ListePage() {
  const [maddeler, setMaddeler] = useState<Madde[]>([])
  const [yeniMetin, setYeniMetin] = useState('')
  const [yeniEkleyen, setYeniEkleyen] = useState<'ben' | 'o'>('ben')
  const [eklemeAcik, setEklemeAcik] = useState(false)
  const [yuklendi, setYuklendi] = useState(false)

  useEffect(() => {
    try {
      const kayit = localStorage.getItem(STORAGE_KEY)
      if (kayit) { setMaddeler(JSON.parse(kayit)) } else { setMaddeler(BASLANGIC) }
    } catch { setMaddeler(BASLANGIC) }
    setYuklendi(true)
  }, [])

  useEffect(() => {
    if (!yuklendi) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(maddeler))
  }, [maddeler, yuklendi])

  const toggleYapildi = (id: string) => {
    setMaddeler(prev => prev.map(m => m.id === id ? { ...m, yapildi: !m.yapildi } : m))
  }

  const maddeEkle = () => {
    if (!yeniMetin.trim()) return
    const yeni: Madde = { id: Date.now().toString(), metin: yeniMetin.trim(), ekleyen: yeniEkleyen, yapildi: false }
    setMaddeler(prev => [...prev, yeni])
    setYeniMetin('')
    setEklemeAcik(false)
  }

  const maddeSil = (id: string) => {
    setMaddeler(prev => prev.filter(m => m.id !== id))
  }

  const yapilan = maddeler.filter(m => m.yapildi).length
  const toplam = maddeler.length
  const yuzdesi = toplam > 0 ? Math.round((yapilan / toplam) * 100) : 0

  return (
    <>
      <style>{`
        .fi1 { animation: fadeUp 0.7s ease both 0.1s; opacity:0; animation-fill-mode:forwards; }
        .fi2 { animation: fadeUp 0.7s ease both 0.3s; opacity:0; animation-fill-mode:forwards; }
        .fi3 { animation: fadeUp 0.7s ease both 0.5s; opacity:0; animation-fill-mode:forwards; }

        .madde-row {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1rem 0; border-bottom: 1px solid var(--light);
          animation: fadeUp 0.4s ease both;
        }
        .madde-row:last-child { border-bottom: none; }
        .madde-row.yapildi-row { opacity: 0.4; }

        .check-btn {
          width: 20px; height: 20px; border-radius: 50%;
          border: 1.5px solid var(--accent); background: none;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
          transition: background 0.2s, border-color 0.2s;
          color: var(--bg); font-size: 10px;
        }
        .check-btn:hover { background: rgba(106,44,44,0.15); }
        .check-btn.checked { background: var(--accent); border-color: var(--accent); }

        .madde-metin {
          flex: 1; font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: 1.05rem; line-height: 1.5;
          color: var(--fg); transition: all 0.3s;
        }
        .madde-metin.ustu-cizili {
          text-decoration: line-through;
          text-decoration-color: var(--accent);
          color: var(--muted);
        }

        .ekleyen-badge {
          font-family: 'Geist Mono', monospace; font-size: 0.5rem;
          letter-spacing: 0.1em; padding: 2px 6px; border-radius: 2px;
          flex-shrink: 0; margin-top: 4px;
        }
        .ekleyen-badge.ben {
          background: rgba(106,44,44,0.1); color: var(--accent);
          border: 1px solid rgba(106,44,44,0.2);
        }
        .ekleyen-badge.o {
          background: rgba(90,138,170,0.1); color: var(--accent2);
          border: 1px solid rgba(90,138,170,0.2);
        }

        .sil-btn {
          background: none; border: none; color: var(--light);
          cursor: pointer; font-size: 0.7rem; padding: 0;
          flex-shrink: 0; margin-top: 2px;
          opacity: 0; transition: opacity 0.2s;
        }
        .madde-row:hover .sil-btn { opacity: 1; }
        .sil-btn:hover { color: var(--muted); }

        .progress-wrap {
          width: 100%; height: 2px; background: var(--light);
          border-radius: 2px; overflow: hidden; margin-bottom: 0.5rem;
        }
        .progress-bar {
          height: 100%; background: var(--accent); border-radius: 2px;
          transition: width 0.6s cubic-bezier(0.22,1,0.36,1);
        }

        .ekle-form {
          border: 1px solid var(--light); padding: 1.2rem; margin-top: 1rem;
          animation: fadeUp 0.4s ease both;
          background: rgba(221,165,182,0.08);
        }
        .ekle-input {
          width: 100%; background: none; border: none;
          border-bottom: 1px solid var(--light);
          font-family: 'Cormorant Garamond', serif; font-size: 1rem;
          color: var(--fg); padding: 0.5rem 0; outline: none;
          margin-bottom: 1rem; caret-color: var(--accent);
        }
        .ekle-input::placeholder { color: var(--muted); opacity: 0.5; }

        .ekleyen-secim { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .ekleyen-btn {
          font-family: 'Geist Mono', monospace; font-size: 0.55rem;
          letter-spacing: 0.1em; padding: 0.4rem 0.8rem;
          border: 1px solid var(--light); background: none;
          cursor: pointer; color: var(--muted); transition: all 0.2s;
        }
        .ekleyen-btn.aktif {
          border-color: var(--accent); color: var(--accent);
          background: rgba(106,44,44,0.08);
        }

        .ekle-aksiyonlar { display: flex; justify-content: space-between; align-items: center; }
        .ekle-kaydet {
          font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.15em; background: var(--fg); border: none;
          color: var(--bg); padding: 0.6rem 1.4rem; cursor: pointer; transition: background 0.2s;
        }
        .ekle-kaydet:hover { background: var(--accent); }
        .ekle-kaydet:disabled { opacity: 0.3; cursor: not-allowed; background: none; border: 1px solid var(--light); color: var(--muted); }
        .ekle-iptal {
          font-family: 'Geist Mono', monospace; font-size: 0.55rem;
          letter-spacing: 0.1em; background: none; border: none;
          color: var(--muted); cursor: pointer; text-decoration: underline; text-underline-offset: 3px;
        }

        .ekle-ac-btn {
          width: 100%; background: none; border: 1px dashed var(--light);
          padding: 0.9rem; font-family: 'Geist Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.15em; color: var(--muted); cursor: pointer;
          margin-top: 1rem; transition: all 0.2s; text-transform: uppercase;
        }
        .ekle-ac-btn:hover { border-color: var(--accent); color: var(--accent); }
      `}</style>

      <main style={{
        minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '6rem 2rem 4rem',
        position: 'relative', zIndex: 3,
      }}>
        <Cursor />
        <Particles />

        <div style={{ maxWidth: '520px', width: '100%' }}>

          <div className="fi1" style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.6rem' }}>
              ikimizin listesi
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--fg)', lineHeight: 1.2, marginBottom: '0.4rem' }}>
              birlikte yapacaklarımız.
            </h1>
          </div>

          <div className="fi2" style={{ marginBottom: '2rem' }}>
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${yuzdesi}%` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.55rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                {yapilan} / {toplam} yapıldı
              </span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: '0.55rem', color: yuzdesi === 100 ? 'var(--accent)' : 'var(--muted)', letterSpacing: '0.1em' }}>
                {yuzdesi === 100 ? '✦ hepsi tamam' : `%${yuzdesi}`}
              </span>
            </div>
          </div>

          <div className="fi3">
            {maddeler.map(madde => (
              <div key={madde.id} className={`madde-row ${madde.yapildi ? 'yapildi-row' : ''}`}>
                <button className={`check-btn ${madde.yapildi ? 'checked' : ''}`} onClick={() => toggleYapildi(madde.id)} title={madde.yapildi ? 'geri al' : 'yapıldı'}>
                  {madde.yapildi ? '✓' : ''}
                </button>
                <span className={`madde-metin ${madde.yapildi ? 'ustu-cizili' : ''}`}>
                  {madde.metin}
                </span>
                <span className={`ekleyen-badge ${madde.ekleyen}`}>
                  {madde.ekleyen === 'ben' ? 'nurettin' : 'fidan'}
                </span>
                <button className="sil-btn" onClick={() => maddeSil(madde.id)} title="sil">×</button>
              </div>
            ))}

            {eklemeAcik ? (
              <div className="ekle-form">
                <input className="ekle-input" value={yeniMetin} onChange={e => setYeniMetin(e.target.value)} onKeyDown={e => e.key === 'Enter' && maddeEkle()} placeholder="ne yapmak istiyorsunuz?" autoFocus />
                <div className="ekleyen-secim">
                  <button className={`ekleyen-btn ${yeniEkleyen === 'ben' ? 'aktif' : ''}`} onClick={() => setYeniEkleyen('ben')}>nurettin</button>
                  <button className={`ekleyen-btn ${yeniEkleyen === 'o' ? 'aktif' : ''}`} onClick={() => setYeniEkleyen('o')}>fidan</button>
                </div>
                <div className="ekle-aksiyonlar">
                  <button className="ekle-iptal" onClick={() => { setEklemeAcik(false); setYeniMetin('') }}>iptal</button>
                  <button className="ekle-kaydet" onClick={maddeEkle} disabled={!yeniMetin.trim()}>ekle →</button>
                </div>
              </div>
            ) : (
              <button className="ekle-ac-btn" onClick={() => setEklemeAcik(true)}>+ yeni madde ekle</button>
            )}
          </div>

          {yuzdesi === 100 && maddeler.length > 0 && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: 'var(--accent2)', textAlign: 'center', marginTop: '2rem', animation: 'fadeUp 0.6s ease both' }}>
              hepsini yaptınız. ✦
            </p>
          )}

        </div>
      </main>
    </>
  )
}