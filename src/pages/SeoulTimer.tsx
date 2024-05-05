'use client'

import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import krFlag from '../assets/kr-flag.jpg'

type particule = {
  x: number
  y: number
  size: number
  speed: number
  img: string
}

export default function SeoulTimerPage(): ReactElement {
  const departure = new Date('2024-08-22T21:00:00')
  const [timeLeft, setTimeLeft] = useState(
    departure.getTime() - new Date().getTime()
  )
  const [particles, setParticles] = useState<particule[]>([])

  setInterval(() => {
    setTimeLeft(departure.getTime() - new Date().getTime())
  }, 1000)

  useEffect(() => {
    const maxHeigth = window.innerHeight
    const maxWidth = window.innerWidth
    const interval = setInterval(() => {
      setParticles(
        particles.map((particle) => ({
          ...particle,
          x:
            particle.x + particle.speed > maxWidth - particle.size - 20
              ? 0
              : particle.x + particle.speed,
          y:
            particle.y + particle.speed > maxHeigth - particle.size - 5
              ? 0
              : particle.y + particle.speed,
        }))
      )
    }, 1000 / 60)

    return () => clearInterval(interval)
  }, [particles])

  return (
    <Layout>
      <div className="absolute left-0 top-0 h-full w-full opacity-5">
        <img
          src={krFlag}
          alt="Korea Flag"
          className="h-full w-full object-cover max-lg:hidden"
        />
      </div>
      <div className="min-w-screen relative flex min-h-screen items-center justify-center pb-64">
        <div className="z-10 flex size-full items-center justify-center px-48 pb-24 pt-36 max-lg:px-8">
          <div
            className="size-full transform cursor-pointer select-none items-center justify-center rounded-2xl  bg-black bg-opacity-15 p-8 text-center shadow-2xl transition duration-500 hover:translate-y-8 active:scale-105"
            onClick={() => {
              setParticles([
                ...particles,
                {
                  x: Math.random() * 1000,
                  y: Math.random() * 1000,
                  size: 30 + Math.random() * 50,
                  speed: Math.random() * 10,
                  img: krFlag,
                },
              ])
            }}
          >
            <img
              src={krFlag}
              alt="Korea Flag"
              className="sm-hidden h-full w-full rounded-2xl object-cover pb-4 shadow-2xl sm:hidden"
            />
            <h1 className="text-6xl font-bold">Seoul Timer</h1>
            <p className="p-2 text-4xl font-light">Time left until departure</p>
            <div className="flex w-full flex-row items-center justify-center">
              <p className="px-8 text-8xl font-extrabold max-lg:text-5xl">
                {Math.floor(timeLeft / (1000 * 60 * 60 * 24))} Days
              </p>
              <p className="px-8 text-8xl font-extrabold max-lg:hidden">
                {' |'}
              </p>
              <p className="px-8 text-8xl font-extrabold max-lg:text-5xl">
                {Math.floor((timeLeft / (1000 * 60 * 60)) % 24) >= 10
                  ? ''
                  : '0'}
                {Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}:
                {Math.floor((timeLeft / (1000 * 60)) % 60) >= 10 ? '' : '0'}
                {Math.floor((timeLeft / (1000 * 60)) % 60)}:
                {Math.floor((timeLeft / 1000) % 60) >= 10 ? '' : '0'}
                {Math.floor((timeLeft / 1000) % 60)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-full">
        {particles.map((particle, index) => (
          <img
            key={index}
            src={particle.img}
            alt="Korea Flag"
            className="absolute"
            style={{
              top: particle.y,
              left: particle.x,
              width: particle.size,
            }}
          />
        ))}
      </div>
    </Layout>
  )
}
