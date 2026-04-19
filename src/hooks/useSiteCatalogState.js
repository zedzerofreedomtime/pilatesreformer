import { useMemo, useState } from 'react'
import {
  bookingModes as initialBookingModes,
  equipmentCatalog as initialEquipmentCatalog,
  processSteps as initialProcessSteps,
  serviceHighlights as initialServiceHighlights,
  topRentedCards as initialTopRentedCards,
  trainerCatalog as initialTrainerCatalog,
} from '../data/siteData'

const cloneData = (value) => JSON.parse(JSON.stringify(value))

const initialTrainerClientMap = {
  'coach-pim': [
    {
      id: 'client-pim-1',
      name: 'Mina S.',
      equipmentName: 'Pilates Reformer',
      planName: 'Progress 3 เดือน',
      nextSession: 'วันจันทร์ 10:00',
      contact: 'LINE: mina.homefit',
      status: 'active',
    },
    {
      id: 'client-pim-2',
      name: 'Ploy T.',
      equipmentName: 'Stability Chair',
      planName: 'Starter 1 เดือน',
      nextSession: 'วันพุธ 14:00',
      contact: 'LINE: ploycore',
      status: 'active',
    },
  ],
  'coach-tone': [
    {
      id: 'client-tone-1',
      name: 'Ken A.',
      equipmentName: 'Functional Trainer',
      planName: 'Signature 6 เดือน',
      nextSession: 'วันอังคาร 17:00',
      contact: 'LINE: ken.fitlab',
      status: 'active',
    },
    {
      id: 'client-tone-2',
      name: 'Beam R.',
      equipmentName: 'Cadillac / Tower',
      planName: 'Progress 3 เดือน',
      nextSession: 'วันศุกร์ 13:00',
      contact: 'LINE: beam.moves',
      status: 'follow-up',
    },
  ],
  'coach-fon': [
    {
      id: 'client-fon-1',
      name: 'Nina K.',
      equipmentName: 'Cadillac / Tower',
      planName: 'Private Rehab Flow',
      nextSession: 'วันเสาร์ 09:00',
      contact: 'LINE: nina.recover',
      status: 'active',
    },
  ],
  'coach-may': [
    {
      id: 'client-may-1',
      name: 'June M.',
      equipmentName: 'Pilates Reformer',
      planName: 'Starter 1 เดือน',
      nextSession: 'วันอาทิตย์ 08:00',
      contact: 'LINE: june.pilates',
      status: 'active',
    },
  ],
  'coach-beam': [
    {
      id: 'client-beam-1',
      name: 'Tee N.',
      equipmentName: 'Functional Trainer',
      planName: 'Core Strength',
      nextSession: 'วันพฤหัสบดี 17:00',
      contact: 'LINE: teenextset',
      status: 'active',
    },
  ],
  'coach-jay': [
    {
      id: 'client-jay-1',
      name: 'Mark P.',
      equipmentName: 'Functional Trainer',
      planName: 'Athletic Conditioning',
      nextSession: 'วันเสาร์ 10:00',
      contact: 'LINE: mark.performance',
      status: 'active',
    },
  ],
  'coach-nat': [
    {
      id: 'client-nat-1',
      name: 'Fern L.',
      equipmentName: 'Pilates Reformer',
      planName: 'Gentle Progression',
      nextSession: 'วันศุกร์ 11:00',
      contact: 'LINE: fern.breathe',
      status: 'follow-up',
    },
  ],
  'coach-cream': [
    {
      id: 'client-cream-1',
      name: 'Aom C.',
      equipmentName: 'Pilates Reformer',
      planName: 'Private Studio Flow',
      nextSession: 'วันพฤหัสบดี 13:00',
      contact: 'LINE: aomcore',
      status: 'active',
    },
  ],
  'coach-mint': [
    {
      id: 'client-mint-1',
      name: 'Prae V.',
      equipmentName: 'Cadillac / Tower',
      planName: 'Alignment Rehab',
      nextSession: 'วันเสาร์ 11:00',
      contact: 'LINE: prae.balance',
      status: 'active',
    },
  ],
  'coach-aom': [
    {
      id: 'client-aom-1',
      name: 'Mook D.',
      equipmentName: 'Pilates Reformer',
      planName: 'Beginner Strength',
      nextSession: 'วันพฤหัสบดี 09:00',
      contact: 'LINE: mook.fitstart',
      status: 'active',
    },
  ],
}

