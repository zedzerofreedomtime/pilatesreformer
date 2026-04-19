import TrainerOptionCard from '../components/cards/TrainerOptionCard'

function TrainerSelectionSection({
  stepLabel,
  description,
  badgeText,
  trainerCatalog,
  selectedTrainerId,
  expandedTrainerId,
  onTrainerSelect,
  onTrainerDetailsToggle,
}) {
  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
            {stepLabel}
          </p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">
            เลือกเทรนเนอร์
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
        </div>

        {badgeText && (
          <p className="rounded-full bg-[#eef6f4] px-3 py-1.5 text-xs font-semibold text-[#123a35]">
            {badgeText}
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {trainerCatalog.map((trainer) => (
          <TrainerOptionCard
            key={trainer.id}
            trainer={trainer}
            isSelected={trainer.id === selectedTrainerId}
            isExpanded={trainer.id === expandedTrainerId}
            onSelect={() => onTrainerSelect(trainer.id)}
            onToggleDetails={() => onTrainerDetailsToggle(trainer.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default TrainerSelectionSection
