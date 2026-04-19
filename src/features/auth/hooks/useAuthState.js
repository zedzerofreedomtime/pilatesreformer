import { useState } from 'react'

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
  const [selectedTrainerLoginId, setSelectedTrainerLoginId] = useState(
    trainerCatalog[0]?.id ?? '',
  )
  const [authUser, setAuthUser] = useState(null)

  const selectedRole =
    roleCatalog.find((role) => role.id === selectedRoleId) ?? roleCatalog[0]
  const resolvedTrainerLoginId = trainerCatalog.some(
    (trainer) => trainer.id === selectedTrainerLoginId,
  )
    ? selectedTrainerLoginId
    : trainerCatalog[0]?.id ?? ''
  const selectedTrainer =
    trainerCatalog.find((trainer) => trainer.id === resolvedTrainerLoginId) ??
    trainerCatalog[0] ??
    null

  const openLogin = () => setIsLoginOpen(true)
  const closeLogin = () => setIsLoginOpen(false)

  const login = ({ name, email, roleId, trainerId }) => {
    const role = roleCatalog.find((item) => item.id === roleId) ?? roleCatalog[0]

    if (role.id === 'trainer') {
      const trainer =
        trainerCatalog.find((item) => item.id === trainerId) ?? trainerCatalog[0]

      if (!trainer) {
        return
      }

      setAuthUser({
        name: trainer.name,
        email,
        roleId: role.id,
        roleLabel: role.label,
        trainerId: trainer.id,
      })
      setSelectedTrainerLoginId(trainer.id)
      setSelectedRoleId(role.id)
      setIsLoginOpen(false)
      return
    }

    setAuthUser({
      name,
      email,
      roleId: role.id,
      roleLabel: role.label,
    })
    setSelectedRoleId(role.id)
    setIsLoginOpen(false)
  }

  const logout = () => {
    setAuthUser(null)
    setSelectedRoleId('user')
  }

  return {
    authUser,
    isLoginOpen,
    selectedRoleId,
    selectedRole,
    selectedTrainerLoginId: resolvedTrainerLoginId,
    selectedTrainer,
    roleCatalog,
    openLogin,
    closeLogin,
    setSelectedRoleId,
    setSelectedTrainerLoginId,
    login,
    logout,
  }
}

export default useAuthState
