'use client'

import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'

const initialCells = new Array(100)
  .fill(null)
  .map(() => new Array(100).fill(false))

export default function LifeGamePage(): ReactElement {
  const [border, setBorder] = useState(10)
  const [cells, setCells] = useState<Array<Array<boolean>>>(initialCells)

  const handleDecrease = () => {
    setBorder(border - 1)
    setCells(
      new Array((border - 1) ** 2)
        .fill(null)
        .map(() => new Array((border - 1) ** 2).fill(false))
    )
  }

  const handleIncrease = () => {
    setBorder(border + 1)
    setCells(
      new Array((border + 1) ** 2)
        .fill(null)
        .map(() => new Array((border + 1) ** 2).fill(false))
    )
  }

  const handleCellClick = (i: number) => {
    let newCells = [...cells]
    newCells[i] = !newCells[i]
    setCells(newCells)
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <div
          className={`grid gap-1`}
          style={{
            gridTemplateColumns: `repeat(${border}, 1fr)`,
            gridTemplateRows: `repeat(${border}, 1fr)`,
          }}
        >
          {cells.map((state, i) => (
            <div
              key={i}
              className={`${state ? 'bg-background-2' : 'bg-gray-300'}`}
              style={{
                width: (1000 - 4 * border) / border,
                height: (1000 - 4 * border) / border,
              }}
              onClick={() => handleCellClick(i)}
            />
          ))}
        </div>
        <div className={'flex gap-4'}>
          <button
            className={'bg-background-2 text-white px-4 py-2 rounded'}
            onClick={handleDecrease}
          >
            -
          </button>
          <button
            className={'bg-background-2 text-white px-4 py-2 rounded'}
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
    </Layout>
  )
}
