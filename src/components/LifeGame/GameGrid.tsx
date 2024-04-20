import React from 'react'

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
  function isLeftMouseButtonPressed(event) {
    return event.buttons === 1
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`grid`}
        style={{
          gridTemplateColumns: `repeat(${border}, 1fr)`,
          gridTemplateRows: `repeat(${border}, 1fr)`,
        }}
      >
        {cells.flat().map((state, i) => (
          <div
            key={i}
            className={`${state ? 'bg-gray-300' : 'bg-background-2'}`}
            style={{
              width: (1100 - 1 * border) / border,
              height: (1100 - 1 * border) / border,
              marginRight: 1,
              marginBottom: 1,
            }}
            onMouseEnter={(e) => {
              if (isLeftMouseButtonPressed(e)) {
                handleCellClick(i)
              }
            }}
            onMouseDown={() => handleCellClick(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default GameGrid
