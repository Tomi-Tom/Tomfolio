import type { ReactElement } from 'react'

export default function PresentationSection(): ReactElement {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center p-8 sm:p-32">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-2xl bg-background-2 p-8 shadow-lg sm:p-32">
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
