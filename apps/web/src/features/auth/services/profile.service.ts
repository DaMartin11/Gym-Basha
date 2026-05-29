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
    console.log('[isOnboardingComplete] No profile found')
    return false
  }

  const checks = {
    hasGoals: profile.goals?.length > 0,
    hasExperience: Boolean(profile.experienceLevel),
    hasAge: Boolean(profile.age),
    hasWeight: Boolean(profile.weightKg),
    hasEquipment: profile.equipment?.length > 0,
    hasDietary: profile.dietaryPreferences?.length > 0,
  }

  const isComplete = Object.values(checks).every(Boolean)

  if (!isComplete) {
    console.log('[isOnboardingComplete] Missing fields:', {
      profile,
      checks,
      missing: Object.entries(checks)
        .filter(([, ok]) => !ok)
        .map(([key]) => key),
    })
  }

  return isComplete
}
