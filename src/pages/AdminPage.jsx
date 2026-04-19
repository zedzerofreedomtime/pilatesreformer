import EquipmentManagementPanel from '../features/admin/components/EquipmentManagementPanel'
import TrainerApprovalPanel from '../features/admin/components/TrainerApprovalPanel'
import TrainerManagementPanel from '../features/admin/components/TrainerManagementPanel'

function AdminPage({
  authUser,
  equipmentCatalog,
  trainerCatalog,
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
              จัดการข้อมูลเทรนเนอร์ อุปกรณ์ และคำขอสมัครสมาชิก
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              หน้านี้เปิดให้ใช้งานเฉพาะตอน login เป็น admin เพื่อจัดการรายชื่อเทรนเนอร์
              รายละเอียดอุปกรณ์กีฬา และการอนุมัติคำขอสมัครของเทรนเนอร์ใหม่
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={adminActions.onGoToHomeContentAdmin}
                className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
              >
                จัดการรายละเอียดหน้าแรก
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
                  ผู้ดูแลที่ login อยู่
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {authUser?.name}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เทรนเนอร์ทั้งหมด
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {trainerCatalog.length} คน
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  คำขอสมัครเทรนเนอร์
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {pendingTrainerApplications.length} รายการ
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  อุปกรณ์ทั้งหมด
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {equipmentCatalog.length} รุ่น
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
