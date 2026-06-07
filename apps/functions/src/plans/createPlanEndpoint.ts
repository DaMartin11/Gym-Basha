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
 * HTTP Cloud Function to generate a personalized workout plan
 *
 * POST /generateWorkoutPlan
 * Body: { userProfile: UserProfile }
 * Returns: { success: boolean, data?: WorkoutPlan, error?: string }
 */
export const generateWorkoutPlanEndpoint = functions.https.onRequest(
  async (req, res) => {
    // Only accept POST requests
    if (req.method !== 'POST') {
      res.status(405).json({
        success: false,
        error: 'Method not allowed. Use POST.',
      } satisfies CreatePlanResponse)
      return
    }

    try {
      // Validate request body
      const { userProfile } = req.body as CreatePlanRequest

      if (!userProfile) {
        res.status(400).json({
          success: false,
          error: 'Missing userProfile in request body',
        } satisfies CreatePlanResponse)
        return
      }

      // Validate required profile fields
      const requiredFields: (keyof UserProfile)[] = [
        'goals',
        'experienceLevel',
        'equipment',
      ]
      for (const field of requiredFields) {
        if (!userProfile[field]) {
          res.status(400).json({
            success: false,
            error: `Missing required field: ${field}`,
          } satisfies CreatePlanResponse)
          return
        }
      }

      // Get userId from request body or throw error
      const { userId } = req.body
      if (!userId) {
        res.status(400).json({
          success: false,
          error: 'Missing userId in request body',
        } satisfies CreatePlanResponse)
        return
      }

      // Generate the plan
      console.log(
        `[generateWorkoutPlan] Generating plan for user ${userId} with goals: ${userProfile.goals.join(', ')}`
      )
      const generatedPlan = await generateRawWorkoutPlan(userProfile)
      const storagePlan = transformToStoragePlan(userId, generatedPlan)

      // Success response
      res.status(200).json({
        success: true,
        data: {
          generated: generatedPlan,
          storagePlan,
        },
      } satisfies CreatePlanResponse)
    } catch (error) {
      console.error('[generateWorkoutPlan] Error:', error)

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'

      res.status(500).json({
        success: false,
        error: errorMessage,
      } satisfies CreatePlanResponse)
    }
  }
)
