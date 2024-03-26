import { ReactElement } from 'react'
import Layout from '../components/Layout'
import HeroBanner from '../components/Home/HeroBanner'
import PresentationSection from '../components/Home/PresentationSection'
import PreviewProjectsSection from '../components/Home/PreviewProjectsSection'
import ClientsReviewsSection from '../components/Home/ClientsReviewsSection'

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <HeroBanner />
      <PresentationSection />
      <PreviewProjectsSection />
      <ClientsReviewsSection />
    </Layout>
  )
}
