import { Map } from "immutable";
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
  createdAt: Date;
  updatedAt: Date;
};

export type ConversationsResponseType = Map<number, ConversationType>;

export type ConversationMessagesQueryArgs = {
  id: number;
};

export type AuthorType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type MessageType = {
  id: number;
  content: string;
  author: AuthorType;
  createdAt: Date;
};
export type ConversationMessagesResponseType = MessageType[];

export type MessageEventPayload = {
  id: number;
  content: string;
  author: AuthorType;
  conversation: ConversationType;
  createdAt: Date;
};

export type CreateMessageArgs = {
  conversationId: number;
  content: string;
};

export type CreateMessageResponseType = {};
