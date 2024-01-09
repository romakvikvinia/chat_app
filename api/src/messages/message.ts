import { CreateMessageParams } from 'src/utils/types';
import { Message } from '../utils/typeorm';

export interface IMessageService {
  create(input: CreateMessageParams): Promise<Message>;
}
