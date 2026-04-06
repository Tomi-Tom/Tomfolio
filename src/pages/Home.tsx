// src/pages/Home.tsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HomeLayout } from '../layouts/HomeLayout'
import { useChapter } from '../context/ChapterContext'
import { ChapterHero } from '../components/chapters/ChapterHero'
import { ChapterAbout } from '../components/chapters/ChapterAbout'
import { ChapterSkills } from '../components/chapters/ChapterSkills'
import { ChapterExperience } from '../components/chapters/ChapterExperience'
import { ChapterProjects } from '../components/chapters/ChapterProjects'
import { ChapterMiniApps } from '../components/chapters/ChapterMiniApps'
import { ChapterContact } from '../components/chapters/ChapterContact'
import { ChapterFinalCTA } from '../components/chapters/ChapterFinalCTA'

const CHAPTER_COMPONENTS = [
  ChapterHero,
  ChapterAbout,
  ChapterSkills,
  ChapterExperience,
  ChapterProjects,
  ChapterMiniApps,
  ChapterContact,
  ChapterFinalCTA,
]

function ChaptersContainer() {
  const { chapterIndex, setChapterIndex, isMobile } = useChapter()
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingProgrammatically = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    isScrollingProgrammatically.current = true
    if (isMobile) {
      el.scrollTo({
        top: chapterIndex * window.innerHeight,
        behavior: 'smooth',
      })
    } else {
      el.scrollTo({
        left: chapterIndex * window.innerWidth,
        behavior: 'smooth',
      })
    }
    const t = setTimeout(() => {
      isScrollingProgrammatically.current = false
    }, 1000)
    return () => clearTimeout(t)
  }, [chapterIndex, isMobile])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      if (isScrollingProgrammatically.current) return
      const idx = isMobile
        ? Math.round(el.scrollTop / window.innerHeight)
        : Math.round(el.scrollLeft / window.innerWidth)
      if (idx !== chapterIndex) setChapterIndex(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [chapterIndex, setChapterIndex, isMobile])

  useEffect(() => {
    if (isMobile) return
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [isMobile])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setChapterIndex(chapterIndex + 1)
      if (e.key === 'ArrowLeft') setChapterIndex(chapterIndex - 1)
      if (e.key === 'Escape') setChapterIndex(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chapterIndex, setChapterIndex])

  return (
    <div
      ref={containerRef}
      className="no-scrollbar"
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100vw',
        height: '100vh',
        overflowX: isMobile ? 'hidden' : 'scroll',
        overflowY: isMobile ? 'scroll' : 'hidden',
        scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
        touchAction: isMobile ? 'pan-y' : 'pan-x',
      }}
    >
      {CHAPTER_COMPONENTS.map((ChapterComp, i) => (
        <div
          key={i}
          style={{
            width: '100vw',
            height: isMobile ? '100dvh' : '100vh',
            flexShrink: 0,
            scrollSnapAlign: 'start',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '36px',
            paddingBottom: '40px',
          }}
        >
          <motion.div
            initial={i === 0 ? { opacity: 0, y: 20 } : { opacity: 0.3, y: 0 }}
            animate={
              chapterIndex === i ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }
            }
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            style={{ width: '100%', height: '100%' }}
          >
            <ChapterComp />
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <HomeLayout>
      <ChaptersContainer />
    </HomeLayout>
  )
}
