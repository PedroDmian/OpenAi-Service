import OpenAI from 'openai';
import { appConfig } from '../../../shared/config/app.config';

export class OpenAIClient {
  public openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: appConfig.openAiApiKey,
    });
  }
}
