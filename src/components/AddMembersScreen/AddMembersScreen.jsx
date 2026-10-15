import { useState } from 'react'
import '../shared/base.css'
import './AddMembersScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import ConfirmDialog from '../shared/ConfirmDialog/ConfirmDialog'
import { useToast } from '../shared/Toast/ToastContext'

import checkIcon from './icons/check.svg'
import { CANDIDATE_PEOPLE } from './data'

function CandidateRow({ person, isSelected, onToggle }) {
  return (
    <button type="button" className="am-row" onClick={() => onToggle(person.id)}>
      <div className="am-row__info">
        <div className="am-avatar">
          <span>{person.initials}</span>
        </div>
        <p className="am-row__name">{person.name}</p>
      </div>
      <span className={`am-checkbox${isSelected ? ' am-checkbox--checked' : ''}`}>
        {isSelected ? <img src={checkIcon} alt="" className="icon icon--16" /> : null}
      </span>
    </button>
  )
}

export default function AddMembersScreen({
  squad,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onConfirmAddMembers,
}) {
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const showToast = useToast()

  if (!squad) return null

  const candidates = CANDIDATE_PEOPLE.filter(
    (person) => !squad.members.some((member) => member.name === person.name),
  )

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

  const selectedCount = selectedIds.size

  return (
    <div className="am phone-screen">
      <header className="am-header">
        <StatusBar />
        <div className="am-header__content">
          <button type="button" className="am-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <p className="am-title">{squad.name} - Add Members</p>
        </div>
      </header>

      <div className="am-body">
        <div className="am-list">
          {candidates.map((person) => (
            <CandidateRow
              key={person.id}
              person={person}
              isSelected={selectedIds.has(person.id)}
              onToggle={toggleSelected}
            />
          ))}
        </div>

        <div className="am-actions">
          <button
            type="button"
            className="am-action-btn am-action-btn--confirm"
            disabled={selectedCount === 0}
            onClick={() => setShowConfirmDialog(true)}
          >
            Confirm
          </button>
          <button type="button" className="am-action-btn am-action-btn--cancel" onClick={onBack}>
            Cancel
          </button>
        </div>
      </div>

      <BottomTabBar
        activeTab="Foodies"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />

      <ConfirmDialog
        open={showConfirmDialog}
        message={`Add ${selectedCount} Member${selectedCount === 1 ? '' : 's'} to ${squad.name}?`}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={() => {
          const selectedPeople = candidates.filter((person) => selectedIds.has(person.id))
          onConfirmAddMembers(squad.id, selectedPeople)
          setShowConfirmDialog(false)
          showToast(`Added ${selectedCount} member${selectedCount === 1 ? '' : 's'} to ${squad.name}`)
          onBack()
        }}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </div>
  )
}
