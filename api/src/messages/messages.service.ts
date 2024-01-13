import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IMessageService } from './message';
import { CreateMessageParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message } from '../utils/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}
  async create({ user, content, conversationId }: CreateMessageParams) {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient'],
    });

    if (!conversation) throw new NotFoundException(`Conversation not found `);

    const { creator, recipient } = conversation;

    if (creator.id !== user.id && recipient.id !== user.id)
      throw new BadRequestException(`Cannot create message this conversation`);

    const message = this.messageRepository.create({
      content,
      conversation,
      author: user,
    });

    const savedMessage = await this.messageRepository.save(message);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepository.save(conversation);

    return savedMessage;
  }
  getMessagesByConversationId(conversationId: number) {
    return this.messageRepository.find({
      where: { conversation: { id: conversationId } },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },

      // skip: 0,
      // take: 10,
    });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    console.log(updateMessageDto);
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
