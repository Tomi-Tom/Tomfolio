interface LevelDotsProps {
  level: number
  max?: number
}

export function LevelDots({ level, max = 4 }: LevelDotsProps) {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`level-dot ${i < level ? 'filled' : ''}`} />
      ))}
    </div>
  )
}
