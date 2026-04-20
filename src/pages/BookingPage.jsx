import { useState } from 'react'
import TrainerDetailModal from '../features/booking/components/modal/TrainerDetailModal'
import BookingSidebar from '../features/booking/components/sidebar/BookingSidebar'
import BookingHeroSection from '../features/booking/sections/BookingHeroSection'
import BookingModesSection from '../features/booking/sections/BookingModesSection'
import EquipmentSelectionSection from '../features/booking/sections/EquipmentSelectionSection'
import RentalPlanSection from '../features/booking/sections/RentalPlanSection'
import TrainerSelectionSection from '../features/booking/sections/TrainerSelectionSection'
import TrainerServiceSection from '../features/booking/sections/TrainerServiceSection'

function BookingPage({
  bookingModes,
  bookingState,
  bookingSummary,
  bookingActions,
  catalogError,
  isCatalogLoading,
  onRetryCatalogLoad,
  equipmentCatalog,
  rentalPlanCatalog,
  trainerCatalog,
  trainerServicePlans,
}) {
  const [expandedTrainerId, setExpandedTrainerId] = useState(null)
  const hasCatalogData =
    bookingModes.length > 0 &&
    equipmentCatalog.length > 0 &&
    rentalPlanCatalog.length > 0

  if (isCatalogLoading && !hasCatalogData) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="panel p-8 sm:p-10">
          <span className="eyebrow">Booking Status</span>
          <h1 className="mt-4 font-display text-4xl text-slate-900">
            Loading booking catalog...
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Waiting for equipment, trainer, and plan data from the API.
          </p>
        </section>
      </main>
    )
  }

  if (!hasCatalogData) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="panel p-8 sm:p-10">
          <span className="eyebrow">Booking Status</span>
          <h1 className="mt-4 font-display text-4xl text-slate-900">
            Booking data is unavailable
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            {catalogError || 'The API did not return the booking catalog.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void onRetryCatalogLoad()}
              className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
            >
              Retry API connection
            </button>
          </div>
        </section>
      </main>
    )
  }

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
              description="เน€เธโฌเน€เธเธเน€เธเธ”เน€เธยเน€เธเธเน€เธยเน€เธเธ’เน€เธยเน€เธโ€เน€เธเธเน€เธเธเน€เธเธ’เน€เธเธเน€เธยเน€เธเธ—เน€เธยเน€เธเธเน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธเธเน€เธเธ‘เน€เธยเน€เธยเน€เธยเน€เธยเน€เธเธเน€เธย เน€เธยเน€เธเธ…เน€เธยเน€เธเธเน€เธยเน€เธโ€เน€เธโ€เน€เธเธเน€เธเธเน€เธเธ’เน€เธเธเน€เธเธ…เน€เธเธเน€เธโฌเน€เธเธเน€เธเธ•เน€เธเธเน€เธโ€เน€เธโฌเน€เธยเน€เธเธ—เน€เธยเน€เธเธเน€เธโฌเน€เธยเน€เธเธ”เน€เธโ€ popup เน€เธโ€”เน€เธเธ•เน€เธยเน€เธเธเน€เธเธ•เน€เธยเน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธ…เน€เธยเน€เธเธ…เน€เธเธเน€เธโ€ขเน€เธเธ’เน€เธเธเน€เธเธ’เน€เธยเน€เธโฌเน€เธเธเน€เธเธ…เน€เธเธ’ 7 เน€เธเธเน€เธเธ‘เน€เธยเน€เธยเน€เธเธเน€เธยเน€เธยเน€เธยเน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธโ€ขเน€เธยเน€เธเธ’เน€เธยเน€เธโฌเน€เธโ€เน€เธเธ•เน€เธเธเน€เธเธ"
              badgeText={
                equipmentNeedsTrainer
                  ? 'เน€เธโฌเน€เธยเน€เธเธเน€เธเธ—เน€เธยเน€เธเธเน€เธยเน€เธยเน€เธเธ•เน€เธยเน€เธโ€ขเน€เธยเน€เธเธเน€เธยเน€เธเธเน€เธเธ•เน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธโ€”เน€เธเธเน€เธย session'
                  : 'Reformer เน€เธเธเน€เธเธ’เน€เธเธเน€เธเธ’เน€เธเธเน€เธโ€“เน€เธโฌเน€เธเธ…เน€เธเธ—เน€เธเธเน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธโฌเน€เธยเน€เธเธ”เน€เธยเน€เธเธเน€เธยเน€เธโ€เน€เธยเน€เธโ€ขเน€เธเธ’เน€เธเธเน€เธโ€ขเน€เธยเน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธเธ'
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
                description="เน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธยเน€เธเธ•เน€เธยเน€เธโฌเน€เธเธเน€เธเธเน€เธเธ’เน€เธเธเน€เธยเน€เธเธ‘เน€เธยเน€เธเธ…เน€เธเธเน€เธยเน€เธยเน€เธยเน€เธเธ’เน€เธโ€”เน€เธเธ•เน€เธยเน€เธเธเน€เธเธ•เน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธเธเน€เธโ€เน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธเธ…เน€เธยเน€เธเธเน€เธยเน€เธเธ…เน€เธเธเน€เธโ€ขเน€เธยเน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธเธเน€เธย เน€เธยเน€เธโ€เน€เธเธเน€เธโ€ขเน€เธเธ’เน€เธเธเน€เธเธ’เน€เธยเน€เธโฌเน€เธเธเน€เธเธ…เน€เธเธ’เน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธเน€เธเธเน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธย popup เน€เธเธเน€เธเธ’เน€เธเธเน€เธเธ…เน€เธเธเน€เธโฌเน€เธเธเน€เธเธ•เน€เธเธเน€เธโ€เน€เธยเน€เธเธเน€เธยเน€เธยเน€เธโ€ขเน€เธยเน€เธเธ…เน€เธเธเน€เธยเน€เธย"
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
