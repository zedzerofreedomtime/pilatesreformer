import HomeCtaSection from '../features/home/sections/HomeCtaSection'
import HomeHeroSection from '../features/home/sections/HomeHeroSection'
import HomeHighlightsSection from '../features/home/sections/HomeHighlightsSection'
import HomeProcessSection from '../features/home/sections/HomeProcessSection'
import HomeTopRentalsSection from '../features/home/sections/HomeTopRentalsSection'

function HomePage({
  homePageContent,
  homeStats,
  catalogError,
  isCatalogLoading,
  onGoToBooking,
  onOpenBookingPage,
  onRetryCatalogLoad,
  topRentedCards,
}) {
  if (isCatalogLoading && !homePageContent) {
    return (
      <main className="mx-auto flex max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="panel w-full p-8 sm:p-10">
          <span className="eyebrow">Catalog Status</span>
          <h1 className="mt-4 font-display text-4xl text-slate-900">
            Loading homepage content...
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            The frontend is waiting for the API to return the latest homepage
            content and catalog data.
          </p>
        </section>
      </main>
    )
  }

  if (!homePageContent) {
    return (
      <main className="mx-auto flex max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="panel w-full p-8 sm:p-10">
          <span className="eyebrow">Catalog Status</span>
          <h1 className="mt-4 font-display text-4xl text-slate-900">
            Homepage data is unavailable
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {catalogError || 'The API did not return homepage content.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void onRetryCatalogLoad()}
              className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
            >
              Retry API connection
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <HomeHeroSection
        bookingModes={homePageContent.bookingModes ?? []}
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
