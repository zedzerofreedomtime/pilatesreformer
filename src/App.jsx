import { useState } from 'react'

const equipmentOptions = [
  {
    id: 'reformer',
    name: 'Pilates Reformer',
    shortLabel: 'Reformer',
    monthlyRate: 12900,
    trainerRequired: false,
    headline: 'เครื่องยอดนิยมที่ออกแบบมาให้ฝึกที่บ้านได้จริง',
    suitability: 'เหมาะกับผู้เริ่มต้น, คนทำงานออฟฟิศ, และคนที่อยากมี studio corner ในบ้าน',
    badge: 'เล่นเองได้ที่บ้าน',
    features: [
      'ปรับแรงต้านได้หลายระดับ เหมาะกับทั้ง day-one และคนที่มีพื้นฐาน',
      'ช่วยเรื่อง core, posture, flexibility และการฟื้นคืนการเคลื่อนไหว',
      'สามารถเลือกเทรนเนอร์เพื่อปูพื้นฐานก่อนเริ่มฝึกเองได้',
    ],
  },
  {
    id: 'cadillac',
    name: 'Cadillac / Tower',
    shortLabel: 'Cadillac',
    monthlyRate: 18500,
    trainerRequired: true,
    headline: 'สำหรับงานยืดลึก รีแฮบ และ alignment ที่ต้องมีผู้ควบคุมใกล้ชิด',
    suitability: 'เหมาะกับ private session, rehab movement และลูกค้าที่ต้องการโปรแกรมเฉพาะตัว',
    badge: 'ต้องมีครูประกบ',
    features: [
      'ใช้สปริงและตำแหน่งแรงต้านได้หลากหลาย จึงต้องมีครูดูแลทุกครั้ง',
      'เหมาะกับการแก้แพตเทิร์นการเคลื่อนไหวและงานฟื้นฟูเฉพาะจุด',
      'ทีมติดตั้งจะเซ็ตระยะและความปลอดภัยให้พร้อมก่อนเริ่มใช้งาน',
    ],
  },
  {
    id: 'chair',
    name: 'Stability Chair',
    shortLabel: 'Chair',
    monthlyRate: 14900,
    trainerRequired: true,
    headline: 'พื้นที่น้อยก็ฝึกได้ แต่ต้องมีเทรนเนอร์คอยคุมฟอร์มอย่างใกล้ชิด',
    suitability: 'เหมาะกับงานขา สะโพก balance และผู้ที่ต้องการฝึกแบบเข้มข้นในพื้นที่จำกัด',
    badge: 'ต้องมีครูประกบ',
    features: [
      'เหมาะกับการสร้างกำลังและควบคุม balance ด้วยท่าที่ค่อนข้าง technical',
      'เทรนเนอร์ช่วยไล่จังหวะหายใจและจัดแนวเข่า-ข้อเท้าให้ปลอดภัย',
      'เหมาะกับลูกค้าที่อยากได้เซสชันสั้น แต่เน้นผลลัพธ์เฉพาะจุด',
    ],
  },
  {
    id: 'functional',
    name: 'Functional Trainer Station',
    shortLabel: 'Functional',
    monthlyRate: 16900,
    trainerRequired: true,
    headline: 'เครื่อง cable training สำหรับ strength + mobility ที่ต้องมีโค้ชออกแบบโปรแกรม',
    suitability: 'เหมาะกับ home private training และคนที่อยากฝึกแบบ athlete-inspired',
    badge: 'ต้องมีโค้ชดูแล',
    features: [
      'เทรนเนอร์จะเป็นคนเซ็ตโหลด มุมดึง และความเข้มข้นตามเป้าหมายแต่ละคน',
      'เหมาะกับการลดน้ำหนัก เสริมกล้ามเนื้อ และพัฒนาการเคลื่อนไหวแบบ functional',
      'สามารถจอง onsite coach หรือ video-guided trainer package ได้',
    ],
  },
]

