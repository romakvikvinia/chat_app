import React, { useContext, useEffect } from "react";
import { Page } from "../../utils/styles";
import { ConversationAside } from "../../components/conversation/ConversationAside";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../package/store/hooks";
import { SocketContext } from "../../utils/context/socket.context";
import {
  ConversationsResponseType,
  MessageEventPayload,
} from "../../api/types";
import { chatAppApi } from "../../api/chat.api";

export const ConversationsPage = () => {
  // const dispatch = useDispatch<ThunkDispatch<RootState, any, UnknownAction>>();
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

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
    <Page>
      <ConversationAside />

      <Outlet />
    </Page>
  );
};
