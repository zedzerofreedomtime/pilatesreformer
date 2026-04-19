import { formatCurrency } from '../../../../utils/formatCurrency'

function EquipmentOptionCard({
  equipment,
  isSelected,
  isDisabled,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={`flex h-full flex-col overflow-hidden rounded-[30px] border text-left transition ${
        isSelected
          ? 'border-[#9b5d32] bg-[#fff7ee] shadow-[0_24px_55px_-34px_rgba(155,93,50,0.58)]'
          : 'border-[#eadbc8] bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ef_100%)] hover:-translate-y-1 hover:border-[#d6c4af]'
      } ${isDisabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <div className="relative overflow-hidden bg-[#f6f1e9]">
        <img
          src={equipment.image}
          alt={equipment.name}
          className="h-52 w-full object-cover sm:h-56"
          loading="lazy"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-[0_10px_22px_-14px_rgba(15,23,42,0.45)] ${
            equipment.trainerMode === 'optional'
              ? 'bg-[#fde8d5] text-[#9b5d32]'
              : 'bg-[#e4f2ef] text-[#0f4e45]'
          }`}
        >
          {isDisabled ? 'เช่าเดี่ยวไม่ได้' : equipment.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-[1.95rem] leading-tight text-slate-900">
              {equipment.name}
            </h3>
            <p className="mt-2 text-sm text-slate-500">{equipment.footprint}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Start At
            </p>
            <p className="mt-1 font-display text-2xl text-slate-900">
              {formatCurrency(equipment.monthlyRate)}
            </p>
            <p className="text-xs text-slate-500">ต่อเดือน</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">{equipment.summary}</p>

        <div className="mt-4 rounded-[22px] bg-[#faf3ea] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b17344]">
            เหมาะกับ
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-700">
            {equipment.idealFor}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="text-sm font-semibold text-[#123a35]">
            {isDisabled
              ? 'ต้องใช้โหมดเช่าแบบมีเทรนเนอร์'
              : isSelected
                ? 'กำลังเลือกเครื่องนี้อยู่'
                : 'แตะเพื่อเลือกเครื่องนี้'}
          </p>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              isSelected
                ? 'bg-[#9b5d32] text-white'
                : 'bg-[#f4ede4] text-[#7b5b43]'
            }`}
          >
            {isSelected ? 'Selected' : 'View'}
          </span>
        </div>
      </div>
    </button>
  )
}

export default EquipmentOptionCard
