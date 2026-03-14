// src/App.jsx
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

export default function App() {
  return (
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
  )
}
