import { ReactElement, ReactNode } from 'react'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="min-w-screen bg-background-1 text-text-2 flex min-h-screen flex-col text-neutral-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
