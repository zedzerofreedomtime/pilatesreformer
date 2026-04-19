import EquipmentOptionCard from '../components/EquipmentOptionCard'
import SelectablePlanCard from '../components/SelectablePlanCard'
import TrainerOptionCard from '../components/TrainerOptionCard'
import {
  bookingModes,
  equipmentCatalog,
  rentalPlanCatalog,
  trainerCatalog,
  trainerServicePlans,
} from '../data/siteData'
import { formatCurrency } from '../utils/formatCurrency'

function BookingPage({ bookingState, bookingSummary, bookingActions }) {
  const {
    selectedModeId,
    selectedMode,
    selectedEquipmentId,
    selectedEquipment,
    selectedRentalPlanId,
    selectedRentalPlan,
    selectedTrainerId,
    selectedTrainer,
    selectedTrainerServicePlanId,
    selectedTrainerServicePlan,
    isBundleMode,
    isEquipmentOnlyMode,
    isTrainerOnlyMode,
    equipmentNeedsTrainer,
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

  const {
    onGoHome,
    onModeChange,
    onEquipmentSelect,
    onRentalPlanChange,
    onTrainerSelect,
    onTrainerServicePlanChange,
    onReset,
  } = bookingActions

  const renderBundleSummary = () => (
    <div className="mt-6 space-y-4">
      <div className="rounded-[24px] bg-white/10 p-4">
        <p className="text-sm text-white/60">เครื่องที่เลือก</p>
        <p className="mt-1 font-display text-3xl text-white">
          {selectedEquipment.name}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          {selectedEquipment.summary}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-[24px] bg-white/10 p-4">
          <p className="text-sm text-white/60">ระยะเช่า</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {selectedRentalPlan.name}
          </p>
          <p className="mt-1 text-sm text-white/70">
            รวม {selectedRentalPlan.months} เดือน
          </p>
        </div>
        <div className="rounded-[24px] bg-white/10 p-4">
          <p className="text-sm text-white/60">เทรนเนอร์</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {selectedTrainer.name}
          </p>
          <p className="mt-1 text-sm text-white/70">
            {bundleSessions} session
          </p>
        </div>
      </div>

      <div className="rounded-[26px] bg-white p-5 text-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm text-slate-500">ค่าเช่าเครื่อง</p>
            <p className="mt-1 text-sm text-slate-600">
              {formatCurrency(selectedEquipment.monthlyRate)} x{' '}
              {selectedRentalPlan.months} เดือน
            </p>
          </div>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(rentalSubtotal)}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-4">
          <div>
            <p className="text-sm text-slate-500">Trainer package</p>
            <p className="mt-1 text-sm text-slate-600">
              {formatCurrency(selectedTrainer.sessionRate)} x {bundleSessions}{' '}
              session
            </p>
          </div>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(bundleTrainerSubtotal)}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-4">
          <div>
            <p className="text-sm text-slate-500">ค่าติดตั้งครั้งแรก</p>
            <p className="mt-1 text-sm text-slate-600">
              ฟรีเมื่อเช่า 3 เดือนขึ้นไป
            </p>
          </div>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(installFee)}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 pt-4">
          <div>
            <p className="text-sm text-slate-500">ยอดรวมโดยประมาณ</p>
            <p className="mt-1 text-sm text-slate-600">
              รวมค่าเช่าเครื่องและ session กับเทรนเนอร์
            </p>
          </div>
          <p className="font-display text-4xl text-slate-900">
            {formatCurrency(bundleGrandTotal)}
          </p>
        </div>
      </div>
    </div>
  )

  const renderEquipmentOnlySummary = () => (
    <div className="mt-6 space-y-4">
      <div className="rounded-[24px] bg-white/10 p-4">
        <p className="text-sm text-white/60">เครื่องที่เลือก</p>
        <p className="mt-1 font-display text-3xl text-white">
          {selectedEquipment.name}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          โหมดนี้เหมาะกับ Reformer ซึ่งเป็นเครื่องที่นิยมเล่นเองที่บ้านได้
        </p>
      </div>

      <div className="rounded-[24px] bg-white/10 p-4">
        <p className="text-sm text-white/60">ระยะเช่า</p>
        <p className="mt-2 text-xl font-semibold text-white">
          {selectedRentalPlan.name}
        </p>
        <p className="mt-1 text-sm text-white/70">
          รวม {selectedRentalPlan.months} เดือน
        </p>
      </div>

      <div className="rounded-[26px] bg-white p-5 text-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm text-slate-500">ค่าเช่าเครื่อง</p>
            <p className="mt-1 text-sm text-slate-600">
              {formatCurrency(selectedEquipment.monthlyRate)} x{' '}
              {selectedRentalPlan.months} เดือน
            </p>
          </div>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(rentalSubtotal)}
          </p>
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-slate-200 py-4">
          <div>
            <p className="text-sm text-slate-500">ค่าติดตั้งครั้งแรก</p>
            <p className="mt-1 text-sm text-slate-600">
              ฟรีเมื่อเช่า 3 เดือนขึ้นไป
            </p>
          </div>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(installFee)}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 pt-4">
          <div>
            <p className="text-sm text-slate-500">ยอดรวมโดยประมาณ</p>
            <p className="mt-1 text-sm text-slate-600">
              ยังไม่รวมการจ้างเทรนเนอร์เพิ่มเติม
            </p>
          </div>
          <p className="font-display text-4xl text-slate-900">
            {formatCurrency(equipmentOnlyTotal)}
          </p>
        </div>
      </div>
    </div>
  )

  const renderTrainerOnlySummary = () => (
    <div className="mt-6 space-y-4">
      <div className="rounded-[24px] bg-white/10 p-4">
        <p className="text-sm text-white/60">เทรนเนอร์ที่เลือก</p>
        <p className="mt-1 font-display text-3xl text-white">
          {selectedTrainer.name}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          {selectedTrainer.specialty}
        </p>
      </div>

      <div className="rounded-[24px] bg-white/10 p-4">
        <p className="text-sm text-white/60">แพ็ก session</p>
        <p className="mt-2 text-xl font-semibold text-white">
          {selectedTrainerServicePlan.name}
        </p>
        <p className="mt-1 text-sm text-white/70">
          รวม {selectedTrainerServicePlan.sessions} session
        </p>
      </div>

      <div className="rounded-[26px] bg-white p-5 text-slate-900">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm text-slate-500">ค่าจ้างเทรนเนอร์</p>
            <p className="mt-1 text-sm text-slate-600">
              {formatCurrency(selectedTrainer.sessionRate)} x{' '}
              {selectedTrainerServicePlan.sessions} session
            </p>
          </div>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(trainerOnlyTotal)}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 pt-4">
          <div>
            <p className="text-sm text-slate-500">ยอดรวมโดยประมาณ</p>
            <p className="mt-1 text-sm text-slate-600">
              คิดเฉพาะ session กับเทรนเนอร์ ไม่รวมค่าเช่าเครื่อง
            </p>
          </div>
          <p className="font-display text-4xl text-slate-900">
            {formatCurrency(trainerOnlyTotal)}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-start">
        <div className="space-y-6">
          <section className="panel p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <span className="eyebrow">Page 2 / Booking Flow</span>
                <h1 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
                  เลือกเช่าเครื่องออกกำลังกายและเทรนเนอร์ตามรูปแบบที่ต้องการ
                </h1>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  หน้านี้รองรับทั้งการเช่าแบบแพ็ก, เช่าเครื่องอย่างเดียว,
                  และจ้างเทรนเนอร์อย่างเดียว โดยระบบจะยังคงกติกาธุรกิจเดิมไว้
                  ถ้าเป็นเครื่องเฉพาะทางที่ต้องมีครูประกบ จะไม่เปิดให้เช่าเดี่ยว
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onGoHome}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
                >
                  กลับหน้าแรก
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-full bg-[#123a35] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
                >
                  รีเซ็ตการเลือก
                </button>
              </div>
            </div>
          </section>

          <section className="panel p-6 sm:p-7">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
                Step 1
              </p>
              <h2 className="mt-2 font-display text-3xl text-slate-900">
                เลือกรูปแบบบริการ
              </h2>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {bookingModes.map((mode) => (
                <SelectablePlanCard
                  key={mode.id}
                  title={mode.title}
                  description={mode.description}
                  kicker={mode.subtitle}
                  isSelected={mode.id === selectedModeId}
                  onSelect={() => onModeChange(mode.id)}
                />
              ))}
            </div>
          </section>

          {!isTrainerOnlyMode && (
            <section className="panel p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
                    Step 2
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-slate-900">
                    เลือกเครื่องออกกำลังกาย
                  </h2>
                </div>
                {isEquipmentOnlyMode && (
                  <p className="text-sm text-slate-500">
                    โหมดนี้เปิดให้เช่าเดี่ยวเฉพาะเครื่องที่เล่นเองที่บ้านได้
                  </p>
                )}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {equipmentCatalog.map((equipment) => (
                  <EquipmentOptionCard
                    key={equipment.id}
                    equipment={equipment}
                    isSelected={equipment.id === selectedEquipmentId}
                    isDisabled={
                      isEquipmentOnlyMode && equipment.trainerMode === 'required'
                    }
                    onSelect={() => onEquipmentSelect(equipment.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {!isTrainerOnlyMode && (
            <section className="panel p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
                    Step 3
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-slate-900">
                    เลือกระยะเช่า
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  ยิ่งเช่านาน ยิ่งลดค่าเช่าและได้ session มากขึ้นในโหมดแพ็ก
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {rentalPlanCatalog.map((plan) => (
                  <SelectablePlanCard
                    key={plan.id}
                    title={plan.name}
                    description={plan.note}
                    badgeLabel={`ส่วนลด ${Math.round((1 - plan.discount) * 100)}%`}
                    isSelected={plan.id === selectedRentalPlanId}
                    onSelect={() => onRentalPlanChange(plan.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {isBundleMode && (
            <section className="panel p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
                    Step 4
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-slate-900">
                    เลือกเทรนเนอร์
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  {equipmentNeedsTrainer
                    ? 'เครื่องที่เลือกต้องมีโค้ชประกบทุก session'
                    : 'Reformer สามารถเพิ่มโค้ชในแพ็กเพื่อปูพื้นฐานก่อนฝึกเองได้'}
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {trainerCatalog.map((trainer) => (
                  <TrainerOptionCard
                    key={trainer.id}
                    trainer={trainer}
                    isSelected={trainer.id === selectedTrainerId}
                    onSelect={() => onTrainerSelect(trainer.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {isTrainerOnlyMode && (
            <>
              <section className="panel p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
                      Step 2
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-slate-900">
                      เลือกเทรนเนอร์
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500">
                    โหมดนี้เหมาะกับลูกค้าที่มีอุปกรณ์อยู่แล้วและอยากจ้างโค้ชแยก
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {trainerCatalog.map((trainer) => (
                    <TrainerOptionCard
                      key={trainer.id}
                      trainer={trainer}
                      isSelected={trainer.id === selectedTrainerId}
                      onSelect={() => onTrainerSelect(trainer.id)}
                    />
                  ))}
                </div>
              </section>

              <section className="panel p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b5d32]">
                      Step 3
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-slate-900">
                      เลือกแพ็ก session
                    </h2>
                  </div>
                  <p className="text-sm text-slate-500">
                    คิดราคาเฉพาะการจ้างโค้ช ไม่รวมค่าเช่าเครื่อง
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {trainerServicePlans.map((plan) => (
                    <SelectablePlanCard
                      key={plan.id}
                      title={plan.name}
                      description={plan.note}
                      badgeLabel={`ส่วนลด ${Math.round((1 - plan.discount) * 100)}%`}
                      isSelected={plan.id === selectedTrainerServicePlanId}
                      onSelect={() => onTrainerServicePlanChange(plan.id)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <div className="accent-panel p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f4c38f]">
              Live Summary
            </p>
            <h2 className="mt-3 font-display text-4xl text-white">
              {selectedMode.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              {selectedMode.description}
            </p>

            {isBundleMode && renderBundleSummary()}
            {isEquipmentOnlyMode && renderEquipmentOnlySummary()}
            {isTrainerOnlyMode && renderTrainerOnlySummary()}

            <div className="mt-6 rounded-[24px] bg-[#0b2824] p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4c38f]">
                Business Rule
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-white/80">
                <li>Pilates Reformer เช่าเดี่ยวได้ เพราะลูกค้าสามารถฝึกเองที่บ้านได้</li>
                <li>เครื่องเฉพาะทางอื่นต้องจ้างเทรนเนอร์ประกบทุกครั้งเพื่อความปลอดภัย</li>
                <li>ลูกค้าที่มีอุปกรณ์อยู่แล้วสามารถจ้างเทรนเนอร์อย่างเดียวได้</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#123a35] transition hover:bg-[#f6ece1]"
                href="tel:02-888-2468"
              >
                โทร 02-888-2468
              </a>
              <button
                type="button"
                onClick={onGoHome}
                className="rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                กลับไปหน้าแรก
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default BookingPage
