import { ChatRepository } from '../../domain/repositories/chat.repository';

import { IChat } from '../../domain/contracts/IChat';
import { IUser } from '../../domain/contracts/IUser';
import { IMessageCreateParams } from '../../domain/contracts/IMessage';

import { BadRequest } from '../../domain/exceptions/badRequest';
import { ToolGatewayRepository } from '@domain/repositories/toolGateway.repository';

export class ChatService {
  constructor(
    private chatRepository: ChatRepository,
    private toolGatewayRepository: ToolGatewayRepository
  ) {}

  public async message(
    message: IMessageCreateParams,
    user: IUser
  ): Promise<IChat> {
    let assistantId: string;
    let threadId: string;

    try {
      threadId = user.thread_id || '';
      assistantId = await this.chatRepository.createAssistant();

      if (!threadId) {
        threadId = await this.chatRepository.createThread(user);

        await this.toolGatewayRepository.setThreadByUser(threadId, user);
      }
    } catch (error: unknown) {
      throw new BadRequest(`Error al crear assistant o thread`, 503, [error]);
    }

    try {
      await this.chatRepository.createMessage(threadId, {
        content: message.content,
        role: message.role,
      });

      const getMessageResponse = await this.chatRepository.getMessage(
        threadId,
        assistantId,
        user
      );

      return getMessageResponse.root();
    } catch (error: unknown) {
      throw new BadRequest('Error al procesar mensaje', 502, [error]);

      /*if (error.status === 400) {
        const runs = await this.chatRepository.getRunListActive(threadId);
        await this.chatRepository.cancelThreadRun(threadId, runs[0].id);
      }
      throw new BadRequest(502, 'Error al procesar mensaje', [error]);*/
    }
  }
}
