import { ReactElement, useEffect, useState } from 'react'
import transition from '../../assets/transition.png'

export default function HeroBanner(): ReactElement {
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll = window.innerHeight * 0.9
      const opacity = 1 - scrollPosition / maxScroll
      setScrollOpacity(opacity < 0 ? 0 : opacity) // Ensure opacity doesn't go below 0
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full min-h-screen relative">
        <div
          className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat"
          style={{ opacity: scrollOpacity }}
        />
        <img
          src={transition}
          alt=""
          className="absolute bottom-0 w-auto h-full object-cover"
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
    </>
  )
}
