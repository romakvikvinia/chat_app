import { Conversation, User } from '../utils/typeorm';
import { CreateConversationParams } from '../utils/types';

export interface IConversationsService {
  create(user: User, input: CreateConversationParams): Promise<Conversation>;
  // find(id: number): Promise<any>;
  findConversationById(id: number);
  getConversations(id: number): Promise<Conversation[]>;
}
