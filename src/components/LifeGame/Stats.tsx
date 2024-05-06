import React from 'react'

interface StatsProps {
  generations: number
  population: number
}

const Stats: React.FC<StatsProps> = ({ generations, population }) => {
  return (
    <div
      className={
        'flex w-full flex-col gap-4 rounded-2xl border border-background-2'
      }
    >
      <div
        className={
          'w-full items-center justify-center rounded-t-2xl bg-background-2 p-4 pb-6'
        }
      >
        <h1 className={'text-center text-4xl font-bold uppercase text-text-2'}>
          Stats
        </h1>
      </div>
      <div className={'flex flex-col gap-4 p-4'}>
        <div className={'flex flex-row gap-4'}>
          <p className={'text-xl font-bold text-text-2'}>Generations:</p>
          <p className={'text-xl text-text-2'}>{generations}</p>
        </div>
        <div className={'flex flex-row gap-4'}>
          <p className={'text-xl font-bold text-text-2'}>Population:</p>
          <p className={'text-xl text-text-2'}>{population}</p>
        </div>
      </div>
    </div>
  )
}

export default Stats
