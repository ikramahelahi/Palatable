import '../shared/base.css'
import './HomeFeed.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import PostCard, { Avatar } from '../shared/PostCard/PostCard'

import bellIcon from '../../assets/home-feed/icons/bell-01.svg'
import { POSTS } from '../../data/posts'

export default function HomeFeed({
  onOpenReview,
  onOpenReviewDetail,
  onOpenComments,
  onOpenNotifications,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  likedPostIds,
  savedPostIds,
  onToggleLikePost,
  onToggleSavePost,
  currentUser,
}) {
  return (
    <div className="hf phone-screen">
      <header className="hf-header">
        <StatusBar />
        <div className="hf-header__content">
          <h1 className="hf-wordmark">Palatable</h1>
          <button
            type="button"
            className="icon-button"
            aria-label="Notifications"
            onClick={onOpenNotifications}
          >
            <img src={bellIcon} alt="" className="icon icon--24" />
          </button>
        </div>
      </header>

      <button type="button" className="hf-composer" onClick={onOpenReview}>
        <Avatar initials={currentUser.initials} />
        <span className="hf-composer__placeholder">Post a review...</span>
      </button>

      <main className="hf-feed">
        {POSTS.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            isLiked={likedPostIds.has(post.id)}
            isSaved={savedPostIds.has(post.id)}
            onToggleLike={() => onToggleLikePost(post.id)}
            onToggleSave={() => onToggleSavePost(post.id)}
            onOpenComments={onOpenComments}
            onOpenDetail={() => onOpenReviewDetail(post)}
          />
        ))}
      </main>

      <BottomTabBar
        activeTab="Home"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
