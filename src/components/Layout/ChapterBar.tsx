// src/components/Layout/ChapterBar.tsx
import { useChapter, CHAPTER_LABELS } from '../../context/ChapterContext'

export function ChapterBar() {
  const { chapterIndex, setChapterIndex } = useChapter()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40px',
        zIndex: 40,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {CHAPTER_LABELS.map((ch, i) => {
        const isActive = i === chapterIndex
        return (
          <button
            key={ch.num}
            onClick={() => setChapterIndex(i)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              borderRight:
                i < CHAPTER_LABELS.length - 1
                  ? '1px solid var(--color-border)'
                  : 'none',
              borderTop: isActive
                ? '1px solid var(--color-gold)'
                : '1px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0 12px',
              transition: 'background 0.2s',
            }}
          >
            <span
              className="hud-caption"
              style={{
                color: isActive ? 'var(--color-gold)' : 'var(--color-text-dim)',
              }}
            >
              {ch.num}
            </span>
            <span
              className="hud-caption"
              style={{
                color: isActive
                  ? 'rgba(212,175,55,0.8)'
                  : 'var(--color-text-dim)',
                letterSpacing: '0.1em',
              }}
            >
              {ch.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
