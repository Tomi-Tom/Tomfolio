import { ReactElement } from 'react'

interface MiniAppPresentationProps {
  title: string
  description: string
  link: string
  images: string[]
}

const MiniAppPresentation = ({
  title,
  description,
  link,
  images,
}: MiniAppPresentationProps): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold">{title}</h1>
      <p className="text-center text-lg">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline"
      >
        {link}
      </a>
      <div className="flex flex-wrap justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={title}
            className="m-4 h-64 w-64 object-cover"
          />
        ))}
      </div>
    </div>
  )
}

export default MiniAppPresentation
