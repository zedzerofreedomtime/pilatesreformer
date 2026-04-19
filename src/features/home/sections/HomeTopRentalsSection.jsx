import TopRentalCard from '../components/TopRentalCard'

function HomeTopRentalsSection({ sectionContent, topRentedCards, onOpenBookingPage }) {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">{sectionContent.eyebrow}</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
            {sectionContent.title}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          {sectionContent.description}
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {topRentedCards.map((card) => (
          <TopRentalCard
            key={card.equipment.id}
            card={card}
            onSelect={() =>
              onOpenBookingPage({
                modeId:
                  card.equipment.trainerMode === 'optional'
                    ? 'equipment-only'
                    : 'bundle',
                equipmentId: card.equipment.id,
              })
            }
          />
        ))}
      </div>
    </section>
  )
}

export default HomeTopRentalsSection
