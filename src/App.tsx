// ScrollToTop.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { BrowserRouter } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { AnimationProvider } from './contexts/AnimationContext'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { MainHeader } from './components/MainHeader'
import { useAuth } from './contexts/AuthContext'
import { AppRoutes } from './AppRoutes'


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { user } = useAuth()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <AnimationProvider>
          {/* Grid principal: 1 fila para el contenido, 1 para el bottom nav */}
          <div className="mx-auto min-h-screen grid grid-rows-[1fr_auto]">
            {/* Contenido principal (con padding-bottom para dejar hueco al nav en móviles) */}
            <div className={`${user && "pb-20"}`}>
              {user && <MainHeader />}
              <AppRoutes />
            </div>
            {user && <BottomNav />}
          </div>
        </AnimationProvider>
      </Provider>
    </BrowserRouter>
  )
}