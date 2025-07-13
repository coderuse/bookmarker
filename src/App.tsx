import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import './App.scss'

function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App