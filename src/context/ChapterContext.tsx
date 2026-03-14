// src/context/ChapterContext.tsx
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export const CHAPTER_COUNT = 5

export const CHAPTER_LABELS = [
  { num: '01', name: 'Intro' },
  { num: '02', name: 'About' },
  { num: '03', name: 'Skills' },
  { num: '04', name: 'Projects' },
  { num: '05', name: 'Contact' },
] as const

export const CHAPTER_Z_POSITIONS = [-50, -200, -350, -500, -650] as const

interface ChapterContextValue {
  chapterIndex: number
  setChapterIndex: (i: number) => void
  isMobile: boolean
}

const ChapterContext = createContext<ChapterContextValue | null>(null)

export function ChapterProvider({ children }: { children: ReactNode }) {
  const [chapterIndex, setChapterIndexState] = useState(0)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setChapterIndex = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(CHAPTER_COUNT - 1, i))
    setChapterIndexState(clamped)
  }, [])

  return (
    <ChapterContext.Provider value={{ chapterIndex, setChapterIndex, isMobile }}>
      {children}
    </ChapterContext.Provider>
  )
}

export function useChapter() {
  const ctx = useContext(ChapterContext)
  if (!ctx) throw new Error('useChapter must be used inside ChapterProvider')
  return ctx
}
