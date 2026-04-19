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
      className={`flex h-full flex-col rounded-[28px] border p-5 text-left transition sm:p-6 ${
        isSelected
          ? 'border-[#123a35] bg-[#123a35] text-white shadow-[0_24px_50px_-28px_rgba(18,58,53,0.8)]'
          : 'border-[#eadbc8] bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ef_100%)] text-slate-900 hover:-translate-y-1 hover:border-[#d6c4af]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {kicker && (
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                isSelected ? 'text-[#f4c38f]' : 'text-[#b17344]'
              }`}
            >
              {kicker}
            </p>
          )}
          <p className="mt-3 font-display text-[1.85rem] leading-tight sm:text-[2rem]">
            {title}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
            isSelected
              ? 'bg-white/12 text-white'
              : 'bg-[#f4ede4] text-[#7b5b43]'
          }`}
        >
          {isSelected ? 'Selected' : 'Choose'}
        </span>
      </div>

      <p
        className={`mt-4 text-sm leading-6 ${
          isSelected ? 'text-white/78' : 'text-slate-600'
        }`}
      >
        {description}
      </p>

      {badgeLabel && (
        <div className="mt-auto pt-5">
          <span
            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
              isSelected
                ? 'bg-white/12 text-white'
                : 'bg-[#f5e8d8] text-[#9b5d32]'
            }`}
          >
            {badgeLabel}
          </span>
        </div>
      )}
    </button>
  )
}

export default SelectablePlanCard
