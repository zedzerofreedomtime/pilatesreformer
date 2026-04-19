import {
  bookingModes,
  homeStats,
  processSteps,
  serviceHighlights,
  topRentedCards,
} from '../data/siteData'
import HomeCtaSection from '../features/home/sections/HomeCtaSection'
import HomeHeroSection from '../features/home/sections/HomeHeroSection'
import HomeHighlightsSection from '../features/home/sections/HomeHighlightsSection'
import HomeProcessSection from '../features/home/sections/HomeProcessSection'
import HomeTopRentalsSection from '../features/home/sections/HomeTopRentalsSection'

function HomePage({ onGoToBooking, onOpenBookingPage }) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <HomeHeroSection
        bookingModes={bookingModes}
        homeStats={homeStats}
        onGoToBooking={onGoToBooking}
        onOpenBookingPage={onOpenBookingPage}
      />

      <HomeTopRentalsSection
        topRentedCards={topRentedCards}
        onOpenBookingPage={onOpenBookingPage}
      />

      <HomeHighlightsSection serviceHighlights={serviceHighlights} />
      <HomeProcessSection processSteps={processSteps} />
      <HomeCtaSection onOpenBookingPage={onOpenBookingPage} />
    </main>
  )
}

export default HomePage
