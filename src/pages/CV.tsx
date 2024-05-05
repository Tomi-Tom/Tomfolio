import { ReactElement } from 'react'
import Layout from '../components/Layout'
import CV from '../assets/CV.png'

export default function CVPage(): ReactElement {
  return (
    <Layout>
      <div className="relative w-full">
        <div className="z-10 flex h-auto w-full px-56 pb-24  pt-36">
          <img src={CV} alt="CV front" />
        </div>
      </div>
    </Layout>
  )
}
