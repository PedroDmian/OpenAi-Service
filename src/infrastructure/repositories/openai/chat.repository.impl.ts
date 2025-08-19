import { OpenAIClient } from './openAi';
import { instructions, tools } from './instructions';
import { appConfig } from '../../../shared/config/app.config';

import { ChatRepository } from '../../../domain/repositories/chat.repository';
import { ToolGatewayRepository } from '../../../domain/repositories/toolGateway.repository';

import { IUser } from '../../../domain/contracts/IUser';
import { Chat } from '../../../domain/entities/chat.entity';

import { RequiredActionFunctionToolCall, Run, RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/runs/runs';
import { IMessage, IMessageCreateParams } from '../../../domain/contracts/IMessage';

export class ChatRepositoryImpl implements ChatRepository {
  private openaiClient: OpenAIClient;
  private toolGatewayRepository: ToolGatewayRepository;

  private assistantName: string | undefined;
  private model: string | undefined;
  private temperature: number;
  private createNewAssistant: boolean;
  private order: 'desc' | 'asc' = 'desc';
  private limit: number = 5;
  private defaultModel: string = 'gpt-3.5-turbo';

  constructor(toolGatewayRepository: ToolGatewayRepository) {
    this.openaiClient = new OpenAIClient();
    this.toolGatewayRepository = toolGatewayRepository;

    this.assistantName = appConfig.openAiAssistantName;
    this.model = appConfig.openAiModel;
    this.createNewAssistant = Boolean(appConfig.openAiCreateAssistant) ?? true;
    this.temperature = parseInt(appConfig.openAiTemperature ?? '0');
  }

  public async createAssistant(): Promise<string> {
    const myAssistants = await this.openaiClient.openai.beta.assistants.list({
      order: this.order,
      limit: this.limit,
    });

    const isExistNameAssistant = myAssistants.data.find(
      (assistant) => assistant.name === this.assistantName
    );

    if (
      this.createNewAssistant &&
      typeof isExistNameAssistant === 'undefined'
    ) {
      const myAssistant = await this.openaiClient.openai.beta.assistants.create(
        {
          name: this.assistantName,
          model: (this.model ?? this.defaultModel) as string,
          temperature: this.temperature,
          instructions: instructions,
          tools: tools,
        }
      );

      return myAssistant.id;
    }

    return isExistNameAssistant!.id;
  }

  public async createThread(user: IUser): Promise<string> {
    const thread = await this.openaiClient.openai.beta.threads.create();

    return thread.id;
  }

  public async createMessage(
    threadId: string,
    message: IMessageCreateParams
  ): Promise<IMessage> {
    return await this.openaiClient.openai.beta.threads.messages.create(
      threadId,
      message
    );
  }

  public async getMessage(
    threadId: string,
    assistantId: string,
    user: IUser
  ): Promise<Chat> {
    let run = await this.openaiClient.openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: assistantId,
      }
    );

    const handleRunStatusResponse = await this.handleRunStatus(
      run,
      threadId,
      assistantId,
      user
    );

    const firstContent = handleRunStatusResponse.at(0)?.content.at(0);

    let content: string = '';

    if (firstContent && 'text' in firstContent) {
      content = firstContent.text.value;
    }

    return new Chat({
      content,
      role: 'assistant',
      created_at: new Date().toISOString(),
      typeFormat: 'text',
      uri: '',
    });
  }

  public async getRunListActive(threadId: string): Promise<Run[]> {
    const runs = await this.openaiClient.openai.beta.threads.runs.list(
      threadId
    );

    return runs.data;
  }

  private async handleRunStatus(
    run: Run,
    threadId: string,
    assistantId: string,
    user: IUser
  ): Promise<IMessage[]> {
    if (run.status === 'completed') {
      let messages = await this.openaiClient.openai.beta.threads.messages.list(
        threadId
      );

      return messages.data;
    }

    if (run.status === 'requires_action') {
      return await this.handleRequiresAction(run, threadId, assistantId, user);
    }

    return [];
  }

  private async handleRequiresAction(
    run: Run,
    threadId: string,
    assistantId: string,
    user: IUser
  ): Promise<any> {
    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      const toolOutputs = await Promise.all(
        run.required_action.submit_tool_outputs.tool_calls.map(async (tool) => {
          return await this.actionFunction(tool, user);
        })
      );

      if (toolOutputs.length > 0) {
        run =
          await this.openaiClient.openai.beta.threads.runs.submitToolOutputsAndPoll(
            threadId,
            run.id,
            { tool_outputs: toolOutputs }
          );
      }

      return await this.handleRunStatus(run, threadId, assistantId, user);
    }
  }

  private async actionFunction(
    tool: RequiredActionFunctionToolCall,
    user: IUser
  ): Promise<RunSubmitToolOutputsParams.ToolOutput> {
    const { function: functionTools, id: tool_call_id } = tool;

    switch (functionTools.name) {
      case 'get_modules_and_permissions':
        return {
          tool_call_id,
          output: JSON.stringify(
            await this.toolGatewayRepository.getModulesAndPermissions(user)
          ),
        };
      case 'action_function':
        return {
          tool_call_id,
          output: JSON.stringify(
            await this.toolGatewayRepository.actionFunction(
              functionTools.arguments,
              user
            )
          ),
        };
      default:
        return {
          tool_call_id,
          output: JSON.stringify({}),
        };
        break;
    }
  }
}
