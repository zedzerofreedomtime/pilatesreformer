import TrainerClientCard from '../features/trainer/components/TrainerClientCard'

function TrainerPage({ authUser, trainer, trainerClients }) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="panel overflow-hidden p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div>
            <span className="eyebrow">Trainer Dashboard</span>
            <h1 className="mt-4 font-display text-4xl leading-[0.98] text-slate-900 sm:text-5xl">
              หน้าของ {trainer?.name ?? authUser?.name}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              หน้านี้เป็นพื้นที่เฉพาะของเทรนเนอร์แต่ละคน โดยเทรนเนอร์จะเห็นเฉพาะรายชื่อลูกค้าที่ตัวเองดูแลอยู่เท่านั้น
            </p>
          </div>

          <div className="rounded-[28px] border border-[#eadbc8] bg-[#fbf3e8] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
              Trainer Session
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  เทรนเนอร์ที่ login อยู่
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {trainer?.name ?? authUser?.name}
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  ลูกค้าที่ดูแลอยู่
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {trainerClients.length} คน
                </p>
              </div>
              <div className="rounded-[22px] bg-white/70 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  ความถนัดหลัก
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {trainer?.specialty ?? '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-6 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">Assigned Clients</span>
            <h2 className="mt-4 font-display text-4xl text-slate-900">
              รายชื่อลูกค้าที่เทรนเนอร์คนนี้ดูแล
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              ระบบจะกรองเฉพาะลูกค้าที่อยู่ภายใต้เทรนเนอร์ที่ login เข้ามา ทำให้แต่ละคนเห็นข้อมูลของตัวเองชัดเจน
            </p>
          </div>
        </div>

        {trainerClients.length > 0 ? (
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {trainerClients.map((client) => (
              <TrainerClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[28px] border border-dashed border-[#d8c8b4] bg-[#fffaf3] px-5 py-6 text-sm leading-6 text-slate-600">
            ยังไม่มีรายชื่อลูกค้าที่ผูกกับเทรนเนอร์คนนี้ในระบบ
          </div>
        )}
      </section>
    </main>
  )
}

export default TrainerPage
