import { useCallback, useEffect, useState } from 'react'
import {
  generateWorkoutPlan,
  getUserWorkoutPlans,
  type LLMGeneratedPlan,
} from '../services/planService'
import type { UserProfile, WorkoutPlan } from '@gym-basha/shared'

type PlanState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'generating' }
  | { status: 'success'; plan: LLMGeneratedPlan; saved: WorkoutPlan }
  | { status: 'error'; message: string }

export function usePlan(userProfile: UserProfile | null) {
  const [state, setState] = useState<PlanState>({ status: 'idle' })
  const [savedPlans, setSavedPlans] = useState<WorkoutPlan[]>([])

  // Load existing plans on mount
  useEffect(() => {
    if (!userProfile) return

    setState({ status: 'loading' })

    getUserWorkoutPlans()
      .then((plans) => {
        setSavedPlans(plans)
        if (plans.length > 0) {
          // Most recent plan is already displayed via savedPlans[0]
          setState({ status: 'idle' })
        } else {
          setState({ status: 'idle' })
        }
      })
      .catch((err: unknown) => {
        console.error('Failed to load plans:', err)
        setState({ status: 'idle' })
      })
  }, [userProfile])

  const generate = useCallback(async () => {
    if (!userProfile) return

    setState({ status: 'generating' })

    try {
      const result = await generateWorkoutPlan(userProfile)
      setSavedPlans((prev) => [result.saved, ...prev])
      setState({ status: 'success', plan: result.generated, saved: result.saved })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to generate plan'
      setState({ status: 'error', message })
    }
  }, [userProfile])

  const latestPlan = savedPlans[0] ?? null

  return { state, savedPlans, latestPlan, generate }
}
