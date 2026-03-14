import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { PageLayout } from '../layouts/PageLayout'
import { useAuth } from '../context/AuthContext'
import SceneAuth from '../components/Three/SceneAuth'

export default function Signup(): ReactElement {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)

    try {
      await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company || undefined
      })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
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
              Create <span className="text-gold">Account</span>
            </h1>
            <p className="text-secondary">Join to access exclusive features</p>
          </motion.div>

          {/* Signup Form */}
          <motion.div className="void-panel rounded-2xl p-8" variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-white mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="input-void w-full"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-white mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="input-void w-full"
                    placeholder="Doe"
                  />
                </div>
              </div>

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

              {/* Company (Optional) */}
              <div>
                <label htmlFor="company" className="block text-sm font-bold text-white mb-2">
                  Company <span className="text-dim font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-void w-full"
                  placeholder="Your Company"
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
                  minLength={8}
                  className="input-void w-full"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-dim">Must be at least 8 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-bold text-white mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
                  {isLoading ? 'Creating account...' : 'Create Account'}
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
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button type="button" className="btn-ghost-gold w-full">
                  Sign In
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
