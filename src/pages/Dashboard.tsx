import { ReactElement, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import { userAPI } from '../services/api'
import SceneAuth from '../components/Three/SceneAuth'

interface Message {
  id: string
  subject: string
  message: string
  createdAt: string
  isRead: boolean
}

interface Quote {
  id: string
  projectDescription: string
  budgetRange: string
  timeline: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  adminNotes?: string
  adminResponse?: string
  createdAt: string
}

export default function Dashboard(): ReactElement {
  const { user, refreshUser } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'quotes'>('profile')
  const [messages, setMessages] = useState<Message[]>([])
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: user?.company || '',
    email: user?.email || ''
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company || '',
        email: user.email
      })
    }
  }, [user])

  // Fetch messages when Messages tab is active
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages()
    }
  }, [activeTab])

  // Fetch quotes when Quotes tab is active
  useEffect(() => {
    if (activeTab === 'quotes') {
      fetchQuotes()
    }
  }, [activeTab])

  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const response = await userAPI.getMessages()
      setMessages(response.messages || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch messages')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchQuotes = async () => {
    setIsLoading(true)
    try {
      const response = await userAPI.getQuotes()
      setQuotes(response.quotes || [])
    } catch (err: any) {
      setError(err.message || 'Failed to fetch quotes')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsLoading(true)

    try {
      await userAPI.updateProfile(profileData)
      await refreshUser()
      setSuccessMessage('Profile updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'reviewed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'accepted':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-text-tertiary/10 text-text-tertiary border-text-tertiary/20'
    }
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: '👤' },
    { id: 'messages' as const, label: 'Messages', icon: '💬' },
    { id: 'quotes' as const, label: 'Quotes', icon: '📋' }
  ]

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden" style={{ background: '#07070F' }}>
        <SceneAuth />
        <div className="container-wide relative z-10">
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display-1 mb-4">
              Welcome back, <span className="gradient-text">{user?.firstName}</span>
            </h1>
            <p className="text-body text-text-secondary">
              Manage your profile, view messages, and track your quote requests
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            className="flex justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-accent'
                    : 'bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="card p-8">
                  <h2 className="text-heading-2 mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, firstName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-text-tertiary/20 text-text-primary focus:outline-none focus:border-accent transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-text-tertiary/20 text-text-primary focus:outline-none focus:border-accent transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        className="w-full px-4 py-3 rounded-xl bg-surface-elevated border border-text-tertiary/10 text-text-secondary cursor-not-allowed"
                        disabled
                      />
                      <p className="text-xs text-text-tertiary mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) =>
                          setProfileData({ ...profileData, company: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-text-tertiary/20 text-text-primary focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 rounded-xl gradient-primary text-white font-bold shadow-accent disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      >
                        {isLoading ? 'Updating...' : 'Update Profile'}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="card p-8">
                  <h2 className="text-heading-2 mb-6">Your Messages</h2>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-text-secondary">Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-text-secondary">No messages yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          className={`p-6 rounded-xl border ${
                            message.isRead
                              ? 'bg-surface border-text-tertiary/10'
                              : 'bg-accent/5 border-accent/20'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-text-primary">
                              {message.subject}
                            </h3>
                            {!message.isRead && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-text-secondary mb-3">{message.message}</p>
                          <p className="text-xs text-text-tertiary">
                            {new Date(message.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'quotes' && (
              <motion.div
                key="quotes"
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="card p-8">
                  <h2 className="text-heading-2 mb-6">Your Quote Requests</h2>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-text-secondary">Loading quotes...</p>
                    </div>
                  ) : quotes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📋</div>
                      <p className="text-text-secondary mb-4">No quote requests yet</p>
                      <a
                        href="/contact"
                        className="inline-block px-6 py-3 rounded-xl gradient-primary text-white font-bold"
                      >
                        Request a Quote
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {quotes.map((quote, index) => (
                        <motion.div
                          key={quote.id}
                          className="p-6 rounded-xl bg-surface border border-text-tertiary/10"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-text-primary mb-2">
                                Quote Request
                              </h3>
                              <p className="text-xs text-text-tertiary">
                                {new Date(quote.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                quote.status
                              )}`}
                            >
                              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                            </span>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div>
                              <p className="text-xs font-medium text-text-tertiary mb-1">
                                Project Description
                              </p>
                              <p className="text-text-primary">{quote.projectDescription}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-medium text-text-tertiary mb-1">
                                  Budget Range
                                </p>
                                <p className="text-text-primary">{quote.budgetRange}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-text-tertiary mb-1">
                                  Timeline
                                </p>
                                <p className="text-text-primary">{quote.timeline}</p>
                              </div>
                            </div>
                          </div>

                          {quote.adminResponse && (
                            <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                              <p className="text-xs font-medium text-accent mb-2">
                                Response from Admin
                              </p>
                              <p className="text-text-primary">{quote.adminResponse}</p>
                              {quote.adminNotes && (
                                <p className="text-xs text-text-secondary mt-2">
                                  Note: {quote.adminNotes}
                                </p>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  )
}
