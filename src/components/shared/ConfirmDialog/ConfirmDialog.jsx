import './ConfirmDialog.css'

export default function ConfirmDialog({
  open,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
}) {
  if (!open) return null

  return (
    <div className="cfd-overlay" onClick={onCancel}>
      <div
        className="cfd-card"
        role="alertdialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="cfd-message">{message}</p>
        <div className="cfd-actions">
          <button
            type="button"
            className={`cfd-btn cfd-btn--confirm${destructive ? ' cfd-btn--destructive' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button type="button" className="cfd-btn cfd-btn--cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
