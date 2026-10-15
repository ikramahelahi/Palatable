import '../shared/base.css'
import './RestaurantScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

import checkVerifiedIcon from './icons/check-verified.svg'
import saveOutlineIcon from './icons/save-outline.svg'
import saveFilledIcon from './icons/save-filled.svg'
import pencilLineIcon from './icons/pencil-line.svg'
import mapPinIcon from './icons/map-pin.svg'

import photo1 from './images/photo-1.png'
import photo2 from './images/photo-2.png'
import photo3 from './images/photo-3.png'
import photo4 from './images/photo-4.png'
import photo5 from './images/photo-5.png'

import { REVIEWS } from './reviewsData'

const PHOTOS = [photo1, photo2, photo3, photo4, photo5]

export default function RestaurantScreen({
  restaurant,
  isSaved,
  onToggleSave,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onAddReview,
  onOpenAllReviews,
  onOpenAllPhotos,
}) {
  const showToast = useToast()

  if (!restaurant) return null

  return (
    <div className="rp phone-screen">
      <header className="rp-header">
        <StatusBar />
        <div className="rp-header__content">
          <div className="rp-top-nav">
            <button type="button" className="rp-back" onClick={onBack} aria-label="Back">
              &#8249;
            </button>
            <button
              type="button"
              className="rp-save icon-button"
              aria-pressed={isSaved}
              aria-label={isSaved ? 'Remove bookmark' : 'Save restaurant'}
              onClick={() => {
                onToggleSave(restaurant.id)
                showToast(isSaved ? 'Removed from bucketlist' : 'Added to bucketlist')
              }}
            >
              <img src={isSaved ? saveFilledIcon : saveOutlineIcon} alt="" className="rp-save__icon" />
            </button>
          </div>

          <div className="rp-identity">
            <div className="rp-logo">
              <img src={restaurant.thumbnail} alt="" className="rp-logo__img" />
            </div>
            <p className="rp-name">{restaurant.name}</p>
            <p className="rp-tagline">{restaurant.tagline}</p>
            <div className="rp-meta">
              <span className="rp-meta__match">
                <img src={checkVerifiedIcon} alt="" className="rp-meta__icon" />
                {restaurant.match}%
              </span>
              <span className="rp-meta__location">{restaurant.location}</span>
            </div>
          </div>

          <div className="rp-actions">
            <button
              type="button"
              className="rp-action-btn"
              onClick={() => onAddReview(restaurant.name)}
            >
              <img src={pencilLineIcon} alt="" className="icon icon--18" />
              Add a Review
            </button>
            <button type="button" className="rp-action-btn rp-action-btn--maps">
              <img src={mapPinIcon} alt="" className="icon icon--18" />
              Open in Maps
            </button>
          </div>
        </div>
      </header>

      <main className="rp-body">
        <section className="rp-section">
          <button type="button" className="rp-section__header rp-section__header--button" onClick={onOpenAllPhotos}>
            <p className="rp-section__title">Photos</p>
            <p className="rp-section__count">(23)</p>
          </button>
          <div className="rp-photos">
            {PHOTOS.map((photo, index) => (
              <div className="rp-photo" key={index}>
                <img src={photo} alt="" className="rp-photo__img" />
              </div>
            ))}
          </div>
        </section>

        <section className="rp-section">
          <button type="button" className="rp-section__header rp-section__header--button" onClick={onOpenAllReviews}>
            <p className="rp-section__title">Reviews</p>
            <p className="rp-section__count">(128)</p>
          </button>
          <div className="rp-reviews">
            {REVIEWS.map((review) => (
              <div className="rp-review" key={review.id}>
                <div className="rp-review__user-row">
                  <div className="rp-review__avatar">
                    <span>{review.initials}</span>
                  </div>
                  <div className="rp-review__details">
                    <p className="rp-review__name">{review.name}</p>
                    <p className="rp-review__time">{review.time}</p>
                  </div>
                </div>
                <p className="rp-review__text">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomTabBar
        activeTab="Discover"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
