import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Request interceptor - add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  signup: async (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
  }) => {
    const response = await api.post('/auth/signup', data)
    return response.data
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

// User API calls
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  updateProfile: async (data: {
    firstName?: string
    lastName?: string
    company?: string
  }) => {
    const response = await api.put('/users/profile', data)
    return response.data
  },

  getMessages: async () => {
    const response = await api.get('/users/messages')
    return response.data
  },

  getQuotes: async () => {
    const response = await api.get('/users/quotes')
    return response.data
  }
}

// Message API calls
export const messageAPI = {
  create: async (data: {
    name: string
    email: string
    subject: string
    message: string
  }) => {
    const response = await api.post('/messages', data)
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/messages/${id}`)
    return response.data
  }
}

// Quote API calls
export const quoteAPI = {
  create: async (data: {
    name: string
    email: string
    company?: string
    projectDescription: string
    budgetRange?: string
    timeline?: string
  }) => {
    const response = await api.post('/quotes', data)
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/quotes/${id}`)
    return response.data
  }
}

// Admin API calls (role-protected)
export const adminAPI = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  getUsers: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },

  getMessages: async () => {
    const response = await api.get('/admin/messages')
    return response.data
  },

  updateQuoteStatus: async (
    id: string,
    data: {
      status: string
      adminNotes?: string
      adminResponse?: string
    }
  ) => {
    const response = await api.patch(`/admin/quotes/${id}`, data)
    return response.data
  }
}

export default api
