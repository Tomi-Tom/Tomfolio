import { ReactElement, useEffect, useState } from 'react'

export default function NotFound(): ReactElement {
  const [meteors, setMeteors] = useState<meteor[]>([])

  const createMeteor = () => {
    const size = Math.random() * 10
    const speed = Math.random() * 10
    const x = Math.random() * window.innerWidth - size
    const y = Math.random() * window.innerHeight - size
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`
    const angle = Math.random() * 360
    setMeteors([...meteors, { x, y, size, speed, color, angle }])
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMeteors((meteors) =>
        meteors.map((meteor) => {
          const dx = Math.cos(meteor.angle) * meteor.speed
          const dy = Math.sin(meteor.angle) * meteor.speed
          let newX = meteor.x + dx
          let newY = meteor.y + dy
          if (newX < 0) {
            newX = window.innerWidth - meteor.size
          } else if (newX > window.innerWidth - meteor.size) {
            newX = 0
          }
          if (newY < 0) {
            newY = window.innerHeight - meteor.size
          } else if (newY > window.innerHeight - meteor.size) {
            newY = 0
          }
          return { ...meteor, x: newX, y: newY }
        })
      )
    }, 1000 / 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-w-screen text-text-2 relative flex min-h-screen flex-col items-center justify-center bg-background-tertiary text-neutral-white">
      {meteors.map((meteor, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: meteor.x,
            top: meteor.y,
            width: meteor.size,
            height: meteor.size,
            backgroundColor: meteor.color,
            borderRadius: '50%',
          }}
        />
      ))}
      <div className="mx-auto flex max-w-screen-xl flex-row justify-between space-x-4">
        <h1 className="text-9xl font-extrabold">4</h1>
        <h1
          className={`text-9xl font-extrabold ${meteors.length == 42 ? 'animate-pulse cursor-pointer text-orange-900' : ''}`}
          onClick={meteors.length == 42 ? createMeteor : () => {}}
        >
          0
        </h1>
        <h1 className="text-9xl font-extrabold">4</h1>
      </div>
      <h2 className="text-4xl font-bold">Page Not Found </h2>
      <div className=" mt-12 flex flex-row items-center justify-center space-x-4 rounded-md">
        <button
          className="transform cursor-pointer rounded-md bg-orange-900 px-4 py-2 transition hover:translate-y-1.5 hover:bg-orange-800"
          onClick={() => window.location.replace('/')}
        >
          Go Home
        </button>
        <h1 className="text-2xl">Or</h1>
        <button
          className="transform cursor-pointer rounded-md bg-orange-900 px-4 py-2 transition hover:translate-y-1.5 hover:bg-orange-800"
          onClick={
            meteors.length == 42
              ? () => {
                  window.location.href =
                    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                }
              : createMeteor
          }
        >
          Launch {meteors.length > 0 ? `: ${meteors.length}` : ''}
        </button>
      </div>
    </div>
  )
}

interface meteor {
  x: number
  y: number
  size: number
  speed: number
  color: string
  angle: number
}
