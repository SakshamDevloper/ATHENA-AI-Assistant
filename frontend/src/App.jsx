import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Assistant from './pages/Assistant'
import History from './pages/History'
import Voice from './pages/Voice'
import Features from './pages/Features'
import Partners from './pages/Partners'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/voice" element={<Voice />} />
        <Route path="/history" element={<History />} />
        <Route path="/features" element={<Features />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
