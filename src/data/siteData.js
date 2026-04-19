export const equipmentCatalog = [
  {
    id: 'reformer',
    name: 'Pilates Reformer',
    image: '/images/equipment-reformer.svg',
    badge: 'เล่นเองที่บ้านได้',
    monthlyRate: 12900,
    trainerMode: 'optional',
    summary:
      'เครื่องยอดนิยมสำหรับการฝึกที่บ้าน เพราะควบคุมแรงต้านได้ง่ายและเริ่มใช้งานต่อเนื่องได้จริง',
    idealFor: 'ผู้เริ่มต้น, คนทำงานออฟฟิศ, คนที่อยากมี home studio',
    footprint: 'พื้นที่แนะนำ 2.4 x 0.8 เมตร',
    features: [
      'เริ่มด้วย onboarding แล้วฝึกเองต่อที่บ้านได้',
      'เหมาะกับการฝึก core, posture และ flexibility',
      'เพิ่มเทรนเนอร์ภายหลังได้หากอยากเร่งผลลัพธ์',
    ],
  },
  {
    id: 'tower',
    name: 'Cadillac / Tower',
    image: '/images/equipment-tower.svg',
    badge: 'ต้องมีครูประกบ',
    monthlyRate: 18500,
    trainerMode: 'required',
    summary:
      'เครื่องเฉพาะทางสำหรับ alignment, rehab flow และ corrective movement ที่ต้องมีครูช่วยคุมท่า',
    idealFor: 'private training, recovery movement, corrective exercise',
    footprint: 'พื้นที่แนะนำ 2.8 x 1.1 เมตร',
    features: [
      'ต้องมีเทรนเนอร์ประกบทุกครั้งเพื่อความปลอดภัย',
      'เหมาะกับลูกค้าที่ต้องการโปรแกรมเฉพาะบุคคล',
      'ทีมงานช่วยติดตั้งและเซ็ตจุดใช้งานก่อนเริ่ม session',
    ],
  },
  {
    id: 'chair',
    name: 'Stability Chair',
    image: '/images/equipment-chair.svg',
    badge: 'ต้องมีครูประกบ',
    monthlyRate: 14900,
    trainerMode: 'required',
    summary:
      'เครื่องขนาดกะทัดรัดแต่ technical สูง เหมาะกับการฝึก strength, balance และการลงน้ำหนักอย่างแม่นยำ',
    idealFor: 'บ้านพื้นที่จำกัด, งานขา-สะโพก, เวิร์กเอาต์สั้นแต่เข้ม',
    footprint: 'พื้นที่แนะนำ 1.6 x 1.4 เมตร',
    features: [
      'มีครูช่วยคุมฟอร์มและจังหวะการลงน้ำหนัก',
      'เหมาะกับการฝึกเสริมแรงขา สะโพก และ balance',
      'นิยมเช่าเป็นแพ็กพร้อมเทรนเนอร์มากกว่าเช่าเดี่ยว',
    ],
  },
  {
    id: 'functional',
    name: 'Functional Trainer',
    image: '/images/equipment-functional.svg',
    badge: 'ต้องมีครูประกบ',
    monthlyRate: 16900,
    trainerMode: 'required',
    summary:
      'เครื่อง cable training สำหรับ strength + mobility ที่ต้องมีโค้ชช่วยวางโปรแกรมและปรับโหลดให้เหมาะ',
    idealFor: 'home private training, performance, fat loss พร้อมเพิ่มกล้ามเนื้อ',
    footprint: 'พื้นที่แนะนำ 2.2 x 1.8 เมตร',
    features: [
      'ทุก session ต้องมีครูช่วยกำหนดฟอร์มและความหนัก',
      'เหมาะกับลูกค้าที่ชอบโปรแกรมสาย athletic',
      'เลือกได้ทั้ง onsite coach และ hybrid follow-up',
    ],
  },
]

const weekDays = [
  { id: 'sun', shortLabel: 'อา.', label: 'วันอาทิตย์' },
  { id: 'mon', shortLabel: 'จ.', label: 'วันจันทร์' },
  { id: 'tue', shortLabel: 'อ.', label: 'วันอังคาร' },
  { id: 'wed', shortLabel: 'พ.', label: 'วันพุธ' },
  { id: 'thu', shortLabel: 'พฤ.', label: 'วันพฤหัสบดี' },
  { id: 'fri', shortLabel: 'ศ.', label: 'วันศุกร์' },
  { id: 'sat', shortLabel: 'ส.', label: 'วันเสาร์' },
]

const hourSlots = Array.from({ length: 9 }, (_, index) => 8 + index)

