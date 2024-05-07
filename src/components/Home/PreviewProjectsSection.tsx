import type { ReactElement } from 'react'
import areaLogo from '../../assets/areaLogo.png'

export default function PresentationSection(): ReactElement {
  const projects = [
    {
      title: 'TomFolio',
      description: 'This is the currently website you are on, my portfolio',
      image: 'https://www.tombp.fr/assets/logo-Pce1k1VJ.png',
      link: 'https://www.tombp.fr',
      github: 'https://github.com/Tomi-Tom/Tomfolio',
    },
    {
      title: 'Bedrock',
      description: 'A blockchain based, note taking app',
      image: 'https://bedrock-im.crooser.xyz/logo-viol.png',
      link: 'https://bedrock-im.crooser.xyz/',
      github: 'https://github.com/EdenComp/Bedrock.im ',
    },
    {
      title: 'Area',
      description: 'An app to automate tasks and link services',
      image: areaLogo,
      link: null,
      github: 'https://github.com/RezaRahemtola/Area  ',
    },
    {
      title: 'Dante Star',
      description: 'A maze generator and solver in C',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/7/78/Traquair_House_Maze.jpg',
      link: null,
      github: 'https://github.com/Tomi-Tom/Dante-Star',
    },
    {
      title: 'AbstractVM',
      description: 'A stack based virtual machine in C++',
      image:
        'https://www.designnominees.com/application/upload/Apps/2023/05/vm-calculator-11.png',
      link: null,
      github: 'https://github.com/Tomi-Tom/AbstractVM',
    },
  ]

  return (
    <div className="relative flex h-auto flex-col items-center justify-center p-8 sm:p-32">
      <div className="relative flex h-full w-full flex-col items-center justify-center space-y-4 rounded-2xl bg-background-2 p-8 shadow-lg sm:p-16">
        <h1 className="text-3xl font-bold">Here are some of my projects</h1>
        <p className="text-xl font-light">
          This is a list of projects I have worked on
        </p>
        <div
          className={
            'grid justify-between gap-16 py-8 max-lg:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
          }
        >
          {projects.map((project, index) => (
            <Card key={index} {...project} />
          ))}
        </div>
        <button
          className={
            'dui-button dui-button-primary absolute bottom-4 right-8 mt-4 hover:text-interactive-2 hover:underline'
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

import React from 'react'

const Card = ({ title, description, image, link, github }) => {
  return (
    <div className="group relative h-64 min-w-64">
      <div className="size-full rounded-xl border-2 border-border-1 bg-background-1 transition-all duration-300 group-hover:-translate-y-5 group-hover:scale-110 group-hover:bg-interactive-2 group-hover:shadow-lg">
        <div
          className="group/img relative h-3/5 w-full cursor-pointer overflow-hidden rounded-t-xl bg-background-1"
          onClick={(): void => {
            window.location.href = '/projects'
          }}
        >
          <img
            src={image}
            alt={title}
            className="over:opacity-75 group/img-hover:scale-110 size-full object-cover transition-all duration-300 group-hover/img:opacity-35"
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-bold text-text-2 opacity-0 transition-all duration-300 group-hover/img:opacity-100">
            {title}
          </span>
        </div>
        <div className="group/base w-full">
          <div className="p-2 transition-all duration-300 ">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm transition-all duration-300 group-hover/base:opacity-0">
              {description}
            </p>
          </div>
          <div className="absolute bottom-0 left-1/4 flex justify-center gap-4 rounded-b-xl p-4 opacity-0 transition-all duration-300 group-hover/base:-translate-y-2 group-hover/base:opacity-100">
            {link ? (
              <button
                className="dui-button dui-button-primary border-primary rounded-xl bg-gray-50 px-2 py-1 text-background-2 hover:bg-interactive-1 hover:text-gray-50 hover:underline"
                onClick={(): void => {
                  window.open(link)
                }}
              >
                Visit
              </button>
            ) : (
              <div className="dui-button dui-button-primary border-primary select-none rounded-xl bg-gray-50 px-2 py-1 text-background-2 opacity-35">
                Visit
              </div>
            )}
            <button
              className="dui-button dui-button-primary border-primary group-hover:bg-primary rounded-xl bg-gray-50 px-2 py-1 text-background-2 hover:bg-interactive-1 hover:text-gray-50"
              onClick={(): void => {
                window.open(github)
              }}
            >
              Github
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
