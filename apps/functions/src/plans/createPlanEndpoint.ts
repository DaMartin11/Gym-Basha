import * as functions from 'firebase-functions'
import {
  generateRawWorkoutPlan,
  transformToStoragePlan,
  type LLMGeneratedPlan,
} from './generateWorkoutPlan.js'
import type { UserProfile, WorkoutPlan } from '@gym-basha/shared'

interface CreatePlanRequest {
  userProfile: UserProfile
  userId: string
}

interface CreatePlanResponse {
  success: boolean
  data?: {
    generated: LLMGeneratedPlan
    storagePlan: Omit<WorkoutPlan, 'id'>
  }
  error?: string
}

/**
 * Generates a personalized workout plan via the LLM and returns it.
 * Persistence to Firestore is handled client-side (same pattern as the
 * user profile), so this function stays stateless and credential-free.
 */
export const generateWorkoutPlanEndpoint = functions.https.onRequest(
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' })
      return
    }

    const { userProfile, userId } = req.body as CreatePlanRequest

    if (!userId) {
      res.status(400).json({ success: false, error: 'Missing userId in request body' })
      return
    }

    if (!userProfile) {
      res.status(400).json({ success: false, error: 'Missing userProfile in request body' })
      return
    }

    const requiredFields: (keyof UserProfile)[] = ['goals', 'experienceLevel', 'equipment']
    for (const field of requiredFields) {
      if (!userProfile[field]) {
        res.status(400).json({ success: false, error: `Missing required field: ${field}` })
        return
      }
    }

    try {
      console.log(`[generateWorkoutPlan] Generating plan for user ${userId} with goals: ${userProfile.goals.join(', ')}`)

      const generatedPlan = await generateRawWorkoutPlan(userProfile)
      const storagePlan = transformToStoragePlan(userId, generatedPlan)

      res.status(200).json({
        success: true,
        data: {
          generated: generatedPlan,
          storagePlan,
        },
      } satisfies CreatePlanResponse)
    } catch (error) {
      console.error('[generateWorkoutPlan] Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(500).json({ success: false, error: errorMessage } satisfies CreatePlanResponse)
    }
  }
)
