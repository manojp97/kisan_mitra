import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function CropRecommend() {
  const [form, setForm] = useState({ soilType: '', season: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const recommend = async () => {
    if (!form.soilType || !form.season) return
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:8000/crop/recommend', form)
      setResult(data)
    } catch {
      alert('Kuch error hua.')
    } finally {
      setLoading(false)
    }
  }

  const soilOptions = [
    { value: 'loamy', label: '🟤 Domat (Loamy)' },
    { value: 'black', label: '⚫ Kali Mitti (Black)' },
    { value: 'sandy', label: '🟡 Baluyi (Sandy)' },
    { value: 'clay', label: '🔴 Chikni (Clay)' },
    { value: 'red', label: '🟠 Lal Mitti (Red)' },
  ]

  const seasonOptions = [
    { value: 'summer', label: '☀️ Garmi (Summer)' },
    { value: 'winter', label: '❄️ Sardi (Winter)' },
    { value: 'monsoon', label: '🌧️ Barsaat (Monsoon)' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        <h2 className="text-xl font-bold text-green-700 mb-1">🌾 Crop Recommendation</h2>
        <p className="text-gray-500 text-sm mb-5">Apni mitti aur season chunein</p>

        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5">
          {/* Soil type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mitti ka Prakar</label>
            <div className="grid grid-cols-1 gap-2">
              {soilOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm({ ...form, soilType: opt.value })}
                  className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition
                    ${form.soilType === opt.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-700'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Season</label>
            <div className="grid grid-cols-3 gap-2">
              {seasonOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm({ ...form, season: opt.value })}
                  className={`py-3 rounded-xl border-2 text-xs font-medium transition
                    ${form.season === opt.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-700'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={recommend}
            disabled={!form.soilType || !form.season || loading}
            className="w-full bg-green-600 text-white py-3.5 rounded-xl disabled:opacity-50 font-bold text-base"
          >
            {loading ? '⏳ Dekh raha hoon...' : '🌱 Fasal Batao'}
          </button>
        </div>

        {result && (
          <div className="mt-4 bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-green-700 mb-3">✅ Aapke liye Best Crops:</h3>
            <div className="grid grid-cols-3 gap-3">
              {result.recommendedCrops.map((crop, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🌱</div>
                  <p className="font-semibold text-green-700 text-xs">{crop}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              {form.soilType} mitti | {form.season} season
            </p>
          </div>
        )}
      </div>
    </div>
  )
}