'use client'

import { ReactElement, useState } from 'react'
import Layout from '../components/Layout'
import krFlag from '../assets/kr-flag.jpg'

export default function SeoulTimerPage(): ReactElement {
  const departure = new Date('2024-08-23')
  const [timeLeft, setTimeLeft] = useState(
    departure.getTime() - new Date().getTime()
  )

  setInterval(() => {
    setTimeLeft(departure.getTime() - new Date().getTime())
  }, 1000)

  return (
    <Layout>
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <img
          src={krFlag}
          alt="Korea Flag"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative min-w-screen min-h-screen flex items-center justify-center pb-64">
        <div className="flex w-full h-full px-56 pb-24 pt-36 z-10 items-center justify-center">
          <div className="w-full h-full justify-center items-center text-center bg-black rounded-2xl p-8 bg-opacity-15 shadow-2xl hover:translate-y-8 transform transition duration-500">
            <h1 className="text-6xl font-bold">Seoul Timer</h1>
            <p className="text-4xl font-light p-2">Time left until departure</p>
            <p className="text-8xl font-extrabold p-8">
              {Math.floor(timeLeft / (1000 * 60 * 60 * 24))} Days |{' '}
              {Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}:
              {Math.floor((timeLeft / (1000 * 60)) % 60)}:
              {Math.floor((timeLeft / 1000) % 60) >= 10 ? '' : '0'}
              {Math.floor((timeLeft / 1000) % 60)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
