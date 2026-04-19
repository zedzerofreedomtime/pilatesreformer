import SelectablePlanCard from '../components/cards/SelectablePlanCard'

function BookingModesSection({ bookingModes, selectedModeId, onModeChange }) {
  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
            Step 1
          </p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">
            เลือกรูปแบบบริการ
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            เริ่มจากเลือกก่อนว่าต้องการเช่าแบบแพ็ก เช่าเครื่องอย่างเดียว หรือจ้างเทรนเนอร์อย่างเดียว
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {bookingModes.map((mode) => (
          <SelectablePlanCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            kicker={mode.subtitle}
            isSelected={mode.id === selectedModeId}
            onSelect={() => onModeChange(mode.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default BookingModesSection
