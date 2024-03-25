import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <div className="bottom-0 left-0 w-full h-16 bg-background-2 text-white flex items-center justify-center">
      <div className="flex flex-row space-x-4 max-w-screen-xl mx-auto justify-between">
        <a
          href="https://www.linkedin.com/in/tom-bp/"
          className="hover:text-interactive-3"
        >
          <img
            src="https://img.icons8.com/ios/50/000000/linkedin.png"
            alt="LinkedIn"
            className="w-8 h-8"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/tom-bp/"
          className="hover:text-interactive-3"
        >
          <img
            src="https://img.icons8.com/ios/50/000000/github.png"
            alt="GitHub"
            className="w-8 h-8"
          />
        </a>
      </div>
    </div>
  )
}
