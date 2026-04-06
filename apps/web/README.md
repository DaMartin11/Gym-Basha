# Gym-Basha Web

React/Vite frontend for Gym-Basha, a beginner-oriented AI fitness assistant.

## Structure

- `src/app`: application shell, providers, and route composition.
- `src/features`: product features such as auth, exercise explorer, plans, progress, notifications, and Telegram.
- `src/shared`: reusable frontend-only components, hooks, layouts, lib modules, and styles.
- `src/shared/styles/design-tokens.css`: design-system token source of truth.

## Scripts

- `npm run dev --workspace apps/web`
- `npm run build --workspace apps/web`
- `npm run lint --workspace apps/web`
- `npm run typecheck --workspace apps/web`
