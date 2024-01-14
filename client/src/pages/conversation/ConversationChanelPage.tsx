import React, { useContext, useEffect, useState } from "react";
import { ConversationChanelPageStyle } from "../../utils/styles";
import { useLazyConversationMessagesQuery } from "../../api/chat.api";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../../components/conversation/messages/MessagePanel";
import { SocketContext } from "../../utils/context/socket.context";
import { MessageEventPayload, MessageType } from "../../api/types";

export const ConversationChanelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [state, setState] = useState<{ messages: MessageType[] }>({
    messages: [],
  });
  const [fetchConversationMessages, { data }] =
    useLazyConversationMessagesQuery();

  useEffect(() => {
    if (id) fetchConversationMessages({ id: parseInt(id) });
  }, [id, fetchConversationMessages]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection success");
    });

    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, ...message } = payload;
      setState((prevState) => ({
        ...prevState,
        messages: [message, ...prevState.messages],
      }));
    });
    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel messages={[...state.messages, ...(data || [])]} />
    </ConversationChanelPageStyle>
  );
};
