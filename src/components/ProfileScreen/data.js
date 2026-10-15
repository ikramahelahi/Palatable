import postWeekend from '../../assets/home-feed/post-weekend.png'
import messageSquareIcon from '../../assets/home-feed/icons/message-square.svg'

export const PROFILE = {
  username: 'ikramahelahi',
  displayName: 'Ikramah Elahi',
  initials: 'IE',
  stats: {
    restaurantsVisited: 25,
    restaurantsVisitedDelta: '+5 this month',
    restaurantsVisitedProgress: 0.61,
    cuisinesTasted: 16,
    mostVisitedRestaurant: "Xander's",
    reviewsWritten: 12,
    reviewsWrittenDelta: '+2 this month',
  },
}

export const MY_POST = {
  id: 'my-post-1',
  author: 'ikramahelahi',
  avatarInitials: 'IE',
  timestamp: '5 hours ago',
  text: "Ready for the weekend! Just wrapped up a big project and can't wait to relax.",
  image: postWeekend,
  imageAlt: 'Cozy candlelit interior with string lights',
  likeCount: '1.2k',
  likeTone: 'neutral',
  secondaryStats: [{ icon: messageSquareIcon, label: '45', tone: 'neutral', type: 'comment' }],
  restaurantName: 'Olive Tree Bistro',
  handle: '@ikramahelahi',
  companionTag: 'Went with Friends',
  cuisineTag: 'Mediterranean Cuisine',
  ratings: { foodQuality: 'happy', valueForMoney: 'smile', ambience: 'happy', safety: 'happy', hygiene: 'smile' },
}

export const MY_BUCKETLIST = [
  { id: 'kolachi', name: 'Kolachi Restaurant', visited: false, cuisine: 'Pakistani' },
  { id: 'cafe-flo', name: 'Cafe Flo', visited: false, cuisine: 'French' },
  { id: 'xanders', name: "Xander's", visited: false, cuisine: 'Fusion' },
  { id: 'okra', name: 'Okra', visited: false, cuisine: 'Mediterranean' },
  { id: 'sakura', name: 'Sakura', visited: false, cuisine: 'Japanese' },
]
