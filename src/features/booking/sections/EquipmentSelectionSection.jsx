import EquipmentOptionCard from '../components/cards/EquipmentOptionCard'

function EquipmentSelectionSection({
  equipmentCatalog,
  selectedEquipmentId,
  isEquipmentOnlyMode,
  onEquipmentSelect,
}) {
  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
            Step 2
          </p>
          <h2 className="mt-2 font-display text-3xl text-slate-900">
            เลือกอุปกรณ์
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            เลือกเครื่องที่ตรงกับเป้าหมายการใช้งานและพื้นที่ในบ้านของคุณ
          </p>
        </div>

        {isEquipmentOnlyMode && (
          <p className="rounded-full bg-[#f5e8d8] px-3 py-1.5 text-xs font-semibold text-[#9b5d32]">
            โหมดนี้เลือกได้เฉพาะเครื่องที่เล่นเองที่บ้านได้
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {equipmentCatalog.map((equipment) => (
          <EquipmentOptionCard
            key={equipment.id}
            equipment={equipment}
            isSelected={equipment.id === selectedEquipmentId}
            isDisabled={isEquipmentOnlyMode && equipment.trainerMode === 'required'}
            onSelect={() => onEquipmentSelect(equipment.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default EquipmentSelectionSection
