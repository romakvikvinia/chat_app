import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService implements IUserService {
  create(input: CreateUserType) {}
}
