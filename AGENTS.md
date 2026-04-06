# Agent Instructions

## Product Context

Gym-Basha is a beginner-oriented AI fitness assistant based on User-Centered Design and COM-B. Prefer simple, guided workflows that reduce planning effort and support long-term adherence.

## Workspace Structure

- `apps/web`: React/Vite frontend.
- `apps/functions`: Firebase Functions backend scaffold.
- `packages/shared`: shared TypeScript domain types.
- `docs/design`: design source of truth and mockups.

## Design Source Of Truth

Use `docs/design/DESIGN.md` for visual decisions. The web app consumes design tokens from `apps/web/src/shared/styles/design-tokens.css`; components should use those CSS custom properties instead of hard-coded design values.

## Product Safety And Privacy

- Generated fitness and nutrition content is general guidance only, not medical advice.
- Favor minimal data collection, consent-based flows, and secure Firebase Authentication patterns.
- Keep API keys and secrets in local environment files; commit only `.env.example` placeholders.
