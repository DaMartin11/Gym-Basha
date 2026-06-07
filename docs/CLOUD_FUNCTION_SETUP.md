# Cloud Function Setup - Workout Plan Generation

This document summarizes the Cloud Function endpoint for generating personalized workout plans using OpenAI and Firebase.

## ✅ What Was Built

### Backend (Cloud Functions)

1. **`apps/functions/src/integrations/llm.ts`**
   - OpenAI API integration
   - `callLLM()` - Makes API calls with custom prompts
   - `parseLLMJSON()` - Safely extracts JSON from responses

2. **`apps/functions/src/plans/generateWorkoutPlan.ts`**
   - `generateRawWorkoutPlan()` - Calls LLM to generate workout plan
   - `transformToStoragePlan()` - Converts AI output to Firestore format
   - Intelligent system/user prompts based on user profile

3. **`apps/functions/src/plans/createPlanEndpoint.ts`**
   - HTTP Cloud Function endpoint
   - Request validation
   - Error handling
   - Returns both raw and transformed plans

### Frontend

1. **`apps/web/src/features/plans/services/planService.ts`**
   - `generateWorkoutPlan()` function
   - Calls Cloud Function from React
   - Type-safe with TypeScript

## 🏗️ Architecture

```
Frontend (React)
    ↓
    POST /generateWorkoutPlanEndpoint (HTTP)
    ↓
Cloud Function
    ├─ Validates request
    ├─ Calls generateRawWorkoutPlan()
    │   ├─ Builds smart system prompt
    │   ├─ Calls OpenAI API
    │   └─ Parses JSON response
    ├─ Transforms to storage format
    └─ Returns { generated, storagePlan }
    ↓
Frontend receives plan
    ↓
Save to Firestore (next step)
```

## 🚀 Testing Locally

### 1. Start Firebase Emulator

```bash
cd apps/functions
npm run serve
```

### 2. Call the Endpoint

**Using curl:**

```bash
curl -X POST http://localhost:5001/your-project-id/us-central1/generateWorkoutPlanEndpoint \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "id": "test",
      "displayName": "John",
      "age": 28,
      "weightKg": 75,
      "goals": ["build_strength"],
      "experienceLevel": "beginner",
      "equipment": ["Dumbbells", "Gym machines"],
      "dietaryPreferences": ["No restrictions"],
      "notificationPreference": {
        "remindersEnabled": true,
        "weeklySummaryEnabled": true,
        "telegramEnabled": false
      }
    },
    "userId": "test-user-123"
  }'
```

**Using REST Client (VS Code):**

Create `test-plan.http` in the functions directory:

```http
POST http://localhost:5001/your-project-id/us-central1/generateWorkoutPlanEndpoint
Content-Type: application/json

{
  "userProfile": {
    "id": "test",
    "displayName": "John",
    "age": 28,
    "weightKg": 75,
    "goals": ["build_strength"],
    "experienceLevel": "beginner",
    "equipment": ["Dumbbells"],
    "dietaryPreferences": ["No restrictions"],
    "notificationPreference": {
      "remindersEnabled": true,
      "weeklySummaryEnabled": true,
      "telegramEnabled": false
    }
  },
  "userId": "test-user-123"
}
```

Then use the REST Client extension to send the request.

### 3. Expected Response

```json
{
  "success": true,
  "data": {
    "generated": {
      "weekNumber": 1,
      "goals": ["build_strength"],
      "experience": "beginner",
      "workoutDays": [
        {
          "day": "Monday",
          "focus": "Upper Body Strength",
          "exercises": [...],
          "duration": 45
        },
        ...
      ],
      "notes": "..."
    },
    "storagePlan": {
      "userId": "test-user-123",
      "weekStartsOn": "2024-01-08",
      "goal": "build_strength",
      "sessions": [...]
    }
  }
}
```

## 📝 Request/Response Details

### Request

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `userProfile` | UserProfile | Yes | Full user profile from onboarding |
| `userId` | string | Yes | Firebase user UID |

### Response

| Field | Type | Notes |
|-------|------|-------|
| `success` | boolean | Whether request succeeded |
| `data.generated` | LLMGeneratedPlan | Raw AI output (human-readable) |
| `data.storagePlan` | WorkoutPlan | Ready for Firestore (normalized) |
| `error` | string | Error message if success=false |

## 🔧 Configuration

### OpenAI Model

Default: `gpt-4-turbo`

To change, update `generateRawWorkoutPlan()` call in `createPlanEndpoint.ts`:

```typescript
await generateRawWorkoutPlan(userProfile, {
  model: 'gpt-3.5-turbo', // Faster, cheaper
  temperature: 0.7,
  maxTokens: 2000,
})
```

### Environment Variables

Required in `.env`:
```
OPENAI_API_KEY=sk-proj-...
```

## 📊 Costs

Approximate costs per plan generation:

| Model | Cost | Speed | Quality |
|-------|------|-------|---------|
| gpt-4-turbo | $0.01-0.03 | Medium | High |
| gpt-3.5-turbo | $0.001-0.002 | Fast | Good |

## 🚨 Troubleshooting

### "OPENAI_API_KEY is not set"
- Ensure `.env` file exists in `apps/functions/`
- Verify key is correctly formatted (starts with `sk-proj-`)

### "Rate limit exceeded"
- OpenAI enforces rate limits based on account tier
- Wait a few minutes before retrying
- Consider upgrading OpenAI account

### No response from Cloud Function
- Check Firebase Emulator is running
- Verify request body is valid JSON
- Check browser console for network errors

### Malformed response
- Check OpenAI API status
- Verify userProfile has all required fields
- Look at Cloud Function logs in Firebase Console

## 📚 Next Steps

1. ✅ LLM Integration set up
2. ✅ Cloud Function endpoint created
3. 📋 Create UI component to trigger plan generation
4. 💾 Save plans to Firestore
5. 📊 Display plans on dashboard
6. 🎯 Add progress tracking
7. 🔔 Add notifications

## 📖 Related Documentation

- [LLM Setup](./LLM_SETUP.md)
- [Plans Functions](../apps/functions/src/plans/README.md)
- [Firebase Setup](../apps/web/src/shared/lib/firebase/README.md)
