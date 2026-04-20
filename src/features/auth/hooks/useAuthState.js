import { useEffect, useState } from 'react'
import {
  fetchCurrentUser,
  loginWithApi,
  logoutWithApi,
  registerWithApi,
} from '../../../lib/api'

const SESSION_STORAGE_KEY = 'pilatesreformer.authToken'

const roleCatalog = [
  {
    id: 'user',
    label: 'ผู้ใช้งาน',
    subtitle: 'ลูกค้าที่เข้ามาเช่าเครื่องหรือจ้างเทรนเนอร์',
    accent: 'bg-[#f5e8d8] text-[#9b5d32]',
    demoEmail: 'user@reformrental.com',
  },
  {
    id: 'trainer',
    label: 'เทรนเนอร์',
    subtitle: 'โค้ชที่ต้องการดูคิวงานและรายชื่อลูกค้าของตัวเอง',
    accent: 'bg-[#e7f4ef] text-[#123a35]',
    demoEmail: 'trainer@reformrental.com',
  },
  {
    id: 'admin',
    label: 'admin',
    subtitle: 'ผู้ดูแลระบบที่จัดการอุปกรณ์ เทรนเนอร์ และคำสั่งจอง',
    accent: 'bg-[#e8ecff] text-[#3344a8]',
    demoEmail: 'admin@reformrental.com',
  },
]

function useAuthState({ trainerCatalog }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState('user')
  const [selectedTrainerLoginId, setSelectedTrainerLoginId] = useState('')
  const [authUser, setAuthUser] = useState(null)
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    return window.localStorage.getItem(SESSION_STORAGE_KEY) ?? ''
  })

  const selectedRole =
    roleCatalog.find((role) => role.id === selectedRoleId) ?? roleCatalog[0]
  const resolvedTrainerLoginId =
    selectedTrainerLoginId || trainerCatalog[0]?.id || ''

  useEffect(() => {
    if (!authToken) {
      return undefined
    }

    let isActive = true

    fetchCurrentUser(authToken)
      .then((response) => {
        if (!isActive) {
          return
        }

        setAuthUser(response.user)
      })
      .catch(() => {
        if (!isActive) {
          return
        }

        setAuthToken('')
        setAuthUser(null)

        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(SESSION_STORAGE_KEY)
        }
      })

    return () => {
      isActive = false
    }
  }, [authToken])

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)

  const login = async ({ email, password, roleId, trainerId }) => {
    try {
      const result = await loginWithApi({
        email,
        password,
        roleId,
        trainerId: trainerId || resolvedTrainerLoginId,
      })

      setAuthUser(result.user)
      setAuthToken(result.token ?? '')
      setSelectedRoleId(result.user.roleId)

      if (result.user.roleId === 'trainer' && result.user.trainerId) {
        setSelectedTrainerLoginId(result.user.trainerId)
      }

      if (typeof window !== 'undefined' && result.token) {
        window.localStorage.setItem(SESSION_STORAGE_KEY, result.token)
      }

      setIsLoginOpen(false)

      return {
        status: 'success',
        user: result.user,
      }
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'เข้าสู่ระบบไม่สำเร็จ',
      }
    }
  }

  const register = async (payload) => {
    try {
      const result = await registerWithApi(payload)

      if (result.token && result.user) {
        setAuthUser(result.user)
        setAuthToken(result.token)
        setSelectedRoleId(result.user.roleId)

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(SESSION_STORAGE_KEY, result.token)
        }

        setIsLoginOpen(false)
      }

      return result
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'สมัครสมาชิกไม่สำเร็จ',
      }
    }
  }

  const logout = async () => {
    const currentToken = authToken

    setAuthUser(null)
    setAuthToken('')
    setSelectedRoleId('user')

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(SESSION_STORAGE_KEY)
    }

    if (!currentToken) {
      return
    }

    try {
      await logoutWithApi(currentToken)
    } catch {
      // noop
    }
  }

  return {
    authUser,
    authToken,
    isLoginOpen,
    selectedRoleId,
    selectedRole,
    selectedTrainerLoginId: resolvedTrainerLoginId,
    roleCatalog,
    openLogin,
    closeLogin,
    setSelectedRoleId,
    setSelectedTrainerLoginId,
    login,
    register,
    logout,
  }
}

export default useAuthState