const initialPendingTrainerApplications = [
  {
    id: 'trainer-application-1',
    name: 'Coach Praew',
    email: 'praew.trainer@reformrental.com',
    phone: '089-111-2233',
    specialty: 'Reformer rehab and posture reset',
    machineFocus: ['Pilates Reformer', 'Cadillac / Tower'],
    submittedAt: '19 เม.ย. 2026',
  },
]

const initialHomePageContent = {
  hero: {
    eyebrow: 'Page 1 / Overview',
    titleLine1: 'เว็บไซต์เช่าเครื่องออกกำลังกาย',
    titleLine2: 'ที่ให้ลูกค้าเลือกเช่าและเลือกโค้ชได้ในที่เดียว',
    description:
      'หน้าแรกของเว็บทำหน้าที่อธิบายภาพรวมธุรกิจให้ชัดว่าเรารับเช่าเครื่องออกกำลังกายถึงบ้าน มี Pilates Reformer เป็นตัวเลือกยอดนิยมที่ลูกค้าสามารถเริ่มฝึกเองที่บ้านได้ ส่วนเครื่องเฉพาะทางอื่นจะมีเงื่อนไขให้ต้องจ้างเทรนเนอร์ประกบทุกครั้งเพื่อความปลอดภัย',
    primaryButtonLabel: 'ไปหน้าที่ 2 เลือกเช่า',
    secondaryButtonLabel: 'เช่า Reformer อย่างเดียว',
  },
  heroAside: {
    badge: 'Website Direction',
    title: 'หน้าแรกบอกภาพรวม ส่วนหน้า 2 ใช้สำหรับเลือกเช่าและสรุปแพ็ก',
    description:
      'โครงนี้ทำให้ผู้ใช้เข้าใจธุรกิจได้เร็วขึ้น เพราะหน้าแรกเน้นการขายและสร้างความเชื่อมั่น ส่วนหน้าที่ 2 จะเป็นพื้นที่สำหรับให้ลูกค้าเลือกบริการตามรูปแบบที่ต้องการจริง',
  },
  stats: [
    {
      label: 'เทรนเนอร์ที่สามารถจ้างงานได้',
      description: 'คัดมาให้ครอบคลุมทั้ง Reformer, rehab และ strength',
    },
    {
      label: 'เครื่องออกกำลังกายพร้อมให้เช่า',
      description: 'มีทั้งเครื่องสำหรับฝึกเองที่บ้านและเครื่องเฉพาะทาง',
    },
    {
      value: '2 หน้า',
      label: 'โครงหลักของเว็บแอป',
      description: 'หน้าแรกเล่าภาพรวมธุรกิจ และหน้า 2 ใช้สำหรับเลือกเช่า/จ้างจริง',
    },
  ],
  bookingModes: cloneData(initialBookingModes),
  topRentals: {
    eyebrow: 'Top 3 Rentals',
    title: '3 อุปกรณ์ที่มีการเช่ามากที่สุด',
    description:
      'ใช้ส่วนนี้บนหน้าแรกเพื่อบอกลูกค้าว่าอะไรคือสินค้ายอดนิยม และกดเข้าไปที่หน้า 2 ได้ทันทีพร้อม preselect ตัวเลือกที่เกี่ยวข้อง',
    items: initialTopRentedCards.map((item) => ({
      equipmentId: item.equipment.id,
      rank: item.rank,
      highlight: item.highlight,
      summary: item.summary,
    })),
  },
  highlights: cloneData(initialServiceHighlights),
  process: {
    eyebrow: 'User Flow',
    title: 'โครงหน้าเว็บหลังจากแยกเป็น 2 หน้า',
    steps: cloneData(initialProcessSteps),
  },
  cta: {
    badge: 'Ready to move',
    title: 'หน้าต่อไปคือหน้าเลือกเช่าที่ลูกค้าจะลงรายละเอียดและคำนวณแพ็กได้ทันที',
    description:
      'จากหน้าแรกนี้ ลูกค้าจะเข้าใจว่ามีเทรนเนอร์กี่คน มีอุปกรณ์ยอดนิยมอะไรบ้าง และรู้ต่อทันทีว่าหน้า 2 คือพื้นที่สำหรับเลือกบริการแบบจริงจัง',
    bundleLabel: 'เริ่มแบบครบแพ็ก',
    bundleTitle: 'เครื่อง + เทรนเนอร์',
    bundleDescription: 'เหมาะกับลูกค้าที่อยากให้เว็บไซต์ช่วยจัด flow ให้ครบ',
    trainerLabel: 'เริ่มแบบยืดหยุ่น',
    trainerTitle: 'จ้างเทรนเนอร์อย่างเดียว',
    trainerDescription: 'เหมาะกับคนที่มีอุปกรณ์อยู่แล้วและต้องการแค่โค้ช',
  },
}

