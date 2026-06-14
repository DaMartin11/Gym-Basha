import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '../../../shared/lib/firebase'
import type { UserProfile, WorkoutPlan } from '@gym-basha/shared'

export interface LLMGeneratedPlan {
  weekNumber: number
  goals: string[]
  experience: string
  workoutDays: WorkoutDay[]
  notes: string
}

export interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
  duration: number
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  restSeconds: number
  notes?: string
}

interface GeneratePlanResponse {
  success: boolean
  data?: {
    generated: LLMGeneratedPlan
    storagePlan: Omit<WorkoutPlan, 'id'>
  }
  error?: string
}

const FUNCTIONS_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:5001/demo-no-project/us-central1'
  : `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net`

/**
 * Call the Cloud Function to generate a personalized workout plan, then
 * persist it to Firestore under the current user (client-side write, same
 * pattern as the user profile).
 */
export async function generateWorkoutPlan(userProfile: UserProfile): Promise<{
  generated: LLMGeneratedPlan
  saved: WorkoutPlan
}> {
  const user = auth.currentUser
  if (!user) throw new Error('User not authenticated')

  const response = await fetch(`${FUNCTIONS_BASE_URL}/generateWorkoutPlanEndpoint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userProfile, userId: user.uid }),
  })

  const data: GeneratePlanResponse = await response.json()

  if (!data.success || !data.data) {
    throw new Error(data.error ?? 'Failed to generate workout plan')
  }

  const saved = await saveWorkoutPlan(user.uid, data.data.storagePlan)

  return { generated: data.data.generated, saved }
}

/**
 * Save a generated plan to Firestore under users/{uid}/workoutPlans.
 */
async function saveWorkoutPlan(
  uid: string,
  plan: Omit<WorkoutPlan, 'id'>,
): Promise<WorkoutPlan> {
  const plansRef = collection(db, 'users', uid, 'workoutPlans')
  const docRef = await addDoc(plansRef, {
    ...plan,
    createdAt: serverTimestamp(),
  })

  return { id: docRef.id, ...plan }
}

/**
 * Fetch all saved workout plans for the current user from Firestore.
 */
export async function getUserWorkoutPlans(): Promise<WorkoutPlan[]> {
  const user = auth.currentUser
  if (!user) throw new Error('User not authenticated')

  const plansRef = collection(db, 'users', user.uid, 'workoutPlans')
  const q = query(plansRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as WorkoutPlan)
}
