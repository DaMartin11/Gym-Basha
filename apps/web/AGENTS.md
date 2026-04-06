# Agent Instructions

## Product Context

Gym-Basha is a beginner-oriented AI fitness assistant. It should help users start and maintain a fitness routine through simple guidance, AI-powered personalization, automation, progress tracking, and gamification.

The app should reduce common beginner barriers:

- Not knowing where to start
- Lack of motivation
- Overwhelming fitness information
- Difficulty maintaining consistency

The product direction is based on User-Centered Design (UCD) and the Behavior Change Model (COM-B). Prefer workflows that reduce planning effort, give clear next steps, and support long-term adherence.

## Target Architecture

- Frontend: React with Vite, JavaScript / TypeScript, Tailwind CSS / CSS.
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

## Product Safety And Privacy

- Treat generated fitness and nutrition content as general guidance only.
- Do not present AI output as medical advice or a replacement for qualified health, fitness, or medical professionals.
- Favor minimal data collection and consent-based flows.
- Use secure authentication patterns through Firebase.
- Keep GDPR considerations in mind when handling user data, profile data, notifications, and integrations.

## Design Source Of Truth

Use `../../docs/design/DESIGN.md` as the source of truth for visual decisions. The product direction is "Kinetic Sanctuary": premium, airy, approachable high-tech, organic, and welcoming rather than aggressive fitness-app styling.

## Global Tokens

- Define reusable design values in `src/shared/styles/design-tokens.css`.
- Components must consume CSS custom properties from the token file instead of hard-coded colors, typography, radii, spacing, shadows, or transitions.
- Import the token file through the global CSS entry point before component styles are evaluated.
- Add new tokens only when a value is reused or represents a design-system decision. Prefer semantic token names such as `--color-surface`, `--radius-card`, and `--shadow-ambient`.

## Color

- Use `--color-primary` for brand presence and core interactive states.
- Use `--color-primary-container` for high-energy action moments such as progress, success, and primary CTAs.
- Use `--color-secondary` for expert-guidance and secondary actions.
- Use `--color-tertiary` for rewards, streaks, badges, and gamification.
- Use the surface hierarchy for structure: `--color-surface`, `--color-surface-container-low`, `--color-surface-container-high`, and `--color-surface-container-highest`.
- Do not use pure black for text. Use `--color-on-surface` or related semantic text tokens.
- Do not use standard blue links. Use `--color-primary` or `--color-tertiary`.

## Layout And Boundaries

- Avoid 1px divider lines for sectioning. Separate UI regions with surface shifts, spacing, and layering.
- Use the ghost border token only when a same-color container needs a subtle edge: `--border-ghost`.
- Favor asymmetrical layouts, overlapping elements, and generous breathing room.
- Let decorative or data elements bleed off cards when it adds kinetic depth.

## Typography

- Use Plus Jakarta Sans for display, headings, numbers, and stats via `--font-display`.
- Use Inter for body text, labels, metadata, and UI copy via `--font-body`.
- Pair large expressive headings with lighter body copy to preserve the editorial contrast.
- Use the type-scale tokens from `src/shared/styles/design-tokens.css`; do not invent one-off font sizes in components.

## Spacing, Radius, And Depth

- Use spacing tokens such as `--space-3`, `--space-4`, `--space-6`, and `--space-8`.
- Avoid sharp corners. Prefer `--radius-default`, `--radius-card`, `--radius-pill`, or `--radius-coach`.
- Prefer tonal layering over heavy shadows. If focus needs lift, use `--shadow-ambient`.
- Use `--glass-surface` and `--blur-glass` for floating navigation, modal surfaces, and coach bubbles.

## Components

- Primary buttons use `--gradient-primary-action`, `--radius-pill`, generous horizontal padding, and the squish transform defined by `--scale-pressed`.
- Secondary buttons are ghost-style and should use `--border-ghost` rather than a visible solid border.
- Cards use `--radius-card`, tonal backgrounds, and vertical spacing instead of dividers.
- Metric chips use high-surface capsule backgrounds, label typography, and no visible border.
- Coach bubbles use glassmorphism and `--radius-coach`.

## Motion

- Use purposeful motion only. Button press interactions should use `--transition-button` and `--scale-pressed`.
- Avoid generic decorative animation unless it reinforces progress, momentum, or feedback.
