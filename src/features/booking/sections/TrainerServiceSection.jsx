import SelectablePlanCard from '../components/cards/SelectablePlanCard'

function TrainerServiceSection({
  trainerServicePlans,
  selectedTrainerServicePlanId,
  onTrainerServicePlanChange,
}) {
  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
            Step 3
          </p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">
            เลือกแพ็ก session
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            เลือกจำนวน sessions ที่เหมาะกับเป้าหมายและความถี่ในการฝึก
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {trainerServicePlans.map((plan) => (
          <SelectablePlanCard
            key={plan.id}
            title={plan.name}
            description={plan.note}
            badgeLabel={`ส่วนลด ${Math.round((1 - plan.discount) * 100)}%`}
            isSelected={plan.id === selectedTrainerServicePlanId}
            onSelect={() => onTrainerServicePlanChange(plan.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default TrainerServiceSection
