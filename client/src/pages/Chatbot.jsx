import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { AI_API } from '../api/axios'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Namaste Kisan bhai! 🌾 Kheti se related koi bhi sawaal poochein!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const { data } = await AI_API.post('/chatbot/ask', { question: input })
      setMessages(prev => [...prev, { role: 'bot', text: data.answer }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Thoda wait karein aur dobara try karein.' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    'Gehun mein khad?',
    'Tamatar ki bimari?',
    'Kharif fasal kab?',
    'Mitti ki janch?'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-gray-50 flex flex-col pb-20 sm:pb-0">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm px-4 py-3 border-b border-green-100 flex items-center gap-3 sticky top-16 z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-xl shadow-md animate-pulse">
            🤖
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Kisan GPT</h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-green-600 font-medium">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4" style={{ paddingBottom: '180px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`} style={{ animationDelay: `${i * 0.05}s` }}>
              {msg.role === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0 shadow-md">
                  🤖
                </div>
              )}
              <div className={`px-4 py-3 rounded-2xl max-w-[82%] text-sm whitespace-pre-wrap shadow-sm
                ${msg.role === 'user'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none border border-green-100'
                }`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-sm ml-2 mt-1 flex-shrink-0 shadow-md">
                  👨‍🌾
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0 shadow-md">
                🤖
              </div>
              <div className="bg-white px-5 py-3.5 rounded-2xl rounded-bl-none shadow-sm border border-green-100">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input — sticky above bottom nav on mobile */}
        <div className="sticky bottom-[72px] sm:bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-green-100 px-4 py-3 z-20">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => { setInput(q); sendMessage() }}
                className="text-xs bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-full hover:bg-green-100 hover:border-green-300 transition-all duration-200">
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border-2 border-gray-100 rounded-xl px-4 py-2.5 text-base focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white"
              placeholder="Sawaal poochein..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={loading}
              className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-5 py-2.5 rounded-xl disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95">
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

