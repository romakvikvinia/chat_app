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
  authorId: number;
  recipientId: number;
  message: string;
};

export type FindParticipantParam = Partial<{
  id: number;
}>;

export type CreateParticipantParam = {
  id: number;
};
