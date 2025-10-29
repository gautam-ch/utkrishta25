import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TechfestLandingPage from './components/TechfestLandingPage'
import SchedulePage from './components/SchedulePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TechfestLandingPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  )
}