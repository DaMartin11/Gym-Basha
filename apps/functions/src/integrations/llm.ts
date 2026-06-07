import OpenAI from "openai";

const GITHUB_MODELS_ENDPOINT = "https://models.github.ai/inference";
const DEFAULT_MODEL = "openai/gpt-4.1";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error("GITHUB_TOKEN environment variable is not set.");
    }
    client = new OpenAI({
      baseURL: GITHUB_MODELS_ENDPOINT,
      apiKey: token,
    });
  }
  return client;
}

export interface LLMConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}

const DEFAULT_CONFIG: LLMConfig = {
  model: DEFAULT_MODEL,
  temperature: 0.7,
  maxTokens: 2000,
};

/**
 * Call GitHub Models API using the OpenAI-compatible endpoint
 */
export async function callLLM(
  userMessage: string,
  systemPrompt: string,
  config: Partial<LLMConfig> = {}
): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const llmClient = getClient();

  try {
    const response = await llmClient.chat.completions.create({
      model: finalConfig.model,
      temperature: finalConfig.temperature,
      max_tokens: finalConfig.maxTokens,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response content from GitHub Models API");
    }

    return content;
  } catch (error) {
    console.error("LLM API error:", error);
    throw error;
  }
}

/**
 * Parse JSON from LLM response, with fallback for markdown code blocks
 */
export function parseLLMJSON<T>(response: string): T {
  try {
    return JSON.parse(response);
  } catch {
    const jsonMatch = response.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    const codeMatch = response.match(/```\s*([\s\S]*?)```/);
    if (codeMatch) {
      return JSON.parse(codeMatch[1]);
    }

    throw new Error("Could not parse JSON from LLM response");
  }
}
