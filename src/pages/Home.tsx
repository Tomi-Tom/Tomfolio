import { ReactElement } from 'react'
import Layout from '../components/Layout'
import DynamicHero from '../components/Home/DynamicHero'
import PresentationSection from '../components/Home/PresentationSection'
import SkillsShowcase from '../components/Home/SkillsShowcase'
import ServicesSection from '../components/Home/ServicesSection'
import ProjectsCTA from '../components/Home/ProjectsCTA'
import FinalCTA from '../components/Home/FinalCTA'

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <DynamicHero />
      <PresentationSection />
      <SkillsShowcase />
      <ServicesSection />
      <ProjectsCTA />
      <FinalCTA />
    </Layout>
  )
}
