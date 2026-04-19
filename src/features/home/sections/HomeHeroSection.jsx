function HomeHeroSection({
  bookingModes,
  heroAside,
  heroContent,
  homeStats,
  onGoToBooking,
  onOpenBookingPage,
}) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div>
        <span className="eyebrow">{heroContent.eyebrow}</span>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl">
          {heroContent.titleLine1}
          <span className="block text-[#9b5d32]">{heroContent.titleLine2}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {heroContent.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onGoToBooking}
            className="rounded-full bg-[#123a35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
          >
            {heroContent.primaryButtonLabel}
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenBookingPage({
                modeId: 'equipment-only',
                equipmentId: 'reformer',
              })
            }
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
          >
            {heroContent.secondaryButtonLabel}
          </button>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {homeStats.map((item) => (
            <article key={item.label} className="panel p-5">
              <p className="font-display text-3xl text-[#123a35]">{item.value}</p>
              <h2 className="mt-3 text-base font-semibold text-slate-900">
                {item.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <aside className="accent-panel soft-grid relative overflow-hidden p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
          {heroAside.badge}
        </span>
        <h2 className="mt-5 max-w-lg font-display text-4xl leading-tight text-white sm:text-5xl">
          {heroAside.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
          {heroAside.description}
        </p>

        <div className="mt-8 grid gap-4">
          {bookingModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onOpenBookingPage({ modeId: mode.id })}
              className="rounded-[28px] border border-white/12 bg-white/8 p-5 text-left transition hover:bg-white/12"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-[#f4c38f]">
                {mode.subtitle}
              </p>
              <p className="mt-2 font-display text-3xl text-white">
                {mode.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/75">
                {mode.description}
              </p>
            </button>
          ))}
        </div>
      </aside>
    </section>
  )
}

export default HomeHeroSection
