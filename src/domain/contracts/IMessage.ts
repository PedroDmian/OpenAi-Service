// ! Specific to OpenAI
import { Message, MessageCreateParams } from "openai/resources/beta/threads/messages";

export interface IMessage extends Message {}
export interface IMessageCreateParams extends MessageCreateParams{}
