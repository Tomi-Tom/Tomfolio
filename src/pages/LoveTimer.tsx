'use client'

import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import krFlag from '../assets/heart.png'

type particule = {
  x: number
  y: number
  size: number
  speed: number
  img: string
}

export default function LoveTimerPage(): ReactElement {
  const departure = new Date('2025-02-20T12:00:00')
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
      <div className="absolute left-0 top-0 size-full opacity-5">
        <img
          src={krFlag}
          alt="Korea Flag"
          className="size-full object-cover max-lg:hidden"
          style={{ filter: 'blur(10px)' }}
        />
      </div>
      <div className="relative flex size-full flex-col items-center justify-center overflow-hidden pb-64 max-lg:p-8">
        <div
          className="z-10 flex items-center justify-center px-16 pb-24 pt-36 max-lg:p-16"
          style={{ width: '1440px' }}
        >
          <div
            className="bg-black transform cursor-pointer select-none items-center justify-center rounded-2xl border border-background-primary bg-background-secondary bg-opacity-25 p-8 text-center shadow-lg backdrop-blur transition duration-500 hover:translate-y-8 hover:shadow-sm active:scale-105 max-lg:px-2"
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
            <h1 className="font-bold max-lg:hidden">Seoul Timer</h1>
            <h2 className="font-bold lg:hidden">Seoul Timer</h2>
            <p className="max-lg:body-tiny body-bold-large p-2">
              Avant l'arrivée de mon amour en Corée
            </p>
            <div className="flex w-full flex-row items-center justify-center py-8 max-lg:flex-col">
              <p className="px-8 text-8xl font-extrabold max-lg:text-4xl">
                {Math.floor(timeLeft / (1000 * 60 * 60 * 24))} Days
              </p>
              <p className="px-8 text-8xl font-extrabold max-lg:hidden">
                {' |'}
              </p>
              <p className="px-8 text-8xl font-extrabold max-lg:text-4xl">
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
