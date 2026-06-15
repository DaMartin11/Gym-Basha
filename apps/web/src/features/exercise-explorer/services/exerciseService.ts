import { Exercise } from '@gym-basha/shared'

export interface ExerciseDBResponse {
  exerciseId: string
  name: string
  imageUrl: string
  bodyParts: string[]
  equipments: string[]
  targetMuscles: string[]
  secondaryMuscles: string[]
  keywords?: string[]
}

interface ExerciseDBApiResponse {
  success: boolean
  meta: {
    total: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    nextCursor?: string
  }
  data: ExerciseDBResponse[]
}

const EXERCISE_DB_BASE_URL = 'https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com/api/v1'
const API_KEY = import.meta.env.VITE_EXERCISEDB_API_KEY
const API_HOST = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com'

let exerciseCache: Exercise[] | null = null

async function fetchFromExerciseDB(offset: number = 0): Promise<ExerciseDBResponse[]> {
  const url = `${EXERCISE_DB_BASE_URL}/exercises?offset=${offset}&limit=50`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  }

  try {
    const response = await fetch(url, { headers })

    if (!response.ok) {
      console.error(`ExerciseDB API error: ${response.status} ${response.statusText}`, url)
      throw new Error(`ExerciseDB API error: ${response.status} ${response.statusText}`)
    }

    const data: ExerciseDBApiResponse = await response.json()
    return data.data || []
  } catch (error) {
    console.error('ExerciseDB fetch error:', error, 'URL:', url)
    throw error
  }
}

async function fetchAllExercises(): Promise<Exercise[]> {
  if (exerciseCache) return exerciseCache

  try {
    const allExercises: ExerciseDBResponse[] = []

    // Fetch all exercises with pagination (200 exercises total, 50 per request)
    for (let offset = 0; offset < 200; offset += 50) {
      const batch = await fetchFromExerciseDB(offset)
      if (batch.length === 0) break

      allExercises.push(...batch)
    }

    const mapped = mapExerciseDBToExercise(allExercises)
    exerciseCache = mapped
    console.log(`Loaded ${mapped.length} exercises`)
    return mapped
  } catch (error) {
    console.error('Failed to fetch all exercises:', error)
    return []
  }
}

export async function searchExercisesByName(query: string): Promise<Exercise[]> {
  if (!query || query.length < 2) return []

  const allExercises = await fetchAllExercises()
  const queryLower = query.toLowerCase()

  return allExercises.filter((ex) => ex.name.toLowerCase().includes(queryLower))
}

export async function getExercisesByMuscle(musclePattern: string): Promise<Exercise[]> {
  if (!musclePattern) return []

  const allExercises = await fetchAllExercises()
  const patternUpper = musclePattern.toUpperCase()

  return allExercises.filter((ex) =>
    ex.muscleGroups.some((m) => m.toUpperCase().includes(patternUpper))
  )
}

export async function getExercisesByEquipment(equipment: string): Promise<Exercise[]> {
  if (!equipment) return []

  const allExercises = await fetchAllExercises()
  const equipUpper = equipment.toUpperCase()

  return allExercises.filter((ex) => ex.equipment?.toUpperCase().includes(equipUpper))
}

export async function getAllExercises(): Promise<Exercise[]> {
  return fetchAllExercises()
}

function mapExerciseDBToExercise(dbExercises: ExerciseDBResponse[]): Exercise[] {
  return dbExercises.map((db) => ({
    id: db.exerciseId,
    name: db.name,
    muscleGroups: db.targetMuscles.length > 0 ? db.targetMuscles : db.secondaryMuscles,
    equipment: db.equipments[0] !== 'BODY WEIGHT' ? db.equipments[0] : undefined,
    difficulty: inferDifficulty(db.name),
    instructions: [],
    bodyPart: db.bodyParts[0],
    imageUrl: db.imageUrl,
  }))
}

function inferDifficulty(exerciseName: string): 'beginner' | 'returning' | 'intermediate' {
  const advancedKeywords = ['pistol', 'muscle-up', 'handstand', 'one-arm']
  const isAdvanced = advancedKeywords.some((keyword) => exerciseName.toLowerCase().includes(keyword))

  return isAdvanced ? 'intermediate' : 'beginner'
}
