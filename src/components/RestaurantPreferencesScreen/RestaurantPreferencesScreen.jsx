import { useState } from 'react'
import '../shared/base.css'
import './RestaurantPreferencesScreen.css'
import StatusBar from '../shared/StatusBar'

const PRIORITIES = ['Value for Money', 'Ambience', 'Safety', 'Family-Friendliness', 'Speed of Service']
const AMBIENCES = ['Quiet & Peaceful', 'Aesthetic/Instagrammable', 'Lively & Social', 'Outdoor Seating', 'Family-Friendly Space', 'Study/Work-Friendly', 'Women-Friendly/Safe Space']

export default function RestaurantPreferencesScreen({ onBack, onNext }) {
  const [priorities, setPriorities] = useState([])
  const [ambiances, setAmbiances] = useState([])
  const canContinue = priorities.length > 0 && ambiances.length > 0

  const togglePriority = (priority) => setPriorities((current) => {
    if (current.includes(priority)) return current.filter((item) => item !== priority)
    return current.length < 3 ? [...current, priority] : current
  })
  const toggleAmbiance = (ambiance) => setAmbiances((current) =>
    current.includes(ambiance) ? current.filter((item) => item !== ambiance) : [...current, ambiance]
  )

  return <div className="rps phone-screen">
    <header className="rps-header"><StatusBar /></header>
    <main className="rps-content">
      <div className="rps-title-section">
        <h1 className="rps-title">Palatable</h1>
        <p className="rps-subtitle">Discover your next favourite meal</p>
      </div>
      <section className="rps-sheet" aria-label="Restaurant preferences">
        <div className="rps-progress" aria-label="Step 4 of 4"><span className="rps-progress__active" /><span className="rps-progress__active" /><span className="rps-progress__active" /><span /></div>
        <PreferenceGroup title="What matters most when choosing a restaurant?" helper="Select up to 3" options={PRIORITIES} selected={priorities} onToggle={togglePriority} limit={3} />
        <PreferenceGroup title="What kind of ambience do you look for?" helper="Select all that apply" options={AMBIENCES} selected={ambiances} onToggle={toggleAmbiance} />
        <div className="rps-actions">
          <button className="rps-back" type="button" onClick={onBack}>Back</button>
          <button className="rps-next" type="button" disabled={!canContinue} onClick={() => canContinue && onNext({ priorities, ambiances })}>Next</button>
        </div>
      </section>
    </main>
    <div className="rps-home-indicator"><div className="rps-home-indicator__bar" /></div>
  </div>
}

function PreferenceGroup({ title, helper, options, selected, onToggle, limit }) {
  return <div className="rps-section">
    <h2 className="rps-heading">{title}</h2>
    <p className="rps-helper">{helper}</p>
    <div className="rps-chips">
      {options.map((option) => {
        const active = selected.includes(option)
        return <button key={option} type="button" className={`rps-chip${active ? ' rps-chip--selected' : ''}`} aria-pressed={active} disabled={Boolean(limit && selected.length >= limit && !active)} onClick={() => onToggle(option)}>{option}</button>
      })}
    </div>
  </div>
}
