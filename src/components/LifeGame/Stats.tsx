import React from 'react'

interface StatsProps {
  generations: number
  population: number
}

const Stats: React.FC<StatsProps> = ({ generations, population }) => {
  return (
    <div
      className={
        'flex flex-col gap-4 w-96 border border-background-2 rounded-2xl'
      }
    >
      <div
        className={
          'justify-center items-center w-full bg-background-2 rounded-t-2xl p-4 pb-6'
        }
      >
        <h1 className={'text-4xl text-center font-bold text-text-2 uppercase'}>
          Stats
        </h1>
      </div>
      <div className={'flex flex-row gap-4'}>
        <p className={'text-text-2 text-xl font-bold'}>Generations:</p>
        <p className={'text-text-2 text-xl'}>{generations}</p>
      </div>
      <div className={'flex flex-row gap-4'}>
        <p className={'text-text-2 text-xl font-bold'}>Population:</p>
        <p className={'text-text-2 text-xl'}>{population}</p>
      </div>
    </div>
  )
}

export default Stats
