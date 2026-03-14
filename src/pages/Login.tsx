import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { PageLayout } from '../layouts/PageLayout'
import { useAuth } from '../context/AuthContext'
import SceneAuth from '../components/Three/SceneAuth'

export default function Login(): ReactElement {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 20 }
    }
  }

  return (
    <PageLayout>
      <div
        className="min-h-screen py-24 flex items-center justify-center relative overflow-hidden"
        style={{ background: 'var(--color-void)' }}
      >
        <SceneAuth />
        <motion.div
          className="container max-w-md mx-auto px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="mb-8 text-center" variants={itemVariants}>
            <h1 className="mb-2 text-4xl md:text-5xl font-bold text-white">
              Welcome <span className="text-gold">Back</span>
            </h1>
            <p className="text-secondary">Sign in to access your account</p>
          </motion.div>

          {/* Login Form */}
          <motion.div className="void-panel rounded-2xl p-8" variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  className="border border-red-500/30 text-red-400 px-4 py-3 rounded-lg"
                  style={{ background: 'rgba(239, 68, 68, 0.08)' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-void w-full"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-void w-full"
                  placeholder="••••••••"
                />
              </div>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="btn-gold w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: 'var(--color-gold-ghost)' }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2 text-secondary"
                  style={{ background: 'var(--color-void-elevated)' }}
                >
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Signup Link */}
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button type="button" className="btn-ghost-gold w-full">
                  Create Account
                </button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Back to Home */}
          <motion.div className="mt-6 text-center" variants={itemVariants}>
            <Link
              to="/"
              className="text-sm text-secondary hover:text-gold transition-colors"
            >
              &larr; Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  )
}
