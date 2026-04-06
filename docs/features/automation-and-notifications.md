# Product Requirements Document (PRD): Automation and Notifications

## 1. Overview
A frequent point of failure for beginners is forgetting to workout. The "Automation and Notifications" feature uses n8n workflows to proactively engage users, acting like a digital coach.

## 2. Objectives
- Prompt users to complete their planned workouts.
- Summarize weekly progress without the user needing to open the app.
- Provide targeted motivation when inactivity is detected.

## 3. User Stories
- As a busy user, I want a reminder on my phone 1 hour before my scheduled workout.
- As a user, I want a summary on Sunday showing how many workouts I completed this week.
- As a user who hasn't logged in for 4 days, I want an encouraging message to help me restart.

## 4. Functional Requirements
- **Workout Reminders**: Scheduled notifications based on the generated AI plan.
- **Weekly Summaries**: Automated aggregation of the week's tracked progress, formatted and sent to the user.
- **Inactivity Triggers**: Logic detecting a user's lack of logged workouts over X days, triggering an engagement message.
- **Motivation Messages**: Random/contextual motivational quotes sent periodically.

## 5. Non-Functional Requirements
- **Opt-Out**: Users must have the ability to toggle specific notification types off in their settings.
- **Timezone Awareness**: Automation must respect the user's local timezone so messages arrive at sensible hours.

## 6. Technical Specifications
- **Workflow Engine**: n8n for orchestration.
- **Database Trigger**: Webhooks or polling from Firebase to n8n to determine state (e.g., last logged workout).
- **Delivery**: Push Notifications (FCM), Email, or Telegram.

## 7. Status
- Not Started
