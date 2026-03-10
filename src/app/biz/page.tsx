'use client'

import Cursor from '@/components/Cursor'
import Particles from '@/components/Particles'

const timelineItems = [
  {
    side: 'left',
    date: 'başlangıç',
    title: 'Shiba Kafe',
    desc: 'plan yoktu, davet yoktu.\nsadece oradaydın. yeterliydi.',
    tooltip: 'her şey buradan başladı',
    delay: 0.2,
  },
  {
    side: 'right',
    date: 'birkaç gün sonra',
    title: 'ilk mesaj',
    desc: 'ne yazdığımı tam bilmiyordum.\nama gönderdim. iyi ki.',
    tooltip: 'sonunda yazdım işte',
    delay: 0.5,
  },
  {
    side: 'left',
    date: 'bir süre sonra',
    title: 'bebe oldu',
    desc: 'bir anda öyle çıktı ağzımdan.\nitiraz etmedi. kaldı.',
    tooltip: '♡',
    delay: 0.8,
  },
  {
    side: 'right',
    date: 'bugün',
    title: 've devam ediyor',
    desc: 'sen "akışına bırakıyorum" diyorsun.\nben kod yazıyorum. dengeli.',
    tooltip: 'hâlâ buradayız ✦',
    delay: 1.1,
    highlight: true,
  },
]

export default function BizPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg2)',
      color: '#F5F0E8',
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

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '1rem',
          animation: 'fadeUp 0.8s ease both 0.2s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          nasıl başladı
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          color: '#F5F0E8',
          lineHeight: 1.1,
          animation: 'fadeUp 0.8s ease both 0.4s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          bir kafe, iki insan,<br />çok fazla tesadüf
        </h1>
      </div>

      {/* Timeline */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '540px',
        position: 'relative',
      }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, var(--accent), transparent)',
          transform: 'translateX(-50%)',
        }} />

        {timelineItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 40px 1fr',
              alignItems: 'center',
              marginBottom: '2.5rem',
              opacity: 0,
              animation: `fadeUp 0.7s ease forwards ${item.delay}s`,
              animationFillMode: 'forwards',
            }}
          >
            {/* Left content */}
            <div style={{ textAlign: 'right', paddingRight: '1.5rem' }}>
              {item.side === 'left' && <TimelineContent item={item} />}
            </div>

            {/* Dot */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                className="tl-dot-wrap"
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: item.highlight ? 'var(--accent2)' : 'var(--accent)',
                  boxShadow: item.highlight ? '0 0 8px var(--accent2)' : 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }} />
                <div style={{
                  position: 'absolute',
                  background: 'var(--accent)',
                  color: 'var(--bg2)',
                  fontSize: '0.6rem',
                  padding: '0.3rem 0.7rem',
                  whiteSpace: 'nowrap',
                  top: '-2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  letterSpacing: '0.05em',
                  pointerEvents: 'none',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  fontFamily: "'Geist Mono', monospace",
                }} className="tl-tooltip">
                  {item.tooltip}
                </div>
              </div>
            </div>

            {/* Right content */}
            <div style={{ paddingLeft: '1.5rem' }}>
              {item.side === 'right' && <TimelineContent item={item} />}
            </div>
          </div>
        ))}
      </div>

      {/* Signature quote */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        marginTop: '1rem',
        width: '100%',
        maxWidth: '540px',
        opacity: 0,
        animation: 'fadeUp 0.9s ease forwards 1.4s',
        animationFillMode: 'forwards',
      }}>
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(184,132,58,0.35), transparent)',
        }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', whiteSpace: 'nowrap' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.05rem',
            color: 'var(--accent2)',
            letterSpacing: '0.04em',
          }}>
            &ldquo;ben akışına bırakıyorum&rdquo;
          </span>
          <span style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: '0.5rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(184,132,58,0.4)',
          }}>
            genel olarak &nbsp;—&nbsp; fidan
          </span>
        </div>
        <div style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(184,132,58,0.35), transparent)',
        }} />
      </div>

      {/* Tooltip hover styles */}
      <style>{`
        .tl-dot-wrap:hover .tl-tooltip { opacity: 1 !important; }
        .tl-dot-wrap:hover > div:first-child {
          transform: scale(1.6);
          box-shadow: 0 0 12px var(--accent2) !important;
        }
      `}</style>
    </main>
  )
}

function TimelineContent({ item }: { item: typeof timelineItems[0] }) {
  return (
    <>
      <div style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--accent2)',
        marginBottom: '0.3rem',
      }}>
        {item.date}
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: '1.1rem',
        color: '#F5F0E8',
        lineHeight: 1.2,
        marginBottom: '0.3rem',
      }}>
        {item.title}
      </div>
      <div style={{
        fontSize: '0.65rem',
        color: '#7A6E62',
        lineHeight: 1.6,
        whiteSpace: 'pre-line',
        fontFamily: "'Geist Mono', monospace",
      }}>
        {item.desc}
      </div>
    </>
  )
}