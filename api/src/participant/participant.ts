import { CreateParticipantParam, FindParticipantParam } from '../utils/types';
import { Participant } from '../utils/typeorm';

export interface IParticipantsService {
  findParticipant(input: FindParticipantParam): Promise<Participant | null>;
  // findOrCreateParticipant();
  createParticipant(input: CreateParticipantParam): Promise<Participant>;
}
