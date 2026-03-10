import axios from 'axios'
import { clearLoginSession, getAccessToken } from '@/utils/auth'

export const API_V1_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'
export const API_BASE_URL = API_V1_BASE_URL.replace(/\/api\/v1\/?$/, '/api').replace(/\/+$/, '')

export const createApiClient = (baseURL, options = {}) => axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  ...options,
})

const api = createApiClient(API_V1_BASE_URL)

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearLoginSession()
    }
    return Promise.reject(error)
  },
)

export default api
