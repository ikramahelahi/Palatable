import { useState } from 'react'
import '../shared/base.css'
import './ProfileScreen.css'
import '../shared/AchievementCarousel/AchievementCarousel.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import FilterTabs from '../shared/FilterTabs/FilterTabs'
import PostCard from '../shared/PostCard/PostCard'
import BucketlistRow from '../shared/BucketlistRow/BucketlistRow'
import Sidebar from './Sidebar'

import menuIcon from './icons/menu-01.svg'
import utensilsIcon from './icons/utensils.svg'
import globeIcon from './icons/globe.svg'
import heartIcon from './icons/heart.svg'
import forkKnifeIcon from '../shared/icons/fork-knife.svg'

import { PROFILE, MY_POST } from './data'
import { BADGES } from '../BadgesScreen/data'

function renderProfileAchievementCard(profile) {
  return (
    <>
      <div className="ac-metric">
        <img src={utensilsIcon} alt="" className="ac-metric__icon" />
        <span className="ac-metric__value">{profile.stats.restaurantsVisited}</span>
        <span className="ac-metric__label">Restaurants Visited</span>
      </div>
      <div className="ac-progress-track">
        <div
          className="ac-progress-fill"
          style={{ width: `${Math.round(profile.stats.restaurantsVisitedProgress * 100)}%` }}
        />
      </div>
      <div className="ac-metric">
        <img src={globeIcon} alt="" className="ac-metric__icon" />
        <span className="ac-metric__value">{profile.stats.cuisinesTasted}</span>
        <span className="ac-metric__label">Cuisines Tasted</span>
      </div>
      <div className="ac-metric">
        <img src={heartIcon} alt="" className="ac-metric__icon" />
        <span className="ac-metric__value ac-metric__value--text">
          {profile.stats.mostVisitedRestaurant}
        </span>
        <span className="ac-metric__label">Most Visited Restaurant</span>
      </div>
    </>
  )
}

export default function ProfileScreen({
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenComments,
  onOpenReviewDetail,
  onOpenSettings,
  onOpenSavedReviews,
  onOpenBadges,
  onOpenAnalytics,
  onOpenFollowers,
  onOpenFollowing,
  followersCount,
  followingCount,
  featuredBadgeIds,
  bucketlist,
  onToggleBucketlistVisited,
  onDeleteFromBucketlist,
  onLogout,
  currentUser,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAnalyticsHintVisible, setIsAnalyticsHintVisible] = useState(true)
  const [activeFilterTab, setActiveFilterTab] = useState('visited')
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [isPostSaved, setIsPostSaved] = useState(false)

  const featuredBadges = featuredBadgeIds
    .map((id) => BADGES.find((badge) => badge.id === id))
    .filter(Boolean)
  const profile = { ...PROFILE, ...currentUser }
  const myPost = { ...MY_POST, author: profile.username, avatarInitials: profile.initials, handle: `@${profile.username}` }

  return (
    <div className="pf phone-screen">
      <header className="pf-header">
        <StatusBar />
        <div className="pf-header__content">
          <div className="pf-top-row">
            <div className="pf-avatar">
              <span>{profile.initials}</span>
            </div>
            <div className="pf-identity">
              <div className="pf-name-row">
                <p className="pf-username">{profile.username}</p>
                {featuredBadges.length > 0 && (
                  <div className="pf-badges">
                    {featuredBadges.map((badge) => (
                      <span key={badge.id} className="pf-badge" style={{ background: badge.color }}>
                        <img src={forkKnifeIcon} alt="" className="pf-badge__icon" />
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="pf-follow-stats">
                <button type="button" className="pf-follow-stat" onClick={onOpenFollowers}>
                  <p className="pf-follow-stat__value">{followersCount}</p>
                  <p className="pf-follow-stat__label">Followers</p>
                </button>
                <button type="button" className="pf-follow-stat" onClick={onOpenFollowing}>
                  <p className="pf-follow-stat__value">{followingCount}</p>
                  <p className="pf-follow-stat__label">Following</p>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="pf-menu-btn"
              aria-label="Open menu"
              onClick={() => setIsSidebarOpen(true)}
            >
              <img src={menuIcon} alt="" className="icon" />
            </button>
          </div>

          <div className="pf-analytics-callout">
            <div
              className="ac-card ac-card--clickable"
              role="button"
              tabIndex={0}
              aria-label="Open your analytics"
              onClick={() => {
                setIsAnalyticsHintVisible(false)
                onOpenAnalytics()
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setIsAnalyticsHintVisible(false)
                  onOpenAnalytics?.()
                }
              }}
            >
              <div className="ac-slide">{renderProfileAchievementCard(profile)}</div>
            </div>
            {isAnalyticsHintVisible && <span className="pf-analytics-callout__bubble">Click to view your analytics</span>}
          </div>
        </div>
      </header>

      <FilterTabs
        tabs={[
          { key: 'visited', label: 'My Reviews' },
          { key: 'bucketlist', label: 'My Bucketlist' },
        ]}
        activeKey={activeFilterTab}
        onChange={setActiveFilterTab}
      >
        <div className="pf-panel-content">
          <PostCard
            post={myPost}
            isLiked={isPostLiked}
            isSaved={isPostSaved}
            onToggleLike={() => setIsPostLiked((prev) => !prev)}
            onToggleSave={() => setIsPostSaved((prev) => !prev)}
            onOpenComments={onOpenComments}
            onOpenDetail={() => onOpenReviewDetail(myPost)}
          />
        </div>

        <div className="pf-panel-content pf-panel-content--bucketlist">
          {bucketlist.map((item) => (
            <BucketlistRow
              key={item.id}
              item={item}
              onToggleVisited={onToggleBucketlistVisited}
              onDelete={onDeleteFromBucketlist}
            />
          ))}
        </div>
      </FilterTabs>

      <BottomTabBar
        activeTab="Profile"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        displayName={profile.displayName}
        username={profile.username}
        initials={profile.initials}
        onOpenSavedReviews={() => {
          setIsSidebarOpen(false)
          onOpenSavedReviews()
        }}
        onOpenSettings={() => {
          setIsSidebarOpen(false)
          onOpenSettings()
        }}
        onOpenBadges={() => {
          setIsSidebarOpen(false)
          onOpenBadges()
        }}
        onLogout={() => {
          setIsSidebarOpen(false)
          onLogout()
        }}
      />
    </div>
  )
}
