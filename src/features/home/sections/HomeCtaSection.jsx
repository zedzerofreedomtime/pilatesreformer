function HomeCtaSection({ onOpenBookingPage }) {
  return (
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
              จากหน้าแรกนี้ ลูกค้าจะเข้าใจว่ามีเทรนเนอร์กี่คน มีอุปกรณ์ยอดนิยมอะไรบ้าง และรู้ต่อทันทีว่าหน้า 2
              คือพื้นที่สำหรับเลือกบริการแบบจริงจัง
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
  )
}

export default HomeCtaSection
