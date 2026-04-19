function BookingHeroSection({
  selectedMode,
  selectedEquipment,
  selectedRentalPlan,
  selectedTrainer,
  isBundleMode,
  isTrainerOnlyMode,
  onGoHome,
  onReset,
}) {
  const quickOverview = [
    { label: 'โหมดบริการ', value: selectedMode.title },
    !isTrainerOnlyMode && { label: 'อุปกรณ์', value: selectedEquipment.name },
    !isTrainerOnlyMode && { label: 'แพ็กเช่า', value: selectedRentalPlan.name },
    (isBundleMode || isTrainerOnlyMode) && {
      label: 'โค้ชที่เลือก',
      value: selectedTrainer.name,
    },
  ].filter(Boolean)

  return (
    <section className="panel overflow-hidden">
      <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div>
          <span className="eyebrow">Page 2 / Booking Flow</span>
          <h1 className="mt-4 font-display text-4xl leading-[0.98] text-slate-900 sm:text-5xl lg:text-[3.9rem]">
            หน้าเลือกเช่าและจ้างเทรนเนอร์
            <br />
            ที่ใช้งานง่ายขึ้น
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            เลือกโหมดบริการ อุปกรณ์ แพ็กเช่า และเทรนเนอร์ใน flow เดียวที่อ่านง่ายขึ้นทั้งบนมือถือและจอใหญ่
            โดยรายละเอียดของเทรนเนอร์จะเปิดเป็น popup กลางจอ พร้อมตารางเวลารายสัปดาห์ในหน้าต่างเดียว
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onGoHome}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
            >
              กลับหน้าแรก
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
            >
              รีเซ็ตการเลือก
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-[#fbf3e8] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
            Planner Snapshot
          </p>

          <div className="mt-4 grid gap-3">
            {quickOverview.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] bg-white/70 px-4 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold leading-6 text-slate-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingHeroSection
