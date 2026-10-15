import './BottomTabBar.css'

import homeIcon from './icons/home.svg'
import homeFilledIcon from './icons/home-filled.svg'
import starIcon from './icons/star-05.svg'
import starFilledIcon from './icons/star-05-filled.svg'
import compassIcon from './icons/compass-03.svg'
import compassFilledIcon from './icons/compass-03-filled.svg'
import usersIcon from './icons/users-01.svg'
import usersFilledIcon from './icons/users-01-filled.svg'
import userIcon from './icons/user.svg'
import userFilledIcon from './icons/user-filled.svg'

const TABS = [
  { label: 'Home', icon: homeIcon, iconFilled: homeFilledIcon },
  { label: 'AI Chat', icon: starIcon, iconFilled: starFilledIcon },
  { label: 'Discover', icon: compassIcon, iconFilled: compassFilledIcon },
  { label: 'Foodies', icon: usersIcon, iconFilled: usersFilledIcon },
  { label: 'Profile', icon: userIcon, iconFilled: userFilledIcon },
]

const HANDLER_BY_LABEL = {
  Home: 'onHomeClick',
  Discover: 'onDiscoverClick',
  Foodies: 'onFoodiesClick',
  Profile: 'onProfileClick',
}

export default function BottomTabBar({
  activeTab = 'Home',
  onHomeClick,
  onDiscoverClick,
  onFoodiesClick,
  onProfileClick,
}) {
  const handlers = { onHomeClick, onDiscoverClick, onFoodiesClick, onProfileClick }

  return (
    <nav className="tab-bar" aria-label="Primary">
      <ul className="tab-bar__list">
        {TABS.map((tab) => (
          <li key={tab.label}>
            <button
              type="button"
              className={`tab-bar__tab${tab.label === activeTab ? ' tab-bar__tab--active' : ''}`}
              onClick={handlers[HANDLER_BY_LABEL[tab.label]]}
            >
              <img
                src={tab.label === activeTab ? tab.iconFilled : tab.icon}
                alt=""
                className="tab-bar__icon"
              />
              <span>{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-bar__home-indicator-row">
        <span className="tab-bar__home-indicator" aria-hidden="true" />
      </div>
    </nav>
  )
}