const formatHourLabel = (hour) => `${String(hour).padStart(2, '0')}:00`

const createWeeklySchedule = (bookedSlotKeys) =>
  weekDays.map((day) => {
    const slots = hourSlots.map((hour) => {
      const start = formatHourLabel(hour)
      const end = formatHourLabel(hour + 1)
      const key = `${day.id}-${start}`
      const status = bookedSlotKeys.includes(key) ? 'booked' : 'available'

      return {
        key,
        label: `${start} - ${end}`,
        status,
      }
    })

    const availableCount = slots.filter((slot) => slot.status === 'available').length
    const bookedCount = slots.length - availableCount

    return {
      id: day.id,
      label: day.label,
      shortLabel: day.shortLabel,
      slots,
      availableCount,
      bookedCount,
    }
  })

const buildTrainer = ({
  id,
  name,
  image,
  specialty,
  sessionRate,
  availability,
  summary,
  bookedSlotKeys,
}) => {
  const weeklySchedule = createWeeklySchedule(bookedSlotKeys)
  const availableSlots = weeklySchedule.reduce(
    (total, day) => total + day.availableCount,
    0,
  )
  const bookedSlots = weeklySchedule.reduce(
    (total, day) => total + day.bookedCount,
    0,
  )

  return {
    id,
    name,
    image,
    specialty,
    sessionRate,
    availability,
    summary,
    weeklySchedule,
    availableSlots,
    bookedSlots,
    scheduleWindow: 'อาทิตย์ - เสาร์ เวลา 08:00 - 17:00',
  }
}

