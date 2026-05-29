import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { subscribeToAuthState } from '../features/auth/services/auth.service'
import {
  getUserProfile,
  isOnboardingComplete,
} from '../features/auth/services/profile.service'
import { AppRoutes } from './routes/routes'
import type { UserProfile } from '@gym-basha/shared'
import { auth } from '../shared/lib/firebase'

export const ProfileContext = createContext<{
  profile: UserProfile | null
  profileLoading: boolean
  profileError: string | null
  refreshProfile: () => Promise<void>
}>({
  profile: null,
  profileLoading: true,
  profileError: null,
  refreshProfile: async () => {},
})

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [authReady, setAuthReady] = useState(false)

  // Track the last loaded UID to prevent re-fetching on token refresh
  const lastLoadedUidRef = useRef<string | null>(null)

  const loadProfile = async (uid: string) => {
    setProfileLoading(true)
    setProfileError(null)

    try {
      const profile = await getUserProfile(uid)
      if (isOnboardingComplete(profile)) {
        setHasProfile(true)
        setUserProfile(profile)
      } else {
        setHasProfile(false)
        setUserProfile(null)
      }
      lastLoadedUidRef.current = uid
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load profile'
      console.error('Profile fetch error:', message)
      setProfileError(message)
      // On error: don't assume no profile, keep loading state
      setHasProfile(false)
      setUserProfile(null)
    } finally {
      setProfileLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      setIsAuthenticated(!!user)

      if (!user) {
        setHasProfile(false)
        setUserProfile(null)
        setProfileLoading(false)
        setProfileError(null)
        setAuthReady(true)
        lastLoadedUidRef.current = null
        return
      }

      setAuthReady(true)

      // Only fetch profile if this is a NEW user (different UID)
      // This prevents re-fetching on token refresh (which fires this listener too)
      if (lastLoadedUidRef.current === user.uid) {
        console.log('[App] Same user, skipping profile re-fetch')
        return
      }

      console.log('[App] New user signed in, loading profile')
      void loadProfile(user.uid)
    })

    return () => unsubscribe()
  }, [])

  const refreshProfile = async () => {
    const user = auth.currentUser
    if (!user) return
    await loadProfile(user.uid)
  }

  // Show loading only on initial load
  if (!authReady) {
    return <div className="app-loading">Loading...</div>
  }

  // Show error with retry button if profile fetch fails
  if (isAuthenticated && profileError) {
    return (
      <div className="app-loading">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Couldn't load your profile</p>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            {profileError}
          </p>
          <button
            onClick={() => {
              const user = auth.currentUser
              if (user) void loadProfile(user.uid)
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: '#426500',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <ProfileContext.Provider
      value={{
        profile: userProfile,
        profileLoading,
        profileError,
        refreshProfile,
      }}
    >
      <AppRoutes
        isAuthenticated={isAuthenticated}
        hasProfile={hasProfile}
        userProfile={userProfile}
        profileError={profileError}
      />
    </ProfileContext.Provider>
  )
}

export default App
