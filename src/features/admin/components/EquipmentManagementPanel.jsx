import { useMemo, useState } from 'react'

const formatFeatures = (items) => items.join('\n')
const parseFeatures = (value) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

function EquipmentEditForm({
  equipment,
  canDelete,
  onSave,
  onDelete,
}) {
  const [formState, setFormState] = useState({
    name: equipment.name,
    image: equipment.image,
    badge: equipment.badge,
    monthlyRate: String(equipment.monthlyRate),
    trainerMode: equipment.trainerMode,
    summary: equipment.summary,
    idealFor: equipment.idealFor,
    footprint: equipment.footprint,
    features: formatFeatures(equipment.features ?? []),
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleChange = (field) => (event) => {
    setFormState((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)

    await onSave({
      name: formState.name.trim() || equipment.name,
      image: formState.image.trim() || equipment.image,
      badge: formState.badge.trim() || equipment.badge,
      monthlyRate: Number(formState.monthlyRate) || equipment.monthlyRate,
      trainerMode: formState.trainerMode,
      summary: formState.summary.trim() || equipment.summary,
      idealFor: formState.idealFor.trim() || equipment.idealFor,
      footprint: formState.footprint.trim() || equipment.footprint,
      features: parseFeatures(formState.features),
    })

    setIsSaving(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">ชื่ออุปกรณ์</span>
          <input
            type="text"
            value={formState.name}
            onChange={handleChange('name')}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">ราคาเช่าต่อเดือน</span>
          <input
            type="number"
            min="0"
            value={formState.monthlyRate}
            onChange={handleChange('monthlyRate')}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">รูปอุปกรณ์</span>
          <input
            type="text"
            value={formState.image}
            onChange={handleChange('image')}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">รูปแบบการใช้งาน</span>
          <select
            value={formState.trainerMode}
            onChange={handleChange('trainerMode')}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          >
            <option value="optional">เล่นเองได้</option>
            <option value="required">ต้องมีเทรนเนอร์</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">badge / ป้ายกำกับ</span>
        <input
          type="text"
          value={formState.badge}
          onChange={handleChange('badge')}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">รายละเอียด</span>
        <textarea
          value={formState.summary}
          onChange={handleChange('summary')}
          rows={5}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">เหมาะกับ</span>
          <textarea
            value={formState.idealFor}
            onChange={handleChange('idealFor')}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">พื้นที่ใช้งาน</span>
          <textarea
            value={formState.footprint}
            onChange={handleChange('footprint')}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">ฟีเจอร์ของอุปกรณ์</span>
        <textarea
          value={formState.features}
          onChange={handleChange('features')}
          rows={5}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
        <span className="mt-1 block text-xs text-slate-500">ขึ้นบรรทัดใหม่เพื่อแยกแต่ละข้อ</span>
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูลอุปกรณ์'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!canDelete || isDeleting}
          className="rounded-full border border-[#e3b4ae] px-5 py-3 text-sm font-semibold text-[#b42318] transition hover:bg-[#fff3f1] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? 'กำลังลบ...' : 'ลบอุปกรณ์'}
        </button>
      </div>
    </form>
  )
}

function EquipmentManagementPanel({
  equipmentCatalog,
  onAddEquipment,
  onUpdateEquipment,
  onRemoveEquipment,
}) {
  const [activeEquipmentId, setActiveEquipmentId] = useState(
    equipmentCatalog[0]?.id ?? '',
  )
  const [isCreating, setIsCreating] = useState(false)

  const activeEquipment = useMemo(
    () =>
      equipmentCatalog.find((equipment) => equipment.id === activeEquipmentId) ??
      equipmentCatalog[0],
    [activeEquipmentId, equipmentCatalog],
  )

  const handleAddEquipment = async () => {
    setIsCreating(true)
    const nextId = await onAddEquipment()

    if (nextId) {
      setActiveEquipmentId(nextId)
    }

    setIsCreating(false)
  }

  if (!activeEquipment) {
    return null
  }

  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Admin / Equipment</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            จัดการข้อมูลอุปกรณ์กีฬา
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            แก้ไขรายละเอียด ราคา ป้ายกำกับ และรูปแบบการใช้งานของอุปกรณ์ทุกชิ้นในเว็บได้จากส่วนนี้
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddEquipment}
          disabled={isCreating}
          className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCreating ? 'กำลังเพิ่มอุปกรณ์...' : 'เพิ่มอุปกรณ์'}
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="space-y-3">
          {equipmentCatalog.map((equipment) => (
            <button
              key={equipment.id}
              type="button"
              onClick={() => setActiveEquipmentId(equipment.id)}
              className={`w-full rounded-[24px] border p-4 text-left transition ${
                equipment.id === activeEquipment.id
                  ? 'border-[#123a35] bg-[#123a35] text-white shadow-[0_18px_40px_-24px_rgba(18,58,53,0.82)]'
                  : 'border-[#eadbc8] bg-white hover:border-[#d6c4af] hover:bg-[#fffaf3]'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="h-14 w-14 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-2xl">{equipment.name}</p>
                  <p
                    className={`mt-1 text-sm ${
                      equipment.id === activeEquipment.id
                        ? 'text-white/75'
                        : 'text-slate-500'
                    }`}
                  >
                    {equipment.trainerMode === 'required'
                      ? 'ต้องมีเทรนเนอร์'
                      : 'เล่นเองได้'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <EquipmentEditForm
            key={activeEquipment.id}
            equipment={activeEquipment}
            canDelete={equipmentCatalog.length > 1}
            onSave={(updates) => onUpdateEquipment(activeEquipment.id, updates)}
            onDelete={() => onRemoveEquipment(activeEquipment.id)}
          />
        </div>
      </div>
    </section>
  )
}

export default EquipmentManagementPanel
