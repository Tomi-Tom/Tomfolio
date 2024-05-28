import { ReactElement, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  small?: boolean
}
const Button = ({ children, onClick, small }: ButtonProps): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={` text-white w-48 rounded-lg bg-gradient-to-tr from-orange-800 to-orange-500 ${small ? 'px-6 py-2' : 'px-8 py-3'}  transition-all duration-300 ease-in-out hover:translate-y-1 hover:scale-95 hover:from-orange-900 hover:to-orange-600 active:from-orange-600 active:to-orange-300`}
    >
      {children}
    </button>
  )
}

export default Button
