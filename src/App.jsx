import { useEffect, useRef, useState } from 'react'
import './App.css'
import HomeFeed from './components/HomeFeed/HomeFeed'
import ReviewScreen from './components/ReviewScreen/ReviewScreen'
import CommentsScreen from './components/CommentsScreen/CommentsScreen'
import NotificationsScreen from './components/NotificationsScreen/NotificationsScreen'
import FollowRequestsScreen from './components/FollowRequestsScreen/FollowRequestsScreen'
import DiscoverScreen from './components/DiscoverScreen/DiscoverScreen'
import RestaurantScreen from './components/RestaurantScreen/RestaurantScreen'
import AllReviewsScreen from './components/RestaurantScreen/AllReviewsScreen'
import AllPhotosScreen from './components/RestaurantScreen/AllPhotosScreen'
import FoodiesScreen from './components/FoodiesScreen/FoodiesScreen'
import SquadScreen from './components/SquadScreen/SquadScreen'
import SquadDetailsScreen from './components/SquadDetailsScreen/SquadDetailsScreen'
import AddMembersScreen from './components/AddMembersScreen/AddMembersScreen'
import AddFriendsScreen from './components/AddFriendsScreen/AddFriendsScreen'
import CreateSquadScreen from './components/CreateSquadScreen/CreateSquadScreen'
import ProfileScreen from './components/ProfileScreen/ProfileScreen'
import SettingsScreen from './components/SettingsScreen/SettingsScreen'
import SavedReviewsScreen from './components/SavedReviewsScreen/SavedReviewsScreen'
import BadgesScreen from './components/BadgesScreen/BadgesScreen'
import AnalyticsScreen from './components/AnalyticsScreen/AnalyticsScreen'
import ReviewDetailScreen from './components/ReviewDetailScreen/ReviewDetailScreen'
import FollowListScreen from './components/FollowListScreen/FollowListScreen'
import LoginScreen from './components/LoginScreen/LoginScreen'
import LocationScreen from './components/LocationScreen/LocationScreen'
import PreferencesScreen from './components/PreferencesScreen/PreferencesScreen'
import DiningHabitsScreen from './components/DiningHabitsScreen/DiningHabitsScreen'
import RestaurantPreferencesScreen from './components/RestaurantPreferencesScreen/RestaurantPreferencesScreen'
import VibeScreen from './components/VibeScreen/VibeScreen'
import OnboardingSuccessScreen from './components/OnboardingSuccessScreen/OnboardingSuccessScreen'
import { ToastProvider } from './components/shared/Toast/ToastContext'
import { getRestaurantsByIds, INITIAL_SQUADS } from './data/squads'
import { MY_BUCKETLIST, PROFILE } from './components/ProfileScreen/data'
import { FOLLOWERS_INITIAL, FOLLOWING_INITIAL } from './components/FollowListScreen/data'
import { DEFAULT_THUMBNAIL, VISITED_RESTAURANTS } from './components/AnalyticsScreen/data'
import {
  buildReviewFromPost,
  buildReviewFromRestaurantReview,
  buildReviewFromVisitedRestaurant,
} from './data/reviewMappers'

const SCREEN_ORDER = [
  'review',
  'comments',
  'notifications',
  'followRequests',
  'restaurant',
  'allReviews',
  'allPhotos',
  'squad',
  'squadDetails',
  'addMembers',
  'addFriends',
  'createSquad',
  'settings',
  'savedReviews',
  'badges',
  'analytics',
  'squadAnalytics',
  'reviewDetail',
  'followList',
]

const RESTAURANT_CONTEXT_SCREENS = {
  restaurant: RestaurantScreen,
  allReviews: AllReviewsScreen,
  allPhotos: AllPhotosScreen,
}

