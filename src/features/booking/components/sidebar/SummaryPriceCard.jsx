function SummaryPriceCard({ rows, total, note }) {
  return (
    <div className="rounded-[24px] bg-white p-5 text-slate-900">
      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
          >
            <div>
              <p className="text-sm text-slate-500">{row.label}</p>
              {row.note && (
                <p className="mt-1 text-sm leading-6 text-slate-600">{row.note}</p>
              )}
            </div>
            <p className="text-base font-semibold text-slate-900">{row.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-200 pt-4">
        <div>
          <p className="text-sm text-slate-500">ยอดรวมโดยประมาณ</p>
          <p className="mt-1 text-sm text-slate-600">{note}</p>
        </div>
        <p className="font-display text-3xl text-slate-900 sm:text-4xl">{total}</p>
      </div>
    </div>
  )
}

export default SummaryPriceCard
