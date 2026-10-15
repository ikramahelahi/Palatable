import './Sidebar.css'

import bookmarkIcon from './sidebar-icons/bookmark.svg'
import awardIcon from './sidebar-icons/award.svg'
import settingsIcon from './sidebar-icons/settings.svg'
import logoutIcon from './sidebar-icons/log-out.svg'

export default function Sidebar({
  isOpen,
  onClose,
  displayName,
  username,
  initials,
  onOpenSavedReviews,
  onOpenBadges,
  onOpenSettings,
  onLogout,
}) {
  return (
    <div
      className={`pf-sidebar-overlay${isOpen ? ' pf-sidebar-overlay--open' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div className="pf-sidebar-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="pf-sidebar-user">
          <div className="pf-sidebar-avatar">
            <span>{initials}</span>
          </div>
          <div className="pf-sidebar-user__text">
            <p className="pf-sidebar-user__name">{displayName}</p>
            <p className="pf-sidebar-user__handle">@{username}</p>
          </div>
        </div>

        <div className="pf-sidebar-divider" />

        <div className="pf-sidebar-menu">
          <button type="button" className="pf-sidebar-row" onClick={onOpenSavedReviews}>
            <img src={bookmarkIcon} alt="" className="icon icon--20" />
            <span>Saved Reviews</span>
          </button>
          <button type="button" className="pf-sidebar-row" onClick={onOpenBadges}>
            <img src={awardIcon} alt="" className="icon icon--20" />
            <span>Badges</span>
          </button>
          <button
            type="button"
            className="pf-sidebar-row pf-sidebar-row--no-border"
            onClick={onOpenSettings}
          >
            <img src={settingsIcon} alt="" className="icon icon--20" />
            <span>Settings</span>
          </button>
        </div>

        <button type="button" className="pf-sidebar-logout" onClick={onLogout}>
          <img src={logoutIcon} alt="" className="icon icon--20" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  )
}
