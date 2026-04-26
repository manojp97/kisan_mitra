import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

const AI_API = axios.create({
  baseURL: 'http://localhost:8000'
})

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

AI_API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

export { API, AI_API }
export default API
