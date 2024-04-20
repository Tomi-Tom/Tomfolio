// LifeGamePage.tsx
import React, { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import GameGrid from '../components/LifeGame/GameGrid'
import Controls from '../components/LifeGame/Controls'
import Stats from '../components/LifeGame/Stats'

const initialCells = new Array(100).fill(false)

export default function LifeGamePage(): ReactElement {
  const [border, setBorder] = useState(10)
  const [generations, setGenerations] = useState(0)
  const [population, setPopulation] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [cells, setCells] = useState<boolean[][]>(initialCells)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        handleNextStep()
      }, 50 / speed)
      return () => clearInterval(interval)
    }
  }, [playing, cells])

  const handleCellClick = (i: number) => {
    const newCells = [...cells]
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

    const isNeightborAlive = (x: number, y: number) => {
      if (gridcells[x + 1] && gridcells[x + 1][y]) return true
      if (gridcells[x - 1] && gridcells[x - 1][y]) return true
      if (gridcells[x][y + 1]) return true
      if (gridcells[x][y - 1]) return true
      if (gridcells[x + 1] && gridcells[x + 1][y + 1]) return true
      if (gridcells[x - 1] && gridcells[x - 1][y - 1]) return true
      if (gridcells[x + 1] && gridcells[x + 1][y - 1]) return true
      if (gridcells[x - 1] && gridcells[x - 1][y + 1]) return true
      return false
    }

    const newGrid = []
    for (let i = 0; i < border; i++) {
      newGrid.push([])
      for (let j = 0; j < border; j++) {
        if (isNeightborAlive(i, j) || gridcells[i][j]) {
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
        } else {
          newGrid[i].push(false)
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

    if (cells.toString() === newCells.toString()) {
      setPlaying(false)
      return
    }
    setCells(newCells)
    if (newPopulation === 0) {
      setPlaying(false)
      return
    }
    setGenerations(generations + 1)
  }

  const handlePlay = () => setPlaying(!playing)

  const handleReset = () => {
    setGenerations(0)
    setPopulation(0)
    setPlaying(false)
    setSpeed(1)
    setBorder(10)
    setCells(initialCells)
  }

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

  const handleIncreaseSpeed = () => {
    const newSpeed = Math.round((speed + 0.02) * 100) / 100
    setSpeed(newSpeed)
  }

  const handleDecreaseSpeed = () => {
    const newSpeed = Math.round((speed - 0.02) * 100) / 100
    setSpeed(newSpeed > 0 ? newSpeed : 0.02)
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen flex-col gap-4 mt-8">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <GameGrid
              border={border}
              cells={cells}
              handleCellClick={handleCellClick}
            />
            <Controls
              border={border}
              speed={speed}
              playing={playing}
              handleNextStep={handleNextStep}
              handlePlay={handlePlay}
              handleReset={handleReset}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              handleIncreaseSpeed={handleIncreaseSpeed}
              handleDecreaseSpeed={handleDecreaseSpeed}
            />
          </div>
          <Stats generations={generations} population={population} />
        </div>
      </div>
    </Layout>
  )
}
