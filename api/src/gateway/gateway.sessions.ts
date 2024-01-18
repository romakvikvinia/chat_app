import { Injectable } from '@nestjs/common';
import { AuthenticatedSocket } from '../utils/interfaces';

interface IGatewaySession {
  getSocket(id: number);
}

@Injectable()
export class GatewaySessionManager implements IGatewaySession {
  private readonly sessions: Map<number, AuthenticatedSocket> = new Map();

  getSocket(id: number) {
    return this.sessions.get(id);
  }

  setSocket(userId: number, socket: AuthenticatedSocket) {
    this.sessions.set(userId, socket);
  }

  removeUser(userId: number) {
    this.sessions.delete(userId);
  }

  getSockets(): Map<number, AuthenticatedSocket> {
    return this.sessions;
  }
}
