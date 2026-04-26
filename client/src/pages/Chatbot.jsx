import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

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
      const { data } = await axios.post('http://localhost:8000/chatbot/ask', { question: input })
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">🤖</div>
          <div>
            <h2 className="font-bold text-gray-800">Kisan Chatbot</h2>
            <p className="text-xs text-green-500">● Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ paddingBottom: '140px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'bot' && (
                <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">🤖</div>
              )}
              <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap
                ${msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0">🤖</div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input — fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-2">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => setInput(q)}
                className="text-xs bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full">
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Sawaal poochein..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={loading}
              className="bg-green-600 text-white px-4 py-2.5 rounded-xl disabled:opacity-50 font-semibold">
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}