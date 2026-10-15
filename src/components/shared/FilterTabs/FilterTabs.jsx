import { Children } from 'react'
import './FilterTabs.css'

export default function FilterTabs({ tabs, activeKey, onChange, children }) {
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === activeKey),
  )
  const panels = Children.toArray(children)

  return (
    <>
      <div className="ft-toggle-row">
        <div className="ft-toggle">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`ft-toggle__btn${tab.key === activeKey ? ' ft-toggle__btn--active' : ''}`}
              onClick={() => onChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ft-feed">
        <div
          className="ft-panels"
          style={{
            width: `${tabs.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / tabs.length)}%)`,
          }}
        >
          {panels.map((panel, index) => (
            <div className="ft-panel" key={tabs[index]?.key ?? index} style={{ width: `${100 / tabs.length}%` }}>
              {panel}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
