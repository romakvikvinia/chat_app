import { Message } from '../utils/typeorm';
import { CreateMessageParams, DeleteMessageType } from '../utils/types';

export interface IMessageService {
  create(input: CreateMessageParams);
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
  deleteMessage(input: DeleteMessageType);
}
