import { formatCurrency } from '../../../../utils/formatCurrency'
import SummaryInfoCard from './SummaryInfoCard'
import SummaryPriceCard from './SummaryPriceCard'

function BookingSidebar({ bookingState, bookingSummary }) {
  const {
    selectedMode,
    selectedEquipment,
    selectedRentalPlan,
    selectedTrainer,
    selectedTrainerServicePlan,
    isBundleMode,
    isEquipmentOnlyMode,
    isTrainerOnlyMode,
  } = bookingState

  const {
    rentalSubtotal,
    installFee,
    bundleSessions,
    bundleTrainerSubtotal,
    bundleGrandTotal,
    equipmentOnlyTotal,
    trainerOnlyTotal,
  } = bookingSummary

  const renderBundleSummary = () => (
    <div className="mt-6 space-y-4">
      <SummaryInfoCard
        label="อุปกรณ์ที่เลือก"
        title={selectedEquipment.name}
        body={selectedEquipment.summary}
        image={selectedEquipment.image}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <SummaryInfoCard
          label="แพ็กเช่า"
          title={selectedRentalPlan.name}
          body={`รวม ${selectedRentalPlan.months} เดือน และมี ${bundleSessions} sessions`}
        />
        <SummaryInfoCard
          label="เทรนเนอร์ที่เลือก"
          title={selectedTrainer.name}
          body={selectedTrainer.machineFocus.join(' / ')}
          image={selectedTrainer.image}
        />
      </div>

      <SummaryPriceCard
        rows={[
          {
            label: 'ค่าเช่าเครื่อง',
            note: `${formatCurrency(selectedEquipment.monthlyRate)} x ${selectedRentalPlan.months} เดือน`,
            value: formatCurrency(rentalSubtotal),
          },
          {
            label: 'Trainer package',
            note: `${formatCurrency(selectedTrainer.sessionRate)} x ${bundleSessions} sessions`,
            value: formatCurrency(bundleTrainerSubtotal),
          },
          {
            label: 'ค่าติดตั้งครั้งแรก',
            note: 'ฟรีเมื่อเช่า 3 เดือนขึ้นไป',
            value: formatCurrency(installFee),
          },
        ]}
        total={formatCurrency(bundleGrandTotal)}
        note="รวมค่าเช่าเครื่องและค่าโค้ชตามแพ็กที่เลือก"
      />
    </div>
  )

  const renderEquipmentOnlySummary = () => (
    <div className="mt-6 space-y-4">
      <SummaryInfoCard
        label="อุปกรณ์ที่เลือก"
        title={selectedEquipment.name}
        body="โหมดนี้เหมาะกับเครื่องที่สามารถเล่นเองที่บ้านได้ เช่น Pilates Reformer"
        image={selectedEquipment.image}
      />

      <SummaryInfoCard
        label="แพ็กเช่า"
        title={selectedRentalPlan.name}
        body={`รวม ${selectedRentalPlan.months} เดือน`}
      />

      <SummaryPriceCard
        rows={[
          {
            label: 'ค่าเช่าเครื่อง',
            note: `${formatCurrency(selectedEquipment.monthlyRate)} x ${selectedRentalPlan.months} เดือน`,
            value: formatCurrency(rentalSubtotal),
          },
          {
            label: 'ค่าติดตั้งครั้งแรก',
            note: 'ฟรีเมื่อเช่า 3 เดือนขึ้นไป',
            value: formatCurrency(installFee),
          },
        ]}
        total={formatCurrency(equipmentOnlyTotal)}
        note="ยังไม่รวมการจ้างเทรนเนอร์เพิ่มเติม"
      />
    </div>
  )

  const renderTrainerOnlySummary = () => (
    <div className="mt-6 space-y-4">
      <SummaryInfoCard
        label="เทรนเนอร์ที่เลือก"
        title={selectedTrainer.name}
        body={selectedTrainer.exerciseFocus.join(' / ')}
        image={selectedTrainer.image}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <SummaryInfoCard
          label="แพ็ก session"
          title={selectedTrainerServicePlan.name}
          body={`รวม ${selectedTrainerServicePlan.sessions} sessions`}
        />
        <SummaryInfoCard
          label="ตารางเวลาทำงาน"
          title={selectedTrainer.scheduleWindow}
          body={`ว่าง ${selectedTrainer.availableSlots} ช่วง และมีคิวแล้ว ${selectedTrainer.bookedSlots} ช่วง`}
        />
      </div>

      <SummaryPriceCard
        rows={[
          {
            label: 'ค่าจ้างเทรนเนอร์',
            note: `${formatCurrency(selectedTrainer.sessionRate)} x ${selectedTrainerServicePlan.sessions} sessions`,
            value: formatCurrency(trainerOnlyTotal),
          },
        ]}
        total={formatCurrency(trainerOnlyTotal)}
        note="คิดเฉพาะค่าโค้ช ไม่รวมค่าเช่าเครื่อง"
      />
    </div>
  )

  return (
    <aside className="self-start">
      <div className="space-y-4">
        <div className="sticky top-4">
          <section className="accent-panel overflow-hidden p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4c38f]">
              Live Summary
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-white">
              {selectedMode.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              {selectedMode.description}
            </p>

            {isBundleMode && renderBundleSummary()}
            {isEquipmentOnlyMode && renderEquipmentOnlySummary()}
            {isTrainerOnlyMode && renderTrainerOnlySummary()}
          </section>
        </div>

        <section className="panel p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
            Booking Tips
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[22px] bg-[#fbf3e8] px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">1. เลือกโหมดก่อน</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                ระบบจะปรับตัวเลือกอุปกรณ์และโค้ชให้เหมาะกับรูปแบบบริการอัตโนมัติ
              </p>
            </div>
            <div className="rounded-[22px] bg-[#f3fbf8] px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">
                2. เปิด popup เพื่อเช็กเวลา
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                กดดูรายละเอียดเพื่อเช็กข้อมูลเทรนเนอร์และตารางเวลารายสัปดาห์ได้ในหน้าต่างเดียว
              </p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  )
}

export default BookingSidebar
