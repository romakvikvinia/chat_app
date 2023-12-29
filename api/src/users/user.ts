import { User } from '../utils/typeorm';
import { CreateUserType, FindUserType } from '../utils/types';

export interface IUserService {
  create(input: CreateUserType): Promise<User>;
  findUser(input: FindUserType): Promise<User>;
}
