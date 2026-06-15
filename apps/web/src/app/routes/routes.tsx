import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../../features/auth/AuthPage";
import { OnboardingPage } from "../../features/onboarding/OnboardingPage";
import { DashboardPage } from "../../features/dashboard/DashboardPage";
import { ExerciseExplorerPage } from "../../features/exercise-explorer/ExerciseExplorerPage";
import type { UserProfile } from "@gym-basha/shared";

type AppRoutesProps = {
  isAuthenticated: boolean;
  hasProfile: boolean;
  userProfile: UserProfile | null;
  profileError: string | null;
};

export function AppRoutes({
  isAuthenticated,
  hasProfile,
  userProfile,
  profileError,
}: AppRoutesProps) {
  // If profile fetch failed, don't auto-route. Stay on current page or show error.
  // Error UI is handled in App.tsx
  if (isAuthenticated && profileError) {
    return null // App.tsx shows error UI
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            hasProfile ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          ) : (
            <AuthPage />
          )
        }
      />
      <Route
        path="/onboarding"
        element={
          !isAuthenticated ? (
            <Navigate to="/auth" replace />
          ) : hasProfile ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <OnboardingPage />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          !isAuthenticated ? (
            <Navigate to="/auth" replace />
          ) : !hasProfile ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <DashboardPage userProfile={userProfile} />
          )
        }
      />
      <Route
        path="/exercises"
        element={
          !isAuthenticated ? (
            <Navigate to="/auth" replace />
          ) : !hasProfile ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <ExerciseExplorerPage />
          )
        }
      />
      <Route
        path="*"
        element={
          <Navigate
            to={
              !isAuthenticated
                ? "/auth"
                : !hasProfile
                  ? "/onboarding"
                  : "/dashboard"
            }
            replace
          />
        }
      />
    </Routes>
  );
}
