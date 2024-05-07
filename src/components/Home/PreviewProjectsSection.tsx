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

import React from 'react'

const Card = ({ title, description, image, link, github }) => {
  return (
    <div className="group h-56 min-w-64">
      <div className="size-full rounded-xl border border-border-1 bg-gray-500 text-center transition-all duration-300 group-hover:-translate-y-5 group-hover:scale-110 group-hover:shadow-lg">
        <div
          className="relative h-3/5 w-full cursor-pointer overflow-hidden rounded-t-xl bg-background-1"
          onClick={(): void => {
            window.location.href = '/projects'
          }}
        >
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition-all duration-300 hover:opacity-75 group-hover:scale-110"
          />
        </div>
        <div className="p-2 transition-all duration-300 ">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm transition-all group-hover:opacity-20">
            {description}
          </p>
        </div>
        <div className="flex justify-center gap-4 rounded-b-xl p-2 opacity-0 transition-all duration-300 group-hover:-translate-y-11 group-hover:opacity-100">
          {link ? (
            <button
              className="dui-button dui-button-primary border-primary rounded-xl border bg-gray-50 px-2 py-1 text-background-2 hover:bg-interactive-1 hover:text-gray-50 hover:underline"
              onClick={(): void => {
                window.location.href = link
              }}
            >
              Visit
            </button>
          ) : (
            <div className="dui-button dui-button-primary border-primary select-none rounded-xl border bg-gray-50 px-2 py-1 text-background-2 opacity-35">
              Visit
            </div>
          )}
          <button
            className="dui-button dui-button-primary border-primary group-hover:bg-primary rounded-xl border bg-gray-50 px-2 py-1 text-background-2 hover:bg-interactive-1 hover:text-gray-50"
            onClick={(): void => {
              window.location.href = github
            }}
          >
            Github
          </button>
        </div>
      </div>
    </div>
  )
}
