import HomeContentManagementPanel from '../features/admin/components/HomeContentManagementPanel'

function AdminHomeContentPage({
  equipmentCatalog,
  homePageContent,
  onGoToAdmin,
  onPreviewHome,
  onSaveHomePageContent,
}) {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="panel overflow-hidden p-6 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-3xl">
            <span className="eyebrow">Admin / Home Content</span>
            <h1 className="mt-4 font-display text-4xl leading-[0.98] text-slate-900 sm:text-5xl">
              จัดการรายละเอียดหน้าแรกของเว็บไซต์
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              หน้านี้ใช้สำหรับแก้ข้อความและโครงคอนเทนต์ของหน้าแรกโดยเฉพาะ
              เพื่อให้แอดมินจัดการรายละเอียดของเว็บไซต์ได้อย่างอิสระในจุดเดียว
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onPreviewHome}
              className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
            >
              ดูหน้าแรก
            </button>
            <button
              type="button"
              onClick={onGoToAdmin}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#123a35] hover:text-[#123a35]"
            >
              กลับไปหน้า admin
            </button>
          </div>
        </div>
      </section>

      <HomeContentManagementPanel
        equipmentCatalog={equipmentCatalog}
        homePageContent={homePageContent}
        onSaveHomePageContent={onSaveHomePageContent}
      />
    </main>
  )
}

export default AdminHomeContentPage
