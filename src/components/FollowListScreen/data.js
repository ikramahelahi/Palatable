const NAMES = [
  'Amira Hassan',
  'Bilal Malik',
  'Noor Qadir',
  'Hana Youssef',
  'Tariq Osman',
  'Layla Benali',
  'Yusuf Chowdhury',
  'Dina El-Amin',
  'Rami Khoury',
  'Fatima Aziz',
]

function toInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function buildList(prefix) {
  return NAMES.map((name, index) => ({
    id: `${prefix}-${index}`,
    name,
    initials: toInitials(name),
  }))
}

export const FOLLOWERS_INITIAL = buildList('follower')
export const FOLLOWING_INITIAL = buildList('following')
