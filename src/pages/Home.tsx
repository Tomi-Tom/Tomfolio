import { ReactElement } from 'react'
import Layout from '../components/Layout'
import HeroBanner from '../components/Home/heroBanner'

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <body className="min-h-screen bg-background-tertiary">
        <HeroBanner />
      </body>
    </Layout>
  )
}
