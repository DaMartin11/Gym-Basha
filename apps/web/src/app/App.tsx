import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthPage } from '../features/auth/AuthPage'
import { subscribeToAuthState } from '../features/auth/services/auth.service'
import { DashboardPage } from '../features/dashboard/DashboardPage'

function App() {
  const [authReady, setAuthReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setIsAuthenticated(Boolean(user))
      setAuthReady(true)
    })

    return unsubscribe
  }, [])

  if (!authReady) {
    return <main className="app-loading">Checking authentication...</main>
  }

  return (
    <Routes>
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/dashboard' : '/auth'} replace />}
      />
    </Routes>
  )
}

export default App
