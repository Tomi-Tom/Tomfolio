import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LifeGame from './pages/LifeGame'
import MiniAppPage from './pages/MiniApp'
import LoveTimerPage from './pages/LoveTimer'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import MemoryGame from './pages/MemoryGame'
import WeatherApp from './pages/WeatherApp'
import PomodoroTimer from './pages/PomodoroTimer'
import ADHDPomodoro from './pages/ADHDPomodoro'
import TaskBreaker from './pages/TaskBreaker'
import MoodTracker from './pages/MoodTracker'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/miniapps" element={<MiniAppPage />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/love" element={<LoveTimerPage />} />
      <Route path="/lifegame" element={<LifeGame />} />
      <Route path="/memory" element={<MemoryGame />} />
      <Route path="/weather" element={<WeatherApp />} />
      <Route path="/pomodoro" element={<PomodoroTimer />} />
      <Route path="/adhd-pomodoro" element={<ADHDPomodoro />} />
      <Route path="/task-breaker" element={<TaskBreaker />} />
      <Route path="/mood-tracker" element={<MoodTracker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
