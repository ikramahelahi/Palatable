import { useState } from 'react'
import '../shared/base.css'
import './ReviewScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

import imageAttachIcon from './icons/image-attach.svg'
import faceHappyMuted from './icons/face-happy-muted.svg'
import faceHappySelected from './icons/face-happy-selected.svg'
import faceSmileMuted from './icons/face-smile-muted.svg'
import faceSmileSelected from './icons/face-smile-selected.svg'
import faceMehMuted from './icons/face-meh-muted.svg'
import faceMehSelected from './icons/face-meh-selected.svg'
import faceFrownMuted from './icons/face-frown-muted.svg'
import faceFrownSelected from './icons/face-frown-selected.svg'
import faceAngryMuted from './icons/face-angry-muted.svg'
import faceAngrySelected from './icons/face-angry-selected.svg'

const RATING_OPTIONS = [
  { key: 'happy', label: 'Very happy', muted: faceHappyMuted, selected: faceHappySelected },
  { key: 'smile', label: 'Happy', muted: faceSmileMuted, selected: faceSmileSelected },
  { key: 'meh', label: 'Neutral', muted: faceMehMuted, selected: faceMehSelected },
  { key: 'frown', label: 'Unhappy', muted: faceFrownMuted, selected: faceFrownSelected },
  { key: 'angry', label: 'Very unhappy', muted: faceAngryMuted, selected: faceAngrySelected },
]

const COST_PER_PERSON_OPTIONS = ['<1000', '1000', '2000', '3000', '>3000']
const COST_PER_PERSON_DEFAULT_INDEX = 2
const LEGACY_VALUE_FOR_MONEY_MAP = {
  happy: '<1000',
  smile: '1000',
  meh: '2000',
  frown: '3000',
  angry: '>3000',
}

function getCostPerPersonIndex(value) {
  const normalizedValue = COST_PER_PERSON_OPTIONS.includes(value)
    ? value
    : LEGACY_VALUE_FOR_MONEY_MAP[value] ?? COST_PER_PERSON_OPTIONS[COST_PER_PERSON_DEFAULT_INDEX]

  return COST_PER_PERSON_OPTIONS.indexOf(normalizedValue)
}

const RATING_ROWS = [
  { key: 'foodQuality', label: 'Food Quality', defaultValue: null },
  { key: 'ambience', label: 'Ambience', defaultValue: null },
  { key: 'safety', label: 'Safety', defaultValue: null },
  { key: 'hygiene', label: 'Hygiene', defaultValue: null },
  { key: 'valueForMoney', label: 'Cost Per Person (Rs.)', defaultValue: null },
]

const COMPANION_TAGS = ['Family', 'Friends', 'Partner', 'Solo']

function RatingRow({ label, value, onSelect }) {
  return (
    <div className="rs-rating-row">
      <p className="rs-rating-row__label">{label}</p>
      <div className="rs-rating-row__options">
        {RATING_OPTIONS.map((option) => {
          const isSelected = value === option.key
          return (
            <button
              key={option.key}
              type="button"
              className="rs-emoji-button"
              aria-pressed={isSelected}
              aria-label={option.label}
              onClick={() => onSelect(option.key)}
            >
              <img
                src={isSelected ? option.selected : option.muted}
                alt=""
                className="icon icon--20"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CostPerPersonRow({ value, onSelect }) {
  const selectedIndex = getCostPerPersonIndex(value)

  return (
    <div className="rs-rating-row rs-rating-row--slider">
      <div className="rs-rating-row__slider">
        <p className="rs-rating-row__slider-label">Cost Per Person (Rs.)</p>
        <input
          type="range"
          min="0"
          max={COST_PER_PERSON_OPTIONS.length - 1}
          step="1"
          className="rs-slider"
          aria-label="Cost Per Person (Rs.)"
          value={selectedIndex}
          onChange={(event) => onSelect(COST_PER_PERSON_OPTIONS[Number(event.target.value)])}
        />
        <div className="rs-slider__ticks" aria-hidden="true">
          {COST_PER_PERSON_OPTIONS.map((option, index) => (
            <span key={option} className={`rs-slider__tick${index === selectedIndex ? ' rs-slider__tick--active' : ''}`}>
              {option}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ReviewScreen({ onBack, onGoHome, onOpenDiscover, onOpenFoodies, onOpenProfile, activeTab, initialRestaurant }) {
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(RATING_ROWS.map((row) => [row.key, row.defaultValue])),
  )
  const [companion, setCompanion] = useState('Family')
  const [restaurant, setRestaurant] = useState(initialRestaurant || '')
  const showToast = useToast()

  return (
    <div className="rs phone-screen">
      <header className="rs-header">
        <StatusBar />
        <div className="rs-header__content">
          <button type="button" className="rs-back" onClick={onBack} aria-label="Back to Home">
            &#8249;
          </button>
          <h1 className="rs-title">Post a Review</h1>
        </div>
      </header>

      <main className="rs-body">
        <div className="rs-field rs-field--restaurant">
          <label htmlFor="rs-restaurant" className="rs-field__label">
            Choose Restaurant
          </label>
          <input
            id="rs-restaurant"
            type="text"
            className="rs-input"
            placeholder="Type restaurant name..."
            value={restaurant}
            onChange={(event) => setRestaurant(event.target.value)}
          />
        </div>

        <label className="rs-field rs-field--textarea rs-field--describe">
          <span className="rs-field__label">Describe your experience</span>
          <span className="rs-field__control rs-field__control--textarea">
            <textarea className="rs-textarea" placeholder="Type here..." rows={1} />
            <button type="button" className="rs-attach" aria-label="Attach photo">
              <img src={imageAttachIcon} alt="" className="icon icon--24" />
            </button>
          </span>
        </label>

        <section className="rs-ratings">
          <p className="rs-section-label">Please provide your ratings</p>
          <div className="rs-ratings__card">
            {RATING_ROWS.map((row) => (
              row.key === 'valueForMoney' ? (
                <CostPerPersonRow
                  key={row.key}
                  value={ratings[row.key]}
                  onSelect={(value) => setRatings((prev) => ({ ...prev, [row.key]: value }))}
                />
              ) : (
                <RatingRow
                  key={row.key}
                  label={row.label}
                  value={ratings[row.key]}
                  onSelect={(value) => setRatings((prev) => ({ ...prev, [row.key]: value }))}
                />
              )
            ))}
          </div>
        </section>

        <p className="rs-section-label rs-section-label--companions">Who were you with?</p>
        <div className="rs-tags">
          {COMPANION_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`rs-tag${companion === tag ? ' rs-tag--active' : ''}`}
              onClick={() => setCompanion(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <label className="rs-field rs-field--textarea rs-field--note">
          <span className="rs-field__label">What cuisine did you order?</span>
          <span className="rs-field__control rs-field__control--textarea">
            <textarea className="rs-textarea" placeholder="Type here..." rows={1} />
          </span>
        </label>

        <div className="rs-actions">
          <button
            type="button"
            className="rs-button rs-button--primary"
            onClick={() => {
              showToast('Review posted')
              onBack()
            }}
          >
            Post Review
          </button>
          <button type="button" className="rs-button rs-button--secondary" onClick={onBack}>
            Cancel
          </button>
        </div>
      </main>

      <BottomTabBar
        activeTab={activeTab}
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
