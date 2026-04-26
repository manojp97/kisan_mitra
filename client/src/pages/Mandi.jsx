import { useState } from 'react'
import Navbar from '../components/Navbar'

const mandiData = [
  { crop: 'Gehun', price: 2275, unit: 'per quintal', change: '+15', market: 'Meerut', trend: 'up' },
  { crop: 'Dhan (Paddy)', price: 2183, unit: 'per quintal', change: '-8', market: 'Lucknow', trend: 'down' },
  { crop: 'Maize', price: 1962, unit: 'per quintal', change: '+22', market: 'Kanpur', trend: 'up' },
  { crop: 'Sarson', price: 5450, unit: 'per quintal', change: '+40', market: 'Agra', trend: 'up' },
  { crop: 'Soybean', price: 4300, unit: 'per quintal', change: '-12', market: 'Indore', trend: 'down' },
  { crop: 'Arhar Dal', price: 7200, unit: 'per quintal', change: '+30', market: 'Delhi', trend: 'up' },
  { crop: 'Moong Dal', price: 8500, unit: 'per quintal', change: '+55', market: 'Jaipur', trend: 'up' },
  { crop: 'Chana', price: 5600, unit: 'per quintal', change: '-20', market: 'Bhopal', trend: 'down' },
  { crop: 'Bajra', price: 2350, unit: 'per quintal', change: '+10', market: 'Jodhpur', trend: 'up' },
  { crop: 'Groundnut', price: 5800, unit: 'per quintal', change: '+25', market: 'Rajkot', trend: 'up' },
]

const cropEmojis = {
  'Gehun': '🌾', 'Dhan (Paddy)': '🍚', 'Maize': '🌽', 'Sarson': '🌼',
  'Soybean': '🫘', 'Arhar Dal': '🫛', 'Moong Dal': '🟢', 'Chana': '🫘',
  'Bajra': '🌾', 'Groundnut': '🥜'
}

const marketColors = {
  'Meerut': '#ef5350', 'Lucknow': '#ab47bc', 'Kanpur': '#5c6bc0',
  'Agra': '#42a5f5', 'Indore': '#26a69a', 'Delhi': '#ffa726',
  'Jaipur': '#ec407a', 'Bhopal': '#66bb6a', 'Jodhpur': '#ff7043',
  'Rajkot': '#8d6e63'
}

export default function Mandi() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { label: 'Sabhi', value: 'all' },
    { label: '▲ Badhe', value: 'up' },
    { label: '▼ Ghathe', value: 'down' },
  ]

  const filtered = mandiData.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(search.toLowerCase()) ||
      item.market.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'all' || item.trend === activeFilter
    return matchesSearch && matchesFilter
  })

  const totalUp = mandiData.filter(d => d.trend === 'up').length
  const totalDown = mandiData.filter(d => d.trend === 'down').length

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 pb-24 sm:pb-8">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        {/* Header */}
        <div className="mb-5 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-float-slow">
              📈
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800">Mandi Bhav</h2>
              <p className="text-gray-500 text-sm">Aaj ke taaza mandi ke daam</p>
            </div>
          </div>
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4 animate-fade-in-up stagger-1">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📈</span>
              <div>
                <p className="text-xs text-green-600 font-medium">Bhav Badhe</p>
                <p className="text-xl font-bold text-green-700">{totalUp} Fasal</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-4 border border-red-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📉</span>
              <div>
                <p className="text-xs text-red-600 font-medium">Bhav Ghathe</p>
                <p className="text-xl font-bold text-red-700">{totalDown} Fasal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3 animate-fade-in-up stagger-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            className="w-full border-2 border-gray-100 rounded-2xl pl-12 pr-4 py-3.5 text-base focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 bg-white transition-all duration-300"
            placeholder="Fasal ya market search karein..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 animate-fade-in-up stagger-2">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                ${activeFilter === f.value
                  ? 'bg-blue-500 text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Crop List */}
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3 hover:shadow-md hover:scale-[1.01] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Emoji */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: marketColors[item.market] + '15' }}
              >
                {cropEmojis[item.crop] || '🌾'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800 text-sm">{item.crop}</h3>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium text-white"
                    style={{ backgroundColor: marketColors[item.market] }}
                  >
                    {item.market}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-lg text-gray-800">₹{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-1 justify-end">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                    ${item.change.startsWith('+')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {item.change.startsWith('+') ? '▲' : '▼'} ₹{item.change.replace('+', '').replace('-', '')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 animate-fade-in">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-500">Koi result nahi mila</p>
            <p className="text-gray-400 text-sm">Alag keywords se try karein</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-6 px-4 py-3 bg-gray-50 rounded-xl">
          💡 Prices indicative hain. Actual bhav ke liye local mandi se confirm karein.
        </p>
      </div>
    </div>
  )
}