const baseTrainerCatalog = [
  buildTrainer({
    id: 'coach-pim',
    name: 'Coach Pim',
    image: '/images/trainer-pim.svg',
    specialty: 'Reformer foundation และ posture reset',
    sessionRate: 1800,
    availability: 'Onsite กรุงเทพฯ / Online cueing',
    summary:
      'เหมาะกับคนที่อยากปูพื้นฐานให้ถูกตั้งแต่แรก แล้วค่อยไปฝึกต่อเองที่บ้านได้อย่างมั่นใจ',
    bookedSlotKeys: [
      'sun-09:00',
      'sun-10:00',
      'mon-13:00',
      'mon-14:00',
      'tue-08:00',
      'wed-11:00',
      'wed-12:00',
      'thu-15:00',
      'fri-09:00',
      'fri-10:00',
      'sat-16:00',
    ],
  }),
  buildTrainer({
    id: 'coach-tone',
    name: 'Coach Tone',
    image: '/images/trainer-tone.svg',
    specialty: 'Strength, mobility และ functional movement',
    sessionRate: 2200,
    availability: 'Onsite กรุงเทพฯ และปริมณฑล',
    summary:
      'เหมาะกับคนที่อยากได้โค้ชสาย strength และเครื่องที่ต้องคุมท่าละเอียด',
    bookedSlotKeys: [
      'sun-15:00',
      'sun-16:00',
      'mon-17:00',
      'tue-09:00',
      'tue-10:00',
      'wed-14:00',
      'thu-08:00',
      'thu-09:00',
      'fri-13:00',
      'sat-10:00',
      'sat-11:00',
      'sat-12:00',
    ],
  }),
  buildTrainer({
    id: 'coach-fon',
    name: 'Coach Fon',
    image: '/images/trainer-fon.svg',
    specialty: 'Private rehab flow และ breath-led pilates',
    sessionRate: 2400,
    availability: 'Weekend onsite / Hybrid follow-up',
    summary:
      'เหมาะกับลูกค้าที่ต้องการ session ลึก เน้น alignment และการฟื้นฟูการเคลื่อนไหว',
    bookedSlotKeys: [
      'sun-13:00',
      'mon-10:00',
      'mon-11:00',
      'tue-14:00',
      'wed-15:00',
      'wed-16:00',
      'thu-10:00',
      'thu-11:00',
      'fri-08:00',
      'sat-09:00',
      'sat-13:00',
    ],
  }),
  buildTrainer({
    id: 'coach-may',
    name: 'Coach May',
    image: '/images/trainer-pim.svg',
    specialty: 'Beginner pilates และ home routine planning',
    sessionRate: 1700,
    availability: 'Onsite กรุงเทพฯ / Video follow-up',
    summary:
      'เหมาะกับลูกค้าที่เพิ่งเริ่มต้นและอยากจัดตารางฝึกที่บ้านให้ต่อเนื่องแบบไม่กดดัน',
    bookedSlotKeys: [
      'sun-08:00',
      'sun-09:00',
      'mon-12:00',
      'tue-16:00',
      'wed-09:00',
      'thu-13:00',
      'thu-14:00',
      'fri-15:00',
      'sat-08:00',
      'sat-09:00',
    ],
  }),
  buildTrainer({
    id: 'coach-beam',
    name: 'Coach Beam',
    image: '/images/trainer-tone.svg',
    specialty: 'Strength base, posture และ mobility reset',
    sessionRate: 2100,
    availability: 'Onsite กรุงเทพฯ / ปริมณฑล',
    summary:
      'เหมาะกับคนที่อยากได้โค้ชที่บาลานซ์ทั้ง strength และการแก้ posture ใน session เดียว',
    bookedSlotKeys: [
      'sun-11:00',
      'mon-09:00',
      'mon-10:00',
      'tue-13:00',
      'wed-08:00',
      'wed-09:00',
      'thu-17:00',
      'fri-12:00',
      'fri-13:00',
      'sat-14:00',
      'sat-15:00',
    ],
  }),
  buildTrainer({
    id: 'coach-jay',
    name: 'Coach Jay',
    image: '/images/trainer-fon.svg',
    specialty: 'Athletic conditioning และ functional training',
    sessionRate: 2300,
    availability: 'Onsite กรุงเทพฯ / Sport-specific program',
    summary:
      'เหมาะกับลูกค้าที่ต้องการโค้ชสายเข้ม เน้น performance และการเคลื่อนไหวแบบนักกีฬา',
    bookedSlotKeys: [
      'sun-10:00',
      'sun-11:00',
      'mon-08:00',
      'mon-16:00',
      'tue-17:00',
      'wed-13:00',
      'thu-14:00',
      'thu-15:00',
      'fri-16:00',
      'sat-10:00',
      'sat-11:00',
    ],
  }),
  buildTrainer({
    id: 'coach-nat',
    name: 'Coach Nat',
    image: '/images/trainer-pim.svg',
    specialty: 'Breath work และ gentle reformer progression',
    sessionRate: 1900,
    availability: 'Hybrid / Online cueing',
    summary:
      'เหมาะกับคนที่อยากได้ session นุ่ม ค่อยเป็นค่อยไป และเน้นการหายใจให้สัมพันธ์กับการฝึก',
    bookedSlotKeys: [
      'sun-14:00',
      'mon-11:00',
      'tue-08:00',
      'tue-09:00',
      'wed-10:00',
      'thu-08:00',
      'fri-10:00',
      'fri-11:00',
      'sat-12:00',
      'sat-13:00',
    ],
  }),
  buildTrainer({
    id: 'coach-cream',
    name: 'Coach Cream',
    image: '/images/trainer-tone.svg',
    specialty: 'Core focus และ private studio-style sessions',
    sessionRate: 2000,
    availability: 'Onsite กรุงเทพฯ / คอนโด private room',
    summary:
      'เหมาะกับลูกค้าที่อยากได้ session โฟกัสแกนกลางลำตัวและบรรยากาศแบบ private studio',
    bookedSlotKeys: [
      'sun-12:00',
      'sun-13:00',
      'mon-14:00',
      'tue-10:00',
      'wed-17:00',
      'thu-12:00',
      'thu-13:00',
      'fri-14:00',
      'fri-15:00',
      'sat-16:00',
    ],
  }),
  buildTrainer({
    id: 'coach-mint',
    name: 'Coach Mint',
    image: '/images/trainer-fon.svg',
    specialty: 'Alignment rehab และ balance control',
    sessionRate: 2350,
    availability: 'Weekend onsite / Recovery specialist',
    summary:
      'เหมาะกับคนที่มีประวัติบาดเจ็บหรืออยากให้ครูคุมรายละเอียดการจัด alignment อย่างใกล้ชิด',
    bookedSlotKeys: [
      'sun-08:00',
      'mon-15:00',
      'mon-16:00',
      'tue-11:00',
      'wed-12:00',
      'wed-13:00',
      'thu-16:00',
      'fri-08:00',
      'sat-09:00',
      'sat-10:00',
      'sat-11:00',
    ],
  }),
  buildTrainer({
    id: 'coach-aom',
    name: 'Coach Aom',
    image: '/images/trainer-pim.svg',
    specialty: 'Lifestyle coaching และ beginner strength',
    sessionRate: 1750,
    availability: 'Onsite กรุงเทพฯ / Morning slots',
    summary:
      'เหมาะกับลูกค้าที่อยากเริ่มฝึกแบบเข้าใจง่าย มีโค้ชช่วยออกแบบ routine ให้เข้ากับชีวิตประจำวัน',
    bookedSlotKeys: [
      'sun-17:00',
      'mon-08:00',
      'tue-12:00',
      'tue-13:00',
      'wed-14:00',
      'thu-09:00',
      'thu-10:00',
      'fri-17:00',
      'sat-08:00',
      'sat-14:00',
    ],
  }),
]

