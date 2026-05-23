import { logoutUser } from "../auth/services/auth.service";
import "./dashboard.css";

const topNavItems = ["Dashboard", "Workouts", "Nutrition", "Progress"];
const sideNavItems = [
  "History",
  "Statistics",
  "Achievements",
  "Equipment",
  "Preferences",
];

export function DashboardPage() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <div className="dashboard-brand">Gym Basha</div>
        <nav aria-label="Main navigation">
          <ul className="dashboard-topnav">
            {topNavItems.map((item) => (
              <li key={item} className={item === "Dashboard" ? "is-active" : ""}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="dashboard-signout"
          type="button"
          onClick={() => {
            void logoutUser();
          }}
        >
          Sign Out
        </button>
      </header>

      <section className="dashboard-shell">
        <section className="dashboard-main">
          <article className="dashboard-hero">
            <p className="dashboard-kicker">Morning Brief</p>
            <h1>
              Good Morning, Sarah!
              <span>Ready for your 15-minute Morning Stretch?</span>
            </h1>
            <p>
              Your personalized AI path to wellness starts here. Let&apos;s keep your
              momentum going.
            </p>
            <button type="button">Quick Start Workout</button>
          </article>

          <section className="dashboard-grid">
            <article className="dashboard-card">
              <p className="dashboard-card__label">Today&apos;s Plan</p>
              <h2>Beginner-Friendly Yoga</h2>
              <p>20 min - Easy</p>
              <div className="dashboard-card__media dashboard-card__media--workout" />
            </article>

            <article className="dashboard-card">
              <p className="dashboard-card__label dashboard-card__label--meal">
                Featured Meal
              </p>
              <h2>Avocado Power Toast</h2>
              <p>350 Kcal</p>
              <a href="#">View Recipe</a>
            </article>

            <article className="dashboard-card dashboard-card--progress">
              <h2>Activity Progress</h2>
              <div>
                <p>Steps</p>
                <div className="dashboard-progress">
                  <span style={{ width: "68%" }} />
                </div>
              </div>
              <div>
                <p>Active Minutes</p>
                <div className="dashboard-progress">
                  <span style={{ width: "52%" }} />
                </div>
              </div>
              <div className="dashboard-streak">
                <span className="is-active">Mon</span>
                <span className="is-active">Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
            </article>
          </section>

          <article className="dashboard-insight">
            <p>&quot;You&apos;re doing great, Sarah!&quot;</p>
            <span>
              You&apos;ve met your step goal 3 days in a row. Keep this rhythm for a
              stronger streak.
            </span>
          </article>
        </section>

        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar__panel">
            <h2>Coach Insights</h2>
            <p>AI Assistant Active</p>
            <ul>
              {sideNavItems.map((item) => (
                <li key={item} className={item === "Achievements" ? "is-active" : ""}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-sidebar__coach">
            <h3>Coach Insights</h3>
            <ul>
              <li>Workout frequency up 15% from last week.</li>
              <li>You&apos;re 2 days away from a consistency badge.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
