import { Module } from '@nestjs/common';
import { MessageGateway } from './websocket.gateway';
import { Services } from '../utils/constants';
import { GatewaySessionManager } from './gateway.sessions';

@Module({
  providers: [
    MessageGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GatewaySessionManager,
    },
  ],
})
export class GatewayModule {}
