import { Routes, Route } from 'react-router-dom'
import { History, Home } from '../pages'
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
