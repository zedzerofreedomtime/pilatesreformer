import { useEffect, useMemo, useState } from 'react'
import {
  bookingModes as initialBookingModes,
  processSteps as initialProcessSteps,
  serviceHighlights as initialServiceHighlights,
  topRentedCards as initialTopRentedCards,
} from '../data/siteData'
import {
  approveTrainerApplication as approveTrainerApplicationApi,
  createEquipment as createEquipmentApi,
  createTrainer as createTrainerApi,
  deleteEquipment as deleteEquipmentApi,
  deleteTrainer as deleteTrainerApi,
  fetchCatalogBootstrap,
  fetchPendingTrainerApplications,
  fetchTrainerClients,
  rejectTrainerApplication as rejectTrainerApplicationApi,
  saveHomeContent as saveHomeContentApi,
  updateEquipment as updateEquipmentApi,
  updateTrainer as updateTrainerApi,
} from '../lib/api'

const cloneData = (value) => JSON.parse(JSON.stringify(value))

const initialHomePageContent = {
  hero: {
    eyebrow: 'Page 1 / Overview',
    titleLine1: 'เน€เธงเนเธเนเธเธ•เนเน€เธเนเธฒเน€เธเธฃเธทเนเธญเธเธญเธญเธเธเธณเธฅเธฑเธเธเธฒเธข',
    titleLine2: 'เธ—เธตเนเนเธซเนเธฅเธนเธเธเนเธฒเน€เธฅเธทเธญเธเน€เธเนเธฒเนเธฅเธฐเน€เธฅเธทเธญเธเนเธเนเธเนเธ”เนเนเธเธ—เธตเนเน€เธ”เธตเธขเธง',
    description:
      'เธซเธเนเธฒเนเธฃเธเธเธญเธเน€เธงเนเธเธ—เธณเธซเธเนเธฒเธ—เธตเนเธญเธเธดเธเธฒเธขเธ เธฒเธเธฃเธงเธกเธเธธเธฃเธเธดเธเนเธซเนเธเธฑเธ”เธงเนเธฒเน€เธฃเธฒเธฃเธฑเธเน€เธเนเธฒเน€เธเธฃเธทเนเธญเธเธญเธญเธเธเธณเธฅเธฑเธเธเธฒเธขเธ–เธถเธเธเนเธฒเธ เธกเธต Pilates Reformer เน€เธเนเธเธ•เธฑเธงเน€เธฅเธทเธญเธเธขเธญเธ”เธเธดเธขเธกเธ—เธตเนเธฅเธนเธเธเนเธฒเธชเธฒเธกเธฒเธฃเธ–เน€เธฃเธดเนเธกเธเธถเธเน€เธญเธเธ—เธตเนเธเนเธฒเธเนเธ”เน เธชเนเธงเธเน€เธเธฃเธทเนเธญเธเน€เธเธเธฒเธฐเธ—เธฒเธเธญเธทเนเธเธเธฐเธกเธตเน€เธเธทเนเธญเธเนเธเนเธซเนเธ•เนเธญเธเธเนเธฒเธเน€เธ—เธฃเธเน€เธเธญเธฃเนเธเธฃเธฐเธเธเธ—เธธเธเธเธฃเธฑเนเธเน€เธเธทเนเธญเธเธงเธฒเธกเธเธฅเธญเธ”เธ เธฑเธข',
    primaryButtonLabel: 'เนเธเธซเธเนเธฒเธ—เธตเน 2 เน€เธฅเธทเธญเธเน€เธเนเธฒ',
    secondaryButtonLabel: 'เน€เธเนเธฒ Reformer เธญเธขเนเธฒเธเน€เธ”เธตเธขเธง',
  },
  heroAside: {
    badge: 'Website Direction',
    title: 'เธซเธเนเธฒเนเธฃเธเธเธญเธเธ เธฒเธเธฃเธงเธก เธชเนเธงเธเธซเธเนเธฒ 2 เนเธเนเธชเธณเธซเธฃเธฑเธเน€เธฅเธทเธญเธเน€เธเนเธฒเนเธฅเธฐเธชเธฃเธธเธเนเธเนเธ',
    description:
      'เนเธเธฃเธเธเธตเนเธ—เธณเนเธซเนเธเธนเนเนเธเนเน€เธเนเธฒเนเธเธเธธเธฃเธเธดเธเนเธ”เนเน€เธฃเนเธงเธเธถเนเธ เน€เธเธฃเธฒเธฐเธซเธเนเธฒเนเธฃเธเน€เธเนเธเธเธฒเธฃเธเธฒเธขเนเธฅเธฐเธชเธฃเนเธฒเธเธเธงเธฒเธกเน€เธเธทเนเธญเธกเธฑเนเธ เธชเนเธงเธเธซเธเนเธฒเธ—เธตเน 2 เธเธฐเน€เธเนเธเธเธทเนเธเธ—เธตเนเธชเธณเธซเธฃเธฑเธเนเธซเนเธฅเธนเธเธเนเธฒเน€เธฅเธทเธญเธเธเธฃเธดเธเธฒเธฃเธ•เธฒเธกเธฃเธนเธเนเธเธเธ—เธตเนเธ•เนเธญเธเธเธฒเธฃเธเธฃเธดเธ',
  },
  stats: [
    {
      label: 'เน€เธ—เธฃเธเน€เธเธญเธฃเนเธ—เธตเนเธชเธฒเธกเธฒเธฃเธ–เธเนเธฒเธเธเธฒเธเนเธ”เน',
      description: 'เธเธฑเธ”เธกเธฒเนเธซเนเธเธฃเธญเธเธเธฅเธธเธกเธ—เธฑเนเธ Reformer, rehab เนเธฅเธฐ strength',
    },
    {
      label: 'เน€เธเธฃเธทเนเธญเธเธญเธญเธเธเธณเธฅเธฑเธเธเธฒเธขเธเธฃเนเธญเธกเนเธซเนเน€เธเนเธฒ',
      description: 'เธกเธตเธ—เธฑเนเธเน€เธเธฃเธทเนเธญเธเธชเธณเธซเธฃเธฑเธเธเธถเธเน€เธญเธเธ—เธตเนเธเนเธฒเธเนเธฅเธฐเน€เธเธฃเธทเนเธญเธเน€เธเธเธฒเธฐเธ—เธฒเธ',
    },
    {
      value: '2 เธซเธเนเธฒ',
      label: 'เนเธเธฃเธเธซเธฅเธฑเธเธเธญเธเน€เธงเนเธเนเธญเธ',
      description: 'เธซเธเนเธฒเนเธฃเธเน€เธฅเนเธฒเธ เธฒเธเธฃเธงเธกเธเธธเธฃเธเธดเธ เนเธฅเธฐเธซเธเนเธฒ 2 เนเธเนเธชเธณเธซเธฃเธฑเธเน€เธฅเธทเธญเธเน€เธเนเธฒ/เธเนเธฒเธเธเธฃเธดเธ',
    },
  ],
  bookingModes: cloneData(initialBookingModes),
  topRentals: {
    eyebrow: 'Top 3 Rentals',
    title: '3 เธญเธธเธเธเธฃเธ“เนเธ—เธตเนเธกเธตเธเธฒเธฃเน€เธเนเธฒเธกเธฒเธเธ—เธตเนเธชเธธเธ”',
    description:
      'เนเธเนเธชเนเธงเธเธเธตเนเธเธเธซเธเนเธฒเนเธฃเธเน€เธเธทเนเธญเธเธญเธเธฅเธนเธเธเนเธฒเธงเนเธฒเธญเธฐเนเธฃเธเธทเธญเธชเธดเธเธเนเธฒเธขเธญเธ”เธเธดเธขเธก เนเธฅเธฐเธเธ”เน€เธเนเธฒเนเธเธ—เธตเนเธซเธเนเธฒ 2 เนเธ”เนเธ—เธฑเธเธ—เธตเธเธฃเนเธญเธก preselect เธ•เธฑเธงเน€เธฅเธทเธญเธเธ—เธตเนเน€เธเธตเนเธขเธงเธเนเธญเธ',
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
    title: 'เนเธเธฃเธเธซเธเนเธฒเน€เธงเนเธเธซเธฅเธฑเธเธเธฒเธเนเธขเธเน€เธเนเธ 2 เธซเธเนเธฒ',
    steps: cloneData(initialProcessSteps),
  },
  cta: {
    badge: 'Ready to move',
    title: 'เธซเธเนเธฒเธ•เนเธญเนเธเธเธทเธญเธซเธเนเธฒเน€เธฅเธทเธญเธเน€เธเนเธฒเธ—เธตเนเธฅเธนเธเธเนเธฒเธเธฐเธฅเธเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เนเธฅเธฐเธเธณเธเธงเธ“เนเธเนเธเนเธ”เนเธ—เธฑเธเธ—เธต',
    description:
      'เธเธฒเธเธซเธเนเธฒเนเธฃเธเธเธตเน เธฅเธนเธเธเนเธฒเธเธฐเน€เธเนเธฒเนเธเธงเนเธฒเธกเธตเน€เธ—เธฃเธเน€เธเธญเธฃเนเธเธตเนเธเธ เธกเธตเธญเธธเธเธเธฃเธ“เนเธขเธญเธ”เธเธดเธขเธกเธญเธฐเนเธฃเธเนเธฒเธ เนเธฅเธฐเธฃเธนเนเธ•เนเธญเธ—เธฑเธเธ—เธตเธงเนเธฒเธซเธเนเธฒ 2 เธเธทเธญเธเธทเนเธเธ—เธตเนเธชเธณเธซเธฃเธฑเธเน€เธฅเธทเธญเธเธเธฃเธดเธเธฒเธฃเนเธเธเธเธฃเธดเธเธเธฑเธ',
    bundleLabel: 'เน€เธฃเธดเนเธกเนเธเธเธเธฃเธเนเธเนเธ',
    bundleTitle: 'เน€เธเธฃเธทเนเธญเธ + เน€เธ—เธฃเธเน€เธเธญเธฃเน',
    bundleDescription: 'เน€เธซเธกเธฒเธฐเธเธฑเธเธฅเธนเธเธเนเธฒเธ—เธตเนเธญเธขเธฒเธเนเธซเนเน€เธงเนเธเนเธเธ•เนเธเนเธงเธขเธเธฑเธ” flow เนเธซเนเธเธฃเธ',
    trainerLabel: 'เน€เธฃเธดเนเธกเนเธเธเธขเธทเธ”เธซเธขเธธเนเธ',
    trainerTitle: 'เธเนเธฒเธเน€เธ—เธฃเธเน€เธเธญเธฃเนเธญเธขเนเธฒเธเน€เธ”เธตเธขเธง',
    trainerDescription: 'เน€เธซเธกเธฒเธฐเธเธฑเธเธเธเธ—เธตเนเธกเธตเธญเธธเธเธเธฃเธ“เนเธญเธขเธนเนเนเธฅเนเธงเนเธฅเธฐเธ•เนเธญเธเธเธฒเธฃเนเธเนเนเธเนเธ',
  },
}

