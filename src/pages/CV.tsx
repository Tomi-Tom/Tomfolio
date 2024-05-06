import { ReactElement } from 'react'
import Layout from '../components/Layout'
import CV from '../assets/CV.png'

export default function CVPage(): ReactElement {
  return (
    <Layout>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div className="z-10 flex h-auto w-full pt-20">
          <img src={CV} alt="CV front" />
        </div>
      </div>
    </Layout>
  )
}
