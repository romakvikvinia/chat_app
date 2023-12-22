import { CreateUserType } from 'src/utils/types';

export interface IUserService {
  create(input: CreateUserType);
}
