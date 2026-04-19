import TopRentalCard from '../components/TopRentalCard'

function HomeTopRentalsSection({ topRentedCards, onOpenBookingPage }) {
  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Top 3 Rentals</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
            3 อุปกรณ์ที่มีการเช่ามากที่สุด
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          ใช้ส่วนนี้บนหน้าแรกเพื่อบอกลูกค้าว่าอะไรคือสินค้ายอดนิยม และกดเข้าไปที่หน้า 2
          ได้ทันทีพร้อม preselect ตัวเลือกที่เกี่ยวข้อง
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
