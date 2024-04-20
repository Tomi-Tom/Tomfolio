'use client'

import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'

const initialCells = new Array(10 ** 2).fill(false)

export default function LifeGamePage(): ReactElement {
  const [border, setBorder] = useState(10)
  const [generations, setGenerations] = useState(0)
  const [population, setPopulation] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [cells, setCells] = useState<Array<Array<boolean>>>(initialCells)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        handleNextStep()
      }, 50 * speed)
      return () => clearInterval(interval)
    }
  }, [playing, cells])

  const handleDecrease = () => {
    setBorder(border - 1)

    const newCells = []
    for (let i = 0; i < border - 1; i++) {
      for (let j = 0; j < border - 1; j++) {
        newCells.push(cells[i * border + j])
      }
    }
    setCells(newCells)
  }

  const handleIncrease = () => {
    setBorder(border + 1)

    const newCells = []
    for (let i = 0; i < border + 1; i++) {
      for (let j = 0; j < border + 1; j++) {
        newCells.push(cells[i * border + j])
      }
    }
    setCells(newCells)
  }

  const handleCellClick = (i: number) => {
    let newCells = [...cells]
    newCells[i] = !newCells[i]
    setCells(newCells)
  }

  const handleNextStep = () => {
    const gridcells = []
    for (let i = 0; i < border; i++) {
      gridcells.push([])
      for (let j = 0; j < border; j++) {
        gridcells[i].push(cells[i * border + j])
      }
    }

    const newGrid = []
    for (let i = 0; i < border; i++) {
      newGrid.push([])
      for (let j = 0; j < border; j++) {
        let neighbors = 0
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) {
              continue
            }
            if (gridcells[i + x] && gridcells[i + x][j + y]) {
              neighbors++
            }
          }
        }
        if (gridcells[i][j]) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[i].push(false)
          } else {
            newGrid[i].push(true)
          }
        } else {
          if (neighbors === 3) {
            newGrid[i].push(true)
          } else {
            newGrid[i].push(false)
          }
        }
      }
    }

    const newCells = []
    for (let i = 0; i < border; i++) {
      for (let j = 0; j < border; j++) {
        newCells.push(newGrid[i][j])
      }
    }

    const newPopulation = newCells.filter((cell) => cell).length
    setPopulation(newPopulation)
    setCells(newCells)
    if (newPopulation === 0) {
      setPlaying(false)
      return
    }
    setGenerations(generations + 1)
  }

  const handlePlay = () => {
    setPlaying(!playing)
  }

  const handleReset = () => {
    setGenerations(0)
    setPopulation(0)
    setPlaying(false)
    setSpeed(1)
    setBorder(10)
    setCells(initialCells)
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen flex-col gap-4 mt-8">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <div
              className={`grid gap-0.5`}
              style={{
                gridTemplateColumns: `repeat(${border}, 1fr)`,
                gridTemplateRows: `repeat(${border}, 1fr)`,
              }}
            >
              {cells.map((state, i) => (
                <div
                  key={i}
                  className={`${state ? 'bg-gray-300' : 'bg-background-2'}`}
                  style={{
                    width: (1100 - 2 * border) / border,
                    height: (1100 - 2 * border) / border,
                  }}
                  onClick={() => handleCellClick(i)}
                />
              ))}
            </div>
            <div className={'flex flex-row gap-4'}>
              <button
                className={'bg-background-2 text-white px-4 py-2 rounded'}
                onClick={handleNextStep}
              >
                Next Step
              </button>
              <button
                className={'bg-background-2 text-white px-4 py-2 rounded'}
                onClick={handleDecrease}
              >
                -
              </button>
              <button className={'text-text-2'}>{border}</button>
              <button
                className={'bg-background-2 text-white px-4 py-2 rounded'}
                onClick={handleIncrease}
              >
                +
              </button>
              <button
                className={'bg-background-2 text-white px-4 py-2 rounded'}
                onClick={handlePlay}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                className={'bg-background-2 text-white px-4 py-2 rounded'}
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
          <div
            className={
              'flex flex-col gap-4 w-96 border border-background-2 rounded-2xl'
            }
          >
            <div
              className={
                'justify-center items-center w-full bg-background-2 rounded-t-2xl p-4 pb-6'
              }
            >
              <h1
                className={
                  'text-2xl text-center font-bold text-text-2 uppercase'
                }
              >
                Stats
              </h1>
            </div>
            <div className={'flex flex-row gap-4'}>
              <p className={'text-text-2'}>Generations:</p>
              <p className={'text-text-2'}>{generations}</p>
            </div>
            <div className={'flex flex-row gap-4'}>
              <p className={'text-text-2'}>Population:</p>
              <p className={'text-text-2'}>{population}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