const trainerProfiles = {
  'coach-pim': {
    machineFocus: ['Pilates Reformer', 'Stability Chair'],
    exerciseFocus: ['Posture reset', 'Core foundation', 'Beginner pilates'],
  },
  'coach-tone': {
    machineFocus: ['Functional Trainer', 'Cadillac / Tower'],
    exerciseFocus: ['Strength training', 'Mobility', 'Functional movement'],
  },
  'coach-fon': {
    machineFocus: ['Cadillac / Tower', 'Pilates Reformer'],
    exerciseFocus: ['Rehab flow', 'Breath-led pilates', 'Alignment work'],
  },
  'coach-may': {
    machineFocus: ['Pilates Reformer'],
    exerciseFocus: ['Beginner pilates', 'Home routine planning', 'Light mobility'],
  },
  'coach-beam': {
    machineFocus: ['Functional Trainer', 'Stability Chair'],
    exerciseFocus: ['Strength base', 'Posture correction', 'Mobility reset'],
  },
  'coach-jay': {
    machineFocus: ['Functional Trainer', 'Cadillac / Tower'],
    exerciseFocus: [
      'Athletic conditioning',
      'Performance training',
      'Functional movement',
    ],
  },
  'coach-nat': {
    machineFocus: ['Pilates Reformer'],
    exerciseFocus: ['Breath work', 'Gentle progression', 'Recovery movement'],
  },
  'coach-cream': {
    machineFocus: ['Pilates Reformer', 'Cadillac / Tower'],
    exerciseFocus: ['Core control', 'Private studio flow', 'Body awareness'],
  },
  'coach-mint': {
    machineFocus: ['Cadillac / Tower', 'Stability Chair'],
    exerciseFocus: ['Alignment rehab', 'Balance control', 'Recovery support'],
  },
  'coach-aom': {
    machineFocus: ['Pilates Reformer', 'Functional Trainer'],
    exerciseFocus: ['Lifestyle coaching', 'Beginner strength', 'Weekly routine'],
  },
}

export const trainerCatalog = baseTrainerCatalog.map((trainer) => ({
  ...trainer,
  ...trainerProfiles[trainer.id],
}))

export const rentalPlanCatalog = [
  {
    id: 'starter',
    name: 'Starter 1 เดือน',
    months: 1,
    discount: 1,
    optionalSessions: 2,
    requiredSessions: 4,
    note: 'เหมาะกับการทดลองเช่าและดูว่าพื้นที่ในบ้านลงตัวหรือไม่',
  },
  {
    id: 'progress',
    name: 'Progress 3 เดือน',
    months: 3,
    discount: 0.94,
    optionalSessions: 4,
    requiredSessions: 12,
    note: 'สมดุลที่สุดสำหรับคนที่อยากได้ทั้งความคุ้มและการติดตามผลต่อเนื่อง',
  },
  {
    id: 'signature',
    name: 'Signature 6 เดือน',
    months: 6,
    discount: 0.88,
    optionalSessions: 8,
    requiredSessions: 24,
    note: 'เหมาะกับคนที่อยากเปลี่ยนบ้านให้เป็น mini studio แบบจริงจัง',
  },
]

export const trainerServicePlans = [
  {
    id: 'trainer-lite',
    name: 'Lite 4 Sessions',
    sessions: 4,
    discount: 1,
    note: 'เหมาะกับคนที่มีอุปกรณ์อยู่แล้วและต้องการเช็กฟอร์มเป็นช่วง ๆ',
  },
  {
    id: 'trainer-core',
    name: 'Core 8 Sessions',
    sessions: 8,
    discount: 0.95,
    note: 'แพ็กยอดนิยมสำหรับ private coaching ต่อเนื่องแบบรายเดือน',
  },
  {
    id: 'trainer-pro',
    name: 'Pro 12 Sessions',
    sessions: 12,
    discount: 0.9,
    note: 'เหมาะกับคนที่อยากได้โค้ชช่วยติดตามใกล้ชิดและวางโปรแกรมจริงจัง',
  },
]

