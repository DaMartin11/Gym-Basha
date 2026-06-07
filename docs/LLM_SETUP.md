# LLM Integration Setup Guide

This guide explains how to set up the OpenAI integration for Gym-Basha's workout and meal plan generation.

## Prerequisites

- Node.js 18+
- An OpenAI API account with available credits
- Firebase project configured

## Step 1: Get Your OpenAI API Key

1. Visit [platform.openai.com](https://platform.openai.com/account/api-keys)
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)
5. Keep it safe - **never share or commit this to version control**

## Step 2: Configure Environment Variables

### For Local Development

1. Navigate to `apps/functions/`
2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and add your API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

### For Firebase Functions Deployment

When deploying to Firebase:

```bash
cd apps/functions
firebase functions:config:set openai.api_key="sk-your-actual-key-here"
```

Then update the code to read from config:

```typescript
const apiKey = process.env.OPENAI_API_KEY || 
               functions.config().openai?.api_key
```

## Step 3: Install Dependencies

```bash
npm install
```

This installs the OpenAI SDK and all other dependencies.

## Step 4: Test the Integration

### Start the Emulator

```bash
cd apps/functions
npm run serve
```

This starts Firebase emulators on `http://localhost:5001/`.

### Test the Workout Plan Endpoint

Using curl:

```bash
curl -X POST http://localhost:5001/your-project-id/us-central1/generateWorkoutPlanEndpoint \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "id": "test-user",
      "displayName": "John Doe",
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
    }
  }'
```

Or using VS Code REST Client extension (create `test.http`):

```http
POST http://localhost:5001/your-project-id/us-central1/generateWorkoutPlanEndpoint
Content-Type: application/json

{
  "userProfile": {
    "id": "test-user",
    "displayName": "John Doe",
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
  }
}
```

### Expected Response

```json
{
  "success": true,
  "data": {
    "weekNumber": 1,
    "goals": ["build_strength"],
    "experience": "beginner",
    "workoutDays": [...],
    "notes": "..."
  }
}
```

## Available Models

The default model is `gpt-4-turbo`. You can change it in function calls:

| Model | Speed | Cost | Best For |
|-------|-------|------|----------|
| `gpt-4-turbo` | Slower | Higher | Complex reasoning (default) |
| `gpt-3.5-turbo` | Fast | Lower | Simple tasks, budget-conscious |
| `gpt-4` | Medium | High | General-purpose high quality |

## Cost Considerations

- **gpt-4-turbo**: ~$0.01-0.03 per plan generated
- **gpt-3.5-turbo**: ~$0.001-0.002 per plan generated

For ~100 users generating 1 plan each:
- gpt-4-turbo: $1-3
- gpt-3.5-turbo: $0.10-0.20

## Troubleshooting

### "OPENAI_API_KEY is not set"
- Ensure `.env` file exists in `apps/functions/`
- Verify the key is correctly copied (should start with `sk-`)
- Check that the key hasn't expired or been revoked

### "Rate limit exceeded"
- OpenAI has rate limits based on your account tier
- Wait a few minutes before retrying
- Consider upgrading your OpenAI account

### "Invalid request"
- Check that the prompt is valid and doesn't exceed token limits
- Ensure the response is valid JSON when using `parseLLMJSON`

## Next Steps

1. ✅ LLM Integration is set up
2. 📋 Create Cloud Function endpoint for plan generation
3. 🔌 Connect frontend to the Cloud Function
4. 🧪 Test end-to-end

See `apps/functions/src/plans/generateWorkoutPlan.ts` for the plan generation logic.
