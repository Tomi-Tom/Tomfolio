import React from 'react'

interface StatsProps {
  generations: number
  population: number
}

const Stats: React.FC<StatsProps> = ({ generations, population }) => {
  return (
    <div
      className="void-panel flex w-full flex-col gap-4 rounded-2xl"
    >
      <div
        className="w-full items-center justify-center rounded-t-2xl p-4 pb-6"
        style={{ background: 'var(--color-void-elevated)' }}
      >
        <h1 className="text-gold text-center text-4xl font-bold uppercase">
          Stats
        </h1>
      </div>
      <div className={'flex flex-col gap-4 p-4'}>
        <div className={'flex flex-row gap-4'}>
          <p className="text-gold-dim text-xl font-bold">Generations:</p>
          <p className="text-gold text-xl">{generations}</p>
        </div>
        <div className={'flex flex-row gap-4'}>
          <p className="text-gold-dim text-xl font-bold">Population:</p>
          <p className="text-gold text-xl">{population}</p>
        </div>
      </div>
    </div>
  )
}

export default Stats
