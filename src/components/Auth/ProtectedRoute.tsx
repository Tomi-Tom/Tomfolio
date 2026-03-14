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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-void)' }}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}></div>
          <p className="text-secondary">Loading...</p>
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-void)' }}>
        <motion.div
          className="text-center void-panel rounded-2xl p-12 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-secondary mb-6">
            You don't have permission to access this page.
          </p>
          <a
            href="/"
            className="btn-gold rounded-xl"
          >
            Go Home
          </a>
        </motion.div>
      </div>
    )
  }

  return children
}
