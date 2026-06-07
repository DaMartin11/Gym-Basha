# Plan Functions

Workout and meal plan generation orchestration belongs here.

## generateWorkoutPlan.ts

Core functions that generate personalized weekly workout plans using OpenAI API.

### Backend Usage

```typescript
import { generateRawWorkoutPlan, transformToStoragePlan } from './generateWorkoutPlan'
import type { UserProfile } from '@gym-basha/shared'

// Get raw AI-generated plan
const generatedPlan = await generateRawWorkoutPlan(userProfile)

// Transform to storage format
const storagePlan = transformToStoragePlan(userId, generatedPlan)
```

### Functions

- **`generateRawWorkoutPlan(userProfile)`**: Calls OpenAI API, returns `LLMGeneratedPlan`
- **`transformToStoragePlan(userId, generatedPlan)`**: Converts to shared `WorkoutPlan` format for Firestore

### Features

- AI-powered plan generation based on user profile
- Considers experience level, goals, and available equipment
- Returns structured workout data with exercises, sets, reps, and rest periods
- Includes form tips and exercise alternatives
- Progressive overload suggestions included

## createPlanEndpoint.ts

HTTP Cloud Function endpoint that exposes plan generation to the frontend.

### Endpoint

```
POST /generateWorkoutPlanEndpoint
```

### Request Body

```json
{
  "userProfile": {
    "id": "user123",
    "displayName": "John",
    "age": 28,
    "weightKg": 75,
    "goals": ["build_strength", "lose_weight"],
    "experienceLevel": "beginner",
    "equipment": ["Dumbbells", "Full gym access"],
    "dietaryPreferences": ["No restrictions"],
    "notificationPreference": {
      "remindersEnabled": true,
      "weeklySummaryEnabled": true,
      "telegramEnabled": false
    }
  },
  "userId": "user-uid-from-firebase"
}
```

### Response

Returns both raw AI output and storage-ready format:

```json
{
  "success": true,
  "data": {
    "generated": {
      "weekNumber": 1,
      "goals": ["build_strength", "lose_weight"],
      "experience": "beginner",
      "workoutDays": [
        {
          "day": "Monday",
          "focus": "Upper Body Strength",
          "exercises": [
            {
              "name": "Dumbbell Bench Press",
              "sets": 3,
              "reps": "8-10",
              "restSeconds": 60,
              "notes": "Keep elbows at 45 degrees"
            }
          ],
          "duration": 45
        }
      ],
      "notes": "Start with lighter weights to focus on form..."
    },
    "storagePlan": {
      "userId": "user-uid-from-firebase",
      "weekStartsOn": "2024-01-08",
      "goal": "build_strength",
      "sessions": [
        {
          "id": "user-uid-from-firebase-monday",
          "title": "Upper Body Strength",
          "scheduledDay": "Monday",
          "exercises": [
            {
              "exerciseId": "dumbbell-bench-press",
              "sets": 3,
              "reps": 8,
              "restSeconds": 60
            }
          ]
        }
      ]
    }
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Missing required field: goals"
}
```
