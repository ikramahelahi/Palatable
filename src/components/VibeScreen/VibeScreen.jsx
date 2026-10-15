import { useState } from 'react'
import '../shared/base.css'
import './VibeScreen.css'
import StatusBar from '../shared/StatusBar'

const VIBES = [
  'I stick to what I know and trust',
  'I love trying something new',
  'Bit of both depending on mood',
]

export default function VibeScreen({ onBack, onFinish }) {
  const [vibe, setVibe] = useState(null)

  return <div className="vs phone-screen">
    <header className="vs-header"><StatusBar /></header>
    <main className="vs-content">
      <div className="vs-title-section">
        <h1 className="vs-title">Palatable</h1>
        <p className="vs-subtitle">Discover your next favourite meal</p>
      </div>
      <section className="vs-sheet" aria-label="Dining vibe">
        <div className="vs-progress" aria-label="Step 5 of 5"><span /><span /><span /><span /></div>
        <h2 className="vs-heading">What's your vibe when trying new<br />places?</h2>
        <div className="vs-options" role="radiogroup" aria-label="Your dining vibe">
          {VIBES.map((option) => {
            const selected = vibe === option
            return <button key={option} type="button" className={`vs-option${selected ? ' vs-option--selected' : ''}`} role="radio" aria-checked={selected} onClick={() => setVibe(option)}>{option}</button>
          })}
        </div>
        <div className="vs-actions">
          <button className="vs-back" type="button" onClick={onBack}>Back</button>
          <button className="vs-finish" type="button" disabled={!vibe} onClick={() => vibe && onFinish(vibe)}>Finish</button>
        </div>
      </section>
    </main>
    <div className="vs-home-indicator"><div className="vs-home-indicator__bar" /></div>
  </div>
}
