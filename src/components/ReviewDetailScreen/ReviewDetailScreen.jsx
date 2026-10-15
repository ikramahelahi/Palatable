import '../shared/base.css'
import './ReviewDetailScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

import heartOutlineIcon from '../../assets/home-feed/icons/heart-outline.svg'
import heartFilledIcon from '../../assets/home-feed/icons/heart-filled.svg'
import messageSquareIcon from '../../assets/home-feed/icons/message-square.svg'
import bookmarkIcon from '../../assets/home-feed/icons/bookmark.svg'
import bookmarkSavedIcon from '../../assets/home-feed/icons/bookmark-saved.svg'

import faceHappyMuted from '../ReviewScreen/icons/face-happy-muted.svg'
import faceHappySelected from '../ReviewScreen/icons/face-happy-selected.svg'
import faceSmileMuted from '../ReviewScreen/icons/face-smile-muted.svg'
import faceSmileSelected from '../ReviewScreen/icons/face-smile-selected.svg'
import faceMehMuted from '../ReviewScreen/icons/face-meh-muted.svg'
import faceMehSelected from '../ReviewScreen/icons/face-meh-selected.svg'
import faceFrownMuted from '../ReviewScreen/icons/face-frown-muted.svg'
import faceFrownSelected from '../ReviewScreen/icons/face-frown-selected.svg'
import faceAngryMuted from '../ReviewScreen/icons/face-angry-muted.svg'
import faceAngrySelected from '../ReviewScreen/icons/face-angry-selected.svg'

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
  { key: 'foodQuality', label: 'Food Quality' },
  { key: 'ambience', label: 'Ambience' },
  { key: 'safety', label: 'Safety' },
  { key: 'hygiene', label: 'Hygiene' },
  { key: 'valueForMoney', label: 'Cost Per Person (Rs.)' },
]

function RatingRow({ label, value }) {
  return (
    <div className="rd-rating-row">
      <p className="rd-rating-row__label">{label}</p>
      <div className="rd-rating-row__options">
        {RATING_OPTIONS.map((option) => (
          <img
            key={option.key}
            src={value === option.key ? option.selected : option.muted}
            alt={value === option.key ? option.label : ''}
            className="icon icon--20"
          />
        ))}
      </div>
    </div>
  )
}

function CostPerPersonRow({ value }) {
  const selectedIndex = getCostPerPersonIndex(value)

  return (
    <div className="rd-rating-row rd-rating-row--slider">
      <div className="rd-rating-row__slider">
        <p className="rd-rating-row__slider-label">Cost Per Person (Rs.)</p>
        <input
          type="range"
          min="0"
          max={COST_PER_PERSON_OPTIONS.length - 1}
          step="1"
          className="rd-slider"
          aria-label="Cost Per Person (Rs.)"
          value={selectedIndex}
          disabled
          readOnly
        />
        <div className="rd-slider__ticks" aria-hidden="true">
          {COST_PER_PERSON_OPTIONS.map((option, index) => (
            <span key={option} className={`rd-slider__tick${index === selectedIndex ? ' rd-slider__tick--active' : ''}`}>
              {option}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ReviewDetailScreen({
  review,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenComments,
  activeTab,
  isLiked,
  isSaved,
  onToggleLike,
  onToggleSave,
}) {
  const showToast = useToast()

  if (!review) return null

  return (
    <div className="rd phone-screen">
      <header className="rd-header">
        <StatusBar />
        <div className="rd-header__content">
          <button type="button" className="rd-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <h1 className="rd-title">{review.restaurantName} Review</h1>
        </div>
        <div className="rd-tags">
          <span className="rd-tag rd-tag--user">{review.username}</span>
          {review.companionTag && <span className="rd-tag rd-tag--companion">{review.companionTag}</span>}
          {review.cuisineTag && <span className="rd-tag rd-tag--cuisine">{review.cuisineTag}</span>}
        </div>
      </header>

      <main className="rd-body">
        <p className="rd-text">{review.text}</p>

        {review.image && (
          <div className="rd-photo">
            <img src={review.image} alt={review.imageAlt || ''} className="rd-photo__img" />
          </div>
        )}

        <div className="rd-engagement">
          <div className="rd-engagement__stats">
            <button
              type="button"
              className="rd-stat rd-stat--like"
              aria-pressed={isLiked}
              aria-label={isLiked ? 'Unlike review' : 'Like review'}
              onClick={onToggleLike}
            >
              <img src={isLiked ? heartFilledIcon : heartOutlineIcon} alt="" className="icon icon--20" />
              <span className="rd-stat__label">{review.likeCount ?? 0}</span>
            </button>
            <button
              type="button"
              className="rd-stat rd-stat--comment"
              aria-label="View comments"
              onClick={onOpenComments}
            >
              <img src={messageSquareIcon} alt="" className="icon icon--20" />
              <span className="rd-stat__label">{review.commentCount ?? 0}</span>
            </button>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-pressed={isSaved}
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark review'}
            onClick={() => {
              onToggleSave()
              showToast(isSaved ? 'Removed from saved reviews' : 'Saved to your reviews')
            }}
          >
            <img src={isSaved ? bookmarkSavedIcon : bookmarkIcon} alt="" className="icon icon--20" />
          </button>
        </div>

        <section className="rd-ratings">
          <p className="rd-ratings__title">Ratings</p>
          <div className="rd-ratings__list">
            {RATING_ROWS.map((row) => (
              row.key === 'valueForMoney' ? (
                <CostPerPersonRow key={row.key} value={review.ratings?.[row.key]} />
              ) : (
                <RatingRow key={row.key} label={row.label} value={review.ratings?.[row.key]} />
              )
            ))}
          </div>
        </section>
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
