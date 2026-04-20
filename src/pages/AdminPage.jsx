import DatabaseManagementPanel from '../features/admin/components/DatabaseManagementPanel'
import EquipmentManagementPanel from '../features/admin/components/EquipmentManagementPanel'
import TrainerApprovalPanel from '../features/admin/components/TrainerApprovalPanel'
import TrainerManagementPanel from '../features/admin/components/TrainerManagementPanel'

function AdminPage({
  authUser,
  authToken,
  equipmentCatalog,
  trainerCatalog,
  rentalPlanCatalog,
  trainerServicePlans,
  pendingTrainerApplications,
  adminActions,
}) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="panel overflow-hidden p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            <span className="eyebrow">Admin Dashboard</span>
            <h1 className="mt-4 font-display text-4xl leading-[0.98] text-slate-900 sm:text-5xl">
              เน€เธยเน€เธเธ‘เน€เธโ€เน€เธยเน€เธเธ’เน€เธเธเน€เธยเน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธ…เน€เธโฌเน€เธโ€”เน€เธเธเน€เธยเน€เธโฌเน€เธยเน€เธเธเน€เธเธเน€เธย เน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธเธเน€เธโ€เน€เธย เน€เธยเน€เธเธ…เน€เธเธเน€เธยเน€เธเธ“เน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธ‘เน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธ’เน€เธยเน€เธเธ”เน€เธย
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              เน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธยเน€เธเธ•เน€เธยเน€เธโฌเน€เธยเน€เธเธ”เน€เธโ€เน€เธยเน€เธเธเน€เธยเน€เธยเน€เธยเน€เธยเน€เธยเน€เธเธ’เน€เธยเน€เธโฌเน€เธยเน€เธยเน€เธเธ’เน€เธเธเน€เธโ€ขเน€เธเธเน€เธย login เน€เธโฌเน€เธยเน€เธยเน€เธย admin เน€เธโฌเน€เธยเน€เธเธ—เน€เธยเน€เธเธเน€เธยเน€เธเธ‘เน€เธโ€เน€เธยเน€เธเธ’เน€เธเธเน€เธเธเน€เธเธ’เน€เธเธเน€เธยเน€เธเธ—เน€เธยเน€เธเธเน€เธโฌเน€เธโ€”เน€เธเธเน€เธยเน€เธโฌเน€เธยเน€เธเธเน€เธเธเน€เธย
              เน€เธเธเน€เธเธ’เน€เธเธเน€เธเธ…เน€เธเธเน€เธโฌเน€เธเธเน€เธเธ•เน€เธเธเน€เธโ€เน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธเธเน€เธโ€เน€เธยเน€เธยเน€เธเธ•เน€เธเธเน€เธเธ’ เน€เธยเน€เธเธ…เน€เธเธเน€เธยเน€เธเธ’เน€เธเธเน€เธเธเน€เธยเน€เธเธเน€เธเธเน€เธเธ‘เน€เธโ€ขเน€เธเธ”เน€เธยเน€เธเธ“เน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธ‘เน€เธยเน€เธเธเน€เธยเน€เธเธเน€เธยเน€เธโฌเน€เธโ€”เน€เธเธเน€เธยเน€เธโฌเน€เธยเน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธเธเน€เธเธเน€เธย
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={adminActions.onGoToHomeContentAdmin}
                className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
              >
                เน€เธยเน€เธเธ‘เน€เธโ€เน€เธยเน€เธเธ’เน€เธเธเน€เธเธเน€เธเธ’เน€เธเธเน€เธเธ…เน€เธเธเน€เธโฌเน€เธเธเน€เธเธ•เน€เธเธเน€เธโ€เน€เธเธเน€เธยเน€เธยเน€เธเธ’เน€เธยเน€เธเธเน€เธย
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#eadbc8] bg-[#fbf3e8] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
              Admin Session
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เน€เธยเน€เธเธเน€เธยเน€เธโ€เน€เธเธเน€เธยเน€เธเธ…เน€เธโ€”เน€เธเธ•เน€เธย login เน€เธเธเน€เธเธเน€เธเธเน€เธย
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {authUser?.name}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เน€เธโฌเน€เธโ€”เน€เธเธเน€เธยเน€เธโฌเน€เธยเน€เธเธเน€เธเธเน€เธยเน€เธโ€”เน€เธเธ‘เน€เธยเน€เธยเน€เธเธเน€เธเธเน€เธโ€
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {trainerCatalog.length} เน€เธยเน€เธย
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เน€เธยเน€เธเธ“เน€เธยเน€เธเธเน€เธเธเน€เธเธเน€เธเธ‘เน€เธยเน€เธเธเน€เธโฌเน€เธโ€”เน€เธเธเน€เธยเน€เธโฌเน€เธยเน€เธเธเน€เธเธเน€เธย
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {pendingTrainerApplications.length} เน€เธเธเน€เธเธ’เน€เธเธเน€เธยเน€เธเธ’เน€เธเธ
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เน€เธเธเน€เธเธเน€เธยเน€เธยเน€เธเธเน€เธโ€เน€เธยเน€เธโ€”เน€เธเธ‘เน€เธยเน€เธยเน€เธเธเน€เธเธเน€เธโ€
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {equipmentCatalog.length} เน€เธเธเน€เธเธเน€เธยเน€เธย
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DatabaseManagementPanel
        token={authToken}
        equipmentCatalog={equipmentCatalog}
        trainerCatalog={trainerCatalog}
        rentalPlanCatalog={rentalPlanCatalog}
        trainerServicePlans={trainerServicePlans}
        pendingTrainerApplications={pendingTrainerApplications}
        onRefreshData={adminActions.onRefreshData}
      />

      <TrainerApprovalPanel
        pendingTrainerApplications={pendingTrainerApplications}
        onApproveTrainer={adminActions.onApproveTrainer}
        onRejectTrainer={adminActions.onRejectTrainer}
      />

      <TrainerManagementPanel
        trainerCatalog={trainerCatalog}
        onAddTrainer={adminActions.onAddTrainer}
        onUpdateTrainer={adminActions.onUpdateTrainer}
        onRemoveTrainer={adminActions.onRemoveTrainer}
      />

      <EquipmentManagementPanel
        equipmentCatalog={equipmentCatalog}
        onAddEquipment={adminActions.onAddEquipment}
        onUpdateEquipment={adminActions.onUpdateEquipment}
        onRemoveEquipment={adminActions.onRemoveEquipment}
      />
    </main>
  )
}

export default AdminPage
