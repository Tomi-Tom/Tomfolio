import { ReactElement } from 'react'
import Layout from '../components/Layout'
import CV from '../assets/CV.png'

export default function CVPage(): ReactElement {
  return (
    <Layout>
      <div className="relative w-full">
        <div className="flex w-full h-auto px-56 pb-24 pt-36  z-10">
          <img src={CV} alt="CV front" />
        </div>
      </div>
    </Layout>
  )
}
