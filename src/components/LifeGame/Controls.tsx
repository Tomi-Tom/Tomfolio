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
      <div
        className={'flex flex-row gap-4 max-lg:flex-col max-lg:items-center'}
      >
        <div className={'flex flex-row gap-4 '}>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onClick={handleNextStep}
          >
            Next Step
          </button>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onClick={handleDecrease}
          >
            -
          </button>
          <button className={'text-text-2'}>{border}</button>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className={'flex flex-row gap-4'}>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onClick={handlePlay}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onClick={handleSoup}
          >
            Soup
          </button>
        </div>
        <div className={'flex flex-row gap-4'}>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onMouseDown={handleDecreaseSpeed}
          >
            Speed Down
          </button>
          <button className={'text-text-2'}>{speed}</button>
          <button
            className={'bg-background-2 text-white rounded px-4 py-2'}
            onMouseDown={handleIncreaseSpeed}
          >
            Speed Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Controls
