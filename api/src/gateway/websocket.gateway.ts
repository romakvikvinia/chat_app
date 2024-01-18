import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor() {}
  handleConnection(client: AuthenticatedSocket, ...args: any[]) {
    console.log(client);
    // console.log(args);
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('handleCreateMessage', data);
    // this.server.emit();
  }

  @OnEvent('message.create')
  onMessageCreate(data: any) {
    console.log(data);
    this.server.emit('onMessage', data);
  }
}
