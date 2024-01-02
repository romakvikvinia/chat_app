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
}
