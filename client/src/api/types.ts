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
  lastMessageSent: Omit<MessageType, "author">;
  createdAt: string;
  updatedAt: string;
};

export type ConversationMapType = Map<number, ConversationType>;

export type ConversationsResponseType = ConversationType[]; //  Map<number, ConversationType>;

export type ConversationMessagesQueryArgs = {
  id: number;
};

export type AuthorType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type MessageType = {
  id: number;
  content: string;
  author: AuthorType;
  createdAt: string;
};
export type ConversationMessagesResponseType = MessageType[];

export type MessageEventPayload = {
  id: number;
  content: string;
  author: AuthorType;
  conversation: ConversationType;
  createdAt: string;
};

export type CreateMessageArgs = {
  conversationId: number;
  content: string;
};

export type CreateMessageResponseType = {};

export type CreateConversationArgsType = {
  email: string;
  message: string;
};
export type CreateConversationResponseType = ConversationType;

/**
 * Delete Message
 */

export type OnMessageDeleteEventPayload = {
  id: number;
  conversationId: number;
  content: string;
  createdAt: string;
};

export type DeleteMessageResponseType = {};

export type DeleteMessageArgsType = {
  conversationId: number;
  messageId: number;
};
