import { formatCurrency } from '../utils/formatCurrency'

function TrainerOptionCard({ trainer, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-[28px] border p-5 text-left transition ${
        isSelected
          ? 'border-[#123a35] bg-[#eef6f4]'
          : 'border-[#ece2d4] bg-white hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-3xl text-slate-900">{trainer.name}</p>
          <p className="mt-2 text-sm font-medium text-[#123a35]">
            {trainer.specialty}
          </p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {formatCurrency(trainer.sessionRate)}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{trainer.summary}</p>
      <p className="mt-4 text-sm text-slate-500">{trainer.availability}</p>
    </button>
  )
}

export default TrainerOptionCard
