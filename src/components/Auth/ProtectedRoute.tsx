import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

interface ProtectedRouteProps {
  children: ReactElement
  requiredRole?: 'admin' | 'client'
}

export default function ProtectedRoute({
  children,
  requiredRole
}: ProtectedRouteProps): ReactElement {
  const { isAuthenticated, isLoading, user } = useAuth()

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </motion.div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Check role if required
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <motion.div
          className="text-center surface-elevated rounded-2xl p-12 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">Access Denied</h1>
          <p className="text-text-secondary mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-xl gradient-primary text-white font-bold"
          >
            Go Home
          </a>
        </motion.div>
      </div>
    )
  }

  return children
}
