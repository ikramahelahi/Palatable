import thumbXanders from '../DiscoverScreen/images/thumb-xanders.png'

export const DEFAULT_THUMBNAIL = thumbXanders

export const VISITED_SORT_OPTIONS = [
  { key: 'recent', label: 'Recently Visited' },
  { key: 'oldest', label: 'Oldest Visited' },
  { key: 'most-visited', label: 'Most Visited' },
  { key: 'name-asc', label: 'Name (A-Z)' },
  { key: 'name-desc', label: 'Name (Z-A)' },
]

export const CUISINE_SORT_OPTIONS = [
  { key: 'most-tried', label: 'Most Tried' },
  { key: 'least-tried', label: 'Least Tried' },
  { key: 'recent', label: 'Recently Tried' },
  { key: 'name-asc', label: 'Name (A-Z)' },
  { key: 'name-desc', label: 'Name (Z-A)' },
]

export const VISITED_RESTAURANTS = []

export const CUISINES = [
  {
    id: 'pakistani',
    name: 'Pakistani',
    timesTried: 5,
    lastTriedDaysAgo: 2,
    restaurants: [
      { name: 'Kolachi Restaurant', visitedLabel: 'Visited 2 days ago' },
      { name: 'Noorani Kabab House', visitedLabel: 'Visited 1 month ago' },
      { name: 'Cafe Karachi', visitedLabel: 'Visited 2 months ago' },
      { name: 'Lahore Grill', visitedLabel: 'Visited 3 months ago' },
      { name: 'Naan & Kabab', visitedLabel: 'Visited 4 months ago' },
    ],
  },
  {
    id: 'italian',
    name: 'Italian',
    timesTried: 4,
    lastTriedDaysAgo: 21,
    restaurants: [
      { name: 'Olive Tree Bistro', visitedLabel: 'Visited 3 weeks ago' },
      { name: 'Bella Pasta', visitedLabel: 'Visited 6 weeks ago' },
      { name: 'Bella Roma', visitedLabel: 'Visited 3 months ago' },
      { name: 'La Piazza', visitedLabel: 'Visited 7 months ago' },
    ],
  },
  {
    id: 'japanese',
    name: 'Japanese',
    timesTried: 3,
    lastTriedDaysAgo: 60,
    restaurants: [
      { name: 'Sakura', visitedLabel: 'Visited 2 months ago' },
      { name: 'Sushi Palace', visitedLabel: 'Visited 4 months ago' },
      { name: 'Umi Sushi Bar', visitedLabel: 'Visited 5 months ago' },
    ],
  },
  {
    id: 'chinese',
    name: 'Chinese',
    timesTried: 2,
    lastTriedDaysAgo: 62,
    restaurants: [
      { name: 'Golden Dragon', visitedLabel: 'Visited 2 months ago' },
      { name: 'Wok This Way', visitedLabel: 'Visited 5 months ago' },
    ],
  },
  {
    id: 'indian',
    name: 'Indian',
    timesTried: 2,
    lastTriedDaysAgo: 150,
    restaurants: [
      { name: 'Curry Corner', visitedLabel: 'Visited 5 months ago' },
      { name: 'Spice Route', visitedLabel: 'Visited 6 months ago' },
    ],
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    timesTried: 1,
    lastTriedDaysAgo: 90,
    restaurants: [{ name: 'The Levant Table', visitedLabel: 'Visited 3 months ago' }],
  },
  {
    id: 'french',
    name: 'French',
    timesTried: 1,
    lastTriedDaysAgo: 180,
    restaurants: [{ name: 'Bistro 47', visitedLabel: 'Visited 6 months ago' }],
  },
  {
    id: 'thai',
    name: 'Thai',
    timesTried: 1,
    lastTriedDaysAgo: 210,
    restaurants: [{ name: 'Bangkok Kitchen', visitedLabel: 'Visited 7 months ago' }],
  },
]
