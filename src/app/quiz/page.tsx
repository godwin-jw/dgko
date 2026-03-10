'use client'

import { useState } from 'react'
import Cursor from '@/components/Cursor'
import Particles from '@/components/Particles'

const questions = [
  {
    q: 'İlk nerede karşılaştınız?',
    opts: ['Tinder\'da', 'Shiba Kafe\'de', 'Ortak bir arkadaşla', 'Instagram\'da'],
    correct: 1,
    feedback: 'shiba kafe. o günü hiç unutmam. ✦',
  },
  {
    q: 'Sana nasıl hitap ediyor?',
    opts: ['canım', 'tatlım', 'bebe', 'güzelim'],
    correct: 2,
    feedback: 'bebe. ağzımdan öyle çıktı, kaldı. 🤍',
  },
  {
    q: 'Bu siteyi neden yaptı?',
    opts: ['Sıkıldığı için', 'Özür dilemek için', 'Seni düşündüğü için', 'Ödev vardı'],
    correct: 2,
    feedback: 'başka sebebi yok. sadece seni düşündüğü için.',
  },
  {
    q: 'Sen ne diyorsun genellikle?',
    opts: ['"tamam tamam"', '"bilmiyorum ki"', '"ben akışına bırakıyorum"', '"sen karar ver"'],
    correct: 2,
    feedback: '"ben akışına bırakıyorum, genel olarak." — klasik. 😄',
  },
  {
    q: 'Bu site daha bitti mi?',
    opts: ['Evet, tamam', 'Hayır, büyüyecek', 'Hep yarım kalır', 'Fark etmez'],
    correct: 1,
    feedback: 'hayır. seninle birlikte büyüyecek. 🤍',
  },
]

const resultMessages = [
  { min: 100, msg: 'mükemmel. zaten biliyordum, sen her şeyi bilirsin. 🤍' },
  { min: 80,  msg: 'çok iyisin. bir sonraki versiyonda daha zor sorular var.' },
  { min: 60,  msg: 'fena değil. ama beni biraz daha tanıman lazım.' },
  { min: 0,   msg: 'endişelenme. hâlâ zaman var. 😄' },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [finished, setFinished] = useState(false)

  const q = questions[current]
  const pct = Math.round((score / questions.length) * 100)
  const resultMsg = resultMessages.find(r => pct >= r.min)!.msg

  const handleAnswer = (i: number) => {
    if (selected !== null) return
    setSelected(i)
    if (i === q.correct) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  const handleReset = () => {
    setCurrent(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  return (
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

      <div style={{ width: '100%', maxWidth: '520px', textAlign: 'center' }}>

        {/* Label */}
        <p style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '1rem',
          animation: 'fadeUp 0.8s ease both 0.2s',
          opacity: 0,
          animationFillMode: 'forwards',
        }}>
          seni test ediyorum
        </p>

        {!finished ? (
          <>
            {/* Title */}
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              marginBottom: '0.5rem',
              lineHeight: 1.1,
              animation: 'fadeUp 0.8s ease both 0.4s',
              opacity: 0,
              animationFillMode: 'forwards',
            }}>
              bizi ne kadar<br />tanıyorsun?
            </h1>

            {/* Progress dots */}
            <div style={{
              display: 'flex',
              gap: '0.4rem',
              justifyContent: 'center',
              marginBottom: '2.5rem',
              marginTop: '1rem',
              animation: 'fadeUp 0.8s ease both 0.5s',
              opacity: 0,
              animationFillMode: 'forwards',
            }}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: i < current ? 'var(--accent)' : i === current ? 'var(--fg)' : 'var(--light)',
                  transition: 'background 0.3s',
                }} />
              ))}
            </div>

            {/* Question */}
            <p key={current} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem',
              marginBottom: '2rem',
              lineHeight: 1.4,
              minHeight: '4rem',
              animation: 'fadeUp 0.5s ease both',
            }}>
              {q.q}
            </p>

            {/* Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.8rem',
              marginBottom: '1.5rem',
            }}>
              {q.opts.map((opt, i) => {
                let borderColor = 'var(--light)'
                let color = 'var(--fg)'
                let bg = 'none'

                if (selected !== null) {
                  if (i === q.correct) {
                    borderColor = '#7BAE7F'; color = '#7BAE7F'; bg = 'rgba(123,174,127,0.08)'
                  } else if (i === selected && i !== q.correct) {
                    borderColor = '#C47A7A'; color = '#C47A7A'; bg = 'rgba(196,122,122,0.08)'
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    style={{
                      background: bg,
                      border: `1px solid ${borderColor}`,
                      padding: '0.9rem 1rem',
                      cursor: selected !== null ? 'default' : 'pointer',
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      color,
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={e => {
                      if (selected === null) {
                        e.currentTarget.style.borderColor = 'var(--accent)'
                        e.currentTarget.style.color = 'var(--accent)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (selected === null) {
                        e.currentTarget.style.borderColor = 'var(--light)'
                        e.currentTarget.style.color = 'var(--fg)'
                      }
                    }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Feedback */}
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--muted)',
              minHeight: '1.5rem',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
              fontFamily: "'Geist Mono', monospace",
            }}>
              {selected !== null ? q.feedback : ''}
            </p>

            {/* Next button */}
            {selected !== null && (
              <button
                onClick={handleNext}
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  fontFamily: "'Geist Mono', monospace",
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  animation: 'fadeUp 0.4s ease both',
                }}
              >
                {current + 1 >= questions.length ? 'sonucu gör →' : 'devam →'}
              </button>
            )}
          </>
        ) : (
          /* Result screen */
          <div style={{ animation: 'fadeUp 0.6s ease both' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '5rem',
              fontWeight: 300,
              color: 'var(--accent)',
              lineHeight: 1,
            }}>
              {score}/{questions.length}
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1.3rem',
              margin: '1rem 0 0.5rem',
              lineHeight: 1.4,
            }}>
              {resultMsg}
            </p>
            <p style={{
              fontSize: '0.65rem',
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              fontFamily: "'Geist Mono', monospace",
              marginBottom: '2rem',
            }}>
              {pct}% doğru
            </p>
            <button
              onClick={handleReset}
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontFamily: "'Geist Mono', monospace",
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
              }}
            >
              tekrar oyna
            </button>
          </div>
        )}
      </div>
    </main>
  )
}