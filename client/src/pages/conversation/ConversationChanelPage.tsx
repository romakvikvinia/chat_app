import React, { useContext, useEffect, useState } from "react";
import { ConversationChanelPageStyle } from "../../utils/styles";
import {
  chatAppApi,
  useLazyConversationMessagesQuery,
} from "../../api/chat.api";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../../components/conversation/messages/MessagePanel";
import { SocketContext } from "../../utils/context/socket.context";
import { ConversationMapType, MessageEventPayload } from "../../api/types";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export const ConversationChanelPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, UnknownAction>>();
  const { id } = useParams();
  const socket = useContext(SocketContext);

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
      dispatch(
        chatAppApi.util.updateQueryData(
          "conversationMessages",
          { id: conversation.id },
          (draftMessages: any) => {
            draftMessages.unshift(message);
          }
        )
      );
      dispatch(
        chatAppApi.util.updateQueryData(
          "conversations",
          undefined,
          (conversations: any) => {
            console.log("conversations", conversations);
            // draftMessages.unshift(message);
            const currentConversation = conversations.get(conversation.id);
            if (!currentConversation) return;

            currentConversation.lastMessageSent = message;
            conversations.set(conversation.id, currentConversation);
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
