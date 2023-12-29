import { ValidateUserType } from '../utils/types';

export interface IAuthService {
  validateUser(input: ValidateUserType);
}
