import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function Disease() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult('')
  }

  const detect = async () => {
    if (!image) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', image)
    try {
      const { data } = await axios.post('http://localhost:8000/disease/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(data.result)
    } catch {
      setResult('Kuch error hua. Thoda wait karein aur dobara try karein.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-5">
        <h2 className="text-xl font-bold text-green-700 mb-1">🌿 Disease Detection</h2>
        <p className="text-gray-500 text-sm mb-5">Plant ki photo upload karo — AI bimari pata karega</p>

        {/* Upload area */}
        <div
          className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-green-300 p-6 text-center cursor-pointer active:bg-green-50 transition mb-4"
          onClick={() => document.getElementById('imageInput').click()}
        >
          {preview ? (
            <img src={preview} alt="preview" className="max-h-56 mx-auto rounded-xl object-contain" />
          ) : (
            <div>
              <div className="text-5xl mb-3">📷</div>
              <p className="text-gray-600 font-medium">Photo upload karne ke liye tap karein</p>
              <p className="text-gray-400 text-sm mt-1">Camera se bhi le sakte hain</p>
            </div>
          )}
        </div>

        <input id="imageInput" type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImage} />

        {preview && (
          <button
            onClick={() => document.getElementById('imageInput').click()}
            className="w-full border border-green-400 text-green-600 py-2.5 rounded-xl mb-3 font-medium"
          >
            📷 Doosri Photo Chunein
          </button>
        )}

        <button
          onClick={detect}
          disabled={!image || loading}
          className="w-full bg-green-600 text-white py-3.5 rounded-xl disabled:opacity-50 font-bold text-base shadow-sm"
        >
          {loading ? '⏳ Analyze ho raha hai...' : '🔍 Bimari Pata Karo'}
        </button>

        {result && (
          <div className="mt-4 bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span>🔬</span> Analysis Result
            </h3>
            <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}