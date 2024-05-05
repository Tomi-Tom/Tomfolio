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
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onClick={handleNextStep}
        >
          Next Step
        </button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onClick={handleDecrease}
        >
          -
        </button>
        <button className={'text-text-2'}>{border}</button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onClick={handleIncrease}
        >
          +
        </button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onClick={handlePlay}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onMouseDown={handleDecreaseSpeed}
        >
          Speed Down
        </button>
        <button className={'text-text-2'}>{speed}</button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onMouseDown={handleIncreaseSpeed}
        >
          Speed Up
        </button>
        <button
          className={'rounded bg-background-2 px-4 py-2 text-white'}
          onClick={handleSoup}
        >
          Soup
        </button>
      </div>
    </div>
  )
}

export default Controls
