import '../shared/base.css'
import './SavedReviewsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import PostCard from '../shared/PostCard/PostCard'

import { POSTS } from '../../data/posts'

export default function SavedReviewsScreen({
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenComments,
  onOpenReviewDetail,
  likedPostIds,
  savedPostIds,
  onToggleLikePost,
  onToggleSavePost,
}) {
  const savedPosts = POSTS.filter((post) => savedPostIds.has(post.id))

  return (
    <div className="sr phone-screen">
      <header className="sr-header">
        <StatusBar />
        <div className="sr-header__content">
          <button type="button" className="sr-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <p className="sr-title">Saved Reviews</p>
        </div>
      </header>

      <main className="sr-feed">
        {savedPosts.length === 0 ? (
          <p className="sr-empty">Reviews you bookmark from Home will show up here.</p>
        ) : (
          savedPosts.map((post) => (
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
          ))
        )}
      </main>

      <BottomTabBar
        activeTab="Profile"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
