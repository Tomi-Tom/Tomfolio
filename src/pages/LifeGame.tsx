'use client'

import { ReactElement, useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function LifeGamePage(): ReactElement {
  const [border, setBorder] = useState(10)

  const handleDecrease = () => {
    setBorder(border - 1)
  }

  const handleIncrease = () => {
    setBorder(border + 1)
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
          {Array.from({ length: border * border }, (_, i) => (
            <div
              key={i}
              className={`bg-gray-200 border border-gray-300`}
              style={{
                width: (1000 - 4 * border) / border,
                height: (1000 - 4 * border) / border,
              }}
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
