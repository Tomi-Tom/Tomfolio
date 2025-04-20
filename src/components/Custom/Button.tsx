import { ReactElement, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  small?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
  className?: string
}

const Button = ({ 
  children, 
  onClick, 
  small, 
  variant = 'primary',
  fullWidth,
  className
}: ButtonProps): ReactElement => {
  const variants = {
    primary: 'bg-gradient-to-tr from-orange-800 to-orange-500 text-white shadow-lg shadow-orange-900/20',
    secondary: 'bg-background-secondary text-white border border-orange-800',
    outline: 'bg-transparent border-2 border-orange-800 text-orange-500'
  }
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'rounded-lg font-medium',
        variants[variant],
        small ? 'px-6 py-2' : 'px-8 py-3',
        fullWidth ? 'w-full' : 'w-48',
        className
      )}
      whileHover={{ 
        y: -4,
        boxShadow: '0 10px 25px -5px rgba(255, 143, 0, 0.4)'
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: '0 5px 10px -5px rgba(255, 143, 0, 0.2)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30
      }}
    >
      {children}
    </motion.button>
  )
}

export default Button
