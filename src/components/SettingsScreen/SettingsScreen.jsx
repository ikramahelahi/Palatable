import { useEffect, useState } from 'react'
import '../shared/base.css'
import './SettingsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import ConfirmDialog from '../shared/ConfirmDialog/ConfirmDialog'
import { useToast } from '../shared/Toast/ToastContext'

import editIconAvatar from './icons/edit-2-avatar.svg'

import { INITIAL_SETTINGS } from './data'

const FIELDS = [
  { key: 'displayName', label: 'Display Name', type: 'text' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
]

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function getSettingsValues(currentUser) {
  return {
    ...INITIAL_SETTINGS,
    ...currentUser,
    username: currentUser?.username ?? INITIAL_SETTINGS.username.replace('@', ''),
  }
}

export default function SettingsScreen({ onBack, onGoHome, onOpenDiscover, onOpenFoodies, onOpenProfile, currentUser, onSaveProfile }) {
  const [values, setValues] = useState(() => getSettingsValues(currentUser))
  const [showConfirm, setShowConfirm] = useState(false)
  const showToast = useToast()

  useEffect(() => setValues(getSettingsValues(currentUser)), [currentUser])

  const updateField = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="st phone-screen">
      <header className="st-header">
        <StatusBar />
        <div className="st-header__content">
          <button type="button" className="st-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>

          <div className="st-avatar-wrap">
            <div className="st-avatar-large">
              <span>{getInitials(values.displayName) || 'IE'}</span>
            </div>
            <div className="st-avatar-edit" aria-hidden="true">
              <img src={editIconAvatar} alt="" className="icon icon--14" />
            </div>
          </div>

          <div className="st-meta">
            <div className="st-title-row">
              <p className="st-title">{values.displayName || 'Your Name'}</p>
            </div>
            <p className="st-email">{values.email}</p>
          </div>
        </div>
      </header>

      <div className="st-body">
        <div className="st-fields">
          {FIELDS.map((field) => (
            <div className="st-field" key={field.key}>
              <label className="st-field__label" htmlFor={`settings-${field.key}`}>
                {field.label}
              </label>
              <input
                id={`settings-${field.key}`}
                type={field.type}
                className="st-field__input"
                value={values[field.key]}
                placeholder={field.placeholder}
                onChange={(event) => updateField(field.key, event.target.value)}
              />
            </div>
          ))}
        </div>

        <button type="button" className="st-save-btn" onClick={() => setShowConfirm(true)}>
          Save Changes
        </button>
      </div>

      <BottomTabBar
        activeTab="Profile"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />

      <ConfirmDialog
        open={showConfirm}
        message="Save changes to your profile?"
        confirmLabel="Save"
        cancelLabel="Cancel"
        onConfirm={() => {
          onSaveProfile(values)
          setShowConfirm(false)
          showToast('Profile settings saved')
        }}
        onCancel={() => {
          setValues(getSettingsValues(currentUser))
          setShowConfirm(false)
        }}
      />
    </div>
  )
}
