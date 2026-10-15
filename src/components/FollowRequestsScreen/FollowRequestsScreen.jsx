import { useState } from 'react'
import '../shared/base.css'
import './FollowRequestsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

const INITIAL_REQUESTS = [
  { id: 'req-1', initials: 'IE', name: 'Amira Hassan', sentMinutesAgo: 8 },
  { id: 'req-2', initials: 'SK', name: 'Bilal Malik', sentMinutesAgo: 45 },
  { id: 'req-3', initials: 'AR', name: 'Noor Qadir', sentMinutesAgo: 130 },
  { id: 'req-4', initials: 'ZA', name: 'Hana Youssef', sentMinutesAgo: 320 },
  { id: 'req-5', initials: 'TO', name: 'Tariq Osman', sentMinutesAgo: 500 },
  { id: 'req-6', initials: 'LB', name: 'Layla Benali', sentMinutesAgo: 1440 },
  { id: 'req-7', initials: 'YC', name: 'Yusuf Chowdhury', sentMinutesAgo: 2100 },
  { id: 'req-8', initials: 'DE', name: 'Dina El-Amin', sentMinutesAgo: 4320 },
  { id: 'req-9', initials: 'RK', name: 'Rami Khoury', sentMinutesAgo: 8640 },
  { id: 'req-10', initials: 'FA', name: 'Fatima Aziz', sentMinutesAgo: 10080 },
  { id: 'req-11', initials: 'OF', name: 'Omar Farooq', sentMinutesAgo: 25920 },
  { id: 'req-12', initials: 'SA', name: 'Sara Ahmed', sentMinutesAgo: 43200 },
]

function formatTimeAgo(minutes) {
  if (minutes < 60) return `${Math.floor(minutes)}m ago`
  const hours = minutes / 60
  if (hours < 24) return `${Math.floor(hours)}h ago`
  const days = hours / 24
  if (days < 7) return `${Math.floor(days)}d ago`
  const weeks = days / 7
  if (weeks < 5) return `${Math.floor(weeks)}w ago`
  const months = days / 30
  return `${Math.floor(months)}mo ago`
}

export default function FollowRequestsScreen({ onBack, onGoHome, onOpenDiscover, onOpenFoodies, onOpenProfile, activeTab }) {
  const [requests, setRequests] = useState(() =>
    [...INITIAL_REQUESTS].sort((a, b) => a.sentMinutesAgo - b.sentMinutesAgo),
  )
  const showToast = useToast()

  const accept = (id) => {
    const request = requests.find((item) => item.id === id)
    setRequests((prev) => prev.filter((item) => item.id !== id))
    if (request) showToast(`Accepted ${request.name}'s follow request`)
  }

  return (
    <div className="fr phone-screen">
      <header className="fr-header">
        <StatusBar />
        <div className="fr-header__content">
          <button type="button" className="fr-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <h1 className="fr-title">Follow Requests</h1>
        </div>
      </header>

      <main className="fr-body">
        <div className="fr-list">
          {requests.map((request) => (
            <div className="fr-row" key={request.id}>
              <div className="fr-user">
                <div className="fr-avatar">
                  <span className="fr-avatar__initials">{request.initials}</span>
                </div>
                <div className="fr-user__info">
                  <p className="fr-name">{request.name}</p>
                  <p className="fr-timestamp">{formatTimeAgo(request.sentMinutesAgo)}</p>
                </div>
              </div>
              <button
                type="button"
                className="fr-accept"
                onClick={() => accept(request.id)}
              >
                Accept
              </button>
            </div>
          ))}
          {requests.length === 0 && (
            <p className="fr-empty">No pending follow requests.</p>
          )}
        </div>
      </main>

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
