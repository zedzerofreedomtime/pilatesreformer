function HomeHeroSection({
  bookingModes,
  homeStats,
  onGoToBooking,
  onOpenBookingPage,
}) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div>
        <span className="eyebrow">Page 1 / Overview</span>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl">
          เว็บไซต์เช่าเครื่องออกกำลังกาย
          <span className="block text-[#9b5d32]">
            ที่ให้ลูกค้าเลือกเช่าและเลือกโค้ชได้ในที่เดียว
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          หน้าแรกของเว็บทำหน้าที่อธิบายภาพรวมธุรกิจให้ชัดว่าเรารับเช่าเครื่องออกกำลังกายถึงบ้าน
          มี <span className="font-semibold text-slate-900">Pilates Reformer</span>{' '}
          เป็นตัวเลือกยอดนิยมที่ลูกค้าสามารถเริ่มฝึกเองที่บ้านได้ ส่วนเครื่องเฉพาะทางอื่นจะมีเงื่อนไขให้ต้องจ้างเทรนเนอร์ประกบทุกครั้งเพื่อความปลอดภัย
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
  )
}

export default HomeHeroSection
