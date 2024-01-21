import React, { useContext, useEffect } from "react";
import { Page } from "../../utils/styles";
import { ConversationAside } from "../../components/conversation/ConversationAside";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../package/store/hooks";
import { SocketContext } from "../../utils/context/socket.context";
import {
  ConversationType,
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

    socket.on("onConversation", (data: ConversationType) => {
      dispatch(
        chatAppApi.util.updateQueryData(
          "conversations",
          undefined,
          (conversations: ConversationsResponseType) => {
            if (conversations) {
              conversations.unshift(data);
              return conversations;
            } else {
              return [data];
            }
          }
        )
      );
    });
    return () => {
      socket.off("connect");
      socket.off("onMessage");
      socket.off("onConversation");
    };
  }, [socket, dispatch]);
  return (
    <Page>
      <ConversationAside />

      <Outlet />
    </Page>
  );
};
