function SelectablePlanCard({
  title,
  description,
  badgeLabel,
  kicker,
  isSelected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-[28px] border p-5 text-left transition ${
        isSelected
          ? 'border-[#123a35] bg-[#123a35] text-white shadow-[0_20px_60px_-35px_rgba(18,58,53,1)]'
          : 'border-[#ece2d4] bg-[#fffaf4] hover:-translate-y-1'
      }`}
    >
      {kicker && (
        <p className="text-sm uppercase tracking-[0.18em] text-[#d6a273]">
          {kicker}
        </p>
      )}
      <p className="mt-3 font-display text-2xl">{title}</p>
      <p
        className={`mt-3 text-sm leading-6 ${
          isSelected ? 'text-white/75' : 'text-slate-600'
        }`}
      >
        {description}
      </p>

      {badgeLabel && (
        <div
          className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            isSelected
              ? 'bg-white/10 text-white'
              : 'bg-[#f3e7d6] text-[#9b5d32]'
          }`}
        >
          {badgeLabel}
        </div>
      )}
    </button>
  )
}

export default SelectablePlanCard
