import { useMemo, useState } from 'react'
import '../shared/base.css'
import './AnalyticsScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import FilterTabs from '../shared/FilterTabs/FilterTabs'

import chevronDownIcon from './icons/chevron-down.svg'

import { CUISINE_SORT_OPTIONS, CUISINES, VISITED_SORT_OPTIONS } from './data'

function sortRestaurants(restaurants, sortKey) {
  const list = [...restaurants]
  switch (sortKey) {
    case 'oldest':
      return list.sort((a, b) => b.daysAgo - a.daysAgo)
    case 'most-visited':
      return list.sort((a, b) => b.visitCount - a.visitCount)
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name))
    case 'recent':
    default:
      return list.sort((a, b) => a.daysAgo - b.daysAgo)
  }
}

function sortCuisines(cuisines, sortKey) {
  const list = [...cuisines]
  switch (sortKey) {
    case 'least-tried':
      return list.sort((a, b) => a.timesTried - b.timesTried)
    case 'recent':
      return list.sort((a, b) => a.lastTriedDaysAgo - b.lastTriedDaysAgo)
    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return list.sort((a, b) => b.name.localeCompare(a.name))
    case 'most-tried':
    default:
      return list.sort((a, b) => b.timesTried - a.timesTried)
  }
}

function SortSelect({ options, activeKey, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const activeOption = options.find((option) => option.key === activeKey) ?? options[0]

  return (
    <div className="an-sort">
      <button
        type="button"
        className="an-sort__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>Sort by: {activeOption.label}</span>
        <img
          src={chevronDownIcon}
          alt=""
          className={`an-sort__chevron${isOpen ? ' an-sort__chevron--open' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="an-sort__scrim"
            aria-label="Close sort options"
            onClick={() => setIsOpen(false)}
          />
          <ul className="an-sort__menu" role="listbox">
            {options.map((option) => (
              <li key={option.key}>
                <button
                  type="button"
                  className={`an-sort__option${option.key === activeKey ? ' an-sort__option--active' : ''}`}
                  role="option"
                  aria-selected={option.key === activeKey}
                  onClick={() => {
                    onChange(option.key)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function CuisineCard({ cuisine, isExpanded, onToggle }) {
  return (
    <div className="an-cuisine-card">
      <button
        type="button"
        className="an-cuisine-card__header"
        aria-expanded={isExpanded}
        onClick={() => onToggle(cuisine.id)}
      >
        <div className="an-card__info">
          <p className="an-card__name">{cuisine.name}</p>
          <p className="an-card__meta">
            Tried {cuisine.timesTried} time{cuisine.timesTried === 1 ? '' : 's'}
          </p>
        </div>
        <img
          src={chevronDownIcon}
          alt=""
          className={`an-cuisine-card__chevron${isExpanded ? ' an-cuisine-card__chevron--open' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="an-cuisine-card__list">
          {cuisine.restaurants.map((restaurant) => (
            <p className="an-cuisine-card__row" key={restaurant.name}>
              <span className="an-cuisine-card__row-name">{restaurant.name}</span>
              <span className="an-cuisine-card__row-meta"> • {restaurant.visitedLabel}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AnalyticsScreen({
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenReview,
  activeTab,
  restaurants,
  title = 'Your Analytics',
}) {
  const [activeFilterTab, setActiveFilterTab] = useState('visited')
  const [visitedSortKey, setVisitedSortKey] = useState('recent')
  const [cuisineSortKey, setCuisineSortKey] = useState('most-tried')
  const [expandedCuisineId, setExpandedCuisineId] = useState(null)

  const sortedRestaurants = useMemo(
    () => sortRestaurants(restaurants, visitedSortKey),
    [restaurants, visitedSortKey],
  )

  const sortedCuisines = useMemo(() => sortCuisines(CUISINES, cuisineSortKey), [cuisineSortKey])

  const toggleCuisine = (id) => {
    setExpandedCuisineId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="an phone-screen">
      <header className="an-header">
        <StatusBar />
        <div className="an-header__content">
          <button type="button" className="an-back" onClick={onBack} aria-label="Back">
            &#8249;
          </button>
          <h1 className="an-title">{title}</h1>
        </div>
      </header>

      <FilterTabs
        tabs={[
          { key: 'visited', label: 'Visited' },
          { key: 'cuisines', label: 'My Cuisines' },
        ]}
        activeKey={activeFilterTab}
        onChange={setActiveFilterTab}
      >
        <div className="an-panel-content">
          <div className="an-filter-bar">
            <p className="an-filter-bar__count">{sortedRestaurants.length} places visited</p>
            <SortSelect options={VISITED_SORT_OPTIONS} activeKey={visitedSortKey} onChange={setVisitedSortKey} />
          </div>

          {sortedRestaurants.length === 0 ? (
            <p className="an-empty-hint">
              Tick items off your bucketlist to add them to your Visited list.
            </p>
          ) : (
            <div className="an-list">
              {sortedRestaurants.map((restaurant) => (
                <div className="an-card" key={restaurant.id}>
                  <div className="an-card__info">
                    <p className="an-card__name">{restaurant.name}</p>
                    <p className="an-card__meta">{restaurant.visitedLabel}</p>
                  </div>
                  <button
                    type="button"
                    className="an-card__review"
                    onClick={() => onOpenReview?.(restaurant)}
                  >
                    See Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="an-panel-content">
          <div className="an-filter-bar">
            <p className="an-filter-bar__count">{sortedCuisines.length} cuisines tried</p>
            <SortSelect options={CUISINE_SORT_OPTIONS} activeKey={cuisineSortKey} onChange={setCuisineSortKey} />
          </div>

          <div className="an-list">
            {sortedCuisines.map((cuisine) => (
              <CuisineCard
                key={cuisine.id}
                cuisine={cuisine}
                isExpanded={expandedCuisineId === cuisine.id}
                onToggle={toggleCuisine}
              />
            ))}
          </div>
        </div>
      </FilterTabs>

      <BottomTabBar
        activeTab={activeTab}
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
