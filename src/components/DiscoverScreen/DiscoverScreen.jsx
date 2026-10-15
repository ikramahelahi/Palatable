import { useState } from 'react'
import '../shared/base.css'
import './DiscoverScreen.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import RestaurantCard from '../shared/RestaurantCard/RestaurantCard'

import searchIcon from './icons/search-lg.svg'

import { FILTERS, RESTAURANTS } from './data'

export default function DiscoverScreen({ onGoHome, onOpenDiscover, onOpenFoodies, onOpenProfile, onOpenRestaurant, savedIds, onToggleSave }) {
  const [search, setSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState(() => new Set())

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(filter)) {
        next.delete(filter)
      } else {
        next.add(filter)
      }
      return next
    })
  }

  return (
    <div className="ds phone-screen">
      <header className="ds-header">
        <StatusBar />
        <div className="ds-header__content">
          <h1 className="ds-title">Discover</h1>

          <div className="ds-search">
            <img src={searchIcon} alt="" className="ds-search__icon" />
            <input
              type="text"
              className="ds-search__input"
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="ds-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`ds-filter${activeFilters.has(filter) ? ' ds-filter--active' : ''}`}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="ds-section-title">Recommended for you...</div>

      <main className="ds-list">
        {RESTAURANTS.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isSaved={savedIds.has(restaurant.id)}
            onToggleSave={onToggleSave}
            onOpen={onOpenRestaurant}
          />
        ))}
      </main>

      <BottomTabBar
        activeTab="Discover"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
