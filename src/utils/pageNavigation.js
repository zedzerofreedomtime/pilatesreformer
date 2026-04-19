export const getPageFromHash = () => {
  if (typeof window === 'undefined') {
    return 'home'
  }

  return window.location.hash.replace('#', '').toLowerCase() === 'booking'
    ? 'booking'
    : 'home'
}

export const getHashForPage = (page) =>
  page === 'booking' ? '#booking' : '#home'
