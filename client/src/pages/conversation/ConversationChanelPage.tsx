import React, { useCallback, useContext, useEffect, useState } from "react";
import { ConversationChanelPageStyle } from "../../utils/styles";
import { useLazyConversationMessagesQuery } from "../../api/chat.api";
import { useParams } from "react-router-dom";
import { MessagePanel } from "../../components/conversation/messages/MessagePanel";
import { SocketContext } from "../../utils/context/socket.context";

export const ConversationChanelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [state, setState] = useState({
    isTyping: false,
    isRecipientTyping: false,
  });

  const [fetchConversationMessages, { data }] =
    useLazyConversationMessagesQuery();

  useEffect(() => {
    if (id) fetchConversationMessages({ id: parseInt(id) });
  }, [id, fetchConversationMessages]);

  useEffect(() => {
    socket.emit("onConversationJoin", {
      conversationId: parseInt(id!),
    });

    socket.on("userJoin", () => {
      console.log("userJoin");
    });

    socket.on("userLeave", () => {
      console.log("userLeave");
    });

    socket.on("onTypingStart", () => {
      console.log("onTypingStart");
      setState((prevState) => ({ ...prevState, isRecipientTyping: true }));
    });
    socket.on("onTypingStop", () => {
      console.log("onTypingStop");
      setState((prevState) => ({ ...prevState, isRecipientTyping: false }));
    });

    return () => {
      socket.emit("onConversationLeave", { conversationId: id });
      socket.off("onConversationJoin");
      socket.off("userJoin");
      socket.off("userLeave");
      socket.off("onTypingStart");
      socket.off("onTypingStop");
    };
  }, [id, socket]);

  const sendTypingStatus = useCallback(() => {
    if (!state.isTyping) {
      socket.emit("onTypingStart", { conversationId: id });
      setState((prevState) => ({ ...prevState, isTyping: true }));
    } else {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          console.log("finish typing");
          setState((prevState) => ({ ...prevState, isTyping: false }));
          socket.emit("onTypingStop", { conversationId: id });
        }, 2000)
      );
    }
  }, [state, id, timer, socket]);

  return (
    <ConversationChanelPageStyle>
      <MessagePanel
        onSendTypingStatus={sendTypingStatus}
        messages={data || []}
        isRecipientTyping={state.isRecipientTyping}
      />
    </ConversationChanelPageStyle>
  );
};
