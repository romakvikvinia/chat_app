import { Injectable } from '@nestjs/common';
import { IParticipantsService } from './participant';
import { Participant } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParticipantParam, FindParticipantParam } from '../utils/types';

@Injectable()
export class ParticipantService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}
  findParticipant(input: FindParticipantParam): Promise<Participant | null> {
    return this.participantRepository.findOne({
      where: input,
      // relations: ['participant'],
    });
  }
  async createParticipant(input: CreateParticipantParam): Promise<Participant> {
    const participant = await this.participantRepository.create(input);
    return this.participantRepository.save(participant);
  }

  findParticipantConversations(id: number) {
    return (
      this.participantRepository
        .createQueryBuilder('participant')
        .leftJoinAndSelect('participant.conversations', 'conversations')
        .leftJoinAndSelect('conversations.participants', 'participants')
        .leftJoin('participants.user', 'user')
        .where('participant.id = :id', { id })
        .where('user.id <> :id ', { id })
        .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.email'])
        // .addSelect('user.firstName')
        // .addSelect('user.firstName')
        // .setFindOptions({
        //   relations: ['conversations', 'conversations.participants.user'],
        // })
        .getOne()
    );
  }
}