const defaultTrainerPayload = {
  name: 'New Coach',
  image: '/images/trainer-pim.svg',
  specialty: 'Personalized coaching',
  sessionRate: 1800,
  availability: 'Onsite / Online',
  summary: 'เน€เธเธดเนเธกเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเธญเธเนเธเนเธเธเธเธเธตเนเนเธ”เนเธเธฒเธเธเธฑเนเธ admin',
  scheduleWindow: 'Sunday - Saturday 08:00 - 17:00',
  machineFocus: ['Pilates Reformer'],
  exerciseFocus: ['Private training'],
  weeklySchedule: [],
}

const defaultEquipmentPayload = {
  name: 'New Equipment',
  image: '/images/equipment-reformer.svg',
  badge: 'เน€เธเธดเนเธกเธเนเธญเธกเธนเธฅเนเธ”เนเธเธฒเธ admin',
  monthlyRate: 9900,
  trainerMode: 'optional',
  summary: 'เนเธชเนเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เธเธญเธเธญเธธเธเธเธฃเธ“เนเธเธดเนเธเธเธตเนเนเธ”เนเธเธฒเธเธเธฑเนเธ admin',
  idealFor: 'เธฅเธนเธเธเนเธฒเธ—เธตเนเธ•เนเธญเธเธเธฒเธฃเธญเธธเธเธเธฃเธ“เนเนเธซเธกเนเนเธเธฃเธฐเธเธ',
  footprint: 'เธเธณเธซเธเธ”เธเธทเนเธเธ—เธตเนเนเธเนเธเธฒเธ',
  features: ['เน€เธเธดเนเธก feature เนเธ”เน', 'เนเธเนเนเธเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เนเธ”เน'],
}

