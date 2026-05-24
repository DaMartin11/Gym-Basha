# Gym-Basha Web

React/Vite frontend for Gym-Basha, a beginner-oriented AI fitness assistant.

## Structure

### `src/app` — Application Shell
- `App.tsx`: Main component responsible for auth state management and loading states.
- `routes.tsx`: Route definitions and navigation logic (protected routes, redirects).
- `App.css`: Global layout and application-level styles.

### `src/features` — Product Features
Product-specific pages and functionality, organized by feature:
- `auth/` — Authentication (register, login, password reset)
- `onboarding/` — User profile setup wizard (goals, experience, stats, preferences)
- `dashboard/` — User dashboard and quick access
- `exercise-explorer/` — Exercise database browsing (planned)
- `plans/` — Workout and meal plan management (planned)
- `progress/` — Progress tracking and analytics (planned)
- `notifications/` — Reminder and notification settings (planned)
- `telegram/` — Telegram bot integration (planned)

### `src/shared` — Shared Utilities
Reusable frontend infrastructure across features:
- `components/` — Reusable UI components
- `hooks/` — React hooks
- `layouts/` — Page layout templates
- `lib/` — Utility modules (Firebase, API clients)
- `styles/design-tokens.css` — Design system token source of truth (colors, typography, spacing, shadows)

## Scripts

- `npm run dev --workspace apps/web`
- `npm run build --workspace apps/web`
- `npm run lint --workspace apps/web`
- `npm run typecheck --workspace apps/web`
