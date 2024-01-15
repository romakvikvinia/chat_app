import React from "react";
import {
  MessageInput,
  MessageInputFieldContainerStyle,
} from "../../../utils/styles";

type Props = {
  message: string;
  onMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const MessageInputField: React.FC<Props> = ({
  message,
  onMessage,
  onSubmit,
}) => {
  return (
    <MessageInputFieldContainerStyle>
      <form onSubmit={onSubmit}>
        <MessageInput
          value={message}
          onChange={(e) => onMessage(e.target.value)}
        />
      </form>
    </MessageInputFieldContainerStyle>
  );
};
