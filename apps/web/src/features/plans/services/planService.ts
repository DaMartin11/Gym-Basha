import { auth } from '../../../shared/lib/firebase'
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

/**
 * Call the Cloud Function to generate a personalized workout plan
 * Returns both the AI-generated plan and storage-ready plan
 */
export async function generateWorkoutPlan(
  userProfile: UserProfile
): Promise<{
  generated: LLMGeneratedPlan
  storagePlan: Omit<WorkoutPlan, 'id'>
}> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User not authenticated')
    }

    // Get the Cloud Functions base URL
    // For local emulation: http://localhost:5001/project-id/region/generateWorkoutPlanEndpoint
    // For production: Firebase automatically handles routing
    const response = await fetch(
      `${window.location.origin}/api/generateWorkoutPlan`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userProfile,
          userId: user.uid,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: GeneratePlanResponse = await response.json()

    if (!data.success || !data.data) {
      throw new Error(data.error || 'Failed to generate workout plan')
    }

    return data.data
  } catch (error) {
    console.error('Failed to generate workout plan:', error)
    throw error instanceof Error
      ? error
      : new Error('Unknown error generating workout plan')
  }
}
