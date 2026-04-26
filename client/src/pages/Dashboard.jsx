import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const navigate = useNavigate()
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Suprabhat'
    else if (hour < 17) return 'Namaste'
    else return 'Shubh Sandhya'
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: '🌿',
      title: 'Bimari Pata Karo',
      desc: 'Plant ki photo se bimari identify karein',
      path: '/disease',
      gradient: 'from-green-400 to-emerald-600',
      bgLight: 'bg-green-50',
      borderColor: 'border-green-400'
    },
    {
      icon: '🌾',
      title: 'Fasal Sujhav',
      desc: 'Mitti aur mausam ke hisaab se best crop',
      path: '/crops',
      gradient: 'from-amber-400 to-orange-500',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-400'
    },
    {
      icon: '📈',
      title: 'Mandi Bhav',
      desc: 'Aaj ke taaza mandi ke daam dekhein',
      path: '/mandi',
      gradient: 'from-blue-400 to-cyan-500',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-400'
    },
    {
      icon: '🤖',
      title: 'Kisan GPT',
      desc: 'Hindi mein kheti ke sawaal puchein',
      path: '/chatbot',
      gradient: 'from-purple-400 to-violet-500',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-400'
    },
    {
      icon: '🌦️',
      title: 'Mausam Jaankari',
      desc: 'Apne khet ka mausam aur advisory',
      path: '/weather',
      gradient: 'from-sky-400 to-blue-500',
      bgLight: 'bg-sky-50',
      borderColor: 'border-sky-400'
    },
  ]

  const tips = [
    'Fasal mein sinchaii subah ya shaam ko karein — garmi mein paani jaldi udate hai',
    'Gehun ki kheti ke liye domat mitti sabse best hoti hai',
    'Tamatar mein late blight se bachne ke liye copper fungicide ka prayog karein',
    'Soyabean ki buaai June-July mein karein sabse accha hota hai',
    'Khet mein crop rotation karein — mitti ki urja bani rahti hai',
  ]

  const todayTip = tips[new Date().getDate() % tips.length]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 pb-24 sm:pb-8">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1b5e20] via-[#2e7d32] to-[#388e3c] text-white px-4 pt-4 pb-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-2xl mx-auto">
          {/* Greeting */}
          <div className="animate-fade-in-up">
            <p className="text-green-200 text-sm font-medium">{greeting} 🌅</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">{user?.name} Ji! 🙏</h2>
            <p className="text-green-200 text-sm mt-1">Aaj kya jaanna chahte hain?</p>
          </div>

          {/* Time & Date */}
          <div className="mt-4 flex items-center gap-3 text-sm text-green-100">
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              📅 {currentTime.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              🕐 {currentTime.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-5">
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div
              key={f.path}
              onClick={() => navigate(f.path)}
              className={`group relative bg-white rounded-2xl p-4 shadow-sm border-b-4 ${f.borderColor} cursor-pointer
                transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl
                shadow-md group-hover:scale-110 transition-transform duration-300 mb-3`}>
                {f.icon}
              </div>

              <h3 className="font-bold text-sm text-gray-800 leading-tight">{f.title}</h3>
              <p className="text-gray-500 text-xs mt-1 leading-tight">{f.desc}</p>

              {/* Arrow indicator */}
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-gray-400 text-xs">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Tip Card */}
        <div className="mt-4 bg-gradient-to-r from-[#fff8e1] to-[#ffecb3] rounded-2xl p-5 border border-amber-200 animate-fade-in-up stagger-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-lg flex-shrink-0 animate-bounce-soft">
              💡
            </div>
            <div>
              <h3 className="font-bold text-amber-800 text-sm">Aaj ka Kisan Tip</h3>
              <p className="text-amber-700 text-xs mt-1 leading-relaxed">{todayTip}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats / Info */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-green-100">
            <div className="text-xl mb-1">🌱</div>
            <p className="text-xs text-gray-500">Kharif Season</p>
            <p className="text-xs font-bold text-green-700">Active</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-blue-100">
            <div className="text-xl mb-1">💧</div>
            <p className="text-xs text-gray-500">Sinchai</p>
            <p className="text-xs font-bold text-blue-700">Morning</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-amber-100">
            <div className="text-xl mb-1">🌡️</div>
            <p className="text-xs text-gray-500">Temp</p>
            <p className="text-xs font-bold text-amber-700">32°C</p>
          </div>
        </div>
      </div>
    </div>
  )
}

