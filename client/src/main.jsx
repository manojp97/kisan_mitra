import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Preconnect to Google Fonts for faster loading
const linkPreconnect = document.createElement('link')
linkPreconnect.rel = 'preconnect'
linkPreconnect.href = 'https://fonts.googleapis.com'
document.head.appendChild(linkPreconnect)

const linkPreconnect2 = document.createElement('link')
linkPreconnect2.rel = 'preconnect'
linkPreconnect2.href = 'https://fonts.gstatic.com'
linkPreconnect2.crossOrigin = 'anonymous'
document.head.appendChild(linkPreconnect2)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

