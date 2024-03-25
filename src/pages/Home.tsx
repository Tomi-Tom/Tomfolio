import { ReactElement } from 'react'
import Layout from '../components/Layout'
import transition from '../assets/transition.png'

export default function HomePage(): ReactElement {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full min-h-screen relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-50" />
        <img
          src={transition}
          alt=""
          className="absolute bottom-0 w-full h-auto object-cover"
        />
        <div className="flex flex-col relative z-10 text-white text-center justify-center items-center space-y-4">
          <img
            src="https://media.licdn.com/dms/image/D4E03AQHV-wzd1vvQSw/profile-displayphoto-shrink_800_800/0/1710503993631?e=1717027200&v=beta&t=VpbDhWqFcB6Al6uUYqvDNmE68Z6G0X5DcOktFW21GZE"
            alt="Tom BP"
            className="w-60 h-60 rounded-full"
          />
          <h1 className="text-8xl sm:text-9xl font-bold">TOM BP</h1>
          <p className="text-2xl sm:text-4xl">Fullstack Developer/Designer</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-full min-h-screen relative"></div>
    </Layout>
  )
}
