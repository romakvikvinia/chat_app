import { Entity, ManyToOne } from 'typeorm';
import { BaseMessage } from './base-message.entity';
import { Conversation } from './conversation.entity';

@Entity({ name: 'messages' })
export class Message extends BaseMessage {
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  //   @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  //   @JoinColumn()
  //   attachments: MessageAttachment[];
}
