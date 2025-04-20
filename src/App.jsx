import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SeoulTimerPage from './pages/SeoulTimer'
import LifeGame from './pages/LifeGame'
import MiniAppPage from './pages/MiniApp'
import LoveTimerPage from './pages/LoveTimer'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/miniapps" element={<MiniAppPage />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/seoul" element={<SeoulTimerPage />} />
      <Route path="/서울" element={<SeoulTimerPage />} />
      <Route path="/love" element={<LoveTimerPage />} />
      <Route path="/lifegame" element={<LifeGame />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
