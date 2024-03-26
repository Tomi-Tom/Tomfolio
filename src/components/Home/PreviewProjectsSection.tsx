import type { ReactElement } from 'react'

export default function PresentationSection(): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative p-8 sm:p-32">
      <div className="flex h-full w-full p-8 sm:p-32 bg-background-2 rounded-2xl shadow-lg flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Here are some of my projects</h1>
        <p className="text-xl font-light">
          This is a list of projects I have worked on
        </p>
        <p className="text-xl font-light">
          Click on the project to see more details
        </p>
      </div>
    </div>
  )
}
