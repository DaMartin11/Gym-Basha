# Integration Functions

ExerciseDB, Telegram, AI provider, and n8n integration adapters belong here.

## LLM Integration (`llm.ts`)

Handles OpenAI API calls for workout and meal plan generation.

### Setup

1. **Install dependencies**: `npm install openai`
2. **Set environment variables**: Create `.env` file in `apps/functions/` with:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
3. **Get API key**: Visit [platform.openai.com](https://platform.openai.com/account/api-keys)

### Usage

```typescript
import { callLLM, parseLLMJSON } from './llm';

const response = await callLLM(
  'Generate a workout plan for a beginner',
  'You are a professional fitness coach...'
);

// For JSON responses:
const plan = parseLLMJSON(response);
```

### Configuration

Default model is `gpt-4-turbo`. To use a different model:

```typescript
await callLLM(userMessage, systemPrompt, {
  model: 'gpt-3.5-turbo',
  temperature: 0.5,
  maxTokens: 1500
});
```
