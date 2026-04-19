import { useState } from 'react'
import {
  bookingModes,
  equipmentCatalog,
  rentalPlanCatalog,
  trainerCatalog,
  trainerServicePlans,
} from '../data/siteData'
import TrainerDetailModal from '../features/booking/components/modal/TrainerDetailModal'
import BookingSidebar from '../features/booking/components/sidebar/BookingSidebar'
import BookingHeroSection from '../features/booking/sections/BookingHeroSection'
import BookingModesSection from '../features/booking/sections/BookingModesSection'
import EquipmentSelectionSection from '../features/booking/sections/EquipmentSelectionSection'
import RentalPlanSection from '../features/booking/sections/RentalPlanSection'
import TrainerSelectionSection from '../features/booking/sections/TrainerSelectionSection'
import TrainerServiceSection from '../features/booking/sections/TrainerServiceSection'

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
    isBundleMode,
    isEquipmentOnlyMode,
    isTrainerOnlyMode,
    equipmentNeedsTrainer,
  } = bookingState

  const {
    onGoHome,
    onModeChange,
    onEquipmentSelect,
    onRentalPlanChange,
    onTrainerSelect,
    onTrainerServicePlanChange,
    onReset,
  } = bookingActions

  const [expandedTrainerId, setExpandedTrainerId] = useState(null)
  const expandedTrainer =
    trainerCatalog.find((trainer) => trainer.id === expandedTrainerId) ?? null

  const closeTrainerModal = () => {
    setExpandedTrainerId(null)
  }

  const handleModeChange = (modeId) => {
    closeTrainerModal()
    onModeChange(modeId)
  }

  const handleGoHome = () => {
    closeTrainerModal()
    onGoHome()
  }

  const handleReset = () => {
    closeTrainerModal()
    onReset()
  }

  const handleTrainerDetailsToggle = (trainerId) => {
    if (expandedTrainerId === trainerId) {
      setExpandedTrainerId(null)
      return
    }

    setExpandedTrainerId(trainerId)
  }

  const handleTrainerSelect = (trainerId) => {
    onTrainerSelect(trainerId)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
        <div className="space-y-6">
          <BookingHeroSection
            selectedMode={selectedMode}
            selectedEquipment={selectedEquipment}
            selectedRentalPlan={selectedRentalPlan}
            selectedTrainer={selectedTrainer}
            isBundleMode={isBundleMode}
            isTrainerOnlyMode={isTrainerOnlyMode}
            onGoHome={handleGoHome}
            onReset={handleReset}
          />

          <BookingModesSection
            bookingModes={bookingModes}
            selectedModeId={selectedModeId}
            onModeChange={handleModeChange}
          />

          {!isTrainerOnlyMode && (
            <EquipmentSelectionSection
              equipmentCatalog={equipmentCatalog}
              selectedEquipmentId={selectedEquipmentId}
              isEquipmentOnlyMode={isEquipmentOnlyMode}
              onEquipmentSelect={onEquipmentSelect}
            />
          )}

          {!isTrainerOnlyMode && (
            <RentalPlanSection
              rentalPlanCatalog={rentalPlanCatalog}
              selectedRentalPlanId={selectedRentalPlanId}
              onRentalPlanChange={onRentalPlanChange}
            />
          )}

          {isBundleMode && (
            <TrainerSelectionSection
              stepLabel="Step 4"
              description="เริ่มจากดูรายชื่อโค้ชแบบสั้นก่อน แล้วกดดูรายละเอียดเพื่อเปิด popup ที่มีข้อมูลและตารางเวลา 7 วันครบในหน้าต่างเดียว"
              badgeText={
                equipmentNeedsTrainer
                  ? 'เครื่องนี้ต้องมีโค้ชประกบทุก session'
                  : 'Reformer สามารถเลือกโค้ชเพิ่มได้ตามต้องการ'
              }
              trainerCatalog={trainerCatalog}
              selectedTrainerId={selectedTrainerId}
              expandedTrainerId={expandedTrainerId}
              onTrainerSelect={handleTrainerSelect}
              onTrainerDetailsToggle={handleTrainerDetailsToggle}
            />
          )}

          {isTrainerOnlyMode && (
            <>
              <TrainerSelectionSection
                stepLabel="Step 2"
                description="หน้านี้เหมาะกับลูกค้าที่มีอุปกรณ์อยู่แล้วและต้องการจ้างโค้ชแยก โดยตารางเวลาจะรวมอยู่ใน popup รายละเอียดของแต่ละคน"
                trainerCatalog={trainerCatalog}
                selectedTrainerId={selectedTrainerId}
                expandedTrainerId={expandedTrainerId}
                onTrainerSelect={handleTrainerSelect}
                onTrainerDetailsToggle={handleTrainerDetailsToggle}
              />

              <TrainerServiceSection
                trainerServicePlans={trainerServicePlans}
                selectedTrainerServicePlanId={selectedTrainerServicePlanId}
                onTrainerServicePlanChange={onTrainerServicePlanChange}
              />
            </>
          )}
        </div>

        <BookingSidebar
          bookingState={bookingState}
          bookingSummary={bookingSummary}
        />
      </section>

      {expandedTrainer && (
        <TrainerDetailModal
          trainer={expandedTrainer}
          isSelected={expandedTrainer.id === selectedTrainerId}
          onClose={closeTrainerModal}
          onSelect={() => handleTrainerSelect(expandedTrainer.id)}
        />
      )}
    </main>
  )
}

export default BookingPage
