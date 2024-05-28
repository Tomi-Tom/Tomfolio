import React from 'react'

interface StatsProps {
  generations: number
  population: number
}

const Stats: React.FC<StatsProps> = ({ generations, population }) => {
  return (
    <div
      className={
        'border-background-2 flex w-full flex-col gap-4 rounded-2xl border'
      }
    >
      <div
        className={
          'bg-background-2 w-full items-center justify-center rounded-t-2xl p-4 pb-6'
        }
      >
        <h1 className={'text-text-2 text-center text-4xl font-bold uppercase'}>
          Stats
        </h1>
      </div>
      <div className={'flex flex-col gap-4 p-4'}>
        <div className={'flex flex-row gap-4'}>
          <p className={'text-text-2 text-xl font-bold'}>Generations:</p>
          <p className={'text-text-2 text-xl'}>{generations}</p>
        </div>
        <div className={'flex flex-row gap-4'}>
          <p className={'text-text-2 text-xl font-bold'}>Population:</p>
          <p className={'text-text-2 text-xl'}>{population}</p>
        </div>
      </div>
    </div>
  )
}

export default Stats
