import { ReactElement, ReactNode } from 'react'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="text-text-2 flex min-h-screen w-full flex-col items-center justify-center bg-background-tertiary text-neutral-white">
      <Navbar />
      <div className="size-full">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
