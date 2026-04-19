import { useState } from 'react'

const cloneData = (value) => JSON.parse(JSON.stringify(value))

function TextInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
      />
    </label>
  )
}

function TextArea({ label, value, rows = 4, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
      />
    </label>
  )
}

function CardTitle({ children }) {
  return <h3 className="font-display text-3xl text-slate-900">{children}</h3>
}

function HomeContentManagementPanel({
  equipmentCatalog,
  homePageContent,
  onSaveHomePageContent,
}) {
  const [formState, setFormState] = useState(() => cloneData(homePageContent))
  const [saveMessage, setSaveMessage] = useState('')

  const updateSectionField = (section, field) => (event) => {
    setFormState((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: event.target.value,
      },
    }))
  }

  const updateNestedArrayItem = (section, index, field) => (event) => {
    setFormState((current) => ({
      ...current,
      [section]: current[section].map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: event.target.value,
            }
          : item,
      ),
    }))
  }

  const updateTopRentalItem = (index, field) => (event) => {
    setFormState((current) => ({
      ...current,
      topRentals: {
        ...current.topRentals,
        items: current.topRentals.items.map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: event.target.value,
              }
            : item,
        ),
      },
    }))
  }

  const updateProcessStep = (index, field) => (event) => {
    setFormState((current) => ({
      ...current,
      process: {
        ...current.process,
        steps: current.process.steps.map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: event.target.value,
              }
            : item,
        ),
      },
    }))
  }

  const updateStat = (index, field) => (event) => {
    setFormState((current) => ({
      ...current,
      stats: current.stats.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: event.target.value,
            }
          : item,
      ),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSaveHomePageContent(formState)
    setSaveMessage('บันทึกรายละเอียดหน้าแรกเรียบร้อยแล้ว')
  }

  const handleReset = () => {
    setFormState(cloneData(homePageContent))
    setSaveMessage('')
  }

  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Admin / Home Page</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            จัดการรายละเอียดหน้าแรกของเว็บไซต์
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            แอดมินสามารถแก้ข้อความหลักของหน้าแรกได้จากตรงนี้ ทั้ง hero, การ์ดบริการ,
            top rentals, highlight, ขั้นตอนการใช้งาน และ CTA ด้านล่าง
          </p>
        </div>
        <div className="rounded-full bg-[#f7efe4] px-4 py-2 text-sm font-semibold text-slate-700">
          แก้หน้าแรกได้ครบทุก section
        </div>
      </div>

      {saveMessage && (
        <div className="mt-6 rounded-[22px] bg-[#eef8f3] px-4 py-3 text-sm font-semibold text-[#0f5132]">
          {saveMessage}
        </div>
      )}

      <form className="mt-6 space-y-8" onSubmit={handleSubmit}>
        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>Hero Section</CardTitle>
          <div className="mt-5 grid gap-4">
            <TextInput
              label="ป้ายเล็กด้านบน"
              value={formState.hero.eyebrow}
              onChange={updateSectionField('hero', 'eyebrow')}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="หัวข้อบรรทัดที่ 1"
                value={formState.hero.titleLine1}
                onChange={updateSectionField('hero', 'titleLine1')}
              />
              <TextInput
                label="หัวข้อบรรทัดที่ 2"
                value={formState.hero.titleLine2}
                onChange={updateSectionField('hero', 'titleLine2')}
              />
            </div>
            <TextArea
              label="คำอธิบายหลัก"
              value={formState.hero.description}
              rows={5}
              onChange={updateSectionField('hero', 'description')}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextInput
                label="ข้อความปุ่มหลัก"
                value={formState.hero.primaryButtonLabel}
                onChange={updateSectionField('hero', 'primaryButtonLabel')}
              />
              <TextInput
                label="ข้อความปุ่มรอง"
                value={formState.hero.secondaryButtonLabel}
                onChange={updateSectionField('hero', 'secondaryButtonLabel')}
              />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>Hero Aside</CardTitle>
          <div className="mt-5 grid gap-4">
            <TextInput
              label="ป้ายด้านขวา"
              value={formState.heroAside.badge}
              onChange={updateSectionField('heroAside', 'badge')}
            />
            <TextInput
              label="หัวข้อด้านขวา"
              value={formState.heroAside.title}
              onChange={updateSectionField('heroAside', 'title')}
            />
            <TextArea
              label="คำอธิบายด้านขวา"
              value={formState.heroAside.description}
              rows={5}
              onChange={updateSectionField('heroAside', 'description')}
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>ข้อมูลสถิติ</CardTitle>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {formState.stats.map((item, index) => (
              <div key={`${item.label}-${index}`} className="rounded-[24px] bg-[#fffaf3] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
                  Stat {index + 1}
                </p>
                <div className="mt-3 grid gap-3">
                  {index === 2 && (
                    <TextInput
                      label="ค่าที่แสดง"
                      value={item.value}
                      onChange={updateStat(index, 'value')}
                    />
                  )}
                  <TextInput
                    label="หัวข้อ"
                    value={item.label}
                    onChange={updateStat(index, 'label')}
                  />
                  <TextArea
                    label="คำอธิบาย"
                    value={item.description}
                    rows={4}
                    onChange={updateStat(index, 'description')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>การ์ดรูปแบบบริการ</CardTitle>
          <div className="mt-5 grid gap-4">
            {formState.bookingModes.map((item, index) => (
              <div key={item.id} className="rounded-[24px] bg-[#fffaf3] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
                  Booking Mode {index + 1}
                </p>
                <div className="mt-3 grid gap-3">
                  <TextInput
                    label="หัวข้อ"
                    value={item.title}
                    onChange={updateNestedArrayItem('bookingModes', index, 'title')}
                  />
                  <TextInput
                    label="ข้อความรอง"
                    value={item.subtitle}
                    onChange={updateNestedArrayItem('bookingModes', index, 'subtitle')}
                  />
                  <TextArea
                    label="คำอธิบาย"
                    value={item.description}
                    rows={4}
                    onChange={updateNestedArrayItem('bookingModes', index, 'description')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>Top Rentals</CardTitle>
          <div className="mt-5 grid gap-4">
            <TextInput
              label="ป้ายหัวข้อ"
              value={formState.topRentals.eyebrow}
              onChange={updateSectionField('topRentals', 'eyebrow')}
            />
            <TextInput
              label="หัวข้อหลัก"
              value={formState.topRentals.title}
              onChange={updateSectionField('topRentals', 'title')}
            />
            <TextArea
              label="คำอธิบาย"
              value={formState.topRentals.description}
              rows={4}
              onChange={updateSectionField('topRentals', 'description')}
            />

            <div className="grid gap-4">
              {formState.topRentals.items.map((item, index) => (
                <div key={`${item.rank}-${index}`} className="rounded-[24px] bg-[#fffaf3] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
                    Rental Card {index + 1}
                  </p>
                  <div className="mt-3 grid gap-3">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700">อุปกรณ์ที่ผูก</span>
                      <select
                        value={item.equipmentId}
                        onChange={updateTopRentalItem(index, 'equipmentId')}
                        className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
                      >
                        {equipmentCatalog.map((equipment) => (
                          <option key={equipment.id} value={equipment.id}>
                            {equipment.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <TextInput
                        label="ลำดับ"
                        value={item.rank}
                        onChange={updateTopRentalItem(index, 'rank')}
                      />
                      <TextInput
                        label="ข้อความ highlight"
                        value={item.highlight}
                        onChange={updateTopRentalItem(index, 'highlight')}
                      />
                    </div>
                    <TextArea
                      label="คำอธิบายการ์ด"
                      value={item.summary}
                      rows={4}
                      onChange={updateTopRentalItem(index, 'summary')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>Highlights</CardTitle>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {formState.highlights.map((item, index) => (
              <div key={index} className="rounded-[24px] bg-[#fffaf3] p-4">
                <TextInput
                  label="หัวข้อ"
                  value={item.title}
                  onChange={updateNestedArrayItem('highlights', index, 'title')}
                />
                <div className="mt-3">
                  <TextArea
                    label="คำอธิบาย"
                    value={item.description}
                    rows={5}
                    onChange={updateNestedArrayItem('highlights', index, 'description')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>ขั้นตอนการใช้งาน</CardTitle>
          <div className="mt-5 grid gap-4">
            <TextInput
              label="ป้ายหัวข้อ"
              value={formState.process.eyebrow}
              onChange={updateSectionField('process', 'eyebrow')}
            />
            <TextInput
              label="หัวข้อหลัก"
              value={formState.process.title}
              onChange={updateSectionField('process', 'title')}
            />

            {formState.process.steps.map((item, index) => (
              <div key={`${item.step}-${index}`} className="rounded-[24px] bg-[#fffaf3] p-4">
                <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)]">
                  <TextInput
                    label="Step"
                    value={item.step}
                    onChange={updateProcessStep(index, 'step')}
                  />
                  <TextInput
                    label="หัวข้อ"
                    value={item.title}
                    onChange={updateProcessStep(index, 'title')}
                  />
                </div>
                <div className="mt-3">
                  <TextArea
                    label="คำอธิบาย"
                    value={item.description}
                    rows={4}
                    onChange={updateProcessStep(index, 'description')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
          <CardTitle>CTA Section</CardTitle>
          <div className="mt-5 grid gap-4">
            <TextInput
              label="ป้ายเล็ก"
              value={formState.cta.badge}
              onChange={updateSectionField('cta', 'badge')}
            />
            <TextInput
              label="หัวข้อหลัก"
              value={formState.cta.title}
              onChange={updateSectionField('cta', 'title')}
            />
            <TextArea
              label="คำอธิบาย"
              value={formState.cta.description}
              rows={4}
              onChange={updateSectionField('cta', 'description')}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-[#fffaf3] p-4">
                <TextInput
                  label="Label ปุ่มซ้าย"
                  value={formState.cta.bundleLabel}
                  onChange={updateSectionField('cta', 'bundleLabel')}
                />
                <div className="mt-3 grid gap-3">
                  <TextInput
                    label="หัวข้อปุ่มซ้าย"
                    value={formState.cta.bundleTitle}
                    onChange={updateSectionField('cta', 'bundleTitle')}
                  />
                  <TextArea
                    label="คำอธิบายปุ่มซ้าย"
                    value={formState.cta.bundleDescription}
                    rows={4}
                    onChange={updateSectionField('cta', 'bundleDescription')}
                  />
                </div>
              </div>

              <div className="rounded-[24px] bg-[#fffaf3] p-4">
                <TextInput
                  label="Label ปุ่มขวา"
                  value={formState.cta.trainerLabel}
                  onChange={updateSectionField('cta', 'trainerLabel')}
                />
                <div className="mt-3 grid gap-3">
                  <TextInput
                    label="หัวข้อปุ่มขวา"
                    value={formState.cta.trainerTitle}
                    onChange={updateSectionField('cta', 'trainerTitle')}
                  />
                  <TextArea
                    label="คำอธิบายปุ่มขวา"
                    value={formState.cta.trainerDescription}
                    rows={4}
                    onChange={updateSectionField('cta', 'trainerDescription')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 z-10 flex flex-wrap gap-3 rounded-[24px] border border-[#eadbc8] bg-white/92 p-4 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur">
          <button
            type="submit"
            className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
          >
            บันทึกรายละเอียดหน้าแรก
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
          >
            รีเซ็ตค่าที่กำลังแก้
          </button>
        </div>
      </form>
    </section>
  )
}

export default HomeContentManagementPanel
