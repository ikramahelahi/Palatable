import '../shared/base.css'
import './FoodiesScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'

import userPlusIcon from './icons/user-plus.svg'
import chevronRightIcon from './icons/chevron-right.svg'
import usersIcon from '../shared/icons/users-01.svg'

import { FRIENDS } from './data'

function FriendAvatar({ friend }) {
  return (
    <div className="fd-friend">
      <span className="fd-friend__initials">{friend.initials}</span>
      {friend.online ? <span className="fd-friend__status" aria-hidden="true" /> : null}
    </div>
  )
}

function SquadCard({ squad, onOpen }) {
  const memberCount = squad.members.length
  return (
    <button type="button" className="fd-squad-card" onClick={() => onOpen(squad.id)}>
      <p className="fd-squad-card__name">{squad.name}</p>
      <div className="fd-squad-card__meta">
        <img src={usersIcon} alt="" className="icon icon--16" />
        <span>{memberCount} member{memberCount === 1 ? '' : 's'}</span>
      </div>
      <div className="fd-squad-card__avatars">
        <span className="fd-squad-card__avatar">{squad.initials}</span>
      </div>
    </button>
  )
}

export default function FoodiesScreen({
  squads,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenSquad,
  onOpenAddFriends,
  onOpenCreateSquad,
}) {
  return (
    <div className="fd phone-screen">
      <header className="fd-header">
        <StatusBar />
        <div className="fd-header__content">
          <h1 className="fd-title">Foodies &lsquo;n Squads</h1>
          <button
            type="button"
            className="icon-button"
            aria-label="Add friend"
            onClick={onOpenAddFriends}
          >
            <img src={userPlusIcon} alt="" className="icon icon--24" />
          </button>
        </div>
      </header>

      <div className="fd-friends">
        <div className="fd-friends__scroll">
          {FRIENDS.map((friend) => (
            <FriendAvatar key={friend.id} friend={friend} />
          ))}
          <button type="button" className="fd-friends__more" aria-label="See all friends">
            <img src={chevronRightIcon} alt="" className="icon" />
          </button>
        </div>
      </div>

      <main className="fd-squads">
        <div className="fd-squads__grid">
          {Object.values(squads).map((squad) => (
            <SquadCard key={squad.id} squad={squad} onOpen={onOpenSquad} />
          ))}
          <button
            type="button"
            className="fd-squads__add"
            aria-label="Create new squad"
            onClick={onOpenCreateSquad}
          >
            <span className="fd-squads__add-icon">+</span>
          </button>
        </div>
      </main>

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
