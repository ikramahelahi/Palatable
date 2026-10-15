import { useState } from 'react'
import '../shared/base.css'
import './PreferencesScreen.css'
import StatusBar from '../shared/StatusBar'

const CUISINES = [
  'Pakistani', 'Asian', 'Fast-Food', 'Continental', 'Middle-Eastern',
  'Mexican', 'Seafood', 'Bakery', 'Coffee',
]
const BUDGETS = ['Under Rs. 1,000', 'Rs. 1,000–2,500', 'Rs. 2,500–5,000', 'Rs. 5,000+']

export default function PreferencesScreen({ onBack, onNext }) {
  const [cuisines, setCuisines] = useState([])
  const [budget, setBudget] = useState(null)
  const canContinue = cuisines.length > 0 && budget !== null

  const toggleCuisine = (cuisine) => {
    setCuisines((current) => {
      if (current.includes(cuisine)) return current.filter((item) => item !== cuisine)
      if (current.length >= 5) return current
      return [...current, cuisine]
    })
  }

  return (
    <div className="ps phone-screen">
      <header className="ps-header"><StatusBar /></header>
      <main className="ps-content">
        <div className="ps-title-section">
          <h1 className="ps-title">Palatable</h1>
          <p className="ps-subtitle">Discover your next favourite meal</p>
        </div>

        <section className="ps-sheet" aria-label="Taste preferences">
          <div className="ps-progress" aria-label="Step 2 of 2"><span className="ps-progress__active" /><span /><span /><span /></div>
          <div className="ps-section">
            <h2 className="ps-heading">What cuisines do you enjoy most?</h2>
            <p className="ps-helper">Select up to 5</p>
            <div className="ps-chips" aria-label="Cuisines">
              {CUISINES.map((cuisine) => {
                const selected = cuisines.includes(cuisine)
                const atLimit = cuisines.length >= 5 && !selected
                return <button key={cuisine} type="button" className={`ps-chip${selected ? ' ps-chip--selected' : ''}`} aria-pressed={selected} disabled={atLimit} onClick={() => toggleCuisine(cuisine)}>{cuisine}</button>
              })}
            </div>
          </div>
          <div className="ps-section ps-section--budget">
            <h2 className="ps-heading">What's your typical budget?</h2>
            <p className="ps-helper">Average spend per person</p>
            <div className="ps-chips" role="radiogroup" aria-label="Typical budget">
              {BUDGETS.map((option) => {
                const selected = budget === option
                return <button key={option} type="button" className={`ps-chip ps-chip--budget${selected ? ' ps-chip--selected' : ''}`} role="radio" aria-checked={selected} onClick={() => setBudget(option)}>{option}</button>
              })}
            </div>
          </div>
          <div className="ps-actions">
            <button className="ps-back" type="button" onClick={onBack}>Back</button>
            <button className="ps-next" type="button" disabled={!canContinue} onClick={() => canContinue && onNext({ cuisines, budget })}>Next</button>
          </div>
        </section>
      </main>
      <div className="ps-home-indicator"><div className="ps-home-indicator__bar" /></div>
    </div>
  )
}
