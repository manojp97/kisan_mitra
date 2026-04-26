import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const weatherIcons = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️',
  Mist: '🌫️', Haze: '🌫️',
}

const weatherBgGradients = {
  Clear: 'from-amber-50 to-orange-50',
  Clouds: 'from-gray-50 to-slate-100',
  Rain: 'from-blue-50 to-slate-100',
  Drizzle: 'from-cyan-50 to-blue-50',
  Thunderstorm: 'from-purple-50 to-slate-100',
  Snow: 'from-blue-50 to-white',
  Mist: 'from-gray-50 to-white',
  Haze: 'from-orange-50 to-amber-50',
}

export default function Weather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_KEY = '8b5e4a82ade58bb0e63b5a9d5a81327c'

  const getWeather = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError('')

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=hi`
      const { data } = await axios.get(url)
      setWeather(data)
    } catch (err) {
      setError('Shehar nahi mila. Sahi naam likhein.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const getFarmingTip = (temp, condition) => {
    if (condition === 'Rain') return 'Baarish — paani ka dhyan rakhein.'
    if (condition === 'Thunderstorm') return 'Toofan — fasal bachayein!'
    if (temp > 35) return 'Bahut garmi — subah/shaam sinchaii karein.'
    if (temp > 28) return 'Garmi — mulching karein.'
    if (temp > 20) return 'Mausam accha hai.'
    if (temp > 10) return 'Thand — paani kam dein.'
    return 'Zyada thand — pala se bachayein.'
  }

  const bgGradient = weather
    ? (weatherBgGradients[weather.weather[0].main] || 'from-green-50 to-white')
    : 'from-sky-50 to-white'

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradient} pb-24 sm:pb-8`}>
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl">
              🌦️
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-800">Mausam Jaankari</h2>
              <p className="text-gray-500 text-sm">Apne khet ka mausam dekhein</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border-2 border-gray-100 rounded-2xl px-4 py-3"
            placeholder="Shehar likhein... jaise Meerut"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && getWeather()}
          />
          <button
            onClick={getWeather}
            disabled={loading}
            className="bg-blue-500 text-white px-6 rounded-2xl"
          >
            {loading ? '⏳' : 'Dekho'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Weather */}
        {weather && (
          <div>

            <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
              <div className="text-center">
                <div className="text-7xl">
                  {weatherIcons[weather.weather[0].main] || '🌤️'}
                </div>
                <h3 className="text-xl font-bold">{weather.name}</h3>
                <p className="text-5xl font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p>{weather.weather[0].description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center">
                  💧 {weather.main.humidity}%
                </div>
                <div className="text-center">
                  💨 {weather.wind.speed} m/s
                </div>
                <div className="text-center">
                  🌡️ {Math.round(weather.main.feels_like)}°C
                </div>
              </div>

              {/* Extra */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="text-center">
                  Pressure: {weather.main.pressure} hPa
                </div>
                <div className="text-center">
                  Visibility: {(weather.visibility / 1000).toFixed(1)} km
                </div>
              </div>
            </div>

            {/* Tip */}
            <div className="bg-yellow-50 p-4 rounded-2xl">
              💡 {getFarmingTip(weather.main.temp, weather.weather[0].main)}
            </div>

          </div>
        )}

        {/* Empty */}
        {!weather && !error && (
          <div className="text-center p-10">
            🌍 Shehar ka naam likho
          </div>
        )}

      </div>
    </div>
  )
}