const buildDefaultWeeklySchedule = () =>
  cloneData(initialTrainerCatalog[0].weeklySchedule).map((day) => ({
    ...day,
    availableCount: day.slots.length,
    bookedCount: 0,
    slots: day.slots.map((slot) => ({
      ...slot,
      status: 'available',
    })),
  }))

const summarizeWeeklySchedule = (weeklySchedule) => {
  const availableSlots = weeklySchedule.reduce(
    (total, day) =>
      total + day.slots.filter((slot) => slot.status === 'available').length,
    0,
  )
  const bookedSlots = weeklySchedule.reduce(
    (total, day) =>
      total + day.slots.filter((slot) => slot.status === 'booked').length,
    0,
  )

  return {
    weeklySchedule: weeklySchedule.map((day) => ({
      ...day,
      availableCount: day.slots.filter((slot) => slot.status === 'available').length,
      bookedCount: day.slots.filter((slot) => slot.status === 'booked').length,
    })),
    availableSlots,
    bookedSlots,
  }
}

const createTrainerFromApplication = (application) => {
  const weeklySchedule = buildDefaultWeeklySchedule()
  const summary = summarizeWeeklySchedule(weeklySchedule)

  return {
    id: `coach-${Date.now()}`,
    name: application.name,
    image: '/images/trainer-pim.svg',
    specialty: application.specialty || 'Trainer application pending profile setup',
    sessionRate: 1800,
    availability: 'Onsite / Online',
    summary: 'โปรไฟล์นี้ถูกสร้างจากการสมัครสมาชิกของเทรนเนอร์และได้รับการอนุมัติจากแอดมินแล้ว',
    scheduleWindow: 'อาทิตย์ - เสาร์ เวลา 08:00 - 17:00',
    machineFocus:
      application.machineFocus?.length > 0
        ? application.machineFocus
        : ['Pilates Reformer'],
    exerciseFocus: ['Private training'],
    ...summary,
  }
}

