import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAdminBookings } from '../../../lib/api'

const modeLabels = {
  bundle: 'Machine + trainer',
  'equipment-only': 'Equipment only',
  'trainer-only': 'Trainer only',
}

const statusClasses = {
  pending: 'bg-[#fff4e8] text-[#8a4b10]',
  approved: 'bg-[#ecfdf3] text-[#027a48]',
  rejected: 'bg-[#fff3f1] text-[#b42318]',
}

const currencyFormatter = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('th-TH', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const findById = (items, itemId) =>
  items.find((item) => item.id === itemId)?.name ?? '-'

const formatDateTime = (value) => {
  if (!value) {
    return '-'
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return dateFormatter.format(parsedDate)
}

const formatModeLabel = (modeId) => modeLabels[modeId] ?? modeId ?? '-'

const formatStatusLabel = (status) => {
  if (!status) {
    return 'Unknown'
  }

  return status.charAt(0).toUpperCase() + status.slice(1)
}

const sortByLatest = (left, right) => {
  const leftDate = new Date(left.createdAt).getTime()
  const rightDate = new Date(right.createdAt).getTime()
  return rightDate - leftDate
}

function DatabaseManagementPanel({
  token,
  equipmentCatalog,
  trainerCatalog,
  rentalPlanCatalog,
  trainerServicePlans,
  pendingTrainerApplications,
  onRefreshData,
}) {
  const [bookingInquiries, setBookingInquiries] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadBookings = useCallback(async () => {
    if (!token) {
      setBookingInquiries([])
      setErrorMessage('')
      return []
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetchAdminBookings(token)
      const nextItems = response.items ?? []
      setBookingInquiries(nextItems)
      return nextItems
    } catch (error) {
      setBookingInquiries([])
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load booking inquiries.',
      )
      return []
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadBookings()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadBookings])

  const bookingRows = useMemo(
    () =>
      [...bookingInquiries].sort(sortByLatest).map((booking) => ({
        ...booking,
        equipmentName: booking.equipmentId
          ? findById(equipmentCatalog, booking.equipmentId)
          : '-',
        rentalPlanName: booking.rentalPlanId
          ? findById(rentalPlanCatalog, booking.rentalPlanId)
          : '-',
        trainerName: booking.trainerId
          ? findById(trainerCatalog, booking.trainerId)
          : '-',
        trainerServicePlanName: booking.trainerServicePlanId
          ? findById(trainerServicePlans, booking.trainerServicePlanId)
          : '-',
      })),
    [
      bookingInquiries,
      equipmentCatalog,
      rentalPlanCatalog,
      trainerCatalog,
      trainerServicePlans,
    ],
  )

  const summaryCards = useMemo(
    () => [
      {
        label: 'Booking inquiries',
        value: bookingRows.length,
        helper: 'Records sent from the booking flow',
      },
      {
        label: 'Pending trainer approvals',
        value: pendingTrainerApplications.length,
        helper: 'Applications waiting for admin review',
      },
      {
        label: 'Trainer records',
        value: trainerCatalog.length,
        helper: 'Profiles currently visible on the site',
      },
      {
        label: 'Equipment records',
        value: equipmentCatalog.length,
        helper: 'Machines available for rental or bundles',
      },
    ],
    [
      bookingRows.length,
      pendingTrainerApplications.length,
      trainerCatalog.length,
      equipmentCatalog.length,
    ],
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      await Promise.all([
        loadBookings(),
        onRefreshData ? onRefreshData() : Promise.resolve(),
      ])
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <section className="panel p-6 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="eyebrow">Admin / Database</span>
          <h2 className="mt-4 font-display text-4xl text-slate-900">
            Database overview and inquiry monitor
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            This section pulls live data from the API so the admin can quickly
            inspect incoming booking requests, record counts, and the latest
            information that is driving the frontend.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="rounded-full border border-[#d6c4af] bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[#fffaf3] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isRefreshing ? 'Refreshing data...' : 'Refresh database view'}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[24px] border border-[#eadbc8] bg-[#fffaf3] px-5 py-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
              {card.label}
            </p>
            <p className="mt-3 font-display text-4xl text-slate-900">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.helper}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b5d32]">
              Booking inquiries table
            </p>
            <h3 className="mt-3 font-display text-3xl text-slate-900">
              Latest requests from the frontend
            </h3>
          </div>

          <div className="rounded-full bg-[#f7efe4] px-4 py-2 text-sm font-semibold text-slate-700">
            {bookingRows.length} records
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-[22px] border border-[#e3b4ae] bg-[#fff3f1] px-4 py-4 text-sm leading-6 text-[#b42318]">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 rounded-[22px] border border-dashed border-[#d8c8b4] bg-[#fffaf3] px-5 py-6 text-sm leading-6 text-slate-600">
            Loading booking inquiries from the API...
          </div>
        ) : null}

        {!isLoading && bookingRows.length === 0 && !errorMessage ? (
          <div className="mt-6 rounded-[22px] border border-dashed border-[#d8c8b4] bg-[#fffaf3] px-5 py-6 text-sm leading-6 text-slate-600">
            No booking inquiries have been submitted yet.
          </div>
        ) : null}

        {!isLoading && bookingRows.length > 0 ? (
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {bookingRows.map((booking) => (
              <article
                key={booking.id}
                className="rounded-[24px] border border-[#eadbc8] bg-[#fffdf9] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-3xl text-slate-900">
                      {booking.name}
                    </h4>
                    <p className="mt-2 text-sm text-slate-500">
                      {formatDateTime(booking.createdAt)}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      statusClasses[booking.status] ??
                      'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {formatStatusLabel(booking.status)}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2">
                  <p>
                    <span className="font-semibold text-slate-900">Mode:</span>{' '}
                    {formatModeLabel(booking.modeId)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Total:</span>{' '}
                    {currencyFormatter.format(booking.grandTotal ?? 0)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Email:</span>{' '}
                    {booking.email}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Phone:</span>{' '}
                    {booking.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Equipment:</span>{' '}
                    {booking.equipmentName}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Rental plan:</span>{' '}
                    {booking.rentalPlanName}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Trainer:</span>{' '}
                    {booking.trainerName}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Trainer plan:
                    </span>{' '}
                    {booking.trainerServicePlanName}
                  </p>
                </div>

                <div className="mt-5 rounded-[20px] bg-[#f8f5ef] px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {booking.notes?.trim() ? booking.notes : 'No extra notes'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default DatabaseManagementPanel


