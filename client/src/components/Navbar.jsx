import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const navItems = [
    { label: 'Home', icon: '🏠', path: '/dashboard' },
    { label: 'Disease', icon: '🌿', path: '/disease' },
    { label: 'Crops', icon: '🌾', path: '/crops' },
    { label: 'Mandi', icon: '📈', path: '/mandi' },
    { label: 'Chat', icon: '🤖', path: '/chatbot' },
    { label: 'Weather', icon: '🌦️', path: '/weather' },
  ]

  const bottomNavItems = [
    { label: 'Home', icon: '🏠', path: '/dashboard' },
    { label: 'Disease', icon: '🌿', path: '/disease' },
    { label: 'Crops', icon: '🌾', path: '/crops' },
    { label: 'Mandi', icon: '📈', path: '/mandi' },
    { label: 'Chat', icon: '🤖', path: '/chatbot' },
    { label: 'Weather', icon: '🌦️', path: '/weather' },
  ]

  const handleNav = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#388e3c] shadow-lg'
            : 'bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#388e3c]'
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/dashboard')}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl backdrop-blur-sm group-hover:bg-white/30 transition-all">
                🌾
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">
                  KisanMitra
                </h1>
                <p className="text-[10px] text-green-200 leading-tight">
                  Smart Farming
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* User greeting - desktop */}
              <span className="hidden sm:block text-sm text-green-100">
                Namaste, <span className="font-semibold text-white">{user?.name}</span>!
              </span>

              {/* Hamburger button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
                aria-label="Menu"
              >
                <div className="flex flex-col gap-1.5 w-5">
                  <span
                    className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                      menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                      menuOpen ? 'opacity-0 -translate-x-2' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${
                      menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="max-w-2xl mx-auto px-4 pb-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 space-y-1">
              {/* Mobile user greeting */}
              <p className="text-sm text-green-100 px-3 py-2 sm:hidden">
                Namaste, <span className="font-semibold text-white">{user?.name}</span>!
              </p>
              <div className="h-px bg-white/10 sm:hidden" />

              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-white text-green-700 shadow-md'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <span className="ml-auto text-green-500">●</span>
                  )}
                </button>
              ))}

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-200 hover:bg-red-500/20 transition-all duration-200"
              >
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Tab Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden pb-safe">
        <div className="bg-white/90 backdrop-blur-lg border-t border-green-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-around py-1">
            {bottomNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-green-700'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="text-lg relative">
                  {item.icon}
                  {isActive(item.path) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}

