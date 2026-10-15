import { useState } from 'react'
import '../shared/base.css'
import './DiningHabitsScreen.css'
import StatusBar from '../shared/StatusBar'

const COMPANIONS = ['Friends', 'Family', 'Partner', 'Solo']
const FREQUENCIES = ['Weekly', 'Rarely', 'Once every 2 months', 'Several times a week']
const OCCASIONS = ['Catching up with friends', 'Date nights', 'Quick everyday meals', 'Family outings', 'Celebrations/special occasions', 'Work meetings']

export default function DiningHabitsScreen({ onBack, onNext }) {
  const [companions, setCompanions] = useState([])
  const [frequency, setFrequency] = useState(null)
  const [occasions, setOccasions] = useState([])
  const canContinue = companions.length > 0 && frequency && occasions.length > 0

  const toggleCompanion = (companion) => setCompanions((current) =>
    current.includes(companion) ? current.filter((item) => item !== companion) : [...current, companion]
  )

  const toggleOccasion = (occasion) => setOccasions((current) =>
    current.includes(occasion) ? current.filter((item) => item !== occasion) : [...current, occasion]
  )

  return (
    <div className="dhs phone-screen">
      <header className="dhs-header"><StatusBar /></header>
      <main className="dhs-content">
        <div className="dhs-title-section">
          <h1 className="dhs-title">Palatable</h1>
          <p className="dhs-subtitle">Discover your next favourite meal</p>
        </div>
        <section className="dhs-sheet" aria-label="Dining habits">
          <div className="dhs-progress" aria-label="Step 3 of 4"><span className="dhs-progress__active" /><span className="dhs-progress__active" /><span /><span /></div>
          <div className="dhs-scroll-area">
            <MultiChoiceSection title="Who do you usually dine with?" options={COMPANIONS} selected={companions} onToggle={toggleCompanion} />
            <ChoiceSection title="How often do you eat out?" options={FREQUENCIES} value={frequency} onChange={setFrequency} />
            <div className="dhs-section dhs-section--occasions">
              <h2 className="dhs-heading">What occasions do you usually dine out for?</h2>
              <p className="dhs-helper">Select all that apply</p>
              <div className="dhs-chips">
                {OCCASIONS.map((occasion) => {
                  const selected = occasions.includes(occasion)
                  return <button key={occasion} type="button" className={`dhs-chip${selected ? ' dhs-chip--selected' : ''}`} aria-pressed={selected} onClick={() => toggleOccasion(occasion)}>{occasion}</button>
                })}
              </div>
            </div>
          </div>
          <div className="dhs-actions">
            <button className="dhs-back" type="button" onClick={onBack}>Back</button>
            <button className="dhs-next" type="button" disabled={!canContinue} onClick={() => canContinue && onNext({ companions, frequency, occasions })}>Next</button>
          </div>
        </section>
      </main>
      <div className="dhs-home-indicator"><div className="dhs-home-indicator__bar" /></div>
    </div>
  )
}

function ChoiceSection({ title, options, value, onChange }) {
  return <div className="dhs-section">
    <h2 className="dhs-heading">{title}</h2>
    <div className="dhs-chips dhs-chips--single" role="radiogroup" aria-label={title}>
      {options.map((option) => {
        const selected = value === option
        return <button key={option} type="button" className={`dhs-chip${selected ? ' dhs-chip--selected' : ''}`} role="radio" aria-checked={selected} onClick={() => onChange(option)}>{option}</button>
      })}
    </div>
  </div>
}

function MultiChoiceSection({ title, options, selected, onToggle }) {
  return <div className="dhs-section">
    <h2 className="dhs-heading">{title}</h2>
    <div className="dhs-chips" aria-label={title}>
      {options.map((option) => {
        const active = selected.includes(option)
        return <button key={option} type="button" className={`dhs-chip${active ? ' dhs-chip--selected' : ''}`} aria-pressed={active} onClick={() => onToggle(option)}>{option}</button>
      })}
    </div>
  </div>
}
