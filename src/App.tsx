import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute'
import { BottomNav } from './components/BottomNav'
import SinglePost from './pages/SinglePost'
import { AnimationProvider } from './contexts/AnimationContext'
import { Provider } from 'react-redux'
import { store } from './store/store'
import CreatePost from './pages/CreatePost'
import { MainHeader } from './components/MainHeader'
import { useAuth } from './contexts/AuthContext'
import Ranking from './pages/Ranking'
import MeetBack from './pages/MeetBack'
import Notifications from './pages/Notifications'

export default function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AnimationProvider>
          {/* Grid principal: 1 fila para el contenido, 1 para el bottom nav */}
          <div className="max-w-md mx-auto min-h-screen grid grid-rows-[1fr_auto]">
            {/* Contenido principal (con padding-bottom para dejar hueco al nav en móviles) */}
            <div className="pb-20 bg-gray-100"> {/* pb-24 para dar espacio bajo el contenido */}
              {
                user && <MainHeader />
              }

              <Routes>
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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<SinglePost />} />
                {/* CreatePost */}
                <Route path="/post/create" element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                } />
                <Route path="/ranking" element={
                  <PrivateRoute>
                    <Ranking />
                  </PrivateRoute>
                } />
                <Route path="/meetback" element={
                  <PrivateRoute>
                    <MeetBack />
                  </PrivateRoute>
                } />
                <Route path="/notifications" element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            {
              user && <BottomNav />
            }
          </div>
        </AnimationProvider>
      </Provider>
    </BrowserRouter>
  )
}
