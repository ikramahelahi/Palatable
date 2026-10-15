import { useState } from 'react'
import '../shared/base.css'
import './AddFriendsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import FilterTabs from '../shared/FilterTabs/FilterTabs'
import { useToast } from '../shared/Toast/ToastContext'

import { SUGGESTED_FRIENDS, FOLLOW_REQUESTS } from './data'

function MemberRow({ person, actionLabel, isRequested, onAction }) {
  return (
    <div className="af-row">
      <div className="af-row__info">
        <div className="af-avatar">
          <span>{person.initials}</span>
        </div>
        <p className="af-row__name">{person.name}</p>
      </div>
      <button
        type="button"
        className={`af-action-btn${isRequested ? ' af-action-btn--requested' : ''}`}
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  )
}

export default function AddFriendsScreen({ onBack, onGoHome, onOpenDiscover, onOpenFoodies, onOpenProfile }) {
  const [activeFilterTab, setActiveFilterTab] = useState('suggested')
  const [requestedIds, setRequestedIds] = useState(() => new Set())
  const [followRequests, setFollowRequests] = useState(FOLLOW_REQUESTS)
  const showToast = useToast()

  const toggleFollow = (id) => {
    const person = SUGGESTED_FRIENDS.find((item) => item.id === id)
    const wasRequested = requestedIds.has(id)
    setRequestedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
    if (person) showToast(wasRequested ? 'Follow request cancelled' : `Follow request sent to ${person.name}`)
  }

  const acceptRequest = (id) => {
    const person = followRequests.find((item) => item.id === id)
    setFollowRequests((prev) => prev.filter((item) => item.id !== id))
    if (person) showToast(`Accepted ${person.name}'s follow request`)
  }

  return (
    <div className="af phone-screen">
      <header className="af-header">
        <StatusBar />
        <div className="af-header__content">
          <button type="button" className="af-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <p className="af-title">Add Friends</p>
        </div>
      </header>

      <FilterTabs
        tabs={[
          { key: 'suggested', label: 'Suggested' },
          { key: 'followRequests', label: 'Follow Requests' },
        ]}
        activeKey={activeFilterTab}
        onChange={setActiveFilterTab}
      >
        <div className="af-panel-content">
          <div className="af-list">
            {SUGGESTED_FRIENDS.map((person) => (
              <MemberRow
                key={person.id}
                person={person}
                actionLabel={requestedIds.has(person.id) ? 'Requested' : 'Follow'}
                isRequested={requestedIds.has(person.id)}
                onAction={() => toggleFollow(person.id)}
              />
            ))}
          </div>
        </div>

        <div className="af-panel-content">
          <div className="af-list">
            {followRequests.map((person) => (
              <MemberRow
                key={person.id}
                person={person}
                actionLabel="Accept"
                isRequested={false}
                onAction={() => acceptRequest(person.id)}
              />
            ))}
          </div>
        </div>
      </FilterTabs>

      <BottomTabBar
        activeTab="Foodies"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
