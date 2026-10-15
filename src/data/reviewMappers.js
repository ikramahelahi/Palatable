// Shape the different "review" data sources in the app (home feed posts,
// restaurant reviews, visited-restaurant entries) into the single shape the
// ReviewDetailScreen ("View Full Review") expects.

export function buildReviewFromPost(post) {
  return {
    restaurantName: post.restaurantName,
    username: post.handle,
    companionTag: post.companionTag,
    cuisineTag: post.cuisineTag,
    text: post.text,
    image: post.image,
    imageAlt: post.imageAlt,
    likeCount: post.likeCount,
    commentCount: post.secondaryStats?.find((stat) => stat.type === 'comment')?.label,
    ratings: post.ratings,
  }
}

export function buildReviewFromRestaurantReview(restaurant, review) {
  return {
    restaurantName: restaurant?.name ?? '',
    username: review.handle,
    companionTag: review.companionTag,
    cuisineTag: review.cuisineTag,
    text: review.text,
    likeCount: review.likeCount,
    commentCount: review.commentCount,
    ratings: review.ratings,
  }
}

export function buildReviewFromVisitedRestaurant(restaurant, username) {
  return {
    restaurantName: restaurant.name,
    username,
    companionTag: 'Went with Solo',
    cuisineTag: `${restaurant.cuisine ?? 'Restaurant'} Cuisine`,
    text: `You marked ${restaurant.name} as visited. Add a written review to remember the visit!`,
    image: restaurant.thumbnail,
    likeCount: 0,
    commentCount: 0,
    ratings: { foodQuality: null, valueForMoney: null, ambience: null, safety: null, hygiene: null },
  }
}
