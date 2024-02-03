import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MessagePanelBodyStyle,
  MessagePanelStyle,
  MessagesTypingStatus,
} from "../../../utils/styles";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { ConversationType, MessageType, UserType } from "../../../api/types";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { useCreateMessageMutation } from "../../../api/chat.api";
import { useAppSelector } from "../../../package/store/hooks";
import { getRecipientFromConversation } from "../../../helpers";

type Props = {
  messages: MessageType[];
  onSendTypingStatus: () => void;
  isRecipientTyping: boolean;
};

export const MessagePanel: React.FC<Props> = ({
  messages,
  onSendTypingStatus,
  isRecipientTyping,
}) => {
  const conversations = useAppSelector((state) => state.chat_app.queries)[
    `conversations(undefined)`
  ]?.data as ConversationType[];
  const user = useAppSelector((state) => state.chat_app.queries)[
    `getMe(undefined)`
  ]?.data as UserType;

  const [createMessage, { isLoading, isSuccess }] = useCreateMessageMutation();
  const [state, setState] = useState({ message: "" });
  const { id } = useParams();

  const handleSetMessage = useCallback((message: string) => {
    setState((prevState) => ({ ...prevState, message }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!id || !state.message) return;
      createMessage({ conversationId: parseInt(id), content: state.message });
    },
    [id, state, createMessage]
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      handleSetMessage("");
    }
  }, [isSuccess, isLoading, handleSetMessage]);

  // transform data
  const conversation =
    conversations && conversations.find((con) => con.id === parseInt(id!));

  return (
    <MessagePanelStyle>
      <MessagePanelHeader />
      <MessagePanelBodyStyle>
        <MessageContainer messages={messages} />

        <MessageInputField
          message={state.message}
          onMessage={handleSetMessage}
          onSubmit={handleSubmit}
          onSendTypingStatus={onSendTypingStatus}
        />

        <MessagesTypingStatus>
          {conversation && user && isRecipientTyping
            ? `${
                getRecipientFromConversation(conversation, user).email
              } is Typing`
            : ``}
        </MessagesTypingStatus>
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
