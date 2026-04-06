export type FitnessGoal =
  | 'build_strength'
  | 'lose_weight'
  | 'improve_endurance'
  | 'increase_mobility'
  | 'build_consistency'

export type ExperienceLevel = 'beginner' | 'returning' | 'intermediate'

export type UserProfile = {
  id: string
  displayName: string
  age?: number
  weightKg?: number
  goals: FitnessGoal[]
  experienceLevel: ExperienceLevel
  equipment: string[]
  dietaryPreferences: string[]
  notificationPreference: NotificationPreference
}

export type Exercise = {
  id: string
  name: string
  muscleGroups: string[]
  equipment?: string
  difficulty: ExperienceLevel
  instructions?: string[]
}

export type WorkoutPlan = {
  id: string
  userId: string
  weekStartsOn: string
  goal: FitnessGoal
  sessions: WorkoutSession[]
}

export type WorkoutSession = {
  id: string
  title: string
  scheduledDay: string
  exercises: WorkoutExercise[]
}

export type WorkoutExercise = {
  exerciseId: string
  sets: number
  reps?: number
  durationSeconds?: number
  restSeconds?: number
}

export type MealPlan = {
  id: string
  userId: string
  weekStartsOn: string
  dailyTargets?: MacroTargets
  meals: MealSuggestion[]
}

export type MacroTargets = {
  calories?: number
  proteinGrams?: number
  carbsGrams?: number
  fatGrams?: number
}

export type MealSuggestion = {
  id: string
  title: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients: string[]
  macroEstimate?: MacroTargets
}

export type ShoppingList = {
  id: string
  userId: string
  mealPlanId: string
  items: ShoppingListItem[]
}

export type ShoppingListItem = {
  name: string
  quantity?: string
  checked: boolean
}

export type ProgressEntry = {
  id: string
  userId: string
  recordedAt: string
  completedWorkoutId?: string
  streakCount?: number
  notes?: string
}

export type NotificationPreference = {
  remindersEnabled: boolean
  weeklySummaryEnabled: boolean
  telegramEnabled: boolean
  timezone?: string
}
