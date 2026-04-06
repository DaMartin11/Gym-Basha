# Product Requirements Document (PRD): Progress Tracking Dashboard

## 1. Overview
Consistency is the hardest part of fitness. The "Progress Tracking Dashboard" provides a centralized location for users to view their adherence, visualize improvements, and maintain motivation.

## 2. Objectives
- Record completed workouts and historically log them.
- Provide simple visual metrics (streaks, charts).
- Help the user reflect on their journey over time.

## 3. User Stories
- As a user, I want to mark a daily workout as "Completed".
- As a user, I want to see my current "streak" of consecutive workout days to stay motivated.
- As a user, I want a visual chart showing my adherence over the last month.

## 4. Functional Requirements
- **Workout Logging**: A mechanism in the UI to check off a workout session.
- **Streak Calculation**: Logic to calculate current active streaks and highest historical streaks of days worked out.
- **Dashboard UI**:
  - Weekly calendar view showing completed vs. missed days.
  - Basic charts (e.g., total workouts per month).
- **Data Persistence**: Save completion events in Firestore under the user's sub-collection.

## 5. Non-Functional Requirements
- **Simplicity**: Do not overwhelm the user with overly complex analytics (e.g., 1RM projections). Stick to adherence and consistency metrics based on the COM-B model.
- **Responsiveness**: The dashboard must render elegantly on mobile devices.

## 6. Technical Specifications
- **Frontend**: Charting library (e.g., Recharts, Chart.js) integrated with React.
- **Database**: Firestore (Workout History collection).

## 7. Status
- Not Started
