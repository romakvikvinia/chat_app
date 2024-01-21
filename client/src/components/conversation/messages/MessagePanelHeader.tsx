import React from "react";
import { MessagePanelHeaderStyle } from "../../../utils/styles";
import { useConversationsQuery, useGetMeQuery } from "../../../api/chat.api";

import { useParams } from "react-router-dom";

export const MessagePanelHeader = () => {
  const { data: user } = useGetMeQuery();
  const { data: conversations } = useConversationsQuery();
  const { id } = useParams();

  // const conversations = useAppSelector((state) => state.chat_app.queries)[
  //   "conversations(undefined)"
  // ];

  const conversation =
    conversations && conversations.find((co) => co.id === parseInt(id!));

  let displayName =
    user && conversation && conversation.creator.id === user.id
      ? `${conversation.recipient.firstName} ${conversation.recipient.lastName}`
      : user && `${user.firstName} ${user.lastName}`;

  return <MessagePanelHeaderStyle>{displayName}</MessagePanelHeaderStyle>;
};
