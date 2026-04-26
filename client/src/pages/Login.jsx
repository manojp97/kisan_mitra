import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.post('/auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Error hua')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Top banner */}
      <div className="bg-green-700 text-white text-center py-8 px-4">
        <div className="text-5xl mb-2">🌾</div>
        <h1 className="text-2xl font-bold">KisanMitra</h1>
        <p className="text-green-200 text-sm mt-1">Smart Farming Assistant</p>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-6">
          <h2 className="text-xl font-bold text-green-700 mb-5">Login Karo</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="10 digit number"
                inputMode="numeric"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="Apna password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 font-semibold text-base"
            >
              Login Karo
            </button>
          </form>

          <p className="text-center text-sm mt-5 text-gray-600">
            Naya user ho?{' '}
            <Link to="/register" className="text-green-600 font-semibold">Register karo</Link>
          </p>
        </div>
      </div>
    </div>
  )
}