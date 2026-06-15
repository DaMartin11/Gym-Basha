import { Exercise } from '@gym-basha/shared'
import { getExerciseDemonstration } from '../../plans/lib/exerciseDemonstrations'
import './ExerciseDetailView.css'

interface ExerciseDetailViewProps {
  exercise: Exercise
  onClose: () => void
  onAddToSession?: () => void
}

export function ExerciseDetailView({ exercise, onClose, onAddToSession }: ExerciseDetailViewProps) {
  const demo = getExerciseDemonstration(exercise.id)

  return (
    <div className="exercise-detail-overlay">
      <div className="exercise-detail-modal">
        <button className="close-button" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="exercise-detail-header">
          <h1>{exercise.name}</h1>
          <div className="exercise-meta">
            <span className="meta-badge">{demo.targetArea}</span>
            {exercise.equipment && <span className="meta-badge">{exercise.equipment}</span>}
          </div>
        </div>

        <div className="exercise-detail-content">
          {exercise.imageUrl ? (
            <div className="demo-container">
              <img src={exercise.imageUrl} alt={exercise.name} className="demo-gif" />
            </div>
          ) : (
            <div className="demo-placeholder">No image available</div>
          )}

          <section className="detail-section">
            <h2>How to Perform</h2>
            <ol className="steps-list">
              {demo.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="detail-section">
            <h3>💡 Coach Tip</h3>
            <p>{demo.coachTip}</p>
          </section>

          <section className="detail-section">
            <h3>⚠️ Safety Note</h3>
            <p>{demo.safetyNote}</p>
          </section>

          <section className="detail-section">
            <p className="summary">{demo.summary}</p>
          </section>

          {onAddToSession && (
            <div className="detail-actions">
              <button className="btn-primary" onClick={onAddToSession}>
                Add to Custom Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
