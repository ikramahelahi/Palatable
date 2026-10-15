import { createContext, useCallback, useContext, useRef, useState } from 'react'
import './Toast.css'

import checkIcon from '../icons/toast-check.svg'

const ToastContext = createContext(null)

const TOAST_DURATION_MS = 2600

let nextToastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timeoutsRef = useRef({})

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    clearTimeout(timeoutsRef.current[id])
    delete timeoutsRef.current[id]
  }, [])

  const showToast = useCallback(
    (message) => {
      const id = ++nextToastId
      setToasts((prev) => [...prev, { id, message }])
      timeoutsRef.current[id] = setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    },
    [dismissToast],
  )

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toasts.length > 0 && (
        <div className="toast-stack" role="status" aria-live="polite">
          {toasts.map((toast) => (
            <div className="toast" key={toast.id}>
              <img src={checkIcon} alt="" className="toast__icon" />
              <span className="toast__message">{toast.message}</span>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return showToast
}
