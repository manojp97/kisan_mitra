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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden py-8">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Decorative blurred circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo & Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">KisanMitra</h1>
          <p className="text-gray-500 text-sm mt-1">Naya Account Banao</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create Account</h2>
            <p className="text-gray-500 text-sm mt-1">Free mein register karein</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                placeholder="Apna poora naam"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-gray-500 font-medium text-sm border-r border-gray-300 pr-2">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="w-full pl-16 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                placeholder="6+ characters ka password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                placeholder="Gaon ya shehar ka naam"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
              />
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <div className="grid grid-cols-1 gap-2">
                {soilOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, soilType: opt.value })}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
                      ${form.soilType === opt.value
                        ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{
                        borderColor: form.soilType === opt.value ? opt.color : '#d1d5db',
                        backgroundColor: form.soilType === opt.value ? opt.color : 'transparent'
                      }}
                    >
                      {form.soilType === opt.value && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !form.name || !form.phone || !form.password}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-amber-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Ban raha hai...</span>
                </>
              ) : (
                <span>Register Karo</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">ya</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Pehle se account hai?{' '}
            <Link
              to="/login"
              className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              Login karo
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          KisanMitra — Har Kisan Ka Saathi
        </p>
      </div>
    </div>
  )
}

