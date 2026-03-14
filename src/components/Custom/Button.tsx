// src/components/Custom/Button.tsx
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps {
  variant?: 'gold' | 'ghost-gold'
  children: ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function Button({
  variant = 'gold',
  children,
  onClick,
  href,
  type = 'button',
  disabled = false,
  className,
}: ButtonProps) {
  const cls = cn(
    variant === 'gold' ? 'btn-gold' : 'btn-ghost-gold',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}

export default Button
