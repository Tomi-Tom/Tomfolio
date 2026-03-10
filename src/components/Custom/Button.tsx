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
    primary: 'gradient-primary text-white shadow-accent font-semibold',
    secondary: 'bg-surface text-text-primary border-2 border-accent/30 hover:border-accent font-semibold',
    outline: 'bg-transparent border-2 border-accent text-accent hover:bg-accent-soft font-semibold',
    accent: 'gradient-secondary text-white shadow-lg font-semibold'
  }
  
  return (
    <motion.button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-lg font-medium text-sm sm:text-base transition-all duration-200',
        variants[variant],
        small ? 'px-4 sm:px-6 py-1.5 sm:py-2' : 'px-6 sm:px-8 py-2 sm:py-3',
        fullWidth ? 'w-full' : 'w-auto sm:w-48',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={!disabled ? {
        y: -4,
        scale: 1.02,
        boxShadow: '0 16px 40px -8px rgba(255, 107, 53, 0.5)'
      } : {}}
      whileTap={!disabled ? {
        scale: 0.96,
        boxShadow: '0 8px 16px -4px rgba(255, 107, 53, 0.3)'
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
