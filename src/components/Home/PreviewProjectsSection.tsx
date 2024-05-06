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
            'grid justify-between gap-8 max-lg:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
          }
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="min-h-56 min-w-64 items-center justify-center rounded-xl border border-border-1 bg-background-1 text-center"
            >
              <p>Project : {project.title}</p>
              <img src={project.image} alt={project.title} />
            </div>
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
