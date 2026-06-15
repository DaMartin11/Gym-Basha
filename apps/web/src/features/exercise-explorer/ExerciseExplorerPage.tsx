import { useState } from 'react'
import { Exercise } from '@gym-basha/shared'
import { ExerciseFilter } from './components/ExerciseFilter'
import { ExerciseGrid } from './components/ExerciseGrid'
import { ExerciseDetailView } from './components/ExerciseDetailView'
import { useExerciseFilter } from './hooks/useExerciseFilter'
import './exercise-explorer.css'

export function ExerciseExplorerPage() {
  const { filters, exercises, loading, error, updateSearch, toggleMuscleGroup, toggleEquipment, clearFilters } =
    useExerciseFilter()
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  return (
    <div className="exercise-explorer-page">
      <header className="explorer-header">
        <div className="explorer-header-content">
          <h1>Exercise Explorer</h1>
          <p>Find and explore exercises to build your perfect workout</p>
        </div>
      </header>

      <div className="explorer-layout">
        <aside className="explorer-sidebar">
          <ExerciseFilter
            search={filters.search}
            onSearchChange={updateSearch}
            muscleGroups={filters.muscleGroups}
            onMuscleGroupToggle={toggleMuscleGroup}
            equipment={filters.equipment}
            onEquipmentToggle={toggleEquipment}
            onClearFilters={clearFilters}
          />
        </aside>

        <main className="explorer-content">
          <ExerciseGrid
            exercises={exercises}
            loading={loading}
            error={error}
            onExerciseClick={setSelectedExercise}
          />
        </main>
      </div>

      {selectedExercise && (
        <ExerciseDetailView exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      )}
    </div>
  )
}
