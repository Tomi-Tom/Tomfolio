import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../services/api'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company?: string
  role: 'admin' | 'client'
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
  }) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')

      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await authAPI.getMe()
          setUser(response.user)
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password })

      // Store token and user
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      setUser(response.user)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const signup = async (data: {
    email: string
    password: string
    firstName: string
    lastName: string
    company?: string
  }) => {
    try {
      const response = await authAPI.signup(data)

      // Store token and user
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      setUser(response.user)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed')
    }
  }

  const logout = () => {
    authAPI.logout()
    setUser(null)
  }

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe()
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    refreshUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
