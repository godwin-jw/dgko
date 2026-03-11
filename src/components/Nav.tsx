'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/biz',       label: 'biz' },
  { href: '/quiz',      label: 'quiz' },
  { href: '/mektup',    label: 'mektup' },
  { href: '/evcimen',   label: 'evcimen' },
  { href: '/derbi',     label: 'derbi ⚽' },
  { href: '/hikaye',    label: 'hikaye' },
  { href: '/liste',     label: 'liste' },
  { href: '/kalp',      label: 'kalp ♡' },
  { href: '/dogumgunu', label: '16.05' },
  { href: '/bebe',      label: '✦' },
]

export default function Nav() {
  const pathname = usePathname()
  const [acik, setAcik] = useState(false)
  const [mobil, setMobil] = useState(false)

  useEffect(() => {
    const kontrol = () => setMobil(window.innerWidth < 768)
    kontrol()
    window.addEventListener('resize', kontrol)
    return () => window.removeEventListener('resize', kontrol)
  }, [])

  useEffect(() => { setAcik(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = acik ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [acik])

  if (pathname === '/') return null

  return (
    <>
      <style>{`
        .nav-link-item {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          font-family: 'Geist Mono', monospace;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .hamburger-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          z-index: 60;
          position: relative;
        }
        .hamburger-cizgi {
          width: 22px;
          height: 1.5px;
          background: var(--fg);
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.2s, width 0.3s;
          transform-origin: center;
          display: block;
        }
        .hamburger-btn.acik .hamburger-cizgi:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .hamburger-btn.acik .hamburger-cizgi:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .hamburger-btn.acik .hamburger-cizgi:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }
        .mobil-menu {
          position: fixed;
          inset: 0;
          z-index: 40;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          padding: 6rem 2.5rem 3rem;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .mobil-menu.acik {
          transform: translateX(0);
        }
        .mobil-nav-link {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: 2rem;
          font-style: italic;
          color: var(--muted);
          text-decoration: none;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--light);
          transition: color 0.2s, padding-left 0.2s;
          display: block;
          letter-spacing: 0.02em;
        }
        .mobil-nav-link:last-child { border-bottom: none; }
        .mobil-nav-link:hover { color: var(--fg); padding-left: 0.5rem; }
        .mobil-nav-link.aktif { color: var(--accent); }
        .mobil-imza {
          margin-top: auto;
          padding-top: 2rem;
          font-family: 'Geist Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          color: var(--muted);
          opacity: 0.4;
          text-transform: uppercase;
        }
      `}</style>

      {/* Nav bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.5rem 2.5rem',
        background: acik ? 'var(--bg)' : 'transparent',
        transition: 'background 0.3s',
      }}>
        <Link href="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '1.1rem',
          color: 'var(--accent)',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          zIndex: 60,
          position: 'relative',
        }}>
          f.
        </Link>

        {/* Desktop */}
        {!mobil && (
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="nav-link-item" style={{
                color: pathname === href ? 'var(--fg)' : 'var(--muted)',
                borderBottom: pathname === href ? '1px solid var(--accent)' : 'none',
              }}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {mobil && (
          <button
            className={`hamburger-btn ${acik ? 'acik' : ''}`}
            onClick={() => setAcik(a => !a)}
            aria-label="menü"
          >
            <span className="hamburger-cizgi" />
            <span className="hamburger-cizgi" />
            <span className="hamburger-cizgi" />
          </button>
        )}
      </nav>

      {/* Mobil menü */}
      {mobil && (
        <div className={`mobil-menu ${acik ? 'acik' : ''}`}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`mobil-nav-link ${pathname === href ? 'aktif' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="mobil-imza">fidan için ✦</p>
        </div>
      )}
    </>
  )
}