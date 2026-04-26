import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await API.post('/auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch galat hua, dobara try karein')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#388e3c]">
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
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-5xl mb-4 shadow-lg animate-float-slow">
            🌾
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">KisanMitra</h1>
          <p className="text-green-200 text-sm">Aapka Smart Farming Saathi</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md animate-fade-in-up stagger-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#1b5e20]">Welcome Back!</h2>
              <p className="text-gray-500 text-sm mt-1">Apne account mein login karein</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm px-4 py-3 rounded-r-xl mb-5 animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📱 Phone Number
                </label>
                <div className="relative">
                  <input
                    className="input-farmer pl-12"
                    placeholder="10 digit number daalein"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔒 Password
                </label>
                <input
                  className="input-farmer"
                  type="password"
                  placeholder="Apna password daalein"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Login ho raha hai...</span>
                  </>
                ) : (
                  <>
                    <span>🔐</span>
                    <span>Login Karo</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Naya user ho?{' '}
                <Link
                  to="/register"
                  className="text-[#2e7d32] font-bold hover:text-[#1b5e20] transition-colors underline underline-offset-2"
                >
                  Register karo
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-green-200/60 text-xs mt-8 text-center">
          🌱 KisanMitra - Har Kisan Ka Saathi
        </p>
      </div>
    </div>
  )
}

