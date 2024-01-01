import { CreateConversationParams } from '../utils/types';

export interface IConversationsService {
  create(input: CreateConversationParams);
}
