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
    rentalPlanCatalog,
    trainerServicePlans,
    pendingTrainerApplications,
    trainerClients,
    homePageContent,
    homeStats,
    topRentedCards,
    catalogError,
    isCatalogLoading,
    loadBootstrap,
    loadPendingApplications,
    loadTrainerClients,
    addTrainer,
    updateTrainer,
    removeTrainer,
    addEquipment,
    updateEquipment,
    removeEquipment,
    approveTrainerApplication,
    rejectTrainerApplication,
    updateHomePageContent,
  } = useSiteCatalogState()
  const {
    authUser,
    authToken,
    isLoginOpen,
    selectedRoleId,
    selectedRole,
    selectedTrainerLoginId,
    roleCatalog,
    openLogin,
    closeLogin,
    setSelectedRoleId,
    setSelectedTrainerLoginId,
    login,
    register,
    logout,
  } = useAuthState({ trainerCatalog })
  const bookingModes = homePageContent?.bookingModes ?? []
  const {
    bookingState,
    bookingSummary,
    bookingActions,
    openBookingSelection,
  } = useBookingState({
    bookingModes,
    equipmentCatalog,
    rentalPlanCatalog,
    trainerCatalog,
    trainerServicePlans,
  })

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

  useEffect(() => {
    if (authUser?.roleId === 'admin' && authToken) {
      void loadPendingApplications(authToken)
      return
    }

    void loadPendingApplications('')
  }, [authToken, authUser?.roleId, loadPendingApplications])

  useEffect(() => {
    if (authUser?.roleId === 'trainer' && authToken) {
      void loadTrainerClients(authToken)
      return
    }

    void loadTrainerClients('')
  }, [authToken, authUser?.roleId, loadTrainerClients])

  const openBookingPage = (options = {}) => {
    openBookingSelection(options)
    navigateToPage('booking')
  }

  const handleLogin = async (payload) => {
    const result = await login(payload)

    if (result.status !== 'success') {
      return result
    }

    if (result.user.roleId === 'admin') {
      navigateToPage('admin')
      return result
    }

    if (result.user.roleId === 'trainer') {
      navigateToPage('trainer')
      return result
    }

    navigateToPage('home')
    return result
  }

  const handleRegister = async (payload) => {
    const result = await register(payload)

    if (result.status === 'pending') {
      if (authToken) {
        await loadPendingApplications(authToken)
      }

      return result
    }

    if (result.status === 'success' && result.user?.roleId === 'user') {
      navigateToPage('home')
    }

    return result
  }

  const selectedTrainer =
    trainerCatalog.find((trainer) => trainer.id === selectedTrainerLoginId) ??
    trainerCatalog[0] ??
    null
  const activeTrainer =
    authUser?.roleId === 'trainer'
      ? trainerCatalog.find((trainer) => trainer.id === authUser.trainerId) ?? null
      : null

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
          catalogError={catalogError}
          isCatalogLoading={isCatalogLoading}
          onGoToBooking={() => navigateToPage('booking')}
          onOpenBookingPage={openBookingPage}
          onRetryCatalogLoad={loadBootstrap}
          topRentedCards={topRentedCards}
        />
      )}

      {activePage === 'booking' && (
        <BookingPage
          bookingModes={bookingModes}
          bookingState={bookingState}
          bookingSummary={bookingSummary}
          bookingActions={{
            ...bookingActions,
            onGoHome: () => navigateToPage('home'),
          }}
          catalogError={catalogError}
          isCatalogLoading={isCatalogLoading}
          onRetryCatalogLoad={loadBootstrap}
          equipmentCatalog={equipmentCatalog}
          rentalPlanCatalog={rentalPlanCatalog}
          trainerCatalog={trainerCatalog}
          trainerServicePlans={trainerServicePlans}
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
          authToken={authToken}
          equipmentCatalog={equipmentCatalog}
          trainerCatalog={trainerCatalog}
          rentalPlanCatalog={rentalPlanCatalog}
          trainerServicePlans={trainerServicePlans}
          pendingTrainerApplications={pendingTrainerApplications}
          adminActions={{
            onGoToHomeContentAdmin: () => navigateToPage('admin-home-content'),
            onRefreshData: () =>
              Promise.all([
                loadBootstrap(),
                loadPendingApplications(authToken),
              ]),
            onAddTrainer: () => addTrainer(authToken),
            onUpdateTrainer: (trainerId, updates) =>
              updateTrainer(authToken, trainerId, updates),
            onRemoveTrainer: (trainerId) => removeTrainer(authToken, trainerId),
            onAddEquipment: () => addEquipment(authToken),
            onUpdateEquipment: (equipmentId, updates) =>
              updateEquipment(authToken, equipmentId, updates),
            onRemoveEquipment: (equipmentId) =>
              removeEquipment(authToken, equipmentId),
            onApproveTrainer: (applicationId) =>
              approveTrainerApplication(authToken, applicationId),
            onRejectTrainer: (applicationId) =>
              rejectTrainerApplication(authToken, applicationId),
          }}
        />
      )}

      {activePage === 'admin-home-content' &&
        authUser?.roleId === 'admin' &&
        homePageContent && (
          <AdminHomeContentPage
            equipmentCatalog={equipmentCatalog}
            homePageContent={homePageContent}
            onGoToAdmin={() => navigateToPage('admin')}
            onPreviewHome={() => navigateToPage('home')}
            onSaveHomePageContent={(nextContent) =>
              updateHomePageContent(authToken, nextContent)
            }
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
