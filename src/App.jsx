import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CV from './pages/CV'
import NotFound from './pages/NotFound'
import SeoulTimerPage from './pages/SeoulTimer'
import LifeGame from './pages/LifeGame'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/CV" element={<CV />} />
      <Route path="/seoul" element={<SeoulTimerPage />} />
      <Route path="/lifegame" element={<LifeGame />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
