import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const features = [
    { icon: '🌿', title: 'Disease Detection', desc: 'Plant ki photo se bimari pata karo', path: '/disease', border: 'border-green-500', bg: 'bg-green-50' },
    { icon: '🌾', title: 'Crop Recommendation', desc: 'Mitti aur season ke hisaab se fasal', path: '/crops', border: 'border-yellow-500', bg: 'bg-yellow-50' },
    { icon: '📈', title: 'Mandi Prices', desc: 'Aaj ke taaza mandi bhav', path: '/mandi', border: 'border-blue-500', bg: 'bg-blue-50' },
    { icon: '🤖', title: 'Kisan Chatbot', desc: 'Hindi mein farming sawaal', path: '/chatbot', border: 'border-purple-500', bg: 'bg-purple-50' },
    { icon: '🌦️', title: 'Weather', desc: 'Apne area ka mausam', path: '/weather', border: 'border-orange-500', bg: 'bg-orange-50' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Welcome banner */}
      <div className="bg-green-700 text-white px-4 py-5">
        <p className="text-green-200 text-sm">Swagat hai,</p>
        <h2 className="text-xl font-bold">{user?.name} Ji! 🙏</h2>
        <p className="text-green-200 text-xs mt-1">Aaj kya jaanna chahte hain?</p>
      </div>

      {/* Feature cards */}
      <div className="px-4 py-5 grid grid-cols-2 gap-3 max-w-2xl mx-auto">
        {features.map((f) => (
          <div
            key={f.path}
            onClick={() => navigate(f.path)}
            className={`${f.bg} rounded-2xl p-4 shadow-sm active:scale-95 cursor-pointer border-b-4 ${f.border} transition-transform`}
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-bold text-sm text-gray-800 leading-tight">{f.title}</h3>
            <p className="text-gray-500 text-xs mt-1 leading-tight">{f.desc}</p>
          </div>
        ))}

        {/* Full width last card agar odd number ho */}
        <div className="col-span-2 bg-green-100 rounded-2xl p-4 text-center border-b-4 border-green-400">
          <p className="text-green-700 text-sm font-medium">🌱 Aaj ka Kisan Tip</p>
          <p className="text-green-600 text-xs mt-1">Fasal mein sinchaii subah ya shaam ko karein — garmi mein paani jaldi udate hai</p>
        </div>
      </div>
    </div>
  )
}