import { formatCurrency } from '../../../utils/formatCurrency'

function TopRentalCard({ card, onSelect }) {
  const { equipment, highlight, rank, summary } = card

  return (
    <article className="panel p-5">
      <div className="mb-5 overflow-hidden rounded-[24px] bg-[#f6f1e9]">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="h-52 w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-4xl text-[#d6a273]">{rank}</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
            {highlight}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            equipment.trainerMode === 'optional'
              ? 'bg-[#fde8d5] text-[#9b5d32]'
              : 'bg-[#e4f2ef] text-[#0f4e45]'
          }`}
        >
          {equipment.badge}
        </span>
      </div>

      <h3 className="mt-5 font-display text-3xl text-slate-900">
        {equipment.name}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">เริ่มต้นต่อเดือน</p>
          <p className="font-display text-3xl text-slate-900">
            {formatCurrency(equipment.monthlyRate)}
          </p>
        </div>
        <button
          type="button"
          onClick={onSelect}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
        >
          ไปหน้า 2
        </button>
      </div>
    </article>
  )
}

export default TopRentalCard
