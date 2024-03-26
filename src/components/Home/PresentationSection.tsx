import type { ReactElement } from 'react'

export default function PresentationSection(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative p-8 sm:p-32">
      <div className="flex h-full w-full p-8 sm:p-32 bg-background-2 rounded-2xl shadow-lg flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Welcome to my portfolio</h1>
        <p className="text-xl font-light">
          This is a simple portfolio to showcase my skills and projects
        </p>
        <p className="text-xl font-light">
          I am a fullstack developer and designer
        </p>
      </div>
    </div>
  )
}
