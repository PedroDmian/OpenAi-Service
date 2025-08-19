import { Message, MessageCreateParams } from 'openai/resources/beta/threads/messages';

import { IUser } from '../contracts/IUser';
import { Chat } from '../entities/chat.entity';

export interface ChatRepository {
  createAssistant(): Promise<string>;
  createThread(user: IUser): Promise<string>;
  createMessage(
    threadId: string,
    message: MessageCreateParams
  ): Promise<Message>;
  getMessage(threadId: string, assistantId: string, user: IUser): Promise<Chat>;
}
