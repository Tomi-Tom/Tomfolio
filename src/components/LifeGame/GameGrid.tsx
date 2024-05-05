import React, { useRef, useEffect } from 'react'

interface GameGridProps {
  border: number
  cells: boolean[][]
  handleCellClick: (i: number) => void
}

const GameGrid: React.FC<GameGridProps> = ({
  border,
  cells,
  handleCellClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridcells = []
  for (let i = 0; i < border; i++) {
    gridcells.push([])
    for (let j = 0; j < border; j++) {
      gridcells[i].push(cells[i * border + j])
    }
  }
  const canvasWidth = window.innerHeight - 100
  const cellSize = canvasWidth / border

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw cells
    gridcells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        ctx.fillStyle = cell ? '#f5f5f5' : '#666'
        ctx.fillRect(
          colIndex * (cellSize + 0.2),
          rowIndex * (cellSize + 0.2),
          cellSize,
          cellSize
        )
      })
    })
  }, [gridcells, border, cellSize])

  function handleCanvasClick(
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const col = Math.floor(x / (cellSize + 0.2))
    const row = Math.floor(y / (cellSize + 0.2))
    const index = row * border + col
    handleCellClick(index)
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasWidth}
        onClick={handleCanvasClick}
        style={{ border: '2px solid' }}
      />
    </div>
  )
}

export default GameGrid