const trainerOptions = [
  {
    id: 'coach-pim',
    name: 'Coach Pim',
    specialty: 'Reformer foundation และ posture reset',
    sessionRate: 1800,
    summary: 'เหมาะกับผู้เริ่มต้นที่อยากฝึกให้ถูกก่อนกลับไปเล่นเองที่บ้าน',
    availability: 'Onsite กรุงเทพฯ / Online cueing',
  },
  {
    id: 'coach-tone',
    name: 'Coach Tone',
    specialty: 'Strength, mobility และ functional movement',
    sessionRate: 2200,
    summary: 'เหมาะกับเครื่องที่ต้องคุมฟอร์มละเอียดและคนที่มีเป้าหมายเรื่อง performance',
    availability: 'Onsite กรุงเทพฯ / ปริมณฑล',
  },
  {
    id: 'coach-fon',
    name: 'Coach Fon',
    specialty: 'Private rehab flow และ breath-led pilates',
    sessionRate: 2400,
    summary: 'เหมาะกับคนที่ต้องการ session นุ่มแต่ลึก โดยมีครูคอยดู alignment ทุกช่วง',
    availability: 'Onsite เฉพาะวันเสาร์-อาทิตย์ / Hybrid follow-up',
  },
]

const durationOptions = [
  {
    id: 'starter',
    name: 'Starter 1 เดือน',
    months: 1,
    discount: 1,
    includedSessions: 2,
    note: 'ลองเช่าเพื่อดูว่าพื้นที่และ routine เข้ากับชีวิตประจำวันไหม',
  },
  {
    id: 'progress',
    name: 'Progress 3 เดือน',
    months: 3,
    discount: 0.93,
    includedSessions: 6,
    note: 'เหมาะกับการวางเป้าหมายจริงจังและเริ่มเห็นพัฒนาการชัด',
  },
  {
    id: 'signature',
    name: 'Signature 6 เดือน',
    months: 6,
    discount: 0.88,
    includedSessions: 12,
    note: 'คุ้มที่สุดสำหรับคนที่อยากเปลี่ยนบ้านให้เป็น mini studio ระยะยาว',
  },
]

const perks = [
  {
    title: 'จัดส่ง + ติดตั้งถึงบ้าน',
    description: 'ทีมงานวัดพื้นที่, ประกอบ, และสอนการดูแลเบื้องต้นก่อนเริ่มใช้งาน',
  },
  {
    title: 'แมตช์เทรนเนอร์ตามเป้าหมาย',
    description: 'เลือกโค้ชได้เองตั้งแต่วันจอง ไม่ว่าจะเน้น posture, rehab หรือ strength',
  },
  {
    title: 'มีแผนฝึกให้ต่อเนื่อง',
    description: 'ทุกแพ็กเกจมี roadmap เริ่มต้น เพื่อให้ฝึกต่อได้โดยไม่หลุด routine',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'เลือกเครื่องให้เหมาะกับเป้าหมาย',
    description: 'ดูว่าต้องการฝึกเองที่บ้านแบบ daily use หรือเครื่องเฉพาะทางที่ต้องมีครูประกบ',
  },
  {
    step: '02',
    title: 'เลือกเทรนเนอร์และระยะเวลาเช่า',
    description: 'จับคู่โค้ชกับเครื่องที่เลือก พร้อมกำหนดรอบ session ที่เหมาะกับตารางชีวิต',
  },
  {
    step: '03',
    title: 'นัดส่ง ติดตั้ง และเริ่มโปรแกรม',
    description: 'เราเข้าไปติดตั้งถึงบ้าน พร้อมเริ่ม onboarding session ให้ฝึกได้อย่างมั่นใจ',
  },
]

const reasons = [
  'Pilates Reformer เป็นเครื่องที่นิยมสำหรับการฝึกที่บ้าน เพราะควบคุมแรงต้านและจังหวะการเคลื่อนไหวได้ง่ายกว่า',
  'เครื่องประเภท Cadillac, Chair และ Functional Station ต้องมีเทรนเนอร์กำกับทุกครั้ง เพื่อความปลอดภัยและการจัดฟอร์มที่ถูกต้อง',
  'ทุกการเช่ามีตัวเลือกแมตช์เทรนเนอร์ทันที ไม่ต้องหาโค้ชแยกหลายรอบ',
]

const formatCurrency = (value) =>
  new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(value)

