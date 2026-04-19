import { useEffect } from 'react'
import WeeklyScheduleTable from './WeeklyScheduleTable'
import { formatCurrency } from '../../../../utils/formatCurrency'

function TrainerDetailModal({ trainer, isSelected, onClose, onSelect }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`รายละเอียดของ ${trainer.name}`}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <article
          className="w-full max-w-6xl overflow-hidden rounded-[34px] border border-white/60 bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ef_100%)] shadow-[0_40px_120px_-45px_rgba(15,23,42,0.48)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-[#efe3d5] bg-[#f7efe4] p-6 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="shrink-0 overflow-hidden rounded-[26px] bg-[#eef6f4] ring-1 ring-[#dbe8e4]">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="h-28 w-28 object-cover sm:h-32 sm:w-32"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#123a35] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                      Coach Detail
                    </span>
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {trainer.scheduleWindow}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        isSelected
                          ? 'bg-[#123a35] text-white'
                          : 'bg-[#edf6f3] text-[#123a35]'
                      }`}
                    >
                      {isSelected ? 'โค้ชที่เลือกอยู่ตอนนี้' : 'ยังไม่ได้เลือกเป็นโค้ชหลัก'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-start gap-3">
                    <h2 className="font-display text-4xl leading-none text-slate-900 sm:text-5xl">
                      {trainer.name}
                    </h2>
                    <span className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">
                      {formatCurrency(trainer.sessionRate)}
                    </span>
                  </div>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                    {trainer.summary}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center self-start rounded-2xl bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white"
                aria-label="ปิดหน้าต่างรายละเอียด"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_15rem]">
              <section className="rounded-[24px] border border-[#e8dbcc] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เครื่องที่ถนัด
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trainer.machineFocus.map((machine) => (
                    <span
                      key={machine}
                      className="rounded-full bg-[#e7f4ef] px-3 py-1.5 text-xs font-semibold text-[#123a35]"
                    >
                      {machine}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-[#e8dbcc] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  การออกกำลังกายที่ถนัด
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {trainer.exerciseFocus.map((focus) => (
                    <span
                      key={focus}
                      className="rounded-full bg-[#f4ede4] px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </section>

              <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-[20px] bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    ช่วงเวลาว่าง
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#0f4e45]">
                    {trainer.availableSlots}
                  </p>
                </div>
                <div className="rounded-[20px] bg-[#fff0ef] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a14a3b]/70">
                    มีคิวแล้ว
                  </p>
                  <p className="mt-2 text-2xl font-bold text-[#a14a3b]">
                    {trainer.bookedSlots}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onSelect}
                  className={`rounded-[20px] px-4 py-3 text-sm font-semibold transition ${
                    isSelected
                      ? 'bg-[#123a35] text-white'
                      : 'bg-slate-900 text-white hover:bg-[#123a35]'
                  }`}
                >
                  {isSelected ? 'กำลังใช้โค้ชคนนี้' : 'เลือกโค้ชคนนี้'}
                </button>
              </section>
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
                  Weekly Schedule
                </p>
                <h3 className="mt-2 font-display text-3xl text-slate-900">
                  ตารางเวลา 7 วันของ {trainer.name}
                </h3>
              </div>

              <p className="rounded-full bg-[#f8f4ee] px-3 py-1.5 text-xs font-semibold text-slate-600">
                ช่องละ 1 ชั่วโมง / วันละ 9 ช่อง
              </p>
            </div>

            <WeeklyScheduleTable trainer={trainer} />
          </div>
        </article>
      </div>
    </div>
  )
}

export default TrainerDetailModal
