import { useMemo } from "react";
import { auth } from "../../shared/lib/firebase";
import { logoutUser } from "../auth/services/auth.service";
import logoImage from "../../assets/Gym-Basha.svg";
import type { UserProfile } from "@gym-basha/shared";
import "./dashboard.css";

const topNavItems = ["Dashboard", "Workouts", "Nutrition", "Progress"];
const sideNavItems = [
  "History",
  "Statistics",
  "Achievements",
  "Equipment",
  "Preferences",
];

type DashboardPageProps = {
  userProfile: UserProfile | null;
};

export function DashboardPage({ userProfile }: DashboardPageProps) {
  const displayName = userProfile?.displayName || auth.currentUser?.displayName || "Athlete";
  const primaryGoal = useMemo(() => {
    if (!userProfile?.goals.length) {
      return "build consistency";
    }

    return userProfile.goals[0].replaceAll("_", " ");
  }, [userProfile]);

  const experienceLabel = userProfile?.experienceLevel
    ? userProfile.experienceLevel.replaceAll("_", " ")
    : "beginner";

  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <div className="dashboard-brand">
          <img src={logoImage} alt="Gym Basha" />
          <span>Gym Basha</span>
        </div>
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
              Good Morning, {displayName}!
              <span>
                Ready to train for your {primaryGoal} goal?
              </span>
            </h1>
            <p>
              Your current level is {experienceLabel}. Your personalized AI path to
              wellness starts here.
            </p>
            <button type="button">Quick Start Workout</button>
          </article>

          <section className="dashboard-grid">
            <article className="dashboard-card">
              <p className="dashboard-card__label">Today&apos;s Plan</p>
              <h2>{userProfile?.experienceLevel === "intermediate" ? "Strength Builder" : "Beginner-Friendly Yoga"}</h2>
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
            <p>&quot;You&apos;re doing great, {displayName}!&quot;</p>
            <span>
              {userProfile?.equipment.length
                ? `We noted your equipment: ${userProfile.equipment.slice(0, 2).join(", ")}.`
                : "Add available equipment in onboarding to improve workout personalization."}
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
