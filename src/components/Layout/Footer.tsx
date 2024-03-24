import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-background-2 text-white flex items-center justify-center">
      <h1 className="text-2xl">Footer</h1>
    </div>
  )
}