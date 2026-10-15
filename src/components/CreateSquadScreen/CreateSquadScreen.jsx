import { useState } from 'react'
import '../shared/base.css'
import './CreateSquadScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import { useToast } from '../shared/Toast/ToastContext'

import editIconAvatar from './icons/edit-2-avatar.svg'
import checkIcon from './icons/check.svg'
import linkIcon from './icons/link-01.svg'
import { CANDIDATE_PEOPLE } from '../AddMembersScreen/data'
import { PROFILE } from '../ProfileScreen/data'

const INVITE_LINK = 'https://palatable.app/invite/abc123'

function CandidateRow({ person, isSelected, onToggle }) {
  return (
    <button type="button" className="csq-row" onClick={() => onToggle(person.id)}>
      <div className="csq-row__info">
        <div className="csq-avatar">
          <span>{person.initials}</span>
        </div>
        <p className="csq-row__name">{person.name}</p>
      </div>
      <span className={`csq-checkbox${isSelected ? ' csq-checkbox--checked' : ''}`}>
        {isSelected ? <img src={checkIcon} alt="" className="icon icon--16" /> : null}
      </span>
    </button>
  )
}

export default function CreateSquadScreen({
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onCreateSquad,
}) {
  const [squadName, setSquadName] = useState('')
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const showToast = useToast()

  const toggleSelected = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const trimmedName = squadName.trim()

  const handleCreate = () => {
    if (!trimmedName) return
    const members = CANDIDATE_PEOPLE.filter((person) => selectedIds.has(person.id))
    onCreateSquad({ name: trimmedName, members })
    showToast(`${trimmedName} squad created`)
    onBack()
  }

  return (
    <div className="csq phone-screen">
      <header className="csq-header">
        <StatusBar />
        <div className="csq-header__content">
          <button type="button" className="csq-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <h1 className="csq-title">Create Squad</h1>
        </div>
      </header>

      <div className="csq-body">
        <div className="csq-avatar-section">
          <div className="csq-avatar-large-wrap">
            <div className="csq-avatar-large">
              <span>{PROFILE.initials}</span>
            </div>
            <div className="csq-avatar-edit" aria-hidden="true">
              <img src={editIconAvatar} alt="" className="icon icon--14" />
            </div>
          </div>
          <p className="csq-avatar-hint">Change Group Icon</p>
        </div>

        <div className="csq-field">
          <label className="csq-field__label" htmlFor="csq-squad-name">
            Squad Name
          </label>
          <input
            id="csq-squad-name"
            type="text"
            className="csq-field__input"
            placeholder="Enter a name for your squad"
            value={squadName}
            onChange={(event) => setSquadName(event.target.value)}
          />
        </div>

        <div className="csq-members">
          <p className="csq-members__label">Add Members</p>
          <div className="csq-members__list">
            {CANDIDATE_PEOPLE.map((person) => (
              <CandidateRow
                key={person.id}
                person={person}
                isSelected={selectedIds.has(person.id)}
                onToggle={toggleSelected}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="csq-share-btn"
          onClick={() => {
            navigator.clipboard?.writeText(INVITE_LINK).catch(() => {})
            showToast('Link copied to clipboard')
          }}
        >
          <img src={linkIcon} alt="" className="icon icon--20" />
          Share Invite Link
        </button>

        <button type="button" className="csq-create-btn" disabled={!trimmedName} onClick={handleCreate}>
          Create Group
        </button>
      </div>

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
