import { useState } from 'react'
import { Exercise } from '@gym-basha/shared'
import './ExerciseCard.css'

interface ExerciseCardProps {
  exercise: Exercise
  onClick: () => void
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const showImage = exercise.imageUrl && imageLoaded && !imageError

  return (
    <button className="exercise-card" onClick={onClick} type="button">
      <div className="exercise-card__image">
        {exercise.imageUrl && (
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={showImage ? 'loaded' : 'hidden'}
          />
        )}
        {!showImage && (
          <div className="exercise-card__image-placeholder">
            <span className="placeholder-icon">🏋️</span>
            <span className="placeholder-text">No image</span>
          </div>
        )}
      </div>

      <div className="exercise-card__content">
        <h3 className="exercise-card__title">{exercise.name}</h3>
        <div className="exercise-card__meta">
          <span className="meta-tag">{exercise.muscleGroups[0]}</span>
          {exercise.equipment && <span className="meta-tag">{exercise.equipment}</span>}
        </div>
      </div>
    </button>
  )
}
