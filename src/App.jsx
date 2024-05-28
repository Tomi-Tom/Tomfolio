import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SeoulTimerPage from './pages/SeoulTimer'
import LifeGame from './pages/LifeGame'
import MiniAppPage from './pages/MiniApp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/miniapps" element={<MiniAppPage />} />
      <Route path="/seoul" element={<SeoulTimerPage />} />
      <Route path="/서울" element={<SeoulTimerPage />} />
      <Route path="/lifegame" element={<LifeGame />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
