function HomeCtaSection({ ctaContent, onOpenBookingPage }) {
  return (
    <section>
      <div className="overflow-hidden rounded-[40px] bg-[#111b2c] px-6 py-8 text-white sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c38f]">
              {ctaContent.badge}
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-4xl text-white sm:text-5xl">
              {ctaContent.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
              {ctaContent.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onOpenBookingPage({ modeId: 'bundle' })}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/8"
            >
              <p className="text-sm text-white/60">{ctaContent.bundleLabel}</p>
              <p className="mt-2 font-display text-3xl text-white">
                {ctaContent.bundleTitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {ctaContent.bundleDescription}
              </p>
            </button>
            <button
              type="button"
              onClick={() => onOpenBookingPage({ modeId: 'trainer-only' })}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/8"
            >
              <p className="text-sm text-white/60">{ctaContent.trainerLabel}</p>
              <p className="mt-2 font-display text-3xl text-white">
                {ctaContent.trainerTitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {ctaContent.trainerDescription}
              </p>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCtaSection
