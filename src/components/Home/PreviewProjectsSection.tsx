import type { ReactElement } from 'react'

export default function PresentationSection(): ReactElement {
  const projects = [
    {
      title: 'Project 1',
      description: 'This is a project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 2',
      description: 'This is another project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 3',
      description: 'This is a project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 4',
      description: 'This is another project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 5',
      description: 'This is a project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 6',
      description: 'This is another project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 7',
      description: 'This is a project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
    {
      title: 'Project 8',
      description: 'This is another project I worked on',
      image: 'https://via.placeholder.com/150',
      link: 'https://www.google.com',
      github: 'https://www.github.com',
    },
  ]

  return (
    <div className="relative flex h-screen flex-col items-center justify-center p-8 sm:p-32">
      <div className="relative flex h-full w-full flex-col items-center justify-center space-y-4 rounded-2xl bg-background-2 p-8 shadow-lg sm:p-32">
        <h1 className="text-3xl font-bold">Here are some of my projects</h1>
        <p className="text-xl font-light">
          This is a list of projects I have worked on
        </p>
        <div
          className={
            'grid justify-between gap-16 max-lg:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
          }
        >
          {projects.map((project, index) => (
            <Card key={index} {...project} />
          ))}
        </div>
        <button
          className={
            'dui-button dui-button-primary absolute bottom-2 right-4 mt-4 hover:text-interactive-2 hover:underline'
          }
          onClick={(): void => {
            window.location.href = '/projects'
          }}
        >
          See More..
        </button>
      </div>
    </div>
  )
}

const Card = ({ title, description, image, link, github }) => {
  return (
    <div className="group h-56 min-w-64">
      <div className="size-full rounded-xl border border-border-1 bg-gray-500 text-center transition-all duration-300 group-hover:-translate-y-5 group-hover:scale-110 group-hover:shadow-lg">
        <div className="relative h-2/3 w-full overflow-hidden rounded-t-xl bg-gray-50">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}
