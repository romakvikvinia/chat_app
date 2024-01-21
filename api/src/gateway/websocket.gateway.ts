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
  ) {}

  handleConnection(client: AuthenticatedSocket, ...args: any[]) {
    console.log('Incoming connection to socket');

    this.session.setUserSocket(client.user.id, client);
    client.join('hello-world');
    console.log(client.rooms);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('handleCreateMessage', data);
    // this.server.emit();
  }

  @SubscribeMessage('onClientConnect')
  onClientConnect(
    @MessageBody() body: any,
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    console.log('onClientConnect', body);

    console.log('client', client.user);
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
    console.log('event ');
    console.log(payload);

    const recipientSocket = this.session.getUserSocket(payload.recipient.id);

    if (recipientSocket) recipientSocket.emit('onConversation', payload);
  }
}
