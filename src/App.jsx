import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CV from './pages/CV'
import NotFound from './pages/NotFound'
import SeoulTimerPage from './pages/SeoulTimer'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/CV" element={<CV />} />
      <Route path="/seoul" element={<SeoulTimerPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
