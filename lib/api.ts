import axios, { AxiosError, AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Only handle token refresh on client side
    if (typeof window === 'undefined') {
      return Promise.reject(error)
    }

    const originalRequest = error.config as any

    // If error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          // No refresh token, logout user
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
          window.location.href = '/login'
          return Promise.reject(error)
        }

        // Try to refresh token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        })

        const { token, refreshToken: newRefreshToken } = response.data

        // Update tokens
        localStorage.setItem('accessToken', token)
        localStorage.setItem('refreshToken', newRefreshToken)

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Auth API functions
export const authAPI = {
  register: async (data: {
    firstName: string
    lastName: string
    email?: string
    phone?: string
    password: string
    termsAccepted: boolean
    marketingOptIn?: boolean
  }) => {
    try {
      const response = await api.post('/auth/regrister', data)
      return response.data
    } catch (error: any) {
      // Log detailed error for debugging
      console.error('Registration API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      throw error
    }
  },

  login: async (email?: string, phone?: string, password: string = '') => {
    try {
      const response = await api.post('/auth/login', { email, phone, password })
      return response.data
    } catch (error: any) {
      console.error('Login API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      throw error
    }
  },

  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  updateProfile: async (data: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    profilePicture?: string | null
    marketingOptIn?: boolean
  }) => {
    const response = await api.put('/auth/profile', data)
    return response.data
  },

  forgotPassword: async (email?: string, phone?: string) => {
    const response = await api.post('/auth/forgot-password', { email, phone })
    return response.data
  },

  resetPassword: async (resetToken: string, newPassword: string) => {
    const response = await api.post('/auth/reset-password', {
      resetToken,
      newPassword,
    })
    return response.data
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data
  },
}

export default api
