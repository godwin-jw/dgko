'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/biz',       label: 'biz' },
  { href: '/quiz',      label: 'quiz' },
  { href: '/mektup',    label: 'mektup' },
  { href: '/evcimen',   label: 'evcimen' },
  { href: '/derbi',     label: '⚽' },
  { href: '/hikaye',    label: 'hikaye' },
  { href: '/liste',     label: 'liste' },
  { href: '/kalp',      label: '♡' },
  { href: '/dogumgunu', label: '16.05' },
  { href: '/bebe',      label: '✦' },
]

export default function Nav() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.5rem 2.5rem',
    }}>
      <Link href="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: '1.1rem',
        color: 'var(--accent)',
        letterSpacing: '0.05em',
        textDecoration: 'none',
      }}>
        f.
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} style={{
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: pathname === href ? 'var(--fg)' : 'var(--muted)',
            textDecoration: 'none',
            fontFamily: "'Geist Mono', monospace",
            transition: 'color 0.2s',
            borderBottom: pathname === href ? '1px solid var(--accent)' : 'none',
            paddingBottom: '2px',
          }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}