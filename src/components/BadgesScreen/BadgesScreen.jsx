import '../shared/base.css'
import './BadgesScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

import forkKnifeIcon from '../shared/icons/fork-knife.svg'
import starOutlineIcon from './icons/star-outline.svg'
import starFilledIcon from './icons/star-filled.svg'
import { BADGES } from './data'

const MAX_FEATURED = 3

function BadgeCard({ badge, isFeatured, canFeature, onToggle }) {
  const showToast = useToast()

  return (
    <div className="bd-card">
      <div className="bd-card__icon" style={{ background: badge.color }}>
        <img src={forkKnifeIcon} alt="" className="icon icon--20" />
      </div>
      <div className="bd-card__text">
        <p className="bd-card__name">{badge.name}</p>
        <p className="bd-card__desc">{badge.description}</p>
      </div>
      <div className="bd-card__right">
        <span className="bd-card__perk">{badge.perk}</span>
        <button
          type="button"
          className="bd-star-btn"
          aria-pressed={isFeatured}
          aria-label={isFeatured ? `Remove ${badge.name} from Profile` : `Feature ${badge.name} on Profile`}
          disabled={!isFeatured && !canFeature}
          onClick={() => {
            onToggle(badge.id)
            showToast(isFeatured ? `Removed ${badge.name} from Profile` : `${badge.name} featured on Profile`)
          }}
        >
          <img src={isFeatured ? starFilledIcon : starOutlineIcon} alt="" className="icon icon--20" />
        </button>
      </div>
    </div>
  )
}

export default function BadgesScreen({
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  featuredBadgeIds,
  onToggleFeaturedBadge,
}) {
  const canFeature = featuredBadgeIds.length < MAX_FEATURED

  return (
    <div className="bd phone-screen">
      <header className="bd-header">
        <StatusBar />
        <div className="bd-header__content">
          <button type="button" className="bd-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <h1 className="bd-title">My Badges</h1>
        </div>
      </header>

      <div className="bd-body">
        <p className="bd-hint">You can feature up to 3 badges on your Profile</p>
        <div className="bd-list">
          {BADGES.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isFeatured={featuredBadgeIds.includes(badge.id)}
              canFeature={canFeature}
              onToggle={onToggleFeaturedBadge}
            />
          ))}
        </div>
      </div>

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
