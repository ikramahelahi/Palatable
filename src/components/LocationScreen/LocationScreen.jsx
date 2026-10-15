import { useState } from 'react'
import '../shared/base.css'
import './LocationScreen.css'
import StatusBar from '../shared/StatusBar'

const LOCATIONS = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi']

export default function LocationScreen({ onStart }) {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleStart = () => {
    if (selectedLocation) onStart(selectedLocation)
  }

  return (
    <div className="lps phone-screen">
      <header className="lps-header">
        <StatusBar />
      </header>

      <main className="lps-content">
        <div className="lps-title-section">
          <h1 className="lps-title">Palatable</h1>
          <p className="lps-subtitle">Discover your next favourite meal</p>
        </div>

        <section className="lps-sheet" aria-labelledby="location-heading">
          <div className="lps-intro">
            <h2 id="location-heading" className="lps-heading">Let's personalize your experience</h2>
            <p className="lps-description">This helps us tailor restaurant recommendations<br />just for you</p>
          </div>

          <div className="lps-location-section">
            <h3 className="lps-question">Where are you based?</h3>
            <p className="lps-helper">Select your city</p>
            <div className="lps-options" role="radiogroup" aria-label="Your city">
              {LOCATIONS.map((location) => {
                const isSelected = selectedLocation === location
                return (
                  <button
                    key={location}
                    type="button"
                    className={`lps-option${isSelected ? ' lps-option--selected' : ''}`}
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            className="lps-start-button"
            disabled={!selectedLocation}
            onClick={handleStart}
          >
            Start
          </button>
        </section>
      </main>

      <div className="lps-home-indicator"><div className="lps-home-indicator__bar" /></div>
    </div>
  )
}
