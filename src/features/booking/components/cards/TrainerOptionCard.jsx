import { formatCurrency } from '../../../../utils/formatCurrency'

function TrainerOptionCard({
  trainer,
  isSelected,
  isExpanded,
  onSelect,
  onToggleDetails,
}) {
  const machinePreview = trainer.machineFocus.slice(0, 3)
  const focusPreview = trainer.exerciseFocus.slice(0, 3)

  return (
    <article
      className={`overflow-hidden rounded-[30px] border transition ${
        isSelected
          ? 'border-[#123a35] bg-[#f3fbf8] shadow-[0_24px_50px_-28px_rgba(18,58,53,0.34)]'
          : 'border-[#eadbc8] bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ef_100%)] shadow-[0_22px_44px_-34px_rgba(82,56,26,0.28)] hover:-translate-y-1 hover:border-[#d6c4af]'
      }`}
    >
      <div className="border-b border-[#efe3d5] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
              isSelected
                ? 'bg-[#123a35] text-white'
                : 'bg-[#f4ede4] text-[#7b5b43]'
            }`}
          >
            {isSelected ? 'โค้ชที่เลือก' : 'Trainer Profile'}
          </span>

          <span className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(15,23,42,0.75)]">
            {formatCurrency(trainer.sessionRate)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="shrink-0 overflow-hidden rounded-[24px] bg-[#eef6f4] ring-1 ring-[#dbe8e4]">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="h-24 w-24 object-cover sm:h-28 sm:w-28"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-display text-3xl leading-[0.95] text-slate-900">
              {trainer.name}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {trainer.availability}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        <button
          type="button"
          onClick={onSelect}
          className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            isSelected
              ? 'bg-[#123a35] text-white'
              : 'bg-slate-900 text-white hover:bg-[#123a35]'
          }`}
        >
          {isSelected ? 'กำลังใช้โค้ชคนนี้' : 'เลือกเทรนเนอร์คนนี้'}
        </button>

        <div className="mt-4 space-y-3">
          <div className="rounded-[22px] bg-white/80 px-4 py-4 ring-1 ring-[#efe5d9]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              เครื่องที่ถนัด
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
              {machinePreview.join(' / ')}
            </p>
          </div>

          <div className="rounded-[22px] bg-white/80 px-4 py-4 ring-1 ring-[#efe5d9]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              สไตล์การสอน
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
              {focusPreview.join(' / ')}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#f8f4ee] px-3 py-1.5 text-xs font-medium text-slate-600">
            {trainer.scheduleWindow}
          </span>
          <span className="rounded-full bg-[#edf6f3] px-3 py-1.5 text-xs font-medium text-[#123a35]">
            {isSelected
              ? 'โค้ชที่เลือกอยู่ตอนนี้'
              : 'ยังไม่ได้เลือกเป็นโค้ชหลัก'}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleDetails}
          className={`mt-5 w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
            isExpanded
              ? 'border-[#123a35] bg-[#123a35] text-white'
              : 'border-[#d8c8b4] bg-white text-slate-700 hover:border-[#9b5d32] hover:text-[#9b5d32]'
          }`}
        >
          {isExpanded ? 'กำลังเปิดรายละเอียด' : 'ดูรายละเอียด'}
        </button>
      </div>
    </article>
  )
}

export default TrainerOptionCard
