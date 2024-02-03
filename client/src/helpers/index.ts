import { ConversationType, UserType } from "../api/types";

export const getRecipientFromConversation = (
  conversation: ConversationType,
  user: UserType
) =>
  user.id === conversation.creator.id
    ? conversation.recipient
    : conversation.creator;
