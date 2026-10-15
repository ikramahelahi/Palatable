import { useState } from 'react'
import '../shared/base.css'
import './SquadScreen.css'
import '../shared/AchievementCarousel/AchievementCarousel.css'
import StatusBar from '../shared/StatusBar'
import BottomTabBar from '../shared/BottomTabBar'
import RestaurantCard from '../shared/RestaurantCard/RestaurantCard'
import FilterTabs from '../shared/FilterTabs/FilterTabs'
import BucketlistRow from '../shared/BucketlistRow/BucketlistRow'

import utensilsIcon from './icons/utensils.svg'
import globeIcon from './icons/globe.svg'
import lineChartIcon from './icons/line-chart.svg'
import chevronDownIcon from './icons/chevron-down.svg'
import settingsIcon from '../shared/icons/settings.svg'

import { getRestaurantsByIds } from '../../data/squads'

function renderSquadAchievementCard(squad) {
  return (
    <>
      <div className="ac-metric">
        <img src={utensilsIcon} alt="" className="ac-metric__icon" />
        <span className="ac-metric__value">{squad.stats.restaurantsVisited}</span>
        <span className="ac-metric__label">Restaurants Visited</span>
      </div>
      <div className="ac-progress-track">
        <div
          className="ac-progress-fill"
          style={{ width: `${Math.round(squad.stats.restaurantsVisitedProgress * 100)}%` }}
        />
      </div>
      <div className="ac-metric">
        <img src={globeIcon} alt="" className="ac-metric__icon" />
        <span className="ac-metric__value">{squad.stats.cuisinesTasted}</span>
        <span className="ac-metric__label">Cuisines Tasted</span>
      </div>
      <div className="ac-metric">
        <img src={lineChartIcon} alt="" className="ac-metric__icon" />
        <span className="ac-metric__value">{squad.stats.tasteMatch}%</span>
        <span className="ac-metric__label">Taste Profile Match</span>
      </div>
    </>
  )
}

export default function SquadScreen({
  squad,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
  onOpenRestaurant,
  onOpenSquadDetails,
  onOpenAnalytics,
  onMarkBucketlistVisited,
  onDeleteBucketlistItem,
  onToggleSquadBucketlist,
}) {
  const [activeFilterTab, setActiveFilterTab] = useState('suggested')
  const [isAnalyticsHintVisible, setIsAnalyticsHintVisible] = useState(true)
  const [suggestedIds, setSuggestedIds] = useState(() => squad?.suggestedIds ?? [])

  if (!squad) return null

  const suggestedRestaurants = getRestaurantsByIds(suggestedIds)
  const savedIds = new Set(squad.bucketlist.map((item) => item.id))
  const bucketlistItems = squad.bucketlist.filter((item) => !item.visited)

  return (
    <div className="sq phone-screen">
      <header className="sq-header">
        <StatusBar />
        <div className="sq-header__content">
          <div className="sq-title-row">
            <button type="button" className="sq-back" onClick={onBack} aria-label="Back">
              &#8249;
            </button>
            <div className="sq-avatar">
              <span>{squad.initials}</span>
            </div>
            <p className="sq-title">{squad.name}</p>
            <button
              type="button"
              className="sq-settings-btn icon-button"
              aria-label="Squad settings"
              onClick={onOpenSquadDetails}
            >
              <img src={settingsIcon} alt="" className="icon icon--20" />
            </button>
          </div>

          <div className="sq-analytics-callout">
            <button type="button" className="ac-card ac-card--clickable" onClick={() => {
              setIsAnalyticsHintVisible(false)
              onOpenAnalytics()
            }}>
              <div className="ac-slide">{renderSquadAchievementCard(squad)}</div>
            </button>
            {isAnalyticsHintVisible && <span className="sq-analytics-callout__bubble">Click to view squad analytics</span>}
          </div>
        </div>
      </header>

      <FilterTabs
        tabs={[
          { key: 'suggested', label: 'Suggested' },
          { key: 'bucketlist', label: 'Squad Bucketlist' },
        ]}
        activeKey={activeFilterTab}
        onChange={setActiveFilterTab}
      >
        <div className="sq-panel-content">
          {suggestedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSaved={savedIds.has(restaurant.id)}
              onToggleSave={onToggleSquadBucketlist}
              onOpen={onOpenRestaurant}
            />
          ))}
        </div>

        <div className="sq-panel-content">
          <div className="sq-filter-bar">
            <p className="sq-filter-bar__line">
              {bucketlistItems.length} spot{bucketlistItems.length === 1 ? '' : 's'} picked by the squad
            </p>
            <button type="button" className="sq-sort">
              Sort by: A-Z
              <img src={chevronDownIcon} alt="" className="icon icon--16" />
            </button>
          </div>
          {bucketlistItems.map((item) => (
            <BucketlistRow
              key={item.id}
              item={item}
              onToggleVisited={onMarkBucketlistVisited}
              onDelete={onDeleteBucketlistItem}
            />
          ))}
        </div>
      </FilterTabs>

      <BottomTabBar
        activeTab="Foodies"
        onHomeClick={onGoHome}
        onDiscoverClick={onOpenDiscover}
        onFoodiesClick={onOpenFoodies}
        onProfileClick={onOpenProfile}
      />
    </div>
  )
}
