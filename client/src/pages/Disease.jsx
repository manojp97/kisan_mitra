import { useState } from 'react'
import Navbar from '../components/Navbar'
import { AI_API } from '../api/axios'

export default function Disease() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult('')
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setResult('')
    }
  }

  const detect = async () => {
    if (!image) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', image)
    try {
      const { data } = await AI_API.post('/disease/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(data.result)
    } catch {
      setResult('Kuch error hua. Thoda wait karein aur dobara try karein.')
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (text) => {
    const lower = text.toLowerCase()
    if (lower.includes('severe') || lower.includes('serious') || lower.includes('critical')) return 'bg-red-50 border-red-300 text-red-700'
    if (lower.includes('moderate') || lower.includes('medium')) return 'bg-amber-50 border-amber-300 text-amber-700'
    return 'bg-green-50 border-green-300 text-green-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-24 sm:pb-8">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-float-slow">
              🌿
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1b5e20]">Bimari Pata Karo</h2>
              <p className="text-gray-500 text-sm">Plant ki photo upload karo — AI bimari identify karega</p>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`relative rounded-3xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 mb-4 overflow-hidden
            ${dragActive
              ? 'border-green-500 bg-green-50 scale-[1.02] shadow-lg'
              : preview
                ? 'border-green-300 bg-white'
                : 'border-green-200 bg-gradient-to-b from-green-50/50 to-white hover:border-green-300 hover:bg-green-50/80'
            }`}
          onClick={() => document.getElementById('imageInput').click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {dragActive && (
            <div className="absolute inset-0 bg-green-100/50 flex items-center justify-center z-10">
              <p className="text-green-700 font-semibold">Photo chhod dein yahan!</p>
            </div>
          )}

          {preview ? (
            <div className="relative">
              <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-2xl object-contain shadow-md" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-4 py-1.5 rounded-full shadow-md">
                ✅ Photo taiyaar hai
              </div>
            </div>
          ) : (
            <div className="py-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center text-4xl mb-4 animate-float-slow shadow-inner">
                📷
              </div>
              <p className="text-gray-600 font-semibold text-base">Photo upload karne ke liye tap karein</p>
              <p className="text-gray-400 text-sm mt-2">Ya photo yahan kheechein</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-1 rounded">JPG</span>
                <span className="bg-gray-100 px-2 py-1 rounded">PNG</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Max 10MB</span>
              </div>
            </div>
          )}
        </div>

        <input id="imageInput" type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImage} />

        {/* Action Buttons */}
        <div className="space-y-3">
          {preview && (
            <button
              onClick={() => {
                setImage(null)
                setPreview(null)
                setResult('')
                setDragActive(false)
              }}
              className="w-full border-2 border-gray-200 text-gray-600 py-3.5 rounded-2xl font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              🗑️ Doosri Photo Chunein
            </button>
          )}

          <button
            onClick={detect}
            disabled={!image || loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
              ${!image || loading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
              }`}
          >
            {loading ? (
              <>
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyze ho raha hai...</span>
              </>
            ) : (
              <>
                🔍 Bimari Pata Karo
              </>
            )}
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className="mt-5 animate-fade-in-up">
            <div className={`rounded-2xl shadow-md p-5 border ${getSeverityColor(result)}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-xl">
                  🏥
                </div>
                <div>
                  <h3 className="font-bold text-lg">Analysis Result</h3>
                  <p className="text-xs opacity-75">AI dwara generate kiya gaya</p>
                </div>
              </div>
              <div className="bg-white/50 rounded-xl p-4">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs opacity-75">
                <span>💡</span>
                <span>Yeh ek AI-based analysis hai. Sahi ilaj ke liye krishi visheshagya se sampark karein.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

