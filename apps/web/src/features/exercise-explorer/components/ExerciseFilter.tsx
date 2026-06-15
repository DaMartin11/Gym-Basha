import './ExerciseFilter.css'

interface ExerciseFilterProps {
  search: string
  onSearchChange: (value: string) => void
  muscleGroups: string[]
  onMuscleGroupToggle: (muscle: string) => void
  equipment: string[]
  onEquipmentToggle: (equip: string) => void
  onClearFilters: () => void
}

// Friendly names mapped to API muscle group patterns
const COMMON_MUSCLES = [
  { label: 'Chest', value: 'PECTORALIS' },
  { label: 'Back', value: 'LATISSIMUS' },
  { label: 'Shoulders', value: 'DELTOID' },
  { label: 'Biceps', value: 'BICEPS' },
  { label: 'Triceps', value: 'TRICEPS' },
  { label: 'Forearms', value: 'BRACHIORADIALIS' },
  { label: 'Quadriceps', value: 'QUADRICEPS' },
  { label: 'Hamstrings', value: 'HAMSTRINGS' },
  { label: 'Glutes', value: 'GLUTEUS' },
  { label: 'Calves', value: 'GASTROCNEMIUS' },
  { label: 'Core', value: 'RECTUS ABDOMINIS' },
  { label: 'Trapezius', value: 'TRAPEZIUS' },
]

const COMMON_EQUIPMENT = [
  { label: 'Dumbbells', value: 'DUMBBELL' },
  { label: 'Bodyweight', value: 'BODY WEIGHT' },
  { label: 'Machine', value: 'LEVERAGE MACHINE' },
]

export function ExerciseFilter({
  search,
  onSearchChange,
  muscleGroups,
  onMuscleGroupToggle,
  equipment,
  onEquipmentToggle,
  onClearFilters,
}: ExerciseFilterProps) {
  const hasActiveFilters = search || muscleGroups.length > 0 || equipment.length > 0

  return (
    <div className="exercise-filter">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filter-search"
        />
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">Muscle Groups</h3>
        <div className="filter-chips">
          {COMMON_MUSCLES.map((muscle) => (
            <button
              key={muscle.value}
              className={`filter-chip ${muscleGroups.includes(muscle.value) ? 'active' : ''}`}
              onClick={() => onMuscleGroupToggle(muscle.value)}
              type="button"
            >
              {muscle.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-heading">Equipment</h3>
        <div className="filter-chips">
          {COMMON_EQUIPMENT.map((equip) => (
            <button
              key={equip.value}
              className={`filter-chip ${equipment.includes(equip.value) ? 'active' : ''}`}
              onClick={() => onEquipmentToggle(equip.value)}
              type="button"
            >
              {equip.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button className="filter-clear-btn" onClick={onClearFilters} type="button">
          Clear Filters
        </button>
      )}
    </div>
  )
}
