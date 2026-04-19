function AppHeader({
  activePage,
  authUser,
  onNavigateAdmin,
  onNavigateAdminHomeContent,
  onNavigateHome,
  onNavigateBooking,
  onNavigateTrainer,
  onStartBooking,
  onOpenLogin,
  onLogout,
}) {
  const isAdmin = authUser?.roleId === 'admin'
  const isTrainer = authUser?.roleId === 'trainer'
  const isAdminArea = activePage === 'admin' || activePage === 'admin-home-content'

  return (
    <header className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
      <div className="panel px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-xl">
            <p className="font-display text-2xl font-semibold tracking-[0.06em] text-[#123a35]">
              Reform Rental
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              เช่าเครื่องออกกำลังกายถึงบ้าน พร้อมเทรนเนอร์ที่เลือกเองได้
            </p>
          </div>

          <div className="flex flex-col gap-3 xl:items-end">
            <nav className="flex flex-wrap items-center justify-start gap-2 xl:justify-end">
              {!isAdmin && !isTrainer && (
                <>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      activePage === 'home'
                        ? 'bg-[#123a35] text-white'
                        : 'bg-white text-slate-700 hover:bg-[#f3e7d6]'
                    }`}
                  >
                    หน้าแรก
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateBooking}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      activePage === 'booking'
                        ? 'bg-[#123a35] text-white'
                        : 'bg-white text-slate-700 hover:bg-[#f3e7d6]'
                    }`}
                  >
                    หน้าเลือกเช่า/จ้างเทรนเนอร์
                  </button>
                </>
              )}

              {isTrainer && (
                <button
                  type="button"
                  onClick={onNavigateTrainer}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    activePage === 'trainer'
                      ? 'bg-[#123a35] text-white'
                      : 'bg-white text-slate-700 hover:bg-[#f3e7d6]'
                  }`}
                >
                  หน้าของเทรนเนอร์
                </button>
              )}

              {isAdmin && (
                <>
                  <button
                    type="button"
                    onClick={onNavigateAdmin}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      activePage === 'admin'
                        ? 'bg-[#123a35] text-white'
                        : 'bg-white text-slate-700 hover:bg-[#f3e7d6]'
                    }`}
                  >
                    หน้า admin
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateAdminHomeContent}
                    className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      activePage === 'admin-home-content'
                        ? 'bg-[#123a35] text-white'
                        : 'bg-white text-slate-700 hover:bg-[#f3e7d6]'
                    }`}
                  >
                    จัดการรายละเอียด
                  </button>
                </>
              )}

              {!isAdmin && !isTrainer && (
                <button
                  type="button"
                  onClick={onStartBooking}
                  className="rounded-full bg-[#9b5d32] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#834a23]"
                >
                  เริ่มจอง
                </button>
              )}

              {authUser ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                    isAdminArea
                      ? 'border-[#123a35]/15 bg-[#e7f4ef] text-[#123a35] hover:bg-[#d9eee7]'
                      : 'border-[#123a35]/15 bg-[#e7f4ef] text-[#123a35] hover:bg-[#d9eee7]'
                  }`}
                >
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-[#123a35] hover:text-[#123a35]"
                >
                  Login
                </button>
              )}
            </nav>

            {authUser && (
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-full bg-[#123a35] px-3 py-1.5 font-semibold text-white">
                  {authUser.roleLabel}
                </span>
                <span className="rounded-full bg-[#f7efe4] px-3 py-1.5 text-slate-700">
                  {authUser.name}
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-slate-500">
                  {authUser.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
