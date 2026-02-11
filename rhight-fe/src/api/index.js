import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 추후 인터셉터 추가
// api.interceptors.request.use(config => { ... })
// api.interceptors.response.use(response => { ... }, error => { ... })

export default api
