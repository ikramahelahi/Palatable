import { useState } from 'react'
import '../shared/base.css'
import './AllReviewsScreen.css'
import BottomTabBar from '../shared/BottomTabBar'
import RestaurantSubHeader from './RestaurantSubHeader'
import { useToast } from '../shared/Toast/ToastContext'
import { REVIEWS } from './reviewsData'

import heartOutlineIcon from '../../assets/home-feed/icons/heart-outline.svg'
import heartFilledIcon from '../../assets/home-feed/icons/heart-filled.svg'
import messageSquareIcon from '../../assets/home-feed/icons/message-square.svg'
import bookmarkIcon from '../../assets/home-feed/icons/bookmark.svg'
import bookmarkSavedIcon from '../../assets/home-feed/icons/bookmark-saved.svg'

function ReviewPost({ review, isLiked, isSaved, onToggleLike, onToggleSave, onOpenDetail }) {
  const showToast = useToast()

  return (
    <article
      className="ars-post ars-post--clickable"
      role="button"
      tabIndex={0}
      onClick={onOpenDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenDetail()
        }
      }}
    >
      <div className="ars-post__header">
        <div className="ars-avatar">
          <span className="ars-avatar__initials">{review.initials}</span>
          <span className="ars-avatar__status" aria-hidden="true" />
        </div>
        <div className="ars-post__byline">
          <p className="ars-post__author">{review.name}</p>
          <p className="ars-post__timestamp">{review.time}</p>
        </div>
      </div>
      <p className="ars-post__text">{review.text}</p>
      <div className="ars-post__actions">
        <div className="ars-post__stats">
          <button
            type="button"
            className="ars-stat ars-stat--like"
            aria-pressed={isLiked}
            aria-label={isLiked ? 'Unlike review' : 'Like review'}
            onClick={(event) => {
              event.stopPropagation()
              onToggleLike()
            }}
          >
            <img src={isLiked ? heartFilledIcon : heartOutlineIcon} alt="" className="icon icon--20" />
            <span className="ars-stat__label ars-stat__label--neutral">
              {review.likeCount + (isLiked ? 1 : 0)}
            </span>
          </button>
          <div className="ars-stat">
            <img src={messageSquareIcon} alt="" className="icon icon--20" />
            <span className="ars-stat__label ars-stat__label--neutral">{review.commentCount}</span>
          </div>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark review'}
          onClick={(event) => {
            event.stopPropagation()
            onToggleSave()
            showToast(isSaved ? 'Removed from saved reviews' : 'Saved to your reviews')
          }}
        >
          <img src={isSaved ? bookmarkSavedIcon : bookmarkIcon} alt="" className="icon icon--20" />
        </button>
      </div>
    </article>
  )
}

export default function AllReviewsScreen({
  restaurant,
  isSaved,
  onToggleSave,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenReviewDetail,
}) {
  const [likedIds, setLikedIds] = useState(() => new Set())
  const [savedIds, setSavedIds] = useState(() => new Set())

  const toggle = (setFn, id) => {
    setFn((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (!restaurant) return null

  return (
    <div className="ars phone-screen">
      <RestaurantSubHeader
        restaurant={restaurant}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onBack={onBack}
      />

      <div className="ars-section-title">
        <p className="ars-section-title__label">Reviews</p>
        <p className="ars-section-title__count">(128)</p>
      </div>

      <main className="ars-list">
        {REVIEWS.map((review) => (
          <ReviewPost
            key={review.id}
            review={review}
            isLiked={likedIds.has(review.id)}
            isSaved={savedIds.has(review.id)}
            onToggleLike={() => toggle(setLikedIds, review.id)}
            onToggleSave={() => toggle(setSavedIds, review.id)}
            onOpenDetail={() => onOpenReviewDetail(review)}
          />
        ))}
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
