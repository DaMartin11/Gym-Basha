import { useEffect, useState } from 'react'
import { Exercise } from '@gym-basha/shared'
import { searchExercisesByName, getExercisesByMuscle, getExercisesByEquipment } from '../services/exerciseService'

interface FilterState {
  search: string
  muscleGroups: string[]
  equipment: string[]
}

export function useExerciseFilter() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    muscleGroups: [],
    equipment: [],
  })

  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const toggleMuscleGroup = (muscle: string) => {
    setFilters((prev) => ({
      ...prev,
      muscleGroups: prev.muscleGroups.includes(muscle)
        ? prev.muscleGroups.filter((m) => m !== muscle)
        : [...prev.muscleGroups, muscle],
    }))
  }

  const toggleEquipment = (equip: string) => {
    setFilters((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equip)
        ? prev.equipment.filter((e) => e !== equip)
        : [...prev.equipment, equip],
    }))
  }

  const clearFilters = () => {
    setFilters({ search: '', muscleGroups: [], equipment: [] })
  }

  // Fetch exercises based on filters
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true)
      setError(null)

      try {
        let results: Exercise[] = []

        // If search query exists, search by name
        if (filters.search.trim()) {
          results = await searchExercisesByName(filters.search)
        } else if (filters.muscleGroups.length > 0 || filters.equipment.length > 0) {
          // Fetch exercises matching selected filters
          const muscleResults = filters.muscleGroups.length > 0
            ? await Promise.all(filters.muscleGroups.map((m) => getExercisesByMuscle(m)))
            : []
          const equipmentResults = filters.equipment.length > 0
            ? await Promise.all(filters.equipment.map((e) => getExercisesByEquipment(e)))
            : []

          // Combine and deduplicate
          const allResults = [...muscleResults.flat(), ...equipmentResults.flat()]
          const uniqueMap = new Map<string, Exercise>()
          allResults.forEach((ex) => {
            uniqueMap.set(ex.id, ex)
          })
          results = Array.from(uniqueMap.values())
        }

        setExercises(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch exercises')
        setExercises([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce search requests (faster for filters since we're working with cached data)
    const debounceDelay = filters.search.trim() ? 300 : 100
    const timer = setTimeout(() => {
      fetchExercises()
    }, debounceDelay)

    return () => clearTimeout(timer)
  }, [filters])

  return {
    filters,
    exercises,
    loading,
    error,
    updateSearch,
    toggleMuscleGroup,
    toggleEquipment,
    clearFilters,
  }
}
