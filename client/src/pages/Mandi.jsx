import { useState } from 'react'
import Navbar from '../components/Navbar'

const mandiData = [
  { crop: 'Gehun', price: 2275, unit: 'per quintal', change: '+15', market: 'Meerut' },
  { crop: 'Dhan (Paddy)', price: 2183, unit: 'per quintal', change: '-8', market: 'Lucknow' },
  { crop: 'Maize', price: 1962, unit: 'per quintal', change: '+22', market: 'Kanpur' },
  { crop: 'Sarson', price: 5450, unit: 'per quintal', change: '+40', market: 'Agra' },
  { crop: 'Soybean', price: 4300, unit: 'per quintal', change: '-12', market: 'Indore' },
  { crop: 'Arhar Dal', price: 7200, unit: 'per quintal', change: '+30', market: 'Delhi' },
  { crop: 'Moong Dal', price: 8500, unit: 'per quintal', change: '+55', market: 'Jaipur' },
  { crop: 'Chana', price: 5600, unit: 'per quintal', change: '-20', market: 'Bhopal' },
  { crop: 'Bajra', price: 2350, unit: 'per quintal', change: '+10', market: 'Jodhpur' },
  { crop: 'Groundnut', price: 5800, unit: 'per quintal', change: '+25', market: 'Rajkot' },
]

export default function Mandi() {
  const [search, setSearch] = useState('')

  const filtered = mandiData.filter(item =>
    item.crop.toLowerCase().includes(search.toLowerCase()) ||
    item.market.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        <h2 className="text-xl font-bold text-green-700 mb-1">📈 Mandi Prices</h2>
        <p className="text-gray-500 text-sm mb-4">Aaj ke taaza mandi bhav</p>

        <div className="relative mb-4">
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          <input
            className="w-full border rounded-xl pl-9 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            placeholder="Fasal ya market search karein..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{item.crop}</h3>
                <p className="text-xs text-gray-400 mt-0.5">📍 {item.market} Mandi</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">₹{item.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{item.unit}</p>
                <span className={`text-xs font-semibold ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {item.change.startsWith('+') ? '▲' : '▼'} ₹{item.change.replace('+', '').replace('-', '')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5 px-4">
          * Prices indicative hain. Actual bhav ke liye local mandi se confirm karein.
        </p>
      </div>
    </div>
  )
}