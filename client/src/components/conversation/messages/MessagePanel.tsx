import React, { useCallback, useEffect, useState } from "react";
import {
  MessagePanelBodyStyle,
  MessagePanelStyle,
} from "../../../utils/styles";
import { MessageContainer } from "./MessageContainer";
import { MessageInputField } from "./MessageInputField";
import { MessageType } from "../../../api/types";
import { MessagePanelHeader } from "./MessagePanelHeader";
import { useCreateMessageMutation } from "../../../api/chat.api";
import { useParams } from "react-router-dom";

type Props = {
  messages: MessageType[];
};

export const MessagePanel: React.FC<Props> = ({ messages }) => {
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

  return (
    <MessagePanelStyle>
      <MessagePanelHeader />
      <MessagePanelBodyStyle>
        <MessageContainer messages={messages} />
        <MessageInputField
          message={state.message}
          onMessage={handleSetMessage}
          onSubmit={handleSubmit}
        />
      </MessagePanelBodyStyle>
    </MessagePanelStyle>
  );
};
