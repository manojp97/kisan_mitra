import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', phone: '', password: '', location: '', soilType: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await API.post('/auth/register', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch error hua')
    } finally {
      setLoading(false)
    }
  }

  const soilOptions = [
    { value: 'loamy', label: 'Domat (Loamy)', color: '#8d6e63' },
    { value: 'black', label: 'Kali Mitti (Black)', color: '#424242' },
    { value: 'sandy', label: 'Baluyi (Sandy)', color: '#d4a373' },
    { value: 'clay', label: 'Chikni (Clay)', color: '#a1887f' },
    { value: 'red', label: 'Lal Mitti (Red)', color: '#bf360c' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#5d4037] via-[#795548] to-[#8d6e63]">
      {/* Floating leaves background */}
      <div className="floating-leaves">
        <span className="leaf">🍃</span>
        <span className="leaf">🌿</span>
        <span className="leaf">🍂</span>
        <span className="leaf">🌾</span>
        <span className="leaf">🍃</span>
        <span className="leaf">🌿</span>
        <span className="leaf">🍂</span>
        <span className="leaf">🌾</span>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo Section */}
        <div className="text-center mb-6 animate-fade-in-up">
          <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl mb-3 shadow-lg animate-float-slow">
            👨‍🌾
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">KisanMitra</h1>
          <p className="text-orange-200 text-sm">Naya Account Banao</p>
        </div>

        {/* Register Card */}
        <div className="w-full max-w-md animate-fade-in-up stagger-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-[#5d4037]">Join KisanMitra</h2>
              <p className="text-gray-500 text-sm mt-1">Free mein register karein</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-r-xl mb-4 animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  👤 Apna Naam
                </label>
                <input
                  className="input-farmer"
                  placeholder="Poora naam likhein"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  📱 Phone Number
                </label>
                <div className="relative">
                  <input
                    className="input-farmer pl-12"
                    placeholder="10 digit number"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🇮🇳</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  🔒 Password
                </label>
                <input
                  className="input-farmer"
                  type="password"
                  placeholder="Strong password banao (6+ chars)"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  📍 Gaon/Shehar
                </label>
                <input
                  className="input-farmer"
                  placeholder="Apna gaon ya shehar"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>

              {/* Soil Type Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🌱 Mitti ka Prakar
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {soilOptions.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, soilType: opt.value })}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
                        ${form.soilType === opt.value
                          ? 'border-[#5d4037] bg-orange-50 text-[#5d4037] shadow-md'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center"
                        style={{ backgroundColor: form.soilType === opt.value ? opt.color : 'transparent' }}
                      >
                        {form.soilType === opt.value && '✓'}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !form.name || !form.phone || !form.password}
                className="w-full bg-gradient-to-r from-[#5d4037] to-[#8d6e63] text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Ban raha hai...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Register Karo</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-gray-500 text-sm">
                Pehle se account hai?{' '}
                <Link
                  to="/login"
                  className="text-[#795548] font-bold hover:text-[#5d4037] transition-colors underline underline-offset-2"
                >
                  Login karo
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-orange-200/60 text-xs mt-6 text-center">
          🌱 KisanMitra - Har Kisan Ka Saathi
        </p>
      </div>
    </div>
  )
}

