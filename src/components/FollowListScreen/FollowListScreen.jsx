import { useState } from 'react'
import '../shared/base.css'
import './FollowListScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import FilterTabs from '../shared/FilterTabs/FilterTabs'
import ConfirmDialog from '../shared/ConfirmDialog/ConfirmDialog'
import { useToast } from '../shared/Toast/ToastContext'

import minusCircleIcon from './icons/minus-circle.svg'

function FollowerRow({ person, onRequestUnfollow }) {
  return (
    <div className="fl-row">
      <div className="fl-row__info">
        <div className="fl-avatar">
          <span>{person.initials}</span>
        </div>
        <p className="fl-row__name">{person.name}</p>
      </div>
      <button type="button" className="fl-follow-btn" onClick={() => onRequestUnfollow(person)}>
        Following
      </button>
    </div>
  )
}

function FollowingRow({ person, onRequestRemove }) {
  return (
    <div className="fl-row">
      <div className="fl-row__info">
        <div className="fl-avatar">
          <span>{person.initials}</span>
        </div>
        <p className="fl-row__name">{person.name}</p>
      </div>
      <button
        type="button"
        className="fl-remove-btn"
        aria-label={`Remove ${person.name}`}
        onClick={() => onRequestRemove(person)}
      >
        <img src={minusCircleIcon} alt="" className="icon icon--14" />
      </button>
    </div>
  )
}

export default function FollowListScreen({
  onBack,
  initialTab,
  followers,
  following,
  onUnfollow,
  onRemoveFollowing,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
}) {
  const [activeFilterTab, setActiveFilterTab] = useState(initialTab || 'followers')
  const [pendingAction, setPendingAction] = useState(null)
  const showToast = useToast()

  const confirmMessage =
    pendingAction &&
    (pendingAction.type === 'unfollow'
      ? `Are you sure you want to unfollow ${pendingAction.person.name}?`
      : `Are you sure you want to remove ${pendingAction.person.name}?`)

  return (
    <div className="fl phone-screen">
      <header className="fl-header">
        <StatusBar />
        <div className="fl-header__content">
          <button type="button" className="fl-back" onClick={onBack} aria-label="Back to Profile">
            &#8249;
          </button>
          <h1 className="fl-title">My Friends</h1>
        </div>
      </header>

      <FilterTabs
        tabs={[
          { key: 'followers', label: 'Followers' },
          { key: 'following', label: 'Following' },
        ]}
        activeKey={activeFilterTab}
        onChange={setActiveFilterTab}
      >
        <div className="fl-panel-content">
          <div className="fl-list">
            {followers.map((person) => (
              <FollowingRow
                key={person.id}
                person={person}
                onRequestRemove={(target) => setPendingAction({ type: 'remove', person: target })}
              />
            ))}
          </div>
        </div>

        <div className="fl-panel-content">
          <div className="fl-list">
            {following.map((person) => (
              <FollowerRow
                key={person.id}
                person={person}
                onRequestUnfollow={(target) => setPendingAction({ type: 'unfollow', person: target })}
              />
            ))}
          </div>
        </div>
      </FilterTabs>

      <BottomTabBar
        activeTab="Profile"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />

      <ConfirmDialog
        open={!!pendingAction}
        message={confirmMessage}
        confirmLabel="Yes"
        cancelLabel="No"
        destructive
        onConfirm={() => {
          if (pendingAction.type === 'unfollow') {
            onUnfollow(pendingAction.person.id)
            showToast(`Unfollowed ${pendingAction.person.name}`)
          } else {
            onRemoveFollowing(pendingAction.person.id)
            showToast(`Removed ${pendingAction.person.name}`)
          }
          setPendingAction(null)
        }}
        onCancel={() => setPendingAction(null)}
      />
    </div>
  )
}
