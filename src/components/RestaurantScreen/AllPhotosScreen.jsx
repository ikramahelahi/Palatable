import '../shared/base.css'
import './AllPhotosScreen.css'
import BottomTabBar from '../shared/BottomTabBar'
import RestaurantSubHeader from './RestaurantSubHeader'

import photo1 from './images/photo-1.png'
import photo2 from './images/photo-2.png'
import photo3 from './images/photo-3.png'
import photo4 from './images/photo-4.png'
import photo5 from './images/photo-5.png'

const COLUMN_1 = [
  { src: photo1, height: 180 },
  { src: photo2, height: 160 },
  { src: photo3, height: 190 },
  { src: photo4, height: 140 },
]

const COLUMN_2 = [
  { src: photo5, height: 190 },
  { src: photo1, height: 180 },
  { src: photo2, height: 160 },
  { src: photo3, height: 190 },
]

export default function AllPhotosScreen({
  restaurant,
  isSaved,
  onToggleSave,
  onBack,
  onGoHome,
  onOpenDiscover,
  onOpenFoodies,
  onOpenProfile,
}) {
  if (!restaurant) return null

  return (
    <div className="aps phone-screen">
      <RestaurantSubHeader
        restaurant={restaurant}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onBack={onBack}
      />

      <main className="aps-body">
        <div className="aps-section-title">
          <p className="aps-section-title__label">Photos</p>
          <p className="aps-section-title__count">(23)</p>
        </div>

        <div className="aps-grid">
          <div className="aps-column">
            {COLUMN_1.map((photo, index) => (
              <div className="aps-tile" style={{ height: photo.height }} key={`c1-${index}`}>
                <img src={photo.src} alt="" className="aps-tile__img" />
              </div>
            ))}
          </div>
          <div className="aps-column">
            {COLUMN_2.map((photo, index) => (
              <div className="aps-tile" style={{ height: photo.height }} key={`c2-${index}`}>
                <img src={photo.src} alt="" className="aps-tile__img" />
              </div>
            ))}
          </div>
        </div>
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
