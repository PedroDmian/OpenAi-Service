export const appConfig = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  API_REQUEST: process.env.API_REQUEST || 'http://localhost:3000',
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiApiUrl: process.env.OPENAI_API_URL,
  openAiAssistantName: process.env.OPENAI_ASSISTANT_NAME,
  openAiModel: process.env.OPENAI_MODEL,
  openAiCreateAssistant: process.env.OPENAI_CREATE_ASSISTANT,
  openAiTemperature: process.env.OPENAI_TEMPERATURE,
};
