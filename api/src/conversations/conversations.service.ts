import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from '../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Participant, User } from '../utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../utils/constants';
import { IParticipantsService } from '../participant/participant';
import { IUserService } from '../users/user';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}
  async create(user: User, input: CreateConversationParams) {
    const userDB = await this.userService.findUser({ id: user.id });
    const participants: Participant[] = [];

    if (!userDB.participant) {
      participants.push(
        await this.createParticipantAndSaveUser(userDB, input.authorId),
      );
    } else {
      participants.push(userDB.participant);
    }

    const recipient = await this.userService.findUser({
      id: input.recipientId,
    });

    if (!recipient)
      throw new BadRequestException(`Can not create conversation `);

    if (!recipient.participant) {
      participants.push(
        await this.createParticipantAndSaveUser(recipient, input.recipientId),
      );
    } else {
      participants.push(recipient.participant);
    }

    const conversation = this.conversationRepository.create({ participants });

    return this.conversationRepository.save(conversation);
  }

  find(id: number) {
    // return this.conversationRepository
    //   .createQueryBuilder('conversations')
    //   .leftJoinAndSelect('conversations.participants', 'participants')
    //   .getMany();
    return this.participantService.findParticipantConversations(id);
  }

  findConversationById(id: number) {
    return this.conversationRepository.findOne({
      where: { id },
      relations: ['participants', 'participants.user'],
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

  private async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantService.createParticipant({ id });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant;
  }
}
