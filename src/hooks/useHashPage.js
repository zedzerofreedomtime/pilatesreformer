import { useEffect, useState } from 'react'
import { getHashForPage, getPageFromHash } from '../utils/pageNavigation'

function useHashPage() {
  const [activePage, setActivePage] = useState(getPageFromHash)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    if (!window.location.hash) {
      window.history.replaceState(null, '', getHashForPage('home'))
    }

    const handleHashChange = () => {
      setActivePage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.hash !== getHashForPage(activePage)
    ) {
      window.history.replaceState(null, '', getHashForPage(activePage))
    }
  }, [activePage])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activePage])

  const navigateToPage = (page) => {
    setActivePage(page)

    if (typeof window !== 'undefined') {
      const nextHash = getHashForPage(page)

      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return {
    activePage,
    navigateToPage,
  }
}

export default useHashPage
