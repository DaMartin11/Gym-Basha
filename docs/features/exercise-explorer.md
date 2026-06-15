# Product Requirements Document (PRD): Exercise Explorer

## 1. Overview
The "Exercise Explorer" lets users discover exercises, understand how to perform them safely, and assemble their own workout plans inside Gym-Basha. Since Gym-Basha targets beginners, the feature must reduce search friction, keep planning simple, and turn exercise browsing into a clear "build my workout" flow instead of a generic catalog.

## 2. Objectives
- Allow users to search and discover exercises easily.
- Provide detailed instructions, targeted muscles, and visual aids (GIFs/images).
- Support filtering by various criteria.
- Let users create, edit, and save their own workout plans.
- Reuse the same exercise source across manual plans and AI-generated plans.

## 3. User Stories
- As a beginner, I want to see a demonstration of a "Dumbbell Row" so I can perform it with proper form.
- As a user lacking inspiration, I want to filter exercises by "Chest" and "Bodyweight" to find new movements.
- As a user viewing my AI workout plan, I want to tap an exercise name to immediately see its details.
- As a user, I want to search for exercises and add them into a custom session so I can build my own weekly routine.
- As a user, I want to save my custom plan in the app so I can come back to it later without rebuilding it.
- As a beginner, I want guardrails such as simple defaults for sets, reps, and rest so planning does not feel overwhelming.

## 4. Functional Requirements
- **Exercise Search & Filter**: Integrate with ExerciseDB. Implement search by name, and filters for:
  - Muscle Group
  - Equipment Needed
  - Body Part
  - Target Muscle
- **Exercise Results View**: Display exercise cards with exercise name, body part, target muscle, equipment, and preview image/GIF.
- **Exercise Detail View**: Display exercise name, GIF/Image, instructions, target muscle, secondary muscles, equipment, and an action to add the exercise to a plan.
- **Manual Plan Builder**:
  - User can create a plan name.
  - User can create one or more workout sessions within the plan.
  - User can add exercises from Exercise Explorer into a selected session.
  - User can set `sets`, `reps` or `durationSeconds`, and `restSeconds` per exercise.
  - User can remove and reorder exercises within a session.
- **Plan Persistence**:
  - User can save a draft or completed custom plan to Firestore.
  - User can reopen and edit a saved custom plan.
  - Saved plans belong to the authenticated user only.
- **Integration with Existing Plans Feature**:
  - Manual plans and AI-generated plans should share the same base session/exercise structure where possible.
  - Exercises shown in `WorkoutPlanCard` or future workout-plan screens should link back to explorer details using a stable exercise reference.
- **Beginner Guidance**:
  - Provide starter defaults for sets, reps, and rest.
  - Show lightweight safety guidance that content is general fitness guidance, not medical advice.

## 5. Non-Functional Requirements
- **Performance**: Cache ExerciseDB responses where possible to minimize API quota usage and load times.
- **UI/UX**: Cards or lists should be visually engaging and load media asynchronously to prevent UI blocking.
- **Simplicity**: The primary flow must minimize decisions per step and keep the "next action" obvious.
- **Reliability**: The app should keep functioning if ExerciseDB is temporarily unavailable by showing cached results or a clear retry state.
- **Security/Privacy**: ExerciseDB API credentials must stay out of the client and be handled through backend adapters or protected environment configuration.

## 6. Technical Specifications
- **External API**: ExerciseDB (via RapidAPI or direct).
- **Recommended Integration Pattern**:
  - Frontend calls Firebase Functions or a backend adapter for ExerciseDB data.
  - Backend normalizes ExerciseDB responses into Gym-Basha shared types.
  - Frontend consumes a stable internal exercise model instead of raw ExerciseDB payloads.
- **Frontend State**:
  - Feature-local React hooks for search query, selected filters, pagination, and selected plan session.
  - Persist in-progress plan-builder state locally until save.
- **Storage Model Direction**:
  - Extend shared exercise types to include fields needed from ExerciseDB, such as `bodyPart`, `targetMuscle`, `secondaryMuscles`, `mediaUrl`, and `source`.
  - Avoid storing only slugified exercise names in workout plans.
  - Store a stable external reference such as `sourceExerciseId` for ExerciseDB-backed exercises.
- **Firestore Direction**:
  - Keep saved user plans under `users/{uid}/workoutPlans`.
  - Add plan metadata to distinguish `manual` vs `generated` origin.
  - Keep sessions and exercises inside the saved plan document unless scale proves a need for subcollections.

## 7. UX Flow
1. User opens `Exercise Explorer`.
2. User searches or filters exercises.
3. User opens an exercise detail page or quick-add panel.
4. User chooses an existing session or creates a new session.
5. User confirms exercise parameters with simple defaults.
6. User saves the custom workout plan.
7. User later reopens the saved plan from dashboard/workouts.

## 8. Data Model Changes To Plan
- `packages/shared/src/index.ts`
  - Expand `Exercise`.
  - Expand `WorkoutExercise` to support both display data and stable exercise references.
  - Add plan origin metadata, for example `source: 'manual' | 'generated'`.
- `apps/functions/src/integrations`
  - Add an ExerciseDB adapter that maps external payloads to shared types.
- `apps/web/src/features`
  - Create a dedicated `exercise-explorer` feature folder for search, list, detail, and builder flows.

## 9. Delivery Phases
- **Phase 1: Data foundation**
  - Define shared exercise and plan-contract updates.
  - Add ExerciseDB backend adapter and normalization layer.
- **Phase 2: Explorer MVP**
  - Search, filters, result cards, detail view, loading/error states.
- **Phase 3: Manual plan builder**
  - Add-to-session flow, session editing, save/update plan.
- **Phase 4: Cross-feature integration**
  - Link exercises from workout plans to explorer details.
  - Distinguish manual vs AI-generated plans in the UI.
- **Phase 5: Quality**
  - Caching, pagination, empty states, responsiveness, and analytics hooks.

## 10. Open Decisions
- Whether ExerciseDB calls should be proxied exclusively through Firebase Functions or temporarily allowed from the client during prototyping.
- Whether manual plans should allow free-text custom exercises in addition to ExerciseDB selections.
- Whether plan editing should support drag-and-drop reordering in the first release or use simpler move up/down controls.
- Whether the first release should support one active plan or multiple saved plans per user.

## 11. Recommended First Implementation Slice
- Normalize ExerciseDB exercise search through a backend endpoint.
- Build an explorer list and detail view.
- Allow adding an exercise into a single manual workout session.
- Save one manual plan per user using the current `workoutPlans` collection.
- Update the shared contract so saved exercises use stable IDs instead of slugified names.

## 12. Status
- In Progress
