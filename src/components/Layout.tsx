import { ReactElement, ReactNode } from 'react'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-tertiary text-neutral-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
