import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../../features/auth/AuthPage";
import { OnboardingPage } from "../../features/onboarding/OnboardingPage";
import { DashboardPage } from "../../features/dashboard/DashboardPage";
import type { UserProfile } from "@gym-basha/shared";

type AppRoutesProps = {
  isAuthenticated: boolean;
  hasProfile: boolean;
  userProfile: UserProfile | null;
};

export function AppRoutes({
  isAuthenticated,
  hasProfile,
  userProfile,
}: AppRoutesProps) {
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
