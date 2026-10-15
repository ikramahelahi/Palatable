import { RESTAURANTS } from '../components/DiscoverScreen/data'

const RESTAURANTS_BY_ID = Object.fromEntries(RESTAURANTS.map((restaurant) => [restaurant.id, restaurant]))

export function getRestaurantsByIds(ids) {
  return ids.map((id) => RESTAURANTS_BY_ID[id]).filter(Boolean)
}

export const INITIAL_SQUADS = {
  'uni-gang': {
    id: 'uni-gang',
    name: 'Uni Gang',
    initials: 'UG',
    stats: {
      restaurantsVisited: 25,
      restaurantsVisitedDelta: '+5 this month',
      restaurantsVisitedProgress: 0.61,
      cuisinesTasted: 16,
      tasteMatch: 83,
      topRestaurantName: "Xander's",
      topRestaurantNote: 'Voted best by the squad',
      reviewsWritten: 34,
      reviewsWrittenDelta: '+8 this month',
    },
    suggestedIds: ['xanders', 'olive-tree-bistro', 'oyster-bay', 'croissant-guy', 'evergreen'],
    bucketlist: [
      { id: 'kolachi', name: 'Kolachi Restaurant', visited: true },
      { id: 'cafe-flo', name: 'Cafe Flo', visited: true },
      { id: 'xanders-visit', name: "Xander's", visited: true },
      { id: 'okra', name: 'Okra', visited: false },
      { id: 'sakura', name: 'Sakura', visited: false },
    ],
    members: [
      { id: 'ikramah-elahi', name: 'Ikramah Elahi', initials: 'IE', isAdmin: true },
      { id: 'sara-khan', name: 'Sara Khan', initials: 'SK', isAdmin: false },
      { id: 'ali-raza', name: 'Ali Raza', initials: 'AR', isAdmin: false },
      { id: 'zainab-ahmed', name: 'Zainab Ahmed', initials: 'ZA', isAdmin: false },
      { id: 'omar-farooq', name: 'Omar Farooq', initials: 'OF', isAdmin: false },
    ],
  },
  'the-interns': {
    id: 'the-interns',
    name: 'The Interns',
    initials: 'TI',
    stats: {
      restaurantsVisited: 9,
      restaurantsVisitedDelta: '+2 this month',
      restaurantsVisitedProgress: 0.32,
      cuisinesTasted: 7,
      tasteMatch: 76,
      topRestaurantName: 'Mocha House',
      topRestaurantNote: 'Everyone’s go-to coffee run',
      reviewsWritten: 11,
      reviewsWrittenDelta: '+3 this month',
    },
    suggestedIds: ['mocha-house', 'bella-pasta', 'sunset-grill', 'evergreen', 'oyster-bay'],
    bucketlist: [
      { id: 'okra', name: 'Okra', visited: false },
      { id: 'sakura', name: 'Sakura', visited: false },
    ],
    members: [
      { id: 'zara-sheikh', name: 'Zara Sheikh', initials: 'ZS', isAdmin: true },
      { id: 'hamza-iqbal', name: 'Hamza Iqbal', initials: 'HI', isAdmin: false },
      { id: 'mina-aslam', name: 'Mina Aslam', initials: 'MA', isAdmin: false },
      { id: 'adeel-nasir', name: 'Adeel Nasir', initials: 'AN', isAdmin: false },
    ],
  },
  family: {
    id: 'family',
    name: 'Family',
    initials: 'FM',
    stats: {
      restaurantsVisited: 41,
      restaurantsVisitedDelta: '+3 this month',
      restaurantsVisitedProgress: 0.88,
      cuisinesTasted: 21,
      tasteMatch: 91,
      topRestaurantName: 'Olive Tree Bistro',
      topRestaurantNote: 'Sunday tradition since 2019',
      reviewsWritten: 52,
      reviewsWrittenDelta: '+6 this month',
    },
    suggestedIds: ['olive-tree-bistro', 'croissant-guy', 'bella-pasta', 'xanders', 'evergreen'],
    bucketlist: [
      { id: 'kolachi', name: 'Kolachi Restaurant', visited: true },
      { id: 'cafe-flo', name: 'Cafe Flo', visited: false },
      { id: 'sakura', name: 'Sakura', visited: true },
    ],
    members: [
      { id: 'ahmed-raza', name: 'Ahmed Raza', initials: 'AR', isAdmin: true },
      { id: 'fatima-raza', name: 'Fatima Raza', initials: 'FR', isAdmin: false },
      { id: 'bilal-raza', name: 'Bilal Raza', initials: 'BR', isAdmin: false },
      { id: 'sana-raza', name: 'Sana Raza', initials: 'SR', isAdmin: false },
      { id: 'zoya-raza', name: 'Zoya Raza', initials: 'ZR', isAdmin: false },
    ],
  },
}
