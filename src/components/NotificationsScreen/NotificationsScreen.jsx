import '../shared/base.css'
import './NotificationsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'

import bellSmallIcon from './icons/bell-small.svg'

const NOTIFICATIONS = [
  {
    id: 'notif-1',
    text: 'Redeem your badge at Sync Cafe',
    time: '2h ago',
  },
  {
    id: 'notif-2',
    text: 'Sara Khan reviewed The Blue Catch',
    time: '4h ago',
  },
  {
    id: 'notif-3',
    text: 'New restaurant added near you: Golden Grain Bakery',
    time: '6h ago',
  },
  {
    id: 'notif-4',
    text: 'You earned the Explorer badge!',
    time: '1d ago',
  },
  {
    id: 'notif-5',
    text: 'Ali Raza added Mauve Patisserie to their bucketlist',
    time: '1d ago',
  },
]

export default function NotificationsScreen({ onBack, onGoHome, onOpenFollowRequests, onOpenDiscover, onOpenFoodies, onOpenProfile, activeTab }) {
  return (
    <div className="ns phone-screen">
      <header className="ns-header">
        <StatusBar />
        <div className="ns-header__content">
          <button type="button" className="ns-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <h1 className="ns-title">Notifications</h1>
        </div>
      </header>

      <main className="ns-body">
        <button type="button" className="ns-follow-requests" onClick={onOpenFollowRequests}>
          <span className="ns-follow-requests__label">Follow Requests</span>
          <span className="ns-follow-requests__chevron">&#8250;</span>
        </button>

        <section className="ns-card">
          <p className="ns-card__title">Notifications</p>
          {NOTIFICATIONS.map((item) => (
            <div className="ns-item" key={item.id}>
              <div className="ns-item__icon">
                <img src={bellSmallIcon} alt="" className="icon icon--16" />
              </div>
              <div className="ns-item__content">
                <p className="ns-item__text">{item.text}</p>
                <p className="ns-item__time">{item.time}</p>
              </div>
            </div>
          ))}
        </section>
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
