import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../../../shared/lib/firebase'
import type { UserProfile } from '@gym-basha/shared'

function removeUndefinedValues(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, unknown>,
  )
}

export async function createUserProfile(
  uid: string,
  data: Omit<UserProfile, 'id'>,
): Promise<void> {
  const userRef = doc(db, 'users', uid)
  const cleanedData = removeUndefinedValues({
    id: uid,
    ...data,
  })
  await setDoc(userRef, cleanedData)
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    return null
  }

  return snapshot.data() as UserProfile
}

export function isOnboardingComplete(profile: UserProfile | null): boolean {
  if (!profile) {
    return false
  }

  return profile.goals.length > 0 && Boolean(profile.experienceLevel)
}
