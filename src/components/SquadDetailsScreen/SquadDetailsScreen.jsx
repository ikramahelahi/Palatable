import { useState } from 'react'
import '../shared/base.css'
import './SquadDetailsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import ConfirmDialog from '../shared/ConfirmDialog/ConfirmDialog'
import { useToast } from '../shared/Toast/ToastContext'

import editIcon from './icons/edit-2.svg'
import editIconAvatar from './icons/edit-2-avatar.svg'
import plusIcon from './icons/plus.svg'
import minusCircleIcon from './icons/minus-circle.svg'
import logOutIcon from './icons/log-out.svg'

function MemberRow({ member, onRequestRemove }) {
  return (
    <div className="sd-row">
      <div className="sd-row__info">
        <div className="sd-avatar">
          <span>{member.initials}</span>
        </div>
        <div className="sd-row__name-badge">
          <p className="sd-row__name">{member.name}</p>
          {member.isAdmin ? <span className="sd-admin-tag">Admin</span> : null}
        </div>
      </div>
      {!member.isAdmin && (
        <button
          type="button"
          className="sd-remove-btn"
          aria-label={`Remove ${member.name}`}
          onClick={() => onRequestRemove(member)}
        >
          <img src={minusCircleIcon} alt="" className="icon icon--14" />
        </button>
      )}
    </div>
  )
}

export default function SquadDetailsScreen({
  squad,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenAddMembers,
  onRenameSquad,
  onRemoveMember,
}) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [pendingRemoveMember, setPendingRemoveMember] = useState(null)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const showToast = useToast()

  if (!squad) return null

  const startEditingName = () => {
    setNameDraft(squad.name)
    setIsEditingName(true)
  }

  const commitNameEdit = () => {
    const trimmed = nameDraft.trim()
    if (trimmed && trimmed !== squad.name) {
      onRenameSquad(squad.id, trimmed)
      showToast('Squad name updated')
    }
    setIsEditingName(false)
  }

  const memberCount = squad.members.length

  return (
    <div className="sd phone-screen">
      <header className="sd-header">
        <StatusBar />
        <div className="sd-header__content">
          <button type="button" className="sd-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>

          <div className="sd-avatar-large-wrap">
            <div className="sd-avatar-large">
              <span>{squad.initials}</span>
            </div>
            <div className="sd-avatar-edit" aria-hidden="true">
              <img src={editIconAvatar} alt="" className="icon icon--14" />
            </div>
          </div>

          <div className="sd-meta">
            {isEditingName ? (
              <input
                type="text"
                className="sd-name-input"
                value={nameDraft}
                autoFocus
                maxLength={40}
                onChange={(event) => setNameDraft(event.target.value)}
                onBlur={commitNameEdit}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    commitNameEdit()
                  } else if (event.key === 'Escape') {
                    setIsEditingName(false)
                  }
                }}
              />
            ) : (
              <div className="sd-title-row">
                <p className="sd-title">{squad.name}</p>
                <button
                  type="button"
                  className="sd-edit-name-btn"
                  aria-label="Edit squad name"
                  onClick={startEditingName}
                >
                  <img src={editIcon} alt="" className="icon icon--16" />
                </button>
              </div>
            )}
            <p className="sd-member-count">
              {memberCount} Member{memberCount === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </header>

      <div className="sd-body">
        <div className="sd-members-header">
          <p className="sd-members-title">Members</p>
          <button type="button" className="sd-add-member-btn" onClick={onOpenAddMembers}>
            <img src={plusIcon} alt="" className="icon icon--14" />
            Add Member
          </button>
        </div>

        <div className="sd-list">
          {squad.members.map((member) => (
            <MemberRow key={member.id} member={member} onRequestRemove={setPendingRemoveMember} />
          ))}
        </div>

        <div className="sd-action-area">
          <button type="button" className="sd-leave-btn" onClick={() => setShowLeaveConfirm(true)}>
            <img src={logOutIcon} alt="" className="icon icon--16" />
            Leave Squad
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
        open={!!pendingRemoveMember}
        message={`Remove ${pendingRemoveMember?.name} from the Squad?`}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        destructive
        onConfirm={() => {
          showToast(`Removed ${pendingRemoveMember.name} from the squad`)
          onRemoveMember(squad.id, pendingRemoveMember.id)
          setPendingRemoveMember(null)
          onBack()
        }}
        onCancel={() => setPendingRemoveMember(null)}
      />

      <ConfirmDialog
        open={showLeaveConfirm}
        message="Are you sure you want to leave?"
        confirmLabel="Leave"
        cancelLabel="Cancel"
        destructive
        onConfirm={() => {
          setShowLeaveConfirm(false)
          showToast(`You left ${squad.name}`)
        }}
        onCancel={() => setShowLeaveConfirm(false)}
      />
    </div>
  )
}
