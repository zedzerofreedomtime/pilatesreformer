import { useState } from 'react'

function useBookingState({
  bookingModes,
  equipmentCatalog,
  rentalPlanCatalog,
  trainerCatalog,
  trainerServicePlans,
}) {
  const [selectedModeId, setSelectedModeId] = useState('bundle')
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('reformer')
  const [selectedRentalPlanId, setSelectedRentalPlanId] = useState('progress')
  const [selectedTrainerId, setSelectedTrainerId] = useState('')
  const [selectedTrainerServicePlanId, setSelectedTrainerServicePlanId] =
    useState('trainer-core')

  const resolvedEquipmentId = equipmentCatalog.some(
    (equipment) => equipment.id === selectedEquipmentId,
  )
    ? selectedEquipmentId
    : equipmentCatalog[0]?.id ?? ''

  const resolvedTrainerId = trainerCatalog.some(
    (trainer) => trainer.id === selectedTrainerId,
  )
    ? selectedTrainerId
    : trainerCatalog[0]?.id ?? ''

  const selectedMode =
    bookingModes.find((mode) => mode.id === selectedModeId) ?? bookingModes[0]
  const selectedEquipment =
    equipmentCatalog.find((equipment) => equipment.id === resolvedEquipmentId) ??
    equipmentCatalog[0]
  const selectedRentalPlan =
    rentalPlanCatalog.find((plan) => plan.id === selectedRentalPlanId) ??
    rentalPlanCatalog[0]
  const selectedTrainer =
    trainerCatalog.find((trainer) => trainer.id === resolvedTrainerId) ??
    trainerCatalog[0]
  const selectedTrainerServicePlan =
    trainerServicePlans.find((plan) => plan.id === selectedTrainerServicePlanId) ??
    trainerServicePlans[0]

  const isBundleMode = selectedModeId === 'bundle'
  const isEquipmentOnlyMode = selectedModeId === 'equipment-only'
  const isTrainerOnlyMode = selectedModeId === 'trainer-only'
  const equipmentNeedsTrainer = selectedEquipment?.trainerMode === 'required'

  const handleModeChange = (modeId) => {
    setSelectedModeId(modeId)

    if (modeId === 'equipment-only' && selectedEquipment?.trainerMode === 'required') {
      setSelectedEquipmentId('reformer')
    }
  }

  const openBookingSelection = ({ modeId = 'bundle', equipmentId } = {}) => {
    const requestedEquipment = equipmentId ?? selectedEquipmentId
    const requestedEquipmentData = equipmentCatalog.find(
      (equipment) => equipment.id === requestedEquipment,
    )
    const normalizedEquipmentId =
      modeId === 'equipment-only' && requestedEquipmentData?.trainerMode === 'required'
        ? 'reformer'
        : requestedEquipment

    handleModeChange(modeId)

    if (normalizedEquipmentId) {
      setSelectedEquipmentId(normalizedEquipmentId)
    }
  }

  const resetBooking = () => {
    setSelectedModeId('bundle')
    setSelectedEquipmentId(equipmentCatalog[0]?.id ?? 'reformer')
    setSelectedRentalPlanId(rentalPlanCatalog[0]?.id ?? '')
    setSelectedTrainerId(trainerCatalog[0]?.id ?? '')
    setSelectedTrainerServicePlanId(trainerServicePlans[0]?.id ?? '')
  }

  const rentalSubtotal = Math.round(
    (selectedEquipment?.monthlyRate ?? 0) *
      (selectedRentalPlan?.months ?? 0) *
      (selectedRentalPlan?.discount ?? 1),
  )
  const installFee = (selectedRentalPlan?.months ?? 0) >= 3 ? 0 : 1500
  const bundleSessions = equipmentNeedsTrainer
    ? selectedRentalPlan?.requiredSessions ?? 0
    : selectedRentalPlan?.optionalSessions ?? 0
  const bundleTrainerSubtotal = bundleSessions * (selectedTrainer?.sessionRate ?? 0)
  const bundleGrandTotal = rentalSubtotal + bundleTrainerSubtotal + installFee
  const equipmentOnlyTotal = rentalSubtotal + installFee
  const trainerOnlyTotal = Math.round(
    (selectedTrainer?.sessionRate ?? 0) *
      (selectedTrainerServicePlan?.sessions ?? 0) *
      (selectedTrainerServicePlan?.discount ?? 1),
  )

  const bookingState = {
    selectedModeId,
    selectedMode,
    selectedEquipmentId: resolvedEquipmentId,
    selectedEquipment,
    selectedRentalPlanId,
    selectedRentalPlan,
    selectedTrainerId: resolvedTrainerId,
    selectedTrainer,
    selectedTrainerServicePlanId,
    selectedTrainerServicePlan,
    isBundleMode,
    isEquipmentOnlyMode,
    isTrainerOnlyMode,
    equipmentNeedsTrainer,
  }

  const bookingSummary = {
    rentalSubtotal,
    installFee,
    bundleSessions,
    bundleTrainerSubtotal,
    bundleGrandTotal,
    equipmentOnlyTotal,
    trainerOnlyTotal,
  }

  const bookingActions = {
    onModeChange: handleModeChange,
    onEquipmentSelect: setSelectedEquipmentId,
    onRentalPlanChange: setSelectedRentalPlanId,
    onTrainerSelect: setSelectedTrainerId,
    onTrainerServicePlanChange: setSelectedTrainerServicePlanId,
    onReset: resetBooking,
  }

  return {
    bookingState,
    bookingSummary,
    bookingActions,
    openBookingSelection,
  }
}

export default useBookingState
