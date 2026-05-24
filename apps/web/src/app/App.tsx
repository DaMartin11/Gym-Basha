import { createContext, useCallback, useEffect, useState } from 'react'
import './App.css'
import { subscribeToAuthState } from '../features/auth/services/auth.service'
import {
  getUserProfile,
  isOnboardingComplete,
} from '../features/auth/services/profile.service'
import { AppRoutes } from './routes/routes'
import type { UserProfile } from '@gym-basha/shared'

export const ProfileContext = createContext<{
  profile: UserProfile | null
  refreshProfile: () => Promise<void>
}>({
  profile: null,
  refreshProfile: async () => {},
})

function App() {
  const [appReady, setAppReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const refreshProfile = useCallback(async () => {
    const user = await new Promise<any>((resolve) => {
      const unsubscribe = subscribeToAuthState((u) => {
        unsubscribe()
        resolve(u)
      })
    })

    if (!user) {
      setUserProfile(null)
      return
    }

    try {
      const profile = await getUserProfile(user.uid)
      setUserProfile(profile)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      setUserProfile(null)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setIsAuthenticated(Boolean(user))

      if (!user) {
        setUserProfile(null)
        setAppReady(true)
        return
      }

      // Show UI immediately, fetch profile in background
      setAppReady(true)

      // Fetch profile asynchronously (non-blocking)
      getUserProfile(user.uid)
        .then((profile) => setUserProfile(profile))
        .catch((error) => {
          console.error('Failed to fetch user profile:', error)
          setUserProfile(null)
        })
    })

    return unsubscribe
  }, [])

  if (!appReady) {
    return <main className="app-loading">Checking authentication...</main>
  }

  return (
    <ProfileContext.Provider value={{ profile: userProfile, refreshProfile }}>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        hasProfile={isOnboardingComplete(userProfile)}
        userProfile={userProfile}
      />
    </ProfileContext.Provider>
  )
}

export default App