export const serviceHighlights = [
  {
    title: 'ติดตั้งถึงบ้าน',
    description:
      'ทีมงานช่วยวัดพื้นที่ ยกเครื่อง ประกอบ และเซ็ตจุดใช้งานให้พร้อมเริ่มทันที',
  },
  {
    title: 'เลือกเทรนเนอร์ได้',
    description:
      'ลูกค้าเลือกจ้างโค้ชตามเป้าหมายได้เอง ทั้งสาย reformer, rehab และ strength',
  },
  {
    title: 'ยืดหยุ่นทั้งแบบแพ็กและแบบแยก',
    description:
      'สามารถเช่าเครื่องพร้อมเทรนเนอร์ หรือเลือกเช่า/จ้างแยกกันตามความต้องการได้',
  },
]

export const bookingModes = [
  {
    id: 'bundle',
    title: 'เช่าเครื่อง + เทรนเนอร์',
    subtitle: 'เหมาะกับลูกค้าที่อยากให้เราจัดแพ็กให้ครบ',
    description:
      'เลือกเครื่อง ระยะเช่า และเทรนเนอร์ใน flow เดียว เหมาะกับลูกค้าที่อยากเริ่มใช้งานได้ทันที',
  },
  {
    id: 'equipment-only',
    title: 'เช่าเครื่องอย่างเดียว',
    subtitle: 'เหมาะกับคนที่ต้องการเฉพาะอุปกรณ์',
    description:
      'เปิดให้เช่าเดี่ยวได้เฉพาะเครื่องที่เล่นเองที่บ้านได้ เช่น Pilates Reformer',
  },
  {
    id: 'trainer-only',
    title: 'จ้างเทรนเนอร์อย่างเดียว',
    subtitle: 'เหมาะกับคนที่มีอุปกรณ์อยู่แล้ว',
    description:
      'เลือกโค้ชและจำนวน session ได้โดยไม่จำเป็นต้องเช่าเครื่องจากเว็บไซต์',
  },
]

export const homeStats = [
  {
    value: `${trainerCatalog.length} คน`,
    label: 'เทรนเนอร์ที่สามารถจ้างงานได้',
    description: 'คัดมาให้ครอบคลุมทั้ง Reformer, rehab และ strength',
  },
  {
    value: `${equipmentCatalog.length} รุ่น`,
    label: 'เครื่องออกกำลังกายพร้อมให้เช่า',
    description: 'มีทั้งเครื่องสำหรับฝึกเองที่บ้านและเครื่องเฉพาะทาง',
  },
  {
    value: '2 หน้า',
    label: 'โครงหลักของเว็บแอป',
    description: 'หน้าแรกเล่าภาพรวมธุรกิจ และหน้า 2 ใช้สำหรับเลือกเช่า/จ้างจริง',
  },
]

const topRentedEquipment = [
  {
    id: 'reformer',
    rank: '01',
    highlight: 'ยอดเช่าสูงสุด',
    summary:
      'Pilates Reformer ได้รับความนิยมมากที่สุด เพราะเริ่มฝึกที่บ้านได้จริงและยืดหยุ่นเรื่องเวลา',
  },
  {
    id: 'functional',
    rank: '02',
    highlight: 'สาย strength นิยม',
    summary:
      'Functional Trainer เหมาะกับลูกค้าที่อยากฝึก strength + mobility พร้อมโค้ชช่วยวางโปรแกรม',
  },
  {
    id: 'tower',
    rank: '03',
    highlight: 'นิยมใน private session',
    summary:
      'Cadillac / Tower ถูกเลือกบ่อยในกลุ่ม corrective movement และ rehab flow แบบดูแลใกล้ชิด',
  },
]

export const topRentedCards = topRentedEquipment
  .map((item) => ({
    ...item,
    equipment: equipmentCatalog.find((equipment) => equipment.id === item.id),
  }))
  .filter((item) => item.equipment)

export const processSteps = [
  {
    step: '01',
    title: 'ดูภาพรวมธุรกิจบนหน้าแรก',
    description:
      'ลูกค้าเข้าใจประเภทบริการ จำนวนเทรนเนอร์ และเครื่องยอดนิยมก่อนตัดสินใจไปหน้าจอง',
  },
  {
    step: '02',
    title: 'ไปหน้า 2 เพื่อเลือก flow ที่ต้องการ',
    description:
      'เลือกได้ว่าจะเช่าแบบแพ็ก, เช่าเครื่องอย่างเดียว หรือจ้างเทรนเนอร์อย่างเดียว',
  },
  {
    step: '03',
    title: 'สรุปแพ็กและติดต่อทีมขาย',
    description:
      'ระบบช่วยคำนวณราคาและสรุปเงื่อนไขเบื้องต้น ก่อนส่งต่อให้ฝ่ายขายปิดดีลจริง',
  },
]
