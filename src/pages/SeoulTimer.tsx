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
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <img
          src={krFlag}
          alt="Korea Flag"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative min-w-screen min-h-screen flex items-center justify-center pb-64">
        <div className="flex w-full h-full px-56 pb-24 pt-36 z-10 items-center justify-center">
          <div
            className="select-none w-full h-full justify-center items-center text-center bg-black rounded-2xl p-8 bg-opacity-15 shadow-2xl hover:translate-y-8 transform transition duration-500 cursor-pointer active:scale-105"
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
            <h1 className="text-6xl font-bold">Seoul Timer</h1>
            <p className="text-4xl font-light p-2">Time left until departure</p>
            <p className="text-8xl font-extrabold p-8">
              {Math.floor(timeLeft / (1000 * 60 * 60 * 24))} Days |{' '}
              {Math.floor((timeLeft / (1000 * 60 * 60)) % 24) >= 10 ? '' : '0'}
              {Math.floor((timeLeft / (1000 * 60 * 60)) % 24)}:
              {Math.floor((timeLeft / (1000 * 60)) % 60) >= 10 ? '' : '0'}
              {Math.floor((timeLeft / (1000 * 60)) % 60)}:
              {Math.floor((timeLeft / 1000) % 60) >= 10 ? '' : '0'}
              {Math.floor((timeLeft / 1000) % 60)}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
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
