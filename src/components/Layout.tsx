import { ReactElement, ReactNode } from 'react'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="min-w-screen flex min-h-screen flex-col bg-background-1 text-text-2">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
