import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const weatherIcons = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️',
  Mist: '🌫️', Haze: '🌫️',
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
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=hi`
      )
      setWeather(data)
    } catch {
      setError('Shehar nahi mila. Sahi naam likhein.')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        <h2 className="text-xl font-bold text-green-700 mb-1">🌦️ Mausam Jaankari</h2>
        <p className="text-gray-500 text-sm mb-5">Apne khet ka mausam dekhein</p>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
            placeholder="Shehar likhein... jaise Meerut"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && getWeather()}
          />
          <button onClick={getWeather} disabled={loading}
            className="bg-green-600 text-white px-5 rounded-xl disabled:opacity-50 font-semibold">
            {loading ? '⏳' : 'Dekho'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {weather && (
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">{weatherIcons[weather.weather[0].main] || '🌤️'}</div>
              <h3 className="text-lg font-bold text-gray-800">{weather.name}</h3>
              <p className="text-5xl font-bold text-green-600 my-2">{Math.round(weather.main.temp)}°C</p>
              <p className="text-gray-500 capitalize text-sm">{weather.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="font-bold text-blue-600">{weather.main.humidity}%</p>
              </div>
              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Wind</p>
                <p className="font-bold text-green-600">{weather.wind.speed} m/s</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">Feels like</p>
                <p className="font-bold text-orange-600">{Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                💡 <strong>Farming Tip:</strong>{' '}
                {weather.main.temp > 35
                  ? 'Bahut garmi — subah ya shaam sinchaii karein.'
                  : weather.main.temp < 10
                  ? 'Thandi — pala se fasal bachayein.'
                  : weather.weather[0].main === 'Rain'
                  ? 'Baarish — khet mein paani ka dhyan rakhein.'
                  : 'Mausam theek hai — kheti ka accha samay!'}
              </p>
            </div>
          </div>
        )}

        {!weather && !error && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="text-5xl mb-3">🌍</div>
            <p className="text-gray-500">Shehar ka naam likhein</p>
            <p className="text-gray-400 text-sm mt-1">Aur mausam dekho!</p>
          </div>
        )}
      </div>
    </div>
  )
}