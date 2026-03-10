import { ReactElement, ReactNode } from 'react'
import Navbar from './Layout/Navbar'
import ModernFooter from './Layout/ModernFooter'

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas text-text-primary overflow-x-hidden">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
      <ModernFooter />
    </div>
  )
}

export default Layout
