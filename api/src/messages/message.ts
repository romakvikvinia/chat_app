import { Message } from '../utils/typeorm';
import { CreateMessageParams } from '../utils/types';

export interface IMessageService {
  create(input: CreateMessageParams);
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
}
