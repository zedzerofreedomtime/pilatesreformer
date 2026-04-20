import { useMemo, useState } from 'react'

const formatList = (items) => items.join(', ')
const parseList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

function TrainerEditForm({
  trainer,
  canDelete,
  onSave,
  onDelete,
}) {
  const [formState, setFormState] = useState({
    name: trainer.name,
    image: trainer.image,
    sessionRate: String(trainer.sessionRate),
    availability: trainer.availability,
    specialty: trainer.specialty,
    summary: trainer.summary,
    machineFocus: formatList(trainer.machineFocus),
    exerciseFocus: formatList(trainer.exerciseFocus),
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
      name: formState.name.trim() || trainer.name,
      image: formState.image.trim() || trainer.image,
      sessionRate: Number(formState.sessionRate) || trainer.sessionRate,
      availability: formState.availability.trim() || trainer.availability,
      specialty: formState.specialty.trim() || trainer.specialty,
      summary: formState.summary.trim() || trainer.summary,
      machineFocus: parseList(formState.machineFocus),
      exerciseFocus: parseList(formState.exerciseFocus),
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
          <span className="text-sm font-semibold text-slate-700">ชื่อเทรนเนอร์</span>
          <input
            type="text"
            value={formState.name}
            onChange={handleChange('name')}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">ค่าจ้างต่อ session</span>
          <input
            type="number"
            min="0"
            value={formState.sessionRate}
            onChange={handleChange('sessionRate')}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">รูปเทรนเนอร์</span>
        <input
          type="text"
          value={formState.image}
          onChange={handleChange('image')}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">ช่องทางให้บริการ</span>
        <input
          type="text"
          value={formState.availability}
          onChange={handleChange('availability')}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">ความถนัดหลัก</span>
        <input
          type="text"
          value={formState.specialty}
          onChange={handleChange('specialty')}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">เครื่องที่ถนัด</span>
          <textarea
            value={formState.machineFocus}
            onChange={handleChange('machineFocus')}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
          <span className="mt-1 block text-xs text-slate-500">คั่นด้วย comma</span>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">สไตล์การสอน</span>
          <textarea
            value={formState.exerciseFocus}
            onChange={handleChange('exerciseFocus')}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
          <span className="mt-1 block text-xs text-slate-500">คั่นด้วย comma</span>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-700">รายละเอียด</span>
        <textarea
          value={formState.summary}
          onChange={handleChange('summary')}
          rows={5}
          className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
        />
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูลเทรนเนอร์'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!canDelete || isDeleting}
          className="rounded-full border border-[#e3b4ae] px-5 py-3 text-sm font-semibold text-[#b42318] transition hover:bg-[#fff3f1] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? 'กำลังลบ...' : 'ลบเทรนเนอร์'}
        </button>
      </div>
    </form>
  )
}

function TrainerManagementPanel({
  trainerCatalog,
  onAddTrainer,
  onUpdateTrainer,
  onRemoveTrainer,
}) {
  const [activeTrainerId, setActiveTrainerId] = useState(trainerCatalog[0]?.id ?? '')
  const [isCreating, setIsCreating] = useState(false)

  const activeTrainer = useMemo(
    () =>
      trainerCatalog.find((trainer) => trainer.id === activeTrainerId) ??
      trainerCatalog[0],
    [activeTrainerId, trainerCatalog],
  )

  const handleAddTrainer = async () => {
    setIsCreating(true)
    const nextId = await onAddTrainer()

    if (nextId) {
      setActiveTrainerId(nextId)
    }

    setIsCreating(false)
  }

  if (!activeTrainer) {
    return null
  }

  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Admin / Trainers</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            จัดการรายชื่อเทรนเนอร์
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            เพิ่ม ลบ และแก้ไขข้อมูลเทรนเนอร์ได้จากจุดเดียว โดยข้อมูลจะถูกนำไปใช้ต่อในหน้าลูกค้าและหน้า login ของเทรนเนอร์ทันที
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddTrainer}
          disabled={isCreating}
          className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isCreating ? 'กำลังเพิ่มเทรนเนอร์...' : 'เพิ่มเทรนเนอร์'}
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="space-y-3">
          {trainerCatalog.map((trainer) => (
            <button
              key={trainer.id}
              type="button"
              onClick={() => setActiveTrainerId(trainer.id)}
              className={`w-full rounded-[24px] border p-4 text-left transition ${
                trainer.id === activeTrainer.id
                  ? 'border-[#123a35] bg-[#123a35] text-white shadow-[0_18px_40px_-24px_rgba(18,58,53,0.82)]'
                  : 'border-[#eadbc8] bg-white hover:border-[#d6c4af] hover:bg-[#fffaf3]'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-14 w-14 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-2xl">{trainer.name}</p>
                  <p
                    className={`mt-1 text-sm ${
                      trainer.id === activeTrainer.id
                        ? 'text-white/75'
                        : 'text-slate-500'
                    }`}
                  >
                    {trainer.availability}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <TrainerEditForm
            key={activeTrainer.id}
            trainer={activeTrainer}
            canDelete={trainerCatalog.length > 1}
            onSave={(updates) => onUpdateTrainer(activeTrainer.id, updates)}
            onDelete={() => onRemoveTrainer(activeTrainer.id)}
          />
        </div>
      </div>
    </section>
  )
}

export default TrainerManagementPanel
