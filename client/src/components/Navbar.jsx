import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user'))
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const navItems = [
    { label: '🌿 Disease', path: '/disease' },
    { label: '🌾 Crops', path: '/crops' },
    { label: '📈 Mandi', path: '/mandi' },
    { label: '🤖 Chatbot', path: '/chatbot' },
    { label: '🌦️ Weather', path: '/weather' },
  ]

  const handleNav = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <nav className="bg-green-700 text-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
          🌾 KisanMitra
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-sm hidden sm:block">Namaste, {user?.name}!</span>
          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 p-1"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-3 flex flex-col gap-1 border-t border-green-600 pt-3">
          <p className="text-sm text-green-200 mb-1">Namaste, {user?.name}!</p>
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition
                ${location.pathname === item.path
                  ? 'bg-white text-green-700'
                  : 'hover:bg-green-600'
                }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={logout}
            className="text-left px-3 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 mt-1"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  )
}