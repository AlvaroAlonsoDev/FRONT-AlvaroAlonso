import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import NavBar from './components/NavBar'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import { BottomNav } from './components/BottomNav'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="max-w-3xl mx-auto">
          <Routes>
            {/* Rutas privadas */}
            <Route path="/" element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Simula el /post/:id */}
            <Route path="/post/:id" element={<div className="p-6">Página de post individual</div>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </AuthProvider>
  )
}
