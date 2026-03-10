import { ReactElement } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface GeometricShapeProps {
  shape: 'circle' | 'hexagon' | 'triangle' | 'diamond' | 'pentagon' | 'square'
  size?: number
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'neutral'
  className?: string
  animate?: boolean
  float?: boolean
  rotate?: boolean
}

const GeometricShape = ({
  shape,
  size = 80,
  gradient = 'primary',
  className,
  animate = true,
  float = false,
  rotate = false
}: GeometricShapeProps): ReactElement => {
  const shapeClasses = {
    circle: 'shape-circle',
    hexagon: 'shape-hexagon',
    triangle: 'shape-triangle',
    diamond: 'shape-diamond',
    pentagon: 'shape-pentagon',
    square: 'rounded-lg'
  }

  const gradientClasses = {
    primary: 'gradient-primary',
    secondary: 'gradient-secondary',
    tertiary: 'gradient-tertiary',
    neutral: 'gradient-neutral'
  }

  const floatAnimation = float
    ? {
        y: [0, -20, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    : {}

  const rotateAnimation = rotate
    ? {
        rotate: [0, 360],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }
      }
    : {}

  return (
    <motion.div
      className={cn(
        shapeClasses[shape],
        gradientClasses[gradient],
        'opacity-80 backdrop-blur-sm',
        className
      )}
      style={{
        width: size,
        height: size
      }}
      animate={{
        ...floatAnimation,
        ...rotateAnimation
      }}
      whileHover={
        animate
          ? {
              scale: 1.1,
              opacity: 1,
              transition: { duration: 0.3 }
            }
          : {}
      }
    />
  )
}

export default GeometricShape
