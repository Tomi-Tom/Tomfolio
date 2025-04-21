import { ReactElement, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  small?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'accent'
  fullWidth?: boolean
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({ 
  children, 
  onClick, 
  small, 
  variant = 'primary',
  fullWidth,
  className,
  disabled = false,
  type = 'button'
}: ButtonProps): ReactElement => {
  const variants = {
    primary: 'bg-gradient-to-tr from-orange-800 to-orange-500 text-white shadow-lg shadow-orange-900/20',
    secondary: 'bg-background-secondary text-white border border-orange-800',
    outline: 'bg-transparent border-2 border-orange-800 text-orange-500',
    accent: 'bg-gradient-to-tr from-accent-700 to-accent-500 text-white shadow-lg shadow-accent-900/20'
  }
  
  return (
    <motion.button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium text-sm sm:text-base transition-colors',
        variants[variant],
        small ? 'px-4 sm:px-6 py-1.5 sm:py-2' : 'px-6 sm:px-8 py-2 sm:py-3',
        fullWidth ? 'w-full' : 'w-auto sm:w-48',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      whileHover={!disabled ? { 
        y: -3,
        boxShadow: '0 10px 25px -5px rgba(255, 143, 0, 0.4)'
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.97,
        boxShadow: '0 5px 10px -5px rgba(255, 143, 0, 0.2)'
      } : {}}
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
