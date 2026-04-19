import { useEffect, useState } from 'react'
import AppHeader from './components/AppHeader'
import {
  bookingModes,
  equipmentCatalog,
  rentalPlanCatalog,
  trainerCatalog,
  trainerServicePlans,
} from './data/siteData'
import BookingPage from './pages/BookingPage'
import HomePage from './pages/HomePage'
import { getHashForPage, getPageFromHash } from './utils/pageNavigation'

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash)
  const [selectedModeId, setSelectedModeId] = useState('bundle')
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('reformer')
  const [selectedRentalPlanId, setSelectedRentalPlanId] = useState('progress')
  const [selectedTrainerId, setSelectedTrainerId] = useState(trainerCatalog[0].id)
  const [selectedTrainerServicePlanId, setSelectedTrainerServicePlanId] =
    useState('trainer-core')

  const selectedMode =
    bookingModes.find((mode) => mode.id === selectedModeId) ?? bookingModes[0]
  const selectedEquipment =
    equipmentCatalog.find((equipment) => equipment.id === selectedEquipmentId) ??
    equipmentCatalog[0]
  const selectedRentalPlan =
    rentalPlanCatalog.find((plan) => plan.id === selectedRentalPlanId) ??
    rentalPlanCatalog[0]
  const selectedTrainer =
    trainerCatalog.find((trainer) => trainer.id === selectedTrainerId) ??
    trainerCatalog[0]
  const selectedTrainerServicePlan =
    trainerServicePlans.find((plan) => plan.id === selectedTrainerServicePlanId) ??
    trainerServicePlans[1]

  const isBundleMode = selectedModeId === 'bundle'
  const isEquipmentOnlyMode = selectedModeId === 'equipment-only'
  const isTrainerOnlyMode = selectedModeId === 'trainer-only'
  const equipmentNeedsTrainer = selectedEquipment.trainerMode === 'required'

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    if (!window.location.hash) {
      window.history.replaceState(null, '', getHashForPage('home'))
    }

    const handleHashChange = () => {
      setActivePage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.hash !== getHashForPage(activePage)
    ) {
      window.history.replaceState(null, '', getHashForPage(activePage))
    }
  }, [activePage])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [activePage])

  const navigateToPage = (page) => {
    setActivePage(page)

    if (typeof window !== 'undefined') {
      const nextHash = getHashForPage(page)

      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handleModeChange = (modeId) => {
    setSelectedModeId(modeId)

    if (modeId === 'equipment-only' && selectedEquipment.trainerMode === 'required') {
      setSelectedEquipmentId('reformer')
    }
  }

  const openBookingPage = ({ modeId = 'bundle', equipmentId } = {}) => {
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

    navigateToPage('booking')
  }

  const resetBooking = () => {
    setSelectedModeId('bundle')
    setSelectedEquipmentId('reformer')
    setSelectedRentalPlanId('progress')
    setSelectedTrainerId(trainerCatalog[0].id)
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
    onGoHome: () => navigateToPage('home'),
    onModeChange: handleModeChange,
    onEquipmentSelect: setSelectedEquipmentId,
    onRentalPlanChange: setSelectedRentalPlanId,
    onTrainerSelect: setSelectedTrainerId,
    onTrainerServicePlanChange: setSelectedTrainerServicePlanId,
    onReset: resetBooking,
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(244,177,118,0.32),transparent_48%)]" />
      <div className="absolute right-0 top-20 -z-10 h-80 w-80 rounded-full bg-[#0f4e45]/10 blur-3xl" />

      <AppHeader
        activePage={activePage}
        onNavigateHome={() => navigateToPage('home')}
        onNavigateBooking={() => navigateToPage('booking')}
        onStartBooking={() => openBookingPage({ modeId: 'bundle' })}
      />

      {activePage === 'home' ? (
        <HomePage
          onGoToBooking={() => navigateToPage('booking')}
          onOpenBookingPage={openBookingPage}
        />
      ) : (
        <BookingPage
          bookingState={bookingState}
          bookingSummary={bookingSummary}
          bookingActions={bookingActions}
        />
      )}
    </div>
  )
}

export default App
