import React from 'react'

interface ControlsProps {
  border: number
  playing: boolean
  handleNextStep: () => void
  handlePlay: () => void
  handleReset: () => void
  handleIncrease: () => void
  handleDecrease: () => void
}

const Controls: React.FC<ControlsProps> = ({
  border,
  speed,
  playing,
  handleNextStep,
  handlePlay,
  handleReset,
  handleIncrease,
  handleDecrease,
  handleIncreaseSpeed,
  handleDecreaseSpeed,
  handleSoup,
}) => {
  return (
    <div className="flex flex-col gap-4">
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
        <button
          className={'bg-background-2 text-white px-4 py-2 rounded'}
          onMouseDown={handleDecreaseSpeed}
        >
          Speed Down
        </button>
        <button className={'text-text-2'}>{speed}</button>
        <button
          className={'bg-background-2 text-white px-4 py-2 rounded'}
          onMouseDown={handleIncreaseSpeed}
        >
          Speed Up
        </button>
        <button
          className={'bg-background-2 text-white px-4 py-2 rounded'}
          onClick={handleSoup}
        >
          Soup
        </button>
      </div>
    </div>
  )
}

export default Controls
