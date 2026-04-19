import AppHeader from './components/layout/AppHeader'
import useBookingState from './features/booking/hooks/useBookingState'
import useHashPage from './hooks/useHashPage'
import BookingPage from './pages/BookingPage'
import HomePage from './pages/HomePage'

function App() {
  const { activePage, navigateToPage } = useHashPage()
  const { bookingState, bookingSummary, bookingActions, openBookingSelection } =
    useBookingState()

  const openBookingPage = (options = {}) => {
    openBookingSelection(options)
    navigateToPage('booking')
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(244,177,118,0.32),transparent_48%)]" />
      <div className="absolute right-0 top-20 -z-10 h-80 w-80 rounded-full bg-[#0f4e45]/10 blur-3xl" />

      <AppHeader
        activePage={activePage}
        onNavigateHome={() => navigateToPage('home')}
        onNavigateBooking={() => navigateToPage('booking')}
        onStartBooking={() => openBookingPage({ modeId: 'bundle' })}
      />

      {activePage === 'home' ? (
        <HomePage
          onGoToBooking={() => navigateToPage('booking')}
          onOpenBookingPage={openBookingPage}
        />
      ) : (
        <BookingPage
          bookingState={bookingState}
          bookingSummary={bookingSummary}
          bookingActions={{
            ...bookingActions,
            onGoHome: () => navigateToPage('home'),
          }}
        />
      )}
    </div>
  )
}

export default App
