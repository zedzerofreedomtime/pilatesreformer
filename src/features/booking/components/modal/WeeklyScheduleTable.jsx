function WeeklyScheduleTable({ trainer }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <span className="rounded-full bg-[#e9f7f2] px-3 py-1.5 text-[#0f4e45]">
          ว่าง = สีเขียว
        </span>
        <span className="rounded-full bg-[#ffe4e6] px-3 py-1.5 text-[#b42318]">
          มีงานแล้ว = สีแดง
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {trainer.weeklySchedule.map((day) => (
          <article
            key={day.id}
            className="rounded-[28px] border border-[#eadbc8] bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ef_100%)] p-4 sm:p-5"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#efe3d5] pb-4">
              <div>
                <p className="font-display text-2xl text-slate-900">{day.shortLabel}</p>
                <p className="mt-1 text-sm text-slate-500">{day.label}</p>
              </div>

              <div className="grid gap-2 text-right text-xs font-semibold">
                <p className="rounded-full bg-[#e9f7f2] px-3 py-1.5 text-[#0f4e45]">
                  ว่าง {day.availableCount} ช่วง
                </p>
                <p className="rounded-full bg-[#ffe4e6] px-3 py-1.5 text-[#b42318]">
                  มีงานแล้ว {day.bookedCount} ช่วง
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
              {day.slots.map((slot) => (
                <div
                  key={slot.key}
                  className={`rounded-2xl px-3 py-2.5 text-sm ${
                    slot.status === 'available'
                      ? 'bg-[#e9f7f2] text-[#0f4e45]'
                      : 'bg-[#ffe4e6] text-[#b42318]'
                  }`}
                >
                  <p className="font-medium">{slot.label}</p>
                  <p className="mt-1 text-xs font-semibold">
                    {slot.status === 'available' ? 'ว่าง' : 'มีงานแล้ว'}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default WeeklyScheduleTable
