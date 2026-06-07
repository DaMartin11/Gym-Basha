import { callLLM, parseLLMJSON } from '../integrations/llm.js'
import type { UserProfile, FitnessGoal, WorkoutPlan } from '@gym-basha/shared'

// Internal types for LLM response structure
export interface LLMExercise {
  name: string
  sets: number
  reps: string
  restSeconds: number
  notes?: string
}

export interface LLMWorkoutDay {
  day: string
  focus: string
  exercises: LLMExercise[]
  duration: number
}

export interface LLMGeneratedPlan {
  weekNumber: number
  goals: FitnessGoal[]
  experience: string
  workoutDays: LLMWorkoutDay[]
  notes: string
}

/**
 * Generate a personalized weekly workout plan based on user profile
 * Returns the raw LLM-generated plan structure
 */
export async function generateRawWorkoutPlan(
  userProfile: UserProfile
): Promise<LLMGeneratedPlan> {
  const systemPrompt = buildSystemPrompt(userProfile)
  const userMessage = buildUserMessage(userProfile)

  try {
    const response = await callLLM(userMessage, systemPrompt, {
      model: 'openai/gpt-4.1',
      temperature: 0.7,
      maxTokens: 2000,
    })

    const plan = parseLLMJSON<LLMGeneratedPlan>(response)
    return plan
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Failed to generate workout plan:', message)
    throw new Error(`Failed to generate personalized workout plan: ${message}`)
  }
}

/**
 * Transform LLM-generated plan to shared WorkoutPlan format for storage
 */
export function transformToStoragePlan(
  userId: string,
  generatedPlan: LLMGeneratedPlan
): Omit<WorkoutPlan, 'id'> {
  const now = new Date()
  const weekStartDate = new Date(now)
  weekStartDate.setDate(now.getDate() - now.getDay() + 1) // Set to Monday

  return {
    userId,
    weekStartsOn: weekStartDate.toISOString().split('T')[0],
    goal: generatedPlan.goals[0], // Use primary goal
    sessions: generatedPlan.workoutDays.map((day) => ({
      id: `${userId}-${day.day.toLowerCase()}`,
      title: day.focus,
      scheduledDay: day.day,
      exercises: day.exercises.map((ex) => ({
        exerciseId: ex.name.toLowerCase().replace(/\s+/g, '-'),
        sets: ex.sets,
        reps: parseInt(ex.reps.split('-')[0], 10) || undefined,
        durationSeconds: undefined,
        restSeconds: ex.restSeconds,
      })),
    })),
  }
}

function buildSystemPrompt(userProfile: UserProfile): string {
  const primaryGoal = userProfile.goals[0] || 'general fitness'
  const formattedGoal = primaryGoal.replace(/_/g, ' ')

  return `You are an expert fitness coach specializing in personalized workout programs for beginners.
Your role is to create safe, effective, and progressively challenging workout plans.

Key principles:
- Always prioritize form and safety over intensity
- Provide exercise alternatives for different equipment availability
- Include warm-up and cool-down recommendations
- Adapt intensity based on experience level
- Focus on sustainable, habit-building routines

User Profile Context:
- Experience Level: ${userProfile.experienceLevel}
- Primary Goal: ${formattedGoal}
- All Goals: ${userProfile.goals.map((g) => g.replace(/_/g, ' ')).join(', ')}
- Equipment Available: ${userProfile.equipment.join(', ')}
- Age: ${userProfile.age || 'not specified'}
- Weight: ${userProfile.weightKg}kg

Generate a JSON response with the following structure:
{
  "weekNumber": 1,
  "goals": ["${userProfile.goals[0]}", "${userProfile.goals[1] || userProfile.goals[0]}"],
  "experience": "${userProfile.experienceLevel}",
  "workoutDays": [
    {
      "day": "Monday",
      "focus": "Upper Body Strength",
      "exercises": [
        {
          "name": "Exercise name",
          "sets": 3,
          "reps": "8-10",
          "restSeconds": 60,
          "notes": "Form tips or modifications"
        }
      ],
      "duration": 45
    }
  ],
  "notes": "Overall plan guidance and progression tips"
}`
}

function buildUserMessage(userProfile: UserProfile): string {
  return `Create a personalized weekly workout plan for Week 1 for a ${userProfile.experienceLevel} fitness enthusiast.

Goals: ${userProfile.goals.join(', ')}
Available Equipment: ${userProfile.equipment.join(', ')}
${userProfile.age ? `Age: ${userProfile.age}` : ''}
Weight: ${userProfile.weightKg}kg

Please provide a comprehensive plan with:
1. 3-5 workout days with clear focus areas
2. Specific exercises with sets, reps, and rest periods
3. Exercise alternatives based on equipment availability
4. Progressive overload suggestions
5. Recovery and nutrition notes

Return only valid JSON.`
}
