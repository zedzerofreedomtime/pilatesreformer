import { formatCurrency } from '../utils/formatCurrency'

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
      className={`rounded-[30px] border p-5 text-left transition ${
        isSelected
          ? 'border-[#9b5d32] bg-[#fff6ee] shadow-[0_24px_70px_-40px_rgba(155,93,50,0.75)]'
          : 'border-[#ece2d4] bg-white'
      } ${
        isDisabled ? 'cursor-not-allowed opacity-55' : 'hover:-translate-y-1'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-3xl text-slate-900">{equipment.name}</p>
          <p className="mt-2 text-sm text-slate-500">{equipment.footprint}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            equipment.trainerMode === 'optional'
              ? 'bg-[#fde8d5] text-[#9b5d32]'
              : 'bg-[#e4f2ef] text-[#0f4e45]'
          }`}
        >
          {isDisabled ? 'เช่าเดี่ยวไม่ได้' : equipment.badge}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{equipment.summary}</p>

      <div className="mt-5 rounded-[24px] bg-[#f6f1e9] p-4">
        <p className="text-sm text-slate-500">เหมาะกับ</p>
        <p className="mt-1 text-sm font-medium leading-6 text-slate-700">
          {equipment.idealFor}
        </p>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">เริ่มต้นต่อเดือน</p>
          <p className="font-display text-3xl text-slate-900">
            {formatCurrency(equipment.monthlyRate)}
          </p>
        </div>
        <p className="text-sm font-semibold text-[#123a35]">
          {isDisabled
            ? 'ต้องใช้โหมดแพ็ก'
            : isSelected
              ? 'กำลังเลือกอยู่'
              : 'กดเพื่อเลือก'}
        </p>
      </div>
    </button>
  )
}

export default EquipmentOptionCard
