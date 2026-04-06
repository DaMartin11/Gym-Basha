# Agent Instructions

## Product Context

Gym-Basha is a beginner-oriented AI fitness assistant. It should help users start and maintain a fitness routine through simple guidance, AI-powered personalization, automation, progress tracking, and gamification.

The app should reduce common beginner barriers:

- Not knowing where to start.
- Lack of motivation.
- Overwhelming fitness information.
- Difficulty maintaining consistency.

The product direction is based on User-Centered Design (UCD) and the Behavior Change Model (COM-B). Prefer workflows that reduce planning effort, give clear next steps, and support long-term adherence.

## Workspace Structure

- `apps/web`: React/Vite TypeScript frontend.
- `apps/functions`: Firebase Functions TypeScript backend scaffold.
- `packages/shared`: shared TypeScript domain types and cross-boundary contracts.
- `docs/design`: Kinetic Sanctuary design source of truth and mockups.
- `docs/features`: feature planning notes derived from the product README.

Use npm workspaces from the repository root:

- `npm run start`: start the web app through `apps/web`.
- `npm run build --workspace apps/web`: build the web app.
- `npm run lint --workspace apps/web`: lint the web app.
- `npm run typecheck --workspaces`: typecheck all workspaces.

Do not add generated build output to source control. `dist`, `apps/functions/lib`, and `*.tsbuildinfo` are ignored.

## Target Architecture

- Frontend: React with Vite, TypeScript, and CSS design tokens.
- Backend: Firebase Authentication, Firestore, and Firebase Functions.
- AI integration: LLM API for workout and meal generation.
- Automation: n8n workflows for reminders, notifications, inactivity triggers, and weekly summaries.
- External APIs: ExerciseDB for exercise data and Telegram Bot API for notifications.

## Feature Status

- Authentication and user profile: In Progress.
- Exercise explorer: In Progress.
- AI workout plan generator: Not Started.
- AI meal planning: Not Started.
- Automated shopping list: Not Started.
- Progress tracking dashboard: Not Started.
- Gamification: Not Started.
- Automation and notifications: Not Started.
- Telegram integration: Not Started.

## Code Organization

- Put app shell, providers, and route composition in `apps/web/src/app`.
- Put feature-specific frontend code in `apps/web/src/features/<feature-name>`.
- Put reusable frontend-only components, hooks, layouts, client libraries, and styles in `apps/web/src/shared`.
- Put Firebase web SDK setup in `apps/web/src/shared/lib/firebase`.
- Put Firebase Functions code in capability folders under `apps/functions/src`.
- Put domain types shared between frontend and backend in `packages/shared/src`.
- Keep AI/API provider wrappers behind feature or backend adapters, not directly inside UI components.

## Design Source Of Truth

Use `docs/design/DESIGN.md` for visual decisions. The product direction is "Kinetic Sanctuary": premium, airy, approachable high-tech, organic, and welcoming rather than aggressive fitness-app styling.

The web app consumes design tokens from `apps/web/src/shared/styles/design-tokens.css`. Components must use CSS custom properties from the token file instead of hard-coded colors, typography, radii, spacing, shadows, or transitions.

Follow these UI constraints:

- Use `--color-primary` for brand presence and core interactive states.
- Use `--color-primary-container` for high-energy action moments such as progress, success, and primary CTAs.
- Use `--color-secondary` for expert guidance and secondary actions.
- Use `--color-tertiary` for rewards, streaks, badges, and gamification.
- Do not use pure black for text or standard blue links.
- Avoid 1px divider lines; use surface shifts, spacing, and layering.
- Prefer `--radius-default`, `--radius-card`, `--radius-pill`, or `--radius-coach`.
- Use purposeful motion only, especially `--transition-button` and `--scale-pressed` for button press interactions.

## Product Safety And Privacy

- Treat generated fitness and nutrition content as general guidance only.
- Do not present AI output as medical advice or as a replacement for qualified health, fitness, or medical professionals.
- Favor minimal data collection, consent-based flows, and secure Firebase Authentication patterns.
- Keep GDPR considerations in mind when handling user profile data, notifications, Telegram integration, and external APIs.
- Keep API keys and secrets in local environment files; commit only `.env.example` placeholders.

## Implementation Rules

- Keep the current CSS token system; do not introduce Tailwind unless explicitly requested.
- Prefer TypeScript for new source files.
- Keep shared contracts stable and framework-agnostic in `packages/shared`.
- Avoid committing local secrets, generated artifacts, or dependency folders.
- When changing public data shapes, update `packages/shared/src/index.ts` first and then adjust consumers.
