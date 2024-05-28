import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <footer className="flex h-16 w-full items-center justify-center bg-background-primary">
      <div
        className={'flex items-center justify-center'}
        style={{ width: '1440px' }}
      >
        Footer
      </div>
    </footer>
  )
}
