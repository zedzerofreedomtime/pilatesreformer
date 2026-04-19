function AppHeader({
  activePage,
  onNavigateHome,
  onNavigateBooking,
  onStartBooking,
}) {
  return (
    <header className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="panel flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <div>
          <p className="font-display text-xl font-semibold tracking-[0.08em] text-[#123a35]">
            Reform Rental
          </p>
          <p className="text-sm text-slate-600">
            เช่าเครื่องออกกำลังกายถึงบ้าน พร้อมเทรนเนอร์ที่เลือกเองได้
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activePage === 'home'
                ? 'bg-[#123a35] text-white'
                : 'text-slate-700 hover:bg-[#f3e7d6]'
            }`}
          >
            หน้าแรก
          </button>
          <button
            type="button"
            onClick={onNavigateBooking}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activePage === 'booking'
                ? 'bg-[#123a35] text-white'
                : 'text-slate-700 hover:bg-[#f3e7d6]'
            }`}
          >
            หน้าที่ 2 เลือกเช่า
          </button>
          <button
            type="button"
            onClick={onStartBooking}
            className="rounded-full bg-[#9b5d32] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#834a23]"
          >
            เริ่มจอง
          </button>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
