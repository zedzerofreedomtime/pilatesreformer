import { useMemo, useState } from 'react'

const formatSubmittedAt = (submittedAt) => {
  if (!submittedAt) {
    return '-'
  }

  const parsedDate = new Date(submittedAt)

  if (Number.isNaN(parsedDate.getTime())) {
    return submittedAt
  }

  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(parsedDate)
}

function TrainerApprovalPanel({
  pendingTrainerApplications,
  onApproveTrainer,
  onRejectTrainer,
}) {
  const [pendingActionId, setPendingActionId] = useState('')

  const applicationCountLabel = useMemo(
    () => `${pendingTrainerApplications.length} รายการ`,
    [pendingTrainerApplications.length],
  )

  const handleApprove = async (applicationId) => {
    setPendingActionId(`approve:${applicationId}`)
    await onApproveTrainer(applicationId)
    setPendingActionId('')
  }

  const handleReject = async (applicationId) => {
    setPendingActionId(`reject:${applicationId}`)
    await onRejectTrainer(applicationId)
    setPendingActionId('')
  }

  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Admin / Applications</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            คำขอสมัครสมาชิกเทรนเนอร์
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            เทรนเนอร์ที่สมัครเข้ามาใหม่จะยังไม่สามารถเข้าสู่ระบบได้จนกว่าแอดมินจะอนุมัติจากส่วนนี้
          </p>
        </div>

        <div className="rounded-full bg-[#f7efe4] px-4 py-2 text-sm font-semibold text-slate-700">
          รออนุมัติ {applicationCountLabel}
        </div>
      </div>

      {pendingTrainerApplications.length > 0 ? (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {pendingTrainerApplications.map((application) => {
            const approving = pendingActionId === `approve:${application.id}`
            const rejecting = pendingActionId === `reject:${application.id}`
            const isBusy = approving || rejecting

            return (
              <article
                key={application.id}
                className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-3xl text-slate-900">
                      {application.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      {formatSubmittedAt(application.submittedAt)}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#fff4e8] px-3 py-1.5 text-xs font-semibold text-[#8a4b10]">
                    รออนุมัติ
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">อีเมล:</span> {application.email}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">เบอร์โทร:</span> {application.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">ความถนัด:</span> {application.specialty}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">เครื่องที่ถนัด:</span>{' '}
                    {application.machineFocus.join(', ')}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleApprove(application.id)}
                    disabled={isBusy}
                    className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {approving ? 'กำลังอนุมัติ...' : 'อนุมัติเป็นเทรนเนอร์'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(application.id)}
                    disabled={isBusy}
                    className="rounded-full border border-[#e3b4ae] px-5 py-3 text-sm font-semibold text-[#b42318] transition hover:bg-[#fff3f1] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {rejecting ? 'กำลังปฏิเสธ...' : 'ปฏิเสธคำขอ'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[28px] border border-dashed border-[#d8c8b4] bg-[#fffaf3] px-5 py-6 text-sm leading-6 text-slate-600">
          ตอนนี้ยังไม่มีคำขอสมัครเป็นเทรนเนอร์ที่รอการอนุมัติ
        </div>
      )}
    </section>
  )
}

export default TrainerApprovalPanel
