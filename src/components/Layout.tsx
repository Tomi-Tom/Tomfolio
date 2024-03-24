import { ReactElement, ReactNode } from 'react'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col text-text-2 bg-background-1">
      <Navbar />
      <div className="py-16 flex-1">
          {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout