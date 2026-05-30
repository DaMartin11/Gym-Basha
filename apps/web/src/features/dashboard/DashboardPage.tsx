import { useMemo, type ReactNode } from "react";
import { auth } from "../../shared/lib/firebase";
import { logoutUser } from "../auth/services/auth.service";
import logoImage from "../../assets/Gym-Basha.svg";
import type {
  ExperienceLevel,
  FitnessGoal,
  UserProfile,
} from "@gym-basha/shared";
import {
  ActivityIcon,
  AfternoonIcon,
  BalanceIcon,
  BarChartIcon,
  CalendarIcon,
  ChatBubbleIcon,
  ChecklistIcon,
  ClipboardIcon,
  ClockIcon,
  DumbbellIcon,
  EveningIcon,
  LightningIcon,
  MorningIcon,
  NutritionIcon,
  PersonIcon,
  PlayIcon,
  ProgressBarIcon,
  SignOutIcon,
  TargetIcon,
  TrendingUpIcon,
  WeightScaleIcon,
} from "./icons";
import "./dashboard.css";

type DashboardPageProps = {
  userProfile: UserProfile | null;
};

const goalLabels: Record<FitnessGoal, string> = {
  build_strength: "Build Strength",
  lose_weight: "Lose Weight",
  improve_endurance: "Improve Endurance",
  increase_mobility: "Increase Mobility",
  build_consistency: "Build Consistency",
};

const experienceLabels: Record<ExperienceLevel, string> = {
  beginner: "Just Starting",
  returning: "Returning",
  intermediate: "Regular Trainer",
};

const goalIcons: Record<FitnessGoal, ReactNode> = {
  build_strength: <DumbbellIcon />,
  lose_weight: <WeightScaleIcon />,
  improve_endurance: <LightningIcon />,
  increase_mobility: <BalanceIcon />,
  build_consistency: <ClockIcon />,
};

const nextFeatures: { icon: ReactNode; label: string }[] = [
  { icon: <ChecklistIcon />, label: "Personalized workout plans" },
  { icon: <ChatBubbleIcon />, label: "AI coach feedback" },
  { icon: <NutritionIcon />, label: "Nutrition suggestions" },
  { icon: <ProgressBarIcon />, label: "Progress tracking" },
];

const CHART_BAR_COUNT = 7;

function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function getTimeOfDayIcon(): ReactNode {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return <MorningIcon />;
  if (hour >= 12 && hour < 18) return <AfternoonIcon />;
  return <EveningIcon />;
}

export function DashboardPage({ userProfile }: DashboardPageProps) {
  const displayName =
    userProfile?.displayName || auth.currentUser?.displayName || "Athlete";

  const greeting = useMemo(() => getTimeOfDayGreeting(), []);
  const timeIcon = useMemo(() => getTimeOfDayIcon(), []);

  const primaryGoal = userProfile?.goals[0];
  const primaryGoalLabel = primaryGoal
    ? goalLabels[primaryGoal]
    : "stay consistent";

  const experienceLabel = userProfile?.experienceLevel
    ? experienceLabels[userProfile.experienceLevel]
    : "Just Starting";

  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <div className="dashboard-brand">
          <img src={logoImage} alt="Gym Basha" />
          <span>Gym Basha</span>
        </div>
        <nav className="dashboard-topnav" aria-label="Main navigation">
          <a href="#dashboard" className="is-active">
            Dashboard
          </a>
          <a href="#workouts">Workouts</a>
          <a href="#nutrition">Nutrition</a>
          <a href="#progress">Progress</a>
        </nav>
        <button
          className="dashboard-signout"
          type="button"
          onClick={() => {
            void logoutUser();
          }}
          aria-label="Sign out of your account"
        >
          <SignOutIcon />
          <span>Sign Out</span>
        </button>
      </header>

      <section className="dashboard-shell">
        <section className="dashboard-main">
          <article className="dashboard-hero">
            <div className="dashboard-hero__content">
              <div className="dashboard-kicker">
                <span className="dashboard-kicker__icon">{timeIcon}</span>
                <span>Welcome back</span>
              </div>
              <h1>
                {greeting}, {displayName}!
              </h1>
              <p className="dashboard-hero__subtitle">
                Ready to work toward{" "}
                <strong>{primaryGoalLabel.toLowerCase()}</strong>?
              </p>
              <p className="dashboard-hero__level">
                <BarChartIcon />
                Level: {experienceLabel}
              </p>
              <button
                type="button"
                disabled
                title="Coming soon"
                className="dashboard-hero__cta"
              >
                <PlayIcon />
                Quick Start Workout
              </button>
            </div>
            <div className="dashboard-hero__visual">
              {primaryGoal && (
                <div className="dashboard-hero__goal-icon">
                  {goalIcons[primaryGoal]}
                </div>
              )}
            </div>
          </article>

          <section className="dashboard-grid">
            <article className="dashboard-card dashboard-card--workout">
              <div className="dashboard-card__icon">
                <CalendarIcon />
              </div>
              <p className="dashboard-card__label">Today&apos;s Plan</p>
              <h2>Personalized plan coming soon</h2>
              <p>
                We&apos;ll generate a plan tailored to your{" "}
                {primaryGoalLabel.toLowerCase()} goal and{" "}
                {experienceLabel.toLowerCase()} level.
              </p>
              <div className="dashboard-card__footer">
                <span className="dashboard-card__badge">Coming Soon</span>
              </div>
            </article>

            <ProfileCard userProfile={userProfile} />

            <article className="dashboard-card dashboard-card--activity">
              <div className="dashboard-card__icon dashboard-card__icon--activity">
                <ActivityIcon />
              </div>
              <p className="dashboard-card__label">Activity</p>
              <h2>Tracking coming soon</h2>
              <p>
                Workout completion, streaks, and weekly activity stats will
                appear once you start training.
              </p>
              <div
                className="dashboard-card__chart-placeholder"
                aria-hidden="true"
              >
                {Array.from({ length: CHART_BAR_COUNT }).map((_, i) => (
                  <div key={i} className="dashboard-card__bar" />
                ))}
              </div>
            </article>
          </section>

          <article className="dashboard-insight">
            <div className="dashboard-insight__icon">
              <ChatBubbleIcon />
            </div>
            <div className="dashboard-insight__content">
              <p>&quot;Welcome aboard, {displayName}.&quot;</p>
              <span>
                {userProfile?.equipment.length
                  ? `We have your equipment on file: ${userProfile.equipment.slice(0, 3).join(", ")}${userProfile.equipment.length > 3 ? "..." : ""}.`
                  : "We don't have any equipment listed yet."}
              </span>
            </div>
          </article>
        </section>

        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar__stats">
            <h3>
              <BarChartIcon />
              Quick Stats
            </h3>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Workouts</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">0</span>
              <span className="dashboard-stat__label">Day Streak</span>
            </div>
            <div className="dashboard-stat">
              <span className="dashboard-stat__value">--</span>
              <span className="dashboard-stat__label">This Week</span>
            </div>
          </div>

          <div className="dashboard-sidebar__coach">
            <h3>
              <TrendingUpIcon />
              What&apos;s Next
            </h3>
            <ul>
              {nextFeatures.map((feature) => (
                <li key={feature.label}>
                  {feature.icon}
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}

type ProfileField = {
  icon: ReactNode;
  label: string;
  getValue: (profile: UserProfile) => string | null;
};

const profileFields: ProfileField[] = [
  {
    icon: <TargetIcon />,
    label: "Goals",
    getValue: (p) => p.goals.map((g) => goalLabels[g]).join(", ") || "None set",
  },
  {
    icon: <BarChartIcon />,
    label: "Experience",
    getValue: (p) => experienceLabels[p.experienceLevel],
  },
  {
    icon: <ClipboardIcon />,
    label: "Stats",
    getValue: (p) => {
      if (!p.age && !p.weightKg) return null;
      const parts: string[] = [];
      if (p.age) parts.push(`${p.age} yrs`);
      if (p.weightKg) parts.push(`${p.weightKg} kg`);
      return parts.join(" · ");
    },
  },
  {
    icon: <DumbbellIcon />,
    label: "Equipment",
    getValue: (p) => (p.equipment.length > 0 ? p.equipment.join(", ") : null),
  },
  {
    icon: <NutritionIcon />,
    label: "Dietary",
    getValue: (p) =>
      p.dietaryPreferences.length > 0 ? p.dietaryPreferences.join(", ") : null,
  },
];

function ProfileCard({ userProfile }: { userProfile: UserProfile | null }) {
  if (!userProfile) {
    return (
      <article className="dashboard-card dashboard-card--profile">
        <div className="dashboard-card__icon dashboard-card__icon--profile">
          <PersonIcon />
        </div>
        <p className="dashboard-card__label dashboard-card__label--profile">
          Your Profile
        </p>
        <h2>Profile unavailable</h2>
        <p>We couldn&apos;t load your saved preferences.</p>
      </article>
    );
  }

  return (
    <article className="dashboard-card dashboard-card--profile">
      <div className="dashboard-card__icon dashboard-card__icon--profile">
        <PersonIcon />
      </div>
      <p className="dashboard-card__label dashboard-card__label--profile">
        Your Profile
      </p>
      <h2>Saved Preferences</h2>
      <dl className="dashboard-profile-list">
        {profileFields.map(({ icon, label, getValue }) => {
          const value = getValue(userProfile);
          if (value === null) return null;
          return (
            <div key={label}>
              <dt>
                {icon}
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}
