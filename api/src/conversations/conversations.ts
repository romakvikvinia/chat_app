import { User } from '../utils/typeorm';
import { CreateConversationParams } from '../utils/types';

export interface IConversationsService {
  create(user: User, input: CreateConversationParams);
}
