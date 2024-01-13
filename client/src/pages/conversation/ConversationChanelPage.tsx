import React, { useEffect } from "react";
import { ConversationChanelPageStyle } from "../../utils/styles";
import { useLazyConversationMessagesQuery } from "../../api/chat.api";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../../components/conversation/messages/MessagePanel";

export const ConversationChanelPage = () => {
  const { id } = useParams();
  const [fetchConversationMessages, { data }] =
    useLazyConversationMessagesQuery();

  useEffect(() => {
    if (id) fetchConversationMessages({ id: parseInt(id) });
  }, [id, fetchConversationMessages]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel messages={data || []} />
    </ConversationChanelPageStyle>
  );
};
