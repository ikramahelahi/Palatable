import './PostCard.css'
import { useToast } from '../Toast/ToastContext'

import bookmarkIcon from '../../../assets/home-feed/icons/bookmark.svg'
import bookmarkSavedIcon from '../../../assets/home-feed/icons/bookmark-saved.svg'
import heartOutlineIcon from '../../../assets/home-feed/icons/heart-outline.svg'
import heartFilledIcon from '../../../assets/home-feed/icons/heart-filled.svg'

export function Avatar({ initials }) {
  return (
    <div className="pc-avatar">
      <span className="pc-avatar__initials">{initials}</span>
      <span className="pc-avatar__status" aria-hidden="true" />
    </div>
  )
}

export default function PostCard({ post, isLiked, isSaved, onToggleLike, onToggleSave, onOpenComments, onOpenDetail }) {
  const showToast = useToast()

  return (
    <article
      className={`pc-post${onOpenDetail ? ' pc-post--clickable' : ''}`}
      role={onOpenDetail ? 'button' : undefined}
      tabIndex={onOpenDetail ? 0 : undefined}
      onClick={onOpenDetail}
      onKeyDown={(event) => {
        if (!onOpenDetail) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenDetail()
        }
      }}
    >
      <div className="pc-post__header">
        <Avatar initials={post.avatarInitials} />
        <div className="pc-post__byline">
          <p className="pc-post__author">{post.author}</p>
          <p className="pc-post__timestamp">{post.timestamp}</p>
        </div>
      </div>
      <p className="pc-post__text">{post.text}</p>
      <div className="pc-post__media">
        <img src={post.image} alt={post.imageAlt} className="pc-post__image" />
      </div>
      <div className="pc-post__actions">
        <div className="pc-post__stats">
          <button
            type="button"
            className="pc-stat pc-stat--like"
            aria-pressed={isLiked}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
            onClick={(event) => {
              event.stopPropagation()
              onToggleLike()
            }}
          >
            <img
              src={isLiked ? heartFilledIcon : heartOutlineIcon}
              alt=""
              className="icon icon--20"
            />
            <span className={`pc-stat__label pc-stat__label--${post.likeTone}`}>
              {post.likeCount}
            </span>
          </button>
          {post.secondaryStats.map((stat) =>
            stat.type === 'comment' ? (
              <button
                type="button"
                className="pc-stat pc-stat--comment"
                key={`${post.id}-${stat.label}`}
                aria-label="View comments"
                onClick={(event) => {
                  event.stopPropagation()
                  onOpenComments()
                }}
              >
                <img src={stat.icon} alt="" className="icon icon--20" />
                <span className={`pc-stat__label pc-stat__label--${stat.tone}`}>{stat.label}</span>
              </button>
            ) : (
              <div className="pc-stat" key={`${post.id}-${stat.label}`}>
                <img src={stat.icon} alt="" className="icon icon--20" />
                <span className={`pc-stat__label pc-stat__label--${stat.tone}`}>{stat.label}</span>
              </div>
            ),
          )}
        </div>
        <button
          type="button"
          className="icon-button pc-save"
          aria-pressed={isSaved}
          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark post'}
          onClick={(event) => {
            event.stopPropagation()
            onToggleSave()
            showToast(isSaved ? 'Removed from saved reviews' : 'Saved to your reviews')
          }}
        >
          <img
            src={isSaved ? bookmarkSavedIcon : bookmarkIcon}
            alt=""
            className="icon pc-save__icon"
          />
        </button>
      </div>
    </article>
  )
}
