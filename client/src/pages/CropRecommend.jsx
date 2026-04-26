import { useState } from 'react'
import Navbar from '../components/Navbar'
import { AI_API } from '../api/axios'

export default function CropRecommend() {
  const [form, setForm] = useState({ soilType: '', season: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const recommend = async () => {
    if (!form.soilType || !form.season) return
    setLoading(true)
    try {
      const { data } = await AI_API.post('/crop/recommend', form)
      setResult(data)
    } catch {
      alert('Kuch error hua.')
    } finally {
      setLoading(false)
    }
  }

  const soilOptions = [
    { value: 'loamy', label: 'Domat (Loamy)', emoji: '🟤', color: '#8d6e63', desc: 'Sabse acchi mitti' },
    { value: 'black', label: 'Kali Mitti (Black)', emoji: '⚫', color: '#424242', desc: 'Cotton, wheat ke liye' },
    { value: 'sandy', label: 'Baluyi (Sandy)', emoji: '🟡', color: '#d4a373', desc: 'Sinchaii ki zaroorat' },
    { value: 'clay', label: 'Chikni (Clay)', emoji: '🔴', color: '#a1887f', desc: 'Dhaan ke liye best' },
    { value: 'red', label: 'Lal Mitti (Red)', emoji: '🟠', color: '#bf360c', desc: 'Groundnut, dal ke liye' },
  ]

  const seasonOptions = [
    { value: 'summer', label: 'Garmi', emoji: '☀️', color: '#ef6c00', desc: 'March - June' },
    { value: 'winter', label: 'Sardi', emoji: '❄️', color: '#0288d1', desc: 'October - February' },
    { value: 'monsoon', label: 'Barsaat', emoji: '🌧️', color: '#388e3c', desc: 'July - September' },
  ]

  const cropEmojis = {
    wheat: '🌾', rice: '🍚', maize: '🌽', cotton: '🧶',
    sugarcane: '🎋', soybean: '🫘', groundnut: '🥜',
    mustard: '🌼', pulses: '🫛', bajra: '🌾', jowar: '🌾',
    turmeric: '🟡', potato: '🥔', tomato: '🍅', onion: '🧅'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/30 to-white pb-24 sm:pb-8">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-float-slow">
              🌾
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#5d4037]">Fasal Sujhav</h2>
              <p className="text-gray-500 text-sm">Apni mitti aur mausam chunein — best crop batayenge</p>
            </div>
          </div>
        </div>

        {/* Selection Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-md p-5 space-y-6 animate-fade-in-up border border-amber-100">

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              🌱 Mitti ka Prakar Chunein
            </label>

            <div className="grid grid-cols-1 gap-2">
              {soilOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm({ ...form, soilType: opt.value })}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                  ${form.soilType === opt.value
                      ? 'border-amber-500 bg-amber-50 shadow-md scale-[1.02]'
                      : 'border-gray-100 bg-gray-50 hover:border-amber-200 hover:bg-amber-50/50'
                    }`}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl transition-transform duration-300"
                    style={{ backgroundColor: form.soilType === opt.value ? opt.color + '30' : opt.color + '15' }}
                  >
                    {opt.emoji}
                  </div>

                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.desc}</p>
                  </div>

                  {form.soilType === opt.value && (
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              🗓️ Season Chunein
            </label>

            <div className="grid grid-cols-3 gap-3">
              {seasonOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm({ ...form, season: opt.value })}
                  className={`flex flex-col items-center py-4 px-2 rounded-xl border-2 transition-all duration-300
                    ${form.season === opt.value
                      ? 'border-green-500 bg-green-50 shadow-md scale-[1.05]'
                      : 'border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/50'
                    }`}
                >
                  <span className="text-2xl mb-1">{opt.emoji}</span>
                  <p className="text-xs font-semibold">{opt.label}</p>
                  <p className="text-[10px] text-gray-400">{opt.desc}</p>
                  {form.season === opt.value && (
                    <div className="mt-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px]">
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Summary */}
          {(form.soilType || form.season) && (
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 animate-fade-in">
              <p className="text-xs text-amber-700 font-medium">
                {form.soilType && form.season
                  ? `✅ ${soilOptions.find(s => s.value === form.soilType)?.label} + ${seasonOptions.find(s => s.value === form.season)?.label} — Ready!`
                  : form.soilType
                    ? `🌱 Mitti: ${soilOptions.find(s => s.value === form.soilType)?.label} — Ab season chunein`
                    : `🗓️ Season: ${seasonOptions.find(s => s.value === form.season)?.label} — Ab mitti chunein`
                }
              </p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={recommend}
            disabled={!form.soilType || !form.season || loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
              ${!form.soilType || !form.season || loading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
              }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sujhav aa raha hai...</span>
              </>
            ) : (
              <>
                <span>🌱</span>
                <span>Best Fasal Batao</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-6 animate-fade-in-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-green-100">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-md">
                  🏆
                </div>
                <div>
                  <h3 className="font-bold text-green-800 text-lg">Aapke liye Best Crops</h3>
                  <p className="text-xs text-gray-400">AI dwara analyze kiya gaya</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {result.recommendedCrops?.map((crop, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl text-center border border-green-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="text-4xl mb-2 animate-float-slow">
                      {cropEmojis[crop.toLowerCase()] || '🌱'}
                    </div>
                    <p className="font-bold text-green-800">{crop}</p>
                    <p className="text-[10px] text-green-600 mt-1">Best yield potential</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2">
                <span className="text-lg">💡</span>
                <p className="text-sm text-amber-700 leading-relaxed">
                  Sahi irrigation aur fertilizer ka dhyan rakhein. Apni local krishi kendra se beej aur khad ki quality check karein.
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