function App() {
  const [basePage, setBasePage] = useState('login')
  const [currentUser, setCurrentUser] = useState(PROFILE)
  const [stack, setStack] = useState([])
  const [reviewRestaurantName, setReviewRestaurantName] = useState('')
  const [reviewToken, setReviewToken] = useState(0)
  const [activeRestaurant, setActiveRestaurant] = useState(null)
  const [activeSquadId, setActiveSquadId] = useState(null)
  const [squads, setSquads] = useState(() => JSON.parse(JSON.stringify(INITIAL_SQUADS)))
  const [savedRestaurantIds, setSavedRestaurantIds] = useState(() => new Set())
  const [featuredBadgeIds, setFeaturedBadgeIds] = useState(() => [])
  const [likedPostIds, setLikedPostIds] = useState(() => new Set())
  const [savedPostIds, setSavedPostIds] = useState(() => new Set())
  const [bucketlist, setBucketlist] = useState(() => MY_BUCKETLIST)
  const [visitedRestaurants, setVisitedRestaurants] = useState(() => VISITED_RESTAURANTS)
  const [activeReview, setActiveReview] = useState(null)
  const [followers, setFollowers] = useState(() => FOLLOWERS_INITIAL)
  const [following, setFollowing] = useState(() => FOLLOWING_INITIAL)
  const [followListTab, setFollowListTab] = useState('followers')
  const [followListToken, setFollowListToken] = useState(0)
  const [exitingZIndex, setExitingZIndex] = useState({})
  const prevStackRef = useRef([])

  useEffect(() => {
    const prevStack = prevStackRef.current
    const removed = prevStack.filter((name) => !stack.includes(name))
    if (removed.length > 0) {
      setExitingZIndex((prev) => {
        const next = { ...prev }
        removed.forEach((name) => {
          next[name] = prevStack.indexOf(name) + 2
        })
        return next
      })
    }
    prevStackRef.current = stack
  }, [stack])

  const pushScreen = (name) => setStack((prev) => [...prev, name])
  const pop = () => setStack((prev) => prev.slice(0, -1))
  const goHome = () => {
    setBasePage('home')
    setStack([])
  }
  const handleEnterApp = (credentials) => {
    if (credentials?.email) {
      const username = credentials.username || credentials.email.split('@')[0]
      const displayName = credentials.fullName || username
      const initials = displayName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
      setCurrentUser((previous) => ({ ...previous, username, displayName, initials }))
    }
    setBasePage('home')
    setStack([])
  }
  const goLogin = () => {
    setBasePage('login')
    setStack([])
  }
  const goSignup = () => {
    setBasePage('signup')
    setStack([])
  }
  const goLocationOnboarding = () => {
    setBasePage('location')
    setStack([])
  }
  const startOnboarding = (credentials) => {
    handleEnterApp(credentials)
    setBasePage('location')
  }
  const goPreferencesOnboarding = () => {
    setBasePage('preferences')
    setStack([])
  }
  const goDiningHabitsOnboarding = () => {
    setBasePage('diningHabits')
    setStack([])
  }
  const goRestaurantPreferencesOnboarding = () => {
    setBasePage('restaurantPreferences')
    setStack([])
  }
  const goVibeOnboarding = () => {
    setBasePage('vibe')
    setStack([])
  }
  const goOnboardingSuccess = () => {
    setBasePage('onboardingSuccess')
    setStack([])
  }
  const goDiscover = () => {
    setBasePage('discover')
    setStack([])
  }
  const goFoodies = () => {
    setBasePage('foodies')
    setStack([])
  }
  const goProfile = () => {
    setBasePage('profile')
    setStack([])
  }
  const openReviewFromHome = () => {
    setReviewRestaurantName('')
    setReviewToken((token) => token + 1)
    pushScreen('review')
  }
  const openReviewFromRestaurant = (name) => {
    setReviewRestaurantName(name)
    setReviewToken((token) => token + 1)
    pushScreen('review')
  }
  const openRestaurant = (restaurant) => {
    setActiveRestaurant(restaurant)
    pushScreen('restaurant')
  }
  const openReviewDetail = (review, postId = null) => {
    setActiveReview({ ...review, postId })
    pushScreen('reviewDetail')
  }
  const openSquad = (squadId) => {
    setActiveSquadId(squadId)
    pushScreen('squad')
  }
  const renameSquad = (squadId, newName) => {
    setSquads((prev) => ({
      ...prev,
      [squadId]: { ...prev[squadId], name: newName },
    }))
  }
  const removeSquadMember = (squadId, memberId) => {
    setSquads((prev) => ({
      ...prev,
      [squadId]: {
        ...prev[squadId],
        members: prev[squadId].members.filter((member) => member.id !== memberId),
      },
    }))
  }
  const addSquadMembers = (squadId, newMembers) => {
    setSquads((prev) => ({
      ...prev,
      [squadId]: {
        ...prev[squadId],
        members: [
          ...prev[squadId].members,
          ...newMembers.map((member) => ({ ...member, isAdmin: false })),
        ],
      },
    }))
  }
  const createSquad = ({ name, members }) => {
    const id = `squad-${Date.now()}`
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase()

    setSquads((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        initials,
        stats: {
          restaurantsVisited: 0,
          restaurantsVisitedDelta: '+0 this month',
          restaurantsVisitedProgress: 0,
          cuisinesTasted: 0,
          tasteMatch: 0,
          topRestaurantName: '—',
          topRestaurantNote: 'No visits yet',
          reviewsWritten: 0,
          reviewsWrittenDelta: '+0 this month',
        },
        suggestedIds: [],
        bucketlist: [],
        members: [
          { id: currentUser.username, name: currentUser.displayName, initials: currentUser.initials, isAdmin: true },
          ...members.map((member) => ({ ...member, isAdmin: false })),
        ],
      },
    }))
  }
  const toggleFeaturedBadge = (badgeId) => {
    setFeaturedBadgeIds((prev) => {
      if (prev.includes(badgeId)) return prev.filter((id) => id !== badgeId)
      if (prev.length >= 3) return prev
      return [...prev, badgeId]
    })
  }
  const toggleSaveRestaurant = (id) => {
    setSavedRestaurantIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }
  const toggleLikePost = (id) => {
    setLikedPostIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }
  const toggleSavePost = (id) => {
    setSavedPostIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }
  const markBucketlistItemVisited = (id) => {
    const item = bucketlist.find((entry) => entry.id === id)
    if (!item) return

    // Ticking a bucketlist item moves it to Analytics: it's removed from the
    // bucketlist and added to the Visited list, it never just toggles a flag.
    setBucketlist((prev) => prev.filter((entry) => entry.id !== id))
    setVisitedRestaurants((prev) => {
      if (prev.some((restaurant) => restaurant.id === id)) return prev
      return [
        {
          id: item.id,
          name: item.name,
          visitedLabel: 'Visited just now',
          daysAgo: 0,
          visitCount: 1,
          thumbnail: DEFAULT_THUMBNAIL,
          cuisine: item.cuisine,
        },
        ...prev,
      ]
    })
  }
  const deleteFromBucketlist = (id) => {
    setBucketlist((prev) => prev.filter((item) => item.id !== id))
  }
  const saveProfile = (values) => {
    const username = values.username.replace(/^@/, '').trim()
    const displayName = values.displayName.trim() || username
    const initials = displayName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    setCurrentUser((previous) => ({ ...previous, ...values, username, displayName, initials }))
    setSquads((previous) => Object.fromEntries(Object.entries(previous).map(([id, squad]) => [id, {
      ...squad,
      members: squad.members.map((member) => member.id === currentUser.username ? { ...member, id: username, name: displayName, initials } : member),
    }])))
  }
  const toggleSquadBucketlist = (squadId, id) => {
    setSquads((previous) => {
      const squad = previous[squadId]
      if (!squad) return previous
      const exists = squad.bucketlist.some((item) => item.id === id)
      const restaurant = getRestaurantsByIds([id])[0]
      const newItem = restaurant ? { id: restaurant.id, name: restaurant.name, cuisine: restaurant.cuisine, visited: false } : null
      return { ...previous, [squadId]: { ...squad, bucketlist: exists ? squad.bucketlist.filter((item) => item.id !== id) : newItem ? [...squad.bucketlist, newItem] : squad.bucketlist } }
    })
  }
  const markSquadBucketlistVisited = (squadId, id) => {
    setSquads((previous) => {
      const squad = previous[squadId]
      const item = squad?.bucketlist.find((entry) => entry.id === id)
      if (!item) return previous
      const restaurant = { id: item.id, name: item.name, visitedLabel: 'Visited just now', daysAgo: 0, visitCount: 1, cuisine: item.cuisine ?? 'Restaurant' }
      return { ...previous, [squadId]: { ...squad, bucketlist: squad.bucketlist.filter((entry) => entry.id !== id), visitedRestaurants: [restaurant, ...(squad.visitedRestaurants ?? squad.bucketlist.filter((entry) => entry.visited).map((entry) => ({ id: entry.id, name: entry.name, visitedLabel: 'Visited previously', daysAgo: 30, visitCount: 1, cuisine: entry.cuisine ?? 'Restaurant' })))].filter((entry, index, list) => list.findIndex((item) => item.id === entry.id) === index) } }
    })
  }
  const deleteSquadBucketlistItem = (squadId, id) => setSquads((previous) => ({ ...previous, [squadId]: { ...previous[squadId], bucketlist: previous[squadId].bucketlist.filter((item) => item.id !== id) } }))
  const openFollowers = () => {
    setFollowListTab('followers')
    setFollowListToken((token) => token + 1)
    pushScreen('followList')
  }
  const openFollowing = () => {
    setFollowListTab('following')
    setFollowListToken((token) => token + 1)
    pushScreen('followList')
  }
  const unfollowFollower = (id) => {
    setFollowers((prev) => prev.filter((person) => person.id !== id))
  }
  const removeFollowing = (id) => {
    setFollowing((prev) => prev.filter((person) => person.id !== id))
  }

  const isStackCovered = stack.length > 0
  const activeTab =
    basePage === 'discover'
      ? 'Discover'
      : basePage === 'foodies'
        ? 'Foodies'
        : basePage === 'profile'
          ? 'Profile'
          : 'Home'

  return (
    <div className="app-shell">
      <ToastProvider>
        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'login' ? undefined : 'none' }}
          aria-hidden={basePage !== 'login'}
          inert={basePage !== 'login'}
        >
          <LoginScreen mode="login" onLogin={handleEnterApp} onGoSignup={goSignup} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'signup' ? undefined : 'none' }}
          aria-hidden={basePage !== 'signup'}
          inert={basePage !== 'signup'}
        >
          <LoginScreen mode="signup" onLogin={startOnboarding} onGoLogin={goLogin} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'location' ? undefined : 'none' }}
          aria-hidden={basePage !== 'location'}
          inert={basePage !== 'location'}
        >
          <LocationScreen onStart={goPreferencesOnboarding} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'preferences' ? undefined : 'none' }}
          aria-hidden={basePage !== 'preferences'}
          inert={basePage !== 'preferences'}
        >
          <PreferencesScreen onBack={goLocationOnboarding} onNext={goDiningHabitsOnboarding} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'diningHabits' ? undefined : 'none' }}
          aria-hidden={basePage !== 'diningHabits'}
          inert={basePage !== 'diningHabits'}
        >
          <DiningHabitsScreen onBack={goPreferencesOnboarding} onNext={goRestaurantPreferencesOnboarding} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'restaurantPreferences' ? undefined : 'none' }}
          aria-hidden={basePage !== 'restaurantPreferences'}
          inert={basePage !== 'restaurantPreferences'}
        >
          <RestaurantPreferencesScreen onBack={goDiningHabitsOnboarding} onNext={goVibeOnboarding} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'vibe' ? undefined : 'none' }}
          aria-hidden={basePage !== 'vibe'}
          inert={basePage !== 'vibe'}
        >
          <VibeScreen onBack={goRestaurantPreferencesOnboarding} onFinish={goOnboardingSuccess} />
        </div>

        <div
          className="app-screen app-screen--home"
          style={{ display: basePage === 'onboardingSuccess' ? undefined : 'none' }}
          aria-hidden={basePage !== 'onboardingSuccess'}
          inert={basePage !== 'onboardingSuccess'}
        >
          <OnboardingSuccessScreen onExplore={handleEnterApp} />
        </div>

        <div
          className={`app-screen app-screen--home${isStackCovered ? ' app-screen--home-pushed' : ''}`}
          style={{ display: basePage === 'home' ? undefined : 'none' }}
          aria-hidden={isStackCovered}
          inert={isStackCovered}
        >
          <HomeFeed
            onOpenReview={openReviewFromHome}
            onOpenReviewDetail={(post) => openReviewDetail(buildReviewFromPost(post), post.id)}
            onOpenComments={() => pushScreen('comments')}
            onOpenNotifications={() => pushScreen('notifications')}
            onGoHome={goHome}
            onOpenDiscover={goDiscover}
            onOpenFoodies={goFoodies}
            onOpenProfile={goProfile}
            likedPostIds={likedPostIds}
            savedPostIds={savedPostIds}
            onToggleLikePost={toggleLikePost}
            onToggleSavePost={toggleSavePost}
            currentUser={currentUser}
          />
          <div className="app-screen__dim" />
        </div>

        <div
          className={`app-screen app-screen--home${isStackCovered ? ' app-screen--home-pushed' : ''}`}
          style={{ display: basePage === 'discover' ? undefined : 'none' }}
          aria-hidden={isStackCovered}
          inert={isStackCovered}
        >
          <DiscoverScreen
            onGoHome={goHome}
            onOpenDiscover={goDiscover}
            onOpenFoodies={goFoodies}
            onOpenProfile={goProfile}
            onOpenRestaurant={openRestaurant}
            savedIds={savedRestaurantIds}
            onToggleSave={toggleSaveRestaurant}
          />
          <div className="app-screen__dim" />
        </div>

        <div
          className={`app-screen app-screen--home${isStackCovered ? ' app-screen--home-pushed' : ''}`}
          style={{ display: basePage === 'foodies' ? undefined : 'none' }}
          aria-hidden={isStackCovered}
          inert={isStackCovered}
        >
          <FoodiesScreen
            squads={squads}
            onGoHome={goHome}
            onOpenDiscover={goDiscover}
            onOpenFoodies={goFoodies}
            onOpenProfile={goProfile}
            onOpenSquad={openSquad}
            onOpenAddFriends={() => pushScreen('addFriends')}
            onOpenCreateSquad={() => pushScreen('createSquad')}
          />
          <div className="app-screen__dim" />
        </div>

        <div
          className={`app-screen app-screen--home${isStackCovered ? ' app-screen--home-pushed' : ''}`}
          style={{ display: basePage === 'profile' ? undefined : 'none' }}
          aria-hidden={isStackCovered}
          inert={isStackCovered}
        >
          <ProfileScreen
            squads={squads}
            onGoHome={goHome}
            onOpenDiscover={goDiscover}
            onOpenFoodies={goFoodies}
            onOpenProfile={goProfile}
            onOpenComments={() => pushScreen('comments')}
            onOpenReviewDetail={(post) => openReviewDetail(buildReviewFromPost(post), post.id)}
            onOpenSettings={() => pushScreen('settings')}
            onOpenSavedReviews={() => pushScreen('savedReviews')}
            onOpenBadges={() => pushScreen('badges')}
            onOpenAnalytics={() => pushScreen('analytics')}
            onOpenFollowers={openFollowers}
            onOpenFollowing={openFollowing}
            followersCount={followers.length}
            followingCount={following.length}
            featuredBadgeIds={featuredBadgeIds}
            bucketlist={bucketlist}
            onToggleBucketlistVisited={markBucketlistItemVisited}
            onDeleteFromBucketlist={deleteFromBucketlist}
            onLogout={goLogin}
            currentUser={currentUser}
          />
          <div className="app-screen__dim" />
        </div>

      {SCREEN_ORDER.map((name) => {
        const depth = stack.indexOf(name)
        const isPresent = depth !== -1
        const isActive = isPresent && depth === stack.length - 1
        const isBehind = isPresent && !isActive

        const zIndex = isPresent ? depth + 2 : (exitingZIndex[name] ?? 0)

        const props = {
          onBack: pop,
          onGoHome: goHome,
          onOpenDiscover: goDiscover,
          onOpenFoodies: goFoodies,
          onOpenProfile: goProfile,
          activeTab,
        }

        let Screen
        let key = name
        if (name === 'review') {
          Screen = ReviewScreen
          props.initialRestaurant = reviewRestaurantName
          key = `review-${reviewToken}`
        } else if (name === 'comments') {
          Screen = CommentsScreen
          props.currentUser = currentUser
        } else if (name === 'notifications') {
          Screen = NotificationsScreen
          props.onOpenFollowRequests = () => pushScreen('followRequests')
        } else if (name === 'followRequests') {
          Screen = FollowRequestsScreen
        } else if (name === 'squad') {
          Screen = SquadScreen
          props.squad = squads[activeSquadId]
          props.onOpenRestaurant = openRestaurant
          props.onOpenSquadDetails = () => pushScreen('squadDetails')
          props.onOpenAnalytics = () => pushScreen('squadAnalytics')
          props.onToggleSquadBucketlist = (id) => toggleSquadBucketlist(activeSquadId, id)
          props.onMarkBucketlistVisited = (id) => markSquadBucketlistVisited(activeSquadId, id)
          props.onDeleteBucketlistItem = (id) => deleteSquadBucketlistItem(activeSquadId, id)
          key = `squad-${activeSquadId}`
        } else if (name === 'squadDetails') {
          Screen = SquadDetailsScreen
          props.squad = squads[activeSquadId]
          props.onOpenAddMembers = () => pushScreen('addMembers')
          props.onRenameSquad = renameSquad
          props.onRemoveMember = removeSquadMember
          key = `squadDetails-${activeSquadId}`
        } else if (name === 'addMembers') {
          Screen = AddMembersScreen
          props.squad = squads[activeSquadId]
          props.onConfirmAddMembers = addSquadMembers
          key = `addMembers-${activeSquadId}`
        } else if (name === 'addFriends') {
          Screen = AddFriendsScreen
        } else if (name === 'createSquad') {
          Screen = CreateSquadScreen
          props.onCreateSquad = createSquad
        } else if (name === 'settings') {
          Screen = SettingsScreen
          props.currentUser = currentUser
          props.onSaveProfile = saveProfile
        } else if (name === 'savedReviews') {
          Screen = SavedReviewsScreen
          props.onOpenComments = () => pushScreen('comments')
          props.onOpenReviewDetail = (post) => openReviewDetail(buildReviewFromPost(post))
          props.likedPostIds = likedPostIds
          props.savedPostIds = savedPostIds
          props.onToggleLikePost = toggleLikePost
          props.onToggleSavePost = toggleSavePost
        } else if (name === 'badges') {
          Screen = BadgesScreen
          props.featuredBadgeIds = featuredBadgeIds
          props.onToggleFeaturedBadge = toggleFeaturedBadge
        } else if (name === 'analytics') {
          Screen = AnalyticsScreen
          props.onOpenReview = (restaurant) =>
            openReviewDetail(buildReviewFromVisitedRestaurant(restaurant, `@${currentUser.username}`))
          props.restaurants = visitedRestaurants
        } else if (name === 'squadAnalytics') {
          Screen = AnalyticsScreen
          const squad = squads[activeSquadId]
          props.title = `${squad?.name ?? 'Squad'} Analytics`
          props.restaurants = squad?.visitedRestaurants ?? squad?.bucketlist.filter((item) => item.visited).map((item) => ({ id: item.id, name: item.name, visitedLabel: 'Visited previously', daysAgo: 30, visitCount: 1, cuisine: item.cuisine ?? 'Restaurant' })) ?? []
          props.onOpenReview = (restaurant) => openReviewDetail(buildReviewFromVisitedRestaurant(restaurant, `@${currentUser.username}`))
        } else if (name === 'reviewDetail') {
          Screen = ReviewDetailScreen
          props.review = activeReview
          props.onOpenComments = () => pushScreen('comments')
          props.isLiked = activeReview?.postId ? likedPostIds.has(activeReview.postId) : false
          props.isSaved = activeReview?.postId ? savedPostIds.has(activeReview.postId) : false
          props.onToggleLike = () => activeReview?.postId && toggleLikePost(activeReview.postId)
          props.onToggleSave = () => activeReview?.postId && toggleSavePost(activeReview.postId)
        } else if (name === 'followList') {
          Screen = FollowListScreen
          props.initialTab = followListTab
          props.followers = followers
          props.following = following
          props.onUnfollow = removeFollowing
          props.onRemoveFollowing = unfollowFollower
          key = `followList-${followListToken}`
        } else {
          Screen = RESTAURANT_CONTEXT_SCREENS[name]
          props.restaurant = activeRestaurant
          props.isSaved = activeRestaurant ? savedRestaurantIds.has(activeRestaurant.id) : false
          props.onToggleSave = toggleSaveRestaurant
          if (name === 'restaurant') {
            props.onAddReview = openReviewFromRestaurant
            props.onOpenAllReviews = () => pushScreen('allReviews')
            props.onOpenAllPhotos = () => pushScreen('allPhotos')
          }
          if (name === 'allReviews') {
            props.onOpenReviewDetail = (review) =>
              openReviewDetail(buildReviewFromRestaurantReview(activeRestaurant, review))
          }
        }

        return (
          <div
            key={name}
            className={`app-screen app-screen--stack${isPresent ? ' app-screen--stack-active' : ''}`}
            style={{ zIndex }}
            aria-hidden={!isActive}
            inert={!isActive}
            onTransitionEnd={(event) => {
              if (event.propertyName === 'transform' && !isPresent) {
                setExitingZIndex((prev) => {
                  if (!(name in prev)) return prev
                  const next = { ...prev }
                  delete next[name]
                  return next
                })
              }
            }}
          >
            <Screen key={key} {...props} />
            <div className={`app-screen__dim${isBehind ? ' app-screen__dim--visible' : ''}`} />
          </div>
        )
      })}
      </ToastProvider>
    </div>
  )
}

export default App
