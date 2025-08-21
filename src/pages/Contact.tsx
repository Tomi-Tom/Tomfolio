import { ReactElement, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'

export default function Contact(): ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: 'Please fill in all required fields'
      })
      return
    }

    // This would typically be an API call to send the form data
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: 'Thank you for your message! I will get back to you as soon as possible.'
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    }
  }

  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-start py-24">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <h1 className="mb-4 text-4xl font-bold text-orange-800">Get In Touch</h1>
            <p className="mx-auto max-w-2xl text-lg">
              Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              className="rounded-xl bg-background-secondary p-8 shadow-lg"
              variants={itemVariants}
            >
              <h2 className="mb-6 text-2xl font-bold text-orange-500">Contact Information</h2>
              
              <div className="mb-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-800/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-neutral-grey_1">(+33) 6 67 57 06 24</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-800/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-neutral-grey_1">bariteaupeter.tom@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-800/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-neutral-grey_1">Issy Les Moulineaux, France</p>
                  </div>
                </div>
              </div>
              
              <h3 className="mb-4 text-xl font-medium">Connect with me</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background-primary text-neutral-white transition-all hover:bg-orange-800"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background-primary text-neutral-white transition-all hover:bg-orange-800"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background-primary text-neutral-white transition-all hover:bg-orange-800"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background-primary text-neutral-white transition-all hover:bg-orange-800"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            /**
            **<motion.div
            **  className="overflow-hidden rounded-xl bg-background-secondary p-8 shadow-lg"
            **  variants={itemVariants}
            **>
            **  <h2 className="mb-6 text-2xl font-bold text-orange-500">Send Me a Message</h2>
            **  
            **  {formStatus && (
            **    <motion.div
            **      initial={{ opacity: 0, y: -20 }}
            **      animate={{ opacity: 1, y: 0 }}
            **      className={`mb-6 rounded-lg p-4 ${
            **        formStatus.success ? 'bg-green-800/20 text-green-500' : 'bg-red-800/20 text-red-500'
            **      }`}
            **    >
            **      {formStatus.message}
            **    </motion.div>
            **  )}
            **  
            **  <form onSubmit={handleSubmit} className="space-y-6">
            **    <div className="grid gap-6 md:grid-cols-2">
            **      <div>
            **        <label htmlFor="name" className="mb-2 block text-sm font-medium">
            **          Your Name <span className="text-orange-500">*</span>
            **        </label>
            **        <input
            **          type="text"
            **          id="name"
            **          name="name"
            **          value={formData.name}
            **          onChange={handleChange}
            **          className="w-full rounded-lg border border-neutral-grey_1 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            **          required
            **        />
            **      </div>
            **      <div>
            **        <label htmlFor="email" className="mb-2 block text-sm font-medium">
            **          Your Email <span className="text-orange-500">*</span>
            **        </label>
            **        <input
            **          type="email"
            **          id="email"
            **          name="email"
            **          value={formData.email}
            **          onChange={handleChange}
            **          className="w-full rounded-lg border border-neutral-grey_1 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            **          required
            **        />
            **      </div>
            **    </div>
            **    
            **    <div>
            **      <label htmlFor="subject" className="mb-2 block text-sm font-medium">
            **        Subject
            **      </label>
            **      <input
            **        type="text"
            **        id="subject"
            **        name="subject"
            **        value={formData.subject}
            **        onChange={handleChange}
            **        className="w-full rounded-lg border border-neutral-grey_1 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            **      />
            **    </div>
            **    
            **    <div>
            **      <label htmlFor="message" className="mb-2 block text-sm font-medium">
            **        Your Message <span className="text-orange-500">*</span>
            **      </label>
            **      <textarea
            **        id="message"
            **        name="message"
            **        value={formData.message}
            **        onChange={handleChange}
            **        rows={6}
            **        className="w-full rounded-lg border border-neutral-grey_1 bg-background-primary p-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            **        required
            **      ></textarea>
            **    </div>
            **    
            **    <motion.button
            **      type="submit"
            **      className="w-full rounded-lg bg-gradient-to-r from-orange-800 to-orange-500 py-3 font-medium text-white shadow-lg transition-all hover:shadow-orange-500/30"
            **      whileHover={{ y: -5 }}
            **      whileTap={{ scale: 0.98 }}
            **    >
            **      Send Message
            **    </motion.button>
            **  </form>
            **</motion.div>
            **/
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
