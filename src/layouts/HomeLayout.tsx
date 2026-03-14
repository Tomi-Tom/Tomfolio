// src/layouts/HomeLayout.tsx
import { type ReactNode } from 'react'
import { ChapterProvider } from '../context/ChapterContext'
import { GearUniverse } from '../components/Three/GearUniverse'
import { StatusBar } from '../components/Layout/StatusBar'
import { ChapterBar } from '../components/Layout/ChapterBar'
import { HUDFrame } from '../components/Layout/HUDFrame'

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <ChapterProvider>
      <GearUniverse />
      <StatusBar />
      <ChapterBar />
      <HUDFrame />
      {children}
    </ChapterProvider>
  )
}
