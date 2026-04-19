import HomeCtaSection from '../features/home/sections/HomeCtaSection'
import HomeHeroSection from '../features/home/sections/HomeHeroSection'
import HomeHighlightsSection from '../features/home/sections/HomeHighlightsSection'
import HomeProcessSection from '../features/home/sections/HomeProcessSection'
import HomeTopRentalsSection from '../features/home/sections/HomeTopRentalsSection'

function HomePage({
  homePageContent,
  homeStats,
  onGoToBooking,
  onOpenBookingPage,
  topRentedCards,
}) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <HomeHeroSection
        bookingModes={homePageContent.bookingModes}
        heroAside={homePageContent.heroAside}
        heroContent={homePageContent.hero}
        homeStats={homeStats}
        onGoToBooking={onGoToBooking}
        onOpenBookingPage={onOpenBookingPage}
      />

      <HomeTopRentalsSection
        sectionContent={homePageContent.topRentals}
        topRentedCards={topRentedCards}
        onOpenBookingPage={onOpenBookingPage}
      />

      <HomeHighlightsSection serviceHighlights={homePageContent.highlights} />
      <HomeProcessSection processContent={homePageContent.process} />
      <HomeCtaSection ctaContent={homePageContent.cta} onOpenBookingPage={onOpenBookingPage} />
    </main>
  )
}

export default HomePage