function useSiteCatalogState() {
  const [equipmentCatalog, setEquipmentCatalog] = useState(() =>
    cloneData(initialEquipmentCatalog),
  )
  const [trainerCatalog, setTrainerCatalog] = useState(() =>
    cloneData(initialTrainerCatalog),
  )
  const [trainerClientMap, setTrainerClientMap] = useState(() =>
    cloneData(initialTrainerClientMap),
  )
  const [pendingTrainerApplications, setPendingTrainerApplications] = useState(() =>
    cloneData(initialPendingTrainerApplications),
  )
  const [memberDirectory, setMemberDirectory] = useState([])
  const [homePageContent, setHomePageContent] = useState(() =>
    cloneData(initialHomePageContent),
  )

  const addTrainer = () => {
    const nextId = `coach-${Date.now()}`
    const weeklySchedule = buildDefaultWeeklySchedule()
    const summary = summarizeWeeklySchedule(weeklySchedule)

    setTrainerCatalog((current) => [
      ...current,
      {
        id: nextId,
        name: 'New Coach',
        image: '/images/trainer-pim.svg',
        specialty: 'Personalized coaching',
        sessionRate: 1800,
        availability: 'Onsite / Online',
        summary: 'เพิ่มรายละเอียดของโค้ชคนนี้ได้จากฝั่ง admin',
        scheduleWindow: 'อาทิตย์ - เสาร์ เวลา 08:00 - 17:00',
        machineFocus: ['Pilates Reformer'],
        exerciseFocus: ['Beginner pilates'],
        ...summary,
      },
    ])

    setTrainerClientMap((current) => ({
      ...current,
      [nextId]: [],
    }))

    return nextId
  }

  const updateTrainer = (trainerId, updates) => {
    setTrainerCatalog((current) =>
      current.map((trainer) => {
        if (trainer.id !== trainerId) {
          return trainer
        }

        const nextTrainer = {
          ...trainer,
          ...updates,
        }

        if (updates.weeklySchedule) {
          return {
            ...nextTrainer,
            ...summarizeWeeklySchedule(updates.weeklySchedule),
          }
        }

        return nextTrainer
      }),
    )
  }

  const removeTrainer = (trainerId) => {
    setTrainerCatalog((current) =>
      current.length > 1
        ? current.filter((trainer) => trainer.id !== trainerId)
        : current,
    )

    setTrainerClientMap((current) => {
      if (!(trainerId in current)) {
        return current
      }

      const nextMap = { ...current }
      delete nextMap[trainerId]
      return nextMap
    })
  }

  const addEquipment = () => {
    const nextId = `equipment-${Date.now()}`

    setEquipmentCatalog((current) => [
      ...current,
      {
        id: nextId,
        name: 'New Equipment',
        image: '/images/equipment-reformer.svg',
        badge: 'เพิ่มข้อมูลได้จาก admin',
        monthlyRate: 9900,
        trainerMode: 'optional',
        summary: 'ใส่รายละเอียดของอุปกรณ์ชิ้นนี้ได้จากฝั่ง admin',
        idealFor: 'ลูกค้าที่ต้องการอุปกรณ์ใหม่ในระบบ',
        footprint: 'กำหนดพื้นที่ใช้งาน',
        features: ['เพิ่ม feature ได้', 'แก้ไขรายละเอียดได้'],
      },
    ])

    return nextId
  }

  const updateEquipment = (equipmentId, updates) => {
    setEquipmentCatalog((current) =>
      current.map((equipment) =>
        equipment.id === equipmentId
          ? {
              ...equipment,
              ...updates,
            }
          : equipment,
      ),
    )
  }

  const removeEquipment = (equipmentId) => {
    setEquipmentCatalog((current) =>
      current.length > 1
        ? current.filter((equipment) => equipment.id !== equipmentId)
        : current,
    )
  }

  const registerMember = ({
    roleId,
    name,
    email,
    phone,
    specialty,
    machineFocus,
  }) => {
    if (roleId === 'trainer') {
      setPendingTrainerApplications((current) => [
        ...current,
        {
          id: `trainer-application-${Date.now()}`,
          name,
          email,
          phone,
          specialty,
          machineFocus,
          submittedAt: 'ส่งคำขอเมื่อสักครู่',
        },
      ])

      return {
        status: 'pending',
        message: 'สมัครเป็นเทรนเนอร์เรียบร้อยแล้ว ตอนนี้คำขอของคุณอยู่ระหว่างรอแอดมินอนุมัติ',
      }
    }

    setMemberDirectory((current) => [
      ...current,
      {
        id: `member-${Date.now()}`,
        roleId: 'user',
        name,
        email,
        phone,
      },
    ])

    return {
      status: 'success',
      message: 'สมัครสมาชิกเรียบร้อยแล้ว ระบบพาเข้าสู่ระบบให้ทันที',
    }
  }

  const approveTrainerApplication = (applicationId) => {
    const application = pendingTrainerApplications.find(
      (item) => item.id === applicationId,
    )

    if (!application) {
      return null
    }

    const trainer = createTrainerFromApplication(application)

    setTrainerCatalog((current) => [...current, trainer])
    setTrainerClientMap((current) => ({
      ...current,
      [trainer.id]: [],
    }))
    setPendingTrainerApplications((current) =>
      current.filter((item) => item.id !== applicationId),
    )

    return trainer
  }

  const rejectTrainerApplication = (applicationId) => {
    setPendingTrainerApplications((current) =>
      current.filter((item) => item.id !== applicationId),
    )
  }

  const updateHomePageContent = (nextContent) => {
    setHomePageContent(cloneData(nextContent))
  }

  const homeStats = useMemo(
    () =>
      homePageContent.stats.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            value: `${trainerCatalog.length} คน`,
          }
        }

        if (index === 1) {
          return {
            ...item,
            value: `${equipmentCatalog.length} รุ่น`,
          }
        }

        return item
      }),
    [equipmentCatalog.length, homePageContent.stats, trainerCatalog.length],
  )

  const topRentedCards = useMemo(
    () =>
      homePageContent.topRentals.items
        .map((card) => ({
          ...card,
          equipment: equipmentCatalog.find(
            (equipment) => equipment.id === card.equipmentId,
          ),
        }))
        .filter((card) => card.equipment),
    [equipmentCatalog, homePageContent.topRentals.items],
  )

  return {
    equipmentCatalog,
    trainerCatalog,
    trainerClientMap,
    pendingTrainerApplications,
    memberDirectory,
    homePageContent,
    homeStats,
    topRentedCards,
    addTrainer,
    updateTrainer,
    removeTrainer,
    addEquipment,
    updateEquipment,
    removeEquipment,
    registerMember,
    approveTrainerApplication,
    rejectTrainerApplication,
    updateHomePageContent,
  }
}

export default useSiteCatalogState