function useSiteCatalogState() {
  const [equipmentCatalog, setEquipmentCatalog] = useState([])
  const [trainerCatalog, setTrainerCatalog] = useState([])
  const [rentalPlanCatalog, setRentalPlanCatalog] = useState([])
  const [trainerServicePlans, setTrainerServicePlans] = useState([])
  const [homePageContent, setHomePageContent] = useState(null)
  const [pendingTrainerApplications, setPendingTrainerApplications] = useState([])
  const [trainerClients, setTrainerClients] = useState([])
  const [catalogError, setCatalogError] = useState('')
  const [isCatalogLoading, setIsCatalogLoading] = useState(true)

  const loadBootstrap = async () => {
    setIsCatalogLoading(true)

    try {
      const bootstrap = await fetchCatalogBootstrap()

      setEquipmentCatalog(bootstrap.equipmentCatalog ?? [])
      setTrainerCatalog(bootstrap.trainerCatalog ?? [])
      setRentalPlanCatalog(bootstrap.rentalPlanCatalog ?? [])
      setTrainerServicePlans(bootstrap.trainerServicePlans ?? [])
      setHomePageContent(
        bootstrap.homePageContent
          ? cloneData(bootstrap.homePageContent)
          : cloneData(initialHomePageContent),
      )
      setCatalogError('')

      return bootstrap
    } catch (error) {
      setEquipmentCatalog([])
      setTrainerCatalog([])
      setRentalPlanCatalog([])
      setTrainerServicePlans([])
      setHomePageContent(null)
      setPendingTrainerApplications([])
      setTrainerClients([])
      setCatalogError(
        error instanceof Error ? error.message : 'เนเธซเธฅเธ”เธเนเธญเธกเธนเธฅเธเธฒเธ API เนเธกเนเธชเธณเน€เธฃเนเธ',
      )
      return null
    } finally {
      setIsCatalogLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadBootstrap()
  }, [])

  const loadPendingApplications = async (token) => {
    if (!token) {
      setPendingTrainerApplications([])
      return []
    }

    try {
      const response = await fetchPendingTrainerApplications(token)
      setPendingTrainerApplications(response.items ?? [])
      return response.items ?? []
    } catch {
      setPendingTrainerApplications([])
      return []
    }
  }

  const loadTrainerClients = async (token) => {
    if (!token) {
      setTrainerClients([])
      return []
    }

    try {
      const response = await fetchTrainerClients(token)
      setTrainerClients(response.items ?? [])
      return response.items ?? []
    } catch {
      setTrainerClients([])
      return []
    }
  }

  const addTrainer = async (token) => {
    const trainer = await createTrainerApi(token, defaultTrainerPayload)
    await loadBootstrap()
    return trainer.id
  }

  const updateTrainer = async (token, trainerId, updates) => {
    const currentTrainer = trainerCatalog.find((trainer) => trainer.id === trainerId)
    if (!currentTrainer) {
      return
    }

    await updateTrainerApi(token, trainerId, {
      ...currentTrainer,
      ...updates,
    })
    await loadBootstrap()
  }

  const removeTrainer = async (token, trainerId) => {
    await deleteTrainerApi(token, trainerId)
    await loadBootstrap()
  }

  const addEquipment = async (token) => {
    const equipment = await createEquipmentApi(token, defaultEquipmentPayload)
    await loadBootstrap()
    return equipment.id
  }

  const updateEquipment = async (token, equipmentId, updates) => {
    const currentEquipment = equipmentCatalog.find(
      (equipment) => equipment.id === equipmentId,
    )
    if (!currentEquipment) {
      return
    }

    await updateEquipmentApi(token, equipmentId, {
      ...currentEquipment,
      ...updates,
    })
    await loadBootstrap()
  }

  const removeEquipment = async (token, equipmentId) => {
    await deleteEquipmentApi(token, equipmentId)
    await loadBootstrap()
  }

  const approveTrainerApplication = async (token, applicationId) => {
    await approveTrainerApplicationApi(token, applicationId)
    await Promise.all([loadBootstrap(), loadPendingApplications(token)])
  }

  const rejectTrainerApplication = async (token, applicationId) => {
    await rejectTrainerApplicationApi(token, applicationId)
    await loadPendingApplications(token)
  }

  const updateHomePageContent = async (token, nextContent) => {
    await saveHomeContentApi(token, nextContent)
    setHomePageContent(cloneData(nextContent))
    await loadBootstrap()
  }

  const homeStats = useMemo(
    () =>
      (homePageContent?.stats ?? []).map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            value: `${trainerCatalog.length} เธเธ`,
          }
        }

        if (index === 1) {
          return {
            ...item,
            value: `${equipmentCatalog.length} เธฃเธธเนเธ`,
          }
        }

        return item
      }),
    [equipmentCatalog.length, homePageContent?.stats, trainerCatalog.length],
  )

  const topRentedCards = useMemo(
    () =>
      (homePageContent?.topRentals?.items ?? [])
        .map((card) => ({
          ...card,
          equipment: equipmentCatalog.find(
            (equipment) => equipment.id === card.equipmentId,
          ),
        }))
        .filter((card) => card.equipment),
    [equipmentCatalog, homePageContent?.topRentals?.items],
  )

  return {
    equipmentCatalog,
    trainerCatalog,
    rentalPlanCatalog,
    trainerServicePlans,
    homePageContent,
    homeStats,
    topRentedCards,
    pendingTrainerApplications,
    trainerClients,
    catalogError,
    isCatalogLoading,
    loadBootstrap,
    loadPendingApplications,
    loadTrainerClients,
    addTrainer,
    updateTrainer,
    removeTrainer,
    addEquipment,
    updateEquipment,
    removeEquipment,
    approveTrainerApplication,
    rejectTrainerApplication,
    updateHomePageContent,
  }
}

export default useSiteCatalogState

