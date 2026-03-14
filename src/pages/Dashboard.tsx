import { ReactElement, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { PageLayout } from '../layouts/PageLayout'
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
        return 'text-gold-dim border-gold-ghost'
      case 'reviewed':
        return 'text-gold border-gold-dim'
      case 'accepted':
        return 'text-emerald-400 border-emerald-400/20'
      case 'rejected':
        return 'text-red-400 border-red-500/20'
      default:
        return 'text-dim border-white/10'
    }
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: '//01' },
    { id: 'messages' as const, label: 'Messages', icon: '//02' },
    { id: 'quotes' as const, label: 'Quotes', icon: '//03' }
  ]

  return (
    <PageLayout>
      <div
        className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden"
        style={{ background: 'var(--color-void)' }}
      >
        <SceneAuth />
        <div className="container-wide relative z-10">
          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display-1 mb-4 text-white">
              Welcome back, <span className="text-gold">{user?.firstName}</span>
            </h1>
            <p className="text-body text-secondary">
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
                className={`px-6 py-3 rounded-none font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-gold border-gold'
                    : 'text-dim border-transparent hover:text-secondary'
                }`}
                style={{
                  background: activeTab === tab.id ? 'var(--color-void-surface)' : 'transparent'
                }}
              >
                <span className="mr-2 text-xs font-mono text-gold-dim">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="max-w-2xl mx-auto mb-6 p-4 rounded-xl border border-red-500/20 text-red-400"
                style={{ background: 'rgba(239, 68, 68, 0.06)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                className="max-w-2xl mx-auto mb-6 p-4 rounded-xl border border-emerald-500/20 text-emerald-400"
                style={{ background: 'rgba(16, 185, 129, 0.06)' }}
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
                <div className="void-panel p-8">
                  <h2 className="text-heading-2 mb-6 text-white">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, firstName: e.target.value })
                          }
                          className="input-void w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, lastName: e.target.value })
                          }
                          className="input-void w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        className="input-void w-full opacity-50 cursor-not-allowed"
                        disabled
                      />
                      <p className="text-xs text-dim mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) =>
                          setProfileData({ ...profileData, company: e.target.value })
                        }
                        className="input-void w-full"
                      />
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="void-panel p-8">
                  <h2 className="text-heading-2 mb-6 text-white">Your Messages</h2>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div
                        className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                        style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
                      ></div>
                      <p className="text-secondary">Loading messages...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4 opacity-30">///</div>
                      <p className="text-secondary">No messages yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          className={`void-panel p-6 ${
                            !message.isRead ? 'border-gold/30' : ''
                          }`}
                          style={
                            !message.isRead
                              ? { borderColor: 'var(--color-gold-dim)' }
                              : undefined
                          }
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-bold text-white">
                              {message.subject}
                            </h3>
                            {!message.isRead && (
                              <span
                                className="px-3 py-1 rounded-full text-xs font-bold"
                                style={{
                                  background: 'var(--color-gold)',
                                  color: '#000'
                                }}
                              >
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-secondary mb-3">{message.message}</p>
                          <p className="text-xs text-dim">
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
                <div className="void-panel p-8">
                  <h2 className="text-heading-2 mb-6 text-white">Your Quote Requests</h2>
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div
                        className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                        style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }}
                      ></div>
                      <p className="text-secondary">Loading quotes...</p>
                    </div>
                  ) : quotes.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4 opacity-30">///</div>
                      <p className="text-secondary mb-4">No quote requests yet</p>
                      <a
                        href="/contact"
                        className="btn-gold inline-block"
                      >
                        Request a Quote
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {quotes.map((quote, index) => (
                        <motion.div
                          key={quote.id}
                          className="void-panel p-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">
                                Quote Request
                              </h3>
                              <p className="text-xs text-dim">
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
                              style={{ background: 'var(--color-gold-ghost)' }}
                            >
                              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                            </span>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div>
                              <p className="text-xs font-medium text-dim mb-1">
                                Project Description
                              </p>
                              <p className="text-white">{quote.projectDescription}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-medium text-dim mb-1">
                                  Budget Range
                                </p>
                                <p className="text-white">{quote.budgetRange}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-dim mb-1">
                                  Timeline
                                </p>
                                <p className="text-white">{quote.timeline}</p>
                              </div>
                            </div>
                          </div>

                          {quote.adminResponse && (
                            <div
                              className="mt-4 p-4 rounded-lg border"
                              style={{
                                background: 'var(--color-gold-ghost)',
                                borderColor: 'var(--color-gold-dim)'
                              }}
                            >
                              <p className="text-xs font-medium text-gold mb-2">
                                Response from Admin
                              </p>
                              <p className="text-white">{quote.adminResponse}</p>
                              {quote.adminNotes && (
                                <p className="text-xs text-secondary mt-2">
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
    </PageLayout>
  )
}
