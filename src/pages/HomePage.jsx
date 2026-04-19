import TopRentalCard from '../components/TopRentalCard'
import {
  bookingModes,
  homeStats,
  processSteps,
  serviceHighlights,
  topRentedCards,
} from '../data/siteData'

function HomePage({ onGoToBooking, onOpenBookingPage }) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <span className="eyebrow">Page 1 / Overview</span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl">
            เว็บเช่าเครื่องออกกำลังกาย
            <span className="block text-[#9b5d32]">
              ที่ให้ลูกค้าเลือกเช่าและเลือกโค้ชได้ในที่เดียว
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            หน้าแรกของเว็บทำหน้าที่อธิบายภาพรวมธุรกิจให้ชัดว่าเรารับเช่าเครื่องออกกำลังกายถึงบ้าน
            มี
            <span className="font-semibold text-slate-900">
              {' '}
              Pilates Reformer{' '}
            </span>
            เป็นตัวเลือกยอดนิยมที่ลูกค้าสามารถเริ่มฝึกเองที่บ้านได้ ส่วนเครื่องเฉพาะทางอื่นจะมีเงื่อนไข
            ให้ต้องจ้างเทรนเนอร์ประกบทุกครั้งเพื่อความปลอดภัย
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onGoToBooking}
              className="rounded-full bg-[#123a35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
            >
              ไปหน้าที่ 2 เลือกเช่า
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenBookingPage({
                  modeId: 'equipment-only',
                  equipmentId: 'reformer',
                })
              }
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
            >
              เช่า Reformer อย่างเดียว
            </button>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {homeStats.map((item) => (
              <article key={item.label} className="panel p-5">
                <p className="font-display text-3xl text-[#123a35]">{item.value}</p>
                <h2 className="mt-3 text-base font-semibold text-slate-900">
                  {item.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="accent-panel soft-grid relative overflow-hidden p-6 sm:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            Website Direction
          </span>
          <h2 className="mt-5 max-w-lg font-display text-4xl leading-tight text-white sm:text-5xl">
            หน้าแรกบอกภาพรวม ส่วนหน้า 2 ใช้สำหรับเลือกเช่าและสรุปแพ็ก
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
            โครงนี้ทำให้ผู้ใช้เข้าใจธุรกิจได้เร็วขึ้น เพราะหน้าแรกเน้นการขายและสร้างความเชื่อมั่น
            ส่วนหน้าที่ 2 จะเป็นพื้นที่สำหรับให้ลูกค้าเลือกบริการตามรูปแบบที่ต้องการจริง
          </p>

          <div className="mt-8 grid gap-4">
            {bookingModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onOpenBookingPage({ modeId: mode.id })}
                className="rounded-[28px] border border-white/12 bg-white/8 p-5 text-left transition hover:bg-white/12"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-[#f4c38f]">
                  {mode.subtitle}
                </p>
                <p className="mt-2 font-display text-3xl text-white">
                  {mode.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  {mode.description}
                </p>
              </button>
            ))}
          </div>
        </aside>
      </section>

      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">Top 3 Rentals</span>
            <h2 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
              3 อุปกรณ์ที่มีการเช่ามากที่สุด
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            ใช้ส่วนนี้บนหน้าแรกเพื่อบอกลูกค้าว่าอะไรคือสินค้ายอดนิยม และกดเข้าไปที่หน้า 2
            ได้ทันทีพร้อม preselect ตัวเลือกที่เกี่ยวข้อง
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {topRentedCards.map((card) => (
            <TopRentalCard
              key={card.equipment.id}
              card={card}
              onSelect={() =>
                onOpenBookingPage({
                  modeId:
                    card.equipment.trainerMode === 'optional'
                      ? 'equipment-only'
                      : 'bundle',
                  equipmentId: card.equipment.id,
                })
              }
            />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {serviceHighlights.map((item) => (
          <article key={item.title} className="panel p-6">
            <h2 className="font-display text-3xl text-slate-900">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl">
          <span className="eyebrow">User Flow</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900 sm:text-5xl">
            โครงหน้าเว็บหลังจากแยกเป็น 2 หน้า
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {processSteps.map((item) => (
            <article key={item.step} className="panel p-6">
              <p className="font-display text-5xl text-[#d6a273]">{item.step}</p>
              <h3 className="mt-5 font-display text-3xl text-slate-900">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="overflow-hidden rounded-[40px] bg-[#111b2c] px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c38f]">
                Ready to move
              </span>
              <h2 className="mt-4 max-w-3xl font-display text-4xl text-white sm:text-5xl">
                หน้าต่อไปคือหน้าเลือกเช่าที่ลูกค้าจะลงรายละเอียดและคำนวณแพ็กได้ทันที
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                จากหน้าแรกนี้ ลูกค้าจะเข้าใจว่ามีเทรนเนอร์กี่คน มีอุปกรณ์ยอดนิยมอะไรบ้าง
                และรู้ต่อทันทีว่าหน้า 2 คือพื้นที่สำหรับเลือกบริการแบบจริงจัง
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onOpenBookingPage({ modeId: 'bundle' })}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/8"
              >
                <p className="text-sm text-white/60">เริ่มแบบครบแพ็ก</p>
                <p className="mt-2 font-display text-3xl text-white">
                  เครื่อง + เทรนเนอร์
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  เหมาะกับลูกค้าที่อยากให้เว็บไซต์ช่วยจัด flow ให้ครบ
                </p>
              </button>
              <button
                type="button"
                onClick={() => onOpenBookingPage({ modeId: 'trainer-only' })}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/8"
              >
                <p className="text-sm text-white/60">เริ่มแบบยืดหยุ่น</p>
                <p className="mt-2 font-display text-3xl text-white">
                  จ้างเทรนเนอร์อย่างเดียว
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  เหมาะกับคนที่มีอุปกรณ์อยู่แล้วและต้องการแค่โค้ช
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
