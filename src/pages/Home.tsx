import { ReactElement } from 'react'
import Layout from '../components/Layout'
import HeroBannerSection from '../components/Home/heroBannerSection'
import PresentationSection from '../components/Home/PresentationSection'
import ServicesSection from '../components/Home/ServicesSection'

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <HeroBannerSection />
      <PresentationSection />
      <ServicesSection />
    </Layout>
  )
}
