function TrainerClientCard({ client }) {
  return (
    <article className="rounded-[26px] border border-[#eadbc8] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(61,45,24,0.24)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-3xl text-slate-900">{client.name}</p>
          <p className="mt-2 text-sm text-slate-500">{client.contact}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
            client.status === 'follow-up'
              ? 'bg-[#f5e8d8] text-[#9b5d32]'
              : 'bg-[#e7f4ef] text-[#123a35]'
          }`}
        >
          {client.status === 'follow-up' ? 'ติดตามผล' : 'กำลังเทรนอยู่'}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[20px] bg-[#fbf3e8] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            อุปกรณ์
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {client.equipmentName}
          </p>
        </div>
        <div className="rounded-[20px] bg-[#f3fbf8] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            แพ็ก
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {client.planName}
          </p>
        </div>
        <div className="rounded-[20px] bg-[#fff7ef] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            นัดครั้งถัดไป
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {client.nextSession}
          </p>
        </div>
      </div>
    </article>
  )
}

export default TrainerClientCard
