import { useState } from 'react'
import '../shared/base.css'
import './CommentsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

import heartOutlineIcon from './icons/heart-outline.svg'
import heartFilledIcon from './icons/heart-filled.svg'
import sendIcon from './icons/send.svg'

const INITIAL_COMMENTS = [
  {
    id: 'comment-1',
    initials: 'SK',
    name: 'Sara Khan',
    time: '1h ago',
    text: 'The wait time has always been long due to the rush on Tipu....',
    likes: 12,
    liked: false,
  },
  {
    id: 'comment-2',
    initials: 'AR',
    name: 'Ali Raza',
    time: '2h ago',
    text: 'Love Xanders.',
    likes: 8,
    liked: false,
  },
  {
    id: 'comment-3',
    initials: 'BM',
    name: 'Bilal Malik',
    time: '3h ago',
    text: 'I hate this review',
    likes: 5,
    liked: false,
  },
  {
    id: 'comment-4',
    initials: 'NQ',
    name: 'Noor Qadir',
    time: '4h ago',
    text: 'Tried their Babar’s pasta last week, didnt live up to the hype',
    likes: 15,
    liked: false,
  },
  {
    id: 'comment-5',
    initials: 'HY',
    name: 'Hana Youssef',
    time: '6h ago',
    text: 'Go to spot fr',
    likes: 3,
    liked: false,
  },
]

function CommentItem({ comment, onToggleLike }) {
  return (
    <div className="cs-comment">
      <div className="cs-comment__user-row">
        <div className="cs-avatar">
          <span className="cs-avatar__initials">{comment.initials}</span>
        </div>
        <div className="cs-comment__byline">
          <p className="cs-comment__name">{comment.name}</p>
          <p className="cs-comment__time">{comment.time}</p>
        </div>
      </div>
      <div className="cs-comment__body">
        <p className="cs-comment__text">{comment.text}</p>
        <button
          type="button"
          className="cs-like"
          aria-pressed={comment.liked}
          aria-label={comment.liked ? 'Unlike comment' : 'Like comment'}
          onClick={() => onToggleLike(comment.id)}
        >
          <img
            src={comment.liked ? heartFilledIcon : heartOutlineIcon}
            alt=""
            className="cs-like__icon"
          />
          <span className="cs-like__count">{comment.likes}</span>
        </button>
      </div>
    </div>
  )
}

export default function CommentsScreen({ onBack, onGoHome, onOpenDiscover, onOpenFoodies, onOpenProfile, activeTab, currentUser }) {
  const [comments, setComments] = useState(INITIAL_COMMENTS)
  const [draft, setDraft] = useState('')
  const showToast = useToast()

  const toggleLike = (id) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment,
      ),
    )
  }

  const submitComment = () => {
    const text = draft.trim()
    if (!text) return
    setComments((prev) => [
      ...prev,
      {
        id: `comment-${Date.now()}`,
        initials: currentUser.initials,
        name: currentUser.displayName,
        time: 'Just now',
        text,
        likes: 0,
        liked: false,
      },
    ])
    setDraft('')
    showToast('Comment posted')
  }

  return (
    <div className="cs phone-screen">
      <header className="cs-header">
        <StatusBar />
        <div className="cs-header__content">
          <div className="cs-header__nav">
            <button type="button" className="cs-back" onClick={onBack} aria-label="Back">
              &#8249;
            </button>
            <h1 className="cs-title">Comments</h1>
          </div>
        </div>
      </header>

      <main className="cs-list">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} onToggleLike={toggleLike} />
        ))}
      </main>

      <div className="cs-composer">
        <div className="cs-avatar cs-avatar--me">
          <span className="cs-avatar__initials">{currentUser.initials}</span>
        </div>
        <div className="cs-input-box">
          <input
            type="text"
            className="cs-input"
            placeholder="Add a comment..."
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submitComment()
            }}
          />
          <button
            type="button"
            className="cs-send icon-button"
            onClick={submitComment}
            aria-label="Send comment"
          >
            <img src={sendIcon} alt="" className="icon icon--16" />
          </button>
        </div>
      </div>

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
