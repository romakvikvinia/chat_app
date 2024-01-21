import { User } from './typeorm';

export type CreateUserType = {
  email: string;

  firstName: string;

  lastName: string;

  password: string;
};

export type ValidateUserType = {
  email: string;
  password: string;
};

export type FindUserType = Partial<
  Omit<CreateUserType, 'password'> & { id: number }
>;

export type CreateConversationParams = {
  email: string;
  message: string;
};

export type FindParticipantParam = Partial<{
  id: number;
}>;

export type CreateParticipantParam = {
  id: number;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
  user: User;
};
