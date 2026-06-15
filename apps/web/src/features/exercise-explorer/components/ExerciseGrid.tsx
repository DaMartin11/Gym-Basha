import { Exercise } from '@gym-basha/shared'
import { ExerciseCard } from './ExerciseCard'
import './ExerciseGrid.css'

interface ExerciseGridProps {
  exercises: Exercise[]
  loading: boolean
  error: string | null
  onExerciseClick: (exercise: Exercise) => void
}

export function ExerciseGrid({
  exercises,
  loading,
  error,
  onExerciseClick,
}: ExerciseGridProps) {
  if (loading) {
    return (
      <div className="exercise-grid-container">
        <div className="loading-state">Loading exercises...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="exercise-grid-container">
        <div className="error-state">
          <p>Failed to load exercises</p>
          <p className="error-message">{error}</p>
        </div>
      </div>
    )
  }

  if (exercises.length === 0) {
    return (
      <div className="exercise-grid-container">
        <div className="empty-state">
          <p>No exercises found</p>
          <p className="empty-message">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="exercise-grid-container">
      <div className="exercise-grid">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => onExerciseClick(exercise)}
          />
        ))}
      </div>
      <p className="results-count">{exercises.length} exercises found</p>
    </div>
  )
}
