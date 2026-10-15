import './BucketlistRow.css'
import { useToast } from '../Toast/ToastContext'

import checkIcon from './icons/check.svg'
import trashIcon from './icons/trash.svg'

export default function BucketlistRow({ item, onToggleVisited, onDelete }) {
  const showToast = useToast()

  return (
    <div className="blr-row">
      <p className="blr-row__name">{item.name}</p>
      <div className="blr-row__actions">
        <button
          type="button"
          className={`blr-btn${item.visited ? ' blr-btn--active' : ''}`}
          aria-pressed={item.visited}
          aria-label={item.visited ? 'Mark as not visited' : 'Mark as visited'}
          onClick={() => {
            onToggleVisited(item.id)
            showToast(item.visited ? 'Marked as not visited' : 'Marked as visited')
          }}
        >
          <img src={checkIcon} alt="" className="icon icon--16" />
        </button>
        <button
          type="button"
          className="blr-btn blr-btn--delete"
          aria-label={`Remove ${item.name} from bucketlist`}
          onClick={() => {
            onDelete(item.id)
            showToast(`Removed ${item.name} from bucketlist`)
          }}
        >
          <img src={trashIcon} alt="" className="icon icon--16" />
        </button>
      </div>
    </div>
  )
}
