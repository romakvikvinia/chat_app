import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor() {}
  handleConnection(client: any, ...args: any[]) {
    console.log(client);
    console.log(args);
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
