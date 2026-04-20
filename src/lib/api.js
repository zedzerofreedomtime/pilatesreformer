const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1'

async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const headers = {
    Accept: 'application/json',
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed')
  }

  return data
}

export const fetchCatalogBootstrap = () => apiRequest('/catalog/bootstrap')
export const loginWithApi = (payload) =>
  apiRequest('/auth/login', { method: 'POST', body: payload })
export const registerWithApi = (payload) =>
  apiRequest('/auth/register', { method: 'POST', body: payload })
export const fetchCurrentUser = (token) => apiRequest('/auth/me', { token })
export const logoutWithApi = (token) =>
  apiRequest('/auth/logout', { method: 'POST', token })

export const fetchTrainerClients = (token) =>
  apiRequest('/trainer/clients', { token })

export const fetchPendingTrainerApplications = (token) =>
  apiRequest('/admin/trainer-applications', { token })
export const fetchAdminBookings = (token) =>
  apiRequest('/admin/bookings', { token })
export const approveTrainerApplication = (token, applicationId) =>
  apiRequest(`/admin/trainer-applications/${applicationId}/approve`, {
    method: 'POST',
    token,
  })
export const rejectTrainerApplication = (token, applicationId) =>
  apiRequest(`/admin/trainer-applications/${applicationId}/reject`, {
    method: 'POST',
    token,
  })

export const createTrainer = (token, payload) =>
  apiRequest('/admin/trainers', { method: 'POST', token, body: payload })
export const updateTrainer = (token, trainerId, payload) =>
  apiRequest(`/admin/trainers/${trainerId}`, {
    method: 'PUT',
    token,
    body: payload,
  })
export const deleteTrainer = (token, trainerId) =>
  apiRequest(`/admin/trainers/${trainerId}`, {
    method: 'DELETE',
    token,
  })

export const createEquipment = (token, payload) =>
  apiRequest('/admin/equipment', { method: 'POST', token, body: payload })
export const updateEquipment = (token, equipmentId, payload) =>
  apiRequest(`/admin/equipment/${equipmentId}`, {
    method: 'PUT',
    token,
    body: payload,
  })
export const deleteEquipment = (token, equipmentId) =>
  apiRequest(`/admin/equipment/${equipmentId}`, {
    method: 'DELETE',
    token,
  })

export const saveHomeContent = (token, payload) =>
  apiRequest('/admin/home-content', {
    method: 'PUT',
    token,
    body: payload,
  })

export const quoteBooking = (payload) =>
  apiRequest('/bookings/quote', { method: 'POST', body: payload })
export const createBookingInquiry = (payload) =>
  apiRequest('/bookings/inquiries', { method: 'POST', body: payload })
