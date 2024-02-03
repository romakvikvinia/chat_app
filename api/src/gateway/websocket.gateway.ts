import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';
import { Services } from '../utils/constants';
import { IGatewaySessionManager } from './gateway.sessions';
import { Inject } from '@nestjs/common';
import { Conversation, Message } from '../utils/typeorm';
import { IOnDeleteMessage } from '../messages/message';
import { IConversationsService } from 'src/conversations/conversations';
import {
  OnConversationJoinBodyType,
  OnConversationLeaveBodyType,
  OnUserTypingBodyType,
} from './gateway';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly session: IGatewaySessionManager,
    @Inject(Services.CONVERSATIONS)
    private readonly conversationService: IConversationsService,
  ) {}

  handleConnection(client: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming connection to socket');

    this.session.setUserSocket(client.user.id, client);
    console.log(client.rooms);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('handleCreateMessage', data);
    // this.server.emit();
  }

  @SubscribeMessage('onConversationJoin')
  onClientConnect(
    @MessageBody() body: OnConversationJoinBodyType,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onConversationJoin', body.conversationId);

    client.join(`${body.conversationId}`);
    client.to(`${body.conversationId}`).emit('userJoin');
    console.log('client', client.rooms);
  }

  @SubscribeMessage('onConversationLeave')
  onConversationLeave(
    @MessageBody() body: OnConversationLeaveBodyType,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log(`onConversationLeave: ${body.conversationId}`);
    client.leave(`${body.conversationId}`);
    client.to(`${body.conversationId}`).emit('userLeave');
    console.log('client', client.rooms);
  }

  @SubscribeMessage('onTypingStart')
  userTypingStart(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: OnUserTypingBodyType,
  ) {
    console.log('onTypingStart', body.conversationId);
    console.log(client.rooms);
    client.to(`${body.conversationId}`).emit('onTypingStart');
    // this.server.to(`${body.conversationId}`).emit('onTypingStart');
  }
  @SubscribeMessage('onTypingStop')
  userTypingStop(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: OnUserTypingBodyType,
  ) {
    console.log('onTypingStop', body.conversationId);
    console.log(client.rooms);
    client.to(`${body.conversationId}`).emit('onTypingStop');
    // this.server.to(`${body.conversationId}`).emit('onTypingStop');
  }

  @OnEvent('message.create')
  onMessageCreate(payload: Message) {
    const {
      author,
      conversation: { creator, recipient },
    } = payload;

    const authorSocket = this.session.getUserSocket(author.id);

    const recipientSocket =
      author.id === creator.id
        ? this.session.getUserSocket(recipient.id)
        : this.session.getUserSocket(creator.id);

    if (authorSocket) authorSocket.emit('onMessage', payload);

    if (recipientSocket) recipientSocket.emit('onMessage', payload);
    // this.server.emit('onMessage', payload);
  }

  @OnEvent('conversation.created')
  onConversationCreatedEvent(payload: Conversation) {
    const recipientSocket = this.session.getUserSocket(payload.recipient.id);

    if (recipientSocket) recipientSocket.emit('onConversation', payload);
  }

  @OnEvent('message.deleted')
  async onMessageDelete({ userId, conversationId, message }: IOnDeleteMessage) {
    const conversation =
      await this.conversationService.findConversationById(conversationId);

    if (!conversation) return;

    const recipientSocket =
      conversation.creator.id === userId
        ? this.session.getUserSocket(conversation.recipient.id)
        : this.session.getUserSocket(conversation.creator.id);

    if (recipientSocket)
      recipientSocket.emit('onMessageDelete', { ...message, conversationId });
  }
}