function App() {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('reformer')
  const [selectedTrainerId, setSelectedTrainerId] = useState('coach-pim')
  const [selectedDurationId, setSelectedDurationId] = useState('progress')

  const selectedEquipment = equipmentOptions.find(
    (equipment) => equipment.id === selectedEquipmentId,
  )
  const selectedTrainer = trainerOptions.find(
    (trainer) => trainer.id === selectedTrainerId,
  )
  const selectedDuration = durationOptions.find(
    (duration) => duration.id === selectedDurationId,
  )

  const trainerSessions = selectedEquipment.trainerRequired
    ? selectedDuration.includedSessions
    : Math.max(1, Math.ceil(selectedDuration.includedSessions / 2))
  const rentalTotal = Math.round(
    selectedEquipment.monthlyRate *
      selectedDuration.months *
      selectedDuration.discount,
  )
  const trainerTotal = selectedTrainer.sessionRate * trainerSessions
  const grandTotal = rentalTotal + trainerTotal

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-64 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <header className="glass-card flex flex-col gap-5 rounded-[28px] px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-display text-xl font-semibold uppercase tracking-[0.2em] text-[#8d4f2d]">
              Reform Rental
            </p>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              เช่าเครื่องออกกำลังกายสำหรับบ้านและ private session พร้อมบริการ
              ติดตั้งและเลือกเทรนเนอร์ได้ในหน้าเดียว
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
            <a className="rounded-full px-4 py-2 transition hover:bg-white/70" href="#equipment">
              เครื่องให้เช่า
            </a>
            <a className="rounded-full px-4 py-2 transition hover:bg-white/70" href="#trainers">
              เลือกเทรนเนอร์
            </a>
            <a className="rounded-full bg-[#173d38] px-4 py-2 text-white shadow-lg shadow-[#173d38]/15 transition hover:bg-[#0f2b28]" href="#summary">
              สรุปแพ็กเกจ
            </a>
          </nav>
        </header>

        <main className="space-y-24 pb-10 pt-8">
          <section className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-[#1f5d50]/15 bg-white/75 px-4 py-2 text-sm font-medium text-[#1f5d50] shadow-sm">
                Pilates Reformer เล่นเองที่บ้านได้ ส่วนเครื่องอื่นมีเทรนเนอร์ประกบทุกครั้ง
              </div>

              <div className="space-y-5">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-[#8d4f2d]">
                  เช่าเครื่องออกกำลังกายแบบ premium home setup
                </p>
                <h1 className="max-w-4xl font-display text-5xl leading-[0.95] text-slate-900 sm:text-6xl lg:text-7xl">
                  ให้บ้านเป็นมุมฝึกที่จริงจังได้
                  <span className="block text-[#1f5d50]">พร้อมเครื่องและโค้ชที่ใช่</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  เลือกเช่าเครื่องที่เหมาะกับเป้าหมายของคุณได้ตั้งแต่
                  <span className="font-semibold text-slate-900"> Pilates Reformer </span>
                  สำหรับการฝึกเองที่บ้าน ไปจนถึงเครื่องเฉพาะทางที่ต้องมีครูประกบทุก session
                  พร้อมบริการจับคู่เทรนเนอร์ตั้งแต่วันแรก
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  className="rounded-full bg-[#173d38] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(23,61,56,0.8)] transition hover:-translate-y-0.5 hover:bg-[#0f2b28]"
                  href="#equipment"
                >
                  เริ่มเลือกเครื่อง
                </a>
                <a
                  className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#8d4f2d] hover:text-[#8d4f2d]"
                  href="#process"
                >
                  ดูขั้นตอนการเช่า
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {perks.map((perk) => (
                  <article
                    key={perk.title}
                    className="glass-card rounded-[24px] p-5"
                  >
                    <p className="font-display text-lg font-semibold text-slate-900">
                      {perk.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {perk.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="glass-card relative overflow-hidden rounded-[36px] p-6 sm:p-7">
              <div className="absolute inset-x-6 top-0 h-24 rounded-b-[32px] bg-[linear-gradient(180deg,rgba(246,194,128,0.45),transparent)]" />

              <div className="relative space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#8d4f2d]">
                      Featured
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-slate-900">
                      Pilates Reformer at home
                    </h2>
                  </div>
                  <div className="rounded-full bg-[#173d38] px-3 py-1 text-xs font-semibold text-white">
                    Bestseller
                  </div>
                </div>

                <div className="rounded-[28px] bg-[#173d38] p-5 text-white shadow-[0_24px_50px_-28px_rgba(23,61,56,0.85)]">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/75">
                    ทำไมลูกค้าถึงเริ่มจาก reformer
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-white/90">
                    {reasons.map((reason) => (
                      <li
                        key={reason}
                        className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3"
                      >
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-[#f4e0cd] p-5">
                    <p className="text-sm font-medium text-slate-500">
                      ค่าเช่าเริ่มต้น / เดือน
                    </p>
                    <p className="mt-2 font-display text-4xl text-slate-900">
                      {formatCurrency(12900)}
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-[#ece7de] p-5">
                    <p className="text-sm font-medium text-slate-500">
                      Trainer matching
                    </p>
                    <p className="mt-2 text-base leading-7 text-slate-800">
                      เลือกโค้ชที่เน้น posture, rehab หรือ strength ได้ทันที
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section id="equipment" className="space-y-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#8d4f2d]">
                  Select Equipment
                </p>
                <h2 className="mt-3 font-display text-4xl text-slate-900 sm:text-5xl">
                  เลือกเครื่องให้ตรงกับวิธีฝึกของคุณ
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                ถ้าต้องการฝึกเองได้ทุกวันในบ้าน `Pilates Reformer` คือคำตอบที่ตรงที่สุด
                ส่วนเครื่องเฉพาะทางอื่น ๆ เราแสดงสถานะชัดเจนว่าต้องมีครูประกบเพื่อความปลอดภัย
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {equipmentOptions.map((equipment) => {
                const isSelected = equipment.id === selectedEquipmentId

                return (
                  <button
                    key={equipment.id}
                    type="button"
                    onClick={() => setSelectedEquipmentId(equipment.id)}
                    className={`text-left transition ${
                      isSelected ? 'scale-[1.01]' : 'hover:-translate-y-1'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <article
                      className={`h-full rounded-[30px] border p-6 shadow-[0_18px_50px_-30px_rgba(42,32,16,0.35)] ${
                        isSelected
                          ? 'border-[#173d38] bg-[#173d38] text-white'
                          : 'border-white/70 bg-white/78 text-slate-900'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p
                            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                              isSelected ? 'text-[#f5c287]' : 'text-[#8d4f2d]'
                            }`}
                          >
                            {equipment.shortLabel}
                          </p>
                          <h3 className="mt-2 font-display text-3xl">
                            {equipment.name}
                          </h3>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            equipment.trainerRequired
                              ? isSelected
                                ? 'bg-white/12 text-white'
                                : 'bg-slate-900 text-white'
                              : isSelected
                                ? 'bg-[#f5c287] text-slate-900'
                                : 'bg-[#ebf4f1] text-[#173d38]'
                          }`}
                        >
                          {equipment.badge}
                        </span>
                      </div>

                      <p
                        className={`mt-5 text-base leading-7 ${
                          isSelected ? 'text-white/90' : 'text-slate-600'
                        }`}
                      >
                        {equipment.headline}
                      </p>

                      <div
                        className={`mt-5 rounded-[24px] p-4 ${
                          isSelected ? 'bg-white/8' : 'bg-[#f5ede3]'
                        }`}
                      >
                        <p
                          className={`text-sm ${
                            isSelected ? 'text-white/70' : 'text-slate-500'
                          }`}
                        >
                          เหมาะกับใคร
                        </p>
                        <p className="mt-2 text-sm leading-6">
                          {equipment.suitability}
                        </p>
                      </div>

                      <div className="mt-5 flex items-end justify-between gap-4">
                        <div>
                          <p
                            className={`text-sm ${
                              isSelected ? 'text-white/70' : 'text-slate-500'
                            }`}
                          >
                            ค่าเช่าเริ่มต้น / เดือน
                          </p>
                          <p className="mt-2 font-display text-4xl">
                            {formatCurrency(equipment.monthlyRate)}
                          </p>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? 'text-white/80' : 'text-slate-500'
                          }`}
                        >
                          {equipment.trainerRequired
                            ? 'รวม onboarding ตามแพ็กเกจ'
                            : 'เลือกครูเสริมได้'}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {equipment.features.map((feature) => (
                          <li
                            key={feature}
                            className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                              isSelected
                                ? 'border-white/10 bg-white/6 text-white/90'
                                : 'border-slate-200 bg-white/70 text-slate-700'
                            }`}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </button>
                )
              })}
            </div>
          </section>

          <section
            id="trainers"
            className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
          >
            <div className="space-y-8">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#8d4f2d]">
                  Choose Trainer & Plan
                </p>
                <h2 className="mt-3 font-display text-4xl text-slate-900 sm:text-5xl">
                  เลือกเทรนเนอร์และระยะเวลาเช่าได้ทันที
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  เมื่อเลือกเครื่องแล้ว คุณสามารถจับคู่กับเทรนเนอร์ที่เหมาะกับเป้าหมายได้เลย
                  โดยเครื่องอื่นนอกจาก reformer จะถูกล็อกให้มี session กับครูประกบทุกครั้งตามแพ็กเกจ
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {durationOptions.map((duration) => {
                  const isSelected = duration.id === selectedDurationId

                  return (
                    <button
                      key={duration.id}
                      type="button"
                      onClick={() => setSelectedDurationId(duration.id)}
                      className={`rounded-[28px] border p-5 text-left transition ${
                        isSelected
                          ? 'border-[#8d4f2d] bg-[#8d4f2d] text-white shadow-[0_18px_40px_-24px_rgba(141,79,45,0.8)]'
                          : 'border-white/70 bg-white/78 hover:-translate-y-1'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <p
                        className={`font-display text-2xl ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {duration.name}
                      </p>
                      <p
                        className={`mt-3 text-sm leading-6 ${
                          isSelected ? 'text-white/85' : 'text-slate-600'
                        }`}
                      >
                        {duration.note}
                      </p>
                      <div
                        className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          isSelected
                            ? 'bg-white/12 text-white'
                            : 'bg-[#f3ebe2] text-[#8d4f2d]'
                        }`}
                      >
                        ลดค่าเช่า {Math.round((1 - duration.discount) * 100)}%
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="grid gap-4">
                {trainerOptions.map((trainer) => {
                  const isSelected = trainer.id === selectedTrainerId

                  return (
                    <button
                      key={trainer.id}
                      type="button"
                      onClick={() => setSelectedTrainerId(trainer.id)}
                      className={`rounded-[28px] border p-5 text-left transition ${
                        isSelected
                          ? 'border-[#173d38] bg-[#eef5f3]'
                          : 'border-white/70 bg-white/78 hover:-translate-y-1'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-display text-3xl text-slate-900">
                            {trainer.name}
                          </p>
                          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#8d4f2d]">
                            {trainer.specialty}
                          </p>
                        </div>
                        <div
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            isSelected
                              ? 'bg-[#173d38] text-white'
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {formatCurrency(trainer.sessionRate)} / session
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {trainer.summary}
                      </p>
                      <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm text-slate-600">
                        {trainer.availability}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <aside
              id="summary"
              className="glass-card top-6 rounded-[36px] p-6 lg:sticky sm:p-7"
            >
              <div className="rounded-[28px] bg-[#173d38] p-5 text-white">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/75">
                  Package Summary
                </p>
                <h3 className="mt-2 font-display text-3xl">
                  แพ็กเกจที่คุณเลือกตอนนี้
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  {selectedEquipment.trainerRequired
                    ? 'เครื่องนี้ต้องมีเทรนเนอร์ประกบทุกครั้งตามแพ็กเกจเพื่อความปลอดภัย'
                    : 'Reformer สามารถเริ่มด้วย session ปูพื้นฐานแล้วค่อยฝึกเองที่บ้านต่อได้'}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[26px] bg-[#f5ede4] p-5">
                  <p className="text-sm text-slate-500">เครื่องที่เลือก</p>
                  <p className="mt-2 font-display text-3xl text-slate-900">
                    {selectedEquipment.name}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedEquipment.headline}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-white/85 p-5">
                    <p className="text-sm text-slate-500">ระยะเวลาเช่า</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {selectedDuration.name}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      รวม {selectedDuration.months} เดือน
                    </p>
                  </div>
                  <div className="rounded-[24px] bg-white/85 p-5">
                    <p className="text-sm text-slate-500">เทรนเนอร์</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {selectedTrainer.name}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {trainerSessions} session
                    </p>
                  </div>
                </div>

                <div className="rounded-[26px] border border-slate-200 bg-white/90 p-5">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div>
                      <p className="text-sm text-slate-500">ค่าเช่าเครื่อง</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {formatCurrency(selectedEquipment.monthlyRate)} x{' '}
                        {selectedDuration.months} เดือน
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(rentalTotal)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-4">
                    <div>
                      <p className="text-sm text-slate-500">Trainer package</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {formatCurrency(selectedTrainer.sessionRate)} x{' '}
                        {trainerSessions} session
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      {formatCurrency(trainerTotal)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-4">
                    <div>
                      <p className="text-sm text-slate-500">ยอดประมาณการรวม</p>
                      <p className="mt-1 text-sm text-slate-600">
                        รวมติดตั้งเบื้องต้นและ onboarding session
                      </p>
                    </div>
                    <p className="font-display text-4xl text-slate-900">
                      {formatCurrency(grandTotal)}
                    </p>
                  </div>
                </div>

                <div className="rounded-[26px] bg-[#eef5f3] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f5d50]">
                    Included
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
                    <li>วัดพื้นที่ก่อนติดตั้งและให้คำแนะนำการจัดมุมฝึกในบ้าน</li>
                    <li>สอนการดูแลเครื่องและ checklist ความปลอดภัยก่อนใช้งาน</li>
                    <li>มีทีมช่วยปรับตาราง trainer session ให้ตามเวลาที่สะดวก</li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    className="rounded-full bg-[#173d38] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2b28]"
                    href="#contact"
                  >
                    ขอใบเสนอราคา
                  </a>
                  <a
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#8d4f2d] hover:text-[#8d4f2d]"
                    href="#process"
                  >
                    ดูขั้นตอนถัดไป
                  </a>
                </div>
              </div>
            </aside>
          </section>

          <section id="process" className="space-y-8">
            <div className="max-w-3xl">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#8d4f2d]">
                Rental Flow
              </p>
              <h2 className="mt-3 font-display text-4xl text-slate-900 sm:text-5xl">
                ขั้นตอนการเช่าที่ชัดเจนตั้งแต่เลือกเครื่องจนเริ่มฝึก
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.step}
                  className="glass-card rounded-[32px] p-6"
                >
                  <p className="font-display text-5xl text-[#d5b091]">
                    {step.step}
                  </p>
                  <h3 className="mt-5 font-display text-3xl text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact">
            <div className="overflow-hidden rounded-[40px] bg-[#111b2c] px-6 py-8 text-white sm:px-8 sm:py-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#f5c287]">
                    Ready to move
                  </p>
                  <h2 className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl">
                    เริ่มเช่าเครื่องที่เหมาะกับบ้านของคุณ พร้อมนัดเทรนเนอร์ในวันเดียวกัน
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                    เหมาะทั้งสำหรับบ้าน, คอนโด, ห้องเทรน private และผู้ที่อยากทดลองใช้
                    reformer ก่อนตัดสินใจซื้อเครื่องของตัวเองในอนาคต
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-white/60">Line ฝ่ายขาย</p>
                    <p className="mt-2 font-display text-3xl text-white">
                      @reformrental
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      ตอบคำถามเรื่องพื้นที่ติดตั้งและแนะนำเครื่องที่เหมาะกับบ้าน
                    </p>
                  </div>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-white/60">โทรปรึกษาได้</p>
                    <p className="mt-2 font-display text-3xl text-white">
                      02-888-2468
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      ทุกวัน 09:00 - 19:00 น. สำหรับคิวติดตั้งและจับคู่เทรนเนอร์
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
