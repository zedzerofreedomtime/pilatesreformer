export const getPageFromHash = () => {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const page = window.location.hash.replace('#', '').toLowerCase()

  if (page === 'booking') {
    return 'booking'
  }

  if (page === 'admin') {
    return 'admin'
  }

  if (page === 'admin-home-content') {
    return 'admin-home-content'
  }

  if (page === 'trainer') {
    return 'trainer'
  }

  return 'home'
}

export const getHashForPage = (page) =>
  page === 'booking'
    ? '#booking'
    : page === 'admin'
      ? '#admin'
      : page === 'admin-home-content'
        ? '#admin-home-content'
      : page === 'trainer'
        ? '#trainer'
        : '#home'
