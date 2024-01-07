export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;

  created_at: string;
  updated_at: string;
};
export type SignUpInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
export type SignUpResponseType = {};

export type SignInInput = Pick<SignUpInput, "email" | "password">;

export type SignInResponseType = UserType;

export type GetMeResponseType = UserType;

export type ConversationType = {
  id: number;
  creator: UserType;
  recipient: UserType;
  messages: [];
};

export type ConversationsResponseType = ConversationType[];
