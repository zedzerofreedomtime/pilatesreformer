import { useEffect } from 'react'
import AppHeader from './components/layout/AppHeader'
import LoginModal from './features/auth/components/LoginModal'
import useAuthState from './features/auth/hooks/useAuthState'
import useBookingState from './features/booking/hooks/useBookingState'
import useHashPage from './hooks/useHashPage'
import useSiteCatalogState from './hooks/useSiteCatalogState'
import AdminPage from './pages/AdminPage'
import AdminHomeContentPage from './pages/AdminHomeContentPage'
import BookingPage from './pages/BookingPage'
import HomePage from './pages/HomePage'
import TrainerPage from './pages/TrainerPage'

function App() {
  const { activePage, navigateToPage } = useHashPage()
  const {
    equipmentCatalog,
    trainerCatalog,
    trainerClientMap,
    pendingTrainerApplications,
    homePageContent,
    homeStats,
    topRentedCards,
    addTrainer,
    updateTrainer,
    removeTrainer,
    addEquipment,
    updateEquipment,
    removeEquipment,
    registerMember,
    approveTrainerApplication,
    rejectTrainerApplication,
    updateHomePageContent,
  } = useSiteCatalogState()
  const { bookingState, bookingSummary, bookingActions, openBookingSelection } =
    useBookingState({ equipmentCatalog, trainerCatalog })
  const {
    authUser,
    isLoginOpen,
    selectedRoleId,
    selectedRole,
    selectedTrainerLoginId,
    selectedTrainer,
    roleCatalog,
    openLogin,
    closeLogin,
    setSelectedRoleId,
    setSelectedTrainerLoginId,
    login,
    logout,
  } = useAuthState({ trainerCatalog })

  useEffect(() => {
    if (
      (activePage === 'admin' || activePage === 'admin-home-content') &&
      authUser?.roleId !== 'admin'
    ) {
      navigateToPage('home')
    }

    if (activePage === 'trainer' && authUser?.roleId !== 'trainer') {
      navigateToPage('home')
    }
  }, [activePage, authUser?.roleId, navigateToPage])

  const openBookingPage = (options = {}) => {
    openBookingSelection(options)
    navigateToPage('booking')
  }

  const handleLogin = (payload) => {
    login(payload)

    if (payload.roleId === 'admin') {
      navigateToPage('admin')
      return
    }

    if (payload.roleId === 'trainer') {
      navigateToPage('trainer')
      return
    }

    navigateToPage('home')
  }

  const handleRegister = (payload) => {
    const result = registerMember(payload)

    if (!result) {
      return result
    }

    if (payload.roleId === 'user' && result.status === 'success') {
      login({
        name: payload.name,
        email: payload.email,
        roleId: 'user',
      })
      navigateToPage('home')
    }

    return result
  }

  const activeTrainer =
    authUser?.roleId === 'trainer'
      ? trainerCatalog.find((trainer) => trainer.id === authUser.trainerId) ?? null
      : null
  const trainerClients =
    authUser?.roleId === 'trainer'
      ? trainerClientMap[authUser.trainerId] ?? []
      : []

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(244,177,118,0.32),transparent_48%)]" />
      <div className="absolute right-0 top-20 -z-10 h-80 w-80 rounded-full bg-[#0f4e45]/10 blur-3xl" />

      <AppHeader
        activePage={activePage}
        authUser={authUser}
        onNavigateAdmin={() => navigateToPage('admin')}
        onNavigateAdminHomeContent={() => navigateToPage('admin-home-content')}
        onNavigateHome={() => navigateToPage('home')}
        onNavigateBooking={() => navigateToPage('booking')}
        onNavigateTrainer={() => navigateToPage('trainer')}
        onStartBooking={() => openBookingPage({ modeId: 'bundle' })}
        onOpenLogin={openLogin}
        onLogout={logout}
      />

      {activePage === 'home' && (
        <HomePage
          homePageContent={homePageContent}
          homeStats={homeStats}
          onGoToBooking={() => navigateToPage('booking')}
          onOpenBookingPage={openBookingPage}
          topRentedCards={topRentedCards}
        />
      )}

      {activePage === 'booking' && (
        <BookingPage
          bookingState={bookingState}
          bookingSummary={bookingSummary}
          bookingActions={{
            ...bookingActions,
            onGoHome: () => navigateToPage('home'),
          }}
          equipmentCatalog={equipmentCatalog}
          trainerCatalog={trainerCatalog}
        />
      )}

      {activePage === 'trainer' && authUser?.roleId === 'trainer' && (
        <TrainerPage
          authUser={authUser}
          trainer={activeTrainer}
          trainerClients={trainerClients}
        />
      )}

      {activePage === 'admin' && authUser?.roleId === 'admin' && (
        <AdminPage
          authUser={authUser}
          equipmentCatalog={equipmentCatalog}
          trainerCatalog={trainerCatalog}
          pendingTrainerApplications={pendingTrainerApplications}
          adminActions={{
            onGoToHomeContentAdmin: () => navigateToPage('admin-home-content'),
            onAddTrainer: addTrainer,
            onUpdateTrainer: updateTrainer,
            onRemoveTrainer: removeTrainer,
            onAddEquipment: addEquipment,
            onUpdateEquipment: updateEquipment,
            onRemoveEquipment: removeEquipment,
            onApproveTrainer: approveTrainerApplication,
            onRejectTrainer: rejectTrainerApplication,
            onSaveHomePageContent: updateHomePageContent,
          }}
        />
      )}

      {activePage === 'admin-home-content' && authUser?.roleId === 'admin' && (
        <AdminHomeContentPage
          equipmentCatalog={equipmentCatalog}
          homePageContent={homePageContent}
          onGoToAdmin={() => navigateToPage('admin')}
          onPreviewHome={() => navigateToPage('home')}
          onSaveHomePageContent={updateHomePageContent}
        />
      )}

      <LoginModal
        isOpen={isLoginOpen}
        selectedRoleId={selectedRoleId}
        selectedRole={selectedRole}
        selectedTrainer={selectedTrainer}
        selectedTrainerLoginId={selectedTrainerLoginId}
        trainerCatalog={trainerCatalog}
        roleCatalog={roleCatalog}
        onRoleChange={setSelectedRoleId}
        onTrainerLoginChange={setSelectedTrainerLoginId}
        onClose={closeLogin}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  )
}

export default App
