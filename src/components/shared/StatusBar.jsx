import './StatusBar.css'

import statusBarTime from './icons/status-bar-time.svg'
import statusBarSignal from './icons/status-bar-signal.svg'

export default function StatusBar() {
  return (
    <div className="status-bar">
      <img src={statusBarTime} alt="" className="status-bar__time" />
      <img src={statusBarSignal} alt="" className="status-bar__signal" />
    </div>
  )
}
