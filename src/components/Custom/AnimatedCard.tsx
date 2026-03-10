import { ReactElement, ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../utils/cn'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'highlight' | 'cta'
  tilt?: boolean
  glow?: boolean
  onClick?: () => void
  href?: string
}

/**
 * Unified Card System - Tomi-Tom Design Language
 *
 * Features:
 * - 3D tilt effect on mouse move
 * - Hover glow with brand colors
 * - Smooth lift animation
 * - Consistent shadow depth
 * - Three variants: default, highlight, cta
 */
const AnimatedCard = ({
  children,
  className,
  variant = 'default',
  tilt = true,
  glow = true,
  onClick,
  href
}: AnimatedCardProps): ReactElement => {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position tracking for tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    mouseX.set(percentX)
    mouseY.set(percentY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const variantStyles = {
    default: 'surface-elevated',
    highlight: 'surface-elevated border-2 border-accent/20',
    cta: 'surface-elevated border-2 border-accent pulse-cta'
  }

  const CardContent = (
    <motion.div
      ref={cardRef}
      className={cn(
        'rounded-2xl p-6 relative overflow-hidden',
        'transition-all duration-400',
        variantStyles[variant],
        glow && 'card-glow',
        onClick && 'cursor-pointer',
        className
      )}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-2xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%)'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Tomi-Tom signature corner accent */}
      {variant === 'highlight' && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full gradient-primary animate-pulse" />
      )}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    )
  }

  return CardContent
}

export default AnimatedCard
