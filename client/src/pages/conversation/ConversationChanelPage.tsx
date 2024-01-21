import React, { useContext, useEffect } from "react";
import { ConversationChanelPageStyle } from "../../utils/styles";
import { useLazyConversationMessagesQuery } from "../../api/chat.api";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../../components/conversation/messages/MessagePanel";
import { SocketContext } from "../../utils/context/socket.context";

export const ConversationChanelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);

  const [fetchConversationMessages, { data }] =
    useLazyConversationMessagesQuery();

  useEffect(() => {
    if (id) fetchConversationMessages({ id: parseInt(id) });
  }, [id, fetchConversationMessages]);

  useEffect(() => {
    socket.emit("onClientConnect", {
      conversationId: parseInt(id!),
    });
  }, [id, socket]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel messages={data || []} />
    </ConversationChanelPageStyle>
  );
};
