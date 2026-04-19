export const equipmentCatalog = [
  {
    id: 'reformer',
    name: 'Pilates Reformer',
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

export const trainerCatalog = [
  {
    id: 'coach-pim',
    name: 'Coach Pim',
    specialty: 'Reformer foundation และ posture reset',
    sessionRate: 1800,
    availability: 'Onsite กรุงเทพฯ / Online cueing',
    summary:
      'เหมาะกับคนที่อยากปูพื้นฐานให้ถูกตั้งแต่แรก แล้วค่อยไปฝึกต่อเองที่บ้านได้อย่างมั่นใจ',
  },
  {
    id: 'coach-tone',
    name: 'Coach Tone',
    specialty: 'Strength, mobility และ functional movement',
    sessionRate: 2200,
    availability: 'Onsite กรุงเทพฯ และปริมณฑล',
    summary:
      'เหมาะกับคนที่อยากได้โค้ชสาย strength และเครื่องที่ต้องคุมท่าละเอียด',
  },
  {
    id: 'coach-fon',
    name: 'Coach Fon',
    specialty: 'Private rehab flow และ breath-led pilates',
    sessionRate: 2400,
    availability: 'Weekend onsite / Hybrid follow-up',
    summary:
      'เหมาะกับลูกค้าที่ต้องการ session ลึก เน้น alignment และการฟื้นฟูการเคลื่อนไหว',
  },
]

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
