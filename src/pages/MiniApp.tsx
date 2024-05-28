import { ReactElement } from 'react'
import Layout from '../components/Layout'
import HeroBannerSection from '../components/Home/heroBannerSection'

export default function MiniAppPage(): ReactElement {
  return (
    <Layout>
      <body className="bg-background-tertiary">
        <HeroBannerSection />
      </body>
    </Layout>
  )
}
