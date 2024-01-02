import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Participant } from './participants.entity';

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Participant, (participant) => participant.conversations)
  participants: Participant[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
