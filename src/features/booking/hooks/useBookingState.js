import { useState } from 'react'
import {
  bookingModes,
  rentalPlanCatalog,
  trainerServicePlans,
} from '../../../data/siteData'

function useBookingState({ equipmentCatalog, trainerCatalog }) {
  const [selectedModeId, setSelectedModeId] = useState('bundle')
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('reformer')
  const [selectedRentalPlanId, setSelectedRentalPlanId] = useState('progress')
  const [selectedTrainerId, setSelectedTrainerId] = useState(
    trainerCatalog[0]?.id ?? '',
  )
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
    trainerServicePlans[1]

  const isBundleMode = selectedModeId === 'bundle'
  const isEquipmentOnlyMode = selectedModeId === 'equipment-only'
  const isTrainerOnlyMode = selectedModeId === 'trainer-only'
  const equipmentNeedsTrainer = selectedEquipment.trainerMode === 'required'

  const handleModeChange = (modeId) => {
    setSelectedModeId(modeId)

    if (modeId === 'equipment-only' && selectedEquipment.trainerMode === 'required') {
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
    setSelectedRentalPlanId('progress')
    setSelectedTrainerId(trainerCatalog[0]?.id ?? '')
    setSelectedTrainerServicePlanId('trainer-core')
  }

  const rentalSubtotal = Math.round(
    selectedEquipment.monthlyRate *
      selectedRentalPlan.months *
      selectedRentalPlan.discount,
  )
  const installFee = selectedRentalPlan.months >= 3 ? 0 : 1500
  const bundleSessions = equipmentNeedsTrainer
    ? selectedRentalPlan.requiredSessions
    : selectedRentalPlan.optionalSessions
  const bundleTrainerSubtotal = bundleSessions * selectedTrainer.sessionRate
  const bundleGrandTotal = rentalSubtotal + bundleTrainerSubtotal + installFee
  const equipmentOnlyTotal = rentalSubtotal + installFee
  const trainerOnlyTotal = Math.round(
    selectedTrainer.sessionRate *
      selectedTrainerServicePlan.sessions *
      selectedTrainerServicePlan.discount,
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
