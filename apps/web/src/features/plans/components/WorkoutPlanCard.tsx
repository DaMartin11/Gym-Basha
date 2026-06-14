import type { WorkoutPlan } from '@gym-basha/shared'
import './WorkoutPlanCard.css'

type Props = {
  plan: WorkoutPlan
}

export function WorkoutPlanCard({ plan }: Props) {
  return (
    <section className="plan-card">
      <header className="plan-card__header">
        <h2 className="plan-card__title">This Week's Workout Plan</h2>
        <span className="plan-card__meta">
          Week of {new Date(plan.weekStartsOn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </header>

      <div className="plan-card__sessions">
        {plan.sessions.map((session) => (
          <article key={session.id} className="plan-session">
            <div className="plan-session__header">
              <span className="plan-session__day">{session.scheduledDay}</span>
              <h3 className="plan-session__title">{session.title}</h3>
            </div>
            <ul className="plan-session__exercises">
              {session.exercises.map((ex, i) => (
                <li key={i} className="plan-exercise">
                  <span className="plan-exercise__name">
                    {ex.exerciseId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span className="plan-exercise__detail">
                    {ex.sets} × {ex.reps ?? ex.durationSeconds + 's'} · {ex.restSeconds}s rest
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
