import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message, User } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../utils/constants';

import { IUserService } from '../users/user';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

    @Inject(Services.USERS)
    private readonly userService: IUserService,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(
    creator: User,
    { recipientId, message: content }: CreateConversationParams,
  ) {
    // const { username, message: content } = input;
    const recipient = await this.userService.findUser({ id: recipientId });
    if (!recipient) throw new NotFoundException('Can not found recipient');
    if (creator.id === recipient.id)
      throw new BadRequestException('Cannot create Conversation with yourself');
    // const isFriends = await this.friendsService.isFriends(
    //   creator.id,
    //   recipient.id,
    // );
    // if (!isFriends) throw new FriendNotFoundException();
    const exists = await this.isCreated(creator.id, recipient.id);
    console.log(exists);
    if (exists) throw new BadRequestException('Conversation already exists');

    const newConversation = this.conversationRepository.create({
      creator,
      recipient,
    });
    const conversation =
      await this.conversationRepository.save(newConversation);
    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author: creator,
    });
    await this.messageRepository.save(newMessage);
    return conversation;
  }

  async getConversations(id: number): Promise<Conversation[]> {
    return (
      this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
        .leftJoinAndSelect('conversation.creator', 'creator')
        .leftJoinAndSelect('conversation.recipient', 'recipient')
        // .leftJoinAndSelect('creator.peer', 'creatorPeer')
        // .leftJoinAndSelect('recipient.peer', 'recipientPeer')
        // .leftJoinAndSelect('creator.profile', 'creatorProfile')
        // .leftJoinAndSelect('recipient.profile', 'recipientProfile')
        .where('creator.id = :id', { id })
        .orWhere('recipient.id = :id', { id })
        // .orderBy('conversation.lastMessageSentAt', 'DESC')
        .orderBy('conversation.updated_at', 'DESC')
        .getMany()
    );
  }

  find() {}

  findConversationById(id: number) {
    return this.conversationRepository.findOne({
      where: { id },
      relations: ['creator', 'recipient', 'messages', 'messages.author'],
    });
  }

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    console.log(updateConversationDto);
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }

  private isCreated(creatorId: number, recipientId: number) {
    console.log(creatorId, recipientId);
    return this.conversationRepository.findOne({
      where: {
        creator: { id: creatorId },
        recipient: { id: recipientId },
      },
      // where: [
      //   { creator: { id: creatorId } },
      //   { recipient: { id: recipientId } },
      // ],
    });
  }
}
