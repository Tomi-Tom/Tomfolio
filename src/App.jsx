import { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LifeGame from './pages/LifeGame'
import MiniAppPage from './pages/MiniApp'
import LoveTimerPage from './pages/LoveTimer'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import MemoryGame from './pages/MemoryGame'
import WeatherApp from './pages/WeatherApp'
import PomodoroTimer from './pages/PomodoroTimer'
import TaskBreaker from './pages/TaskBreaker'
import MoodTracker from './pages/MoodTracker'

// ── Global orange cursor glow ──
function CursorGlow() {
  const cursorRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      const cursor = cursorRef.current
      if (cursor) {
        // Smooth follow
        current.current.x += (pos.current.x - current.current.x) * 0.18
        current.current.y += (pos.current.y - current.current.y) * 0.18
        cursor.style.left = `${current.current.x}px`
        cursor.style.top  = `${current.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <div ref={cursorRef} className="cursor-glow hidden lg:block" aria-hidden />
}

export default function App() {
  return (
    <>
      <CursorGlow />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/miniapps" element={<MiniAppPage />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/love" element={<LoveTimerPage />} />
        <Route path="/lifegame" element={<LifeGame />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/pomodoro" element={<PomodoroTimer />} />
        <Route path="/task-breaker" element={<TaskBreaker />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
