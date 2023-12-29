import { ISession } from 'connect-typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class Session implements ISession {
  @Index()
  @Column({ type: 'bigint' })
  expiredAt: number = Date.now();

  @PrimaryColumn({
    type: 'varchar',
  })
  id: string;

  @Column('text')
  json: string;

  @DeleteDateColumn()
  destroyedAt?: Date;
}
