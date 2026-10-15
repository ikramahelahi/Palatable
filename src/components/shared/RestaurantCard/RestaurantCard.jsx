import './RestaurantCard.css'
import { useToast } from '../Toast/ToastContext'

import checkVerifiedIcon from './icons/check-verified.svg'
import bucketlistOutlineIcon from './icons/bucketlist-outline.svg'
import bucketlistFilledIcon from './icons/bucketlist-filled.svg'
import notInterestedIcon from './icons/not-interested-x.svg'

export default function RestaurantCard({ restaurant, isSaved, onToggleSave, onOpen }) {
  const showToast = useToast()

  return (
    <button type="button" className="ds-card" onClick={() => onOpen?.(restaurant)}>
      <div className="ds-card__thumb">
        <img src={restaurant.thumbnail} alt="" className="ds-card__thumb-img" />
      </div>
      <div className="ds-card__text">
        <p className="ds-card__name">{restaurant.name}</p>
        <p className="ds-card__match">
          <img src={checkVerifiedIcon} alt="" className="ds-card__match-icon" />
          {restaurant.match}% Match for you
        </p>
      </div>
      <div className="ds-card__actions">
        <button
          type="button"
          className="ds-icon-btn"
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove from bucketlist' : 'Add to bucketlist'}
          onClick={(event) => {
            event.stopPropagation()
            onToggleSave(restaurant.id)
            showToast(isSaved ? 'Removed from bucketlist' : 'Added to bucketlist')
          }}
        >
          <img
            src={isSaved ? bucketlistFilledIcon : bucketlistOutlineIcon}
            alt=""
            className="ds-icon-btn__img"
          />
        </button>
        <div className="ds-icon-btn ds-icon-btn--static" aria-hidden="true">
          <img src={notInterestedIcon} alt="" className="ds-icon-btn__img" />
        </div>
      </div>
    </button>
  )
}
