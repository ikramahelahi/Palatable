import './RestaurantSubHeader.css'
import StatusBar from '../shared/StatusBar'
import { useToast } from '../shared/Toast/ToastContext'

import saveOutlineIcon from './icons/save-outline.svg'
import saveFilledIcon from './icons/save-filled.svg'

export default function RestaurantSubHeader({ restaurant, isSaved, onToggleSave, onBack }) {
  const showToast = useToast()

  return (
    <header className="rsh">
      <StatusBar />
      <div className="rsh__content">
        <button type="button" className="rsh__back" onClick={onBack} aria-label="Back">
          &#8249;
        </button>
        <div className="rsh__logo">
          <img src={restaurant.thumbnail} alt="" className="rsh__logo-img" />
        </div>
        <p className="rsh__title">{restaurant.name}</p>
        <button
          type="button"
          className="rsh__save icon-button"
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove bookmark' : 'Save restaurant'}
          onClick={() => {
            onToggleSave(restaurant.id)
            showToast(isSaved ? 'Removed from bucketlist' : 'Added to bucketlist')
          }}
        >
          <img src={isSaved ? saveFilledIcon : saveOutlineIcon} alt="" className="rsh__save-icon" />
        </button>
      </div>
    </header>
  )
}
