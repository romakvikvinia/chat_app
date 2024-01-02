import { User } from '../utils/typeorm';
import { CreateUserType, FindUserType } from '../utils/types';

export interface IUserService {
  saveUser(user: User): Promise<User>;
  create(input: CreateUserType): Promise<User>;
  findUser(input: FindUserType): Promise<User>;
}
