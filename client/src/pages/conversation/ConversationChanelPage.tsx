import React, { useContext, useEffect, useState } from "react";
import { ConversationChanelPageStyle } from "../../utils/styles";
import {
  chatAppApi,
  useLazyConversationMessagesQuery,
} from "../../api/chat.api";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../../components/conversation/messages/MessagePanel";
import { SocketContext } from "../../utils/context/socket.context";
import {
  ConversationsResponseType,
  MessageEventPayload,
} from "../../api/types";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../package/store";

export const ConversationChanelPage = () => {
  // const dispatch = useDispatch<ThunkDispatch<RootState, any, UnknownAction>>();
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    socket.on("onMessage", (payload: MessageEventPayload) => {
      const { conversation, ...message } = payload;
      dispatch(
        chatAppApi.util.updateQueryData(
          "conversationMessages",
          { id: conversation.id },
          (draftMessages: any) => {
            draftMessages.unshift(message);
          }
        )
      );

      // dispatch(chatAppApi.util.patchQueryData("conversations", undefined, []));
      // dispatch(
      //   chatAppApi.util.prefetch("conversations", undefined, { force: true })
      // );
      dispatch(
        chatAppApi.util.updateQueryData(
          "conversations",
          undefined,
          (conversations: ConversationsResponseType) => {
            const { author, ...restMessage } = message;
            const index = conversations.findIndex(
              (c) => c.id === conversation.id
            );
            conversations[index].lastMessageSent = restMessage;
            const [currentConversation] = conversations.splice(index, 1);
            conversations.unshift(currentConversation);

            return conversations;
          }
        )
      );
    });
    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket, dispatch]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel messages={data || []} />
    </ConversationChanelPageStyle>
  );
};
