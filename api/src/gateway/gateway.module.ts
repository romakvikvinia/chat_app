import { Module } from '@nestjs/common';
import { MessageGateway } from './websocket.gateway';
import { Services } from '../utils/constants';
import { GatewaySessionManager } from './gateway.sessions';
import { ConversationsModule } from '../conversations/conversations.module';

@Module({
  imports: [ConversationsModule],
  providers: [
    MessageGateway,

    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}
