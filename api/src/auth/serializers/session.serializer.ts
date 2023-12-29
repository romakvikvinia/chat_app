import { Injectable, Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from '../../utils/constants';

import { User } from 'src/utils/typeorm';
import { IUserService } from 'src/users/user';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done) {
    done(null, user);
  }
  deserializeUser(user: User, done) {
    const record = this.userService.findUser({ id: user.id });
    return record ? done(null, record) : done(null, null);
  }
}
