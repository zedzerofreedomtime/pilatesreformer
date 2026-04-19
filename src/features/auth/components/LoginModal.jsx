import { useEffect, useState } from 'react'

function TrainerSelector({
  trainerCatalog,
  selectedTrainerLoginId,
  onTrainerLoginChange,
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-700">
        เลือกเทรนเนอร์ที่ต้องการเข้าสู่ระบบ
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {trainerCatalog.map((trainer) => {
          const isSelected = trainer.id === selectedTrainerLoginId

          return (
            <button
              key={trainer.id}
              type="button"
              onClick={() => onTrainerLoginChange(trainer.id)}
              className={`rounded-[24px] border p-4 text-left transition ${
                isSelected
                  ? 'border-[#123a35] bg-[#123a35] text-white shadow-[0_18px_40px_-24px_rgba(18,58,53,0.82)]'
                  : 'border-[#eadbc8] bg-white hover:border-[#d6c4af] hover:bg-[#fffaf3]'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-14 w-14 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-2xl">{trainer.name}</p>
                  <p className={`mt-1 text-sm ${isSelected ? 'text-white/75' : 'text-slate-500'}`}>
                    {trainer.availability}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ModeSwitch({ authMode, onModeChange }) {
  return (
    <div className="inline-flex rounded-full border border-[#eadbc8] bg-white p-1">
      {[
        { id: 'login', label: 'เข้าสู่ระบบ' },
        { id: 'register', label: 'สมัครสมาชิก' },
      ].map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onModeChange(item.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            authMode === item.id
              ? 'bg-[#123a35] text-white'
              : 'text-slate-600 hover:bg-[#f7efe4]'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function LoginForm({
  selectedRoleId,
  selectedRole,
  selectedTrainer,
  selectedTrainerLoginId,
  trainerCatalog,
  onClose,
  onLogin,
  onTrainerLoginChange,
  onSwitchToRegister,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState(selectedRole.demoEmail)
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    onLogin({
      name:
        selectedRoleId === 'trainer'
          ? selectedTrainer?.name ?? selectedRole.label
          : name.trim() || selectedRole.label,
      email: email.trim() || selectedRole.demoEmail,
      roleId: selectedRoleId,
      trainerId: selectedTrainerLoginId,
    })
  }

  return (
    <section className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${selectedRole.accent}`}>
          {selectedRole.label}
        </span>
        <span className="rounded-full bg-[#f7efe4] px-3 py-1.5 text-xs font-semibold text-slate-600">
          ไม่บังคับ login
        </span>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        {selectedRoleId === 'trainer' ? (
          <TrainerSelector
            trainerCatalog={trainerCatalog}
            selectedTrainerLoginId={selectedTrainerLoginId}
            onTrainerLoginChange={onTrainerLoginChange}
          />
        ) : (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">ชื่อที่แสดง</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={`เช่น ${selectedRole.label}`}
              className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
            />
          </label>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">อีเมล</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={selectedRole.demoEmail}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">รหัสผ่าน</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="กรอกรหัสผ่าน"
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
          />
        </label>

        <div className="rounded-[22px] bg-[#f7efe4] px-4 py-3 text-sm leading-6 text-slate-600">
          {selectedRoleId === 'trainer' && selectedTrainer ? (
            <>
              เข้าสู่ระบบเป็น <span className="font-semibold text-slate-900">{selectedTrainer.name}</span>{' '}
              เพื่อดูรายชื่อลูกค้าที่เทรนเนอร์คนนี้รับผิดชอบ
            </>
          ) : (
            <>
              บัญชีตัวอย่างสำหรับ role นี้:{' '}
              <span className="font-semibold text-slate-900">{selectedRole.demoEmail}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
          >
            Login เป็น {selectedRoleId === 'trainer' && selectedTrainer ? selectedTrainer.name : selectedRole.label}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
          >
            ปิด
          </button>
        </div>
      </form>

      <div className="mt-6 rounded-[22px] border border-dashed border-[#eadbc8] bg-[#fffaf3] px-4 py-4 text-sm text-slate-600">
        ยังไม่มีบัญชีใช่ไหม?
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="ml-2 font-semibold text-[#9b5d32] underline-offset-2 transition hover:underline"
        >
          สมัครสมาชิก
        </button>
      </div>
    </section>
  )
}

function RegisterForm({
  selectedRole,
  selectedRoleId,
  onClose,
  onRegister,
  onSwitchToLogin,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [machineFocus, setMachineFocus] = useState('')
  const [notice, setNotice] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = onRegister({
      roleId: selectedRoleId,
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      specialty: specialty.trim(),
      machineFocus: machineFocus
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })

    if (!result) {
      return
    }

    setNotice({
      tone: result.status === 'pending' ? 'amber' : 'green',
      message: result.message,
    })

    if (result.status === 'success') {
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setSpecialty('')
      setMachineFocus('')
    }
  }

  return (
    <section className="rounded-[28px] border border-[#eadbc8] bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${selectedRole.accent}`}>
          สมัครแบบ {selectedRole.label}
        </span>
        <span className="rounded-full bg-[#f7efe4] px-3 py-1.5 text-xs font-semibold text-slate-600">
          {selectedRoleId === 'trainer' ? 'รอแอดมินอนุมัติ' : 'สมัครเสร็จเข้าใช้ได้เลย'}
        </span>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            {selectedRoleId === 'trainer' ? 'ชื่อเทรนเนอร์' : 'ชื่อผู้ใช้งาน'}
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={selectedRoleId === 'trainer' ? 'เช่น Coach ใหม่' : 'เช่น ลูกค้าใหม่'}
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
            required
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">อีเมล</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">เบอร์โทร</span>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="08x-xxx-xxxx"
              className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">รหัสผ่าน</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="ตั้งรหัสผ่าน"
            className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
            required
          />
        </label>

        {selectedRoleId === 'trainer' && (
          <>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">ความถนัดหลัก</span>
              <input
                type="text"
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                placeholder="เช่น Pilates Reformer / Rehab / Strength"
                className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">เครื่องที่ถนัด</span>
              <textarea
                value={machineFocus}
                onChange={(event) => setMachineFocus(event.target.value)}
                rows={4}
                placeholder="เช่น Pilates Reformer, Stability Chair"
                className="mt-2 w-full rounded-2xl border border-[#dfcfbc] bg-[#fffdf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123a35]"
                required
              />
              <span className="mt-1 block text-xs text-slate-500">คั่นด้วย comma ถ้ามีหลายเครื่อง</span>
            </label>
          </>
        )}

        <div
          className={`rounded-[22px] px-4 py-3 text-sm leading-6 ${
            selectedRoleId === 'trainer'
              ? 'bg-[#fff4e8] text-[#8a4b10]'
              : 'bg-[#eef8f3] text-[#0f5132]'
          }`}
        >
          {selectedRoleId === 'trainer'
            ? 'สมัครเป็นเทรนเนอร์แล้ว ระบบจะส่งคำขอไปให้แอดมินตรวจสอบและอนุมัติก่อน จึงจะสามารถเข้าสู่ระบบในฐานะเทรนเนอร์ได้'
            : 'สมัครเป็นผู้ใช้งานทั่วไปแล้ว ระบบจะสร้างบัญชีให้และเข้าสู่ระบบให้ทันที'}
        </div>

        {notice && (
          <div
            className={`rounded-[22px] px-4 py-3 text-sm font-medium ${
              notice.tone === 'green'
                ? 'bg-[#eef8f3] text-[#0f5132]'
                : 'bg-[#fff4e8] text-[#8a4b10]'
            }`}
          >
            {notice.message}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-full bg-[#123a35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2824]"
          >
            สมัครสมาชิก
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#9b5d32] hover:text-[#9b5d32]"
          >
            ปิด
          </button>
        </div>
      </form>

      <div className="mt-6 rounded-[22px] border border-dashed border-[#eadbc8] bg-[#fffaf3] px-4 py-4 text-sm text-slate-600">
        มีบัญชีอยู่แล้ว?
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="ml-2 font-semibold text-[#9b5d32] underline-offset-2 transition hover:underline"
        >
          กลับไปเข้าสู่ระบบ
        </button>
      </div>
    </section>
  )
}

function LoginModal({
  isOpen,
  selectedRoleId,
  selectedRole,
  selectedTrainer,
  selectedTrainerLoginId,
  trainerCatalog,
  roleCatalog,
  onRoleChange,
  onTrainerLoginChange,
  onClose,
  onLogin,
  onRegister,
}) {
  const [authMode, setAuthMode] = useState('login')

  const handleModeChange = (nextMode) => {
    setAuthMode(nextMode)

    if (nextMode === 'register' && selectedRoleId === 'admin') {
      onRoleChange('user')
    }
  }

  const handleCloseModal = () => {
    setAuthMode('login')
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setAuthMode('login')
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const visibleRoles =
    authMode === 'register'
      ? roleCatalog.filter((role) => role.id !== 'admin')
      : roleCatalog

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={authMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
      onClick={handleCloseModal}
    >
      <div className="flex min-h-full items-center justify-center py-4">
        <article
          className="flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,#fffdf9_0%,#fff7ef_100%)] shadow-[0_40px_120px_-45px_rgba(15,23,42,0.48)] sm:max-h-[calc(100vh-3rem)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="shrink-0 border-b border-[#efe3d5] bg-[#f7efe4] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">
                  {authMode === 'login' ? 'Optional Login' : 'Member Register'}
                </span>
                <h2 className="mt-4 font-display text-4xl text-slate-900">
                  {authMode === 'login' ? 'เข้าสู่ระบบตามบทบาท' : 'สมัครสมาชิกเพื่อเริ่มใช้งาน'}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {authMode === 'login'
                    ? 'ระบบ login นี้แยกมุมมองของผู้ใช้งาน เทรนเนอร์ และ admin โดยยังไม่บังคับว่าต้อง login ก่อนใช้งานเว็บ'
                    : 'การสมัครสมาชิกเปิดให้ผู้ใช้งานทั่วไปและเทรนเนอร์ ผู้ใช้งานทั่วไปสมัครเสร็จเข้าใช้ได้เลย ส่วนเทรนเนอร์จะเข้าสู่สถานะรอแอดมินอนุมัติ'}
                </p>
                <div className="mt-4">
                  <ModeSwitch authMode={authMode} onModeChange={handleModeChange} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white"
                aria-label="ปิดหน้าต่าง"
              >
                X
              </button>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-6 sm:p-7 lg:grid-cols-[17rem_minmax(0,1fr)]">
            <section className="space-y-3 lg:overflow-y-auto lg:pr-1">
              {visibleRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => onRoleChange(role.id)}
                  className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                    selectedRoleId === role.id
                      ? 'border-[#123a35] bg-[#123a35] text-white shadow-[0_18px_40px_-24px_rgba(18,58,53,0.82)]'
                      : 'border-[#eadbc8] bg-white text-slate-900 hover:border-[#d6c4af] hover:bg-[#fffaf3]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-2xl">{role.label}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        selectedRoleId === role.id ? 'bg-white/12 text-white' : role.accent
                      }`}
                    >
                      {selectedRoleId === role.id ? 'Selected' : 'Role'}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-6 ${
                      selectedRoleId === role.id ? 'text-white/75' : 'text-slate-600'
                    }`}
                  >
                    {role.subtitle}
                  </p>
                </button>
              ))}
            </section>

            <div className="min-h-0 lg:overflow-y-auto lg:pr-1">
              {authMode === 'login' ? (
                <LoginForm
                  key={`login-${selectedRoleId}-${selectedTrainerLoginId}`}
                  selectedRoleId={selectedRoleId}
                  selectedRole={selectedRole}
                  selectedTrainer={selectedTrainer}
                  selectedTrainerLoginId={selectedTrainerLoginId}
                  trainerCatalog={trainerCatalog}
                  onClose={handleCloseModal}
                  onLogin={onLogin}
                  onTrainerLoginChange={onTrainerLoginChange}
                  onSwitchToRegister={() => handleModeChange('register')}
                />
              ) : (
                <RegisterForm
                  key={`register-${selectedRoleId}`}
                  selectedRole={selectedRole}
                  selectedRoleId={selectedRoleId}
                  onClose={handleCloseModal}
                  onRegister={onRegister}
                  onSwitchToLogin={() => handleModeChange('login')}
                />
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default LoginModal
